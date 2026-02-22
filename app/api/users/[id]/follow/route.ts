import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/lib/models/User";
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

    if (session.id === id) {
      return NextResponse.json(
        { error: "You cannot follow yourself" },
        { status: 400 },
      );
    }

    await connectDB();
    const targetUser = await User.findById(id);
    const currentUser = await User.findById(session.id);

    if (!targetUser || !currentUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const index = currentUser.following.indexOf(id);
    if (index === -1) {
      // Follow
      currentUser.following.push(id);
      targetUser.followers.push(session.id);
    } else {
      // Unfollow
      currentUser.following.splice(index, 1);
      const followerIndex = targetUser.followers.indexOf(session.id);
      if (followerIndex !== -1) {
        targetUser.followers.splice(followerIndex, 1);
      }
    }

    await currentUser.save();
    await targetUser.save();

    return NextResponse.json({ message: "Success" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
