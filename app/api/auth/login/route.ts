import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/lib/models/User';
import { comparePassword, createToken } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  try {
    const { ugNumber, password } = await req.json();

    if (!ugNumber || !password) {
      return NextResponse.json({ error: 'Missing U.G Number or password' }, { status: 400 });
    }

    await connectDB();

    const user = await User.findOne({ ugNumber });
    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const isValid = await comparePassword(password, user.password);
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const token = await createToken({
      id: user._id,
      name: user.name,
      ugNumber: user.ugNumber,
      role: user.role,
    });

    const response = NextResponse.json({ 
      message: 'Logged in successfully',
      user: { id: user._id, name: user.name, role: user.role }
    });

    (await cookies()).set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 1 day
      path: '/',
    });

    return response;
  } catch (error: any) {
    console.error("Login Error:", error);
    return NextResponse.json({ error: error.message || 'Something went wrong' }, { status: 500 });
  }
}
