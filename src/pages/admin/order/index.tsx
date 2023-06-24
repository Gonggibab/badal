import { ChangeEvent, useEffect, useRef, useState } from "react";
import Link from "next/link";
import axios from "axios";

import { OrderType } from "common/types/order";
import SearchIcon from "assets/icon/search.svg";
import RefreshIcon from "assets/icon/refresh.svg";
import PlusIcon from "assets/icon/plus.svg";
import EmptyBoxIcon from "assets/icon/emptyCart.svg";
import Modal from "components/Modal";
import Spinner from "components/Loader/Spinner";
import OrderItem from "components/Admin/Order/OrderItem";

export default function OrderAdmin() {
  const allCheckRef = useRef<HTMLInputElement>(null);
  const [order, setOrder] = useState<OrderType[] | null>(null);
  const [selectedData, setSelectedData] = useState<Set<string>>(new Set());
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getOrderData = async () => {
    setIsLoading(true);

    // 전체 주문 데이터를 불러온다
    const { data } = await axios.get("/api/order");
    setOrder(data.data);
    setIsLoading(false);
  };

  useEffect(() => {
    getOrderData();
  }, []);

  return (
    <main className="p-4 lg:ml-64">
      <div
        className="p-2 flex flex-col items-center w-full h-[calc(100vh-120px)] overflow-x-scroll
          shadow-md sm:rounded-lg lg:h-[calc(100vh-40px)]"
      >
        <div className="pb-4 w-full flex flex-col justify-between items-center text-sm sm:flex-row">
          <div className="mb-4 w-full flex items-center sm:m-0">
            <div className="w-full text-base bg-white">
              <label htmlFor="table-search" className="sr-only">
                검색
              </label>
              <div className="relative mt-1 w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <SearchIcon className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  id="table-search"
                  className="flex p-2 py-2.5 pl-10 w-full text-sm text-gray-900
                    border border-gray-300 rounded-lg bg-gray-50 transition-all
                    focus:ring-blue-500 focus:border-blue-500 sm:w-64 lg:w-80"
                  placeholder="이름이나 전화번호를 검색해보세요"
                />
              </div>
            </div>
          </div>

          <div className="w-full h-full flex items-center justify-end">
            <button
              className="ml-4 px-2.5 h-10 flex items-center text-orange-500 rounded-md shadow
                hover:shadow-lg hover:translate-y-[1px] transition-all"
              onClick={getOrderData}
            >
              <RefreshIcon className="mr-2 w-4 h-4 sm:m-0 lg:mr-2" />
              <span className="block sm:hidden lg:block">새로고침</span>
            </button>
            <Link
              href="/admin/product/add"
              className="ml-4 pl-1 pr-2 h-10 flex items-center rounded-md shadow
                hover:shadow-lg hover:translate-y-[1px] transition-all"
            >
              <PlusIcon className="mr-2 w-6 h-6" />
              <span className="-ml-1.5">추가하기</span>
            </Link>
          </div>
        </div>
        <div className="w-full overflow-x-scroll">
          <table className="w-full text-sm text-left text-gray-500 border-collapse">
            <thead className="text-xs font-semibold text-gray-700 bg-gray-50">
              <tr>
                <th scope="col" className="px-4 py-3 whitespace-nowrap">
                  상태
                </th>
                <th scope="col" className="px-4 py-3 whitespace-nowrap">
                  주문번호
                </th>
                <th scope="col" className="px-4 py-3 whitespace-nowrap">
                  주문타입
                </th>
                <th scope="col" className="px-4 py-3 whitespace-nowrap">
                  고객명
                </th>
                <th scope="col" className="px-4 py-3 whitespace-nowrap">
                  주문명
                </th>
                <th scope="col" className="px-4 py-3 whitespace-nowrap">
                  결제금액
                </th>
                <th scope="col" className="px-4 py-3 whitespace-nowrap">
                  주문시각
                </th>
              </tr>
            </thead>
            <tbody>
              {order &&
                order.map((item) => {
                  return <OrderItem key={item.id} item={item} />;
                })}
            </tbody>
          </table>
        </div>

        {order?.length === 0 && (
          <div className="mt-10 w-full flex flex-col justify-center items-center">
            <EmptyBoxIcon className="w-24 h-24" />
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-orange-500">
              텅텅
            </h1>
            <p className="mt-2 text-sm font-medium leading-7 text-gray-900">
              진행중인 주문이 없습니다.
            </p>
          </div>
        )}

        <Spinner isLoading={isLoading} />
      </div>
    </main>
  );
}
