import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/lib/models/User";
import { getSession } from "@/lib/auth";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  try {
    const session = await getSession();
    if (!session)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // Users can only update their own profile, unless they are admin
    if (session.id !== id && session.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();
    const { name, profilePicture, department, graduatingClass } = body;

    await connectDB();
    const user = await User.findByIdAndUpdate(
      id,
      {
        $set: {
          ...(name && { name }),
          ...(profilePicture !== undefined && { profilePicture }),
          ...(department !== undefined && { department }),
          ...(graduatingClass !== undefined && { graduatingClass }),
        },
      },
      { new: true },
    );

    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 404 });

    return NextResponse.json(user);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
