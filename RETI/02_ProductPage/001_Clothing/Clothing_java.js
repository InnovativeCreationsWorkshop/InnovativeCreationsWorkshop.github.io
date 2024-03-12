

// JavaScript for linking grid images

// Replace these sample image URLs with your actual image URLs
const gridContainer1 = [
    "../001_Clothing/001_Images/mixed/1.jpg",
    "../001_Clothing/001_Images/mixed/2.jpg",
    "../001_Clothing/001_Images/mixed/3.jpg",
    "../001_Clothing/001_Images/mixed/4.jpg",
    "../001_Clothing/001_Images/mixed/5.jpg",
    "../001_Clothing/001_Images/mixed/6.jpg",
];

const gridContainer2 = [
    "../001_Clothing/001_Images/premiumab/1.jpg",
    "../001_Clothing/001_Images/premiumab/2.jpg",
    "../001_Clothing/001_Images/premiumab/3.jpg",
    "../001_Clothing/001_Images/premiumab/4.jpg",
    "../001_Clothing/001_Images/premiumab/5.jpg",
    "../001_Clothing/001_Images/premiumab/6.jpg",
];

const gridContainer3 = [
    "../001_Clothing/001_Images/sum/1.jpg",
    "../001_Clothing/001_Images/sum/2.jpg",
    "../001_Clothing/001_Images/sum/3.jpg",
    "../001_Clothing/001_Images/sum/4.jpg",
    "../001_Clothing/001_Images/sum/5.jpg",
    "../001_Clothing/001_Images/sum/6.jpg",
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
