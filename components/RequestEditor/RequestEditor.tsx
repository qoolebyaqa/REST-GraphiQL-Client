import * as prettier from 'prettier/standalone';
import * as parserGraphql from 'prettier/parser-graphql';
import { updateUrl } from '@/utils/updateUrl';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

type RequestEditorProps = {
  method: string;
  url: string;
  headers: [string, string][];
  requestBody: string;
  locale: string;
  setRequestBody: (requestBody: string) => void;
  isGraphQL?: boolean;
};

const RequestEditor = ({
  method,
  url,
  headers,
  requestBody,
  locale,
  setRequestBody,
  isGraphQL = false,
}: RequestEditorProps) => {
  const [prettifyError, setPrettifyError] = useState(false);
  const t = useTranslations('Rest');
  const handleBodyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newRequestBody = e.target.value;
    setRequestBody(newRequestBody);
  };

  const focusOutEvent = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    const newRequestBody = e.target.value;
    updateUrl(locale, method, url, headers, newRequestBody);
  };

  const prettifyRequestBody = async () => {
    try {
      if (isGraphQL) {
        const formattedQuery = prettier.format(requestBody, {
          parser: 'graphql',
          plugins: [parserGraphql],
          tabWidth: 4,
        });
        setRequestBody(await formattedQuery);
      } else {
        const parsed = JSON.parse(requestBody);
        setRequestBody(JSON.stringify(parsed, null, 4));
      }
      setPrettifyError(false);
    } catch (e) {
      setPrettifyError(true);
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {t('reqBody')}
      </label>
      <textarea
        data-testid="reqBody"
        value={requestBody}
        onChange={handleBodyChange}
        onBlur={focusOutEvent}
        placeholder={`${t('bodyph')}${isGraphQL ? '(GraphQL)' : '(JSON)'}. ${t('bodyvar')}`}
        className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 p-3"
        rows={10}
      ></textarea>
      <div className="flex flex-row space-x-4">
        <button
          data-testid="prettify"
          onClick={prettifyRequestBody}
          className="mt-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded"
        >
          {t('prettify')} {isGraphQL ? 'GraphQL' : 'JSON'}
        </button>
        {prettifyError && (
          <div className="mt-2 p-4 bg-red-100 border-l-4 border-red-500 text-red-900 rounded-md">
            <p className="font-semibold">
              {t('prettifyError')} {isGraphQL ? 'GraphQL' : 'JSON'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestEditor;
