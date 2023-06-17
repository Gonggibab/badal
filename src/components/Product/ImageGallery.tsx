import { useState } from "react";
import Image from "next/image";

import ImageIcon from "assets/icon/image.svg";
import NoImage from "components/NoImage";

type ImageGalleryProps = {
  images: string[];
};

export default function ImageGallery({ images }: ImageGalleryProps) {
  const [index, setIndex] = useState<number>(0);

  const renderImages = images.map((image, idx) => {
    return (
      <div
        key={idx}
        className="aspect-h-4 aspect-w-5 overflow-hidden rounded-lg cursor-pointer
          bg-gray-200 animate-pulse transition-all hover:opacity-75"
        onClick={() => setIndex(idx)}
      >
        <div className="flex items-center justify-center w-full h-full animate-pulse">
          <ImageIcon className="w-12 h-12 text-gray-100" />
        </div>

        <Image
          className="h-full w-full object-cover object-center rounded-lg"
          src={image}
          alt="제품 이미지"
          fill
          sizes="100vw 100vh"
          priority
        />
      </div>
    );
  });

  return (
    <div className="mx-auto pb-6 max-w-2xl grid gap-2 lg:pb-8 lg:gap-4 lg:max-w-7xl">
      <div className="aspect-h-3 aspect-w-4 overflow-hidden rounded-lg bg-gray-200 animate-pulse">
        <div className="flex items-center justify-center w-full h-full animate-pulse">
          <ImageIcon className="w-14 h-14 text-gray-100" />
        </div>
        {images.length > 0 ? (
          <Image
            className="h-full w-full object-cover object-center"
            src={images[index]}
            alt="제품 이미지"
            fill
            sizes="100vw 100vh"
          />
        ) : (
          <NoImage />
        )}
      </div>
      <div className="grid grid-cols-5 gap-2 lg:gap-4">{renderImages}</div>
    </div>
  );
}
