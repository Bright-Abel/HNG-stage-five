'use client';

import FormHeader from '../forms/FormHeader';
import EmptyLinks from './EmptyLinks';
import LinkComp from './LinkComp';
import { useEffect, useState } from 'react';
import { Link } from '@/utils/types';
import InsertingLink from './InsertingLink';
import Loading from '../Loading';

type LinksDisplayProps = {
  links: Link[];
  isLoading: boolean;
  newNumber: number;
};

const LinksDisplay: React.FC<LinksDisplayProps> = ({
  links,
  isLoading,
  newNumber,
}) => {
  const [data, setData] = useState<boolean>(false);
  const [linksState, setLinksState] = useState<Link[]>(links);

  useEffect(() => {
    setLinksState(links);
  }, [links, newNumber]);

  const handleRemove = (id: string) => {
    setLinksState((prevLinks) => prevLinks.filter((link) => link.id !== id));
  };

  return (
    <div className="flex flex-col gap-[12px] w-full">
      <div className="flex flex-col gap-[8px] h-[739px] rounded-t-[12px] scrollbar-style bg-white w-full overflow-x-auto overflow-y-hidden">
        <div className="w-full p-[40px] flex flex-col gap-[40px]">
          <FormHeader
            header="Customize your links"
            pText="Add/edit/remove links below and then share all your profiles with the world!"
          />
          <button
            onClick={() => setData(true)}
            type="button"
            disabled={isLoading}
            className={`w-full py-[11px] px-[27px] border-solid text-[#633CFF] border border-[#633CFF] rounded-[8px] text-center hover:bg-[#EFEBFF] duration-500 text-[16px] leading-[24px] font-semibold ${
              isLoading && 'cursor-not-allowed'
            }`}
          >
            + Add new link
          </button>

          <div className="flex flex-col gap-4">
            {isLoading ? (
              <div className="flex gap-3 flex-col justify-center items-center">
                <Loading
                  color="#633CFF"
                  strokeWidth={4}
                  height={200}
                  width={100}
                />
                <p className="text-[#737373] text-[16px] leading-[29px] font-medium">
                  Please wait while your link is being fetched...
                </p>
              </div>
            ) : (
              <>
                {data && <InsertingLink />}
                {links.length >= 1 || data ? (
                  <LinkComp links={linksState} onRemove={handleRemove} />
                ) : (
                  <EmptyLinks />
                )}
              </>
            )}
          </div>
        </div>
      </div>
      {(links.length >= 1 || data) && (
        <div className="bg-white h-[94px] w-full py-[24px] px-[40px] rounded-b-[12px] flex justify-end text-[16px] leading-[24px] font-semibold">
          <button
            type="submit"
            className={`py-[11px] px-[27px] rounded-[8px] hover:bg-[#BEADFF] duration-500 bg-[#633CFF] text-white ${
              isLoading || !data ? 'cursor-not-allowed' : 'cursor-pointer'
            }`}
          >
            {isLoading ? (
              <Loading color="#FFFF" strokeWidth={6} height={26} width={24} />
            ) : (
              'Save'
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default LinksDisplay;
