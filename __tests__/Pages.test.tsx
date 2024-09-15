import MethodLayout from "@/app/[locale]/[method]/layout";
import RootLayout from "@/app/[locale]/auth/layout";
import Auth from "@/app/[locale]/auth/page";
import SignIn from "@/app/[locale]/auth/signin/page";
import NotFound from "@/app/[locale]/not-found";
import Home from "@/app/[locale]/page";
import { render, screen } from "@testing-library/react";

jest.mock('next-intl', () => ({
  useLocale: () => () => 'en',
  useTranslations: jest.fn().mockReturnValue((key: string) => key),
  Link: jest.fn(({ href, className, children }) => (
    <a href={href} className={className}>
      {children}
    </a>
  ))
}));
jest.mock('@/navigation');

describe('Home page', () => {
  beforeEach(() => {
    render(<Home />);
  });

  it('should render Home Page', () => {
    expect(screen.getByText('Petr')).toBeInTheDocument();
    expect(screen.getByText('Artur')).toBeInTheDocument();
    expect(screen.getByText('Dmitry')).toBeInTheDocument();
  });

  it('should render SVG ekg', () => {
    const svgElement = screen.getByTestId('svgEKG')
    expect(svgElement).toBeInTheDocument();
    expect(svgElement).toHaveAttribute('viewBox', '-466.4 259.6 280.2 47.3');
  });
});


describe('Auth Page', () => {
  beforeEach(() => {
    render(<Auth />);
  });

  it('should render Auth Page', () => {
    expect(screen.getByText('welcome')).toBeInTheDocument();
  });
});

describe('Auth Page', () => {
  beforeEach(() => {
    render(<Auth />);
  });

  it('should render Auth Page', () => {
    expect(screen.getByText('welcome')).toBeInTheDocument();
  });
});

describe('Sign in Page', () => {
  beforeEach(() => {
    render(<SignIn />);
  });

  it('should render Sign In Page', () => {
    expect(screen.getByText('welcome')).toBeInTheDocument();
  });
});

describe('Not found page', () => {
  beforeEach(() => {
    render(<NotFound />);
  });

  it('should render Error Page', () => {
    expect(screen.getByText('title')).toBeInTheDocument();
    expect(screen.getByText('message')).toBeInTheDocument();
  });
});

describe('Root Layout', () => {
  beforeEach(() => {
    render(<RootLayout><p>Children</p></RootLayout>);
  });

  it('should render Root Layout', () => {
    expect(screen.getByText('RU')).toBeInTheDocument();
    expect(screen.getByText('RU')).toBeInTheDocument();
    expect(screen.getByText('Платформа - Rest-Graphiql-Client')).toBeInTheDocument();
  });
});

describe('Method Layout', () => {
  beforeEach(() => {
    render(<MethodLayout><p>Children</p></MethodLayout>);
  });

  it('should render Method Layout', () => {
    expect(screen.getByText('RU')).toBeInTheDocument();
    expect(screen.getByText('RU')).toBeInTheDocument();
    expect(screen.getByText('Платформа - Rest-Graphiql-Client')).toBeInTheDocument();
  });
});