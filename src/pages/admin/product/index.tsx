import { ChangeEvent, useEffect, useRef, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useSetRecoilState } from "recoil";

import { notificationAtom } from "common/recoil/atom";
import { ProductType } from "common/types/product";
import Item from "components/Admin/Product/Item";
import Modal from "components/Modal";
import Spinner from "components/Loader/Spinner";

import SearchIcon from "assets/icon/search.svg";
import DeleteIcon from "assets/icon/delete.svg";
import RefreshIcon from "assets/icon/refresh.svg";
import PlusIcon from "assets/icon/plus.svg";
import EmptyBoxIcon from "assets/icon/emptyCart.svg";

export default function ProductAdmin() {
  const allCheckRef = useRef<HTMLInputElement>(null);
  const setNotification = useSetRecoilState(notificationAtom);
  const [productData, setProductData] = useState<ProductType[] | null>(null);
  const [selectedData, setSelectedData] = useState<Set<string>>(new Set());
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getProductData = async () => {
    setIsLoading(true);

    // 전체 제품 데이터를 불러온다
    const { data } = await axios.get("/api/product");
    setProductData(data.data);
    setIsLoading(false);
  };

  const onCheckChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (productData) {
      if (e.currentTarget.checked)
        setSelectedData(new Set(productData.map((item) => item.id)));
      else {
        setSelectedData(new Set());
      }
    }
  };

  const onDeleteClicked = () => {
    if (selectedData.size < 1) {
      setNotification({
        isOpen: true,
        content: "삭제할 제품을 선택해 주세요!",
      });
      return;
    }
    setIsModalOpen(true);
  };

  const deleteProducts = async () => {
    setIsLoading(true);
    setIsModalOpen(false);

    try {
      await Promise.all(
        Array.from(selectedData).map((productId) =>
          axios.delete(`/api/product/${productId}`)
        )
      );

      selectedData.clear(); // 선택 데이터 삭제
      getProductData(); // 제품 리스트 업데이트
      setNotification({
        isOpen: true,
        content: `성공적으로 ${selectedData.size}개의 제품을 삭제했습니다.`,
      });
    } catch (error) {
      setIsLoading(false);
      setNotification({
        isOpen: true,
        content: "에러가 발생해 삭제에 실패 했습니다!",
      });
    }
  };

  // 화면 로드시 데이터 가져옴
  useEffect(() => {
    getProductData();
  }, []);

  useEffect(() => {
    if (!allCheckRef.current || !productData) return;

    // 모든 제품에 체크가 되어 있지 않으면 전체 체크버튼 비활성화
    if (selectedData.size === productData.length && selectedData.size !== 0)
      allCheckRef.current.checked = true;
    else allCheckRef.current.checked = false;
  }, [productData, selectedData]);

  return (
    <article className="p-4 md:ml-64">
      <div
        className="p-2 flex flex-col items-center w-full h-[calc(100vh-120px)] overflow-x-scroll
          shadow-md sm:rounded-lg md:h-[calc(100vh-40px)]"
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
                  placeholder="제품을 검색해보세요"
                />
              </div>
            </div>
          </div>

          <div className="w-full flex items-center justify-end">
            <button
              className="px-2.5 h-10 text-red-500 rounded-md shadow transition-all 
                hover:shadow-lg hover:translate-y-[1px] sm:ml-4"
              onClick={onDeleteClicked}
            >
              <DeleteIcon className="w-5 h-5" />
            </button>
            <button
              className="ml-4 px-2.5 h-10 flex items-center text-orange-500 rounded-md shadow
                hover:shadow-lg hover:translate-y-[1px] transition-all"
              onClick={getProductData}
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

        <table className="w-full text-sm text-left text-gray-500 border-collapse">
          <thead className="text-xs font-semibold text-gray-700 bg-gray-50">
            <tr>
              <th scope="col" className="p-4">
                <div className="flex items-center">
                  <input
                    ref={allCheckRef}
                    id="checkbox-all-search"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 
                      rounded cursor-pointer focus:ring-blue-500 focus:ring-2"
                    onChange={(e) => onCheckChange(e)}
                  />
                  <label htmlFor="checkbox-all-search" className="sr-only">
                    체크박스
                  </label>
                </div>
              </th>
              <th scope="col" className="px-4 py-3 whitespace-nowrap">
                제품 이름
              </th>
              <th scope="col" className="px-4 py-3 whitespace-nowrap">
                가격 (원)
              </th>
              <th scope="col" className="px-4 py-3 whitespace-nowrap">
                재고
              </th>
            </tr>
          </thead>
          <tbody>
            {productData &&
              productData.map((item) => {
                return (
                  <Item
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    price={item.price}
                    options={item.options}
                    selectedData={selectedData}
                    setSelectedData={setSelectedData}
                  />
                );
              })}
          </tbody>
        </table>

        {productData?.length === 0 && (
          <div className="mt-10 w-full flex flex-col justify-center items-center">
            <EmptyBoxIcon className="w-24 h-24" />
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-orange-500">
              텅텅
            </h1>
            <p className="mt-2 text-sm font-medium leading-7 text-gray-900">
              등록되어 있는 제품이 없습니다.
            </p>
          </div>
        )}

        <Modal
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          title="삭제하시겠습니까?"
          content={`정말로 제품 ${selectedData.size}개를 삭제하시겠습니까?`}
          btnTitle="확인"
          callback={deleteProducts}
        />

        <Spinner isLoading={isLoading} />
      </div>
    </article>
  );
}
