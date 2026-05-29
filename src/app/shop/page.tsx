"use client";
import { Product } from "@/types/types";
import { motion } from "framer-motion";
import { Zap, Globe, ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import ProductCard from "../_components/ProductCard";
import ProductCardLoading from "../_components/ProductCardLoading";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import { toast } from "react-toastify";

export default function StorePage() {
  const router = useRouter();
  const cart = useCartStore((state) => state.cart);
  const [products, setProducts] = useState<Product[] | null>(null);
  const [err, setErr] = useState("");

  const getProducts = async () => {
    try {
      const res = await fetch("/api/getProducts");
      const result = await res.json();
      if (!result.success) {
        setErr(result.msg);
      } else {
        setProducts(result.data);
      }
    } catch (error) {
      throw new Error(error as unknown as string);
    }
  };

  useEffect(() => {
    if (products === null) {
      getProducts();
    }
  }, [products]);

  return (
    <div className="min-h-screen px-4 md:px-6 py-24 max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded border mb-6
                       bg-indigo-50 dark:bg-indigo-500/10 border-indigo-200 dark:border-indigo-500/20"
        >
          <Globe className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          <span className="text-indigo-600 dark:text-indigo-400 text-sm font-medium">
            Available Worldwide
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-slate-900 dark:text-white"
        >
          <span>Boost your development experience </span>
          <span className="gradient-text">with our Starter Products</span>
        </motion.h1>
      </div>

      <h2 className="text-xl font-bold">Products :</h2>
      {/* Product Grid */}
      <section className="max-w-7xl mx-auto py-6 px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {err ? (
            <p className="text-red-500 text-center col-span-full">{err}</p>
          ) : !products ? (
            <ProductCardLoading />
          ) : (
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          )}

          {/* Placeholder for future products */}
          <div className="border-2 border-dashed border-slate-200 dark:border-slate-800 rounded flex flex-col items-center justify-center p-8 text-slate-400 opacity-60">
            <Zap size={48} className="mb-4" />
            <p className="font-medium text-center">
              New digital assets coming soon...
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
