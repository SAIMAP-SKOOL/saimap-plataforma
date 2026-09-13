/*
 * SAIMAP Plataforma — "camino de niveles" de la Interfaz de Estudio Guiado.
 * Adaptado de saimap-lenguas-sagradas/shared/skill-path.js: misma lógica de
 * estados (done/active/locked), pero renderizado como lista vertical con
 * Tailwind + iconos Phosphor, agrupada en "unidades" (una por tema) con su
 * propia cabecera — en vez del camino de nodos circulares en zigzag del
 * original, más difícil de mantener legible dentro de la SPA.
 */
(function (global) {
  'use strict';

  // A partir de una lista de lecciones (en orden) y las ids ya completadas,
  // calcula el estado de cada nodo: 'done', 'active' (la siguiente jugable)
  // o 'locked'. Solo hay una lección "active" a la vez.
  function computeStates(lessons, completedLessons = []) {
    let activeAssigned = false;
    return lessons.map((lesson, i) => {
      const done = completedLessons.includes(lesson.id);
      const prevDone = i === 0 || completedLessons.includes(lessons[i - 1].id);
      let state;
      if (done) state = 'done';
      else if (prevDone && !activeAssigned) {
        state = 'active';
        activeAssigned = true;
      } else state = 'locked';
      return Object.assign({}, lesson, { state });
    });
  }

  const NODE_BASE =
    'w-12 h-12 flex-shrink-0 rounded-full flex items-center justify-center text-lg font-black transition-all border-2';
  const NODE_STATE_CLASSES = {
    done: 'bg-emerald-500 border-emerald-500 text-white shadow-md shadow-emerald-200',
    active: 'text-white border-violet-600 shadow-lg shadow-violet-200 gl-active-pulse',
    locked: 'bg-slate-100 border-slate-200 text-slate-400'
  };
  const NODE_ICON = {
    done: '<i class="ph-bold ph-check"></i>',
    active: '<i class="ph-bold ph-play"></i>',
    locked: '<i class="ph-bold ph-lock-simple"></i>'
  };

  // container: elemento donde se pinta el camino.
  // nodes: [{ id, title, unitLabel, state: 'done'|'active'|'locked' }, ...]
  //   (usar computeStates() para generar el estado).
  // opts.onSelect(node): callback al pulsar un nodo no bloqueado.
  function render(container, nodes, opts = {}) {
    const { onSelect } = opts;
    container.innerHTML = '';

    const wrap = document.createElement('div');
    wrap.className = 'max-w-xl mx-auto';

    let currentUnit = null;
    let listEl = null;

    nodes.forEach((node, i) => {
      if (node.unitLabel && node.unitLabel !== currentUnit) {
        currentUnit = node.unitLabel;
        const banner = document.createElement('div');
        banner.className =
          (i > 0 ? 'mt-8 ' : '') +
          'rounded-2xl px-5 py-3 mb-4 font-black text-sm text-white flex items-center gap-2 shadow-sm';
        banner.style.background = 'linear-gradient(135deg,#6d28d9 0%,#8b5cf6 100%)';
        banner.innerHTML = `<i class="ph-bold ph-lightbulb"></i> ${currentUnit}`;
        wrap.appendChild(banner);

        listEl = document.createElement('div');
        listEl.className = 'flex flex-col';
        wrap.appendChild(listEl);
      }

      const row = document.createElement('div');
      row.className = 'flex items-stretch gap-4';

      // Columna del nodo + conector
      const nodeCol = document.createElement('div');
      nodeCol.className = 'flex flex-col items-center';

      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `${NODE_BASE} ${NODE_STATE_CLASSES[node.state]}`;
      if (node.state === 'active') {
        btn.style.background = 'linear-gradient(135deg,#6d28d9 0%,#8b5cf6 100%)';
      }
      btn.innerHTML = NODE_ICON[node.state];
      btn.disabled = node.state === 'locked';
      if (node.state !== 'locked' && onSelect) {
        btn.addEventListener('click', () => onSelect(node));
      }
      nodeCol.appendChild(btn);

      const isLastOfUnit = i === nodes.length - 1 || nodes[i + 1].unitLabel !== currentUnit;
      if (!isLastOfUnit) {
        const connector = document.createElement('div');
        connector.className = `w-0.5 flex-1 my-1 ${node.state === 'done' ? 'bg-emerald-400' : 'bg-slate-200'}`;
        nodeCol.appendChild(connector);
      }

      row.appendChild(nodeCol);

      // Columna del texto
      const textCol = document.createElement('div');
      textCol.className = 'pb-6 pt-1.5 flex-1';
      const titleEl = document.createElement('div');
      titleEl.className = `font-bold text-sm ${node.state === 'locked' ? 'text-slate-400' : 'text-slate-800'}`;
      titleEl.textContent = node.title;
      textCol.appendChild(titleEl);

      if (node.state === 'active') {
        const cta = document.createElement('div');
        cta.className = 'text-xs font-bold text-violet-600 mt-0.5';
        cta.textContent = 'Siguiente lección →';
        textCol.appendChild(cta);
      } else if (node.state === 'done') {
        const cta = document.createElement('div');
        cta.className = 'text-xs font-bold text-emerald-600 mt-0.5';
        cta.textContent = 'Completada';
        textCol.appendChild(cta);
      }

      row.appendChild(textCol);
      (listEl || wrap).appendChild(row);
    });

    container.appendChild(wrap);
  }

  global.GuidedSkillPath = { render, computeStates };
})(window);
