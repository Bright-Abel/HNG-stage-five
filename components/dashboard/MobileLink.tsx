import Image from 'next/image';
import { useEffect, useState } from 'react';
import { supabase, mySupabase } from '@/utils/supabase';
import { fetchSession } from '@/utils/supabaseServer';
import { Link as linkType } from '@/utils/types';
import { TbBrandGithubFilled } from 'react-icons/tb';
import { BsYoutube } from 'react-icons/bs';
import { FaLinkedin, FaFacebook, FaDev, FaTwitter } from 'react-icons/fa';
import { FaArrowRight } from 'react-icons/fa6';
import { Profile } from '@/utils/types';
import Link from 'next/link';
import Loading from '../Loading';

type MobileProps = {
  newNumber: number;
};

const MobileLink: React.FC<MobileProps> = ({ newNumber }) => {
  const [user, setUser] = useState<string | null>(null);
  const [links, setLinks] = useState<linkType[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchUserSession = async () => {
      const userSession = await fetchSession();
      setUser(userSession);
    };
    // LINK FETCHING
    const fetchLink = async () => {
      if (!user) return;

      setIsLoading(true);
      const { data, error } = await supabase
        .from('Link')
        .select('*')
        .eq('userid', user);

      if (error) {
        // setError('Error fetching profiles');
        // console.error('Error fetching profiles:', error);
        setIsLoading(false);
      } else {
        setLinks(data as linkType[]);
      }

      setIsLoading(false);
    };
    // END LINK FETCHING

    // PROFILE FETCH
    const fetchProfile = async () => {
      const myUserID = await fetchSession();
      if (!myUserID) return;

      setIsLoading(true);
      const { data, error } = await supabase
        .from('Profile')
        .select('*')
        .eq('userid', myUserID)
        .single();

      if (error) {
        // setError('Error fetching profiles');
        // console.error('Error fetching profiles:', error);
      } else {
        setProfile(data as Profile);
      }

      setIsLoading(false);
    };
    // END PROFILE FETCH

    fetchUserSession();
    fetchLink();
    fetchProfile();

    const {
      data: { subscription },
    } = mySupabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user.id ?? null);
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, [user, newNumber]);

  if (isLoading) {
    return (
      <div className="w-[38.36%] pt-[24px] rounded-[12px] bg-white hidden lg:flex justify-center items-center">
        <Loading color="#737373" strokeWidth={4} height={200} width={100} />
      </div>
    );
  }
  if (error) return <p>{error}</p>;

  return (
    <div className="w-[560px] pt-[24px] rounded-[12px] bg-white hidden lg:flex justify-between items-center h-[834px]">
      <div className="relative mx-auto w-[307px] flex justify-center items-center bg-white rounded-[2.5rem] h-[631px] border border-solid border-[#737373]">
        <div className="w-[148px] h-[18px] bg-white top-[9px] rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute border border-solid border-[#737373] !border-t-white"></div>

        <div className="rounded-[2rem] overflow-hidden w-[285px] h-[611px] bg-white flex justify-center items-center border border-solid border-[#737373]">
          <div className="h-[500px] w-[237px] flex justify-between flex-col  gap-[56px]">
            <div className="flex flex-col gap-[25px] items-center">
              {profile?.image ? (
                <Image
                  src={profile?.image || ''}
                  alt="image"
                  className="h-[96px] w-[96px] rounded-full object-cover z-50"
                  width={96}
                  height={96}
                />
              ) : (
                <div className="h-[96px] w-[96px] rounded-full bg-[#EEEEEE]"></div>
              )}
              <div className="flex flex-col gap-[8px] items-center">
                {profile?.firstname && profile?.lastname ? (
                  <div className="w-[173px]">
                    <h2 className="truncate font-bold text-[32px] leading-[48px] text-[#333333]">
                      {profile.firstname} {profile.lastname}
                    </h2>
                  </div>
                ) : (
                  <div className="h-[16px] w-[160px] rounded-[104px] bg-[#EEEEEE]"></div>
                )}

                {profile?.email ? (
                  <div className="">
                    <p className="text-[16px] leading-[24px]  text-[#737373]">
                      {profile.email}
                    </p>
                  </div>
                ) : (
                  <div className="h-[8px] w-[72px] rounded-[104px] bg-[#EEEEEE]"></div>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-[20px] h-[400px] scrollbar-style overflow-y-auto">
              {links.length >= 1 ? (
                links.map((link, index) => {
                  const { id, social, url } = link;
                  return (
                    <Link
                      href={url}
                      target="_blank"
                      key={id}
                      className={`h-[44px] w-[237px] rounded-[8px] flex justify-between py-[11px] items-center px-[16px] ${
                        social === 'github'
                          ? 'bg-[#1A1A1A]'
                          : social === 'youtube'
                          ? 'bg-[#EE3939]'
                          : social === 'facebook'
                          ? 'bg-[#302267]'
                          : social.includes('dev')
                          ? 'bg-[#333333]'
                          : social === 'twitter'
                          ? 'bg-[#2D68FF]'
                          : social === 'linkedin'
                          ? 'bg-[#2D68FF]'
                          : null
                      }`}
                    >
                      <div className="text-[12px] leading-[18px] capitalize text-white flex gap-2 items-center">
                        <div className="text-white text-[15px] font-bold">
                          {social === 'github' ? (
                            <TbBrandGithubFilled />
                          ) : social === 'youtube' ? (
                            <BsYoutube />
                          ) : social === 'facebook' ? (
                            <FaFacebook />
                          ) : social.includes('dev') ? (
                            <FaDev />
                          ) : social === 'twitter' ? (
                            <FaTwitter />
                          ) : social === 'linkedin' ? (
                            <FaLinkedin />
                          ) : null}
                        </div>
                        <p className="">{social}</p>
                      </div>
                      <FaArrowRight className="text-[16px] font-bold leading-[18px] text-white" />
                    </Link>
                  );
                })
              ) : (
                <>
                  <div className="h-[44px] w-[237px] rounded-[8px] bg-[#EEEEEE]"></div>
                  <div className="h-[44px] w-[237px] rounded-[8px] bg-[#EEEEEE]"></div>
                  <div className="h-[44px] w-[237px] rounded-[8px] bg-[#EEEEEE]"></div>
                  <div className="h-[44px] w-[237px] rounded-[8px] bg-[#EEEEEE]"></div>
                  <div className="h-[44px] w-[237px] rounded-[8px] bg-[#EEEEEE]"></div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileLink;
