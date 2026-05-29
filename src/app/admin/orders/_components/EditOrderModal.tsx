import Modal from "@/app/_components/ui/modal";
import { X } from "lucide-react";
import { SubmitEvent, useState } from "react";
import { toast } from "react-toastify";

interface EditOrderModalProps {
  order: Record<string, string | boolean | number>;
  onClose: () => void;
}

export default function EditOrderModal({
  order,
  onClose,
}: EditOrderModalProps) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData(e.currentTarget);
      const data = {
        id: order.id,
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        phone: formData.get("phone") as string,
        amount: Number(formData.get("amount") as string) * 100,
        product_id: (formData.get("product_id") as string)
          .split("\\")
          .map((f) => f.trim()),
        created_at: formData.get("created_at") as string,
        paid: formData.get("paid") === "on",
      };
      const response = await fetch("/api/updateOrder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const res = await response.json();
      if (res.success) {
        toast.success(res.msg || "Order updated successfully!");
        onClose();
      } else {
        toast.error(res.msg || "Failed to update order, please try again.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to update order. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  console.log("Order Paid:", order.paid);
  const inputClass =
    "w-full p-2 border border-slate-500 rounded outline-none focus:ring-2 focus:ring-indigo-600 transition-colors";
  return (
    <Modal>
      <div className="relative w-full max-w-md p-6 flex flex-col items-center gap-4 bg-white/60 dark:bg-black/30 rounded">
        <button
          className="absolute top-4 right-4 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
          onClick={() => onClose()}
        >
          <X size={24} />
        </button>
        <h2 className="text-xl font-bold">Edit Order</h2>
        {/* Add your form fields here */}
        <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
          <label htmlFor="name">Customer Name</label>
          <input
            id="name"
            name="name"
            placeholder="Enter customer name"
            defaultValue={order.name as string}
            className={inputClass}
          />
          <label htmlFor="email">Customer Email</label>
          <input
            id="email"
            name="email"
            placeholder="Enter customer email"
            defaultValue={order.email as string}
            className={inputClass}
          />
          <label htmlFor="phone">Customer Phone</label>
          <input
            id="phone"
            name="phone"
            placeholder="Enter customer phone"
            defaultValue={order.phone as string}
            className={inputClass}
          />
          <label htmlFor="amount">Order Amount</label>
          <input
            id="amount"
            name="amount"
            placeholder="Enter order amount"
            defaultValue={order.amount as string}
            className={inputClass}
          />
          <label htmlFor="product_id">
            Product IDs{" "}
            <span className="text-sm">(Backslash-separated ( \ ))</span>
          </label>
          <input
            id="product_id"
            name="product_id"
            placeholder="Enter Product IDs (backslash-separated)"
            defaultValue={(order.product_id as string).split(", ").join("\\")}
            className={inputClass}
          />
          <label htmlFor="created_at">Created At</label>
          <input
            id="created_at"
            name="created_at"
            placeholder="Enter created at"
            defaultValue={order.created_at as string}
            className={inputClass}
          />
          <div className="flex items-center gap-2">
            <label htmlFor="paid">Paid</label>
            <input
              id="paid"
              name="paid"
              type="checkbox"
              defaultChecked={order.paid as boolean}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
            disabled={loading}
          >
            {loading ? "Updating Order..." : "Update Order"}
          </button>
        </form>
      </div>
    </Modal>
  );
}
