import type { Metadata } from "next";
import CartPage from "./CartPage";

export const metadata: Metadata = {
  title: "Shopping Cart | The Bharat Digital",
  description: "Review your cart and proceed to checkout at The Bharat Digital shop. Digital products with lifetime updates and support.",
};

export default function Page() {
  return <CartPage />;
}
