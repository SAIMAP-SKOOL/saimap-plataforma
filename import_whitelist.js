const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const https = require('https');

const CREDENTIALS_FILE = 'firebase-credentials.json';
const EMAILS_FILE = 'emails.txt';
const CSV_FILE = 'members.csv';

// Helper to convert string to base64url (safe for older Node versions)
function toBase64Url(str) {
    return Buffer.from(str).toString('base64')
        .replace(/=/g, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_');
}

// 1. Obtener Token de Acceso OAuth2 usando la clave privada de Firebase
function getAccessToken(serviceAccount) {
    return new Promise((resolve, reject) => {
        const header = JSON.stringify({ alg: 'RS256', typ: 'JWT' });
        const payload = JSON.stringify({
            iss: serviceAccount.client_email,
            scope: 'https://www.googleapis.com/auth/datastore',
            aud: 'https://oauth2.googleapis.com/token',
            exp: Math.floor(Date.now() / 1000) + 3600,
            iat: Math.floor(Date.now() / 1000)
        });

        const signatureInput = `${toBase64Url(header)}.${toBase64Url(payload)}`;

        const sign = crypto.createSign('RSA-SHA256');
        sign.update(signatureInput);
        const signature = sign.sign(serviceAccount.private_key, 'base64');
        const signatureBase64Url = signature
            .replace(/=/g, '')
            .replace(/\+/g, '-')
            .replace(/\//g, '_');

        const jwt = `${signatureInput}.${signatureBase64Url}`;
        const postData = `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwt}`;

        const req = https.request({
            hostname: 'oauth2.googleapis.com',
            path: '/token',
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': Buffer.byteLength(postData)
            }
        }, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    const json = JSON.parse(data);
                    if (json.access_token) {
                        resolve(json.access_token);
                    } else {
                        reject(new Error(`Error al autenticar: ${data}`));
                    }
                } catch (e) {
                    reject(new Error(`Respuesta no JSON de Google: ${data}`));
                }
            });
        });

        req.on('error', (err) => reject(new Error(`Error de red en autenticación: ${err.message}`)));
        req.write(postData);
        req.end();
    });
}

// 2. Subir un hash a Firestore
function uploadHash(projectId, accessToken, hash, emailDisplay) {
    return new Promise((resolve, reject) => {
        const postData = JSON.stringify({
            fields: {
                active: { booleanValue: true },
                updated_at: { timestampValue: new Date().toISOString() }
            }
        });

        // Usamos PATCH para crear o sobrescribir el documento de forma limpia
        const req = https.request({
            hostname: 'firestore.googleapis.com',
            path: `/v1/projects/${projectId}/databases/(default)/documents/whitelist/${hash}`,
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(postData)
            }
        }, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                if (res.statusCode >= 200 && res.statusCode < 300) {
                    resolve();
                } else {
                    reject(new Error(`Estado HTTP ${res.statusCode}: ${data}`));
                }
            });
        });

        req.on('error', (err) => reject(new Error(`Error de red al subir hash: ${err.message}`)));
        req.write(postData);
        req.end();
    });
}

// Enmascarar email para mostrar en consola de forma segura
function maskEmail(email) {
    const parts = email.split('@');
    if (parts.length !== 2) return email;
    const name = parts[0];
    const domain = parts[1];
    const maskedName = name.length > 3 ? `${name.substring(0, 3)}***` : `${name}***`;
    return `${maskedName}@${domain}`;
}

// Función principal
async function main() {
    console.log('=== IMPORTADOR DE WHITELIST PARA SAIMAP ===\n');

    const credsPath = path.join(__dirname, CREDENTIALS_FILE);
    if (!fs.existsSync(credsPath)) {
        console.error(`ERROR: No se encuentra el archivo '${CREDENTIALS_FILE}'.`);
        console.log('\nPara solucionarlo:');
        console.log('1. Entra en Firebase Console (https://console.firebase.google.com/).');
        console.log('2. Ve a Configuración del proyecto > Cuentas de servicio.');
        console.log('3. Haz clic en "Generar nueva clave privada" y descarga el archivo JSON.');
        console.log(`4. Guárdalo en esta misma carpeta con el nombre exacto: ${CREDENTIALS_FILE}`);
        process.exit(1);
    }

    let serviceAccount;
    try {
        serviceAccount = JSON.parse(fs.readFileSync(credsPath, 'utf8'));
    } catch (e) {
        console.error(`ERROR: El archivo '${CREDENTIALS_FILE}' no es un JSON válido.`);
        process.exit(1);
    }

    const projectId = serviceAccount.project_id;
    if (!projectId) {
        console.error(`ERROR: No se pudo leer el "project_id" del archivo de credenciales.`);
        process.exit(1);
    }

    // Buscar archivos de correo
    let emails = [];
    const emailsPath = path.join(__dirname, EMAILS_FILE);
    const csvPath = path.join(__dirname, CSV_FILE);

    if (fs.existsSync(csvPath)) {
        console.log(`Leyendo correos desde '${CSV_FILE}'...`);
        const content = fs.readFileSync(csvPath, 'utf8');
        // Extraer correos usando expresión regular
        const regex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
        const matches = content.match(regex) || [];
        // Filtrar duplicados
        emails = [...new Set(matches)];
        console.log(`Se encontraron ${emails.length} correos únicos en el CSV.`);
    } else if (fs.existsSync(emailsPath)) {
        console.log(`Leyendo correos desde '${EMAILS_FILE}'...`);
        const content = fs.readFileSync(emailsPath, 'utf8');
        const regex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
        const matches = content.match(regex) || [];
        emails = [...new Set(matches)];
        console.log(`Se encontraron ${emails.length} correos únicos en el archivo de texto.`);
    } else {
        console.error(`ERROR: No se encuentra '${EMAILS_FILE}' ni '${CSV_FILE}'.`);
        console.log('\nPor favor, haz una de las siguientes opciones:');
        console.log(`- Coloca el archivo '${CSV_FILE}' exportado de Skool en esta misma carpeta.`);
        console.log(`- O crea un archivo '${EMAILS_FILE}' con un correo por línea.`);
        process.exit(1);
    }

    if (emails.length === 0) {
        console.warn('ADVERTENCIA: No se encontró ningún correo electrónico en los archivos.');
        process.exit(0);
    }

    console.log('\nObteniendo token de acceso de Google Firebase...');
    let token;
    try {
        token = await getAccessToken(serviceAccount);
        console.log('✓ Autenticado correctamente con Firebase.');
    } catch (e) {
        console.error('ERROR al autenticar:', e.message);
        process.exit(1);
    }

    console.log(`\nIniciando subida de ${emails.length} alumnos a Firestore...`);
    let successCount = 0;
    let failCount = 0;

    for (let i = 0; i < emails.length; i++) {
        const rawEmail = emails[i];
        const normalized = rawEmail.trim().toLowerCase();
        const hash = crypto.createHash('sha256').update(normalized).digest('hex');
        const display = maskEmail(normalized);

        try {
            await uploadHash(projectId, token, hash, display);
            successCount++;
            console.log(`[${successCount + failCount}/${emails.length}] ${display} -> Subido OK`);
        } catch (e) {
            failCount++;
            console.error(`[${successCount + failCount}/${emails.length}] ${display} -> ERROR:`, e.message);
        }
    }

    console.log('\n=== RESUMEN DE IMPORTACIÓN ===');
    console.log(`Total procesados: ${emails.length}`);
    console.log(`Subidos con éxito: ${successCount}`);
    console.log(`Fallidos: ${failCount}`);
    console.log('===============================');
}

main().catch(err => {
    console.error('Ha ocurrido un error inesperado:', err);
});
