import { mySupabase } from './supabase';
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextRequest, NextResponse } from 'next/server';



export const fetchSession = async (): Promise<string | null> => {
  try {
    const {
      data: { session },
      error,
    } = await mySupabase.auth.getSession();

    if (error) {
      console.error('Error fetching session:', error);
      return null;
    }
    console.log(session?.user?.id);

    return session?.user?.id ?? null;
  } catch (error) {
    console.error('Unexpected error:', error);
    return null;
  }
};

export async function newWare(req: NextRequest) {
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
