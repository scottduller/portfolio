import type { Metadata } from 'next';

import Navbar from '@components/Navbar';

import { Amiko, Inter } from 'next/font/google';
import { SectionSettingsProvider } from './context';
import './globals.css';

export const metadata: Metadata = {
  title: 'Scott Duller',
  description: 'Software Engineer',
};

const inter = Inter({
  subsets: ['latin'],
  weight: ['700', '500'],
  display: 'swap',
  variable: '--font-inter',
});

const amiko = Amiko({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-amiko',
});

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" className={`${inter.variable} ${amiko.className}`}>
      <body>
        <SectionSettingsProvider>
          <Navbar />
          {children}
        </SectionSettingsProvider>
      </body>
    </html>
  );
};

export default RootLayout;
