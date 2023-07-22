import { Dispatch, SetStateAction, useState } from "react";

import ImageCard from "../../../ImageCard";
import { ImageFileType } from "pages/admin/product/add";
import { ImageType } from "common/types/image";
import ExImageCard from "./ExImageCard";

type EditImageGalleryProps = {
  exImages: ImageType[];
  setExImages: Dispatch<SetStateAction<ImageType[]>>;
  images: ImageFileType[];
  setImages: Dispatch<SetStateAction<ImageFileType[]>>;
  deleteImages: ImageType[];
  setDeleteImages: Dispatch<SetStateAction<ImageType[]>>;
};

export default function EditImageGallery({
  exImages,
  setExImages,
  images,
  setImages,
  deleteImages,
  setDeleteImages,
}: EditImageGalleryProps) {
  const [exImgNum, setExImgNum] = useState<number>(exImages.length);

  const renderExItems = exImages.map((image, idx) => {
    return (
      <ExImageCard
        key={idx}
        image={image}
        images={exImages}
        setImages={setExImages}
        deleteImages={deleteImages}
        setDeleteImages={setDeleteImages}
        exImgNum={exImgNum}
        setExImgNum={setExImgNum}
      />
    );
  });

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
      {renderExItems}
      {renderItems}
    </ol>
  );
}
