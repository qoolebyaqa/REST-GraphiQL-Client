import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import HeadersEditor from '../components/HeadersEditor/HeadersEditor';

jest.mock('next-intl', () => ({
  useTranslations: jest.fn(() => (key: string) => key),
}));

describe('HeadersEditor', () => {
  let headers: [string, string][];
  let setHeaders: jest.Mock;

  beforeEach(() => {
    headers = [];
    setHeaders = jest.fn((newHeader) => (headers = newHeader));
  });

  test('renders headers input fields and add button', () => {
    render(
      <HeadersEditor
        headers={headers}
        setHeaders={setHeaders}
        method={''}
        url={''}
        requestBody={''}
        locale={''}
      />
    );

    expect(screen.getByLabelText('key')).toBeInTheDocument();
    expect(screen.getByLabelText('value')).toBeInTheDocument();
    expect(screen.getByText('addHeader')).toBeInTheDocument();
  });

  test('allows user to hide and show variables', () => {
    render(
      <HeadersEditor
        headers={headers}
        setHeaders={setHeaders}
        method={''}
        url={''}
        requestBody={''}
        locale={''}
      />
    );

    fireEvent.click(screen.getByText('hide'));

    expect(screen.queryByLabelText('key')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('value')).not.toBeInTheDocument();

    fireEvent.click(screen.getByText('show'));

    expect(screen.getByLabelText('key')).toBeInTheDocument();
    expect(screen.getByLabelText('value')).toBeInTheDocument();
  });
});
