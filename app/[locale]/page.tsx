import GetStarted from '@/components/GetStarted';
import LangSwitcher from '@/components/LangSwitcher';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';

export default function Home() {
  const locale = useLocale();
  const t = useTranslations('Main');
  return (
    <main className="flex flex-col items-center justify-between px-24 pt-10 mb-40">
      <div className="flex gap-6 items-center w-full text-white">
        <svg
          data-testid="svgEKG"
          version="1.1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="-466.4 259.6 280.2 47.3"
          enableBackground="new -466.4 259.6 280.2 47.3"
          xmlSpace="preserve"
          className="ekg__svg"
          width="1440px"
        >
          <polyline
            fill="none"
            stroke="#4289A3"
            className="ekg"
            strokeWidth="1"
            strokeLinecap="square"
            strokeMiterlimit="14"
            points="-905.4,281 
-436,281 -435.3,280.6 -431.5,275.2 -426.9,281 -418.9,281 -423.9,281 -363.2,281 -355.2,269 -345.2,303 -335.2,263 -325.2,291 
-319.2,281 256.2,281 "
          />
        </svg>
        <h2 className="text-center text-2xl pr-6 pb-[35px]">
          {locale === 'en'
            ? 'Rest-Graphiql-Client playground'
            : 'Платформа - Rest-Graphiql-Client'}
        </h2>
      </div>
      <div className="w-full max-w-5xl items-center flex-col gap-40 justify-between font-mono text-sm lg:flex">
        <div className="flex gap-20">
          <GetStarted />
          <ul>
            <li>
              <p>{t('Petr')}</p>
            </li>
            <li>
              <p>{t('Artur')}</p>
            </li>
            <li>
              <p>{t('Dmitry')}</p>
            </li>
          </ul>
          <LangSwitcher />
        </div>
        <div className="flex gap-40 mr-5">
          <p className="text-left mb-10 font-mono w-5/6 pt-4">
            {t('courseDescription')}
          </p>
          <div className="relative z-[-1] flex place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]">
            <Image
              className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
              src="/rslogo.png"
              alt="RS LOGO Logo"
              width={180}
              height={37}
              priority
            />
          </div>
        </div>
      </div>
    </main>
  );
}
