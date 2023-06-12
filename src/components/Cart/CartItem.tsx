import { Dispatch, MouseEvent, SetStateAction } from "react";
import Image from "next/image";
import Link from "next/link";

import PlusIcon from "assets/icon/plus.svg";
import MinusIcon from "assets/icon/minus.svg";
import { CartItemType } from "common/types/cart";

type CartItemProps = {
  productId: string;
  title: string;
  image: string;
  price: number;
  quantity: number;
  cartItems: CartItemType[];
  setCartItems: Dispatch<SetStateAction<CartItemType[]>>;
};

export default function CartItem({
  productId,
  title,
  image,
  price,
  quantity,
  cartItems,
  setCartItems,
}: CartItemProps) {
  const onMinusClicked = (e: MouseEvent) => {
    e.preventDefault();
    if (quantity < 2) return;

    setCartItems(
      cartItems.map((item) => {
        if (item.productId === productId) {
          return {
            ...item,
            quantity: quantity - 1,
          };
        }
        return item;
      })
    );
  };

  const onPlusClicked = (e: MouseEvent) => {
    e.preventDefault();
    setCartItems(
      cartItems.map((item) => {
        if (item.productId === productId) {
          return {
            ...item,
            quantity: quantity + 1,
          };
        }
        return item;
      })
    );
  };

  const onDeleteClicked = () => {
    setCartItems(cartItems.filter((item) => item.productId !== productId));
  };

  return (
    <li className="flex py-6">
      <div
        className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md 
          border border-gray-200 sm:h-32 sm:w-32"
      >
        <Image
          className="h-full w-full object-cover object-center"
          src={image}
          alt="상품 이미지"
          fill
          sizes="100vw 100vh"
          priority
        />
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3>
              <Link href={`/product/${productId}`}>{title.split("/")[0]}</Link>
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
            <span className="px-4 text-sm font-semibold">{quantity}</span>
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
