const fs = require('fs');
const path = require('path');
const vm = require('vm');

const targetDir = __dirname;
const outputDir = path.join(targetDir, 'json');

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

const rootDir = path.join(targetDir, '..', 'HTML Exámenes');

function extractFromDir(subDir) {
    const dirPath = path.join(rootDir, subDir);
    if (!fs.existsSync(dirPath)) {
        console.log(`Directorio no encontrado: ${dirPath}`);
        return;
    }
    
    const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.html'));
    console.log(`\nProcesando directorio ${subDir} (${files.length} archivos)...`);
    
    files.forEach(file => {
        const filePath = path.join(dirPath, file);
        const html = fs.readFileSync(filePath, 'utf-8');
        
        // Expresión regular para capturar la definición de rawQuestions
        const match = html.match(/const rawQuestions = (\[[\s\S]*?\]);/);
        if (match) {
            const jsCode = match[1];
            try {
                // Evaluar el array de JS de forma segura
                const questions = vm.runInNewContext(jsCode);
                
                // Normalizar nombre de archivo (ej: "Psicología Social - Examen.html" -> "psicologia-social.json")
                const jsonName = file
                    .replace(/\s*-\s*Examen\.html/i, '')
                    .toLowerCase()
                    .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // Quitar tildes
                    .replace(/[^a-z0-9]/g, '-')                     // Reemplazar especiales por guiones
                    .replace(/-+/g, '-')                            // Limpiar guiones duplicados
                    .replace(/^-|-$/g, '');                         // Quitar guiones iniciales/finales
                
                fs.writeFileSync(path.join(outputDir, `${jsonName}.json`), JSON.stringify(questions, null, 4), 'utf-8');
                console.log(`✓ Extraído con éxito: "${file}" ➔ json/${jsonName}.json (${questions.length} preguntas)`);
            } catch(e) {
                console.error(`✗ Error analizando código JS en "${file}":`, e.message);
            }
        } else {
            console.warn(`⚠ No se encontró el array "rawQuestions" en "${file}"`);
        }
    });
}

extractFromDir('1º');
extractFromDir('3º');
console.log('\n¡Proceso de extracción completado!');
