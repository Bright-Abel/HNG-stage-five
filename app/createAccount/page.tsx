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
import Loading from '@/components/Loading';

function AccountPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<{
    email: string;
    password: string;
    confirm_password: string;
  }>({
    email: '',
    password: '',
    confirm_password: '',
  });

  const [errors, setErrors] = useState<{
    email: string;
    password: string;
    confirm_password: string;
    genErr: string;
  }>({
    email: '',
    password: '',
    confirm_password: '',
    genErr: '',
  });

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
    try {
      const { data: response, error } = await mySupabase.auth.signUp({
        email: data.email,
        password: data.password,
      });
      if (response) {
        setIsLoading(false);
      }

      if (error) {
        toast({
          description: (
            <p>
              {error.message.includes('rate limit')
                ? 'Too many failed attempts. Please try again later.'
                : error.message}
            </p>
          ),
          duration: 4000,
          className: 'toast',
        });
        setIsLoading(false);
        return;
      }
      window.location.href = '/';
    } catch (err) {
      toast({
        description: <p>An unexpected error occur. Please try again!</p>,
        duration: 4000,
        className: 'toast',
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const newErrors = {
      email: '',
      password: '',
      confirm_password: '',
      genErr: '',
    };
    const emailPattern =
      /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

    if (data.email === '' || data.email.length < 2) {
      newErrors.email = "Can't be empty";
      setIsLoading(false);
    } else if (!emailPattern.test(data.email)) {
      newErrors.email = 'Please use a valid email';
    } else {
      newErrors.email = '';
    }
    if (data.password === '' || data.password.length < 6) {
      newErrors.password = 'Password is too short';
      setIsLoading(false);
    } else {
      newErrors.password = '';
    }
    if (data.confirm_password === '' || data.confirm_password.length < 6) {
      newErrors.confirm_password = 'Password is too short';
      setIsLoading(false);
    } else {
      newErrors.confirm_password = '';
    }
    if (data.password !== data.confirm_password) {
      newErrors.genErr = 'Password and Confirm password must match';
      setIsLoading(false);
    } else {
      newErrors.genErr = '';
    }

    if (Object.values(newErrors).some((error) => error)) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    setErrors(newErrors); // Clear errors if no validation issues
    setIsLoading(true);
    login();
  };

  return (
    <main className="flex justify-center items-center flex-col w-full p-[24px]">
      <div className="max-w-[476px] w-full md:mt-[100px] md:mb-[20px] flex flex-col gap-[40px] md:gap-[51px]">
        <div className="w-full flex md:justify-center">
          <Image src={link} alt="link logo" />
        </div>
        <div className="bg-white rounded-[12px] md:p-[40px] flex flex-col gap-[40px]">
          <form onSubmit={handleSubmit} className="flex flex-col gap-[40px]">
            <FormHeader
              header="Create account"
              pText="Let’s get you started sharing your links!"
            />
            <FormInput
              label="Email address"
              placeHolder="ben@example.com |"
              type="email"
              name="email"
              value={data.email}
              handleChange={handleChange}
              src={mail}
              err={errors.email}
              genClassName="flex flex-col gap-[4px]"
              textClass="text-[12px] leading-[18px]"
              require={true}
            />
            <FormInput
              label="Create password"
              placeHolder="Enter your password"
              type="password"
              name="password"
              value={data.password}
              handleChange={handleChange}
              src={lock}
              err={errors.password}
              genClassName="flex flex-col gap-[4px]"
              textClass="text-[12px] leading-[18px]"
              require={true}
            />
            <div className="flex-col flex gap-2">
              <FormInput
                label="Confirm password"
                placeHolder="Enter your password"
                type="password"
                name="confirm_password"
                value={data.confirm_password}
                handleChange={handleChange}
                err={errors.confirm_password}
                src={lock}
                require={true}
                genClassName="flex flex-col gap-[4px]"
                textClass="text-[12px] leading-[18px]"
              />
              {errors.genErr && (
                <p className="text-[#FF3939] whitespace-nowrap text-[12px] leading-[18px]">
                  {errors.genErr}
                </p>
              )}
            </div>

            <Button
              type="submit"
              name="Create new account"
              isLoading={isLoading}
              text="Loading..."
            />
          </form>

          <div className="text-center text-[16px] leading-[24px]">
            <h1 className="text-[#737373]">
              Don&apos;t have an account?
              <Link href="/" className="text-[#633CFF] ml-1">
                Login
              </Link>
            </h1>
          </div>
        </div>
      </div>
    </main>
  );
}

export default AccountPage;
