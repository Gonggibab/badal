import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";

import { OptionType, ProductType } from "common/types/product";
import ImageGallery from "components/Product/ImageGallery";
import Option from "components/Product/Option";
import Review from "components/Product/Review";
import Modal from "components/Modal";
import Notification from "components/Notification";
import Loader from "components/Loader/Loader";
import cartSizeAtom from "common/recoil/atom";

import PlusIcon from "assets/icon/plus.svg";
import MinusIcon from "assets/icon/minus.svg";
import AddCartIcon from "assets/icon/addCart.svg";
import SadIcon from "assets/icon/sad.svg";

export type SelectedOptionType = {
  optionId: string;
  optionItemId: string;
  title: string;
  value: number;
};

export default function ProductDetail() {
  const { data } = useSession();
  const router = useRouter();
  const [cartSize, setCartSize] = useRecoilState(cartSizeAtom);
  const [productData, setProductData] = useState<ProductType | null>(null);
  const [price, setPrice] = useState<number>(0);
  const [qty, setQty] = useState<number>(1);
  const [isReviewShown, setIsReviewShown] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isNotifOpen, setIsNotifOpen] = useState<boolean>(false);
  const [notifInfo, setNotifInfo] = useState({
    content: "장바구니에 추가되었습니다.",
    btnTitle: "장바구니 보기",
    callback: () => {
      router.push("/cart");
    },
  });
  const [selectedOptions, setSelectedOptions] = useState<
    SelectedOptionType[] | null
  >(null);

  useEffect(() => {
    // 제품 데이터를 불러온다
    const getProductData = async () => {
      const { data } = await axios.get(`/api/product/${router.query.id}`);
      const productData: ProductType = data.data;
      setProductData(productData);
      setSelectedOptions(
        productData.options.map((option: OptionType) => {
          return {
            optionId: option.id,
            optionItemId: option.optionItems[0].id,
            title: option.optionItems[0].title,
            value: option.optionItems[0].value,
          };
        })
      );
    };

    if (router.isReady) getProductData();
  }, [router.isReady, router.query.id]);

  // 옵션 및 수량선택 마다 가격 업데이트
  useEffect(() => {
    if (!productData || !selectedOptions) return;

    let tmpPrice = productData.price;
    selectedOptions.forEach((opt) => (tmpPrice += opt.value));
    setPrice(tmpPrice * qty);
  }, [selectedOptions, qty, productData]);

  const onAddCartClicked = async () => {
    if (!productData || !selectedOptions) return;

    if (!data) {
      // 로그인을 안했으면 로그인 의사를 물어본다.
      setIsModalOpen(true);
    } else {
      try {
        await axios.post("/api/cart/item", {
          userId: data.user?.id,
          productId: router.query.id,
          title:
            productData.title +
            " / " +
            selectedOptions.map((opt) => opt.title).join(" / "),
          image:
            productData.images.length > 0
              ? productData.images[0].secure_url
              : null,
          price: price,
          quantity: qty,
        });

        setCartSize(cartSize + 1);
        setNotifInfo({
          content: "장바구니에 추가되었습니다.",
          btnTitle: "장바구니 보기",
          callback: () => {
            router.push("/cart");
          },
        });
        setIsNotifOpen(true);
      } catch (error) {
        if (axios.isAxiosError<{ message: string }>(error)) {
          console.log("장바구니에 동일한 물품을 넣을 수 없습니다. " + error);

          setNotifInfo({
            content: "장바구니에 이미 동일한 물품이 있습니다.",
            btnTitle: "장바구니 보기",
            callback: () => {
              router.push("/cart");
            },
          });
        } else {
          console.log("서버와의 통신중에 오류가 발생했습니다. " + error);

          setNotifInfo({
            content:
              "서버와의 통신중에 오류가 발생했습니다. 다시 시도해주세요.",
            btnTitle: "",
            callback: () => {},
          });
        }

        setIsNotifOpen(true);
      }
    }
  };

  return (
    <main className="w-screen h-full flex flex-col items-center justify-between">
      <section className="bg-white w-full">
        {productData && selectedOptions && (
          <div className="pt-6">
            <nav aria-label="Breadcrumb">
              <ol
                role="list"
                className="mx-auto flex max-w-7xl items-center space-x-2 px-4 sm:px-6 lg:px-8"
              >
                <li>
                  <div className="flex items-center">
                    <Link
                      href="/product"
                      className="mr-2 text-sm font-medium text-gray-900"
                    >
                      제품
                    </Link>
                    <svg
                      width="16"
                      height="20"
                      viewBox="0 0 16 20"
                      fill="currentColor"
                      aria-hidden="true"
                      className="h-5 w-4 text-gray-300"
                    >
                      <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                    </svg>
                  </div>
                </li>
                <li className="text-sm">
                  <Link
                    href={`/product/${productData.id}`}
                    aria-current="page"
                    className="font-medium text-gray-500 hover:text-gray-600"
                  >
                    {productData.title}
                  </Link>
                </li>
              </ol>
            </nav>

            <div
              className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl 
            lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16"
            >
              <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                <ImageGallery
                  images={productData.images.map((image) => image.secure_url)}
                />
              </div>

              {/* <!-- Options --> */}
              <div className="relative mt-4 lg:row-span-3 lg:mt-0">
                <div className="sticky top-20">
                  <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                    {productData.title}
                  </h1>

                  <form className="mt-6">
                    {productData.options.map((option) => {
                      return (
                        <Option
                          key={option.id}
                          id={option.id}
                          title={option.title}
                          optionItmes={option.optionItems}
                          selectedOptions={selectedOptions}
                          setSelectedOptions={setSelectedOptions}
                        />
                      );
                    })}

                    <div className="mt-6 pt-4 flex flex-col text-gray-900 border-t border-gray-200">
                      <span className="mb-4 font-semibold">수량</span>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">
                          {productData.title}
                          {selectedOptions.map((opt) => ` / ${opt.title}`)}
                        </span>

                        <div className="ml-4 shrink-0 flex items-center text-lg font-semibold border border-gray-200">
                          <button
                            className="p-1 border-r border-gray-200"
                            onClick={(e) => {
                              e.preventDefault();
                              if (qty < 2) return;
                              setQty(qty - 1);
                            }}
                          >
                            <MinusIcon className="w-6 h-6" />
                          </button>
                          <span className="px-4 text-sm font-semibold">
                            {qty}
                          </span>
                          <button
                            className="p-1 border-l border-gray-200"
                            onClick={(e) => {
                              e.preventDefault();
                              setQty(qty + 1);
                            }}
                          >
                            <PlusIcon className="w-6 h-6" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 flex justify-between items-center border-t border-gray-200">
                      <span className="font-semibold">총 합계</span>
                      <p className="text-base tracking-tight text-gray-900">
                        {price.toLocaleString("ko-KR")} 원
                      </p>
                    </div>

                    <div className="mt-10 w-full flex items-center gap-x-4">
                      <button
                        type="button"
                        className="flex w-full items-center justify-center rounded-md border border-transparent 
                        py-3 text-sm font-medium text-gray-900 shadow hover:translate-y-[1px] hover:shadow-lg
                        transition-all focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                        onClick={onAddCartClicked}
                      >
                        <AddCartIcon className="mr-2 w-6 h-6" />
                        카트에 담기
                      </button>
                      <button
                        type="button"
                        className="flex w-full items-center justify-center rounded-md border border-transparent 
                        py-3 text-sm font-semibold text-white bg-orange-500 shadow 
                        hover:translate-y-[1px] hover:shadow-lg hover:bg-orange-400 transition-all 
                        focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                      >
                        바로 주문하기
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              <div
                className="mt-10 py-6 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 
              lg:pb-16 lg:pr-8 lg:pt-6"
              >
                <div
                  className="z-10 sticky top-[80px] mb-10  w-full flex justify-center items-center gap-2 
                  border-y border-gray-200 bg-white"
                >
                  <h2
                    className={`${
                      !isReviewShown && "border-b border-gray-400 font-semibold"
                    } p-4 text-base font-medium text-gray-900 cursor-pointer transition-all`}
                    onClick={() => setIsReviewShown(false)}
                  >
                    제품 정보
                  </h2>
                  <h2
                    className={`${
                      isReviewShown && "border-b border-gray-400 font-semibold"
                    } p-4 text-base font-medium text-gray-900 cursor-pointer transition-all`}
                    onClick={() => setIsReviewShown(true)}
                  >
                    리뷰
                  </h2>
                </div>

                {!isReviewShown ? (
                  <div className="relative w-full">
                    {productData.detailImage ? (
                      <Image
                        className="w-full h-auto"
                        src={productData.detailImage.secure_url}
                        alt="제품 상세 정보 이미지"
                        quality={100}
                        width="0"
                        height="0"
                        sizes="100vw 100vh"
                      />
                    ) : (
                      <div className="mt-10 w-full flex flex-col justify-center items-center">
                        <SadIcon className="w-24 h-24 text-gray-800" />
                        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900">
                          설명이 없습니다
                        </h1>
                        <p className="mt-2 text-sm font-medium leading-7 text-gray-800">
                          등록되어 있는 제품 상세 설명이 없습니다.
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="w-full flex flex-col">
                    {productData.reviews?.length > 0 ? (
                      productData.reviews.map((review) => {
                        return (
                          <Review
                            key={review.id}
                            name={review.name}
                            rating={review.rating}
                            updatedAt={review.updatedAt}
                            images={review.images}
                            content={review.content}
                          />
                        );
                      })
                    ) : (
                      <div className="w-full flex flex-col justify-center items-center">
                        <SadIcon className="w-24 h-24 text-gray-800" />
                        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900">
                          리뷰가 없습니다
                        </h1>
                        <p className="mt-2 text-sm font-medium leading-7 text-gray-800">
                          등록되어 있는 제품 리뷰가 없습니다.
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </section>

      <Modal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        title="로그인이 필요합니다!"
        content="로그인이 필요한 컨텐츠 입니다. 로그인 하시겠습니까?"
        btnTitle="로그인"
        callback={() => {
          router.push("/login");
        }}
      />

      <Notification
        isOpen={isNotifOpen}
        setIsOpen={setIsNotifOpen}
        content={notifInfo.content}
        btnTitle={notifInfo.btnTitle}
        callback={notifInfo.callback}
      />

      <Loader isLoading={!productData && !selectedOptions} />
    </main>
  );
}
