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
// ! I. Fonction pour le toggle menu
const btn_close_menu = document.getElementById("close-menu");
const btn_open_menu = document.getElementById("open-menu");
const menu_container = document.getElementById("menu-container");
// ? Fonction pour ouvir le menu
function openMenu() {
    menu_container.classList.remove("-translate-x-full");
    menu_container.classList.add("translate-x-0");
}
// ? Fonction pour fermer le menu
function closeMenu() {
    menu_container.classList.remove("translate-x-0");
    menu_container.classList.add("-translate-x-full");
}
// ? Assignation des fonctions aux boutons
btn_open_menu.addEventListener("click", openMenu);
btn_close_menu.addEventListener("click", closeMenu);
// ! II. Fermeture du menu au click exterieur
document.addEventListener("click", (event) => {
    const target = event.target;
    const isMenuOpen = menu_container.classList.contains("translate-x-0");
    // ? Si le menu est ouvert ET qu'on ne clique pas dans le menu ET qu'on ne clique pas sur le bouton d'ouverture
    if (isMenuOpen &&
        !menu_container.contains(target) &&
        !btn_open_menu.contains(target)) {
        closeMenu();
    }
});
// ! III. Fermeture du menu au click sur un lien du menu
// ? Récupération de TOUS les liens du menu
const allMenuLinks = menu_container.querySelectorAll("a");
// ? Récupérer TOUS les liens de navigation
const allNavLinks = document.querySelectorAll("nav a");
// allMenuLinks.forEach((link) => {
//   link.addEventListener("click", function () {
//     // ? On vérifie si on a cliqué sur un lien de navigation
//     if (this.closest("nav")) {
//       // ? On récupère la cible du lien cliqué
//       const targetId = this.getAttribute("href");
//       // ! 1. On retire la classe 'active' de TOUS les liens de navigation sur toute la page
//       allNavLinks.forEach((navLink) => {
//         navLink.classList.remove("active");
//       });
//       // ! 2. On ajoute la classe 'active' à TOUS les liens qui ont le même href
//       if (targetId) {
//         const matchingLinks = document.querySelectorAll(
//           `nav a[href="${targetId}"]`,
//         );
//         matchingLinks.forEach((matchingLink) => {
//           matchingLink.classList.add("active");
//         });
//       }
//     }
//     // ! 3. Fermer le menu mobile
//     closeMenu();
//   });
// });
allNavLinks.forEach((link) => {
    link.addEventListener("click", () => {
        const currhref = link.getAttribute("href");
        allNavLinks.forEach((navLink) => {
            if (currhref === navLink.getAttribute("href"))
                link.classList.add("active");
            navLink.classList.remove("active");
        });
        // link.classList.add("active")
        closeMenu();
    });
});
export {};
