import { NextResponse } from 'next/server';

// Mock session and config using localStorage/globalThis
function getSessionMock() {
  // For demo: always return a mock admin user as logged in
  return globalThis.localSession || null;
}

function getLocalConfig() {
  if (!globalThis.localConfig) globalThis.localConfig = { logo: '', siteName: '', updatedBy: '', updatedAt: 0 };
  return globalThis.localConfig;
}

  try {
    const config = getLocalConfig();
    return NextResponse.json(config);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

  try {
    const session = getSessionMock();
    if (!session || session.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { logo, siteName } = await req.json();
    const config = getLocalConfig();
    if (logo !== undefined) config.logo = logo;
    if (siteName !== undefined) config.siteName = siteName;
    config.updatedBy = session.id;
    config.updatedAt = Date.now();
    globalThis.localConfig = config;
    return NextResponse.json(config);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
