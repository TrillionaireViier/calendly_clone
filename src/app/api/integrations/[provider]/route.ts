import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ provider: string }> }
) {
  const resolvedParams = await params;
  const provider = resolvedParams.provider.toLowerCase();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const redirectUri = `${baseUrl}/api/integrations/${provider}/callback`;

  let authUrl = '';

  switch (provider) {
    case 'google':
      if (!process.env.GOOGLE_CLIENT_ID) return NextResponse.json({ error: 'Missing Google Client ID' }, { status: 400 });
      authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${redirectUri}&response_type=code&scope=https://www.googleapis.com/auth/calendar&access_type=offline&prompt=consent`;
      break;
    case 'zoom':
      if (!process.env.ZOOM_CLIENT_ID) return NextResponse.json({ error: 'Missing Zoom Client ID' }, { status: 400 });
      authUrl = `https://zoom.us/oauth/authorize?response_type=code&client_id=${process.env.ZOOM_CLIENT_ID}&redirect_uri=${redirectUri}`;
      break;
    case 'stripe':
      if (!process.env.STRIPE_CLIENT_ID) return NextResponse.json({ error: 'Missing Stripe Client ID' }, { status: 400 });
      authUrl = `https://connect.stripe.com/oauth/authorize?response_type=code&client_id=${process.env.STRIPE_CLIENT_ID}&redirect_uri=${redirectUri}&scope=read_write`;
      break;
    case 'salesforce':
      if (!process.env.SALESFORCE_CLIENT_ID) return NextResponse.json({ error: 'Missing Salesforce Client ID' }, { status: 400 });
      authUrl = `https://login.salesforce.com/services/oauth2/authorize?response_type=code&client_id=${process.env.SALESFORCE_CLIENT_ID}&redirect_uri=${redirectUri}`;
      break;
    default:
      return NextResponse.json({ error: 'Unknown provider' }, { status: 400 });
  }

  // Redirect the user to the provider's OAuth consent screen
  return NextResponse.redirect(authUrl);
}
