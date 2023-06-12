import { Dispatch, SetStateAction } from "react";

import { OptionType } from "common/types/product";
import { SelectedOptionType } from "pages/product/[id]";

type OptionProps = {
  id: string;
  title: string;
  options: OptionType[];
  selectedOptions: SelectedOptionType[];
  setSelectedOptions: Dispatch<SetStateAction<SelectedOptionType[]>>;
};

export default function Option({
  id,
  title,
  options,
  selectedOptions,
  setSelectedOptions,
}: OptionProps) {
  const onOptionClicked = (option: OptionType) => {
    if (option.stock < 1) return;

    setSelectedOptions((prevOpts) =>
      prevOpts.map((opt) => {
        if (opt.categoryId === id) {
          return {
            ...opt,
            optionId: option.id,
            title: option.title,
            value: option.value,
          };
        }
        return opt;
      })
    );
  };

  const renderOptions = options.map((option) => {
    const isSelected =
      selectedOptions.filter((opt) => opt.categoryId === id)[0].optionId ===
      option.id;

    return (
      <label
        key={option.id}
        id="choice-label"
        className={`${isSelected && "ring-2 ring-indigo-500"} ${
          option.stock > 0
            ? "cursor-pointer bg-white"
            : "cursor-not-allowed bg-gray-50"
        } group relative py-3 px-4 flex flex-col items-center justify-center rounded-md 
          border hover:bg-gray-50 focus:outline-none shadow-sm sm:flex-1 sm:py-6 transition-all`}
        onClick={() => onOptionClicked(option)}
      >
        <input
          type="radio"
          name={`${option.title}-option`}
          value={option.title}
          className="sr-only"
          aria-labelledby="choice-label"
        />
        <span
          id="choice-label"
          className={`${
            option.stock > 0 ? "text-gray-900" : "text-gray-200"
          } text-md font-semibold `}
        >
          {option.title}
        </span>
        {option.value !== 0 && (
          <span
            id="choice-label"
            className={`${
              option.stock > 0 ? "text-indigo-600" : "text-gray-200"
            } mt-1 text-xs font-bold `}
          >
            {option.value > 0 ? "+" : "-"}
            {option.value}원
          </span>
        )}

        {option.stock < 1 && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
          >
            <svg
              className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              stroke="currentColor"
            >
              <line
                x1="0"
                y1="100"
                x2="100"
                y2="0"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </span>
        )}
      </label>
    );
  });

  return (
    <div className="mt-4">
      <div className="flex items-center">
        <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
      </div>

      <fieldset className="mt-2">
        <legend className="sr-only">{title}을 선택하세요</legend>
        <div className="grid grid-cols-3 gap-4 sm:grid-cols-6 lg:grid-cols-3">
          {renderOptions}
        </div>
      </fieldset>
    </div>
  );
}
