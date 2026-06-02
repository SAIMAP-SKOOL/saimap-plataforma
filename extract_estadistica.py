import urllib.request
import html
import json
import re
import os
import subprocess
import sys
import random

# Force UTF-8 output on Windows
if sys.stdout.encoding != 'utf-8':
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

BASE_DIR = r"d:\Usuario\Psicología VIU-20240330T103501Z-001\Psicología VIU\2026\saimap-plataforma"
JSON_DIR = os.path.join(BASE_DIR, "json", "1º", "Fundamentos-Estadística")
TEMAS_DIR = os.path.join(BASE_DIR, "temas", "1º", "Fundamentos-Estadística")
os.makedirs(JSON_DIR, exist_ok=True)
os.makedirs(TEMAS_DIR, exist_ok=True)

SUBJECT_ID = "fundamentos-de-estadistica"
SHORT_ID = "fundamentos-de-estadistica"

URLS = [
    ("1.1", "https://soloaimaproject.es/fundamentos-de-estadistica-tema-1-1"),
    ("1.2", "https://soloaimaproject.es/fundamentos-de-estadistica-tema-1-2"),
    ("2.1", "https://soloaimaproject.es/fundamentos-de-estadistica-tema-2-1"),
    ("2.2", "https://soloaimaproject.es/fundamentos-de-estadistica-tema-2-2"),
    ("2.3", "https://soloaimaproject.es/fundamentos-de-estadistica-tema-2-3"),
    ("3", "https://soloaimaproject.es/fundamentos-de-estadistica-tema-3"),
    ("4.1", "https://soloaimaproject.es/fundamentos-de-estadistica-tema-4-1"),
    ("4.2", "https://soloaimaproject.es/fundamentos-de-estadistica-tema-4-2"),
    ("5.1", "https://soloaimaproject.es/fundamentos-de-estadistica-tema-5-1"),
    ("5.2", "https://soloaimaproject.es/fundamentos-de-estadistica-tema-5-2"),
    ("5.3", "https://soloaimaproject.es/fundamentos-de-estadistica-tema-5-3"),
    ("5.4", "https://soloaimaproject.es/fundamentos-de-estadistica-tema-5-4"),
]

TEMA_NAMES = {
    '1.1': 'Ciencia, Método y Estadística',
    '1.2': 'Variables, Muestreo y Escalas de Medida',
    '2.1': 'Estadística Descriptiva',
    '2.2': 'Cuantiles, Tendencia Central y Posición',
    '2.3': 'La Forma de los Datos',
    '3': 'La Base de la Estadística',
    '4.1': 'Asociación y Causalidad',
    '4.2': 'Asociación entre Variables Cuantitativas',
    '5.1': 'Del Muestreo a la Normal',
    '5.2': 'Estimación de Parámetros',
    '5.3': 'Contraste de Hipótesis',
    '5.4': 'Errores Estadísticos'
}

UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"

# Raw string prevents escaping backslashes in Python string literals
HTML_TEMPLATE = r"""<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SAIMAP - Tema __TEMA_KEY__: __TEMA_NAME__</title>
    <!-- Tailwind CSS para el diseño -->
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;800&display=swap" rel="stylesheet">
    <script src="https://unpkg.com/@phosphor-icons/web"></script>
    
    <!-- Configuración de MathJax para renderizar LaTeX -->
    <script>
        MathJax = {
            tex: {
                inlineMath: [['$', '$'], ['\\(', '\\)']],
                displayMath: [['$$', '$$'], ['\\[', '\\]']]
            },
            startup: {
                typeset: false // Lo llamaremos manualmente después de cargar las vistas
            }
        };
    </script>
    <script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js"></script>

    <style>
        body {
            font-family: 'Outfit', sans-serif;
            background-color: #f0f9ff;
            background-image:
                radial-gradient(at 0% 0%, hsla(192, 90%, 90%, 1) 0, transparent 50%),
                radial-gradient(at 50% 0%, hsla(170, 70%, 90%, 1) 0, transparent 50%),
                radial-gradient(at 100% 0%, hsla(210, 80%, 90%, 1) 0, transparent 50%);
            background-attachment: fixed;
            min-height: 100vh;
        }

        .glass-card {
            background: rgba(255, 255, 255, 0.75);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.9);
            box-shadow: 0 10px 40px -10px rgba(14, 165, 233, 0.15);
        }

        .btn-primary {
            background: linear-gradient(135deg, #0284c7 0%, #0ea5e9 50%, #2dd4bf 100%);
            background-size: 200% 200%;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            color: white;
            font-weight: 700;
        }

        .btn-primary:hover:not(:disabled) {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(14, 165, 233, 0.4);
            background-position: 100% 50%;
        }

        /* Estilos Flashcards */
        .perspective-1000 {
            perspective: 1000px;
        }

        .card-inner {
            position: relative;
            width: 100%;
            height: 100%;
            text-align: center;
            transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
            transform-style: preserve-3d;
            cursor: pointer;
        }

        .card-inner.flipped {
            transform: rotateY(180deg);
        }

        .card-face {
            position: absolute;
            width: 100%;
            height: 100%;
            -webkit-backface-visibility: hidden;
            backface-visibility: hidden;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 2rem;
            border-radius: 1.5rem;
        }

        .card-front {
            background: white;
            border: 2px solid #e2e8f0;
        }

        .card-back {
            background: #4f46e5;
            color: white;
            transform: rotateY(180deg);
        }

        .fade-in {
            animation: fadeIn 0.5s ease-out forwards;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .option-btn {
            transition: all 0.2s;
            border: 2px solid #e2e8f0;
        }

        .option-btn:hover:not(:disabled) {
            border-color: #0ea5e9;
            background-color: #f0f9ff;
            transform: translateX(5px);
        }

        /* MathJax adjustments to prevent overflow */
        mjx-container {
            max-width: 100%;
            overflow-x: auto;
            overflow-y: hidden;
        }
    </style>
</head>
<body class="flex flex-col min-h-screen">

    <!-- Header Global -->
    <header class="glass-card sticky top-0 z-50 px-6 py-4">
        <div class="max-w-6xl mx-auto flex justify-between items-center">
            <div class="flex items-center gap-3 cursor-pointer" onclick="app.showView('home')">
                <div class="bg-sky-600 text-white p-2 rounded-lg shadow-lg">
                    <i class="ph-bold ph-chart-line-up text-2xl"></i>
                </div>
                <div>
                    <h1 class="font-extrabold text-xl tracking-tight text-slate-800" id="header-title">Tema __TEMA_KEY__ - __TEMA_NAME__</h1>
                    <p class="text-[9px] uppercase tracking-widest font-bold text-slate-500">ANÁLISIS DE DATOS Y MATEMÁTICAS</p>
                </div>
            </div>

            <div class="flex items-center gap-2 sm:gap-4">
                <!-- Botón Portal Principal -->
                <a href="../../../index.html" class="bg-slate-700 hover:bg-slate-800 text-white font-bold py-2 px-4 rounded-xl flex items-center gap-2 transition shadow-md text-sm">
                    <i class="ph-bold ph-arrow-left text-lg"></i> <span class="hidden sm:inline">Portal Principal</span>
                </a>

                <!-- Botón Calculadora Externa -->
                <a href="https://web2.0calc.es/" target="_blank" rel="noopener noreferrer" class="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded-xl flex items-center gap-2 transition shadow-md text-sm">
                    <i class="ph-bold ph-calculator text-lg"></i> <span class="hidden sm:inline">Calculadora</span>
                </a>

                <!-- Botón Menú Global -->
                <button id="btn-global-menu" onclick="app.showView('home')" class="hidden bg-sky-500 hover:bg-sky-600 text-white font-bold py-2 px-4 rounded-xl items-center gap-2 transition shadow-md text-sm">
                    <i class="ph-bold ph-house text-lg"></i> <span class="hidden sm:inline">Menú</span>
                </button>

                <!-- Contador Global -->
                <div id="nav-counter" class="hidden items-center gap-2 bg-white/60 px-3 py-1.5 rounded-full border border-white">
                    <span id="global-counter" class="text-sky-700 font-bold font-mono text-sm">0/0</span>
                </div>
            </div>
        </div>
    </header>

    <!-- Main Container -->
    <main class="flex-grow max-w-5xl w-full mx-auto p-6 flex flex-col items-center justify-center">

        <!-- VIEW: HOME (MENU) -->
        <section id="view-home" class="fade-in w-full">
            <div class="text-center mb-12">
                <h1 class="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-400 mb-8 tracking-tighter opacity-80 select-none">
                    SAIMAP</h1>
                <h2 class="text-3xl md:text-4xl font-extrabold text-slate-800 mb-4">¿Cómo quieres practicar hoy?</h2>
                <h3 class="text-xl font-bold text-slate-600 mb-4">Tema __TEMA_KEY__ - __TEMA_NAME__</h3>
                <p class="text-slate-500">Selecciona la herramienta que mejor se adapte a tu objetivo de estudio.</p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                <!-- QUIZ -->
                <div onclick="app.startTool('quiz')" class="glass-card p-8 rounded-3xl cursor-pointer hover:scale-105 transition-all group border-b-4 border-b-sky-500">
                    <div class="w-16 h-16 bg-sky-100 text-sky-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-sky-600 group-hover:text-white transition">
                        <i class="ph-bold ph-list-numbers text-3xl"></i>
                    </div>
                    <h3 class="text-xl font-bold mb-2">Test Teórico</h3>
                    <p class="text-sm text-slate-500 leading-relaxed">Preguntas de opción múltiple sobre conceptos y propiedades estadísticas.</p>
                </div>

                <!-- LABORATORIO (Reemplaza Trainer) -->
                <div onclick="app.startTool('laboratorio')" class="glass-card p-8 rounded-3xl cursor-pointer hover:scale-105 transition-all group border-b-4 border-b-emerald-500">
                    <div class="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-600 group-hover:text-white transition">
                        <i class="ph-bold ph-calculator text-3xl"></i>
                    </div>
                    <h3 class="text-xl font-bold mb-2">Laboratorio</h3>
                    <p class="text-sm text-slate-500 leading-relaxed">Ejercicios de cálculo numérico con escenarios guiados paso a paso.</p>
                </div>

                <!-- FÓRMULAS (Reemplaza Flashcards) -->
                <div onclick="app.startTool('formulas')" class="glass-card p-8 rounded-3xl cursor-pointer hover:scale-105 transition-all group border-b-4 border-b-indigo-500">
                    <div class="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 group-hover:text-white transition">
                        <i class="ph-bold ph-list-dashes text-3xl"></i>
                    </div>
                    <h3 class="text-xl font-bold mb-2">Fórmulas</h3>
                    <p class="text-sm text-slate-500 leading-relaxed">Glosario completo de fórmulas matemáticas para consultar rápidamente.</p>
                </div>
            </div>
        

            <!-- Contenedor para botones de navegación de temas -->
            <div id="theme-navigation-container" class="mt-12 flex justify-between items-center w-full max-w-xl mx-auto gap-4 pt-6 border-t border-slate-200/60"></div>
        </section>

        <!-- VIEW: QUIZ -->
        <section id="view-quiz" class="hidden w-full fade-in space-y-6">
            <div class="glass-card rounded-3xl p-8 relative overflow-hidden">
                <div class="absolute top-0 left-0 w-full h-1 bg-sky-500"></div>

                <div class="flex justify-between items-center mb-6">
                    <div class="flex items-center gap-3">
                        <span class="text-xs font-bold text-slate-400 uppercase tracking-widest">Modo Test</span>
                        <button onclick="app.finishSession()" class="text-red-500 font-bold text-[10px] uppercase tracking-tighter hover:bg-red-50 px-2 py-1 rounded-lg transition border border-red-100">
                            Finalizar Sesión
                        </button>
                    </div>
                    <button id="quiz-hint-btn" onclick="app.quizToggleHint()" class="text-amber-600 font-bold text-xs flex items-center gap-1 hover:bg-amber-50 px-3 py-1.5 rounded-lg transition">
                        <i class="ph-bold ph-lightbulb"></i> Ver Pista
                    </button>
                </div>

                <h2 id="quiz-question" class="text-2xl font-bold text-slate-800 mb-8 math-content"></h2>

                <div id="quiz-hint-box" class="hidden mb-6 p-4 bg-amber-50 border-l-4 border-amber-400 text-amber-900 text-sm italic rounded-r-xl math-content"></div>

                <div id="quiz-options" class="space-y-3"></div>

                <!-- Feedback Quiz -->
                <div id="quiz-feedback" class="hidden mt-8 p-6 rounded-2xl border transition-all">
                    <div class="flex items-start gap-4">
                        <div id="quiz-feedback-icon" class="text-3xl"></div>
                        <div class="w-full">
                            <h4 id="quiz-feedback-title" class="font-bold text-lg"></h4>
                            <div id="quiz-explanation" class="text-sm text-slate-600 mt-2 p-3 bg-slate-50 rounded-lg math-content"></div>
                        </div>
                    </div>
                    <button onclick="app.quizNext()" class="mt-6 btn-primary py-4 px-8 rounded-xl w-full flex items-center justify-center gap-2">
                        Continuar <i class="ph ph-arrow-right"></i>
                    </button>
                </div>
            </div>
        </section>

        <!-- VIEW: LABORATORIO -->
        <section id="view-laboratorio" class="hidden w-full fade-in space-y-6">
            <div class="glass-card rounded-3xl overflow-hidden border-t-4 border-emerald-500">
                <!-- Cabecera y Contexto -->
                <div class="p-6 md:p-8 bg-emerald-50/50 border-b border-slate-100">
                    <div class="flex justify-between items-start mb-4">
                        <div class="flex items-center gap-3">
                            <div class="bg-indigo-600 text-white w-8 h-8 rounded-lg flex items-center justify-center font-bold" id="lab-problem-number">1</div>
                            <h2 id="lab-main-title" class="text-xl font-bold text-slate-800"></h2>
                        </div>
                        <button onclick="app.finishSession()" class="text-red-500 font-bold text-[10px] uppercase tracking-tighter hover:bg-red-50 px-2 py-1 rounded-lg transition border border-red-100">Finalizar</button>
                    </div>
                    <div id="lab-context-box" class="bg-white/80 p-5 rounded-xl text-slate-700 math-content text-base border border-slate-200 shadow-inner"></div>
                </div>

                <!-- Contenedor de Apartados -->
                <div id="lab-parts-container" class="flex flex-col bg-white">
                    <!-- Los apartados se inyectan aquí automáticamente -->
                </div>
            </div>

            <!-- Botón de siguiente problema -->
            <button onclick="app.labNext()" class="mt-6 w-full bg-slate-800 hover:bg-slate-900 text-white py-4 rounded-xl font-bold shadow-lg transform active:scale-95 transition flex justify-center items-center gap-2">
                Siguiente Problema <i class="ph-bold ph-arrow-right"></i>
            </button>
        </section>

        <!-- VIEW: FÓRMULAS -->
        <section id="view-formulas" class="hidden w-full fade-in space-y-6">
            <div class="mb-6 px-2">
                <h2 class="text-3xl font-black text-slate-800">Glosario de Fórmulas</h2>
                <p class="text-slate-500 mt-1">Lista completa de recursos matemáticos</p>
            </div>
            
            <!-- Grid Scrollable para las fórmulas -->
            <div id="formulas-grid" class="grid grid-cols-1 md:grid-cols-2 gap-6 pb-12">
                <!-- Las fórmulas se inyectarán aquí -->
            </div>
        </section>

        <!-- VIEW: RESULTS -->
        <section id="view-results" class="hidden w-full fade-in text-center py-12">
            <div class="glass-card p-12 rounded-[3rem] inline-block max-w-md w-full border-2 border-white shadow-2xl">
                <div class="w-24 h-24 bg-yellow-400 text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-yellow-200">
                    <i class="ph-fill ph-trophy text-5xl"></i>
                </div>
                <h2 class="text-3xl font-extrabold text-slate-800 mb-2">¡Sesión Finalizada!</h2>
                <p id="result-text" class="text-slate-500 mb-8">Has completado todos los ejercicios.</p>

                <div class="flex flex-col gap-3">
                    <button id="btn-retry-errors" onclick="app.retryErrors()" class="hidden bg-red-500 hover:bg-red-600 text-white font-bold py-4 rounded-2xl transition flex items-center justify-center gap-2">
                        <i class="ph-bold ph-warning-circle"></i> Repasar solo Fallos (<span id="fail-count">0</span>)
                    </button>
                    <button onclick="app.showView('home')" class="btn-primary w-full py-4 rounded-2xl uppercase tracking-widest text-sm shadow-md">Menú Principal</button>
                </div>
            </div>
        </section>

    </main>

    <script>
        // --- DATOS JSON VACÍOS (Inyectados dinámicamente) ---
        const jsonTestA = __JSON_TEST_A__;
        const jsonTestB = __JSON_TEST_B__;
        const jsonLaboratorio = __JSON_LABORATORIO__;
        const jsonFormulas = __JSON_FORMULAS__;

        // --- TRANSFORMACIÓN DE DATOS PARA LA APP ---
        const appDB = {
            quiz: [...jsonTestA, ...jsonTestB],
            laboratorio: [...jsonLaboratorio],
            formulas: jsonFormulas.map(f => ({
                cat: "Fórmula",
                q: f.name,
                a: f.tex
            }))
        };

        // --- LÓGICA DE LA APLICACIÓN ---
        const app = {
            DB: appDB,
            state: {
                currentTool: null,
                index: 0,
                isFlipped: false,
                activeData: [],
                failedQuestions: [],
                score: 0,
                totalQuestions: 0
            },

            // Renderiza MathJax si está disponible
            renderMath: function() {
                if (window.MathJax && window.MathJax.typesetPromise) {
                    MathJax.typesetPromise();
                }
            },

            showView: function (view) {
                document.querySelectorAll('section').forEach(s => s.classList.add('hidden'));
                const target = document.getElementById(`view-${view}`);
                if (target) target.classList.remove('hidden');

                const menuBtn = document.getElementById('btn-global-menu');
                const counterBox = document.getElementById('nav-counter');
                
                if (view === 'home') {
                    menuBtn.classList.remove('flex');
                    menuBtn.classList.add('hidden');
                    counterBox.classList.remove('flex');
                    counterBox.classList.add('hidden');
                } else {
                    menuBtn.classList.remove('hidden');
                    menuBtn.classList.add('flex');
                    
                    if (view === 'formulas') {
                        counterBox.classList.remove('flex');
                        counterBox.classList.add('hidden');
                    } else {
                        counterBox.classList.remove('hidden');
                        counterBox.classList.add('flex');
                    }
                }
            },

            startTool: function (tool, customData = null) {
                const baseData = this.DB[tool] || [];
                const dataToUse = customData ? [...customData] : JSON.parse(JSON.stringify(baseData));

                if (dataToUse.length === 0) return;

                this.state.currentTool = tool;
                this.state.index = 0;
                this.state.score = 0;
                this.state.failedQuestions = [];
                this.state.activeData = dataToUse;

                if (tool === 'laboratorio') {
                    this.state.totalQuestions = dataToUse.reduce((acc, curr) => acc + curr.parts.length, 0);
                } else {
                    this.state.totalQuestions = dataToUse.length;
                }

                if (!customData && tool !== 'formulas') {
                    this.shuffleArray(this.state.activeData);
                }

                this.updateCounter();
                this.showView(tool);

                if (tool === 'quiz') this.renderQuiz();
                if (tool === 'laboratorio') this.renderLaboratorio();
                if (tool === 'formulas') this.renderFormulas();
            },

            updateCounter: function () {
                const counter = document.getElementById('global-counter');
                if (counter && this.state.activeData.length > 0) {
                    counter.innerText = `${this.state.index + 1}/${this.state.activeData.length}`;
                }
            },

            shuffleArray: function (arr) {
                for (let i = arr.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [arr[i], arr[j]] = [arr[j], arr[i]];
                }
            },

            finishSession: function() {
                this.showResults();
            },

            // --- LÓGICA QUIZ ---
            renderQuiz: function () {
                const data = this.state.activeData[this.state.index];
                if (!data) return;
                
                document.getElementById('quiz-question').innerHTML = data.q;
                document.getElementById('quiz-feedback').classList.add('hidden');
                document.getElementById('quiz-hint-box').classList.add('hidden');
                
                const container = document.getElementById('quiz-options');
                container.innerHTML = '';
                
                data.options.forEach((opt, i) => {
                    const btn = document.createElement('button');
                    btn.className = "option-btn w-full text-left p-4 rounded-xl bg-white flex items-center gap-4 font-semibold text-slate-700 shadow-sm";
                    btn.innerHTML = `<span class="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs text-slate-400 font-bold shrink-0">${String.fromCharCode(65 + i)}</span> <div class="math-content">${opt}</div>`;
                    btn.onclick = () => this.quizCheck(i, btn);
                    container.appendChild(btn);
                });

                this.renderMath();
            },

            quizToggleHint: function () {
                const box = document.getElementById('quiz-hint-box');
                const data = this.state.activeData[this.state.index];
                if (data && data.hint) {
                    box.innerHTML = `<span class="font-bold">Pista:</span> ${data.hint}`;
                    box.classList.toggle('hidden');
                    this.renderMath();
                }
            },

            quizCheck: function (idx, clickedBtn) {
                const data = this.state.activeData[this.state.index];
                const btns = document.getElementById('quiz-options').querySelectorAll('button');
                btns.forEach(b => b.disabled = true);
                
                const feedback = document.getElementById('quiz-feedback');
                feedback.classList.remove('hidden');
                
                if (idx === data.correct) {
                    this.state.score++;
                    clickedBtn.classList.add('bg-emerald-50', 'border-emerald-500', 'text-emerald-700');
                    document.getElementById('quiz-feedback-title').innerText = "¡Correcto!";
                    document.getElementById('quiz-feedback-title').className = "font-black text-xl text-emerald-600";
                    document.getElementById('quiz-feedback-icon').innerHTML = '<i class="ph-fill ph-check-circle text-emerald-500"></i>';
                } else {
                    this.state.failedQuestions.push(data);
                    clickedBtn.classList.add('bg-red-50', 'border-red-500', 'text-red-700');
                    btns[data.correct].classList.add('bg-emerald-50', 'border-emerald-500', 'ring-2', 'ring-emerald-200');
                    document.getElementById('quiz-feedback-title').innerText = "Incorrecto";
                    document.getElementById('quiz-feedback-title').className = "font-black text-xl text-red-600";
                    document.getElementById('quiz-feedback-icon').innerHTML = '<i class="ph-fill ph-x-circle text-red-500"></i>';
                }
                
                document.getElementById('quiz-explanation').innerHTML = data.explanation;
                this.renderMath();
            },

            quizNext: function () {
                this.state.index++;
                if (this.state.index < this.state.activeData.length) {
                    this.renderQuiz();
                    this.updateCounter();
                } else this.showResults();
            },

            // --- LÓGICA LABORATORIO ---
            renderLaboratorio: function () {
                const data = this.state.activeData[this.state.index];
                if (!data) return;
                
                document.getElementById('lab-problem-number').innerText = this.state.index + 1;
                document.getElementById('lab-main-title').innerText = data.title;
                document.getElementById('lab-context-box').innerHTML = data.context;
                
                const container = document.getElementById('lab-parts-container');
                container.innerHTML = '';
                
                data.parts.forEach((part, i) => {
                    const partId = `lab-part-${this.state.index}-${i}`;
                    const letter = part.label.replace(')', '').toLowerCase();
                    
                    const html = `
                        <div class="p-6 md:p-8 border-b border-slate-100 last:border-0">
                            <div class="flex gap-4 items-start mb-6">
                                <div class="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex justify-center items-center font-bold shrink-0 mt-1">${letter}</div>
                                <div class="text-slate-800 font-semibold text-lg math-content pt-1">${part.question}</div>
                            </div>
                            
                            <div class="flex flex-wrap gap-4 items-center pl-0 md:pl-12">
                                <input type="text" id="input-${partId}" class="w-full md:w-64 p-3 rounded-xl border-2 border-slate-200 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 transition text-lg font-mono shadow-sm" placeholder="Respuesta...">
                                <button id="btn-${partId}" onclick="app.labCheckPart(${this.state.index}, ${i})" class="bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-xl font-bold uppercase tracking-wider text-sm transition shadow-md w-full md:w-auto">Verificar</button>
                            </div>
                            
                            <div id="feedback-${partId}" class="hidden pl-0 md:pl-12 mt-4 animate-fadeIn">
                                <div id="feedback-box-${partId}" class="flex items-start gap-3 p-4 rounded-xl">
                                    <div id="icon-${partId}" class="text-2xl shrink-0 mt-1"></div>
                                    <div class="w-full">
                                        <h4 id="title-${partId}" class="font-bold mb-2"></h4>
                                        <div class="text-sm font-mono bg-slate-800 text-slate-200 p-4 rounded-lg overflow-x-auto math-content shadow-inner border border-slate-700">
                                            <span class="text-slate-400 text-[10px] uppercase font-sans font-bold tracking-widest block mb-2">Desarrollo Matemático</span>
                                            ${part.explanation}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
                    container.insertAdjacentHTML('beforeend', html);
                });
                
                this.renderMath();
            },

            labCheckPart: function (problemIdx, partIdx) {
                const problem = this.state.activeData[problemIdx];
                const part = problem.parts[partIdx];
                const partId = `lab-part-${problemIdx}-${partIdx}`;

                const input = document.getElementById(`input-${partId}`);
                const btn = document.getElementById(`btn-${partId}`);
                const feedback = document.getElementById(`feedback-${partId}`);
                const feedbackBox = document.getElementById(`feedback-box-${partId}`);
                const icon = document.getElementById(`icon-${partId}`);
                const title = document.getElementById(`title-${partId}`);

                const rawVal = input.value.trim().replace(',', '.');
                const userVal = parseFloat(rawVal);
                
                if (rawVal === "" || isNaN(userVal)) {
                    input.classList.add('ring-2', 'ring-red-400');
                    setTimeout(() => input.classList.remove('ring-2', 'ring-red-400'), 500);
                    return; 
                }

                input.disabled = true;
                btn.disabled = true;
                btn.classList.remove('hover:bg-indigo-700', 'bg-indigo-600');
                btn.classList.add('bg-slate-300', 'text-slate-500', 'cursor-not-allowed', 'shadow-none');
                
                feedback.classList.remove('hidden');

                const diff = Math.abs(userVal - part.correctValue);
                const isCorrect = diff <= part.tolerance;

                if (isCorrect) {
                    this.state.score++;
                    input.classList.add('border-emerald-400', 'bg-emerald-50', 'text-emerald-700');
                    feedbackBox.className = "flex items-start gap-3 p-4 rounded-xl bg-emerald-50 border border-emerald-200";
                    title.innerText = "¡Cálculo Exacto!";
                    title.className = "font-black text-emerald-600";
                    icon.innerHTML = '<i class="ph-fill ph-check-circle text-emerald-500"></i>';
                } else {
                    input.classList.add('border-red-400', 'bg-red-50', 'text-red-700');
                    feedbackBox.className = "flex items-start gap-3 p-4 rounded-xl bg-red-50 border border-red-200";
                    title.innerText = `Cálculo Incorrecto. Respuesta esperada: ${part.correctValue} (±${part.tolerance})`;
                    title.className = "font-black text-red-600";
                    icon.innerHTML = '<i class="ph-fill ph-x-circle text-red-500"></i>';
                }

                this.renderMath();
            },

            labNext: function () {
                this.state.index++;
                if (this.state.index < this.state.activeData.length) {
                    this.renderLaboratorio();
                    this.updateCounter();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                } else this.showResults();
            },

            // --- LÓGICA FÓRMULAS ---
            renderFormulas: function () {
                const grid = document.getElementById('formulas-grid');
                grid.innerHTML = '';
                
                this.state.activeData.forEach(data => {
                    const card = document.createElement('div');
                    card.className = "glass-card p-6 rounded-2xl border-t-4 border-indigo-500 hover:shadow-lg transition-shadow bg-white flex flex-col justify-between items-center text-center h-full";
                    card.innerHTML = `
                        <span class="text-xs font-bold text-indigo-500 uppercase tracking-widest mb-4 w-full border-b border-slate-100 pb-2">${data.q}</span>
                        <div class="text-2xl font-medium text-slate-800 math-content w-full overflow-x-auto py-4 flex-grow flex items-center justify-center">${data.a}</div>
                    `;
                    grid.appendChild(card);
                });

                this.renderMath();
            },

            // --- RESULTADOS GLOBALES ---
            showResults: function () {
                this.showView('results');
                const resultText = document.getElementById('result-text');
                
                if (this.state.currentTool === 'flashcards' || this.state.currentTool === 'formulas') {
                    resultText.innerHTML = `Has repasado <strong>${this.state.activeData.length}</strong> fórmulas.`;
                } else {
                    resultText.innerHTML = `Has acertado <strong>${this.state.score}</strong> de <strong>${this.state.totalQuestions}</strong>.`;
                }

                const failBtn = document.getElementById('btn-retry-errors');
                if (this.state.failedQuestions.length > 0 && this.state.currentTool !== 'formulas') {
                    failBtn.classList.remove('hidden');
                    document.getElementById('fail-count').innerText = this.state.failedQuestions.length;
                } else {
                    failBtn.classList.add('hidden');
                }
            },

            retryErrors: function () { 
                this.startTool(this.state.currentTool, this.state.failedQuestions); 
            }
        };

        // Iniciar en Home al cargar
                // --- NAVEGACIÓN ENTRE TEMAS ---
        function setupThemeNavigation() {
            const courseId = "__COURSE_ID__";
            const folderId = "__FOLDER_ID__";
            const subjectId = "__SUBJECT_ID__";
            const shortId = "__SHORT_ID__";
            const currentKey = "__TEMA_KEY__";
            const themeNames = __THEME_NAMES_JSON__;
            
            const keys = Object.keys(themeNames);
            const sortedKeys = keys.map(k => {
                const parts = k.split('.').map(Number);
                return { key: k, parts: parts };
            }).sort((a, b) => {
                for (let i = 0; i < Math.max(a.parts.length, b.parts.length); i++) {
                    const pa = a.parts[i] !== undefined ? a.parts[i] : 0;
                    const pb = b.parts[i] !== undefined ? b.parts[i] : 0;
                    if (pa !== pb) return pa - pb;
                }
                return 0;
            }).map(x => x.key);

            const currentIdx = sortedKeys.indexOf(currentKey);
            const container = document.getElementById('theme-navigation-container');
            if (!container || currentIdx === -1) return;

            const prevKey = sortedKeys[currentIdx - 1];
            const nextKey = sortedKeys[currentIdx + 1];
            const isLastTheme = currentIdx === sortedKeys.length - 1;

            let prevButtonHTML = '';
            if (prevKey) {
                const temaFilePart = String(prevKey).replace(/\./g, '-');
                const prevUrl = `../../../temas/${encodeURIComponent(courseId)}/${encodeURIComponent(folderId)}/${shortId}-tema-${temaFilePart}.html`;
                prevButtonHTML = `
                    <a href="${prevUrl}" class="flex-1 py-4 border border-slate-200 text-slate-600 rounded-2xl font-bold hover:bg-slate-50 transition text-sm flex items-center justify-center gap-2 bg-white shadow-sm hover:border-slate-300">
                        <i class="ph-bold ph-arrow-left"></i> Tema Anterior (${prevKey})
                    </a>
                `;
            } else {
                prevButtonHTML = `<div class="flex-1"></div>`;
            }

            let nextButtonHTML = '';
            if (nextKey) {
                const temaFilePart = String(nextKey).replace(/\./g, '-');
                const nextUrl = `../../../temas/${encodeURIComponent(courseId)}/${encodeURIComponent(folderId)}/${shortId}-tema-${temaFilePart}.html`;
                nextButtonHTML = `
                    <a href="${nextUrl}" class="flex-1 py-4 text-white rounded-2xl font-bold transition text-sm flex items-center justify-center gap-2 shadow-lg bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700" style="box-shadow: 0 8px 25px rgba(2, 132, 199, 0.3);">
                        Tema Siguiente (${nextKey}) <i class="ph-bold ph-arrow-right"></i>
                    </a>
                `;
            } else if (isLastTheme) {
                nextButtonHTML = `
                    <a href="../../../index.html?asignatura=${subjectId}" class="flex-1 py-4 text-white rounded-2xl font-bold transition text-sm flex items-center justify-center gap-2 shadow-lg bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700" style="box-shadow: 0 8px 25px rgba(2, 132, 199, 0.3);">
                        <i class="ph-bold ph-trophy"></i> Ir al Examen Final <i class="ph-bold ph-arrow-right"></i>
                    </a>
                `;
            } else {
                nextButtonHTML = `<div class="flex-1"></div>`;
            }

            container.innerHTML = prevButtonHTML + nextButtonHTML;
        }

        // Iniciar en Home al cargar
        window.onload = () => {
            app.showView('home');
            setupThemeNavigation();
        };
    </script>
</body>
</html>"""

def generate_mc_options(correct_val, question_text, tolerance):
    val_str = str(correct_val)
    
    # Caso binario o booleano (0 o 1 con tolerancia 0)
    if correct_val in (0, 1) and tolerance == 0:
        options = ["0", "1"]
        correct_idx = 0 if correct_val == 0 else 1
        return options, correct_idx

    # Determinar decimales
    if '.' in val_str:
        decimals = len(val_str.split('.')[1])
    else:
        decimals = 0

    val = float(correct_val)
    distractors = set()
    
    # Definir el paso de variación basado en la tolerancia
    step = tolerance if tolerance > 0 else (0.1 if decimals > 0 else 1.0)
    if step == 0:
        step = 0.01

    # Multiplicadores para generar las opciones incorrectas
    multipliers = [1, -1, 2, -2, 3, -3, 1.5, -1.5, 2.5, -2.5, 0.5, -0.5]
    random.shuffle(multipliers)
    
    for mult in multipliers:
        # Generar distractor con cierta aleatoriedad y precisión correcta
        d = round(val + mult * step * (1 + random.random() * 0.15), decimals)
        if d != val and d not in distractors:
            # Evitar números negativos si el valor correcto es estrictamente positivo
            if val >= 0 and d < 0:
                continue
            distractors.add(d)
        if len(distractors) == 3:
            break

    # Rellenar en caso de que no se hayan generado 3 distractores únicos
    fallback_step = 1 if decimals == 0 else (10 ** -decimals)
    while len(distractors) < 3:
        for mult in [1, -1, 2, -2, 3, -3, 4, -4]:
            d = round(val + mult * fallback_step, decimals)
            if d != val and d not in distractors:
                if val >= 0 and d < 0:
                    continue
                distractors.add(d)
            if len(distractors) == 3:
                break

    options_list = list(distractors)
    
    # Formatear todos las opciones como cadenas de texto con la misma precisión
    if decimals == 0:
        correct_str = str(int(val))
        options_strs = [str(int(x)) for x in options_list]
    else:
        fmt = f"{{:.{decimals}f}}"
        correct_str = fmt.format(val)
        options_strs = [fmt.format(x) for x in options_list]

    all_options = [correct_str] + options_strs
    random.shuffle(all_options)
    
    correct_idx = all_options.index(correct_str)
    return all_options, correct_idx

def fetch_url(url):
    req = urllib.request.Request(url, headers={
        'User-Agent': UA,
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'es-ES,es;q=0.9',
    })
    with urllib.request.urlopen(req, timeout=30) as res:
        return res.read().decode('utf-8')

def find_embedded_html(html_content):
    """Find the embedded HTML string inside astro-island props that contains 'const app ='"""
    pattern = r'props="([^"]+)"'
    matches = re.findall(pattern, html_content)
    for m in matches:
        decoded = html.unescape(m)
        try:
            data = json.loads(decoded)
            def find_app(obj):
                if isinstance(obj, str) and ('const app =' in obj or 'const appDB =' in obj or 'jsonTestA' in obj):
                    return obj
                if isinstance(obj, dict):
                    for v in obj.values():
                        r = find_app(v)
                        if r: return r
                if isinstance(obj, list):
                    for item in obj:
                        r = find_app(item)
                        if r: return r
                return None
            found = find_app(data)
            if found:
                return found
        except:
            pass
    return None

def extract_app_js_block(embedded_html):
    """
    From the embedded HTML string (which may be a full page), find the script tag
    containing the app definition and return the entire script block.
    """
    script_pattern = r'<script[^>]*?>([\s\S]*?)</script>'
    scripts = re.findall(script_pattern, embedded_html, re.IGNORECASE)
    
    for script_code in scripts:
        if 'const app =' in script_code or 'const appDB =' in script_code or 'jsonTestA' in script_code:
            return script_code

    start_idx = embedded_html.find('const app = {')
    if start_idx == -1:
        start_idx = embedded_html.find('const appDB =')
    if start_idx == -1:
        start_idx = embedded_html.find('const jsonTestA =')
    if start_idx == -1:
        raise RuntimeError("'const app = {' or 'const jsonTestA =' not found in embedded HTML")
    
    # Fallback substring
    return embedded_html[start_idx:]

def extract_raw_arrays_via_node(app_js_block, tema_key):
    """Run app JS block in Node.js sandbox and extract the 4 raw arrays"""
    node_code = f"""
const vm = require('vm');
const jsContent = {json.dumps(app_js_block)};
try {{
    const sandbox = {{
        window: {{}},
        document: {{
            getElementById: () => ({{ classList: {{ toggle: () => {{}}, add: () => {{}}, remove: () => {{}} }}, style: {{}}, innerHTML: '', innerText: '', value: '' }}),
            addEventListener: () => {{}},
            querySelectorAll: () => []
        }},
        console: console,
        localStorage: {{ getItem: () => null, setItem: () => {{}} }},
        setTimeout: () => {{}},
        clearInterval: () => {{}},
        setInterval: () => 0
    }};
    sandbox.global = sandbox;
    vm.createContext(sandbox);
    
    // Evaluate the JS content and extract the raw variables
    const evalCode = jsContent + '\\n' +
        'global.extracted_data = {{' +
        '  jsonTestA: (typeof jsonTestA !== "undefined") ? jsonTestA : [],' +
        '  jsonTestB: (typeof jsonTestB !== "undefined") ? jsonTestB : [],' +
        '  jsonLaboratorio: (typeof jsonLaboratorio !== "undefined") ? jsonLaboratorio : [],' +
        '  jsonFormulas: (typeof jsonFormulas !== "undefined") ? jsonFormulas : []' +
        '}};';
        
    vm.runInContext(evalCode, sandbox);
    const data = sandbox.extracted_data;
    if (data) {{
        process.stdout.write(JSON.stringify(data));
    }} else {{
        process.stderr.write('Extracted data not found after evaluation');
        process.exit(1);
    }}
}} catch(e) {{
    process.stderr.write('Error: ' + e.message);
    process.exit(1);
}}
"""
    safe_key = tema_key.replace('.', '_')
    tmp_node = os.path.join(JSON_DIR, f"_tmp_{safe_key}.js")
    with open(tmp_node, 'w', encoding='utf-8') as f:
        f.write(node_code)
    result = subprocess.run(['node', tmp_node], capture_output=True, text=True, encoding='utf-8', timeout=30)
    if os.path.exists(tmp_node):
        os.remove(tmp_node)
    if result.returncode != 0:
        raise RuntimeError(result.stderr[:600])
    return json.loads(result.stdout)

# Obsolete files to clean up
obsolete_jsons = [
    "fundamentos-de-estadistica-tema-3-1.json",
    "fundamentos-de-estadistica-tema-3-2.json",
    "fundamentos-de-estadistica-tema-6-1.json",
    "fundamentos-de-estadistica-tema-6-2.json",
]
obsolete_htmls = [
    "fundamentos-de-estadistica-tema-3-1.html",
    "fundamentos-de-estadistica-tema-3-2.html",
    "fundamentos-de-estadistica-tema-6-1.html",
    "fundamentos-de-estadistica-tema-6-2.html",
]

print("Limpiando archivos obsoletos...")
for f in obsolete_jsons:
    p = os.path.join(JSON_DIR, f)
    if os.path.exists(p):
        os.remove(p)
        print(f"  -> Eliminado: {f}")
for f in obsolete_htmls:
    p = os.path.join(TEMAS_DIR, f)
    if os.path.exists(p):
        os.remove(p)
        print(f"  -> Eliminado: {f}")

all_global_quiz_questions = []
results = {}

for tema_key, url in URLS:
    tema_file = tema_key.replace('.', '-')
    json_out = os.path.join(JSON_DIR, f"{SUBJECT_ID}-tema-{tema_file}.json")
    html_out = os.path.join(TEMAS_DIR, f"{SHORT_ID}-tema-{tema_file}.html")
    tema_name = TEMA_NAMES[tema_key]
    
    print(f"\n{'='*60}")
    print(f"Procesando Tema {tema_key} - {tema_name}: {url}")
    
    try:
        print("  -> Descargando HTML...")
        page_html = fetch_url(url)
        print(f"  -> Tamaño HTML: {len(page_html)} bytes")
        
        print("  -> Buscando datos en props de Astro...")
        embedded = find_embedded_html(page_html)
        if not embedded:
            raise RuntimeError("No se encontró HTML embebido con props de datos")
        print(f"  -> Datos embebidos encontrados ({len(embedded)} caracteres)")
        
        print("  -> Extrayendo código JS...")
        app_js = extract_app_js_block(embedded)
        print(f"  -> Código JS extraído ({len(app_js)} caracteres)")
        
        print("  -> Evaluando variables en Node.js VM...")
        raw_data = extract_raw_arrays_via_node(app_js, tema_key)
        
        test_a_len = len(raw_data.get("jsonTestA", []))
        test_b_len = len(raw_data.get("jsonTestB", []))
        lab_len = len(raw_data.get("jsonLaboratorio", []))
        formulas_len = len(raw_data.get("jsonFormulas", []))
        print(f"  -> Datos extraídos: Test A ({test_a_len}) | Test B ({test_b_len}) | Lab ({lab_len}) | Fórmulas ({formulas_len})")
        
        # Save raw JSON locally for consistency
        with open(json_out, 'w', encoding='utf-8') as f:
            json.dump(raw_data, f, ensure_ascii=False, indent=2)
        print(f"  -> JSON de respaldo guardado: {os.path.basename(json_out)}")
        
        # Accumulate quiz questions for global exam (preserves options, correct, explanation, hint, q)
        all_global_quiz_questions.extend(raw_data.get("jsonTestA", []))
        all_global_quiz_questions.extend(raw_data.get("jsonTestB", []))
        
        # Accumulate laboratory questions as multiple choice in global exam
        for problem in raw_data.get("jsonLaboratorio", []):
            title = problem.get("title", "")
            context = problem.get("context", "")
            for part in problem.get("parts", []):
                label = part.get("label", "")
                question = part.get("question", "")
                correct_val = part.get("correctValue")
                tolerance = part.get("tolerance", 0.0)
                explanation = part.get("explanation", "")
                
                # Consolidate text into HTML format
                q_html = f"<b>[Caso Práctico: {title}]</b><br/>{context}<br/><br/><b>Apartado {label}</b> {question}"
                
                # Generate options and correct index
                try:
                    options, correct_idx = generate_mc_options(correct_val, question, tolerance)
                    quiz_item = {
                        "q": q_html,
                        "options": options,
                        "correct": correct_idx,
                        "explanation": explanation,
                        "hint": f"Valor exacto esperado originalmente: {correct_val} (tolerancia: ±{tolerance})"
                    }
                    all_global_quiz_questions.append(quiz_item)
                except Exception as ex_mc:
                    print(f"    -> Warning: No se pudo generar opciones tipo test para el apartado {label} de '{title}': {ex_mc}")
        
        # Generate self-contained HTML
        test_a_str = json.dumps(raw_data.get("jsonTestA", []), ensure_ascii=False)
        test_b_str = json.dumps(raw_data.get("jsonTestB", []), ensure_ascii=False)
        lab_str = json.dumps(raw_data.get("jsonLaboratorio", []), ensure_ascii=False)
        formulas_str = json.dumps(raw_data.get("jsonFormulas", []), ensure_ascii=False)
        
        final_html = HTML_TEMPLATE
        final_html = final_html.replace("__TEMA_KEY__", tema_key)
        final_html = final_html.replace("__COURSE_ID__", "1º")
        final_html = final_html.replace("__FOLDER_ID__", "Fundamentos-Estadística")
        final_html = final_html.replace("__SUBJECT_ID__", "fundamentos-de-estadistica")
        final_html = final_html.replace("__SHORT_ID__", "fundamentos-de-estadistica")
        final_html = final_html.replace("__THEME_NAMES_JSON__", json.dumps(TEMA_NAMES, ensure_ascii=False))
        final_html = final_html.replace("__TEMA_NAME__", tema_name)
        final_html = final_html.replace("__JSON_TEST_A__", test_a_str)
        final_html = final_html.replace("__JSON_TEST_B__", test_b_str)
        final_html = final_html.replace("__JSON_LABORATORIO__", lab_str)
        final_html = final_html.replace("__JSON_FORMULAS__", formulas_str)
        
        with open(html_out, 'w', encoding='utf-8') as f:
            f.write(final_html)
        print(f"  -> HTML autocontenido creado: {os.path.basename(html_out)}")
        
        results[tema_key] = f"OK (A:{test_a_len}/B:{test_b_len}/L:{lab_len}/F:{formulas_len})"
        
    except Exception as e:
        print(f"  -> ERROR: {e}")
        results[tema_key] = f"ERROR: {e}"

# Compile and save Global Exam
print(f"\n{'='*60}")
print("Generando examen global de la asignatura...")
try:
    global_exam_path = os.path.join(JSON_DIR, f"{SUBJECT_ID}.json")
    global_exam_data = {
        "quiz": all_global_quiz_questions
    }
    with open(global_exam_path, 'w', encoding='utf-8') as f:
        json.dump(global_exam_data, f, ensure_ascii=False, indent=2)
    print(f"Examen global guardado con éxito: {os.path.basename(global_exam_path)} (Total preguntas: {len(all_global_quiz_questions)})")
except Exception as e:
    print(f"Error generando examen global: {e}")

print(f"\n{'='*60}")
print("RESUMEN DE EXTRACCIÓN:")
print(f"{'='*60}")
for k, v in results.items():
    ok = "ERROR" not in v
    print(f"  {'OK' if ok else 'XX'} Tema {k:5s}: {v}")
