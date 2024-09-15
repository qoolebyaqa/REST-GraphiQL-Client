import { render, screen } from '@testing-library/react';
import { useParams, notFound } from 'next/navigation';
import RESTfullPage from '@/app/[locale]/[method]/page';
import GraphiQLClient from '@/components/GraphiQLClient/GraphiQLClient';
import RESTfullClient from '@/components/RESTfullClient/RESTfullClient';

jest.mock('next/navigation', () => ({
  useParams: jest.fn(),
  notFound: jest.fn(),
}));

jest.mock('../components/GraphiQLClient/GraphiQLClient', () => ({
  __esModule: true,
  default: jest.fn(() => <div>GraphiQLClient Component</div>),
}));

jest.mock('../components/RESTfullClient/RESTfullClient', () => ({
  __esModule: true,
  default: jest.fn(() => <div>RESTfullClient Component</div>),
}));

describe('RESTfullPage Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders GraphiQLClient for GRAPHQL method', () => {
    (useParams as jest.Mock).mockReturnValue({
      locale: 'en',
      method: 'GRAPHQL',
      encodedUrl: 'encoded-url',
      encodedBody: 'encoded-body',
    });

    render(<RESTfullPage />);

    expect(screen.getByText('GraphiQLClient Component')).toBeInTheDocument();
    expect(GraphiQLClient).toHaveBeenCalledWith(
      {
        params: {
          method: 'GRAPHQL',
          encodedUrl: 'encoded-url',
          encodedBody: 'encoded-body',
          locale: 'en',
        },
      },
      {}
    );
  });

  test('renders RESTfullClient for GET method', () => {
    (useParams as jest.Mock).mockReturnValue({
      locale: 'en',
      method: 'GET',
      encodedUrl: 'encoded-url',
      encodedBody: 'encoded-body',
    });

    render(<RESTfullPage />);

    expect(screen.getByText('RESTfullClient Component')).toBeInTheDocument();
    expect(RESTfullClient).toHaveBeenCalledWith(
      {
        params: {
          method: 'GET',
          encodedUrl: 'encoded-url',
          encodedBody: 'encoded-body',
          locale: 'en',
        },
      },
      {}
    );
  });

  test('calls notFound for invalid method', () => {
    (useParams as jest.Mock).mockReturnValue({
      locale: 'en',
      method: 'INVALID_METHOD',
      encodedUrl: 'encoded-url',
      encodedBody: 'encoded-body',
    });

    render(<RESTfullPage />);

    expect(notFound).toHaveBeenCalled();
  });
});
