'use client';

import nav from '@/myImages/nav.svg';
import Image from 'next/image';
import Link from 'next/link';
import links from '@/myImages/navLink.svg';
import navLog from '@/myImages/navLog.svg';
import prevLog from '@/myImages/prev.svg';
import profile from '@/myImages/navProf.svg';
import navLi from '@/myImages/navli.svg';
import profileAcive from '@/myImages/proAC.svg';
import { usePathname } from 'next/navigation';
function NavBar() {
  const pathname = usePathname();

  const isLink = pathname === '/user/links';
  const isProfile = pathname === '/user/profile';
  return (
    <nav className="p-[16px] bg-white rounded-[12px] max-w-[1,392px] w-full">
      <div className="flex justify-between">
        <Image src={nav} alt="logo" className="hidden md:block" />
        <Image src={navLog} alt="logo" className="md:hidden block" />
        <div className=" flex md:gap-[16px] gap-[8px]">
          <Link
            href="/user/links"
            className={`py-[11px] px-[16px] md:px-[27px] flex gap-2 items-center rounded-[8px] font-semibold hover:text-[#633CFF] duration-500 text-[16px] leading-[24px]  ${
              isLink ? 'bg-[#EFEBFF] text-[#633CFF]' : 'text-[#737373]'
            }`}
          >
            <Image src={isLink ? links : navLi} alt="links" />
            <p className="hidden md:block">Links</p>
          </Link>
          <Link
            href="/user/profile"
            className={`py-[11px] px-[16px] md:px-[27px] flex gap-2 items-center rounded-[8px] hover:text-[#633CFF] duration-500 font-semibold text-[16px] leading-[24px]  ${
              isProfile ? 'bg-[#EFEBFF] text-[#633CFF]' : 'text-[#737373]'
            }`}
          >
            <Image src={isProfile ? profileAcive : profile} alt="links" />
            <p className="hidden md:block">Profile</p>
          </Link>
        </div>

        <div className="py-[11px] px-[16px] md:px-[27px] border-solid rounded-[8px] border border-[#633CFF]">
          <Link
            href="/preview"
            className="text-[#633CFF] text-[16px] leading-[24px] font-semibold hidden md:block"
          >
            Preview
          </Link>
          <Image src={prevLog} alt="logo" className="md:hidden block" />
        </div>
      </div>
    </nav>
  );
}
export default NavBar;
