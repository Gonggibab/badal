import { useEffect, useState } from "react";
import axios from "axios";

import { ReviewType } from "common/types/product";
import { OrderItemType, OrderStatus, OrderType } from "common/types/order";
import NeutralFaceIcon from "assets/icon/neutral.svg";
import AvailCard from "./AvailCard";
import ReviewCard from "./ReviewCard";

type ReviewSectionProps = {
  userId: string | undefined;
};

export default function ReviewSection({ userId }: ReviewSectionProps) {
  const [reviewAvails, setReviewAvails] = useState<OrderItemType[] | null>(
    null
  );
  const [reviews, setReviews] = useState<ReviewType[] | null>(null);

  useEffect(() => {
    const getReviewData = async () => {
      if (!userId) return;

      const reviewRes = await axios.get(`/api/review?userId=${userId}`);
      const reviews: ReviewType[] = reviewRes.data.data;
      setReviews(reviews);

      // 한달 간의 주문 기록 중 리뷰를 작성하지 않은 제품 목록을 가져옴.
      const date = new Date();
      date.setDate(date.getDate() - 30);

      const orderRes = await axios.get(
        `/api/order?userId=${userId}&gte=${date}`
      );
      const orders: OrderType[] = orderRes.data.data;

      const items: OrderItemType[] = orders
        .filter((order) => {
          return order.status === OrderStatus.DONE;
        })
        .flatMap((order) =>
          order.orderItems.filter(
            (item) =>
              !reviews.some((review) => review.product.title === item.title)
          )
        );
      setReviewAvails(items);
    };

    getReviewData();
  }, [userId]);

  return (
    <section className="mt-4 relative w-full max-w-4xl">
      <figure className="border-b border-gray-900/10 pt-6 pb-12">
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          리뷰 작성 가능 제품
        </h2>
        <p className="text-xs leading-6 text-gray-600">
          회원님의 소중한 리뷰를 남겨주세요.
        </p>

        {reviewAvails && reviewAvails.length > 0 ? (
          <div className="mt-6 w-full grid grid-cols-1 gap-x-4 gap-y-3 md:grid-cols-2">
            {reviewAvails.map((item) => (
              <AvailCard key={item.title} item={item} />
            ))}
          </div>
        ) : (
          <div className="mt-14 w-full flex flex-col justify-center items-center">
            <NeutralFaceIcon className="w-20 h-20" />
            <p className="mt-2 font-medium">
              리뷰 등록이 가능한 제품이 없습니다
            </p>
          </div>
        )}
      </figure>

      <figure className="border-gray-900/10 py-6">
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          리뷰 관리
        </h2>
        <p className="text-xs leading-6 text-gray-600">
          회원님이 작성한 리뷰를 관리해보세요.
        </p>
      </figure>

      {reviews && (
        <>
          {reviews.length > 0 ? (
            <div className="my-4 pt-4 w-full grid grid-cols-1 gap-x-4 gap-y-3 md:grid-cols-2">
              {reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          ) : (
            <div className="mt-14 w-full flex flex-col justify-center items-center">
              <NeutralFaceIcon className="w-20 h-20" />
              <p className="mt-2 text-lg font-medium">등록한 리뷰가 없습니다</p>
            </div>
          )}
        </>
      )}
    </section>
  );
}
