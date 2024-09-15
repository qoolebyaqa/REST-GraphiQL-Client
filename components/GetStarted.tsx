'use client';
import { auth } from '@/firebase/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';
import { useEffect, useState } from 'react';

function GetStarted() {
  const [authState, setAuthState] = useState<User | null>(null);
  const t = useTranslations('Main');
  useEffect(() => {
    onAuthStateChanged(auth, (data: User | null) => {
      setAuthState(data);
    });
  }, []);
  return (
    <Link
      href={authState ? '/GET' : '/auth'}
      className="hover:scale-95 transition-all duration-300 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30"
    >
      {t('startBTN')}
    </Link>
  );
}

export default GetStarted;
