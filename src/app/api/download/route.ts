import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import path from "path";
import { readProductFile } from "@/utils/productFileReader";

const JWT_SECRET = process.env.JWT_SECRET || "";

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
      productId: string;
      productName: string;
    };
    const { productName } = decoded;

    const safeFilename = path.basename(`${productName}.zip`);

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
