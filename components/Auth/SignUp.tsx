'use client';

import { auth } from '@/firebase/firebase';
import { Link } from '@/navigation';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  User,
} from 'firebase/auth';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/navigation';
import { FormEvent, useEffect, useState } from 'react';

export default function SignUp() {
  const [user, setUser] = useState<{ login: string; password: string }>({
    login: '',
    password: '',
  });
  const t = useTranslations('Auth');
  const [infoMsg, setInfoMsg] = useState('');
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [authState, setAuthState] = useState<User | null>(null);
  useEffect(() => {
    checkUser();
  }, [authState]);

  async function checkUser() {
    if(!authState) {
      setLoading(true);
      onAuthStateChanged(auth, (data: User | null) => {
        setAuthState(data);
      });
      setLoading(false); 
    } else {
      router.push('/GET');
    }
  }

  async function logIn(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      setLoading(true);
      if (user) {
        await signInWithEmailAndPassword(auth, user.login, user.password);
        setInfoMsg('You successfully entered to account');
        setTimeout(() => {
          setInfoMsg('');
          router.push('/GET');
        });
      }
    } catch (err) {
      setInfoMsg('Wrong account. Check your credentials');
    } finally {
      setLoading(false);
    }
  }
  if(loading) {
    return <p>{t('loading')}</p>
  }
  return (
    <form
      className="flex flex-col mt-10 sm:w-1/2 xl:w-1/3 w-11/12 m-auto gap-4 text-teal-800 bg-white md:p-12 p-5 rounded-lg"
      onSubmit={logIn}
    >
      <h2 className="text-sm sm:text-xl md:text-2xl font-bold">
      {t('LogInTitle')}
      </h2>
      {infoMsg && <p className="text-2xl text-amber-400 error">{infoMsg}</p>}
      <p className="text-sm md:text-base">{t('LoginHint')}</p>
      <div className="flex flex-col">
        <label htmlFor="login">{t('NameLabel')}</label>
        <input
          type="text"
          name="login"
          id="login"
          className="text-slate-900 border-2 border-black"
          onChange={(e) => {
            setUser({ ...user, login: e.target.value });
          }}
          value={user.login}
          data-testid='logName'
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="password">{t('PassLabel')}</label>
        <input
          type="password"
          name="password"
          id="password"
          className="text-slate-900 border-2 border-black"
          onChange={(e) => {
            setUser({ ...user, password: e.target.value });
          }}
          value={user.password}
          data-testid='logPass'
        />
      </div>
      <div className="flex sm:gap-5 gap-2 m-auto md:text-base sm:text-sm text-xs">
        <Link href='/auth'>
          <button type="button" disabled={loading}>
            {t('GoToSignUp')}
          </button>
        </Link>
        <button
          type="submit"
          className="bg-cyan-600 rounded-lg sm:w-40 w-1/2 border-2 border-black text-black h-8 md:h-10 disabled:bg-sky-300"
          disabled={loading || (user.login ==='' || user.password === '')}
        >
          {t('LoginSubmit')}
        </button>
      </div>
    </form>
  );
}
