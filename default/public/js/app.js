// Tabs "Qué hacer"
document.addEventListener('click', (e)=>{
  if (e.target.matches('#qhTabs [data-target]')){
    document.querySelectorAll('#qhTabs .nav-link').forEach(b=>b.classList.remove('active'));
    e.target.classList.add('active');
    document.querySelectorAll('.tab-pane').forEach(p=>p.classList.add('d-none'));
    document.querySelector(e.target.dataset.target).classList.remove('d-none');
  }
});

// Calendario básico (marca días con eventos publicados)
(function(){
  const monthsES = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
  const events = JSON.parse(document.getElementById('eventsJSON')?.textContent || '[]');
  const calTitle = document.getElementById('calTitle');
  const calGrid = document.getElementById('calGrid');
  if(!calTitle||!calGrid) return;
  let ref = new Date();
  const render = ()=>{
    const y = ref.getFullYear(), m = ref.getMonth();
    calTitle.textContent = `${monthsES[m]} ${y}`;
    calGrid.innerHTML = '';
    const first = new Date(y,m,1);
    const startIdx = (first.getDay()+6)%7; // L=0..D=6
    const daysInMonth = new Date(y,m+1,0).getDate();
    const prevDays = new Date(y,m,0).getDate();
    for(let i=startIdx-1;i>=0;i--){ calGrid.append(cell(prevDays-i,true)); }
    for(let d=1; d<=daysInMonth; d++){
      const dateISO = new Date(y,m,d).toISOString().slice(0,10);
      const has = events.some(ev=>ev.date===dateISO);
      calGrid.append(cell(d,false,has,dateISO));
    }
    const filled = calGrid.children.length;
    const rem = Math.ceil(filled/7)*7 - filled;
    for(let i=1;i<=rem;i++){ calGrid.append(cell(i,true)); }
  };
  const cell = (txt,muted=false,has=false,iso='')=>{
    const col = document.createElement('div'); col.className='col';
    const b = document.createElement('button');
    b.className = 'btn btn-sm w-100 '+(muted?'btn-outline-light text-muted':'btn-outline-secondary');
    b.textContent = txt; b.dataset.iso = iso;
    if (has) { b.classList.add('border-warning'); b.title='Hay actividades'; }
    b.onclick = ()=>{ showList(iso); };
    col.append(b); return col;
  };
  const showList = (iso)=>{
    const list = events.filter(e=>e.date===iso);
    const wrap = document.getElementById('eventList');
    if(!wrap) return;
    wrap.innerHTML = list.length ? list.map(ev=>
      `<div class="border rounded p-2 mb-2">
        <strong>${ev.title}</strong>
        <div class="small text-muted">${ev.category} · ${iso.split('-').reverse().join('/')}</div>
        ${ev.place?`<div class="small">${ev.place}</div>`:''}
        ${ev.href?`<a class="btn btn-sm btn-outline-teal mt-2" href="${ev.href}">Ver sección</a>`:''}
      </div>`
    ).join('') : '<p class="text-muted">No hay actividades para esta fecha.</p>';
  };
  document.getElementById('prevMonth')?.addEventListener('click',()=>{ ref.setMonth(ref.getMonth()-1); render(); });
  document.getElementById('nextMonth')?.addEventListener('click',()=>{ ref.setMonth(ref.getMonth()+1); render(); });
  render();
})();
