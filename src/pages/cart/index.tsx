import { useEffect, useState } from "react";
import CartItem from "components/Cart/CartItem";
import { CartItemType } from "common/types/cart";
import Link from "next/link";
import prisma from "common/lib/prisma";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

const data = {
  id: "1",
  itmes: [
    {
      id: "1",
      productId: "1",
      title: "레시틴 콩크림 / 80ml / 노랑",
      image:
        "https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg",
      price: 38000,
      quantity: 1,
    },
    {
      id: "2",
      productId: "2",
      title: "레시틴 콩크림 / 120ml / 파랑",
      image:
        "https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg",
      price: 43000,
      quantity: 2,
    },
  ],
};

export default function Cart({
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [cartItems, setCartItems] = useState<CartItemType[]>(data.itmes);
  const [totalPrice, setTotalPrice] = useState<number>(() => {
    let price = 0;
    data.itmes.forEach((item) => (price += item.price * item.quantity));
    return price;
  });
  console.log(user);

  useEffect(() => {
    let price = 0;
    cartItems.forEach((item) => (price += item.price * item.quantity));
    setTotalPrice(price);
  }, [cartItems]);

  const renderItem = cartItems.map((item) => {
    return (
      <CartItem
        key={item.id}
        productId={item.productId}
        title={item.title}
        image={item.image}
        price={item.price}
        quantity={item.quantity}
        cartItems={cartItems}
        setCartItems={setCartItems}
      />
    );
  });

  return (
    <article className="flex flex-col items-center justify-between">
      <section
        className="mx-auto max-w-3xl px-4 py-16 pt-10 w-full text-center
          sm:px-6 sm:py-24 sm:pt-20 lg:px-8"
      >
        {user.email}
        <h2 className="mb-2 text-3xl font-bold text-gray-900">카트 목록</h2>
        <div className="mt-8 ">
          <ul
            role="list"
            className="mt-8 divide-y divide-gray-200 border-y border-gray-200"
          >
            {renderItem}
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
          <Link
            href="/order"
            className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
          >
            주문하기
          </Link>
        </div>
        <div className="mt-6 flex justify-center text-center text-xs text-gray-500">
          <p>
            또는
            <Link
              href="/product"
              className="ml-1 text-sm font-medium text-indigo-600 hover:text-indigo-500"
            >
              계속 쇼핑하기
            </Link>
          </p>
        </div>
      </section>
    </article>
  );
}

export const getServerSideProps: GetServerSideProps<{
  user: any;
}> = async () => {
  const user = await prisma.user.findUnique({
    where: { email: "rr1747@naver.com" },
  });

  return {
    props: { user },
  };
};
