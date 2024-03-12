

// JavaScript for linking grid images

// Replace these sample image URLs with your actual image URLs
const gridContainer1 = [
    "../004_SoftToys/001_ImgToys/1.jpg",
    "../004_SoftToys/001_ImgToys/2.jpg",
    "../004_SoftToys/001_ImgToys/3.jpg",
    "../004_SoftToys/001_ImgToys/4.jpg",
    "../004_SoftToys/001_ImgToys/5.jpg",
    "../004_SoftToys/001_ImgToys/6.jpg",
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

