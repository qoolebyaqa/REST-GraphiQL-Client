import SignUp from "@/components/Auth/SignUp";
import { useTranslations } from "next-intl";

export default function SignIn() {
  const t = useTranslations('Auth')
  return (
    <>
      <h2 className="text-5xl text-cyan-600 mt-6">{t('welcome')}</h2>
      <SignUp />
    </>
  );
}
