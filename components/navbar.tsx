import clsx from "clsx";
import { Caveat } from "next/font/google";
import Link from "next/link";
import React from "react";

const font = Caveat({ subsets: ["latin"], weight: "700" });

const Navbar = () => {
  return (
    <header className="mx-2 text-sm">
      <nav
        className="mt-6 relative flex-col sm:flex-row md:w-[85rem] max-w-full flex border rounded-[36px] shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] px-4 items-center justify-between py-4 md:py-0 md:px-6 lg:px-8 xl:mx-auto bg-gray-800 border-gray-700"
        aria-label="navbar"
      >
        <div className="flex items-center justify-center">
          <Link
            href="/"
            className="flex gap-2 text-2xl font-semibold text-white"
            aria-label="Checkcup Heading"
          >
            <h1 className={clsx("text-4xl", font.className)}>Checkcup</h1>
          </Link>
        </div>
        <div className="flex flex-row gap-4 mt-0 items-center justify-center md:justify-end md:gap-y-0 md:mt-0 md:ps-7">
          <Link
            href="https://quine.sh/repo/priyanshuverma-dev-quine-checkcup-786060195?utm_source=copy&utm_share_context=rdp" // !TODO: Add Quine link
            target="_blank"
            className="text-white hover:text-gray-300 font-bold rounded-md p-2 border-2 border-neutral-900 bg-neutral-800 my-4"
          >
            👍 Vote on Quine
          </Link>
          <Link
            href="https://github.com/priyanshuverma-dev/quine-checkcup"
            target="_blank"
            className="text-white hover:text-gray-300 font-bold rounded-md p-2 border-2 border-neutral-900 bg-neutral-800 my-4"
          >
            ⭐ On Github
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
