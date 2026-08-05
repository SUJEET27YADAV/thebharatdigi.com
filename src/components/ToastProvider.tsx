"use client";
import { ToastContainer as Toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ToastContainer(
  props: React.ComponentProps<typeof Toast>,
) {
  return <Toast {...props} />;
}
