"use client";
import { useCartStore } from "@/store/cartStore";
import { ShoppingBag, Trash } from "lucide-react";
import CheckoutModal from "../_components/CheckoutModal";
import { useState } from "react";
import Link from "next/link";

export default function CartPage() {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const { cart, removeFromCart } = useCartStore();

  const getCartSubTotal = () =>
    cart.reduce((total, item) => total + Number(item.price), 0);

  const getCartTotal = () => getCartSubTotal() + getCartSubTotal() * 0.18;

  const subtotal = getCartSubTotal();
  const gst = subtotal * 0.18;

  return (
    <section className="min-h-[calc(100dvh-100px)] px-4 md:px-6 py-24 max-w-3xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
          Shopping Cart
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          Review your selections before checkout. Prices show the base amount;
          GST at 18% is added at payment.
        </p>
      </header>

      <div className="card p-6 md:p-8">
        {cart.length === 0 ? (
          <div className="empty-state py-12">
            <div className="empty-state-icon">
              <ShoppingBag size={22} aria-hidden />
            </div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
              Your cart is empty
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 max-w-xs">
              Browse our digital products and add something to get started.
            </p>
            <Link href="/shop" className="btn-primary">
              Browse Shop
            </Link>
          </div>
        ) : (
          <>
            <ul className="divide-y divide-slate-200 dark:divide-slate-800">
              {cart.map((item, idx) => (
                <li
                  key={item.id}
                  className="py-4 flex items-center gap-4 first:pt-0 last:pb-0"
                >
                  <span className="text-sm tabular-nums text-slate-400 w-5 shrink-0">
                    {idx + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <h2 className="font-medium text-slate-900 dark:text-white truncate">
                      {item.name}
                    </h2>
                  </div>
                  <p className="text-sm font-semibold tabular-nums text-slate-900 dark:text-white shrink-0">
                    ₹{Number(item.price).toFixed(2)}
                  </p>
                  <button
                    type="button"
                    aria-label={`Remove ${item.name} from cart`}
                    className="btn-ghost p-2 shrink-0 text-red-500 hover:text-red-600"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <Trash size={18} aria-hidden />
                  </button>
                </li>
              ))}
            </ul>

            <dl className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <dt className="text-slate-600 dark:text-slate-400">Subtotal</dt>
                <dd className="font-medium tabular-nums">₹{subtotal.toFixed(2)}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-slate-600 dark:text-slate-400">GST (18%)</dt>
                <dd className="font-medium tabular-nums">₹{gst.toFixed(2)}</dd>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-800">
                <dt className="font-semibold text-slate-900 dark:text-white">Total</dt>
                <dd className="text-lg font-bold tabular-nums text-slate-900 dark:text-white">
                  ₹{getCartTotal().toFixed(2)}
                </dd>
              </div>
            </dl>

            <button
              type="button"
              onClick={() => setIsCheckoutOpen(true)}
              className="btn-primary w-full mt-6 py-3"
            >
              Proceed to Pay
            </button>
          </>
        )}
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
