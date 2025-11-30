export type Variant = {
  id: string;
  sku: string;
  price: number;
  stock: number;
  discount: number;
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
  description: string;
  image: string[];
  category: string;
  createdAt: string;
  variants?: Variant[];
};
