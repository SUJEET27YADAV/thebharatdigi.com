"use client";
import paymentConfirmationAction from "@/actions/paymentConfirmationAction";
import { useCartStore } from "@/store/cartStore";
import { X, Check, Loader2 } from "lucide-react";
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

function StatusIcon({ status }: { status: string }) {
  if (status === "FAILED") {
    return (
      <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center">
        <X className="w-8 h-8 text-red-500" aria-hidden />
      </div>
    );
  }
  if (status === "COMPLETED") {
    return (
      <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center">
        <Check className="w-8 h-8 text-emerald-500" aria-hidden />
      </div>
    );
  }
  return (
    <div className="w-16 h-16 rounded-full bg-amber-500/10 flex items-center justify-center">
      <Loader2 className="w-8 h-8 text-amber-500 animate-spin" aria-hidden />
    </div>
  );
}

export default function ConfirmationPage() {
  const params = useSearchParams();
  const merchantOrderId = params.get("merchantOrderId");
  const SubmitRef = useRef<HTMLButtonElement>(null);
  const { cart, clearCart } = useCartStore();
  const [state, formAction, pending] = useActionState(
    paymentConfirmationAction,
    initialState,
  );

  useEffect(() => {
    if (merchantOrderId && SubmitRef.current) {
      SubmitRef.current.click();
    }
  }, [merchantOrderId]);

  useEffect(() => {
    if (!pending && state.status === "COMPLETED") {
      clearCart();
    }
  }, [state.status, pending, clearCart]);

  if (!merchantOrderId) {
    return (
      <div className="min-h-[calc(100dvh-80px)] flex items-center justify-center px-4 py-24">
        <div className="card w-full max-w-md p-8 text-center">
          <div className="empty-state py-6">
            <div className="empty-state-icon mx-auto">
              <X size={22} className="text-red-500" aria-hidden />
            </div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              Invalid confirmation link
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
              This payment confirmation URL is missing required details.
            </p>
            <Link href="/" className="btn-primary w-full">
              Go to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100dvh-80px)] flex items-center justify-center px-4 py-24">
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
        <button ref={SubmitRef} type="submit">
          Submit
        </button>
      </form>

      <div className="card w-full max-w-md p-8">
        <h1 className="text-xl font-bold text-center text-slate-900 dark:text-white mb-6">
          Payment Confirmation
        </h1>

        <div className="flex justify-center mb-6">
          <StatusIcon status={state.status} />
        </div>

        <p
          className={`text-center text-sm leading-relaxed mb-6 min-h-[3rem] ${
            state.status === "COMPLETED"
              ? "text-emerald-600 dark:text-emerald-400"
              : state.status === "FAILED"
                ? "text-red-600 dark:text-red-400"
                : "text-slate-600 dark:text-slate-400"
          }`}
          role="status"
        >
          {state.msg === ""
            ? "Waiting for payment gateway response…"
            : state.msg}
        </p>

        {(state.paymentMode || state.transactionId) && (
          <dl className="text-sm space-y-2 mb-6 p-4 rounded bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
            <div className="flex justify-between gap-4">
              <dt className="text-slate-500 dark:text-slate-400">Order ID</dt>
              <dd className="font-mono text-xs text-slate-900 dark:text-white truncate">
                {merchantOrderId}
              </dd>
            </div>
            {state.paymentMode && (
              <div className="flex justify-between gap-4">
                <dt className="text-slate-500 dark:text-slate-400">Payment mode</dt>
                <dd className="text-slate-900 dark:text-white">{state.paymentMode}</dd>
              </div>
            )}
            {state.transactionId && (
              <div className="flex justify-between gap-4">
                <dt className="text-slate-500 dark:text-slate-400">Transaction ID</dt>
                <dd className="font-mono text-xs text-slate-900 dark:text-white truncate">
                  {state.transactionId}
                </dd>
              </div>
            )}
          </dl>
        )}

        {state.status === "PENDING" || state.status === "" ? (
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="btn-primary w-full"
          >
            Check Status Again
          </button>
        ) : (
          <Link href="/" className="btn-primary w-full">
            Go to Home
          </Link>
        )}
      </div>
    </div>
  );
}
