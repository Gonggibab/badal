"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import MenuIcon from "../Icons/MenuIcon";
import LoginIcon from "../Icons/LoginIcon";
import MobileMenu from "./MobileMenu";
import logo from "assets/logo.svg";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return (
    <header className="bg-white z-30 sticky top-0">
      <nav
        className="mx-auto p-6 max-w-7xl h-20 flex justify-between items-center lg:px-20"
        aria-label="Global"
      >
        <Link href="/" className="relative w-16 h-full flex">
          <span className="sr-only">FO:CEL</span>
          <Image
            src={logo}
            alt="FO:CEL"
            width="0"
            height="0"
            sizes="100vw"
            className="w-full h-auto"
          />
        </Link>

        <div className="hidden lg:flex lg:gap-x-16">
          <Link
            href="/brand"
            className="text-sm font-semibold leading-6 text-gray-900 hover:text-gray-600"
          >
            브랜드
          </Link>
          <Link
            href="/product"
            className="text-sm font-semibold leading-6 text-gray-900 hover:text-gray-600"
          >
            제품
          </Link>
          <Link
            href="/customer"
            className="text-sm font-semibold leading-6 text-gray-900 hover:text-gray-600"
          >
            고객
          </Link>
        </div>

        <div className="hidden lg:flex">
          <Link
            href="/login"
            className="relative h-full inline-flex items-center justify-center text-gray-900"
          >
            <button
              type="button"
              className="relative inline-flex items-center justify-center text-inherit"
              onClick={() => setIsMenuOpen(true)}
            >
              <span className="sr-only">Login</span>
              <LoginIcon width={20} height={20} />
            </button>
          </Link>
        </div>

        <div className="flex lg:hidden">
          <button
            type="button"
            className="relative inline-flex items-center justify-center text-inherit"
            onClick={() => setIsMenuOpen(true)}
          >
            <span className="sr-only">Open menu</span>
            <MenuIcon width={20} height={20} />
          </button>
        </div>
      </nav>

      <MobileMenu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
    </header>
  );
}
