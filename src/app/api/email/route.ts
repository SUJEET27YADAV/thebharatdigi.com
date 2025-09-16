import { NextRequest, NextResponse } from 'next/server';
import nodemailer, { TransportOptions } from 'nodemailer';

export async function POST(req: NextRequest) {
  const { recipients } = await req.json();
  const sec = process.env.NODE_ENV !== 'development';
  const transport = nodemailer.createTransport({
    host: process.env.HOST,
    secure: sec,
    port: sec ? process.env.SEC_PORT : process.env.NSEC_PORT,
    auth: {
      user: process.env.APP_USER,
      pass: process.env.APP_PASS,
    },
  } as TransportOptions);

  await transport
    .verify()
    .then(() => console.log('Server is ready to take our messages'))
    .catch((e) => {
      console.log('Error, Server not ready to take our messages: %s', e);
      return NextResponse.json(
        {
          success: false,
          message: 'Error, Server not ready to take our messages.',
          reason: e,
        },
        { status: 400 }
      );
    });

  try {
    const info = await transport.sendMail({
      from: { name: 'TheBharatDigi', address: process.env.APP_USER! },
      to: recipients,
      subject: 'Testing',
      text: 'Welcome Tester.',
      html: '<p>Welcome Tester.</p>',
    });
    if (info.rejected.length >= 1) {
      return NextResponse.json(
        {
          success: false,
          message: 'Error sending Email,',
          reason: info,
        },
        { status: 400 }
      );
    } else {
      console.error('Email sent successfully: %s', info);
      return NextResponse.json(
        {
          success: true,
          message: 'Email sent successfully.',
          reason: null,
        },
        { status: 200 }
      );
    }
  } catch (err) {
    console.error('Internal Error', err);
    return NextResponse.json(
      {
        success: false,
        message: 'Error sending Email.',
        reason: err,
      },
      { status: 500 }
    );
  }
}
