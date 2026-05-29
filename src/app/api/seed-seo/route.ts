import { seedSEOProduct } from "@/actions/seedSEOProduct";
import { NextResponse } from "next/server";

export async function GET() {
  const result = await seedSEOProduct();
  if (result.success) {
    return NextResponse.json(result, { status: 200 });
  }
  return NextResponse.json(result, { status: 500 });
}
