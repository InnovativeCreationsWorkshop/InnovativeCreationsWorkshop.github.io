document.addEventListener("DOMContentLoaded", function () {


// =============================
// STATE
// =============================

let movementGoal = 0;
let goalXP = 0;
let goalLocked = false;
let goalCompleted = false;

let dailyMovementMinutes = 0;
let dailyXP = 0;
let weeklyXP = 0;
let gold = 0;

let todayLocked = false;

let today = new Date().toISOString().slice(0,10);


// =============================
// FOOD TRACKING
// =============================

let proteinCount = Number(localStorage.getItem("protein_"+today)) || 0;
let vegCount = Number(localStorage.getItem("veg_"+today)) || 0;
let hydrationCount = Number(localStorage.getItem("hydration_"+today)) || 0;
let warmCount = Number(localStorage.getItem("warm_"+today)) || 0;


// =============================
// DOM
// =============================

const xpResult = document.getElementById("xpResult");
const weeklyXpResult = document.getElementById("weeklyXpResult");
const goldResult = document.getElementById("goldResult");

const movementGoalDisplay = document.getElementById("movementGoalDisplay");

const extraMovementInput = document.getElementById("extraMovementInput");
const extraMovementOutput = document.getElementById("extraMovementOutput");

const proteinDisplay = document.getElementById("proteinCount");
const vegDisplay = document.getElementById("vegCount");
const hydrationDisplay = document.getElementById("hydrationCount");
const warmDisplay = document.getElementById("warmCount");

const glucoseInput = document.getElementById("glucoseInput");
const fastingCheck = document.getElementById("fastingCheck");
const postMealCheck = document.getElementById("postMealCheck");
const glucoseOutput = document.getElementById("glucoseOutput");


// =============================
// STORAGE
// =============================

function saveData(){

localStorage.setItem("movementGoal", movementGoal);
localStorage.setItem("goalXP", goalXP);
localStorage.setItem("goalLocked", goalLocked);
localStorage.setItem("goalCompleted", goalCompleted);

localStorage.setItem("dailyMovementMinutes", dailyMovementMinutes);
localStorage.setItem("dailyXP", dailyXP);
localStorage.setItem("weeklyXP", weeklyXP);
localStorage.setItem("gold", gold);

localStorage.setItem("todayLocked", todayLocked);

}

function loadData(){

movementGoal = Number(localStorage.getItem("movementGoal")) || 0;
goalXP = Number(localStorage.getItem("goalXP")) || 0;

goalLocked = localStorage.getItem("goalLocked") === "true";
goalCompleted = localStorage.getItem("goalCompleted") === "true";

dailyMovementMinutes = Number(localStorage.getItem("dailyMovementMinutes")) || 0;
dailyXP = Number(localStorage.getItem("dailyXP")) || 0;

weeklyXP = Number(localStorage.getItem("weeklyXP")) || 0;
gold = Number(localStorage.getItem("gold")) || 0;

todayLocked = localStorage.getItem("todayLocked") === "true";

}


// =============================
// DISPLAY
// =============================

function updateDisplay(){

if(xpResult) xpResult.textContent = dailyXP;
if(weeklyXpResult) weeklyXpResult.textContent = weeklyXP;
if(goldResult) goldResult.textContent = gold;

if(movementGoalDisplay && goalLocked)
movementGoalDisplay.textContent = `${movementGoal} min +${goalXP} XP`;

if(proteinDisplay) proteinDisplay.textContent = proteinCount;
if(vegDisplay) vegDisplay.textContent = vegCount;
if(hydrationDisplay) hydrationDisplay.textContent = hydrationCount;
if(warmDisplay) warmDisplay.textContent = warmCount;

}


// =============================
// MOVEMENT
// =============================

function setNewGoal(){

const goal = parseInt(prompt("Movement goal minutes"),10);
if(!goal) return;

const xp = parseInt(prompt("XP reward"),10);
if(!xp) return;

movementGoal = goal;
goalXP = xp;

goalLocked = true;
goalCompleted = false;
dailyMovementMinutes = 0;

saveData();
updateDisplay();

}

function logMovement(){

if(!goalLocked) return alert("Set goal first");

if(todayLocked) return alert("Day locked");

const extra = parseInt(extraMovementInput.value,10);

if(!extra) return;

dailyMovementMinutes += extra;

if(!goalCompleted && dailyMovementMinutes >= movementGoal){

goalCompleted = true;
dailyXP += goalXP;

const bonus = dailyMovementMinutes - movementGoal;

if(bonus>0) dailyXP += bonus;

extraMovementOutput.textContent = "Goal completed";

}

else if(goalCompleted){

dailyXP += extra;
extraMovementOutput.textContent = `Bonus +${extra} XP`;

}

else{

extraMovementOutput.textContent =
`${dailyMovementMinutes}/${movementGoal} minutes`;

}

extraMovementInput.value="";

saveData();
updateDisplay();

}


// =============================
// FOOD
// =============================

function addProtein(){

if(proteinCount>=5) return;

proteinCount++;
dailyXP+=20;

localStorage.setItem("protein_"+today, proteinCount);

saveData();
updateDisplay();

}

function addVeg(){

if(vegCount>=5) return;

vegCount++;
dailyXP+=10;

localStorage.setItem("veg_"+today, vegCount);

saveData();
updateDisplay();

}

function addHydration(){

hydrationCount++;
dailyXP+=2;

localStorage.setItem("hydration_"+today, hydrationCount);

saveData();
updateDisplay();

}

function addWarm(){

warmCount++;
dailyXP+=2;

localStorage.setItem("warm_"+today, warmCount);

saveData();
updateDisplay();

}


// =============================
// GLUCOSE
// =============================

function logGlucose(){

const value = Number(glucoseInput.value);
if(!value) return alert("Enter glucose");

let earnedXP = 0;
let message = "";

if(fastingCheck.checked){

earnedXP = value < 130 ? 5 : 0;

message = earnedXP
? `Fasting ${value}: +5 XP`
: `Fasting ${value}: 0 XP`;

}

if(postMealCheck.checked){

earnedXP = value < 180 ? 10 : 0;

message = earnedXP
? `Post-meal ${value}: +10 XP`
: `Post-meal ${value}: 0 XP`;

}

dailyXP += earnedXP;

glucoseOutput.textContent = message;

glucoseInput.value="";
fastingCheck.checked=false;
postMealCheck.checked=false;

saveData();
updateDisplay();

}


// =============================
// DAY CONTROL
// =============================

function lockInToday(){

if(todayLocked) return alert("Already locked");

if(goalLocked && !goalCompleted){

dailyXP -= 150;
alert("Goal not met: -150 XP");

}

weeklyXP += dailyXP;

todayLocked = true;

saveData();
updateDisplay();

}

function clearToday(){

dailyMovementMinutes = 0;
dailyXP = 0;
goalCompleted = false;
todayLocked = false;

proteinCount = 0;
vegCount = 0;
hydrationCount = 0;
warmCount = 0;

localStorage.removeItem("protein_"+today);
localStorage.removeItem("veg_"+today);
localStorage.removeItem("hydration_"+today);
localStorage.removeItem("warm_"+today);

saveData();
updateDisplay();

}

function resetAll(){

localStorage.clear();

movementGoal = 0;
goalXP = 0;
goalLocked = false;
goalCompleted = false;

dailyMovementMinutes = 0;
dailyXP = 0;
weeklyXP = 0;
gold = 0;

proteinCount = 0;
vegCount = 0;
hydrationCount = 0;
warmCount = 0;

todayLocked = false;

updateDisplay();

}


// =============================
// EVENT LISTENERS
// =============================

function bind(id, func){

const el = document.getElementById(id);

if(el) el.addEventListener("click", func);

}

bind("movementDoneBtn", setNewGoal);
bind("logExtraMovementBtn", logMovement);
bind("addProteinBtn", addProtein);
bind("addvegBtn", addVeg);
bind("addHydrationBtn", addHydration);
bind("addwarmBtn", addWarm);

bind("logGlucoseBtn", logGlucose);

bind("lockInBtn", lockInToday);
bind("clearTodayBtn", clearToday);
bind("clearAllBtn", resetAll);


// =============================
// STARTUP
// =============================

loadData();
updateDisplay();

});
