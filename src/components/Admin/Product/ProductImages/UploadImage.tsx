import { ChangeEvent, Dispatch, SetStateAction, useRef } from "react";
import { useSetRecoilState } from "recoil";
import Image from "next/image";

import { notificationAtom } from "common/recoil/atom";
import { ImageFileType } from "pages/admin/product/add";
import ImageGallery from "./ImageGallery";
import CameraIcon from "assets/icon/camera.svg";
import CloseIcon from "assets/icon/close.svg";

const MAX_IMAGE_SIZE = 10000000;
const MAX_DETAILIMAGE_SIZE = 20000000;
const MAX_IMAGE_NUM = 8;

type UploadImageProps = {
  images: ImageFileType[];
  setImages: Dispatch<SetStateAction<ImageFileType[]>>;
  detailImage: ImageFileType | null;
  setDetailImage: Dispatch<SetStateAction<ImageFileType | null>>;
};

export default function UploadImage({
  images,
  setImages,
  detailImage,
  setDetailImage,
}: UploadImageProps) {
  const productImgRef = useRef<HTMLInputElement>(null);
  const detailImgRef = useRef<HTMLInputElement>(null);
  const setNotification = useSetRecoilState(notificationAtom);

  const onFilesChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (!files) return;

    const imgList: ImageFileType[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files.item(i);
      if (!file) return;

      if (file.size > MAX_IMAGE_SIZE) {
        setNotification({
          isOpen: true,
          content: "사진의 크기가 10MB 를 넘습니다!",
        });
        continue;
      }

      if (images.length + imgList.length >= MAX_IMAGE_NUM) {
        setNotification({
          isOpen: true,
          content: "8장 이상 사진을 업로드 할 수 없습니다!",
        });
        break;
      }

      imgList.push({ image: file, preview: URL.createObjectURL(file) });
    }

    setImages([...images, ...imgList]);
  };

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (!files) return;

    const file = files[0];

    if (file.size > MAX_DETAILIMAGE_SIZE) {
      setNotification({
        isOpen: true,
        content: "상세 정보 사진의 크기가 20MB 를 넘습니다!",
      });
      return;
    }

    setDetailImage({ image: file, preview: URL.createObjectURL(file) });
  };

  const deleteDetailImg = () => {
    setDetailImage(null);
  };

  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
      <div className="col-span-full flex flex-col justify-between items-start">
        <div className="pb-4">
          <h2 className="text-lg font-semibold leading-7 text-gray-900">
            제품 이미지
          </h2>
          <p className="mt-1 text-xs leading-5 text-gray-600">
            PNG, JPG, JEPG 형식의 파일을 등록해 주세요.
            <br /> 사진은 8장 까지 업로드 할 수 있고 파일 크기는 최대 10MB
            입니다.
          </p>
        </div>

        <button
          type="button"
          className="px-3 py-2 flex justify-center items-center rounded-lg shadow 
            transition-all hover:shadow-lg hover:translate-y-[1px] focus-within:outline-none 
            focus-within:ring-2 focus-within:ring-orange-500 focus-within:ring-offset-2 hover:text-orange-500"
          onClick={() => {
            productImgRef.current?.click();
          }}
        >
          <CameraIcon className="mr-2 w-6 h-6 text-orange-500" />
          <div className="flex text-sm leading-6">
            <label
              htmlFor="file-upload"
              className="relative cursor-pointer rounded-md bg-white font-semibold text-orange-500"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <span>이미지 업로드</span>
              <input
                ref={productImgRef}
                className="sr-only"
                tabIndex={-1}
                id="file-upload"
                name="file-upload"
                type="file"
                accept="image/png, image/jpg, image/jpeg"
                multiple
                onChange={(e) => onFilesChange(e)}
              />
            </label>
          </div>
        </button>
      </div>

      <div className="col-span-full">
        <ImageGallery images={images} setImages={setImages} />
      </div>

      <div className="mt-10 col-span-full flex flex-col justify-between items-start">
        <div className="pb-4">
          <h2 className="text-lg font-semibold leading-7 text-gray-900">
            제품 상세 설명 이미지
          </h2>
          <p className="mt-1 text-xs leading-5 text-gray-600">
            PNG, JPG, JEPG 형식의 파일을 등록해 주세요.
            <br /> 사진은 1장 까지 업로드 할 수 있고 파일 크기는 최대 20MB
            입니다.
          </p>
        </div>

        <button
          type="button"
          className="px-3 py-2 flex justify-center items-center rounded-lg shadow 
            transition-all hover:shadow-lg hover:translate-y-[1px] focus-within:outline-none 
            focus-within:ring-2 focus-within:ring-orange-500 focus-within:ring-offset-2 hover:text-orange-500"
          onClick={() => {
            detailImgRef.current?.click();
          }}
        >
          <CameraIcon className="mr-2 w-6 h-6 text-orange-500" />
          <div className="flex text-sm leading-6">
            <label
              htmlFor="detail-upload"
              className="relative cursor-pointer rounded-md bg-white font-semibold text-orange-500"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <span>상세 설명 이미지 업로드</span>
              <input
                ref={detailImgRef}
                className="sr-only"
                tabIndex={-1}
                id="detail-upload"
                name="detail-upload"
                type="file"
                accept="image/png, image/jpg, image/jpeg"
                onChange={(e) => onFileChange(e)}
              />
            </label>
          </div>
        </button>
      </div>

      {detailImage && (
        <div className="col-span-full">
          <li className="relative col-span-1 aspect-h-9 aspect-w-10 overflow-hidden rounded-lg bg-gray-300">
            <Image
              className="h-full w-full object-contain object-center"
              src={detailImage.preview}
              alt="제품 이미지"
              fill
              sizes="100vw 100vh"
            />
            <CloseIcon
              className="relative mr-3 ml-auto h-8 w-8 rounded-full cursor-pointer"
              onClick={deleteDetailImg}
            />
          </li>
        </div>
      )}
    </div>
  );
}
