import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import Image from "next/image";
import CloseIcon from "assets/icon/close.svg";
import ArrowIcon from "assets/icon/arrow.svg";

type ImageInspectorProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  index: number;
  setIndex: Dispatch<SetStateAction<number>>;
  images: string[];
};

export default function ImageInspector({
  isOpen,
  setIsOpen,
  index,
  setIndex,
  images,
}: ImageInspectorProps) {
  const sliderRef = useRef<HTMLDivElement>(null);

  const onLeftBtnClicked = () => {
    setIndex(index - 1);
  };

  const onRightBtnClicked = () => {
    if (!images) return;
    setIndex(index + 1);
  };

  const closeModal = () => {
    setIsOpen(false);
    setIndex(0);
  };

  useEffect(() => {
    if (!sliderRef.current) return;
    sliderRef.current.style.transform = `translateX(-${index}00%)`;
  }, [index]);

  const renderImages = images.map((image, idx) => {
    return (
      <div
        key={idx}
        className="relative shrink-0 h-full w-full overflow-hidden bg-gray-900"
        data-carousel-item
      >
        <Image
          className="h-full w-full object-contain object-center"
          src={image}
          fill
          alt="리뷰 이미지"
        />
      </div>
    );
  });

  return (
    <div
      className={`${
        isOpen ? "visible opacity-100" : "invisible opacity-0"
      } relative z-50 ease-out duration-300`}
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-gray-600 bg-opacity-80 transition-opacity"></div>

      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
          <div
            className={`${
              isOpen
                ? "opacity-100 translate-y-0 sm:scale-100"
                : "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            } relative w-full h-[80vh] transform overflow-hidden rounded-lg bg-white
              text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl`}
          >
            <button
              className="z-10 absolute top-2 right-2 p-1 flex justify-center text-sm font-semibold
                text-gray-900 rounded-md bg-white shadow-sm transition-all hover:scale-105"
              onClick={closeModal}
            >
              <CloseIcon className="w-6 h-6" strokeWidth="2" />
            </button>

            <div
              ref={sliderRef}
              className="relative w-full h-full flex transition-all"
            >
              {renderImages}
            </div>

            {index - 1 >= 0 && (
              <button
                className="z-10 absolute top-1/2 left-2 -translate-y-1/2 pr-1 w-8 h-8  
                flex justify-center items-center rotate-180 text-sm font-semibold text-gray-900 
                rounded-md bg-white shadow-sm transition-all hover:scale-105"
                onClick={onLeftBtnClicked}
              >
                <ArrowIcon className="w-6 h-6" />
              </button>
            )}
            {index < images.length - 1 && (
              <button
                className="z-10 absolute top-1/2 right-2 -translate-y-1/2 pr-1 w-8 h-8 
                flex justify-center items-center text-sm font-semibold text-gray-900
                rounded-md bg-white shadow-sm transition-all hover:scale-105"
                onClick={onRightBtnClicked}
              >
                <ArrowIcon className="w-6 h-6" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
