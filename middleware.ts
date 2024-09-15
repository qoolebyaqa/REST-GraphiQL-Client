import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en', 'ru'],
  defaultLocale: 'en',
});

export const config = {
  matcher: [
    '/',
    '/GET',
    '/POST',
    '/PUT',
    '/PATCH',
    '/OPTIONS',
    '/DELETE',
    '/HEAD',
    '/auth',
    '/auth/signin',
    '/GRAPHQL',
    '/(en|ru)/:path*',
    "/((?!|_next/static|_next/image|img/|favicon.ico).*)",
  ],
};
