// ── CATEGORIES DATA ──────────────────────────────────────
const CATEGORIES = {
  cuisine: [
    {
      key: 'asian',
      label: 'ASIAN',
      icon: '🥡',
      recipes: [
        'NabeSoup',
        'JapaneseCurry',
        'Okonomiyaki',
        'Soondubujigae',
        'KoreanSalad',
        'KoreanSpinachSalad',
        'YamitsukiShioKyabetsu',
        'FriedRice',
        'AsianMarinade',
        'UmamiSeaweedRiceRolls',
        'RiceCookerBowl',
        'TofuPot',
        'ChineseSteamedEgg'
      ]
    },

    {
      key: 'south-asian',
      label: 'SOUTH ASIAN',
      icon: '🫙',
      recipes: [
        'EggCurry',
        'BeefVindaloo',
        'SriLankanDahl',
        'LazyChickenBiryani',
        'Roti'
      ]
    },

    {
      key: 'latin',
      label: 'LATIN',
      icon: '🌶',
      recipes: [
        'PolloChileColorado',
        'SopadeLentejas',
        'Burrito',
        'StreetTacos'
      ]
    },

    {
      key: 'european',
      label: 'EUROPEAN',
      icon: '🫕',
      recipes: [
        'NordicLeekSoup',
        'Kompot'
      ]
    },

    {
      key: 'american',
      label: 'AMERICAN',
      icon: '🦅',
      recipes: [
        'BigMacSalad',
        'CajunSausagePotatoSoup',
        'RedBeansRice',
        'ChocoChipCookie'
      ]
    },

    {
      key: 'african',
      label: 'AFRICAN',
      icon: '🌍',
      recipes: [
        'DoroWat',
        'EthiopianBeefTibs'
      ]
    },

    {
      key: 'arab',
      label: 'ARAB',
      icon: '🫖',
      recipes: [
        'Kabsa'
      ]
    },

    {
      key: 'mediterranean',
      label: 'MEDITERRANEAN',
      icon: '🫒',
      recipes: [
        'ItalianWeddingSoup',
        'TuscanSoup',
        'HomemadePasta',
        'SpaghettiWithMeatSauce',
        'CapreseSalad',
        'GreekChickpeaSalad'
      ]
    }
  ],

  ingredient: [

    // ── Proteins ──

    {
      key: 'chicken',
      label: 'CHICKEN',
      icon: '🍗',
      recipes: [
        'GoldenChickenSoup',
        'LazyChickenBiryani',
        'PolloChileColorado',
        'JapaneseCurry',
        'Burrito',
        'StreetTacos',
        'DoroWat',
        'Kabsa'
      ]
    },

    {
      key: 'beef',
      label: 'BEEF',
      icon: '🥩',
      recipes: [
        'BeefStew',
        'BeefVindaloo',
        'BigMacSalad',
        'SpaghettiWithMeatSauce',
        'EthiopianBeefTibs'
      ]
    },

    {
      key: 'seafood',
      label: 'SEAFOOD',
      icon: '🐟',
      recipes: [],
      empty: true
    },

    {
      key: 'pork',
      label: 'PORK',
      icon: '🥓',
      recipes: [
        'CajunSausagePotatoSoup',
        'Okonomiyaki'
      ]
    },

    {
      key: 'veg-protein',
      label: 'VEG PROTEIN',
      icon: '🫘',
      recipes: [
        'TofuPot',
        'Soondubujigae',
        'EggCurry',
        'ChineseSteamedEgg',
        'SopadeLentejas',
        'SriLankanDahl',
        'GreekChickpeaSalad'
      ]
    },

    // ── Carbs / Other ──

    {
      key: 'rice',
      label: 'RICE',
      icon: '🍚',
      recipes: [
        'FriedRice',
        'RiceCookerBowl',
        'LazyChickenBiryani',
        'RedBeansRice',
        'UmamiSeaweedRiceRolls',
        'Kabsa'
      ]
    },

    {
      key: 'pasta-bread',
      label: 'PASTA/BREAD',
      icon: '🍝',
      recipes: [
        'HomemadePasta',
        'SpaghettiWithMeatSauce',
        'Burrito',
        'StreetTacos',
        'Roti'
      ]
    },

    {
      key: 'quick',
      label: 'QUICK',
      icon: '⚡',
      recipes: [
        'FriedRice',
        'RiceCookerBowl',
        'KoreanSalad',
        'KoreanSpinachSalad',
        'YamitsukiShioKyabetsu',
        'CreamyCucumberSalad',
        'ChineseSteamedEgg',
        'CapreseSalad',
        'AsianMarinade',
        'BigMacSalad',
        'Roti'
      ]
    }
  ],

  type: [

    {
      key: 'soups',
      label: 'SOUPS',
      icon: '🍲',
      recipes: [
        'NabeSoup',
        'GoldenChickenSoup',
        'CreamyMushroomSoup',
        'ItalianWeddingSoup',
        'TuscanSoup',
        'NordicLeekSoup',
        'CajunSausagePotatoSoup',
        'SopadeLentejas',
        'Soondubujigae',
        'BeefStew',
        'TofuPot'
      ]
    },

    {
      key: 'salads',
      label: 'SALADS',
      icon: '🥗',
      recipes: [
        'BigMacSalad',
        'CreamyCucumberSalad',
        'GreekChickpeaSalad',
        'KoreanSalad',
        'KoreanSpinachSalad',
        'YamitsukiShioKyabetsu',
        'CapreseSalad'
      ]
    },

    {
      key: 'carbs',
      label: 'CARBS',
      icon: '🍜',
      recipes: [
        'FriedRice',
        'RiceCookerBowl',
        'LazyChickenBiryani',
        'RedBeansRice',
        'UmamiSeaweedRiceRolls',
        'Okonomiyaki',
        'JapaneseCurry',
        'PolloChileColorado',
        'HomemadePasta',
        'SpaghettiWithMeatSauce',
        'Burrito',
        'StreetTacos',
        'Kabsa',
        'Roti'
      ]
    },

    {
      key: 'no-carbs',
      label: 'NO CARBS',
      icon: '🥩',
      recipes: [
        'BeefVindaloo',
        'EggCurry',
        'SriLankanDahl',
        'AsianMarinade',
        'GoldenChickenSoup',
        'CreamyMushroomSoup',
        'NordicLeekSoup',
        'GreekChickpeaSalad',
        'CreamyCucumberSalad',
        'Kompot',
        'ChineseSteamedEgg',
        'CapreseSalad',
        'DoroWat',
        'EthiopianBeefTibs'
      ]
    },

    {
      key: 'dessert',
      label: 'DESSERT',
      icon: '🍰',
      recipes: [
        'ChocoChipCookie'
      ]
    }
  ]
};



const COLORS = ['olive', 'coral', 'orange', 'dark'];

// ── RECIPE INDEX (for search) ─────────────────────────────

const RECIPE_INDEX = [
  { key: 'AsianMarinade',          label: 'Asian Marinade',            tags: ['asian', 'marinade', 'easy', 'quick'] },

  { key: 'BeefStew',               label: 'Beef Stew',                 tags: ['beef', 'soup', 'stew', 'hearty'] },

  { key: 'BeefVindaloo',           label: 'Beef Vindaloo',             tags: ['beef', 'south-asian', 'indian', 'spicy', 'curry'] },

  { key: 'BigMacSalad',            label: 'Big Mac Salad',             tags: ['beef', 'salad', 'american', 'easy', 'quick'] },

  { key: 'Burrito',                label: 'Burrito',                   tags: ['chicken', 'latin', 'wrap', 'easy', 'carbs'] },

  { key: 'CajunSausagePotatoSoup', label: 'Cajun Sausage Potato Soup', tags: ['pork', 'sausage', 'soup', 'american', 'cajun', 'potato', 'spicy'] },

  { key: 'CapreseSalad',           label: 'Caprese Salad',             tags: ['salad', 'italian', 'mediterranean', 'vegetarian', 'easy', 'quick'] },

  { key: 'ChineseSteamedEgg',      label: 'Chinese Steamed Egg',       tags: ['eggs', 'asian', 'chinese', 'vegetarian', 'easy', 'quick'] },

  { key: 'ChocoChipCookie',        label: 'Chocolate Chip Cookies',    tags: ['dessert', 'baking', 'american', 'sweet', 'easy'] },

  { key: 'CreamyCucumberSalad',    label: 'Creamy Cucumber Salad',     tags: ['salad', 'vegetarian', 'cucumber', 'easy', 'quick'] },

  { key: 'CreamyMushroomSoup',     label: 'Creamy Mushroom Soup',      tags: ['mushroom', 'soup', 'vegetarian', 'creamy'] },

  { key: 'DoroWat',                label: 'Doro Wat',                  tags: ['chicken', 'ethiopian', 'african', 'stew', 'spicy', 'eggs'] },

  { key: 'EggCurry',               label: 'Egg Curry',                 tags: ['eggs', 'indian', 'south-asian', 'curry', 'vegetarian', 'spicy'] },

  { key: 'EthiopianBeefTibs',      label: 'Ethiopian Beef Tibs',       tags: ['beef', 'ethiopian', 'african', 'spicy', 'skillet'] },

  { key: 'FriedRice',              label: 'Fried Rice',                tags: ['rice', 'asian', 'quick', 'easy'] },

  { key: 'GoldenChickenSoup',      label: 'Golden Chicken Soup',       tags: ['chicken', 'soup', 'easy', 'comfort-food'] },

  { key: 'GreekChickpeaSalad',     label: 'Greek Chickpea Salad',      tags: ['salad', 'greek', 'mediterranean', 'chickpea', 'vegetarian', 'healthy'] },

  { key: 'HomemadePasta',          label: 'Homemade Pasta',            tags: ['italian', 'pasta', 'carbs', 'vegetarian'] },

  { key: 'ItalianWeddingSoup',     label: 'Italian Wedding Soup',      tags: ['soup', 'italian', 'mediterranean', 'hearty'] },

  { key: 'JapaneseCurry',          label: 'Japanese Curry',            tags: ['curry', 'japanese', 'asian', 'comfort-food', 'rice'] },

  { key: 'Kabsa',                  label: 'Kabsa',                     tags: ['chicken', 'rice', 'middle-eastern', 'arabic', 'spiced', 'hearty'] },

  { key: 'Kompot',                 label: 'Kompot',                    tags: ['drink', 'fruit', 'eastern-european', 'easy'] },

  { key: 'KoreanSalad',            label: 'Korean Salad',              tags: ['salad', 'korean', 'asian', 'quick', 'easy'] },

  { key: 'KoreanSpinachSalad',     label: 'Korean Spinach Salad',      tags: ['spinach', 'salad', 'korean', 'asian', 'vegetarian', 'easy'] },

  { key: 'LazyChickenBiryani',     label: 'Lazy Chicken Biryani',      tags: ['chicken', 'rice', 'indian', 'south-asian', 'easy', 'spiced'] },

  { key: 'NabeSoup',               label: 'Nabe Soup',                 tags: ['soup', 'japanese', 'asian', 'hotpot', 'comfort-food'] },

  { key: 'NordicLeekSoup',         label: 'Nordic Leek Soup',          tags: ['soup', 'leek', 'nordic', 'european', 'vegetarian'] },

  { key: 'Okonomiyaki',            label: 'Okonomiyaki',               tags: ['japanese', 'asian', 'savory-pancake', 'cabbage', 'eggs'] },

  { key: 'PolloChileColorado',     label: 'Pollo Chile Colorado',      tags: ['chicken', 'latin', 'mexican', 'spicy', 'stew'] },

  { key: 'RedBeansRice',           label: 'Red Beans & Rice',          tags: ['rice', 'beans', 'cajun', 'american', 'comfort-food'] },

  { key: 'RiceCookerBowl',         label: 'Rice Cooker Bowl',          tags: ['rice', 'asian', 'easy', 'quick'] },

  { key: 'Roti',                   label: 'Roti',                      tags: ['bread', 'flatbread', 'south-asian', 'indian', 'easy'] },

  { key: 'Soondubujigae',          label: 'Soondubujigae',             tags: ['tofu', 'korean', 'asian', 'soup', 'spicy'] },

  { key: 'SopadeLentejas',         label: 'Sopa de Lentejas',          tags: ['lentils', 'latin', 'soup', 'vegetarian', 'hearty'] },

  { key: 'SpaghettiWithMeatSauce', label: 'Spaghetti with Meat Sauce', tags: ['beef', 'italian', 'pasta', 'comfort-food'] },

  { key: 'SriLankanDahl',          label: 'Sri Lankan Dahl',           tags: ['lentils', 'south-asian', 'curry', 'vegetarian', 'spicy'] },

  { key: 'StreetTacos',            label: 'Street Tacos',              tags: ['tacos', 'latin', 'mexican', 'spicy', 'easy'] },

  { key: 'TofuPot',                label: 'Tofu Pot',                  tags: ['tofu', 'asian', 'vegetarian', 'soup', 'comfort-food'] },

  { key: 'TuscanSoup',             label: 'Tuscan Soup',               tags: ['soup', 'italian', 'hearty', 'comfort-food'] },

  { key: 'UmamiSeaweedRiceRolls',  label: 'Umami Seaweed Rice Rolls',  tags: ['rice', 'seaweed', 'japanese', 'asian', 'easy'] },

  { key: 'YamitsukiShioKyabetsu',  label: 'Yamitsuki Shio Kyabetsu',   tags: ['cabbage', 'salad', 'japanese', 'asian', 'vegetarian', 'quick'] },
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

  // Derive list from RECIPE_INDEX so it never goes stale
  const recipes = RECIPE_INDEX.map(r => `Recipes/${r.key}.html`);
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

  // Prevent body scroll while modal is open (mobile-friendly)
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
    const label = recipe ? recipe.label : r.replace(/([A-Z])/g, ' $1').trim();
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
  const buildGrid = (tab) => {
    let html = '';
    CATEGORIES[tab].forEach((cat, i) => {
      const emptyClass = cat.empty ? ' cat-btn-empty' : '';
      const clickHandler = cat.empty ? '' : `onclick="openCategoryList('${cat.key}', '${tab}')"`;

      html += `
        <button class="cat-btn ${COLORS[i % COLORS.length]}${emptyClass}"
                ${clickHandler}
                ${cat.empty ? 'disabled' : ''}>
          <div class="cat-btn-icon">${cat.icon}</div>
          <div class="cat-btn-name">${cat.label}</div>
          <div class="cat-btn-count">${cat.empty ? 'coming soon' : `${cat.recipes.length} recipe${cat.recipes.length !== 1 ? 's' : ''}`}</div>
        </button>
      `;
    });
    return html;
  };

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
