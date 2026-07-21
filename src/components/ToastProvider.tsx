"use client";
import { ToastContainer as Toast, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export { toast };

export default function ToastContainer(
  props: React.ComponentProps<typeof Toast>,
) {
  return <Toast {...props} />;
}
