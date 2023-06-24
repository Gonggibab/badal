import { Dispatch, SetStateAction, useState } from "react";

import { OrderStatus } from "common/types/order";
import ArrowIcon from "assets/icon/arrow.svg";
import CheckIcon from "assets/icon/check.svg";

type StatusSelectListProps = {
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
  status,
  setStatus,
}: StatusSelectListProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onSelectOption = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative w-fit h-fit">
      <button
        type="button"
        className="relative py-2.5 pl-3 pr-10 w-full cursor-pointer rounded-md text-xs bg-white  
          text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none 
          focus:ring-2 focus:ring-orange-500"
        aria-haspopup="listbox"
        aria-expanded="true"
        aria-labelledby="listbox-label"
        onClick={() => setIsOpen(true)}
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
          } absolute z-10 mt-1 py-1 max-h-56 w-full text-base shadow-lg rounded-md transition-all 
            bg-white ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm`}
          tabIndex={-1}
          role="listbox"
          aria-labelledby="listbox-label"
          aria-activedescendant="listbox-option-3"
        >
          {Object.values(OrderStatus).map((option, idx) => {
            return (
              <li
                key={idx}
                className="text-gray-900 relative cursor-default select-none py-2 pl-3 pr-9
                hover:bg-orange-500 hover:text-white focus:bg-orange-500 focus:text-white"
                id="listbox-option-0"
                role="option"
                aria-selected={false}
              >
                {/* <!-- Selected: "font-semibold", Not Selected: "font-normal" --> */}
                <span className={`font-normal ml-3 block truncate`}>
                  {Status[option]}
                </span>

                {/* <!--
          Checkmark, only display for selected option.

          Highlighted: "text-white", Not Highlighted: "text-indigo-600"
        --> */}

                <CheckIcon className={`w-4 h-4 text-indigo-600`} />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
