'use client';
import { mySupabase, supabase } from '@/utils/supabase';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Link as linkType, Profile as myProfile } from '@/utils/types';
import { fetchSession } from '@/utils/supabaseServer';
import Image from 'next/image';
import { TbBrandGithubFilled } from 'react-icons/tb';
import { BsYoutube } from 'react-icons/bs';
import { FaLinkedin, FaFacebook, FaDev, FaTwitter } from 'react-icons/fa';
import { FaArrowRight } from 'react-icons/fa6';
import CustomLinks from '@/components/CustomLinks';

const PreviewPage = () => {
  const [user, setUser] = useState<string | null>(null);
  const [links, setLinks] = useState<linkType[]>([]);
  const [profile, setProfile] = useState<myProfile | null>(null);
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
        setError('Error fetching profiles');
        console.error('Error fetching profiles:', error);
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
        setError('Error fetching profiles');
        console.error('Error fetching profiles:', error);
      } else {
        setProfile(data as myProfile);
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
  }, [links, profile, user]);
  return (
    <div className="relative h-screen">
      <div className=" absolute  w-full h-[357px] bg-[#633CFF] hidden md:block rounded-b-[32px] -z-50"></div>
      <div className="max-w-[1440px] w-full  py-[24px] !px-8">
        <header className="w-full rounded-[12px] md:py-[16px] md:px-[24px] bg-white mx-auto flex justify-between gap-[16px] z-50">
          <div className="py-[11px] px-[27px] rounded-[8px] border border-solid border-[#633CFF]">
            <Link
              href="/user/links"
              className="text-[16px] leading-[24px] font-semibold text-[#633CFF] truncate"
            >
              Back to Editor
            </Link>
          </div>
          <div className="py-[11px] px-[27px] rounded-[8px]  bg-[#633CFF] ">
            <Link
              href="/user/links"
              className="text-[16px] leading-[24px] font-semibold text-white truncate"
            >
              Share Link
            </Link>
          </div>
        </header>
        <div
          className="w-[349px] bg-white py-[48px] px-[56px] rounded-[24px] absolute translate-y-[15%] -translate-x-[50%] left-[50%]"
          style={{ boxShadow: '0px 0px 32px 0px #0000001A' }}
        >
          <div className="flex flex-col gap-[56px]">
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

            {/* Links */}
            <div className="flex flex-col gap-[20px]">
              {links.length >= 1 ? (
                links.map((link, index) => {
                  const { id, social, url } = link;
                  return (
                    <CustomLinks
                      href={url}
                      key={id}
                      className={`h-[44px] w-[237px]  rounded-[8px] flex justify-between py-[11px] items-center px-[16px] ${
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
                    </CustomLinks>
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
export default PreviewPage;
