import { NextResponse } from 'next/server';
// Local storage mock for UI testing

  try {
    const { sender, receiver, text } = await req.json();
    if (!receiver || !text || !sender) return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    let messages = globalThis.localMessages || [];
    const message = {
      id: messages.length + 1,
      sender,
      receiver,
      text,
      createdAt: new Date().toISOString(),
      read: false
    };
    messages.push(message);
    globalThis.localMessages = messages;
    return NextResponse.json(message, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Something went wrong' }, { status: 500 });
  }
}
