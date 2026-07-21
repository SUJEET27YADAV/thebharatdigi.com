"use client";
import React, { useActionState, useState } from "react";
import { Copy, Eye, EyeOff } from "lucide-react";

interface PassgenPageProps {
  action: (
    prevState: { message: string; password: string } | undefined,
    formData: FormData,
  ) => Promise<{ message: string; password: string } | undefined>;
}

const initialState = { message: "", password: "" };

export default function PassgenPage({ action }: PassgenPageProps) {
  const [state, formAction, _pending] = useActionState(action, initialState);
  const [showPass, setShowPass] = useState(false);

  return (
    <main className="w-full flex flex-col items-center gap-4 px-6 py-24 sm:py-33">
      <h1 className="sr-only">
        The Bharat Digital: &quot;Premium Web Development Company that offers SEO
        Audit Tools, e-commerce solutions, IT support & much more for Businesses
        all over the world.
      </h1>
      <h2 className="text-2xl 2xstext-3xl xs:text-4xl font-bold">
        Password Generator
      </h2>
      <div className="w-full max-w-md space-y-3">
        <form
          action={formAction}
          className="w-full flex flex-col items-center gap-3"
        >
          <p
            className={`min-h-6 font-bold text-sm ${state?.message.includes("successfully") ? "text-green-500" : "text-red-500"}`}
          >
            {state?.message ?? ""}
          </p>
          <div className="w-full">
            <label htmlFor="passlen">
              Password Length <span className="text-[10px]">( Min: 10 ) :</span>
            </label>
            <input
              type="number"
              name="passlen"
              id="passlen"
              required
              className="block w-full p-2 outline-none border border-zinc-600 rounded"
            />
          </div>
          <button
            title="Submit Button"
            type="submit"
            className="p-2 font-bold rounded bg-indigo-600 hover:bg-indigo-700"
          >
            Generate
          </button>
        </form>
        <h2 className="w-full flex items-center justify-between text-lg font-bold">
          <span>Generated Password :</span>
          <button
            type="button"
            aria-label="Copy password"
            onClick={() => {
              navigator.clipboard.writeText(state?.password ?? "");
            }}
            className="p-2 flex items-center justify-center text-xl cursor-pointer bg-gray-300 dark:bg-zinc-900 hover:bg-zinc-600 rounded"
          >
            <Copy size={20} />
          </button>
        </h2>
        <div className="relative w-full border border-zinc-600 rounded">
          <input
            aria-label="Generated password"
            type={showPass ? "text" : "password"}
            value={state?.password ?? ""}
            placeholder=""
            readOnly
            className="w-full h-full px-2 py-2.5 outline-none text-xs"
          />
          <button
            type="button"
            aria-label={showPass ? "Hide password" : "Show password"}
            onClick={() => {
              setShowPass(!showPass);
            }}
            className="absolute top-0 right-0 h-full p-2 flex items-center justify-center text-xl cursor-pointer bg-gray-300 dark:bg-zinc-900 hover:bg-zinc-600 rounded"
          >
            {showPass ? (
              <EyeOff size={20} />
            ) : (
              <Eye size={20} />
            )}
          </button>
        </div>
      </div>
    </main>
  );
}
