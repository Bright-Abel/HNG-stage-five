'use client';

import { ReactNode, MouseEvent } from 'react';
// import { Link as NextLink } from 'next/link';
import { useToast } from './ui/use-toast';
import Image from 'next/image';
import copyLink from '@/myImages/copyLink.svg';

type CustomLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

const CustomLinks: React.FC<CustomLinkProps> = ({
  href,
  children,
  className,
}) => {
  const { toast } = useToast();

  const handleCopyUrl: React.MouseEventHandler<HTMLAnchorElement> = (event) => {
    event.preventDefault();
    navigator.clipboard
      .writeText(href)
      .then(() => {
        toast({
          description: (
            <div className="flex items-center gap-2">
              <Image src={copyLink} alt="Link logo" />
              <p>The link has been copied to your clipboard!</p>
            </div>
          ),
          duration: 4000,
          className: 'toast',
        });
        // Optionally, show a success message or perform other actions.
      })
      .catch((error) => {
        console.error('Failed to copy URL:', error);
        // Handle error, show error message, etc.
      });
  };

  return (
    <div className="">
      <a
        href={href}
        target="_blank"
        onClick={handleCopyUrl}
        className={`${className} cursor-copy `}
      >
        {children}
      </a>
    </div>
  );
};

export default CustomLinks;
