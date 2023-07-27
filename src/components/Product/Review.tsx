import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

import { ReviewType } from "common/types/product";
import ImageInspector from "./ImageInspector";
import StarIcon from "assets/icon/star.svg";

type ReviewProps = {
  review: ReviewType;
};

export default function Review({ review }: ReviewProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [isClampNeeded, setIsClampNeeded] = useState<boolean>(false);
  const [isClamp, setIsClamp] = useState<boolean>(true);
  const [isImageOpen, setIsImageOpen] = useState<boolean>(false);
  const [index, setIndex] = useState<number>(0);

  console.log(review);

  useEffect(() => {
    if (!ref.current) return;
    setIsClampNeeded(ref.current.scrollHeight > ref.current.clientHeight);
  }, []);

  return (
    <article className="py-4 border-b border-gray-300">
      <div className="flex justify-between items-start mb-4 space-x-4">
        <div>
          <div className="flex items-center">
            <StarIcon
              className={`${
                review.rating >= 1 ? "text-orange-400" : "text-gray-200"
              } w-5 h-5`}
            />
            <StarIcon
              className={`${
                review.rating >= 2 ? "text-orange-400" : "text-gray-200"
              } w-5 h-5`}
            />
            <StarIcon
              className={`${
                review.rating >= 3 ? "text-orange-400" : "text-gray-200"
              } w-5 h-5`}
            />
            <StarIcon
              className={`${
                review.rating >= 4 ? "text-orange-400" : "text-gray-200"
              } w-5 h-5`}
            />
            <StarIcon
              className={`${
                review.rating >= 5 ? "text-orange-400" : "text-gray-200"
              } w-5 h-5`}
            />
          </div>

          <h1 className="mt-2 font-medium text-gray-900">
            {review.user.name[0]}**
          </h1>
        </div>

        <time
          dateTime="2014-08-16"
          className="block mt-2 text-xs font-medium text-gray-500"
        >
          {review.createdAt.replace("T", " ").split(".")[0].split(" ")[0]}
        </time>
      </div>

      {review.images.length > 0 && (
        <>
          <div className="my-4 grid grid-cols-5 gap-2 lg:gap-4">
            {review.images.map((image, idx) => {
              return (
                <div
                  key={idx}
                  className="aspect-h-4 aspect-w-5 overflow-hidden rounded-lg cursor-pointer
                    transition-all hover:opacity-75"
                  onClick={() => {
                    setIsImageOpen(true);
                    setIndex(idx);
                  }}
                >
                  <Image
                    className="h-full w-full object-cover object-center rounded-lg"
                    src={image.secure_url}
                    alt="제품 이미지"
                    fill
                    sizes="100vw 100vh"
                  />
                </div>
              );
            })}
          </div>

          <ImageInspector
            isOpen={isImageOpen}
            setIsOpen={setIsImageOpen}
            index={index}
            setIndex={setIndex}
            images={review.images.map((image) => image.secure_url)}
          />
        </>
      )}

      <p
        ref={ref}
        className={`${
          isClamp && "line-clamp-4"
        } mb-2 text-sm leading-5 text-gray-900 whitespace-pre-wrap`}
      >
        {review.content.replaceAll("<br/>", "\r\n")}
      </p>

      {isClampNeeded && (
        <button
          className="block mb-2 text-sm font-medium text-gray-400 hover:text-gray-600 hover:underline"
          onClick={() => setIsClamp(!isClamp)}
        >
          {isClamp ? "더 보기" : "닫기"}
        </button>
      )}
    </article>
  );
}
