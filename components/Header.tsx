import { useLocale } from 'next-intl';

function Header() {
  const locale = useLocale();
  return (
    <header className="flex gap-6 items-center bg-slate-300 text-zinc-900">
      <svg
        data-testid="svgEKG"
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="-466.4 259.6 280.2 47.3"
        enableBackground="new -466.4 259.6 280.2 47.3"
        xmlSpace="preserve"
        className="ekg__svg"
      >
        <polyline
          fill="none"
          stroke="#4289A3"
          className="ekg"
          strokeWidth="1"
          strokeLinecap="square"
          strokeMiterlimit="14"
          points="-705.4,281 
	-436,281 -435.3,280.6 -431.5,275.2 -426.9,281 -418.9,281 -423.9,281 -363.2,281 -355.2,269 -345.2,303 -335.2,263 -325.2,291 
	-319.2,281 -56.2,281 "
        />
      </svg>
      <h2 className="text-center text-2xl pr-6 pb-[35px]">
        {locale === 'en'
          ? 'Rest-Graphiql-Client playground'
          : 'Платформа - Rest-Graphiql-Client'}
      </h2>
    </header>
  );
}

export default Header;
