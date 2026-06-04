"use client";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/types";
import { ShoppingCart, Trash } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { toast } from "react-toastify";

export default function ProductCard({ product }: { product: Product }) {
  const { cart, addToCart, removeFromCart } = useCartStore();
  const isInCart = (serial: number) =>
    cart.some((p) => p.serial === serial);

  const handleAddToCart = (
    e: React.MouseEvent<HTMLButtonElement>,
    item: Product,
  ) => {
    e.stopPropagation();
    addToCart(item);
    toast.success("Product added to cart");
  };

  const handleRemoveFromCart = (
    e: React.MouseEvent<HTMLButtonElement>,
    productId: string,
  ) => {
    e.stopPropagation();
    removeFromCart(productId);
    toast.info("Product removed from cart");
  };

  return (
    <Link
      href={`/product/${product.serial}`}
      className="card-interactive card-hover group relative flex flex-col overflow-hidden cursor-pointer"
      aria-label={`View ${product.name}`}
    >
      <div className="absolute top-4 right-4 z-10 bg-indigo-600 dark:bg-[#ac4bff] text-white text-xs font-semibold px-2.5 py-1 rounded">
        {product.tag}
      </div>

      <div className="relative h-56 sm:h-64 bg-slate-100 dark:bg-slate-800 overflow-hidden">
        <Image
          src={product.image_url}
          alt={product.name}
          width={500}
          height={500}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-col flex-1 p-6">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
          {product.name}
        </h3>
        <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 line-clamp-3 leading-relaxed">
          {product.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-6">
          {product.features.map((f) => (
            <span
              key={f}
              className="text-[10px] uppercase tracking-wide font-medium bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-slate-500 dark:text-slate-400"
            >
              {f}
            </span>
          ))}
        </div>

        <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4">
          <span className="text-xl font-bold text-slate-900 dark:text-white">
            ₹{product.price}
          </span>
          {isInCart(product.serial) ? (
            <button
              type="button"
              aria-label={`Remove ${product.name} from cart`}
              onClick={(e) => handleRemoveFromCart(e, product.id)}
              className="btn-secondary px-4 py-2 text-sm"
            >
              <Trash size={16} aria-hidden />
              Remove
            </button>
          ) : (
            <button
              type="button"
              aria-label={`Add ${product.name} to cart`}
              onClick={(e) => handleAddToCart(e, product)}
              className="btn-primary px-4 py-2 text-sm relative overflow-hidden group/btn"
            >
              <span className="relative z-10 flex items-center gap-1">
                <ShoppingCart size={16} aria-hidden />
                Add to Cart
              </span>
              <span className="absolute inset-0 bg-white/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-200" aria-hidden />
            </button>
          )}
        </div>
      </div>
    </Link>
  );
}
