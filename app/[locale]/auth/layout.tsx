import Header from '@/components/Header';
import LangSwitcher from '@/components/LangSwitcher';
import { Link } from '@/navigation';
import { useTranslations } from 'next-intl';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const t = useTranslations('Auth')
  return (
    <main className="flex flex-col items-center justify-between px-4 mb-20 h-[75vh]">
      <div className="flex gap-10 fixed bg-slate-300 p-4 border-2 justify-between border-slate-400 rounded-md w-full">
        <nav className='flex justify-between gap-96 pr-[80px]'>
          <Header />
          <ul className="flex justify-around gap-10  text-zinc-900">
            <li>
              <Link href='/' className='hover:text-cyan-600 transition-all duration-300'>{t('gotoMain')}</Link>
            </li>
            <li>
              <Link href='/auth' className='hover:text-cyan-600 transition-all duration-300'>{t('signUp')}</Link>
            </li>
            <li>
              <Link href='/auth/signin' className='hover:text-cyan-600 transition-all duration-300'>{t('signIn')}</Link>
            </li>
            <li>
              <LangSwitcher />
            </li>
          </ul>
        </nav>
      </div>
      {children}
    </main>
  );
}
