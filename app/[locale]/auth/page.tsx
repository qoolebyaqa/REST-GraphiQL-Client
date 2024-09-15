import SignIn from '@/components/Auth/SignIn';
import { useTranslations } from 'next-intl';

export default function Auth() {
  const t = useTranslations('Auth');
  return (
    <>
      <h2 className="text-5xl text-cyan-600 mt-6">{t('welcome')}</h2>
      <SignIn />
    </>
  );
}
