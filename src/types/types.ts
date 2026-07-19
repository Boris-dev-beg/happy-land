export interface GalleryImage {
  src: string;
  alt: string;
}

export interface Product {
  image_url: string;
  title: string;
  price: number;
}

export interface MockDatabase {
  products: Product[];
  images: { src: string; alt: string }[];
}