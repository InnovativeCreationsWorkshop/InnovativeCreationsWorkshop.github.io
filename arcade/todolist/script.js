const DEFAULT_DATA = {
  master: [],
  today: [],
  goals: [],
  projects: []
};

let data = loadData();
let state = {
  category:'master',
  listId:null,
  view:'today'
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
    saveData();
    dropdownMenu.classList.remove('show');
    document.querySelectorAll('.tab').forEach(b=>b.classList.remove('active'));
    document.querySelector('.tab[data-cat="master"]').classList.add('active');
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
  const task = { id:uid(), text:text.trim(), done:false };
  data.today.push(task);
  data.master.push({ id:uid(), text:task.text, done:false });
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
    ul.appendChild(makeTaskRow(task, 'today', null));
  });
}

// ---------- Task row builder ----------
function makeTaskRow(task, context, listRef){
  const li = document.createElement('li');
  if(task.done) li.classList.add('done');

  const cb = document.createElement('input');
  cb.type='checkbox';
  cb.checked = task.done;
  cb.addEventListener('change', ()=>{
    task.done = cb.checked;
    saveData();
    li.classList.toggle('done', task.done);
  });
  li.appendChild(cb);

  const span = document.createElement('span');
  span.className='txt';
  span.textContent = task.text;
  li.appendChild(span);

  if(context==='sublist'){
    const toMasterBtn = document.createElement('button');
    toMasterBtn.className='mini-btn';
    toMasterBtn.textContent='→ Master';
    toMasterBtn.addEventListener('click', ()=>{
      data.master.push({id:uid(), text:task.text, done:false});
      saveData();
      if(state.category==='master') renderCategoryContent();
    });
    li.appendChild(toMasterBtn);

    const toTodayBtn = document.createElement('button');
    toTodayBtn.className='mini-btn';
    toTodayBtn.textContent='→ Today';
    toTodayBtn.addEventListener('click', ()=>{
      data.today.push({id:uid(), text:task.text, done:false});
      data.master.push({id:uid(), text:task.text, done:false});
      saveData();
      renderToday();
      if(state.category==='master') renderCategoryContent();
    });
    li.appendChild(toTodayBtn);
  }

  if(context==='master'){
    const toTodayBtn = document.createElement('button');
    toTodayBtn.className='mini-btn';
    toTodayBtn.textContent='→ Today';
    toTodayBtn.addEventListener('click', ()=>{
      data.today.push({id:uid(), text:task.text, done:false});
      saveData();
      renderToday();
    });
    li.appendChild(toTodayBtn);
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
  li.appendChild(delBtn);

  return li;
}

// ---------- Category / left panel rendering ----------
function renderCategoryContent(){
  const container = document.getElementById('categoryContent');
  container.innerHTML='';

  if(state.category==='master'){
    const addRow = document.createElement('div');
    addRow.className='add-row';
    addRow.innerHTML = `<input id="masterInput" placeholder="Add task to Master..."><button id="masterAddBtn">+</button>`;
    container.appendChild(addRow);

    const ul = document.createElement('ul');
    ul.className='task-list';
    if(data.master.length===0){
      ul.innerHTML = '<div class="empty-msg">Master list is empty 🐚</div>';
    } else {
      data.master.forEach(t=> ul.appendChild(makeTaskRow(t,'master',null)));
    }
    container.appendChild(ul);

    const input = document.getElementById('masterInput');
    const addBtn = document.getElementById('masterAddBtn');
    const addFn = ()=>{
      if(!input.value.trim()) return;
      data.master.push({id:uid(), text:input.value.trim(), done:false});
      saveData();
      input.value='';
      renderCategoryContent();
    };
    addBtn.addEventListener('click', addFn);
    input.addEventListener('keydown', e=>{ if(e.key==='Enter') addFn(); });
    return;
  }

  // goals / projects
  const cat = state.category;
  const catLabel = cat==='goals' ? '🎯 Goal' : '📋 Project';

  if(state.listId===null){
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
    return;
  }

  // inside a specific list
  const list = data[cat].find(l=>l.id===state.listId);
  if(!list){ state.listId=null; renderCategoryContent(); return; }

  const backBtn = document.createElement('button');
  backBtn.className='back-btn';
  backBtn.textContent = `← Back to ${catLabel} lists`;
  backBtn.addEventListener('click', ()=>{ state.listId=null; renderCategoryContent(); });
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
    list.tasks.forEach(t=> ul.appendChild(makeTaskRow(t,'sublist',{cat, listId:list.id})));
  }
  container.appendChild(ul);

  const input = document.getElementById('subInput');
  const btn = document.getElementById('subAddBtn');
  const addFn = ()=>{
    if(!input.value.trim()) return;
    list.tasks.push({id:uid(), text:input.value.trim(), done:false});
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
