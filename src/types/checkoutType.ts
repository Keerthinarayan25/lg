export type CheckoutFormData = {
  get(arg0: string): unknown;
  get(arg0: string): unknown;
  customerEmail: string;
  customerName: string;
  customerPhone: string;

  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;

  shippingStreet: string;
  shippingCity: string;
  shippingState: string;
  shippingCountry: string;
  shippingZipCode: string;

  sameAsBilling: boolean;
};