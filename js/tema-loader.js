// ====================================================================
// SAIMAP - LOADER DE TEMAS UNIVERSAL Y MODULAR
// ====================================================================

// --- CONFIGURACIÓN DE AUTENTICACIÓN ---
const REQUIRE_AUTH = true; // Cambiar a true para activar la protección de Skool

// Subtítulos de los temas por asignatura
const THEME_SUBTITLES = {
    'psicologia-del-aprendizaje': {
        '1.1': 'Concepto y Definición',
        '1.2': 'Historia y Método',
        '2.1': 'Aprendizaje Asociativo',
        '2.2': 'Condicionamiento Clásico',
        '3.1': 'Inicios del Condicionamiento Instrumental',
        '3.2': 'Condicionamiento Operante',
        '4.1': 'Psicología Cognitiva',
        '4.2': 'Modelos Computacionales y Constructivismo',
        '4.3': 'Gestalt, Piaget y Vygotski',
        '5': 'Aprendizaje Social y Vicario',
        '6': 'Aprendizaje de Habilidades Motoras'
    },
    'historia-de-la-psicologia': {
        '1': 'Los Orígenes de la Psicología Científica',
        '2.1': 'El Funcionalismo y el Conductismo',
        '2.2': 'La Gestalt y el Psicoanálisis',
        '3.1': 'El Neoconductismo',
        '3.2': 'La Psicología Humanista y Cognitiva',
        '4.1': 'La Psicología Científica Contemporánea',
        '4.2': 'Psicología Aplicada y Profesional',
        '5': 'La Psicología en España',
        '6': 'Tendencias Actuales en Psicología'
    },
    'bases-biologicas-del-comportamiento': {
        '1': 'Concepto, Disciplinas y Métodos',
        '2': 'Desarrollo y Anatomía del SN',
        '3': 'Células del Sistema Nervioso',
        '4': 'Sinapsis y Neurotransmisión',
        '5': 'Genética de la Conducta'
    },
    'psicologia-social': {
        '1': 'Introducción, Historia y Método',
        '2': 'Cognición Social',
        '3': 'Atribución Social',
        '4': 'Autoconcepto e Identidad',
        '5': 'Actitudes',
        '6': 'Estereotipos, Prejuicio y Discriminación'
    },
    'psicologia-de-la-atencion-y-percepcion': {
        '1': 'Introducción y Conceptos Básicos',
        '2.1': 'Historia y Enfoque Psicofísico',
        '2.2': 'Teorías de la Percepción',
        '3.1': 'Percepción Visual',
        '3.2': 'Percepción del Color',
        '4.1': 'Percepción Táctil y Somestesia',
        '4.2': 'Percepción Química: Gusto y Olfato',
        '5': 'Introducción a la Atención',
        '6': 'Modelos de Atención Selectiva',
        '7': 'Tipos de Atención',
        '8': 'Sesgos e Ilusiones Perceptivas'
    },
    'psicologia-de-la-memoria': {
        '1': 'Concepto y Estudio Científico de la Memoria',
        '2': 'Memoria Sensorial, Corto Plazo y de Trabajo',
        '3': 'Codificación y Almacenamiento en la Memoria a Largo Plazo',
        '4': 'Procesos de Recuperación y Memoria Operativa',
        '5': 'Olvido, Interferencia y Distorsiones de la Memoria'
    },
    'psicologia-desarrollo-infancia-adolescencia': {
        '1': 'Introducción, Historia y Enfoques en Psicología del Desarrollo',
        '2': 'Teorías del Desarrollo: Psicoanálisis, Conductismo y Cognitivismo',
        '3': 'Metodología y Fundamentos Científicos de la Investigación',
        '4': 'Desarrollo Físico, Motor y del Cerebro en la Infancia',
        '5': 'Desarrollo Sensorial y Perceptivo en los Bebés',
        '6': 'Desarrollo Cognitivo: Teorías de Piaget y Vygotsky',
        '7': 'Adquisición y Desarrollo del Lenguaje y la Comunicación',
        '8': 'Desarrollo Social, Afectivo y de la Personalidad'
    },
    'psicologia-interaccion-social': {
        '1': 'Introducción y Concepto de Grupo Social',
        '2': 'Estructura Grupal, Roles y Normas Sociales',
        '3': 'Procesos de Cohesión e Integración Grupal',
        '4': 'Modelos de Desarrollo y Evolución de los Grupos',
        '5': 'Conflictos Interpersonales e Intergrupales',
        '6': 'Conducta Prosocial, Ayuda y Altruismo',
        '7': 'Procesos de Influencia Social y Conformidad',
        '8': 'Rendimiento Grupal, Polarización y Pensamiento Grupal'
    },
    'psicologia-de-la-motivacion-y-emocion': {
        '1': 'Concepto y Procesos Básicos de la Motivación',
        '2': 'Antecedentes Filosóficos y Teorías del Instinto',
        '3': 'Motivos Primarios, Biológicos y Secundarios',
        '4': 'Enfoques Conductistas, Cognitivos y de Valoración de la Emoción',
        '5': 'Emociones de Urgencia, Bienestar e Interacción Social',
        '6': 'Inteligencia Emocional y Motivación Extrínseca'
    },
    'fundamentos-de-estadistica': {
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
    },
    'diferencias-individuales-1': {
        '1': 'Marco Conceptual y Desarrollo Histórico de la Psicología de la Personalidad',
        '2': 'Modelos Teóricos en Psicología de la Personalidad',
        '3': 'Aspectos Metodológicos en la Investigación de la Personalidad',
        '4': 'Acercamientos Multidimensionales al Estudio de la Personalidad',
        '5': 'Dimensiones Temperamentales de la Personalidad',
        '6': 'Consistencia, Estabilidad y Cambio de la Personalidad',
        '7': 'Motivos, Metas y Personalidad'
    },
    'diferencias-individuales-2': {
        '1': 'Dimensiones Cognitivas: Competencias Cognitivas Personales I',
        '2': 'Dimensiones Cognitivas: Competencias Cognitivas Personales II',
        '3': 'Propuestas Integradoras Cognitivo-Socioafectivas',
        '4': 'Aspectos Cognitivos y Personalidad',
        '5': 'El Self como Integrador de la Personalidad',
        '6': 'Diferencias Intergrupales en Inteligencia y Personalidad',
        '7': 'El Origen de las Diferencias Individuales: Influencias Genéticas y Ambientales',
        '8': 'El Estudio de la Personalidad y sus Contextos de Aplicación'
    },
    'edad adulta y vejez': {
        '1': 'Fundamentos del Desarrollo en la Edad Adulta',
        '2': 'Dinámicas del Desarrollo Adulto',
        '3': 'Desarrollo en la Adultez Media',
        '4': 'Envejecimiento: Adultez Tardía y Vejez',
        '5': 'Tendencias Actuales en el Estudio del Desarrollo Humano'
    },
    'evaluacion-psicologica-1': {
        '1': 'Historia y Modelos de Evaluación Psicológica',
        '2': 'El Proceso de Evaluación Psicológica',
        '3': 'El Informe Psicológico',
        '4': 'Garantías de Calidad en la Evaluación Psicológica',
        '5': 'La Entrevista',
        '6': 'La Observación',
        '7': 'El Autoinforme'
    },
    'evaluacion-psicologica-2': {
        '1': 'Técnicas Objetivas',
        '2': 'Técnicas Subjetivas',
        '3': 'Técnicas Proyectivas',
        '4': 'Evaluación de la Inteligencia: Introducción Histórica y Conceptual',
        '5': 'Evaluación de la Inteligencia: Pruebas Colectivas e Individuales',
        '6': 'Evaluación de las Aptitudes Específicas',
        '7': 'La Evaluación de la Personalidad: Pruebas Objetivas',
        '8': 'Evaluación Neuropsicológica: Fundamentos Históricos y Conceptuales',
        '9': 'Evaluación de los Intereses Vocacionales y Actitudes',
        '10': 'Evaluación de la Salud y la Calidad de Vida'
    },
    'psicologia-educativa': {
        '1': 'Fundamentos, Historia y Enfoques',
        '2': 'Aprendizaje y Desarrollo',
        '3': 'La Educación del Siglo XXI',
        '4': 'Motivación, Ansiedad y Autoestima',
        '5': 'Gestión del Aula',
        '6': 'Interacción en el Aula',
        '7': 'El Psicólogo Educativo'
    },
    'psicologia-fisiologica': {
        '1': 'La Atención',
        '2': 'Asimetrías Cerebrales',
        '3': 'Lenguaje y Funciones Ejecutivas',
        '4': 'Emoción',
        '5': 'Aprendizaje y Memoria',
        '6': 'Ritmos Biológicos y Reproducción',
        '7': 'Sed, Hambre y Circuito de Recompensa'
    },
    'psicopatologia': {
        '1': 'Concepto de Psicopatología, Aproximación Histórica y Modelos Explicativos',
        '2': 'Sistemas de Clasificación y Diagnóstico en Psicopatología',
        '3': 'Trastornos de Ansiedad',
        '4': 'Trastorno Obsesivo-Compulsivo y Trastornos Relacionados con Traumas y Estrés',
        '5': 'Trastornos Depresivos y Trastorno Bipolar',
        '6': 'Esquizofrenia y Otros Trastornos Psicóticos',
        '7': 'Trastornos de la Personalidad',
        '8': 'Trastornos del Sueño-Vigilia y Disfunciones Sexuales',
        '9': 'Trastornos Disociativos, de Síntomas Somáticos y Relacionados',
        '10': 'Trastornos del Control de Impulsos',
        '11': 'Trastornos Relacionados con Sustancias y Trastornos Adictivos'
    },
    'estadistica-aplicada': {
        '1.1': 'Ciencia, Método y Estadística',
        '1.2': 'Variables, Muestreo y Escalas de Medida',
        '2.1': 'Estadística Descriptiva',
        '2.2': 'La Forma de los Datos',
        '3.1': 'Medidas de Centralización y Dispersión',
        '3.2': 'La Base de la Estadística',
        '4.1': 'Asociación y Causalidad',
        '4.2': 'Asociación entre Variables Cuantitativas',
        '5': 'Contraste de Hipótesis',
        '6': 'Análisis de Varianza (ANOVA)'
    },
    'Psicofarmacología': {
        '1': 'Introducción a la Psicofarmacología',
        '2': 'Trastornos Afectivos',
        '3': 'Antidepresivos y Estabilizadores del Ánimo',
        '4': 'Trastornos de la Ansiedad',
        '5': 'El Cerebro Ansioso',
        '6': 'Trastornos del Sueño',
        '7': 'La Esquizofrenia',
        '8': 'Esquizofrenia: Causas Biológicas y Tratamiento',
        '9': 'Alzheimer y el Parkinson'
    },
    'psicologia_clinica': {
        '1': 'Psicología clínica: definición y recorrido histórico',
        '2': 'Evaluación para el diagnóstico y para el tratamiento',
        '3': 'Trastornos del estado de ánimo',
        '4': 'Trastornos de ansiedad',
        '5': 'Esquizofrenia',
        '6': 'Trastornos por uso de sustancias'
    },
    'psicologia_salud': {
        '1': 'Un Viaje al Modelo Biopsicosocial',
        '2': 'Claves para una Vida Plena y Saludable',
        '3': 'Estrés y Salud',
        '4': 'La Enfermedad Crónica y Terminal'
    },
    'PTO': {
        '1': 'Aproximación histórica, conceptual y metodológica de la PTO',
        '2': 'Organización del trabajo y componentes organizativos',
        '3': 'El significado y los valores del trabajo',
        '4': 'Motivación y desempeño laboral',
        '5': 'El liderazgo en las organizaciones',
        '6': 'Estrés laboral y salud laboral',
        '7': 'Burnout: concepto, evaluación e intervención',
        '8': 'Work Engagement y Autoeficacia Laboral',
        '9': 'Cultura y Clima en las Organizaciones',
        '10': 'Cambio y Desarrollo Organizacional'
    },
    'psicometria': {
        '1': 'Conceptos Fundamentales y Evolución de la Psicometría',
        '2': 'Construcción, Taxonomía y Formatos de los Test Psicológicos',
        '3': 'La Teoría Clásica de los Test y la Fiabilidad',
        '4': 'Análisis de Ítems y Construcción de Test',
        '5': 'La Validez y sus Evidencias',
        '6': 'Fiabilidad, Validez y el Efecto de la Longitud del Test',
        '7': 'Transformación y Equiparación de Puntuaciones',
        '8': 'Evaluación de la Calidad y Uso Ético de los Test',
        '9': 'De la TCT a la Teoría de la Respuesta al Ítem (TRI) y los TAI'
    },

    'pir-clinica': {
        '1': 'Espectro de la Esquizofrenia y otros Trastornos Psicóticos',
        '2': 'Trastornos Depresivos',
        '3': 'Trastornos Bipolares y relacionados',
        '4': 'Trastornos de Ansiedad',
        '5': 'Trastorno Obsesivo-Compulsivo y relacionados',
        '6': 'Trastornos relacionados con Traumas y Factores de Estrés',
        '7': 'Trastornos Disociativos',
        '8': 'Trastornos de Síntomas Somáticos y relacionados',
        '9': 'Trastornos de la Conducta Alimentaria y de la Ingestión',
        '10': 'Trastornos del Sueño-Vigilia',
        '11': 'Disfunciones Sexuales',
        '12': 'Disforia de Género e Incongruencia de Género',
        '13': 'Trastornos del Control de los Impulsos',
        '14': 'Adicciones con Sustancia',
        '15': 'Adicciones Comportamentales',
        '16': 'Trastornos Neurocognitivos',
        '17': 'Trastornos de la Personalidad',
        '18': 'Trastornos Parafílicos',
        '19': 'Trastornos Culturales y Glosario'
    },
    'pir-psicopatologia': {
        '1': 'Modelos en Psicopatología',
        '2': 'Sistemas Clasificatorios en Psicopatología',
        '3': 'Psicopatología de la Conciencia',
        '4': 'Psicopatología de la Atención y la Orientación',
        '5': 'Psicopatología de la Sensopercepción',
        '6': 'Psicopatología de la Memoria',
        '7': 'Psicopatología del Pensamiento',
        '8': 'Psicopatología del Lenguaje',
        '9': 'Psicopatología de la Afectividad',
        '10': 'Trastornos Psicomotores'
    },
    'pir-tratamientos': {
        '1': 'Tratamiento de los Trastornos Psicóticos',
        '2': 'Tratamiento de los Trastornos Depresivos',
        '3': 'Tratamiento del Trastorno Bipolar',
        '4': 'Tratamiento de los Trastornos de Ansiedad',
        '5': 'Tratamiento del TOC y relacionados',
        '6': 'Tratamiento de los Trastornos por Estrés y Trauma',
        '7': 'Tratamiento de los Trastornos de Síntomas Somáticos',
        '8': 'Tratamiento de los Trastornos Disociativos y Facticios',
        '9': 'Tratamiento de los Trastornos de la Conducta Alimentaria',
        '10': 'Tratamiento de las Disfunciones Sexuales',
        '11': 'Tratamiento de los Trastornos del Sueño',
        '12': 'Tratamiento de los Trastornos de la Personalidad',
        '13': 'Tratamiento de las Adicciones a Sustancias',
        '14': 'Tratamiento de las Adicciones Comportamentales',
        '15': 'Conducta Suicida y Situaciones de Crisis'
    }
};

// Configuración de temas visuales por asignatura
const THEME_CONFIG = {
    'psicologia-social': {
        name: 'Psicología Social',
        icon: 'ph-users-three',
        bg: '#faf5ff',
        gradients: 'radial-gradient(at 0% 0%, hsla(270,70%,94%,1) 0,transparent 50%),radial-gradient(at 50% 0%, hsla(290,70%,94%,1) 0,transparent 50%),radial-gradient(at 100% 0%, hsla(250,70%,94%,1) 0,transparent 50%)',
        primary: '#7c3aed',     // purple-600
        primaryGrad: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 50%, #e879f9 100%)',
        primaryShadow: 'rgba(124, 58, 237, 0.4)',
        accent: '#a855f7',      // purple-400
        accentBg: '#f5f3ff',    // purple-50
        accentLight: '#ede9fe', // purple-100
        textAccent: '#7c3aed',
        optionHoverBorder: '#a855f7',
        optionHoverBg: '#faf5ff',
        titleGradient: 'from-purple-500 to-fuchsia-500',
        borderCard: 'border-b-purple-500',
        borderCardAlt: 'border-b-indigo-500',
    },
    'historia-de-la-psicologia': {
        name: 'Historia de la Psicología',
        icon: 'ph-hourglass',
        bg: '#f5f5f4', // Gris/cálido piedra
        gradients: 'radial-gradient(at 0% 0%, hsla(220,15%,92%,1) 0,transparent 50%),radial-gradient(at 50% 0%, hsla(200,10%,90%,1) 0,transparent 50%),radial-gradient(at 100% 0%, hsla(240,10%,92%,1) 0,transparent 50%)',
        primary: '#475569', // Slate 600
        primaryGrad: 'linear-gradient(135deg, #475569 0%, #64748b 50%, #94a3b8 100%)',
        primaryShadow: 'rgba(71, 85, 105, 0.4)',
        accent: '#64748b',
        accentBg: '#f8fafc',
        accentLight: '#f1f5f9',
        textAccent: '#475569',
        optionHoverBorder: '#64748b',
        optionHoverBg: '#f8fafc',
        titleGradient: 'from-slate-500 to-stone-500',
        borderCard: 'border-b-slate-500',
        borderCardAlt: 'border-b-stone-500',
    },
    'bases-biologicas-del-comportamiento': {
        name: 'Bases Biológicas del Comportamiento',
        icon: 'ph-dna',
        bg: '#f0fdf4', // Esmeralda/Verde
        gradients: 'radial-gradient(at 0% 0%, hsla(150,70%,94%,1) 0,transparent 50%),radial-gradient(at 50% 0%, hsla(160,70%,94%,1) 0,transparent 50%),radial-gradient(at 100% 0%, hsla(140,70%,94%,1) 0,transparent 50%)',
        primary: '#16a34a',
        primaryGrad: 'linear-gradient(135deg, #16a34a 0%, #22c55e 50%, #4ade80 100%)',
        primaryShadow: 'rgba(22, 163, 74, 0.4)',
        accent: '#22c55e',
        accentBg: '#f0fdf4',
        accentLight: '#dcfce7',
        textAccent: '#16a34a',
        optionHoverBorder: '#22c55e',
        optionHoverBg: '#f0fdf4',
        titleGradient: 'from-green-500 to-emerald-500',
        borderCard: 'border-b-green-500',
        borderCardAlt: 'border-b-emerald-500',
    },
    'psicologia-de-la-memoria': {
        name: 'Psicología de la Memoria',
        icon: 'ph-brain',
        bg: '#eef2ff', // Indigo
        gradients: 'radial-gradient(at 0% 0%, hsla(225,80%,95%,1) 0,transparent 50%),radial-gradient(at 50% 0%, hsla(235,80%,95%,1) 0,transparent 50%),radial-gradient(at 100% 0%, hsla(245,80%,95%,1) 0,transparent 50%)',
        primary: '#4f46e5',
        primaryGrad: 'linear-gradient(135deg, #4f46e5 0%, #6366f1 50%, #818cf8 100%)',
        primaryShadow: 'rgba(79, 70, 229, 0.4)',
        accent: '#6366f1',
        accentBg: '#f5f7ff',
        accentLight: '#e0e7ff',
        textAccent: '#4f46e5',
        optionHoverBorder: '#6366f1',
        optionHoverBg: '#f5f7ff',
        titleGradient: 'from-indigo-500 to-blue-500',
        borderCard: 'border-b-indigo-500',
        borderCardAlt: 'border-b-blue-500',
    },
    'psicologia-desarrollo-infancia-adolescencia': {
        name: 'Psicología del Desarrollo (Infancia y Adolescencia)',
        icon: 'ph-plant',
        bg: '#f0fdfa', // Teal
        gradients: 'radial-gradient(at 0% 0%, hsla(170,70%,94%,1) 0,transparent 50%),radial-gradient(at 50% 0%, hsla(180,70%,94%,1) 0,transparent 50%),radial-gradient(at 100% 0%, hsla(160,70%,94%,1) 0,transparent 50%)',
        primary: '#0d9488',
        primaryGrad: 'linear-gradient(135deg, #0d9488 0%, #14b8a6 50%, #5eead4 100%)',
        primaryShadow: 'rgba(13, 148, 136, 0.4)',
        accent: '#14b8a6',
        accentBg: '#f0fdfa',
        accentLight: '#ccfbf1',
        textAccent: '#0d9488',
        optionHoverBorder: '#14b8a6',
        optionHoverBg: '#f0fdfa',
        titleGradient: 'from-teal-500 to-cyan-500',
        borderCard: 'border-b-teal-500',
        borderCardAlt: 'border-b-cyan-500',
    },
    'psicologia-interaccion-social': {
        name: 'Psicología de la Interacción Social',
        icon: 'ph-users',
        bg: '#f8fafc', // Slate 50
        gradients: 'radial-gradient(at 0% 0%, hsla(210,100%,96%,1) 0,transparent 50%),radial-gradient(at 50% 0%, hsla(220,100%,96%,1) 0,transparent 50%),radial-gradient(at 100% 0%, hsla(200,100%,96%,1) 0,transparent 50%)',
        primary: '#2563eb', // Blue 600
        primaryGrad: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 50%, #60a5fa 100%)',
        primaryShadow: 'rgba(37, 99, 235, 0.4)',
        accent: '#3b82f6', // Blue 500
        accentBg: '#eff6ff', // Blue 50
        accentLight: '#dbeafe', // Blue 100
        textAccent: '#2563eb',
        optionHoverBorder: '#3b82f6',
        optionHoverBg: '#eff6ff',
        titleGradient: 'from-blue-600 to-indigo-500',
        borderCard: 'border-b-blue-500',
        borderCardAlt: 'border-b-indigo-500',
    },
    'psicologia-de-la-atencion-y-percepcion': {
        name: 'Psicología de la Atención y Percepción',
        icon: 'ph-eye',
        bg: '#fffbeb', // Amber
        gradients: 'radial-gradient(at 0% 0%, hsla(45,100%,96%,1) 0,transparent 50%),radial-gradient(at 50% 0%, hsla(35,100%,96%,1) 0,transparent 50%),radial-gradient(at 100% 0%, hsla(55,100%,96%,1) 0,transparent 50%)',
        primary: '#d97706',
        primaryGrad: 'linear-gradient(135deg, #d97706 0%, #f59e0b 50%, #fbbf24 100%)',
        primaryShadow: 'rgba(217, 119, 6, 0.4)',
        accent: '#f59e0b',
        accentBg: '#fffbeb',
        accentLight: '#fef3c7',
        textAccent: '#d97706',
        optionHoverBorder: '#f59e0b',
        optionHoverBg: '#fffbeb',
        titleGradient: 'from-amber-500 to-yellow-500',
        borderCard: 'border-b-amber-500',
        borderCardAlt: 'border-b-orange-500',
    },
    'psicologia-de-la-motivacion-y-emocion': {
        name: 'Psicología de la Motivación y Emoción',
        icon: 'ph-lightning',
        bg: '#fff5f5', // Rose/Red
        gradients: 'radial-gradient(at 0% 0%, hsla(350,100%,96%,1) 0,transparent 50%),radial-gradient(at 50% 0%, hsla(10,100%,96%,1) 0,transparent 50%),radial-gradient(at 100% 0%, hsla(340,100%,96%,1) 0,transparent 50%)',
        primary: '#e11d48',
        primaryGrad: 'linear-gradient(135deg, #e11d48 0%, #f43f5e 50%, #fda4af 100%)',
        primaryShadow: 'rgba(225, 29, 72, 0.4)',
        accent: '#f43f5e',
        accentBg: '#fff5f5',
        accentLight: '#ffe4e6',
        textAccent: '#e11d48',
        optionHoverBorder: '#f43f5e',
        optionHoverBg: '#fff5f5',
        titleGradient: 'from-rose-500 to-pink-500',
        borderCard: 'border-b-rose-500',
        borderCardAlt: 'border-b-orange-500',
    },
    'psicologia-del-aprendizaje': {
        name: 'Psicología del Aprendizaje',
        icon: 'ph-graduation-cap',
        bg: '#ecfeff', // Cyan
        gradients: 'radial-gradient(at 0% 0%, hsla(185,80%,95%,1) 0,transparent 50%),radial-gradient(at 50% 0%, hsla(195,80%,95%,1) 0,transparent 50%),radial-gradient(at 100% 0%, hsla(175,80%,95%,1) 0,transparent 50%)',
        primary: '#0891b2',
        primaryGrad: 'linear-gradient(135deg, #0891b2 0%, #06b6d4 50%, #22d3ee 100%)',
        primaryShadow: 'rgba(8, 145, 178, 0.4)',
        accent: '#06b6d4',
        accentBg: '#f0fdfa',
        accentLight: '#cffafe',
        textAccent: '#0891b2',
        optionHoverBorder: '#06b6d4',
        optionHoverBg: '#ecfeff',
        titleGradient: 'from-cyan-500 to-teal-500',
        borderCard: 'border-b-cyan-500',
        borderCardAlt: 'border-b-teal-500',
    },
    'psicologia_clinica': {
        name: 'Psicología Clínica',
        icon: 'ph-heart-beat',
        bg: '#f0f9ff', // Sky Blue
        gradients: 'radial-gradient(at 0% 0%, hsla(195,80%,94%,1) 0,transparent 50%),radial-gradient(at 50% 0%, hsla(205,80%,94%,1) 0,transparent 50%),radial-gradient(at 100% 0%, hsla(185,80%,94%,1) 0,transparent 50%)',
        primary: '#0284c7',
        primaryGrad: 'linear-gradient(135deg, #0284c7 0%, #0ea5e9 50%, #38bdf8 100%)',
        primaryShadow: 'rgba(2, 132, 199, 0.4)',
        accent: '#0ea5e9',
        accentBg: '#f0f9ff',
        accentLight: '#e0f2fe',
        textAccent: '#0284c7',
        optionHoverBorder: '#0ea5e9',
        optionHoverBg: '#f0f9ff',
        titleGradient: 'from-sky-500 to-blue-500',
        borderCard: 'border-b-sky-500',
        borderCardAlt: 'border-b-blue-500',
    },
    'psicologia_salud': {
        name: 'Psicología de la Salud',
        icon: 'ph-activity',
        bg: '#f0fdf4', // Green/Emerald
        gradients: 'radial-gradient(at 0% 0%, hsla(150,70%,94%,1) 0,transparent 50%),radial-gradient(at 50% 0%, hsla(160,70%,94%,1) 0,transparent 50%),radial-gradient(at 100% 0%, hsla(140,70%,94%,1) 0,transparent 50%)',
        primary: '#16a34a',
        primaryGrad: 'linear-gradient(135deg, #16a34a 0%, #22c55e 50%, #4ade80 100%)',
        primaryShadow: 'rgba(22, 163, 74, 0.4)',
        accent: '#22c55e',
        accentBg: '#f0fdf4',
        accentLight: '#dcfce7',
        textAccent: '#16a34a',
        optionHoverBorder: '#22c55e',
        optionHoverBg: '#f0fdf4',
        titleGradient: 'from-green-500 to-emerald-500',
        borderCard: 'border-b-green-500',
        borderCardAlt: 'border-b-emerald-500',
    },
    'PTO': {
        name: 'Psicología del Trabajo y las Organizaciones',
        icon: 'ph-briefcase',
        bg: '#fafaf9', // Warm Gray / Stone
        gradients: 'radial-gradient(at 0% 0%, hsla(30,15%,94%,1) 0,transparent 50%),radial-gradient(at 50% 0%, hsla(20,10%,92%,1) 0,transparent 50%),radial-gradient(at 100% 0%, hsla(40,10%,94%,1) 0,transparent 50%)',
        primary: '#57534e', // Stone 600
        primaryGrad: 'linear-gradient(135deg, #57534e 0%, #78716c 50%, #a8a29e 100%)',
        primaryShadow: 'rgba(87, 83, 78, 0.4)',
        accent: '#78716c',
        accentBg: '#fafaf9',
        accentLight: '#f5f5f4',
        textAccent: '#57534e',
        optionHoverBorder: '#78716c',
        optionHoverBg: '#fafaf9',
        titleGradient: 'from-stone-500 to-neutral-500',
        borderCard: 'border-b-stone-500',
        borderCardAlt: 'border-b-neutral-500',
    },
    'Psicofarmacología': {
        name: 'Psicofarmacología',
        icon: 'ph-pill',
        bg: '#faf5ff', // Purple
        gradients: 'radial-gradient(at 0% 0%, hsla(270,70%,94%,1) 0,transparent 50%),radial-gradient(at 50% 0%, hsla(290,70%,94%,1) 0,transparent 50%),radial-gradient(at 100% 0%, hsla(250,70%,94%,1) 0,transparent 50%)',
        primary: '#7c3aed',
        primaryGrad: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 50%, #e879f9 100%)',
        primaryShadow: 'rgba(124, 58, 237, 0.4)',
        accent: '#a855f7',
        accentBg: '#f5f3ff',
        accentLight: '#ede9fe',
        textAccent: '#7c3aed',
        optionHoverBorder: '#a855f7',
        optionHoverBg: '#faf5ff',
        titleGradient: 'from-purple-500 to-fuchsia-500',
        borderCard: 'border-b-purple-500',
        borderCardAlt: 'border-b-indigo-500',
    },
    'diferencias-individuales-1': {
        name: 'Diferencias Individuales I',
        icon: 'ph-users-three',
        bg: '#fdf4ff', // Fuchsia 50
        gradients: 'radial-gradient(at 0% 0%, hsla(295,70%,94%,1) 0,transparent 50%),radial-gradient(at 50% 0%, hsla(305,70%,94%,1) 0,transparent 50%),radial-gradient(at 100% 0%, hsla(285,70%,94%,1) 0,transparent 50%)',
        primary: '#c026d3', // Fuchsia 600
        primaryGrad: 'linear-gradient(135deg, #c026d3 0%, #d946ef 50%, #f0abfc 100%)',
        primaryShadow: 'rgba(192, 38, 211, 0.4)',
        accent: '#d946ef', // Fuchsia 500
        accentBg: '#fdf4ff',
        accentLight: '#fae8ff',
        textAccent: '#c026d3',
        optionHoverBorder: '#d946ef',
        optionHoverBg: '#fdf4ff',
        titleGradient: 'from-fuchsia-500 to-pink-500',
        borderCard: 'border-b-fuchsia-500',
        borderCardAlt: 'border-b-pink-500',
    },
    'diferencias-individuales-2': {
        name: 'Diferencias Individuales II',
        icon: 'ph-users-three',
        bg: '#fdf4ff', // Fuchsia 50
        gradients: 'radial-gradient(at 0% 0%, hsla(295,70%,94%,1) 0,transparent 50%),radial-gradient(at 50% 0%, hsla(305,70%,94%,1) 0,transparent 50%),radial-gradient(at 100% 0%, hsla(285,70%,94%,1) 0,transparent 50%)',
        primary: '#c026d3', // Fuchsia 600
        primaryGrad: 'linear-gradient(135deg, #c026d3 0%, #d946ef 50%, #f0abfc 100%)',
        primaryShadow: 'rgba(192, 38, 211, 0.4)',
        accent: '#d946ef', // Fuchsia 500
        accentBg: '#fdf4ff',
        accentLight: '#fae8ff',
        textAccent: '#c026d3',
        optionHoverBorder: '#d946ef',
        optionHoverBg: '#fdf4ff',
        titleGradient: 'from-fuchsia-500 to-pink-500',
        borderCard: 'border-b-fuchsia-500',
        borderCardAlt: 'border-b-pink-500',
    },
    'edad adulta y vejez': {
        name: 'Edad Adulta y Vejez',
        icon: 'ph-calendar',
        bg: '#fff7ed', // Orange 50
        gradients: 'radial-gradient(at 0% 0%, hsla(25,100%,96%,1) 0,transparent 50%),radial-gradient(at 50% 0%, hsla(35,100%,96%,1) 0,transparent 50%),radial-gradient(at 100% 0%, hsla(15,100%,96%,1) 0,transparent 50%)',
        primary: '#ea580c', // Orange 600
        primaryGrad: 'linear-gradient(135deg, #ea580c 0%, #f97316 50%, #ffedd5 100%)',
        primaryShadow: 'rgba(234, 88, 12, 0.4)',
        accent: '#f97316',
        accentBg: '#fff7ed',
        accentLight: '#ffedd5',
        textAccent: '#ea580c',
        optionHoverBorder: '#f97316',
        optionHoverBg: '#fff7ed',
        titleGradient: 'from-orange-500 to-amber-500',
        borderCard: 'border-b-orange-500',
        borderCardAlt: 'border-b-amber-500',
    },
    'evaluacion-psicologica-1': {
        name: 'Evaluación Psicológica I',
        icon: 'ph-clipboard-text',
        bg: '#f0fdf4', // Green 50
        gradients: 'radial-gradient(at 0% 0%, hsla(140,70%,94%,1) 0,transparent 50%),radial-gradient(at 50% 0%, hsla(150,70%,94%,1) 0,transparent 50%),radial-gradient(at 100% 0%, hsla(130,70%,94%,1) 0,transparent 50%)',
        primary: '#059669', // Emerald 600
        primaryGrad: 'linear-gradient(135deg, #059669 0%, #10b981 50%, #34d399 100%)',
        primaryShadow: 'rgba(5, 150, 105, 0.4)',
        accent: '#10b981',
        accentBg: '#f0fdf4',
        accentLight: '#dcfce7',
        textAccent: '#059669',
        optionHoverBorder: '#10b981',
        optionHoverBg: '#f0fdf4',
        titleGradient: 'from-emerald-500 to-teal-500',
        borderCard: 'border-b-emerald-500',
        borderCardAlt: 'border-b-teal-500',
    },
    'evaluacion-psicologica-2': {
        name: 'Evaluación Psicológica II',
        icon: 'ph-clipboard-text',
        bg: '#f0fdf4', // Green 50
        gradients: 'radial-gradient(at 0% 0%, hsla(140,70%,94%,1) 0,transparent 50%),radial-gradient(at 50% 0%, hsla(150,70%,94%,1) 0,transparent 50%),radial-gradient(at 100% 0%, hsla(130,70%,94%,1) 0,transparent 50%)',
        primary: '#059669', // Emerald 600
        primaryGrad: 'linear-gradient(135deg, #059669 0%, #10b981 50%, #34d399 100%)',
        primaryShadow: 'rgba(5, 150, 105, 0.4)',
        accent: '#10b981',
        accentBg: '#f0fdf4',
        accentLight: '#dcfce7',
        textAccent: '#059669',
        optionHoverBorder: '#10b981',
        optionHoverBg: '#f0fdf4',
        titleGradient: 'from-emerald-500 to-teal-500',
        borderCard: 'border-b-emerald-500',
        borderCardAlt: 'border-b-teal-500',
    },
    'psicologia-educativa': {
        name: 'Psicología Educativa',
        icon: 'ph-graduation-cap',
        bg: '#f5f3ff', // Violet 50
        gradients: 'radial-gradient(at 0% 0%, hsla(265,70%,94%,1) 0,transparent 50%),radial-gradient(at 50% 0%, hsla(275,70%,94%,1) 0,transparent 50%),radial-gradient(at 100% 0%, hsla(255,70%,94%,1) 0,transparent 50%)',
        primary: '#7c3aed', // Violet 600
        primaryGrad: 'linear-gradient(135deg, #7c3aed 0%, #8b5cf6 50%, #a78bfa 100%)',
        primaryShadow: 'rgba(124, 58, 237, 0.4)',
        accent: '#8b5cf6',
        accentBg: '#f5f3ff',
        accentLight: '#ede9fe',
        textAccent: '#7c3aed',
        optionHoverBorder: '#8b5cf6',
        optionHoverBg: '#f5f3ff',
        titleGradient: 'from-violet-500 to-indigo-500',
        borderCard: 'border-b-violet-500',
        borderCardAlt: 'border-b-indigo-500',
    },
    'psicologia-fisiologica': {
        name: 'Psicología Fisiológica',
        icon: 'ph-activity',
        bg: '#fff5f5', // Red 50
        gradients: 'radial-gradient(at 0% 0%, hsla(355,70%,94%,1) 0,transparent 50%),radial-gradient(at 50% 0%, hsla(5,70%,94%,1) 0,transparent 50%),radial-gradient(at 100% 0%, hsla(345,70%,94%,1) 0,transparent 50%)',
        primary: '#dc2626', // Red 600
        primaryGrad: 'linear-gradient(135deg, #dc2626 0%, #ef4444 50%, #fca5a5 100%)',
        primaryShadow: 'rgba(220, 38, 38, 0.4)',
        accent: '#ef4444',
        accentBg: '#fff5f5',
        accentLight: '#ffe4e6',
        textAccent: '#dc2626',
        optionHoverBorder: '#ef4444',
        optionHoverBg: '#fff5f5',
        titleGradient: 'from-red-500 to-rose-500',
        borderCard: 'border-b-red-500',
        borderCardAlt: 'border-b-rose-500',
    },
    'psicopatologia': {
        name: 'Psicopatología',
        icon: 'ph-shield-warning',
        bg: '#f8fafc', // Slate 50
        gradients: 'radial-gradient(at 0% 0%, hsla(215,20%,92%,1) 0,transparent 50%),radial-gradient(at 50% 0%, hsla(225,20%,90%,1) 0,transparent 50%),radial-gradient(at 100% 0%, hsla(205,20%,92%,1) 0,transparent 50%)',
        primary: '#475569', // Slate 600
        primaryGrad: 'linear-gradient(135deg, #475569 0%, #64748b 50%, #94a3b8 100%)',
        primaryShadow: 'rgba(71, 85, 105, 0.4)',
        accent: '#64748b',
        accentBg: '#f8fafc',
        accentLight: '#f1f5f9',
        textAccent: '#475569',
        optionHoverBorder: '#64748b',
        optionHoverBg: '#f8fafc',
        titleGradient: 'from-slate-600 to-zinc-500',
        borderCard: 'border-b-slate-500',
        borderCardAlt: 'border-b-zinc-500',
    },
    'estadistica-aplicada': {
        name: 'Estadística Aplicada',
        icon: 'ph-chart-line-up',
        bg: '#f0f9ff', // Sky Blue
        gradients: 'radial-gradient(at 0% 0%, hsla(192, 90%, 90%, 1) 0, transparent 50%), radial-gradient(at 50% 0%, hsla(170, 70%, 90%, 1) 0, transparent 50%), radial-gradient(at 100% 0%, hsla(210, 80%, 90%, 1) 0, transparent 50%)',
        primary: '#0284c7',
        primaryGrad: 'linear-gradient(135deg, #0284c7 0%, #0ea5e9 50%, #2dd4bf 100%)',
        primaryShadow: 'rgba(2, 132, 199, 0.4)',
        accent: '#0ea5e9',
        accentBg: '#f0f9ff',
        accentLight: '#e0f2fe',
        textAccent: '#0284c7',
        optionHoverBorder: '#0ea5e9',
        optionHoverBg: '#f0f9ff',
        titleGradient: 'from-sky-500 to-blue-500',
        borderCard: 'border-b-sky-500',
        borderCardAlt: 'border-b-blue-500',
    },
    'psicometria': {
        name: 'Psicometría',
        icon: 'ph-chart-bar',
        bg: '#ecfeff',
        gradients: 'radial-gradient(at 0% 0%, hsla(180, 80%, 92%, 1) 0, transparent 50%), radial-gradient(at 50% 0%, hsla(160, 70%, 92%, 1) 0, transparent 50%), radial-gradient(at 100% 0%, hsla(195, 80%, 92%, 1) 0, transparent 50%)',
        primary: '#0891b2',
        primaryGrad: 'linear-gradient(135deg, #0891b2 0%, #06b6d4 50%, #14b8a6 100%)',
        primaryShadow: 'rgba(6, 182, 212, 0.4)',
        accent: '#06b6d4',
        accentBg: '#ecfeff',
        accentLight: '#cffafe',
        textAccent: '#0891b2',
        optionHoverBorder: '#06b6d4',
        optionHoverBg: '#ecfeff',
        titleGradient: 'from-cyan-500 to-teal-500',
        borderCard: 'border-b-cyan-500',
        borderCardAlt: 'border-b-teal-500',
    },
        'pir-clinica': {
        name: 'Psicología Clínica (PIR)',
        icon: 'ph-heart-beat',
        bg: '#faf5ff',
        gradients: 'radial-gradient(at 0% 0%, hsla(270,70%,94%,1) 0,transparent 50%),radial-gradient(at 50% 0%, hsla(290,70%,94%,1) 0,transparent 50%),radial-gradient(at 100% 0%, hsla(250,70%,94%,1) 0,transparent 50%)',
        primary: '#7c3aed',
        primaryGrad: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 50%, #e879f9 100%)',
        primaryShadow: 'rgba(124, 58, 237, 0.4)',
        accent: '#a855f7',
        accentBg: '#f5f3ff',
        accentLight: '#ede9fe',
        textAccent: '#7c3aed',
        optionHoverBorder: '#a855f7',
        optionHoverBg: '#faf5ff',
        titleGradient: 'from-purple-500 to-fuchsia-500',
        borderCard: 'border-b-purple-500',
        borderCardAlt: 'border-b-indigo-500',
    },
    'pir-psicopatologia': {
        name: 'Psicopatología (PIR)',
        icon: 'ph-warning',
        bg: '#fff5f5',
        gradients: 'radial-gradient(at 0% 0%, hsla(350,100%,96%,1) 0,transparent 50%),radial-gradient(at 50% 0%, hsla(10,100%,96%,1) 0,transparent 50%),radial-gradient(at 100% 0%, hsla(340,100%,96%,1) 0,transparent 50%)',
        primary: '#e11d48',
        primaryGrad: 'linear-gradient(135deg, #e11d48 0%, #f43f5e 50%, #fda4af 100%)',
        primaryShadow: 'rgba(225, 29, 72, 0.4)',
        accent: '#f43f5e',
        accentBg: '#fff5f5',
        accentLight: '#ffe4e6',
        textAccent: '#e11d48',
        optionHoverBorder: '#f43f5e',
        optionHoverBg: '#fff5f5',
        titleGradient: 'from-rose-500 to-pink-500',
        borderCard: 'border-b-rose-500',
        borderCardAlt: 'border-b-orange-500',
    },
    'pir-tratamientos': {
        name: 'Evaluación y Tratamientos (PIR)',
        icon: 'ph-activity',
        bg: '#ecfeff',
        gradients: 'radial-gradient(at 0% 0%, hsla(185,80%,95%,1) 0,transparent 50%),radial-gradient(at 50% 0%, hsla(195,80%,95%,1) 0,transparent 50%),radial-gradient(at 100% 0%, hsla(175,80%,95%,1) 0,transparent 50%)',
        primary: '#0891b2',
        primaryGrad: 'linear-gradient(135deg, #0891b2 0%, #06b6d4 50%, #22d3ee 100%)',
        primaryShadow: 'rgba(8, 145, 178, 0.4)',
        accent: '#06b6d4',
        accentBg: '#f0fdfa',
        accentLight: '#cffafe',
        textAccent: '#0891b2',
        optionHoverBorder: '#06b6d4',
        optionHoverBg: '#ecfeff',
        titleGradient: 'from-cyan-500 to-teal-500',
        borderCard: 'border-b-cyan-500',
        borderCardAlt: 'border-b-teal-500',
    },

    'idiomas-ingles': {
        name: 'Inglés para Psicólogos',
        icon: 'ph-flag',
        bg: '#f0f9ff',
        gradients: 'radial-gradient(at 0% 0%, hsla(210,90%,94%,1) 0,transparent 50%),radial-gradient(at 50% 0%, hsla(220,90%,94%,1) 0,transparent 50%),radial-gradient(at 100% 0%, hsla(200,90%,94%,1) 0,transparent 50%)',
        primary: '#1d4ed8',
        primaryGrad: 'linear-gradient(135deg, #1d4ed8 0%, #3b82f6 50%, #93c5fd 100%)',
        primaryShadow: 'rgba(29, 78, 216, 0.4)',
        accent: '#3b82f6',
        accentBg: '#eff6ff',
        accentLight: '#dbeafe',
        textAccent: '#1d4ed8',
        optionHoverBorder: '#3b82f6',
        optionHoverBg: '#eff6ff',
        titleGradient: 'from-blue-700 to-blue-400',
        borderCard: 'border-b-blue-700',
        borderCardAlt: 'border-b-blue-400',
    },
    'idiomas-frances': {
        name: 'Français pour Psychologues',
        icon: 'ph-flag',
        bg: '#fff9f0',
        gradients: 'radial-gradient(at 0% 0%, hsla(30,100%,96%,1) 0,transparent 50%),radial-gradient(at 50% 0%, hsla(15,100%,96%,1) 0,transparent 50%),radial-gradient(at 100% 0%, hsla(45,100%,96%,1) 0,transparent 50%)',
        primary: '#d97706',
        primaryGrad: 'linear-gradient(135deg, #d97706 0%, #f59e0b 50%, #fcd34d 100%)',
        primaryShadow: 'rgba(217, 119, 6, 0.4)',
        accent: '#f59e0b',
        accentBg: '#fffbeb',
        accentLight: '#fef3c7',
        textAccent: '#d97706',
        optionHoverBorder: '#f59e0b',
        optionHoverBg: '#fffbeb',
        titleGradient: 'from-amber-600 to-yellow-500',
        borderCard: 'border-b-amber-600',
        borderCardAlt: 'border-b-yellow-500',
    },

'_default': {
        name: 'Asignatura',
        icon: 'ph-brain',
        bg: '#f8fafc',
        gradients: 'radial-gradient(at 0% 0%, hsla(220,70%,94%,1) 0,transparent 50%),radial-gradient(at 50% 0%, hsla(230,70%,94%,1) 0,transparent 50%),radial-gradient(at 100% 0%, hsla(210,70%,94%,1) 0,transparent 50%)',
        primary: '#3b82f6',
        primaryGrad: 'linear-gradient(135deg, #3b82f6 0%, #60a5fa 50%, #93c5fd 100%)',
        primaryShadow: 'rgba(59, 130, 246, 0.4)',
        accent: '#60a5fa',
        accentBg: '#eff6ff',
        accentLight: '#dbeafe',
        textAccent: '#3b82f6',
        optionHoverBorder: '#60a5fa',
        optionHoverBg: '#eff6ff',
        titleGradient: 'from-blue-500 to-indigo-500',
        borderCard: 'border-b-blue-500',
        borderCardAlt: 'border-b-indigo-500',
    }
};

// HTML base de la UI que se inyectará en el body
const LAYOUT_HTML = `
    <!-- Header Global -->
    <header class="glass-card sticky top-0 z-50 px-6 py-4">
        <div class="max-w-6xl mx-auto flex justify-between items-center">
            <div class="flex items-center gap-3 cursor-pointer" onclick="app.showView('home')">
                <div id="header-icon-bg" class="text-white p-2 rounded-lg shadow-lg">
                    <i id="header-icon" class="ph-bold text-2xl"></i>
                </div>
                <div>
                    <h1 id="header-title" class="font-extrabold text-xl tracking-tight text-slate-800">Cargando...</h1>
                    <p id="header-subtitle" class="text-[9px] uppercase tracking-widest font-bold"></p>
                </div>
            </div>

            <div class="flex items-center gap-4">
                <a href="../../../index.html" id="back-btn" class="flex items-center gap-1.5 px-3.5 py-2 border border-slate-200 rounded-xl font-bold text-xs text-slate-600 transition-all bg-white shadow-sm cursor-pointer">
                    <i class="ph-bold ph-arrow-left"></i> Volver al Portal
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
            <div class="animate-spin w-12 h-12 border-4 border-slate-200 border-t-slate-600 rounded-full mb-6"></div>
            <p class="text-slate-500 font-semibold">Cargando preguntas...</p>
        </section>

        <!-- VIEW: ERROR -->
        <section id="view-error" class="hidden fade-in w-full flex flex-col items-center justify-center py-20">
            <div class="glass-card rounded-3xl p-12 text-center max-w-md">
                <i class="ph-bold ph-warning-circle text-5xl text-red-400 mb-4"></i>
                <h2 class="text-2xl font-bold text-slate-800 mb-2">Error al cargar</h2>
                <p id="error-message" class="text-slate-500 mb-6">No se pudieron cargar las preguntas.</p>
                <a href="../../../index.html" class="btn-primary py-3 px-8 rounded-xl inline-block">Volver al Portal</a>
            </div>
        </section>

        <!-- VIEW: HOME (MENU) -->
        <section id="view-home" class="hidden fade-in w-full">
            <div class="text-center mb-12">
                <h1 id="saimap-title" class="text-6xl md:text-8xl font-black text-transparent bg-clip-text mb-8 tracking-tighter opacity-80 select-none">SAIMAP</h1>
                <h2 class="text-3xl md:text-4xl font-extrabold text-slate-800 mb-4">¿Cómo quieres estudiar hoy?</h2>
                <p class="text-slate-500">Selecciona la herramienta que mejor se adapte a tu necesidad actual.</p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                <div onclick="app.startTool('quiz')" class="glass-card p-8 rounded-3xl cursor-pointer hover:scale-105 transition-all group" id="card-quiz">
                    <div id="icon-quiz" class="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition">
                        <i class="ph-bold ph-list-checks text-3xl"></i>
                    </div>
                    <h3 class="text-xl font-bold mb-2">Test Rápido</h3>
                    <p class="text-sm text-slate-500 leading-relaxed">Opción múltiple con pistas y repaso de errores final.</p>
                </div>

                <div onclick="app.startTool('trainer')" class="glass-card p-8 rounded-3xl cursor-pointer hover:scale-105 transition-all group" id="card-trainer">
                    <div id="icon-trainer" class="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition">
                        <i class="ph-bold ph-pencil-line text-3xl"></i>
                    </div>
                    <h3 class="text-xl font-bold mb-2">Entrenador</h3>
                    <p class="text-sm text-slate-500 leading-relaxed">Desarrolla respuestas abiertas analizadas por conceptos clave.</p>
                </div>

                <div onclick="app.startTool('flashcards')" class="glass-card p-8 rounded-3xl cursor-pointer hover:scale-105 transition-all group" id="card-flashcards">
                    <div id="icon-flashcards" class="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition">
                        <i class="ph-bold ph-cards text-3xl"></i>
                    </div>
                    <h3 class="text-xl font-bold mb-2">Flashcards</h3>
                    <p class="text-sm text-slate-500 leading-relaxed">Tarjetas de memoria para repaso rápido e intensivo.</p>
                </div>
            </div>

            <!-- Contenedor para botones de navegación de temas -->
            <div id="theme-navigation-container" class="mt-12 flex justify-between items-center w-full max-w-xl mx-auto gap-4 pt-6 border-t border-slate-200/60"></div>
        </section>

        <!-- VIEW: QUIZ -->
        <section id="view-quiz" class="hidden w-full fade-in space-y-6">
            <div id="quiz-setup" class="hidden glass-card rounded-3xl p-8 relative overflow-hidden text-center border-2 border-white shadow-xl">
                <div id="quiz-setup-bar" class="absolute top-0 left-0 w-full h-1"></div>
                <div id="quiz-setup-icon" class="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <i class="ph-bold ph-list-checks text-3xl"></i>
                </div>
                <h3 class="text-2xl font-bold text-slate-800 mb-2">Configuración del Test</h3>
                <p class="text-sm text-slate-500 mb-8 max-w-sm mx-auto">Selecciona si prefieres realizar el test completo o repasar únicamente las preguntas que fallaste anteriormente.</p>
                <div class="flex flex-col sm:flex-row gap-4 max-w-md mx-auto w-full">
                    <button onclick="app.launchQuizSession(false)" class="flex-1 btn-primary py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2">
                        <i class="ph-bold ph-play"></i> Test Completo (<span id="setup-quiz-total-count">0</span>)
                    </button>
                    <button onclick="app.launchQuizSession(true)" class="flex-1 bg-red-50 border border-red-200 text-red-700 py-4 rounded-2xl font-bold text-sm hover:bg-red-100 transition flex items-center justify-center gap-2">
                        <i class="ph-bold ph-warning-circle"></i> Repasar Falladas (<span id="setup-quiz-fail-count">0</span>)
                    </button>
                </div>
                <button onclick="app.showView('home')" class="mt-6 text-xs text-slate-400 hover:text-slate-600 font-bold uppercase tracking-wider transition">Volver al Menú</button>
            </div>

            <div id="quiz-play-area" class="glass-card rounded-3xl p-8 relative overflow-hidden">
                <div id="quiz-play-bar" class="absolute top-0 left-0 w-full h-1"></div>
                <div class="flex justify-between items-center mb-6">
                    <div class="flex items-center gap-3">
                        <span class="text-xs font-bold text-slate-400 uppercase tracking-widest">Modo Test</span>
                        <button onclick="app.finishQuiz()" class="text-red-500 font-bold text-[10px] uppercase tracking-tighter hover:bg-red-50 px-2 py-1 rounded-lg transition border border-red-100">Finalizar Sesión</button>
                    </div>
                    <button onclick="app.quizToggleHint()" class="text-amber-600 font-bold text-xs flex items-center gap-1 hover:bg-amber-50 px-3 py-1.5 rounded-lg transition">
                        <i class="ph-bold ph-lightbulb"></i> Ver Pista
                    </button>
                </div>
                <h2 id="quiz-question" class="text-2xl font-bold text-slate-800 mb-8 leading-snug">Pregunta</h2>
                <div id="quiz-hint-box" class="hidden mb-6 p-4 bg-amber-50 border-l-4 border-amber-400 text-amber-900 text-sm italic rounded-r-xl"></div>
                <div id="quiz-options" class="space-y-3"></div>
                <div id="quiz-feedback" class="hidden mt-8 p-6 rounded-2xl border transition-all">
                    <div class="flex items-start gap-4">
                        <div id="quiz-feedback-icon" class="text-3xl"></div>
                        <div>
                            <h4 id="quiz-feedback-title" class="font-bold text-lg"></h4>
                            <p id="quiz-explanation" class="text-sm text-slate-600 mt-1"></p>
                        </div>
                    </div>
                    <button onclick="app.quizNext()" class="mt-6 btn-primary py-4 px-8 rounded-xl w-full flex items-center justify-center gap-2">
                        Continuar <i class="ph ph-arrow-right"></i>
                    </button>
                </div>
            </div>
        </section>

        <!-- VIEW: TRAINER -->
        <section id="view-trainer" class="hidden w-full fade-in space-y-6">
            <div id="trainer-card" class="glass-card rounded-3xl p-8 border-t-4">
                <h2 id="trainer-question" class="text-2xl font-bold text-slate-800 mb-6">Pregunta de desarrollo</h2>
                <textarea id="trainer-input" class="w-full h-40 p-6 rounded-2xl bg-white/50 border border-slate-200 outline-none focus:ring-4 transition resize-none text-lg" placeholder="Desarrolla tu respuesta aquí..."></textarea>
                <div class="flex justify-between mt-6">
                    <button onclick="app.trainerShowHint()" class="text-amber-600 font-bold text-sm flex items-center gap-1"><i class="ph ph-lightbulb"></i> Ver Pista</button>
                    <button onclick="app.trainerCheck()" class="btn-primary py-3 px-8 rounded-xl">Corregir</button>
                </div>
                <div id="trainer-hint-box" class="hidden mt-4 p-4 bg-amber-50 rounded-xl text-amber-800 text-sm border border-amber-100 italic"></div>
            </div>
            <div id="trainer-feedback" class="hidden grid grid-cols-1 md:grid-cols-2 gap-6">
                <div id="trainer-fb-1" class="glass-card p-6 rounded-2xl border-t-4">
                    <h4 class="font-bold mb-4 text-slate-400 uppercase text-xs">Análisis de Conceptos</h4>
                    <div id="trainer-user-text" class="text-sm leading-relaxed max-h-48 overflow-y-auto pr-2"></div>
                </div>
                <div id="trainer-fb-2" class="glass-card p-6 rounded-2xl border-t-4">
                    <h4 class="font-bold mb-4 text-slate-400 uppercase text-xs">Respuesta Modelo</h4>
                    <div id="trainer-model-text" class="text-sm leading-relaxed max-h-48 overflow-y-auto pr-2"></div>
                </div>
                <button onclick="app.trainerNext()" class="md:col-span-2 bg-slate-800 text-white py-4 rounded-2xl font-bold shadow-lg transform active:scale-95 transition">Siguiente Pregunta</button>
            </div>
        </section>

        <!-- VIEW: FLASHCARDS -->
        <section id="view-flashcards" class="hidden w-full fade-in flex flex-col items-center">
            <div id="fc-setup" class="hidden glass-card rounded-3xl p-8 relative overflow-hidden text-center border-2 border-white shadow-xl w-full max-w-xl mb-8">
                <div id="fc-setup-bar" class="absolute top-0 left-0 w-full h-1"></div>
                <div id="fc-setup-icon" class="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <i class="ph-bold ph-cards text-3xl"></i>
                </div>
                <h3 class="text-2xl font-bold text-slate-800 mb-2">Configuración de Flashcards</h3>
                <p class="text-sm text-slate-500 mb-8 max-w-sm mx-auto">Selecciona si deseas estudiar el mazo completo o repasar únicamente las tarjetas que no te sabías.</p>
                <div class="flex flex-col sm:flex-row gap-4 max-w-md mx-auto w-full">
                    <button onclick="app.launchFlashcardSession(false)" class="flex-1 btn-primary py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2">
                        <i class="ph-bold ph-play"></i> Mazo Completo (<span id="setup-fc-total-count">0</span>)
                    </button>
                    <button onclick="app.launchFlashcardSession(true)" class="flex-1 bg-red-50 border border-red-200 text-red-700 py-4 rounded-2xl font-bold text-sm hover:bg-red-100 transition flex items-center justify-center gap-2">
                        <i class="ph-bold ph-warning-circle"></i> Repasar No Sabidas (<span id="setup-fc-fail-count">0</span>)
                    </button>
                </div>
                <button onclick="app.showView('home')" class="mt-6 text-xs text-slate-400 hover:text-slate-600 font-bold uppercase tracking-wider transition">Volver al Menú</button>
            </div>
            <div id="fc-play-area" class="w-full flex flex-col items-center">
                <div class="flex justify-between items-center w-full max-w-xl mb-4">
                    <span class="text-xs font-bold text-slate-400 uppercase tracking-widest">Modo Flashcards</span>
                    <button onclick="app.finishFlashcards()" class="text-red-500 font-bold text-[10px] uppercase tracking-tighter hover:bg-red-50 px-2 py-1 rounded-lg transition border border-red-100">Finalizar Sesión</button>
                </div>
                <div class="w-full max-w-xl perspective-1000 h-80 mb-8">
                    <div id="fc-card" class="card-inner" onclick="app.fcFlip()">
                        <div class="card-face card-front">
                            <span id="fc-cat" class="px-3 py-1 rounded-full text-xs font-bold mb-4">CATEGORÍA</span>
                            <p id="fc-question" class="text-xl font-bold text-slate-800"></p>
                            <p class="absolute bottom-4 text-[10px] text-slate-400 uppercase font-bold">Toca para girar</p>
                        </div>
                        <div id="fc-card-back" class="card-face card-back">
                            <p id="fc-answer" class="text-lg font-medium px-4"></p>
                        </div>
                    </div>
                </div>
                <div id="fc-normal-controls" class="flex gap-4 w-full max-w-xl">
                    <button onclick="app.fcPrev()" class="flex-1 glass-card py-4 rounded-2xl font-bold hover:bg-slate-50 transition text-sm">Anterior</button>
                    <button onclick="app.fcShuffle()" class="px-6 glass-card rounded-2xl transition active:scale-90"><i class="ph-bold ph-shuffle"></i></button>
                    <button onclick="app.fcNext()" class="flex-1 btn-primary py-4 rounded-2xl font-bold text-sm">Siguiente</button>
                </div>
                <div id="fc-flipped-controls" class="hidden flex gap-4 w-full max-w-xl">
                    <button onclick="app.fcMark(false)" class="flex-1 bg-red-500 hover:bg-red-600 text-white py-4 rounded-2xl font-bold transition text-sm flex items-center justify-center gap-2 shadow-lg shadow-red-100">
                        <i class="ph-bold ph-x-circle text-lg"></i> No lo sabía
                    </button>
                    <button id="fc-knew-btn" onclick="app.fcMark(true)" class="flex-1 text-white py-4 rounded-2xl font-bold transition text-sm flex items-center justify-center gap-2 shadow-lg">
                        <i class="ph-bold ph-check-circle text-lg"></i> Me lo sabía
                    </button>
                </div>
            </div>
        </section>

        <!-- VIEW: RESULTS -->
        <section id="view-results" class="hidden w-full fade-in flex flex-col items-center">
            <div class="glass-card rounded-3xl p-12 text-center max-w-xl w-full border-2 border-white shadow-xl relative overflow-hidden">
                <div id="results-bar" class="absolute top-0 left-0 w-full h-1"></div>
                <div id="results-trophy" class="w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-inner">
                    <i class="ph-bold ph-trophy text-5xl"></i>
                </div>
                <h2 class="text-3xl font-extrabold text-slate-800 mb-2">¡Sesión Completada!</h2>
                <p id="result-text" class="text-slate-600 mb-8 text-lg font-medium"></p>
                <div class="flex flex-col gap-3 w-full">
                    <button id="btn-retry-errors" onclick="app.quizRetryErrors()" class="hidden w-full py-4 bg-red-500 hover:bg-red-600 text-white rounded-2xl font-bold transition flex items-center justify-center gap-2 shadow-lg shadow-red-100">
                        <i class="ph-bold ph-warning-circle text-lg"></i> Repasar Preguntas Falladas (<span id="fail-count">0</span>)
                    </button>
                    <button id="btn-retry-flashcards" onclick="app.fcRetryErrors()" class="hidden w-full py-4 bg-red-500 hover:bg-red-600 text-white rounded-2xl font-bold transition flex items-center justify-center gap-2 shadow-lg shadow-red-100">
                        <i class="ph-bold ph-warning-circle text-lg"></i> Repasar No Sabidas (<span id="fc-fail-count">0</span>)
                    </button>
                    <button onclick="app.showView('home')" class="w-full py-4 glass-card hover:bg-slate-50 text-slate-700 rounded-2xl font-bold transition">Volver al Menú Principal</button>
                </div>
                <div id="guest-results-cta" class="hidden mt-8 p-6 rounded-2xl bg-gradient-to-br from-indigo-50/50 to-purple-50/50 border border-indigo-100/50 text-center space-y-4">
                    <h3 class="font-bold text-slate-800 text-base flex items-center justify-center gap-1.5"><i class="ph-bold ph-sparkles text-amber-500"></i> ¿Te ha gustado este primer tema?</h3>
                    <p class="text-xs text-slate-500 leading-relaxed max-w-sm mx-auto">Únete a la academia para desbloquear el temario completo, miles de preguntas tipo test, flashcards interactivas y recursos de estudio premium.</p>
                    <a href="https://www.skool.com/saimap-ia-learning-4493/about" target="_blank" class="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white text-xs font-bold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2">
                        <span>Desbloquear Todo en Skool</span>
                        <i class="ph-bold ph-arrow-square-out text-sm"></i>
                    </a>
                </div>
            </div>
        </section>

    </main>
`;

const COMMON_CSS = `
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;800&display=swap');
    body {
        font-family: 'Outfit', sans-serif;
        background-attachment: fixed;
        min-height: 100vh;
    }
    .hidden {
        display: none !important;
    }
    .glass-card {
        background: rgba(255, 255, 255, 0.75);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.9);
        box-shadow: 0 10px 40px -10px rgba(100, 116, 139, 0.15);
    }
    .btn-primary {
        background-size: 200% 200%;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        color: white;
        font-weight: 700;
    }
    .btn-primary:hover:not(:disabled) {
        transform: translateY(-2px);
        background-position: 100% 50%;
    }
    .perspective-1000 { perspective: 1000px; }
    .card-inner {
        position: relative; width: 100%; height: 100%;
        text-align: center;
        transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        transform-style: preserve-3d;
        cursor: pointer;
    }
    .card-inner.flipped { transform: rotateY(180deg); }
    .card-face {
        position: absolute; width: 100%; height: 100%;
        -webkit-backface-visibility: hidden; backface-visibility: hidden;
        display: flex; flex-direction: column; justify-content: center; align-items: center;
        padding: 2rem; border-radius: 1.5rem;
    }
    .card-front { background: white; border: 2px solid #e2e8f0; }
    .card-back { color: white; transform: rotateY(180deg); }
    .fade-in { animation: fadeIn 0.5s ease-out forwards; }
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    .highlight-keyword {
        background-color: rgba(34, 197, 94, 0.15);
        color: #15803d; font-weight: 700;
        border-bottom: 2px solid #22c55e;
        padding: 0 2px; border-radius: 4px;
    }
    .option-btn {
        transition: all 0.2s;
        border: 2px solid #e2e8f0;
    }
    .option-btn:hover:not(:disabled) {
        transform: translateX(5px);
    }
`;

// Variables globales que contendrán la asignatura y el tema actual
let SUBJECT_ID = '';
let TEMA_KEY = '';
let COURSE_ID = '1º';
let FOLDER_ID = 'Otros';

// ====================================================================
// INICIALIZACIÓN DE LA MÁQUINA DE TEMAS
// ====================================================================
document.addEventListener("DOMContentLoaded", () => {
    // 0. Extraer COURSE_ID y FOLDER_ID de la URL
    const pathPartsDecoded = decodeURIComponent(window.location.pathname).replace(/\\/g, '/').split('/');
    const temasIndexDecoded = pathPartsDecoded.indexOf('temas');
    if (temasIndexDecoded !== -1 && pathPartsDecoded.length > temasIndexDecoded + 2) {
        COURSE_ID = pathPartsDecoded[temasIndexDecoded + 1];
        FOLDER_ID = pathPartsDecoded[temasIndexDecoded + 2];
    }

    // 1. Leer configuración embebida en el HTML
    const configEl = document.getElementById('tema-config');
    
    if (!configEl) {
        // Fallback: Si no hay elementos embebidos, intentar leer parámetros de la URL
        const params = new URLSearchParams(window.location.search);
        SUBJECT_ID = params.get('asignatura') || '';
        TEMA_KEY = params.get('tema') || '';
    } else {
        try {
            const config = JSON.parse(configEl.textContent);
            SUBJECT_ID = config.asignaturaId || '';
            TEMA_KEY = config.temaKey || '';
        } catch (e) {
            console.error("Error al parsear config:", e);
        }
    }

    if (!SUBJECT_ID || !TEMA_KEY) {
        renderErrorScreen('No se pudo encontrar la configuración de asignatura o tema en la página.');
        return;
    }

    // 2. Verificación de autenticación si está activada
    window.isGuest = false;
    if (REQUIRE_AUTH) {
        const userEmail = localStorage.getItem('saimap_user_email');
        if (!userEmail) {
            // Verificar si es el Tema 1 (gratis para invitados)
            const cleanTemaKey = String(TEMA_KEY).replace(/-/g, '.');
            const isTheme1 = /^1(\.|$)/.test(cleanTemaKey);
            if (isTheme1) {
                window.isGuest = true;
            } else {
                // Redirigir al dashboard para iniciar sesión, conservando la URL original para volver
                window.location.href = "../../../index.html?lock=true&redirect=" + encodeURIComponent(window.location.href);
                return;
            }
        }
    }

    // 3. Cargar dependencias en el <head> de manera dinámica
    loadDependencies();

    // 4. Inyectar HTML en el body
    document.body.className = "flex flex-col min-h-screen";
    document.body.innerHTML = LAYOUT_HTML;

    // 5. Si es invitado, añadir banner superior y ajustar la posición del header sticky
    if (window.isGuest) {
        const bannerHTML = `
            <div id="guest-sticky-banner" class="sticky top-0 z-[60] w-full bg-white/90 backdrop-blur-md border-b border-indigo-100 py-3 px-4 text-center text-slate-700 text-xs md:text-sm font-bold shadow-sm flex items-center justify-center gap-2">
                <span>✨ Estás en el Tema 1 (Prueba Gratuita).</span>
                <a href="https://www.skool.com/saimap-ia-learning-4493/about" target="_blank" class="text-indigo-600 hover:text-indigo-800 underline inline-flex items-center gap-1">
                    Únete a la academia para desbloquear más de 40 asignaturas y miles de preguntas de examen
                </a>
            </div>
        `;
        document.body.insertAdjacentHTML('afterbegin', bannerHTML);
        
        // Ajustar top de header sticky para que se vea justo debajo del banner
        const headerEl = document.querySelector('header');
        if (headerEl) {
            headerEl.style.top = '45px';
        }
    }

    // 4. Aplicar tema visual e inicializar
    const theme = THEME_CONFIG[SUBJECT_ID] || THEME_CONFIG['_default'];
    applyTheme(theme);

    // 5. Cargar base de datos de preguntas de forma asíncrona (JSON externo)
    const temaFilePart = String(TEMA_KEY).replace(/\./g, '-');
    const fetchUrl = `../../../json/${COURSE_ID}/${FOLDER_ID}/${SUBJECT_ID}-tema-${temaFilePart}.json`;

    fetch(fetchUrl)
        .then(res => {
            if (!res.ok) {
                throw new Error(`Servidor respondió con código ${res.status}`);
            }
            return res.json();
        })
        .then(data => {
            app.DB = {
                quiz: data.quiz || [],
                trainer: data.trainer || [],
                flashcards: data.flashcards || []
            };

            // 6. Cargar fallos guardados
            app.loadSavedFailures();

            // 7. Ocultar pantalla de carga e iniciar
            document.getElementById('view-loading').classList.add('hidden');
            app.showView('home');

            // 8. Desbloquear tema en localStorage para el portal index.html
            unlockTemaInPortal(theme.name);
        })
        .catch(err => {
            console.error("Error al cargar JSON:", err);
            let userMsg = `No se pudo cargar el archivo de preguntas (Ruta: <code>${fetchUrl}</code>).<br><br>`;
            if (window.location.protocol === 'file:') {
                userMsg += `<strong>Causa probable:</strong> Estás abriendo el HTML localmente haciendo doble clic desde el Explorador de Archivos.<br>`;
                userMsg += `Las normas de seguridad de los navegadores modernos (CORS) bloquean la carga de archivos locales externos.<br><br>`;
                userMsg += `<strong>Solución:</strong> Sube la plataforma a GitHub Pages, o ejecuta un servidor web local (como Live Server de VS Code o <code>python -m http.server</code>).`;
            } else {
                userMsg += `<strong>Detalles del error:</strong> ${err.message}`;
            }
            renderErrorScreen(userMsg);
        });
});

function loadDependencies() {
    // Tailwind
    if (!window.tailwind) {
        const tw = document.createElement('script');
        tw.src = "https://cdn.tailwindcss.com";
        document.head.appendChild(tw);
    }

    // Phosphor Icons
    const ph = document.createElement('script');
    ph.src = "https://unpkg.com/@phosphor-icons/web";
    document.head.appendChild(ph);

    // CSS Común
    const style = document.createElement('style');
    style.textContent = COMMON_CSS;
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
        </div>
    `;
}

function applyTheme(t) {
    // Background
    document.body.style.backgroundColor = t.bg;
    document.body.style.backgroundImage = t.gradients;

    // Title
    const cleanKey = String(TEMA_KEY).replace(/-/g, '.');
    const temaLabel = `Tema ${cleanKey}`;
    const subtitle = THEME_SUBTITLES[SUBJECT_ID]?.[cleanKey] || "";
    document.title = `${temaLabel}${subtitle ? ': ' + subtitle : ''} - ${t.name} - SAIMAP`;
    document.getElementById('header-title').textContent = subtitle ? `${temaLabel}: ${subtitle}` : temaLabel;
    document.getElementById('header-subtitle').textContent = t.name;
    document.getElementById('header-subtitle').style.color = t.textAccent;
    document.getElementById('header-icon-bg').style.backgroundColor = t.primary;
    document.getElementById('header-icon').className = `ph-bold ${t.icon} text-2xl`;

    // Back button hover styles
    const bb = document.getElementById('back-btn');
    bb.onmouseenter = () => { bb.style.borderColor = t.primary; bb.style.color = t.primary; };
    bb.onmouseleave = () => { bb.style.borderColor = ''; bb.style.color = ''; };

    // Title gradient
    document.getElementById('saimap-title').className =
        `text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r ${t.titleGradient} mb-8 tracking-tighter opacity-80 select-none`;

    // Counter color
    document.getElementById('global-counter').style.color = t.primary;

    // Card colors
    ['quiz', 'trainer'].forEach(id => {
        document.getElementById('card-' + id).classList.add(t.borderCard);
        const icon = document.getElementById('icon-' + id);
        icon.style.backgroundColor = t.accentLight;
        icon.style.color = t.primary;
    });
    document.getElementById('card-flashcards').classList.add(t.borderCardAlt);
    const fcIcon = document.getElementById('icon-flashcards');
    fcIcon.style.backgroundColor = t.accentLight;
    fcIcon.style.color = t.primary;

    // Primary buttons gradient
    document.querySelectorAll('.btn-primary').forEach(btn => {
        btn.style.background = t.primaryGrad;
        btn.style.backgroundSize = '200% 200%';
    });

    // Custom styles for hover states
    const style = document.createElement('style');
    style.textContent = `
        .btn-primary:hover:not(:disabled) { box-shadow: 0 8px 25px ${t.primaryShadow}; }
        .option-btn:hover:not(:disabled) { border-color: ${t.optionHoverBorder} !important; background-color: ${t.optionHoverBg} !important; }
    `;
    document.head.appendChild(style);

    // Accent lines and highlights
    ['quiz-setup-bar', 'quiz-play-bar', 'fc-setup-bar', 'results-bar'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.backgroundColor = t.primary;
    });
    ['quiz-setup-icon', 'fc-setup-icon'].forEach(id => {
        const el = document.getElementById(id);
        if (el) { el.style.backgroundColor = t.accentLight; el.style.color = t.primary; }
    });

    // Trainer views
    document.getElementById('trainer-card').style.borderColor = t.primary;
    document.getElementById('trainer-fb-1').style.borderColor = t.accent;
    document.getElementById('trainer-fb-2').style.borderColor = t.accent;
    document.getElementById('trainer-input').style.setProperty('--tw-ring-color', t.accentLight);

    // Flashcard views
    document.getElementById('fc-cat').style.backgroundColor = t.accentLight;
    document.getElementById('fc-cat').style.color = t.primary;
    document.getElementById('fc-card-back').style.backgroundColor = t.primary;

    // FC "me lo sabía"
    const knewBtn = document.getElementById('fc-knew-btn');
    knewBtn.style.backgroundColor = t.primary;

    // Trophy in results screen
    const trophy = document.getElementById('results-trophy');
    trophy.style.backgroundColor = t.accentBg;
    trophy.style.color = t.accent;

    // Cargar botones de navegación de temas
    const themeNavigationContainer = document.getElementById('theme-navigation-container');
    if (themeNavigationContainer) {
        const keys = Object.keys(THEME_SUBTITLES[SUBJECT_ID] || {});
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

        const cleanKey = String(TEMA_KEY).replace(/-/g, '.');
        const currentIdx = sortedKeys.indexOf(cleanKey);

        if (currentIdx !== -1) {
            const prevKey = sortedKeys[currentIdx - 1];
            const nextKey = sortedKeys[currentIdx + 1];
            const isLastTheme = currentIdx === sortedKeys.length - 1;

            let prevButtonHTML = '';
            if (prevKey) {
                let shortId = SUBJECT_ID;
                if (SUBJECT_ID === 'psicologia-del-aprendizaje') shortId = 'aprendizaje';
                else if (SUBJECT_ID === 'bases-biologicas-del-comportamiento') shortId = 'psicobiologia';
                else if (SUBJECT_ID === 'historia-de-la-psicologia') shortId = 'historia';
                else if (SUBJECT_ID === 'psicologia-educativa' || SUBJECT_ID === 'psicologia-fisiologica') shortId = SUBJECT_ID;
                else if (SUBJECT_ID.startsWith('psicologia-de-la-')) shortId = SUBJECT_ID.replace('psicologia-de-la-', '');
                else if (SUBJECT_ID.startsWith('psicologia-del-')) shortId = SUBJECT_ID.replace('psicologia-del-', '');
                else if (SUBJECT_ID.startsWith('psicologia-')) shortId = SUBJECT_ID.replace('psicologia-', '');

                const temaFilePart = String(prevKey).replace(/\./g, '-');
                const prevUrl = `../../../temas/${encodeURIComponent(COURSE_ID)}/${encodeURIComponent(FOLDER_ID)}/${shortId}-tema-${temaFilePart}.html`;

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
                let shortId = SUBJECT_ID;
                if (SUBJECT_ID === 'psicologia-del-aprendizaje') shortId = 'aprendizaje';
                else if (SUBJECT_ID === 'bases-biologicas-del-comportamiento') shortId = 'psicobiologia';
                else if (SUBJECT_ID === 'historia-de-la-psicologia') shortId = 'historia';
                else if (SUBJECT_ID === 'psicologia-educativa' || SUBJECT_ID === 'psicologia-fisiologica') shortId = SUBJECT_ID;
                else if (SUBJECT_ID.startsWith('psicologia-de-la-')) shortId = SUBJECT_ID.replace('psicologia-de-la-', '');
                else if (SUBJECT_ID.startsWith('psicologia-del-')) shortId = SUBJECT_ID.replace('psicologia-del-', '');
                else if (SUBJECT_ID.startsWith('psicologia-')) shortId = SUBJECT_ID.replace('psicologia-', '');

                const temaFilePart = String(nextKey).replace(/\./g, '-');
                const nextUrl = `../../../temas/${encodeURIComponent(COURSE_ID)}/${encodeURIComponent(FOLDER_ID)}/${shortId}-tema-${temaFilePart}.html`;

                nextButtonHTML = `
                    <a href="${nextUrl}" class="flex-1 py-4 text-white rounded-2xl font-bold transition text-sm flex items-center justify-center gap-2 shadow-lg" style="background: ${t.primaryGrad}; box-shadow: 0 8px 25px ${t.primaryShadow};">
                        Tema Siguiente (${nextKey}) <i class="ph-bold ph-arrow-right"></i>
                    </a>
                `;
            } else if (isLastTheme) {
                nextButtonHTML = `
                    <a href="../../../index.html?asignatura=${SUBJECT_ID}" class="flex-1 py-4 text-white rounded-2xl font-bold transition text-sm flex items-center justify-center gap-2 shadow-lg" style="background: ${t.primaryGrad}; box-shadow: 0 8px 25px ${t.primaryShadow};">
                        <i class="ph-bold ph-trophy"></i> Ir al Examen Final <i class="ph-bold ph-arrow-right"></i>
                    </a>
                `;
            } else {
                nextButtonHTML = `<div class="flex-1"></div>`;
            }

            themeNavigationContainer.innerHTML = `
                ${prevButtonHTML}
                ${nextButtonHTML}
            `;
        }
    }
}

function unlockTemaInPortal(subjectName) {
    try {
        let unlocked = JSON.parse(localStorage.getItem('saimap_unlocked')) || {};
        if (!unlocked[SUBJECT_ID]) {
            unlocked[SUBJECT_ID] = {
                name: subjectName,
                year: COURSE_ID,
                unlockedTemas: []
            };
        }
        
        // Formateamos la clave para mostrarla en el selector del portal ("Tema 2.1" en lugar de "Tema 2-1")
        const labelKey = `Tema ${String(TEMA_KEY).replace(/-/g, '.')}`;
        
        if (!unlocked[SUBJECT_ID].unlockedTemas.includes(labelKey)) {
            unlocked[SUBJECT_ID].unlockedTemas.push(labelKey);
        }
        localStorage.setItem('saimap_unlocked', JSON.stringify(unlocked));
    } catch(e) {
        console.error("Error al guardar desbloqueo en localStorage:", e);
    }
}

// ====================================================================
// APP — LÓGICA DE CONTROL DEL QUIZ/TRAINER/FLASHCARDS
// ====================================================================
const app = {
    DB: { quiz: [], trainer: [], flashcards: [] },

    state: {
        currentTool: null,
        index: 0,
        isFlipped: false,
        activeData: [],
        failedQuestions: [],
        failedFlashcards: [],
        persistedFailedQuestions: [],
        persistedFailedFlashcards: [],
        score: 0
    },

    showView(viewId) {
        ['loading', 'error', 'home', 'quiz', 'trainer', 'flashcards', 'results'].forEach(v => {
            const el = document.getElementById('view-' + v);
            if (el) el.classList.add('hidden');
        });
        const t = document.getElementById('view-' + viewId);
        if (t) t.classList.remove('hidden');
        
        const nav = document.getElementById('nav-controls');
        if (nav) {
            nav.classList.toggle('hidden', viewId === 'home' || viewId === 'loading' || viewId === 'error');
        }

        if (viewId === 'results') {
            const guestCta = document.getElementById('guest-results-cta');
            if (guestCta) {
                if (window.isGuest) {
                    guestCta.classList.remove('hidden');
                } else {
                    guestCta.classList.add('hidden');
                }
            }
        }
    },

    shuffleArray(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    },

    updateCounter() {
        const el = document.getElementById('global-counter');
        if (el) el.innerText = `${this.state.index + 1}/${this.state.activeData.length}`;
    },

    // --- Persistencia de Preguntas Falladas ---
    saveFailures() {
        try {
            const qTexts = this.state.persistedFailedQuestions.map(i => i.q);
            const fcTexts = this.state.persistedFailedFlashcards.map(i => i.q);
            localStorage.setItem(`saimap_failed_questions_${SUBJECT_ID}_${TEMA_KEY}`, JSON.stringify(qTexts));
            localStorage.setItem(`saimap_failed_flashcards_${SUBJECT_ID}_${TEMA_KEY}`, JSON.stringify(fcTexts));
        } catch(e) {}
    },

    loadSavedFailures() {
        try {
            const savedQs = JSON.parse(localStorage.getItem(`saimap_failed_questions_${SUBJECT_ID}_${TEMA_KEY}`)) || [];
            const savedFcs = JSON.parse(localStorage.getItem(`saimap_failed_flashcards_${SUBJECT_ID}_${TEMA_KEY}`)) || [];
            this.state.persistedFailedQuestions = (this.DB.quiz || []).filter(i => savedQs.includes(i.q));
            this.state.persistedFailedFlashcards = (this.DB.flashcards || []).filter(i => savedFcs.includes(i.q));
        } catch(e) {
            this.state.persistedFailedQuestions = [];
            this.state.persistedFailedFlashcards = [];
        }
    },

    // --- Inicio Herramientas ---
    startTool(tool, customData = null) {
        if (tool === 'quiz') {
            if (customData) { 
                this.launchQuizSession(true, customData); 
            } else if (this.state.persistedFailedQuestions?.length > 0) {
                this.showView('quiz');
                document.getElementById('quiz-setup').classList.remove('hidden');
                document.getElementById('quiz-play-area').classList.add('hidden');
                document.getElementById('setup-quiz-total-count').innerText = (this.DB.quiz || []).length;
                document.getElementById('setup-quiz-fail-count').innerText = this.state.persistedFailedQuestions.length;
                const c = document.getElementById('global-counter'); if (c) c.innerText = "0/0";
            } else { 
                this.launchQuizSession(false); 
            }
        } else if (tool === 'flashcards') {
            if (customData) { 
                this.launchFlashcardSession(true, customData); 
            } else if (this.state.persistedFailedFlashcards?.length > 0) {
                this.showView('flashcards');
                document.getElementById('fc-setup').classList.remove('hidden');
                document.getElementById('fc-play-area').classList.add('hidden');
                document.getElementById('setup-fc-total-count').innerText = (this.DB.flashcards || []).length;
                document.getElementById('setup-fc-fail-count').innerText = this.state.persistedFailedFlashcards.length;
                const c = document.getElementById('global-counter'); if (c) c.innerText = "0/0";
            } else { 
                this.launchFlashcardSession(false); 
            }
        } else {
            const d = customData ? [...customData] : (this.DB[tool] || []);
            if (!d.length) return;
            this.state.currentTool = tool; 
            this.state.index = 0; 
            this.state.score = 0; 
            this.state.activeData = d;
            if (!customData) this.shuffleArray(this.state.activeData);
            this.updateCounter(); 
            this.showView(tool);
            if (tool === 'trainer') this.renderTrainer();
        }
    },

    // --- Quiz (Test) ---
    launchQuizSession(onlyFailed, customData = null) {
        let d = customData ? [...customData] : onlyFailed ? [...this.state.persistedFailedQuestions] : [...(this.DB.quiz || [])];
        if (!d.length) return;
        this.state.currentTool = 'quiz'; 
        this.state.index = 0; 
        this.state.score = 0;
        this.state.failedQuestions = []; 
        this.state.activeData = d;
        if (!customData) this.shuffleArray(this.state.activeData);
        document.getElementById('quiz-setup').classList.add('hidden');
        document.getElementById('quiz-play-area').classList.remove('hidden');
        this.updateCounter(); 
        this.showView('quiz'); 
        this.renderQuiz();
    },

    renderQuiz() {
        const data = this.state.activeData[this.state.index]; 
        if (!data) return;
        document.getElementById('quiz-question').innerText = data.q;
        document.getElementById('quiz-feedback').classList.add('hidden');
        document.getElementById('quiz-hint-box').classList.add('hidden');
        const container = document.getElementById('quiz-options'); 
        container.innerHTML = '';
        
        let opts = data.options.map((opt, i) => ({ text: opt, isCorrect: i === data.correct }));
        this.shuffleArray(opts);
        
        opts.forEach((o, ri) => {
            const btn = document.createElement('button');
            btn.className = "option-btn w-full text-left p-4 rounded-xl bg-white flex items-center gap-4 font-semibold text-slate-700 shadow-sm";
            btn.innerHTML = `<span class="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs text-slate-400">${String.fromCharCode(65+ri)}</span> ${o.text}`;
            btn.onclick = () => this.quizCheck(o.isCorrect, btn);
            if (o.isCorrect) btn.dataset.isCorrect = "true";
            container.appendChild(btn);
        });
    },

    quizCheck(isCorrect, clickedBtn) {
        const data = this.state.activeData[this.state.index];
        const btns = document.getElementById('quiz-options').querySelectorAll('button');
        btns.forEach(b => b.disabled = true);
        document.getElementById('quiz-feedback').classList.remove('hidden');
        
        if (isCorrect) {
            this.state.score++;
            clickedBtn.classList.add('bg-emerald-50', 'border-emerald-500', 'text-emerald-700');
            document.getElementById('quiz-feedback-title').innerText = "¡Correcto!";
            document.getElementById('quiz-feedback-icon').innerHTML = '<i class="ph-fill ph-check-circle text-emerald-500"></i>';
            this.state.persistedFailedQuestions = (this.state.persistedFailedQuestions || []).filter(i => i.q !== data.q);
            this.saveFailures();
        } else {
            this.state.failedQuestions.push(data);
            if (!(this.state.persistedFailedQuestions || []).some(i => i.q === data.q)) {
                this.state.persistedFailedQuestions.push(data);
            }
            this.saveFailures();
            clickedBtn.classList.add('bg-red-50', 'border-red-500', 'text-red-700');
            const cb = Array.from(btns).find(b => b.dataset.isCorrect === "true");
            if (cb) cb.classList.add('bg-emerald-50', 'border-emerald-500');
            document.getElementById('quiz-feedback-title').innerText = "Incorrecto";
            document.getElementById('quiz-feedback-icon').innerHTML = '<i class="ph-fill ph-x-circle text-red-500"></i>';
        }
        document.getElementById('quiz-explanation').innerText = data.explanation;
    },

    quizNext() { 
        this.state.index++; 
        if (this.state.index < this.state.activeData.length) { 
            this.renderQuiz(); 
            this.updateCounter(); 
        } else {
            this.showQuizResults(); 
        }
    },
    
    quizToggleHint() { 
        const b = document.getElementById('quiz-hint-box'); 
        const d = this.state.activeData[this.state.index]; 
        if (d?.hint) { 
            b.innerText = d.hint; 
            b.classList.toggle('hidden'); 
        } 
    },
    
    finishQuiz() { 
        this.showQuizResults(); 
    },
    
    showQuizResults() {
        this.showView('results');
        document.getElementById('result-text').innerHTML = `Has acertado <strong>${this.state.score}</strong> de <strong>${this.state.activeData.length}</strong>.`;
        const fb = document.getElementById('btn-retry-errors');
        if (this.state.failedQuestions.length > 0) { 
            fb.classList.remove('hidden'); 
            document.getElementById('fail-count').innerText = this.state.failedQuestions.length; 
        } else {
            fb.classList.add('hidden');
        }
        const fcb = document.getElementById('btn-retry-flashcards'); 
        if (fcb) fcb.classList.add('hidden');
    },
    
    quizRetryErrors() { 
        this.startTool('quiz', this.state.failedQuestions); 
    },

    // --- Trainer (Entrenador de respuesta abierta) ---
    renderTrainer() {
        const d = this.state.activeData[this.state.index]; 
        if (!d) return;
        document.getElementById('trainer-question').innerText = d.q;
        document.getElementById('trainer-input').value = ''; 
        document.getElementById('trainer-input').disabled = false;
        document.getElementById('trainer-feedback').classList.add('hidden');
    },
    
    trainerShowHint() {
        const d = this.state.activeData[this.state.index]; 
        const b = document.getElementById('trainer-hint-box');
        b.innerText = "Conceptos: " + d.keywords.join(", "); 
        b.classList.remove('hidden');
    },
    
    trainerCheck() {
        const input = document.getElementById('trainer-input'); 
        const text = input.value.trim(); 
        if (text.length < 5) return;
        
        const d = this.state.activeData[this.state.index]; 
        input.disabled = true;
        
        let h = text; 
        d.keywords.forEach(k => { 
            h = h.replace(new RegExp(`(${k})`, 'gi'), `<span class="highlight-keyword">$1</span>`); 
        });
        
        document.getElementById('trainer-feedback').classList.remove('hidden');
        document.getElementById('trainer-user-text').innerHTML = h;
        document.getElementById('trainer-model-text').innerText = d.model;
    },
    
    trainerNext() { 
        this.state.index++; 
        if (this.state.index < this.state.activeData.length) { 
            this.renderTrainer(); 
            this.updateCounter(); 
        } else {
            this.showView('results'); 
        }
    },

    // --- Flashcards ---
    launchFlashcardSession(onlyFailed, customData = null) {
        let d = customData ? [...customData] : onlyFailed ? [...this.state.persistedFailedFlashcards] : [...(this.DB.flashcards || [])];
        if (!d.length) return;
        this.state.currentTool = 'flashcards'; 
        this.state.index = 0; 
        this.state.score = 0;
        this.state.failedFlashcards = []; 
        this.state.activeData = d;
        if (!customData) this.shuffleArray(this.state.activeData);
        document.getElementById('fc-setup').classList.add('hidden');
        document.getElementById('fc-play-area').classList.remove('hidden');
        this.updateCounter(); 
        this.showView('flashcards'); 
        this.renderFlashcard();
    },
    
    renderFlashcard() {
        const d = this.state.activeData[this.state.index]; 
        if (!d) return;
        this.state.isFlipped = false; 
        document.getElementById('fc-card').classList.remove('flipped');
        document.getElementById('fc-normal-controls').classList.remove('hidden');
        document.getElementById('fc-flipped-controls').classList.add('hidden');
        setTimeout(() => { 
            document.getElementById('fc-cat').innerText = d.cat; 
            document.getElementById('fc-question').innerText = d.q; 
            document.getElementById('fc-answer').innerText = d.a; 
        }, 150);
    },
    
    fcFlip() {
        this.state.isFlipped = !this.state.isFlipped;
        document.getElementById('fc-card').classList.toggle('flipped', this.state.isFlipped);
        document.getElementById('fc-normal-controls').classList.toggle('hidden', this.state.isFlipped);
        document.getElementById('fc-flipped-controls').classList.toggle('hidden', !this.state.isFlipped);
    },
    
    fcNext() { 
        if (this.state.index < this.state.activeData.length - 1) { 
            this.state.index++; 
            this.renderFlashcard(); 
            this.updateCounter(); 
        } else {
            this.showFlashcardResults(); 
        }
    },
    
    fcPrev() { 
        if (this.state.index > 0) { 
            this.state.index--; 
            this.renderFlashcard(); 
            this.updateCounter(); 
        } 
    },
    
    fcShuffle() { 
        this.shuffleArray(this.state.activeData); 
        this.state.index = 0; 
        this.renderFlashcard(); 
        this.updateCounter(); 
    },
    
    fcMark(knewIt) {
        const d = this.state.activeData[this.state.index]; 
        if (!d) return;
        
        if (!knewIt) {
            if (!this.state.failedFlashcards.includes(d)) this.state.failedFlashcards.push(d);
            if (!this.state.persistedFailedFlashcards.some(i => i.q === d.q)) this.state.persistedFailedFlashcards.push(d);
        } else {
            this.state.failedFlashcards = this.state.failedFlashcards.filter(i => i !== d);
            this.state.persistedFailedFlashcards = this.state.persistedFailedFlashcards.filter(i => i.q !== d.q);
        }
        
        this.saveFailures(); 
        this.fcNext();
    },
    
    finishFlashcards() { 
        this.showFlashcardResults(); 
    },
    
    showFlashcardResults() {
        this.showView('results');
        document.getElementById('result-text').innerHTML = `Has completado las tarjetas de memoria. No sabías <strong>${this.state.failedFlashcards.length}</strong> de <strong>${this.state.activeData.length}</strong>.`;
        const fb = document.getElementById('btn-retry-errors'); 
        if (fb) fb.classList.add('hidden');
        
        const fcb = document.getElementById('btn-retry-flashcards');
        if (fcb) { 
            if (this.state.failedFlashcards.length > 0) { 
                fcb.classList.remove('hidden'); 
                const c = document.getElementById('fc-fail-count'); 
                if (c) c.innerText = this.state.failedFlashcards.length; 
            } else {
                fcb.classList.add('hidden'); 
            }
        }
    },
    
    fcRetryErrors() { 
        this.startTool('flashcards', this.state.failedFlashcards); 
    }
};

// Exportar app a objeto global por compatibilidad con onclick
window.app = app;
