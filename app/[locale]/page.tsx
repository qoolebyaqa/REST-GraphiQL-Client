import GetStarted from '@/components/GetStarted';
import LangSwitcher from '@/components/LangSwitcher';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function Home() {
  
  const t = useTranslations('Main');
  return (
    <main className="flex h-[80vh] flex-col items-center justify-between px-24 pt-36">
      <div className="w-full max-w-5xl items-center flex-col gap-40 justify-between font-mono text-sm lg:flex">
        <div className='flex gap-20'>
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
        <div className='flex gap-40 mr-5'>
        <p className='text-left mb-10 font-mono w-5/6 pt-4'>
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
        </div></div>
      </div>
    </main>
  );
}
