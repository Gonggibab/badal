import { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

import MobileMenu from "./MobileMenu";
import Logo from "assets/logo.svg";
import LoginIcon from "assets/icon/login.svg";
import LogoutIcon from "assets/icon/logout.svg";
import MenuIcon from "assets/icon/menu.svg";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const { data } = useSession();
  console.log(data);

  return (
    <header className="bg-white z-30 sticky top-0">
      <nav
        className="mx-auto p-6 max-w-7xl h-20 flex justify-between items-center lg:px-20"
        aria-label="Global"
      >
        <Link href="/" className="relative w-16 h-full flex">
          <span className="sr-only">FO:CEL</span>
          <Logo className="w-auto h-full" />
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
          {data ? (
            <button
              type="button"
              className="relative inline-flex items-center justify-center text-inherit"
              onClick={() => setIsMenuOpen(true)}
            >
              <span className="sr-only">Logout</span>
              <LogoutIcon className="w-5 h-5" />
            </button>
          ) : (
            <Link
              href="/login"
              className="relative h-full inline-flex items-center justify-center text-gray-900"
            >
              <span className="sr-only">Login</span>
              <LoginIcon className="w-5 h-5" />
            </Link>
          )}
        </div>

        <div className="flex lg:hidden">
          <button
            type="button"
            className="relative inline-flex items-center justify-center text-inherit"
            onClick={() => setIsMenuOpen(true)}
          >
            <span className="sr-only">Open menu</span>
            <MenuIcon className="w-5 h-5" />
          </button>
        </div>
      </nav>

      <MobileMenu
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        session={data}
      />
    </header>
  );
}
