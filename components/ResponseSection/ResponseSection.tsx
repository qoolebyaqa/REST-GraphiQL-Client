import { useTranslations } from 'next-intl';
import { FC } from 'react';

interface ResponseProps {
  httpCode: number | null;
  errorMessage: string;
  responseBody: object | null;
}

const ResponseSecion: FC<ResponseProps> = ({
  httpCode,
  errorMessage,
  responseBody,
}) => {
  const t = useTranslations('Rest');
  return (
    <>
      {httpCode && (
        <div className="mt-4">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            {t('resCode')} {httpCode}
          </h3>
        </div>
      )}

      {errorMessage && (
        <div className="mt-4">
          <p className="text-sm font-medium text-red-500 dark:text-red-400">
            {t('errCode')} {errorMessage}
          </p>
        </div>
      )}

      {responseBody && (
        <div className="mt-4">
          <pre
            data-testid="response"
            className="mt-2 bg-gray-100 dark:bg-gray-700 p-4 rounded text-gray-900 dark:text-gray-100 overflow-scroll max-h-96"
          >
            {JSON.stringify(responseBody, null, 4)}
          </pre>
        </div>
      )}
    </>
  );
};

export default ResponseSecion;
