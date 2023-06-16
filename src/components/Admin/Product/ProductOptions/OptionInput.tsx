import { Dispatch, SetStateAction } from "react";

import Category from "./Category";
import { OptionType } from "pages/admin/product/add";
import PlusIcon from "assets/icon/plus.svg";

type OptionInputProps = {
  options: OptionType[];
  setOptions: Dispatch<SetStateAction<OptionType[]>>;
};

function OptionInput({ options, setOptions }: OptionInputProps) {
  const onCategoryAddClicked = () => {
    setOptions([
      ...options,
      {
        title: "",
        optionItems: [{ title: "", value: 0, stock: 0 }],
      },
    ]);
  };

  return (
    <>
      <h2 className="text-lg font-semibold leading-7 text-gray-900">
        제품 옵션
      </h2>
      <p className="mt-1 text-xs leading-6 text-gray-600">
        제품에 적용 할 옵션을 작성해주세요. 최소 하나 이상의 옵션이 필요합니다.
      </p>
      <div className="mt-2 w-full flex flex-col">
        <table className="my-4 pb-6 w-full ftext-sm text-left text-gray-500 border-gray-200">
          <thead className="text-xs font-semibold text-gray-700 bg-gray-50">
            <tr>
              <th scope="col" className="px-2 py-2 whitespace-nowrap">
                카테고리 이름
              </th>
              <th scope="col" className="px-2 py-2 whitespace-nowrap">
                옵션 이름
              </th>
              <th scope="col" className="px-2 py-2 whitespace-nowrap">
                추가 금액
              </th>
              <th scope="col" className="px-2 py-2 whitespace-nowrap">
                재고 수
              </th>
              <th scope="col" className="px-2 py-2 whitespace-nowrap">
                삭제
              </th>
            </tr>
          </thead>

          <tbody>
            {options.map((option, idx) => {
              return (
                <Category
                  key={idx}
                  categoryIndex={idx}
                  option={option}
                  options={options}
                  setOptions={setOptions}
                />
              );
            })}
          </tbody>
        </table>

        <button
          type="button"
          className="mt-4 px-3 py-2 flex justify-center items-center text-sm text-orange-500
            rounded-md shadow transition-all hover:shadow-lg hover:translate-y-[1px]"
          onClick={onCategoryAddClicked}
        >
          <PlusIcon className="-ml-2 mr-1 w-6 h-6" />
          카테고리 추가하기
        </button>
      </div>
    </>
  );
}

export default OptionInput;
