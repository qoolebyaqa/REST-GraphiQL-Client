import { updateUrl } from '@/utils/updateUrl';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

type HeadersEditorProps = {
  headers: [string, string][];
  setHeaders: (headers: [string, string][]) => void;
  method: string;
  url: string;
  requestBody: string;
  locale: string;
  isGraphQL?: boolean;
};

const HeadersEditor = ({
  headers,
  setHeaders,
  method,
  url,
  requestBody,
  locale,
  isGraphQL,
}: HeadersEditorProps) => {
  const [headerKey, setHeaderKey] = useState('');
  const [headerValue, setHeaderValue] = useState('');
  const [hiddenHeaders, setHiddenHeaders] = useState(false);

  const t = useTranslations('Rest');

  const handleChangeHeaderKey = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHeaderKey(e.target.value);
  };

  const handleChangeHeaderValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHeaderValue(e.target.value);
  };

  const addHeaders = (key: string, value: string) => {
    if (key && value) {
      const newHeaders: [string, string][] = [...headers, [key, value]];
      setHeaders(newHeaders);
      updateUrl(locale, method, url, newHeaders, requestBody);
    }
    setHeaderKey('');
    setHeaderValue('');
  };

  const clearHeaders = () => {
    setHeaders(isGraphQL ? [['Content-Type', 'application/json']] : []);
    updateUrl(locale, method, url, [], requestBody);
  };

  const toggleHeadersVisibility = () => {
    setHiddenHeaders(!hiddenHeaders);
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {t('headers')}
      </label>
      <div className="flex flex-row space-x-4">
        {!hiddenHeaders && (
          <div>
            <div className="header-inputs flex space-x-4">
              <label
                htmlFor="header-key"
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                {t('key')}
              </label>
              <input
                type="text"
                name="header-key"
                id="header-key"
                value={headerKey}
                onChange={handleChangeHeaderKey}
                className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 p-2"
              />
              <label
                htmlFor="header-value"
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                {t('value')}
              </label>
              <input
                type="text"
                name="header-value"
                id="header-value"
                value={headerValue}
                onChange={handleChangeHeaderValue}
                className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 p-2"
              />
            </div>

            <button
              onClick={() => addHeaders(headerKey, headerValue)}
              className="mt-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded"
            >
              {t('addHeader')}
            </button>

            <button
              onClick={clearHeaders}
              className="mt-2 ml-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
            >
              {t('clearHeaders')}
            </button>

            <ul className="mt-2 list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
              {headers.map(([key, value], index) => (
                <li key={index}>{`${key}: ${value}`}</li>
              ))}
            </ul>
          </div>
        )}

        <button
          onClick={toggleHeadersVisibility}
          className="mb-4 ml-2 max-h-11 w-24 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
        >
          {hiddenHeaders ? t('show') : t('hide')}
        </button>
      </div>
    </div>
  );
};

export default HeadersEditor;
