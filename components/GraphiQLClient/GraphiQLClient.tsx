import React, { useState, useEffect } from 'react';
import { buildClientSchema, getIntrospectionQuery } from 'graphql';
import base64 from 'base-64';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/firebase/firebase';
import Loader from '../Loader';
import ResponseSecion from '../ResponseSection/ResponseSection';
import HeadersEditor from '../HeadersEditor/HeadersEditor';
import VariablesEditor from '../VariablesEditor/VariablesEditor';
import RequestEditor from '../RequestEditor/RequestEditor';
import UrlInput from '../UrlInput/UrlInput';
import { useLocale, useTranslations } from 'next-intl';

type Params = {
  method: string;
  encodedUrl?: string;
  encodedBody?: string;
};

export default function GraphiQLClient({ params }: { params: Params }) {
  const [url, setUrl] = useState<string>('');
  const [sdlUrl, setSdlUrl] = useState<string>('');
  const [requestBody, setRequestBody] = useState<string>('');
  const [variables, setVariables] = useState<[string, string][]>([]);
  const [headers, setHeaders] = useState<[string, string][]>([
    ['Content-Type', 'application/json'],
  ]);
  const [responseBody, setResponseBody] = useState<object | null>(null);
  const [httpCode, setHttpCode] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [schema, setSchema] = useState<object | null>(null);

  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations('Rest')
  const [authState, setAuthState] = useState<User | null>(null);
  const [loadingState, setLoadingState] = useState(true);

  async function checkUser() {
    setLoadingState(true);
    onAuthStateChanged(auth, (data: User | null) => {
      setAuthState(data);
      if (!data) {
        router.push('/');
      }
    });
    setLoadingState(false);
  }

  useEffect(() => {
    checkUser();
    if (params.encodedUrl) {
      try {
        const decodedUrl = base64.decode(params.encodedUrl);
        setUrl(decodedUrl);
      } catch (error) {
        console.error('Failed to decode URL:', error);
      }
    }
  }, [params.encodedUrl]);

  const handleSdlUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSdlUrl(e.target.value);
  };

  const fetchShema = async () => {
    try {
      const introspectionQuery = getIntrospectionQuery();

      const response = await fetch(sdlUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: introspectionQuery,
        }),
      });

      const data = await response.json();

      if (data.data) {
        const clientSchema = buildClientSchema(data.data);
        setSchema(clientSchema);
      } else {
        setErrorMessage(t('fail'));
      }
    } catch (error) {
      console.error('Failed to fetch schema:', error);
      setErrorMessage(t('fetchingERR'));
    }
  };

  const replaceVariablesInRequestBody = (
    body: string,
    variables: [string, string][]
  ) => {
    let processedBody = body;

    variables.forEach(([key, value]) => {
      const regex = new RegExp(`{{${key}}}`, 'g');
      processedBody = processedBody.replace(regex, value);
    });

    return processedBody;
  };

  const handleSubmit = async () => {
    try {
      setResponseBody(null);
      setErrorMessage('');

      const processedBody = replaceVariablesInRequestBody(
        requestBody,
        variables
      );

      const encodedUrl = base64.encode(url);
      const encodedBody = base64.encode(processedBody);
      const queryParams = headers
        .map(
          ([key, value]) =>
            `${encodeURIComponent(key)}=${encodeURIComponent(base64.encode(value))}`
        )
        .join('&');

      const apiUrl = `/${locale}/GRAPHQL/${encodedUrl}${encodedBody ? `/${encodedBody}` : ''}${queryParams ? `?${queryParams}` : ''}`;
      window.history.replaceState(null, '', apiUrl);

      console.log('API URL:', apiUrl);

      const response = await fetch(apiUrl, {
        method: 'POST',
      });

      setHttpCode(response.status);
      const data = await response.json();
      setResponseBody(data);
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('An unknown error occurred');
    }
  };

  return (
    <>
      {loadingState ? (
        <Loader />
      ) : (
        <div className="container mx-auto p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          <div className="flex flex-row justify-around space-x-4">
            <div className="min-w-96">
              <UrlInput
                method={'POST'}
                url={url}
                setUrl={setUrl}
                setSdlUrl={setSdlUrl}
              />

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  SDL URL:
                </label>
                <input
                  type="text"
                  value={sdlUrl}
                  onChange={handleSdlUrlChange}
                  placeholder={t('SDLph')}
                  className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 p-2"
                />
              </div>

              <button
                className="mb-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded"
                onClick={fetchShema}
              >
                {t('fetchSchema')}
              </button>

              <HeadersEditor
                headers={headers}
                setHeaders={setHeaders}
                method={'POST'}
                url={url}
                requestBody={requestBody}
              />

              <VariablesEditor
                variables={variables}
                setVariables={setVariables}
              />

              <RequestEditor
                method={'POST'}
                url={url}
                headers={headers}
                requestBody={requestBody}
                setRequestBody={setRequestBody}
                isGraphQL={true}
              />

              <button
                onClick={handleSubmit}
                className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded"
              >
                {t('sendReq')}
              </button>
            </div>

            {schema && (
              <div className="mt-8 max-w-[50%]">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                  {t('shemaG')}
                </h2>
                <pre className="mt-2 bg-gray-100 dark:bg-gray-700 p-4 rounded text-gray-900 dark:text-gray-100 overflow-scroll">
                  {JSON.stringify(schema, null, 4)}
                </pre>
              </div>
            )}
          </div>

          <ResponseSecion
            httpCode={httpCode}
            errorMessage={errorMessage}
            responseBody={responseBody}
          />
        </div>
      )}
    </>
  );
}
