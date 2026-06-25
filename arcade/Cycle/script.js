// ==========================
// CALENDAR TRACKER
// ==========================

const calendarGrid     = document.getElementById("calendarGrid");
const monthYear        = document.getElementById("monthYear");
const prevMonthBtn     = document.getElementById("prevMonth");
const nextMonthBtn     = document.getElementById("nextMonth");
const dayModal         = document.getElementById("dayModal");
const closeModalBtn    = document.getElementById("closeModal");
const startBtn         = document.getElementById("startBtn");
const endBtn           = document.getElementById("endBtn");
const eggplantBtn      = document.getElementById("eggplantBtn");
const removeBtn        = document.getElementById("removeBtn");
const selectedDateTitle= document.getElementById("selectedDateTitle");
const menuBtn          = document.getElementById("menuBtn");
const menuDropdown     = document.getElementById("menuDropdown");
const clearDataBtn     = document.getElementById("clearDataBtn");
const viewSummaryBtn   = document.getElementById("viewSummaryBtn");
const summaryPage      = document.getElementById("summaryPage");
const closeSummaryBtn  = document.getElementById("closeSummaryBtn");
const rainbowCount     = document.getElementById("rainbowCount");
const eggplantCount    = document.getElementById("eggplantCount");
const summaryDetails   = document.getElementById("summaryDetails");
const noteInput        = document.getElementById("noteInput");
const customTagInput   = document.getElementById("customTagInput");
const addTagBtn        = document.getElementById("addTagBtn");
const activeTags       = document.getElementById("activeTags");
const saveNoteBtn      = document.getElementById("saveNoteBtn");

// ==========================
// PHASE CONFIG
// ==========================

const PHASES = [
    { name: "Menstrual",  emoji: "🩸", startDay: 1,  endDay: 5  },
    { name: "Follicular", emoji: "🦋", startDay: 6,  endDay: 13 },
    { name: "Ovulation",  emoji: "💕", startDay: 14, endDay: 16 },
    { name: "Luteal",     emoji: "🌑", startDay: 17, endDay: 28 },
];

// ==========================
// STATE
// ==========================

let currentDate    = new Date();
let selectedDateKey= null;
let currentTags    = [];

let trackerData = JSON.parse(
    localStorage.getItem("emojiCalendarData")
) || {};


// ==========================
// SAVE
// ==========================

function saveData() {
    localStorage.setItem(
        "emojiCalendarData",
        JSON.stringify(trackerData)
    );
}


// ==========================
// DATE HELPERS
// ==========================

function formatDateKey(year, month, day) {
    return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function keyToDate(key) {
    const [y, m, d] = key.split("-").map(Number);
    return new Date(y, m - 1, d);
}

function isToday(year, month, day) {
    const now = new Date();
    return now.getFullYear() === year &&
           now.getMonth()    === month &&
           now.getDate()     === day;
}


// ==========================
// PHASE CALCULATION
// ==========================
// Given a cycle start date, stamp all 28 days
// with the appropriate phase emoji.
// Menstrual phase is overridden later by actual end date.

function stampPhases(startKey, endKey = null) {

    const startDate = keyToDate(startKey);

    if (!endKey) {
        // Start pressed — only stamp 2 days of 🩸
        for (let i = 0; i < 2; i++) {
            const d = new Date(startDate);
            d.setDate(d.getDate() + i);
            const key = formatDateKey(d.getFullYear(), d.getMonth(), d.getDate());
            if (!trackerData[key]) trackerData[key] = {};
            trackerData[key].rainbow = true;
            trackerData[key].phase   = "🩸";
            trackerData[key].phaseCycle = startKey;
        }
        return;
    }

    // End pressed — stamp actual menstrual days
    const endDate     = keyToDate(endKey);
    const menstrualLen = Math.round(
        (endDate - startDate) / (1000 * 60 * 60 * 24)
    ) + 1;

    // Stamp 🩸 for full period
    for (let i = 0; i < menstrualLen; i++) {
        const d = new Date(startDate);
        d.setDate(d.getDate() + i);
        const key = formatDateKey(d.getFullYear(), d.getMonth(), d.getDate());
        if (!trackerData[key]) trackerData[key] = {};
        trackerData[key].rainbow    = true;
        trackerData[key].phase      = "🩸";
        trackerData[key].phaseCycle = startKey;
    }

    // Remaining phases start the day after end
    // 🦋 Follicular — 8 days
    // 💕 Ovulation  — 3 days
    // 🌑 Luteal     — remaining days to complete 28-day cycle
    const remainingPhases = [
        { emoji: "🦋", length: 8 },
        { emoji: "💕", length: 3 },
        { emoji: "🌑", length: 28 - menstrualLen - 8 - 3 },
    ];

    let cursor = new Date(endDate);
    cursor.setDate(cursor.getDate() + 1); // day after period ends

    remainingPhases.forEach(phase => {
        for (let i = 0; i < phase.length; i++) {
            const key = formatDateKey(
                cursor.getFullYear(),
                cursor.getMonth(),
                cursor.getDate()
            );
            if (!trackerData[key]) trackerData[key] = {};
            trackerData[key].phase      = phase.emoji;
            trackerData[key].phaseCycle = startKey;
            cursor.setDate(cursor.getDate() + 1);
        }
    });
}


// ==========================
// START PERIOD
// ==========================

startBtn.addEventListener("click", () => {
    if (!selectedDateKey) return;

    // Clear any prior provisional stamps from a
    // previous Start that never got an End
    const prevStart = trackerData.__activeRainbowStart;
    if (prevStart) {
        Object.keys(trackerData).forEach(key => {
            if (
                !key.startsWith("__") &&
                trackerData[key].phaseCycle === prevStart
            ) {
                delete trackerData[key].phase;
                delete trackerData[key].phaseCycle;
                delete trackerData[key].rainbow;
                // Clean up empty entries
                if (!Object.keys(trackerData[key]).length) {
                    delete trackerData[key];
                }
            }
        });
    }

    trackerData.__activeRainbowStart = selectedDateKey;
    stampPhases(selectedDateKey); // no endKey = 2 days only

    saveData();
    renderCalendar();
    closeModal();
});

// ==========================
// RENDER CALENDAR
// ==========================

function renderCalendar() {

    calendarGrid.innerHTML = "";

    const year  = currentDate.getFullYear();
    const month = currentDate.getMonth();

    monthYear.textContent = currentDate.toLocaleString("default", {
        month: "long",
        year: "numeric"
    });

    const firstDay  = new Date(year, month, 1);
    const lastDay   = new Date(year, month + 1, 0);
    const startDay  = firstDay.getDay();
    const totalDays = lastDay.getDate();

    for (let i = 0; i < startDay; i++) {
        const empty = document.createElement("div");
        empty.classList.add("day", "empty");
        calendarGrid.appendChild(empty);
    }

    for (let day = 1; day <= totalDays; day++) {

        const dateKey     = formatDateKey(year, month, day);
        const data        = trackerData[dateKey];
        const dayElement  = document.createElement("div");
        dayElement.classList.add("day");

        if (isToday(year, month, day)) {
            dayElement.classList.add("today");
        }

        const dayNumber = document.createElement("div");
        dayNumber.classList.add("day-number");
        dayNumber.textContent = day;

        const emojiContainer = document.createElement("div");
        emojiContainer.classList.add("day-emojis");

        if (data?.rainbow) {
            dayElement.classList.add("period-day");
        }

        if (data?.eggplant) {
            dayElement.classList.add("intimacy-day");
            emojiContainer.innerHTML += "💗";
        }

        if (data?.phase) {
            emojiContainer.innerHTML += data.phase;
        }

        dayElement.appendChild(dayNumber);
        dayElement.appendChild(emojiContainer);

        dayElement.addEventListener("click", () => openDayModal(dateKey));
        calendarGrid.appendChild(dayElement);
    }
}


// ==========================
// MODAL
// ==========================

function openDayModal(dateKey) {

    selectedDateKey = dateKey;
    currentTags     = [];

    const date = keyToDate(dateKey);
    selectedDateTitle.textContent = date.toLocaleDateString();

    // Load existing note + tags
    const existing = trackerData[dateKey];
    noteInput.value = existing?.note || "";
    currentTags     = existing?.tags ? [...existing.tags] : [];

    // Reset preset chips
    document.querySelectorAll(".preset-chip").forEach(chip => {
        chip.classList.toggle(
            "active",
            currentTags.includes(chip.dataset.tag)
        );
    });

    customTagInput.value = "";
    renderActiveTags();

    dayModal.classList.remove("hidden");
}

function closeModal() {
    dayModal.classList.add("hidden");
}

closeModalBtn.addEventListener("click", closeModal);


// ==========================
// TAGS
// ==========================

function renderActiveTags() {
    activeTags.innerHTML = "";
    currentTags.forEach(tag => {
        const el = document.createElement("div");
        el.classList.add("active-tag");
        el.innerHTML = `${tag} <span class="remove-tag" data-tag="${tag}">✕</span>`;
        activeTags.appendChild(el);
    });
}

function addTag(tag) {
    tag = tag.trim().toLowerCase();
    if (!tag || currentTags.includes(tag)) return;
    currentTags.push(tag);
    renderActiveTags();
}

function removeTag(tag) {
    currentTags = currentTags.filter(t => t !== tag);
    // deactivate preset chip if it was one
    const chip = document.querySelector(`.preset-chip[data-tag="${tag}"]`);
    if (chip) chip.classList.remove("active");
    renderActiveTags();
}

// Preset chips
document.querySelectorAll(".preset-chip").forEach(chip => {
    chip.addEventListener("click", () => {
        const tag = chip.dataset.tag;
        if (chip.classList.contains("active")) {
            chip.classList.remove("active");
            removeTag(tag);
        } else {
            chip.classList.add("active");
            addTag(tag);
        }
    });
});

// Custom tag add button
addTagBtn.addEventListener("click", () => {
    addTag(customTagInput.value);
    customTagInput.value = "";
});

customTagInput.addEventListener("keydown", e => {
    if (e.key === "Enter") {
        addTag(customTagInput.value);
        customTagInput.value = "";
    }
});

// Remove tag from active list
activeTags.addEventListener("click", e => {
    if (e.target.classList.contains("remove-tag")) {
        removeTag(e.target.dataset.tag);
    }
});


// ==========================
// SAVE NOTE
// ==========================

saveNoteBtn.addEventListener("click", () => {
    if (!selectedDateKey) return;
    if (!trackerData[selectedDateKey]) trackerData[selectedDateKey] = {};
    trackerData[selectedDateKey].note = noteInput.value.trim();
    trackerData[selectedDateKey].tags = [...currentTags];
    saveData();
    closeModal();
});


// ==========================
// START PERIOD
// ==========================

startBtn.addEventListener("click", () => {
    if (!selectedDateKey) return;

    // Clear any previous phase stamps from old cycle
    // that started from this key
    trackerData.__activeRainbowStart = selectedDateKey;

    // Stamp phases based on default 5-day menstrual
    stampPhases(selectedDateKey);

    saveData();
    renderCalendar();
    closeModal();
});


// ==========================
// END PERIOD
// ==========================

endBtn.addEventListener("click", () => {
    if (!selectedDateKey) return;

    const startKey = trackerData.__activeRainbowStart;

    if (!startKey) {
        alert("No active period tracking. Please tap Start first.");
        return;
    }

    const startDate = keyToDate(startKey);
    const endDate   = keyToDate(selectedDateKey);

    if (endDate < startDate) {
        alert("End date cannot be before start date.");
        return;
    }

    // Re-stamp phases with actual menstrual end
    stampPhases(startKey, selectedDateKey);

    delete trackerData.__activeRainbowStart;

    saveData();
    renderCalendar();
    closeModal();
});


// ==========================
// INTIMACY
// ==========================

eggplantBtn.addEventListener("click", () => {
    if (!selectedDateKey) return;
    if (!trackerData[selectedDateKey]) trackerData[selectedDateKey] = {};
    trackerData[selectedDateKey].eggplant = true;
    saveData();
    renderCalendar();
    closeModal();
});


// ==========================
// REMOVE
// ==========================

removeBtn.addEventListener("click", () => {
    if (!selectedDateKey) return;
    delete trackerData[selectedDateKey];
    saveData();
    renderCalendar();
    closeModal();
});


// ==========================
// MONTH NAVIGATION
// ==========================

prevMonthBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
});

nextMonthBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
});


// ==========================
// MENU
// ==========================

menuBtn.addEventListener("click", () => {
    menuDropdown.classList.toggle("show");
});

document.addEventListener("click", e => {
    if (!menuBtn.contains(e.target) && !menuDropdown.contains(e.target)) {
        menuDropdown.classList.remove("show");
    }
});


// ==========================
// CLEAR DATA
// ==========================

clearDataBtn.addEventListener("click", () => {
    if (!confirm("Delete all tracked data?")) return;
    trackerData = {};
    localStorage.removeItem("emojiCalendarData");
    renderCalendar();
});


// ==========================
// SUMMARY
// ==========================

function buildSummary() {

    let periodDays   = 0;
    let intimacyDays = 0;

    summaryDetails.innerHTML = "";
    document.getElementById("heatmapGrid").innerHTML = "";

    const keys = Object.keys(trackerData)
        .filter(key => !key.startsWith("__"))
        .sort();

    keys.forEach(key => {

        const item     = trackerData[key];
        const hasRose  = !!item.rainbow;
        const hasBlue  = !!item.eggplant;
        const hasPhase = !!item.phase;
        const hasNote  = !!item.note;
        const hasTags  = item.tags && item.tags.length > 0;

        if (hasRose)  periodDays++;
        if (hasBlue)  intimacyDays++;

        // Heatmap dot
        const dot = document.createElement("div");
        dot.classList.add("heatmap-dot");

        if (hasRose && hasBlue)  dot.classList.add("dot-has-both");
        else if (hasRose)        dot.classList.add("dot-has-rose");
        else if (hasBlue)        dot.classList.add("dot-has-blue");

        const [y, m, d] = key.split("-");
        const label = new Date(Number(y), Number(m) - 1, Number(d))
            .toLocaleDateString("default", { month: "short", day: "numeric" });

        dot.setAttribute("data-label", label);
        document.getElementById("heatmapGrid").appendChild(dot);

        // Timeline row
        const emojis =
            (hasRose  ? "🩸 " : "") +
            (hasBlue  ? "💗 " : "") +
            (hasPhase ? item.phase : "");

        const row = document.createElement("div");
        row.classList.add("timeline-item");

        let inner = `
            <div class="tl-top">
                <span class="tl-date">${label}</span>
                <span class="tl-emojis">${emojis}</span>
            </div>
        `;

        if (hasNote) {
            inner += `<div class="tl-note">${item.note}</div>`;
        }

        if (hasTags) {
            const tagChips = item.tags
                .map(t => `<span class="tl-tag">${t}</span>`)
                .join("");
            inner += `<div class="tl-tags">${tagChips}</div>`;
        }

        row.innerHTML = inner;
        summaryDetails.appendChild(row);
    });

    rainbowCount.textContent  = periodDays;
    eggplantCount.textContent = intimacyDays;
}

viewSummaryBtn.addEventListener("click", () => {
    buildSummary();
    summaryPage.classList.remove("hidden");
});

closeSummaryBtn.addEventListener("click", () => {
    summaryPage.classList.add("hidden");
});


// ==========================
// INIT
// ==========================

renderCalendar();
