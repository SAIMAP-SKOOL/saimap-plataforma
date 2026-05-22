// ====================================================================
// SAIMAP - LOADER ESPECIALIZADO PARA FUNDAMENTOS DE ESTADÍSTICA
// ====================================================================
// Modos: Test Teórico | Laboratorio | Fórmulas (KaTeX)
// Calculadora: enlace externo configurable vía tema-config
// ====================================================================

// --- CONFIGURACIÓN DE AUTENTICACIÓN ---
const REQUIRE_AUTH = true;

// --- SUBTÍTULOS DE TEMAS ---
const THEME_SUBTITLES = {
    'fundamentos-de-estadistica': {
        '1.1': 'Introducción a la Estadística',
        '1.2': 'Tipos de Variables y Escalas de Medida',
        '2.1': 'Distribuciones de Frecuencias',
        '2.2': 'Representaciones Gráficas',
        '3.1': 'Medidas de Centralización',
        '3.2': 'Medidas de Dispersión',
        '4.1': 'Distribución Normal',
        '4.2': 'Tipificación y Distribuciones Muestrales',
        '5.1': 'Correlación de Pearson',
        '5.2': 'Regresión Lineal Simple',
        '6.1': 'Contraste de Hipótesis',
        '6.2': 'Pruebas t y ANOVA'
    }
};

// --- TEMA VISUAL ---
const ESTADISTICA_THEME = {
    name: 'Fundamentos de Estadística',
    icon: 'ph-chart-bar',
    bg: '#f0f9ff',
    gradients: 'radial-gradient(at 0% 0%, hsla(200,80%,95%,1) 0,transparent 50%),radial-gradient(at 50% 0%, hsla(215,80%,95%,1) 0,transparent 50%),radial-gradient(at 100% 0%, hsla(185,80%,95%,1) 0,transparent 50%)',
    primary: '#0284c7',
    primaryGrad: 'linear-gradient(135deg, #0284c7 0%, #0ea5e9 50%, #38bdf8 100%)',
    primaryShadow: 'rgba(2, 132, 199, 0.4)',
    accent: '#0ea5e9',
    accentBg: '#f0f9ff',
    accentLight: '#e0f2fe',
    textAccent: '#0284c7',
    titleGradient: 'from-sky-500 to-cyan-500',
    borderCard: 'border-b-sky-500',
    borderCardAlt: 'border-b-cyan-500',
};

// --- VARIABLES GLOBALES ---
let SUBJECT_ID = '';
let TEMA_KEY = '';
let COURSE_ID = '1º';
let FOLDER_ID = 'Estadística';
let CALC_URL = 'https://www.desmos.com/scientific';

// ====================================================================
// HTML BASE DE LA UI
// ====================================================================
const LAYOUT_HTML = `
    <!-- Header Global -->
    <header class="glass-card sticky top-0 z-50 px-6 py-4">
        <div class="max-w-6xl mx-auto flex justify-between items-center">
            <div class="flex items-center gap-3 cursor-pointer" onclick="app.showView('home')">
                <div id="header-icon-bg" class="text-white p-2 rounded-lg shadow-lg">
                    <i id="header-icon" class="ph-bold ph-chart-bar text-2xl"></i>
                </div>
                <div>
                    <h1 id="header-title" class="font-extrabold text-xl tracking-tight text-slate-800">Cargando...</h1>
                    <p id="header-subtitle" class="text-[9px] uppercase tracking-widest font-bold"></p>
                </div>
            </div>

            <div class="flex items-center gap-3">
                <a href="../../../index.html" id="back-btn"
                   class="flex items-center gap-1.5 px-3.5 py-2 border border-slate-200 rounded-xl font-bold text-xs text-slate-600 transition-all bg-white shadow-sm">
                    <i class="ph-bold ph-arrow-left"></i> Volver al Portal
                </a>
                <a id="calc-btn" href="#" target="_blank" rel="noopener noreferrer"
                   class="flex items-center gap-1.5 px-4 py-2 rounded-xl font-bold text-xs text-white shadow-sm transition-all"
                   style="background: linear-gradient(135deg, #0284c7, #0ea5e9);">
                    <i class="ph-bold ph-calculator"></i> Calculadora
                </a>
                <nav id="nav-controls" class="hidden flex items-center gap-4">
                    <button onclick="app.showView('home')" class="text-slate-500 font-bold text-xs uppercase tracking-widest flex items-center gap-1 transition">
                        <i class="ph-bold ph-house"></i> Menú
                    </button>
                    <div class="h-4 w-[1px] bg-slate-200"></div>
                    <div class="flex items-center gap-2 bg-white/60 px-3 py-1.5 rounded-full border border-white">
                        <span id="global-counter" class="font-bold font-mono text-sm">0/0</span>
                    </div>
                </nav>
            </div>
        </div>
    </header>

    <!-- Main Container -->
    <main class="flex-grow max-w-5xl w-full mx-auto p-6 flex flex-col items-center justify-center">

        <!-- VIEW: LOADING -->
        <section id="view-loading" class="fade-in w-full flex flex-col items-center justify-center py-20">
            <div class="animate-spin w-12 h-12 border-4 border-slate-200 border-t-sky-500 rounded-full mb-6"></div>
            <p class="text-slate-500 font-semibold">Cargando contenido...</p>
        </section>

        <!-- VIEW: ERROR -->
        <section id="view-error" class="hidden fade-in w-full flex flex-col items-center justify-center py-20">
            <div class="glass-card rounded-3xl p-12 text-center max-w-md">
                <i class="ph-bold ph-warning-circle text-5xl text-red-400 mb-4"></i>
                <h2 class="text-2xl font-bold text-slate-800 mb-2">Error al cargar</h2>
                <p id="error-message" class="text-slate-500 mb-6">No se pudieron cargar los datos.</p>
                <a href="../../../index.html" class="btn-primary py-3 px-8 rounded-xl inline-block">Volver al Portal</a>
            </div>
        </section>

        <!-- VIEW: HOME (MENÚ) -->
        <section id="view-home" class="hidden fade-in w-full">
            <div class="text-center mb-12">
                <h1 id="saimap-title" class="text-6xl md:text-8xl font-black text-transparent bg-clip-text mb-8 tracking-tighter opacity-80 select-none">SAIMAP</h1>
                <h2 class="text-3xl md:text-4xl font-extrabold text-slate-800 mb-4">¿Cómo quieres practicar hoy?</h2>
                <p class="text-slate-500">Selecciona la herramienta que mejor se adapte a tu objetivo de estudio.</p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                <div onclick="app.startTool('quiz')" class="glass-card p-8 rounded-3xl cursor-pointer hover:scale-105 transition-all group border-b-4" id="card-quiz">
                    <div id="icon-quiz" class="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition">
                        <i class="ph-bold ph-list-checks text-3xl"></i>
                    </div>
                    <h3 class="text-xl font-bold mb-2">Test Teórico</h3>
                    <p class="text-sm text-slate-500 leading-relaxed">Preguntas de opción múltiple sobre conceptos y propiedades estadísticas.</p>
                </div>

                <div onclick="app.startTool('lab')" class="glass-card p-8 rounded-3xl cursor-pointer hover:scale-105 transition-all group border-b-4" id="card-lab">
                    <div id="icon-lab" class="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition">
                        <i class="ph-bold ph-calculator text-3xl"></i>
                    </div>
                    <h3 class="text-xl font-bold mb-2">Laboratorio</h3>
                    <p class="text-sm text-slate-500 leading-relaxed">Ejercicios de cálculo numérico con escenarios guiados paso a paso.</p>
                </div>

                <div onclick="app.startTool('formulas')" class="glass-card p-8 rounded-3xl cursor-pointer hover:scale-105 transition-all group border-b-4" id="card-formulas">
                    <div id="icon-formulas" class="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition">
                        <i class="ph-bold ph-math-operations text-3xl"></i>
                    </div>
                    <h3 class="text-xl font-bold mb-2">Fórmulas</h3>
                    <p class="text-sm text-slate-500 leading-relaxed">Glosario completo de fórmulas matemáticas para consultar rápidamente.</p>
                </div>
            </div>
        </section>

        <!-- ======================================================= -->
        <!-- VIEW: QUIZ (Test Teórico) -->
        <!-- ======================================================= -->
        <section id="view-quiz-setup" class="hidden fade-in w-full flex flex-col items-center">
            <div class="glass-card rounded-3xl p-10 max-w-lg w-full border-2 border-white shadow-xl">
                <div id="quiz-setup-bar" class="absolute top-0 left-0 w-full h-1 rounded-t-3xl"></div>
                <div class="flex items-center gap-4 mb-8">
                    <div id="quiz-setup-icon" class="w-14 h-14 rounded-2xl flex items-center justify-center">
                        <i class="ph-bold ph-list-checks text-2xl"></i>
                    </div>
                    <div>
                        <h2 class="text-2xl font-extrabold text-slate-800">Test Teórico</h2>
                        <p id="quiz-count" class="text-sm text-slate-500"></p>
                    </div>
                </div>
                <div class="space-y-4 mb-8">
                    <div class="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                        <label class="block text-xs font-bold text-slate-500 uppercase mb-3">Número de preguntas</label>
                        <div class="flex gap-2 flex-wrap">
                            <button onclick="app.setQuizN(10)" id="qn-10" class="px-4 py-2 rounded-xl text-sm font-bold border-2 border-slate-200 hover:border-sky-400 transition">10</button>
                            <button onclick="app.setQuizN(20)" id="qn-20" class="px-4 py-2 rounded-xl text-sm font-bold border-2 border-sky-400 bg-sky-50 text-sky-700">20</button>
                            <button onclick="app.setQuizN(40)" id="qn-40" class="px-4 py-2 rounded-xl text-sm font-bold border-2 border-slate-200 hover:border-sky-400 transition">40</button>
                            <button onclick="app.setQuizN(9999)" id="qn-all" class="px-4 py-2 rounded-xl text-sm font-bold border-2 border-slate-200 hover:border-sky-400 transition">Todas</button>
                        </div>
                    </div>
                </div>
                <button onclick="app.startQuiz()" class="btn-primary w-full py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2">
                    <i class="ph-bold ph-play-circle text-xl"></i> Comenzar Test
                </button>
                <button onclick="app.showView('home')" class="mt-4 text-xs text-slate-400 hover:text-slate-600 font-bold uppercase tracking-wider transition w-full text-center">Volver al Menú</button>
            </div>
        </section>

        <section id="view-quiz" class="hidden fade-in w-full flex flex-col items-center">
            <div class="glass-card rounded-3xl p-8 max-w-2xl w-full border-2 border-white shadow-xl relative overflow-hidden">
                <div id="quiz-play-bar" class="absolute top-0 left-0 h-1 transition-all duration-500" style="width:0%"></div>
                <div class="flex items-center justify-between mb-6">
                    <span id="quiz-progress-label" class="text-xs font-bold text-slate-500 uppercase">Pregunta 1/20</span>
                    <span id="quiz-score-label" class="text-xs font-bold text-slate-500 uppercase">Aciertos: 0</span>
                </div>
                <p id="quiz-question" class="text-lg font-bold text-slate-800 mb-6 leading-relaxed"></p>
                <div id="quiz-options" class="space-y-3"></div>
                <div id="quiz-feedback" class="hidden mt-5 p-4 rounded-2xl text-sm font-medium leading-relaxed"></div>
                <button id="quiz-next-btn" onclick="app.quizNext()" class="hidden btn-primary w-full mt-5 py-3.5 rounded-2xl font-bold flex items-center justify-center gap-2">
                    Siguiente <i class="ph-bold ph-arrow-right"></i>
                </button>
            </div>
        </section>

        <!-- ======================================================= -->
        <!-- VIEW: LABORATORIO -->
        <!-- ======================================================= -->
        <section id="view-lab-home" class="hidden fade-in w-full flex flex-col items-center">
            <div class="glass-card rounded-3xl p-10 max-w-lg w-full border-2 border-white shadow-xl">
                <div class="flex items-center gap-4 mb-6">
                    <div id="lab-icon" class="w-14 h-14 rounded-2xl flex items-center justify-center">
                        <i class="ph-bold ph-calculator text-2xl"></i>
                    </div>
                    <div>
                        <h2 class="text-2xl font-extrabold text-slate-800">Laboratorio</h2>
                        <p id="lab-count" class="text-sm text-slate-500"></p>
                    </div>
                </div>
                <p class="text-slate-500 text-sm mb-8 leading-relaxed">Resuelve problemas con escenarios reales paso a paso. Puedes usar la calculadora científica del botón superior en cualquier momento.</p>
                <button onclick="app.startLab()" class="btn-primary w-full py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2">
                    <i class="ph-bold ph-flask text-xl"></i> Comenzar Laboratorio
                </button>
                <button onclick="app.showView('home')" class="mt-4 text-xs text-slate-400 hover:text-slate-600 font-bold uppercase tracking-wider transition w-full text-center">Volver al Menú</button>
            </div>
        </section>

        <section id="view-lab" class="hidden fade-in w-full flex flex-col items-center">
            <div class="w-full max-w-2xl space-y-5">
                <!-- Escenario -->
                <div class="glass-card rounded-3xl p-6 border-2 border-white shadow-xl">
                    <div class="flex items-center gap-3 mb-3">
                        <span id="lab-problem-badge" class="px-3 py-1 rounded-full text-xs font-bold text-white">Problema 1/3</span>
                        <h3 id="lab-problem-title" class="font-extrabold text-slate-800"></h3>
                    </div>
                    <div class="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                        <p class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2"><i class="ph-bold ph-scroll"></i> Enunciado</p>
                        <p id="lab-scenario" class="text-slate-700 text-sm leading-relaxed font-medium"></p>
                    </div>
                </div>

                <!-- Pregunta activa -->
                <div class="glass-card rounded-3xl p-6 border-2 border-white shadow-xl">
                    <div class="flex items-center justify-between mb-4">
                        <span id="lab-q-badge" class="text-xs font-bold uppercase tracking-wider text-slate-500">Pregunta 1/2</span>
                        <span id="lab-attempts-badge" class="text-xs font-bold text-slate-400">Intentos: 0/2</span>
                    </div>
                    <p id="lab-question" class="font-bold text-slate-800 text-base mb-5 leading-relaxed"></p>

                    <div id="lab-input-area" class="flex gap-3">
                        <input type="number" id="lab-answer-input" step="any" placeholder="Escribe tu respuesta..."
                               onkeypress="if(event.key==='Enter') app.labCheck()"
                               class="flex-1 px-4 py-3 rounded-2xl border-2 border-slate-200 focus:outline-none focus:border-sky-400 font-bold text-slate-800 text-lg bg-white/60 transition" />
                        <button onclick="app.labCheck()" id="lab-check-btn"
                                class="btn-primary px-6 py-3 rounded-2xl font-bold flex items-center gap-2">
                            <i class="ph-bold ph-check-circle text-lg"></i> Comprobar
                        </button>
                    </div>

                    <div id="lab-feedback" class="hidden mt-4 p-4 rounded-2xl text-sm font-medium leading-relaxed"></div>
                    <button id="lab-next-q-btn" onclick="app.labNextQuestion()" class="hidden btn-primary w-full mt-4 py-3 rounded-2xl font-bold flex items-center justify-center gap-2">
                        Siguiente pregunta <i class="ph-bold ph-arrow-right"></i>
                    </button>
                </div>
            </div>
        </section>

        <!-- ======================================================= -->
        <!-- VIEW: FÓRMULAS -->
        <!-- ======================================================= -->
        <section id="view-formulas" class="hidden fade-in w-full">
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h2 class="text-2xl font-extrabold text-slate-800">Glosario de Fórmulas</h2>
                    <p class="text-sm text-slate-500 mt-1">Consulta rápida de fórmulas estadísticas organizadas por categoría.</p>
                </div>
                <div class="flex gap-2 flex-wrap" id="formula-filters"></div>
            </div>
            <div id="formulas-grid" class="grid grid-cols-1 md:grid-cols-2 gap-4"></div>
            <button onclick="app.showView('home')" class="mt-8 text-xs text-slate-400 hover:text-slate-600 font-bold uppercase tracking-wider transition w-full text-center">Volver al Menú</button>
        </section>

        <!-- ======================================================= -->
        <!-- VIEW: RESULTS -->
        <!-- ======================================================= -->
        <section id="view-results" class="hidden w-full fade-in flex flex-col items-center">
            <div class="glass-card rounded-3xl p-12 text-center max-w-xl w-full border-2 border-white shadow-xl relative overflow-hidden">
                <div id="results-bar" class="absolute top-0 left-0 w-full h-1"></div>
                <div id="results-trophy" class="w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-inner">
                    <i class="ph-bold ph-trophy text-5xl"></i>
                </div>
                <h2 class="text-3xl font-extrabold text-slate-800 mb-2">¡Sesión Completada!</h2>
                <p id="result-text" class="text-slate-600 mb-8 text-lg font-medium"></p>
                <div class="flex flex-col gap-3 w-full">
                    <button id="btn-retry-errors" onclick="app.retryErrors()" class="hidden w-full py-4 bg-red-500 hover:bg-red-600 text-white rounded-2xl font-bold transition flex items-center justify-center gap-2 shadow-lg shadow-red-100">
                        <i class="ph-bold ph-warning-circle text-lg"></i> Repasar Preguntas Falladas (<span id="fail-count">0</span>)
                    </button>
                    <button onclick="app.showView('home')" class="w-full py-4 glass-card hover:bg-slate-50 text-slate-700 rounded-2xl font-bold transition">Volver al Menú Principal</button>
                </div>
            </div>
        </section>

    </main>
`;

// ====================================================================
// CSS COMPARTIDO
// ====================================================================
const ESTADISTICA_CSS = `
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;800&display=swap');
    body { font-family: 'Outfit', sans-serif; background-attachment: fixed; min-height: 100vh; }
    .hidden { display: none !important; }
    .glass-card {
        background: rgba(255,255,255,0.75);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border: 1px solid rgba(255,255,255,0.9);
        box-shadow: 0 10px 40px -10px rgba(100,116,139,0.15);
    }
    .btn-primary {
        background-size: 200% 200%;
        transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
        color: white;
        font-weight: 700;
    }
    .btn-primary:hover:not(:disabled) { transform: translateY(-2px); }
    .fade-in { animation: fadeIn 0.5s ease-out forwards; }
    @keyframes fadeIn { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
    .katex-display { overflow-x: auto; overflow-y: hidden; padding: 8px 0; }
    .formula-card { transition: all 0.2s; }
    .formula-card:hover { transform: translateY(-2px); box-shadow: 0 12px 30px -8px rgba(2,132,199,0.15); }
    .lab-correct { background: #dcfce7; border-color: #22c55e; color: #166534; }
    .lab-wrong { background: #fee2e2; border-color: #ef4444; color: #991b1b; }
    .lab-hint { background: #fef3c7; border-color: #f59e0b; color: #92400e; }
    .lab-reveal { background: #ede9fe; border-color: #8b5cf6; color: #4c1d95; }
    .option-btn {
        width: 100%; text-align: left; padding: 0.875rem 1.25rem;
        border-radius: 1rem; font-weight: 600; font-size: 0.9rem;
        border: 2px solid #e2e8f0; background: white; cursor: pointer;
        transition: all 0.2s; color: #1e293b;
    }
    .option-btn:hover:not(:disabled) { transform: translateX(5px); }
    .option-correct { background: #dcfce7 !important; border-color: #22c55e !important; color: #166534 !important; }
    .option-wrong { background: #fee2e2 !important; border-color: #ef4444 !important; color: #991b1b !important; }
    .filter-btn { transition: all 0.2s; }
    .filter-btn.active { color: white; }
`;

// ====================================================================
// INICIALIZACIÓN
// ====================================================================
document.addEventListener("DOMContentLoaded", () => {

    // 1. Leer configuración embebida
    const configEl = document.getElementById('tema-config');
    if (!configEl) {
        const params = new URLSearchParams(window.location.search);
        SUBJECT_ID = params.get('asignatura') || '';
        TEMA_KEY = params.get('tema') || '';
        if (params.get('calc')) CALC_URL = params.get('calc');
    } else {
        try {
            const config = JSON.parse(configEl.textContent);
            SUBJECT_ID = config.asignaturaId || '';
            TEMA_KEY = config.temaKey || '';
            if (config.calcUrl) CALC_URL = config.calcUrl;
        } catch (e) { console.error("Error al parsear config:", e); }
    }

    if (!SUBJECT_ID || !TEMA_KEY) {
        renderErrorScreen('No se pudo encontrar la configuración de asignatura o tema.');
        return;
    }

    // 2. Autenticación con bypass para Tema 1 (modo freemium)
    window.isGuest = false;
    if (REQUIRE_AUTH) {
        const userEmail = localStorage.getItem('saimap_user_email');
        if (!userEmail) {
            const cleanKey = String(TEMA_KEY).replace(/-/g, '.');
            if (/^1(\.|$)/.test(cleanKey)) {
                window.isGuest = true;
            } else {
                window.location.href = "../../../index.html?lock=true&redirect=" + encodeURIComponent(window.location.href);
                return;
            }
        }
    }

    // 3. Cargar dependencias
    loadDependencies();

    // 4. Inyectar HTML
    document.body.className = "flex flex-col min-h-screen";
    document.body.innerHTML = LAYOUT_HTML;

    // 5. Banner de invitado
    if (window.isGuest) {
        const bannerHTML = `
            <div id="guest-sticky-banner" class="sticky top-0 z-[60] w-full bg-white/90 backdrop-blur-md border-b border-sky-100 py-3 px-4 text-center text-slate-700 text-xs md:text-sm font-bold shadow-sm flex items-center justify-center gap-2">
                <span>✨ Estás en el Tema 1 (Prueba Gratuita).</span>
                <a href="https://www.skool.com/saimap-ia-learning-4493/about" target="_blank" class="text-sky-600 hover:text-sky-800 underline">
                    Únete a la academia para desbloquear todos los temas
                </a>
            </div>`;
        document.body.insertAdjacentHTML('afterbegin', bannerHTML);
        const headerEl = document.querySelector('header');
        if (headerEl) headerEl.style.top = '45px';
    }

    // 6. Aplicar tema visual
    applyTheme();

    // 7. Cargar JSON
    const pathParts = decodeURIComponent(window.location.pathname).replace(/\\/g, '/').split('/');
    const temasIdx = pathParts.indexOf('temas');
    if (temasIdx !== -1 && pathParts.length > temasIdx + 2) {
        COURSE_ID = pathParts[temasIdx + 1];
        FOLDER_ID = pathParts[temasIdx + 2];
    }
    const temaFilePart = String(TEMA_KEY).replace(/\./g, '-');
    const fetchUrl = `../../../json/${encodeURIComponent(COURSE_ID)}/${encodeURIComponent(FOLDER_ID)}/${SUBJECT_ID}-tema-${temaFilePart}.json`;

    fetch(fetchUrl)
        .then(res => { if (!res.ok) throw new Error(`HTTP ${res.status}`); return res.json(); })
        .then(data => {
            app.DB = {
                quiz: data.quiz || [],
                lab: data.laboratorio || [],
                formulas: data.formulas || []
            };
            document.getElementById('view-loading').classList.add('hidden');
            app.showView('home');

            // Actualizar counts en menú
            const t = ESTADISTICA_THEME;
            document.getElementById('quiz-count').textContent = `${app.DB.quiz.length} preguntas disponibles`;
            document.getElementById('lab-count').textContent = `${app.DB.lab.length} problema(s) en este tema`;
        })
        .catch(err => {
            let msg = `No se pudo cargar el archivo de preguntas (<code>${fetchUrl}</code>).<br><br>`;
            if (window.location.protocol === 'file:') {
                msg += `<strong>Causa:</strong> Abre la plataforma desde GitHub Pages o un servidor local.`;
            } else {
                msg += `<strong>Detalle:</strong> ${err.message}`;
            }
            renderErrorScreen(msg);
        });
});

// ====================================================================
// FUNCIONES AUXILIARES
// ====================================================================
function loadDependencies() {
    if (!window.tailwind) {
        const tw = document.createElement('script');
        tw.src = "https://cdn.tailwindcss.com";
        document.head.appendChild(tw);
    }
    const ph = document.createElement('script');
    ph.src = "https://unpkg.com/@phosphor-icons/web";
    document.head.appendChild(ph);

    // KaTeX para fórmulas
    const katexCSS = document.createElement('link');
    katexCSS.rel = 'stylesheet';
    katexCSS.href = 'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css';
    document.head.appendChild(katexCSS);
    const katexJS = document.createElement('script');
    katexJS.src = 'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js';
    katexJS.defer = true;
    document.head.appendChild(katexJS);

    const style = document.createElement('style');
    style.textContent = ESTADISTICA_CSS;
    document.head.appendChild(style);
}

function renderErrorScreen(msg) {
    document.body.className = "flex flex-col min-h-screen bg-slate-50 text-slate-800 justify-center items-center p-6";
    document.body.innerHTML = `
        <div class="bg-white border border-slate-200 shadow-xl rounded-3xl p-12 text-center max-w-md w-full">
            <i class="ph-bold ph-warning-circle text-5xl text-red-500 mb-4 inline-block"></i>
            <h2 class="text-2xl font-bold text-slate-800 mb-2">Error de Configuración</h2>
            <p class="text-slate-500 mb-6 text-sm">${msg}</p>
            <a href="../../../index.html" class="inline-block bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 px-8 rounded-xl transition text-sm">Volver al Portal</a>
        </div>`;
}

function applyTheme() {
    const t = ESTADISTICA_THEME;
    document.body.style.backgroundColor = t.bg;
    document.body.style.backgroundImage = t.gradients;

    const cleanKey = String(TEMA_KEY).replace(/-/g, '.');
    const temaLabel = `Tema ${cleanKey}`;
    const subtitle = THEME_SUBTITLES[SUBJECT_ID]?.[cleanKey] || "";
    document.title = `${temaLabel}${subtitle ? ': ' + subtitle : ''} - ${t.name} - SAIMAP`;

    // Esperar a que LAYOUT_HTML esté en DOM
    const setEl = (id, cb) => { const el = document.getElementById(id); if (el) cb(el); };
    setEl('header-title', el => el.textContent = subtitle ? `${t.name}` : t.name);
    setEl('header-subtitle', el => { el.textContent = temaLabel + (subtitle ? ': ' + subtitle : ''); el.style.color = t.textAccent; });
    setEl('header-icon-bg', el => el.style.backgroundColor = t.primary);
    setEl('header-icon', el => el.className = `ph-bold ${t.icon} text-2xl`);
    setEl('calc-btn', el => { el.href = CALC_URL; el.style.background = t.primaryGrad; });

    setEl('saimap-title', el => el.className = `text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r ${t.titleGradient} mb-8 tracking-tighter opacity-80 select-none`);
    setEl('global-counter', el => el.style.color = t.primary);

    setEl('card-quiz', el => el.classList.add(t.borderCard));
    setEl('card-lab', el => el.classList.add(t.borderCard));
    setEl('card-formulas', el => el.classList.add(t.borderCardAlt));

    ['quiz', 'lab', 'formulas'].forEach(id => {
        setEl('icon-' + id, el => {
            el.style.backgroundColor = t.accentLight;
            el.style.color = t.primary;
        });
    });

    setEl('lab-icon', el => { el.style.backgroundColor = t.accentLight; el.style.color = t.primary; });

    document.querySelectorAll('.btn-primary').forEach(btn => {
        btn.style.background = t.primaryGrad;
        btn.style.backgroundSize = '200% 200%';
    });

    const dynamicStyle = document.createElement('style');
    dynamicStyle.textContent = `.btn-primary:hover:not(:disabled) { box-shadow: 0 8px 25px ${t.primaryShadow}; }`;
    document.head.appendChild(dynamicStyle);

    ['quiz-play-bar', 'results-bar'].forEach(id => {
        setEl(id, el => el.style.backgroundColor = t.primary);
    });

    setEl('results-trophy', el => { el.style.backgroundColor = t.accentBg; el.style.color = t.accent; });
    setEl('lab-problem-badge', el => el.style.backgroundColor = t.primary);
}

// ====================================================================
// APP — LÓGICA PRINCIPAL
// ====================================================================
const app = {
    DB: { quiz: [], lab: [], formulas: [] },

    state: {
        // Quiz
        quizN: 20,
        quizQuestions: [],
        quizIndex: 0,
        quizScore: 0,
        quizAnswered: false,
        quizFailed: [],
        // Lab
        labIndex: 0,
        labQIndex: 0,
        labAttempts: 0,
        labScore: 0,
        labTotal: 0,
    },

    // -----------------------------------------------------------------
    // VISTA Y NAVEGACIÓN
    // -----------------------------------------------------------------
    showView(viewId) {
        const views = ['loading', 'error', 'home', 'quiz-setup', 'quiz', 'lab-home', 'lab', 'formulas', 'results'];
        views.forEach(v => {
            const el = document.getElementById('view-' + v);
            if (el) el.classList.add('hidden');
        });
        const target = document.getElementById('view-' + viewId);
        if (target) target.classList.remove('hidden');

        const nav = document.getElementById('nav-controls');
        if (nav) {
            const showNav = !['home', 'loading', 'error', 'quiz-setup', 'lab-home', 'formulas', 'results'].includes(viewId);
            nav.classList.toggle('hidden', !showNav);
        }
        window.scrollTo(0, 0);
    },

    startTool(tool) {
        if (tool === 'quiz') this.showView('quiz-setup');
        else if (tool === 'lab') this.showView('lab-home');
        else if (tool === 'formulas') this.renderFormulas();
    },

    shuffleArray(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    },

    // -----------------------------------------------------------------
    // QUIZ — TEST TEÓRICO
    // -----------------------------------------------------------------
    setQuizN(n) {
        this.state.quizN = n;
        ['10', '20', '40', 'all'].forEach(v => {
            const el = document.getElementById('qn-' + v);
            if (!el) return;
            const isSelected = (v === 'all' ? n === 9999 : parseInt(v) === n);
            if (isSelected) {
                el.classList.add('border-sky-400', 'bg-sky-50', 'text-sky-700');
                el.classList.remove('border-slate-200');
            } else {
                el.classList.remove('border-sky-400', 'bg-sky-50', 'text-sky-700');
                el.classList.add('border-slate-200');
            }
        });
    },

    startQuiz(questions = null) {
        const pool = questions || this.shuffleArray([...this.DB.quiz]);
        this.state.quizQuestions = pool.slice(0, Math.min(this.state.quizN, pool.length));
        this.state.quizIndex = 0;
        this.state.quizScore = 0;
        this.state.quizFailed = [];
        this.showView('quiz');
        this.renderQuizQuestion();
    },

    renderQuizQuestion() {
        const q = this.state.quizQuestions[this.state.quizIndex];
        if (!q) { this.showQuizResults(); return; }

        this.state.quizAnswered = false;
        const total = this.state.quizQuestions.length;
        const idx = this.state.quizIndex;
        const pct = (idx / total * 100).toFixed(0);

        document.getElementById('quiz-play-bar').style.width = pct + '%';
        document.getElementById('quiz-progress-label').textContent = `Pregunta ${idx + 1}/${total}`;
        document.getElementById('quiz-score-label').textContent = `Aciertos: ${this.state.quizScore}`;
        document.getElementById('quiz-question').textContent = q.q;
        document.getElementById('quiz-feedback').classList.add('hidden');
        document.getElementById('quiz-next-btn').classList.add('hidden');

        const optContainer = document.getElementById('quiz-options');
        // Shuffle opciones pero mantener referencia a la correcta
        const opts = q.opciones.map((text, i) => ({ text, i }));
        this.shuffleArray(opts);
        optContainer.innerHTML = opts.map(o => `
            <button class="option-btn" onclick="app.quizAnswer(${o.i})" data-idx="${o.i}">
                ${o.text}
            </button>`).join('');
    },

    quizAnswer(selectedIdx) {
        if (this.state.quizAnswered) return;
        this.state.quizAnswered = true;

        const q = this.state.quizQuestions[this.state.quizIndex];
        const isCorrect = selectedIdx === q.correcta;

        // Colorear opciones
        document.querySelectorAll('.option-btn').forEach(btn => {
            btn.disabled = true;
            const idx = parseInt(btn.dataset.idx);
            if (idx === q.correcta) btn.classList.add('option-correct');
            else if (idx === selectedIdx && !isCorrect) btn.classList.add('option-wrong');
        });

        if (isCorrect) {
            this.state.quizScore++;
        } else {
            this.state.quizFailed.push(q);
        }

        // Feedback
        const fb = document.getElementById('quiz-feedback');
        fb.className = `mt-5 p-4 rounded-2xl text-sm font-medium leading-relaxed ${isCorrect ? 'lab-correct' : 'lab-wrong'}`;
        fb.innerHTML = isCorrect
            ? `<strong>✅ ¡Correcto!</strong>${q.explicacion ? ' ' + q.explicacion : ''}`
            : `<strong>❌ Incorrecto.</strong> La respuesta correcta es: <em>"${q.opciones[q.correcta]}"</em>.${q.explicacion ? '<br>' + q.explicacion : ''}`;
        fb.classList.remove('hidden');

        document.getElementById('quiz-next-btn').classList.remove('hidden');
    },

    quizNext() {
        this.state.quizIndex++;
        this.renderQuizQuestion();
    },

    showQuizResults() {
        const score = this.state.quizScore;
        const total = this.state.quizQuestions.length;
        const pct = Math.round(score / total * 100);
        document.getElementById('result-text').textContent = `${score} de ${total} correctas (${pct}%)`;
        const retryBtn = document.getElementById('btn-retry-errors');
        if (this.state.quizFailed.length > 0) {
            document.getElementById('fail-count').textContent = this.state.quizFailed.length;
            retryBtn.classList.remove('hidden');
        } else {
            retryBtn.classList.add('hidden');
        }
        document.getElementById('results-bar').style.width = pct + '%';
        this.showView('results');
    },

    retryErrors() {
        this.startQuiz(this.state.quizFailed);
    },

    // -----------------------------------------------------------------
    // LABORATORIO
    // -----------------------------------------------------------------
    startLab() {
        this.state.labIndex = 0;
        this.state.labQIndex = 0;
        this.state.labAttempts = 0;
        this.state.labScore = 0;
        this.state.labTotal = this.DB.lab.reduce((acc, p) => acc + p.preguntas.length, 0);
        this.showView('lab');
        this.renderLabProblem();
    },

    renderLabProblem() {
        const problem = this.DB.lab[this.state.labIndex];
        if (!problem) { this.showLabResults(); return; }

        const totalProblems = this.DB.lab.length;
        document.getElementById('lab-problem-badge').textContent = `Problema ${this.state.labIndex + 1}/${totalProblems}`;
        document.getElementById('lab-problem-title').textContent = problem.titulo || '';
        document.getElementById('lab-scenario').textContent = problem.escenario;

        this.state.labQIndex = 0;
        this.renderLabQuestion();
    },

    renderLabQuestion() {
        const problem = this.DB.lab[this.state.labIndex];
        if (!problem) return;
        const q = problem.preguntas[this.state.labQIndex];
        if (!q) {
            // Problema completado
            this.state.labIndex++;
            this.state.labQIndex = 0;
            this.renderLabProblem();
            return;
        }

        const totalQ = problem.preguntas.length;
        this.state.labAttempts = 0;
        document.getElementById('lab-q-badge').textContent = `Pregunta ${this.state.labQIndex + 1}/${totalQ}`;
        document.getElementById('lab-attempts-badge').textContent = `Intentos: 0/2`;
        document.getElementById('lab-question').textContent = q.enunciado;

        const inputEl = document.getElementById('lab-answer-input');
        inputEl.value = '';
        inputEl.disabled = false;
        inputEl.focus();
        document.getElementById('lab-check-btn').disabled = false;
        document.getElementById('lab-feedback').classList.add('hidden');
        document.getElementById('lab-next-q-btn').classList.add('hidden');
        document.getElementById('lab-input-area').classList.remove('hidden');
    },

    labCheck() {
        const problem = this.DB.lab[this.state.labIndex];
        const q = problem.preguntas[this.state.labQIndex];
        const inputEl = document.getElementById('lab-answer-input');
        const raw = inputEl.value.trim().replace(',', '.');
        const userVal = parseFloat(raw);

        if (isNaN(userVal)) {
            this.labShowFeedback('lab-hint', '⚠️ Por favor, introduce un número válido.');
            return;
        }

        this.state.labAttempts++;
        document.getElementById('lab-attempts-badge').textContent = `Intentos: ${this.state.labAttempts}/2`;

        const tol = q.tolerancia ?? 0.05;
        const isCorrect = Math.abs(userVal - q.respuesta) <= tol;

        if (isCorrect) {
            this.state.labScore++;
            inputEl.disabled = true;
            document.getElementById('lab-check-btn').disabled = true;
            this.labShowFeedback('lab-correct', `✅ ¡Correcto! La respuesta es <strong>${q.respuesta}${q.unidad ? ' ' + q.unidad : ''}</strong>.`);
            document.getElementById('lab-next-q-btn').classList.remove('hidden');

        } else if (this.state.labAttempts === 1) {
            // Primer fallo → pista
            const hint = q.pista ? `💡 <strong>Pista:</strong> ${q.pista}` : '❌ Respuesta incorrecta. Inténtalo de nuevo.';
            this.labShowFeedback('lab-hint', hint);

        } else {
            // Segundo fallo → revelar respuesta
            inputEl.disabled = true;
            document.getElementById('lab-check-btn').disabled = true;
            this.labShowFeedback('lab-reveal', `🔓 La respuesta correcta era <strong>${q.respuesta}${q.unidad ? ' ' + q.unidad : ''}</strong>.${q.pista ? '<br>💡 ' + q.pista : ''}`);
            document.getElementById('lab-next-q-btn').classList.remove('hidden');
        }
    },

    labShowFeedback(className, html) {
        const fb = document.getElementById('lab-feedback');
        fb.className = `mt-4 p-4 rounded-2xl text-sm font-medium leading-relaxed border-2 ${className}`;
        fb.innerHTML = html;
        fb.classList.remove('hidden');
    },

    labNextQuestion() {
        this.state.labQIndex++;
        this.renderLabQuestion();
    },

    showLabResults() {
        const score = this.state.labScore;
        const total = this.state.labTotal;
        const pct = total > 0 ? Math.round(score / total * 100) : 0;
        document.getElementById('result-text').textContent = `${score} de ${total} respuestas correctas (${pct}%) en el laboratorio`;
        document.getElementById('btn-retry-errors').classList.add('hidden');
        document.getElementById('results-bar').style.width = pct + '%';
        this.showView('results');
    },

    // -----------------------------------------------------------------
    // FÓRMULAS — Glosario KaTeX
    // -----------------------------------------------------------------
    renderFormulas(filterCat = null) {
        this.showView('formulas');

        const allFormulas = this.DB.formulas;
        const categories = [...new Set(allFormulas.map(f => f.categoria))].filter(Boolean);

        // Filtros
        const filtersEl = document.getElementById('formula-filters');
        filtersEl.innerHTML = `
            <button onclick="app.renderFormulas(null)" class="filter-btn px-3 py-1.5 rounded-full text-xs font-bold border-2 border-slate-300 ${!filterCat ? 'active bg-sky-500 border-sky-500' : 'bg-white text-slate-600'}">Todas</button>
            ${categories.map(cat => `
                <button onclick="app.renderFormulas('${cat}')" class="filter-btn px-3 py-1.5 rounded-full text-xs font-bold border-2 border-slate-300 ${filterCat === cat ? 'active bg-sky-500 border-sky-500 text-white' : 'bg-white text-slate-600'}">
                    ${cat}
                </button>`).join('')}
        `;

        const filtered = filterCat ? allFormulas.filter(f => f.categoria === filterCat) : allFormulas;
        const grid = document.getElementById('formulas-grid');

        if (filtered.length === 0) {
            grid.innerHTML = '<p class="text-slate-400 text-center col-span-2 py-8">No hay fórmulas en esta categoría.</p>';
            return;
        }

        grid.innerHTML = filtered.map(f => `
            <div class="formula-card glass-card rounded-2xl p-6 border-2 border-white">
                <div class="flex items-start justify-between mb-3">
                    <h4 class="font-bold text-slate-800 text-sm leading-snug">${f.nombre}</h4>
                    ${f.categoria ? `<span class="px-2 py-0.5 rounded-full text-[9px] font-bold text-white ml-2 shrink-0" style="background:${ESTADISTICA_THEME.primary}">${f.categoria}</span>` : ''}
                </div>
                <div id="katex-${encodeURIComponent(f.nombre)}" class="my-4 text-center text-slate-700 overflow-x-auto"></div>
                ${f.descripcion ? `<p class="text-xs text-slate-500 leading-relaxed border-t border-slate-100 pt-3 mt-1">${f.descripcion}</p>` : ''}
            </div>`).join('');

        // Renderizar KaTeX (con retry si la lib aún no está cargada)
        this._renderKatex(filtered);
    },

    _renderKatex(formulas, attempt = 0) {
        if (typeof katex === 'undefined') {
            if (attempt < 10) setTimeout(() => this._renderKatex(formulas, attempt + 1), 300);
            return;
        }
        formulas.forEach(f => {
            const el = document.getElementById('katex-' + encodeURIComponent(f.nombre));
            if (!el) return;
            try {
                katex.render(f.latex, el, { displayMode: true, throwOnError: false });
            } catch (e) {
                el.textContent = f.latex;
            }
        });
    }
};
