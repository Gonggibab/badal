import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useRecoilState } from "recoil";
import axios from "axios";
import Link from "next/link";

import { cartSizeAtom, isHeaderTranspAtom } from "common/recoil/atom";
import MobileMenu from "./MobileMenu";
import Logo from "assets/logo.svg";
import UserIcon from "assets/icon/user.svg";
import CartIcon from "assets/icon/cart.svg";
import LoginIcon from "assets/icon/login.svg";
import MenuIcon from "assets/icon/menu.svg";

export default function Header() {
  const { data } = useSession();
  const router = useRouter();
  const [isHeaderTransp, setIsHeaderTransp] =
    useRecoilState(isHeaderTranspAtom);
  const [cartSize, setCartSize] = useRecoilState(cartSizeAtom);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!data?.user) return;

    // 메인 페이지가 아니라면 헤더 배경을 초기화 한다
    if (router.pathname !== "/") setIsHeaderTransp(false);

    // 제품 데이터를 불러온다
    const getCartData = async () => {
      const cart = await axios.get(`/api/user/cart/${data?.user?.id}`);
      setCartSize(cart.data.data.items.length);
    };

    getCartData();
  }, [data, router, setCartSize, setIsHeaderTransp]);

  return (
    <header
      className={`${
        !isHeaderTransp && "bg-white"
      } z-30 sticky top-0 transition ease-in duration-500`}
    >
      <nav
        className="mx-auto p-6 max-w-7xl h-20 flex justify-between items-center lg:px-20"
        aria-label="Global"
      >
        <Link href="/" className="relative w-16 h-full flex">
          <span className="sr-only">FO:CEL</span>
          <Logo
            className={`${
              isHeaderTransp ? "text-white" : "text-gray-900"
            } w-auto h-full`}
          />
        </Link>

        <div className="hidden lg:flex lg:gap-x-16">
          <Link
            href="/product"
            className={`${
              isHeaderTransp
                ? "text-white hover:text-gray-200"
                : "text-gray-900 hover:text-gray-600"
            } text-sm font-semibold leading-6 `}
          >
            제품
          </Link>
          <Link
            href="/brand"
            className={`${
              isHeaderTransp
                ? "text-white hover:text-gray-200"
                : "text-gray-900 hover:text-gray-600"
            } text-sm font-semibold leading-6 `}
          >
            브랜드
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
                <UserIcon
                  className={`${
                    isHeaderTransp ? "text-white" : "text-gray-900"
                  } w-7 h-7`}
                />
              </Link>
              <Link
                href="/cart"
                className="relative ml-4 inline-flex items-center justify-center text-inherit"
              >
                <span className="sr-only">Shopping Cart</span>
                <CartIcon
                  className={`${
                    isHeaderTransp ? "text-white" : "text-gray-900"
                  } w-7 h-7`}
                />
                <span
                  className="absolute -top-3 right-[5px] w-4 h-4 text-xs font-semibold
                  text-white text-center bg-orange-500 rounded-full"
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
              <LoginIcon
                className={`${
                  isHeaderTransp ? "text-white" : "text-gray-900"
                } w-5 h-5`}
              />
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
            <MenuIcon
              className={`${
                isHeaderTransp ? "text-white" : "text-gray-900"
              } w-5 h-5`}
            />
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
