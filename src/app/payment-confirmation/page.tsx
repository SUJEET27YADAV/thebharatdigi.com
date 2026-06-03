import type { Metadata } from "next";
import ConfirmationPage from "./ConfirmationPage";

export const metadata: Metadata = {
  title: "Payment Confirmation | The Bharat Digital",
  description: "Confirm and process your payment for digital products from The Bharat Digital.",
};

export default function Page() {
  return <ConfirmationPage />;
}
