import { db } from '@/db/db';
import { products } from '@/db/schema';
import { NextResponse } from 'next/server';

export async function GET() {
  
    try {
        const proArr = await db.select().from(products);
        if (!proArr || proArr.length === 0) {
            return NextResponse.json(
                { success: false, msg: "No products found",data:[] },
                { status: 404 }
            );
        }
        return NextResponse.json(
            { success:true, msg:"Products fetched successfully",data:proArr },
            { status: 200 }
        );
    }
    catch (error) {
        console.error(error);
        return NextResponse.json(
            { success: false, msg: "Error fetching products" },
            { status: 500 }
        );
    }
}
