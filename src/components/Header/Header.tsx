import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRecoilState } from "recoil";
import axios from "axios";
import Link from "next/link";

import MobileMenu from "./MobileMenu";
import cartSizeAtom from "common/recoil/atom";
import Logo from "assets/logo.svg";
import UserIcon from "assets/icon/user.svg";
import CartIcon from "assets/icon/cart.svg";
import LoginIcon from "assets/icon/login.svg";
import MenuIcon from "assets/icon/menu.svg";

export default function Header() {
  const { data } = useSession();
  const [cartSize, setCartSize] = useRecoilState(cartSizeAtom);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    // 제품 데이터를 불러온다
    if (!data?.user) return;

    const getCartData = async () => {
      const cart = await axios.get(`/api/cart/${data?.user?.id}`);
      setCartSize(cart.data.data.items.length);
    };

    getCartData();
  }, [data?.user, setCartSize]);

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
            <>
              <Link
                href="/my"
                className="relative inline-flex items-center justify-center text-inherit"
              >
                <span className="sr-only">My Page</span>
                <UserIcon className="w-7 h-7" />
              </Link>
              <Link
                href="/cart"
                className="relative ml-4 inline-flex items-center justify-center text-inherit"
              >
                <span className="sr-only">Shopping Cart</span>
                <CartIcon className="w-7 h-7" />
                <span
                  className="absolute -top-3 right-[5px] w-4 h-4 text-xs font-semibold
                  text-white text-center bg-indigo-700 rounded-full"
                >
                  {cartSize}
                </span>
              </Link>
            </>
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
