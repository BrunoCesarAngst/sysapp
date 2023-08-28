import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // centralize o body no meio da página com tailwindcss
    <ClerkProvider>
      <html
        lang="en"
        className="bg-black text-white flex flex-col min-h-screen overflow-hidden"
      >
        <body className="flex-grow mx-auto w-full p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 rounded bg-gray-900 overflow-hidden">
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
