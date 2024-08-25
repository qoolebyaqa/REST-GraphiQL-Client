import Link from 'next/link';

export default function Auth() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Authorization</h1>
      <>
        <form className="flex flex-col mt-10 sm:w-1/2 xl:w-1/3 w-11/12 m-auto gap-4 text-teal-800 bg-white md:p-12 p-5 rounded-lg">
          <h2 className="text-sm sm:text-xl md:text-2xl font-bold">
            Sign in to Playground
          </h2>
          <p className="text-sm md:text-base">Enter to your account</p>
          <div className="flex flex-col">
            <label htmlFor="login">Username</label>
            <input
              type="text"
              name="login"
              id="login"
              className="text-slate-900 border-2 border-black"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              className="text-slate-900 border-2 border-black"
            />
          </div>
          <div className="flex sm:gap-5 gap-2 m-auto md:text-base sm:text-sm text-xs">
            <button type="button">Need to create an account?</button>
            <Link href="/main">
              <button
                type="button"
                className="bg-cyan-600 rounded-lg sm:w-40 w-1/2 border-2 border-black text-black h-8 md:h-10 disabled:bg-sky-300"
              >
                Sign in
              </button>
            </Link>
          </div>
        </form>
      </>
    </main>
  );
}
