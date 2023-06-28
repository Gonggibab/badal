import { Dispatch, SetStateAction } from "react";
import { AddressType } from "common/types/user";
import PenIcon from "assets/icon/pen.svg";

type AddressCardProps = {
  address: AddressType;
  setAddress: Dispatch<SetStateAction<AddressType>>;
  setIsEditModalOpen: Dispatch<SetStateAction<boolean>>;
};

export default function AddressCard({
  address,
  setAddress,
  setIsEditModalOpen,
}: AddressCardProps) {
  return (
    <div className="p-4 w-full rounded-md shadow">
      <div className="relative w-full h-full flex flex-col text-sm">
        <div className="absolute top-0 right-0 flex gap-x-4">
          <button
            type="button"
            className="p-1 rounded-md shadow transition-all hover:shadow-lg hover:translate-y-[1px]"
            onClick={() => {
              setAddress(address);
              setIsEditModalOpen(true);
            }}
          >
            <PenIcon className="w-5 h-5" />
          </button>
        </div>

        {address.isDefault && (
          <div className="text-xs font-bold text-orange-500">기본 배송지</div>
        )}

        <h2 className="mt-auto text-base font-semibold">{address.name}</h2>

        <p className="mt-1 ">{address.contact}</p>

        <p className="mt-2 font-semibold">
          {address.address} {address.detailAddress}
        </p>
        <p>{address.memo}</p>
      </div>
    </div>
  );
}
