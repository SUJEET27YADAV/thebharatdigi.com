import AdminModal, { adminInputClass } from "@/components/admin/AdminModal";
import { submitAdminForm } from "@/components/admin/submitAdminForm";
import { Order } from "@/types/types";
import { paiseToRupees } from "@/utils/format";

interface EditOrderModalProps {
  order: Order;
  onClose: () => void;
}

export default function EditOrderModal({
  order,
  onClose,
}: EditOrderModalProps) {
  const handleSubmit = async (formData: FormData) => {
    return submitAdminForm(
      "/api/updateOrder",
      "POST",
      {
        id: order.id,
        name: String(formData.get("name") ?? ""),
        email: String(formData.get("email") ?? ""),
        phone: String(formData.get("phone") ?? ""),
        amount: Number(String(formData.get("amount") ?? "")) * 100,
        product_id: String(formData.get("product_id") ?? "")
          .split("\\")
          .map((f) => f.trim()),
        created_at: String(formData.get("created_at") ?? ""),
        paid: formData.get("paid") === "on",
      },
      {
        success: "Order updated successfully!",
        error: "Failed to update order, please try again.",
      },
    );
  };

  return (
    <AdminModal
      title="Edit Order"
      onClose={onClose}
      submit={handleSubmit}
      submitLabel="Update Order"
      submittingLabel="Updating Order..."
    >
      <label htmlFor="name">Customer Name</label>
      <input
        id="name"
        name="name"
        placeholder="Enter customer name"
        defaultValue={order.name}
        className={adminInputClass}
      />
      <label htmlFor="email">Customer Email</label>
      <input
        id="email"
        name="email"
        placeholder="Enter customer email"
        defaultValue={order.email}
        className={adminInputClass}
      />
      <label htmlFor="phone">Customer Phone</label>
      <input
        id="phone"
        name="phone"
        placeholder="Enter customer phone"
        defaultValue={order.phone}
        className={adminInputClass}
      />
      <label htmlFor="amount">Order Amount</label>
      <input
        id="amount"
        name="amount"
        placeholder="Enter order amount"
        defaultValue={paiseToRupees(order.amount).toString()}
        className={adminInputClass}
      />
      <label htmlFor="product_id">
        Product IDs <span className="text-sm">(Backslash-separated ( \ ))</span>
      </label>
      <input
        id="product_id"
        name="product_id"
        placeholder="Enter Product IDs (backslash-separated)"
        defaultValue={order.product_id.join("\\")}
        className={adminInputClass}
      />
      <label htmlFor="created_at">Created At</label>
      <input
        id="created_at"
        name="created_at"
        placeholder="Enter created at"
        defaultValue={order.created_at}
        className={adminInputClass}
      />
      <div className="flex items-center gap-2">
        <label htmlFor="paid">Paid</label>
        <input
          id="paid"
          name="paid"
          type="checkbox"
          defaultChecked={order.paid}
        />
      </div>
    </AdminModal>
  );
}
