import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import RESTfullClient from '../components/RESTfullClient/RESTfullClient';
import { updateUrl } from '../utils/updateUrl';

jest.mock('../utils/updateUrl');
jest.mock('../utils/replaceVaribles');
jest.mock('firebase/auth', () => ({
  onAuthStateChanged: jest.fn(),
  getAuth: jest.fn(() => ({
    currentUser: null,
  })),
}));

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe('RESTfullClient', () => {
  const defaultParams = {
    method: 'GET',
    locale: 'en',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('fetches data and displays response correctly', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        status: 200,
        json: () => Promise.resolve({ key: 'value' }),
      })
    ) as jest.Mock;

    render(<RESTfullClient params={defaultParams} />);

    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });

    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByText('sendReq')).toBeInTheDocument();
  });

  test('handles method change correctly', () => {
    render(<RESTfullClient params={defaultParams} />);

    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: 'POST' },
    });

    expect(updateUrl).toHaveBeenCalledWith('en', 'POST', '', [], '');
  });

  test('decodes encoded URL', () => {
    const encodedUrl = btoa('http://example.com');
    const encodedBody = btoa('{"key": "value"}');

    render(
      <RESTfullClient params={{ ...defaultParams, encodedUrl, encodedBody }} />
    );

    expect(screen.getByTestId('url-input')).toHaveValue('http://example.com');
  });

  test('handles submit and updates URL correctly', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        status: 200,
        json: () => Promise.resolve({ key: 'value' }),
      })
    ) as jest.Mock;

    render(<RESTfullClient params={defaultParams} />);

    fireEvent.click(screen.getByText('sendReq'));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/en/GET/', { method: 'GET' });
      expect(screen.getByText('value')).toBeInTheDocument();
    });
  });

  test('shows error message on fetch failure', async () => {
    global.fetch = jest.fn(() =>
      Promise.reject(new Error('Fetch error'))
    ) as jest.Mock;

    render(<RESTfullClient params={defaultParams} />);

    fireEvent.click(screen.getByText('sendReq'));

    await waitFor(() => {
      expect(
        screen.getByText((content) => content.includes('Fetch error'))
      ).toBeInTheDocument();
    });
  });
});
