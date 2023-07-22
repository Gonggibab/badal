import { Dispatch, SetStateAction } from "react";

import ImageCard from "./ImageCard";

export type ImageFileType = {
  image: File;
  preview: string;
};

type ImageGalleryProps = {
  images: ImageFileType[];
  setImages: Dispatch<SetStateAction<ImageFileType[]>>;
};

export default function ImageGallery({ images, setImages }: ImageGalleryProps) {
  const renderItems = images.map((image, idx) => {
    return (
      <ImageCard
        key={idx}
        idx={idx}
        image={image}
        images={images}
        setImages={setImages}
      />
    );
  });

  return (
    <ol className="w-full h-full grid grid-cols-3 gap-x-3 gap-y-4 md:grid-cols-4 lg:grid-cols-5">
      {renderItems}
    </ol>
  );
}
