'use client'
import { auth } from "@/firebase/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from 'next/navigation';

function ButtonLogout() {
  const router = useRouter();
  function logOutHandler() {
    signOut(auth);
    router.push('/')
  }

  return ( <button className="border-2 border-rose-600 px-4 bg-red-700" onClick={logOutHandler}>Log out</button> );
}

export default ButtonLogout;