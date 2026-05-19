# SAIMAP — Plataforma de Exámenes Unificada

Esta es la nueva estructura unificada para la plataforma de exámenes de SAIMAP. Hemos consolidado todos los exámenes en un único motor HTML y separado las preguntas en archivos JSON estructurados.

## Estructura de la carpeta
* **`index.html`**: El único archivo HTML que contiene todo el diseño premium (Tailwind + Lucide), el motor de exámenes, el temporizador, el Modo Repaso, el Modo Examen y el **Historial de Notas local (guardado en el navegador)**.
* **`json/`**: Carpeta que contiene las preguntas oficiales de cada asignatura en formato JSON.
* **`compile.js`**: Script de Node.js que unifica los JSONs que vamos generando tema a tema (Memoria y Desarrollo).
* **`extract_old_exams.js`**: Script de Node.js que migró y extrajo automáticamente las preguntas que tenías incrustadas en los antiguos HTMLs.

---

## Cómo usar en Local (En tu ordenador)

### Método Fácil (Sin instalar nada - Drag & Drop)
1. Haz doble clic en `index.html` para abrirlo en tu navegador.
2. En la pantalla inicial, verás el panel de rendimiento y una zona de carga.
3. Arrastra o selecciona cualquier archivo JSON de la carpeta `json/` (ej: `psicologia-social.json`).
4. ¡El motor cargará las preguntas al instante y podrás empezar el test!

### Método Avanzado (Simulando la web real)
Si quieres probar los enlaces directos (como se verían en Hostinger):
1. Abre tu terminal en esta carpeta.
2. Ejecuta un servidor local rápido (no requiere instalación):
   ```bash
   npx serve .
   # O si prefieres Python:
   python -m http.server 8000
   ```
3. Abre en tu navegador cualquiera de estos enlaces de prueba:
   * `http://localhost:3000/?asignatura=psicologia-de-la-memoria`
   * `http://localhost:3000/?asignatura=psicologia-del-desarrollo`
   * `http://localhost:3000/?asignatura=psicologia-social`

---

## Cómo conectar GitHub con Hostinger (Paso a Paso)

Para que cada vez que modifiques una pregunta o mejoremos el diseño de la web se actualice sola en Hostinger, sigue estos pasos:

### Paso 1: Inicializar Git en local e ir a GitHub
1. Si no tienes Git instalado en tu ordenador, descárgalo e instálalo.
2. Abre la terminal en esta carpeta (`saimap-plataforma`) y ejecuta:
   ```bash
   git init
   git add .
   git commit -m "Estructura inicial unificada SAIMAP"
   ```
3. Ve a [GitHub](https://github.com) y crea un nuevo repositorio llamado `saimap-plataforma` (puedes ponerlo como **Privado** para que solo tú tengas acceso al código).
4. Vincula tu carpeta local con GitHub ejecutando los comandos que te da GitHub, que serán similares a:
   ```bash
   git remote add origin https://github.com/TU_USUARIO/saimap-plataforma.git
   git branch -M main
   git push -u origin main
   ```

### Paso 2: Conectar Hostinger con tu GitHub
1. Entra a tu panel de control de Hostinger (**hPanel**).
2. Ve a la sección de **Sitio Web** ➔ **Git**.
3. En **Repositorio Git**, pega la URL de tu repositorio de GitHub (ej: `https://github.com/TU_USUARIO/saimap-plataforma.git`).
4. Selecciona la rama (`main`).
5. En la carpeta de destino, pon la carpeta de tu dominio donde quieras que se carguen los exámenes (por ejemplo, public_html o una carpeta llamada `examenes`).
6. Haz clic en **Conectar**.

¡Listo! A partir de ahora, cada vez que hagamos una mejora aquí:
1. Ejecutamos:
   ```bash
   git add .
   git commit -m "Mejora o nueva asignatura"
   git push
   ```
2. Hostinger detectará el cambio y actualizará tu web automáticamente en segundos. ¡Te olvidarás para siempre de subir decenas de archivos por FTP!
