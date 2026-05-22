import urllib.request
import html
import json
import re
import os
import subprocess
import sys

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
    ("3.1", "https://soloaimaproject.es/fundamentos-de-estadistica-tema-2-3"),
    ("3.2", "https://soloaimaproject.es/fundamentos-de-estadistica-tema-3"),
    ("4.1", "https://soloaimaproject.es/fundamentos-de-estadistica-tema-4-1"),
    ("4.2", "https://soloaimaproject.es/fundamentos-de-estadistica-tema-4-2"),
    ("5.1", "https://soloaimaproject.es/fundamentos-de-estadistica-tema-5-1"),
    ("5.2", "https://soloaimaproject.es/fundamentos-de-estadistica-tema-5-2"),
    ("6.1", "https://soloaimaproject.es/fundamentos-de-estadistica-tema-5-3"),
    ("6.2", "https://soloaimaproject.es/fundamentos-de-estadistica-tema-5-4"),
]

UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"

HTML_TEMPLATE = '''<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tema {tema_key} - Fundamentos de Estadística</title>
    <!-- Importamos el cargador dinámico común de temas de estadística -->
    <script src="../../../js/estadistica-loader.js" defer></script>
</head>
<body>
    <!-- Configuración del tema -->
    <script id="tema-config" type="application/json">
        {{
            "asignaturaId": "fundamentos-de-estadistica",
            "temaKey": "{tema_key}"
        }}
    </script>
</body>
</html>'''

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
                if isinstance(obj, str) and ('const app =' in obj or 'const appDB =' in obj):
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
        if 'const app =' in script_code or 'const appDB =' in script_code:
            return script_code

    start_idx = embedded_html.find('const app = {')
    if start_idx == -1:
        start_idx = embedded_html.find('const appDB =')
    if start_idx == -1:
        raise RuntimeError("'const app = {' not found in embedded HTML")
    
    brace_start = embedded_html.index('{', start_idx)
    open_braces = 0
    end_idx = -1
    
    in_string = False
    string_char = None
    i = brace_start
    while i < len(embedded_html):
        c = embedded_html[i]
        if in_string:
            if c == '\\':
                i += 2
                continue
            if c == string_char:
                in_string = False
        else:
            if c in ('"', "'", '`'):
                in_string = True
                string_char = c
            elif c == '{':
                open_braces += 1
            elif c == '}':
                open_braces -= 1
                if open_braces == 0:
                    end_idx = i + 1
                    break
        i += 1
    
    if end_idx == -1:
        raise RuntimeError("Could not find closing brace for const app = {}")
    
    app_block = embedded_html[brace_start:end_idx]
    return f"const app = {app_block};"

def extract_db_via_node(app_js_block, tema_key):
    """Run app JS block in Node.js sandbox and extract DB"""
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
    vm.runInContext(jsContent + '\\nglobal.db_out = (typeof app !== "undefined" && app.DB) ? app.DB : null;', sandbox);
    const db = sandbox.db_out;
    if (db) {{
        process.stdout.write(JSON.stringify(db));
    }} else {{
        process.stderr.write('app.DB not found after evaluation');
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
    os.remove(tmp_node)
    if result.returncode != 0:
        raise RuntimeError(result.stderr[:600])
    return json.loads(result.stdout)

def transform_db_for_estadistica(db):
    """
    Transforms the database keys and structure from soloaimaproject.es format
    to the format expected by our local estadistica-loader.js.
    """
    transformed = {
        "quiz": [],
        "laboratorio": [],
        "formulas": []
    }
    
    # 1. Map Quiz Questions
    for q_item in db.get("quiz", []):
        new_q = {
            "q": q_item.get("q", ""),
            "opciones": q_item.get("options", []),
            "correcta": q_item.get("correct", 0),
            "explicacion": q_item.get("explanation", ""),
            "pista": q_item.get("hint", "")
        }
        transformed["quiz"].append(new_q)
        
    # 2. Map Laboratorio Problems
    for lab_item in db.get("laboratorio", []):
        new_lab = {
            "id": lab_item.get("id"),
            "titulo": lab_item.get("title", ""),
            "escenario": lab_item.get("context", ""),
            "preguntas": []
        }
        for part in lab_item.get("parts", []):
            new_part = {
                "id": part.get("id"),
                "label": part.get("label", ""),
                "enunciado": part.get("question", ""),
                "respuesta": part.get("correctValue"),
                "tolerancia": part.get("tolerance", 0.05),
                "pista": part.get("explanation", "")  # Map explanation to pista (first fail hint & solution reveal)
            }
            new_lab["preguntas"].append(new_part)
        transformed["laboratorio"].append(new_lab)
        
    # 3. Map Formulas
    for form_item in db.get("formulas", []):
        new_form = {
            "nombre": form_item.get("q", ""),
            "latex": form_item.get("a", ""),
            "descripcion": "",
            "categoria": form_item.get("cat", "")
        }
        transformed["formulas"].append(new_form)
        
    return transformed

results = {}

for tema_key, url in URLS:
    tema_file = tema_key.replace('.', '-')
    json_out = os.path.join(JSON_DIR, f"{SUBJECT_ID}-tema-{tema_file}.json")
    html_out = os.path.join(TEMAS_DIR, f"{SHORT_ID}-tema-{tema_file}.html")
    
    print(f"\n{'='*60}")
    print(f"Procesando Tema {tema_key}: {url}")
    
    try:
        print("  -> Fetching...")
        page_html = fetch_url(url)
        print(f"  -> HTML size: {len(page_html)} bytes")
        
        print("  -> Buscando HTML embebido en props de Astro...")
        embedded = find_embedded_html(page_html)
        if not embedded:
            raise RuntimeError("No se encontro HTML embebido con 'const app =' o 'const appDB ='")
        print(f"  -> HTML embebido encontrado ({len(embedded)} chars)")
        
        print("  -> Extrayendo bloque JS de la app...")
        app_js = extract_app_js_block(embedded)
        print(f"  -> Bloque JS extraido ({len(app_js)} chars)")
        
        print("  -> Ejecutando en Node.js VM...")
        db_raw = extract_db_via_node(app_js, tema_key)
        
        print("  -> Transformando formato para estadistica-loader.js...")
        db = transform_db_for_estadistica(db_raw)
        
        quiz_count = len(db.get('quiz', []))
        lab_count = len(db.get('laboratorio', []))
        formulas_count = len(db.get('formulas', []))
        print(f"  -> DB extraida y transformada: {quiz_count} quiz | {lab_count} lab | {formulas_count} formulas")
        
        with open(json_out, 'w', encoding='utf-8') as f:
            json.dump(db, f, ensure_ascii=False, indent=2)
        print(f"  -> JSON guardado: {os.path.basename(json_out)}")
        json_status = f"OK ({quiz_count}q/{lab_count}l/{formulas_count}f)"
        
        # Create HTML theme file
        with open(html_out, 'w', encoding='utf-8') as f:
            f.write(HTML_TEMPLATE.format(tema_key=tema_key))
        print(f"  -> HTML creado: {os.path.basename(html_out)}")
        html_status = "HTML creado"
        
        results[tema_key] = f"{json_status} | {html_status}"
        
    except Exception as e:
        print(f"  -> ERROR: {e}")
        results[tema_key] = f"ERROR: {e}"

print(f"\n{'='*60}")
print("RESUMEN FINAL:")
print(f"{'='*60}")
for k, v in results.items():
    ok = "ERROR" not in v
    print(f"  {'OK' if ok else 'XX'} Tema {k:5s}: {v}")
