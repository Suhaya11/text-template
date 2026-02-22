import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Report from '@/lib/models/Report';
import { getSession } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { reportedUser, reportedPost, reason } = await req.json();
    if (!reason) return NextResponse.json({ error: 'Reason is required' }, { status: 400 });

    await connectDB();
    const report = await Report.create({
      reporter: session.id,
      reportedUser,
      reportedPost,
      reason,
    });

    return NextResponse.json(report, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
