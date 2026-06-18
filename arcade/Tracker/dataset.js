// =====================================================================
// FOOD / MEAL / DESSERT DATASET + LOOKUP SYSTEM
// =====================================================================
//
// HOW IT WORKS:
// - All lookups go through normalize() -> lowercase, trims, collapses
//   whitespace, strips punctuation, converts "&" to "and".
// - resolveKey() checks: exact match -> alias map -> singular/plural
//   fallback (so "carrots" matches "carrot" without a duplicate entry).
// - findMatch() additionally strips "modifier" words (grilled, fresh,
//   chopped, etc.) from either end before retrying, so
//   "grilled chicken breast" -> "chicken breast".
//
// TO ADD A NEW ITEM: add one canonical entry to the relevant dataset,
// then add any synonyms/abbreviations/misspellings to the matching
// alias map pointing at that canonical key. You almost never need to
// add plural forms separately.
// =====================================================================


// =====================================================================
// SHARED UTILITIES
// =====================================================================

const IGNORABLE_MODIFIERS = new Set([
    "grilled", "baked", "fried", "pan-fried", "panfried", "steamed",
    "roasted", "boiled", "raw", "cooked", "fresh", "frozen", "organic",
    "large", "small", "extra", "diced", "chopped", "sliced", "minced",
    "shredded", "whole", "lean", "skinless", "boneless", "smoked",
    "cured", "homemade", "leftover", "leftovers", "spicy", "sweet",
    "sour", "plain", "unsweetened", "sweetened", "mini", "big", "jumbo",
    "cold", "hot", "warm", "crispy", "crunchy", "soft", "hard", "fancy",
    "side", "of", "a", "an", "the", "some", "bowl", "plate", "cup"
]);

/** Lowercase, trim, strip punctuation, normalize "&" -> "and". */
function normalize(str) {
    if (!str) return "";
    return str
        .toLowerCase()
        .replace(/&/g, " and ")
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, " ")
        .trim();
}

/**
 * Resolve a normalized string against a dataset + alias map.
 * Tries: exact match -> alias -> alias-of-alias -> de-pluralize -> pluralize.
 * Returns the canonical dataset key, or null.
 */
function resolveKey(normalizedInput, dataset, aliases) {
    if (dataset[normalizedInput]) return normalizedInput;

    if (aliases[normalizedInput]) {
        const target = aliases[normalizedInput];
        if (dataset[target]) return target;
        if (aliases[target] && dataset[aliases[target]]) return aliases[target];
    }

    // De-pluralize: "tomatoes" -> "tomato", "carrots" -> "carrot", "beans" -> "bean"
    const candidates = [];
    if (normalizedInput.endsWith("ies")) {
        candidates.push(normalizedInput.slice(0, -3) + "y");
    }
    if (normalizedInput.endsWith("es")) {
        candidates.push(normalizedInput.slice(0, -2));
    }
    if (normalizedInput.endsWith("s")) {
        candidates.push(normalizedInput.slice(0, -1));
    }
    // Pluralize: input "carrot" -> dataset key "carrots" (if that's how it's stored)
    candidates.push(normalizedInput + "s");

    for (const candidate of candidates) {
        if (dataset[candidate]) return candidate;
        if (aliases[candidate] && dataset[aliases[candidate]]) return aliases[candidate];
    }

    return null;
}

/**
 * Full match pipeline: normalize -> resolveKey -> strip modifier words -> resolveKey again.
 */
function findMatch(rawInput, dataset, aliases) {
    const normalized = normalize(rawInput);
    if (!normalized) return null;

    let key = resolveKey(normalized, dataset, aliases);
    if (key) return key;

    const words = normalized.split(" ");
    let start = 0;
    let end = words.length;
    while (start < end - 1 && IGNORABLE_MODIFIERS.has(words[start])) start++;
    while (end > start + 1 && IGNORABLE_MODIFIERS.has(words[end - 1])) end--;

    if (start > 0 || end < words.length) {
        const stripped = words.slice(start, end).join(" ");
        key = resolveKey(stripped, dataset, aliases);
        if (key) return key;
    }

    return null;
}


// =====================================================================
// FOOD DATASET (individual ingredients)
// =====================================================================

const foodDataset = {
    // ---- Protein (value: 10) ----
    "chicken": { category: "protein", value: 10 },
    "chicken breast": { category: "protein", value: 10 },
    "chicken thigh": { category: "protein", value: 10 },
    "chicken drumstick": { category: "protein", value: 10 },
    "chicken wing": { category: "protein", value: 10 },
    "ground chicken": { category: "protein", value: 10 },
    "rotisserie chicken": { category: "protein", value: 10 },
    "beef": { category: "protein", value: 10 },
    "ground beef": { category: "protein", value: 10 },
    "steak": { category: "protein", value: 10 },
    "ribeye": { category: "protein", value: 10 },
    "sirloin": { category: "protein", value: 10 },
    "brisket": { category: "protein", value: 10 },
    "short ribs": { category: "protein", value: 10 },
    "pork": { category: "protein", value: 10 },
    "pork chop": { category: "protein", value: 10 },
    "pork tenderloin": { category: "protein", value: 10 },
    "pork belly": { category: "protein", value: 10 },
    "bacon": { category: "protein", value: 10 },
    "turkey bacon": { category: "protein", value: 10 },
    "sausage": { category: "protein", value: 10 },
    "breakfast sausage": { category: "protein", value: 10 },
    "hot dog": { category: "protein", value: 10 },
    "ham": { category: "protein", value: 10 },
    "deli ham": { category: "protein", value: 10 },
    "turkey": { category: "protein", value: 10 },
    "ground turkey": { category: "protein", value: 10 },
    "deli turkey": { category: "protein", value: 10 },
    "duck": { category: "protein", value: 10 },
    "lamb": { category: "protein", value: 10 },
    "lamb chop": { category: "protein", value: 10 },
    "venison": { category: "protein", value: 10 },
    "bison": { category: "protein", value: 10 },
    "rabbit": { category: "protein", value: 10 },
    "shrimp": { category: "protein", value: 10 },
    "crab": { category: "protein", value: 10 },
    "lobster": { category: "protein", value: 10 },
    "scallop": { category: "protein", value: 10 },
    "mussel": { category: "protein", value: 10 },
    "clam": { category: "protein", value: 10 },
    "oyster": { category: "protein", value: 10 },
    "salmon": { category: "protein", value: 10 },
    "tuna": { category: "protein", value: 10 },
    "tilapia": { category: "protein", value: 10 },
    "cod": { category: "protein", value: 10 },
    "halibut": { category: "protein", value: 10 },
    "trout": { category: "protein", value: 10 },
    "mackerel": { category: "protein", value: 10 },
    "sardine": { category: "protein", value: 10 },
    "anchovy": { category: "protein", value: 10 },
    "fish": { category: "protein", value: 10 },
    "eel": { category: "protein", value: 10 },
    "egg": { category: "protein", value: 10 },
    "egg white": { category: "protein", value: 10 },
    "tofu": { category: "protein", value: 10 },
    "firm tofu": { category: "protein", value: 10 },
    "silken tofu": { category: "protein", value: 10 },
    "tempeh": { category: "protein", value: 10 },
    "seitan": { category: "protein", value: 10 },
    "edamame": { category: "protein", value: 10 },
    "bean": { category: "protein", value: 10 },
    "black bean": { category: "protein", value: 10 },
    "kidney bean": { category: "protein", value: 10 },
    "pinto bean": { category: "protein", value: 10 },
    "white bean": { category: "protein", value: 10 },
    "cannellini bean": { category: "protein", value: 10 },
    "navy bean": { category: "protein", value: 10 },
    "chickpea": { category: "protein", value: 10 },
    "lentil": { category: "protein", value: 10 },
    "peanut": { category: "protein", value: 10 },
    "peanut butter": { category: "protein", value: 10 },
    "almond": { category: "protein", value: 10 },
    "almond butter": { category: "protein", value: 10 },
    "walnut": { category: "protein", value: 10 },
    "cashew": { category: "protein", value: 10 },
    "pistachio": { category: "protein", value: 10 },
    "pecan": { category: "protein", value: 10 },
    "sunflower seed": { category: "protein", value: 10 },
    "pumpkin seed": { category: "protein", value: 10 },
    "chia seed": { category: "protein", value: 10 },
    "hemp seed": { category: "protein", value: 10 },
    "flax seed": { category: "protein", value: 10 },
    "cheese": { category: "protein", value: 10 },
    "cheddar": { category: "protein", value: 10 },
    "mozzarella": { category: "protein", value: 10 },
    "parmesan": { category: "protein", value: 10 },
    "feta": { category: "protein", value: 10 },
    "goat cheese": { category: "protein", value: 10 },
    "string cheese": { category: "protein", value: 10 },
    "cottage cheese": { category: "protein", value: 10 },
    "ricotta": { category: "protein", value: 10 },
    "greek yogurt": { category: "protein", value: 10 },
    "yogurt": { category: "protein", value: 10 },
    "protein shake": { category: "protein", value: 10 },
    "protein bar": { category: "protein", value: 10 },
    "protein powder": { category: "protein", value: 10 },
    "jerky": { category: "protein", value: 10 },
    "deli meat": { category: "protein", value: 10 },
    "salami": { category: "protein", value: 10 },
    "pepperoni": { category: "protein", value: 10 },
    "chorizo": { category: "protein", value: 10 },
    "meatball": { category: "protein", value: 10 },
    "protein": { category: "protein", value: 10 },
    "meat": { category: "protein", value: 10 },

    // ---- Veg (value: 5, generic/dense veg: 7) ----
    "broccoli": { category: "veg", value: 5 },
    "carrot": { category: "veg", value: 5 },
    "tomato": { category: "veg", value: 5 },
    "cherry tomato": { category: "veg", value: 5 },
    "cucumber": { category: "veg", value: 5 },
    "lettuce": { category: "veg", value: 5 },
    "romaine lettuce": { category: "veg", value: 5 },
    "iceberg lettuce": { category: "veg", value: 5 },
    "butter lettuce": { category: "veg", value: 5 },
    "spinach": { category: "veg", value: 5 },
    "kale": { category: "veg", value: 5 },
    "arugula": { category: "veg", value: 5 },
    "swiss chard": { category: "veg", value: 5 },
    "collard greens": { category: "veg", value: 5 },
    "mustard greens": { category: "veg", value: 5 },
    "watercress": { category: "veg", value: 5 },
    "onion": { category: "veg", value: 5 },
    "green onion": { category: "veg", value: 5 },
    "red onion": { category: "veg", value: 5 },
    "white onion": { category: "veg", value: 5 },
    "yellow onion": { category: "veg", value: 5 },
    "shallot": { category: "veg", value: 5 },
    "leek": { category: "veg", value: 5 },
    "garlic": { category: "veg", value: 5 },
    "ginger": { category: "veg", value: 5 },
    "cilantro": { category: "veg", value: 5 },
    "jalapeno": { category: "veg", value: 5 },
    "serrano": { category: "veg", value: 5 },
    "habanero": { category: "veg", value: 5 },
    "poblano": { category: "veg", value: 5 },
    "thai chili": { category: "veg", value: 5 },
    "chili pepper": { category: "veg", value: 5 },
    "bell pepper": { category: "veg", value: 5 },
    "zucchini": { category: "veg", value: 5 },
    "yellow squash": { category: "veg", value: 5 },
    "butternut squash": { category: "veg", value: 5 },
    "acorn squash": { category: "veg", value: 5 },
    "pumpkin": { category: "veg", value: 5 },
    "asparagus": { category: "veg", value: 5 },
    "green bean": { category: "veg", value: 5 },
    "snap pea": { category: "veg", value: 5 },
    "snow pea": { category: "veg", value: 5 },
    "pea": { category: "veg", value: 5 },
    "corn": { category: "veg", value: 5 },
    "cabbage": { category: "veg", value: 5 },
    "red cabbage": { category: "veg", value: 5 },
    "napa cabbage": { category: "veg", value: 5 },
    "cauliflower": { category: "veg", value: 5 },
    "brussels sprout": { category: "veg", value: 5 },
    "mushroom": { category: "veg", value: 5 },
    "portobello": { category: "veg", value: 5 },
    "shiitake": { category: "veg", value: 5 },
    "seaweed": { category: "veg", value: 5 },
    "nori": { category: "veg", value: 5 },
    "bok choy": { category: "veg", value: 5 },
    "eggplant": { category: "veg", value: 5 },
    "okra": { category: "veg", value: 5 },
    "artichoke": { category: "veg", value: 5 },
    "beet": { category: "veg", value: 5 },
    "radish": { category: "veg", value: 5 },
    "turnip": { category: "veg", value: 5 },
    "parsnip": { category: "veg", value: 5 },
    "fennel": { category: "veg", value: 5 },
    "celery": { category: "veg", value: 5 },
    "pickle": { category: "veg", value: 5 },
    "sauerkraut": { category: "veg", value: 5 },
    "kimchi": { category: "veg", value: 5 },
    "tomatillo": { category: "veg", value: 5 },
    "olive": { category: "veg", value: 5 },
    "sun-dried tomato": { category: "veg", value: 5 },
    "roasted red pepper": { category: "veg", value: 5 },
    "sprouts": { category: "veg", value: 5 },
    "bean sprout": { category: "veg", value: 5 },
    "water chestnut": { category: "veg", value: 5 },
    "bamboo shoot": { category: "veg", value: 5 },
    "jicama": { category: "veg", value: 5 },
    "daikon": { category: "veg", value: 5 },
    "salad greens": { category: "veg", value: 5 },
    "microgreens": { category: "veg", value: 5 },
    "avocado": { category: "veg", value: 7 },
    "veg": { category: "veg", value: 7 },

    // ---- Hydration (value: 2, caffeinated/sugary: -1) ----
    "water": { category: "hydration", value: 2 },
    "sparkling water": { category: "hydration", value: 2 },
    "lemon water": { category: "hydration", value: 2 },
    "tea": { category: "hydration", value: 2 },
    "green tea": { category: "hydration", value: 2 },
    "black tea": { category: "hydration", value: 2 },
    "herbal tea": { category: "hydration", value: 2 },
    "iced tea": { category: "hydration", value: 2 },
    "chai": { category: "hydration", value: 2 },
    "coffee": { category: "hydration", value: -1 },
    "espresso": { category: "hydration", value: -1 },
    "decaf coffee": { category: "hydration", value: 2 },
    "milk": { category: "hydration", value: 2 },
    "whole milk": { category: "hydration", value: 2 },
    "skim milk": { category: "hydration", value: 2 },
    "almond milk": { category: "hydration", value: 2 },
    "oat milk": { category: "hydration", value: 2 },
    "soy milk": { category: "hydration", value: 2 },
    "coconut milk": { category: "hydration", value: 2 },
    "cashew milk": { category: "hydration", value: 2 },
    "coconut water": { category: "hydration", value: 2 },
    "broth": { category: "hydration", value: 2 },
    "chicken broth": { category: "hydration", value: 2 },
    "beef broth": { category: "hydration", value: 2 },
    "vegetable broth": { category: "hydration", value: 2 },
    "bone broth": { category: "hydration", value: 2 },
    "smoothie": { category: "hydration", value: 2 },
    "kompot": { category: "hydration", value: 2 },
    "orange juice": { category: "hydration", value: 2 },
    "sports drink": { category: "hydration", value: -1 },
    "energy drink": { category: "hydration", value: -1 },
    "soda": { category: "hydration", value: -1 },
    "olipop": { category: "hydration", value: -1 },
    "lemonade": { category: "hydration", value: 2 },
    "kombucha": { category: "hydration", value: 2 },
    "electrolyte drink": { category: "hydration", value: 2 },

    // ---- Carbs (value: 0) ----
    "bread": { category: "carbs", value: 0 },
    "white bread": { category: "carbs", value: 0 },
    "whole wheat bread": { category: "carbs", value: 0 },
    "sourdough": { category: "carbs", value: 0 },
    "rye bread": { category: "carbs", value: 0 },
    "multigrain bread": { category: "carbs", value: 0 },
    "rice": { category: "carbs", value: 0 },
    "white rice": { category: "carbs", value: 0 },
    "brown rice": { category: "carbs", value: 0 },
    "jasmine rice": { category: "carbs", value: 0 },
    "basmati rice": { category: "carbs", value: 0 },
    "pasta": { category: "carbs", value: 0 },
    "spaghetti": { category: "carbs", value: 0 },
    "penne": { category: "carbs", value: 0 },
    "macaroni": { category: "carbs", value: 0 },
    "noodles": { category: "carbs", value: 0 },
    "ramen noodles": { category: "carbs", value: 0 },
    "udon": { category: "carbs", value: 0 },
    "soba": { category: "carbs", value: 0 },
    "rice noodles": { category: "carbs", value: 0 },
    "oats": { category: "carbs", value: 0 },
    "oatmeal": { category: "carbs", value: 0 },
    "cereal": { category: "carbs", value: 0 },
    "granola": { category: "carbs", value: 0 },
    "muesli": { category: "carbs", value: 0 },
    "bagel": { category: "carbs", value: 0 },
    "english muffin": { category: "carbs", value: 0 },
    "tortilla": { category: "carbs", value: 0 },
    "flour tortilla": { category: "carbs", value: 0 },
    "corn tortilla": { category: "carbs", value: 0 },
    "pizza": { category: "carbs", value: 0 },
    "pizza crust": { category: "carbs", value: 0 },
    "burger bun": { category: "carbs", value: 0 },
    "hot dog bun": { category: "carbs", value: 0 },
    "dinner roll": { category: "carbs", value: 0 },
    "fries": { category: "carbs", value: 0 },
    "sweet potato fries": { category: "carbs", value: 0 },
    "chips": { category: "carbs", value: 0 },
    "tortilla chips": { category: "carbs", value: 0 },
    "potato chips": { category: "carbs", value: 0 },
    "pretzel": { category: "carbs", value: 0 },
    "cracker": { category: "carbs", value: 0 },
    "rice cake": { category: "carbs", value: 0 },
    "quinoa": { category: "carbs", value: 0 },
    "couscous": { category: "carbs", value: 0 },
    "barley": { category: "carbs", value: 0 },
    "farro": { category: "carbs", value: 0 },
    "bulgur": { category: "carbs", value: 0 },
    "polenta": { category: "carbs", value: 0 },
    "grits": { category: "carbs", value: 0 },
    "roti": { category: "carbs", value: 0 },
    "naan": { category: "carbs", value: 0 },
    "pita": { category: "carbs", value: 0 },
    "flatbread": { category: "carbs", value: 0 },
    "tater tots": { category: "carbs", value: 0 },
    "potato": { category: "carbs", value: 0 },
    "mashed potatoes": { category: "carbs", value: 0 },
    "baked potato": { category: "carbs", value: 0 },
    "sweet potato": { category: "carbs", value: 0 },
    "hash browns": { category: "carbs", value: 0 },
    "croissant": { category: "carbs", value: 0 },
    "muffin": { category: "carbs", value: 0 },
    "biscuit": { category: "carbs", value: 0 },
    "scone": { category: "carbs", value: 0 },
    "waffle": { category: "carbs", value: 0 },
    "pancake": { category: "carbs", value: 0 },
    "cornbread": { category: "carbs", value: 0 },
    "popcorn": { category: "carbs", value: 0 },
};


// ---- Aliases / synonyms / abbreviations / common misspellings ----
const foodAliases = {
    // veg = veggies = vegetables (the requested example, plus variants)
    "veggies": "veg",
    "veggie": "veg",
    "vegetable": "veg",
    "vegetables": "veg",
    "vegtable": "veg",
    "vegtables": "veg",
    "vege": "veg",
    "veges": "veg",
    "mixed veggies": "veg",
    "mixed vegetables": "veg",
    "mix veggies": "veg",
    "side veg": "veg",
    "side salad": "veg",

    // protein aliases
    "chicken breasts": "chicken breast",
    "chicken thighs": "chicken thigh",
    "chicken wings": "chicken wing",
    "steaks": "steak",
    "pork chops": "pork chop",
    "lamb chops": "lamb chop",
    "prawn": "shrimp",
    "prawns": "shrimp",
    "shrimps": "shrimp",
    "scallops": "scallop",
    "mussels": "mussel",
    "clams": "clam",
    "oysters": "oyster",
    "anchovies": "anchovy",
    "sardines": "sardine",
    "eggs": "egg",
    "egg whites": "egg white",
    "hard boiled egg": "egg",
    "hard boiled eggs": "egg",
    "soft boiled egg": "egg",
    "soft boiled eggs": "egg",
    "scrambled egg": "egg",
    "scrambled eggs": "egg",
    "scramble eggs": "egg",
    "fried egg": "egg",
    "fried eggs": "egg",
    "steamed egg": "egg",
    "steamed eggs": "egg",
    "poached egg": "egg",
    "poached eggs": "egg",
    "omelette": "egg",
    "omelet": "egg",
    "beans": "bean",
    "black beans": "black bean",
    "kidney beans": "kidney bean",
    "pinto beans": "pinto bean",
    "white beans": "white bean",
    "cannellini beans": "cannellini bean",
    "navy beans": "navy bean",
    "lentils": "lentil",
    "red lentils": "lentil",
    "chickpeas": "chickpea",
    "garbanzo": "chickpea",
    "garbanzos": "chickpea",
    "garbanzo bean": "chickpea",
    "garbanzo beans": "chickpea",
    "almonds": "almond",
    "walnuts": "walnut",
    "cashews": "cashew",
    "pistachios": "pistachio",
    "pecans": "pecan",
    "peanuts": "peanut",
    "pb": "peanut butter",
    "nut butter": "peanut butter",
    "greek yoghurt": "greek yogurt",
    "yoghurt": "yogurt",
    "tvp": "protein",
    "textured vegetable protein": "protein",

    // veg name variants / regional terms
    "carrots": "carrot",
    "tomatoes": "tomato",
    "cherry tomatoes": "cherry tomato",
    "scallion": "green onion",
    "scallions": "green onion",
    "spring onion": "green onion",
    "spring onions": "green onion",
    "shallots": "shallot",
    "coriander": "cilantro",
    "aubergine": "eggplant",
    "aubergines": "eggplant",
    "courgette": "zucchini",
    "courgettes": "zucchini",
    "rocket": "arugula",
    "shrooms": "mushroom",
    "mushrooms": "mushroom",
    "portobello mushroom": "portobello",
    "shiitake mushroom": "shiitake",
    "beets": "beet",
    "beetroot": "beet",
    "pickles": "pickle",
    "olives": "olive",
    "chilis": "chili pepper",
    "chillis": "chili pepper",
    "chillies": "chili pepper",
    "thai chillis": "thai chili",
    "thai chilis": "thai chili",
    "peppers": "bell pepper",
    "bell peppers": "bell pepper",
    "red pepper": "bell pepper",
    "green pepper": "bell pepper",
    "yellow pepper": "bell pepper",
    "green beans": "green bean",
    "snap peas": "snap pea",
    "snow peas": "snow pea",
    "peas": "pea",
    "brussels sprouts": "brussels sprout",
    "sprout": "sprouts",
    "bean sprouts": "bean sprout",

    // hydration
    "h2o": "water",
    "oj": "orange juice",
    "sparkling waters": "sparkling water",
    "fizzy water": "sparkling water",
    "pop": "soda",
    "soft drink": "soda",
    "cola": "soda",
    "broths": "broth",
    "smoothies": "smoothie",
    "kampot": "kompot",

    // carbs
    "tots": "tater tots",
    "tater tot": "tater tots",
    "taters": "potato",
    "spuds": "potato",
    "spud": "potato",
    "potatoes": "potato",
    "sweet potatoes": "sweet potato",
    "pancakes": "pancake",
    "waffles": "waffle",
    "muffins": "muffin",
    "biscuits": "biscuit",
    "scones": "scone",
    "crackers": "cracker",
    "rice cakes": "rice cake",
    "pretzels": "pretzel",
    "naans": "naan",
    "pitas": "pita",
    "noodle": "noodles",
    "ramen": "ramen noodles",
    "rotis": "roti",
    "bagels": "bagel",
};


// =====================================================================
// MEAL DATASET (composite dishes -> array of categories satisfied)
// =====================================================================

const mealDataset = {
    // ---- Mexican / Tex-Mex ----
    "taco": ["protein", "veg", "carbs"],
    "taco salad": ["protein", "veg"],
    "taco bowl": ["protein", "veg", "carbs"],
    "burrito": ["protein", "carbs", "veg"],
    "burrito bowl": ["protein", "carbs", "veg"],
    "enchiladas": ["protein", "carbs"],
    "quesadilla": ["protein", "carbs"],
    "chicken tinga": ["protein", "veg"],
    "salsa": ["protein", "veg"],
    "chips and salsa": ["protein", "carbs", "veg"],
    "street tacos": ["protein", "veg", "carbs"],
    "pollo chile colorado": ["protein", "veg"],
    "curried ground beef and rice with lettuce": ["protein", "carbs", "veg"],
    "fajitas": ["protein", "veg", "carbs"],
    "nachos": ["protein", "carbs", "veg"],
    "tostadas": ["protein", "carbs", "veg"],
    "tortas": ["protein", "carbs"],
    "elote": ["veg"],
    "esquites": ["veg"],
    "carnitas": ["protein"],
    "barbacoa": ["protein"],
    "al pastor tacos": ["protein", "carbs", "veg"],
    "carne asada": ["protein"],
    "chile relleno": ["protein", "veg"],
    "mole poblano": ["protein", "veg"],
    "pozole": ["protein", "veg"],
    "menudo": ["protein", "veg", "hydration"],
    "huevos rancheros": ["protein", "carbs", "veg"],
    "chilaquiles": ["carbs", "protein", "veg"],
    "migas": ["protein", "carbs", "veg"],

    // ---- American / Western ----
    "burger": ["protein", "carbs"],
    "sandwich": ["protein", "carbs"],
    "tuna sandwich": ["protein", "carbs"],
    "fried egg sandwich": ["protein", "carbs"],
    "salad": ["veg"],
    "crunchy steakhouse salad": ["protein", "veg"],
    "mediterranean bowl": ["protein", "veg", "carbs"],
    "mediterranean rice bowl": ["protein", "veg", "carbs"],
    "toast": ["carbs"],
    "avocado toast": ["carbs", "veg"],
    "big mac salad": ["protein", "veg"],
    "caprese salad": ["veg", "protein"],
    "creamy cucumber salad": ["veg"],
    "greek chickpea salad": ["protein", "veg"],
    "california roll salad": ["protein", "veg", "carbs"],
    "steak wild rice and salad": ["protein", "veg", "carbs"],
    "grilled chicken roasted potatoes and green beans": ["protein", "veg", "carbs"],
    "chicken wings": ["protein"],
    "bbq ribs": ["protein"],
    "chili": ["protein", "veg"],
    "meatball sub": ["protein", "carbs"],
    "philly cheesesteak": ["protein", "carbs", "veg"],
    "club sandwich": ["protein", "carbs", "veg"],
    "blt": ["protein", "carbs", "veg"],
    "reuben sandwich": ["protein", "carbs", "veg"],
    "po boy": ["protein", "carbs"],
    "corn dog": ["protein", "carbs"],
    "chicken nuggets": ["protein"],
    "chicken tenders": ["protein"],
    "fried chicken": ["protein"],
    "chicken parmesan": ["protein", "carbs"],
    "caesar salad": ["veg", "protein"],
    "cobb salad": ["protein", "veg"],
    "wedge salad": ["veg", "protein"],
    "potato salad": ["carbs", "veg"],
    "macaroni salad": ["carbs", "veg"],
    "egg salad sandwich": ["protein", "carbs"],
    "chicken salad sandwich": ["protein", "carbs", "veg"],
    "tuna melt": ["protein", "carbs"],
    "grilled chicken sandwich": ["protein", "carbs", "veg"],
    "fish tacos": ["protein", "veg", "carbs"],
    "lobster roll": ["protein", "carbs"],
    "crab cakes": ["protein"],
    "shrimp scampi": ["protein", "carbs"],
    "chicken alfredo": ["protein", "carbs"],
    "chicken caesar salad": ["protein", "veg"],
    "buddha bowl": ["protein", "veg", "carbs"],
    "grain bowl": ["carbs", "veg", "protein"],
    "poke bowl": ["protein", "veg", "carbs"],
    "smoothie bowl": ["dessert", "protein"],
    "acai bowl": ["dessert", "carbs"],
    "overnight oats": ["carbs", "protein"],
    "breakfast burrito": ["protein", "carbs", "veg"],
    "breakfast sandwich": ["protein", "carbs"],
    "frittata": ["protein", "veg"],
    "quiche": ["protein", "carbs", "veg"],

    // ---- Italian ----
    "pizza": ["carbs", "protein"],
    "pasta": ["carbs"],
    "lasagna": ["carbs", "protein"],
    "bolognese": ["protein", "carbs"],
    "butter noodles": ["carbs"],
    "homemade pasta": ["carbs", "protein"],
    "spaghetti with meat sauce": ["protein", "carbs"],
    "italian wedding soup": ["protein", "veg", "hydration"],
    "risotto": ["carbs", "protein"],
    "minestrone soup": ["veg", "protein", "hydration"],
    "bruschetta": ["carbs", "veg"],
    "arancini": ["carbs", "protein"],
    "ravioli": ["carbs", "protein"],
    "tortellini": ["carbs", "protein"],
    "fettuccine alfredo": ["carbs", "protein"],
    "pesto pasta": ["carbs", "veg"],
    "calzone": ["carbs", "protein"],
    "panini": ["carbs", "protein", "veg"],
    "carbonara": ["carbs", "protein"],

    // ---- Asian ----
    "stir fry": ["protein", "veg"],
    "fried rice": ["carbs", "veg", "protein"],
    "ramen": ["carbs", "protein"],
    "cup noodle": ["carbs"],
    "noodles": ["carbs"],
    "cold soba noodles": ["carbs"],
    "onigiri": ["carbs"],
    "okonomiyaki": ["carbs", "veg"],
    "katsu": ["protein"],
    "katsu curry": ["protein", "carbs"],
    "katsu chicken jap curry": ["protein", "carbs"],
    "japanese curry": ["protein", "veg"],
    "soondubu jjigae": ["protein", "veg"],
    "miso soup": ["hydration"],
    "egg drop soup": ["protein", "hydration"],
    "dumpling": ["carbs", "protein"],
    "gyoza": ["carbs", "protein"],
    "scallion pancake": ["carbs"],
    "chinese steamed egg": ["protein"],
    "asian marinade": ["protein"],
    "umami seaweed rice rolls": ["carbs", "veg", "protein"],
    "yamitsuki shio kyabetsu": ["veg"],
    "nabe soup": ["protein", "veg", "hydration"],
    "tofu pot": ["protein", "veg"],
    "kimbap": ["carbs", "protein", "veg"],
    "eggroll": ["carbs"],
    "hainan rice": ["carbs", "protein"],
    "pad see ew": ["protein", "carbs", "veg"],
    "drunken noodles": ["protein", "carbs", "veg"],
    "general tso's chicken": ["protein", "carbs"],
    "orange chicken": ["protein", "carbs"],
    "kung pao chicken": ["protein", "veg"],
    "mapo tofu": ["protein", "veg"],
    "chow mein": ["carbs", "veg", "protein"],
    "lo mein": ["carbs", "veg", "protein"],
    "wonton soup": ["protein", "hydration"],
    "hot pot": ["protein", "veg", "hydration"],
    "congee": ["carbs", "protein"],
    "shabu shabu": ["protein", "veg", "hydration"],
    "donburi": ["protein", "carbs"],
    "sushi": ["protein", "carbs"],
    "sashimi": ["protein"],
    "tempura": ["protein", "veg", "carbs"],
    "tempura udon": ["protein", "carbs"],
    "yakitori": ["protein"],
    "takoyaki": ["protein", "carbs"],
    "korean bbq": ["protein", "veg"],
    "bulgogi": ["protein"],
    "japchae": ["carbs", "veg", "protein"],
    "tteokbokki": ["carbs"],
    "korean fried chicken": ["protein"],
    "kimchi fried rice": ["carbs", "veg", "protein"],
    "doenjang jjigae": ["protein", "veg", "hydration"],
    "galbi": ["protein"],

    // ---- Korean ----
    "sang chu geot jeori": ["veg"],
    "korean salad": ["veg"],
    "korean spinach salad": ["veg"],

    // ---- Indian / Curry ----
    "curry": ["protein", "veg"],
    "indian curry": ["protein", "veg"],
    "butter chicken curry": ["protein"],
    "fish curry": ["protein"],
    "beef curry": ["protein"],
    "shrimp curry": ["protein"],
    "biryani": ["protein", "carbs"],
    "lazy chicken biryani": ["protein", "carbs"],
    "egg curry": ["protein", "veg"],
    "beef vindaloo": ["protein", "veg"],
    "sri lankan dahl": ["protein", "veg"],
    "jackfruit curry": ["protein", "veg"],
    "tikka masala": ["protein", "veg"],
    "tandoori chicken": ["protein"],
    "samosa": ["carbs", "protein"],
    "pakora": ["carbs", "veg"],
    "dal": ["protein", "veg"],
    "saag paneer": ["protein", "veg"],
    "palak paneer": ["protein", "veg"],
    "aloo gobi": ["carbs", "veg"],
    "naan with curry": ["protein", "veg", "carbs"],
    "thali": ["protein", "veg", "carbs"],
    "dosa": ["carbs", "protein"],
    "idli": ["carbs"],
    "uttapam": ["carbs", "veg"],
    "rajma": ["protein", "veg"],
    "chole": ["protein", "veg"],
    "paneer tikka": ["protein", "veg"],

    // ---- Soups / Stews ----
    "soup": ["veg", "protein"],
    "golden chicken soup": ["protein"],
    "lentil soup": ["protein", "veg"],
    "potato soup": ["veg"],
    "leek soup": ["veg"],
    "potato leek soup": ["veg"],
    "nordic potato soup": ["veg"],
    "nordic leek soup": ["veg"],
    "white bean soup": ["protein", "veg"],
    "bean soup": ["protein"],
    "tomato and grilled cheese soup": ["carbs", "veg"],
    "tuscan white bean soup": ["protein", "veg"],
    "tuscan soup": ["protein", "veg"],
    "beef stew": ["protein", "veg"],
    "cajun sausage potato soup": ["protein", "veg", "carbs"],
    "creamy mushroom soup": ["veg"],
    "sopa de lentejas": ["protein", "veg"],

    // ---- Southern / Cajun ----
    "jambalaya": ["protein", "carbs"],
    "gumbo": ["protein"],
    "seafood boil": ["carbs", "protein"],
    "boil": ["carbs", "protein"],

    // ---- Comfort foods ----
    "shepherd's pie": ["protein", "carbs"],
    "potato chicken bake": ["protein", "carbs"],
    "mac and cheese": ["carbs", "protein"],
    "meatloaf": ["protein", "veg"],
    "clam chowder": ["protein", "hydration"],
    "chicken pot pie": ["protein", "carbs", "veg"],
    "pulled pork sandwich": ["protein", "carbs"],
    "cornbread": ["carbs"],
    "grilled cheese": ["carbs", "protein", "veg"],
    "pb and j sandwich": ["protein", "carbs"],

    // ---- Bowls ----
    "chickpea bowl": ["protein", "veg"],
    "rice cooker bowl": ["protein", "carbs", "veg"],
    "rice bowl": ["protein", "carbs", "veg"],
    "protein and veg": ["protein", "veg"],

    // ---- African / Middle Eastern ----
    "doro wat": ["protein", "veg"],
    "injera with doro wat": ["protein", "carbs", "veg"],
    "ethiopian beef tibs": ["protein", "veg"],
    "kabsa": ["protein", "carbs", "veg"],
    "egusi soup": ["protein", "veg"],
    "jollof rice": ["carbs", "protein", "veg"],
    "tagine": ["protein", "veg", "carbs"],
    "bunny chow": ["carbs", "protein", "veg"],
    "ful medames": ["protein", "veg"],
    "koshari": ["carbs", "protein", "veg"],
    "fufu and soup": ["carbs", "protein", "veg"],
    "suya": ["protein"],
    "falafel": ["protein", "veg", "carbs"],
    "shawarma": ["protein", "carbs", "veg"],
    "hummus plate": ["protein", "veg", "carbs"],
    "baba ganoush plate": ["veg", "carbs"],
    "tabbouleh": ["veg", "carbs"],
    "kebab": ["protein", "veg"],
    "mansaf": ["protein", "carbs"],
    "dolma": ["veg", "protein", "carbs"],
    "shakshuka": ["protein", "veg"],
    "gyro": ["protein", "carbs", "veg"],
    "souvlaki": ["protein", "veg"],
    "greek salad": ["veg", "protein"],

    // ---- Latin American ----
    "ceviche": ["protein", "veg"],
    "arepa": ["carbs", "protein", "veg"],
    "empanadas argentinas": ["carbs", "protein"],
    "feijoada": ["protein", "carbs"],
    "tamales": ["carbs", "protein"],
    "churrasco": ["protein", "carbs"],
    "pupusas": ["carbs", "protein", "veg"],
    "moqueca": ["protein", "veg", "carbs"],

    // ---- European ----
    "paella": ["protein", "carbs", "veg"],
    "ratatouille": ["veg"],
    "moussaka": ["protein", "carbs", "veg"],
    "coq au vin": ["protein", "veg"],
    "fish and chips": ["protein", "carbs"],
    "gnocchi": ["carbs", "veg"],
    "pierogi": ["carbs", "protein", "veg"],
    "spanakopita": ["carbs", "veg", "protein"],
    "cottage pie": ["protein", "carbs", "veg"],

    // ---- General / catch-all ----
    "fast food meal": ["protein", "carbs"],
    "homemade dinner": ["protein", "carbs", "veg"],
    "snack plate": ["carbs", "veg"],
    "charcuterie board": ["protein", "carbs", "veg"],
    "buffet": ["carbs", "protein", "veg"],
};


// ---- Aliases / synonyms / abbreviations / common misspellings ----
const mealAliases = {
    "tacos": "taco",
    "burritos": "burrito",
    "burrito bowls": "burrito bowl",
    "burgers": "burger",
    "fries and burger": "burger",
    "sandwiches": "sandwich",
    "salads": "salad",
    "dumplings": "dumpling",
    "gyozas": "gyoza",
    "egg rolls": "eggroll",
    "egg roll": "eggroll",
    "eggrolls": "eggroll",
    "noodle bowl": "noodles",
    "rice bowls": "rice bowl",
    "grain bowls": "grain bowl",
    "poke": "poke bowl",
    "buddha bowls": "buddha bowl",
    "biriyani": "biryani",
    "biriani": "biryani",
    "buryani": "biryani",
    "tikka masala curry": "tikka masala",
    "chicken tikka masala": "tikka masala",
    "mac n cheese": "mac and cheese",
    "mac & cheese": "mac and cheese",
    "macaroni and cheese": "mac and cheese",
    "cheesesteak": "philly cheesesteak",
    "philly cheese steak": "philly cheesesteak",
    "ceasar salad": "caesar salad",
    "caeser salad": "caesar salad",
    "pbj": "pb and j sandwich",
    "pb and j": "pb and j sandwich",
    "peanut butter and jelly": "pb and j sandwich",
    "peanut butter and jelly sandwich": "pb and j sandwich",
    "grilled cheese sandwich": "grilled cheese",
    "club": "club sandwich",
    "subway sandwich": "sandwich",
    "fish tacos": "fish tacos",
    "korean barbecue": "korean bbq",
    "kbbq": "korean bbq",
    "hotpot": "hot pot",
    "shabu-shabu": "shabu shabu",
    "donut": "donburi", // common autocorrect collision; remove if undesired
    "soup of the day": "soup",
    "salad bowl": "salad",
    "leftovers plate": "homemade dinner",
    "takeout": "fast food meal",
    "take out": "fast food meal",
    "drive thru": "fast food meal",
};


// =====================================================================
// DESSERT DATASETS (kept separate per your preference)
// =====================================================================

// ✅ Diabetic-friendly desserts (+5, dark chocolate +2)
const diabeticFriendlyDesserts = {
    "blackberry": { category: "dessert", value: 5 },
    "raspberry": { category: "dessert", value: 5 },
    "strawberry": { category: "dessert", value: 5 },
    "blueberry": { category: "dessert", value: 5 },
    "kiwi": { category: "dessert", value: 5 },
    "apple slices": { category: "dessert", value: 5 },
    "pear slices": { category: "dessert", value: 5 },
    "peach slices": { category: "dessert", value: 5 },
    "grapefruit segments": { category: "dessert", value: 5 },
    "orange slices": { category: "dessert", value: 5 },
    "watermelon": { category: "dessert", value: 5 },
    "cantaloupe": { category: "dessert", value: 5 },
    "honeydew": { category: "dessert", value: 5 },
    "plum": { category: "dessert", value: 5 },
    "cherry": { category: "dessert", value: 5 },
    "pomegranate seeds": { category: "dessert", value: 5 },
    "grape": { category: "dessert", value: 5 },
    "applesauce unsweetened": { category: "dessert", value: 5 },
    "frozen yogurt unsweetened": { category: "dessert", value: 5 },
    "sugar-free gelatin": { category: "dessert", value: 5 },
    "chia pudding sugar-free": { category: "dessert", value: 5 },
    "dark chocolate": { category: "dessert", value: 2 },
    "cacao nibs": { category: "dessert", value: 5 },
    "unsweetened cocoa mousse": { category: "dessert", value: 5 },
    "avocado chocolate mousse sugar-free": { category: "dessert", value: 5 },
    "greek yogurt plain": { category: "dessert", value: 5 },
    "almond butter with cocoa": { category: "dessert", value: 5 },
    "nuts and berries": { category: "dessert", value: 5 },
    "pumpkin puree dessert": { category: "dessert", value: 5 },
    "baked apples unsweetened": { category: "dessert", value: 5 },
    "frozen berries": { category: "dessert", value: 5 },
    "fruit salad": { category: "dessert", value: 5 },
    "banana slices in cocoa": { category: "dessert", value: 5 },
    "orange": { category: "dessert", value: 5 },
    "mandarin": { category: "dessert", value: 5 },
    "tangerine": { category: "dessert", value: 5 },
    "peach": { category: "dessert", value: 5 },
    "sugar-free ice cream": { category: "dessert", value: 5 },
    "carrot cake sugar-free": { category: "dessert", value: 5 },
    "baked peaches unsweetened": { category: "dessert", value: 5 },
    "banana": { category: "dessert", value: 5 },
    "fruit cocktail": { category: "dessert", value: 5 },
    "fruit": { category: "dessert", value: 5 },
    "mango": { category: "dessert", value: 5 },
    "fig": { category: "dessert", value: 5 },
    "nectarine": { category: "dessert", value: 5 },
    "apricot": { category: "dessert", value: 5 },
    "papaya": { category: "dessert", value: 5 },
    "dragon fruit": { category: "dessert", value: 5 },
    "frozen grapes": { category: "dessert", value: 5 },
    "greek yogurt with berries": { category: "dessert", value: 5 },
    "rice cake with peanut butter": { category: "dessert", value: 5 },
};

// ❌ Non-diabetic-friendly desserts (-40)
const nonDiabeticDesserts = {
    "chocolate cake": { category: "dessert", value: -40 },
    "chocolate": { category: "dessert", value: -40 },
    "hot chocolate": { category: "dessert", value: -40 },
    "cheesecake": { category: "dessert", value: -40 },
    "ice cream": { category: "dessert", value: -40 },
    "brownie": { category: "dessert", value: -40 },
    "cupcake": { category: "dessert", value: -40 },
    "cookie": { category: "dessert", value: -40 },
    "donut": { category: "dessert", value: -40 },
    "candy": { category: "dessert", value: -40 },
    "fudge": { category: "dessert", value: -40 },
    "pudding": { category: "dessert", value: -40 },
    "chocolate bar": { category: "dessert", value: -40 },
    "caramel cake": { category: "dessert", value: -40 },
    "pie": { category: "dessert", value: -40 },
    "apple pie": { category: "dessert", value: -40 },
    "pecan pie": { category: "dessert", value: -40 },
    "banana bread": { category: "dessert", value: -40 },
    "cinnamon roll": { category: "dessert", value: -40 },
    "milk chocolate": { category: "dessert", value: -40 },
    "white chocolate": { category: "dessert", value: -40 },
    "buttercream frosting": { category: "dessert", value: -40 },
    "chocolate mousse": { category: "dessert", value: -40 },
    "tiramisu": { category: "dessert", value: -40 },
    "brown sugar cookies": { category: "dessert", value: -40 },
    "chocolate chip cookie": { category: "dessert", value: -40 },
    "red velvet cake": { category: "dessert", value: -40 },
    "marshmallow treats": { category: "dessert", value: -40 },
    "gelato": { category: "dessert", value: -40 },
    "creme brulee": { category: "dessert", value: -40 },
    "macaron": { category: "dessert", value: -40 },
    "truffle": { category: "dessert", value: -40 },
    "pop tart": { category: "dessert", value: -40 },
    "chocolate fondue": { category: "dessert", value: -40 },
    "chocolate eclair": { category: "dessert", value: -40 },
    "cake pop": { category: "dessert", value: -40 },
    "waffles with syrup": { category: "dessert", value: -40 },
    "pancakes with syrup": { category: "dessert", value: -40 },
    "sweetened yogurt": { category: "dessert", value: -40 },
    "ice cream sundae": { category: "dessert", value: -40 },
    "pancakes": { category: "dessert", value: -40 },
    "waffles": { category: "dessert", value: -40 },
    "cake": { category: "dessert", value: -40 },
    "mcflurry": { category: "dessert", value: -40 },
    "hot cocoa": { category: "dessert", value: -40 },
    "boba": { category: "dessert", value: -40 },
    "milk shake": { category: "dessert", value: -40 },
    "bakery treat": { category: "dessert", value: -40 },
    "alcohol": { category: "dessert", value: -40 },
    "starbucks": { category: "dessert", value: -40 },
    "juice": { category: "dessert", value: -40 },
    "latte": { category: "dessert", value: -40 },
    "ferrero rocher": { category: "dessert", value: -40 },
    "frappuccino": { category: "dessert", value: -40 },
    "churro": { category: "dessert", value: -40 },
    "danish pastry": { category: "dessert", value: -40 },
    "funnel cake": { category: "dessert", value: -40 },
    "candy bar": { category: "dessert", value: -40 },
    "snickers": { category: "dessert", value: -40 },
    "twinkie": { category: "dessert", value: -40 },
    "oreo": { category: "dessert", value: -40 },
};

// ---- Aliases for both dessert datasets ----
const dessertAliases = {
    "blackberries": "blackberry",
    "raspberries": "raspberry",
    "strawberries": "strawberry",
    "blueberries": "blueberry",
    "cherries": "cherry",
    "plums": "plum",
    "grapes": "grape",
    "peaches": "peach",
    "oranges": "orange",
    "mangoes": "mango",
    "mangos": "mango",
    "figs": "fig",
    "apricots": "apricot",
    "fruits": "fruit",
    "icecream": "ice cream",
    "ice-cream": "ice cream",
    "doughnut": "donut",
    "doughnuts": "donut",
    "donuts": "donut",
    "cookies": "cookie",
    "brownies": "brownie",
    "cupcakes": "cupcake",
    "macarons": "macaron",
    "truffles": "truffle",
    "pop tarts": "pop tart",
    "cake pops": "cake pop",
    "candy bars": "candy bar",
    "chocolate bars": "chocolate bar",
    "milkshake": "milk shake",
    "milk-shake": "milk shake",
    "eclair": "chocolate eclair",
    "eclairs": "chocolate eclair",
    "cinnamon rolls": "cinnamon roll",
    "frappe": "frappuccino",
    "iced coffee drink": "frappuccino",
    "churros": "churro",
};


// =====================================================================
// PUBLIC LOOKUP API
// =====================================================================

function getFoodData(name) {
    const key = findMatch(name, foodDataset, foodAliases);
    return key ? { key, ...foodDataset[key] } : null;
}

function getMealCategories(name) {
    const key = findMatch(name, mealDataset, mealAliases);
    return key ? { key, categories: mealDataset[key] } : null;
}

function getDessertData(name) {
    let key = findMatch(name, diabeticFriendlyDesserts, dessertAliases);
    if (key) return { key, source: "diabeticFriendly", ...diabeticFriendlyDesserts[key] };

    key = findMatch(name, nonDiabeticDesserts, dessertAliases);
    if (key) return { key, source: "nonDiabetic", ...nonDiabeticDesserts[key] };

    return null;
}

/** Unified lookup across foods, meals, and desserts. Returns null if nothing matches. */
function lookupItem(name) {
    const food = getFoodData(name);
    if (food) return { type: "food", ...food };

    const meal = getMealCategories(name);
    if (meal) return { type: "meal", ...meal };

    const dessert = getDessertData(name);
    if (dessert) return { type: "dessert", ...dessert };

    return null;
}


// =====================================================================
// EXAMPLE USAGE
// =====================================================================
// lookupItem("Veggies")              -> { type: "food", key: "veg", category: "veg", value: 7 }
// lookupItem("VEGTABLES")            -> same as above
// lookupItem("grilled chicken breast") -> { type: "food", key: "chicken breast", category: "protein", value: 10 }
// lookupItem("Mac & Cheese")          -> { type: "meal", key: "mac and cheese", categories: ["carbs","protein"] }
// lookupItem("Donuts")                -> { type: "dessert", key: "donut", source: "nonDiabetic", category: "dessert", value: -40 }

module.exports = {
    normalize,
    findMatch,
    foodDataset,
    foodAliases,
    mealDataset,
    mealAliases,
    diabeticFriendlyDesserts,
    nonDiabeticDesserts,
    dessertAliases,
    getFoodData,
    getMealCategories,
    getDessertData,
    lookupItem,
};
