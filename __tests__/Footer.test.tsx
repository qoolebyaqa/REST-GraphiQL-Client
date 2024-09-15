import { render, screen } from '@testing-library/react';
import Footer from '@/components/Footer/Footer';
import '@testing-library/jest-dom';

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

describe('Footer', () => {
  beforeEach(() => {
    render(<Footer />);
  });

  it('should render FooterItem components with correct props', () => {
    expect(screen.getByText('Artur')).toBeInTheDocument();
    expect(screen.getByText('Petr')).toBeInTheDocument();
    expect(screen.getByText('Dmitry')).toBeInTheDocument();
  });

  it('should render SVG icon', () => {
    const svgElement = screen.getByTestId('footer-svg');
    expect(svgElement).toBeInTheDocument();
    expect(svgElement).toHaveAttribute('viewBox', '0 0 64 64');
  });

  it('should render footer link with correct attributes', () => {
    const footerLink = screen.getByText(
      '©2024 The Rolling Scopes (React 2024Q3)'
    );
    expect(footerLink).toBeInTheDocument();
    expect(footerLink).toHaveAttribute(
      'href',
      'https://rs.school/courses/reactjs'
    );
    expect(footerLink).toHaveAttribute('target', '_blank');
  });
});
