/*
 * SAIMAP Plataforma — motor de "Interfaz de Estudio Guiado" (estilo Duolingo).
 * Adaptado de saimap-lenguas-sagradas/shared/lesson-engine.js: misma lógica
 * de ejercicios/XP/racha, pero pintado con clases de Tailwind y la paleta
 * violeta/índigo de Plataforma SAIMAP (no el estilo glass/gold de Lenguas
 * Sagradas). Solo incluye los tipos de ejercicio con contenido textual:
 * opción múltiple, rellenar hueco y relacionar (no hay "ear"/"performance",
 * que en el motor original son ejercicios de audio/instrumento).
 *
 * NOTA para cuando se amplíe a más asignaturas: los colores de acento están
 * hoy fijados a la paleta violeta de "Psicología del Pensamiento" (la
 * asignatura piloto). Si se generaliza, centralizar aquí un objeto de tema
 * (como THEME_CONFIG en tema-loader.js) y sustituir las clases fijas por
 * las del tema activo.
 */
(function (global) {
  'use strict';

  const STORAGE_KEY = 'saimap-plataforma-guiado-progress';
  const XP_PER_CORRECT = 10;

  function _readStore() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    } catch (e) {
      return {};
    }
  }

  function _writeStore(store) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
    } catch (e) {
      console.error('No se pudo guardar el progreso de la ruta guiada:', e);
    }
  }

  function getCourseProgress(courseId) {
    const store = _readStore();
    return store[courseId] || { xp: 0, streak: 0, completedLessons: [], lastPlayed: null };
  }

  function _todayStr() {
    return new Date().toISOString().slice(0, 10);
  }

  function recordLessonComplete(courseId, lessonId, { correct, total }) {
    const store = _readStore();
    const prev = store[courseId] || { xp: 0, streak: 0, completedLessons: [], lastPlayed: null };

    const today = _todayStr();
    let streak = prev.streak;
    if (prev.lastPlayed !== today) {
      const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
      streak = prev.lastPlayed === yesterday ? prev.streak + 1 : 1;
    }

    const completedLessons = prev.completedLessons.includes(lessonId)
      ? prev.completedLessons
      : [...prev.completedLessons, lessonId];

    const next = {
      xp: prev.xp + correct * XP_PER_CORRECT,
      streak,
      completedLessons,
      lastPlayed: today
    };
    store[courseId] = next;
    _writeStore(store);
    return next;
  }

  function _shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  // ---------- Sesión aleatoria de ejercicios (con repaso de lecciones previas) ----------
  const SESSION_SIZE = 10;
  const REVIEW_COUNT = 2;

  // A partir del banco completo de una lección (hasta ~24 ejercicios) construye
  // la sesión de 10 que se juega esta vez: aleatoria dentro del banco propio y,
  // salvo en la primerísima lección del curso, con 2 preguntas "de repaso"
  // tomadas al azar de lecciones anteriores ya vistas, para reforzar el
  // aprendizaje continuo. allLessons debe venir en el orden real del curso.
  function buildLessonSession(allLessons, lessonId) {
    const index = allLessons.findIndex((l) => l.id === lessonId);
    const lesson = allLessons[index];
    if (!lesson) return null;

    const ownBank = lesson.exercises;
    const isFirstLesson = index === 0;

    let session;
    if (isFirstLesson) {
      session = _shuffle(ownBank).slice(0, Math.min(SESSION_SIZE, ownBank.length));
    } else {
      const reviewPool = [];
      for (let i = 0; i < index; i++) {
        reviewPool.push(...allLessons[i].exercises);
      }
      const reviewCount = Math.min(REVIEW_COUNT, reviewPool.length);
      const ownCount = Math.min(SESSION_SIZE - reviewCount, ownBank.length);

      const ownPicks = _shuffle(ownBank).slice(0, ownCount);
      const reviewPicks = _shuffle(reviewPool)
        .slice(0, reviewCount)
        .map((ex) => Object.assign({}, ex, { _review: true }));

      session = _shuffle(ownPicks.concat(reviewPicks));
    }

    return Object.assign({}, lesson, { exercises: session });
  }

  function _normalize(str) {
    return String(str)
      .trim()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, ''); // ignora acentos al comparar respuestas escritas
  }

  // ---------- Clases Tailwind reutilizables ----------
  const OPTION_BASE =
    'w-full text-left px-4 py-3.5 rounded-2xl border-2 border-slate-200 bg-white font-semibold text-sm text-slate-700 transition-all hover:border-violet-300 hover:bg-violet-50/60 disabled:cursor-not-allowed';
  const OPTION_SELECTED = 'border-violet-600 bg-violet-50 text-violet-800 ring-2 ring-violet-100';
  const OPTION_CORRECT = 'border-emerald-500 bg-emerald-50 text-emerald-700';
  const OPTION_WRONG = 'border-red-400 bg-red-50 text-red-700';

  const MATCH_ITEM_BASE =
    'w-full px-3 py-3 rounded-xl border-2 border-slate-200 bg-white text-xs sm:text-sm font-semibold text-slate-700 text-center transition-all hover:border-violet-300';
  const MATCH_SELECTED = 'border-violet-600 bg-violet-50 text-violet-800';
  const MATCH_MATCHED = 'border-emerald-500 bg-emerald-50 text-emerald-700 opacity-70 cursor-default';
  const MATCH_WRONG_FLASH = 'border-red-500 bg-red-50 text-red-700';

  function _clearOptionState(el) {
    el.classList.remove(
      ...OPTION_SELECTED.split(' '),
      ...OPTION_CORRECT.split(' '),
      ...OPTION_WRONG.split(' ')
    );
  }

  // ---------- Render de cada tipo de ejercicio ----------
  function _renderMultipleChoice(container, exercise) {
    const options = _shuffle(exercise.options);
    let selectedBtn = null;

    const wrap = document.createElement('div');
    wrap.className = 'grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2';
    options.forEach((opt) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = OPTION_BASE;
      btn.textContent = opt;
      btn.addEventListener('click', () => {
        wrap.querySelectorAll('button').forEach((el) => _clearOptionState(el));
        btn.classList.add(...OPTION_SELECTED.split(' '));
        selectedBtn = btn;
      });
      wrap.appendChild(btn);
    });
    container.appendChild(wrap);

    return () => {
      const correct = selectedBtn !== null && _normalize(selectedBtn.textContent) === _normalize(exercise.answer);
      wrap.querySelectorAll('button').forEach((el) => {
        _clearOptionState(el);
        if (_normalize(el.textContent) === _normalize(exercise.answer)) {
          el.classList.add(...OPTION_CORRECT.split(' '));
        } else if (el === selectedBtn) {
          el.classList.add(...OPTION_WRONG.split(' '));
        }
        el.disabled = true;
      });
      return { correct };
    };
  }

  function _renderFillBlank(container, exercise) {
    const wrap = document.createElement('div');
    wrap.className = 'mt-2';

    const input = document.createElement('input');
    input.type = 'text';
    input.autocomplete = 'off';
    input.spellcheck = false;
    input.className =
      'w-full px-4 py-3.5 rounded-2xl border-2 border-slate-200 focus:border-violet-500 focus:ring-4 focus:ring-violet-100 outline-none text-sm font-semibold text-slate-700 transition-all';
    input.placeholder = 'Escribe tu respuesta…';
    wrap.appendChild(input);
    container.appendChild(wrap);
    input.focus();

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const btn = container.closest('body').querySelector('.gl-check-btn');
        if (btn && !btn.disabled) btn.click();
      }
    });

    return () => {
      const correct = _normalize(input.value) === _normalize(exercise.answer);
      input.disabled = true;
      if (correct) {
        input.classList.add('border-emerald-500', 'ring-4', 'ring-emerald-100');
      } else {
        input.classList.add('border-red-400', 'ring-4', 'ring-red-100');
        const hint = document.createElement('div');
        hint.className = 'mt-2 text-xs font-bold text-red-600';
        hint.textContent = `Respuesta correcta: ${exercise.answer}`;
        wrap.appendChild(hint);
      }
      return { correct };
    };
  }

  function _renderMatch(container, exercise) {
    const pairs = exercise.pairs; // [[izquierda, derecha], ...]
    const left = _shuffle(pairs.map((p, i) => ({ text: p[0], i })));
    const right = _shuffle(pairs.map((p, i) => ({ text: p[1], i })));
    let selectedLeft = null;
    const matched = new Set();
    let wrongAttempts = 0;

    const hint = document.createElement('p');
    hint.className = 'text-xs font-semibold text-slate-400 mb-2';
    hint.textContent = 'Toca un elemento de la izquierda y luego su pareja a la derecha.';
    container.appendChild(hint);

    const grid = document.createElement('div');
    grid.className = 'grid grid-cols-2 gap-3 mt-1';
    const colL = document.createElement('div');
    const colR = document.createElement('div');
    colL.className = 'flex flex-col gap-2';
    colR.className = 'flex flex-col gap-2';

    function makeItem(entry, col, isLeft) {
      const el = document.createElement('button');
      el.type = 'button';
      el.className = MATCH_ITEM_BASE;
      el.textContent = entry.text;
      el.addEventListener('click', () => {
        if (matched.has(entry.i)) return;
        if (isLeft) {
          colL.querySelectorAll('button').forEach((e) => e.classList.remove(...MATCH_SELECTED.split(' ')));
          el.classList.add(...MATCH_SELECTED.split(' '));
          selectedLeft = { entry, el };
        } else if (selectedLeft) {
          if (selectedLeft.entry.i === entry.i) {
            selectedLeft.el.classList.remove(...MATCH_SELECTED.split(' '));
            selectedLeft.el.classList.add(...MATCH_MATCHED.split(' '));
            el.classList.add(...MATCH_MATCHED.split(' '));
            matched.add(entry.i);
          } else {
            wrongAttempts++;
            const wrongLeftEl = selectedLeft.el;
            el.classList.add(...MATCH_WRONG_FLASH.split(' '));
            wrongLeftEl.classList.add(...MATCH_WRONG_FLASH.split(' '));
            setTimeout(() => {
              el.classList.remove(...MATCH_WRONG_FLASH.split(' '));
              wrongLeftEl.classList.remove(...MATCH_WRONG_FLASH.split(' '), ...MATCH_SELECTED.split(' '));
            }, 400);
          }
          selectedLeft = null;
        }
      });
      col.appendChild(el);
    }

    left.forEach((entry) => makeItem(entry, colL, true));
    right.forEach((entry) => makeItem(entry, colR, false));
    grid.appendChild(colL);
    grid.appendChild(colR);
    container.appendChild(grid);

    return () =>
      new Promise((resolve) => {
        const check = setInterval(() => {
          if (matched.size === pairs.length) {
            clearInterval(check);
            resolve({ correct: wrongAttempts === 0 });
          }
        }, 150);
      });
  }

  const RENDERERS = {
    'multiple-choice': _renderMultipleChoice,
    'fill-blank': _renderFillBlank,
    match: _renderMatch
  };

  // ---------- Runner de lección ----------
  // container: elemento donde se pinta toda la lección.
  // lesson: { id, title, exercises: [...] }
  // opts.courseId: para persistir XP/racha.
  // opts.onFinish(result): callback al terminar con { correct, total, xp, streak }.
  function runLesson(container, lesson, opts) {
    const { courseId, onFinish } = opts;
    let index = 0;
    let correctCount = 0;

    function renderProgressBar() {
      const pct = Math.round((index / lesson.exercises.length) * 100);
      return `
        <div class="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden mb-5">
          <div class="h-full bg-gradient-to-r from-violet-600 to-purple-500 rounded-full transition-all duration-300" style="width:${pct}%"></div>
        </div>
      `;
    }

    function renderExercise() {
      const exercise = lesson.exercises[index];
      container.innerHTML = `
        ${renderProgressBar()}
        <div class="flex items-center gap-2 mb-2">
          <div class="text-[11px] font-bold text-violet-500 uppercase tracking-widest">Ejercicio ${index + 1} / ${lesson.exercises.length}</div>
          ${
            exercise._review
              ? '<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-50 text-amber-600 text-[10px] font-bold uppercase tracking-wide border border-amber-200">↻ Repaso</span>'
              : ''
          }
        </div>
        <div class="text-lg font-extrabold text-slate-800 leading-snug mb-1">${exercise.prompt || ''}</div>
        <div class="gl-body"></div>
        <div class="gl-feedback mt-4 hidden rounded-2xl px-4 py-3 font-bold text-sm"></div>
        <div class="gl-actions mt-6">
          <button type="button" class="gl-check-btn w-full py-3.5 rounded-2xl font-bold text-sm text-white bg-slate-300 disabled:opacity-60 transition-all"
            style="background: linear-gradient(135deg,#6d28d9 0%,#8b5cf6 100%);">
            Comprobar
          </button>
        </div>
      `;

      const body = container.querySelector('.gl-body');
      const renderer = RENDERERS[exercise.type];
      if (!renderer) {
        body.textContent = `Tipo de ejercicio no soportado: ${exercise.type}`;
        return;
      }
      const check = renderer(body, exercise);
      const checkBtn = container.querySelector('.gl-check-btn');
      const feedback = container.querySelector('.gl-feedback');
      const actions = container.querySelector('.gl-actions');

      if (exercise.type === 'match') {
        checkBtn.style.display = 'none';
        Promise.resolve(check()).then((result) => handleResult(result, feedback, actions));
      } else {
        checkBtn.addEventListener(
          'click',
          () => {
            const result = check();
            checkBtn.disabled = true;
            handleResult(result, feedback, actions);
          },
          { once: true }
        );
      }
    }

    function handleResult(result, feedback, actions) {
      if (result.correct) correctCount++;
      feedback.classList.remove('hidden');
      feedback.className = `mt-4 rounded-2xl px-4 py-3 font-bold text-sm ${
        result.correct ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-red-50 text-red-700 border border-red-200'
      }`;
      feedback.textContent = result.correct ? '¡Correcto!' : 'No es correcto, sigue practicando.';

      const nextBtn = document.createElement('button');
      nextBtn.type = 'button';
      nextBtn.className = 'w-full py-3.5 rounded-2xl font-bold text-sm text-white transition-all';
      nextBtn.style.background = 'linear-gradient(135deg,#6d28d9 0%,#8b5cf6 100%)';
      nextBtn.textContent = index + 1 < lesson.exercises.length ? 'Continuar' : 'Terminar lección';
      nextBtn.addEventListener('click', () => {
        index++;
        if (index < lesson.exercises.length) renderExercise();
        else finish();
      });
      actions.innerHTML = '';
      actions.appendChild(nextBtn);
    }

    function finish() {
      const progress = courseId
        ? recordLessonComplete(courseId, lesson.id, { correct: correctCount, total: lesson.exercises.length })
        : { xp: 0, streak: 0 };

      const pct = Math.round((correctCount / lesson.exercises.length) * 100);
      container.innerHTML = `
        <div class="text-center py-6">
          <div class="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center text-white text-2xl font-black"
               style="background: linear-gradient(135deg,#6d28d9 0%,#8b5cf6 100%);">
            ${pct}%
          </div>
          <div class="text-3xl font-black text-slate-800">${correctCount} / ${lesson.exercises.length}</div>
          <p class="text-sm font-semibold text-slate-400 mt-1">respuestas correctas</p>
          <p class="text-sm font-bold text-violet-600 mt-3">+${correctCount * XP_PER_CORRECT} XP &middot; Racha: ${progress.streak} día(s)</p>
        </div>
      `;
      if (onFinish) onFinish({ correct: correctCount, total: lesson.exercises.length, ...progress });
    }

    renderExercise();
  }

  global.GuidedLessonEngine = {
    getCourseProgress,
    recordLessonComplete,
    buildLessonSession,
    runLesson
  };
})(window);
