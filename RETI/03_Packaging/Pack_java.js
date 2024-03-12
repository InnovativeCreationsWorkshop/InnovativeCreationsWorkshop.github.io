

// JavaScript for linking grid images

// Replace these sample image URLs with your actual image URLs
const gridContainer1 = [
    "../03_Packaging/001_ImgPack/Pack/01_hhr/1.jpg",
    "../03_Packaging/001_ImgPack/Pack/01_hhr/2.jpg",
];
const gridContainer2 = [
    "../03_Packaging/001_ImgPack/Pack/02_Cred/1.jpg",
    "../03_Packaging/001_ImgPack/Pack/02_Cred/2.jpg",
];
const gridContainer3 = [
    "../03_Packaging/001_ImgPack/Pack/03_Shoe/1.jpg",
    "../03_Packaging/001_ImgPack/Pack/03_Shoe/2.jpg",
];
const gridContainer4 = [
    "../03_Packaging/001_ImgPack/Pack/04_Toy/1.jpg",
    "../03_Packaging/001_ImgPack/Pack/04_Toy/2.jpg",
];
const gridContainer5 = [
    "../03_Packaging/001_ImgPack/Pack/05_Suit/1.jpg",
    "../03_Packaging/001_ImgPack/Pack/05_Suit/2.jpg",
];



// Function to create image elements and append to the respective grids
function populateGrid(gridId, images) {
    const grid = document.getElementById(gridId);
    images.forEach(image => {
        const imgElement = document.createElement('img');
        imgElement.src = image;
        grid.appendChild(imgElement);
    });
}

// Populate grids with images
populateGrid('gridContainer1', gridContainer1);
populateGrid('gridContainer2', gridContainer2);
populateGrid('gridContainer3', gridContainer3);
populateGrid('gridContainer4', gridContainer4);
populateGrid('gridContainer5', gridContainer5);

