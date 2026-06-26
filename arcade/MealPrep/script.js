const days = ["Friday","Saturday","Sunday","Monday","Tuesday","Wednesday","Thursday"];
const menuBody = document.getElementById("menuBody");

days.forEach(day => {
  const row = document.createElement("div");
  row.className = "chart-row";
  row.innerHTML = `
    <span class="day-label">${day}</span>
    <input type="text" data-key="${day}-Lunch" placeholder="..." oninput="save('${day}-Lunch', this.value)">
    <input type="text" data-key="${day}-Dinner" placeholder="..." oninput="save('${day}-Dinner', this.value)">
  `;
  menuBody.appendChild(row);
});

days.forEach(day => {
  ["Lunch","Dinner"].forEach(meal => {
    const key = `${day}-${meal}`;
    const saved = localStorage.getItem(key);
    if (saved) {
      const input = document.querySelector(`[data-key="${key}"]`);
      if (input) input.value = saved;
    }
  });
});

function save(key, value) {
  localStorage.setItem(key, value);
}

/* Alt meals */
function addAlt() {
  const input = document.getElementById("altInput");
  const value = input.value.trim();
  if (!value) return;
  const alts = JSON.parse(localStorage.getItem("altMeals") || "[]");
  alts.push(value);
  localStorage.setItem("altMeals", JSON.stringify(alts));
  input.value = "";
  renderAlts();
}

function removeAlt(i) {
  const alts = JSON.parse(localStorage.getItem("altMeals") || "[]");
  alts.splice(i, 1);
  localStorage.setItem("altMeals", JSON.stringify(alts));
  renderAlts();
}

function renderAlts() {
  const alts = JSON.parse(localStorage.getItem("altMeals") || "[]");
  const list = document.getElementById("altList");
  list.innerHTML = "";
  alts.forEach((a, i) => {
    const pill = document.createElement("div");
    pill.className = "pill";
    pill.innerHTML = `🌱 ${a} <button onclick="removeAlt(${i})">✕</button>`;
    list.appendChild(pill);
  });
}

/* Grocery list */
function addGrocery() {
  const input = document.getElementById("groceryInput");
  const value = input.value.trim();
  if (!value) return;
  const items = JSON.parse(localStorage.getItem("groceryItems") || "[]");
  items.push({ text: value, checked: false });
  localStorage.setItem("groceryItems", JSON.stringify(items));
  input.value = "";
  renderGrocery();
}

function toggleGrocery(i) {
  const items = JSON.parse(localStorage.getItem("groceryItems") || "[]");
  items[i].checked = !items[i].checked;
  localStorage.setItem("groceryItems", JSON.stringify(items));
  renderGrocery();
}

function removeGrocery(i) {
  const items = JSON.parse(localStorage.getItem("groceryItems") || "[]");
  items.splice(i, 1);
  localStorage.setItem("groceryItems", JSON.stringify(items));
  renderGrocery();
}

function renderGrocery() {
  const items = JSON.parse(localStorage.getItem("groceryItems") || "[]");
  const list = document.getElementById("groceryItems");
  list.innerHTML = "";
  items.forEach((item, i) => {
    const li = document.createElement("li");
    if (item.checked) li.classList.add("checked");
    li.innerHTML = `
      <input type="checkbox" ${item.checked ? "checked" : ""} onchange="toggleGrocery(${i})">
      <span>${item.text}</span>
      <button onclick="removeGrocery(${i})">✕</button>
    `;
    list.appendChild(li);
  });
}

renderGrocery();
renderAlts();

function toggleSettings() {
  const menu = document.getElementById("settingsMenu");
  menu.style.display = menu.style.display === "block" ? "none" : "block";
}

function resetEverything() {
  if (!confirm("Clear everything?")) return;

  localStorage.clear();
  location.reload();
}

function toggleSettings() {
  const menu = document.getElementById("settingsMenu");
  menu.style.display = menu.style.display === "block" ? "none" : "block";
}

function resetEverything() {
  if (confirm("Clear the whole menu, alt meals, and grocery list?")) {
    localStorage.clear();
    location.reload();
  }
}
