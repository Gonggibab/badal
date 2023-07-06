import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

import { ReviewType } from "common/types/product";
import { OrderType } from "common/types/order";
import NoRecordIcon from "assets/icon/noRecord.svg";

type ReviewSectionProps = {
  userId: string | undefined;
};

export default function ReviewSection({ userId }: ReviewSectionProps) {
  const [reviews, setReviews] = useState<ReviewType[] | null>(null);

  useEffect(() => {
    const getReviewData = async () => {
      if (!userId) return;

      const reviewRes = await axios.get(`/api/review?userId=${userId}`);
      const reviews: ReviewType[] = reviewRes.data.data;
      setReviews(reviews);

      const orderRes = await axios.get(`/api/order?userId=${userId}`);
      const orders: OrderType[] = orderRes.data.data;

      console.log(orders);
    };

    getReviewData();
  }, [userId]);

  return (
    <section className="mt-4 relative w-full max-w-4xl">
      {reviews && (
        <>
          <div className="my-4 w-full flex flex-col rounded-md shadow"></div>

          {reviews.length > 0 ? (
            <div className="my-4 pt-4 w-full grid grid-cols-1 gap-x-4 gap-y-3 md:grid-cols-2"></div>
          ) : (
            <div className="mt-14 w-full flex flex-col justify-center items-center">
              <NoRecordIcon className="w-32 h-32" />
              <p className="text-xl text-orange-500 font-semibold">
                등록한 리뷰가 없습니다
              </p>
              <Link
                href={"/product"}
                className="mt-8 px-3 py-2 text-sm font-semibold text-white bg-orange-500 rounded-md
                  transition-all hover:bg-orange-400"
              >
                제품 보러가기
              </Link>
            </div>
          )}
        </>
      )}
    </section>
  );
}
