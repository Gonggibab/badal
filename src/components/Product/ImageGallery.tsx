import { useState } from "react";
import Image from "next/image";

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
        transition-all hover:opacity-75"
        onClick={() => setIndex(idx)}
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
    <div className="mx-auto pb-6 max-w-2xl grid gap-2 lg:pb-8 lg:gap-4 lg:max-w-7xl">
      <div className="aspect-h-3 aspect-w-4 overflow-hidden rounded-lg">
        <Image
          className="h-full w-full object-cover object-center"
          src={images[index]}
          alt="제품 이미지"
          fill
          style={{
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
      </div>
      <div className="grid grid-cols-5 gap-2 lg:gap-4">{renderImages}</div>
    </div>
  );
}
