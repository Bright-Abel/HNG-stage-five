'use client';

import Link from 'next/link';
import Image from 'next/image';
import link from '@/myImages/logo.svg';
import mail from '@/myImages/email.svg';
import lock from '@/myImages/lock.svg';
import FormHeader from '@/components/forms/FormHeader';
import FormInput from '@/components/forms/FormInput';
import Button from '@/components/Button';
import { useState } from 'react';
import { mySupabase } from '@/utils/supabase';
import { useToast } from '@/components/ui/use-toast';

function AccountPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<{
    email: string;
    password: string;
  }>({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<{
    email: string;
    password: string;
  }>({
    email: '',
    password: '',
  });

  const validateForm = (): boolean => {
    const newErrors = {
      email: '',
      password: '',
    };
    let isValid = true;

    if (data.email.length < 2) {
      newErrors.email = "Email can't be empty";
      isValid = false;
    } else {
      newErrors.email = '';
      isValid = true;
    }

    if (data.password.length < 2) {
      newErrors.password = 'Password is too short';
      isValid = false;
    } else {
      newErrors.password = '';
      isValid = true;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  const login = async () => {
    setIsLoading(true);
    try {
      // Use the data from component state
      const { data: response, error } =
        await mySupabase.auth.signInWithPassword({
          email: data.email,
          password: data.password,
        });

      if (error) {
        // Inform the user of any errors
        setIsLoading(false);
        toast({
          description: error.message.includes('rate limit')
            ? 'Too many failed attempts. Please try again later.'
            : error.message,
        });
        return; // Exit the function to prevent further execution
      }

      if (response) {
        setIsLoading(false);
        sessionStorage.setItem(
          'authResponse',
          JSON.stringify(response.session.access_token)
        );
        window.location.href = '/user/links';
      }
    } catch (err) {
      setIsLoading(false);
      toast({
        description: 'An unexpected error occurred. Please try again later.',
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission

    if (validateForm()) {
      login();
    }
  };

  return (
    <main className="flex justify-center items-center flex-col w-full">
      <div className="max-w-[476px] w-full md:mt-[100px] md:mb-[20px] flex flex-col gap-[51px]">
        <div className="w-full flex md:justify-center">
          <Image src={link} alt="link logo" />
        </div>
        <div className="bg-white rounded-[12px] p-[40px] flex flex-col gap-[40px]">
          <form onSubmit={handleSubmit} className="flex flex-col gap-[40px]">
            <FormHeader
              header="Login"
              pText="Add your details below to get back into the app"
            />
            <FormInput
              label="Email address"
              placeHolder="e.g. alex@email.com"
              type="email"
              name="email"
              src={mail}
              handleChange={handleChange}
              value={data.email}
              err={errors.email && errors.email} // Pass error message
              genClassName="flex flex-col gap-[4px]"
              textClass="text-[12px] leading-[18px]"
            />
            <FormInput
              label="Password"
              placeHolder="Enter your password"
              type="password"
              name="password"
              handleChange={handleChange}
              value={data.password}
              err={errors.password && errors.password} // Pass error message
              src={lock}
              genClassName="flex flex-col gap-[4px]"
              textClass="text-[12px] leading-[18px]"
            />

            <Button
              type="submit"
              name="Login"
              isLoading={isLoading}
              text="Loading..."
            />
          </form>

          <div className="text-center text-[16px] leading-[24px]">
            <h1 className="text-[#737373]">
              Don&apos;t have an account?
              <Link href="/createAccount" className="text-[#633CFF] ml-1">
                Create account
              </Link>
            </h1>
          </div>
        </div>
      </div>
    </main>
  );
}

export default AccountPage;
