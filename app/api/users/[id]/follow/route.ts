import { NextResponse } from "next/server";

// Mock session and users using localStorage/globalThis
function getSessionMock() {
  // For demo: always return a mock user as logged in
  return globalThis.localSession || null;
}

function getLocalUsers() {
  if (!globalThis.localUsers) globalThis.localUsers = [];
  return globalThis.localUsers;
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  try {
    const session = getSessionMock();
    if (!session)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    if (session.id === id) {
      return NextResponse.json(
        { error: "You cannot follow yourself" },
        { status: 400 },
      );
    }

    const users = getLocalUsers();
    const targetUser = users.find((u: any) => u.id === id);
    const currentUser = users.find((u: any) => u.id === session.id);

    if (!targetUser || !currentUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (!currentUser.following) currentUser.following = [];
    if (!targetUser.followers) targetUser.followers = [];

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

    return NextResponse.json({ message: "Success" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
