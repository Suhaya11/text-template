import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Message from '@/lib/models/Message';
import { getSession } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { receiver, text } = await req.json();
    if (!receiver || !text) return NextResponse.json({ error: 'Missing fields' }, { status: 400 });

    await connectDB();
    const message = await Message.create({
      sender: session.id,
      receiver,
      text,
    });

    return NextResponse.json(message, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
