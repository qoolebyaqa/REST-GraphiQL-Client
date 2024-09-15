import { render, screen } from '@testing-library/react';
import ResponseSection from '../components/ResponseSection/ResponseSection';
import { useTranslations } from 'next-intl';
import '@testing-library/jest-dom';

jest.mock('next-intl', () => ({
  useTranslations: jest.fn(),
}));

describe('ResponseSection', () => {
  const tMock = jest.fn((key) => key);

  beforeEach(() => {
    (useTranslations as jest.Mock).mockReturnValue(tMock);
    jest.clearAllMocks();
  });

  test('renders httpCode when it is provided', () => {
    const httpCode = 200;
    render(
      <ResponseSection
        httpCode={httpCode}
        errorMessage=""
        responseBody={null}
      />
    );

    expect(screen.getByText(`resCode ${httpCode}`)).toBeInTheDocument();
  });

  test('renders errorMessage when it is provided', () => {
    const errorMessage = 'Something went wrong';
    render(
      <ResponseSection
        httpCode={null}
        errorMessage={errorMessage}
        responseBody={null}
      />
    );

    expect(screen.getByText(`errCode ${errorMessage}`)).toBeInTheDocument();
  });

  test('renders responseBody when it is provided', () => {
    const responseBody = { name: 'value' };
    render(
      <ResponseSection
        httpCode={null}
        errorMessage=""
        responseBody={responseBody}
      />
    );

    const preElement = screen.getByTestId('response');
    expect(preElement).toBeInTheDocument();

    expect(preElement).toHaveTextContent('value');
  });

  test('does not render httpCode, errorMessage or responseBody when they are not provided', () => {
    render(
      <ResponseSection httpCode={null} errorMessage="" responseBody={null} />
    );

    expect(screen.queryByText('resCode')).not.toBeInTheDocument();
    expect(screen.queryByText('errCode')).not.toBeInTheDocument();
    expect(screen.queryByText('{}')).not.toBeInTheDocument();
  });
});
