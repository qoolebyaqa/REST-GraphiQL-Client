import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rest-graphiql-client",
  description: "RSSchool study project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} my-36`}>
        <h2 className="text-center text-3xl">Rest-Graphiql-Client playground</h2>
        {children}
      </body>
    </html>
  );
}
