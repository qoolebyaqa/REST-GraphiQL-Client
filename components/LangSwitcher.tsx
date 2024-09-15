'use client';
import { usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import { ChangeEvent } from 'react';
import { useRouter } from '@/navigation';

function LangSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const path = usePathname();
  const changeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = e.target.value;
    if (path.includes('en/') || path.includes('ru/')) {
      router.push(path.slice(3), { locale: nextLocale });
    } else {
      router.push('/', { locale: nextLocale });
    }
  };

  return (
    <select
      className="text-black w-[80px] h-[40px]"
      defaultValue={locale}
      onChange={changeHandler}
    >
      <option value="ru">RU</option>
      <option value="en">EN</option>
    </select>
  );
}

export default LangSwitcher;
