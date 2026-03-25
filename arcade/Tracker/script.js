document.addEventListener("DOMContentLoaded", function () {

    // =============================
    // CONSTANTS
    // =============================
    const TODAY = new Date().toISOString().slice(0, 10);
    const STORAGE_KEY = "betty_rpg_state";

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

        nutrition: {
            protein: 0,
            veg: 0,
            hydration: 0,
            warm: 0
        },

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
        const parsed = JSON.parse(saved);

        if (!parsed.glucoseLogs) parsed.glucoseLogs = [];

        Object.assign(state, parsed);

    } catch (e) {
        console.warn("Load failed:", e);
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

        proteinCount: document.getElementById("proteinCount"),
        vegCount: document.getElementById("vegCount"),
        hydrationCount: document.getElementById("hydrationCount"),
        warmCount: document.getElementById("warmCount"),

        movementGoalDisplay: document.getElementById("movementGoalDisplay")
    };

    // =============================
    // UTILITIES
    // =============================
    function addXP(amount) {
        state.dailyXP += amount;
        state.weeklyXP += amount;
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
        el.weeklyXpResult.textContent = state.weeklyXP;
        el.goldResult.textContent = state.gold;

        // Date/Time
        el.dateTimeDisplay.textContent = getFormattedDateTime();

        // Nutrition
        el.proteinCount.textContent = state.nutrition.protein;
        el.vegCount.textContent = state.nutrition.veg;
        el.hydrationCount.textContent = state.nutrition.hydration;
        el.warmCount.textContent = state.nutrition.warm;

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
        el.xpProgressBar.max = state.convertThreshold;
        el.xpProgressBar.value = state.weeklyXP;
        el.xpProgressText.textContent = `${state.weeklyXP} / ${state.convertThreshold} XP`;
        el.convertGoldBtn.disabled = state.weeklyXP < state.convertThreshold;

        resetWeeklySpendIfNeeded();
        el.spendCountDisplay.textContent = `Used: ${state.goldSpentThisWeek} / 2 purchases this week`;

        // Glucose Logs
        const glucoseListEl = document.getElementById("glucoseLogItems");
        glucoseListEl.innerHTML = "";
        state.glucoseLogs.forEach(log => {
            const li = document.createElement("li");
            li.textContent = `${log.time} — ${log.type}: ${log.value} (${log.xp} XP)`;
            if (log.critical) {
                li.style.color = "red";
                li.style.fontWeight = "bold";
            }
            glucoseListEl.appendChild(li);
        });
    }

    // =============================
    // XP → GOLD
    // =============================
    function convertXPtoGold() {
        const threshold = 100;
        if (state.weeklyXP < threshold) {
            alert("Need at least 100 XP to convert");
            return;
        }
        const goldEarned = Math.floor(state.weeklyXP / threshold);
        state.weeklyXP = state.weeklyXP % threshold;
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
            addXP(state.goalXP);
            const bonus = state.dailyMovementMinutes - state.movementGoal;
            if (bonus > 0) addXP(Math.floor(bonus / 2));
            el.extraMovementOutput.textContent = "Goal completed!";
        } else if (state.goalCompleted) {
            addXP(extra);
            el.extraMovementOutput.textContent = `Bonus +${extra} XP`;
        } else {
            el.extraMovementOutput.textContent = `${state.dailyMovementMinutes} / ${state.movementGoal}`;
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
            document.getElementById("tier5Btn").disabled = true;
            document.getElementById("tier10Btn").disabled = true;
            return;
        }
        if (state.gold < cost) {
            alert("Not enough gold");
            return;
        }
        state.gold -= cost;
        state.goldSpentThisWeek++;
        alert(`Purchased ${label} (-${cost})`);
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
    // GLUCOSE
    // =============================
    function logGlucose() {
        const value = Number(el.glucoseInput.value);
        if (isNaN(value)) {
            alert("Enter glucose");
            return;
        }

        if (el.fastingCheck.checked && el.postMealCheck.checked) {
            alert("Select only one: fasting OR post-meal");
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

        if (value <= 70) {
            critical = true;
            alertMessage = "⚠️ Low glucose! Consume 15g of quick-acting carbs (juice, glucose tabs, candy). Stay calm and recheck in 15 minutes.";
        } else if (value >= 200) {
            critical = true;
            alertMessage = "⚠️ High glucose! Hydrate with 1-2 cups water or sugar-free fluids. Consider a light 10-minute walk if you feel well.";
        } else {
            alertMessage = "Glucose within target range. Keep up the good work!";
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
        el.glucoseAlert.style.color = critical ? "red" : "green";

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
    bind("closeShopBtn", () => { if (el.shopPanel) el.shopPanel.style.display = "none"; });
    bind("tier5Btn", () => spendGold(5, "Tier 5 Reward"));
    bind("tier10Btn", () => spendGold(10, "Tier 10 Reward"));
    bindTierPreview("tier5Btn", 5);
    bindTierPreview("tier10Btn", 10);

    bind("addProteinBtn", () => { state.nutrition.protein += 20; addXP(20); saveState(); updateDisplay(); });
    bind("addvegBtn", () => { state.nutrition.veg += 10; addXP(15); saveState(); updateDisplay(); });
    bind("addHydrationBtn", () => { state.nutrition.hydration += 2; addXP(2); saveState(); updateDisplay(); });
    bind("addwarmBtn", () => { state.nutrition.warm += 2; addXP(2); saveState(); updateDisplay(); });

    bind("lockInBtn", () => { state.todayLocked = true; saveState(); updateDisplay(); });
    bind("clearTodayBtn", () => {
    state.dailyXP = 0;
    state.dailyMovementMinutes = 0;
    state.goalCompleted = false;
    state.glucoseLogs = [];

  // ✅ RESET NUTRITION
    state.nutrition = {
        protein: 0,
        veg: 0,
        hydration: 0,
        warm: 0
    };

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
