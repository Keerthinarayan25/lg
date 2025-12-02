import OrderSummary from "@/components/cart/OrderSummary";
import CheckoutForm from "@/components/checkout/CheckoutForm";
import { getAuthUser } from "@/lib/authFunctions";

export default async function checkOutPage(){
  await getAuthUser();
  return(
    <div className="bg-[#eae6db] min-h-screen p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        <CheckoutForm/>
        <OrderSummary subtotal={354}/>

      </div>

    </div>
  );
}