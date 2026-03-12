document.addEventListener("DOMContentLoaded", () => {


// ======== VARIABLES ========
let movementGoal = 0;
let goalXP = 0;
let goalLocked = false;
let dailyMovementMinutes = 0;
let dailyXP = 0;
let weeklyXP = 0;
let gold = 0;
let todayLocked = false;
let goalCompleted = false;


// ===== DATE =====
let today = new Date().toISOString().slice(0, 10);


// ===== FOOD STORAGE =====
let proteinCount = Number(localStorage.getItem("protein_" + today)) || 0;
let vegCount = Number(localStorage.getItem("veg_" + today)) || 0;
let hydrationCount = Number(localStorage.getItem("hydration_" + today)) || 0;
let warmCount = Number(localStorage.getItem("warm_" + today)) || 0;


// ======== DOM ELEMENTS ========
const xpResult = document.getElementById("xpResult");
const weeklyXpResult = document.getElementById("weeklyXpResult");
const goldResult = document.getElementById("goldResult");

const extraMovementInput = document.getElementById("extraMovementInput");
const extraMovementOutput = document.getElementById("extraMovementOutput");
const movementGoalDisplay = document.getElementById("movementGoalDisplay");

const proteinBtn = document.getElementById("addProteinBtn");
const proteinDisplay = document.getElementById("proteinCount");

const vegBtn = document.getElementById("addvegBtn");
const vegDisplay = document.getElementById("vegCount");

const hydrationBtn = document.getElementById("addHydrationBtn");
const hydrationDisplay = document.getElementById("hydrationCount");

const warmBtn = document.getElementById("addwarmBtn");
const warmDisplay = document.getElementById("warmCount");


// ===== GLUCOSE ELEMENTS =====
const glucoseInput = document.getElementById("glucoseInput");
const fastingCheck = document.getElementById("fastingCheck");
const postMealCheck = document.getElementById("postMealCheck");
const logGlucoseBtn = document.getElementById("logGlucoseBtn");
const glucoseOutput = document.getElementById("glucoseOutput");


// ======== DISPLAY UPDATE ========
function updateDisplay() {

    if (xpResult) xpResult.textContent = dailyXP;
    if (weeklyXpResult) weeklyXpResult.textContent = weeklyXP;
    if (goldResult) goldResult.textContent = gold;

    if (proteinDisplay) proteinDisplay.textContent = proteinCount;
    if (vegDisplay) vegDisplay.textContent = vegCount;
    if (hydrationDisplay) hydrationDisplay.textContent = hydrationCount;
    if (warmDisplay) warmDisplay.textContent = warmCount;
}


// ===== SET GOAL =====
function setNewGoal() {

    if (goalLocked && !todayLocked) {
        const confirmReplace = confirm("A goal is already set. Replace it?");
        if (!confirmReplace) return;
    }

    movementGoal = parseInt(prompt("Movement goal (minutes)?"), 10);
    if (!movementGoal) return alert("Invalid goal");

    goalXP = parseInt(prompt("XP reward for this goal?"), 10);
    if (!goalXP) return alert("Invalid XP");

    goalLocked = true;
    goalCompleted = false;
    dailyMovementMinutes = 0;
    dailyXP = 0;

    if (movementGoalDisplay)
        movementGoalDisplay.textContent = `${movementGoal} min +${goalXP} XP`;

    updateDisplay();
}


// ===== LOG MOVEMENT =====
function logExtraMovement() {

    if (!goalLocked) return alert("Set your goal first");
    if (todayLocked) return alert("Today is locked");

    const extraMinutes = parseInt(extraMovementInput.value, 10);
    if (!extraMinutes) return alert("Enter minutes");

    dailyMovementMinutes += extraMinutes;

    if (!goalCompleted && dailyMovementMinutes >= movementGoal) {

        dailyXP += goalXP;
        goalCompleted = true;

        const bonusMinutes = dailyMovementMinutes - movementGoal;
        if (bonusMinutes > 0) dailyXP += bonusMinutes;

        if (extraMovementOutput)
            extraMovementOutput.textContent =
                `Goal complete! +${goalXP} XP`;

    } else if (goalCompleted) {

        dailyXP += extraMinutes;

        if (extraMovementOutput)
            extraMovementOutput.textContent =
                `Bonus +${extraMinutes} XP`;

    } else {

        if (extraMovementOutput)
            extraMovementOutput.textContent =
                `${dailyMovementMinutes}/${movementGoal} minutes`;

    }

    extraMovementInput.value = "";
    updateDisplay();
}


// ===== FOOD SYSTEM =====
function addProtein() {

    if (proteinCount >= 5) return;

    proteinCount++;
    dailyXP += 20;

    localStorage.setItem("protein_" + today, proteinCount);
    updateDisplay();
}

function addVeg() {

    if (vegCount >= 5) return;

    vegCount++;
    dailyXP += 10;

    localStorage.setItem("veg_" + today, vegCount);
    updateDisplay();
}

function addHydration() {

    hydrationCount++;
    dailyXP += 2;

    localStorage.setItem("hydration_" + today, hydrationCount);
    updateDisplay();
}

function addWarm() {

    warmCount++;
    dailyXP += 2;

    localStorage.setItem("warm_" + today, warmCount);
    updateDisplay();
}


// ===== GLUCOSE SYSTEM =====
if (logGlucoseBtn) {

    logGlucoseBtn.addEventListener("click", () => {

        const value = Number(glucoseInput.value);

        if (!value) return alert("Enter glucose value");

        let earnedXP = 0;
        let message = "";

        if (fastingCheck.checked) {

            earnedXP = value < 130 ? 5 : 0;

            message =
                earnedXP ?
                `Fasting ${value}: +5 XP` :
                `Fasting ${value}: 0 XP`;

        }

        if (postMealCheck.checked) {

            earnedXP = value < 180 ? 10 : 0;

            message =
                earnedXP ?
                `Post Meal ${value}: +10 XP` :
                `Post Meal ${value}: 0 XP`;

        }

        dailyXP += earnedXP;

        if (glucoseOutput)
            glucoseOutput.textContent = message;

        updateDisplay();

        glucoseInput.value = "";
        fastingCheck.checked = false;
        postMealCheck.checked = false;

    });

}


// ===== LOCK DAY =====
function lockInToday() {

    if (todayLocked) return alert("Already locked");

    if (goalLocked && !goalCompleted) {
        dailyXP -= 150;
        alert("Goal missed: -150 XP");
    }

    weeklyXP += dailyXP;
    todayLocked = true;

    updateDisplay();
}


// ===== CLEAR TODAY =====
function clearToday() {

    dailyMovementMinutes = 0;
    dailyXP = 0;
    todayLocked = false;
    goalCompleted = false;

    proteinCount = 0;
    vegCount = 0;
    hydrationCount = 0;
    warmCount = 0;

    localStorage.removeItem("protein_" + today);
    localStorage.removeItem("veg_" + today);
    localStorage.removeItem("hydration_" + today);
    localStorage.removeItem("warm_" + today);

    updateDisplay();
}


// ===== RESET ALL =====
function resetAll() {

    movementGoal = 0;
    goalXP = 0;
    goalLocked = false;
    goalCompleted = false;

    dailyXP = 0;
    weeklyXP = 0;
    gold = 0;

    proteinCount = 0;
    vegCount = 0;
    hydrationCount = 0;
    warmCount = 0;

    localStorage.clear();

    if (movementGoalDisplay)
        movementGoalDisplay.textContent = "Not set";

    updateDisplay();
}


// ===== SAFE EVENT LISTENERS =====
function safeListen(id, func) {
    const el = document.getElementById(id);
    if (el) el.addEventListener("click", func);
}

safeListen("movementDoneBtn", setNewGoal);
safeListen("logExtraMovementBtn", logExtraMovement);
safeListen("lockInBtn", lockInToday);
safeListen("clearTodayBtn", clearToday);
safeListen("clearAllBtn", resetAll);

safeListen("addProteinBtn", addProtein);
safeListen("addvegBtn", addVeg);
safeListen("addHydrationBtn", addHydration);
safeListen("addwarmBtn", addWarm);

    function saveData() {

localStorage.setItem("dailyXP", dailyXP);
localStorage.setItem("weeklyXP", weeklyXP);
localStorage.setItem("gold", gold);

localStorage.setItem("movementGoal", movementGoal);
localStorage.setItem("goalXP", goalXP);
localStorage.setItem("goalCompleted", goalCompleted);
localStorage.setItem("goalLocked", goalLocked);

}

    function loadData(){

dailyXP = Number(localStorage.getItem("dailyXP")) || 0;
weeklyXP = Number(localStorage.getItem("weeklyXP")) || 0;
gold = Number(localStorage.getItem("gold")) || 0;

movementGoal = Number(localStorage.getItem("movementGoal")) || 0;
goalXP = Number(localStorage.getItem("goalXP")) || 0;

goalCompleted = localStorage.getItem("goalCompleted") === "true";
goalLocked = localStorage.getItem("goalLocked") === "true";

}


// ===== INITIAL DISPLAY =====
updateDisplay();

});
