'use strict';
// ============================================================
// SAIMAP · brain-data.js
// Configuración de modelos 3D y base de datos anatómica
// ============================================================

const BRAIN_MODELS_CONFIG = {
    plastinated_brain: {
        uid: '2df234ff65b0483fb5b5e15e40efa65d',
        name: 'Cerebro Humano Plastinado',
        subtitle: 'Neuroanatomía Macroscópica · UBC Medicine',
        emoji: '🔬',
        color: '#6366f1',
        colorRgb: '99,102,241',
        gradient: 'linear-gradient(135deg,#312e81 0%,#6366f1 100%)',
        description: 'Cerebro humano real sometido a plastinación. Permite observar la morfología cortical completa: giros, surcos, fisuras y estructuras de la base. Escala real 1:1.'
    },
    limbic_system: {
        uid: 'f201c8699b7f4f1dad569783d86ec41f',
        name: 'Sistema Límbico',
        subtitle: 'El Cerebro Emocional · UBC Medicine',
        emoji: '🌀',
        color: '#ec4899',
        colorRgb: '236,72,153',
        gradient: 'linear-gradient(135deg,#831843 0%,#ec4899 100%)',
        description: 'Reconstrucción del circuito límbico: hipocampo, amígdala, fórnix y estructuras diencefálicas. El sustrato neural de las emociones, la memoria y la motivación.'
    },
    brainstem_willis: {
        uid: '6ae262548bfd459cbfd1ec1e137a1bd6',
        name: 'Tronco Encefálico y Polígono de Willis',
        subtitle: 'Vascularización Cerebral · UBC Medicine',
        emoji: '💉',
        color: '#f59e0b',
        colorRgb: '245,158,11',
        gradient: 'linear-gradient(135deg,#78350f 0%,#f59e0b 100%)',
        description: 'Tronco encefálico junto al Polígono de Willis: el anillo arterial que garantiza el riego cerebral. Esencial en neurología vascular.'
    },
    brainstem_cranial: {
        uid: '160a7a89ba4e48c48b626da63856bce6',
        name: 'Pares Craneales',
        subtitle: 'Los 12 Nervios Craneales · UBC Medicine',
        emoji: '🏷️',
        color: '#10b981',
        colorRgb: '16,185,129',
        gradient: 'linear-gradient(135deg,#064e3b 0%,#10b981 100%)',
        description: 'Los doce pares de nervios craneales etiquetados en su origen real. Desde el olfatorio (I) hasta el hipogloso (XII).'
    },
    commissural_fibers: {
        uid: '63324fd8a8284edbaf897edc35f57da0',
        name: 'Fibras Comisurales',
        subtitle: 'Conectividad Interhemisférica · UBC Medicine',
        emoji: '🌐',
        color: '#8b5cf6',
        colorRgb: '139,92,246',
        gradient: 'linear-gradient(135deg,#4c1d95 0%,#8b5cf6 100%)',
        description: 'Las fibras comisurales que comunican ambos hemisferios cerebrales e integran información sensorial, motora y cognitiva.'
    },
    subcortical_fibers: {
        uid: '0033fa844e9f4e55a6b940fba3fe45d5',
        name: 'Fibras Subcorticales',
        subtitle: 'Sustancia Blanca · UBC Medicine',
        emoji: '🕸️',
        color: '#06b6d4',
        colorRgb: '6,182,212',
        gradient: 'linear-gradient(135deg,#164e63 0%,#06b6d4 100%)',
        description: 'Tractos de sustancia blanca subcortical: fibras de asociación cortas y largas que conectan áreas corticales ipsilaterales.'
    }
};

// Base de datos anatómica. Claves en inglés (sin tildes) para mayor compatibilidad con los nombres de Sketchfab.
const ANATOMY_DB = {
    'frontal lobe': {
        name:'Lóbulo Frontal', emoji:'🧠', category:'Corteza Cerebral',
        fn:'Control motor voluntario, planificación, toma de decisiones, lenguaje expresivo (área de Broca) y personalidad.',
        details:'El lóbulo más grande del cerebro. Contiene la corteza motora primaria (área 4 de Brodmann) en el giro precentral y la corteza prefrontal (áreas 9, 10, 44-47), asiento de las funciones ejecutivas: planificación, inhibición de respuestas y memoria de trabajo.',
        psy:'Las lesiones prefrontales producen el síndrome disejecutivo (caso Phineas Gage). Área de Broca (áreas 44-45): su lesión → afasia expresiva. Corteza orbitofrontal: toma de decisiones emocionales (marcador somático, Damasio).',
        tags:['Neuropsicología','Psicología Clínica','Psicología del Lenguaje']
    },
    'parietal lobe': {
        name:'Lóbulo Parietal', emoji:'🧠', category:'Corteza Cerebral',
        fn:'Procesamiento somatosensorial, integración multimodal, orientación espacial y esquema corporal.',
        details:'Contiene la corteza somatosensorial primaria (áreas 3a, 3b, 1, 2) en el giro postcentral. Las áreas de asociación del lóbulo parietal inferior (angular y supramarginal) integran información de distintas modalidades sensoriales.',
        psy:'Lesiones en el parietal derecho → heminegligencia espacial. Área de Wernicke en la unión temporo-parietal izquierda es clave en la comprensión del lenguaje.',
        tags:['Neuropsicología','Psicología de la Percepción','Psicología Cognitiva']
    },
    'temporal lobe': {
        name:'Lóbulo Temporal', emoji:'🧠', category:'Corteza Cerebral',
        fn:'Procesamiento auditivo, memoria declarativa, reconocimiento de objetos y caras, comprensión del lenguaje (área de Wernicke).',
        details:'Contiene la corteza auditiva primaria (áreas 41-42). El lóbulo temporal medial (hipocampo, amígdala, corteza entorrinal) es el núcleo del sistema de memoria. Área de Wernicke (área 22): procesa el lenguaje comprensivo.',
        psy:'El caso H.M. (hipocampectomía bilateral) demostró el papel del temporal medial en la memoria episódica. Las alucinaciones auditivas en psicosis se asocian a hiperperfusión del temporal superior.',
        tags:['Psicología del Lenguaje','Psicología de la Memoria','Psicología Clínica']
    },
    'occipital lobe': {
        name:'Lóbulo Occipital', emoji:'🧠', category:'Corteza Cerebral',
        fn:'Procesamiento visual primario (V1) y de asociación (V2-V5). Percepción de forma, color, movimiento y reconocimiento de objetos.',
        details:'La corteza visual primaria (V1/área 17) se ubica en el surco calcarino. Vía ventral (qué es) → temporal inferior. Vía dorsal (dónde está) → parietal posterior.',
        psy:'Las lesiones producen agnosias visuales. Hemianopsia homónima resulta de daño en V1. Las alucinaciones visuales surgen de excitación anormal en esta región.',
        tags:['Psicología de la Percepción','Neuropsicología','Psicofisiología']
    },
    'cerebellum': {
        name:'Cerebelo', emoji:'⚙️', category:'Estructuras Subcorticales',
        fn:'Coordinación motora fina, equilibrio, aprendizaje motor por condicionamiento y procesamiento temporal preciso.',
        details:'Posee más neuronas que el resto del cerebro combinado. Córtex cerebeloso (células de Purkinje), núcleos profundos (dentado, emboliforme, globoso, fastigial) y tres pares de pedúnculos cerebelosos.',
        psy:'Participa en el condicionamiento clásico del reflejo palpebral. Un cerebelo cognitivo-afectivo participa en funciones ejecutivas y regulación emocional. Su daño produce ataxia.',
        tags:['Psicología del Aprendizaje','Neuropsicología','Psicofisiología']
    },
    'brainstem': {
        name:'Tronco Encefálico', emoji:'🔗', category:'Tronco Encefálico',
        fn:'Regula funciones vitales (respiración, FC), contiene núcleos de pares craneales (III-XII) y es vía de paso de todas las fibras sensoriales y motoras.',
        details:'Formado por mesencéfalo, puente y bulbo raquídeo. Contiene la formación reticular (ciclo sueño-vigilia) y los núcleos monoaminérgicos: locus coeruleus (NA), núcleos del rafe (5-HT), área tegmental ventral (DA).',
        psy:'Los sistemas neuromoduladores del tronco son diana de la mayoría de psicofármacos (ISRS, IRSN, antipsicóticos). La formación reticular regula el nivel de consciencia (coma en lesiones).',
        tags:['Psicofarmacología','Psicofisiología','Neuropsicología']
    },
    'midbrain': {
        name:'Mesencéfalo', emoji:'🔗', category:'Tronco Encefálico',
        fn:'Procesa información visual y auditiva refleja, coordina movimientos oculares y contiene los núcleos dopaminérgicos clave (ATV, sustancia negra).',
        details:'Tectum (colículos superiores e inferiores), tegmento (ATV, sustancia negra, PAG) y pedúnculos cerebrales. La sustancia periacueductal gris (PAG) modula el dolor y el comportamiento defensivo.',
        psy:'ATV → sistema mesolímbico (recompensa, adicción). Sustancia negra: su degeneración → Parkinson. El sistema mesocortical dopaminérgico regula las funciones ejecutivas.',
        tags:['Psicofarmacología','Psicología de la Motivación','Neuropsicología']
    },
    'pons': {
        name:'Puente / Protuberancia', emoji:'🔗', category:'Tronco Encefálico',
        fn:'Relevo cortico-cerebeloso, núcleos de pares craneales V-VIII, y regulación del sueño REM.',
        details:'Contiene el locus coeruleus (principal núcleo noradrenérgico), los núcleos del rafe (serotoninérgicos), el núcleo pedunculopontino (colinérgico) y el centro generador del sueño REM.',
        psy:'Locus coeruleus (norepinefrina): regula la atención y la respuesta al estrés. Núcleos del rafe (serotonina): diana de los ISRS. Crítico para el sueño REM.',
        tags:['Psicofarmacología','Psicología del Sueño','Psicofisiología']
    },
    'medulla': {
        name:'Bulbo Raquídeo', emoji:'🔗', category:'Tronco Encefálico',
        fn:'Centros vitales de respiración y cardiovascular. Núcleos de pares craneales IX-XII. Decusación piramidal.',
        details:'Contiene los centros cardiorrespiratorios (inspiratorio, espiratorio, vasomotor). El núcleo del tracto solitario recibe aferencias viscerales. Las pirámides albergan las fibras corticoespinales que decusan aquí (85-90%).',
        psy:'Lesiones bulbares frecuentemente fatales. El nervio vago (X par) que emerge aquí es importante en la estimulación vagal (VNS) para depresión y epilepsia refractaria.',
        tags:['Psicofisiología','Neuropsicología','Psicología Clínica']
    },
    'hippocampus': {
        name:'Hipocampo', emoji:'🐠', category:'Sistema Límbico',
        fn:'Consolidación de la memoria declarativa (episódica y semántica), navegación espacial y mapas cognitivos.',
        details:'Lóbulo temporal medial. Organizado en CA1, CA2, CA3 y el giro dentado. La potenciación a largo plazo (LTP) fue descrita aquí por primera vez y es el modelo celular del aprendizaje sináptico.',
        psy:'El caso H.M. demostró que sin hipocampo no hay consolidación de nuevas memorias (amnesia anterógrada). Se atrofia con el estrés crónico (cortisol) y en la depresión mayor. Central en el TEPT.',
        tags:['Psicología de la Memoria','Psicología Clínica','Neuropsicología']
    },
    'amygdala': {
        name:'Amígdala', emoji:'⚡', category:'Sistema Límbico',
        fn:'Procesamiento emocional (especialmente el miedo), condicionamiento del miedo, reconocimiento de emociones en caras.',
        details:'Complejo amigdalino: núcleo basolateral (BLA, conexiones corticales), central (salida autonómica y endocrina), medial (sistema olfatorio). El BLA es el locus del condicionamiento del miedo (LeDoux).',
        psy:'Base neurobiológica de las fobias y el TEPT. Detecta amenazas antes de la consciencia (vía baja). En el trastorno de pánico hay hiperactivación amigdalina. Las personas con amígdala bilateral dañada no sienten miedo (caso SM).',
        tags:['Psicología Clínica','Psicología de las Emociones','Neuropsicología']
    },
    'fornix': {
        name:'Fórnix', emoji:'🔄', category:'Sistema Límbico',
        fn:'Vía eferente principal del hipocampo; conecta el hipocampo con el septo, hipotálamo (cuerpos mamilares) y tálamo anterior.',
        details:'Gran haz de fibras blancas arqueado que recorre el techo del tercer ventrículo. Forma parte esencial del circuito de Papez: hipocampo → fórnix → cuerpos mamilares → tálamo → cingulado → hipocampo.',
        psy:'El circuito de Papez (1937) fue la primera conceptualización del sustrato neural de las emociones. Lesiones del fórnix producen amnesia anterógrada similar a las hipocampales.',
        tags:['Psicología de la Memoria','Neuropsicología','Psicología de las Emociones']
    },
    'mammillary': {
        name:'Cuerpos Mamilares', emoji:'🔄', category:'Sistema Límbico',
        fn:'Estación de relevo del circuito de Papez. Reciben del hipocampo (vía fórnix) y proyectan al tálamo anterior.',
        details:'Par de protuberancias en la cara inferior del hipotálamo posterior. Parte clave del circuito de Papez: hipocampo → fórnix → cuerpos mamilares → tálamo anterior → giro cingulado → hipocampo.',
        psy:'Se atrofian en el síndrome de Korsakoff (déficit de tiamina B1 en alcoholismo severo). Produce amnesia grave con confabulación. La RM muestra lesiones mamilares específicas.',
        tags:['Psicología de la Memoria','Neuropsicología','Psicología Clínica']
    },
    'thalamus': {
        name:'Tálamo', emoji:'🌐', category:'Diencéfalo',
        fn:'Principal estación de relevo sensorial, motor y cognitivo hacia la corteza. Puerta de entrada a la conciencia.',
        details:'Gran masa oval con más de 30 núcleos. VPL/VPM (somatosensación), NGL (visión), MGN (audición), VL/VA (motor). Núcleos no específicos modulan la activación cortical y el nivel de consciencia.',
        psy:'Esencial para la consciencia: lesiones bilaterales → coma o estado vegetativo. El núcleo reticular talámico genera los husos de sueño (EEG). Lesiones mediodorsales → amnesia (Korsakoff).',
        tags:['Neuropsicología','Psicología de la Percepción','Psicología del Sueño']
    },
    'hypothalamus': {
        name:'Hipotálamo', emoji:'⚙️', category:'Diencéfalo',
        fn:'Regula el sistema endocrino (ejes HPA, HPT), el SNA, la temperatura, el hambre, la sed y los ritmos circadianos.',
        details:'Pequeña estructura con numerosos núcleos: paraventricular (CRH, oxitocina), supraquiasmático (reloj circadiano 24h), lateral (hambre), ventromedial (saciedad), preóptico (temperatura, sueño).',
        psy:'El eje HHA y la respuesta al estrés son fundamentales en psicología clínica (Selye, McEwen). El núcleo supraquiasmático regula los ritmos circadianos. La oxitocina hipotalámica modula el apego social.',
        tags:['Psicología de la Motivación','Psicofisiología','Psicología Clínica']
    },
    'cingulate': {
        name:'Giro Cingulado', emoji:'🌀', category:'Sistema Límbico',
        fn:'Integración emocional-cognitiva, detección de errores (ACC dorsal), regulación de la atención y procesamiento del dolor afectivo.',
        details:'Rodea el cuerpo calloso en la cara medial. ACC: porciones cognitiva y afectiva. PCC: forma parte de la red por defecto (DMN). Recibe del tálamo anterior (circuito de Papez).',
        psy:'El ACC dorsal detecta conflictos y errores (N200 en EEG). El ACC subgenual (área 25) está involucrado en la depresión mayor; es diana de la estimulación cerebral profunda (DBS) para depresión refractaria.',
        tags:['Psicología Cognitiva','Psicología Clínica','Neuropsicología']
    },
    'parahippocampal': {
        name:'Giro Parahipocampal', emoji:'🗺️', category:'Sistema Límbico',
        fn:'Procesamiento espacial (place cells), entrada/salida de información al hipocampo (corteza entorrinal y perirrinal).',
        details:'Rodea el hipocampo en la cara medial del lóbulo temporal. Contiene la corteza entorrinal (BA28, principal puerta de entrada al hipocampo) y la corteza perirrinal (BA35-36).',
        psy:'La corteza entorrinal es la primera región en mostrar ovillos neurofibrilares en el Alzheimer (estadio I de Braak). El giro parahipocampal posterior forma la parahippocampal place area (PPA).',
        tags:['Psicología de la Memoria','Neuropsicología','Psicología Cognitiva']
    },
    'basilar artery': {
        name:'Arteria Basilar', emoji:'🩸', category:'Vascularización',
        fn:'Principal arteria del sistema vertebrobasilar. Irriga el tronco encefálico, el cerebelo y el territorio posterior del cerebro.',
        details:'Formada por la unión de las dos arterias vertebrales a nivel del puente. Se divide en la bifurcación basilar dando origen a las arterias cerebrales posteriores (ACP).',
        psy:'La isquemia vertebrobasilar puede producir el síndrome de cautiverio (locked-in): cuadriplejía con consciencia intacta. Modelo de disociación entre motricidad y cognición.',
        tags:['Neuropsicología','Neurología','Psicología Clínica']
    },
    'internal carotid': {
        name:'Arteria Carótida Interna', emoji:'🩸', category:'Vascularización',
        fn:'Irriga los hemisferios cerebrales (territorio anterior: frontal, parietal, temporal anterior) y el ojo ipsilateral.',
        details:'Rama de la carótida común que penetra el cráneo. Da origen a la arteria oftálmica, arteria comunicante posterior y se bifurca en ACA y ACM.',
        psy:'La estenosis carotídea es causa frecuente de ictus y deterioro cognitivo vascular. La ACM irriga las áreas de Broca y Wernicke: afasia en ictus carotídeos izquierdos.',
        tags:['Neuropsicología','Neurología','Psicología de la Salud']
    },
    'anterior cerebral': {
        name:'Arteria Cerebral Anterior (ACA)', emoji:'🩸', category:'Vascularización',
        fn:'Irriga la cara medial de los lóbulos frontal y parietal (corteza motora y sensitiva para la pierna) y el cuerpo calloso anterior.',
        details:'Rama terminal de la carótida interna. Las dos ACA se conectan por la arteria comunicante anterior (AComA), completando el polígono de Willis.',
        psy:'Los infartos de ACA producen hemiparesia de predominio crural contralateral. Lesiones del cingulado anterior → mutismo acinético. La AComA es el aneurisma intracraneal más frecuente.',
        tags:['Neuropsicología','Neurología']
    },
    'middle cerebral': {
        name:'Arteria Cerebral Media (ACM)', emoji:'🩸', category:'Vascularización',
        fn:'La mayor arteria cerebral. Irriga la cara lateral del hemisferio: lóbulos frontal, parietal y temporal lateral, incluyendo las áreas del lenguaje.',
        details:'Sus ramas lenticuloestriadas irrigan los ganglios basales y la cápsula interna. Irriga la corteza motora, somatosensorial, áreas de Broca y Wernicke y la ínsula.',
        psy:'Ictus de ACM izquierda → afasia global, hemiparesia derecha y hemianopsia. ACM derecha → heminegligencia izquierda y anosognosia.',
        tags:['Neuropsicología','Psicología del Lenguaje','Neurología']
    },
    'posterior cerebral': {
        name:'Arteria Cerebral Posterior (ACP)', emoji:'🩸', category:'Vascularización',
        fn:'Irriga el lóbulo occipital (corteza visual V1), el tálamo, el hipocampo y el tronco encefálico superior.',
        details:'Rama terminal de la arteria basilar. Sus ramas profundas irrigan el tálamo y el mesencéfalo. Sus ramas corticales irrigan los lóbulos temporal inferior y occipital.',
        psy:'Infartos de ACP → hemianopsia homónima contralateral. Infartos bilaterales → ceguera cortical con síndrome de Anton (el paciente niega su ceguera).',
        tags:['Neuropsicología','Psicología de la Percepción','Neurología']
    },
    'vertebral artery': {
        name:'Arteria Vertebral', emoji:'🩸', category:'Vascularización',
        fn:'Irriga la médula espinal cervical, el bulbo raquídeo y el cerebelo posterior (PICA).',
        details:'Asciende por los agujeros transversos cervicales. Da origen a la arteria espinal anterior, espinal posterior y la arteria cerebelosa posteroinferior (PICA). Las dos vertebrales forman la arteria basilar.',
        psy:'Oclusión de PICA → síndrome de Wallenberg: vértigo, nistagmo, hemiataxia ipsilateral, pérdida de dolor/temperatura contralateral, síndrome de Horner y disfagia.',
        tags:['Neuropsicología','Neurología']
    },
    'circle of willis': {
        name:'Polígono de Willis', emoji:'🔁', category:'Vascularización',
        fn:'Anillo anastomótico arterial en la base del cerebro que garantiza la circulación colateral si una arteria se ocluye.',
        details:'Formado por: ACA bilateral + AComA + ACI bilateral + AComP bilateral + ACP bilateral. Permite redistribuir el flujo sanguíneo en caso de oclusión arterial.',
        psy:'Los aneurismas del polígono son causa de hemorragia subaracnoidea (HSA) espontánea: cefalea en trueno, deterioro rápido de consciencia.',
        tags:['Neurología','Neuropsicología','Psicología de la Salud']
    },
    'communicating artery': {
        name:'Arteria Comunicante', emoji:'🔁', category:'Vascularización',
        fn:'Conexiones arteriales del polígono de Willis que garantizan la circulación colateral.',
        details:'AComA conecta las dos ACA. AComP conecta la ACI con la ACP, uniendo los sistemas carotídeo y vertebrobasilar.',
        psy:'La AComA es el sitio de aneurisma intracraneal más frecuente. Su ruptura puede causar amnesia anterógrada. Las AComP comprimen el III par craneal al romperse.',
        tags:['Neurología','Neuropsicología']
    },
    'olfactory': {
        name:'Nervio Olfatorio (I)', emoji:'👃', category:'Pares Craneales',
        fn:'Olfato. Único sentido que conecta directamente con el sistema límbico sin pasar por el tálamo.',
        details:'Los axones de las células olfatorias atraviesan la lámina cribosa del etmoides y hacen sinapsis en los bulbos olfatorios. Proyectan a la corteza piriforme, la amígdala y el córtex entorrinal.',
        psy:'El olfato evoca memorias emocionales con intensidad especial (fenómeno de Proust) por su conexión directa con la amígdala. La anosmia es síntoma temprano del Alzheimer y del Parkinson.',
        tags:['Psicología de la Memoria','Neuropsicología','Psicología de la Percepción']
    },
    'optic': {
        name:'Nervio Óptico (II)', emoji:'👁️', category:'Pares Craneales',
        fn:'Visión. Transmite información de la retina al quiasma óptico, cintillas ópticas y NGL del tálamo.',
        details:'Técnicamente es un tracto del SNC. Las fibras nasales decusan en el quiasma óptico; las temporales no. El campo visual derecho proyecta al hemisferio izquierdo y viceversa.',
        psy:'Lesiones de la vía óptica → patrones campimétricos diagnósticos: ceguera monocular (nervio), hemianopsia bitemporal (quiasma/tumor hipofisario), hemianopsia homónima (cintilla).',
        tags:['Neuropsicología','Psicología de la Percepción']
    },
    'oculomotor': {
        name:'Nervio Oculomotor (III)', emoji:'👁️', category:'Pares Craneales',
        fn:'Controla cuatro músculos oculares extrínsecos, el elevador del párpado y la constricción pupilar (parasimpático).',
        details:'Emerge del mesencéfalo. Sus fibras parasimpáticas controlan el esfínter pupilar (miosis). La parálisis del III: ptosis, ojo desviado abajo-afuera y midriasis fija.',
        psy:'Midriasis unilateral con ptosis = emergencia neurológica (herniación uncal). El reflejo fotomotor es crucial en la evaluación del coma. Parálisis completa = señal de alarma de aneurisma.',
        tags:['Neuropsicología','Neurología']
    },
    'trochlear': {
        name:'Nervio Troclear (IV)', emoji:'👁️', category:'Pares Craneales',
        fn:'Inerva el músculo oblicuo superior: rota el ojo hacia adentro y abajo.',
        details:'El único par craneal que emerge de la cara dorsal del tronco. El más delgado y con el trayecto intracraneal más largo. La parálisis produce diplopía vertical.',
        psy:'Frecuentemente afectado tras traumatismos craneales. La diplopía vertical persistente puede generar comportamientos de evitación y pseudo-depresión.',
        tags:['Neuropsicología','Neurología']
    },
    'trigeminal': {
        name:'Nervio Trigémino (V)', emoji:'⚡', category:'Pares Craneales',
        fn:'Sensibilidad de la cara, la boca y la córnea (V1, V2, V3) y función motora para los músculos de la masticación (V3).',
        details:'El mayor par craneal. Tres ramas: oftálmica (V1), maxilar (V2), mandibular (V3 + motor). Ganglio de Gasser. El reflejo corneal: V1 aferente + VII eferente.',
        psy:'La neuralgia del trigémino produce dolor facial fulminante que puede conducir a depresión severa, aislamiento y riesgo de suicidio. El dolor crónico facial tiene alto impacto psicosocial.',
        tags:['Psicología del Dolor','Neuropsicología','Psicología Clínica']
    },
    'abducens': {
        name:'Nervio Abducente (VI)', emoji:'👁️', category:'Pares Craneales',
        fn:'Inerva el músculo recto lateral: abduce el ojo (movimiento hacia afuera).',
        details:'Núcleo en el puente. Trayecto intracraneal largo y vulnerable. La parálisis produce estrabismo convergente y diplopía horizontal.',
        psy:'La diplopía persistente es muy incapacitante y genera ansiedad. La parálisis bilateral puede señalar hipertensión intracraneal o encefalopatía de Wernicke.',
        tags:['Neuropsicología','Neurología']
    },
    'facial': {
        name:'Nervio Facial (VII)', emoji:'😊', category:'Pares Craneales',
        fn:'Movimiento de los músculos de la expresión facial, gusto (2/3 anteriores de la lengua), secreción lagrimal y salival.',
        details:'Parálisis periférica (parálisis de Bell): afecta toda la hemicara ipsilateral. Parálisis central: preserva la frente (inervación bilateral supranuclear).',
        psy:'La expresión facial es clave en la comunicación emocional (Ekman). La parálisis facial genera impacto psicológico severo en la autoestima y la comunicación no verbal.',
        tags:['Psicología de las Emociones','Neuropsicología','Psicología Clínica']
    },
    'vestibulocochlear': {
        name:'Nervio Vestibulococlear (VIII)', emoji:'👂', category:'Pares Craneales',
        fn:'Audición (rama coclear) y equilibrio/orientación espacial (rama vestibular).',
        details:'Dos ramas: la coclear (sonido desde el órgano de Corti) y la vestibular (equilibrio desde el utrículo, sáculo y canales semicirculares).',
        psy:'La hipoacusia crónica se asocia a mayor riesgo de deterioro cognitivo y demencia (Lancet Commission 2020). El vértigo posicional benigno genera ansiedad significativa.',
        tags:['Neuropsicología','Psicología de la Percepción','Psicología del Envejecimiento']
    },
    'glossopharyngeal': {
        name:'Nervio Glosofaríngeo (IX)', emoji:'👅', category:'Pares Craneales',
        fn:'Sensibilidad del 1/3 posterior de la lengua y la faringe, gusto posterior, reflejo nauseoso y secreción de la parótida.',
        details:'Emerge del bulbo raquídeo. Componentes sensitivos, gustativos, parasimpáticos (parótida) y motores. El reflejo nauseoso: IX aferente, X eferente.',
        psy:'La neuralgia del glosofaríngeo produce dolor paroxístico en la faringe y el oído. La disfagia puede generar miedo condicionado a la deglución.',
        tags:['Neuropsicología','Psicología Clínica']
    },
    'vagus': {
        name:'Nervio Vago (X)', emoji:'🫀', category:'Pares Craneales',
        fn:'Regulación parasimpática de vísceras torácicas y abdominales. Modula la frecuencia cardíaca, la respiración y el tono vagal.',
        details:'El par craneal con mayor distribución. Fibras parasimpáticas regulan corazón, pulmones y tubo digestivo. Núcleo dorsal: vísceras; núcleo ambiguo: laringe y faringe.',
        psy:'Teoría polivagal (Porges): el vago mielinizado regula los estados sociales de seguridad. La variabilidad de la FC (HRV) es un marcador de regulación emocional. La estimulación vagal (VNS) trata depresión y epilepsia refractaria.',
        tags:['Psicofisiología','Psicología de las Emociones','Psicología Clínica']
    },
    'accessory': {
        name:'Nervio Accesorio (XI)', emoji:'💪', category:'Pares Craneales',
        fn:'Motor: inerva el esternocleidomastoideo (rotación cefálica) y el trapecio (elevación del hombro).',
        details:'Raíz craneal (bulbo) y raíz espinal (médula cervical C1-C5). La lesión produce imposibilidad de rotar la cabeza hacia el lado opuesto y de elevar el hombro ipsilateral.',
        psy:'La distonía cervical (tortícolis espasmódica) involucra el ECM y el trapecio. El dolor muscular cervical en el estrés crónico puede reflejar hipertonía de estos músculos.',
        tags:['Neuropsicología','Psicología del Estrés']
    },
    'hypoglossal': {
        name:'Nervio Hipogloso (XII)', emoji:'👅', category:'Pares Craneales',
        fn:'Motor puro: controla todos los movimientos de la lengua. Esencial para el habla articulada y la deglución.',
        details:'Emerge del surco anterolateral del bulbo. Lesión periférica: parálisis ipsilateral con atrofia y fasciculaciones; lesión central: paresia contralateral sin atrofia.',
        psy:'La disartria por lesión del XII afecta la comunicación y la autoestima. La desviación de la lengua al protruirla es un signo neurológico localizador relevante.',
        tags:['Psicología del Lenguaje','Neuropsicología']
    },
    'corpus callosum': {
        name:'Cuerpo Calloso', emoji:'🌉', category:'Comisuras',
        fn:'Principal comisura interhemisférica (~250 millones de axones). Transfiere información sensorial, motora y cognitiva entre hemisferios.',
        details:'La mayor estructura de sustancia blanca. Divisiones: rostro, rodilla (genu, fibras prefrontales), cuerpo (fibras frontales y parietales), istmo y esplenio (fibras occipitales). Maduración postnatal completa hasta los 20-25 años.',
        psy:'La sección quirúrgica (comisurectomía) en epilepsia produce el síndrome del cerebro partido (Sperry y Gazzaniga, Nobel 1981). Mayor en músicos. Su adelgazamiento se observa en la esquizofrenia.',
        tags:['Neuropsicología','Psicología Cognitiva','Psicología del Lenguaje']
    },
    'genu': {
        name:'Rodilla del Cuerpo Calloso (Genu)', emoji:'🌉', category:'Comisuras',
        fn:'Porción anterior del cuerpo calloso. Conecta las cortezas prefrontales de ambos hemisferios.',
        details:'Sus fibras (fórceps menor) conectan los lóbulos frontales. Primera porción en mielinizarse en el desarrollo postnatal.',
        psy:'El adelgazamiento del genu se observa en la depresión mayor, el trastorno bipolar y el TDAH (estudios de DTI). La conectividad prefrontal bilateral es crucial para las funciones ejecutivas.',
        tags:['Neuropsicología','Psicología Clínica']
    },
    'splenium': {
        name:'Esplenio del Cuerpo Calloso', emoji:'🌉', category:'Comisuras',
        fn:'Porción posterior y más gruesa. Conecta las cortezas occipitales y parietales posteriores de ambos hemisferios.',
        details:'Sus fibras (fórceps mayor) conectan los lóbulos occipitales y parietales. Región más afectada en la agenesia callosal parcial.',
        psy:'Las lesiones del esplenio producen alexia pura (síndrome de Dejerine): la información visual del hemisferio derecho no puede transferirse al área del lenguaje del izquierdo. Se adelgaza en el Alzheimer.',
        tags:['Neuropsicología','Psicología del Lenguaje','Psicología del Envejecimiento']
    },
    'anterior commissure': {
        name:'Comisura Anterior', emoji:'🔗', category:'Comisuras',
        fn:'Conecta los bulbos olfatorios y las cortezas temporales anteriores (incluyendo la amígdala) de ambos hemisferios.',
        details:'Haz de fibras en posición anterior y ventral al genu. Porción anterior (olfatoria) y posterior (conecta amígdalas y cortezas temporales anteriores). La comisura más antigua filogenéticamente.',
        psy:'Permite la integración de información emocional (amígdala) entre hemisferios. En la comisurectomía, su preservación transmite información afectiva e olfatoria.',
        tags:['Neuropsicología','Psicología de las Emociones']
    },
    'posterior commissure': {
        name:'Comisura Posterior', emoji:'🔗', category:'Comisuras',
        fn:'Conecta los colículos superiores y los núcleos pretectales de ambos lados. Participa en el reflejo fotomotor consensual.',
        details:'Pequeño haz de fibras que cruza la línea media dorsalmente al acueducto de Silvio. Conecta los núcleos pretectales (reflejo de constricción pupilar) y los colículos superiores bilateralmente.',
        psy:'Su lesión (por tumor pineal) produce el síndrome de Parinaud: parálisis de la mirada vertical hacia arriba, nistagmo de convergencia-retracción y disociación luz-acomodación.',
        tags:['Neuropsicología','Neurología']
    },
    'arcuate fasciculus': {
        name:'Fascículo Arcuato', emoji:'🌐', category:'Sustancia Blanca',
        fn:'Conecta las áreas de Broca (frontal inferior) y Wernicke (temporal superior). Principal tracto del lenguaje.',
        details:'Fascículo de asociación largo que conecta el córtex frontal inferior con el temporal posterior, pasando por el parietal inferior. Porción directa (Broca-Wernicke) y dos porciones indirectas.',
        psy:'Su lesión produce la afasia de conducción: comprensión intacta, producción fluida pero repetición gravemente alterada. La tractografía por DTI permite visualizarlo in vivo. Alterado en la dislexia.',
        tags:['Psicología del Lenguaje','Neuropsicología','Psicología Cognitiva']
    },
    'uncinate fasciculus': {
        name:'Fascículo Uncinado', emoji:'🌐', category:'Sustancia Blanca',
        fn:'Conecta el córtex orbitofrontal con el polo temporal y la amígdala. Integración emocional-ejecutiva.',
        details:'Fascículo en forma de gancho que conecta el lóbulo frontal anterior (orbitofrontal) con el temporal anterior (amígdala, hipocampo anterior). Principal vía entre la corteza prefrontal y el sistema límbico temporal.',
        psy:'Reducido en el trastorno antisocial/psicopatía (Craig et al. 2009): explica la desconexión emocional-ejecutiva. También alterado en el TEPT, el TLP y la demencia frontotemporal.',
        tags:['Neuropsicología','Psicología Clínica','Psicología de las Emociones']
    },
    'superior longitudinal fasciculus': {
        name:'Fascículo Longitudinal Superior (FLS)', emoji:'🌐', category:'Sustancia Blanca',
        fn:'Sistema de tractos que conecta amplias regiones frontales, parietales y temporales. Implicado en atención, lenguaje y memoria de trabajo.',
        details:'Sistema complejo con 4 componentes: FLS-I (frontal-parietal superior), FLS-II (frontal-parietal inferior/angular), FLS-III (frontal inferior-temporal posterior ≈ fascículo arcuato), y FLS-IV.',
        psy:'El FLS-II derecho es esencial en la atención visuoespacial (su lesión → hemineglect). El FLS-III es clave en el lenguaje. Alteraciones en la esquizofrenia y el TDAH.',
        tags:['Neuropsicología','Psicología Cognitiva','Psicología Clínica']
    },
    'cingulum': {
        name:'Cíngulo', emoji:'🌀', category:'Sustancia Blanca',
        fn:'Conecta estructuras del sistema límbico entre sí y con la corteza prefrontal y parietal. El cinturón límbico.',
        details:'Fascículo de asociación largo que sigue el contorno del cuerpo calloso. Conecta el cingulado, el giro del hipocampo, la corteza retrosplenial, el tálamo anterior y la corteza prefrontal medial.',
        psy:'El tracto más consistentemente alterado en la depresión mayor (reducción de FA en DTI). La estimulación del cíngulo subgenual (área 25) mejora la depresión refractaria. Alterado en el Alzheimer y el TEPT.',
        tags:['Psicología Clínica','Neuropsicología','Psicología de las Emociones']
    },
    'insula': {
        name:'Ínsula (Lóbulo Insular)', emoji:'🫀', category:'Corteza Cerebral',
        fn:'Procesamiento interoceptivo, conciencia emocional, gusto, dolor y regulación autonómica.',
        details:'Corteza enterrada en el fondo de la cisura lateral de Silvio. Porciones granulares posteriores (interoceptivas) y agranulares anteriores (límbicas). Conectada con la amígdala, el cingulado anterior y la corteza prefrontal.',
        psy:'La ínsula anterior es el sustrato neural de los sentimientos corporales conscientes (Damasio, marcador somático). Hiperactivada en el trastorno de pánico y en el craving en adicciones. Media la empatía del dolor.',
        tags:['Psicología de las Emociones','Neuropsicología','Psicología Clínica']
    },
    'precentral gyrus': {
        name:'Giro Precentral (Corteza Motora)', emoji:'⚡', category:'Corteza Cerebral',
        fn:'Planificación y ejecución del movimiento voluntario. Contiene el homúnculo motor de Penfield.',
        details:'Área 4 de Brodmann. Contiene las células de Betz (neuronas motoras superiores gigantes). Representación somatotópica: pierna medial, tronco lateral, brazo, mano (mayor representación), cara y lengua más lateral.',
        psy:'Las lesiones producen hemiparesia contralateral espástica. La neuroplasticidad motora (rehabilitación post-ictus) reorganiza la representación cortical. Esencial en la psicología de la rehabilitación.',
        tags:['Neuropsicología','Psicofisiología']
    },
    'postcentral gyrus': {
        name:'Giro Postcentral (Corteza Somatosensorial)', emoji:'🤚', category:'Corteza Cerebral',
        fn:'Procesamiento de las sensaciones somáticas: tacto, presión, temperatura, dolor y propiocepción. Homúnculo sensitivo.',
        details:'Áreas 3a, 3b, 1 y 2 de Brodmann. Recibe información del tálamo VPL/VPM. El área 3b procesa el tacto discriminativo; el 1, textura; el 2, tamaño y forma; el 3a, propiocepción.',
        psy:'El dolor del miembro fantasma involucra reorganización maladaptativa del córtex somatosensorial (Ramachandran). La meditación mindfulness modifica la actividad de esta área.',
        tags:['Neuropsicología','Psicología de la Percepción','Psicología del Dolor']
    },
    'lateral sulcus': {
        name:'Surco Lateral (Cisura de Silvio)', emoji:'〰️', category:'Surcos y Cisuras',
        fn:'Principal surco que separa los lóbulos frontal/parietal del temporal. Contiene la ínsula en su profundidad.',
        details:'El surco más profundo y prominente del hemisferio. La ínsula se encuentra enterrada en su fondo, cubierta por los opérculos frontal, parietal y temporal.',
        psy:'Punto de referencia anatómico fundamental en neuroimagen. Las afasias suelen ser consecuencia de lesiones en regiones perisilviales. La asimetría del surco lateral está relacionada con la lateralización del lenguaje.',
        tags:['Neuropsicología','Neurología']
    },
    'central sulcus': {
        name:'Surco Central (Cisura de Rolando)', emoji:'〰️', category:'Surcos y Cisuras',
        fn:'Delimita el lóbulo frontal (anterior) del parietal (posterior): giro precentral (motor) delante, postcentral (sensitivo) detrás.',
        details:'Separa la corteza motora primaria (área 4) de la somatosensorial (áreas 3, 1, 2). Identificable en RMN por el signo de la omega (representación de la mano en el giro precentral).',
        psy:'Principal punto de referencia para localizar la corteza motora en neuroimagen preoperatoria. Los potenciales evocados somatosensoriales (PESS) se registran en el córtex postcentral.',
        tags:['Neuropsicología','Neurología']
    }
};

// Mapeo específico de anotaciones numéricas para modelos que vienen etiquetados solo con números
const MODEL_ANNOTATION_MAPS = {
    'plastinated_brain': {
        '1': 'olfactory', // Bulbo olfatorio
        '2': 'optic', // Nervio óptico / Quiasma
        '3': 'oculomotor', // III par
        '4': 'trochlear', // IV par
        '5': 'trigeminal', // V par
        '6': 'abducens', // VI par
        '7': 'facial', // VII par
        '8': 'vestibulocochlear', // VIII par
        '9': 'glossopharyngeal', // IX par
        '10': 'vagus', // X par
        '11': 'accessory', // XI par
        '12': 'hypoglossal', // XII par
        '13': 'precentral gyrus', // Giro motor
        '14': 'postcentral gyrus', // Giro somatosensorial
        '15': 'cerebellum', // Cerebelo
        '16': 'pons', // Protuberancia
        '17': 'medulla', // Bulbo raquídeo
        '18': 'midbrain', // Mesencéfalo
        '19': 'corpus callosum', // Cuerpo calloso
        '20': 'lateral sulcus' // Cisura de Silvio
    }
};

/** Busca descripción para el nombre de una anotación (tolerante: exacto → parcial → palabras → genérico) */
function getZoneDescription(title, modelId = null) {
    if (!title) return null;
    
    let lookupTitle = title;
    
    // Traducir si es un marcador numérico en un modelo que tiene su respectivo mapa
    if (modelId && MODEL_ANNOTATION_MAPS[modelId]) {
        const cleanTitle = title.trim();
        if (MODEL_ANNOTATION_MAPS[modelId][cleanTitle]) {
            lookupTitle = MODEL_ANNOTATION_MAPS[modelId][cleanTitle];
        }
    }
    
    const norm = lookupTitle.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
    const db = ANATOMY_DB;
    
    if (db[norm]) return { ...db[norm], matchTitle: title, originalTitle: lookupTitle };
    for (const k of Object.keys(db)) if (norm.includes(k)) return { ...db[k], matchTitle: title, originalTitle: lookupTitle };
    for (const k of Object.keys(db)) if (k.includes(norm)) return { ...db[k], matchTitle: title, originalTitle: lookupTitle };
    
    const words = norm.split(' ').filter(w => w.length > 4);
    for (const w of words) {
        for (const k of Object.keys(db)) {
            if (k.includes(w)) return { ...db[k], matchTitle: title, originalTitle: lookupTitle };
        }
    }
    
    return { 
        name: isNaN(lookupTitle) ? lookupTitle : `Estructura ${lookupTitle}`, 
        emoji: '📍', 
        category: 'Estructura Anatómica',
        fn: 'Estructura anatómica identificada en el modelo 3D.',
        details: 'Explora el modelo 3D para examinar esta estructura en detalle.',
        psy: 'Consulta la literatura de neuroanatomía para conocer la relevancia clínica y psicológica de esta estructura.',
        tags: [], 
        matchTitle: title,
        originalTitle: lookupTitle
    };
}

