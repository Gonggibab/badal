import { Dispatch, SetStateAction } from "react";
import Image from "next/image";

import { ImageFileType } from "pages/admin/product/add";
import CloseIcon from "assets/icon/close.svg";

type ImageCardProps = {
  idx: number;
  image: ImageFileType;
  images: ImageFileType[];
  setImages: Dispatch<SetStateAction<ImageFileType[]>>;
};

export default function ImageCard({
  idx,
  image,
  images,
  setImages,
}: ImageCardProps) {
  const deleteImage = () => {
    const copy = [...images];
    copy.splice(idx, 1);
    setImages(copy);
  };

  return (
    <li
      data-position={idx}
      className="relative col-span-1 aspect-h-9 aspect-w-10 overflow-hidden rounded-lg bg-gray-300"
    >
      <Image
        className="relative h-full w-full object-cover object-center"
        src={image.preview}
        alt="제품 이미지"
        fill
        sizes="100vw 100vh"
      />
      <CloseIcon
        className="relative m-1 ml-auto h-6 w-6 rounded-full cursor-pointer"
        onClick={deleteImage}
      />
    </li>
  );
}
