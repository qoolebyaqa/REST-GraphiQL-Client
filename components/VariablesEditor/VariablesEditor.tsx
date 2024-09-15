'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

type VariablesEditorProps = {
  variables: [string, string][];
  setVariables: (vaiables: [string, string][]) => void;
};

const VariablesEditor = ({ variables, setVariables }: VariablesEditorProps) => {
  const [variableKey, setVariableKey] = useState('');
  const [variableValue, setVariableValue] = useState('');
  const [hiddenVariables, setHiddenVariables] = useState(false);
  const t = useTranslations('Rest');
  const handleChangeVariableKey = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVariableKey(e.target.value);
  };

  const handleChangeVariableValue = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setVariableValue(e.target.value);
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

  const hideVariables = () => {
    setHiddenVariables(!hiddenVariables);
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {t('vars')}
      </label>
      <div className="flex flex-row space-x-4">
        {!hiddenVariables && (
          <div>
            <div className="variable-inputs flex space-x-4">
              <label
                htmlFor="variable-key"
                className="text-sm font-medium text-gray-700 dark:text-gray-300 flex space-x-4"
              >
                {t('key')}
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
                className="text-sm font-medium text-gray-700 dark:text-gray-300 flex space-x-4"
              >
                {t('value')}
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
              data-testid="add-variables"
              onClick={() => addVariables(variableKey, variableValue)}
              className="mt-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded"
            >
              {t('addVar')}
            </button>
            <button
              data-testid="clear-variables"
              onClick={clearVariables}
              className="mt-2 ml-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
            >
              {t('clearVar')}
            </button>

            <ul className="mt-2 list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
              {variables.map(([key, value], index) => (
                <li key={index}>{`${key}: ${value}`}</li>
              ))}
            </ul>
          </div>
        )}

        <button
          onClick={hideVariables}
          className="mb-4 ml-2 max-h-11 w-24 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
        >
          {hiddenVariables ? t('show') : t('hide')}
        </button>
      </div>
    </div>
  );
};

export default VariablesEditor;
