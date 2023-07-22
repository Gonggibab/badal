import { useState } from "react";
import { useRouter } from "next/router";

import StarIcon from "assets/icon/star.svg";
import UploadImages from "components/My/AddReview/UploadImages";

export type ImageFileType = {
  image: File;
  preview: string;
};

const evaluation = [
  "최악이에요.",
  "별로에요.",
  "그럭저럭이에요.",
  "쓸만해요!",
  "좋아요!",
  "강추해요!",
];

export default function NewReview() {
  const router = useRouter();
  const [rating, setRating] = useState<number>(5);
  const [images, setImages] = useState<ImageFileType[]>([]);
  const [content, setContent] = useState<string>("");

  console.log(router.query.title);

  const register = () => {
    console.log(rating);
  };

  return (
    <main className="p-4 flex justify-center items-center">
      <div className="p-4 flex flex-col w-full max-w-4xl overflow-x-scroll">
        <form>
          <div className="pb-12">
            <h2 className="text-xl font-semibold leading-7 text-gray-900">
              <span className="text-orange-500 font-bold">
                {`"${router.query.title}"`}
              </span>
              {"  "}
              리뷰 작성하기
            </h2>
            <p className="mt-1 pb-4 text-xs leading-6 text-gray-600 border-b border-gray-900/10">
              제품이 어땠는지 입력해 주세요.
            </p>

            <section className="relative mt-10 w-full flex flex-col items-center">
              <h3 className="text-sm text-orange-400 font-semibold">
                {evaluation[rating]}
              </h3>
              <div className="mt-4 flex w-[220px] gap-x-2">
                <StarIcon
                  className={`${
                    rating >= 1 ? "text-orange-400" : "text-gray-200"
                  } cursor-pointer transition-all`}
                  onClick={() => {
                    if (rating === 1) setRating(0);
                    else setRating(1);
                  }}
                />
                <StarIcon
                  className={`${
                    rating >= 2 ? "text-orange-400" : "text-gray-200"
                  } cursor-pointer transition-all`}
                  onClick={() => {
                    setRating(2);
                  }}
                />
                <StarIcon
                  className={`${
                    rating >= 3 ? "text-orange-400" : "text-gray-200"
                  } cursor-pointer transition-all`}
                  onClick={() => {
                    setRating(3);
                  }}
                />
                <StarIcon
                  className={`${
                    rating >= 4 ? "text-orange-400" : "text-gray-200"
                  } cursor-pointer transition-all`}
                  onClick={() => {
                    setRating(4);
                  }}
                />
                <StarIcon
                  className={`${
                    rating >= 5 ? "text-orange-400" : "text-gray-200"
                  } cursor-pointer transition-all`}
                  onClick={() => {
                    setRating(5);
                  }}
                />
              </div>
            </section>

            <section className="relative mt-10">
              <textarea
                id="content"
                name="content"
                rows={6}
                className="block p-2 pl-3 w-full rounded-md border-0 py-2.5 text-xs text-gray-900 
                      shadow-sm ring-1 ring-inset ring-gray-300 resize-none focus:ring-2 focus:ring-inset
                      focus:ring-orange-500 sm:py-1.5 sm:text-sm sm:leading-6"
                maxLength={2000}
                value={content}
                onChange={(e) => setContent(e.currentTarget.value)}
              />

              <div className="absolute -bottom-5 right-2 text-xs">
                {content.length} / 2000
              </div>
            </section>
          </div>
        </form>

        <section className="relative py-10 border-t border-gray-900/10">
          <UploadImages images={images} setImages={setImages} />
        </section>

        <button
          className="py-2.5 w-full text-white text-sm font-semibold bg-orange-500 rounded-lg
            hover:bg-orange-400 transition-all"
          onClick={register}
        >
          리뷰 등록하기
        </button>
      </div>
    </main>
  );
}
