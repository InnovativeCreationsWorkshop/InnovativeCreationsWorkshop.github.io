const DEFAULT_DATA = {
  master: [],
  today: [],
  goals: [],
  projects: []
};

function loadData(){
  const raw = localStorage.getItem('beachTodoData');
  return raw ? JSON.parse(raw) : JSON.parse(JSON.stringify(DEFAULT_DATA));
}
function saveData(){
  localStorage.setItem('beachTodoData', JSON.stringify(data));
}
function uid(){
  return 't-' + Math.random().toString(36).slice(2,10);
}

let data = loadData();

// Make sure every task (master, today, and inside goal/project lists) has a history array
function ensureDefaults(){
  data.master.forEach(t=>{ if(!Array.isArray(t.history)) t.history=[]; });
  data.today.forEach(t=>{ if(!Array.isArray(t.history)) t.history=[]; });
  ['goals','projects'].forEach(cat=>{
    data[cat].forEach(list=>{
      if(!Array.isArray(list.tasks)) list.tasks=[];
      list.tasks.forEach(t=>{ if(!Array.isArray(t.history)) t.history=[]; });
      delete list.history; // no longer used at list level
    });
  });
}
ensureDefaults();

let state = {
  category:'master',
  listId:null,
  view:'today',
  expandedHistory:new Set() // task ids currently showing their history chain
};

// ---------- Generic drag-to-reorder ----------
function enableDragReorder(container, itemSelector, arrayRef){
  container.querySelectorAll(itemSelector + ' .drag-handle').forEach(handle=>{
    handle.addEventListener('pointerdown', (e)=>{
      e.preventDefault();
      const dragEl = handle.closest(itemSelector);
      if(!dragEl) return;
      dragEl.classList.add('dragging');
      dragEl.setPointerCapture(e.pointerId);

      function getItems(){
        return Array.from(container.querySelectorAll(itemSelector)).filter(el=>el!==dragEl);
      }

      function onMove(ev){
        const y = ev.clientY;
        let closest = null;
        let closestOffset = Number.NEGATIVE_INFINITY;
        getItems().forEach(item=>{
          const box = item.getBoundingClientRect();
          const offset = y - box.top - box.height/2;
          if(offset < 0 && offset > closestOffset){
            closestOffset = offset;
            closest = item;
          }
        });
        if(closest) container.insertBefore(dragEl, closest);
        else container.appendChild(dragEl);
      }

      function onUp(){
        dragEl.classList.remove('dragging');
        const newOrderIds = Array.from(container.querySelectorAll(itemSelector)).map(el=>el.dataset.id);
        arrayRef.sort((a,b)=> newOrderIds.indexOf(a.id) - newOrderIds.indexOf(b.id));
        saveData();
        document.removeEventListener('pointermove', onMove);
        document.removeEventListener('pointerup', onUp);
      }

      document.addEventListener('pointermove', onMove);
      document.addEventListener('pointerup', onUp);
    });
  });
}

// ---------- Hamburger / Reset ----------
const hamburgerBtn = document.getElementById('hamburgerBtn');
const dropdownMenu = document.getElementById('dropdownMenu');
const resetAllBtn = document.getElementById('resetAllBtn');

hamburgerBtn.addEventListener('click', (e)=>{
  e.stopPropagation();
  dropdownMenu.classList.toggle('show');
});

document.addEventListener('click', (e)=>{
  if(!hamburgerBtn.contains(e.target) && !dropdownMenu.contains(e.target)){
    dropdownMenu.classList.remove('show');
  }
});

resetAllBtn.addEventListener('click', (e)=>{
  e.stopPropagation();
  const ok = window.confirm('Reset everything? This clears all lists and tasks.');
  if(ok){
    data = JSON.parse(JSON.stringify(DEFAULT_DATA));
    state.category = 'master';
    state.listId = null;
    state.expandedHistory = new Set();
    state.view = 'today';
    saveData();
    dropdownMenu.classList.remove('show');
    document.querySelectorAll('.tab').forEach(b=>b.classList.remove('active'));
    document.querySelector('.tab[data-cat="master"]').classList.add('active');
    document.querySelectorAll('.view-btn').forEach(b=>b.classList.remove('active'));
    document.querySelector('.view-btn[data-view="today"]').classList.add('active');
    renderAll();
  }
});

// ---------- View toggle ----------
const viewButtons = document.querySelectorAll('.view-btn');
const leftPanel = document.querySelector('.panels .panel:nth-child(1)');
const rightPanel = document.querySelector('.panels .panel:nth-child(2)');

function applyView(){
  leftPanel.classList.remove('hidden','full');
  rightPanel.classList.remove('hidden','full');
  if(state.view === 'lists'){
    rightPanel.classList.add('hidden');
    leftPanel.classList.add('full');
  } else if(state.view === 'today'){
    leftPanel.classList.add('hidden');
    rightPanel.classList.add('full');
  }
}
viewButtons.forEach(btn=>{
  btn.addEventListener('click', ()=>{
    viewButtons.forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    state.view = btn.dataset.view;
    applyView();
  });
});

// ---------- Tabs ----------
document.querySelectorAll('.tab').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    document.querySelectorAll('.tab').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    state.category = btn.dataset.cat;
    state.listId = null;
    renderCategoryContent();
  });
});

// ---------- Today's Tasks ----------
const todayInput = document.getElementById('todayInput');
const todayAddBtn = document.getElementById('todayAddBtn');

function addToday(text){
  if(!text.trim()) return;
  const task = { id:uid(), text:text.trim(), done:false, history:[] };
  data.today.push(task);
  data.master.push({ id:uid(), text:task.text, done:false, history:[] });
  saveData();
  renderToday();
  if(state.category==='master') renderCategoryContent();
}
todayAddBtn.addEventListener('click', ()=>{ addToday(todayInput.value); todayInput.value=''; });
todayInput.addEventListener('keydown', (e)=>{
  if(e.key==='Enter'){ addToday(todayInput.value); todayInput.value=''; }
});

function renderToday(){
  const ul = document.getElementById('todayList');
  ul.innerHTML='';
  if(data.today.length===0){
    ul.innerHTML = '<div class="empty-msg">No tasks yet — add one above 🐚</div>';
    return;
  }
  data.today.forEach(task=>{
    ul.appendChild(makeTaskRow(task, 'today', null, renderToday));
  });
  enableDragReorder(ul, 'li', data.today);
}

// ---------- Task row builder ----------
// rerender: function to call after a mutation so the row/list refreshes correctly
function makeTaskRow(task, context, listRef, rerender){
  if(!Array.isArray(task.history)) task.history = [];

  const li = document.createElement('li');
  li.className='task-item';
  li.dataset.id = task.id;
  if(task.done) li.classList.add('done');

  const row = document.createElement('div');
  row.className='task-row';

  const handle = document.createElement('span');
  handle.className='drag-handle';
  handle.textContent='⠿';
  row.appendChild(handle);

  const cb = document.createElement('input');
  cb.type='checkbox';
  cb.checked = task.done;
  cb.addEventListener('change', ()=>{
    task.done = cb.checked;
    saveData();
    li.classList.toggle('done', task.done);
  });
  row.appendChild(cb);

  const span = document.createElement('span');
  span.className='txt';
  span.textContent = task.text;
  row.appendChild(span);

  if(task.history.length>0){
    const histBtn = document.createElement('button');
    histBtn.className='mini-btn history-btn';
    histBtn.textContent = `📈 ${task.history.length}`;
    histBtn.title='View progression';
    histBtn.addEventListener('click', ()=>{
      if(state.expandedHistory.has(task.id)) state.expandedHistory.delete(task.id);
      else state.expandedHistory.add(task.id);
      rerender();
    });
    row.appendChild(histBtn);
  }

  const upgradeBtn = document.createElement('button');
  upgradeBtn.className='mini-btn upgrade-task-btn';
  upgradeBtn.textContent='⬆️';
  upgradeBtn.title='Upgrade this task';
  upgradeBtn.addEventListener('click', ()=>{
    const newText = window.prompt(`Current: "${task.text}"\n\nEnter the upgraded task (this replaces the current one):`, '');
    if(newText && newText.trim()){
      task.history.push({ text:task.text, date:new Date().toISOString() });
      task.text = newText.trim();
      task.done = false;
      state.expandedHistory.add(task.id);
      saveData();
      rerender();
    }
  });
  row.appendChild(upgradeBtn);

  if(context==='sublist'){
    const toMasterBtn = document.createElement('button');
    toMasterBtn.className='mini-btn';
    toMasterBtn.textContent='→ Master';
    toMasterBtn.addEventListener('click', ()=>{
      data.master.push({id:uid(), text:task.text, done:false, history:[]});
      saveData();
      if(state.category==='master') renderCategoryContent();
    });
    row.appendChild(toMasterBtn);

    const toTodayBtn = document.createElement('button');
    toTodayBtn.className='mini-btn';
    toTodayBtn.textContent='→ Today';
    toTodayBtn.addEventListener('click', ()=>{
      data.today.push({id:uid(), text:task.text, done:false, history:[]});
      data.master.push({id:uid(), text:task.text, done:false, history:[]});
      saveData();
      renderToday();
      if(state.category==='master') renderCategoryContent();
    });
    row.appendChild(toTodayBtn);
  }

  if(context==='master'){
    const toTodayBtn = document.createElement('button');
    toTodayBtn.className='mini-btn';
    toTodayBtn.textContent='→ Today';
    toTodayBtn.addEventListener('click', ()=>{
      data.today.push({id:uid(), text:task.text, done:false, history:[]});
      saveData();
      renderToday();
    });
    row.appendChild(toTodayBtn);
  }

  const delBtn = document.createElement('button');
  delBtn.className='del-btn';
  delBtn.textContent='✕';
  delBtn.addEventListener('click', ()=>{
    if(context==='today'){
      data.today = data.today.filter(t=>t.id!==task.id);
      renderToday();
    } else if(context==='master'){
      data.master = data.master.filter(t=>t.id!==task.id);
      renderCategoryContent();
    } else if(context==='sublist'){
      const list = data[listRef.cat].find(l=>l.id===listRef.listId);
      list.tasks = list.tasks.filter(t=>t.id!==task.id);
      renderCategoryContent();
    }
    saveData();
  });
  row.appendChild(delBtn);

  li.appendChild(row);

  if(state.expandedHistory.has(task.id) && task.history.length>0){
    const panel = document.createElement('div');
    panel.className='task-history-panel';
    const chain = task.history.map(h=>h.text).concat([task.text]);
    chain.forEach((stepText, i)=>{
      const stepSpan = document.createElement('span');
      stepSpan.className = 'hist-step' + (i===chain.length-1 ? ' hist-current' : '');
      stepSpan.textContent = stepText;
      panel.appendChild(stepSpan);
      if(i < chain.length-1){
        const arrow = document.createElement('span');
        arrow.className='hist-arrow';
        arrow.textContent='→';
        panel.appendChild(arrow);
      }
    });
    li.appendChild(panel);
  }

  return li;
}

// ---------- Category / left panel rendering ----------
function renderCategoryContent(){
  const container = document.getElementById('categoryContent');
  container.innerHTML='';

  if(state.category==='master'){
    renderMaster(container);
    return;
  }

  const cat = state.category;
  const catLabel = cat==='goals' ? '🎯 Goal' : '📋 Project';

  if(state.listId===null){
    renderListPicker(container, cat, catLabel);
  } else {
    renderListDetail(container, cat, catLabel);
  }
}

function renderMaster(container){
  const addRow = document.createElement('div');
  addRow.className='add-row';
  addRow.innerHTML = `<input id="masterInput" placeholder="Add task to Master..."><button id="masterAddBtn">+</button>`;
  container.appendChild(addRow);

  const ul = document.createElement('ul');
  ul.className='task-list';
  if(data.master.length===0){
    ul.innerHTML = '<div class="empty-msg">Master list is empty 🐚</div>';
  } else {
    data.master.forEach(t=> ul.appendChild(makeTaskRow(t,'master',null, ()=>renderCategoryContent())));
  }
  container.appendChild(ul);
  enableDragReorder(ul, 'li', data.master);

  const input = document.getElementById('masterInput');
  const addBtn = document.getElementById('masterAddBtn');
  const addFn = ()=>{
    if(!input.value.trim()) return;
    data.master.push({id:uid(), text:input.value.trim(), done:false, history:[]});
    saveData();
    input.value='';
    renderCategoryContent();
  };
  addBtn.addEventListener('click', addFn);
  input.addEventListener('keydown', e=>{ if(e.key==='Enter') addFn(); });
}

function renderListPicker(container, cat, catLabel){
  const addRow = document.createElement('div');
  addRow.className='add-row';
  addRow.innerHTML = `<input id="newListInput" placeholder="New ${catLabel} list name..."><button id="newListBtn">+</button>`;
  container.appendChild(addRow);

  const grid = document.createElement('div');
  grid.className='list-grid';

  if(data[cat].length===0){
    grid.innerHTML = `<div class="empty-msg">No ${catLabel} lists yet — create one above 🌴</div>`;
  } else {
    data[cat].forEach(list=>{
      const card = document.createElement('div');
      card.className='list-card';
      card.dataset.id = list.id;

      const handle = document.createElement('span');
      handle.className='drag-handle';
      handle.textContent='⠿';
      card.appendChild(handle);

      const main = document.createElement('div');
      main.className='list-main';
      const doneCount = list.tasks.filter(t=>t.done).length;
      main.innerHTML = `<span>${list.name}</span><span class="count">${doneCount}/${list.tasks.length}</span>`;
      main.addEventListener('click', ()=>{
        state.listId = list.id;
        renderCategoryContent();
      });
      card.appendChild(main);

      const delListBtn = document.createElement('button');
      delListBtn.className='list-del';
      delListBtn.textContent='✕';
      delListBtn.title='Delete this list';
      delListBtn.addEventListener('click', (e)=>{
        e.stopPropagation();
        const ok = window.confirm(`Delete "${list.name}" and all its tasks? This can't be undone.`);
        if(ok){
          data[cat] = data[cat].filter(l=>l.id!==list.id);
          saveData();
          renderCategoryContent();
        }
      });
      card.appendChild(delListBtn);

      grid.appendChild(card);
    });
  }
  container.appendChild(grid);
  enableDragReorder(grid, '.list-card', data[cat]);

  const input = document.getElementById('newListInput');
  const btn = document.getElementById('newListBtn');
  const createFn = ()=>{
    if(!input.value.trim()) return;
    data[cat].push({ id:uid(), name:input.value.trim(), tasks:[] });
    saveData();
    input.value='';
    renderCategoryContent();
  };
  btn.addEventListener('click', createFn);
  input.addEventListener('keydown', e=>{ if(e.key==='Enter') createFn(); });
}

function renderListDetail(container, cat, catLabel){
  const list = data[cat].find(l=>l.id===state.listId);
  if(!list){ state.listId=null; renderCategoryContent(); return; }

  const backBtn = document.createElement('button');
  backBtn.className='back-btn';
  backBtn.textContent = `← Back to ${catLabel} lists`;
  backBtn.addEventListener('click', ()=>{
    state.listId=null;
    renderCategoryContent();
  });
  container.appendChild(backBtn);

  const h3 = document.createElement('h2');
  h3.textContent = `🌊 ${list.name}`;
  container.appendChild(h3);

  const addRow = document.createElement('div');
  addRow.className='add-row';
  addRow.innerHTML = `<input id="subInput" placeholder="Add task..."><button id="subAddBtn">+</button>`;
  container.appendChild(addRow);

  const ul = document.createElement('ul');
  ul.className='task-list';
  if(list.tasks.length===0){
    ul.innerHTML = '<div class="empty-msg">No tasks in this list yet 🐠</div>';
  } else {
    list.tasks.forEach(t=> ul.appendChild(makeTaskRow(t,'sublist',{cat, listId:list.id}, ()=>renderCategoryContent())));
  }
  container.appendChild(ul);
  enableDragReorder(ul, 'li', list.tasks);

  const input = document.getElementById('subInput');
  const btn = document.getElementById('subAddBtn');
  const addFn = ()=>{
    if(!input.value.trim()) return;
    list.tasks.push({id:uid(), text:input.value.trim(), done:false, history:[]});
    saveData();
    input.value='';
    renderCategoryContent();
  };
  btn.addEventListener('click', addFn);
  input.addEventListener('keydown', e=>{ if(e.key==='Enter') addFn(); });
}

// ---------- bubbles ----------
function createBubbles(){
  for(let i=0;i<10;i++){
    const b = document.createElement('div');
    b.className='bubble';
    const size = 20 + Math.random()*60;
    b.style.width = size+'px';
    b.style.height = size+'px';
    b.style.left = Math.random()*100+'vw';
    b.style.top = Math.random()*100+'vh';
    b.style.animationDuration = (8+Math.random()*8)+'s';
    b.style.animationDelay = (Math.random()*5)+'s';
    document.body.appendChild(b);
  }
}

function renderAll(){
  renderCategoryContent();
  renderToday();
  applyView();
}
createBubbles();
renderAll();
