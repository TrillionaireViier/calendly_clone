import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ provider: string }> }
) {
  const resolvedParams = await params;
  const provider = resolvedParams.provider.toLowerCase();
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');
  const error = searchParams.get('error');

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  if (error) {
    console.error(`OAuth error from ${provider}:`, error);
    return NextResponse.redirect(`${baseUrl}/dashboard?error=${error}`);
  }

  if (!code) {
    console.log(`No authorization code provided for ${provider}. Simulating success for demo purposes.`);
  }

  // TODO: In a production app with a real database:
  // 1. Exchange the `code` for an access_token and refresh_token by calling the provider's token URL.
  // 2. Save these tokens to your database (e.g., PostgreSQL, Supabase) associated with the current user.
  // Example for Google:
  // const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
  //   method: 'POST',
  //   body: new URLSearchParams({
  //     code,
  //     client_id: process.env.GOOGLE_CLIENT_ID!,
  //     client_secret: process.env.GOOGLE_CLIENT_SECRET!,
  //     redirect_uri: `${baseUrl}/api/integrations/google/callback`,
  //     grant_type: 'authorization_code',
  //   }),
  // });

  console.log(`Received OAuth code for ${provider}:`, code);
  console.log('Since there is no database configured yet, we will just simulate a successful connection.');

  // Redirect back to the dashboard with a success parameter
  return NextResponse.redirect(`${baseUrl}/dashboard?connected=${provider}`);
}
