import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
} from "react";
import Link from "next/link";

import { OptionType } from "common/types/product";

type ItemProps = {
  id: string;
  title: string;
  price: number;
  options: OptionType[];
  selectedData: Set<string>;
  setSelectedData: Dispatch<SetStateAction<Set<string>>>;
};

export default function Item({
  id,
  title,
  price,
  options,
  selectedData,
  setSelectedData,
}: ItemProps) {
  const checkRef = useRef<HTMLInputElement>(null);

  const sumTotalStock = () => {
    let sum = 0;
    options.map((opt) => {
      opt.optionItems.forEach((item) => {
        sum += item.stock;
      });
    });

    return sum;
  };

  useEffect(() => {
    if (!checkRef.current) return;

    // 해당 제품에 체크가 되어 있는지 체크하고 반영
    if (selectedData.has(id)) checkRef.current.checked = true;
    else checkRef.current.checked = false;
  }, [id, selectedData]);

  const onCheckChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.checked) {
      const n = new Set(selectedData).add(id);
      setSelectedData(n);
    } else {
      const n = new Set(selectedData);
      n.delete(id);
      setSelectedData(n);
    }
  };

  return (
    <tr className="bg-white border-b hover:bg-gray-50">
      <td className="w-4 p-4">
        <div className="flex items-center">
          <input
            ref={checkRef}
            id="checkbox-table-search-1"
            type="checkbox"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded 
              cursor-pointer focus:ring-blue-500 focus:ring-2"
            onChange={(e) => onCheckChange(e)}
          />
          <label htmlFor="checkbox-table-search-1" className="sr-only">
            체크박스
          </label>
        </div>
      </td>
      <th
        scope="row"
        className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap"
      >
        <Link href={`/admin/product/${id}`} className="hover:underline">
          {title}
        </Link>
      </th>
      <td className="px-4 py-3 whitespace-nowrap">{price}</td>
      <td className="px-4 py-3 whitespace-nowrap">{sumTotalStock()}</td>
    </tr>
  );
}
