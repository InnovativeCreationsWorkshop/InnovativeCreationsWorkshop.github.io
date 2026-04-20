document.addEventListener("DOMContentLoaded", function () { //event listener- loads the html

    // =============================
    // CONSTANTS
    // =============================
    function getToday() {
    return new Date().toISOString().slice(0, 10);
}
    const STORAGE_KEY = "betty_rpg_state";   //Local stoarage

    // =============================
    // STATE
    // =============================
   const state = {
    movementGoal: 0,
    goalXP: 0,
    goalLocked: false,
    goalCompleted: false,

    dailyMovementMinutes: 0,
    dailyXP: 0,
    weeklyXP: 0,
    gold: 0,

    todayLocked: false,

    glucoseLogs: [],
    nutritionLogs: [],

    convertThreshold: 500,

    goldSpentThisWeek: 0,
    lastSpendReset: getToday(),

    pendingDessertPenalty: null,
    movementPenaltyApplied: false,
    lastMovementCheck: Date.now(),

    repairQuest: {
        active: false,
        completed: false,
        offered: false,
        lastActivated: null,
        progress: 0,
        required: 20,
        dailyCount: 0,
        lastReset: getToday()
    }
};
    // =============================
    // STORAGE
    // =============================
    function saveState() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }

    
    function loadState() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return;

    try {
        const parsed = JSON.parse(saved);

        // Fix missing arrays
        if (!parsed.glucoseLogs) parsed.glucoseLogs = [];
        if (!parsed.nutritionLogs) parsed.nutritionLogs = [];

        // Fix missing nutrition
        if (!parsed.nutrition) {
            parsed.nutrition = {
                protein: 0,
                veg: 0,
                hydration: 0,
                carbs: 0,
                dessert: 0
            };
        }

        Object.assign(state, parsed);

        // Fix nested object (important!)
        state.repairQuest = {
            active: false,
            completed: false,
            offered: false,
            lastActivated: null,
            progress: 0,
            required: 20,
            dailyCount: 0,
            lastReset: getToday(),
            ...state.repairQuest
        };

    } catch (e) {
        console.warn("Load failed:", e);
        localStorage.removeItem(STORAGE_KEY);
    }
}

    // =============================
    // REWARDS
    // =============================
    const rewards = {
    5: [
        { name: "Chocolate & Candy", cost: 5 },
        { name: "Baked Desserts & Pastries", cost: 5 },
        { name: "Sweet Dishes & Snack Foods", cost: 5 },
        { name: "Drinks", cost: 5 }
    ],
    10: [
        { name: "Cakes & Desserts", cost: 10 },
        { name: "Chocolate-Centric Treats", cost: 10 },
        { name: "Pastries, Cookies & Specialty Sweets", cost: 10 },
        { name: "Drinks, Frozen & Outings", cost: 10 }
    ]
};

    // =============================
    // DOM ELEMENTS
    // =============================
    const el = {
    xpResult: document.getElementById("xpResult"),
    goldResult: document.getElementById("goldResult"),

    xpProgressBar: document.getElementById("xpProgressBar"),
    xpProgressText: document.getElementById("xpProgressText"),
    convertGoldBtn: document.getElementById("convertGoldBtn"),

    dateTimeDisplay: document.getElementById("dateTimeDisplay"),

    shopPanel: document.getElementById("shopPanel"),
    spendCountDisplay: document.getElementById("spendCountDisplay"),
    rewardPreview: document.getElementById("rewardPreview"),

    extraMovementInput: document.getElementById("extraMovementInput"),
    extraMovementOutput: document.getElementById("extraMovementOutput"),

    glucoseInput: document.getElementById("glucoseInput"),
    fastingCheck: document.getElementById("fastingCheck"),
    postMealCheck: document.getElementById("postMealCheck"),
    glucoseOutput: document.getElementById("glucoseOutput"),
    glucoseAlert: document.getElementById("glucoseAlert"),

    repairPanel: document.getElementById("repairPanel"),
    repairProgress: document.getElementById("repairProgress"),
    completeRepairBtn: document.getElementById("completeRepairBtn"),

    movementGoalDisplay: document.getElementById("movementGoalDisplay"),

    nutritionItems: document.getElementById("nutritionItems"),
    nutritionOutput: document.getElementById("nutritionOutput"),
    glucoseLogItems: document.getElementById("glucoseLogItems")
};
    // =============================
    // UTILITIES
    // =============================
    function addXP(amount) {
        state.dailyXP += amount;
        state.weeklyXP += amount;
        saveState();
        updateDisplay();
    }

    function getFormattedDateTime() {
        return new Date().toLocaleString([], {
            year: "numeric",
            month: "short",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit"
        });
    }

  function resetWeeklySpendIfNeeded() {
    const today = getToday();

    if (state.lastSpendReset !== today) {
        state.goldSpentThisWeek = 0;
        state.lastSpendReset = today;
    }
}

    function checkMovementTimeout() {
    const now = Date.now();
    const hoursPassed = (now - state.lastMovementCheck) / (1000 * 60 * 60);

    if (hoursPassed >= 24) {

        // 1. apply consequences first
        checkMovementPenalty("timeout");

        // 2. reset day
        resetDailyMovement();

        // 3. update timestamp LAST (important)
        state.lastMovementCheck = now;

        saveState();
    }

}

// =============================
// DISPLAY
// =============================
function updateDisplay() {

    // =====================
    // STATS Display
    // =====================
    el.xpResult.textContent = state.dailyXP;
    el.goldResult.textContent = state.gold;

    // Date/Time
    el.dateTimeDisplay.textContent = getFormattedDateTime();

    // =====================
    // MOVEMENT Display
    // =====================
    if (state.movementGoal) {

        let totalGoal = state.movementGoal;

        // Add repair quest requirement visually (UI only)
        if (state.repairQuest.active && !state.repairQuest.completed) {
            totalGoal += state.repairQuest.required;
        }

        el.movementGoalDisplay.textContent =
            `${state.dailyMovementMinutes} / ${totalGoal} min`;

    } else {
        el.movementGoalDisplay.textContent = "Not Set";
    }

    // =====================
    // GOLD CAP Display
    // =====================
    if (state.gold > 1000) {
        state.gold = 1000;
        console.warn("Gold capped at 1000");
    }

    // =====================
    // XP PROGRESS Display
    // =====================
    const XP_CAP = 500;

    el.xpProgressBar.max = XP_CAP;
    el.xpProgressBar.value = Math.min(state.weeklyXP, XP_CAP);

    el.xpProgressText.textContent =
        `${state.weeklyXP} / ${XP_CAP} XP`;

    el.convertGoldBtn.disabled = state.weeklyXP < XP_CAP;

    // =====================
    // SHOP LIMIT DISPLAY
    // =====================
    resetWeeklySpendIfNeeded();

    el.spendCountDisplay.textContent =
        `Used: ${state.goldSpentThisWeek} / 2 purchases this week`;

    // =====================
    // GLUCOSE LOGS Display
    // =====================
    const glucoseListEl = el.glucoseLogItems;

    if (glucoseListEl) {
        glucoseListEl.innerHTML = "";

        state.glucoseLogs.forEach(log => {
            const li = document.createElement("li");

            li.textContent =
                `${log.time} — ${log.type}: ${log.value} (${log.xp} XP)`;

            if (log.critical) {
                li.style.color = "#FF6388";
                li.style.fontWeight = "bold";
            }

            glucoseListEl.appendChild(li);
        });
    }

    // =====================
    // REPAIR QUEST Display
    // =====================
    const repairProgress = el.repairProgress;
    const completeBtn = el.completeRepairBtn;

    if (repairProgress) {
        repairProgress.textContent = state.repairQuest.active
            ? `Repair: ${state.repairQuest.progress} / ${state.repairQuest.required} min`
            : "";
    }

    if (completeBtn) {
        // FIXED: button should be clickable ONLY when quest is active
        completeBtn.disabled = !state.repairQuest.active;
    }

 
    // =====================
    // NUTRITION LOGS Display
    // =====================
    const nutritionListEl = el.nutritionItems;

    if (nutritionListEl) {
        nutritionListEl.innerHTML = "";

        state.nutritionLogs.forEach(entry => {
            const li = document.createElement("li");

            li.textContent =
                `${entry.name} (${entry.category}: ${
                    entry.xp >= 0 ? "+" : ""
                }${entry.xp} XP)`;

            nutritionListEl.appendChild(li);
        });
    }
}

    // =============================
// XP → GOLD
// =============================
function convertXPtoGold() {

    const thresholdXP = state.convertThreshold; // 500 XP required
    const goldPer100XP = 1;

    if (state.weeklyXP < thresholdXP) {
        alert(`Need at least ${thresholdXP} XP to convert`);
        return;
    }

    // Convert XP → Gold
    const goldEarned = Math.floor(state.weeklyXP / 100);

    state.weeklyXP = state.weeklyXP % 100;
    state.gold += goldEarned;

    // optional safety cap (if you still want it)
    if (state.gold > 1000) {
        state.gold = 1000;
        console.warn("Gold capped at 1000");
    }

    saveState();
    updateDisplay();

    alert(`Converted ${goldEarned} Gold`);
}

    // =============================
    // MOVEMENT
    // =============================
    function setMovementGoal() {
    const goal = parseInt(prompt("Enter movement goal (minutes)"), 10);

    if (isNaN(goal) || goal < 3 || goal > 600) {
        alert("Goal must be between 3 and 600 minutes");
        return;
    }

    const xp = parseInt(prompt("Enter XP reward"), 10);

    if (isNaN(xp) || xp <= 0) {
        alert("Enter valid XP reward");
        return;
    }

    state.movementGoal = goal;
    state.goalXP = xp;
    state.goalLocked = true;
    state.goalCompleted = false;
    state.dailyMovementMinutes = 0;

    saveState();
    updateDisplay();
}

    function logMovement() {
    const extra = parseInt(el.extraMovementInput.value, 10);

    if (isNaN(extra) || extra <= 0) return;

    state.dailyMovementMinutes += extra;

    if (!state.goalCompleted && state.dailyMovementMinutes >= state.movementGoal) {
        state.goalCompleted = true;

        addXP(state.goalXP);

        const bonus = state.dailyMovementMinutes - state.movementGoal;

        if (bonus > 0) {
            addXP(bonus);
            el.extraMovementOutput.textContent = `Goal completed! Bonus +${bonus} XP`;
        } else {
            el.extraMovementOutput.textContent = "Goal completed!";
        }

    } else if (state.goalCompleted) {
        addXP(extra);
        el.extraMovementOutput.textContent = `Bonus +${extra} XP`;

    } else {
        el.extraMovementOutput.textContent =
            `${state.dailyMovementMinutes} / ${state.movementGoal} min`;
    }

    el.extraMovementInput.value = "";

    // repair quest tracking
    if (state.repairQuest.active && !state.repairQuest.completed) {
        state.repairQuest.progress += extra;

        if (state.repairQuest.progress >= state.repairQuest.required) {
            completeRepairQuest();
        }
    }

    saveState();
    updateDisplay();
}

//Movement Penalty
function checkMovementPenalty(source = "auto") {

    if (!state.movementGoal) {
        triggerRepairQuest();
        return;
    }

    if (state.goalCompleted) return;

    if (state.movementPenaltyApplied) return;

    addXP(-150);
    state.movementPenaltyApplied = true;

    triggerRepairQuest();

    alert("Movement goal not completed\nPenalty -150 XP");

    saveState();
}

function resetDailyMovement() {

    state.dailyMovementMinutes = 0;
    state.goalCompleted = false;
    state.movementPenaltyApplied = false;
    state.todayLocked = false;

    state.dailyXP = 0;
    state.glucoseLogs = [];
    state.nutritionLogs = [];

    state.repairQuest.active = false;
    state.repairQuest.completed = false;
    state.repairQuest.progress = 0;
    state.repairQuest.dailyCount = 0;
}


    // =============================
    // SHOP
    // =============================
    function spendGold(cost, label) {

    if (cost <= 0) return;

    if (state.goldSpentThisWeek >= 2) {
        alert("Weekly spend limit reached");
        triggerRepairQuest();
        return;
    }

    if (state.gold < cost) {
        alert("Not enough gold");
        return;
    }

    state.gold -= cost;
    state.goldSpentThisWeek++;

    if (state.pendingDessertPenalty) {
        const food = state.pendingDessertPenalty.food;

        state.pendingDessertPenalty = null;

        alert(`Penalty avoided for: ${food}`);
    } else {
        alert(`Purchased ${label} (-${cost})`);
    }

    saveState();
    updateDisplay();
}

    function showRewardPreview(tier) {
    const items = rewards[tier];
    if (!items || !el.rewardPreview) return;

    el.rewardPreview.innerHTML =
        `<strong>${tier} Gold Tier Rewards:</strong>
        <ul>${items.map(i => `<li>${i}</li>`).join("")}</ul>`;
}

   function bindTierPreview(id, tier) {
    const btn = document.getElementById(id);
    if (!btn) return;

    btn.addEventListener("mouseenter", () => showRewardPreview(tier));

    btn.addEventListener("mouseleave", () => {
        if (el.rewardPreview) el.rewardPreview.innerHTML = "";
    });
}

    
// =============================
// NUTRITION    
// =============================

if (!state.nutrition) {
    state.nutrition = {
        protein: 0,
        veg: 0,
        hydration: 0,
        carbs: 0,
        dessert: 0
    };
}

if (!state.nutritionLogs) state.nutritionLogs = [];

const categoryValues = {
    protein: 20,
    veg: 10,
    hydration: 2,
    carbs: 0
};

const safeFoodDataset = typeof foodDataset !== "undefined" ? foodDataset : {};
const safeMealDataset = typeof mealDataset !== "undefined" ? mealDataset : {};
const safeDiabetic = typeof diabeticFriendlyDesserts !== "undefined" ? diabeticFriendlyDesserts : {};
const safeNonDiabetic = typeof nonDiabeticDesserts !== "undefined" ? nonDiabeticDesserts : {};



if (typeof foodDataset === "undefined") {
    console.error("foodDataset is missing");
}


document.getElementById("logFoodBtn").addEventListener("click", function () {

    const inputEl = document.getElementById("nutritionInput");
    const listEl = el.nutritionItems;

    const input = inputEl.value.toLowerCase().trim();

    let xp = 0;
    let category = "unknown";

    function addLog(text) {
        if (!listEl) return;
        const li = document.createElement("li");
        li.textContent = text;
        listEl.appendChild(li);
    }

    // =====================
    // 1. DIABETIC DESSERT
    // =====================
    if (input in safeDiabetic) {

        xp = diabeticFriendlyDesserts[input].value;
        category = "dessert";

        addXP(xp);
        state.nutrition.dessert += xp;

        addLog(`${input} (dessert: +${xp} XP)`);
    }

    // =====================
    // 2. NON-DIABETIC DESSERT
    // =====================
    else if (input in nonDiabeticDesserts) {

        category = "dessert";

        if (state.gold >= 5) {

            state.pendingDessertPenalty = {
                value: -40,
                food: input
            };

            if (el.shopPanel) el.shopPanel.style.display = "block";

            alert("Not diabetic-friendly! Spend 5 gold to avoid -40 XP.");
            return;

        } else {

            xp = -40;

            addXP(xp);
            state.nutrition.dessert += xp;

            triggerRepairQuest();

            addLog(`${input} (dessert: -40 XP)`);
        }
    }

    // =====================
    // 3. NORMAL FOOD
    // =====================
    else if (input in foodDataset) {

        const food = foodDataset[input];

        xp = food.value;
        category = food.category;

        addXP(xp);

        if (state.nutrition[food.category] !== undefined) {
            state.nutrition[food.category] += xp;
        } else {
            console.warn("Unknown nutrition category:", food.category);
        }

        addLog(`${input} (${food.category}: ${xp >= 0 ? "+" : ""}${xp} XP)`);
    }

    // =====================
    // 4. MEAL
    // =====================
    else if (input in mealDataset) {

        const meal = mealDataset[input];
        let mealTotal = 0;
        category = "meal";

        meal.forEach(cat => {

            if (!(cat in categoryValues)) {
                console.warn("Unknown meal category:", cat);
                return;
            }

            const value = categoryValues[cat];

            state.nutrition[cat] += value;
            mealTotal += value;
        });

        xp = mealTotal;

        addXP(mealTotal);

        addLog(`${input} (meal: ${meal.join(", ")}) → ${mealTotal} XP`);
    }

    // =====================
    // NOT FOUND
    // =====================
    else {
        alert("Food or meal not found in dataset!");
        return;
    }

    // =====================
    // LOG STATE
    // =====================
    state.nutritionLogs.push({
        name: input,
        category,
        xp
    });

    // =====================
    // UPDATE TOTALS
    // =====================
    el.nutritionOutput.innerText =
        `Totals → Protein: ${state.nutrition.protein}, Veg: ${state.nutrition.veg}, Hydration: ${state.nutrition.hydration}, Carbs: ${state.nutrition.carbs}, Dessert: ${state.nutrition.dessert}`;

    // Clear input
    inputEl.value = "";

    saveState();
    updateDisplay();
});




    // =============================
    // GLUCOSE
    // =============================
   function logGlucose() {

    const raw = el.glucoseInput.value;
    const value = Number(raw);

    // =====================
    // VALIDATION
    // =====================
    if (!raw || isNaN(value) || value <= 0) {
        alert("Enter a valid positive glucose value");
        return;
    }

    const fasting = el.fastingCheck.checked;
    const postMeal = el.postMealCheck.checked;

    if (fasting && postMeal) {
        alert("Select only one: fasting OR post-meal");
        return;
    }

    // =====================
    // XP LOGIC
    // =====================
    let xp = 0;
    let type = "Unspecified";

    if (fasting) {
        type = "Fasting";
        xp = value < 130 ? 5 : 0;

    } else if (postMeal) {
        type = "Post-meal";
        xp = value < 180 ? 10 : 0;

    } else {
        // Optional: force selection OR allow neutral log
        type = "Unspecified";
        xp = 0;
    }

    // =====================
    // CRITICAL CHECK
    // =====================
    let critical = false;
    let alertMessage = "";

    if (value <= 70) {
        critical = true;
        alertMessage =
            "⚠️ Low glucose! Take fast carbs and recheck in 15 minutes.";

    } else if (value >= 200) {
        critical = true;
        alertMessage =
            "⚠️ High glucose! Hydrate and consider light movement.";

    } else {
        alertMessage = "Within range. Good job!";
    }

    // =====================
    // APPLY XP
    // =====================
    addXP(xp);

    // =====================
    // SAVE LOG
    // =====================
    state.glucoseLogs.push({
        value,
        type,
        xp,
        critical,
        time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
        })
    });

    // =====================
    // UI UPDATE
    // =====================
    el.glucoseOutput.textContent = `Logged: ${value} (${xp} XP)`;

    el.glucoseAlert.textContent = alertMessage;
    el.glucoseAlert.style.color = critical ? "#FF6388" : "#A9D66D";

    // =====================
    // RESET INPUT
    // =====================
    el.glucoseInput.value = "";
    el.fastingCheck.checked = false;
    el.postMealCheck.checked = false;

    saveState();
    updateDisplay();
}

// =============================
    // Repair Quest
    // =============================

  function triggerRepairQuest() {

    if (state.repairQuest.active) return;

    if (state.repairQuest.dailyCount >= 2) {
        console.log("Daily repair quest limit reached");
        return;
    }

      if (!el.repairPanel) {
    console.warn("repairPanel missing from DOM");
    return;
}
  
    // mark as OFFERED (not active yet)
    state.repairQuest.offered = true;

    state.repairQuest.lastActivated = Date.now();
    state.repairQuest.dailyCount++;

  
    if (el.shopPanel) el.shopPanel.style.display = "none";
    if (el.repairPanel) el.repairPanel.style.display = "block";

 

    saveState();
}

function acceptRepairQuest() {

    if (state.repairQuest.active) return;

    state.repairQuest.active = true;
    state.repairQuest.offered = false;

    state.repairQuest.completed = false;
    state.repairQuest.progress = 0;
    state.repairQuest.required = 20;

    if (el.repairPanel) el.repairPanel.style.display = "block";

    alert("🛠️ Repair Quest Accepted! Complete 20 min movement.");

    saveState();
    updateDisplay();
}



   // =============================
// BIND HELPER
// =============================
function bind(id, fn, event = "click") {
    const node = document.getElementById(id);

    if (!node) {
        console.warn(`Bind failed: #${id} not found`);
        return;
    }

    node.addEventListener(event, fn);
}


// =============================
// BUTTON BINDINGS
// =============================

// Core actions
bind("movementDoneBtn", setMovementGoal);
bind("logExtraMovementBtn", logMovement);
bind("logGlucoseBtn", logGlucose);
bind("convertGoldBtn", convertXPtoGold);

// Shop
bind("openShopBtn", () => {
    if (el.shopPanel) el.shopPanel.style.display = "block";
});

bind("closeShopBtn", () => {
    if (el.shopPanel) el.shopPanel.style.display = "none";

    // penalty only if player exits without resolving
    if (state.pendingDessertPenalty) {
        addXP(state.pendingDessertPenalty.value);
        alert(`-40 XP applied for ${state.pendingDessertPenalty.food}`);

        state.pendingDessertPenalty = null;

        saveState();
        updateDisplay();
    }
});

// Rewards
bind("tier5Btn", () => spendGold(5, "Tier 5 Reward"));
bind("tier10Btn", () => spendGold(10, "Tier 10 Reward"));

bindTierPreview("tier5Btn", 5);
bindTierPreview("tier10Btn", 10);


// =============================
// LOCK IN DAY
// =============================
bind("lockInBtn", () => {

    if (state.todayLocked) {
        alert("Day is locked. Clear today to make changes.");
        return;
    }

    // enforce movement rule once
    if (!state.goalCompleted) {
        checkMovementPenalty("lockin");
    }

    // ensure repair quest can still appear
    triggerRepairQuest();

    state.todayLocked = true;

    const protectedButtons = new Set([
        "clearTodayBtn",
        "clearAllBtn",
        "lockInBtn",
        "acceptRepairBtn",
        "closeRepairBtn"
    ]);

    document.querySelectorAll("button").forEach(btn => {
        btn.disabled = !protectedButtons.has(btn.id);
    });

    saveState();
    updateDisplay();

    alert("Locked in for today.");
});


// =============================
// REPAIR PANEL CONTROLS
// =============================
bind("closeRepairBtn", () => {
    if (el.repairPanel) el.repairPanel.style.display = "none";
});

bind("acceptRepairBtn", acceptRepairQuest);


// =============================
// CLEAR TODAY (DAILY RESET)
// =============================
bind("clearTodayBtn", () => {

    // Reset daily stats
    state.dailyXP = 0;
    state.dailyMovementMinutes = 0;
    state.goalCompleted = false;
    state.movementPenaltyApplied = false;
    state.lastMovementCheck = Date.now();

    // Reset logs
    state.glucoseLogs = [];
    state.nutritionLogs = [];
    state.nutrition = {
        protein: 0,
        veg: 0,
        hydration: 0,
        carbs: 0,
        dessert: 0
    };

    // FULL repair quest reset (fixes stale states)
    state.repairQuest.active = false;
    state.repairQuest.offered = false;
    state.repairQuest.completed = false;
    state.repairQuest.progress = 0;

    // Clear DOM logs safely
    const nutritionListEl = document.getElementById("nutritionItems");
    if (nutritionListEl) nutritionListEl.innerHTML = "";

    const glucoseListEl = document.getElementById("glucoseLogItems");
    if (glucoseListEl) glucoseListEl.innerHTML = "";

    el.extraMovementOutput.textContent = "";
    el.glucoseOutput.textContent = "";
    el.glucoseAlert.textContent = "";

    // Unlock day
    state.todayLocked = false;

    // Re-enable all buttons
    document.querySelectorAll("button").forEach(btn => {
        btn.disabled = false;
    });

    saveState();
    updateDisplay();
});


// =============================
// CLEAR ALL (FULL RESET)
// =============================
bind("clearAllBtn", () => {
    if (confirm("Are you sure you want to reset all progress?")) {
        localStorage.removeItem(STORAGE_KEY);
        location.reload();
    }
});



    // =============================
// INIT
// =============================
loadState();

// Ensure state is consistent BEFORE UI renders
checkMovementTimeout();

// Initial render AFTER all state corrections
updateDisplay();

// Run timeout check every minute
setInterval(() => {
    checkMovementTimeout();
    updateDisplay(); // keeps UI in sync with any penalties/resets
}, 60000);

});
