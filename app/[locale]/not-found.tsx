import { Link } from "@/navigation";
import { useTranslations } from "next-intl";

function NotFound() {
  const t = useTranslations('404')
  return (
    <section className="flex flex-col justify-center items-center">
      <h3>{t('title')}</h3>
      <p>{t('message')}</p>
      <Link href='/' className="self-end mr-20 my-20 text-cyan-600">{t('gotoMain')}</Link>
    </section>
  );
}

export default NotFound;
