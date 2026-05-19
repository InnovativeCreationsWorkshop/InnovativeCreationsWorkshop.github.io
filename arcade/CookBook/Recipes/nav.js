const routes = {

    /* ======================
       🥗 START / SALADS
    ====================== */

    "BigMacSalad": {
        next: "CreamyCucumberSalad.html",
        prev: "BeefVindaloo.html"
    },

    "CreamyCucumberSalad": {
        next: "CreamyMushroomSoup.html",
        prev: "BigMacSalad.html"
    },

    "GreekChickpeaSalad": {
        next: "ItalianWeddingSoup.html",
        prev: "GoldenChickenSoup.html"
    },

    "KoreanSalad": {
        next: "KoreanSpinachSalad.html",
        prev: "Kompot.html"
    },

    "KoreanSpinachSalad": {
        next: "LazyChickenBiryani.html",
        prev: "KoreanSalad.html"
    },

    /* ======================
       🍲 SOUPS / STEWS
    ====================== */

    "BeefStew": {
        next: "BeefVindaloo.html",
        prev: "AsianMarinade.html"
    },

    "BeefVindaloo": {
        next: "BigMacSalad.html",
        prev: "BeefStew.html"
    },

    "CajunSausagePotatoSoup": {
        next: "CreamyCucumberSalad.html",
        prev: "BigMacSalad.html"
    },

    "CreamyMushroomSoup": {
        next: "EggCurry.html",
        prev: "CreamyCucumberSalad.html"
    },

    "EggCurry": {
        next: "FriedRice.html",
        prev: "CreamyMushroomSoup.html"
    },

    "GoldenChickenSoup": {
        next: "GreekChickpeaSalad.html",
        prev: "FriedRice.html"
    },

    "ItalianWeddingSoup": {
        next: "JapaneseCurry.html",
        prev: "GreekChickpeaSalad.html"
    },

    "JapaneseCurry": {
        next: "Kompot.html",
        prev: "ItalianWeddingSoup.html"
    },

    "NabeSoup": {
        next: "NordicLeekSoup.html",
        prev: "LazyChickenBiryani.html"
    },

    "NordicLeekSoup": {
        next: "Okonomiyaki.html",
        prev: "NabeSoup.html"
    },

    "PolloChileColorado": {
        next: "RedbeansRice.html",
        prev: "Okonomiyaki.html"
    },

    "Soondubujigae": {
        next: "SopadeLentejas.html",
        prev: "RiceCookerBowl.html"
    },

    "SopadeLentejas": {
        next: "SriLankanDahl.html",
        prev: "Soondubujigae.html"
    },

    "SriLankanDahl": {
        next: "TofuPot.html",
        prev: "SopadeLentejas.html"
    },

    "TofuPot": {
        next: "TuscanSoup.html",
        prev: "SriLankanDahl.html"
    },

    "TuscanSoup": {
        next: "UmamiSeaweedRiceRolls.html",
        prev: "TofuPot.html"
    },

    /* ======================
       🍚 RICE / OTHER
    ====================== */

    "AsianMarinade": {
        next: "BeefStew.html",
        prev: "UmamiSeaweedRiceRolls.html"
    },

    "FriedRice": {
        next: "GoldenChickenSoup.html",
        prev: "EggCurry.html"
    },

    "Kompot": {
        next: "KoreanSalad.html",
        prev: "JapaneseCurry.html"
    },

    "LazyChickenBiryani": {
        next: "NabeSoup.html",
        prev: "KoreanSpinachSalad.html"
    },

    "Okonomiyaki": {
        next: "PolloChileColorado.html",
        prev: "NordicLeekSoup.html"
    },

    "RedbeansRice": {
        next: "RiceCookerBowl.html",
        prev: "PolloChileColorado.html"
    },

    "RiceCookerBowl": {
        next: "Soondubujigae.html",
        prev: "RedbeansRice.html"
    },

    "UmamiSeaweedRiceRolls": {
        next: "AsianMarinade.html",
        prev: "TuscanSoup.html"
    }
};

document.addEventListener("DOMContentLoaded", () => {
    const nextBtn = document.querySelector(".next-btn");
    const prevBtn = document.querySelector(".prev-btn");
    const page = document.body.dataset.page;

    if (routes[page]) {
        if (nextBtn) nextBtn.href = routes[page].next;
        if (prevBtn) prevBtn.href = routes[page].prev;
    }
});