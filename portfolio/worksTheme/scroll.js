
document.addEventListener("DOMContentLoaded", function () {
    let scrollPosition = 0;
    const scrollAmount = 300;
    const container = document.querySelector('.gallery-container');

    function scrollGallery(direction) {
        if (!container) {
            console.error("Gallery container not found!");
            return;
        }

        const maxScroll = container.scrollWidth - container.clientWidth;
        scrollPosition += direction * scrollAmount;

        if (scrollPosition < 0) scrollPosition = 0;
        if (scrollPosition > maxScroll) scrollPosition = maxScroll;

        container.style.transform = `translateX(-${scrollPosition}px)`;
        console.log("Scrolling to:", scrollPosition);
    }

    window.scrollGallery = scrollGallery;
});

