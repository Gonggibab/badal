import { Dispatch, SetStateAction, useState } from "react";

import { OrderStatus, OrderType } from "common/types/order";
import ArrowIcon from "assets/icon/arrow.svg";
import CheckIcon from "assets/icon/check.svg";
import axios from "axios";

type StatusSelectListProps = {
  order: OrderType;
  status: OrderStatus;
  setStatus: Dispatch<SetStateAction<OrderStatus>>;
};

const Status = {
  READY: "출고 대기",
  IN_DELIVERY: "배송중",
  DONE: "배송 완료",
  CANCLED: "주문 취소",
  REFUND_REQUESTED: "환불 요청",
  REFUND_COMPLETE: "환불 완료",
};

export default function StatusSelectList({
  order,
  status,
  setStatus,
}: StatusSelectListProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onSelectOption = async (option: OrderStatus) => {
    try {
      await axios.put(`/api/order/${order.id}`, { status: option });

      setStatus(option);
      setIsOpen(false);
    } catch (error) {
      console.log("정보 업데이트 도중 에러가 발생했습니다. " + error);
    }
  };

  return (
    <div className="w-28 h-fit">
      <button
        type="button"
        className="relative py-2.5 pl-3 pr-10 w-full cursor-pointer rounded-md text-xs bg-white  
          text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none 
          focus:ring-2 focus:ring-orange-500"
        aria-haspopup="listbox"
        aria-expanded="true"
        aria-labelledby="listbox-label"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="ml-3 block">{Status[status]}</span>
        <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
          <ArrowIcon
            className={`${
              isOpen ? "-rotate-90" : "rotate-90"
            } w-4 h-4 text-gray-500 transition-all`}
          />
        </span>
      </button>

      {isOpen && (
        <ul
          className={`${
            isOpen ? "opacity-100" : "opacity-0"
          } mt-1 absolute z-10 py-1 max-h-56 w-28 text-sm shadow-lg rounded-md transition-all 
            bg-white ring-1 ring-black ring-opacity-5 focus:outline-none`}
          tabIndex={-1}
          role="listbox"
          aria-labelledby="listbox-label"
          aria-activedescendant="listbox-option-3"
        >
          {Object.values(OrderStatus).map((option, idx) => {
            return (
              <li
                key={idx}
                className="relative px-3 py-2 flex justify-between text-gray-900 cursor-pointer 
                  select-none transition-all group hover:bg-orange-500 hover:text-white
                focus:bg-orange-500 focus:text-white"
                id="listbox-option-0"
                role="option"
                aria-selected={false}
                onClick={() => onSelectOption(option)}
              >
                <span
                  className={`${
                    status === option ? "font-semibold" : "font-normal"
                  } ml-3 block truncate text-xs`}
                >
                  {Status[option]}
                </span>
                {status === option && (
                  <CheckIcon
                    className={`text-orange-500 w-4 h-4 group-hover:text-white`}
                  />
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
