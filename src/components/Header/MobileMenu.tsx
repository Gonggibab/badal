import { Dispatch, SetStateAction } from "react";
import Link from "next/link";
import { Session } from "next-auth";
import { useRecoilValue } from "recoil";

import { cartItemsAtom } from "common/recoil/atom";
import Logo from "assets/logo.svg";
import CloseIcon from "assets/icon/close.svg";

type MobileMenuProps = {
  isMenuOpen: boolean;
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
  session: Session | null;
};

export default function MobileMenu({
  isMenuOpen,
  setIsMenuOpen,
  session,
}: MobileMenuProps) {
  const cartItems = useRecoilValue(cartItemsAtom);

  return (
    <div className="lg:hidden" role="dialog" aria-modal="true">
      <div
        className={`${
          isMenuOpen ? " translate-x-0" : "translate-x-full"
        } fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 
        transition-all sm:max-w-sm sm:ring-1 sm:ring-gray-900/10`}
      >
        <div className="h-6 flex items-center justify-between">
          <Link href="/" className="relative w-16 h-full">
            <span className="sr-only">FO:CEL</span>
            <Logo className="w-full h-auto" />
          </Link>
          <button
            type="button"
            className="text-gray-900"
            onClick={() => setIsMenuOpen(false)}
          >
            <span className="sr-only">메뉴 닫기</span>
            <CloseIcon className="w-6 h-6" strokeWidth="1.5" />
          </button>
        </div>
        <div className="mt-6 flow-root">
          <div className="-my-6 divide-y divide-gray-500/10">
            <div className="space-y-2 py-6">
              <Link
                href="/product"
                className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                제품
              </Link>
              <Link
                href="/brand"
                className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                브랜드
              </Link>
            </div>
            <div className="py-6">
              {session ? (
                <div className="space-y-2">
                  <Link
                    href="/my"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    마이페이지
                  </Link>
                  <Link
                    href="/cart"
                    className="-mx-3 flex items-center rounded-lg px-3 py-2 
                      text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    장바구니
                    <span
                      className="ml-2 w-5 h-5 text-xs flex justify-center items-center
                        font-semibold text-white bg-orange-500 rounded-full"
                    >
                      {cartItems.length}
                    </span>
                  </Link>
                  {session.user?.role === "ADMIN" && (
                    <Link
                      href="/admin"
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      어드민 페이지
                    </Link>
                  )}
                </div>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    로그인
                  </Link>
                  <Link
                    href="/cart"
                    className="-mx-3 flex items-center rounded-lg px-3 py-2 
                  text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    장바구니
                    <span
                      className="ml-2 w-5 h-5 text-xs flex justify-center items-center
                    font-semibold text-white bg-orange-500 rounded-full"
                    >
                      {cartItems.length}
                    </span>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
