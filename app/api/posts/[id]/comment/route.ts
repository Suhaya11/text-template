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

    const { text } = await req.json();
    if (!text)
      return NextResponse.json(
        { error: "Comment cannot be empty" },
        { status: 400 },
      );

    await connectDB();
    const post = await Post.findById(id);
    if (!post)
      return NextResponse.json({ error: "Post not found" }, { status: 404 });

    post.comments.push({
      author: session.id,
      text,
    });

    await post.save();
    return NextResponse.json(post);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
