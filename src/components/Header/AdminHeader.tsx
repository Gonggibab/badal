import { useState } from "react";
import Link from "next/link";

import Logo from "assets/logo.svg";
import CloseIcon from "assets/icon/close.svg";
import MenuIcon from "assets/icon/menu.svg";
import DashboardIcon from "assets/icon/dashboard.svg";
import TransactionIcon from "assets/icon/transaction.svg";
import ProductIcon from "assets/icon/product.svg";
import UserIcon from "assets/icon/users.svg";

export default function AdminHeader() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <header className="bg-white z-30 sticky top-0">
      <nav
        className="mx-auto p-6 max-w-7xl h-20 flex justify-between items-center md:hidden lg:px-20"
        aria-label="Global"
      >
        <Logo className="w-auto h-8" />
        <button
          data-drawer-target="sidebar"
          data-drawer-toggle="sidebar"
          aria-controls="sidebar"
          type="button"
          className="inline-flex items-center text-sm focus:outline-none 
            focus:ring-2 focus:ring-orange-500"
          onClick={() => setIsOpen(true)}
        >
          <span className="sr-only">Open sidebar</span>
          <MenuIcon className="w-6 h-6" />
        </button>
      </nav>

      <aside
        id="sidebar"
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        } fixed top-0 left-0 z-40 w-full h-screen bg-white shadow-md transition-all md:w-64`}
        aria-label="Sidebar"
      >
        <div className="h-full p-6 overflow-y-auto">
          <div className="w-full flex justify-between items-center">
            <Logo className="w-auto h-8" />
            <button className="md:hidden" onClick={() => setIsOpen(false)}>
              <CloseIcon className="w-8 h-8" />
            </button>
          </div>

          <ul className="py-8 space-y-2 font-medium">
            <li>
              <Link
                href="/admin"
                className="-mx-3 px-3 py-2 flex items-center rounded-lg gap-x-5
                text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
              >
                <DashboardIcon className="w-6 h-6" />
                대시보드
              </Link>
            </li>
            <li>
              <Link
                href="/admin/transaction"
                className="-mx-3 px-3 py-2 flex items-center rounded-lg gap-x-5
                text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
              >
                <TransactionIcon className="w-6 h-6" />
                트랜잭션
              </Link>
            </li>
            <li>
              <Link
                href="/admin/product"
                className="-mx-3 px-3 py-2 flex items-center rounded-lg gap-x-5
                text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
              >
                <ProductIcon className="w-6 h-6" />
                상품
              </Link>
            </li>
            <li>
              <Link
                href="/admin/user"
                className="-mx-3 px-3 py-2 flex items-center rounded-lg gap-x-5
                text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
              >
                <UserIcon className="w-6 h-6" />
                사용자
              </Link>
            </li>
          </ul>
          <div className="py-4 border-t border-gray-200">
            <Link
              href="/"
              className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
            >
              홈페이지로 돌아가기
            </Link>
          </div>
        </div>
      </aside>
    </header>
  );
}
