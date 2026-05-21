const fs = require('fs');
const path = require('path');

const BASE_DIR = 'd:/Usuario/Psicología VIU-20240330T103501Z-001/Psicología VIU/2026/saimap-plataforma';
const JSON_DIR = path.join(BASE_DIR, 'json');

const SUBJECT_MAP = {
    'aprendizaje': 'psicologia-del-aprendizaje',
    'social': 'psicologia-social',
    'historia': 'historia-de-la-psicologia',
    'psicobiologia': 'bases-biologicas-del-comportamiento'
};

function extractDB(htmlContent, filename, jsonPath) {
    // 1. Intentar extraer de la etiqueta script id="tema-db"
    const startTag = '<script id="tema-db" type="application/json">';
    const startIdx = htmlContent.indexOf(startTag);
    if (startIdx !== -1) {
        const endTag = '</script>';
        const endIdx = htmlContent.indexOf(endTag, startIdx + startTag.length);
        if (endIdx !== -1) {
            const jsonStr = htmlContent.substring(startIdx + startTag.length, endIdx).trim();
            try {
                return JSON.parse(jsonStr);
            } catch(e) {
                console.error(`Error parseando JSON de tema-db en ${filename}:`, e);
            }
        }
    }
    
    // 2. Intentar leer de la versión antigua "DB: {"
    const dbStartKey = "DB: {";
    const oldStartIdx = htmlContent.indexOf(dbStartKey);
    if (oldStartIdx !== -1) {
        const objStartIdx = oldStartIdx + dbStartKey.length - 1; 
        let braceCount = 1;
        let i = objStartIdx + 1;
        while (braceCount > 0 && i < htmlContent.length) {
            if (htmlContent[i] === '{') braceCount++;
            else if (htmlContent[i] === '}') braceCount--;
            i++;
        }
        const dbStr = htmlContent.substring(objStartIdx, i);
        try {
            const evalFn = new Function(`return ${dbStr}`);
            return evalFn();
        } catch(e) {
            console.error("Error al evaluar DB antigua:", e);
        }
    }

    // 3. Fallback: Intentar leer el archivo JSON que ya está guardado en json/
    if (fs.existsSync(jsonPath)) {
        try {
            console.log(`  └─ Usando archivo JSON existente como fuente para ${filename}`);
            return JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
        } catch (e) {
            console.error(`Error leyendo JSON existente de ${jsonPath}:`, e);
        }
    }
    
    return null;
}

function processFiles() {
    const files = fs.readdirSync(BASE_DIR);
    
    // Filtrar archivos de tema HTML
    const htmlThemeFiles = files.filter(f => 
        f.endsWith('.html') && 
        f.includes('-tema-') && 
        !f.startsWith('tema.html') // Ignorar la plantilla universal
    );
    
    console.log(`Encontrados ${htmlThemeFiles.length} archivos de tema para modularizar.`);
    
    htmlThemeFiles.forEach(filename => {
        const filePath = path.join(BASE_DIR, filename);
        const content = fs.readFileSync(filePath, 'utf8');
        
        // 1. Deducir asignaturaId y temaKey
        const parts = filename.replace('.html', '').split('-tema-');
        const prefix = parts[0];
        const temaFilePart = parts[1]; // ej: "1-1" o "1"
        
        const asignaturaId = SUBJECT_MAP[prefix];
        if (!asignaturaId) {
            console.warn(`No se reconoce el prefijo para el archivo: ${filename}`);
            return;
        }
        
        // Convertir "2-1" a "2.1" para visualización de tema
        const temaKey = temaFilePart.replace(/-/g, '.');
        const jsonFilename = `${asignaturaId}-tema-${temaFilePart}.json`;
        const jsonPath = path.join(JSON_DIR, jsonFilename);
        
        // 2. Extraer base de datos del archivo original
        const db = extractDB(content, filename, jsonPath);
        if (!db) {
            console.error(`No se pudo extraer la base de datos de ${filename}`);
            return;
        }
        
        // 3. Extraer el título original del HTML
        const titleMatch = content.match(/<title>(.*?)<\/title>/);
        const title = titleMatch ? titleMatch[1] : `Tema ${temaKey} - ${asignaturaId}`;
        
        // 4. Crear el nuevo HTML modular súper ligero
        const modularHtml = `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <!-- Importamos el cargador dinámico común de temas -->
    <script src="js/tema-loader.js" defer></script>
</head>
<body>
    <!-- Configuración del tema -->
    <script id="tema-config" type="application/json">
        {
            "asignaturaId": "${asignaturaId}",
            "temaKey": "${temaKey}"
        }
    </script>
</body>
</html>`;
        
        // 5. Guardar el nuevo HTML modular (sobreescribe el anterior)
        fs.writeFileSync(filePath, modularHtml, 'utf8');
        console.log(`✓ Modularizado con éxito: ${filename} (Reducido de ~250KB a ~${Math.round(modularHtml.length / 1024)}KB)`);
        
        // 6. Guardar también una copia limpia en json/ si no existe o para consistencia
        fs.writeFileSync(jsonPath, JSON.stringify(db, null, 2), 'utf8');
        console.log(`  └─ Copia JSON actualizada en: json/${jsonFilename}`);
    });
    
    console.log('\n¡Proceso de modularización completado!');
}

processFiles();
