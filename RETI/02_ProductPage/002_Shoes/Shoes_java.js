

// JavaScript for linking grid images

// Replace these sample image URLs with your actual image URLs
const gridContainer1 = [
    "../002_Shoes/001_ImgSh/PShoes/1.jpg",
    "../002_Shoes/001_ImgSh/PShoes/2.jpg",
    "../002_Shoes/001_ImgSh/PShoes/3.jpg",
    "../002_Shoes/001_ImgSh/PShoes/4.jpg",
    "../002_Shoes/001_ImgSh/PShoes/5.jpg",
    "../002_Shoes/001_ImgSh/PShoes/6.jpg",
];

const gridContainer2 = [
    "../002_Shoes/001_ImgSh/SShoes/1.jpg",
    "../002_Shoes/001_ImgSh/SShoes/2.jpg",
    "../002_Shoes/001_ImgSh/SShoes/3.jpg",
    "../002_Shoes/001_ImgSh/SShoes/4.jpg",
    "../002_Shoes/001_ImgSh/SShoes/5.jpg",
    "../002_Shoes/001_ImgSh/SShoes/6.jpg",
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
