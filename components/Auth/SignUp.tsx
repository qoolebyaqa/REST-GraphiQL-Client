'use client';

import { auth } from '@/firebase/firebase';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  User,
} from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';

export default function SignUp() {
  const [user, setUser] = useState<{ login: string; password: string }>({
    login: '',
    password: '',
  });
  const [infoMsg, setInfoMsg] = useState('');
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [authState, setAuthState] = useState<User | null>(null);
  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    setLoading(true);
    onAuthStateChanged(auth, (data: User | null) => {
      setAuthState(data);
    });
    setLoading(false);
  }

  async function logIn(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
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
    }
  }
  if (authState) {
    router.push('/GET');
  }
  return (
    <form
      className="flex flex-col mt-10 sm:w-1/2 xl:w-1/3 w-11/12 m-auto gap-4 text-teal-800 bg-white md:p-12 p-5 rounded-lg"
      onSubmit={logIn}
    >
      <h2 className="text-sm sm:text-xl md:text-2xl font-bold">
        Log in to Playground
      </h2>
      {infoMsg && <p className="text-2xl text-amber-400">{infoMsg}</p>}
      <p className="text-sm md:text-base">Enter to your account</p>
      <div className="flex flex-col">
        <label htmlFor="login">Username</label>
        <input
          type="text"
          name="login"
          id="login"
          className="text-slate-900 border-2 border-black"
          onChange={(e) => {
            setUser({ ...user, login: e.target.value });
          }}
          value={user.login}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="password">Password</label>
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
        <button type="button" onClick={() => router.push('/auth')} disabled={loading}>
          Need to register?
        </button>
        <button
          type="submit"
          className="bg-cyan-600 rounded-lg sm:w-40 w-1/2 border-2 border-black text-black h-8 md:h-10 disabled:bg-sky-300"
          disabled={loading}
        >
          Log in
        </button>
      </div>
    </form>
  );
}
