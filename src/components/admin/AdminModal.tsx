"use client";

import { useState } from "react";
import Modal from "@/components/ui/modal";
import { X } from "lucide-react";

export const adminInputClass =
  "w-full p-2 border border-slate-500 rounded outline-none focus:ring-2 focus:ring-indigo-600 transition-colors";
export const adminInputClassDark =
  "w-full p-2 text-slate-900 dark:text-white border border-slate-500 rounded outline-none focus:ring-2 focus:ring-indigo-600 transition-colors";

interface AdminModalProps {
  title: string;
  onClose: () => void;
  submit: (formData: FormData) => Promise<boolean>;
  submitLabel: string;
  submittingLabel: string;
  children: React.ReactNode;
  className?: string;
}

export default function AdminModal({
  title,
  onClose,
  submit,
  submitLabel,
  submittingLabel,
  children,
  className = "relative w-full max-w-md p-6 flex flex-col items-center gap-4 bg-white/60 dark:bg-black/30 rounded",
}: AdminModalProps) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData(e.currentTarget);
      if (await submit(formData)) {
        onClose();
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal>
      <div className={className}>
        <button
          type="button"
          aria-label="Close"
          className="absolute top-4 right-4 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
          onClick={onClose}
        >
          <X size={24} />
        </button>
        <h2 className="text-xl font-bold">{title}</h2>
        <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
          {children}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
            disabled={loading}
          >
            {loading ? submittingLabel : submitLabel}
          </button>
        </form>
      </div>
    </Modal>
  );
}
