import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Post from '@/lib/models/Post';
import { getSession } from '@/lib/auth';

export async function GET() {
  try {
    await connectDB();
    const posts = await Post.find({})
      .populate('author', 'name profilePicture ugNumber')
      .sort({ createdAt: -1 });
    return NextResponse.json(posts);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { content, image, visibility } = await req.json();
    if (!content && !image) {
      return NextResponse.json({ error: 'Post must have content or an image' }, { status: 400 });
    }

    await connectDB();
    const post = await Post.create({
      author: session.id,
      content,
      image,
      visibility: visibility || 'public',
    });

    const populatedPost = await Post.findById(post._id).populate('author', 'name profilePicture ugNumber');

    return NextResponse.json(populatedPost, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
