import { ChangeEvent, Dispatch, SetStateAction } from "react";

import { OptionType } from "pages/admin/product/add";
import Option from "./Option";
import DeleteIcon from "assets/icon/delete.svg";

type CategoryProps = {
  categoryIndex: number;
  option: OptionType;
  options: OptionType[];
  setOptions: Dispatch<SetStateAction<OptionType[]>>;
};

export default function Category({
  categoryIndex,
  option,
  options,
  setOptions,
}: CategoryProps) {
  const onCategoryTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const cur = e.currentTarget.value;

    setOptions(
      options.map((opt, cIdx) => {
        if (cIdx === categoryIndex) {
          return {
            ...opt,
            title: cur,
          };
        }
        return { ...opt };
      })
    );
  };

  const onOptionTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const cur = e.currentTarget.value;

    setOptions(
      options.map((opt, cIdx) => {
        if (cIdx === categoryIndex) {
          return {
            ...opt,
            optionItems: opt.optionItems.map((item, oIdx) => {
              if (oIdx === 0) {
                return { ...item, title: cur };
              }
              return { ...item };
            }),
          };
        }
        return { ...opt };
      })
    );
  };

  const onValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, "");

    setOptions(
      options.map((opt, cIdx) => {
        if (cIdx === categoryIndex) {
          return {
            ...opt,
            optionItems: opt.optionItems.map((item, oIdx) => {
              if (oIdx === 0) {
                return { ...item, value: Number(e.currentTarget.value) };
              }
              return { ...item };
            }),
          };
        }
        return { ...opt };
      })
    );
  };

  const onStockChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, "");

    setOptions(
      options.map((opt, cIdx) => {
        if (cIdx === categoryIndex) {
          return {
            ...opt,
            optionItems: opt.optionItems.map((item, oIdx) => {
              if (oIdx === 0) {
                return { ...item, stock: Number(e.currentTarget.value) };
              }
              return { ...item };
            }),
          };
        }
        return { ...opt };
      })
    );
  };

  const onOptionAddClicked = () => {
    setOptions(
      options.map((opt, cIdx) => {
        if (cIdx === categoryIndex) {
          return {
            ...opt,
            optionItems: [
              ...opt.optionItems,
              { title: "", value: 0, stock: 0 },
            ],
          };
        }
        return { ...opt };
      })
    );
  };

  const onCategoryDeleteClicked = () => {
    setOptions((options) =>
      options.filter((_, cIdx) => cIdx !== categoryIndex)
    );
  };

  return (
    <>
      <tr>
        <td className="px-2 py-2 whitespace-nowrap">
          <input
            id="category_title"
            name="category_title"
            type="text"
            autoComplete="category_title"
            className="block w-full rounded-md border-0 py-2.5 text-xs text-gray-900 
              shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
              focus:ring-2 focus:ring-inset focus:ring-orange-500 sm:py-1.5 sm:text-sm sm:leading-6"
            placeholder="용량"
            value={option.title}
            onChange={(e) => onCategoryTitleChange(e)}
          />
        </td>
        <td className="px-2 py-2 whitespace-nowrap">
          <input
            id="option_title"
            name="option_title"
            type="text"
            autoComplete="option_title"
            className="block w-full rounded-md border-0 py-2.5 text-xs text-gray-900 
              shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
              focus:ring-2 focus:ring-inset focus:ring-orange-500 sm:py-1.5 sm:text-sm sm:leading-6"
            placeholder="80ml"
            value={option.optionItems[0].title}
            onChange={(e) => onOptionTitleChange(e)}
          />
        </td>
        <td className="px-2 py-2 whitespace-nowrap">
          <input
            id="value"
            name="value"
            type="text"
            autoComplete="value"
            className="block w-full rounded-md border-0 py-2.5 text-xs text-gray-900 
              shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
              focus:ring-2 focus:ring-inset focus:ring-orange-500 sm:py-1.5 sm:text-sm sm:leading-6"
            placeholder="5000"
            maxLength={8}
            value={option.optionItems[0].value}
            onChange={(e) => onValueChange(e)}
          />
        </td>
        <td className="px-2 py-2 whitespace-nowrap">
          <input
            id="stock"
            name="stock"
            type="text"
            autoComplete="stock"
            className="block w-full rounded-md border-0 py-2.5 text-xs text-gray-900 
              shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
              focus:ring-2 focus:ring-inset focus:ring-orange-500 sm:py-1.5 sm:text-sm sm:leading-6"
            placeholder="200"
            value={option.optionItems[0].stock}
            onChange={(e) => onStockChange(e)}
          />
        </td>
        <td className="px-2 py-2 whitespace-nowrap">
          {categoryIndex !== 0 && (
            <button
              type="button"
              className="p-1 flex justify-center items-center text-red-600 rounded-md shadow
                hover:shadow-lg hover:translate-y-[1px]"
              onClick={onCategoryDeleteClicked}
            >
              <DeleteIcon className="w-4 h-4" />
            </button>
          )}
        </td>
      </tr>

      {option.optionItems.map((item, idx) => {
        if (idx < 1) return;
        return (
          <Option
            key={idx}
            categoryIndex={categoryIndex}
            optionIndex={idx}
            item={item}
            options={options}
            setOptions={setOptions}
          />
        );
      })}
      <tr className="border-b border-gray-300">
        <td>&nbsp;</td>
        <td className="px-2 py-2 pb-8 table-cell" colSpan={3}>
          <button
            type="button"
            className="py-2 w-full flex justify-center items-center text-sm text-gray-700
            rounded-md shadow transition-all hover:shadow-lg hover:translate-y-[1px]
            focus:ring-2 focus:ring-inset focus:ring-orange-500"
            onClick={onOptionAddClicked}
          >
            옵션 추가하기
          </button>
        </td>
      </tr>
    </>
  );
}
