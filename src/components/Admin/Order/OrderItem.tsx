import { useState } from "react";
import Link from "next/link";

import { OrderStatus, OrderType } from "common/types/order";
import StatusSelectList from "./StatusSelectList";
import isoTimeToKRdate from "common/utils/isoTimeToKRdate";

type OrderItemProps = {
  item: OrderType;
};

const StatusColor = {
  READY: "text-gray-600",
  IN_DELIVERY: "text-gray-600",
  DONE: "text-gray-600",
  CANCLED: "text-gray-600",
  REFUND_REQUESTED: "text-gray-600",
  REFUND_COMPLETE: "text-gray-600",
};

export default function OrderItem({ item }: OrderItemProps) {
  const [status, setStatus] = useState<OrderStatus>(item.status);

  return (
    <tr className="bg-white border-b hover:bg-gray-50">
      <th
        scope="row"
        className={`${StatusColor[status]} px-4 py-3 font-semibold whitespace-nowrap`}
      >
        <StatusSelectList status={status} setStatus={setStatus} />
      </th>
      <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">
        <Link href={`/admin/order/${item.id}`} className="hover:underline">
          {item.orderId}
        </Link>
      </td>
      <td className="px-4 py-3 whitespace-nowrap">
        {item.user ? "회원" : "비회원"}
      </td>
      <td className="px-4 py-3 whitespace-nowrap">{item.address.name}</td>
      <td className="px-4 py-3 whitespace-nowrap">{item.title}</td>
      <td className="px-4 py-3 whitespace-nowrap">
        {item.price.toLocaleString()}
      </td>
      <td className="px-4 py-3 whitespace-nowrap">
        {isoTimeToKRdate(item.createdAt)}
      </td>
    </tr>
  );
}
