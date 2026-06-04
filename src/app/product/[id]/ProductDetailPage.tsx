"use client";
import Image from "next/image";
import { Product } from "@/types/types";
import { useRouter } from "next/navigation";
import { Trash, ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { toast } from "react-toastify";

export default function ProductDetailPage({
  product,
}: {
  product: Product | null;
}) {
  const router = useRouter();
  const { cart, addToCart, removeFromCart } = useCartStore();
  const isInCart = (serial: number) =>
    cart.filter((p) => p.serial === serial).length > 0;

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
      {!product ? (
        <p className="text-red-500 text-center">Product not found.</p>
      ) : (
        <>
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product",
              name: product.name,
              description: product.description,
              image: product.image_url,
              offers: {
                "@type": "Offer",
                price: product.price,
                priceCurrency: "INR",
                availability: "https://schema.org/InStock",
              },
            })}
          </script>

          <div className="w-full flex flex-col md:flex-row gap-10">
            <div className="w-full h-fit md:w-4xl border-2 border-slate-300 rounded p-4">
              <Image
                src={product.image_url}
                alt={product.name}
                width={1024}
                height={1024}
                loading="eager"
                className="object-contain"
              />
            </div>
            <div className="w-full md:w-3xl space-y-8">
              <h1 className="sr-only">
                The Bharat Digital: "Premium Web Development Company that offers
                SEO Audit Tools, e-commerce solutions, IT support & much more
                for Businesses all over the world.
              </h1>
              <h2 className="text-4xl font-bold">{product.name}</h2>
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
                    type="button"
                    onClick={(e) => handleRemoveFromCart(e, product.id)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded font-medium flex items-center gap-2 transition-colors"
                  >
                    <Trash size={20} />
                    <span> Remove from Cart</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={(e) => handleAddToCart(e, product)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded font-medium flex items-center gap-2 transition-colors"
                  >
                    <ShoppingCart size={20} />
                    <span> Add to Cart</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => router.push("/cart")}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded font-medium flex items-center gap-2 transition-colors"
                >
                  <ShoppingCart size={20} />
                  <span> View Cart</span>
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
