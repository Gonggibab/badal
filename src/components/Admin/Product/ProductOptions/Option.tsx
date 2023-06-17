import { ChangeEvent, Dispatch, SetStateAction } from "react";

import { OptionItemType, OptionType } from "pages/admin/product/add";
import DeleteIcon from "assets/icon/delete.svg";

type OptionProps = {
  categoryIndex: number;
  optionIndex: number;
  item: OptionItemType;
  options: OptionType[];
  setOptions: Dispatch<SetStateAction<OptionType[]>>;
};

export default function Option({
  categoryIndex,
  optionIndex,
  item,
  options,
  setOptions,
}: OptionProps) {
  const onTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const cur = e.currentTarget.value;

    setOptions(
      options.map((opt, cIdx) => {
        if (cIdx === categoryIndex) {
          return {
            ...opt,
            optionItems: opt.optionItems.map((item, oIdx) => {
              if (oIdx === optionIndex) {
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
              if (oIdx === optionIndex) {
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
              if (oIdx === optionIndex) {
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

  const onOptionDeleteClicked = () => {
    setOptions((options) =>
      options.map((opt, cIdx) => {
        if (cIdx === categoryIndex) {
          return {
            ...opt,
            optionItems: opt.optionItems.filter(
              (_, oIdx) => oIdx !== optionIndex
            ),
          };
        }
        return { ...opt };
      })
    );
  };

  return (
    <tr>
      <td>&nbsp;</td>
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
          value={item.title}
          onChange={(e) => onTitleChange(e)}
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
          value={item.value}
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
          value={item.stock}
          onChange={(e) => onStockChange(e)}
        />
      </td>
      <td className="px-2 py-2 whitespace-nowrap">
        <button
          type="button"
          className="p-1 flex justify-center items-center text-red-600 rounded-md shadow
              hover:shadow-lg hover:translate-y-[1px] focus:ring-2 focus:ring-inset focus:ring-orange-500"
          onClick={onOptionDeleteClicked}
        >
          <DeleteIcon className="w-4 h-4" />
        </button>
      </td>
    </tr>
  );
}
