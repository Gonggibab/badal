"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import logo from "assets/logo.svg";
import MenuBtn from "../Icons/MenuBtn";
import LoginBtn from "../Icons/LoginBtn";
import MobileMenu from "./MobileMenu";

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
            priority
            fill
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
            }}
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
          <Link href="/login" className="relative h-full text-gray-900">
            <LoginBtn width={20} height={20} />
          </Link>
        </div>

        <div className="flex lg:hidden">
          <MenuBtn width={20} height={20} onClick={() => setIsMenuOpen(true)} />
        </div>
      </nav>

      <MobileMenu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
    </header>
  );
}
