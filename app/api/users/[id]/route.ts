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

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  try {
    const session = getSessionMock();
    if (!session)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // Users can only update their own profile, unless they are admin
    if (session.id !== id && session.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();
    const { name, profilePicture, department, graduatingClass } = body;

    const users = getLocalUsers();
    const userIdx = users.findIndex((u: any) => u.id === id);
    if (userIdx === -1)
      return NextResponse.json({ error: "User not found" }, { status: 404 });

    const user = users[userIdx];
    if (name !== undefined) user.name = name;
    if (profilePicture !== undefined) user.profilePicture = profilePicture;
    if (department !== undefined) user.department = department;
    if (graduatingClass !== undefined) user.graduatingClass = graduatingClass;
    users[userIdx] = user;

    return NextResponse.json(user);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
