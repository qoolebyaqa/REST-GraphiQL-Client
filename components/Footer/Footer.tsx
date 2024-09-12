import Link from 'next/link';
import FooterItem from './FooterItem';
import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('Footer');
  return (
    <footer className="footer mx-auto">
      <FooterItem
        name={t('Artur')}
        ghLink="https://github.com/qoolebyaqa"
        dsLink="https://discord.com/users/539409262355546122"
        location={t('ArturLocation')}
      />
      <FooterItem
        name={t('Petr')}
        ghLink="https://github.com/PetrMarkin"
        dsLink="https://discordapp.com/users/557296404104478743"
        location={t('PetrLocation')}
      />
      <FooterItem
        name={t('Dmitry')}
        ghLink="https://github.com/dm-mrtnvch"
        dsLink="https://discord.com/users/819282393499566081"
        location={t('DmitryLocation')}
      />
      <div className="flex justify-end mt-2 items-center gap-4">
        <svg viewBox="0 0 64 64" fill="white" xmlns="http://www.w3.org/2000/svg" width='40px' height='40px'>
          <g clipPath="url(#clip0_5701_38384)">
            <circle cx="32" cy="32" r="32" fill="black" />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M13 21.5095V42.5L19.3067 42.4621V33.9474C20.0567 33.9474 20.7616 33.9775 21.4049 34.4267C21.8946 34.8785 22.2838 35.4335 22.546 36.054L25.9202 42.4621H33C31.5957 39.6675 30.4706 36.1327 28.0552 34.0104C27.5455 33.6749 26.9919 33.4158 26.411 33.241C27.1873 33.0779 27.9357 32.7973 28.6319 32.4084C30.3855 31.3375 31.3915 29.3808 31.3436 27.3374C31.3798 26.1328 31.0495 24.9466 30.3988 23.9441C28.9256 21.6883 25.9337 21.4213 23.4663 21.5095H13ZM21.9939 30.0116H19.3313V25.6975H22.1043C23.4807 25.5594 25.1814 26.1754 25.0859 27.8041C25.1499 29.5621 23.3647 29.9127 21.9939 30.0116Z"
              fill="#FFB749"
            />
            <path
              d="M39.4768 35.089L33 35.4666C33.1262 37.3671 34.0021 39.16 35.4636 40.5088C36.9117 41.8323 39.5076 42.4941 43.2515 42.4941C46.3564 42.5823 49.9058 41.8146 51.821 39.1569C52.5929 38.0934 53.0033 36.8427 52.9998 35.564C53.0217 33.1848 51.4339 31.2297 49.3044 30.3147C47.2632 29.4766 45.1198 28.8674 42.9204 28.5C42.1107 28.41 41.3327 28.1563 40.6423 27.757C39.9039 27.2597 40.078 26.2272 40.735 25.7596C42.6084 24.5207 45.6299 25.5545 45.8608 27.9032L52.2845 27.5621C52.1703 25.768 51.1844 24.0545 49.6356 22.9583C47.6987 21.8887 45.4532 21.3874 43.1986 21.5212C41.3493 21.4527 39.5037 21.7218 37.7682 22.3128C35.6082 23.1125 33.829 25.064 33.8344 27.4525C33.7931 28.9377 34.5158 30.4088 35.755 31.3621C37.6454 32.6238 39.8325 33.4582 42.139 33.798C43.3833 33.9637 44.5727 34.3795 45.6224 35.0159C46.5878 35.7309 46.5807 37.167 45.5959 37.8903C44.5078 38.6532 42.9034 38.7416 41.6818 38.2468C40.3717 37.716 39.6048 36.4784 39.4768 35.089Z"
              fill="#FFB749"
            />
          </g>
          <defs>
            <clipPath id="clip0_5701_38384">
              <rect width="64" height="64" fill="white" />
            </clipPath>
          </defs>
        </svg>
        <Link href='https://rs.school/courses/reactjs' target='_blank' className='hover:text-cyan-600 transition-all duration-300'>©2024 The Rolling Scopes (React 2024Q3)</Link>
      </div>
    </footer>
  );
}
