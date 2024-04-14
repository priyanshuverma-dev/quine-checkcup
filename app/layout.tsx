import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import clsx from "clsx";
import QueryProvider from "@/providers/query";

const font = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Checkcup - Quine 0009",
  description: "A website status monitoring tool",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={clsx(
          font.className,
          "bg-gradient-to-r from-slate-900 to-stone-800"
        )}
      >
        {children}
      </body>
    </html>
  );
}
