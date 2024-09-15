'use client';
import { auth } from '@/firebase/firebase';
import { signOut } from 'firebase/auth';
import { useRouter } from '@/navigation';
import { useTranslations } from 'next-intl';

function ButtonLogout() {
  const router = useRouter();
  function logOutHandler() {
    signOut(auth);
    router.push('/');
  }
  const t = useTranslations('Auth');

  return (
    <button
      className="ml-2 mb-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
      onClick={logOutHandler}
    >
      {t('Logout')}
    </button>
  );
}

export default ButtonLogout;
