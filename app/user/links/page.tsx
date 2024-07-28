'use client';

import LinksDisplay from '@/components/dashboard/LinksDisplay';
import MobileLink from '@/components/dashboard/MobileLink';
import { mySupabase, supabase } from '@/utils/supabase';
import { fetchSession } from '@/utils/supabaseServer';
import { useEffect, useState } from 'react';
import { validateWithZodSchema, linkSchema } from '@/utils/schemas';
import { Link } from '@/utils/types';

function LinkPage() {
  const [user, setUser] = useState<string | null>(null); // Ensure user is a string or null
  const [link, setLink] = useState<Link[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<number>(0);

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      const myUserID = await fetchSession();
      if (myUserID) {
        setUser(myUserID);
        const { data, error } = await supabase
          .from('Link')
          .select('*')
          .eq('userid', myUserID);

        if (error) {
          setError('Error fetching profiles');
          console.error('Error fetching profiles:', error);
        } else {
          setLink((data as Link[]) || []);
        }
        setIsLoading(false);
      } else {
        setIsLoading(false);
        setError('User session not found');
      }
    };

    fetchUser();

    // Subscribe to auth changes
    const {
      data: { subscription },
    } = mySupabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user.id ?? null);
    });

    // Cleanup subscription on unmount
    return () => {
      subscription?.unsubscribe();
    };
  }, [refresh]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      // Convert formData to an object and validate it
      const rawData = Object.fromEntries(formData);
      const validatedFields = validateWithZodSchema(linkSchema, rawData);

      if (!user) {
        throw new Error('User not found');
      }

      // Insert new link
      const { error } = await supabase
        .from('Link')
        .insert([{ ...validatedFields, userid: user }]);

      if (error) {
        throw error;
      }

      // Refresh the links after insertion
      setRefresh((prev) => prev + 1);
    } catch (error) {
      console.error('Error saving link:', error);
    }
  };

  return (
    <div className="flex lg:gap-[24px]">
      <MobileLink newNumber={refresh} />
      <form onSubmit={handleSubmit}>
        <LinksDisplay links={link} isLoading={isLoading} newNumber={refresh} />
      </form>
    </div>
  );
}

export default LinkPage;
