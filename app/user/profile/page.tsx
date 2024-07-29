'use client';
import MobileLink from '@/components/dashboard/MobileLink';
import FileSelect from '@/components/dashboard/profile/FileSelect';
import FormHeader from '@/components/forms/FormHeader';
import { useState, useEffect } from 'react';
import FormInput from '@/components/forms/FormInput';
import { Profile } from '@/utils/types';
import Image from 'next/image';
import { fetchSession } from '@/utils/supabaseServer';
import { mySupabase, uploadImage, supabase } from '@/utils/supabase';
import Loading from '@/components/Loading';
import { useToast } from '@/components/ui/use-toast';

import {
  imageSchema,
  profileSchema,
  validateWithZodSchema,
} from '@/utils/schemas';

function ProfilePage() {
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<number>(0);
  const [mouseEvent, setMouseEvent] = useState<boolean>(false);

  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true);

      // Retrieve the user ID from the session
      const myUserID = await fetchSession();

      // Fetch existing profile
      const { data, error } = await supabase
        .from('Profile')
        .select('*')
        .eq('userid', myUserID)
        .single(); // Use .single() to get one record

      if (error) {
        setError('Error fetching profile');
        setIsLoading(false);
      } else {
        setProfile(data as Profile);
      }

      setIsLoading(false);
    };

    fetchProfile();
  }, [refresh]);

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    try {
      const rawData = Object.fromEntries(formData);
      console.log('Raw Data:', rawData);

      const file = formData.get('image') as File;
      const email = formData.get('email') as string;

      // Validate fields using Zod schema
      const validatedFields = validateWithZodSchema(profileSchema, rawData);
      const validatedFile = validateWithZodSchema(imageSchema, { image: file });

      // Upload image and get the full path
      const fullPath = await uploadImage(validatedFile.image);

      // Retrieve user ID, ensure it's correctly awaited or resolved
      const myUserID = await fetchSession();

      if (profile) {
        // If profile exists, update the profile
        const { data, error } = await supabase
          .from('Profile')
          .update({
            ...validatedFields,
            email,
            image: fullPath,
          })
          .eq('userid', myUserID);
        if (data) {
          setIsLoading(false);
        }

        if (error) {
          setIsLoading(false);
          throw error;
        }
        setIsLoading(false);
      } else {
        // If no profile exists, create a new profile
        const { data, error } = await supabase
          .from('Profile')
          .insert([
            {
              ...validatedFields,
              email,
              image: fullPath,
              userid: myUserID,
            },
          ])
          .select();
        if (data) {
          setIsLoading(false);
          toast({
            description: <p>Profile has been successfully saved</p>,
            duration: 4000,
            className: 'toast',
          });
        }

        if (error) {
          setIsLoading(false);
          throw error;
        }
      }
    } catch (error) {
      toast({
        description: <p>Please upload a new Image</p>,
        duration: 4000,
        className: 'toast',
      });
      setIsLoading(false);
      return { error: 'Error saving profile' };
    }
    const newNumber = refresh + 1;
    setRefresh(newNumber);
  };

  return (
    <div className="flex gap-[24px] w-full">
      <MobileLink newNumber={refresh} />
      {/* SECOND COMP */}
      <div className="flex flex-col gap-[8px] lg:w-[808px] w-full">
        <div className=" w-full rounded-t-[12px] bg-white p-[40px] flex flex-col gap-[40px]">
          <FormHeader
            header="Profile Details"
            pText="Add your details to create a personal touch to your profile."
          />
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-[24px]">
              {/* IMAGE */}
              <div className="bg-[#FAFAFA] rounded-[12px] p-[20px] flex md:justify-between  items-center   md:flex-row flex-col md:items-center gap-[12px]">
                <p className="text-[#737373] text-[16px] leading-[24px]">
                  Profile Picture
                </p>
                <div className="flex gap-[24px] items-center justify-center text-center md:text-end flex-col md:flex-row">
                  <div className="w-[193px] h-[193px] rounded-[12px] relative bg-[#EFEBFF] flex justify-center items-center">
                    {(file || profile?.image) && (
                      <Image
                        onMouseEnter={() => setMouseEvent(true)}
                        onMouseLeave={() => setMouseEvent(false)}
                        src={
                          file
                            ? URL.createObjectURL(file)
                            : profile?.image || ''
                        }
                        alt="image"
                        className={`h-full w-full rounded-[12px] absolute top-0 left-0 right-0 object-cover ${
                          mouseEvent ? 'z-10' : 'z-20'
                        }`}
                        width={193}
                        height={193}
                      />
                    )}
                    {/* {URL.createObjectURL(file) */}

                    <FileSelect
                      name="image"
                      file={file}
                      onFileSelect={handleFileSelect}
                      mouseEvent={mouseEvent}
                      profile={profile?.image}
                    />
                  </div>

                  <p className="text-[#737373] text-[16px] leading-[24px] ">
                    Image must be below 1024x1024px. <br /> Use PNG or JPG
                    format.
                  </p>
                </div>
              </div>

              {/* USER DETAILS */}
              <div className="bg-[#FAFAFA] rounded-[12px] p-[20px] flex flex-col gap-[12px]">
                <FormInput
                  genClassName="flex md:justify-between md:flex-row md:gap-0 flex-col gap-[4px]"
                  label="First name*"
                  placeHolder="e.g John Doe"
                  classname="bg-white"
                  name="firstname"
                  type="text"
                  textClass="text-[16px] leading-[24px]"
                  inputClass="md:w-[68%] w-full"
                  require={true}
                  defaultValue={profile?.firstname || ''}
                />
                <FormInput
                  genClassName="flex md:justify-between md:flex-row md:gap-0 flex-col gap-[4px]"
                  label="Last name*"
                  placeHolder="e.g. Appleseed"
                  classname="bg-white"
                  name="lastname"
                  type="text"
                  textClass="text-[16px] leading-[24px]"
                  inputClass="md:w-[68%] w-full"
                  require={true}
                  defaultValue={profile?.lastname || ''}
                />
                <FormInput
                  genClassName="flex md:justify-between md:flex-row md:gap-0 flex-col gap-[4px]"
                  label="Email"
                  placeHolder="e.g. email@example.com"
                  classname="bg-white"
                  name="email"
                  type="email"
                  textClass="text-[16px] leading-[24px]"
                  inputClass="md:w-[68%] w-full"
                  defaultValue={profile?.email || ''}
                  require={true}
                />
              </div>
            </div>
            <div className=" w-full py-[24px] mt-3 rounded-b-[12px] flex justify-end text-[16px] leading-[24px] font-semibold ">
              <button
                type="submit"
                className="py-[11px] px-[27px] rounded-[8px] hover:bg-[#BEADFF] duration-500 bg-[#633CFF] text-white"
              >
                {isLoading ? (
                  <Loading
                    color="#FFFF"
                    strokeWidth={6}
                    height={26}
                    width={24}
                  />
                ) : (
                  'Save'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
