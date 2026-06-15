// ─────────────────────────────────────────────
// nav.js  ← NEVER MANUALLY EDIT AGAIN
// Prev/next order is driven by the RECIPES array in recipes.js
// ─────────────────────────────────────────────

document.addEventListener("DOMContentLoaded", () => {
  const page    = document.body.dataset.page;
  const keys    = RECIPES.map(r => r.key);
  const i       = keys.indexOf(page);
  if (i === -1) return;

  const prevKey = keys[(i - 1 + keys.length) % keys.length];
  const nextKey = keys[(i + 1) % keys.length];

  const nextBtn = document.querySelector(".next-btn");
  const prevBtn = document.querySelector(".prev-btn");

  if (nextBtn) nextBtn.href = `${nextKey}.html`;
  if (prevBtn) prevBtn.href = `${prevKey}.html`;
});