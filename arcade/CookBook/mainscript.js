// ── CATEGORIES DATA ──────────────────────────────────────

const CATEGORIES = {
  cuisine: [
    { key: 'asian',    label: 'ASIAN',    icon: '🥡', recipes: ['NabeSoup', 'JapaneseCurry', 'Okonomiyaki', 'Soondubujigae', 'KoreanSalad', 'KoreanSpinachSalad', 'YamitsukiShioKyabetsu', 'FriedRice', 'AsianMarinade', 'UmamiSeaweedRiceRolls', 'RiceCookerBowl', 'EggCurry', 'BeefVindaloo', 'SriLankanDahl', 'TofuPot', 'ChineseSteamedEgg'] },
    { key: 'european', label: 'EUROPEAN', icon: '🫕', recipes: ['ItalianWeddingSoup', 'TuscanSoup', 'NordicLeekSoup', 'Kompot', 'HomemadePasta', 'SpaghettiWithMeatSauce', 'CapreseSalad'] },
    { key: 'latin',    label: 'LATIN',    icon: '🌶', recipes: ['PolloChileColorado', 'SopadeLentejas', 'RedbeansRice', 'Burrito', 'StreetTacos'] },
    { key: 'american', label: 'AMERICAN', icon: '🦅', recipes: ['BigMacSalad', 'CajunSausagePotatoSoup'] },
  ],
  ingredient: [
    { key: 'chicken',  label: 'CHICKEN',  icon: '🍗', recipes: ['GoldenChickenSoup', 'LazyChickenBiryani', 'PolloChileColorado', 'JapaneseCurry', 'Burrito', 'StreetTacos'] },
    { key: 'rice',     label: 'RICE',     icon: '🍚', recipes: ['FriedRice', 'RiceCookerBowl', 'LazyChickenBiryani', 'RedbeansRice', 'UmamiSeaweedRiceRolls'] },
    { key: 'tofu',     label: 'TOFU',     icon: '⬜', recipes: ['TofuPot', 'Soondubujigae'] },
    { key: 'beef',     label: 'BEEF',     icon: '🥩', recipes: ['BeefStew', 'BeefVindaloo', 'BigMacSalad', 'SpaghettiWithMeatSauce'] },
    { key: 'eggs',     label: 'EGGS',     icon: '🥚', recipes: ['EggCurry', 'Okonomiyaki', 'ChineseSteamedEgg'] },
    { key: 'lentils',  label: 'LENTILS',  icon: '🫘', recipes: ['SopadeLentejas', 'SriLankanDahl'] },
    { key: 'mushroom', label: 'MUSHROOM', icon: '🍄', recipes: ['CreamyMushroomSoup', 'NabeSoup'] },
    { key: 'sausage',  label: 'SAUSAGE',  icon: '🌭', recipes: ['CajunSausagePotatoSoup', 'Okonomiyaki'] },
  ],
  type: [
    { key: 'soups',    label: 'SOUPS',    icon: '🍲', recipes: ['NabeSoup', 'GoldenChickenSoup', 'CreamyMushroomSoup', 'ItalianWeddingSoup', 'TuscanSoup', 'NordicLeekSoup', 'CajunSausagePotatoSoup', 'SopadeLentejas', 'Soondubujigae', 'BeefStew', 'TofuPot'] },
    { key: 'salads',   label: 'SALADS',   icon: '🥗', recipes: ['BigMacSalad', 'CreamyCucumberSalad', 'GreekChickpeaSalad', 'KoreanSalad', 'KoreanSpinachSalad', 'YamitsukiShioKyabetsu', 'CapreseSalad'] },
    { key: 'carbs',    label: 'CARBS',    icon: '🍜', recipes: ['FriedRice', 'RiceCookerBowl', 'LazyChickenBiryani', 'RedbeansRice', 'UmamiSeaweedRiceRolls', 'Okonomiyaki', 'JapaneseCurry', 'PolloChileColorado', 'HomemadePasta', 'SpaghettiWithMeatSauce', 'Burrito', 'StreetTacos'] },
    { key: 'no-carbs', label: 'NO CARBS', icon: '🥩', recipes: ['BeefVindaloo', 'EggCurry', 'SriLankanDahl', 'AsianMarinade', 'GoldenChickenSoup', 'CreamyMushroomSoup', 'NordicLeekSoup', 'GreekChickpeaSalad', 'CreamyCucumberSalad', 'Kompot', 'ChineseSteamedEgg', 'CapreseSalad'] },
  ]
};

const COLORS = ['olive', 'coral', 'orange', 'dark'];

// ── RECIPE INDEX (for search) ─────────────────────────────

const RECIPE_INDEX = [
  { key: 'AsianMarinade',          label: 'Asian Marinade',            tags: ['asian', 'marinade', 'easy', 'no-carbs'] },
  { key: 'BeefStew',               label: 'Beef Stew',                 tags: ['beef', 'soup', 'stew', 'hearty'] },
  { key: 'BeefVindaloo',           label: 'Beef Vindaloo',             tags: ['beef', 'asian', 'indian', 'no-carbs', 'spicy'] },
  { key: 'BigMacSalad',            label: 'Big Mac Salad',             tags: ['beef', 'salad', 'american', 'no-carbs', 'easy'] },
  { key: 'Burrito',                label: 'Burrito',                   tags: ['chicken', 'latin', 'carbs', 'easy', 'wrap'] },
  { key: 'CajunSausagePotatoSoup', label: 'Cajun Sausage Potato Soup', tags: ['sausage', 'soup', 'american', 'cajun', 'potato', 'spicy'] },
  { key: 'CapreseSalad',           label: 'Caprese Salad',             tags: ['salad', 'european', 'italian', 'no-carbs', 'vegetarian', 'easy', 'quick'] },
  { key: 'ChineseSteamedEgg',      label: 'Chinese Steamed Egg',       tags: ['eggs', 'asian', 'chinese', 'no-carbs', 'easy', 'quick'] },
  { key: 'CreamyCucumberSalad',    label: 'Creamy Cucumber Salad',     tags: ['salad', 'cucumber', 'no-carbs', 'vegetarian', 'easy', 'quick'] },
  { key: 'CreamyMushroomSoup',     label: 'Creamy Mushroom Soup',      tags: ['mushroom', 'soup', 'no-carbs', 'vegetarian', 'creamy'] },
  { key: 'EggCurry',               label: 'Egg Curry',                 tags: ['eggs', 'asian', 'indian', 'curry', 'no-carbs', 'vegetarian', 'spicy'] },
  { key: 'FriedRice',              label: 'Fried Rice',                tags: ['rice', 'asian', 'carbs', 'easy', 'quick'] },
  { key: 'GoldenChickenSoup',      label: 'Golden Chicken Soup',       tags: ['chicken', 'soup', 'no-carbs', 'easy'] },
  { key: 'GreekChickpeaSalad',     label: 'Greek Chickpea Salad',      tags: ['salad', 'european', 'greek', 'chickpea', 'no-carbs', 'vegetarian', 'easy'] },
  { key: 'HomemadePasta',          label: 'Homemade Pasta',            tags: ['european', 'italian', 'carbs', 'pasta', 'vegetarian'] },
  { key: 'ItalianWeddingSoup',     label: 'Italian Wedding Soup',      tags: ['soup', 'european', 'italian'] },
  { key: 'JapaneseCurry',          label: 'Japanese Curry',            tags: ['chicken', 'asian', 'curry', 'carbs', 'japanese'] },
  { key: 'Kompot',                 label: 'Kompot',                    tags: ['european', 'drink', 'no-carbs', 'fruit', 'easy'] },
  { key: 'KoreanSalad',            label: 'Korean Salad',              tags: ['asian', 'salad', 'korean', 'easy', 'quick'] },
  { key: 'KoreanSpinachSalad',     label: 'Korean Spinach Salad',      tags: ['asian', 'salad', 'korean', 'spinach', 'vegetarian', 'easy'] },
  { key: 'LazyChickenBiryani',     label: 'Lazy Chicken Biryani',      tags: ['chicken', 'rice', 'asian', 'indian', 'carbs', 'easy'] },
  { key: 'NabeSoup',               label: 'Nabe Soup',                 tags: ['asian', 'soup', 'mushroom', 'japanese'] },
  { key: 'NordicLeekSoup',         label: 'Nordic Leek Soup',          tags: ['european', 'soup', 'leek', 'no-carbs', 'vegetarian'] },
  { key: 'Okonomiyaki',            label: 'Okonomiyaki',               tags: ['asian', 'eggs', 'sausage', 'japanese', 'carbs', 'savory'] },
  { key: 'PolloChileColorado',     label: 'Pollo Chile Colorado',      tags: ['chicken', 'latin', 'carbs', 'spicy'] },
  { key: 'RedbeansRice',           label: 'Red Beans & Rice',          tags: ['rice', 'latin', 'carbs', 'beans', 'easy'] },
  { key: 'RiceCookerBowl',         label: 'Rice Cooker Bowl',          tags: ['rice', 'asian', 'carbs', 'easy', 'quick'] },
  { key: 'Soondubujigae',          label: 'Soondubujigae',             tags: ['tofu', 'asian', 'soup', 'korean', 'spicy'] },
  { key: 'SopadeLentejas',         label: 'Sopa de Lentejas',          tags: ['lentils', 'latin', 'soup', 'vegetarian'] },
  { key: 'SpaghettiWithMeatSauce', label: 'Spaghetti with Meat Sauce', tags: ['beef', 'european', 'italian', 'carbs', 'pasta'] },
  { key: 'SriLankanDahl',          label: 'Sri Lankan Dahl',           tags: ['lentils', 'asian', 'no-carbs', 'vegetarian', 'spicy'] },
  { key: 'StreetTacos',            label: 'Street Tacos',              tags: ['chicken', 'latin', 'carbs', 'easy', 'spicy'] },
  { key: 'TofuPot',                label: 'Tofu Pot',                  tags: ['tofu', 'asian', 'soup', 'vegetarian', 'easy'] },
  { key: 'TuscanSoup',             label: 'Tuscan Soup',               tags: ['european', 'soup', 'italian', 'hearty'] },
  { key: 'UmamiSeaweedRiceRolls',  label: 'Umami Seaweed Rice Rolls',  tags: ['rice', 'asian', 'carbs', 'japanese', 'seaweed', 'easy'] },
  { key: 'YamitsukiShioKyabetsu',  label: 'Yamitsuki Shio Kyabetsu',   tags: ['asian', 'salad', 'japanese', 'cabbage', 'vegetarian', 'easy', 'quick'] },
];

// ── SEARCH ────────────────────────────────────────────────

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

  // re-bind enter key on the new input
  document.getElementById('searchInput').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') handleSearch();
  });
}

document.getElementById('searchInput').addEventListener('keydown', function(e) {
  if (e.key === 'Enter') handleSearch();
});

// ── RANDOM ────────────────────────────────────────────────

function handleRandom() {
  const btn = document.querySelector('.btn-random');

  btn.innerHTML = `
    <div class="btn-icon">⚄</div>
    <div class="btn-label">ROLLING...</div>
    <div class="btn-desc">selecting random recipe</div>
  `;

  const recipes = [
    'Recipes/AsianMarinade.html',
    'Recipes/BeefStew.html',
    'Recipes/BeefVindaloo.html',
    'Recipes/BigMacSalad.html',
    'Recipes/Burrito.html',
    'Recipes/CajunSausagePotatoSoup.html',
    'Recipes/CapreseSalad.html',
    'Recipes/ChineseSteamedEgg.html',
    'Recipes/CreamyCucumberSalad.html',
    'Recipes/CreamyMushroomSoup.html',
    'Recipes/EggCurry.html',
    'Recipes/FriedRice.html',
    'Recipes/GoldenChickenSoup.html',
    'Recipes/GreekChickpeaSalad.html',
    'Recipes/HomemadePasta.html',
    'Recipes/ItalianWeddingSoup.html',
    'Recipes/JapaneseCurry.html',
    'Recipes/Kompot.html',
    'Recipes/KoreanSalad.html',
    'Recipes/KoreanSpinachSalad.html',
    'Recipes/LazyChickenBiryani.html',
    'Recipes/NabeSoup.html',
    'Recipes/NordicLeekSoup.html',
    'Recipes/Okonomiyaki.html',
    'Recipes/PolloChileColorado.html',
    'Recipes/RedbeansRice.html',
    'Recipes/RiceCookerBowl.html',
    'Recipes/Soondubujigae.html',
    'Recipes/SopadeLentejas.html',
    'Recipes/SpaghettiWithMeatSauce.html',
    'Recipes/SriLankanDahl.html',
    'Recipes/StreetTacos.html',
    'Recipes/TofuPot.html',
    'Recipes/TuscanSoup.html',
    'Recipes/UmamiSeaweedRiceRolls.html',
    'Recipes/YamitsukiShioKyabetsu.html',
  ];

  const randomRecipe = recipes[Math.floor(Math.random() * recipes.length)];

  setTimeout(() => {
    window.location.href = randomRecipe;
  }, 650);
}

// ── CATEGORIES MODAL ──────────────────────────────────────

function handleCategories() {
  const existing = document.getElementById('cat-modal-overlay');
  if (existing) existing.remove();

  const overlay = document.createElement('div');
  overlay.id = 'cat-modal-overlay';
  overlay.innerHTML = buildModalHTML();
  document.body.appendChild(overlay);

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
}

function switchCatTab(tab) {
  document.querySelectorAll('.cat-tab').forEach(t =>
    t.classList.toggle('active', t.dataset.tab === tab));
  document.querySelectorAll('.cat-panel').forEach(p =>
    p.classList.toggle('active', p.dataset.panel === tab));
}

function openCategoryList(key, tab) {
  const catData = CATEGORIES[tab].find(c => c.key === key);
  if (!catData) return;

  const listHTML = catData.recipes.map(r => `
    <a class="cat-recipe-link" href="Recipes/${r}.html">
      <span class="cat-recipe-arrow">→</span>
      ${r.replace(/([A-Z])/g, ' $1').trim()}
    </a>
  `).join('');

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
  const buildGrid = (tab) =>
    CATEGORIES[tab].map((cat, i) => `
      <button class="cat-btn ${COLORS[i % COLORS.length]}"
              onclick="openCategoryList('${cat.key}', '${tab}')">
        <div class="cat-btn-icon">${cat.icon}</div>
        <div class="cat-btn-name">${cat.label}</div>
        <div class="cat-btn-count">${cat.recipes.length} recipe${cat.recipes.length !== 1 ? 's' : ''}</div>
      </button>
    `).join('');

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
        <button class="cat-tab active" data-tab="cuisine">BY CUISINE</button>
        <button class="cat-tab" data-tab="ingredient">BY INGREDIENT</button>
        <button class="cat-tab" data-tab="type">BY TYPE</button>
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
          <span><span class="cat-dot"></span>36 RECIPES INDEXED</span>
          <span class="cat-status-right">PALATE.EXE // v1.0</span>
        </div>
      </div>
    </div>
  `;
}
