export type Variant = {
  id: string;
  sku: string;
  price: number;
  stock: number;
  discount: number;        // number, not string
  unit: string;
  quantity: number;
  isDefault: boolean;
  position: number;
  barcode: string | null;
  createdAt: string;
  updatedAt: string;
  productId: string;
};

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
