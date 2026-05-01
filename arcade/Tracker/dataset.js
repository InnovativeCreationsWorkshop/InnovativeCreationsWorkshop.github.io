// =========================
// CATEGORY VALUES
// =========================
const CATEGORY_VALUES = {
    protein: 5,
    veg: 3,
    hydration: 2,
    carbs: -1,
    diabeticDessert: -40,
    dessert: -2
};

// =========================
// FOOD DATASET
// =========================
const foodDataset = {
    // Protein
    "chicken": { category: "protein", value: CATEGORY_VALUES.protein },
    "beef": { category: "protein", value: CATEGORY_VALUES.protein },
    "pork": { category: "protein", value: CATEGORY_VALUES.protein },
    "bacon": { category: "protein", value: CATEGORY_VALUES.protein },
    "shrimp": { category: "protein", value: CATEGORY_VALUES.protein },
    "salmon": { category: "protein", value: CATEGORY_VALUES.protein },
    "fish": { category: "protein", value: CATEGORY_VALUES.protein },
    "tuna": { category: "protein", value: CATEGORY_VALUES.protein },
    "beans": { category: "protein", value: CATEGORY_VALUES.protein },
    "black beans": { category: "protein", value: CATEGORY_VALUES.protein },
    "kidney beans": { category: "protein", value: CATEGORY_VALUES.protein },
    "eggs": { category: "protein", value: CATEGORY_VALUES.protein },
    "hard boiled eggs": { category: "protein", value: CATEGORY_VALUES.protein },
    "soft boiled eggs": { category: "protein", value: CATEGORY_VALUES.protein },
    "scrambled eggs": { category: "protein", value: CATEGORY_VALUES.protein },
    "fried eggs": { category: "protein", value: CATEGORY_VALUES.protein },
    "steamed eggs": { category: "protein", value: CATEGORY_VALUES.protein },
    "turkey": { category: "protein", value: CATEGORY_VALUES.protein },
    "ham": { category: "protein", value: CATEGORY_VALUES.protein },
    "tofu": { category: "protein", value: CATEGORY_VALUES.protein },
    "lentils": { category: "protein", value: CATEGORY_VALUES.protein },
    "chickpeas": { category: "protein", value: CATEGORY_VALUES.protein },
    "almonds": { category: "protein", value: CATEGORY_VALUES.protein },
    "cheese": { category: "protein", value: CATEGORY_VALUES.protein },

    // Veg
    "broccoli": { category: "veg", value: CATEGORY_VALUES.veg },
    "carrot": { category: "veg", value: CATEGORY_VALUES.veg },
    "tomato": { category: "veg", value: CATEGORY_VALUES.veg },
    "cucumber": { category: "veg", value: CATEGORY_VALUES.veg },
    "lettuce": { category: "veg", value: CATEGORY_VALUES.veg },
    "romaine lettuce": { category: "veg", value: CATEGORY_VALUES.veg },
    "iceberg lettuce": { category: "veg", value: CATEGORY_VALUES.veg },
    "onion": { category: "veg", value: CATEGORY_VALUES.veg },
    "green onion": { category: "veg", value: CATEGORY_VALUES.veg },
    "red onion": { category: "veg", value: CATEGORY_VALUES.veg },
    "white onion": { category: "veg", value: CATEGORY_VALUES.veg },
    "yellow onion": { category: "veg", value: CATEGORY_VALUES.veg },
    "leek": { category: "veg", value: CATEGORY_VALUES.veg },
    "jalapeno": { category: "veg", value: CATEGORY_VALUES.veg },
    "serrano": { category: "veg", value: CATEGORY_VALUES.veg },
    "thai chilis": { category: "veg", value: CATEGORY_VALUES.veg },
    "spinach": { category: "veg", value: CATEGORY_VALUES.veg },
    "kale": { category: "veg", value: CATEGORY_VALUES.veg },
    "zucchini": { category: "veg", value: CATEGORY_VALUES.veg },
    "bell pepper": { category: "veg", value: CATEGORY_VALUES.veg },
    "asparagus": { category: "veg", value: CATEGORY_VALUES.veg },
    "green beans": { category: "veg", value: CATEGORY_VALUES.veg },
    "peas": { category: "veg", value: CATEGORY_VALUES.veg },
    "corn": { category: "veg", value: CATEGORY_VALUES.veg },
    "cabbage": { category: "veg", value: CATEGORY_VALUES.veg },
    "cauliflower": { category: "veg", value: CATEGORY_VALUES.veg },
    "mushroom": { category: "veg", value: CATEGORY_VALUES.veg },
    "mixed veggies": { category: "veg", value: CATEGORY_VALUES.veg },
    "potato": { category: "veg", value: CATEGORY_VALUES.veg },

    // Hydration
    "water": { category: "hydration", value: CATEGORY_VALUES.hydration },
    "orange juice": { category: "hydration", value: CATEGORY_VALUES.hydration },
    "tea": { category: "hydration", value: CATEGORY_VALUES.hydration },
    "coffee": { category: "hydration", value: CATEGORY_VALUES.hydration },
    "milk": { category: "hydration", value: CATEGORY_VALUES.hydration },
    "almond milk": { category: "hydration", value: CATEGORY_VALUES.hydration },
    "olipop": { category: "hydration", value: CATEGORY_VALUES.hydration },
    "lemon water": { category: "hydration", value: CATEGORY_VALUES.hydration },
    "sparkling water": { category: "hydration", value: CATEGORY_VALUES.hydration },

    // Carbs
    "bread": { category: "carbs", value: CATEGORY_VALUES.carbs },
    "rice": { category: "carbs", value: CATEGORY_VALUES.carbs },
    "pasta": { category: "carbs", value: CATEGORY_VALUES.carbs },
    "noodles": { category: "carbs", value: CATEGORY_VALUES.carbs },
    "oats": { category: "carbs", value: CATEGORY_VALUES.carbs },
    "cereal": { category: "carbs", value: CATEGORY_VALUES.carbs },
    "bagel": { category: "carbs", value: CATEGORY_VALUES.carbs },
    "tortilla": { category: "carbs", value: CATEGORY_VALUES.carbs },
    "pizza": { category: "carbs", value: CATEGORY_VALUES.carbs },
    "burger bun": { category: "carbs", value: CATEGORY_VALUES.carbs },
    "fries": { category: "carbs", value: CATEGORY_VALUES.carbs },
    "chips": { category: "carbs", value: CATEGORY_VALUES.carbs },
    "crackers": { category: "carbs", value: CATEGORY_VALUES.carbs },
    "granola": { category: "carbs", value: CATEGORY_VALUES.carbs },
    "quinoa": { category: "carbs", value: CATEGORY_VALUES.carbs }
};

// =========================
// MEAL DATASET
// (duplicates removed)
// =========================
const mealDataset = {
    "taco": ["protein", "veg", "carbs"],
    "taco salad": ["protein", "veg"],
    "taco bowl": ["protein", "veg", "carbs"],
    "burrito": ["protein", "veg", "carbs"],
    "enchiladas": ["protein", "carbs"],
    "quesadilla": ["protein", "carbs"],
    "burger": ["protein", "carbs"],
    "sandwich": ["protein", "carbs"],
    "salad": ["veg"],
    "toast": ["carbs"],
    "pizza": ["carbs", "protein"],
    "pasta": ["carbs"],
    "lasagna": ["carbs", "protein"],
    "stir fry": ["protein", "veg"],
    "fried rice": ["protein", "veg", "carbs"],
    "ramen": ["protein", "carbs"],
    "cup noodle": ["carbs"],
    "onigiri": ["carbs"],
    "katsu": ["protein"],
    "miso soup": ["hydration"],
    "egg drop soup": ["protein", "hydration"],
    "dumplings": ["protein", "carbs"],
    "curry": ["protein", "veg"],
    "biriyani": ["protein", "carbs"],
    "soup": ["protein", "veg"],
    "lentil soup": ["protein", "veg"],
    "beef stew": ["protein", "veg"],
    "jambalaya": ["protein", "carbs"],
    "chili": ["protein", "veg"],
    "pho": ["protein", "veg", "carbs"],
    "pad thai": ["protein", "veg", "carbs"],
    "bibimbap": ["protein", "veg", "carbs"],
    "sushi": ["protein", "carbs"],
    "paella": ["protein", "veg", "carbs"],
    "falafel": ["protein", "veg", "carbs"],
    "shawarma": ["protein", "veg", "carbs"],
    "kebab": ["protein", "veg"],
    "shakshuka": ["protein", "veg"],
    "ceviche": ["protein", "veg"],
    "tamales": ["protein", "carbs"],
    "mac and cheese": ["protein", "carbs"],
    "meatloaf": ["protein", "veg"],
    "clam chowder": ["protein", "hydration"],
    "chicken pot pie": ["protein", "veg", "carbs"],
    "bbq ribs": ["protein"],
    "grilled cheese": ["protein", "veg", "carbs"],
    "hot dog": ["protein", "carbs"],
    "charcuterie": ["protein", "carbs"],
    "chips and salsa": ["veg", "carbs"]
};

// =========================
// DIABETIC DESSERTS (-40)
// =========================
const diabeticFriendlyDesserts = {
    "blackberries": { category: "dessert", value: CATEGORY_VALUES.diabeticDessert },
    "raspberries": { category: "dessert", value: CATEGORY_VALUES.diabeticDessert },
    "strawberries": { category: "dessert", value: CATEGORY_VALUES.diabeticDessert },
    "blueberries": { category: "dessert", value: CATEGORY_VALUES.diabeticDessert },
    "kiwi": { category: "dessert", value: CATEGORY_VALUES.diabeticDessert },
    "watermelon": { category: "dessert", value: CATEGORY_VALUES.diabeticDessert },
    "cantaloupe": { category: "dessert", value: CATEGORY_VALUES.diabeticDessert },
    "honeydew": { category: "dessert", value: CATEGORY_VALUES.diabeticDessert },
    "grapes": { category: "dessert", value: CATEGORY_VALUES.diabeticDessert },
    "frozen yogurt unsweetened": { category: "dessert", value: CATEGORY_VALUES.diabeticDessert },
    "sugar-free gelatin": { category: "dessert", value: CATEGORY_VALUES.diabeticDessert },
    "chia pudding sugar-free": { category: "dessert", value: CATEGORY_VALUES.diabeticDessert },
    "greek yogurt plain": { category: "dessert", value: CATEGORY_VALUES.diabeticDessert },
    "nuts and berries": { category: "dessert", value: CATEGORY_VALUES.diabeticDessert },
    "fruit salad sugar-free": { category: "dessert", value: CATEGORY_VALUES.diabeticDessert },
    "sugar-free ice cream": { category: "dessert", value: CATEGORY_VALUES.diabeticDessert }
};

// =========================
// NON-DIABETIC DESSERTS (-2)
// =========================
const nonDiabeticDesserts = {
    "chocolate cake": { category: "dessert", value: CATEGORY_VALUES.dessert },
    "chocolate": { category: "dessert", value: CATEGORY_VALUES.dessert },
    "hot chocolate": { category: "dessert", value: CATEGORY_VALUES.dessert },
    "cheesecake": { category: "dessert", value: CATEGORY_VALUES.dessert },
    "ice cream": { category: "dessert", value: CATEGORY_VALUES.dessert },
    "brownies": { category: "dessert", value: CATEGORY_VALUES.dessert },
    "cupcakes": { category: "dessert", value: CATEGORY_VALUES.dessert },
    "cookies": { category: "dessert", value: CATEGORY_VALUES.dessert },
    "donut": { category: "dessert", value: CATEGORY_VALUES.dessert },
    "candy": { category: "dessert", value: CATEGORY_VALUES.dessert },
    "fudge": { category: "dessert", value: CATEGORY_VALUES.dessert },
    "pudding": { category: "dessert", value: CATEGORY_VALUES.dessert },
    "pie": { category: "dessert", value: CATEGORY_VALUES.dessert },
    "apple pie": { category: "dessert", value: CATEGORY_VALUES.dessert },
    "banana bread": { category: "dessert", value: CATEGORY_VALUES.dessert },
    "cinnamon rolls": { category: "dessert", value: CATEGORY_VALUES.dessert },
    "tiramisu": { category: "dessert", value: CATEGORY_VALUES.dessert },
    "gelato": { category: "dessert", value: CATEGORY_VALUES.dessert },
    "macarons": { category: "dessert", value: CATEGORY_VALUES.dessert },
    "pop tarts": { category: "dessert", value: CATEGORY_VALUES.dessert },
    "cake pops": { category: "dessert", value: CATEGORY_VALUES.dessert },
    "waffles": { category: "dessert", value: CATEGORY_VALUES.dessert },
    "pancakes": { category: "dessert", value: CATEGORY_VALUES.dessert },
    "cake": { category: "dessert", value: CATEGORY_VALUES.dessert },
    "mcflurry": { category: "dessert", value: CATEGORY_VALUES.dessert },
    "boba": { category: "dessert", value: CATEGORY_VALUES.dessert },
    "milk shake": { category: "dessert", value: CATEGORY_VALUES.dessert },
    "bakery treat": { category: "dessert", value: CATEGORY_VALUES.dessert },
    "ferrero rocher": { category: "dessert", value: CATEGORY_VALUES.dessert }
};
