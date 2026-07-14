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
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center size-14 rounded-full bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 hover:scale-110 group"
      aria-label="Chat on WhatsApp"
    >
      {/* Pulse ring */}
      <span className="absolute inset-0 rounded-full bg-green-500 animate-[pulse-ring_2s_ease-out_infinite] opacity-30" aria-hidden />
      <MessageCircle className="size-7 transition-transform duration-200 group-hover:scale-110" />
    </a>
  );
}
