import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import SignIn from '@/components/Auth/SignIn';
import { NextIntlClientProvider } from 'next-intl';
import SignUp from '@/components/Auth/SignUp';
import ButtonLogout from '@/components/Auth/ButtonLogout';

const messages = {  
  "Auth": {
    "signUp": "Sign Up",
    "signIn": "Sign In",
    "welcome": "Welcome!",
    "loading": "Loading...",
    "LogInTitle": "Log in to Playground",
    "LoginHint": "Enter to your account",
    "NameLabel": "Username",
    "PassLabel": "Password",
    "GoToSignUp": "Need to Register?",
    "LoginSubmit": "Log in",
    "SignupTitle": "Sign up to Playground",
    "SignupHint": "Register your account",
    "GoToSignIn": "Already have account?",
    "SignupSubmit": "Sign Up",
    "Logout": "Log out",
    "gotoMain": "Main page"
  },
}

jest.mock('@/navigation', () => ({
  useRouter: jest.fn(),
  Link: ({ children }: { children: React.ReactNode }) => <div>{children}</div>, 
}));

jest.mock('@/utils/Schema', () => ({
  formSchema: {
    isValid: jest.fn(),
    validate: jest.fn(),
  },
}));

describe('SignIn Component', () => {
  const mockPush = jest.fn(); 

  beforeEach(() => {
    const useRouterMock = require('@/navigation').useRouter;
    useRouterMock.mockReturnValue({
      push: mockPush,
    });
    jest.clearAllMocks(); 
  });

  it('renders the sign-up form', () => {
    render(<NextIntlClientProvider locale="en" messages={messages}><SignIn />
      </NextIntlClientProvider>);
    
    expect(screen.getByText('NameLabel')).toBeInTheDocument();
    expect(screen.getByText('PassLabel')).toBeInTheDocument();
    expect(screen.getByText('GoToSignIn')).toBeInTheDocument();
    expect(screen.getByText('SignupSubmit')).toBeInTheDocument();
    expect(screen.getByText('SignupHint')).toBeInTheDocument();
  });

  it('updates input fields when typing', async () => {
    render(<NextIntlClientProvider locale="ru" messages={messages}><SignIn />
      </NextIntlClientProvider>);

    const nameInput = screen.getByTestId('signName') as HTMLInputElement;
    const passwordInput = screen.getByTestId('signPass') as HTMLInputElement;
    await act(async() =>{      
      fireEvent.change(nameInput, { target: { value: 'testuser' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
    })

    expect(nameInput.value).toBe('testuser');
    expect(passwordInput.value).toBe('password123');
  });

  it('validates form and displays validation errors', async () => {
    render(<NextIntlClientProvider locale="ru" messages={messages}><SignIn />
      </NextIntlClientProvider>);

    const nameInput = screen.getByTestId('signName') as HTMLInputElement;
    await act(async() =>{      
      fireEvent.change(nameInput, { target: { value: 'testuser' } });
    })

    expect(screen.getByText('SignupSubmit')).toBeDisabled()
  });

  it('going to login page', async () => {
    render(<NextIntlClientProvider locale="ru" messages={messages}><SignIn />
      </NextIntlClientProvider>);

    const goBtn = screen.getByText('GoToSignIn') as HTMLInputElement;
    await act(async() =>{      
      fireEvent.click(goBtn);
    })

    expect(window.location.href.includes('signin'));    
  });


});

describe('SignUp Component', () => {
  const mockPush = jest.fn(); 

  beforeEach(() => {
    const useRouterMock = require('@/navigation').useRouter;
    useRouterMock.mockReturnValue({
      push: mockPush,
    });
    jest.clearAllMocks(); 
  });

  it('renders the login form', () => {
    render(<NextIntlClientProvider locale="en" messages={messages}><SignUp />
      </NextIntlClientProvider>);
    
    expect(screen.getByText('NameLabel')).toBeInTheDocument();
    expect(screen.getByText('PassLabel')).toBeInTheDocument();
    expect(screen.getByText('GoToSignUp')).toBeInTheDocument();
    expect(screen.getByText('LoginSubmit')).toBeInTheDocument();
    expect(screen.getByText('LogInTitle')).toBeInTheDocument();
  });

  it('updates login input fields when typing', async () => {
    render(<NextIntlClientProvider locale="ru" messages={messages}><SignUp />
      </NextIntlClientProvider>);

    const nameInput = screen.getByTestId('logName') as HTMLInputElement;
    const passwordInput = screen.getByTestId('logPass') as HTMLInputElement;
    await act(async() =>{      
      fireEvent.change(nameInput, { target: { value: 'testuser' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
    })

    expect(nameInput.value).toBe('testuser');
    expect(passwordInput.value).toBe('password123');
  });

  it('Disable the button when inputs are not filled', async () => {
    render(<NextIntlClientProvider locale="ru" messages={messages}><SignUp />
      </NextIntlClientProvider>);

    const nameInput = screen.getByTestId('logName') as HTMLInputElement;
    await act(async() =>{      
      fireEvent.change(nameInput, { target: { value: 'testuser' } });
    })

    expect(screen.getByText('LoginSubmit')).toBeDisabled()
  });

  it('going to reg page', async () => {
    render(<NextIntlClientProvider locale="ru" messages={messages}><SignUp />
      </NextIntlClientProvider>);

    const goBtn = screen.getByText('GoToSignUp') as HTMLInputElement;
    await act(async() =>{      
      fireEvent.click(goBtn);
    })

    expect(!window.location.href.includes('signin'));    
  });
});

describe('Logout Btn', () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    const useRouterMock = require('@/navigation').useRouter;
    useRouterMock.mockReturnValue({
      push: mockPush,
    });
    jest.clearAllMocks();
  });

  it('renders the logout btn after successful login', async () => {
    const mockAuthState = jest.fn();
    mockAuthState.mockResolvedValue({ email: 'artur@gmail.com' }); 

    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <SignUp />
      </NextIntlClientProvider>
    );

    const nameInput = screen.getByTestId('logName') as HTMLInputElement;
    const passwordInput = screen.getByTestId('logPass') as HTMLInputElement;
    const goBtn = screen.getByText('LoginSubmit') as HTMLInputElement;

    await act(async () => {
      fireEvent.change(nameInput, { target: { value: 'artur@gmail.com' } });
      fireEvent.change(passwordInput, { target: { value: 'pff140593' } });
      fireEvent.click(goBtn);
    });

    expect(window.location.href.includes('get')); 
    render(<ButtonLogout/>)
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });
});