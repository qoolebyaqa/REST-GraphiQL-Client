import base64 from 'base-64';

export const updateUrl = (
  locale: string,
  newMethod: string,
  newUrl: string,
  newHeaders: [string, string][],
  newRequestBody: string
) => {
  const encodedUrl = newUrl ? base64.encode(newUrl) : '';
  const encodedBody =
    newMethod && newMethod !== 'GET' ? base64.encode(newRequestBody || '') : '';

  const queryParams = newHeaders
    .filter(([key, value]) => key && value)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(base64.encode(value))}`
    )
    .join('&');

  let newApiUrl = `/${locale}/${newMethod}/${encodedUrl}`;

  if (encodedBody) {
    newApiUrl += `/${encodedBody}`;
  }

  if (queryParams) {
    newApiUrl += `?${queryParams}`;
  }

  window.history.replaceState(null, '', newApiUrl);
};
