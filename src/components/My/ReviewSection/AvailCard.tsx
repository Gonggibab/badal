import Image from "next/image";

import { OrderItemType } from "common/types/order";
import NoImage from "components/NoImage";
import Link from "next/link";

type AvailCardProps = {
  item: OrderItemType;
};

export default function AvailCard({ item }: AvailCardProps) {
  return (
    <div className="p-4 w-full rounded-md shadow">
      <div className="w-full flex">
        <div
          className="relative flex-shrink-0 w-28 h-28 bg-gray-200 rounded-md 
            overflow-hidden animate-pulse"
        >
          {item.image ? (
            <Image
              className="w-full h-full object-cover object-center"
              src={item.image}
              alt="주문 제품 이미지"
              fill
              sizes="100vw 100vh"
              priority
            />
          ) : (
            <NoImage />
          )}
        </div>
        <div className="w-full ml-4 flex flex-col">
          <h2 className="mt-1 font-semibold">{item.title}</h2>
          <p className="mt-2 text-xs text-orange-500">
            해당 제품은 어떠셨나요?
          </p>
          <Link
            href={`/my/review/${item.title}`}
            className="mt-auto py-2.5 w-full flex justify-center items-center font-semibold tracking-wider	
              text-white text-sm bg-orange-500 rounded-lg hover:bg-orange-400 transition-all"
          >
            리뷰 작성하기
          </Link>
        </div>
      </div>
    </div>
  );
}
