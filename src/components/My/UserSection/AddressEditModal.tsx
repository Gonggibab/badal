import { Dispatch, SetStateAction } from "react";
import { useSetRecoilState } from "recoil";
import axios from "axios";

import { notificationAtom } from "common/recoil/atom";
import { AddressType, UserType } from "common/types/user";
import formatPhoneNumber from "common/utils/formatPhoneNumber";

type AddressEditModalProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  user: UserType;
  address: AddressType | null;
  setAddress: Dispatch<SetStateAction<AddressType>>;
  setIsPostSearchOpen: Dispatch<SetStateAction<boolean>>;
};

export default function AddressEditModal({
  isOpen,
  setIsOpen,
  user,
  address,
  setAddress,
  setIsPostSearchOpen,
}: AddressEditModalProps) {
  const setNotification = useSetRecoilState(notificationAtom);

  const onEditClicked = async () => {
    if (!address) return;

    try {
      await axios.put("/api/address", {
        id: address.id,
        userId: user.id,
        name: address.name,
        contact: address.contact,
        postcode: address.postcode,
        address: address.address,
        detailAddress: address.detailAddress,
        memo: address.memo,
        isDefault: address.isDefault,
      });

      setIsOpen(false);
      setNotification({
        isOpen: true,
        content: "주소 변경이 완료되었습니다.",
      });
    } catch (error) {
      console.log(error);
      setNotification({
        isOpen: true,
        content: "오류가 발생했습니다. 다시 시도해주세요.",
      });
    }
  };

  return (
    <div
      className={`${
        isOpen ? "visible opacity-100" : "invisible opacity-0"
      } relative z-50 ease-out duration-300`}
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

      <div className="fixed inset-0 z-50 flex overflow-y-auto">
        <div
          className={`${
            isOpen
              ? "opacity-100 translate-y-0 sm:scale-100"
              : "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          } m-auto relative w-full transform overflow-hidden rounded-lg bg-white text-left  
            shadow-xl transition-all sm:max-w-lg`}
        >
          <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            <h3
              className="text-base font-semibold leading-6 text-gray-900"
              id="modal-title"
            >
              주소 정보 수정
            </h3>
            {address && (
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
                        value={address.name}
                        onChange={(e) =>
                          setAddress({
                            ...address,
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
                        value={address.contact}
                        onChange={(e) =>
                          setAddress({
                            ...address,
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
                        value={address.postcode}
                      />
                    </div>
                  </div>
                  <div className="col-span-2 w-fit flex flex-col justify-end">
                    <button
                      type="button"
                      onClick={() => setIsPostSearchOpen(true)}
                      className="px-3 py-2 text-sm text-white bg-orange-500 rounded-md shadow
                      hover:translate-y-[1px] hover:shadow-lg transition-all
                      focus:ring-2 focus:ring-gray-900"
                    >
                      주소 찾기
                    </button>
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
                        value={address.address}
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
                        value={address.detailAddress}
                        onChange={(e) =>
                          setAddress({
                            ...address,
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
                        value={address.memo}
                        onChange={(e) =>
                          setAddress({
                            ...address,
                            memo: e.currentTarget.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="col-span-full h-6 flex items-center">
                    <>
                      <input
                        id="offers"
                        name="offers"
                        type="checkbox"
                        className="mr-2 h-4 w-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                        checked={address.isDefault}
                        onChange={(e) =>
                          setAddress({
                            ...address,
                            isDefault: e.currentTarget.checked,
                          })
                        }
                      />
                      <label
                        htmlFor="offers"
                        className="font-medium text-gray-900 text-sm leading-6"
                      >
                        기본 주소로 설정
                      </label>
                    </>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <button
              type="button"
              className="inline-flex w-full justify-center rounded-md bg-orange-500 
                px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
              onClick={onEditClicked}
            >
              수정하기
            </button>
            <button
              type="button"
              className="mt-3 inline-flex w-full justify-center rounded-md bg-white 
                px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 
                ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              onClick={() => setIsOpen(false)}
            >
              취소
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
