import React, { Dispatch, SetStateAction } from "react";
import DaumPostcodeEmbed from "react-daum-postcode";

import { NewAddressType } from "pages/order";

type ModalProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setNewAdrs: Dispatch<SetStateAction<NewAddressType>>;
};

function PostSearchModal({ isOpen, setIsOpen, setNewAdrs }: ModalProps) {
  const handleComplete = (data: {
    address: string;
    addressType: string;
    bname: string;
    buildingName: string;
    zonecode: string;
  }) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    setNewAdrs((prevAdrs) => ({
      ...prevAdrs,
      postcode: data.zonecode,
      address: fullAddress,
    }));
    setIsOpen(false);
  };

  return (
    <div
      onClick={() => setIsOpen(false)}
      className={`${
        isOpen ? "visible opacity-100" : "invisible opacity-0"
      } relative z-50 ease-out duration-300`}
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="m-auto w-full h-full flex items-center justify-center sm:w-[600px]">
          <DaumPostcodeEmbed onComplete={handleComplete} autoClose={false} />
        </div>
      </div>
    </div>
  );
}

export default PostSearchModal;
