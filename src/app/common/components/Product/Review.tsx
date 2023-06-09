"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

import RatingStar from "../Icons/RatingStar";
import ImageInspector from "./ImageInspector";

type ReviewProps = {
  name: string;
  rating: number;
  updatedAt: string;
  images: string[];
  content: string;
};

export default function Review({
  name,
  rating,
  updatedAt,
  images,
  content,
}: ReviewProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [isClampNeeded, setIsClampNeeded] = useState<boolean>(false);
  const [isClamp, setIsClamp] = useState<boolean>(true);
  const [isImageOpen, setIsImageOpen] = useState<boolean>(false);
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    if (!ref.current) return;
    setIsClampNeeded(ref.current.scrollHeight > ref.current.clientHeight);
  }, []);

  const renderImages = images.map((image, idx) => {
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
          src={image}
          alt="제품 이미지"
          fill
          style={{
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
      </div>
    );
  });

  return (
    <article className="py-4 border-b border-gray-300">
      <div className="flex justify-between items-start mb-4 space-x-4">
        <div>
          <div className="flex items-center">
            <RatingStar
              size={5}
              color={rating >= 1 ? "text-yellow-400" : "text-gray-200"}
            />
            <RatingStar
              size={5}
              color={rating >= 2 ? "text-yellow-400" : "text-gray-200"}
            />
            <RatingStar
              size={5}
              color={rating >= 3 ? "text-yellow-400" : "text-gray-200"}
            />
            <RatingStar
              size={5}
              color={rating >= 4 ? "text-yellow-400" : "text-gray-200"}
            />
            <RatingStar
              size={5}
              color={rating >= 5 ? "text-yellow-400" : "text-gray-200"}
            />
          </div>

          <h1 className="mt-2 font-medium text-gray-900">{name[0]}**</h1>
        </div>

        <time
          dateTime="2014-08-16"
          className="block mt-2 text-xs font-medium text-gray-500"
        >
          {updatedAt.replace("T", " ").split(".")[0].split(" ")[0]}
        </time>
      </div>

      {images.length > 0 && (
        <>
          <div className="my-4 grid grid-cols-5 gap-2 lg:gap-4">
            {renderImages}
          </div>

          <ImageInspector
            isOpen={isImageOpen}
            setIsOpen={setIsImageOpen}
            index={index}
            setIndex={setIndex}
            images={images}
          />
        </>
      )}

      <p
        ref={ref}
        className={`${
          isClamp && "line-clamp-4"
        } mb-2 text-sm leading-5 text-gray-900 whitespace-pre-wrap`}
      >
        {content.replaceAll("<br/>", "\r\n")}
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