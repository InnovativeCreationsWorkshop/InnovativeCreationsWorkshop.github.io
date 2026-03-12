// ======== VARIABLES ========
let movementGoal = 0;
let goalXP = 0;
let goalLocked = false;
let dailyMovementMinutes = 0;
let dailyXP = 0;
let weeklyXP = 0;
let gold = 0;
let todayLocked = false;
let goalCompleted = false; // tracks if goal XP awarded

// Food / hydration
let today = new Date().toISOString().slice(0, 10);
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

// ======== FUNCTIONS ========

function updateDisplay() {
    xpResult.textContent = dailyXP;
    weeklyXpResult.textContent = weeklyXP;
    goldResult.textContent = gold;
    proteinDisplay.textContent = proteinCount;
    vegDisplay.textContent = vegCount;
    hydrationDisplay.textContent = hydrationCount;
    warmDisplay.textContent = warmCount;
}

// Set or replace a movement goal
function setNewGoal() {
    if (goalLocked && !todayLocked) {
        const confirmReplace = confirm("A goal is already set. Do you want to replace it?");
        if (!confirmReplace) return;
    }

    movementGoal = parseInt(prompt("What is your movement goal (minutes)?"), 10);
    if (isNaN(movementGoal) || movementGoal <= 0) {
        alert("Invalid goal!");
        return;
    }

    goalXP = parseInt(prompt("How much XP is this goal worth?"), 10);
    if (isNaN(goalXP) || goalXP <= 0) {
        alert("Invalid XP!");
        return;
    }

    goalLocked = true;
    goalCompleted = false;
    dailyMovementMinutes = 0;
    dailyXP = 0;
    extraMovementOutput.textContent = "";

    movementGoalDisplay.textContent = `${movementGoal} min +${goalXP} XP`;
    updateDisplay();
}

// Log extra movement minutes
function logExtraMovement() {
    if (!goalLocked) { alert("Set your goal first!"); return; }
    if (todayLocked) { alert("Today's locked! Cannot log more."); return; }

    const extraMinutes = parseInt(extraMovementInput.value, 10);
    if (isNaN(extraMinutes) || extraMinutes <= 0) { alert("Enter a valid number of minutes."); return; }

    dailyMovementMinutes += extraMinutes;

    if (!goalCompleted && dailyMovementMinutes >= movementGoal) {
        dailyXP += goalXP;
        goalCompleted = true;

        const bonusMinutes = dailyMovementMinutes - movementGoal;
        if (bonusMinutes > 0) dailyXP += bonusMinutes;

        extraMovementOutput.textContent = `Goal completed! +${goalXP} XP${bonusMinutes > 0 ? " +"+bonusMinutes+" XP bonus" : ""}`;
    } else if (goalCompleted) {
        dailyXP += extraMinutes;
        extraMovementOutput.textContent = `Bonus: +${extraMinutes} XP`;
    } else {
        extraMovementOutput.textContent = `Logged ${dailyMovementMinutes} / ${movementGoal} minutes`;
    }

    extraMovementInput.value = "";
    updateDisplay();
}

// ===== FOOD / HYDRATION FUNCTIONS =====
function addProtein() {
    if (proteinCount >= 5) return;
    proteinCount += 1;
    dailyXP += 20;
    localStorage.setItem("protein_" + today, proteinCount);
    localStorage.setItem("dailyXP_" + today, dailyXP);
    updateDisplay();
}

function addVeg() {
    if (vegCount >= 5) return;
    vegCount += 1;
    dailyXP += 10;
    localStorage.setItem("veg_" + today, vegCount);
    localStorage.setItem("dailyXP_" + today, dailyXP);
    updateDisplay();
}

function addHydration() {
    hydrationCount += 1;
    dailyXP += 2;
    localStorage.setItem("hydration_" + today, hydrationCount);
    localStorage.setItem("dailyXP_" + today, dailyXP);
    updateDisplay();
}

function addWarm() {
    warmCount += 1;
    dailyXP += 2;
    localStorage.setItem("warm_" + today, warmCount);
    localStorage.setItem("dailyXP_" + today, dailyXP);
    updateDisplay();
}

// ===== GLUCOSE SYSTEM =====
const glucoseInput = document.getElementById("glucoseInput");
const fastingCheck = document.getElementById("fastingCheck");
const postMealCheck = document.getElementById("postMealCheck");
const logGlucoseBtn = document.getElementById("logGlucoseBtn");
const glucoseOutput = document.getElementById("glucoseOutput");

logGlucoseBtn.addEventListener("click", function () {

  const value = Number(glucoseInput.value);
  const isFasting = fastingCheck.checked;
  const isPostMeal = postMealCheck.checked;

  if (!value) {
    alert("Enter a glucose value");
    return;
  }

  if (isFasting && isPostMeal) {
    alert("Select only Fasting OR Post-Meal");
    return;
  }

  if (!isFasting && !isPostMeal) {
    alert("Select either Fasting OR Post-Meal");
    return;
  }

  let earnedXP = 0;
  let message = "";

  // ===== XP RULES =====
  if (isFasting) {
    earnedXP = value < 130 ? 5 : 0;
    message = value < 130
      ? `Fasting glucose ${value}: That's a Flex! +5 XP`
      : `Fasting glucose ${value}: Small Steps Add Up. 0 XP`;
  }

  if (isPostMeal) {
    earnedXP = value < 180 ? 10 : 0;
    message = value < 180
      ? `Post-meal glucose ${value}: Straight Up Crushing It! +10 XP`
      : `Post-meal glucose ${value}: Progress, Not Perfection! 0 XP`;
  }

 // ===== APPLY XP =====
dailyXP += earnedXP;
localStorage.setItem("dailyXP_" + today, dailyXP);

glucoseOutput.textContent = message;

updateDisplay();


  // Reset inputs
  glucoseInput.value = "";
  fastingCheck.checked = false;
  postMealCheck.checked = false;
});



// Lock in today's progress
function lockInToday() {
    if (todayLocked) { alert("Today's already locked!"); return; }

    if (goalLocked && !goalCompleted) {
        dailyXP -= 150; // penalty
        alert(`Goal not met. -150 XP penalty applied.`);
    } else if (goalLocked && goalCompleted) {
        alert(`Day locked! Total movement XP: ${dailyXP}`);
    }

    weeklyXP += dailyXP;
    todayLocked = true;
    updateDisplay();
}

// Clear today's movement and XP
function clearToday() {

    // Reset daily-only values
    dailyMovementMinutes = 0;
    dailyXP = 0;
    goalCompleted = false;
    todayLocked = false;

    // Reset food counts
    proteinCount = 0;
    vegCount = 0;
    hydrationCount = 0;
    warmCount = 0;

    // Clear output messages
    extraMovementOutput.textContent = "";
    glucoseOutput.textContent = "";

    // Remove ONLY today's stored data
    localStorage.removeItem("protein_" + today);
    localStorage.removeItem("veg_" + today);
    localStorage.removeItem("hydration_" + today);
    localStorage.removeItem("warm_" + today);
    localStorage.removeItem("dailyXP_" + today);

      updateDisplay();
}


function resetAll() {

    // ===== RESET CORE SYSTEM =====
    movementGoal = 0;
    goalXP = 0;
    goalLocked = false;
    goalCompleted = false;

    dailyMovementMinutes = 0;
    dailyXP = 0;
    weeklyXP = 0;
    gold = 0;
    todayLocked = false;

    // ===== RESET FOOD / HYDRATION COUNTS =====
    proteinCount = 0;
    vegCount = 0;
    hydrationCount = 0;
    warmCount = 0;

    // ===== CLEAR LOCAL STORAGE =====
    localStorage.removeItem("protein_" + today);
    localStorage.removeItem("veg_" + today);
    localStorage.removeItem("hydration_" + today);
    localStorage.removeItem("warm_" + today);
    localStorage.removeItem("dailyXP_" + today);

    // If you later store weeklyXP or gold, clear them here too:
    localStorage.removeItem("weeklyXP");
    localStorage.removeItem("gold");

    // ===== CLEAR UI DISPLAYS =====
    movementGoalDisplay.textContent = "Not set";
    extraMovementOutput.textContent = "";
    glucoseOutput.textContent = "";

    updateDisplay();
}

// ======== EVENT LISTENERS ========
document.getElementById("movementDoneBtn").addEventListener("click", setNewGoal);
document.getElementById("logExtraMovementBtn").addEventListener("click", logExtraMovement);
document.getElementById("lockInBtn").addEventListener("click", lockInToday);
document.getElementById("clearTodayBtn").addEventListener("click", clearToday);
document.getElementById("clearAllBtn").addEventListener("click", resetAll);

proteinBtn.addEventListener("click", addProtein);
vegBtn.addEventListener("click", addVeg);
hydrationBtn.addEventListener("click", addHydration);
warmBtn.addEventListener("click", addWarm);

// ======== INITIAL DISPLAY ========
updateDisplay();
