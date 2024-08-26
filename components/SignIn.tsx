'use client';

import { auth } from '@/firebase/firebase';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth';
import Link from 'next/link';
import { FormEvent, useEffect, useState } from 'react';
import LogIn from './LogIn';

export default function SignIn() {
  const [user, setUser] = useState<{ login: string; password: string }>({
    login: '',
    password: '',
  });
  const [changeForm, setChangeForm] = useState(false);
  const [loading, setLoading] = useState(true);
  
  async function registerUser(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      if (user) {
        await createUserWithEmailAndPassword(auth, user.login, user.password);
        const createdUser = auth.currentUser;
        console.log(createdUser);
      }
    } catch (err) {
      console.log('Problem with firebase');
    }
  }
  return (
    <>
      {changeForm ? (
        <form
          className="flex flex-col mt-10 sm:w-1/2 xl:w-1/3 w-11/12 m-auto gap-4 text-teal-800 bg-white md:p-12 p-5 rounded-lg"
          onSubmit={registerUser}
        >
          <h2 className="text-sm sm:text-xl md:text-2xl font-bold">
            Sign in to Playground
          </h2>
          <p className="text-sm md:text-base">Register your account</p>
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
            <button type="button" onClick={() => setChangeForm(false)}>
              Already have account?
            </button>
            <button
              type="submit"
              className="bg-cyan-600 rounded-lg sm:w-40 w-1/2 border-2 border-black text-black h-8 md:h-10 disabled:bg-sky-300"
            >
              Sign in
            </button>
          </div>
        </form>
      ) : (
        <LogIn changeForm={() => setChangeForm(true)} />
      )}
    </>
  );
}
