import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Footer from '@/components/Footer/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Rest-graphiql-client',
  description: 'RSSchool study project',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} mt-4`}>
        <header className='flex gap-6 items-center'>
        <svg
          version="1.1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="-466.4 259.6 280.2 47.3"
          enableBackground="new -466.4 259.6 280.2 47.3"
          xmlSpace="preserve"
          className='ekg__svg'
        >
          <polyline
            fill="none"
            stroke="#4289A3"
            className="ekg"
            strokeWidth="1"
            strokeLinecap="square"
            strokeMiterlimit="14"
            points="-465.4,281 
	-436,281 -435.3,280.6 -431.5,275.2 -426.9,281 -418.9,281 -423.9,281 -363.2,281 -355.2,269 -345.2,303 -335.2,263 -325.2,291 
	-319.2,281 -187.2,281 "
          />
        </svg> 
        <h2 className="text-center text-2xl pr-6 pb-[35px]">
          Rest-Graphiql-Client playground
        </h2></header>
        {children}
        <Footer />
      </body>
    </html>
  );
}
