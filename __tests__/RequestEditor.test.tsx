import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import RequestEditor from '../components/RequestEditor/RequestEditor';
import { updateUrl } from '../utils/updateUrl';
import * as prettier from 'prettier/standalone';

jest.mock('../utils/updateUrl', () => ({
  updateUrl: jest.fn(),
}));

jest.mock('next-intl', () => ({
  useTranslations: jest.fn(() => (key: string) => key),
}));

jest.mock('prettier/standalone', () => ({
  format: jest.fn().mockImplementation((text, { parser }) => {
    if (parser === 'graphql') {
      return Promise.resolve('formatted GraphQL query');
    }
    return Promise.resolve('formatted JSON');
  }),
}));

describe('RequestEditor', () => {
  const mockSetRequestBody = jest.fn();
  const defaultProps = {
    method: 'POST',
    url: 'http://example.com',
    headers: [],
    requestBody: '{"key": "value"}',
    locale: 'en',
    setRequestBody: mockSetRequestBody,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly with initial props', () => {
    render(<RequestEditor {...defaultProps} />);

    expect(screen.getByTestId('reqBody')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('bodyph(JSON). bodyvar')
    ).toBeInTheDocument();
  });

  test('updates requestBody on textarea change', () => {
    render(<RequestEditor {...defaultProps} />);

    const textarea = screen.getByPlaceholderText('bodyph(JSON). bodyvar');
    fireEvent.change(textarea, { target: { value: 'new body content' } });

    expect(mockSetRequestBody).toHaveBeenCalledWith('new body content');
  });

  test('formats GraphQL correctly when prettify button is clicked and isGraphQL is true', async () => {
    render(<RequestEditor {...defaultProps} isGraphQL={true} />);

    fireEvent.click(screen.getByText('prettify GraphQL'));

    await waitFor(() => {
      expect(mockSetRequestBody).toHaveBeenCalledWith(
        'formatted GraphQL query'
      );
    });
  });

  test('shows error message when prettify fails', async () => {
    (prettier.format as jest.Mock).mockRejectedValueOnce(
      new Error('Format error')
    );

    render(<RequestEditor {...defaultProps} isGraphQL={true} />);

    fireEvent.click(screen.getByText('prettify GraphQL'));

    await waitFor(() => {
      expect(screen.getByText('prettifyError GraphQL')).toBeInTheDocument();
    });
  });

  test('calls updateUrl on textarea blur', () => {
    render(<RequestEditor {...defaultProps} />);

    const textarea = screen.getByPlaceholderText('bodyph(JSON). bodyvar');
    fireEvent.blur(textarea, { target: { value: 'new body content on blur' } });

    expect(updateUrl).toHaveBeenCalledWith(
      defaultProps.locale,
      defaultProps.method,
      defaultProps.url,
      defaultProps.headers,
      'new body content on blur'
    );
  });
});
