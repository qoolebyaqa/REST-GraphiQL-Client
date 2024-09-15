import ButtonLogout from '@/components/Auth/ButtonLogout';
import Header from '@/components/Header';
import LangSwitcher from '@/components/LangSwitcher';
import { Link } from '@/navigation';
import { useTranslations } from 'next-intl';

export default function MethodLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const t = useTranslations('Nav');
  return (
    <main className="flex flex-col items-center justify-between px-4">
      <div className="flex gap-10 fixed bg-slate-300 p-4 border-2 justify-between border-slate-400 rounded-md w-full">
        <nav className="flex justify-between gap-96">
          <Header />
          <ul className="flex justify-around gap-10  text-zinc-900">
            <li>
              <Link
                href="/"
                className="hover:text-cyan-600 transition-all duration-300"
              >
                {t('gotoMain')}
              </Link>
            </li>
            <li>
              <Link
                href="/GET"
                className="hover:text-cyan-600 transition-all duration-300"
              >
                {t('gotoRest')}
              </Link>
            </li>
            <li>
              <Link
                href="/GRAPHQL"
                className="hover:text-cyan-600 transition-all duration-300"
              >
                {t('gotoGraph')}
              </Link>
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
