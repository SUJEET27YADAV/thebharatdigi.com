"use client";
import { useCartStore } from "@/store/cartStore";
import { Trash } from "lucide-react";
import CheckoutModal from "../_components/CheckoutModal";
import { useState } from "react";

export default function CartPage() {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const { cart, removeFromCart } = useCartStore();

  const getCartSubTotal = () => {
    return cart.reduce((total, item) => total + Number(item.price), 0);
  };
  const getCartTotal = () => {
    return getCartSubTotal() + getCartSubTotal() * 0.18; // Adding 18% GST
  };
  return (
    <section className="min-h-[calc(100dvh-100px)] px-4 md:px-6 py-24 max-w-7xl mx-auto">
      <div className="w-full max-w-4xl border-2 border-slate-300 rounded-xl p-4">
        <div className="border-b border-slate-300">
          <h1 className="text-3xl font-bold mb-4">Items in cart :</h1>
        </div>
        {cart.length === 0 ? (
          <p className="w-full text-center mt-4 text-slate-500 dark:text-slate-300">
            Your cart is empty!
          </p>
        ) : (
          <ul className="min-h-30 mt-4 space-y-4 border-b border-slate-300">
            {cart.map((item, idx) => (
              <li
                key={item.id}
                className="p-1 flex items-center justify-between"
              >
                <div className="flex items-center gap-1 flex-1">
                  <span className="text-lg text-slate-500">{idx + 1}.</span>
                  <h2 className="font-semibold">{item.name}</h2>
                </div>
                <p className="min-w-20 text-end text-lg font-bold">
                  ₹ {Number(item.price).toFixed(2)}
                </p>
                <button
                  className="min-w-10 flex intems-center justify-end"
                  onClick={() => removeFromCart(item.id)}
                >
                  <Trash size={20} className="text-red-500" />
                </button>
              </li>
            ))}
          </ul>
        )}
        <div className="w-full flex items-center justify-between mt-2 pr-10">
          <span className="text-lg font-bold">Sub Total :</span>
          <span className="text-lg font-bold">
            ₹ {getCartSubTotal().toFixed(2)}
          </span>
        </div>
        <div className="w-full flex items-center justify-between pr-10 border-b border-slate-300">
          <span className="font-bold">GST (18%) :</span>
          <span className="font-bold">
            ₹ {(getCartSubTotal() * 0.18).toFixed(2)}
          </span>
        </div>
        <div className="w-full flex items-center justify-between mt-2 mb-4 pr-10">
          <span className="text-xl font-bold">Total :</span>
          <span className="text-xl font-bold">
            ₹ {getCartTotal().toFixed(2)}
          </span>
        </div>
        <button
          onClick={() => setIsCheckoutOpen(true)}
          className="w-full px-4 py-2 text-white font-medium bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors"
        >
          Proceed to Pay
        </button>
      </div>
      {isCheckoutOpen && (
        <CheckoutModal
          totalAmount={getCartTotal()}
          onClose={() => setIsCheckoutOpen(false)}
          productIds={cart.map((item) => item.id)}
        />
      )}
    </section>
  );
}
