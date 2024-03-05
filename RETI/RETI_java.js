const fs = require('fs');
const path = require('path');

const imageFolder = 'http://InnovativeCreationsWorkshop.github.io/RETI/Images/mixed clothing';

const imageGrid = document.getElementById('imageGrid');

fs.readdir(imageFolder, (err, files) => {
    if (err) {
        console.error('Error reading directory:', err);
        return;
    }

    files.forEach(file => {
        if (file.match(/\.(jpg|jpeg|png|gif)$/)) {
            const imagePath = path.join(imageFolder, file);
            const imageElement = document.createElement('img');
            imageElement.src = imagePath;
            imageElement.alt = 'Image';
            
            const imageItem = document.createElement('div');
            imageItem.classList.add('image-item');
            imageItem.appendChild(imageElement);

            imageGrid.appendChild(imageItem);
        }
    });
});
