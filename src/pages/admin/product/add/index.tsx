import { ChangeEvent, useMemo, useRef, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import OptionInput from "components/Admin/Product/ProductOptions/OptionInput";
import UploadImage from "components/Admin/Product/ProductImages/UploadImage";
import Notification from "components/Notification";
import Loader from "components/Loader/Loader";
import isEmpty from "common/utils/isEmpty";
import cloudinary from "common/utils/cloudinary";

import { ImageType } from "common/types/image";
import debounce from "common/utils/debounce";

export type ImageFileType = {
  image: File;
  preview: string;
};

export type OptionType = {
  title: string;
  optionItems: OptionItemType[];
};

export type OptionItemType = {
  title: string;
  value?: number;
  stock?: number;
};

export default function ProductAdd() {
  const router = useRouter();
  const isFormValid = useRef<string>("");
  const [isErr, setIsErr] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [options, setOptions] = useState<OptionType[]>([
    {
      title: "",
      optionItems: [{ title: "", value: 0, stock: 0 }],
    },
  ]);
  const [detailImage, setDetailImage] = useState<ImageFileType | null>(null);
  const [images, setImages] = useState<ImageFileType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isNotifOpen, setIsNotifOpen] = useState<boolean>(false);
  const [notifInfo, setNotifInfo] = useState({
    content: "",
    btnTitle: "",
    callback: () => {},
  });

  const checkIsFormValid = () => {
    // 모든 값을 입력했는지 확인
    if (isErr) {
      isFormValid.current =
        "동일한 이름의 제품이 있습니다. 다른 이름을 입력해주세요.";
      return;
    }
    if (isEmpty(title) || isEmpty(price)) {
      isFormValid.current = "빈 칸없이 알맞은 정보를 입력해주세요.";
      return;
    }
    options.forEach((opt) => {
      if (isEmpty(opt.title)) {
        isFormValid.current = "빈 칸없이 알맞은 정보를 입력해주세요.";
        return;
      }
      opt.optionItems.forEach((item) => {
        if (isEmpty(item.title) || isEmpty(item.value) || isEmpty(item.stock)) {
          isFormValid.current = "빈 칸없이 알맞은 정보를 입력해주세요.";
          return;
        }
      });
    });

    isFormValid.current = "";
  };

  const handleSubmit = async () => {
    // 유효성 검사
    checkIsFormValid();
    if (isFormValid.current !== "") {
      setNotifInfo({
        content: isFormValid.current,
        btnTitle: "",
        callback: () => {},
      });
      setIsNotifOpen(true);
      return;
    }

    setIsLoading(true);
    try {
      // Cloudinary에 이미지들 업로드
      const cloudImage: ImageType[] = [];
      const uploadPromises = images.map(async (img) => {
        const imageData = await cloudinary.upload(img.image);
        cloudImage.push({
          asset_id: imageData.asset_id,
          public_id: imageData.public_id,
          signature: imageData.signature,
          url: imageData.url,
          secure_url: imageData.secure_url,
          createdAt: imageData.created_at,
        });
      });
      await Promise.all(uploadPromises);

      // Cloudinary에 상세 이미지 업로드
      let cloudDetailImage;
      if (detailImage) {
        const detailImageData = await cloudinary.upload(detailImage.image);
        cloudDetailImage = {
          asset_id: detailImageData.asset_id,
          public_id: detailImageData.public_id,
          signature: detailImageData.signature,
          url: detailImageData.url,
          secure_url: detailImageData.secure_url,
          createdAt: detailImageData.created_at,
        };
      }

      try {
        // 제품 데이터를 저장한다
        await axios.post("/api/product", {
          title: title,
          price: Number(price.replace(/[^0-9]/g, "")),
          options: options,
          images: cloudImage,
          detailImage: cloudDetailImage,
        });

        setIsLoading(false);
        router.push("/admin/product");
      } catch (error) {
        // 클라우드에 저장 시켰던 이미지를 삭제한다.
        if (cloudImage.length > 0) {
          for (const img of cloudImage) {
            await cloudinary.delete(img.public_id);
          }
        }

        if (cloudDetailImage) {
          await cloudinary.delete(cloudDetailImage.public_id);
        }

        setNotifInfo({
          content: "제품 등록중에 에러가 발생했습니다. 다시 시도해주세요.",
          btnTitle: "",
          callback: () => {},
        });
        setIsNotifOpen(true);
        console.log("제품 등록중에 에러가 발생했습니다. " + error);
        setIsLoading(false);
      }
    } catch (error) {
      setNotifInfo({
        content: "제품 등록중에 에러가 발생했습니다. 다시 시도해주세요.",
        btnTitle: "",
        callback: () => {},
      });
      setIsNotifOpen(true);
      setIsLoading(false);
      console.log("Cloudinary와 통신에 에러가 발생했습니다. " + error);
    }
  };

  // 같은 이름의 제품이 있는지 확인
  const debouncedRequest = useMemo(
    () =>
      debounce(async (title: string) => {
        return await axios.get(`/api/product/search?title=${title}`);
      }, 1000),
    []
  );

  const onProductTitleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);

    const { data } = await debouncedRequest(e.currentTarget.value);
    if (!data.data) {
      setIsErr(false);
    } else {
      setIsErr(true);
    }
  };

  return (
    <article className="p-4 md:ml-64 flex justify-center">
      <div
        className="p-4 flex flex-col w-full h-[calc(100vh-120px)] overflow-x-scroll
          shadow-md sm:rounded-lg md:h-[calc(100vh-40px)]"
      >
        <form>
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-xl font-semibold leading-7 text-gray-900">
              제품 등록하기
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              등록 할 제품정보를 정확하게 입력해 주세요.
            </p>

            <section className="mt-10 grid grid-cols-1 gap-x-6 gap-y-6 md:grid-cols-4 lg:grid-cols-6">
              <div className="col-span-2">
                <label
                  htmlFor="product_title"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  제품명
                </label>

                <div className="mt-2">
                  <input
                    id="product_title"
                    name="product_title"
                    type="text"
                    autoComplete="product_title"
                    className="block w-full rounded-md border-0 py-2.5 text-xs text-gray-900 
                        shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
                        focus:ring-2 focus:ring-inset focus:ring-orange-500 sm:py-1.5 sm:text-sm sm:leading-6"
                    placeholder="레시틴 콩크림"
                    value={title}
                    onChange={(e) => onProductTitleChange(e)}
                  />
                  {isErr && (
                    <span className="text-xs text-red-500">
                      동일한 이름의 제품이 있습니다
                    </span>
                  )}
                </div>
              </div>

              <div className="col-span-2">
                <label
                  htmlFor="price"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  기본 가격
                </label>
                <div className="mt-2">
                  <div
                    className="w-full flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 
                        focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-500"
                  >
                    <input
                      type="text"
                      name="price"
                      id="price"
                      autoComplete="price"
                      className="block w-full border-0 bg-transparent py-2.5 pl-3 text-xs text-gray-900 
                          placeholder:text-gray-400 focus:ring-0 sm:py-1.5 sm:text-sm sm:leading-6"
                      placeholder="10,000"
                      maxLength={10}
                      value={price}
                      onInput={(e) => {
                        // 숫자만 입력 받는다
                        const curVal = e.currentTarget.value;
                        e.currentTarget.value = curVal.replace(/[^0-9]/g, "");
                      }}
                      onChange={(e) => {
                        // 3 자리수 마다 콤마를 집어넣는다
                        const curVal = e.currentTarget.value;
                        e.currentTarget.value = curVal.replace(
                          /\B(?=(\d{3})+(?!\d))/g,
                          ","
                        );
                        setPrice(e.currentTarget.value);
                      }}
                    />
                    <span className="flex select-none items-center px-4 text-xs text-gray-500 sm:text-sm">
                      원
                    </span>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <section className="mt-4 border-b border-gray-900/10 pb-12">
            <OptionInput options={options} setOptions={setOptions} />
          </section>

          <section className="mt-4 border-b border-gray-900/10 pb-12">
            <UploadImage
              images={images}
              setImages={setImages}
              detailImage={detailImage}
              setDetailImage={setDetailImage}
              setIsNotifOpen={setIsNotifOpen}
              setNotifInfo={setNotifInfo}
            />
          </section>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="button"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              취소
            </button>
            <button
              type="button"
              className="rounded-md bg-orange-500 px-4 py-2 text-sm font-semibold text-white 
                shadow-sm hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 
                focus-visible:outline-offset-2 focus-visible:outline-orange-500"
              onClick={handleSubmit}
            >
              등록하기
            </button>
          </div>
        </form>
      </div>

      <Notification
        isOpen={isNotifOpen}
        setIsOpen={setIsNotifOpen}
        content={notifInfo.content}
        btnTitle={notifInfo.btnTitle}
        callback={notifInfo.callback}
      />

      <Loader isLoading={isLoading} />
    </article>
  );
}
