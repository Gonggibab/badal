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
  item: CartItemType;
  cartItems: CartItemType[];
  setCartItems: Dispatch<SetStateAction<CartItemType[] | null>>;
};

export default function CartItem({
  item,
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
        await axios.put(`/api/user/cart/item/${item.id}`, {
          quantity: qty,
        });
      }, 1000),
    [item]
  );

  const onMinusClicked = (e: MouseEvent) => {
    e.preventDefault();
    if (item.quantity < 2) return;
    setCartItems(
      cartItems.map((Item) => {
        if (Item.title === item.title) {
          return {
            ...Item,
            quantity: item.quantity - 1,
          };
        }
        return Item;
      })
    );

    debouncedRequest();
  };

  const onPlusClicked = (e: MouseEvent) => {
    e.preventDefault();
    setCartItems(
      cartItems.map((Item) => {
        if (Item.title === item.title) {
          return {
            ...Item,
            quantity: item.quantity + 1,
          };
        }
        return Item;
      })
    );

    debouncedRequest();
  };

  const onDeleteClicked = async () => {
    try {
      await axios.delete(`/api/user/cart/item/${item.id}`);
      setCartSize(cartSize - 1);
      setCartItems(cartItems.filter((Item) => Item.title !== item.title));
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
        {item.image ? (
          <Image
            className="h-full w-full object-cover object-center"
            src={item.image}
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
            <h3 className="text-lg font-semibold">
              <Link
                href={`/product/${item.productId}`}
                className="hover:underline"
              >
                {item.title}
              </Link>
            </h3>
            <p className="ml-4">
              {(item.price * item.quantity).toLocaleString("ko-KR")} 원
            </p>
          </div>
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
              {item.quantity}
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
              className="font-medium text-orange-500 hover:text-orange-400"
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
