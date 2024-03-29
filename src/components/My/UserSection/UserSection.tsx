import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import axios from "axios";

import { notificationAtom } from "common/recoil/atom";
import { AddressType, UserType } from "common/types/user";
import AddressCard from "./AddressCard";
import AddressEditModal from "./AddressEditModal";
import PostSearchModal from "components/PostSearchModal";

type UserSectionProps = {
  user: UserType;
  setIsLoadAdress: Dispatch<SetStateAction<boolean>>;
};

export default function UserSection({
  user,
  setIsLoadAdress,
}: UserSectionProps) {
  const setNotification = useSetRecoilState(notificationAtom);
  const [name, setName] = useState<string>(user.name);
  const [addresses, setAdresses] = useState<AddressType[] | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [editAddress, setEditAddress] = useState<AddressType>({
    id: "",
    isDefault: false,
    postcode: "",
    address: "",
    detailAddress: "",
    name: "",
    contact: "",
    memo: "",
  });
  const [isPostSearchOpen, setIsPostSearchOpen] = useState<boolean>(false);

  useEffect(() => {
    // 주소 데이터 불러오기
    const getAddressData = async () => {
      const addressRes = await axios.get(`/api/address/user/${user.id}`);
      const addresses: AddressType[] = addressRes.data.data;
      setAdresses(addresses);
    };

    getAddressData();
  }, [user]);

  const onNameChangeClicked = async () => {
    try {
      await axios.put(`/api/user/${user.id}`, {
        name: name,
      });

      setNotification({
        isOpen: true,
        content: "회원이름이 수정되었습니다.",
      });
    } catch (error) {
      console.log("회원 이름 수정중 에러가 발생했습니다. " + error);
      setNotification({
        isOpen: true,
        content: "오류가 발생했습니다. 다시 시도해 주십시오.",
      });
    }
  };

  useEffect(() => {
    if (!addresses) setIsLoadAdress(true);
    else setIsLoadAdress(false);
  }, [addresses, setIsLoadAdress]);

  return (
    <section className="mt-4 relative w-full max-w-4xl flex flex-col">
      <figure className="border-b border-gray-900/10 pb-12">
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          회원 정보
        </h2>
        <p className="text-xs leading-6 text-gray-600">
          간편 로그인으로 가입된 회원님의 정보입니다.
        </p>

        <div className="mt-6 grid grid-cols-3 gap-x-6 gap-y-4 sm:grid-cols-6">
          <div className="col-span-1">
            <label
              htmlFor="name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              회원 이름
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="name"
                id="name"
                autoComplete="name"
                className="block w-full rounded-md border-0 py-2.5 text-xs text-gray-900  
                  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
                  focus:ring-2 focus:ring-inset focus:ring-orange-500 
                  sm:py-1.5 sm:text-sm sm:leading-6"
                value={name}
                onChange={(e) => setName(e.currentTarget.value)}
              />
            </div>
          </div>
          <div className="col-span-2 sm:col-span-5 flex justify-start items-end">
            <button
              type="button"
              className="px-3.5 py-2.5 text-xs font-semibold text-gray-900 rounded-md shadow
                transition-all hover:shadow-lg hover:translate-y-[1px]"
              onClick={onNameChangeClicked}
            >
              수정하기
            </button>
          </div>

          <div className="col-span-3 sm:col-span-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              이메일 주소
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                value={user.email}
                disabled
                className="block w-full rounded-md border-0 py-2.5 text-xs text-gray-900  
                  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
                  bg-gray-100 focus:ring-2 focus:ring-inset focus:ring-orange-500 
                  sm:py-1.5 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>
      </figure>

      <figure className="border-b border-gray-900/10 py-6">
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          배송지 정보
        </h2>
        <p className="text-xs leading-6 text-gray-600">
          회원님의 기본 배송지와 배송지 목록을 관리해보세요.
        </p>

        <div className="my-4 pt-4 w-full grid grid-cols-1 gap-x-4 gap-y-3 md:grid-cols-2">
          {addresses &&
            addresses.map((adrs) => (
              <AddressCard
                key={adrs.id}
                address={adrs}
                setAddress={setEditAddress}
                setIsEditModalOpen={setIsEditModalOpen}
              />
            ))}

          {addresses && addresses.length < 1 && (
            <div>
              <p className="font-semibold">등록된 주소가 없습니다.</p>
              <p className="mt-2 text-sm text-orange-500">
                제품 주문시 주소를 입력하면 자동으로 등록됩니다.
              </p>
            </div>
          )}
        </div>
      </figure>

      <AddressEditModal
        isOpen={isEditModalOpen}
        setIsOpen={setIsEditModalOpen}
        user={user}
        address={editAddress}
        setAddress={setEditAddress}
        setIsPostSearchOpen={setIsPostSearchOpen}
      />

      <PostSearchModal
        isOpen={isPostSearchOpen}
        setIsOpen={setIsPostSearchOpen}
        setAdrs={setEditAddress}
      />
    </section>
  );
}
