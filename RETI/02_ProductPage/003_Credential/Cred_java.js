

// JavaScript for linking grid images

// Replace these sample image URLs with your actual image URLs
const gridContainer1 = [
    "../003_Credential/001_ImgCred/Cred/1.jpg",
    "../003_Credential/001_ImgCred/Cred/2.jpg",
    "../003_Credential/001_ImgCred/Cred/3.jpg",
    "../003_Credential/001_ImgCred/Cred/4.jpg",
    "../003_Credential/001_ImgCred/Cred/5.jpg",
    "../003_Credential/001_ImgCred/Cred/6.jpg",
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

