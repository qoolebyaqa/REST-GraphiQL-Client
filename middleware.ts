import createMiddleware from 'next-intl/middleware';

 
export default createMiddleware({
  locales: ['en', 'ru'],
  defaultLocale: 'en'
});
 
export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/GET', '/POST', '/PUT', '/PATCH', '/OPTIONS', '/DELETE', '/HEAD','/auth', '/auth/signin', '/GRAPHQL', '/(en|ru)/:path*']
};