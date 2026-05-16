"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Product } from "@/types/types";
import { ShoppingCart, Trash } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { toast } from "react-toastify";

export default function ProductCard({ product }: { product: Product }) {
  const router = useRouter();
  const { cart, addToCart, removeFromCart } = useCartStore();
  const isInCart = (id: number) => cart.filter((p) => p.id === id).length > 0;
  const handleAddToCart = (
    e: React.MouseEvent<HTMLButtonElement>,
    product: Product,
  ) => {
    e.stopPropagation();
    addToCart(product);
    toast.success("Product added to cart!");
  };

  const handleRemoveFromCart = (
    e: React.MouseEvent<HTMLButtonElement>,
    productId: number,
  ) => {
    e.stopPropagation();
    removeFromCart(productId);
    toast.info("Product removed from cart!");
  };

  return (
    <div
      key={product.id}
      onClick={() => router.push(`/product/${product.id}`)}
      className="group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden hover:shadow-xl transition-all"
    >
      {/* Product Badge */}
      <div className="absolute top-4 right-4 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full">
        {product.tag}
      </div>

      {/* Icon/Preview Area */}
      <div className="bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={500}
          height={500}
          className="w-full object-cover"
        />
      </div>

      {/* Details */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
          {product.name}
        </h3>
        <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 line-clamp-3">
          {product.description}
        </p>

        {/* Feature Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {product.features.split(",").map((f) => (
            <span
              key={f}
              className="text-[10px] uppercase tracking-wider font-semibold bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-slate-500"
            >
              {f}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100 dark:border-slate-800">
          <span className="text-2xl font-bold text-slate-900 dark:text-white">
            ₹{product.price}
          </span>
          {isInCart(product.id) ? (
            <button
              onClick={(e) => handleRemoveFromCart(e, product.id)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors"
            >
              <Trash size={20} />
              <span> Remove from Cart</span>
            </button>
          ) : (
            <button
              onClick={(e) => handleAddToCart(e, product)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors"
            >
              <ShoppingCart size={20} />
              <span> Add to Cart</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
