import React, { ReactNode } from 'react';

export const useTranslations = jest.fn(() => (key: string) => key);

export const NextIntlClientProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => <div>{children}</div>;
