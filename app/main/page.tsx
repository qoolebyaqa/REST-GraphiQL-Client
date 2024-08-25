import Link from "next/link";

export default function Auth() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <nav>
        <ul className="flex justify-around gap-10">
          <Link href='/'><li>Go to Rest Client</li></Link>          
          <Link href='/'><li>Go to GraphiQL Client</li></Link>
        </ul>
      </nav>

    </main>
  );
}
