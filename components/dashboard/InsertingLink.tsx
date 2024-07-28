'use client';

import Select, { components } from 'react-select';
import { TbBrandGithubFilled } from 'react-icons/tb';
import { BsYoutube } from 'react-icons/bs';
import { FaLinkedin, FaFacebook, FaDev, FaTwitter } from 'react-icons/fa';
import { HiChevronDown, HiChevronUp } from 'react-icons/hi';
import FormInput from '../forms/FormInput';
import navLi from '@/myImages/navli.svg';
import Image from 'next/image';
import { Link } from '@/utils/types'; // Adjust import to your actual type definition
import bar from '@/myImages/bar.svg';

interface OptionType {
  value: string;
  label: JSX.Element;
}

const DropdownIndicator = (props: any) => {
  return (
    <components.DropdownIndicator {...props}>
      {props.selectProps.menuIsOpen ? (
        <HiChevronUp className="text-[#633CFF] text-2xl" />
      ) : (
        <HiChevronDown className="text-[#633CFF] text-2xl" />
      )}
    </components.DropdownIndicator>
  );
};

// CUSTOM STYLES
const customStyles = {
  control: (provided: any, state: any) => ({
    ...provided,
    border: state.menuIsOpen ? '1px solid #633CFF' : '1px solid #D9D9D9', // Border when menu is open
    boxShadow: state.menuIsOpen ? '0px 0px 32px 0px #633CFF40' : '', // Box shadow when menu is open
    padding: '4px 8px',
    '&:hover': {
      cursor: 'pointer',
    },
  }),

  menu: (provided: any) => ({
    ...provided,
    zIndex: 9999, // Ensure the dropdown menu appears above other elements
    padding: '0 15px',
  }),
  placeholder: (provided: any) => ({
    ...provided,
    color: '#737373', // Customize placeholder color
  }),
  singleValue: (provided: any) => ({
    ...provided,
    color: '#333333', // Customize selected value color
  }),
  indicatorSeparator: () => ({
    display: 'none', // Hide the indicator separator line
  }),
  dropdownIndicator: (provided: any) => ({
    ...provided,
    // Remove padding if necessary
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    borderBottom: '1px solid #D9D9D9', // Add border bottom to each option
    // padding: '10px 15px', // Adjust padding as needed

    color: state.isSelected ? '#633CFF' : '#333333',
    background: state.isSelected ? 'transparent' : 'transparent',
    cursor: 'pointer',
    '&:last-of-type': {
      borderBottom: 'none', // Remove border bottom for the last option
    },
  }),
};

const InsertingLink = () => {
  const options: OptionType[] = [
    {
      value: 'github',
      label: (
        <div className="flex items-center">
          <TbBrandGithubFilled className="text-[#737373] mr-2" />
          Github
        </div>
      ),
    },
    {
      value: 'youtube',
      label: (
        <div className="flex items-center">
          <BsYoutube className="text-[#737373] mr-2" />
          Youtube
        </div>
      ),
    },
    {
      value: 'linkedin',
      label: (
        <div className="flex items-center">
          <FaLinkedin className="text-[#737373] mr-2" />
          Linkedin
        </div>
      ),
    },
    {
      value: 'facebook',
      label: (
        <div className="flex items-center">
          <FaFacebook className="text-[#737373] mr-2" />
          Facebook
        </div>
      ),
    },
    {
      value: 'dev',
      label: (
        <div className="flex items-center">
          <FaDev className="text-[#737373] mr-2" />
          Dev.to
        </div>
      ),
    },
    {
      value: 'twitter',
      label: (
        <div className="flex items-center">
          <FaTwitter className="text-[#737373] mr-2" />
          Twitter
        </div>
      ),
    },
  ];

  return (
    <div className="bg-[#FAFAFA] rounded-[12px] p-[20px] flex flex-col gap-[12px]">
      <div className="text-[#737373] text-[16px] leading-[24px] flex flex-col gap-[12px]">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Image src={bar} alt="bar logo" />
            <h3 className="font-bold">Please add a Link</h3>
          </div>
          <h1>Add a link</h1>
        </div>

        {/* SELECT INPUT */}
        <div className="w-full">
          <p className="text-[12px] leading-[18px] text-[#333333]">Platform</p>
          <Select
            options={options}
            className="basic-single"
            classNamePrefix="select"
            components={{ DropdownIndicator }}
            styles={customStyles}
            defaultValue={options[0]}
            required
            name="social"
          />
        </div>
        <FormInput
          label="Link"
          src={navLi}
          type="text"
          placeHolder="e.g. https://www.github.com/johnappleseed"
          name="url"
          classname="bg-white"
          genClassName="flex flex-col gap-[4px]"
          textClass="text-[12px] leading-[18px]"
        />
      </div>
    </div>
  );
};

export default InsertingLink;
