import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  // Initialize Supabase client with request and response
  const supabase = createMiddlewareClient({ req, res });

  try {
    // Check for session
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    // Handle possible errors
    if (error) {
      console.error('Supabase session check error:', error);
      return NextResponse.redirect(new URL('/', req.url));
    }

    // Redirect to home if no session
    if (!session) {
      return NextResponse.redirect(new URL('/', req.url));
    }
  } catch (err) {
    console.error('Unexpected middleware error:', err);
    return NextResponse.redirect(new URL('/', req.url));
  }

  return res;
}

// Define which paths the middleware should apply to
export const config = {
  matcher: ['/user/:path*', '/preview'], // Update paths as needed
};
