import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";

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
    // 1. Verify token and check expiration
    const decoded = jwt.verify(token, JWT_SECRET) as {
      productId: string;
      productName: string;
    };
    const { productName } = decoded;

    const safeFilename = path.basename(`${productName}.zip`);
    const filePath = path.join(process.cwd(), "src", "products", safeFilename);

    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { success: false, error: "File not found" },
        { status: 404 },
      );
    }

    // 3. Stream the file down to the browser
    const fileBuffer = fs.readFileSync(filePath);

    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename="${safeFilename}"`,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Download link has expired or is invalid." },
      { status: 410 },
    );
  }
}
