import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminToken } from '@/utils/admin/auth';

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('admin_token')?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, authenticated: false },
        { status: 401 }
      );
    }

    const payload = await verifyAdminToken(token);
    if (!payload) {
      return NextResponse.json(
        { success: false, authenticated: false },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      authenticated: true,
      user: {
        userId: payload.userId,
        email: payload.email,
      },
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, authenticated: false, error: 'Token verification failed' },
      { status: 401 }
    );
  }
}
