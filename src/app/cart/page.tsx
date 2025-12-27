// import { Minus, Plus } from "lucide-react";
import { getCartItems } from "@/actions/cart";
import { CartItem } from "@/types/cartTypes";
import CartItemCard from "@/components/cart/CartItemCard";
import OrderSummary from "@/components/cart/OrderSummary";
// import { isAuthenticated } from "@/lib/authFunctions";

export default async function CartPage() {
  // const isUserRegistered = await isAuthenticated();
  const cartResponse = await getCartItems();
  // The getCartItems action returns the cart data directly, not wrapped in a data field.
  const cartProducts: CartItem[] =
    (cartResponse?.data ? cartResponse.data : cartResponse) || [];
  console.log("Cart products:", cartProducts);

  const subTotal = cartProducts.reduce((sum, item) => sum + item.lineTotal, 0);

  // const cartvariant = cartProducts.product;
  console.log("Cart products:", cartProducts);

  return (
    <div className="bg-[#eae6db] min-h-screen p-6">
      <h1 className="text-2xl font-semibold mb-6">
        My Cart ({cartProducts.length})
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-5 space-y-6">
          {cartProducts.length === 0 ? (
            <p className="text-gray-600 text-lg">Your cart is empty.</p>
          ) : (
            cartProducts.map((item) => (
              <CartItemCard key={item.id} item={item} />
            ))
          )}
        </div>

        <OrderSummary subtotal={subTotal} />
      </div>
    </div>
  );
}