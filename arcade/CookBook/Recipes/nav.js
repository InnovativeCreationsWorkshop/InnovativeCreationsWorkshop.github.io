const routes = {

    /* ======================
       🥗 START / SALADS
====================== */

"BigMacSalad": {
    next: "CapreseSalad.html",
    prev: "Roti.html"
},

"CapreseSalad": {
    next: "ChineseSteamedEgg.html",
    prev: "BigMacSalad.html"
},

"ChineseSteamedEgg": {
    next: "CreamyCucumberSalad.html",
    prev: "CapreseSalad.html"
},

"CreamyCucumberSalad": {
    next: "GreekChickpeaSalad.html",
    prev: "ChineseSteamedEgg.html"
},

"GreekChickpeaSalad": {
    next: "KoreanSalad.html",
    prev: "CreamyCucumberSalad.html"
},

"KoreanSalad": {
    next: "KoreanSpinachSalad.html",
    prev: "GreekChickpeaSalad.html"
},

"KoreanSpinachSalad": {
    next: "YamitsukiShioKyabetsu.html",
    prev: "KoreanSalad.html"
},

"YamitsukiShioKyabetsu": {
    next: "BeefStew.html",
    prev: "KoreanSpinachSalad.html"
},

/* ======================
       🍲 SOUPS / STEWS
====================== */

"BeefStew": {
    next: "BeefVindaloo.html",
    prev: "YamitsukiShioKyabetsu.html"
},

"BeefVindaloo": {
    next: "CajunSausagePotatoSoup.html",
    prev: "BeefStew.html"
},

"CajunSausagePotatoSoup": {
    next: "CreamyMushroomSoup.html",
    prev: "BeefVindaloo.html"
},

"CreamyMushroomSoup": {
    next: "EggCurry.html",
    prev: "CajunSausagePotatoSoup.html"
},

"EggCurry": {
    next: "GoldenChickenSoup.html",
    prev: "CreamyMushroomSoup.html"
},

"GoldenChickenSoup": {
    next: "ItalianWeddingSoup.html",
    prev: "EggCurry.html"
},

"ItalianWeddingSoup": {
    next: "JapaneseCurry.html",
    prev: "GoldenChickenSoup.html"
},

"JapaneseCurry": {
    next: "NabeSoup.html",
    prev: "ItalianWeddingSoup.html"
},

"NabeSoup": {
    next: "NordicLeekSoup.html",
    prev: "JapaneseCurry.html"
},

"NordicLeekSoup": {
    next: "PolloChileColorado.html",
    prev: "NabeSoup.html"
},

"PolloChileColorado": {
    next: "Soondubujigae.html",
    prev: "NordicLeekSoup.html"
},

"Soondubujigae": {
    next: "SopadeLentejas.html",
    prev: "PolloChileColorado.html"
},

"SopadeLentejas": {
    next: "SpaghettiWithMeatSauce.html",
    prev: "Soondubujigae.html"
},

"SpaghettiWithMeatSauce": {
    next: "SriLankanDahl.html",
    prev: "SopadeLentejas.html"
},

"SriLankanDahl": {
    next: "TofuPot.html",
    prev: "SpaghettiWithMeatSauce.html"
},

"TofuPot": {
    next: "TuscanSoup.html",
    prev: "SriLankanDahl.html"
},

"TuscanSoup": {
    next: "DoroWat.html",
    prev: "TofuPot.html"
},

"DoroWat": {
    next: "AsianMarinade.html",
    prev: "TuscanSoup.html"
},

/* ======================
       🍚 RICE / MAINS
====================== */

"AsianMarinade": {
    next: "HomemadePasta.html",
    prev: "DoroWat.html"
},

"HomemadePasta": {
    next: "Burrito.html",
    prev: "AsianMarinade.html"
},

"Burrito": {
    next: "StreetTacos.html",
    prev: "HomemadePasta.html"
},

"StreetTacos": {
    next: "FriedRice.html",
    prev: "Burrito.html"
},

"FriedRice": {
    next: "Kompot.html",
    prev: "StreetTacos.html"
},

"Kompot": {
    next: "LazyChickenBiryani.html",
    prev: "FriedRice.html"
},

"LazyChickenBiryani": {
    next: "Okonomiyaki.html",
    prev: "Kompot.html"
},

"Okonomiyaki": {
    next: "RedBeansRice.html",
    prev: "LazyChickenBiryani.html"
},

"RedBeansRice": {
    next: "RiceCookerBowl.html",
    prev: "Okonomiyaki.html"
},

"RiceCookerBowl": {
    next: "UmamiSeaweedRiceRolls.html",
    prev: "RedBeansRice.html"
},

"UmamiSeaweedRiceRolls": {
    next: "EthiopianBeefTibs.html",
    prev: "RiceCookerBowl.html"
},

"EthiopianBeefTibs": {
    next: "Kabsa.html",
    prev: "UmamiSeaweedRiceRolls.html"
},

"Kabsa": {
    next: "Roti.html",
    prev: "EthiopianBeefTibs.html"
},

"Roti": {
    next: "BigMacSalad.html",
    prev: "Kabsa.html"
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
