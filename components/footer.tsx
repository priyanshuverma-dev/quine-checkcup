"use client";

import Link from "next/link";
import React from "react";
import { cn } from "@/lib/utils";

const Footer = () => {
  return (
    <footer className="p-4 flex items-center justify-center">
      <div>
        <p>
          &copy; 2024{" "}
          <Link href={"https://p7u.tech"} className={cn("px-0 mr-1")}>
            Priyanshu Verma.
          </Link>
          {/* All rights reserved. */}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
