export type CartItem = {
  id:string;
  variantId: string;
  quantity:number;
  addedAt:string;
  variant:CartVariant;
  product:CartProduct;
  lineTotal:number;
}

export type CartVariant = {
  id:string;
  sku:string;
  price:number;
  discount:number;
  finalPrice:number;
  stock:number;
  unit:string;
  quantity:number;
  displayName:string;

}

export type CartProduct ={
  id:string;
  name:string;
  description:string;
  image:string[];
  category:string;
  status:string;
}