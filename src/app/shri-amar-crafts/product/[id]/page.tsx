import type { Metadata } from "next";
import { notFound } from "next/navigation";
import catalogData from "@/data/shri-amar-crafts-fba.json";
import { StoreProduct } from "@/types/storefront";
import ProductDetailClient from "./ProductDetailClient";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return catalogData.products.map((p) => ({
    id: p.id,
  }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = catalogData.products.find((p) => p.id === id) as
    | StoreProduct
    | undefined;

  if (!product) {
    return {
      title: "Product Not Found | Shri Amar Crafts",
      description: "The requested ethnic ensemble is currently unavailable.",
    };
  }

  return {
    title: `${product.title} | Shri Amar Crafts (Amazon Prime FBA)`,
    description: product.description,
    alternates: {
      canonical: `https://shriamarcrafts.thebharatdigi.com/product/${product.id}`,
    },
    openGraph: {
      title: `${product.shortTitle} — Shri Amar Crafts`,
      description: product.description,
      url: `https://shriamarcrafts.thebharatdigi.com/product/${product.id}`,
      images: [
        {
          url: product.images.primary,
          width: 800,
          height: 1050,
          alt: product.title,
        },
      ],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const allProducts = catalogData.products as unknown as StoreProduct[];
  const product = allProducts.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  const relatedProducts = allProducts.filter((p) => p.id !== product.id);

  // Rich Schema.org Product Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    image: product.images.gallery.map(
      (img) => `https://shriamarcrafts.thebharatdigi.com${img}`
    ),
    description: product.description,
    sku: product.styleCode,
    brand: {
      "@type": "Brand",
      name: product.brand,
    },
    material: product.fabric,
    offers: product.variants.map((v) => ({
      "@type": "Offer",
      sku: v.sku,
      price: product.pricing.sellingPrice,
      priceCurrency: product.pricing.currency,
      priceValidUntil: "2027-12-31",
      itemCondition: "https://schema.org/NewCondition",
      availability: v.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      url: v.amazonUrl,
      seller: {
        "@type": "Organization",
        name: `${product.brand} (Amazon FBA)`,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductDetailClient
        product={product}
        relatedProducts={relatedProducts}
      />
    </>
  );
}
