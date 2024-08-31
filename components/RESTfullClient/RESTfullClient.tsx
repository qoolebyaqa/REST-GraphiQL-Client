'use client';

import React, { useState, useEffect } from 'react';
import base64 from 'base-64';
import { useRouter } from 'next/navigation';

type Params = {
  method: string;
  encodedUrl?: string;
  encodedBody?: string;
};

export default function RESTfullClient({ params }: { params: Params }) {
  const [method, setMethod] = useState<string>(params.method);
  const [url, setUrl] = useState<string>('');
  const [requestBody, setRequestBody] = useState<string>('');
  const [headers, setHeaders] = useState<[string, string][]>([]);
  const [variableKey, setVariableKey] = useState('');
  const [variableValue, setVariableValue] = useState('');
  const [headerKey, setHeaderKey] = useState('');
  const [headerValue, setHeaderValue] = useState('');
  const [variables, setVariables] = useState<[string, string][]>([]);
  const [responseBody, setResponseBody] = useState<object | null>(null);
  const [httpCode, setHttpCode] = useState<number | null>(null);
  const [hiddenVariables, setHiddenVariables] = useState(false);
  const router = useRouter();

  useEffect(() => {
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
    router.push(`/${newMethod}`);
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  const handleBodyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setRequestBody(e.target.value);
  };

  const prettifyJson = () => {
    try {
      const parsed = JSON.parse(requestBody);
      setRequestBody(JSON.stringify(parsed, null, 4));
    } catch (e) {
      alert('Invalid JSON');
    }
  };

  const handleChangeVariableKey = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVariableKey(e.target.value);
  };

  const handleChangeVariableValue = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setVariableValue(e.target.value);
  };

  const handleChangeHeaderKey = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHeaderKey(e.target.value);
  };

  const handleChangeHeaderValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHeaderValue(e.target.value);
  };

  const addVariables = (key: string, value: string) => {
    if (key && value) {
      setVariables([...variables, [key, value]]);
    }
    setVariableKey('');
    setVariableValue('');
  };

  const clearVariables = () => {
    setVariables([]);
  };

  const addHeaders = (key: string, value: string) => {
    if (key && value) {
      setHeaders([...headers, [key, value]]);
    }
    setHeaderKey('');
    setHeaderValue('');
  };

  const clearHeaders = () => {
    setHeaders([]);
  };

  const hideVariables = () => {
    setHiddenVariables(!hiddenVariables);
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
      const processedBody = replaceVariablesInRequestBody(
        requestBody,
        variables
      );

      const encodedUrl = base64.encode(url);
      const encodedBody = method !== 'GET' ? base64.encode(processedBody) : '';
      const queryParams = headers
        .map(
          ([key, value]) =>
            `${encodeURIComponent(key)}=${encodeURIComponent(base64.encode(value))}`
        )
        .join('&');

      const apiUrl = `/${method}/${encodedUrl}${encodedBody ? `/${encodedBody}` : ''}${queryParams ? `?${queryParams}` : ''}`;

      console.log(apiUrl);

      const response = await fetch(apiUrl, {
        method: method,
      });

      setHttpCode(response.status);

      const data = await response.json();
      setResponseBody(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container mx-auto p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <div className="flex space-x-4">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Method:
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

        <div className="mb-4 flex-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            URL:
          </label>
          <input
            type="text"
            value={url}
            onChange={handleUrlChange}
            placeholder="Enter your URL"
            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 p-2"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Headers:
        </label>
        <div className="header-inputs flex space-x-4">
          <label
            htmlFor="header-key"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 flex space-x-4"
          >
            Key:
            <input
              type="text"
              name="header-key"
              id="header-key"
              value={headerKey}
              onChange={handleChangeHeaderKey}
              className="mt-1 ml-2 block w-full shadow-sm sm:text-sm border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 p-2"
            />
          </label>
          <label
            htmlFor="header-value"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 flex space-x-4"
          >
            Value:
            <input
              type="text"
              name="header-value"
              id="header-value"
              value={headerValue}
              onChange={handleChangeHeaderValue}
              className="mt-1 ml-2 block w-full shadow-sm sm:text-sm border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 p-2"
            />
          </label>
        </div>

        <button
          onClick={() => addHeaders(headerKey, headerValue)}
          className="mt-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded"
        >
          Add Header
        </button>

        <button
          onClick={clearHeaders}
          className="mt-2 ml-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
        >
          Clear Headers
        </button>

        <ul className="mt-2 list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
          {headers.map(([key, value], index) => (
            <li key={index}>{`${key}: ${value}`}</li>
          ))}
        </ul>
      </div>

      {method !== 'GET' ? (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Variables:
          </label>
          <div className="variable-inputs flex space-x-4">
            <label
              htmlFor="variable-key"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 flex space-x-4"
            >
              Key:
              <input
                type="text"
                name="variable-key"
                id="variable-key"
                value={variableKey}
                onChange={handleChangeVariableKey}
                className="mt-1 ml-2 block w-full shadow-sm sm:text-sm border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 p-2"
              />
            </label>
            <label
              htmlFor="variable-value"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 flex space-x-4"
            >
              Value:
              <input
                type="text"
                name="variable-value"
                id="variable-value"
                value={variableValue}
                onChange={handleChangeVariableValue}
                className="mt-1 ml-2 block w-full shadow-sm sm:text-sm border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 p-2"
              />
            </label>
          </div>

          <button
            onClick={() => addVariables(variableKey, variableValue)}
            className="mt-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded"
          >
            Add Variable
          </button>

          <button
            onClick={clearVariables}
            className="mt-2 ml-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
          >
            Clear Variables
          </button>
          <button
            onClick={hideVariables}
            className="mt-2 ml-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
          >
            {hiddenVariables ? `Show` : `Hide`}
          </button>

          {!hiddenVariables && method !== 'GET' ? (
            <ul className="mt-2 list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
              {variables.map(([key, value], index) => (
                <li key={index}>{`${key}: ${value}`}</li>
              ))}
            </ul>
          ) : (
            <></>
          )}
        </div>
      ) : null}

      {method !== 'GET' && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Request Body:
          </label>
          <textarea
            value={requestBody}
            onChange={handleBodyChange}
            placeholder="Enter request body (JSON format)"
            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 p-3"
            rows={10}
          ></textarea>
          <button
            onClick={prettifyJson}
            className="mt-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded"
          >
            Prettify JSON
          </button>
        </div>
      )}

      <button
        onClick={handleSubmit}
        className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded"
      >
        Send Request
      </button>

      {httpCode && (
        <div className="mt-4">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            Response Code: {httpCode}
          </h3>
        </div>
      )}

      {responseBody && (
        <div className="mt-4">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            Response Body:
          </h3>
          <pre className="mt-2 bg-gray-100 dark:bg-gray-700 p-4 rounded text-gray-900 dark:text-gray-100 overflow-scroll">
            {JSON.stringify(responseBody, null, 4)}
          </pre>
        </div>
      )}
    </div>
  );
}
