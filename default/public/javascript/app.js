const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

// Menú responsive
const burger = $('#btnBurger');
const menu = $('#mainMenu');
burger?.addEventListener('click', () => menu.classList.toggle('open'));

// Desplazamiento suave y cierre de menú
$$('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    const target = $(id);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      menu?.classList.remove('open');
    }
  });
});

// Carrusel de portada
const slides = $$('.slide');
let idx = 0;
if (slides.length) {
  setInterval(() => {
    slides[idx].classList.remove('active');
    idx = (idx + 1) % slides.length;
    slides[idx].classList.add('active');
  }, 5000);
}

// Tabs "Qué hacer"
document.addEventListener('click', (e) => {
  if (e.target.matches('#qhTabs [data-target]')) {
    document.querySelectorAll('#qhTabs button').forEach(b => b.classList.remove('active'));
    e.target.classList.add('active');
    document.querySelectorAll('.tab-pane').forEach(p => p.hidden = true);
    document.querySelector(e.target.dataset.target).hidden = false;
  }
});

// Calendario estilo prototipo (resalta días con eventos y lista actividades)
(function () {
  const monthsES = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  const events = JSON.parse(document.getElementById('eventsJSON')?.textContent || '[]');
  const calTitle = $('#calTitle');
  const calGrid = $('#calGrid');
  const eventList = $('#eventList');
  if (!calTitle || !calGrid || !eventList) return;
  let ref = new Date();

  function render() {
    const y = ref.getFullYear(), m = ref.getMonth();
    calTitle.textContent = `${monthsES[m]} ${y}`;
    calGrid.querySelectorAll('.day').forEach(d => d.remove());
    const first = new Date(y, m, 1);
    const startIdx = (first.getDay() + 6) % 7;
    const daysInMonth = new Date(y, m + 1, 0).getDate();
    const prevDays = new Date(y, m, 0).getDate();

    for (let i = startIdx - 1; i >= 0; i--) {
      const d = document.createElement('button');
      d.className = 'day muted';
      d.textContent = (prevDays - i);
      d.tabIndex = -1;
      calGrid.appendChild(d);
    }

    for (let dNum = 1; dNum <= daysInMonth; dNum++) {
      const cell = document.createElement('button');
      cell.className = 'day';
      const d = new Date(y, m, dNum);
      cell.textContent = dNum;
      if (new Date().toDateString() === d.toDateString()) cell.classList.add('today');
      const key = d.toISOString().slice(0, 10);
      const list = events.filter(e => e.date === key);
      if (list.length) {
        cell.classList.add('has-event');
        const dot = document.createElement('span');
        dot.className = 'dot';
        cell.appendChild(dot);
      }
      cell.addEventListener('click', () => showEvents(key));
      calGrid.appendChild(cell);
    }

    const filled = calGrid.querySelectorAll('.day').length;
    const rem = Math.ceil(filled / 7) * 7 - filled;
    for (let i = 1; i <= rem; i++) {
      const d = document.createElement('button');
      d.className = 'day muted';
      d.textContent = i;
      d.tabIndex = -1;
      calGrid.appendChild(d);
    }

    renderUpcoming();
  }

  function showEvents(iso) {
    const list = events.filter(e => e.date === iso);
    eventList.innerHTML = list.length ? list.map(ev =>
      `<div class="event"><strong>${ev.title}</strong><div class="k">${ev.category} · ${new Date(iso).toLocaleDateString('es-ES')}</div>${ev.place ? `<div>${ev.place}</div>` : ''}${ev.href ? `<a class="btn" style="margin-top:.4rem" href="${ev.href}">Ver sección</a>` : ''}</div>`
    ).join('') : '<p>No hay actividades para esta fecha.</p>';
  }

  function renderUpcoming() {
    const today = new Date().toISOString().slice(0, 10);
    const list = events.filter(e => e.date >= today).sort((a, b) => a.date.localeCompare(b.date)).slice(0, 6);
    eventList.innerHTML = list.map(ev =>
      `<div class="event"><strong>${ev.title}</strong><div class="k">${ev.category} · ${new Date(ev.date).toLocaleDateString('es-ES')}</div>${ev.place ? `<div>${ev.place}</div>` : ''}${ev.href ? `<a class="btn" style="margin-top:.4rem" href="${ev.href}">Ver sección</a>` : ''}</div>`
    ).join('');
  }

  $('#prevMonth')?.addEventListener('click', () => { ref.setMonth(ref.getMonth() - 1); render(); });
  $('#nextMonth')?.addEventListener('click', () => { ref.setMonth(ref.getMonth() + 1); render(); });
  render();
})();

// Lightbox de galería
(function () {
  const gal = $('#gal');
  const lb = $('#lightbox');
  if (!gal || !lb) return;
  gal.addEventListener('click', e => {
    const a = e.target.closest('a');
    if (!a) return;
    e.preventDefault();
    lb.querySelector('img').src = a.href;
    lb.classList.add('open');
  });
  lb.addEventListener('click', () => lb.classList.remove('open'));
})();

// Año en el pie
document.getElementById('y')?.textContent = new Date().getFullYear();
