import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useRecoilState } from "recoil";
import axios from "axios";
import Link from "next/link";

import { cartItemsAtom, isHeaderTranspAtom } from "common/recoil/atom";
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
  const [cartItems, setCartItems] = useRecoilState(cartItemsAtom);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  //  브랜드 페이지가 아니라면 헤더 배경을 초기화 한다
  useEffect(() => {
    if (router.pathname !== "/brand") setIsHeaderTransp(false);
  }, [router, setIsHeaderTransp]);

  // 사용자일 경우 카트 데이터를 불러온다
  useEffect(() => {
    if (!data?.user) return;

    const getCartData = async () => {
      const cart = await axios.get(`/api/user/cart/${data?.user?.id}`);
      setCartItems(cart.data.data.items);
    };

    getCartData();
  }, [data, setCartItems]);

  return (
    <header
      className={`${!isHeaderTransp && "bg-white"} ${
        router.pathname === "/brand" ? "fixed" : "sticky"
      } z-30 top-0 w-full transition ease-in duration-500`}
    >
      <nav
        className="mx-auto p-6 max-w-7xl h-20 flex justify-between items-center lg:px-20"
        aria-label="Global"
      >
        <Link href="/" className="relative w-16 h-full flex">
          <span className="sr-only">FO:CEL</span>
          <Logo
            className={`${
              isHeaderTransp ? "text-gray-900" : "text-gray-900"
            } w-auto h-full`}
          />
        </Link>

        <div className="hidden lg:flex lg:gap-x-16">
          <Link
            href="/product"
            className={`${
              isHeaderTransp
                ? "text-gray-900 hover:text-gray-600"
                : "text-gray-900 hover:text-gray-600"
            } text-sm font-semibold leading-6 `}
          >
            제품
          </Link>
          <Link
            href="/brand"
            className={`${
              isHeaderTransp
                ? "text-gray-900 hover:text-gray-600"
                : "text-gray-900 hover:text-gray-600"
            } text-sm font-semibold leading-6 `}
          >
            브랜드
          </Link>
        </div>

        <div className="hidden lg:flex lg:items-center">
          {data ? (
            <>
              <Link
                href="/my"
                className="relative inline-flex items-center justify-center text-inherit"
              >
                <span className="sr-only">마이 페이지</span>
                <UserIcon
                  className={`${
                    isHeaderTransp ? "text-gray-900" : "text-gray-900"
                  } w-7 h-7`}
                />
              </Link>
            </>
          ) : (
            <Link
              href="/login"
              className="relative h-full inline-flex items-center justify-center text-gray-900"
            >
              <span className="sr-only">로그인 페이지</span>
              <LoginIcon
                className={`${
                  isHeaderTransp ? "text-gray-900" : "text-gray-900"
                } w-7 h-7`}
              />
            </Link>
          )}
          <Link
            href="/cart"
            className="relative ml-4 inline-flex items-center justify-center text-inherit"
          >
            <span className="sr-only">쇼핑 카트</span>
            <CartIcon
              className={`${
                isHeaderTransp ? "text-gray-900" : "text-gray-900"
              } w-7 h-7`}
            />
            <span
              className="absolute -top-3 right-[5px] w-4 h-4 text-xs font-semibold
                  text-white text-center bg-orange-500 rounded-full"
            >
              {cartItems.length}
            </span>
          </Link>
        </div>

        <div className="flex lg:hidden">
          <button
            type="button"
            className="p-1 relative inline-flex items-center justify-center text-inherit"
            onClick={() => setIsMenuOpen(true)}
          >
            <span className="sr-only">메뉴 열기</span>
            <MenuIcon
              className={`${
                isHeaderTransp ? "text-gray-900" : "text-gray-900"
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
