export interface Variant {
  price: number;
  stock: number;
  discount: number;
}

export type Product = {
  id: string;
  name: string;
  description?: string;
  variants: Variant[];
  images: string[];
  price: number;
  discount: number;
  stock?: number;
  category: string;
  createdAt: string;
  rating:number;

};
