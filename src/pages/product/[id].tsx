import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";

import ImageGallery from "components/Product/ImageGallery";
import Option from "components/Product/Option";
import Review from "components/Product/Review";
import Modal from "components/Modal";
import Notification from "components/Notification";

import detailImage from "assets/product-detail.png";
import PlusIcon from "assets/icon/plus.svg";
import MinusIcon from "assets/icon/minus.svg";
import AddCartIcon from "assets/icon/addCart.svg";

export type SelectedOptionType = {
  optionId: string;
  optionItemId: string;
  title: string;
  value: number;
};

const tdata = {
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
      optionItems: [
        { id: "1", title: "50ml", value: 0, stock: 11 },
        { id: "2", title: "80ml", value: 5000, stock: 200 },
        { id: "3", title: "120ml", value: 8000, stock: 0 },
      ],
    },
    {
      id: "2",
      title: "색상",
      optionItems: [
        { id: "1", title: "파랑", value: 0, stock: 11 },
        { id: "2", title: "노랑", value: 5000, stock: 200 },
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

export default function ProductDetail() {
  const { data } = useSession();
  const router = useRouter();
  const [productData, setProductData] = useState(null);
  const [price, setPrice] = useState<number>(tdata.price);
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
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptionType[]>(
    tdata.options.map((option) => {
      return {
        optionId: option.id,
        optionItemId: option.optionItems[0].id,
        title: option.optionItems[0].title,
        value: option.optionItems[0].value,
      };
    })
  );

  useEffect(() => {
    // 제품 데이터를 불러온다
    const getProductData = async () => {
      const { data } = await axios.get(`/api/product/${router.query.id}`);
      setProductData(data.data);
    };

    if (router.isReady) getProductData();
  }, [router.isReady, router.query.id]);

  // 옵션 및 수량선택 마다 가격 업데이트
  useEffect(() => {
    let tmpPrice = tdata.price;
    selectedOptions.forEach((opt) => (tmpPrice += opt.value));
    setPrice(tmpPrice * qty);
  }, [selectedOptions, qty]);

  const onAddCartClicked = async () => {
    if (!data) {
      // 로그인을 안했으면 로그인 의사를 물어본다.
      setIsModalOpen(true);
    } else {
      try {
        await axios.post("/api/cart/item", {
          userId: data.user?.id,
          productId: router.query.id,
          title:
            tdata.title +
            " / " +
            selectedOptions.map((opt) => opt.title).join(" / "),
          image: tdata.images[0],
          price: price,
          quantity: qty,
        });

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
          console.log("카트에 동일한 물품을 넣을 수 없습니다. " + error);

          setNotifInfo({
            content: "카트에 이미 동일한 물품이 있습니다.",
            btnTitle: "",
            callback: () => {},
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

  const renderOptions = tdata.options.map((option) => {
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
  });

  const renderReviews = tdata.reviews.map((review) => {
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
                  href={`/product/${tdata.id}`}
                  aria-current="page"
                  className="font-medium text-gray-500 hover:text-gray-600"
                >
                  {tdata.title}
                </Link>
              </li>
            </ol>
          </nav>

          <div
            className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl 
            lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16"
          >
            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
              <ImageGallery images={tdata.images} />
            </div>

            {/* <!-- Options --> */}
            <div className="relative mt-4 lg:row-span-3 lg:mt-0">
              <div className="sticky top-20">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                  {tdata.title}
                </h1>

                <form className="mt-6">
                  {renderOptions}

                  <div className="mt-6 pt-4 flex flex-col text-gray-900 border-t border-gray-200">
                    <span className="mb-4 font-semibold">수량</span>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">
                        {tdata.title}
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
                  <Image
                    className="w-full h-auto"
                    src={tdata.detailImg}
                    alt="제품 상세 정보 이미지"
                    quality={100}
                    width="0"
                    height="0"
                    sizes="100vw 100vh"
                  />
                </div>
              ) : (
                <div className="w-full flex flex-col">{renderReviews}</div>
              )}
            </div>
          </div>
        </div>
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
    </main>
  );
}
