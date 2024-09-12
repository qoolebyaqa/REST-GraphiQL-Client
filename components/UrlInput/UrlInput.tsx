import { useTranslations } from "next-intl";

interface UrlInputProps {
  method: string;
  url: string;
  setUrl: (url: string) => void;
  setSdlUrl?: (sdlUrl: string) => void;
}

const UrlInput = ({ method, url, setUrl, setSdlUrl }: UrlInputProps) => {
  const t = useTranslations('Rest')
  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUrl = e.target.value;
    setUrl(newUrl);
    if (method === 'POST' && setSdlUrl) {
      setSdlUrl(`${e.target.value}?sdl`);
    }
  };

  return (
    <div className="mb-4 flex-1">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        URL:
      </label>
      <input
        type="text"
        value={url}
        onChange={handleUrlChange}
        placeholder={t('urlPH')}
        className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 p-2"
      />
    </div>
  );
};

export default UrlInput;
