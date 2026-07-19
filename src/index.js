var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// ! 2. Fonction asynchrone pour récupérer les Produits
function fetchProducts() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // ? Recuperation de tous les produits
            const response = yield fetch("./data/DB.json");
            if (!response.ok)
                throw new Error("Erreur lors du chargement des données");
            // ? Convertion de la réponse en JSON typé
            const data = yield response.json();
            const products = data.products;
            const images = data.images;
            console.log("Produits récupérés :", products);
            console.log("Images récupérés :", images);
            // ? Appelle des fonctions pour afficher les élèments
            Gallery(images);
            renderProducts(products);
        }
        catch (error) {
            console.error("Impossible de charger les données backend :", error);
        }
    });
}
// ! 3. Fonction pour afficher les images
function Gallery(images) {
    let currentIndex = 0;
    const itemsPerPage = 5; // ? Nombre d'images affichées simultanément
    // ! b. Cibler les éléments du DOM
    const gridContainer = document.getElementById("gallery-grid");
    const btnPrev = document.getElementById("btn-prev");
    const btnNext = document.getElementById("btn-next");
    if (!gridContainer)
        return;
    function renderGallery() {
        // ! a. État de la galerie
        // ? Vider le conteneur
        gridContainer.innerHTML = "";
        // ? Récupérer uniquement les images à afficher
        const currentImages = images.slice(currentIndex, currentIndex + itemsPerPage);
        // ? Générer le HTML pour chaque image
        currentImages.forEach((image) => {
            const imgWrapper = document.createElement("div");
            imgWrapper.className =
                "relative overflow-hidden rounded-lg shadow-md cursor-pointer group";
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
        // ! c. Écouteurs d'événements pour les boutons
        btnPrev === null || btnPrev === void 0 ? void 0 : btnPrev.addEventListener("click", () => {
            if (currentIndex > 0) {
                currentIndex--; // ? Recule d'une image. (Utilise currentIndex -= itemsPerPage pour reculer par page complète)
                renderGallery();
            }
        });
        btnNext === null || btnNext === void 0 ? void 0 : btnNext.addEventListener("click", () => {
            if (currentIndex + itemsPerPage < images.length) {
                currentIndex++; // ? Avance d'une image
                renderGallery();
            }
        });
    }
    renderGallery();
}
// ! 4. Fonction pour afficher les produits
function renderProducts(products) {
    const gridContainer = document.getElementById("products-grid");
    if (!gridContainer)
        return;
    // ? Nettoyage de la grille avant d'ajouter les éléments
    gridContainer.innerHTML = "";
    products.forEach((product) => {
        // ? Création de l'élément article parent pour la carte
        const card = document.createElement("article");
        card.className = "card group";
        // ? Formatage du prix pour ajouter un espace au niveau des milliers
        const formattedPrice = new Intl.NumberFormat("fr-FR").format(product.price);
        // ? Injection du HTML interne de la carte
        card.innerHTML = `
      <img
        src="./asset/products/${product.image_url}"
        alt="${product.title}"
        class="card-image transition-transform duration-300 group-hover:scale-110"
        loading="lazy"
      />
      <h3 class="card-content">${product.title}</h3>
      <p class="card-price">${formattedPrice} FCFA</p>
    `;
        gridContainer.appendChild(card);
    });
}
// ! 5. Initialisation au chargement
fetchProducts();
export {};
