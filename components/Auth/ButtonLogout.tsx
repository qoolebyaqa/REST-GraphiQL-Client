'use client';
import { auth } from '@/firebase/firebase';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';

function ButtonLogout() {
  const router = useRouter();
  function logOutHandler() {
    signOut(auth);
    router.push('/');
  }

  return (
    <button
      className="ml-2 mb-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
      onClick={logOutHandler}
    >
      Log out
    </button>
  );
}

export default ButtonLogout;
