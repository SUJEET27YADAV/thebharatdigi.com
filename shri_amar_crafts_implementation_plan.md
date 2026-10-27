# Project Implementation Plan: Shri Amar Crafts FBA Storefront (`shriamarcrafts.thebharatdigi.com`)

## 1. Objective & Context for Antigravity IDE
You are tasked with building and integrating a dedicated B2C ethnic fashion storefront for **Shri Amar Crafts** (Amazon Seller ID: `A1AI1J6GJDQR4B`) inside the existing **The Bharat Digital** (`www.thebharatdigi.com`) Next.js codebase.

- **Primary Domain (B2B Tech Agency):** `www.thebharatdigi.com`
- **Target Subdomain (B2C Ethnic Storefront):** `shriamarcrafts.thebharatdigi.com`
- **Core Requirement:** Display **ONLY Fulfilled by Amazon (FBA)** products using the embedded catalog dataset below, complete with interactive variant selectors (Color/Size), Amazon Prime trust badges, direct "Buy on Amazon" checkout redirects, and isolated branding (no B2B IT agency header/footer leaking into the fashion storefront).

---

## 2. Architecture & Routing Strategy (Next.js App Router)

### 2.1 Directory Structure
Create an isolated route group or dedicated subfolder in the Next.js App Router so the storefront has its own layout, typography, and metadata:

```text
src/
├── middleware.ts                                 # Hostname-based subdomain routing
├── data/
│   └── shri-amar-crafts-fba.json                 # Single source of truth for FBA products
├── types/
│   └── storefront.ts                             # TypeScript interfaces for FBA catalog
├── components/
│   └── shri-amar-crafts/
│       ├── StoreHeader.tsx                       # Ethnic brand navbar (Maroon/Gold theme)
│       ├── StoreHero.tsx                         # Festive ethnic banner with FBA Prime badge
│       ├── ProductCard.tsx                       # Interactive card with Size/Color selector
│       ├── ProductQuickViewModal.tsx             # Detailed specs, fabric care & Amazon CTA
│       ├── FbaTrustBanner.tsx                    # "Fulfilled by Amazon" Prime benefits strip
│       └── StoreFooter.tsx                       # Brand footer + subtle "Powered by The Bharat Digital"
└── app/
    └── shri-amar-crafts/
        ├── layout.tsx                            # Standalone layout (Playfairs/Cormorant + Inter fonts)
        ├── page.tsx                              # Storefront main catalog page
        └── product/
            └── [id]/
                └── page.tsx                      # Dedicated SEO product detail page (PDP)
```

---

## 3. Step-by-Step Implementation Tasks for Antigravity Agent

### Task 1: Seed the FBA Product Catalog Data (`src/data/shri-amar-crafts-fba.json`)
Create `src/data/shri-amar-crafts-fba.json` with the verified FBA-only products and variants below. Do **not** include Easy Ship (`AZ-*`) seller-fulfilled items.

```json
{
  "storeInfo": {
    "brandName": "Shri Amar Crafts",
    "sellerId": "A1AI1J6GJDQR4B",
    "amazonStoreUrl": "https://www.amazon.in/l/27943762031?me=A1AI1J6GJDQR4B",
    "fulfillmentType": "FBA (Fulfilled by Amazon)",
    "tagline": "Handcrafted Indian Ethnic Elegance — Delivered Fast with Amazon Prime",
    "parentAgency": {
      "name": "The Bharat Digital",
      "url": "https://www.thebharatdigi.com"
    }
  },
  "products": [
    {
      "id": "am3-hc-30-maroon",
      "styleCode": "AM3-HC-30",
      "title": "Shri Amar Crafts Women's Cotton Embroidered Long Anarkali Kurti with Pant and Dupatta Set",
      "shortTitle": "Cotton Embroidered Long Anarkali Kurti Set",
      "brand": "Shri Amar Crafts",
      "category": "Anarkali Kurta Sets",
      "fulfillment": "FBA",
      "primeEligible": true,
      "fabric": "100% Breathable Pure Cotton",
      "fitType": "Flared Long Anarkali Silhouette",
      "workType": "Intricate Ethnic Yoke & Neckline Embroidery",
      "packageContents": [
        "1 Long Anarkali Kurti",
        "1 Matching Trouser Pant",
        "1 Coordinated Dupatta"
      ],
      "occasion": [
        "Festive Wear",
        "Traditional Gatherings",
        "Family Celebrations",
        "Daytime Ethnic Styling"
      ],
      "careInstructions": "Gentle hand wash or dry clean recommended to preserve embroidery.",
      "pricing": {
        "currency": "INR",
        "currencySymbol": "₹",
        "basePriceExclGst": 1618.10,
        "gstPercentage": 5,
        "sellingPrice": 1699,
        "mrp": 3499,
        "discountPercentage": 51
      },
      "colors": [
        {
          "name": "Maroon",
          "hex": "#6B1D2F"
        }
      ],
      "variants": [
        {
          "variantId": "FBAAZ-AM3-HC-30-Maroon-L",
          "color": "Maroon",
          "size": "L",
          "sku": "FBAAZ-AM3-HC-30-Maroon-L",
          "asin": "B0H4GTMXPB",
          "inStock": true,
          "fulfillment": "FBA",
          "amazonUrl": "https://www.amazon.in/dp/B0H4GTMXPB?me=A1AI1J6GJDQR4B"
        },
        {
          "variantId": "AM3-HC-30-Maroon-XL",
          "color": "Maroon",
          "size": "XL",
          "sku": "AM3-HC-30-Maroon-XL",
          "asin": "B0H4GQW8J5",
          "inStock": true,
          "fulfillment": "FBA",
          "amazonUrl": "https://www.amazon.in/dp/B0H4GQW8J5?me=A1AI1J6GJDQR4B"
        },
        {
          "variantId": "AM3-HC-30-Maroon-XXL",
          "color": "Maroon",
          "size": "XXL",
          "sku": "AM3-HC-30-Maroon-XXL",
          "asin": "B0H4GTMXPB",
          "inStock": true,
          "fulfillment": "FBA",
          "amazonUrl": "https://www.amazon.in/dp/B0H4GTMXPB?me=A1AI1J6GJDQR4B"
        }
      ],
      "images": {
        "primary": "/images/shri-amar-crafts/am3-hc-30-maroon-front.jpg",
        "gallery": [
          "/images/shri-amar-crafts/am3-hc-30-maroon-front.jpg",
          "/images/shri-amar-crafts/am3-hc-30-maroon-detail.jpg",
          "/images/shri-amar-crafts/am3-hc-30-maroon-back.jpg"
        ],
        "fallbackPlaceholder": "https://placehold.co/800x1050/6B1D2F/F5E6CC?text=Maroon+Anarkali+Kurti+Set"
      },
      "description": "Elevate your festive wardrobe with the Shri Amar Crafts Cotton Embroidered Long Anarkali Kurti Set. Tailored from breathable pure cotton in a regal maroon hue, the flared Anarkali silhouette features fine traditional embroidery along the yoke and neckline, paired seamlessly with comfortable matching pants and a lightweight dupatta."
    },
    {
      "id": "am3-hc12-viscose-silk",
      "styleCode": "AM3-HC12",
      "title": "Shri Amar Crafts Women's Viscose Silk Heavy Embroidered Straight Kurta with Trouser & Banarasi Jacquard Dupatta Set",
      "shortTitle": "Viscose Silk Embroidered Kurta & Banarasi Dupatta Set",
      "brand": "Shri Amar Crafts",
      "category": "Straight Kurta & Banarasi Dupatta Sets",
      "fulfillment": "FBA",
      "primeEligible": true,
      "fabric": "Lustrous Viscose Silk with Woven Banarasi Jacquard Dupatta",
      "fitType": "Classic Straight-Fit Kurta with Tailored Trouser",
      "workType": "Heavy Zari/Thread Embroidery & Traditional Banarasi Jacquard Weave",
      "packageContents": [
        "1 Heavy Embroidered Straight Kurta",
        "1 Matching Tailored Trouser",
        "1 Woven Banarasi Jacquard Dupatta"
      ],
      "occasion": [
        "Wedding Festivities",
        "Party Wear",
        "Evening Celebrations",
        "Festive Occasions"
      ],
      "careInstructions": "Dry clean only to maintain the sheen of Viscose Silk and Banarasi Jacquard weave.",
      "pricing": {
        "currency": "INR",
        "currencySymbol": "₹",
        "basePriceExclGst": 1427.62,
        "gstPercentage": 5,
        "sellingPrice": 1499,
        "mrp": 3299,
        "discountPercentage": 55
      },
      "colors": [
        {
          "name": "Purple",
          "hex": "#4B1D52"
        },
        {
          "name": "Maroon",
          "hex": "#6B1D2F"
        }
      ],
      "variants": [
        {
          "variantId": "AM3-HC12-PURPLE-M",
          "color": "Purple",
          "size": "M",
          "sku": "AM3-HC12-PURPLE-M",
          "asin": "B0H4GTK4VN",
          "inStock": true,
          "fulfillment": "FBA",
          "amazonUrl": "https://www.amazon.in/dp/B0H4GTK4VN?me=A1AI1J6GJDQR4B"
        },
        {
          "variantId": "AM3-HC12-PURPLE-XL",
          "color": "Purple",
          "size": "XL",
          "sku": "AM3-HC12-PURPLE-XL",
          "asin": "B0H4GTK4VN",
          "inStock": true,
          "fulfillment": "FBA",
          "amazonUrl": "https://www.amazon.in/dp/B0H4GTK4VN?me=A1AI1J6GJDQR4B"
        },
        {
          "variantId": "AM3-HC12-MAROON-L",
          "color": "Maroon",
          "size": "L",
          "sku": "AM3-HC12-MAROON-L",
          "asin": "B0H4GTW431",
          "inStock": true,
          "fulfillment": "FBA",
          "amazonUrl": "https://www.amazon.in/dp/B0H4GTW431?me=A1AI1J6GJDQR4B"
        }
      ],
      "images": {
        "primary": "/images/shri-amar-crafts/am3-hc12-purple-front.jpg",
        "gallery": [
          "/images/shri-amar-crafts/am3-hc12-purple-front.jpg",
          "/images/shri-amar-crafts/am3-hc12-maroon-front.jpg",
          "/images/shri-amar-crafts/am3-hc12-banarasi-dupatta.jpg"
        ],
        "fallbackPlaceholder": "https://placehold.co/800x1050/4B1D52/F5E6CC?text=Viscose+Silk+Banarasi+Set"
      },
      "description": "Designed for wedding celebrations and festive evenings, this 3-piece ethnic ensemble pairs a richly embroidered Viscose Silk straight kurta and tailored trouser with a grand woven Banarasi Jacquard dupatta. Available in royal Purple and classic Maroon."
    }
  ]
}
```

---

### Task 2: Create TypeScript Interfaces (`src/types/storefront.ts`)
Define strict types for the JSON dataset so all components have full type safety:
- `ProductVariant`: `variantId`, `color`, `size`, `sku`, `asin`, `inStock`, `fulfillment`, `amazonUrl`
- `ProductPricing`: `currency`, `currencySymbol`, `basePriceExclGst`, `gstPercentage`, `sellingPrice`, `mrp`, `discountPercentage`
- `StoreProduct`: Full product structure matching `shri-amar-crafts-fba.json`

---

### Task 3: Configure Subdomain Routing (`src/middleware.ts`)
Implement hostname detection in `src/middleware.ts` so requests to `shriamarcrafts.thebharatdigi.com` (and `shriamarcrafts.localhost:3000` in local development) transparently rewrite to `/shri-amar-crafts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const hostname = req.headers.get('host') || '';

  // Match production subdomain or local subdomain testing
  const isShriAmarCraftsSubdomain =
    hostname.startsWith('shriamarcrafts.thebharatdigi.com') ||
    hostname.startsWith('shriamarcrafts.localhost');

  // Skip static assets, API routes, and _next internals
  if (
    url.pathname.startsWith('/_next') ||
    url.pathname.startsWith('/api') ||
    url.pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  if (isShriAmarCraftsSubdomain) {
    // Prevent double prefixing if path already starts with /shri-amar-crafts
    if (!url.pathname.startsWith('/shri-amar-crafts')) {
      url.pathname = `/shri-amar-crafts${url.pathname === '/' ? '' : url.pathname}`;
      return NextResponse.rewrite(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
```

---

### Task 4: Design System & UI Components (`src/components/shri-amar-crafts/`)
Ensure the storefront aesthetic contrasts sharply with the B2B dark/tech UI of `thebharatdigi.com`:

1. **Color Palette & Typography:**
   - **Background:** Warm Ivory / Cream (`#FAF6F0`)
   - **Primary Accent:** Royal Maroon (`#6B1D2F`)
   - **Secondary Accent:** Antique Zari Gold (`#C59B27`)
   - **Amazon Prime Trust Accent:** (`#00A8E1` / `#FF9900`)
   - **Headings Font:** `Cormorant Garamond` or `Playfair Display` (loaded via `next/font/google` in `app/shri-amar-crafts/layout.tsx`)
2. **`ProductCard.tsx` Interactive Features:**
   - **Color Swatch Selector:** Clicking `Purple` vs `Maroon` updates the active variant filter and displayed image.
   - **Size Pill Selector (`M`, `L`, `XL`, `XXL`):** Dynamically enables/disables sizes based on the selected color's available FBA variants.
   - **Live SKU & ASIN Badge:** Displays the active FBA ASIN (e.g., `B0H4GTMXPB`, `B0H4GQW8J5`, `B0H4GTK4VN`, `B0H4GTW431`) and a **"Fulfilled by Amazon"** Prime pill.
   - **Pricing Display:** Shows `₹1,699` (or `₹1,499`), strikethrough M.R.P., percentage savings badge (`51% OFF` / `55% OFF`), and *"Inclusive of all taxes"*.
   - **Primary CTA Button:** `"Buy on Amazon"` button that opens the exact `variant.amazonUrl` in a new tab (`target="_blank" rel="noopener noreferrer"`).
   - **Image Fallback Handler:** Gracefully falls back to `images.fallbackPlaceholder` until local high-res product images are dropped into `/public/images/shri-amar-crafts/`.

---

### Task 5: Dedicated Product Detail Page (`src/app/shri-amar-crafts/product/[id]/page.tsx`)
- Render an SEO-optimized Product Detail Page with `generateStaticParams()` for `am3-hc-30-maroon` and `am3-hc12-viscose-silk`.
- Include JSON-LD `Product` structured data (`schema.org/Product`) with `offers`, `sku`, `brand`, and `priceCurrency: "INR"` so Google indexes your FBA listings directly from your subdomain.
- Provide a **Size Chart Modal** (Standard Indian Ethnic Sizes: M = 38", L = 40", XL = 42", XXL = 44" Bust).

---

### Task 6: Cross-Link in `thebharatdigi.com` Portfolio Section
- Locate the **Portfolio / Featured Projects** section on the main agency homepage (`www.thebharatdigi.com`).
- Add a portfolio card for **Shri Amar Crafts — D2C Ethnic Storefront (Amazon FBA Integrated)** linking to `https://shriamarcrafts.thebharatdigi.com` so B2B prospects can view it as a live e-commerce showcase.

---

## 4. Deployment & DNS Checklist (Vercel / Hosting Provider)
1. **Add Domain in Hosting Dashboard:**
   - In your Vercel (or hosting) project settings for `thebharatdigi.com`, add `shriamarcrafts.thebharatdigi.com` under **Domains**.
2. **Add CNAME Record in DNS:**
   - **Type:** `CNAME`
   - **Name / Host:** `shriamarcrafts`
   - **Value / Target:** `cname.vercel-dns.com` (or your host's target alias)
3. **Replacing Product Images:**
   - Drop your actual product photos into `public/images/shri-amar-crafts/` matching the filenames in `shri-amar-crafts-fba.json` (or paste your Amazon `m.media-amazon.com` image URLs directly into `primary` and `gallery`).

---

## 5. Acceptance Criteria for Antigravity Verification
- [ ] Navigating to `http://shriamarcrafts.localhost:3000` renders the **Shri Amar Crafts** ethnic storefront without any B2B agency navbars.
- [ ] Only FBA-verified SKUs (`FBAAZ-AM3-HC-30-Maroon-L`, `AM3-HC-30-Maroon-XL`, `AM3-HC-30-Maroon-XXL`, `AM3-HC12-PURPLE-M`, `AM3-HC12-PURPLE-XL`, `AM3-HC12-MAROON-L`) appear in the storefront.
- [ ] Selecting different Color + Size combinations dynamically updates the **"Buy on Amazon"** button URL to the exact variant ASIN (`B0H4GTMXPB`, `B0H4GQW8J5`, `B0H4GTK4VN`, or `B0H4GTW431`).
- [ ] `npm run build` succeeds with zero TypeScript or ESLint errors.