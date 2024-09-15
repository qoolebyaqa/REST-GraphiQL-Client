import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import VariablesEditor from '../components/VariablesEditor/VariablesEditor';

jest.mock('next-intl', () => ({
  useTranslations: jest.fn(() => (key: string) => key),
}));

describe('VariablesEditor', () => {
  let variables: [string, string][];
  let setVariables: jest.Mock;

  beforeEach(() => {
    variables = [];
    setVariables = jest.fn((newVars) => (variables = newVars));
  });

  test('renders variable input fields and add button', () => {
    render(
      <VariablesEditor variables={variables} setVariables={setVariables} />
    );

    expect(screen.getByLabelText('key')).toBeInTheDocument();
    expect(screen.getByLabelText('value')).toBeInTheDocument();
    expect(screen.getByText('addVar')).toBeInTheDocument();
  });

  test('allows user to hide and show variables', () => {
    render(
      <VariablesEditor variables={variables} setVariables={setVariables} />
    );

    fireEvent.click(screen.getByText('hide'));

    expect(screen.queryByLabelText('key')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('value')).not.toBeInTheDocument();

    fireEvent.click(screen.getByText('show'));

    expect(screen.getByLabelText('key')).toBeInTheDocument();
    expect(screen.getByLabelText('value')).toBeInTheDocument();
  });
});
