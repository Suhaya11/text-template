import { NextResponse } from 'next/server';

// Mock session and reports using localStorage/globalThis
function getSessionMock() {
  // For demo: always return a mock user as logged in
  return globalThis.localSession || null;
}

function getLocalReports() {
  if (!globalThis.localReports) globalThis.localReports = [];
  return globalThis.localReports;
}

  try {
    const session = getSessionMock();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { reportedUser, reportedPost, reason } = await req.json();
    if (!reason) return NextResponse.json({ error: 'Reason is required' }, { status: 400 });

    const reports = getLocalReports();
    const report = {
      id: (Date.now() + Math.random()).toString(),
      reporter: session.id,
      reportedUser,
      reportedPost,
      reason,
      createdAt: Date.now(),
    };
    reports.push(report);
    globalThis.localReports = reports;

    return NextResponse.json(report, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
