"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import ImageGallery from "common/components/Product/ImageGallery";
import RatingStar from "common/components/Icons/RatingStar";
import Option from "common/components/Product/Option";
import detailImage from "assets/product-detail.png";

type ProductDetailProps = {
  params: { id: string };
};

const data = {
  id: "1",
  title: "레시틴 콩크림",
  images: [
    "https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg",
    "https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg",
    "https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg",
    "https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg",
  ],
  price: 38000,
  rating: 4.2,
  reviews: [],
  options: [
    {
      id: "1",
      title: "용량",
      options: [
        { id: "1", title: "50ml", value: 0, stock: 11 },
        { id: "2", title: "80ml", value: 5000, stock: 200 },
        { id: "3", title: "120ml", value: 8000, stock: 0 },
      ],
    },
  ],
  detailImg: detailImage,
};

export default function ProductDetail({ params }: ProductDetailProps) {
  const [price, setPrice] = useState<number>(data.price);
  const [isReviewShown, setIsReviewShown] = useState<boolean>(false);

  const renderOptions = data.options.map((option) => {
    return (
      <Option
        key={option.id}
        title={option.title}
        options={option.options}
        price={price}
        setPrice={setPrice}
      />
    );
  });

  return (
    <main className="w-screen h-full flex flex-col items-center justify-between">
      <section className="bg-white w-full">
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
                  href={`/product/${data.id}`}
                  aria-current="page"
                  className="font-medium text-gray-500 hover:text-gray-600"
                >
                  {data.title}
                </Link>
              </li>
            </ol>
          </nav>

          <div
            className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl 
            lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16"
          >
            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
              <ImageGallery images={data.images} />
            </div>

            {/* <!-- Options --> */}
            <div className="relative mt-4 lg:row-span-3 lg:mt-0">
              <div className="sticky top-20">
                <h1 className="text-xl font-bold tracking-tight text-gray-900 sm:text-xl">
                  {data.title}
                </h1>
                <p className="mt-2 text-base tracking-tight text-gray-900">
                  {price.toLocaleString("ko-KR")} 원
                </p>

                {/* <!-- Reviews --> */}
                <div className="mt-6">
                  <div className="flex items-center">
                    <div className="flex items-center">
                      <RatingStar
                        size={5}
                        color={
                          data.rating >= 1 ? "text-gray-900" : "text-gray-200"
                        }
                      />
                      <RatingStar
                        size={5}
                        color={
                          data.rating >= 2 ? "text-gray-900" : "text-gray-200"
                        }
                      />
                      <RatingStar
                        size={5}
                        color={
                          data.rating >= 3 ? "text-gray-900" : "text-gray-200"
                        }
                      />
                      <RatingStar
                        size={5}
                        color={
                          data.rating >= 4 ? "text-gray-900" : "text-gray-200"
                        }
                      />
                      <RatingStar
                        size={5}
                        color={
                          data.rating >= 5 ? "text-gray-900" : "text-gray-200"
                        }
                      />
                    </div>
                    <a
                      href="#"
                      className="ml-3 text-sm font-semibold text-indigo-600 hover:text-indigo-500"
                    >
                      {data.reviews.length} 리뷰
                    </a>
                  </div>
                </div>

                <form className="mt-6">
                  {renderOptions}

                  <button
                    type="submit"
                    className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent 
                    bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 
                    focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    장바구니에 추가
                  </button>
                </form>
              </div>
            </div>

            <div
              className="py-6 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 
              lg:pb-16 lg:pr-8 lg:pt-6"
            >
              <div className="mb-10 w-full flex justify-center items-center gap-2 border-b border-gray-200">
                <h2
                  className={`${
                    !isReviewShown && "border-b border-gray-400"
                  } p-4 text-base font-medium text-gray-900 cursor-pointer transition-all`}
                  onClick={() => setIsReviewShown(false)}
                >
                  제품 정보
                </h2>
                <h2
                  className={`${
                    isReviewShown && "border-b border-gray-400"
                  } p-4 text-base font-medium text-gray-900 cursor-pointer transition-all`}
                  onClick={() => setIsReviewShown(true)}
                >
                  리뷰
                </h2>
              </div>

              {!isReviewShown ? (
                <div className="relative w-full">
                  <Image
                    src={data.detailImg}
                    alt="제품 상세 정보 이미지"
                    width="0"
                    height="0"
                    sizes="100vw"
                    className="w-full h-auto"
                  />
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
