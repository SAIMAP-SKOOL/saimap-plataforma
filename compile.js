const fs = require('fs');
const path = require('path');

const targetDir = __dirname;
const jsonDir = path.join(targetDir, 'json');

if (!fs.existsSync(jsonDir)) {
    fs.mkdirSync(jsonDir, { recursive: true });
}

// 1. COMPILAR MEMORIA
console.log('Compilando Psicología de la Memoria...');
const memoriaDir = path.join(targetDir, '..', '..', '2025', '1º', 'Psicología de la memoria');
let memoriaQuestions = [];
try {
    for (let i = 1; i <= 5; i++) {
        const fileA = path.join(memoriaDir, `test_A_tema${i}.json`);
        const fileB = path.join(memoriaDir, `test_B_tema${i}.json`);
        if (fs.existsSync(fileA)) {
            memoriaQuestions = memoriaQuestions.concat(JSON.parse(fs.readFileSync(fileA, 'utf-8')));
        }
        if (fs.existsSync(fileB)) {
            memoriaQuestions = memoriaQuestions.concat(JSON.parse(fs.readFileSync(fileB, 'utf-8')));
        }
    }
    fs.writeFileSync(path.join(jsonDir, 'memoria.json'), JSON.stringify(memoriaQuestions, null, 4), 'utf-8');
    console.log(`✓ memoria.json generado con ${memoriaQuestions.length} preguntas.`);
} catch (e) {
    console.error('Error compilando Memoria:', e.message);
}

// 2. COMPILAR DESARROLLO
console.log('\nCompilando Psicología del Desarrollo...');
const desarrolloDir = path.join(targetDir, '..', '..', '2025', '1º', 'PSICOLOGÍA DEL DESARROLLO. INFANCIA Y ADOLESCENCIA');
let desarrolloQuestions = [];
try {
    for (let i = 1; i <= 8; i++) {
        const fileA = path.join(desarrolloDir, `test_A_tema${i}.json`);
        const fileB = path.join(desarrolloDir, `test_B_tema${i}.json`);
        if (fs.existsSync(fileA)) {
            desarrolloQuestions = desarrolloQuestions.concat(JSON.parse(fs.readFileSync(fileA, 'utf-8')));
        }
        if (fs.existsSync(fileB)) {
            desarrolloQuestions = desarrolloQuestions.concat(JSON.parse(fs.readFileSync(fileB, 'utf-8')));
        }
    }
    fs.writeFileSync(path.join(jsonDir, 'desarrollo.json'), JSON.stringify(desarrolloQuestions, null, 4), 'utf-8');
    console.log(`✓ desarrollo.json generado con ${desarrolloQuestions.length} preguntas.`);
} catch (e) {
    console.error('Error compilando Desarrollo:', e.message);
}

console.log('\n¡Compilación terminada!');
