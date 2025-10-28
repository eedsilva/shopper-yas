export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  tags?: string[];
}

export type ProductTileVariant = "spotlight" | "default";

export interface HeroSlide {
  id: number;
  title: string;
  description: string;
  image: string;
}

export interface Highlight {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export interface Testimonial {
  id: number;
  quote: string;
  name: string;
  role: string;
}
