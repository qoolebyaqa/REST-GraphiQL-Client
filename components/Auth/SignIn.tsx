'use client';

import { auth } from '@/firebase/firebase';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  User,
} from 'firebase/auth';
import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from '@/navigation';
import { formSchema } from '@/utils/Schema';
import { ValidationError } from 'yup';
import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';

export default function SignIn() {
  const router = useRouter();
  const t = useTranslations('Auth')
  const [authState, setAuthState] = useState<User | null>(null);
  const [user, setUser] = useState<{ login: string; password: string }>({
    login: '',
    password: '',
  });
  const [infoMsg, setInfoMsg] = useState<{[key:string]: string}>({});
  const [loading, setLoading] = useState(false);
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
  async function registerUser(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      if (user.login !=='' && user.password !== '') {
        const validForm = await formSchema.isValid(user);
        if(validForm) {
          setLoading(true)
          await createUserWithEmailAndPassword(auth, user.login, user.password);
          await signOut(auth);
          router.push('/auth/signup')
        } else {
          await formSchema.validate(user, { abortEarly: false });
        }
      }
    } catch (err) {
      if (err instanceof ValidationError) {
        const newErrors: { [key: string]: string } = {};
        err.inner.forEach((err) => {
          if (err.path) {
            newErrors[err.path] = err.message;
          }
        });
        setInfoMsg(newErrors);
      } else {        
        setInfoMsg({login: 'Login has been already exist'})
        console.log(err);
      }
    } finally {
      setLoading(false)
    }
  }
  return (
    <>
        <form
          className="flex flex-col mt-10 sm:w-1/2 xl:w-1/3 w-11/12 m-auto gap-4 text-teal-800 bg-white md:p-12 p-5 rounded-lg"
          onSubmit={registerUser}
        >
          <h2 className="text-sm sm:text-xl md:text-2xl font-bold">
            {t('SignupTitle')}
          </h2>
          <p className="text-sm md:text-base">{t('SignupHint')}</p>
          <div className="flex flex-col">
            {infoMsg.login && <p className="text-2xl text-amber-400 error">{infoMsg.login}</p>}
            <label htmlFor="signin">{t('NameLabel')}</label>
            <input
              type="text"
              name="signin"
              id="signin"
              className="text-slate-900 border-2 border-black"
              onChange={(e) => {
                setUser({ ...user, login: e.target.value });
              }}
              value={user.login}
            />
          </div>
          <div className="flex flex-col">
            {infoMsg.password && <p className="text-2xl text-amber-400 error">{infoMsg.password}</p>}
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
            />
          </div>
          <div className="flex sm:gap-5 gap-2 m-auto md:text-base sm:text-sm text-xs">
            <Link href='/auth/signin'>
              <button type="button" disabled={loading}>
                {t('GoToSignIn')}
              </button>
            </Link>
            <button
              type="submit"
              className="bg-cyan-600 rounded-lg sm:w-40 w-1/2 border-2 border-black text-black h-8 md:h-10 disabled:bg-sky-300"
              disabled={loading || (user.login ==='' || user.password === '')}
            >
              {t('SignupSubmit')}
            </button>
          </div>
        </form>
    </>
  );
}
