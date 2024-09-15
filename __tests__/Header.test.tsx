import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '@/components/Header';

jest.mock('next-intl', () => ({
  useLocale: () => () => 'en',
}));

describe('Header', () => {
  beforeEach(() => {
    render(<Header />);
  });

  it('should render Header', () => {
    expect(screen.getByText('Платформа - Rest-Graphiql-Client')).toBeInTheDocument();
  });

  it('should render SVG icon', () => {
    const svgElement = screen.getByTestId('svgEKG');
    expect(svgElement).toBeInTheDocument();
    expect(svgElement).toHaveAttribute('viewBox', '-466.4 259.6 280.2 47.3');
  });
});
