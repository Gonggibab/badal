import { Dispatch, MouseEvent, SetStateAction, useRef, useMemo } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";

import { cartSizeAtom, notificationAtom } from "common/recoil/atom";
import { CartItemType } from "common/types/user";
import NoImage from "components/NoImage";
import PlusIcon from "assets/icon/plus.svg";
import MinusIcon from "assets/icon/minus.svg";
import debounce from "common/utils/debounce";

type CartItemProps = {
  itemId: string;
  productId: string;
  title: string;
  image?: string;
  price: number;
  quantity: number;
  cartItems: CartItemType[];
  setCartItems: Dispatch<SetStateAction<CartItemType[] | null>>;
};

export default function CartItem({
  itemId,
  productId,
  title,
  image,
  price,
  quantity,
  cartItems,
  setCartItems,
}: CartItemProps) {
  const qtyRef = useRef<HTMLElement>(null);
  const [cartSize, setCartSize] = useRecoilState(cartSizeAtom);
  const setNotification = useSetRecoilState(notificationAtom);

  // 제품 수량 변경 버튼에 의한 과도한 요청에 대비해 디바운싱 함
  const debouncedRequest = useMemo(
    () =>
      debounce(async () => {
        const qty = Number(qtyRef.current?.innerText);
        await axios.put(`/api/user/cart/item/${itemId}`, {
          quantity: qty,
        });
      }, 1000),
    [itemId]
  );

  const onMinusClicked = (e: MouseEvent) => {
    e.preventDefault();
    if (quantity < 2) return;
    setCartItems(
      cartItems.map((item) => {
        if (item.id === itemId) {
          return {
            ...item,
            quantity: quantity - 1,
          };
        }
        return item;
      })
    );

    debouncedRequest();
  };

  const onPlusClicked = (e: MouseEvent) => {
    e.preventDefault();
    setCartItems(
      cartItems.map((item) => {
        if (item.id === itemId) {
          return {
            ...item,
            quantity: quantity + 1,
          };
        }
        return item;
      })
    );

    debouncedRequest();
  };

  const onDeleteClicked = async () => {
    try {
      await axios.delete(`/api/user/cart/item/${itemId}`);
      setCartSize(cartSize - 1);
      setCartItems(cartItems.filter((item) => item.id !== itemId));
      setNotification({
        isOpen: true,
        content: "물품을 성공적으로 삭제했습니다.",
      });
    } catch (error) {
      setNotification({
        isOpen: true,
        content: "에러가 발생했습니다. 다시 시도해 주세요.",
      });
    }
  };

  return (
    <li className="flex py-6">
      <div
        className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md 
          border border-gray-200 sm:h-32 sm:w-32"
      >
        {image ? (
          <Image
            className="h-full w-full object-cover object-center"
            src={image}
            alt="상품 이미지"
            fill
            sizes="100vw 100vh"
            priority
          />
        ) : (
          <NoImage />
        )}
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3>
              <Link href={`/product/${productId}`} className="hover:underline">
                {title.split("/")[0]}
              </Link>
            </h3>
            <p className="ml-4">
              {(price * quantity).toLocaleString("ko-KR")} 원
            </p>
          </div>
          <p className="mt-1 text-sm text-gray-500 text-left">
            {title.split("/").splice(1).join(" / ")}
          </p>
        </div>
        <div className="flex flex-1 items-end justify-between text-sm">
          <div className="shrink-0 flex items-center text-lg font-semibold border border-gray-200">
            <button
              className="p-1 border-r border-gray-200"
              onClick={(e) => onMinusClicked(e)}
            >
              <MinusIcon className="w-6 h-6" />
            </button>
            <span ref={qtyRef} className="px-4 text-sm font-semibold">
              {quantity}
            </span>
            <button
              className="p-1 border-l border-gray-200"
              onClick={(e) => onPlusClicked(e)}
            >
              <PlusIcon className="w-6 h-6" />
            </button>
          </div>

          <div className="flex">
            <button
              type="button"
              className="font-medium text-indigo-600 hover:text-indigo-500"
              onClick={onDeleteClicked}
            >
              삭제
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}
