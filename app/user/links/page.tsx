'use client';

import LinksDisplay from '@/components/dashboard/LinksDisplay';
import MobileLink from '@/components/dashboard/MobileLink';
import { mySupabase, supabase } from '@/utils/supabase';
import { fetchSession } from '@/utils/supabaseServer';
import { useEffect, useState } from 'react';
import { validateWithZodSchema, linkSchema } from '@/utils/schemas';
import { Link } from '@/utils/types';
import { useToast } from '@/components/ui/use-toast';

function LinkPage() {
  const { toast } = useToast();
  const [user, setUser] = useState<string | null>(null); // Ensure user is a string or null
  const [link, setLink] = useState<Link[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // const [refreshAddLink, setRefreshAddLink] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<number>(0);

  const handleClick = () => {
    // setIsLoading(true);
  };

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
    const social = formData.get('social') as string;
    const url = formData.get('url') as string;
    if (!url.includes(social)) {
      toast({
        description: (
          <p>
            This is not a valid url for a {social} account. Please provide a
            valid url and try again.
          </p>
        ),
        duration: 4000,
        className: 'toast',
      });
      return;
    }

    try {
      // Convert formData to an object and validate it
      const rawData = Object.fromEntries(formData);
      const validatedFields = validateWithZodSchema(linkSchema, rawData);

      if (!user) {
        throw new Error('User not found');
      }

      // Insert new link
      const { data, error } = await supabase
        .from('Link')
        .insert([{ ...validatedFields, userid: user }]);

      if (error) {
        throw error;
      }

      // setRefreshAddLink(false);

      // Refresh the links after insertion
      setRefresh((prev) => prev + 1);
    } catch (error) {
      console.error('Error saving link:', error);
    }
  };

  return (
    <div className="flex lg:gap-[24px] w-full">
      <MobileLink newNumber={refresh} />
      <form onSubmit={handleSubmit} className=" w-full">
        <LinksDisplay links={link} isLoading={isLoading} newNumber={refresh} />
      </form>
    </div>
  );
}

export default LinkPage;
