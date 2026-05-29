"use client";
import paymentConfirmationAction from "@/actions/paymentConfirmationAction";
import { useCartStore } from "@/store/cartStore";
import { X, Check, MoreHorizontal, Loader2 } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useActionState, useEffect, useRef } from "react";

const initialState = {
  msg: "",
  status: "PENDING",
  amount: 0,
  paymentMode: "",
  transactionId: "",
};

export default function ConfirmationPage() {
  const params = useSearchParams();
  const merchantOrderId = params.get("merchantOrderId") as string;
  const SubmitRef = useRef<HTMLButtonElement>(null);
  const { cart, clearCart } = useCartStore();
  const [state, formAction, pending] = useActionState(
    paymentConfirmationAction,
    initialState,
  );

  useEffect(() => {
    if (
      merchantOrderId &&
      typeof merchantOrderId === "string" &&
      SubmitRef.current
    ) {
      SubmitRef.current.click();
    }
  }, [merchantOrderId]);

  useEffect(() => {
    if (!pending && state.status === "COMPLETED") {
      clearCart();
    }
  }, [state.status, pending]);

  if (!merchantOrderId || typeof merchantOrderId !== "string") {
    return (
      <div className="w-full min-h-[90vh] flex items-center justify-center px-4 sm:px-16 py-24 bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900">
        <div className="w-full max-w-xl flex flex-col items-center justify-center gap-8 sm:gap-16 px-4 py-8 sm:p-16 bg-gray-400/30 dark:bg-gray-900/30 rounded">
          <h1 className="w-full text-center text-2xl font-bold">
            Payment Confirmation
          </h1>
          <div className="w-30 h-30 aspect-square bg-red-500 flex items-center justify-center rounded-full text-white">
            <X className="w-24 h-24 font-bold" />
          </div>
          <p className="w-full text-center text-xl">
            Error : Invalid Payment Confirmation Details.
          </p>
          <Link
            href="/"
            className="w-full py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 font-bold text-lg rounded hover:from-amber-400 hover:to-amber-500 transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
          >
            Go to Home
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div className="w-full min-h-[90vh] flex items-center justify-center px-4 sm:px-16 py-24 bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900">
      <form action={formAction} className="hidden">
        <input type="hidden" name="merchantOrderId" value={merchantOrderId} />
        {cart.map((item) => (
          <input
            key={item.id}
            type="hidden"
            name="product"
            value={`${item.id}~${item.name}`}
          />
        ))}
        <button ref={SubmitRef} type="submit" className="hidden">
          Submit
        </button>
      </form>
      <div className="w-full max-w-xl flex flex-col items-center justify-center gap-6 sm:gap-12 px-4 py-8 sm:p-16 bg-gray-400/30 dark:bg-gray-900/30 rounded">
        <h1 className="w-full text-center text-2xl font-bold">
          Payment Confirmation
        </h1>
        <div
          className={`w-30 h-30 aspect-square ${state.status === "FAILED" ? "bg-red-500" : state.status === "COMPLETED" ? "bg-green-500" : "bg-yellow-500"} flex items-center justify-center rounded-full text-white font-bold text-8xl`}
        >
          {state.status === "FAILED" ? (
            <X className="w-24 h-24 font-bold" />
          ) : state.status === "COMPLETED" ? (
            <Check className="w-24 h-24 font-bold" />
          ) : (
            <MoreHorizontal className="w-24 h-24 font-bold" />
          )}
        </div>
        <p
          className={`w-full min-h-24 text-center text-xl font-bold ${state.status === "COMPLETED" ? "text-green-500" : state.status === "FAILED" ? "text-red-500" : ""}`}
        >
          {state.msg === ""
            ? "Your payment is still pending. Waiting for payment gateway response..."
            : state.msg}
        </p>
        <div>
          <p className="font-bold">Payment Details:</p>
          <p>Merchant Order Id: {merchantOrderId}</p>
          <p>Payment Mode: {state.paymentMode}</p>
          <p>Transaction Id: {state.transactionId}</p>
        </div>
        {state.status === "PENDING" || state.status === "" ? (
          <button
            onClick={() => window.location.reload()}
            className="w-full py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 font-bold text-lg rounded hover:from-amber-400 hover:to-amber-500 transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
          >
            Check Status Again
          </button>
        ) : (
          <Link
            href="/"
            className="w-full py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 font-bold text-lg rounded hover:from-amber-400 hover:to-amber-500 transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
          >
            Go to Home
          </Link>
        )}
      </div>
    </div>
  );
}
