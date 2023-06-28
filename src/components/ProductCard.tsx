import { MouseEvent } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useRecoilState, useSetRecoilState } from "recoil";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";

import { ImageType } from "common/types/image";
import {
  cartItemsAtom,
  isUserOrderAtom,
  notificationAtom,
  orderItemsAtom,
} from "common/recoil/atom";
import NoImage from "components/NoImage";
import ImageIcon from "assets/icon/image.svg";
import AddCart from "assets/icon/addCart.svg";
import CardIcon from "assets/icon/creditCard.svg";

type ProductCardProps = {
  id: string;
  image?: ImageType;
  title: string;
  price: number;
};

export default function ProductCard({
  id,
  image,
  title,
  price,
}: ProductCardProps) {
  const router = useRouter();
  const { data } = useSession();
  const setIsUserOrder = useSetRecoilState(isUserOrderAtom);
  const setOrderItems = useSetRecoilState(orderItemsAtom);
  const setNotification = useSetRecoilState(notificationAtom);
  const [cartItems, setCartItems] = useRecoilState(cartItemsAtom);

  const onAddCartClicked = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // 카트에 동일한 물품이 있는지 확인
    const existItem = cartItems.filter((item) => {
      return item.title === title;
    });

    if (existItem.length > 0) {
      setNotification({
        isOpen: true,
        content: "장바구니에 이미 동일한 물품이 있습니다.",
        btnTitle: "장바구니 보기",
        callback: () => {
          router.push("/cart");
        },
      });
      return;
    }

    // 카트 아이템 업데이트
    setCartItems(
      cartItems.concat([
        {
          productId: id,
          title: title,
          image: image ? image.secure_url : undefined,
          price: price,
          quantity: 1,
        },
      ])
    );

    // 회원인 경우에는 데이터 베이스도 업데이트
    if (data) {
      try {
        await axios.post("/api/user/cart/item", {
          userId: data.user?.id,
          productId: id,
          title: title,
          image: image ? image.secure_url : undefined,
          price: price,
          quantity: 1,
        });
      } catch (error) {
        console.log("서버와의 통신중에 오류가 발생했습니다. " + error);

        setNotification({
          isOpen: true,
          content: "서버와의 통신중에 오류가 발생했습니다. 다시 시도해주세요.",
        });
      }
    }

    setNotification({
      isOpen: true,
      content: "장바구니에 추가되었습니다.",
      btnTitle: "장바구니 보기",
      callback: () => {
        router.push("/cart");
      },
    });
  };

  const onPurchaseClicked = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // 회원 주문인지 비회원 주문인지 상태 저장
    if (data) setIsUserOrder(true);
    else setIsUserOrder(false);

    setOrderItems([
      {
        productId: id,
        title: title,
        image: image ? image.secure_url : undefined,
        price: price,
        quantity: 1,
      },
    ]);
    router.push("/order");
  };

  return (
    <Link href={`/product/${id}`} className="group">
      <div
        className="relative aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg 
          bg-gray-200 animate-pulse xl:aspect-h-8 xl:aspect-w-7"
      >
        <div className="flex items-center justify-center w-full h-full">
          <ImageIcon className="w-12 h-12 text-gray-100" />
        </div>

        {image ? (
          <Image
            className="object-cover object-center transition-all group-hover:opacity-75"
            src={image.secure_url}
            alt="상품 이미지"
            fill
            sizes="100vw 100vh"
            placeholder="blur"
            blurDataURL={image.secure_url}
          />
        ) : (
          <NoImage />
        )}
      </div>
      <div className="mt-4 flex justify-between">
        <div className="flex flex-col">
          <h3 className="text-sm text-gray-700">{title}</h3>
          <p className="mt-1 text-lg font-medium text-gray-900">
            {price.toLocaleString("ko-KR")} 원
          </p>
        </div>
        <div className="flex items-center gap-x-4">
          <button
            type="button"
            className="p-2 h-fit rounded-md shadow transition-all hover:shadow-lg hover:translate-y-[1px]"
            onClick={(e) => onAddCartClicked(e)}
          >
            <AddCart className="w-6 h-6" />
          </button>
          <button
            type="button"
            className="p-2 h-fit rounded-md shadow transition-all hover:shadow-lg hover:translate-y-[1px]"
            onClick={(e) => onPurchaseClicked(e)}
          >
            <CardIcon className="w-6 h-6" />
          </button>
        </div>
      </div>
    </Link>
  );
}
