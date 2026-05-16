import { db } from '@/db/db';
import { products } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const { id } = await req.json();

    try {
        const proArr = await db.select().from(products).where(eq(products.id, id));
        if (!proArr || proArr.length === 0) {
            return NextResponse.json(
                { success: false, msg: "Product details not found.",data:[] },
                { status: 404 }
            );
        }
        return NextResponse.json(
            { success:true, msg:"Product fetched successfully.",data:proArr[0] },
            { status: 200 }
        );
    }
    catch (error) {
        console.error(error);
        return NextResponse.json(
            { success: false, msg: "Error fetching product details." },
            { status: 500 }
        );
    }
}
