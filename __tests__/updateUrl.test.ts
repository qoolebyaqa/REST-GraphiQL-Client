import { updateUrl } from '@/utils/updateUrl';
import base64 from 'base-64';

jest.mock('base-64', () => ({
  encode: jest.fn((input) => `encoded_${input}`),
}));

describe('updateUrl', () => {
  beforeEach(() => {
    global.window.history.replaceState = jest.fn(); // Мокаем replaceState
  });

  afterEach(() => {
    jest.clearAllMocks(); // Очищаем моки после каждого теста
  });

  test('updates URL with encoded method, URL, and body', () => {
    const locale = 'en';
    const method = 'POST';
    const url = 'http://example.com';
    const headers: [string, string][] = [['Authorization', 'Bearer token']];
    const requestBody = 'body content';

    updateUrl(locale, method, url, headers, requestBody);

    expect(base64.encode).toHaveBeenCalledWith(url);
    expect(base64.encode).toHaveBeenCalledWith(requestBody);
    expect(base64.encode).toHaveBeenCalledWith('Bearer token');
    expect(global.window.history.replaceState).toHaveBeenCalledWith(
      null,
      '',
      '/en/POST/encoded_http://example.com/encoded_body content?Authorization=encoded_Bearer%20token'
    );
  });

  test('does not include body for GET method', () => {
    const locale = 'en';
    const method = 'GET';
    const url = 'http://example.com';
    const headers: [string, string][] = [['Authorization', 'Bearer token']];
    const requestBody = 'body content';

    updateUrl(locale, method, url, headers, requestBody);

    expect(base64.encode).toHaveBeenCalledWith(url);
    expect(base64.encode).toHaveBeenCalledWith('Bearer token');
    expect(global.window.history.replaceState).toHaveBeenCalledWith(
      null,
      '',
      '/en/GET/encoded_http://example.com?Authorization=encoded_Bearer%20token'
    );
    expect(base64.encode).not.toHaveBeenCalledWith(requestBody);
  });

  test('adds no headers or body if not provided', () => {
    const locale = 'en';
    const method = 'GET';
    const url = 'http://example.com';
    const headers: [string, string][] = [];
    const requestBody = '';

    updateUrl(locale, method, url, headers, requestBody);

    expect(base64.encode).toHaveBeenCalledWith(url);
    expect(global.window.history.replaceState).toHaveBeenCalledWith(
      null,
      '',
      '/en/GET/encoded_http://example.com'
    );
  });
});
