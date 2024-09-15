import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Rest-graphiql-client',
  description: 'RSSchool study project',icons: {
    icon: '/favicon.ico',
  },
};

export default async function RootLayout({
  children,
  params: { locale }
}: Readonly<{
  children: React.ReactNode;
  params: {locale: string}
}>) {
  return (
    <html lang={locale}>
      <body className={`${inter.className}`}>        
        {children}
      </body>
    </html>
  );
}
