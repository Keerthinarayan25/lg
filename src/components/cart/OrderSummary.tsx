export default function OrderSummary({ subtotal }: { subtotal: number }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
      {/* Totals */}
      <div className="text-sm space-y-1">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <strong>₹{subtotal}</strong>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span>Calculated at Checkout</span>
        </div>
        <div className="flex justify-between">
          <span>Estimated Tax</span>
          <span>Calculated at Checkout</span>
        </div>

        <div className="border-t pt-3 flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span>₹{subtotal}</span>
            </div>
      </div>

      {/* Checkout Buttons */}
      <button className="w-full bg-red-600 text-white py-3 rounded-full font-semibold hover:bg-red-700 transition">
        Checkout
      </button>

      <button className="w-full py-3 rounded-full border font-semibold hover:bg-gray-100">
        Express Checkout
      </button>

      {/* Apple Pay / Google Pay */}
      <div className="flex justify-center gap-4 text-lg">
        <span>Apple Pay</span>
        <span>G Pay</span>
      </div>
    </div>
  );
}