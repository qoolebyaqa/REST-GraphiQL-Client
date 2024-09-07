import ButtonLogout from '@/components/Auth/ButtonLogout';
import Link from 'next/link';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex flex-col items-center justify-between p-4 mb-20">
        <nav className='self-end pr-[80px]'>
          <ul className="flex justify-around gap-10">
            <li>
              <Link href='/auth' className='hover:text-cyan-600 transition-all duration-300'>Sign Up</Link>
            </li>
            <li>
              <Link href='/auth/signup' className='hover:text-cyan-600 transition-all duration-300'>Sign In</Link>
            </li>
          </ul>
        </nav>
      {children}
    </main>
  );
}
