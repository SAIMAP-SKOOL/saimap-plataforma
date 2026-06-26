/**
 * SAIMAP - Base de datos de Tests Psicométricos
 * Contiene información clínica y descriptiva para el glosario interactivo.
 */

const PSYCHOMETRIC_TESTS_DB = [
    {
        id: "mmpi2",
        acronym: "MMPI-2",
        name: "Inventario Multifásico de Personalidad de Minnesota-2",
        description: "Uno de los inventarios de personalidad más utilizados en psicología clínica y forense, diseñado para evaluar rasgos psicopatológicos y escalas de validez de respuesta.",
        author: "Starke R. Hathaway y J. C. McKinley",
        year: "1989 (Edición original), adaptado en España",
        category: "Personalidad y Clínica",
        items: 567,
        duration: "60-90 minutos",
        age: "18 a 84 años",
        objective: "Evaluación objetiva de la personalidad y de los principales trastornos psicopatológicos.",
        clinical_utility: "Herramienta indispensable en psicología clínica, forense y de la salud. Permite estructurar perfiles clínicos (escalas básicas como Depresión, Histeria, Esquizofrenia) y escalas de validez para detectar simulación, disimulación o respuestas al azar.",
        scales: [
            { name: "Escalas Clínicas Básicas", desc: "Hipocondría (Hs), Depresión (D), Histeria (Hy), Desviación Psicopática (Pd), Masculinidad/Feminidad (Mf), Paranoia (Pa), Psicastenia (Pt), Esquizofrenia (Sc), Hipomanía (Ma), Introversión Social (Si)." },
            { name: "Escalas de Validez", desc: "No puedo responder (?), Mentira (L), Incoherencia (F), Corrección (K), Inconsistencia de respuestas variables (VRIN), Inconsistencia de respuestas verdaderas (TRIN)." }
        ],
        reliability: "Excelente consistencia interna y estabilidad temporal. Coeficiente alfa típicamente entre 0.70 y 0.85 para escalas básicas.",
        key_concepts: "Puntuaciones T (Media 50, DS 10). Las puntuaciones T >= 65 son clínicamente significativas. Código de dos o tres dígitos para interpretación de picos (ej. perfil 2-7 o 4-9)."
    },
    {
        id: "wais4",
        acronym: "WAIS-IV",
        name: "Escala de Inteligencia de Wechsler para Adultos-IV",
        description: "La escala de referencia para la evaluación de la aptitud intelectual en adultos, que mide el cociente intelectual general (CIT) a través de cuatro índices cognitivos principales.",
        author: "David Wechsler",
        year: "2008 (Edición original), adaptado en España",
        category: "Inteligencia y Cognición",
        items: 15,
        duration: "60-90 minutos",
        age: "16 a 90 años y 11 meses",
        objective: "Evaluación completa de la aptitud intelectual o capacidad cognitiva general.",
        clinical_utility: "Estándar de oro para la evaluación de la inteligencia en adultos. Utilizado en diagnóstico neuropsicológico, discapacidad intelectual, peritajes forenses, selección de personal y diagnóstico psicopedagógico.",
        scales: [
            { name: "Comprensión Verbal (ICV)", desc: "Semejanzas, Vocabulario, Información, Comprensión." },
            { name: "Razonamiento Perceptivo (IRP)", desc: "Cubos, Matrices, Puzles visuales, Balanzas, Figuras incompletas." },
            { name: "Memoria de Trabajo (IMT)", desc: "Dígitos, Aritmética, Letras y Números." },
            { name: "Velocidad de Procesamiento (IVP)", desc: "Búsqueda de símbolos, Clave de números, Cancelación." }
        ],
        reliability: "Alta fiabilidad para el CIT (Cociente Intelectual Total) (coeficiente alfa en torno a 0.98) e índices secundarios (entre 0.90 y 0.94).",
        key_concepts: "CIT (Media 100, DS 15) como medida general de la inteligencia. El perfil de discrepancias entre los índices es crucial para el análisis de fortalezas y debilidades neuropsicológicas."
    },
    {
        id: "neopir",
        acronym: "NEO-PI-R",
        name: "Inventario de Personalidad NEO Revisado",
        description: "Cuestionario basado en el modelo de los 'Cinco Grandes' factores de personalidad, que evalúa rasgos normales y facetas detalladas en adultos.",
        author: "Paul T. Costa Jr. y Robert R. McCrae",
        year: "1992 (Edición original), adaptado en España",
        category: "Personalidad y Clínica",
        items: 240,
        duration: "30-40 minutos",
        age: "A partir de 16 años (adultos)",
        objective: "Evaluación sistemática de las cinco principales dimensiones o factores de la personalidad (Modelo de los Cinco Grandes o Big Five).",
        clinical_utility: "Ampliamente utilizado en psicología clínica, investigación de la personalidad, orientación profesional y clínica de salud mental para comprender los rasgos de personalidad basales y la predisposición a trastornos.",
        scales: [
            { name: "Neuroticismo (N)", desc: "Ansiedad, Hostilidad, Depresión, Ansiedad social, Impulsividad, Vulnerabilidad." },
            { name: "Extraversión (E)", desc: "Cordialidad, Gregarismo, Asertividad, Actividad, Búsqueda de emociones, Emociones positivas." },
            { name: "Apertura (O)", desc: "Fantasía, Estética, Sentimientos, Acciones, Ideas, Valores." },
            { name: "Amabilidad (A)", desc: "Confianza, Franqueza, Altruismo, Actitud conciliadora, Modestia, Sensibilidad hacia los demás." },
            { name: "Responsabilidad (C)", desc: "Competencia, Orden, Sentido del deber, Necesidad de logro, Autodisciplina, Deliberación." }
        ],
        reliability: "Coeficientes alfa muy elevados, oscilando entre 0.86 y 0.92 para los cinco factores principales, y entre 0.56 y 0.81 para las 30 facetas.",
        key_concepts: "Permite un perfil bidimensional integrando rasgos (ej. alta E y baja A para un perfil extravertido e independiente). No evalúa psicopatología en sí, sino rasgos basales de la personalidad normal."
    },
    {
        id: "bdi2",
        acronym: "BDI-II",
        name: "Inventario de Depresión de Beck-II",
        description: "Autoinforme clásico y breve diseñado para medir la severidad de la sintomatología depresiva, correlacionado con los criterios diagnósticos del DSM.",
        author: "Aaron T. Beck, Robert A. Steer y Gregory K. Brown",
        year: "1996 (Edición original), adaptado en España",
        category: "Personalidad y Clínica",
        items: 21,
        duration: "5-10 minutos",
        age: "A partir de 13 años",
        objective: "Evaluación de la presencia y gravedad de la sintomatología depresiva.",
        clinical_utility: "Instrumento breve de cribado y monitorización terapéutica. Muy sensible al cambio terapéutico. Sus ítems se corresponden con los criterios diagnósticos del DSM para el Trastorno Depresivo Mayor.",
        scales: [
            { name: "Dimensión Cognitivo-Afectiva", desc: "Tristeza, Pesimismo, Sentimientos de fracaso, Culpa, Castigo, Disconformidad con uno mismo, Autocrítica, Ideas suicidas." },
            { name: "Dimensión Somática-Motora", desc: "Pérdida de placer, Llanto, Agitación, Pérdida de interés, Indecisión, Inutilidad, Pérdida de energía, Cambios de sueño, Irritabilidad, Cambios de apetito, Dificultad de concentración, Cansancio, Pérdida de interés por el sexo." }
        ],
        reliability: "Excelente consistencia interna (alfa de Cronbach de 0.92 para pacientes clínicos y 0.93 para universitarios).",
        key_concepts: "Puntuación directa global (rango 0-63). Puntos de corte estándar: 0-13 (depresión mínima), 14-19 (leve), 20-28 (moderada) y 29-63 (grave). El ítem 9 (pensamientos de suicidio) debe evaluarse con especial precaución clínica de forma inmediata."
    },
    {
        id: "mcmi4",
        acronym: "MCMI-IV",
        name: "Inventario Clínico Multiaxial de Millon-IV",
        description: "Instrumento multiaxial diseñado por Theodore Millon para evaluar trastornos de personalidad y síndromes clínicos, utilizando puntuaciones de tasa base (TB) ajustadas.",
        author: "Theodore Millon, Carrie Millon y Grossman",
        year: "2015 (Edición original), adaptado en España",
        category: "Personalidad y Clínica",
        items: 195,
        duration: "25-35 minutos",
        age: "18 años en adelante",
        objective: "Evaluación integrada de la personalidad clínica (estilos de personalidad y patologías) y síndromes clínicos específicos.",
        clinical_utility: "Esencial en el diagnóstico de los trastornos de la personalidad (Eje II del DSM-IV/DSM-5) y su relación con síndromes clínicos. Está coordinado directamente con la Teoría Evolutiva de la Personalidad de Millon.",
        scales: [
            { name: "Patrones Clínicos de Personalidad", desc: "Esquizoide, Evitativo, Depresivo, Dependiente, Histriónico, Turbulento, Narcisista, Antisocial, Sádico, Compulsivo, Negativista, Masoquista." },
            { name: "Patología Grave de Personalidad", desc: "Esquizotípico, Límite, Paranoide." },
            { name: "Síndromes Clínicos (Gravedad Moderada)", desc: "Trastorno de ansiedad, Trastorno somatomorfo, Trastorno bipolar, Trastorno distímico, Dependencia del alcohol, Dependencia de drogas, Trastorno de estrés postraumático." },
            { name: "Síndromes Clínicos Graves", desc: "Trastorno del pensamiento, Depresión mayor, Trastorno delirante." },
            { name: "Escalas de Modificación (Validez)", desc: "Sinceridad (X), Deseabilidad social (Y), Alteración (Z), Validez (V)." }
        ],
        reliability: "Alta fiabilidad test-retest y consistencia interna. Coeficientes alfa que promedian más de 0.80.",
        key_concepts: "Utiliza puntuaciones de Tasa Base (TB) en lugar de percentiles o puntuaciones T, ajustando la prevalencia real de los trastornos. Puntuación TB >= 75 indica presencia de rasgos; TB >= 85 indica patología clínicamente significativa."
    },
    {
        id: "wcst",
        acronym: "WCST",
        name: "Test de Clasificación de Tarjetas de Wisconsin",
        description: "Prueba neuropsicológica estándar para evaluar funciones ejecutivas como la flexibilidad cognitiva, la capacidad de abstracción y el control perseverativo.",
        author: "David A. Grant y Esta A. Berg",
        year: "1948 (Edición original), adaptado por Heaton et al.",
        category: "Neuropsicología",
        items: 128,
        duration: "20-30 minutos",
        age: "6 a 89 años",
        objective: "Evaluación de la función ejecutiva, específicamente la flexibilidad cognitiva, capacidad de abstracción y cambio de criterio.",
        clinical_utility: "Prueba neuropsicológica por excelencia para la detección de disfunción del lóbulo frontal (corteza prefrontal dorsolateral). Permite detectar rigidez cognitiva y perseveraciones en daño cerebral, esquizofrenia, TDAH y demencias.",
        scales: [
            { name: "Índices Principales", desc: "Número de categorías completadas (hasta 6), Ensayos administrados, Respuestas correctas, Errores totales, Respuestas perseverativas, Errores perseverativos (indica rigidez), Errores no perseverativos, Fallos en mantener la actitud (pérdida del criterio correcto)." }
        ],
        reliability: "Adecuada fiabilidad interjueces y estabilidad temporal para los errores perseverativos.",
        key_concepts: "El paciente debe emparejar tarjetas de respuesta con cuatro tarjetas de estímulo según tres criterios posibles (color, forma o número) que cambian sin previo aviso tras 10 respuestas correctas consecutivas. La tasa de 'errores perseverativos' es el indicador más sensible de daño frontal."
    },
    {
        id: "stroop",
        acronym: "STROOP",
        name: "Test de Colores y Palabras",
        description: "Test de interferencia cognitiva de corta duración que mide el control inhibitorio frontal, la atención selectiva y la resistencia a la interferencia.",
        author: "J. Ridley Stroop / Charles J. Golden",
        year: "1935 (Edición original), adaptaciones clínicas modernas",
        category: "Neuropsicología",
        items: 3,
        duration: "5 minutos (45 segundos por lámina)",
        age: "7 a 80 años",
        objective: "Evaluación de la atención selectiva, la inhibición cognitiva y la resistencia a la interferencia cognitiva.",
        clinical_utility: "Muy utilizado en evaluación neuropsicológica para medir control inhibitorio frontal. Sensible al TDAH, daño cerebral traumático, adicciones y demencias prefrontales.",
        scales: [
            { name: "Lámina P (Lectura de Palabras)", desc: "Nombre de los colores 'ROJO', 'VERDE', 'AZUL' escritos en tinta negra." },
            { name: "Lámina C (Denominación de Colores)", desc: "Símbolos 'XXXX' impresos en tinta de color rojo, verde o azul." },
            { name: "Lámina PC (Palabra-Color / Interferencia)", desc: "Palabras que designan colores escritas en tinta de un color incompatible (ej. la palabra 'ROJO' impresa en tinta azul). El paciente debe nombrar el color de la tinta ignorando el significado escrito." }
        ],
        reliability: "Alta estabilidad test-retest, con coeficientes típicamente superiores a 0.80 para las tres láminas.",
        key_concepts: "El 'Efecto de Interferencia' (PC - PC' predicho) mide la capacidad del sujeto para inhibir una respuesta automática (leer la palabra) a favor de una menos habitual (decir el color de la tinta). La fatiga de esta capacidad es un indicador de disfunción prefrontal."
    },
    {
        id: "16pf5",
        acronym: "16PF-5",
        name: "Cuestionario de 16 Factores de Personalidad (5ª Edición)",
        description: "Prueba basada en la teoría factorial de Raymond Cattell que evalúa la personalidad normal mediante 16 factores de primer orden y 5 dimensiones globales.",
        author: "Raymond B. Cattell, A. Karen S. Cattell y Heather E. P. Cattell",
        year: "1993 (Edición original), adaptado en España",
        category: "Personalidad y Clínica",
        items: 185,
        duration: "40-45 minutos",
        age: "A partir de 16 años",
        objective: "Evaluación del perfil de personalidad a través de 16 escalas primarias y 5 dimensiones globales.",
        clinical_utility: "Especialmente útil en psicología del trabajo, selección de personal, orientación escolar e investigación clínica para describir la estructura básica de la personalidad normal.",
        scales: [
            { name: "Factores de Primer Orden (Escalas Primarias)", desc: "Afectividad (A), Razonamiento (B), Estabilidad (C), Dominancia (E), Animación (F), Atención a las normas (G), Atrevimiento (H), Sensibilidad (I), Vigilancia (L), Abstracción (M), Privacidad (N), Aprensión (O), Apertura al cambio (Q1), Autosuficiencia (Q2), Perfeccionismo (Q3), Tensión (Q4)." },
            { name: "Dimensiones Globales", desc: "Extroversión (Ext), Ansiedad (Ans), Dureza (Dur), Independencia (Ind), Auto-control (AuC)." },
            { name: "Estilos de Respuesta (Validez)", desc: "Manipulación de la imagen (MI), Infrecuencia (IN), Aquiescencia (AQ)." }
        ],
        reliability: "Consistencia interna de las escalas primarias satisfactoria (alfa de Cronbach medio de 0.74) y buena fiabilidad test-retest.",
        key_concepts: "Puntuaciones expresadas en 'Decatipos' (escala de 1 a 10 con media 5.5 y DS 2). Puntuaciones extremas (1-3 o 8-10) indican rasgos muy marcados que definen el perfil del sujeto."
    },
    {
        id: "scl90r",
        acronym: "SCL-90-R",
        name: "Cuestionario de 90 Síntomas",
        description: "Cuestionario de cribado rápido que valora el nivel subjetivo de malestar psicológico y una amplia variedad de síntomas psicopatológicos en pacientes.",
        author: "Leonard R. Derogatis",
        year: "1977 (Edición original), adaptado en España",
        category: "Personalidad y Clínica",
        items: 90,
        duration: "10-15 minutos",
        age: "13 a 80 años",
        objective: "Evaluación y cribado de una amplia gama de síntomas psicopatológicos y distrés psicológico.",
        clinical_utility: "Utilizado como herramienta rápida de cribado en atención primaria, urgencias psiquiátricas e investigación clínica para valorar la gravedad subjetiva del paciente y su malestar global.",
        scales: [
            { name: "Dimensiones de Síntomas", desc: "Somatización (SOM), Obsesión-compulsión (OBS), Sensibilidad interpersonal (SI), Depresión (DEP), Ansiedad (ANS), Hostilidad (HOS), Ansiedad fóbica (FOB), Ideación paranoide (PAR), Psicoticismo (PSI)." },
            { name: "Índices Globales de Gravedad", desc: "Índice de Gravedad Global (GSI - mejor indicador de malestar general), Total de Síntomas Positivos (PST), Índice de Malestar de Síntomas Positivos (PSDI)." }
        ],
        reliability: "Alta estabilidad temporal y consistencia interna (alfa entre 0.77 y 0.90 para las diferentes dimensiones).",
        key_concepts: "El Índice GSI es el estándar para cuantificar el nivel de distrés. Permite obtener perfiles rápidos que indican si la persona presenta sintomatología clínica activa en comparación con baremos de población general o clínica."
    },
    {
        id: "raven",
        acronym: "Raven",
        name: "Test de Matrices Progresivas de Raven",
        description: "Prueba no verbal de inteligencia fluida y razonamiento analógico abstracto, diseñada para ser libre de sesgos lingüísticos y culturales.",
        author: "John C. Raven",
        year: "1938 (Edición original), adaptado y revisado continuamente",
        category: "Inteligencia y Cognición",
        items: 60,
        duration: "40-60 minutos",
        age: "5 a 85 años (según versiones SPM, APM, Coloreada)",
        objective: "Evaluación de la capacidad de abstracción de relaciones analógicas e inteligencia fluida (Factor G de Spearman).",
        clinical_utility: "Excelente medida libre de sesgo cultural para la evaluación cognitiva general. Se utiliza en contextos educativos, selección de personal, clínica y neuropsicología para medir razonamiento lógico no verbal.",
        scales: [
            { name: "Versiones Comunes", desc: "General (SPM - Standard Progressive Matrices), Coloreada (CPM - para niños y personas mayores con deterioro), Avanzada (APM - para adultos de alta capacidad)." }
        ],
        reliability: "Alta consistencia interna (habitualmente superior a 0.85) y gran estabilidad test-retest.",
        key_concepts: "El test consiste en completar series lógicas eligiendo la pieza que encaja entre varias opciones. Evalúa la capacidad del sujeto para hallar relaciones lógico-matemáticas espaciales sin mediación lingüística."
    },
    {
        id: "prolecr",
        acronym: "PROLEC-R",
        name: "Batería de Evaluación de los Procesos Lectores (Revisada)",
        description: "Batería diagnóstica en español para la evaluación de procesos lectores en niños, identificando dificultades y tipos de dislexia escolar.",
        author: "Fernando Cuetos, Blanca Rodríguez, Elvira Ruano y David Arribas",
        year: "2007",
        category: "Educativo y del Desarrollo",
        items: 9,
        duration: "50-60 minutos",
        age: "6 a 12 años (Educación Primaria)",
        objective: "Evaluación de los procesos cognitivos que intervienen en la lectura y detección de dificultades de aprendizaje.",
        clinical_utility: "La prueba de referencia para el diagnóstico de dificultades lectoras (dislexia) en el ámbito educativo y psicopedagógico en España. Identifica en qué procesos específicos del procesamiento lingüístico falla el alumno.",
        scales: [
            { name: "Procesos Identificados", desc: "Identificación de letras (nombre y sonido), Procesos léxicos (lectura de palabras y pseudopalabras para evaluar vía léxica y fonológica), Procesos sintácticos (estructuras gramaticales y signos de puntuación), Procesos semánticos (comprensión de oraciones y textos)." }
        ],
        reliability: "Excelente consistencia interna para el total de la batería (alfa en torno a 0.90) y sólida validez diagnóstica.",
        key_concepts: "Permite clasificar el rendimiento en niveles de dificultad: Normal (N), Dificultad Leve (L) o Dificultad Severa (S), y calcular índices de precisión y velocidad para cada proceso lector."
    }
];

// Función de utilidad para buscar tests en la base de datos
function searchPsychometricTests(query = '', category = 'all') {
    const cleanQuery = query.toLowerCase().trim();
    return PSYCHOMETRIC_TESTS_DB.filter(test => {
        // Filtrar por categoría
        if (category !== 'all' && test.category !== category) {
            return false;
        }
        // Filtrar por búsqueda de texto
        if (cleanQuery) {
            const inAcronym = test.acronym.toLowerCase().includes(cleanQuery);
            const inName = test.name.toLowerCase().includes(cleanQuery);
            const inAuthor = test.author.toLowerCase().includes(cleanQuery);
            const inObjective = test.objective.toLowerCase().includes(cleanQuery);
            return inAcronym || inName || inAuthor || inObjective;
        }
        return true;
    });
}
