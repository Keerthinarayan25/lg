export type Product = {
  name: string;
  code: string;
  price: number;
  oldPrice?: number;
  discount?: string;
  image: string;
  rating?: number;
  reviews?: number;
  deliveryDate?: string;
  pickupDate?: string;
  description?: string;
  features?: string[];
  images?: string[];
};
