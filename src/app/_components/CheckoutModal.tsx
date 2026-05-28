"use client";
import { useActionState, useEffect } from "react";
import Modal from "./ui/modal";
import { CheckoutAction } from "@/actions/checkoutAction";
import { FormState } from "@/types/types";
import { Close } from "@mui/icons-material";
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
  }, [state]);
  return (
    <Modal>
      <div className="relative w-full max-w-md p-4 rounded-lg bg-slate-100/30 dark:bg-slate-900/30 backdrop-blur-md shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white focus:outline-none"
        >
          <Close fontSize="medium" />
        </button>
        <h2 className="w-full text-center text-2xl font-bold mb-4">Checkout</h2>
        <p className="w-full text-center text-slate-600 dark:text-slate-300">
          Please enter your details where you would like to receive your order.
        </p>
        <form action={formAction} className="w-full p-2 mt-4 space-y-4">
          {productIds.map((id) => (
            <input key={id} type="hidden" name="productIds" value={id} />
          ))}
          <input type="hidden" name="amount" value={totalAmount} />
          <div className="w-full">
            <label htmlFor="name" className="block font-medium mb-1">
              Full Name
            </label>
            <input
              name="name"
              type="text"
              className="w-full border border-slate-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="w-full">
            <label htmlFor="email" className="block font-medium mb-1">
              <span>Email </span>
              <span className="text-sm font-normal">
                (Product download links will be sent here.)
              </span>
            </label>
            <input
              name="email"
              type="email"
              className="w-full border border-slate-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="w-full">
            <label htmlFor="phone" className="block font-medium mb-1">
              Phone
            </label>
            <input
              name="phone"
              type="tel"
              className="w-full border border-slate-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            disabled={pending}
            className="w-full px-4 py-2 text-white font-medium bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors"
          >
            {pending ? "Processing..." : "Pay Now"}
          </button>
        </form>
      </div>
    </Modal>
  );
}
