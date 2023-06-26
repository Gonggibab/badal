import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
} from "react";
import Link from "next/link";

import { ProductType } from "common/types/product";

type ProductItemProps = {
  item: ProductType;
  selectedData: Set<string>;
  setSelectedData: Dispatch<SetStateAction<Set<string>>>;
};

export default function ProductItem({
  item,
  selectedData,
  setSelectedData,
}: ProductItemProps) {
  const checkRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!checkRef.current) return;

    // 해당 제품에 체크가 되어 있는지 체크하고 반영
    if (selectedData.has(item.id)) checkRef.current.checked = true;
    else checkRef.current.checked = false;
  }, [item.id, selectedData]);

  const onCheckChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.checked) {
      const n = new Set(selectedData).add(item.id);
      setSelectedData(n);
    } else {
      const n = new Set(selectedData);
      n.delete(item.id);
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
        <Link href={`/admin/product/${item.id}`} className="hover:underline">
          {item.title}
        </Link>
      </th>
      <td className="px-4 py-3 whitespace-nowrap">
        {item.price.toLocaleString()}
      </td>
      <td className="px-4 py-3 whitespace-nowrap">
        {item.stock.toLocaleString()}
      </td>
    </tr>
  );
}
