let scrollPosition = 0;
const scrollAmount = 300; // Adjust this value based on image width
const container = document.querySelector('.gallery-container');

function scrollGallery(direction) {
    const maxScroll = container.scrollWidth - container.clientWidth;
    
    scrollPosition += direction * scrollAmount;
    
    // Prevent scrolling beyond limits
    if (scrollPosition < 0) scrollPosition = 0;
    if (scrollPosition > maxScroll) scrollPosition = maxScroll;

    container.style.transform = `translateX(-${scrollPosition}px)`;
}
