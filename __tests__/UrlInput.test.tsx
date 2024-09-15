import { render, screen, fireEvent } from '@testing-library/react';
import UrlInput from '../components/UrlInput/UrlInput';
import { updateUrl } from '../utils/updateUrl';
import '@testing-library/jest-dom';
import { NextIntlClientProvider } from 'next-intl';

jest.mock('../utils/updateUrl');

jest.mock('next-intl', () => ({
  useTranslations: jest.fn(() => (key: string) => key),
  NextIntlClientProvider: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

describe('UrlInput', () => {
  const mockSetUrl = jest.fn();
  const mockSetSdlUrl = jest.fn();

  const defaultProps = {
    method: 'POST',
    url: 'http://example.com',
    headers: [],
    requestBody: 'body content',
    locale: 'en',
    setUrl: mockSetUrl,
    setSdlUrl: undefined,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the input with the correct value', () => {
    render(
      <NextIntlClientProvider>
        <UrlInput {...defaultProps} />
      </NextIntlClientProvider>
    );

    const inputElement = screen.getByPlaceholderText('urlPH');
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveValue(defaultProps.url);
  });

  test('calls setUrl and updateUrl when input changes', () => {
    render(
      <NextIntlClientProvider>
        <UrlInput {...defaultProps} />
      </NextIntlClientProvider>
    );

    const inputElement = screen.getByPlaceholderText('urlPH');
    const newUrl = 'http://newurl.com';

    fireEvent.change(inputElement, { target: { value: newUrl } });

    expect(mockSetUrl).toHaveBeenCalledWith(newUrl);
    expect(updateUrl).toHaveBeenCalledWith(
      defaultProps.locale,
      defaultProps.method,
      newUrl,
      defaultProps.headers,
      defaultProps.requestBody
    );
  });

  test('sets GRAPHQL method and calls setSdlUrl if setSdlUrl is provided', () => {
    render(
      <NextIntlClientProvider>
        <UrlInput {...defaultProps} setSdlUrl={mockSetSdlUrl} />
      </NextIntlClientProvider>
    );

    const inputElement = screen.getByPlaceholderText('urlPH');
    const newUrl = 'http://graphql-url.com';

    fireEvent.change(inputElement, { target: { value: newUrl } });

    expect(mockSetUrl).toHaveBeenCalledWith(newUrl);
    expect(mockSetSdlUrl).toHaveBeenCalledWith(`${newUrl}?sdl`);
    expect(updateUrl).toHaveBeenCalledWith(
      defaultProps.locale,
      'GRAPHQL',
      newUrl,
      defaultProps.headers,
      defaultProps.requestBody
    );
  });
});
