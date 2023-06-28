import { Dispatch, SetStateAction } from "react";

import { ShippingInfoType } from "common/types/user";
import { NewAddressType } from "pages/order";
import formatPhoneNumber from "common/utils/formatPhoneNumber";

type ShippingInfoProps = {
  isNotUser: boolean;
  adrsList: ShippingInfoType[];
  selectedAdrs: ShippingInfoType;
  newAdrs: NewAddressType;
  setNewAdrs: Dispatch<SetStateAction<NewAddressType>>;
  isNewAdrs: boolean;
  setIsNewAdrs: Dispatch<SetStateAction<boolean>>;
  isNewDefault: boolean;
  setIsNewDefault: Dispatch<SetStateAction<boolean>>;
  setIsPostSearchOpen: Dispatch<SetStateAction<boolean>>;
};

export default function ShippingInfo({
  isNotUser,
  adrsList,
  selectedAdrs,
  newAdrs,
  setNewAdrs,
  isNewAdrs,
  setIsNewAdrs,
  isNewDefault,
  setIsNewDefault,
  setIsPostSearchOpen,
}: ShippingInfoProps) {
  return (
    <div className="col-span-1">
      <h2 className="mb-4 text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
        배송지 정보
      </h2>

      <fieldset>
        <div className="mt-2 flex gap-x-3">
          {adrsList.length > 0 && (
            <div className="flex items-center gap-x-2">
              <input
                id="default-address"
                name="address"
                type="radio"
                className="h-4 w-4 border-gray-300 text-orange-500 focus:ring-orange-500 cursor-pointer"
                checked={!isNewAdrs}
                onChange={() => setIsNewAdrs(false)}
              />
              <label
                htmlFor="default-address"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                기존 배송지
              </label>
            </div>
          )}

          <div className="flex items-center gap-x-2">
            <input
              id="new-address"
              name="address"
              type="radio"
              className="h-4 w-4 border-gray-300 text-orange-500 focus:ring-orange-500 cursor-pointer"
              checked={isNewAdrs}
              onChange={() => setIsNewAdrs(true)}
            />
            <label
              htmlFor="new-address"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              신규 배송지
            </label>
          </div>
        </div>
      </fieldset>

      <div className="mt-4 border-b border-gray-900/10 pb-4">
        <div className="grid grid-cols-6 gap-x-6 gap-y-2">
          <div className="col-span-3">
            <label
              htmlFor="name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              수령인 <span className="text-orange-500">*</span>
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="name"
                id="name"
                className="block w-full rounded-md border-0 py-2.5 text-xs text-gray-900  
              shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
              sm:py-1.5 sm:text-sm sm:leading-6"
                disabled={!isNewAdrs}
                value={!isNewAdrs ? selectedAdrs?.name : newAdrs?.name}
                onChange={(e) =>
                  setNewAdrs({
                    ...newAdrs,
                    name: e.currentTarget.value,
                  })
                }
              />
            </div>
          </div>
          <div className="col-span-3">
            <label
              htmlFor="contact"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              전화번호 <span className="text-orange-500">*</span>
            </label>
            <div className="mt-1">
              <input
                type="tel"
                name="contact"
                id="contact"
                className="block w-full rounded-md border-0 py-2.5 text-xs text-gray-900  
                  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
                  tracking-wide sm:py-1.5 sm:text-sm sm:leading-6"
                disabled={!isNewAdrs}
                value={!isNewAdrs ? selectedAdrs?.contact : newAdrs?.contact}
                onChange={(e) =>
                  setNewAdrs({
                    ...newAdrs,
                    contact: e.currentTarget.value,
                  })
                }
                onInput={(e) => formatPhoneNumber(e)}
              />
            </div>
          </div>
          <div className="col-span-2">
            <label
              htmlFor="postcode"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              우편번호 <span className="text-orange-500">*</span>
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="postcode"
                id="postcode"
                disabled
                className="block w-full rounded-md border-0 py-2.5 text-xs text-gray-900  
              shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
              sm:py-1.5 sm:text-sm sm:leading-6"
                value={!isNewAdrs ? selectedAdrs?.postcode : newAdrs?.postcode}
              />
            </div>
          </div>
          <div className="col-span-2 w-fit flex flex-col justify-end">
            {isNewAdrs && (
              <button
                type="button"
                onClick={() => setIsPostSearchOpen(true)}
                className="px-3 py-2 text-sm text-white bg-orange-500 rounded-md shadow
                  hover:translate-y-[1px] hover:shadow-lg transition-all
                  focus:ring-2 focus:ring-gray-900"
              >
                주소 찾기
              </button>
            )}
          </div>
          <div className="col-span-full">
            <label
              htmlFor="address"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              주소 <span className="text-orange-500">*</span>
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="address"
                id="address"
                disabled
                className="block w-full rounded-md border-0 py-2.5 text-xs text-gray-900  
                  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
                  sm:py-1.5 sm:text-sm sm:leading-6"
                value={!isNewAdrs ? selectedAdrs?.address : newAdrs?.address}
              />
            </div>
          </div>
          <div className="col-span-full">
            <label
              htmlFor="detail_address"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              상세 주소
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="detail_address"
                id="detail_address"
                className="block w-full rounded-md border-0 py-2.5 text-xs text-gray-900  
                  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
                  sm:py-1.5 sm:text-sm sm:leading-6"
                disabled={!isNewAdrs}
                value={
                  !isNewAdrs
                    ? selectedAdrs?.detailAddress
                    : newAdrs?.detailAddress
                }
                onChange={(e) =>
                  setNewAdrs({
                    ...newAdrs,
                    detailAddress: e.currentTarget.value,
                  })
                }
              />
            </div>
          </div>
          <div className="col-span-full">
            <label
              htmlFor="memo"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              배송 메모
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="memo"
                id="memo"
                autoComplete="memo"
                className="block w-full rounded-md border-0 py-2.5 text-xs text-gray-900  
                  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
                  sm:py-1.5 sm:text-sm sm:leading-6"
                disabled={!isNewAdrs}
                value={!isNewAdrs ? selectedAdrs?.memo : newAdrs?.memo}
                onChange={(e) =>
                  setNewAdrs({
                    ...newAdrs,
                    memo: e.currentTarget.value,
                  })
                }
              />
            </div>
          </div>

          <div className="col-span-full h-6 flex items-center">
            {!isNotUser && isNewAdrs && (
              <>
                <input
                  id="offers"
                  name="offers"
                  type="checkbox"
                  className="mr-2 h-4 w-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                  checked={isNewDefault}
                  onChange={() => setIsNewDefault(!isNewDefault)}
                />
                <label
                  htmlFor="offers"
                  className="font-medium text-gray-900 text-sm leading-6"
                >
                  기본 주소로 설정
                </label>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
