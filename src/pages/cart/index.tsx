import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useRecoilState, useSetRecoilState } from "recoil";
import Link from "next/link";
import axios from "axios";

import {
  cartItemsAtom,
  isUserOrderAtom,
  orderItemsAtom,
  useSsrComplectedState,
} from "common/recoil/atom";
import CartItem from "components/Cart/CartItem";
import Loader from "components/Loader/Loader";
import EmptyCartIcon from "assets/icon/emptyCart.svg";

export default function Cart() {
  const router = useRouter();
  const { data } = useSession();
  const setIsUserOrder = useSetRecoilState(isUserOrderAtom);
  const setOrderItems = useSetRecoilState(orderItemsAtom);
  const [cartItems, setCartItems] = useRecoilState(cartItemsAtom);
  const [totalPrice, setTotalPrice] = useState<number>(() => {
    let price = 0;
    cartItems?.forEach((item) => (price += item.price * item.quantity));
    return price;
  });

  // Recoil Persist Hydration 에러로 인해 SSR 체크
  const setSsrCompleted = useSsrComplectedState();
  useEffect(setSsrCompleted, [setSsrCompleted]);

  // 회원인 경우 카트 데이터를 불러온다
  useEffect(() => {
    if (!data?.user) return;

    const getCartData = async () => {
      const cart = await axios.get(`/api/user/cart/${data?.user?.id}`);
      setCartItems(cart.data.data.items);
    };

    getCartData();
  }, [data, setCartItems]);

  useEffect(() => {
    if (!cartItems) return;
    setTotalPrice(
      cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
    );
  }, [cartItems]);

  return (
    <main className="flex flex-col items-center justify-between">
      {cartItems && cartItems.length === 0 ? (
        <section className="pb-10 h-[calc(90vh-80px)] flex flex-col justify-center items-center">
          <EmptyCartIcon className="w-28 h-28" />
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900">
            장바구니가 비어 있습니다.
          </h1>
          <p className="mt-4 text-base leading-7 text-gray-600">
            사고 싶은 제품을 골라 담아보세요.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/product"
              className="rounded-md bg-orange-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm
                hover:bg-orange-400 focus-visible:outline focus-visible:outline-2  
                focus-visible:outline-offset-2 focus-visible:outline-orange-500"
            >
              제품 보러가기
            </Link>
          </div>
        </section>
      ) : (
        <section
          className="mx-auto max-w-3xl px-4 py-16 pt-10 w-full text-center
              sm:px-6 sm:py-24 sm:pt-20 lg:px-8"
        >
          <h2 className="mb-2 text-3xl font-bold text-gray-900">카트 목록</h2>
          <div className="mt-8">
            <ul
              role="list"
              className="mt-8 divide-y divide-gray-200 border-y border-gray-200"
            >
              {cartItems &&
                cartItems.map((item) => {
                  return <CartItem key={item.title} item={item} />;
                })}
            </ul>
          </div>

          <div className="mt-10 mb-6 flex justify-between items-center font-medium text-gray-900">
            <p>총 금액</p>
            <p className="text-sm">
              <strong className="text-base">
                {totalPrice.toLocaleString("ko-KR")}
              </strong>{" "}
              원
            </p>
          </div>
          <div className="mt-6">
            <button
              type="button"
              className="w-full flex items-center justify-center rounded-md border border-transparent 
              bg-orange-500 px-6 py-3 text-base font-medium text-white shadow hover:bg-orange-600
                hover:translate-y-[1px] transition-all"
              onClick={() => {
                // 회원 주문인지 비회원 주문인지 상태 저장
                if (data) setIsUserOrder(true);
                else setIsUserOrder(false);

                setOrderItems(cartItems);
                router.push("/order");
              }}
            >
              주문하기
            </button>
          </div>
          <div className="mt-6 flex justify-center text-center text-xs text-gray-500">
            <p>
              또는
              <Link
                href="/product"
                className="ml-1 text-sm font-medium text-orange-500 hover:text-orange-400"
              >
                계속 쇼핑하기
              </Link>
            </p>
          </div>
        </section>
      )}

      <Loader isLoading={!cartItems} />
    </main>
  );
}
