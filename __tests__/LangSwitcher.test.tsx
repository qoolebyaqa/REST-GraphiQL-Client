import { render, screen, fireEvent } from '@testing-library/react';
import { useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';
import { useRouter } from '@/navigation';
import LangSwitcher from '@/components/LangSwitcher';

// Мокаем useLocale
jest.mock('next-intl', () => ({
  useLocale: jest.fn(),
}));

// Мокаем usePathname
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

// Мокаем useRouter
jest.mock('@/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('LangSwitcher Component', () => {
  const pushMock = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
    (useLocale as jest.Mock).mockReturnValue('en'); // Устанавливаем дефолтное значение
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });
  });

  it('should render the select element with the correct default value', () => {
    render(<LangSwitcher />);
    
    const selectElement = screen.getByRole('combobox');
    expect(selectElement).toHaveValue('en');
  });

  it('should redirect to the correct path with the selected locale', () => {
    (usePathname as jest.Mock).mockReturnValue('/en/some/path'); // Мокаем текущий путь

    render(<LangSwitcher />);
    
    const selectElement = screen.getByRole('combobox');
    
    fireEvent.change(selectElement, { target: { value: 'ru' } });
    
    expect(pushMock).toHaveBeenCalledWith('/some/path', { locale: 'ru' });
  });

  it('should redirect to the root with the selected locale when the path does not include "en/" or "ru/"', () => {
    (usePathname as jest.Mock).mockReturnValue('/some/other/path'); // Мокаем путь, не включающий "en/" или "ru/"

    render(<LangSwitcher />);
    
    const selectElement = screen.getByRole('combobox');
    
    fireEvent.change(selectElement, { target: { value: 'ru' } });
    
    expect(pushMock).toHaveBeenCalledWith('/', { locale: 'ru' });
  });
});