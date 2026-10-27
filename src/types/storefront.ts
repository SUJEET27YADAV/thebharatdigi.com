export interface ProductVariant {
  variantId: string;
  color: string;
  size: "M" | "L" | "XL" | "XXL" | string;
  sku: string;
  asin: string;
  inStock: boolean;
  fulfillment: "FBA" | string;
  amazonUrl: string;
}

export interface ProductPricing {
  currency: string;
  currencySymbol: string;
  basePriceExclGst: number;
  gstPercentage: number;
  sellingPrice: number;
  mrp: number;
  discountPercentage: number;
}

export interface ProductColor {
  name: string;
  hex: string;
}

export interface ProductImages {
  primary: string;
  gallery: string[];
  fallbackPlaceholder: string;
}

export interface StoreProduct {
  id: string;
  styleCode: string;
  title: string;
  shortTitle: string;
  brand: string;
  category: string;
  fulfillment: "FBA" | string;
  primeEligible: boolean;
  fabric: string;
  fitType: string;
  workType: string;
  packageContents: string[];
  occasion: string[];
  careInstructions: string;
  pricing: ProductPricing;
  colors: ProductColor[];
  variants: ProductVariant[];
  images: ProductImages;
  description: string;
}

export interface StoreInfo {
  brandName: string;
  sellerId: string;
  amazonStoreUrl: string;
  fulfillmentType: string;
  tagline: string;
  parentAgency: {
    name: string;
    url: string;
  };
}

export interface StoreCatalog {
  storeInfo: StoreInfo;
  products: StoreProduct[];
}
