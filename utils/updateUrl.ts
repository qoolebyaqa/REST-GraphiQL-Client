import base64 from 'base-64';

export const updateUrl = (
  newMethod: string,
  newUrl: string,
  newHeaders: [string, string][],
  newRequestBody: string
) => {
  const encodedUrl = base64.encode(newUrl);
  const encodedBody = newMethod !== 'GET' ? base64.encode(newRequestBody) : '';
  const queryParams = newHeaders
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(base64.encode(value))}`
    )
    .join('&');

  const newApiUrl = `/${newMethod}/${encodedUrl}${encodedBody ? `/${encodedBody}` : ''}${queryParams ? `?${queryParams}` : ''}`;
  window.history.replaceState(null, '', newApiUrl);
};
