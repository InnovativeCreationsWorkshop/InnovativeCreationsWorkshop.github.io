// ─────────────────────────────────────────────
// recipes.js  ← SINGLE SOURCE OF TRUTH
// To add a recipe: drop one object in this array.
// Everything else (nav, search, categories, masterlist) updates automatically.
// ─────────────────────────────────────────────

const RECIPES = [





  // ── SALADS ───────────────────────────────────

  {
    key:        'BigMacSalad',
    label:      'Big Mac Salad',
    image:      '../Image/tempimage_2.jpg',
    video: '../Video/BigMacSalad.MP4',
    tags:       ['beef', 'salad', 'american', 'easy', 'quick'],
    categories: {
      cuisine:    'american',
      ingredient: ['beef', 'quick'],
      type:       ['salads', 'no-carbs']
    }
  },

  {
    key:        'CapreseSalad',
    label:      'Caprese Salad',
     video: '../Video/BigMacSalad.MP4',
    image:      '../Image/TempImage/t_caprese.jpg',
    tags:       ['salad', 'italian', 'mediterranean', 'vegetarian', 'easy', 'quick'],
    categories: {
      cuisine:    'mediterranean',
      ingredient: ['quick', 'veg-protein'],
      type:       ['salads', 'no-carbs']
    }
  },

  {
    key:        'ChineseSteamedEgg',
    label:      'Chinese Steamed Egg',
    image:      '../Image/TempImage/t_steamedegg.jpg',
     video: '../Video/BigMacSalad.MP4',
    tags:       ['eggs', 'asian', 'chinese', 'vegetarian', 'easy', 'quick'],
    categories: {
      cuisine:    'asian',
      ingredient: ['veg-protein', 'quick'],
      type:       ['salads', 'no-carbs']
    }
  },

  {
    key:        'CreamyCucumberSalad',
    label:      'Creamy Cucumber Salad',
    image:      '../Image/TempImage/t_cucsalad.jpg',
     video: '../Video/BigMacSalad.MP4',
    tags:       ['salad', 'vegetarian', 'cucumber', 'easy', 'quick'],
    categories: {
      cuisine:    'european',
      ingredient: ['quick'],
      type:       ['salads', 'no-carbs']
    }
  },

  {
    key:        'GreekChickpeaSalad',
    label:      'Greek Chickpea Salad',
    image:      '../Image/TempImage/t_chickpea.jpg',
     video: '../Video/BigMacSalad.MP4',
    tags:       ['salad', 'greek', 'mediterranean', 'chickpea', 'vegetarian', 'healthy'],
    categories: {
      cuisine:    'mediterranean',
      ingredient: ['veg-protein'],
      type:       ['salads', 'no-carbs']
    }
  },

  {
    key:        'KoreanSalad',
    label:      'Korean Salad',
    image:      '../Image/TempImage/t_ksalad.jpg',
     video: '../Video/BigMacSalad.MP4',
    tags:       ['salad', 'korean', 'asian', 'quick', 'easy'],
    categories: {
      cuisine:    'asian',
      ingredient: ['quick'],
      type:       ['salads']
    }
  },

  {
    key:        'KoreanSpinachSalad',
    label:      'Korean Spinach Salad',
    image:      '../Image/TempImage/t_spinach.jpg',
     video: '../Video/BigMacSalad.MP4',
    tags:       ['spinach', 'salad', 'korean', 'asian', 'vegetarian', 'easy'],
    categories: {
      cuisine:    'asian',
      ingredient: ['quick'],
      type:       ['salads']
    }
  },

  {
    key:        'YamitsukiShioKyabetsu',
    label:      'Yamitsuki Shio Kyabetsu',
    image:      '../Image/TempImage/t_cabbage.jpg',
     video: '../Video/BigMacSalad.MP4',
    tags:       ['cabbage', 'salad', 'japanese', 'asian', 'vegetarian', 'quick'],
    categories: {
      cuisine:    'asian',
      ingredient: ['quick'],
      type:       ['salads']
    }
  },

  // ── SOUPS, STEWS & CURRIES ────────────────────

  {
    key:        'BeefStew',
    label:      'Beef Stew',
    image:      '../Image/TempImage/t_beefstew.jpg',
     video: '../Video/BigMacSalad.MP4',
    tags:       ['beef', 'soup', 'stew', 'hearty'],
    categories: {
      cuisine:    'american',
      ingredient: ['beef'],
      type:       ['soups']
    }
  },

  {
    key:        'BeefVindaloo',
    label:      'Beef Vindaloo',
    image:      '../Image/TempImage/t_beefvindaloo.jpg',
     video: '../Video/BigMacSalad.MP4',
    tags:       ['beef', 'south-asian', 'indian', 'spicy', 'curry'],
    categories: {
      cuisine:    'south-asian',
      ingredient: ['beef'],
      type:       ['soups', 'no-carbs']
    }
  },

  {
    key:        'CajunSausagePotatoSoup',
    label:      'Cajun Sausage Potato Soup',
    image:      '../Image/TempImage/t_cajunpotato.jpg',
     video: '../Video/BigMacSalad.MP4',
    tags:       ['pork', 'sausage', 'soup', 'american', 'cajun', 'potato', 'spicy'],
    categories: {
      cuisine:    'american',
      ingredient: ['pork'],
      type:       ['soups']
    }
  },

  {
    key:        'CreamyMushroomSoup',
    label:      'Creamy Mushroom Soup',
    image:      '../Image/TempImage/t_mushroom.jpg',
     video: '../Video/BigMacSalad.MP4',
    tags:       ['mushroom', 'soup', 'vegetarian', 'creamy'],
    categories: {
      cuisine:    'european',
      ingredient: ['veg-protein'],
      type:       ['soups', 'no-carbs']
    }
  },

  {
    key:        'EggCurry',
    label:      'Egg Curry',
    image:      '../Image/TempImage/t_eggcurry.jpg',
     video: '../Video/BigMacSalad.MP4',
    tags:       ['eggs', 'indian', 'south-asian', 'curry', 'vegetarian', 'spicy'],
    categories: {
      cuisine:    'south-asian',
      ingredient: ['veg-protein'],
      type:       ['soups', 'no-carbs']
    }
  },

  {
    key:        'GoldenChickenSoup',
    label:      'Golden Chicken Soup',
    image:      '../Image/TempImage/t_chickensoup.jpg',
     video: '../Video/BigMacSalad.MP4',
    tags:       ['chicken', 'soup', 'easy', 'comfort-food'],
    categories: {
      cuisine:    'american',
      ingredient: ['chicken'],
      type:       ['soups', 'no-carbs']
    }
  },

  {
    key:        'ItalianWeddingSoup',
    label:      'Italian Wedding Soup',
    image:      '../Image/TempImage/t_wedding.jpg',
     video: '../Video/BigMacSalad.MP4',
    tags:       ['soup', 'italian', 'mediterranean', 'hearty'],
    categories: {
      cuisine:    'mediterranean',
      ingredient: ['pork', 'beef'],
      type:       ['soups']
    }
  },

  {
    key:        'JapaneseCurry',
    label:      'Japanese Curry',
    image:      '../Image/TempImage/t_jap.jpg',
     video: '../Video/BigMacSalad.MP4',
    tags:       ['curry', 'japanese', 'asian', 'comfort-food', 'rice'],
    categories: {
      cuisine:    'asian',
      ingredient: ['chicken', 'rice'],
      type:       ['soups', 'carbs']
    }
  },

  {
    key:        'NabeSoup',
    label:      'Nabe Soup',
    image:      '../Image/TempImage/t_nabe.jpg',
     video: '../Video/BigMacSalad.MP4',
    tags:       ['soup', 'japanese', 'asian', 'hotpot', 'comfort-food'],
    categories: {
      cuisine:    'asian',
      ingredient: ['beef', 'veg-protein'],
      type:       ['soups']
    }
  },

  {
    key:        'NordicLeekSoup',
    label:      'Nordic Leek Soup',
    image:      '../Image/leeksoup.jpg',
     video: '../Video/BigMacSalad.MP4',
    tags:       ['soup', 'leek', 'nordic', 'european', 'vegetarian'],
    categories: {
      cuisine:    'european',
      ingredient: ['beef','chicken','pork', 'veg-protein'],
      type:       ['soups', 'no-carbs']
    }
  },

  {
    key:        'PolloChileColorado',
    label:      'Pollo Chile Colorado',
    image:      '../Image/Polloconchile.jpg',
     video: '../Video/BigMacSalad.MP4',
    tags:       ['chicken', 'latin', 'mexican', 'spicy', 'stew'],
    categories: {
      cuisine:    'latin',
      ingredient: ['chicken'],
      type:       ['soups']
    }
  },

  {
    key:        'Soondubujigae',
    label:      'Soondubujigae',
    image:      '../Image/Soondubu.jpg',
     video: '../Video/BigMacSalad.MP4',
    tags:       ['tofu', 'korean', 'asian', 'soup', 'spicy'],
    categories: {
      cuisine:    'asian',
      ingredient: ['veg-protein'],
      type:       ['soups']
    }
  },

  {
  key:        'DumplingMisoSoup',
  label:      'Dumpling Miso Soup',
  image:      '../Image/dumpsoup.jpg',
  video:      '../Video/DumplingMisoSoup.MP4',
  tags:       ['soup', 'dumplings', 'miso', 'asian', 'easy', 'comfort-food'],
  categories: {
    cuisine:    'asian',
    ingredient: ['dumplings', 'mushrooms'],
    type:       ['soups']
  }
},

  {
    key:        'SopadeLentejas',
    label:      'Sopa de Lentejas',
    image:      '../Image/lentilsoup.jpg',
     video: '../Video/BigMacSalad.MP4',
    tags:       ['lentils', 'latin', 'soup', 'vegetarian', 'hearty'],
    categories: {
      cuisine:    'latin',
      ingredient: ['veg-protein'],
      type:       ['soups']
    }
  },

  {
    key:        'SpaghettiWithMeatSauce',
    label:      'Spaghetti with Meat Sauce',
    image:      '../Image/TempImage/t_spaget.jpg',
     video: '../Video/BigMacSalad.MP4',
    tags:       ['beef', 'italian', 'pasta', 'comfort-food'],
    categories: {
      cuisine:    'mediterranean',
      ingredient: ['beef', 'pasta-bread'],
      type:       ['soups', 'carbs']
    }
  },

  {
    key:        'SriLankanDahl',
    label:      'Sri Lankan Dahl',
    image:      '../Image/TempImage/t_dahl.jpg',
     video: '../Video/BigMacSalad.MP4',
    tags:       ['lentils', 'south-asian', 'curry', 'vegetarian', 'spicy'],
    categories: {
      cuisine:    'south-asian',
      ingredient: ['veg-protein'],
      type:       ['soups', 'no-carbs']
    }
  },

  {
    key:        'TofuPot',
    label:      'Tofu Pot',
    image:      '../Image/TempImage/t_tofu.jpg',
     video: '../Video/BigMacSalad.MP4',
    tags:       ['tofu', 'asian', 'vegetarian', 'soup', 'comfort-food'],
    categories: {
      cuisine:    'asian',
      ingredient: ['veg-protein'],
      type:       ['soups']
    }
  },

  {
    key:        'TuscanSoup',
    label:      'Tuscan Soup',
    image:      '../Image/TempImage/t_tuscan.jpg',
     video: '../Video/BigMacSalad.MP4',
    tags:       ['soup', 'italian', 'hearty', 'comfort-food'],
    categories: {
      cuisine:    'mediterranean',
      ingredient: ['pork', 'veg-protein'],
      type:       ['soups']
    }
  },

  {
    key:        'DoroWat',
    label:      'Doro Wat',
    image:      '../Image/TempImage/t_doro.jpg',
     video: '../Video/BigMacSalad.MP4',
    tags:       ['chicken', 'ethiopian', 'african', 'stew', 'spicy', 'eggs'],
    categories: {
      cuisine:    'african',
      ingredient: ['chicken'],
      type:       ['soups', 'no-carbs']
    }
  },

  // ── RICE, NOODLES & MAINS ─────────────────────

  {
    key:        'AsianMarinade',
    label:      'Asian Marinade',
    image:      '../Image/TempImage/t_AMarinade.jpg',
     video: '../Video/BigMacSalad.MP4',
    tags:       ['asian', 'marinade', 'easy', 'quick'],
    categories: {
      cuisine:    'asian',
      ingredient: ['quick'],
      type:       ['no-carbs']
    }
  },
  {
  key:        'Gyudon',
  label:      'Gyudon',
  image:      '../Image/tempimage_2.jpg',
  video:      '../Video/Gyudon.MP4',
  tags:       ['beef', 'rice', 'japanese', 'easy', 'quick'],
  categories: {
    cuisine:    'japanese',
    ingredient: ['beef', 'rice'],
    type:       ['rice-bowls']
  }
},

  {
  key:        'MiniMeatballPasta',
  label:      'Mini Meatball Pasta',
  image:      '../Image/tempimage_2.jpg',
  video:      '../Video/MiniMeatballPasta.MP4',
  tags:       ['beef', 'sausage', 'pasta', 'italian', 'one-pan', 'comfort-food'],
  categories: {
    cuisine:    'italian',
    ingredient: ['beef', 'sausage', 'pasta'],
    type:       ['pasta', 'one-pan']
  }
},

  {
    key:        'HomemadePasta',
    label:      'Homemade Pasta',
    image:      '../Image/TempImage/t_pasta.jpg',
     video: '../Video/BigMacSalad.MP4',
    tags:       ['italian', 'pasta', 'carbs', 'vegetarian'],
    categories: {
      cuisine:    'mediterranean',
      ingredient: ['pasta-bread'],
      type:       ['carbs']
    }
  },

  {
    key:        'Burrito',
    label:      'Burrito',
    image:      '../Image/TempImage/t_burrito.jpg',
     video: '../Video/BigMacSalad.MP4',
    tags:       ['chicken', 'latin', 'wrap', 'easy', 'carbs'],
    categories: {
      cuisine:    'latin',
      ingredient: ['chicken', 'pasta-bread'],
      type:       ['carbs']
    }
  },

  {
    key:        'StreetTacos',
    label:      'Street Tacos',
    image:      '../Image/Tacos.jpg',
     video: '../Video/BigMacSalad.MP4',
    tags:       ['tacos', 'latin', 'mexican', 'spicy', 'easy'],
    categories: {
      cuisine:    'latin',
      ingredient: ['chicken', 'pasta-bread', 'quick'],
      type:       ['carbs']
    }
  },

  {
    key:        'FriedRice',
    label:      'Fried Rice',
    image:      '../Image/TempImage/t_friedrice.jpg',
     video: '../Video/BigMacSalad.MP4',
    tags:       ['rice', 'asian', 'quick', 'easy'],
    categories: {
      cuisine:    'asian',
      ingredient: ['rice', 'quick'],
      type:       ['carbs']
    }
  },

  {
    key:        'Kompot',
    label:      'Kompot',
    image:      '../Image/Kompot.jpg',
     video: '../Video/BigMacSalad.MP4',
    tags:       ['drink', 'fruit', 'eastern-european', 'easy'],
    categories: {
      cuisine:    'european',
      ingredient: [],
      type:       ['no-carbs']
    }
  },

  {
    key:        'LazyChickenBiryani',
    label:      'Lazy Chicken Biryani',
    image:      '../Image/TempImage/t_biryani.jpg',
     video: '../Video/BigMacSalad.MP4',
    tags:       ['chicken', 'rice', 'indian', 'south-asian', 'easy', 'spiced'],
    categories: {
      cuisine:    'south-asian',
      ingredient: ['chicken', 'rice'],
      type:       ['carbs']
    }
  },

  {
    key:        'Okonomiyaki',
    label:      'Okonomiyaki',
    image:      '../Image/okonomi.jpg',
     video: '../Video/BigMacSalad.MP4',
    tags:       ['japanese', 'asian', 'savory-pancake', 'cabbage', 'eggs'],
    categories: {
      cuisine:    'asian',
      ingredient: ['pork', 'seafood', 'veg-protein'],
      type:       ['carbs']
    }
  },

  {
    key:        'RedBeansRice',
    label:      'Red Beans & Rice',
    image:      '../Image/TempImage/t_red.jpg',
     video: '../Video/BigMacSalad.MP4',
    tags:       ['rice', 'beans', 'cajun', 'american', 'comfort-food'],
    categories: {
      cuisine:    'american',
      ingredient: ['rice'],
      type:       ['carbs']
    }
  },

  {
    key:        'RiceCookerBowl',
    label:      'Rice Cooker Bowl',
    image:      '../Image/TempImage/t_ricebowl.jpg',
     video: '../Video/BigMacSalad.MP4',
    tags:       ['rice', 'asian', 'easy', 'quick'],
    categories: {
      cuisine:    'asian',
      ingredient: ['rice', 'quick'],
      type:       ['carbs']
    }
  },
  
    {
  key:        'RiceBowl',
  label:      'Rice Bowl',
  image:      '../Image/ricebowl.jpg',
  video:      '../Video/RiceBowl.MP4',
  tags:       ['rice', 'customizable', 'japanese', 'quick', 'easy'],
  categories: {
    cuisine:    'japanese',
    ingredient: ['rice', 'seafood', 'mixed-protein'],
    type:       ['rice-bowls', 'customizable']
  }
},

  {
    key:        'UmamiSeaweedRiceRolls',
    label:      'Umami Seaweed Rice Rolls',
    image:      '../Image/TempImage/t_roll.jpg',
     video: '../Video/BigMacSalad.MP4',
    tags:       ['rice', 'seaweed', 'japanese', 'asian', 'easy'],
    categories: {
      cuisine:    'asian',
      ingredient: ['rice'],
      type:       ['carbs']
    }
  },

  {
    key:        'EthiopianBeefTibs',
    label:      'Ethiopian Beef Tibs',
    image:      '../Image/TempImage/t_tibs.jpg',
     video: '../Video/BigMacSalad.MP4',
    tags:       ['beef', 'ethiopian', 'african', 'spicy', 'skillet'],
    categories: {
      cuisine:    'african',
      ingredient: ['beef'],
      type:       ['no-carbs']
    }
  },

  {
    key:        'Kabsa',
    label:      'Kabsa',
    image:      '../Image/TempImage/t_kabsa.jpg',
     video: '../Video/BigMacSalad.MP4',
    tags:       ['chicken', 'rice', 'middle-eastern', 'arabic', 'spiced', 'hearty'],
    categories: {
      cuisine:    'arab',
      ingredient: ['chicken', 'rice'],
      type:       ['carbs']
    }
  },

  {
    key:        'Roti',
    label:      'Roti',
    image:      '../Image/TempImage/t_roti.jpg',
     video: '../Video/BigMacSalad.MP4',
    tags:       ['bread', 'flatbread', 'south-asian', 'indian', 'easy'],
    categories: {
      cuisine:    'south-asian',
      ingredient: ['pasta-bread', 'quick'],
      type:       ['carbs']
    }
  },

  {
  key:        'BuffaloWings',
  label:      'Buffalo Wings',
  image:      '../Image/TempImage/t_wings.jpg',
   video: '../Video/BigMacSalad.MP4',
  tags:       ['chicken', 'american', 'spicy', 'easy', 'wings', 'fried'],
  categories: {
    cuisine:    'american',
    ingredient: ['chicken'],
    type:       ['no-carbs']
  }
},

{
  key:        'ChickenTinga',
  label:      'Chicken Tinga',
  image:      '../Image/tinga.jpg',
   video: '../Video/BigMacSalad.MP4',
  tags:       ['chicken', 'mexican', 'latin', 'spicy', 'easy', 'tomato', 'chipotle'],
  categories: {
    cuisine:    'latin',
    ingredient: ['chicken'],
    type:       ['carbs']
  }
},

{
  key:        'ThaiChickenSatay',
  label:      'Thai Chicken Satay',
  image:      '../Image/TempImage/t_satay.jpg',
   video: '../Video/BigMacSalad.MP4',
  tags:       ['chicken', 'thai', 'asian', 'peanut', 'grilled', 'skewer'],
  categories: {
    cuisine:    'asian',
    ingredient: ['chicken'],
    type:       ['no-carbs']
  }
},

{
  key:        'SweetChiliChickenRiceBowl',
  label:      'Sweet Chili Chicken Rice Bowl',
  image:      '../Image/chilichicken.jpg',
  video:      '../Video/BigMacSalad.MP4',
  tags:       ['chicken', 'asian', 'spicy', 'easy', 'garlic', 'chili', 'stir-fry'],
  categories: {
    cuisine:    'asian',
    ingredient: ['chicken'],
    type:       ['protein']
  }
},

  // ── DESSERTS ──────────────────────────────────

  {
    key:        'ChocoChipCookie',
    label:      'Chocolate Chip Cookies',
    image:      '../Image/TempImage/t_cookie.jpg',
     video: '../Video/BigMacSalad.MP4',
    tags:       ['dessert', 'baking', 'american', 'sweet', 'easy'],
    categories: {
      cuisine:    'american',
      ingredient: [],
      type:       ['dessert']
    }
  },

];
