import NavBar from '@/components/dashboard/NavBar';
import { Toaster } from '@/components/ui/toaster';

import { Inter, Instrument_Sans } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });
const instrument = Instrument_Sans({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className={instrument.className}>
      <div className="bg-[#fafafa] max-w-[1440px] mx-auto w-full p-[24px] flex flex-col gap-[20px]">
        <header className="">
          <NavBar />
        </header>
        <section className="">{children}</section>
      </div>
      <Toaster />
    </main>
  );
}
