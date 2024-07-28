'use client';

import LinksDisplay from '@/components/dashboard/LinksDisplay';
import MobileLink from '@/components/dashboard/MobileLink';
import { mySupabase, supabase } from '@/utils/supabase';
import { fetchSession } from '@/utils/supabaseServer';
import { useEffect, useState } from 'react';
import { validateWithZodSchema, linkSchema } from '@/utils/schemas';
import { Link } from '@/utils/types';

function LinkPage() {
  const [user, setUser] = useState<any>(null);
  const [user2, setUser2] = useState<any>(null);
  const [link, setLink] = useState<any>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<number>(0);

  useEffect(() => {
    setIsLoading(true);
    setUser(fetchSession());
    // Subscribe to auth changes
    const {
      data: { subscription },
    } = mySupabase.auth.onAuthStateChange((_event, session) => {
      setUser2(session?.user.id ?? null);
    });

    // FETCHING USER LINKS
    const fetchProfiles = async () => {
      // Fetch profiles where the email matches 'segun@example.com'
      const myUserID = await fetchSession();

      const { data, error } = await supabase
        .from('Link')
        .select('*')
        .eq('userid', myUserID);

      if (data) {
        setIsLoading(false);
      }

      if (error) {
        setError('Error fetching profiles');
        setIsLoading(false);
        console.error('Error fetching profiles:', error);
        return;
      }

      setLink((data as Link[]) || []);
    };
    // END OF LINKS FETCHING
    fetchProfiles();

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

      const myUserID = await user;
      if (!myUserID) {
        throw new Error('User not found');
      }

      // Insert new link
      const { error } = await supabase
        .from('Link')
        .insert([{ ...validatedFields, userid: myUserID }]);

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Error saving link:', error);
    }
    const newNumber = refresh + 1;
    setRefresh(newNumber);
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
