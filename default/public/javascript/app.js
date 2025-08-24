// Tabs "Qué hacer"
document.addEventListener('click', (e)=>{
  if (e.target.matches('#qhTabs [data-target]')){
    document.querySelectorAll('#qhTabs .nav-link').forEach(b=>b.classList.remove('active'));
    e.target.classList.add('active');
    document.querySelectorAll('.tab-pane').forEach(p=>p.classList.add('d-none'));
    document.querySelector(e.target.dataset.target).classList.remove('d-none');
  }
});

// Calendario estilo prototipo (resalta días con eventos y lista actividades)
(function(){
  const monthsES = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
  const events = JSON.parse(document.getElementById('eventsJSON')?.textContent || '[]');
  const calTitle = document.getElementById('calTitle');
  const calGrid = document.getElementById('calGrid');
  const eventList = document.getElementById('eventList');
  if(!calTitle || !calGrid || !eventList) return;
  let ref = new Date();

  function render(){
    const y = ref.getFullYear(), m = ref.getMonth();
    calTitle.textContent = `${monthsES[m]} ${y}`;
    calGrid.querySelectorAll('.day').forEach(d=>d.remove());
    const first = new Date(y,m,1);
    const startIdx = (first.getDay()+6)%7; // convertir a L=0..D=6
    const daysInMonth = new Date(y,m+1,0).getDate();
    const prevDays = new Date(y,m,0).getDate();

    for(let i=startIdx-1; i>=0; i--){
      const d = document.createElement('button');
      d.className='day muted';
      d.textContent = (prevDays - i);
      d.tabIndex = -1;
      calGrid.appendChild(d);
    }

    for(let dNum=1; dNum<=daysInMonth; dNum++){
      const cell = document.createElement('button');
      cell.className='day';
      const d = new Date(y,m,dNum);
      cell.textContent = dNum;
      if (new Date().toDateString() === d.toDateString()) cell.classList.add('today');
      const key = d.toISOString().slice(0,10);
      const list = events.filter(e=>e.date===key);
      if (list.length){
        cell.classList.add('has-event');
        const dot = document.createElement('span');
        dot.className = 'dot';
        cell.appendChild(dot);
      }
      cell.addEventListener('click',()=>showEvents(key));
      calGrid.appendChild(cell);
    }

    const filled = calGrid.querySelectorAll('.day').length;
    const rem = Math.ceil(filled/7)*7 - filled;
    for(let i=1;i<=rem;i++){
      const d = document.createElement('button');
      d.className='day muted';
      d.textContent = i;
      d.tabIndex = -1;
      calGrid.appendChild(d);
    }

    renderUpcoming();
  }

  function showEvents(iso){
    const list = events.filter(e=>e.date===iso);
    eventList.innerHTML = list.length ? list.map(ev =>
      `<div class="event"><strong>${ev.title}</strong><div class="k">${ev.category} · ${new Date(iso).toLocaleDateString('es-ES')}</div>${ev.place?`<div>${ev.place}</div>`:''}${ev.href?`<a class="btn" style="margin-top:.4rem" href="${ev.href}">Ver sección</a>`:''}</div>`
    ).join('') : '<p>No hay actividades para esta fecha.</p>';
  }

  function renderUpcoming(){
    const today = new Date().toISOString().slice(0,10);
    const list = events.filter(e=>e.date>=today).sort((a,b)=>a.date.localeCompare(b.date)).slice(0,6);
    eventList.innerHTML = list.map(ev =>
      `<div class="event"><strong>${ev.title}</strong><div class="k">${ev.category} · ${new Date(ev.date).toLocaleDateString('es-ES')}</div>${ev.place?`<div>${ev.place}</div>`:''}${ev.href?`<a class="btn" style="margin-top:.4rem" href="${ev.href}">Ver sección</a>`:''}</div>`
    ).join('');
  }

  document.getElementById('prevMonth')?.addEventListener('click',()=>{ ref.setMonth(ref.getMonth()-1); render(); });
  document.getElementById('nextMonth')?.addEventListener('click',()=>{ ref.setMonth(ref.getMonth()+1); render(); });
  render();
})();
