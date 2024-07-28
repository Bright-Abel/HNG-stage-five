import { ReactNode, MouseEvent } from 'react';
// import { Link as NextLink } from 'next/link';

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
  const handleCopyUrl: React.MouseEventHandler<HTMLAnchorElement> = (event) => {
    event.preventDefault();
    navigator.clipboard
      .writeText(href)
      .then(() => {
        console.log('URL copied to clipboard:', href);
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
        className={`${className} cursor-copy`}
      >
        {children}
      </a>
    </div>
  );
};

export default CustomLinks;
