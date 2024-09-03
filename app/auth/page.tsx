import SignIn from '@/components/Auth/SignIn';

export default function Auth() {

  return (
    <main className="flex flex-col items-center justify-between p-4 mb-20">
      <h2>Authorization</h2>
      <SignIn />
    </main>
  );
}
