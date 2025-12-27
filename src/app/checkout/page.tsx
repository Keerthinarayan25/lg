import { getCartItems } from "@/actions/cart";
import OrderSummary from "@/components/cart/OrderSummary";
import CheckoutForm from "@/components/checkout/CheckoutForm";
// import { getAuthUser } from "@/lib/authFunctions";
import { CartItem } from "@/types/cartTypes";

export default async function checkOutPage(){
  // const user = await getAuthUser();
  const cartResponse = await getCartItems();
  const cartProducts: CartItem[] = cartResponse.data || [];
  
  const subTotal = cartProducts.reduce(
      (sum, item) => sum + item.lineTotal, 0
    );
  return(
    <div className="bg-[#eae6db] min-h-screen p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        <CheckoutForm/>
        <OrderSummary subtotal={subTotal}/>

      </div>

    </div>
  );
}