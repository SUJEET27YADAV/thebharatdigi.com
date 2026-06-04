"use client";
import { MessageCircle } from "lucide-react";

const PHONE_NUMBER = "+919999239307";
const MESSAGE = "Hi! I'm interested in your services.";

export default function WhatsAppButton() {
  const whatsappUrl = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(MESSAGE)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center size-14 rounded-full bg-green-500 text-white shadow-lg hover:bg-green-600 transition-all hover:scale-110"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="size-7" />
    </a>
  );
}
