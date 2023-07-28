import { useEffect, useState } from "react";
import axios from "axios";

import { OrderType } from "common/types/order";
import OrderFilter from "components/Admin/Order/OrderFilter";
import OrderItem from "components/Admin/Order/OrderItem";
import Spinner from "components/Loader/Spinner";
import SearchIcon from "assets/icon/search.svg";
import RefreshIcon from "assets/icon/refresh.svg";
import EmptyBoxIcon from "assets/icon/emptyCart.svg";

export type OrderFilterType = {
  status: string[];
  gte: Date | null;
  lte: Date | null;
};

export default function OrderAdmin() {
  const [order, setOrder] = useState<OrderType[] | null>(null);
  const [filter, setFilter] = useState<OrderFilterType>({
    status: [
      "READY",
      "IN_DELIVERY",
      "DONE",
      "CANCLED",
      "RETURN_REQUESTED",
      "RETURN_COMPLETE",
    ],
    gte: null,
    lte: null,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getOrderData = async (filter: OrderFilterType) => {
    setIsLoading(true);

    // 한달 간의 주문 기록 중 리뷰를 작성하지 않은 제품 목록을 가져옴.
    // const date = new Date();
    // date.setDate(date.getDate() - 30);

    // 주문 데이터를 불러온다
    const orderRef = await axios.get(
      `/api/order?status=${filter.status}&gte=${filter.gte}&lte=${filter.lte}`
    );
    const orderData: OrderType[] = orderRef.data.data;
    setOrder(orderData);

    setIsLoading(false);
  };

  useEffect(() => {
    getOrderData(filter);
  }, [filter]);

  return (
    <main className="p-4 lg:ml-64">
      <div
        className="p-2 flex flex-col items-center w-full h-[calc(100vh-100px)] overflow-x-scroll
          shadow-md sm:rounded-lg lg:h-[calc(100vh-20px)]"
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
              onClick={() => getOrderData}
            >
              <RefreshIcon className="w-4 h-4 md:mr-2" />
              <span className="hidden md:block">새로고침</span>
            </button>
          </div>
        </div>

        <div className="mb-4 px-4 py-3 w-full flex items-center text-xs rounded-md shadow">
          <OrderFilter filter={filter} setFilter={setFilter} />
        </div>

        <div className="w-full y-full overflow-x-scroll">
          <table className="w-full text-sm text-left text-gray-500 border-collapse">
            <thead className="text-xs font-semibold text-gray-700 bg-gray-50">
              <tr>
                <th scope="col" className="px-4 py-3 whitespace-nowrap">
                  주문상태
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
            <p className="mt-1 text-xs text-gray-900">필터를 조절해 보세요</p>
          </div>
        )}

        <Spinner isLoading={isLoading} />
      </div>
    </main>
  );
}
