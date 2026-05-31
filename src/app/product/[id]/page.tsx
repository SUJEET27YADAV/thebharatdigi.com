"use client";
import Image from "next/image";
import { Product } from "@/types/types";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Trash, ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { toast } from "react-toastify";

export default function ProductPage() {
  const params = useParams();
  const { id } = params;
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [err, setErr] = useState("");
  const { cart, addToCart, removeFromCart } = useCartStore();
  const isInCart = (serial: number) =>
    cart.filter((p) => p.serial === serial).length > 0;
  const getProduct = async () => {
    try {
      const res = await fetch("/api/getSingleProduct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ serial: id }),
      });
      const result = await res.json();
      if (!result.success) {
        setErr(result.msg);
      } else {
        setProduct(result.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (product === null) {
      getProduct();
    }
  }, [product, id]);

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
    productId: string,
  ) => {
    e.stopPropagation();
    removeFromCart(productId);
    toast.info("Product removed from cart!");
  };

  return (
    <div className="min-h-screen px-4 md:px-6 py-30 max-w-7xl mx-auto flex flex-col items-center gap-4">
      {err ? (
        <p className="text-red-500 text-center">{err}</p>
      ) : (
        product && (
          <div className="w-full flex flex-col md:flex-row gap-10">
            <div className="w-full h-fit md:w-4xl border-2 border-slate-300 rounded p-4">
              <Image
                src={product.image_url}
                alt={product.name}
                width={1024}
                height={1024}
                loading="lazy"
                className="object-contain"
              />
            </div>
            <div className="w-full md:w-3xl space-y-8">
              <p className="text-4xl font-bold">{product.name}</p>
              <p className="text-lg">{product.description}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {product.features.map((f) => (
                  <span
                    key={f}
                    className="uppercase tracking-wider font-semibold bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-slate-500"
                  >
                    {f}
                  </span>
                ))}
              </div>
              <span className="line-through">
                Price : ₹{product.price + 200}
              </span>
              <p className="text-3xl font-bold text-slate-900 dark:text-white">
                Price : ₹{product.price}
              </p>
              <div className="flex items-center gap-4">
                {isInCart(product.serial) ? (
                  <button
                    onClick={(e) => handleRemoveFromCart(e, product.id)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded font-medium flex items-center gap-2 transition-colors"
                  >
                    <Trash size={20} />
                    <span> Remove from Cart</span>
                  </button>
                ) : (
                  <button
                    onClick={(e) => handleAddToCart(e, product)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded font-medium flex items-center gap-2 transition-colors"
                  >
                    <ShoppingCart size={20} />
                    <span> Add to Cart</span>
                  </button>
                )}
                <button
                  onClick={() => router.push("/cart")}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded font-medium flex items-center gap-2 transition-colors"
                >
                  <ShoppingCart size={20} />
                  <span> View Cart</span>
                </button>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
}
