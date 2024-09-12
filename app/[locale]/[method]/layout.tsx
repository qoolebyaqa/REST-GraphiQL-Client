import ButtonLogout from '@/components/Auth/ButtonLogout';
import LangSwitcher from '@/components/LangSwitcher';
import { Link } from '@/navigation';
import { useTranslations } from 'next-intl';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const t = useTranslations('Nav');
  return (
    <main className="flex flex-col items-center justify-between p-4  pt-16 h-[82vh]">
      <div className="flex gap-10 justify-end fixed bg-white p-4 border-2 rounded-md w-full">
        <nav>
          <ul className="flex justify-around gap-10">
            <li>
              <Link href='/' className='hover:text-cyan-600 transition-all duration-300'>{t('gotoMain')}</Link>
            </li>
            <li>
              <Link href="/GET" className='hover:text-cyan-600 transition-all duration-300'>{t('gotoRest')}</Link>
            </li>
            <li>
              <Link href="/GRAPHQL" className='hover:text-cyan-600 transition-all duration-300'>{t('gotoGraph')}</Link>
            </li>
            <li>
              <LangSwitcher />
            </li>
          </ul>
        </nav>
        <ButtonLogout />
      </div>
      {children}
    </main>
  );
}
