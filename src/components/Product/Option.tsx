import { Dispatch, SetStateAction } from "react";

import { OptionItemType } from "common/types/product";
import { SelectedOptionType } from "pages/product/[id]";

type OptionProps = {
  id: string;
  title: string;
  optionItmes: OptionItemType[];
  selectedOptions: SelectedOptionType[];
  setSelectedOptions: Dispatch<SetStateAction<SelectedOptionType[] | null>>;
};

export default function Option({
  id,
  title,
  optionItmes,
  selectedOptions,
  setSelectedOptions,
}: OptionProps) {
  const onOptionClicked = (option: OptionItemType) => {
    if (option.stock < 1) return;

    setSelectedOptions((prevOpts) => {
      if (!prevOpts) return null;
      return prevOpts.map((opt) => {
        if (opt.optionId === id) {
          return {
            ...opt,
            optionItemId: option.id,
            title: option.title,
            value: option.value,
          };
        }
        return opt;
      });
    });
  };

  const renderOptions = optionItmes.map((optItem) => {
    const isSelected =
      selectedOptions.filter((opt) => opt.optionId === id)[0].optionItemId ===
      optItem.id;

    return (
      <label
        key={optItem.id}
        id="choice-label"
        className={`${isSelected && "ring-2 ring-orange-500"} ${
          optItem.stock > 0
            ? "cursor-pointer bg-white"
            : "cursor-not-allowed bg-gray-50"
        } group relative py-3 px-4 flex flex-col items-center justify-center rounded-md 
          border hover:bg-gray-50 focus:outline-none shadow-sm sm:flex-1 sm:py-6 transition-all`}
        onClick={() => onOptionClicked(optItem)}
      >
        <input
          type="radio"
          name={`${optItem.title}-option`}
          value={optItem.title}
          className="sr-only"
          aria-labelledby="choice-label"
        />
        <span
          id="choice-label"
          className={`${
            optItem.stock > 0 ? "text-gray-900" : "text-gray-200"
          } text-md font-semibold `}
        >
          {optItem.title}
        </span>
        {optItem.value !== 0 && (
          <span
            id="choice-label"
            className={`${
              optItem.stock > 0 ? "text-orange-500" : "text-gray-200"
            } mt-1 text-xs font-bold `}
          >
            {optItem.value > 0 ? "+" : "-"}
            {optItem.value}원
          </span>
        )}

        {optItem.stock < 1 && (
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
