import ButtonLogout from '@/components/Auth/ButtonLogout';
import Link from 'next/link';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col items-center justify-between p-4">
      <div className="flex gap-10 justify-end">
        <nav>
          <ul className="flex justify-around gap-10">
            <li>
              <Link href="/GET">Go to Rest Client</Link>
            </li>
            <li>
              <Link href="/GRAPHQL">Go to GraphiQL Client</Link>
            </li>
          </ul>
        </nav>
        <ButtonLogout />
      </div>
      {children}
    </div>
  );
}
