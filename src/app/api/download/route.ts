import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import path from "path";
import { readProductFile } from "@/utils/productFileReader";
import { requireEnv } from "@/utils/env";
import { createServerClient } from "@/utils/supabase/server";

const JWT_SECRET = requireEnv("JWT_SECRET");

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.json(
      { success: false, error: "Missing download token" },
      { status: 400 },
    );
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as {
      customerId: string;
      productId: string;
    };

    if (!decoded.customerId || !decoded.productId) {
      return NextResponse.json(
        { success: false, error: "Download link is invalid." },
        { status: 400 },
      );
    }

    const supabase = createServerClient();

    const { data: customer, error: customerError } = await supabase
      .from("customers")
      .select("id, paid, product_id")
      .eq("id", decoded.customerId)
      .single();

    if (customerError || !customer) {
      return NextResponse.json(
        { success: false, error: "Download link is invalid." },
        { status: 403 },
      );
    }

    if (!customer.product_id.includes(decoded.productId)) {
      return NextResponse.json(
        { success: false, error: "You do not have access to this product." },
        { status: 403 },
      );
    }

    if (!customer.paid) {
      const { data: paid } = await supabase
        .from("payments")
        .select("id")
        .eq("customer_id", decoded.customerId)
        .eq("payment_status", "completed")
        .maybeSingle();

      if (!paid) {
        return NextResponse.json(
          { success: false, error: "You do not have access to this product." },
          { status: 403 },
        );
      }
    }

    const { data: product, error: productError } = await supabase
      .from("products")
      .select("name")
      .eq("id", decoded.productId)
      .single();

    if (productError || !product) {
      return NextResponse.json(
        { success: false, error: "File not found" },
        { status: 404 },
      );
    }

    const safeFilename = path.basename(`${product.name}.zip`);

    let fileBuffer;
    try {
      fileBuffer = await readProductFile(safeFilename);
    } catch {
      return NextResponse.json(
        { success: false, error: "File not found" },
        { status: 404 },
      );
    }

    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename="${safeFilename}"`,
      },
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Download link has expired or is invalid." },
      { status: 410 },
    );
  }
}
