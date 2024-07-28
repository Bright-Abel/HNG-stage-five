'use client';

import React, { useRef } from 'react';
import upload from '@/myImages/upload.svg';
import upload2 from '@/myImages/upload2.svg'
import Image from 'next/image';
import { useState } from 'react';

type FileUploadProps = {
  file: File | null;
  onFileSelect: (file: File) => void;
  name: string;
  mouseEvent: boolean;
};

const FileSelect: React.FC<FileUploadProps> = ({
  onFileSelect,
  name,
  mouseEvent,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      onFileSelect(selectedFile);
    }
  };

  const [mouseE, setMouseE] = useState<boolean>(false);

  return (
    <div
      onMouseEnter={() => setMouseE(true)}
      onMouseLeave={() => setMouseE(false)}
      className={`flex justify-center items-center ${
        mouseEvent || mouseE
          ? 'text-white z-50 absolute bottom-0 rounded-[12px] bg-[rgba(18,27,25,0.63)] h-full w-full top-0 left-0 right-0'
          : 'text-[#633CFF] relative bg-none'
      }`}
    >
      <input
        type="file"
        accept=".jpg, .jpeg, .png"
        ref={fileInputRef}
        onChange={handleFileInput}
        style={{ display: 'none' }}
        name={name}
      />
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className="flex flex-col gap-[8px] justify-center items-center cursor-pointer"
      >
        <Image
          src={mouseEvent || mouseE ? upload2 : upload}
          alt="Upload Icon"
        />
        <p className="text-[16px] leading-[24px]">
          {mouseEvent || mouseE ? 'Change image' : '+ Upload image'}
        </p>
      </button>
    </div>
  );
};

export default FileSelect;
