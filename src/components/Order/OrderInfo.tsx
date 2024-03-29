import { OrderItemsAtomType } from "common/recoil/atom";
import OrderItem from "./OrderItem";

type OrderInfoProps = {
  orderItems: OrderItemsAtomType[] | null;
};

export default function OrderInfo({ orderItems }: OrderInfoProps) {
  return (
    <div className="p-4">
      <div className="w-full">
        <h2 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
          주문 정보
        </h2>
      </div>

      <ul role="list" className="w-full divide-y divide-gray-100">
        {orderItems &&
          orderItems.map((item, idx) => {
            return <OrderItem key={idx} item={item} />;
          })}
      </ul>

      <div
        className="mb-6 pt-2 flex justify-between items-center font-medium text-gray-900
          border-t border-gray-300"
      >
        <p>총 금액</p>
        <p className="text-sm">
          <strong className="text-base">
            {orderItems
              ?.reduce((acc, item) => acc + item.price, 0)
              .toLocaleString("ko-KR")}
          </strong>{" "}
          원
        </p>
      </div>
    </div>
  );
}
