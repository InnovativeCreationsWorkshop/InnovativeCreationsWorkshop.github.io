// ─────────────────────────────────────────────
// mainscript.js  ← NEVER MANUALLY EDIT AGAIN
// Everything derives from RECIPES in recipes.js
// ─────────────────────────────────────────────


// ── CATEGORY METADATA ────────────────────────
// Only touch this if adding a brand new category bucket (e.g. "Middle Eastern")

const CATEGORY_META = {
  cuisine: [
    { key: 'asian',         label: 'ASIAN',         icon: '🥡' },
    { key: 'south-asian',   label: 'SOUTH ASIAN',   icon: '🫙' },
    { key: 'latin',         label: 'LATIN',         icon: '🌶' },
    { key: 'european',      label: 'EUROPEAN',      icon: '🫕' },
    { key: 'american',      label: 'AMERICAN',      icon: '🦅' },
    { key: 'african',       label: 'AFRICAN',       icon: '🌍' },
    { key: 'arab',          label: 'ARAB',          icon: '🫖' },
    { key: 'mediterranean', label: 'MEDITERRANEAN', icon: '🫒' },
  ],
  ingredient: [
    { key: 'chicken',     label: 'CHICKEN',     icon: '🍗' },
    { key: 'beef',        label: 'BEEF',        icon: '🥩' },
    { key: 'seafood',     label: 'SEAFOOD',     icon: '🐟', empty: true },
    { key: 'pork',        label: 'PORK',        icon: '🥓' },
    { key: 'veg-protein', label: 'VEG PROTEIN', icon: '🫘' },
    { key: 'rice',        label: 'RICE',        icon: '🍚' },
    { key: 'pasta-bread', label: 'PASTA/BREAD', icon: '🍝' },
    { key: 'quick',       label: 'QUICK',       icon: '⚡' },
  ],
  type: [
    { key: 'soups',    label: 'SOUPS',    icon: '🍲' },
    { key: 'salads',   label: 'SALADS',   icon: '🥗' },
    { key: 'carbs',    label: 'CARBS',    icon: '🍜' },
    { key: 'no-carbs', label: 'NO CARBS', icon: '🥩' },
    { key: 'dessert',  label: 'DESSERT',  icon: '🍰' },
  ]
};


// ── AUTO-BUILD RECIPE_INDEX & CATEGORIES ─────

const RECIPE_INDEX = RECIPES.map(r => ({
  key:   r.key,
  label: r.label,
  tags:  r.tags
}));

const CATEGORIES = { cuisine: [], ingredient: [], type: [] };

['cuisine', 'ingredient', 'type'].forEach(tab => {
  CATEGORIES[tab] = CATEGORY_META[tab].map(meta => ({
    ...meta,
    recipes: meta.empty ? [] : RECIPES
      .filter(r => {
        const c = r.categories[tab];
        return Array.isArray(c) ? c.includes(meta.key) : c === meta.key;
      })
      .map(r => r.key)
  }));
});


// ── SEARCH ────────────────────────────────────

function searchRecipes(q) {
  const query = q.toLowerCase().trim();
  if (!query) return [];
  return RECIPE_INDEX.filter(r =>
    r.label.toLowerCase().includes(query) ||
    r.tags.some(t => t.includes(query))
  );
}

function handleSearch() {
  const q = document.getElementById('searchInput').value.trim();
  if (!q) return;
  const results = searchRecipes(q);
  showSearchResults(q, results);
}

function showSearchResults(query, results) {
  const bottomPanel = document.querySelector('.bottom-panel');

  const listHTML = results.length === 0
    ? `<div style="font-family:'Share Tech Mono',monospace; font-size:12px; color:#888; letter-spacing:1px; padding: 8px 0;">
        // NO RECIPES FOUND FOR "${query.toUpperCase()}"
       </div>`
    : results.map(r => `
        <a class="cat-recipe-link" href="Recipes/${r.key}.html">
          <span class="cat-recipe-arrow">→</span>
          ${r.label}
        </a>
      `).join('');

  bottomPanel.innerHTML = `
    <div class="bottom-panel-inner">
      <div class="divider" style="margin-bottom: 20px;">
        <div class="divider-line"></div>
        <div class="divider-label">RESULTS FOR "${query.toUpperCase()}"</div>
        <div class="divider-line"></div>
      </div>

      <div class="cat-recipe-list" style="margin-bottom: 24px; max-height: 280px; overflow-y: auto; overflow-x: hidden;">
        ${listHTML}
      </div>

      <div class="main-btns" style="grid-template-columns: 1fr; margin-bottom: 28px;">
        <button class="main-btn btn-categories" onclick="resetHome()" style="flex-direction:row; align-items:center; gap:12px; padding: 16px 22px;">
          <div class="btn-icon" style="margin:0; font-size:18px;">←</div>
          <div>
            <div class="btn-label">BACK</div>
            <div class="btn-desc">return to main menu</div>
          </div>
        </button>
      </div>

      <div class="status-bar">
        <span><span class="status-dot"></span>${results.length} RECIPE${results.length !== 1 ? 'S' : ''} FOUND</span>
        <span class="status-right">PALATE.EXE // v1.0</span>
      </div>
    </div>
  `;
}

function resetHome() {
  const bottomPanel = document.querySelector('.bottom-panel');

  bottomPanel.innerHTML = `
    <div class="search-row">
      <div class="search-wrap">
        <span class="search-icon">⌕</span>
        <input type="text" placeholder="search recipes..." id="searchInput" />
      </div>
      <button class="btn-search" onclick="handleSearch()">SEARCH</button>
    </div>

    <div class="divider">
      <div class="divider-line"></div>
      <div class="divider-label">OR BROWSE</div>
      <div class="divider-line"></div>
    </div>

    <div class="main-btns">
      <button class="main-btn btn-categories" onclick="handleCategories()">
        <div class="btn-icon">▦</div>
        <div class="btn-label">CATEGORIES</div>
        <div class="btn-desc">browse by type or ingredient</div>
      </button>
      <button class="main-btn btn-random" onclick="handleRandom()">
        <div class="btn-icon">⚄</div>
        <div class="btn-label">RANDOM</div>
        <div class="btn-desc">surprise me — pick a recipe</div>
      </button>
    </div>

    <div class="status-bar">
      <span><span class="status-dot"></span>COOKBOOK LOADED — ALL RECIPES READY</span>
      <span class="status-right">PALATE.EXE // v1.0</span>
    </div>
  `;

  document.getElementById('searchInput').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') handleSearch();
  });
}

document.getElementById('searchInput').addEventListener('keydown', function(e) {
  if (e.key === 'Enter') handleSearch();
});


// ── RANDOM ────────────────────────────────────

function handleRandom() {
  const btn = document.querySelector('.btn-random');

  btn.innerHTML = `
    <div class="btn-icon">⚄</div>
    <div class="btn-label">ROLLING...</div>
    <div class="btn-desc">selecting random recipe</div>
  `;

  const recipes = RECIPES.map(r => `Recipes/${r.key}.html`);
  const randomRecipe = recipes[Math.floor(Math.random() * recipes.length)];

  setTimeout(() => {
    window.location.href = randomRecipe;
  }, 650);
}


// ── CATEGORIES MODAL ──────────────────────────

const COLORS = ['olive', 'coral', 'orange', 'dark'];

function handleCategories() {
  const existing = document.getElementById('cat-modal-overlay');
  if (existing) existing.remove();

  const overlay = document.createElement('div');
  overlay.id = 'cat-modal-overlay';
  overlay.innerHTML = buildModalHTML();
  document.body.appendChild(overlay);

  document.body.style.overflow = 'hidden';

  overlay.addEventListener('click', e => {
    if (e.target === overlay) closeCategories();
  });

  overlay.querySelectorAll('.cat-tab').forEach(tab => {
    tab.addEventListener('click', () => switchCatTab(tab.dataset.tab));
  });
}

function closeCategories() {
  const el = document.getElementById('cat-modal-overlay');
  if (el) el.remove();
  document.body.style.overflow = '';
}

function switchCatTab(tab) {
  document.querySelectorAll('.cat-tab').forEach(t =>
    t.classList.toggle('active', t.dataset.tab === tab));
  document.querySelectorAll('.cat-panel').forEach(p =>
    p.classList.toggle('active', p.dataset.panel === tab));
}

function openCategoryList(key, tab) {
  const catData = CATEGORIES[tab].find(c => c.key === key);
  if (!catData || catData.empty) return;

  const listHTML = catData.recipes.map(r => {
    const recipe = RECIPE_INDEX.find(ri => ri.key === r);
    const label  = recipe ? recipe.label : r.replace(/([A-Z])/g, ' $1').trim();
    return `
      <a class="cat-recipe-link" href="Recipes/${r}.html">
        <span class="cat-recipe-arrow">→</span>
        ${label}
      </a>
    `;
  }).join('');

  document.querySelector('.cat-modal-inner').innerHTML = `
    <div class="cat-header">
      <div class="cat-header-left">
        <div class="cat-icon">${catData.icon}</div>
        <div>
          <div class="cat-title">${catData.label}</div>
          <div class="cat-sys">// ${catData.recipes.length} RECIPES FOUND</div>
        </div>
      </div>
      <button class="cat-close" onclick="handleCategories()">← BACK</button>
    </div>
    <div class="cat-body">
      <div class="cat-section-label">// SELECT A RECIPE</div>
      <div class="cat-recipe-list">${listHTML}</div>
      <div class="cat-status">
        <span><span class="cat-dot"></span>${catData.label} — ${catData.recipes.length} RESULTS</span>
        <span class="cat-status-right">PALATE.EXE // v1.0</span>
      </div>
    </div>
  `;
}

function buildModalHTML() {
  const buildGrid = (tab) => CATEGORY_META[tab].map((cat, i) => {
    const live       = CATEGORIES[tab].find(c => c.key === cat.key);
    const count      = live ? live.recipes.length : 0;
    const emptyClass = cat.empty ? ' cat-btn-empty' : '';
    const clickHandler = cat.empty ? '' : `onclick="openCategoryList('${cat.key}', '${tab}')"`;

    return `
      <button class="cat-btn ${COLORS[i % COLORS.length]}${emptyClass}"
              ${clickHandler}
              ${cat.empty ? 'disabled' : ''}>
        <div class="cat-btn-icon">${cat.icon}</div>
        <div class="cat-btn-name">${cat.label}</div>
        <div class="cat-btn-count">${cat.empty ? 'coming soon' : `${count} recipe${count !== 1 ? 's' : ''}`}</div>
      </button>
    `;
  }).join('');

  return `
    <div class="cat-modal-inner">
      <div class="cat-header">
        <div class="cat-header-left">
          <div class="cat-icon">▦</div>
          <div>
            <div class="cat-title">CATEGORIES</div>
            <div class="cat-sys">// SELECT A CATEGORY //</div>
          </div>
        </div>
        <button class="cat-close" onclick="closeCategories()">✕ CLOSE</button>
      </div>
      <div class="cat-tabs">
        <button class="cat-tab active" data-tab="cuisine">CUISINE</button>
        <button class="cat-tab" data-tab="ingredient">INGREDIENT</button>
        <button class="cat-tab" data-tab="type">TYPE</button>
      </div>
      <div class="cat-body">
        <div class="cat-panel active" data-panel="cuisine">
          <div class="cat-section-label">// BROWSE BY CUISINE</div>
          <div class="cat-grid">${buildGrid('cuisine')}</div>
        </div>
        <div class="cat-panel" data-panel="ingredient">
          <div class="cat-section-label">// BROWSE BY INGREDIENT</div>
          <div class="cat-grid">${buildGrid('ingredient')}</div>
        </div>
        <div class="cat-panel" data-panel="type">
          <div class="cat-section-label">// BROWSE BY TYPE</div>
          <div class="cat-grid">${buildGrid('type')}</div>
        </div>
        <div class="cat-status">
          <span><span class="cat-dot"></span>${RECIPE_INDEX.length} RECIPES INDEXED</span>
          <span class="cat-status-right">PALATE.EXE // v1.0</span>
        </div>
      </div>
    </div>
  `;
}