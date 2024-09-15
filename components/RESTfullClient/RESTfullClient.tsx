'use client';

import React, { useState, useEffect } from 'react';
import base64 from 'base-64';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/firebase/firebase';
import Loader from '../Loader';
import ResponseSecion from '../ResponseSection/ResponseSection';
import HeadersEditor from '../HeadersEditor/HeadersEditor';
import VariablesEditor from '../VariablesEditor/VariablesEditor';
import UrlInput from '../UrlInput/UrlInput';
import { updateUrl } from '@/utils/updateUrl';
import RequestEditor from '../RequestEditor/RequestEditor';
import { replaceVariablesInRequestBody } from '@/utils/replaceVaribles';
import { useTranslations } from 'next-intl';

type Params = {
  method: string;
  encodedUrl?: string;
  encodedBody?: string;
  locale: string;
};

export default function RESTfullClient({ params }: { params: Params }) {
  const [method, setMethod] = useState<string>(params.method || 'GET');
  const [url, setUrl] = useState<string>('');
  const [requestBody, setRequestBody] = useState<string>('');
  const locale = params.locale;
  const [headers, setHeaders] = useState<[string, string][]>([]);
  const [variables, setVariables] = useState<[string, string][]>([]);
  const [responseBody, setResponseBody] = useState<object | null>(null);
  const [httpCode, setHttpCode] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const router = useRouter();

  const [authState, setAuthState] = useState<User | null>(null);
  const [loadingState, setLoadingState] = useState(true);
  const t = useTranslations('Rest');

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

    if (params.encodedBody) {
      try {
        const decodedBody = base64.decode(params.encodedBody);
        setRequestBody(decodedBody);
      } catch (error) {
        console.error('Failed to decode body:', error);
      }
    }
  }, [params.encodedUrl, params.encodedBody]);

  const handleMethodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newMethod = e.target.value;
    setMethod(newMethod);
    setUrl('');
    setRequestBody('');
    setHeaders([]);
    setResponseBody(null);
    setHttpCode(null);
    updateUrl(locale, newMethod, '', [], '');
  };

  const handleSubmit = async () => {
    try {
      setResponseBody(null);
      setErrorMessage('');
      const processedBody = replaceVariablesInRequestBody(
        requestBody,
        variables
      );

      const [baseUrl, queryParams] = url.split('/?');

      let encodedUrl;

      if (queryParams) {
        encodedUrl = base64.encode(`${baseUrl}?${queryParams}`);
      } else {
        encodedUrl = base64.encode(baseUrl);
      }
      const encodedBody = method !== 'GET' ? base64.encode(processedBody) : '';
      const queryParamsHeader = headers
        .map(
          ([key, value]) =>
            `${encodeURIComponent(key)}=${encodeURIComponent(base64.encode(value))}`
        )
        .join('&');

      const apiUrl = `/${locale}/${method}/${encodedUrl}${encodedBody ? `/${encodedBody}` : ''}${queryParamsHeader ? `?${queryParamsHeader}` : ''}`;
      window.history.replaceState(null, '', apiUrl);

      const response = await fetch(apiUrl, {
        method: method,
      });

      setHttpCode(response.status);

      const data = await response.json();
      localStorage.setItem('lastRequest', apiUrl);
      setResponseBody(data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMessage(error.message || t('unknownERR'));
      } else {
        setErrorMessage(t('unknownERR'));
      }
    }
  };

  return (
    <>
      {loadingState ? (
        <Loader />
      ) : (
        <div className="container mx-auto p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg mt-[150px]">
          <div className="flex space-x-4">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {t('method')}
              </label>
              <select
                value={method}
                onChange={handleMethodChange}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              >
                <option value="GET">GET</option>
                <option value="POST">POST</option>
                <option value="PATCH">PATCH</option>
                <option value="DELETE">DELETE</option>
                <option value="PUT">PUT</option>
                <option value="HEAD">HEAD</option>
                <option value="OPTIONS">OPTIONS</option>
              </select>
            </div>

            <UrlInput
              method={method}
              url={url}
              headers={headers}
              requestBody={requestBody}
              locale={locale}
              setUrl={setUrl}
            />
          </div>

          <HeadersEditor
            headers={headers}
            setHeaders={setHeaders}
            method={method}
            url={url}
            locale={locale}
            requestBody={requestBody}
          />

          {method !== 'GET' && (
            <VariablesEditor
              variables={variables}
              setVariables={setVariables}
            />
          )}

          {method !== 'GET' && (
            <RequestEditor
              method={method}
              url={url}
              headers={headers}
              locale={locale}
              requestBody={requestBody}
              setRequestBody={setRequestBody}
            />
          )}

          <button
            onClick={handleSubmit}
            className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded"
          >
            {t('sendReq')}
          </button>

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
