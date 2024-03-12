

// JavaScript for linking grid images

// Replace these sample image URLs with your actual image URLs
const gridContainer1 = [
    "../005_MiscItems/001_ImgM/01_House/1.jpg",
    "../005_MiscItems/001_ImgM/01_House/2.jpg",
    "../005_MiscItems/001_ImgM/01_House/3.jpg",
    "../005_MiscItems/001_ImgM/01_House/4.jpg",
    "../005_MiscItems/001_ImgM/01_House/5.jpg",
    "../005_MiscItems/001_ImgM/01_House/6.jpg",
];

const gridContainer2 = [
    "../005_MiscItems/001_ImgM/02_Purse/1.jpg",
    "../005_MiscItems/001_ImgM/02_Purse/2.jpg",
    "../005_MiscItems/001_ImgM/02_Purse/3.jpg",
    "../005_MiscItems/001_ImgM/02_Purse/4.jpg",
    "../005_MiscItems/001_ImgM/02_Purse/5.jpg",
    "../005_MiscItems/001_ImgM/02_Purse/6.jpg",
];

const gridContainer3 = [
    "../005_MiscItems/001_ImgM/03_Travel/1.jpg",
    "../005_MiscItems/001_ImgM/03_Travel/2.jpg",
    "../005_MiscItems/001_ImgM/03_Travel/3.jpg",
    
];

const gridContainer4 = [
    "../005_MiscItems/001_ImgM/04_BB/1.jpg",
    "../005_MiscItems/001_ImgM/04_BB/2.jpg",
    "../005_MiscItems/001_ImgM/04_BB/3.jpg",
  
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

