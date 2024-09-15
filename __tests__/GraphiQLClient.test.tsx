import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import GraphiQLClient from '@/components/GraphiQLClient/GraphiQLClient';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { useRouter } from 'next/navigation';

jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(),
  onAuthStateChanged: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('next-intl', () => ({
  useTranslations: jest.fn(() => (key: string) => key),
}));

describe('GraphiQLClient component', () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });

    (onAuthStateChanged as jest.Mock).mockImplementation((auth, callback) => {
      callback({ uid: 'user123' });
    });
  });

  test('redirects to home page if user is not authenticated', async () => {
    (onAuthStateChanged as jest.Mock).mockImplementation((auth, callback) => {
      callback(null);
    });

    render(<GraphiQLClient params={{ method: 'POST', locale: 'en' }} />);

    await waitFor(() => expect(mockPush).toHaveBeenCalledWith('/'));
  });

  test('renders main interface after user is authenticated', async () => {
    render(<GraphiQLClient params={{ method: 'POST', locale: 'en' }} />);

    await waitFor(() => {
      expect(screen.getByText('fetchSchema')).toBeInTheDocument();
      expect(screen.getByText('sendReq')).toBeInTheDocument();
    });
  });

  test('calls fetchShema on fetchSchema button click', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ data: {} }),
      })
    ) as jest.Mock;

    render(<GraphiQLClient params={{ method: 'POST', locale: 'en' }} />);

    const fetchSchemaButton = screen.getByText('fetchSchema');
    fireEvent.click(fetchSchemaButton);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
    });
  });

  test('handles submission of GraphQL request', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        status: 200,
        json: () => Promise.resolve({ data: { test: 'success' } }),
      })
    ) as jest.Mock;

    render(<GraphiQLClient params={{ method: 'POST', locale: 'en' }} />);

    const submitButton = screen.getByText('sendReq');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
      expect(screen.getByText(/200/)).toBeInTheDocument();
      expect(screen.getByText(/success/)).toBeInTheDocument();
    });
  });
});
