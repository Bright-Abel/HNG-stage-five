import type { Metadata } from 'next';
import { Instrument_Sans } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';
import './globals.css';

// const inter = Inter({ subsets: ['latin'] });
const instrument = Instrument_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Link Sharing',
  description: 'Sharing link app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={instrument.className}>
        <div className="">{children}</div>
        <Toaster />
      </body>
    </html>
  );
}
