import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(request: Request) {
  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
  if (!accessKey) {
    return NextResponse.json(
      { success: false, message: 'Form is not configured.' },
      { status: 500 }
    );
  }

  let payload: { name?: string; email?: string; message?: string };
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, message: 'Invalid request body.' },
      { status: 400 }
    );
  }

  const name = payload.name?.toString().trim() ?? '';
  const email = payload.email?.toString().trim() ?? '';
  const message = payload.message?.toString().trim() ?? '';

  if (!name || !email || !message) {
    return NextResponse.json(
      { success: false, message: 'Missing required fields.' },
      { status: 400 }
    );
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { success: false, message: 'Invalid email.' },
      { status: 400 }
    );
  }
  if (message.length > 5000 || name.length > 200 || email.length > 200) {
    return NextResponse.json(
      { success: false, message: 'Field too long.' },
      { status: 400 }
    );
  }

  const upstream = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      access_key: accessKey,
      name,
      email,
      message,
      subject: `New contact from ${name}`,
      from_name: 'Heroes — Contact Form',
    }),
  });

  const data = (await upstream.json().catch(() => ({}))) as {
    success?: boolean;
    message?: string;
  };

  if (!upstream.ok || !data.success) {
    return NextResponse.json(
      { success: false, message: data.message ?? 'Submission failed.' },
      { status: 502 }
    );
  }

  return NextResponse.json({ success: true });
}
