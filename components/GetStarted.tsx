'use client';
import { auth } from '@/firebase/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import Link from 'next/link';
import { useEffect, useState } from 'react';

function GetStarted() {
  const [authState, setAuthState] = useState<User | null>(null);
  useEffect(() => {
    onAuthStateChanged(auth, (data: User | null) => {
      setAuthState(data);
    });
  }, []);
  return (
    <Link
      href={authState ? '/GET' : '/auth'}
      className="flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30"
    >
      Get started
    </Link>
  );
}

export default GetStarted;
