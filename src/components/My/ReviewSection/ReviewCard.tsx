import { useState } from "react";
import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";
import Image from "next/image";

import { notificationAtom } from "common/recoil/atom";
import { ReviewType } from "common/types/product";
import NoImage from "components/NoImage";
import Modal from "components/Modal";
import StarIcon from "assets/icon/star.svg";
import EditIcon from "assets/icon/pen.svg";
import DeleteIcon from "assets/icon/delete.svg";
import isoTimeToKRdate from "common/utils/isoTimeToKRdate";
import axios from "axios";

type ReviewCardProps = {
  review: ReviewType;
};

export default function ReviewCard({ review }: ReviewCardProps) {
  const router = useRouter();
  const setNotification = useSetRecoilState(notificationAtom);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const deleteReview = async () => {
    try {
      await axios.delete(`/api/review/${review.id}`);

      setIsModalOpen(false);
      router.reload();
      setNotification({
        isOpen: true,
        content: "성공적으로 리뷰를 삭제했습니다.",
      });
    } catch (error) {
      console.log("리뷰를 삭제하는 도중 에러가 발생했습니다. " + error);
      setNotification({
        isOpen: true,
        content: "리뷰를 삭제하는 도중 에러가 발생했습니다.",
      });
    }
  };

  return (
    <div className="p-2 w-full rounded-md shadow sm:p-4">
      <div className="w-full flex">
        <div
          className="relative flex-shrink-0 w-28 h-28 bg-gray-200 rounded-md 
            overflow-hidden animate-pulse"
        >
          {review.images.length > 0 ? (
            <Image
              className="w-full h-full object-cover object-center"
              src={review.images[0].secure_url}
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
          <div className="w-full flex justify-between">
            <div className="flex flex-col">
              <h2 className="mt-1 font-semibold">{review.product.title}</h2>

              <div className="mt-2 flex w-[100px]">
                <StarIcon
                  className={`${
                    review.rating >= 1 ? "text-orange-400" : "text-gray-200"
                  } cursor-pointer transition-all`}
                />
                <StarIcon
                  className={`${
                    review.rating >= 2 ? "text-orange-400" : "text-gray-200"
                  } cursor-pointer transition-all`}
                />
                <StarIcon
                  className={`${
                    review.rating >= 3 ? "text-orange-400" : "text-gray-200"
                  } cursor-pointer transition-all`}
                />
                <StarIcon
                  className={`${
                    review.rating >= 4 ? "text-orange-400" : "text-gray-200"
                  } cursor-pointer transition-all`}
                />
                <StarIcon
                  className={`${
                    review.rating >= 5 ? "text-orange-400" : "text-gray-200"
                  } cursor-pointer transition-all`}
                />
              </div>
            </div>

            <p className="text-xs">
              {isoTimeToKRdate(review.createdAt).split(" ")[0]}
            </p>
          </div>

          <div className="mt-auto ml-auto flex gap-x-4">
            <button
              className="p-2 w-fit h-fit flex justify-center items-center text-orange-500
                rounded-lg shadow hover:bg-orange-400 hover:text-white transition-all"
              onClick={() => router.push(`/my/review/update/${review.id}`)}
            >
              <EditIcon className="w-5 h-5" />
            </button>
            <button
              className="p-2 w-fit h-fit flex justify-center items-center text-red-500
                  rounded-lg shadow hover:bg-red-500 hover:text-white transition-all"
              onClick={() => setIsModalOpen(true)}
            >
              <DeleteIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        title="삭제하시겠습니까?"
        content={`정말로 ${review.product.title}에 대한 리뷰를 삭제하시겠습니까?`}
        btnTitle="확인"
        callback={deleteReview}
      />
    </div>
  );
}
