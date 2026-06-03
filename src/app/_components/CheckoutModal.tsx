"use client";
import { useActionState, useEffect } from "react";
import Modal from "./ui/modal";
import { CheckoutAction } from "@/actions/checkoutAction";
import { FormState } from "@/types/types";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface CheckoutModalProps {
  onClose: () => void;
  totalAmount: number;
  productIds: string[];
}

const initialstate: FormState = {
  success: false,
  message: "",
  redirectUrl: "",
};

export default function CheckoutModal({
  onClose,
  totalAmount,
  productIds,
}: CheckoutModalProps) {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(
    CheckoutAction,
    initialstate,
  );

  useEffect(() => {
    if (state.success && state.redirectUrl) {
      router.push(state.redirectUrl);
    } else if (!state.success && state.message) {
      toast.error(state.message);
    }
  }, [state, router]);

  return (
    <Modal onClose={onClose} title="Checkout">
      <div className="card w-full max-w-md p-6 md:p-8">
        <p className="text-sm text-slate-600 dark:text-slate-400 text-center mb-6">
          Enter your details to receive order confirmation and download links.
        </p>
        <form action={formAction} className="space-y-4">
          {productIds.map((id) => (
            <input key={id} type="hidden" name="productIds" value={id} />
          ))}
          <input type="hidden" name="amount" value={totalAmount} />
          <div>
            <label htmlFor="checkout-name" className="block text-sm font-medium mb-1.5">
              Full Name
            </label>
            <input
              id="checkout-name"
              name="name"
              type="text"
              autoComplete="name"
              className="input"
              required
            />
          </div>
          <div>
            <label htmlFor="checkout-email" className="block text-sm font-medium mb-1.5">
              Email
              <span className="font-normal text-slate-500 dark:text-slate-400 ml-1">
                (download links sent here)
              </span>
            </label>
            <input
              id="checkout-email"
              name="email"
              type="email"
              autoComplete="email"
              className="input"
              required
            />
          </div>
          <div>
            <label htmlFor="checkout-phone" className="block text-sm font-medium mb-1.5">
              Phone
            </label>
            <input
              id="checkout-phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              className="input"
              required
            />
          </div>
          <button
            type="submit"
            disabled={pending}
            className="btn-primary w-full py-3 mt-2"
          >
            {pending ? "Processing..." : `Pay ₹${totalAmount.toFixed(2)}`}
          </button>
        </form>
      </div>
    </Modal>
  );
}
