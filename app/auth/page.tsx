import SignIn from '@/components/SignIn';
import Link from 'next/link';

export default function Auth() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Authorization</h1>
      <SignIn />
    </main>
  );
}
