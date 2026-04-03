document.addEventListener("DOMContentLoaded", function () { //event listener- loads the html

    // =============================
    // CONSTANTS
    // =============================
    const TODAY = new Date().toISOString().slice(0, 10); //new Date and Time
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

        todayLocked: false, //LockInToday - prevent changes after button selected

        glucoseLogs: [],

        convertThreshold: 500,

        goldSpentThisWeek: 0,
        lastSpendReset: TODAY
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
        const parsed = JSON.parse(saved);  //handles corrupted JSON

        if (!parsed.glucoseLogs) parsed.glucoseLogs = [];

        Object.assign(state, parsed);

    } catch (e) {
        console.warn("Load failed:", e); //JSON parsing fails- catches error
    }
}

    // =============================
    // REWARDS
    // =============================
    const rewards = {
        5: ["Cookie", "Hot Cocoa", "Chips", "Pudding", "Soda/Juice", "Candy"],
        10: ["Boba/Starbee Drink", "Ice cream", "Milk Shake", "Bakery Treat", "Cake/Pie", "Alcohol"]
    };

    // =============================
    // DOM ELEMENTS
    // =============================
    const el = {
        xpResult: document.getElementById("xpResult"),
        weeklyXpResult: document.getElementById("weeklyXpResult"),
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

        //proteinCount: document.getElementById("proteinCount"),
        //vegCount: document.getElementById("vegCount"),
        //hydrationCount: document.getElementById("hydrationCount"),
        

        movementGoalDisplay: document.getElementById("movementGoalDisplay")
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
        const today = new Date().toISOString().slice(0, 10);
        if (state.lastSpendReset !== today) {
            state.goldSpentThisWeek = 0;
            state.lastSpendReset = today;
        }
    }

    // =============================
    // DISPLAY
    // =============================
    function updateDisplay() {
        // Stats
        el.xpResult.textContent = state.dailyXP;
        el.goldResult.textContent = state.gold;

        // Date/Time
        el.dateTimeDisplay.textContent = getFormattedDateTime();

        // Movement
       if (state.movementGoal) {
    el.movementGoalDisplay.textContent =
        `${state.dailyMovementMinutes} / ${state.movementGoal} min`;
} else {
    el.movementGoalDisplay.textContent = "Not Set";
}

        // Gold cap
        if (state.gold > 1000) {
            state.gold = 1000;
            alert("Gold cap reached (1000)");
        }

        // XP progress
        el.xpProgressBar.max = 500; // tracks 500 XP
        el.xpProgressBar.value = state.weeklyXP; 
        el.xpProgressText.textContent = `${state.weeklyXP} / 500 XP`;
        el.convertGoldBtn.disabled = state.weeklyXP < 500;

        resetWeeklySpendIfNeeded();
        el.spendCountDisplay.textContent = `Used: ${state.goldSpentThisWeek} / 2 purchases this week`;

        // Glucose Logs
        const glucoseListEl = document.getElementById("glucoseLogItems");
        glucoseListEl.innerHTML = "";
        state.glucoseLogs.forEach(log => {
            const li = document.createElement("li");
            li.textContent = `${log.time} — ${log.type}: ${log.value} (${log.xp} XP)`;
            if (log.critical) {
                li.style.color = "#FF6388";
                li.style.fontWeight = "bold";
            }
            glucoseListEl.appendChild(li);
        });
    }

    // =============================
    // XP → GOLD
    // =============================
   function convertXPtoGold() {
    const thresholdXP = 500; // minimum XP needed to convert
    const goldPer100XP = 1;  // conversion rate

    if (state.weeklyXP < thresholdXP) {
        alert(`Need at least ${thresholdXP} XP to convert to 5 Gold`);
        return;
    }

    // 500 XP = 5 Gold, using 100 XP → 1 Gold internally
    const goldEarned = Math.floor(state.weeklyXP / 100); // 1 gold per 100 XP
    state.weeklyXP = state.weeklyXP % 100; // remainder XP stays
    state.gold += goldEarned;

    saveState();
    updateDisplay();
    alert(`Converted ${goldEarned} Gold`);
}

    // =============================
    // MOVEMENT
    // =============================
    function setMovementGoal() {
        const goal = parseInt(prompt("Enter movement goal (minutes)"), 10);
        if (!goal || goal < 3 || goal > 600) {
            alert("Goal must be between 3 and 600 minutes");
            return;
        }
        const xp = parseInt(prompt("Enter XP reward"), 10);
        if (!xp) return;

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
    if (!extra) return;

    state.dailyMovementMinutes += extra;

    if (!state.goalCompleted && state.dailyMovementMinutes >= state.movementGoal) {
        state.goalCompleted = true;
        addXP(state.goalXP); // goal XP
        const bonus = state.dailyMovementMinutes - state.movementGoal;
        if (bonus > 0) {
            addXP(bonus); // 1 XP per extra minute
            el.extraMovementOutput.textContent = `Goal completed! Bonus +${bonus} XP`;
        } else {
            el.extraMovementOutput.textContent = "Goal completed!";
        }
    } else if (state.goalCompleted) {
        addXP(extra); // 1 XP per minute after goal
        el.extraMovementOutput.textContent = `Bonus +${extra} XP`;
    } else {
        el.extraMovementOutput.textContent = `${state.dailyMovementMinutes} / ${state.movementGoal} min`;
    }

    el.extraMovementInput.value = "";
    saveState();
    updateDisplay();
}

    // =============================
    // SHOP
    // =============================
    function spendGold(cost, label) {
    resetWeeklySpendIfNeeded();

    if (state.goldSpentThisWeek >= 2) {
        alert("Weekly spend limit reached");
        return;
    }

    if (state.gold < cost) {
        alert("Not enough gold");
        return;
    }

    state.gold -= cost;
    state.goldSpentThisWeek++;

    // ✅ CANCEL penalty if exists
    if (state.pendingDessertPenalty) {
        state.pendingDessertPenalty = null;
        alert("Penalty avoided!");
    } else {
        alert(`Purchased ${label} (-${cost})`);
    }

    saveState();
    updateDisplay();
}

    function showRewardPreview(tier) {
        const items = rewards[tier];
        if (!items || !el.rewardPreview) return;
        el.rewardPreview.innerHTML = `<strong>${tier} Gold Tier Rewards:</strong>
            <ul>${items.map(i => `<li>${i}</li>`).join("")}</ul>`;
    }

    function bindTierPreview(id, tier) {
        const btn = document.getElementById(id);
        if (!btn) return;
        btn.addEventListener("mouseenter", () => showRewardPreview(tier));
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

const categoryValues = {
    protein: 20,
    veg: 10,
    hydration: 2,
    carbs: 0
};

pendingDessertPenalty: null

document.getElementById("logFoodBtn").addEventListener("click", function () {
    const input = document.getElementById("nutritionInput").value.toLowerCase().trim();

    // ✅ 1. Diabetic-friendly desserts
    if (input in diabeticFriendlyDesserts) {
        const xp = diabeticFriendlyDesserts[input].value;

        addXP(xp);
        state.nutrition.dessert += xp;

        const li = document.createElement("li");
        li.textContent = `${input} (dessert: +${xp} XP)`;
        document.getElementById("nutritionItems").appendChild(li);
    }

    // ❌ 2. Non-diabetic desserts
    else if (input in nonDiabeticDesserts) {

        if (state.gold >= 5) {
            state.pendingDessertPenalty = {
                value: -40,
                food: input
            };

            if (el.shopPanel) el.shopPanel.style.display = "block";

            alert(`This dessert is not diabetic-friendly! Spend 5 gold to avoid losing 40 XP.`);
            return;
        } 
        
        else {
            alert(`Not enough gold! -40 XP applied for ${input}.`);

            addXP(-40);
            state.nutrition.dessert -= 40;

            const li = document.createElement("li");
            li.textContent = `${input} (dessert: -40 XP)`;
            document.getElementById("nutritionItems").appendChild(li);
        }
    }

    // 🥗 3. Normal food
    else if (input in foodDataset) {
        const food = foodDataset[input];
        const valueToAdd = food.value;

        addXP(valueToAdd);
        state.nutrition[food.category] += valueToAdd;

        const li = document.createElement("li");
        li.textContent = `${input} (${food.category}: ${valueToAdd >= 0 ? '+' : ''}${valueToAdd} XP)`;
        document.getElementById("nutritionItems").appendChild(li);
    }

    // 🍽 4. Meals
    else if (input in mealDataset) {
        const meal = mealDataset[input];
        let mealTotal = 0;

        meal.forEach(category => {
            const value = categoryValues[category] || 0;
            state.nutrition[category] += value;
            mealTotal += value;
        });

        addXP(mealTotal);

        const li = document.createElement("li");
        li.textContent = `${input} (meal total: ${mealTotal}) → ${meal.join(", ")}`;
        document.getElementById("nutritionItems").appendChild(li);
    }

    else {
        alert("Food or meal not found in the dataset!");
    }

    // Update totals display
    document.getElementById("nutritionOutput").innerText =
        `Totals → Protein: ${state.nutrition.protein}, Veg: ${state.nutrition.veg}, Hydration: ${state.nutrition.hydration}, Carbs: ${state.nutrition.carbs}, Dessert: ${state.nutrition.dessert}`;

    document.getElementById("nutritionInput").value = "";
    saveState();
});


    // =============================
    // GLUCOSE
    // =============================
    function logGlucose() {
        const value = Number(el.glucoseInput.value);
        if (isNaN(value)) {
            alert("Enter glucose");
            return;
        }

        if (el.fastingCheck.checked && el.postMealCheck.checked) {
            alert("Select only one: fasting OR Non-Fasting");
            return;
        }

        let xp = 0;
        let type = "";
        if (el.fastingCheck.checked) {
            type = "Fasting";
            xp = value < 130 ? 5 : 0;
        } else if (el.postMealCheck.checked) {
            type = "Post-meal";
            xp = value < 180 ? 10 : 0;
        }

        // Critical check
        let critical = false;
        let alertMessage = "";

        if (value <= 0) {
    alert("Glucose value must be positive");
    return;
}

        if (value <= 70) {
            critical = true;
            alertMessage = "⚠️ Low glucose! Consume 15g of quick-acting carbs (juice, glucose tabs, candy). Stay calm and recheck in 15 minutes.";
        } else if (value >= 200) {
            critical = true;
            alertMessage = "⚠️ High glucose! Hydrate with 1-2 cups water or sugar-free fluids. Consider a light 10-minute walk if you feel well.";
        } else {
            alertMessage = "Within Range! Good Job!";
        }

        addXP(xp);

        // Save entry
        state.glucoseLogs.push({
            value,
            type,
            xp,
            critical,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        });

        el.glucoseOutput.textContent = `Logged: ${value} (${xp} XP)`;
        el.glucoseAlert.textContent = alertMessage;
        el.glucoseAlert.style.color = critical ? "#FF6388" : "#A9D66D";
	

        el.glucoseInput.value = "";
        el.fastingCheck.checked = false;
        el.postMealCheck.checked = false;

        saveState();
        updateDisplay();
    }

    // =============================
    // BIND HELPER
    // =============================
    function bind(id, fn) {
        const node = document.getElementById(id);
        if (node) node.addEventListener("click", fn);
    }

    // =============================
    // BUTTON BINDINGS
    // =============================
    bind("movementDoneBtn", setMovementGoal);
    bind("logExtraMovementBtn", logMovement);
    bind("logGlucoseBtn", logGlucose);
    bind("convertGoldBtn", convertXPtoGold);

    bind("openShopBtn", () => { if (el.shopPanel) el.shopPanel.style.display = "block"; });
    bind("closeShopBtn", () => {
    if (el.shopPanel) el.shopPanel.style.display = "none";

    // ❌ User closed without spending → apply penalty
    if (state.pendingDessertPenalty) {
        addXP(state.pendingDessertPenalty.value);

        alert(`-40 XP applied for ${state.pendingDessertPenalty.food}`);

        state.pendingDessertPenalty = null;

        saveState();
        updateDisplay();
    }
});
    bind("tier5Btn", () => spendGold(5, "Tier 5 Reward"));
    bind("tier10Btn", () => spendGold(10, "Tier 10 Reward"));
    bindTierPreview("tier5Btn", 5);
    bindTierPreview("tier10Btn", 10);

  

   bind("lockInBtn", () => {
    if (state.todayLocked) {
        alert("Day is locked in. Clear the day to make changes.");
        return; // stops further action
    }

    // First-time lock
    state.todayLocked = true;
    saveState();
    updateDisplay();
    alert("Locked in for today.");

    // Disable other buttons
    document.querySelectorAll("button").forEach(btn => {
        if (!["clearTodayBtn", "clearAllBtn", "lockInBtn"].includes(btn.id)) {
            btn.disabled = true;
        }
    });
});

    bind("clearTodayBtn", () => {
    state.dailyXP = 0;
    state.dailyMovementMinutes = 0;
    state.goalCompleted = false;
    state.glucoseLogs = [];
   

  
    state.nutrition = {
        protein: 0,
        veg: 0,
        hydration: 0,
        carbs: 0,
        dessert: 0,
        
    };

     // Clear nutrition log DOM
    const nutritionListEl = document.getElementById("nutritionItems");
    if (nutritionListEl) nutritionListEl.innerHTML = "";

    // Only unlock the day for clearTodayBtn
    state.todayLocked = false;

    // Re-enable buttons
    document.querySelectorAll("button").forEach(btn => {
        btn.disabled = false;
    });


    saveState();
    updateDisplay();
});
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
    updateDisplay();
    setInterval(() => { el.dateTimeDisplay.textContent = getFormattedDateTime(); }, 60000);

});
