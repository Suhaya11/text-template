import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Post from "@/lib/models/Post";
import { getSession } from "@/lib/auth";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  try {
    const session = await getSession();
    if (!session)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await connectDB();
    const post = await Post.findById(id);
    if (!post)
      return NextResponse.json({ error: "Post not found" }, { status: 404 });

    const index = post.likes.indexOf(session.id);
    if (index === -1) {
      post.likes.push(session.id);
    } else {
      post.likes.splice(index, 1);
    }

    await post.save();
    return NextResponse.json({ likes: post.likes });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
