import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/lib/models/User';
import { hashPassword } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const { name, ugNumber, dateOfBirth, password } = await req.json();

    if (!name || !ugNumber || !dateOfBirth || !password) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    await connectDB();

    const existingUser = await User.findOne({ ugNumber });
    if (existingUser) {
      return NextResponse.json({ error: 'U.G Number already registered' }, { status: 400 });
    }

    const hashedPassword = await hashPassword(password);
    
    // Check if this is the special admin account
    const role = (ugNumber === 'suhaya' && password === 'sulaiman') ? 'admin' : 'user';

    const user = await User.create({
      name,
      ugNumber,
      dateOfBirth: new Date(dateOfBirth),
      password: hashedPassword,
      role
    });

    return NextResponse.json({ message: 'User created successfully', userId: user._id }, { status: 201 });
  } catch (error: any) {
    console.error("Signup Error:", error);
    return NextResponse.json({ error: error.message || 'Something went wrong' }, { status: 500 });
  }
}
