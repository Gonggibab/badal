import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import ImageGallery from "components/Product/ImageGallery";
import Option from "components/Product/Option";
import Review from "components/Product/Review";

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
  reviews: [
    {
      id: "1",
      userId: "1",
      name: "정진우",
      rating: 4,
      updatedAt: "2022-10-09T09:50:04.555+03:00",
      images: [
        "https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg",
        "https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg",
        "https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg",
        "https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg",
      ],
      content:
        "위하여 뜨거운지라, 현저하게 청춘 아니한 있으랴? 심장은 같은 넣는 뿐이다. 되는 그러므로 밥을 공자는 보라. 내려온 넣는 청춘의 싸인 뿐이다. 피가 새가 어디 것은 생생하며, 위하여 내는 꽃 방황하였으며, 아름다우냐? 찾아 든 청춘에서만 이는 불러 노년에게서 것이다. 목숨이 인간의 이상이 철환하였는가? 때까지 얼음과 이상, 설레는 끓는 같이 황금시대를 청춘은 황금시대다. 아니한 있으며, 이상은 황금시대를 그들의 이상 열매를 곳이 피다. 동산에는 쓸쓸한 사랑의 있는 같이 앞이 사랑의 피다.<br/>사랑의 천지는 이성은 없으면 곳이 스며들어 방지하는 구할 피다. 열락의 그들을 있을 천고에 천자만홍이 구하지 이상의 남는 착목한는 듣는다. 생명을 바이며, 대중을 그들은 것은 길지 힘있다. 이상, 놀이 고동을 바이며, 열락의 것이다. 거친 전인 같이, 노래하며 봄날의 것이다. 동산에는 인류의 살 봄바람이다. 불러 방황하여도, 열락의 하는 것이다. 그들의 그들에게 열락의 만물은 부패를 이것이다. 보는 인류의 구할 같이, 사라지지 것이다. 산야에 곳으로 밥을 피가 이것이다. 만물은 꽃이 가슴에 가슴이 없으면 위하여서, 천자만홍이 청춘 이것이다. 기관과 돋고, 뜨거운지라, 예수는 같은 용기가 눈에 듣는다. 찾아다녀도, 많이 심장의 속에서 옷을 청춘 고동을 때문이다.<br/>찾아다녀도, 노년에게서 모래뿐일 되는 같은 인간이 커다란 끝에 이 약동하다. 별과 싸인 있는 때까지 끓는 우는 그들은 철환하였는가? 낙원을 사랑의 얼음에 창공에 있는 너의 투명하되 얼마나 피다. 황금시대의 공자는 눈이 피다. 창공에 있는 대고, 같이, 청춘 이상이 인생에 자신과 칼이다. 영원히 장식하는 넣는 가장 곳이 가진 하는 투명하되 봄바람이다.<br/>주는 노년에게서 광야에서 불러 방지하는 구할 별과 사는가 웅대한 이것이다. 우리 설레는 지혜는 살았으며, 인간이 피부가 눈이 아름다우냐?",
    },
    {
      id: "2",
      userId: "2",
      name: "김모씨",
      rating: 5,
      updatedAt: "2022-11-19T09:50:04.555+03:00",
      images: [],
      content: "좋아요",
    },
  ],
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

  const renderReviews = data.reviews.map((review) => {
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
                    quality={100}
                    width="0"
                    height="0"
                    sizes="100vw"
                    className="w-full h-auto"
                  />
                </div>
              ) : (
                <div className="w-full flex flex-col">{renderReviews}</div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
