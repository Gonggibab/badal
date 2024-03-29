import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";
import axios from "axios";

import { notificationAtom } from "common/recoil/atom";
import { ImageType } from "common/types/image";
import { ProductType } from "common/types/product";
import EditUploadIamge from "components/Admin/Product/ProductImages/EditUploadIamge";
import Loader from "components/Loader/Loader";
import debounce from "common/utils/debounce";
import isEmpty from "common/utils/isEmpty";
import cloudinary from "common/lib/cloudinary";

export type ImageFileType = {
  image: File;
  preview: string;
};

export default function ProductEdit() {
  const router = useRouter();
  const isFormValid = useRef<string>("");
  const setNotification = useSetRecoilState(notificationAtom);
  const [isErr, setIsErr] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [stock, setStock] = useState<string>("");
  const [exImages, setExImages] = useState<ImageType[]>([]);
  const [exDetailImage, setExDetailImage] = useState<ImageType | undefined>();
  const [deleteImages, setDeleteImages] = useState<ImageType[]>([]);
  const [images, setImages] = useState<ImageFileType[]>([]);
  const [detailImage, setDetailImage] = useState<ImageFileType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!router.isReady) return;

    const getProductInfo = async () => {
      setIsLoading(true);
      const productRef = await axios.get(`/api/product/${router.query.id}`);
      const product: ProductType = productRef.data.data;

      setTitle(product.title);
      setPrice(String(product.price));
      setStock(String(product.stock));
      setExImages(product.images);
      setExDetailImage(product.detailImage);
      setIsLoading(false);
    };

    getProductInfo();
  }, [router]);

  const checkIsFormValid = () => {
    if (isErr) {
      isFormValid.current =
        "동일한 이름의 제품이 있습니다. 다른 이름을 입력해주세요.";
      return;
    }

    // 모든 값을 입력했는지 확인
    if (isEmpty(title) || isEmpty(price) || isEmpty(stock)) {
      isFormValid.current = "빈 칸없이 알맞은 정보를 입력해주세요.";
      return;
    }

    isFormValid.current = "";
  };

  const handleSubmit = async () => {
    // 유효성 검사
    checkIsFormValid();
    if (isFormValid.current !== "") {
      setNotification({
        isOpen: true,
        content: isFormValid.current,
      });

      return;
    }

    setIsLoading(true);

    try {
      // Cloudinary에 이미지들 업로드
      const cloudImage: ImageType[] = await cloudinary.upload(
        images.map((img) => img.image)
      );

      let cloudDetailImage;
      // Cloudinary에 상세 이미지 업로드
      if (detailImage) {
        cloudDetailImage = await cloudinary.upload([detailImage.image]);
      }

      // 삭제 리스트 이미지 데이터에서 삭제하기
      if (deleteImages.length > 0) {
        await Promise.all(
          deleteImages.map(async (img) => {
            await axios.delete(`/api/image/${img.public_id}`);
          })
        );
      }

      try {
        // 제품 데이터를 업데이트한다
        await axios.put(`/api/product/${router.query.id}`, {
          title: title,
          price: Number(price.replace(/[^0-9]/g, "")),
          stock: Number(stock.replace(/[^0-9]/g, "")),
          images: cloudImage,
          detailImage: cloudDetailImage,
        });

        setIsLoading(false);
        setNotification({
          isOpen: true,
          content: "성공적으로 제품 정보를 수정했습니다.",
        });
        router.push("/admin/product");
      } catch (error) {
        // 클라우드에 저장 시켰던 이미지를 삭제
        const deletePromises = [];
        if (cloudImage.length > 0) {
          deletePromises.push(
            cloudImage.map((image) =>
              axios.delete(`/api/image/${image.public_id}`)
            )
          );
        }
        if (cloudDetailImage) {
          deletePromises.push(
            axios.delete(`/api/image/${cloudDetailImage[0].public_id}`)
          );
        }
        if (deletePromises.length > 0) await Promise.all(deletePromises);

        setNotification({
          isOpen: true,
          content: "제품 등록중에 에러가 발생했습니다. 다시 시도해주세요.",
        });

        console.log("제품 등록중에 에러가 발생했습니다. " + error);
        setIsLoading(false);
      }
    } catch (error) {
      setNotification({
        isOpen: true,
        content: "제품 등록중에 에러가 발생했습니다. 다시 시도해주세요.",
      });

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
    const curTitle = e.currentTarget.value;

    const { data } = await debouncedRequest(e.currentTarget.value);
    if (!data.data) {
      setIsErr(false);
    } else {
      if (data.data.title === curTitle) setIsErr(false);
      else setIsErr(true);
    }
  };

  return (
    <main className="p-4 md:ml-64 flex justify-center">
      <div
        className="p-4 flex flex-col w-full h-[calc(100vh-120px)] overflow-x-scroll
          shadow-md sm:rounded-lg md:h-[calc(100vh-40px)]"
      >
        <form>
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-xl font-semibold leading-7 text-gray-900">
              제품 수정하기
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              수정하고 싶은 제품 정보를 입력해보세요.
            </p>

            <section className="mt-10 grid grid-cols-1 gap-x-6 gap-y-6 md:grid-cols-4 lg:grid-cols-6">
              <div className="col-span-2 md:col-span-full">
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
              <div className="col-span-2">
                <label
                  htmlFor="price"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  재고
                </label>
                <div className="mt-2">
                  <div
                    className="w-full flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 
                        focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-500"
                  >
                    <input
                      type="text"
                      name="stock"
                      id="stock"
                      autoComplete="stock"
                      className="block w-full border-0 bg-transparent py-2.5 pl-3 text-xs text-gray-900 
                          placeholder:text-gray-400 focus:ring-0 sm:py-1.5 sm:text-sm sm:leading-6"
                      placeholder="1,000"
                      maxLength={10}
                      value={stock}
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
                        setStock(e.currentTarget.value);
                      }}
                    />
                    <span className="flex select-none items-center px-4 text-xs text-gray-500 sm:text-sm">
                      개
                    </span>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <section className="mt-4 border-b border-gray-900/10 pb-12">
            <EditUploadIamge
              exImages={exImages}
              setExImages={setExImages}
              exDetailImage={exDetailImage}
              setExDetailImage={setExDetailImage}
              deleteImages={deleteImages}
              setDeleteImages={setDeleteImages}
              images={images}
              setImages={setImages}
              detailImage={detailImage}
              setDetailImage={setDetailImage}
            />
          </section>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="button"
              className="px-4 py-2.5 text-sm font-semibold leading-6 text-gray-900 
                rounded-md shadow hover:shadow-lg hover:translate-y-[1px] transition-all
                focus:ring-2 focus:ring-inset focus:ring-orange-500"
              onClick={() => router.push("/admin/product")}
            >
              취소
            </button>
            <button
              type="button"
              className="rounded-md bg-orange-500 px-6 py-2.5 text-sm font-semibold text-white 
                shadow hover:shadow-lg hover:translate-y-[1px] focus-visible:outline focus-visible:outline-2 
                focus-visible:outline-offset-2 focus-visible:outline-orange-500 transition-all"
              onClick={handleSubmit}
            >
              수정하기
            </button>
          </div>
        </form>
      </div>

      <Loader isLoading={isLoading} />
    </main>
  );
}
