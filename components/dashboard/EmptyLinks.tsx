import links from '@/myImages/emptyLinks.svg';
import Image from 'next/image';
function EmptyLinks() {
  return (
    <div className="p-[20px] h-fit rounded-[12px] flex flex-col justify-center items-center gap-[12px] bg-[#FAFAFA]">
      <Image src={links} alt="empty links" />
      <div className="flex flex-col gap-[24px]">
        <h2 className="text-[#333333] text-[32px] leading-[48px] font-bold text-center">
          Let's get you started
        </h2>
        <p className="text-[#737373] text-[16px] leading-[24px] text-center">
          Use the “Add new link” button to get started. Once you have more than
          one link, you can reorder and edit them. We’re here to help you share
          your profiles with everyone!
        </p>
      </div>
    </div>
  );
}
export default EmptyLinks;

//styleName: Heading M;
