export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string | null;
  stock: number;
  sold: number;
  cost: number;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}
