import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Config from '@/lib/models/Config';
import { getSession } from '@/lib/auth';

export async function GET() {
  try {
    await connectDB();
    let config = await Config.findOne();
    if (!config) {
      config = await Config.create({});
    }
    return NextResponse.json(config);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const session = await getSession();
    if (!session || session.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { logo, siteName } = await req.json();

    await connectDB();
    const config = await Config.findOneAndUpdate(
      {},
      { 
        $set: { 
          ...(logo && { logo }), 
          ...(siteName && { siteName }),
          updatedBy: session.id,
          updatedAt: Date.now()
        } 
      },
      { upsert: true, new: true }
    );

    return NextResponse.json(config);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
