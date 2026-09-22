// ─────────────────────────────────────────────
// recipes.js  ← SINGLE SOURCE OF TRUTH
// To add a recipe: drop one object in this array.
// Everything else (nav, search, categories, masterlist) updates automatically.
// NOTE: image/video paths below are placeholders — update to real filenames.
// ─────────────────────────────────────────────

const RECIPES = [

  // ── SOUPS ────────────────────────────────────

  {
    key: 'BakedPotatoSoup',
    label: 'Baked Potato Soup',
    image: '../Image/BakedPotatoSoup.jpg',
     video: "../vid/bigmacsalad.mp4",
    tags: ['potato', 'soup', 'american', 'bacon', 'creamy'],
    categories: { cuisine: 'american', ingredient: ['pork'], type: ['soups', 'carbs'] } // verify bacon
  },
  {
    key: 'CajunSausagePotatoSoup',
    label: 'Cajun Sausage Potato Soup',
    image: '../Image/CajunSausagePotatoSoup.jpg',
     video: "../vid/bigmacsalad.mp4",
    tags: ['sausage', 'potato', 'soup', 'american', 'spicy'],
    categories: { cuisine: 'american', ingredient: ['pork'], type: ['soups', 'carbs'] }
  },
  {
    key: 'PotatoSausageSoup',
    label: 'Potato Sausage Soup',
    image: '../Image/PotatoSausageSoup.jpg',
     video: "../vid/bigmacsalad.mp4",
    tags: ['sausage', 'potato', 'soup', 'american'],
    categories: { cuisine: 'american', ingredient: ['pork'], type: ['soups', 'carbs'] }
  },
  {
    key: 'NordicLeekSoup',
    label: 'Nordic Potato Leek Soup',
    image: '../Image/leeksoup.jpg',
     video: "../vid/bigmacsalad.mp4",
    tags: ['potato', 'leek', 'soup', 'european', 'vegetarian'],
    categories: { cuisine: 'european', ingredient: ['veg-protein'], type: ['soups', 'carbs'] } // verify: no true protein
  },
  {
    key: 'RusticBroccoliPotatoSoup',
    label: 'Rustic Broccoli Potato Soup',
    image: '../Image/broccolipotatosoup.png',
     video: "../vid/bigmacsalad.mp4",
    tags: ['broccoli', 'potato', 'soup', 'american', 'vegetarian'],
    categories: { cuisine: 'american', ingredient: ['veg-protein'], type: ['soups', 'carbs'] } // verify: no true protein
  },
  {
    key: 'BeefStew',
    label: 'Beef Stew',
    image: '../Image/BeefStew.jpg',
     video: "../vid/bigmacsalad.mp4",
    tags: ['beef', 'stew', 'american', 'hearty'],
    categories: { cuisine: 'american', ingredient: ['beef'], type: ['soups', 'no-carbs'] }
  },
  {
    key: 'CreamyMushroomSoup',
    label: 'Creamy Mushroom Soup',
    image: '../Image/CreamyMushroomSoup.jpg',
     video: "../vid/bigmacsalad.mp4",
    tags: ['mushroom', 'soup', 'vegetarian', 'creamy'],
    categories: { cuisine: 'european', ingredient: ['veg-protein'], type: ['soups', 'no-carbs'] } // verify: no true protein
  },
  {
    key: 'DumplingMisoSoup',
    label: 'Dumpling Miso Soup',
    image: '../Image/dumpsoup.jpg',
     video: "../vid/bigmacsalad.mp4",
    tags: ['dumpling', 'miso', 'soup', 'japanese', 'asian'],
    categories: { cuisine: 'asian', ingredient: ['pork', 'pasta-bread'], type: ['soups', 'carbs'] } // verify dumpling filling
  },
  {
    key: 'GoldenChickenSoup',
    label: 'Golden Chicken Soup',
    image: '../Image/GoldenChickenSoup.jpg',
     video: "../vid/bigmacsalad.mp4",
    tags: ['chicken', 'soup', 'american', 'comfort'],
    categories: { cuisine: 'american', ingredient: ['chicken'], type: ['soups', 'no-carbs'] }
  },
  {
    key: 'ItalianWeddingSoup',
    label: 'Italian Wedding Soup',
    image: '../Image/ItalianWeddingSoup.jpg',
     video: "../vid/bigmacsalad.mp4",
    tags: ['meatball', 'soup', 'italian', 'european'],
    categories: { cuisine: 'european', ingredient: ['beef', 'pasta-bread'], type: ['soups', 'carbs'] }
  },
  {
    key: 'NabeSoup',
    label: 'Nabe Cabbage Soup',
    image: '../Image/NabeSoup.jpg',
     video: "../vid/bigmacsalad.mp4",
    tags: ['nabe', 'hot pot', 'soup', 'japanese', 'asian'],
    categories: { cuisine: 'asian', ingredient: ['chicken', 'veg-protein'], type: ['soups', 'no-carbs'] } // verify protein mix
  },
  {
    key: 'RoastedTomatoSoup',
    label: 'Roasted Tomato Soup',
    image: '../Image/tomatosoup.png',
     video: "../vid/bigmacsalad.mp4",
    tags: ['tomato', 'soup', 'vegetarian', 'roasted'],
    categories: { cuisine: 'american', ingredient: ['veg-protein'], type: ['soups', 'no-carbs'] } // verify: no true protein
  },
  {
    key: 'Soondubujigae',
    label: 'Soondubujigae Soup',
    image: '../Image/Soondubu.jpg',
     video: "../vid/bigmacsalad.mp4",
    tags: ['tofu', 'soup', 'korean', 'asian', 'spicy'],
    categories: { cuisine: 'asian', ingredient: ['veg-protein', 'seafood'], type: ['soups', 'no-carbs'] } // verify seafood addition
  },
  {
    key: 'SopadeLentejas',
    label: 'Sopa de Lentejas Soup',
    image: '../Image/lentilsoup.jpg',
     video: "../vid/bigmacsalad.mp4",
    tags: ['lentil', 'soup', 'latin', 'vegetarian'],
    categories: { cuisine: 'latin', ingredient: ['veg-protein'], type: ['soups', 'no-carbs'] }
  },
  {
    key: 'TuscanSoup',
    label: 'Tuscan Soup',
    image: '../Image/TuscanSoup.jpg',
     video: "../vid/bigmacsalad.mp4",
    tags: ['sausage', 'potato', 'soup', 'italian', 'european'],
    categories: { cuisine: 'european', ingredient: ['pork'], type: ['soups', 'carbs'] } // verify sausage/potato
  },
  {
    key: 'TofuPot',
    label: 'Tofu Pot',
    image: '../Image/TofuPot.jpg',
     video: "../vid/bigmacsalad.mp4",
    tags: ['tofu', 'soup', 'asian', 'vegetarian'],
    categories: { cuisine: 'asian', ingredient: ['veg-protein'], type: ['soups', 'no-carbs'] }
  },

  // ── SALADS ───────────────────────────────────

  {
    key: 'BigMacSalad',
    label: 'Big Mac Salad',
    image: '../Image/tempimage_2.jpg',
    video: '../vid/bigmacsalad.mp4',
    tags: ['beef', 'salad', 'american', 'easy', 'quick'],
    categories: { cuisine: 'american', ingredient: ['beef', 'quick'], type: ['salads', 'no-carbs'] }
  },

  {
    key: 'CapreseSalad',
    label: 'Caprese Salad',
    image: '../Image/caprese.png',
     video: "../vid/bigmacsalad.mp4",
    tags: ['tomato', 'mozzarella', 'salad', 'italian', 'mediterranean', 'quick'],
    categories: { cuisine: 'mediterranean', ingredient: ['veg-protein', 'quick'], type: ['salads', 'no-carbs'] } // verify: no true protein
  },
  {
    key: 'CreamyCucumberSalad',
    label: 'Creamy Cucumber Salad',
    image: '../Image/CreamyCucumberSalad.jpg',
     video: "../vid/bigmacsalad.mp4",
    tags: ['cucumber', 'salad', 'american', 'quick'],
    categories: { cuisine: 'american', ingredient: ['veg-protein', 'quick'], type: ['salads', 'no-carbs'] } // verify: no true protein
  },
  {
    key: 'GreekChickpeaSalad',
    label: 'Greek Chickpea Salad',
    image: '../Image/GreekChickpeaSalad.jpg',
     video: "../vid/bigmacsalad.mp4",
    tags: ['chickpea', 'salad', 'greek', 'mediterranean', 'vegetarian'],
    categories: { cuisine: 'mediterranean', ingredient: ['veg-protein'], type: ['salads', 'no-carbs'] }
  },
  {
    key: 'KoreanSalad',
    label: 'Korean Salad',
    image: '../Image/KoreanSalad.jpg',
     video: "../vid/bigmacsalad.mp4",
    tags: ['salad', 'korean', 'asian'],
    categories: { cuisine: 'asian', ingredient: ['veg-protein'], type: ['salads', 'no-carbs'] } // verify main ingredient
  },
  {
    key: 'KoreanSpinachSalad',
    label: 'Korean Spinach Salad',
    image: '../Image/kspinach.png',
     video: "../vid/bigmacsalad.mp4",
    tags: ['spinach', 'salad', 'korean', 'asian', 'vegetarian', 'quick'],
    categories: { cuisine: 'asian', ingredient: ['veg-protein', 'quick'], type: ['salads', 'no-carbs'] } // verify: no true protein
  },
  {
    key: 'ThaiBeefLarbSalad',
    label: 'Thai Beef Larb Salad',
    image: '../Image/beeflarb.jpg',
     video: "../vid/bigmacsalad.mp4",
    tags: ['beef', 'larb', 'salad', 'thai', 'asian', 'spicy'],
    categories: { cuisine: 'asian', ingredient: ['beef'], type: ['salads', 'no-carbs'] }
  },
  {
    key: 'YamitsukiShioKyabetsu',
    label: 'Yamitsuki Shio Kyabetsu',
    image: '../Image/YamitsukiShioKyabetsu.jpg',
     video: "../vid/bigmacsalad.mp4",
    tags: ['cabbage', 'salad', 'japanese', 'asian', 'quick', 'vegetarian'],
    categories: { cuisine: 'asian', ingredient: ['veg-protein', 'quick'], type: ['salads', 'no-carbs'] } 
  },
    {
    key: 'ThaiStyleSalad',
    label: 'Thai Style Salad',
    image: '../Image/thaisalad.png',
     video: "../vid/bigmacsalad.mp4",
    tags: ['cabbage', 'salad', 'thai', 'asian', 'quick', 'vegetarian'],
    categories: { cuisine: 'asian', ingredient: ['veg-protein', 'quick'], type: ['salads', 'no-carbs'] } 
  },
  {
    key: 'CarrotSalad',
    label: 'Carrot Salad',
    image: '../Image/carrotsalad.png',
     video: "../vid/bigmacsalad.mp4",
    tags: ['carrot', 'salad', 'quick', 'vegetarian', 'asian', 'korean'],
    categories: { cuisine: 'asian', ingredient: ['veg-protein', 'quick'], type: ['salads', 'no-carbs'] } 
  },

  // ── CURRY ────────────────────────────────────

  {
    key: 'BeefVindaloo',
    label: 'Beef Vindaloo',
    image: '../Image/BeefVindaloo.jpg',
     video: "../vid/bigmacsalad.mp4",
    tags: ['beef', 'curry', 'indian', 'south-asian', 'spicy'],
    categories: { cuisine: 'south-asian', ingredient: ['beef'], type: ['curry'] }
  },
    {
    key: 'ButterChickenCurry',
    label: 'Butter Chicken Curry',
    image: '../Image/ButterChickenCurry.jpg',
     video: "../vid/bigmacsalad.mp4",
    tags: ['chicken', 'curry', 'indian', 'south-asian', 'spicy'],
    categories: { cuisine: 'south-asian', ingredient: ['chicken'], type: ['curry'] }
  },
  {
    key: 'DoroWat',
    label: 'Doro Wat',
    image: '../Image/DoroWat.jpg',
     video: "../vid/bigmacsalad.mp4",
    tags: ['chicken', 'ethiopian', 'african', 'curry', 'spicy', 'stew'],
    categories: { cuisine: 'african', ingredient: ['chicken'], type: ['curry'] }
  },
  {
    key: 'EggCurry',
    label: 'Egg Curry',
    image: '../Image/EggCurry.jpg',
     video: "../vid/bigmacsalad.mp4",
    tags: ['egg', 'curry', 'indian', 'south-asian'],
    categories: { cuisine: 'south-asian', ingredient: ['veg-protein'], type: ['curry'] }
  },
  {
    key: 'JapaneseCurry',
    label: 'Japanese Curry',
    image: '../Image/japcurry.png',
     video: "../vid/bigmacsalad.mp4",
    tags: ['curry', 'japanese', 'asian'],
    categories: { cuisine: 'asian', ingredient: ['chicken'], type: ['curry'] } // verify protein — beef/pork/chicken?
  },
  {
    key: 'PolloChileColorado',
    label: 'Pollo Con Chile Colorado',
    image: '../Image/Polloconchile.jpg',
     video: "../vid/bigmacsalad.mp4",
    tags: ['chicken', 'curry', 'mexican', 'latin', 'spicy'],
    categories: { cuisine: 'latin', ingredient: ['chicken'], type: ['curry'] }
  },
  {
    key: 'SriLankaDahl',
    label: 'Sri Lanka Dahl',
    image: '../Image/SriLankaDahl.jpg',
     video: "../vid/bigmacsalad.mp4",
    tags: ['lentil', 'dahl', 'curry', 'sri lankan', 'south-asian', 'vegetarian'],
    categories: { cuisine: 'south-asian', ingredient: ['veg-protein'], type: ['curry'] }
  },



  // ── CARBS ────────────────────────────────────

  {
    key: 'BakedLoadedPotato',
    label: 'Baked Loaded Potato',
    image: '../Image/BakedLoadedPotato.jpg',
     video: "../vid/bigmacsalad.mp4",
    tags: ['potato', 'bacon', 'cheese', 'american'],
    categories: { cuisine: 'american', ingredient: ['pork'], type: ['carbs'] } // verify bacon
  },
  {
    key: 'Burrito',
    label: 'Burrito',
    image: '../Image/burrito.png',
     video: "../vid/bigmacsalad.mp4",
    tags: ['burrito', 'mexican', 'latin'],
    categories: { cuisine: 'latin', ingredient: ['beef', 'pasta-bread'], type: ['carbs'] } // verify protein
  },
  {
    key: 'FriedRice',
    label: 'Fried Rice',
    image: '../Image/FriedRice.jpg',
     video: "../vid/bigmacsalad.mp4",
    tags: ['rice', 'fried rice', 'asian', 'quick'],
    categories: { cuisine: 'asian', ingredient: ['rice', 'quick'], type: ['carbs'] }
  },
  /*{
    key: 'Gyudon',
    label: 'Gyudon',
    image: '../Image/Gyudon.jpg',
     video: "../vid/bigmacsalad.mp4",
    tags: ['beef', 'rice', 'gyudon', 'japanese', 'asian'],
    categories: { cuisine: 'asian', ingredient: ['beef', 'rice'], type: ['carbs'] }
  },*/
  /*{
    key: 'HomemadePasta',
    label: 'Homemade Pasta',
    image: '../Image/HomemadePasta.jpg',
     video: "../vid/bigmacsalad.mp4",
    tags: ['pasta', 'homemade', 'italian', 'european'],
    categories: { cuisine: 'european', ingredient: ['pasta-bread'], type: ['carbs'] }
  },*/
  /*{
    key: 'Kabsa',
    label: 'Kabsa',
    image: '../Image/Kabsa.jpg',
     video: "../vid/bigmacsalad.mp4",
    tags: ['chicken', 'rice', 'kabsa', 'arab'],
    categories: { cuisine: 'arab', ingredient: ['chicken', 'rice'], type: ['carbs'] }
  },*/
  {
    key: 'LazyChickenBiryani',
    label: 'Lazy Chicken Biryani',
    image: '../Image/LazyChickenBiryani.jpg',
     video: "../vid/bigmacsalad.mp4",
    tags: ['chicken', 'rice', 'biryani', 'indian', 'south-asian', 'quick', 'easy'],
    categories: { cuisine: 'south-asian', ingredient: ['chicken', 'rice', 'quick'], type: ['carbs'] }
  },
  {
    key: 'MiniMeatballPasta',
    label: 'Mini Meatball Pasta',
    image: '../Image/MiniMeatballPasta.jpg',
     video: "../vid/bigmacsalad.mp4",
    tags: ['meatball', 'pasta', 'italian', 'european'],
    categories: { cuisine: 'european', ingredient: ['beef', 'pasta-bread'], type: ['carbs'] }
  },
  {
    key: 'Okonomiyaki',
    label: 'Okonomiyaki',
    image: '../Image/okonomi.jpg',
     video: "../vid/bigmacsalad.mp4",
    tags: ['okonomiyaki', 'japanese', 'asian', 'savory pancake'],
    categories: { cuisine: 'asian', ingredient: ['pork', 'pasta-bread'], type: ['carbs'] } // verify protein
  },
  {
    key: 'PastaAlPomodoro',
    label: 'Pasta al Pomodoro',
    image: '../Image/pasatapomodoro.png',
     video: "../vid/bigmacsalad.mp4",
    tags: ['pasta', 'tomato', 'italian', 'european', 'quick', 'vegetarian'],
    categories: { cuisine: 'european', ingredient: ['pasta-bread', 'quick'], type: ['carbs'] }
  },
  {
    key: 'RedBeansAndRice',
    label: 'Red Beans & Rice',
    image: '../Image/RedBeansAndRice.jpg',
     video: "../vid/bigmacsalad.mp4",
    tags: ['beans', 'rice', 'american', 'cajun'],
    categories: { cuisine: 'american', ingredient: ['rice', 'veg-protein'], type: ['carbs'] }
  },
  {
    key: 'RiceBowl',
    label: 'Rice Bowl',
    image: '../Image/ricebowl.jpg',
     video: "../vid/bigmacsalad.mp4",
    tags: ['rice', 'bowl', 'quick', 'asian'],
    categories: { cuisine: 'asian', ingredient: ['rice', 'quick'], type: ['carbs'] } // verify protein
  },
  {
    key: 'RiceCookerBowl',
    label: 'Rice Cooker Bowl',
    image: '../Image/RiceCookerBowl.jpg',
     video: "../vid/bigmacsalad.mp4",
    tags: ['rice', 'bowl', 'quick', 'easy', 'asian'],
    categories: { cuisine: 'asian', ingredient: ['rice', 'quick'], type: ['carbs'] } // verify protein
  },
  /*{
    key: 'Roti',
    label: 'Roti',
    image: '../Image/Roti.jpg',
     video: "../vid/bigmacsalad.mp4",
    tags: ['roti', 'flatbread', 'indian', 'south-asian'],
    categories: { cuisine: 'south-asian', ingredient: ['pasta-bread'], type: ['carbs'] }
  },*/
  {
    key: 'SriLankanNoodles',
    label: 'Sri Lankan Noodles',
    image: '../Image/SriLankanNoodles.jpg',
     video: "../vid/bigmacsalad.mp4",
    tags: ['noodles', 'sri lankan', 'south-asian'],
    categories: { cuisine: 'south-asian', ingredient: ['pasta-bread'], type: ['carbs'] } // verify protein
  },
  {
    key: 'SpaghettiWithMeatSauce',
    label: 'Spaghetti with Meat Sauce',
    image: '../Image/SpaghettiWithMeatSauce.jpg',
     video: "../vid/bigmacsalad.mp4",
    tags: ['spaghetti', 'beef', 'pasta', 'italian', 'european'],
    categories: { cuisine: 'european', ingredient: ['beef', 'pasta-bread'], type: ['carbs'] }
  },
  {
    key: 'StreetTacos',
    label: 'Street Tacos',
    image: '../Image/Tacos.jpg',
     video: "../vid/bigmacsalad.mp4",
    tags: ['tacos', 'mexican', 'latin'],
    categories: { cuisine: 'latin', ingredient: ['beef', 'pasta-bread'], type: ['carbs'] } // verify protein
  },
  {
    key: 'SweetChiliChickenRiceBowl',
    label: 'Sweet Chili Chicken Rice Bowl',
    image: '../Image/chilichicken.jpg',
     video: "../vid/bigmacsalad.mp4",
    tags: ['chicken', 'rice', 'sweet chili', 'asian'],
    categories: { cuisine: 'asian', ingredient: ['chicken', 'rice'], type: ['carbs'] }
  },
  {
    key: 'UmamiSeaweedRiceRolls',
    label: 'Umami Seaweed Rice Rolls',
    image: '../Image/UmamiSeaweedRiceRolls.jpg',
     video: "../vid/bigmacsalad.mp4",
    tags: ['rice', 'seaweed', 'rolls', 'asian'],
    categories: { cuisine: 'asian', ingredient: ['rice', 'seafood'], type: ['carbs'] } // verify: veg or seafood?
  },
  {
    key: 'TortaDeAsada',
    label: 'Torta de Asada',
    image: '../Image/TortaDeAsada.jpg',
     video: "../vid/bigmacsalad.mp4",
    tags: ['torta', 'carne asada', 'beef', 'sandwich', 'mexican', 'latin'],
    categories: { cuisine: 'latin', ingredient: ['beef', 'pasta-bread'], type: ['carbs'] }
  },

  // ── NO CARB ──────────────────────────────────

  {
    key: 'AsianMarinade',
    label: 'Asian Marinade',
    image: '../Image/kbbq.png',
     video: "../vid/bigmacsalad.mp4",
    tags: ['marinade', 'asian', 'quick'],
    categories: { cuisine: 'asian', ingredient: ['quick'], type: ['no-carbs'] } // verify protein pairing
  },
  {
    key: 'BokChoy',
    label: 'Blanched Bokchoy With Garlic Sauce',
    image: '../Image/Bokchoy.jpg',
     video: "../vid/bigmacsalad.mp4",
    tags: ['bok choy', 'asian', 'vegetarian', 'quick'],
    categories: { cuisine: 'asian', ingredient: ['veg-protein', 'quick'], type: ['no-carbs'] } 
  },
  {
    key: 'BuffaloWings',
    label: 'Buffalo Wings',
    image: '../Image/BuffaloWings.jpg',
     video: "../vid/bigmacsalad.mp4",
    tags: ['chicken', 'wings', 'buffalo', 'american', 'spicy'],
    categories: { cuisine: 'american', ingredient: ['chicken'], type: ['no-carbs'] }
  },

  {
  key: 'BuffaloChickenWrap',
  label: 'Buffalo Chicken Wrap',
     image: '../Image/Buffalonwrap.JPEG',
     video: "../vid/bigmacsalad.mp4",
  tags: ['chicken', 'buffalo', 'american', 'spicy', 'wrap', 'ranch'],
  categories: {
    cuisine: 'american',
    ingredient: ['chicken'],
    type: ['carbs']
  }
},

    {
  key: 'LoadedBuffaloChickenBakedPotato',
  label: 'Loaded Buffalo Chicken Baked Potato',
     image: '../Image/Buffaloloadedbakedpotato.JPEG',
     video: "../vid/bigmacsalad.mp4",
  tags: ['chicken', 'buffalo', 'american', 'spicy', 'potato', 'ranch'],
  categories: {
    cuisine: 'american',
    ingredient: ['chicken'],
    type: ['carbs']
  }
},
  {
    key: 'ChickenTinga',
    label: 'Chicken Tinga',
    image: '../Image/tinga.jpg',
     video: "../vid/bigmacsalad.mp4",
    tags: ['chicken', 'mexican', 'latin', 'spicy', 'easy', 'tomato'],
    categories: { cuisine: 'latin', ingredient: ['chicken'], type: ['no-carbs'] } 
  },
  {
    key: 'ChineseSteamedEgg',
    label: 'Chinese Steamed Egg',
    image: '../Image/ChineseSteamedEgg.jpg',
     video: "../vid/bigmacsalad.mp4",
    tags: ['egg', 'steamed', 'chinese', 'asian'],
    categories: { cuisine: 'asian', ingredient: ['veg-protein'], type: ['no-carbs'] }
  },
 /* {
    key: 'EthiopianBeefTibs',
    label: 'Ethiopian Beef Tibs',
    image: '../Image/EthiopianBeefTibs.jpg',
     video: "../vid/bigmacsalad.mp4",
    tags: ['beef', 'tibs', 'ethiopian', 'african', 'spicy'],
    categories: { cuisine: 'african', ingredient: ['beef'], type: ['no-carbs'] }
  },*/
  {
    key: 'Sofritas',
    label: 'Sofritas',
    image: '../Image/Sofrita.JPEG',
     video: "../vid/bigmacsalad.mp4",
    tags: ['sofrita', 'latin'],
    categories: { cuisine: 'latin', ingredient: ['veg-protein'], type: ['no-carbs'] } // verify: tofu-based?
  },
  {
    key: 'ThaiChickenSatay',
    label: 'Thai Chicken Satay',
    image: '../Image/satay.png',
     video: "../vid/bigmacsalad.mp4",
    tags: ['chicken', 'satay', 'thai', 'asian'],
    categories: { cuisine: 'asian', ingredient: ['chicken'], type: ['no-carbs'] }
  },
  {
    key: 'RoastedRedCabbage',
    label: 'Roasted Red Cabbage',
    image: '../Image/RoastedRedCabbage.jpg',
     video: "../vid/bigmacsalad.mp4",
    tags: ['cabbage', 'roasted', 'vegetarian'],
    categories: { cuisine: 'american', ingredient: ['veg-protein'], type: ['no-carbs'] } 
  },

  // ── DESSERT ──────────────────────────────────

  {
    key: 'ChocoChipCookie',
    label: 'Chocolate Chip Cookie',
    image: '../Image/ChocoChipCookie.jpg',
     video: "../vid/bigmacsalad.mp4",
    tags: ['cookie', 'chocolate chip', 'american', 'dessert'],
    categories: { cuisine: 'american', ingredient: ['pasta-bread'], type: ['dessert'] } 
  },
  {
    key: 'Kompot',
    label: 'Kompot',
    image: '../Image/Kompot.jpg',
    video: "../vid/bigmacsalad.mp4",
    tags: ['kompot', 'fruit', 'drink', 'european', 'dessert'],
    categories: { cuisine: 'european', ingredient: ['quick'], type: ['dessert'] } 
  },

];
