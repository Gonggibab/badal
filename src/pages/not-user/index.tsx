import React from "react";

export default function NotUser() {
  const onSearchClicked = () => {};

  return (
    <main className="flex h-[calc(100vh-280px)] flex-col justify-center px-6 py-12 lg:px-8">
      <div className="w-full flex flex-col sm:mx-auto sm:max-w-sm">
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
      </div>
    </main>
  );
}
