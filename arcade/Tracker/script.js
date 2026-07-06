document.addEventListener("DOMContentLoaded", function () {

    function getToday() {
        return new Date().toISOString().slice(0, 10);
    }

    const STORAGE_KEY = "betty_rpg_state";

    const state = {
    movementGoal: 0,
    goalXP: 0,
    goalCompleted: false,

    dailyMovementMinutes: 0,
    dailyXP: 0,
    weeklyXP: 0,
    gold: 0,

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
    repairGoal: 30,
    repairCompleted: false,

    unlockedAchievements: []
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
            if (!parsed.glucoseLogs)          parsed.glucoseLogs = [];
            if (!parsed.nutritionLogs)        parsed.nutritionLogs = [];
            if (!parsed.nutrition)            parsed.nutrition = { protein:0, veg:0, hydration:0, carbs:0, dessert:0 };
            if (!parsed.unlockedAchievements) parsed.unlockedAchievements = [];
            delete parsed.repairQuest;
            delete parsed.movementPenaltyApplied;
            Object.assign(state, parsed);
        } catch (e) {
            console.warn("Load failed:", e);
            localStorage.removeItem(STORAGE_KEY);
        }
    }

    // =============================
    // UNKNOWN FOOD MODAL
    // =============================
    const ufModal    = document.getElementById("unknown-food-modal");
    const ufFoodName = document.getElementById("ufm-food-name");
    const ufButtons  = ufModal.querySelectorAll(".ufm-btn");
    const ufCancel   = document.getElementById("ufm-cancel");
    let _ufResolve   = null;

    function promptUnknownFood(foodName) {
        return new Promise((resolve) => {
            _ufResolve = resolve;
            ufFoodName.textContent = foodName;
            ufModal.classList.add("active");
        });
    }

    function closeUnknownFoodModal() {
        ufModal.classList.remove("active");
        _ufResolve = null;
    }

    ufButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            if (!_ufResolve) return;
            _ufResolve({
                category: btn.dataset.category,
                value:    parseInt(btn.dataset.value, 10)
            });
            closeUnknownFoodModal();
        });
    });

    ufCancel.addEventListener("click", () => {
        if (_ufResolve) _ufResolve(null);
        closeUnknownFoodModal();
    });

    ufModal.addEventListener("click", (e) => {
        if (e.target === ufModal) {
            if (_ufResolve) _ufResolve(null);
            closeUnknownFoodModal();
        }
    });

    // =============================
    // REWARDS DATA
    // =============================
    const rewards = {
        5: [
            { name: "🍨 Ice Cream" },
            { name: "🍫 Chocolate Sweets" },
            { name: "🍪 Cookies" },
            { name: "🧋 Drinks" }
        ],
        10: [
            { name: "🥐 Pastry & Cupcakes" },
            { name: "🎂 Cakes & Specialty Sweets" },
            { name: "🛍️ Shopping" }
        ]
    };

    // =============================
    // ACHIEVEMENTS DATA (6 only)
    // =============================
    const achievements = [
        { id: "first_move",    emoji: "👟", name: "First Steps",   desc: "Log your first movement",     check: () => state.dailyMovementMinutes > 0 },
        { id: "goal_done",     emoji: "🏁", name: "Goal Getter",   desc: "Complete a movement goal",    check: () => state.goalCompleted },
        { id: "glucose_log",   emoji: "💉", name: "Glucose Hero",  desc: "Log a glucose reading",       check: () => state.glucoseLogs.length > 0 },
        { id: "xp_100", emoji: "⚡", name: "XP Spark", desc: "Earn 100 Daily XP", check: () => state.dailyXP >= 100 },
        { id: "gold_earned", emoji: "🪙", name: "Gold Getter", desc: "Convert XP to Gold once", check: () => state.gold > 0 },
        { id: "repair_done", emoji: "🛠️", name: "Repaired", desc: "Complete a Repair Quest", check: () => state.repairCompleted }
    ];

    // =============================
    // ACHIEVEMENT XP BONUS (+5 on first unlock)
    // =============================
    function checkAchievementUnlocks() {
        achievements.forEach(a => {
            if (a.check() && !state.unlockedAchievements.includes(a.id)) {
                state.unlockedAchievements.push(a.id);
                state.dailyXP  += 5;
                state.weeklyXP += 5;
                if (state.weeklyXP < 0) state.weeklyXP = 0;
                saveState();
            }
        });
    }

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

    document.querySelectorAll("[data-screen]").forEach(btn => {
        btn.addEventListener("click", () => showScreen(btn.dataset.screen));
    });

    document.querySelectorAll("[data-back]").forEach(btn => {
        btn.addEventListener("click", () => {
            updateDisplay();
            showScreen(btn.dataset.back);
        });
    });

    // Cycle button — external link
    document.getElementById("cycleBtn").addEventListener("click", () => {
        window.open("https://innovativecreationsworkshop.github.io/arcade/Cycle/main.html", "_blank");
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
        checkAchievementUnlocks();
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
        const dtEl = document.getElementById("dateTimeDisplay");
        if (dtEl) dtEl.textContent = getFormattedDateTime();

        const xpEl   = document.getElementById("xpResult");
        const goldEl = document.getElementById("goldResult");
        if (xpEl)   xpEl.textContent   = state.dailyXP;
        if (goldEl) goldEl.textContent = state.gold;

        if (state.gold > 1000) state.gold = 1000;

        const XP_CAP = 500;
        const fillPct = Math.min((state.weeklyXP / XP_CAP) * 100, 100);
        const barHome  = document.getElementById("xpProgressBar");
        const textHome = document.getElementById("xpProgressText");
        if (barHome)  barHome.style.width   = fillPct + "%";
        if (textHome) textHome.textContent  = `${state.weeklyXP} / ${XP_CAP}`;

        const mgEl = document.getElementById("movementGoalDisplay");
        if (mgEl) {
            mgEl.textContent = state.movementGoal
                ? `${state.dailyMovementMinutes} / ${state.movementGoal} min`
                : "Not Set";
        }

        const wkBig  = document.getElementById("weeklyXpBig");
        const achBar = document.getElementById("achieveBar");
        const achSub = document.getElementById("achieveSub");
        if (wkBig)  wkBig.textContent  = state.weeklyXP;
        if (achBar) achBar.style.width = fillPct + "%";
        if (achSub) achSub.textContent = `${state.weeklyXP} / ${XP_CAP} XP to next Gold conversion`;

        const convBtn = document.getElementById("convertGoldBtn");
        if (convBtn) convBtn.disabled = state.weeklyXP < XP_CAP;

        resetWeeklySpendIfNeeded();
        const scEl = document.getElementById("spendCountDisplay");
        if (scEl) scEl.textContent = `Used: ${state.goldSpentThisWeek} / 2 this week`;

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

       const repProg   = document.getElementById("repairProgress");
        const repGroup  = document.getElementById("repairInputGroup");
        const acceptBtn = document.getElementById("acceptRepairBtn");
        const repHint   = document.getElementById("repairHint");

        if (repProg)  repProg.textContent = `Progress: ${state.repairMinutes} / ${state.repairGoal} min`;
        if (repGroup) repGroup.style.display = state.repairActive ? "flex" : "none";

        const repairUnlocked = state.goalCompleted || state.pendingDessertPenalty;

        if (acceptBtn) {
            acceptBtn.textContent = state.repairActive ? "⚔️ Quest Active" : "⚔️ Accept Quest";
            acceptBtn.disabled = !repairUnlocked && !state.repairActive;
        }

        if (repHint) {
            if (state.pendingDessertPenalty) {
                repHint.textContent = "🍰 A Repair Quest can help offset your dessert penalty!";
                repHint.style.display = "block";
            } else if (!state.goalCompleted) {
                repHint.textContent = "🔒 Complete your movement goal to unlock Repair Quest.";
                repHint.style.display = "block";
            } else {
                repHint.style.display = "none";
            }
        }

        renderAchievements();

        const penBanner = document.getElementById("pendingPenaltyBanner");
        if (penBanner) penBanner.style.display = state.pendingDessertPenalty ? "block" : "none";
    }   // <-- closes updateDisplay()

    // =============================
    // ACHIEVEMENTS RENDER
    // =============================
    function renderAchievements() {
        const grid = document.getElementById("achieveGrid");
        if (!grid) return;
        grid.innerHTML = "";
        achievements.forEach(a => {
            const unlocked = state.unlockedAchievements.includes(a.id);
            const div = document.createElement("div");
            div.className = "achieve-badge" + (unlocked ? " unlocked" : "");
            div.innerHTML = `
                <span class="badge-emoji">${a.emoji}</span>
                <span class="badge-name">${a.name}</span>
                <span class="badge-desc">${a.desc}</span>
                ${unlocked ? '<span class="badge-bonus">+5 XP earned</span>' : ''}
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
    state.movementGoal         = goal;
    state.goalXP               = xp;
    state.goalCompleted        = false;
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
    if (!state.goalCompleted && !state.pendingDessertPenalty) {
        alert("Complete your movement goal first to unlock Repair Quest!");
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
        state.repairCompleted = true;
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
    

    function showRewardPreview(tier) {
       
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

        const preview = document.getElementById("rewardPreview");
        if (preview) preview.innerHTML = `<p class="preview-hint">Tap a tier to see rewards ✨</p>`;
        document.querySelectorAll(".tier-btn").forEach(b => b.classList.remove("selected"));
       
    }

    // =============================
    // NUTRITION
    // =============================
    const categoryValues = { protein: 20, veg: 10, hydration: 2, carbs: 0 };

    const safeFoodDataset = typeof foodDataset            !== "undefined" ? foodDataset            : {};
    const safeMealDataset = typeof mealDataset            !== "undefined" ? mealDataset            : {};
    const safeDiabetic    = typeof diabeticFriendlyDesserts !== "undefined" ? diabeticFriendlyDesserts : {};
    const safeNonDiabetic = typeof nonDiabeticDesserts    !== "undefined" ? nonDiabeticDesserts    : {};

    document.getElementById("logFoodBtn").addEventListener("click", function () {
        const inputEl = document.getElementById("nutritionInput");
        const output  = document.getElementById("nutritionOutput");
        const input   = inputEl.value.toLowerCase().trim();
        if (!input) return;

        let xp = 0;
        let category = "unknown";

        if (input in safeDiabetic) {
            xp = safeDiabetic[input].value;
            category = "dessert";
            addXP(xp);
            state.nutrition.dessert += xp;

        } else if (input in safeNonDiabetic) {
            category = "dessert";
            if (state.gold >= 5) {
                state.pendingDessertPenalty = { value: -40, food: input };
                saveState();
                updateDisplay();
                showScreen("screen-rewardshop");
                alert("⚠️ Not diabetic-friendly! Spend 5 Gold in the shop to avoid -40 XP.");
                return;
            } else {
                xp = -40;
                addXP(xp);
                state.nutrition.dessert += xp;
            }

        } else if (input in safeFoodDataset) {
            const food = safeFoodDataset[input];
            xp = food.value;
            category = food.category;
            addXP(xp);
            if (state.nutrition[food.category] !== undefined) {
                state.nutrition[food.category] += xp;
            }

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

        } else {
            promptUnknownFood(input).then(function(choice) {
                if (!choice) return;
                const xp = choice.value;
                const category = choice.category;
                addXP(xp);
                if (state.nutrition[category] !== undefined) {
                    state.nutrition[category] += xp;
                }
                state.nutritionLogs.push({ name: input, category, xp });
                output.textContent =
                    `Protein: ${state.nutrition.protein} · Veg: ${state.nutrition.veg} · Hydration: ${state.nutrition.hydration} · Carbs: ${state.nutrition.carbs}`;
                inputEl.value = "";
                saveState();
                updateDisplay();
            });
            return;
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
        document.getElementById("fastingCheck").checked  = false;
        document.getElementById("postMealCheck").checked = false;

        saveState();
        updateDisplay();
    });

    // =============================
    // CLEAR TODAY
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
    state.repairActive         = false;
    state.repairMinutes        = 0;

    document.querySelectorAll("button").forEach(btn => btn.disabled = false);

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
  checkAchievementUnlocks();
    updateDisplay();
    showScreen("screen-home");

    setInterval(() => {
        checkMovementTimeout();
        const dtEl = document.getElementById("dateTimeDisplay");
        if (dtEl) dtEl.textContent = getFormattedDateTime();
    }, 60000);
});
