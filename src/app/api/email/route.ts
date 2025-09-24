import { sendEmail } from '@/utils/mailHelper';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { recipients, email } = await req.json();
  const { success, error, info, msg } = await sendEmail(recipients, email);
  if (!success) {
    if (error) console.log(error);
    return NextResponse.json(
      { success, msg, reason: info ?? error },
      { status: info ? 400 : 500 }
    );
  }
  return NextResponse.json(
    { success, msg, reason: info ?? error },
    { status: 200 }
  );
}
