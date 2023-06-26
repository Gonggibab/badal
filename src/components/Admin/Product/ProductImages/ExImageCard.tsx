import { Dispatch, SetStateAction } from "react";
import Image from "next/image";

import { ImageType } from "common/types/image";
import CloseIcon from "assets/icon/close.svg";

type ExImageCardProps = {
  image: ImageType;
  images: ImageType[];
  setImages: Dispatch<SetStateAction<ImageType[]>>;
  deleteImages: ImageType[];
  setDeleteImages: Dispatch<SetStateAction<ImageType[]>>;
  exImgNum: number;
  setExImgNum: Dispatch<SetStateAction<number>>;
};

export default function ExImageCard({
  image,
  images,
  setImages,
  deleteImages,
  setDeleteImages,
  exImgNum,
  setExImgNum,
}: ExImageCardProps) {
  const deleteImage = async () => {
    setDeleteImages(deleteImages.concat([image]));

    setImages(images.filter((img) => img.public_id !== image.public_id));
    setExImgNum(exImgNum - 1);
  };

  return (
    <li className="relative col-span-1 aspect-h-9 aspect-w-10 overflow-hidden rounded-lg bg-gray-300">
      <Image
        className="relative h-full w-full object-cover object-center"
        src={image.secure_url}
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
