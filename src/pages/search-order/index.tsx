import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import { OrderType } from "common/types/order";

export default function NotUser() {
  const router = useRouter();
  const [orderNo, setOrderNo] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");

  const onOrderNoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (errorMsg !== "") setErrorMsg("");

    let value = e.currentTarget.value;

    if (value.length > 11) {
      value = value.slice(0, 11);
    }
    value = value.toUpperCase();

    setOrderNo(value);
  };

  const onSearchClicked = async () => {
    if (orderNo.length < 11) {
      setErrorMsg("주문번호 11자리를 올바르게 입력하세요");
      return;
    }

    const orderRes = await axios.get(`/api/order/orderId/${orderNo}`);
    const order: OrderType = orderRes.data.data;

    if (!order) {
      setErrorMsg("해당 주문번호와 일치하는 주문이 없습니다");
    } else {
      router.push(`/order/${order.id}`);
    }
  };

  return (
    <main className="flex h-[calc(100vh-280px)] flex-col justify-center px-6 py-12 lg:px-8">
      <div className="w-full flex flex-col sm:mx-auto sm:max-w-sm">
        <p className="text-sm text-orange-500 font-semibold">비회원</p>
        <h2 className="mb-10 text-3xl font-bold text-gray-900">주문조회</h2>

        <div className="my-6 w-full">
          <label
            htmlFor="order-number"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            주문 번호
          </label>
          <div className="mt-2">
            <input
              id="order-number"
              name="order-number"
              type="order-number"
              autoComplete="order-number"
              className="block w-full rounded-md border-0 px-3 py-2 text-gray-900 shadow-sm 
                ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none
                focus:ring-2 focus:ring-inset focus:ring-orange-500 sm:text-sm sm:leading-6"
              value={orderNo}
              onChange={(e) => onOrderNoChange(e)}
            />
          </div>
        </div>

        <button
          type="button"
          className="px-3 py-2.5 w-full flex justify-center text-sm text-white font-medium 
            bg-orange-500 rounded-md shadow transition-all hover:bg-orange-400"
          onClick={onSearchClicked}
        >
          검색하기
        </button>

        <p
          className={`${
            errorMsg !== "" ? "opacity-100" : "opacity-0"
          } mt-8 py-4 w-full h-4 flex justify-center text-sm text-orange-500 font-semibold transition-all`}
        >
          {errorMsg}
        </p>
      </div>
    </main>
  );
}
