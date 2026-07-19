"use strict";
// ! 2. La base de données d'images
const images = [
    { src: 'image1.png', alt: 'Image 1' },
    { src: 'image2.png', alt: 'Image 2' },
    { src: 'image3.png', alt: 'Image 3' },
    { src: 'image4.png', alt: 'Image 4' },
    { src: 'image5.png', alt: 'Image 5' },
    { src: 'image6.png', alt: 'Image 6' },
    { src: 'image7.png', alt: 'Image 7' },
    { src: 'image8.png', alt: 'Image 8' },
];
// ! 3. État de la galerie
let currentIndex = 0;
const itemsPerPage = 5; // ? Nombre d'images affichées simultanément
// ! 4. Cibler les éléments du DOM
const gridContainer = document.getElementById('gallery-grid');
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');
// ! 5. Fonction pour afficher les images
function renderGallery() {
    if (!gridContainer)
        return;
    // ? Vider le conteneur
    gridContainer.innerHTML = '';
    // ? Récupérer uniquement les images à afficher
    const currentImages = images.slice(currentIndex, currentIndex + itemsPerPage);
    // ? Générer le HTML pour chaque image
    currentImages.forEach((image) => {
        const imgWrapper = document.createElement('div');
        imgWrapper.className = 'relative overflow-hidden rounded-lg shadow-md cursor-pointer group';
        imgWrapper.innerHTML = `
      <img
        src="./asset/gallery/${image.src}"
        alt="${image.alt}"
        class="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
        loading="lazy"
      />
    `;
        gridContainer.appendChild(imgWrapper);
    });
    // ? Mettre à jour l'état des boutons (désactiver si on est aux extrémités)
    if (btnPrev)
        btnPrev.disabled = currentIndex === 0;
    if (btnNext)
        btnNext.disabled = currentIndex + itemsPerPage >= images.length;
}
// ! 6. Écouteurs d'événements pour les boutons
btnPrev === null || btnPrev === void 0 ? void 0 : btnPrev.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--; // ? Recule d'une image. (Utilise currentIndex -= itemsPerPage pour reculer par page complète)
        renderGallery();
    }
});
btnNext === null || btnNext === void 0 ? void 0 : btnNext.addEventListener('click', () => {
    if (currentIndex + itemsPerPage < images.length) {
        currentIndex++; // ? Avance d'une image
        renderGallery();
    }
});
// ! 7. Initialisation au chargement
renderGallery();
