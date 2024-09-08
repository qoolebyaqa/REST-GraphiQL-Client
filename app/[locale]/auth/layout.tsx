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
    <main className="flex flex-col items-center justify-between p-4 mb-20">
        <nav className='self-end pr-[80px]'>
          <ul className="flex justify-around gap-10">
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
      {children}
    </main>
  );
}
