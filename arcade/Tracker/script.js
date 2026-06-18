document.addEventListener("DOMContentLoaded", function () {

    // =============================
    // CONSTANTS
    // =============================
    function getToday() {
        return new Date().toISOString().slice(0, 10);
    }

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

        glucoseLogs: [],
        nutritionLogs: [],

        nutrition: { protein: 0, veg: 0, hydration: 0, carbs: 0, dessert: 0 },

        convertThreshold: 500,

        goldSpentThisWeek: 0,
        lastSpendReset: getToday(),

        pendingDessertPenalty: null,
        lastMovementCheck: Date.now(),

        repairActive: false,
        repairMinutes: 0,
        repairGoal: 30
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
            if (!parsed.glucoseLogs)   parsed.glucoseLogs = [];
            if (!parsed.nutritionLogs) parsed.nutritionLogs = [];
            if (!parsed.nutrition)     parsed.nutrition = { protein:0, veg:0, hydration:0, carbs:0, dessert:0 };
            delete parsed.repairQuest;
            delete parsed.movementPenaltyApplied;
            Object.assign(state, parsed);
        } catch (e) {
            console.warn("Load failed:", e);
            localStorage.removeItem(STORAGE_KEY);
        }
    }

    // =============================
    // REWARDS DATA
    // =============================
    const rewards = {
        5: [
            { name: "🍫 Chocolate & Candy" },
            { name: "🥐 Baked Desserts & Pastries" },
            { name: "🍿 Sweet Dishes & Snack Foods" },
            { name: "🥤 Drinks" }
        ],
        10: [
            { name: "🎂 Cakes & Desserts" },
            { name: "🍮 Chocolate-Centric Treats" },
            { name: "🍪 Pastries, Cookies & Specialty Sweets" },
            { name: "🧋 Drinks, Frozen & Outings" }
        ]
    };

    // =============================
    // ACHIEVEMENTS DATA
    // =============================
    const achievements = [
        { id: "first_move",    emoji: "👟", name: "First Steps",    desc: "Log your first movement",      check: () => state.dailyMovementMinutes > 0 },
        { id: "goal_done",     emoji: "🏁", name: "Goal Getter",    desc: "Complete a movement goal",     check: () => state.goalCompleted },
        { id: "glucose_log",   emoji: "💉", name: "Glucose Hero",   desc: "Log a glucose reading",        check: () => state.glucoseLogs.length > 0 },
        { id: "nutrition_log", emoji: "🥗", name: "Eat Well",       desc: "Log a nutrition entry",        check: () => state.nutritionLogs.length > 0 },
        { id: "xp_100",        emoji: "⚡", name: "XP Spark",       desc: "Earn 100 Daily XP",            check: () => state.dailyXP >= 100 },
        { id: "gold_earned",   emoji: "🪙", name: "Gold Getter",    desc: "Convert XP to Gold once",      check: () => state.gold > 0 },
        { id: "week_500",      emoji: "🏆", name: "Week Warrior",   desc: "Reach 500 Weekly XP",          check: () => state.weeklyXP >= 500 },
        { id: "repair_done",   emoji: "🛠️", name: "Repaired",       desc: "Complete a Repair Quest",      check: () => state.repairMinutes >= state.repairGoal && state.repairActive }
    ];

    // =============================
    // SCREEN ROUTING
    // =============================
    function showScreen(id) {
        document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
        const target = document.getElementById(id);
        if (target) {
            target.classList.add("active");
            window.scrollTo(0, 0);
        }
    }

    // Nav rows → screens
    document.querySelectorAll("[data-screen]").forEach(btn => {
        btn.addEventListener("click", () => showScreen(btn.dataset.screen));
    });

    // Back buttons
    document.querySelectorAll("[data-back]").forEach(btn => {
        btn.addEventListener("click", () => {
            updateDisplay();
            showScreen(btn.dataset.back);
        });
    });

    // =============================
    // HAMBURGER MENU
    // =============================
    const hbtn = document.getElementById("hbtn");
    const dd   = document.getElementById("dropdown");

    hbtn.addEventListener("click", e => {
        e.stopPropagation();
        dd.classList.toggle("open");
    });
    document.addEventListener("click", () => dd.classList.remove("open"));

    // =============================
    // UTILITIES
    // =============================
    function addXP(amount) {
        state.dailyXP  += amount;
        state.weeklyXP += amount;
        if (state.weeklyXP < 0) state.weeklyXP = 0;
        saveState();
        updateDisplay();
    }

    function getFormattedDateTime() {
        return new Date().toLocaleString([], {
            weekday: "short", year: "numeric", month: "short",
            day: "2-digit", hour: "2-digit", minute: "2-digit"
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
            resetDailyMovement();
            state.lastMovementCheck = now;
            saveState();
        }
    }

    // =============================
    // DISPLAY
    // =============================
    function updateDisplay() {
        // DateTime
        const dtEl = document.getElementById("dateTimeDisplay");
        if (dtEl) dtEl.textContent = getFormattedDateTime();

        // XP + Gold
        const xpEl   = document.getElementById("xpResult");
        const goldEl = document.getElementById("goldResult");
        if (xpEl)   xpEl.textContent   = state.dailyXP;
        if (goldEl) goldEl.textContent = state.gold;

        // Gold cap
        if (state.gold > 1000) state.gold = 1000;

        // Progress bar (home)
        const XP_CAP = 500;
        const fillPct = Math.min((state.weeklyXP / XP_CAP) * 100, 100);
        const barHome = document.getElementById("xpProgressBar");
        const textHome = document.getElementById("xpProgressText");
        if (barHome)  barHome.style.width = fillPct + "%";
        if (textHome) textHome.textContent = `${state.weeklyXP} / ${XP_CAP}`;

        // Movement goal display
        const mgEl = document.getElementById("movementGoalDisplay");
        if (mgEl) {
            mgEl.textContent = state.movementGoal
                ? `${state.dailyMovementMinutes} / ${state.movementGoal} min`
                : "Not Set";
        }

        // Achievements screen progress
        const wkBig  = document.getElementById("weeklyXpBig");
        const achBar = document.getElementById("achieveBar");
        const achSub = document.getElementById("achieveSub");
        if (wkBig)  wkBig.textContent  = state.weeklyXP;
        if (achBar) achBar.style.width = fillPct + "%";
        if (achSub) achSub.textContent = `${state.weeklyXP} / ${XP_CAP} XP to next Gold conversion`;

        // Convert button enable
        const convBtn = document.getElementById("convertGoldBtn");
        if (convBtn) convBtn.disabled = state.weeklyXP < XP_CAP;

        // Shop spend count
        resetWeeklySpendIfNeeded();
        const scEl = document.getElementById("spendCountDisplay");
        if (scEl) scEl.textContent = `Used: ${state.goldSpentThisWeek} / 2 this week`;

        // Glucose logs
        const glucoseListEl = document.getElementById("glucoseLogItems");
        if (glucoseListEl) {
            glucoseListEl.innerHTML = "";
            state.glucoseLogs.forEach(log => {
                const div = document.createElement("div");
                div.className = "log-entry";
                div.textContent = `${log.time} — ${log.type}: ${log.value} (${log.xp >= 0 ? "+" : ""}${log.xp} XP)`;
                if (log.critical) {
                    div.style.color = "#FF6388";
                    div.style.borderLeft = "3px solid #FF6388";
                }
                glucoseListEl.appendChild(div);
            });
        }

        // Nutrition logs
        const nutListEl = document.getElementById("nutritionItems");
        if (nutListEl) {
            nutListEl.innerHTML = "";
            state.nutritionLogs.forEach(entry => {
                const div = document.createElement("div");
                div.className = "log-entry";
                div.textContent = `${entry.name} (${entry.category}: ${entry.xp >= 0 ? "+" : ""}${entry.xp} XP)`;
                nutListEl.appendChild(div);
            });
        }

        // Repair quest UI
        const repOutput  = document.getElementById("repairOutput");
        const repProg    = document.getElementById("repairProgress");
        const repGroup   = document.getElementById("repairInputGroup");
        const acceptBtn  = document.getElementById("acceptRepairBtn");
        if (repProg) repProg.textContent = `Progress: ${state.repairMinutes} / ${state.repairGoal} min`;
        if (repGroup) repGroup.style.display = state.repairActive ? "flex" : "none";
        if (acceptBtn) acceptBtn.textContent = state.repairActive ? "⚔️ Quest Active" : "⚔️ Accept Quest";

        // Achievements grid
        renderAchievements();

        // Pending penalty banner
        const penBanner = document.getElementById("pendingPenaltyBanner");
        if (penBanner) penBanner.style.display = state.pendingDessertPenalty ? "block" : "none";

        
    }

    function applyLockState() {
        if (!state.todayLocked) return;
        const protectedIds = new Set(["clearTodayBtn", "clearAllBtn"]);
        document.querySelectorAll("button").forEach(btn => {
            if (!protectedIds.has(btn.id)) btn.disabled = true;
        });
    }

    // =============================
    // ACHIEVEMENTS RENDER
    // =============================
    function renderAchievements() {
        const grid = document.getElementById("achieveGrid");
        if (!grid) return;
        grid.innerHTML = "";
        achievements.forEach(a => {
            const unlocked = a.check();
            const div = document.createElement("div");
            div.className = "achieve-badge" + (unlocked ? " unlocked" : "");
            div.innerHTML = `
                <span class="badge-emoji">${a.emoji}</span>
                <span class="badge-name">${a.name}</span>
                <span class="badge-desc">${a.desc}</span>
            `;
            grid.appendChild(div);
        });
    }

    // =============================
    // XP → GOLD
    // =============================
    document.getElementById("convertGoldBtn").addEventListener("click", function () {
        if (state.weeklyXP < state.convertThreshold) {
            alert(`Need at least ${state.convertThreshold} XP to convert`);
            return;
        }
        const goldEarned = Math.floor(state.weeklyXP / 100);
        state.weeklyXP = state.weeklyXP % 100;
        state.gold += goldEarned;
        if (state.gold > 1000) state.gold = 1000;
        saveState();
        updateDisplay();
        alert(`✨ Converted to ${goldEarned} Gold!`);
    });

    // =============================
    // MOVEMENT
    // =============================
    document.getElementById("movementDoneBtn").addEventListener("click", function () {
        const goal = parseInt(prompt("Enter movement goal (minutes):"), 10);
        if (isNaN(goal) || goal < 3 || goal > 600) {
            alert("Goal must be between 3 and 600 minutes");
            return;
        }
        const xp = parseInt(prompt("Enter XP reward for completing it:"), 10);
        if (isNaN(xp) || xp <= 0) {
            alert("Enter a valid XP reward");
            return;
        }
        state.movementGoal    = goal;
        state.goalXP          = xp;
        state.goalLocked      = true;
        state.goalCompleted   = false;
        state.dailyMovementMinutes = 0;
        saveState();
        updateDisplay();
    });

    document.getElementById("logExtraMovementBtn").addEventListener("click", function () {
        const input  = document.getElementById("extraMovementInput");
        const output = document.getElementById("extraMovementOutput");
        const extra  = parseInt(input.value, 10);
        if (isNaN(extra) || extra <= 0) return;

        state.dailyMovementMinutes += extra;

        if (!state.goalCompleted && state.dailyMovementMinutes >= state.movementGoal) {
            state.goalCompleted = true;
            addXP(state.goalXP);
            const bonus = state.dailyMovementMinutes - state.movementGoal;
            if (bonus > 0) {
                addXP(bonus);
                output.textContent = `🎉 Goal complete! Bonus +${bonus} XP`;
            } else {
                output.textContent = "🎉 Goal complete!";
            }
        } else if (state.goalCompleted) {
            addXP(extra);
            output.textContent = `⚡ Bonus +${extra} XP`;
        } else {
            output.textContent = `${state.dailyMovementMinutes} / ${state.movementGoal} min`;
        }

        input.value = "";
        saveState();
        updateDisplay();
    });

    function resetDailyMovement() {
        state.dailyMovementMinutes = 0;
        state.goalCompleted  = false;
        state.todayLocked    = false;
        state.dailyXP        = 0;
        state.glucoseLogs    = [];
        state.nutritionLogs  = [];
    }

    // =============================
    // REPAIR QUEST
    // =============================
    document.getElementById("acceptRepairBtn").addEventListener("click", function () {
        if (state.repairActive) {
            alert("Quest already active! Log your minutes below.");
            return;
        }
        state.repairActive  = true;
        state.repairMinutes = 0;
        saveState();
        updateDisplay();
    });

    document.getElementById("logRepairBtn").addEventListener("click", function () {
        const input  = document.getElementById("repairMinInput");
        const output = document.getElementById("repairOutput");
        const mins   = parseInt(input.value, 10);
        if (isNaN(mins) || mins <= 0) return;

        state.repairMinutes += mins;

        if (state.repairMinutes >= state.repairGoal) {
            const bonus = state.repairMinutes - state.repairGoal;
            addXP(50 + bonus);
            output.textContent = `🛠️ Quest Complete! +${50 + bonus} XP earned!`;
            state.repairActive = false;
        } else {
            output.textContent = `${state.repairMinutes} / ${state.repairGoal} min`;
        }

        input.value = "";
        saveState();
        updateDisplay();
    });

    // =============================
    // SHOP
    // =============================
    let selectedTier = null;

    function showRewardPreview(tier) {
        selectedTier = tier;
        const preview = document.getElementById("rewardPreview");
        if (!preview) return;
        const items = rewards[tier];
        preview.innerHTML = `
            <p class="preview-title">${tier} 🪙 Tier Rewards</p>
            ${items.map(i => `<div class="preview-item">${i.name}</div>`).join("")}
            <button class="confirm-purchase-btn visible" id="confirmPurchaseBtn">🛍️ Purchase for ${tier} Gold</button>
        `;
        document.getElementById("confirmPurchaseBtn").addEventListener("click", () => spendGold(tier));
    }

    document.getElementById("tier5Btn").addEventListener("click", () => {
        document.querySelectorAll(".tier-btn").forEach(b => b.classList.remove("selected"));
        document.getElementById("tier5Btn").classList.add("selected");
        showRewardPreview(5);
    });

    document.getElementById("tier10Btn").addEventListener("click", () => {
        document.querySelectorAll(".tier-btn").forEach(b => b.classList.remove("selected"));
        document.getElementById("tier10Btn").classList.add("selected");
        showRewardPreview(10);
    });

    function spendGold(cost) {
        if (state.goldSpentThisWeek >= 2) {
            alert("Weekly spend limit reached (2 per week)");
            return;
        }
        if (state.gold < cost) {
            alert(`Not enough gold! You have ${state.gold} 🪙`);
            return;
        }
        state.gold -= cost;
        state.goldSpentThisWeek++;

        if (state.pendingDessertPenalty) {
            const food = state.pendingDessertPenalty.food;
            state.pendingDessertPenalty = null;
            alert(`✅ Penalty avoided for: ${food}!`);
        } else {
            alert(`🎉 Purchased! Enjoy your treat!`);
        }

        saveState();
        updateDisplay();

        // Reset preview
        const preview = document.getElementById("rewardPreview");
        if (preview) preview.innerHTML = `<p class="preview-hint">Tap a tier to see rewards ✨</p>`;
        document.querySelectorAll(".tier-btn").forEach(b => b.classList.remove("selected"));
        selectedTier = null;
    }

    // =============================
    // NUTRITION
    // =============================
    const categoryValues = { protein: 20, veg: 10, hydration: 2, carbs: 0 };

    const safeFoodDataset    = typeof foodDataset            !== "undefined" ? foodDataset            : {};
    const safeMealDataset    = typeof mealDataset            !== "undefined" ? mealDataset            : {};
    const safeDiabetic       = typeof diabeticFriendlyDesserts !== "undefined" ? diabeticFriendlyDesserts : {};
    const safeNonDiabetic    = typeof nonDiabeticDesserts    !== "undefined" ? nonDiabeticDesserts    : {};

    document.getElementById("logFoodBtn").addEventListener("click", function () {
        const inputEl = document.getElementById("nutritionInput");
        const output  = document.getElementById("nutritionOutput");
        const input   = inputEl.value.toLowerCase().trim();

        if (!input) return;

        let xp = 0;
        let category = "unknown";

        // 1. Diabetic dessert
        if (input in safeDiabetic) {
            xp = safeDiabetic[input].value;
            category = "dessert";
            addXP(xp);
            state.nutrition.dessert += xp;

        // 2. Non-diabetic dessert
        } else if (input in safeNonDiabetic) {
            category = "dessert";
            if (state.gold >= 5) {
                state.pendingDessertPenalty = { value: -40, food: input };
                saveState();
                updateDisplay();
                showScreen("screen-shop");
                alert("⚠️ Not diabetic-friendly! Spend 5 Gold in the shop to avoid -40 XP.");
                return;
            } else {
                xp = -40;
                addXP(xp);
                state.nutrition.dessert += xp;
            }

        // 3. Normal food
        } else if (input in safeFoodDataset) {
            const food = safeFoodDataset[input];
            xp = food.value;
            category = food.category;
            addXP(xp);
            if (state.nutrition[food.category] !== undefined) {
                state.nutrition[food.category] += xp;
            }

        // 4. Meal
        } else if (input in safeMealDataset) {
            const meal = safeMealDataset[input];
            let mealTotal = 0;
            category = "meal";
            meal.forEach(cat => {
                if (!(cat in categoryValues)) return;
                const value = categoryValues[cat];
                state.nutrition[cat] += value;
                mealTotal += value;
            });
            xp = mealTotal;
            addXP(mealTotal);

        } 

        async function handleFoodEntry(inputName) {
    let result = lookupItem(inputName);

    if (!result) {
        // Dataset miss → ask the user instead of showing an error
        const userChoice = await promptUnknownFood(inputName);

        if (!userChoice) {
            // User cancelled — do nothing
            return;
        }

        // Build a result object that matches the shape your app expects
        result = {
            type:     userChoice.category === 'combo' ? 'meal' : 'food',
            key:      inputName,              // use the raw input as the key
            category: userChoice.category,
            value:    userChoice.value,
            fromQuestionnaire: true           // flag so you can handle combos if needed
        };
    }

    // Continue with your normal point-adding logic using `result`
    console.log('Adding points:', result.value, 'for', result.key);
    // e.g. addPointsToTracker(result);
}

        state.nutritionLogs.push({ name: input, category, xp });

        output.textContent =
            `Protein: ${state.nutrition.protein} · Veg: ${state.nutrition.veg} · Hydration: ${state.nutrition.hydration} · Carbs: ${state.nutrition.carbs}`;

        inputEl.value = "";
        saveState();
        updateDisplay();
    });

    // =============================
    // GLUCOSE
    // =============================
    document.getElementById("logGlucoseBtn").addEventListener("click", function () {
        const raw   = document.getElementById("glucoseInput").value;
        const value = Number(raw);

        if (!raw || isNaN(value) || value <= 0) {
            alert("Enter a valid positive glucose value");
            return;
        }

        const fasting  = document.getElementById("fastingCheck").checked;
        const postMeal = document.getElementById("postMealCheck").checked;

        if (fasting && postMeal) {
            alert("Select only one: Fasting OR Non-Fasting");
            return;
        }

        let xp = 0, type = "Unspecified";

        if (fasting) {
            type = "Fasting";
            xp = value < 130 ? 5 : 0;
        } else if (postMeal) {
            type = "Non-Fasting";
            xp = value < 180 ? 10 : 0;
        }

        let critical = false, alertMessage = "";

        if (value <= 70) {
            critical = true;
            alertMessage = "⚠️ Low glucose! Take fast carbs and recheck in 15 min.";
        } else if (value >= 200) {
            critical = true;
            alertMessage = "⚠️ High glucose! Hydrate and consider light movement.";
        } else {
            alertMessage = "✅ Within range. Good job!";
        }

        addXP(xp);

        state.glucoseLogs.push({
            value, type, xp, critical,
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        });

        const outputEl = document.getElementById("glucoseOutput");
        const alertEl  = document.getElementById("glucoseAlert");

        if (outputEl) outputEl.textContent = `Logged: ${value} (${xp >= 0 ? "+" : ""}${xp} XP)`;
        if (alertEl) {
            alertEl.textContent = alertMessage;
            alertEl.style.color = critical ? "#FF6388" : "#A9D66D";
        }

        document.getElementById("glucoseInput").value = "";
        document.getElementById("fastingCheck").checked   = false;
        document.getElementById("postMealCheck").checked  = false;

        saveState();
        updateDisplay();
    });

    

    // =============================
    // CLEAR TODAY (DAILY RESET)
    // =============================
    document.getElementById("clearTodayBtn").addEventListener("click", function () {
        dd.classList.remove("open");

        state.dailyXP              = 0;
        state.dailyMovementMinutes = 0;
        state.goalCompleted        = false;
        state.lastMovementCheck    = Date.now();
        state.glucoseLogs          = [];
        state.nutritionLogs        = [];
        state.nutrition            = { protein:0, veg:0, hydration:0, carbs:0, dessert:0 };
        state.todayLocked          = false;
        state.repairActive         = false;
        state.repairMinutes        = 0;

        // Re-enable all buttons
        document.querySelectorAll("button").forEach(btn => btn.disabled = false);

        // Clear output texts
        ["extraMovementOutput","glucoseOutput","glucoseAlert","nutritionOutput","repairOutput"].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.textContent = "";
        });

        saveState();
        updateDisplay();
        showScreen("screen-home");
    });

    // =============================
    // RESET ALL
    // =============================
    document.getElementById("clearAllBtn").addEventListener("click", function () {
        dd.classList.remove("open");
        if (confirm("Are you sure you want to reset ALL progress? This cannot be undone.")) {
            localStorage.removeItem(STORAGE_KEY);
            location.reload();
        }
    });

    // =============================
    // INIT
    // =============================
    loadState();
    checkMovementTimeout();
    updateDisplay();
    showScreen("screen-home");

    setInterval(() => {
        checkMovementTimeout();
        // Update clock every minute
        const dtEl = document.getElementById("dateTimeDisplay");
        if (dtEl) dtEl.textContent = getFormattedDateTime();
    }, 60000);

});
