import { FormEvent } from "react";

const formatPhoneNumber = (e: FormEvent<HTMLInputElement>) => {
  const phoneNumber = e.currentTarget.value.replace(/\D/g, "");
  const phoneNumberLength = phoneNumber.length;

  if (phoneNumberLength > 0) {
    e.currentTarget.value = phoneNumber.slice(0, 3);

    if (phoneNumberLength >= 4) {
      e.currentTarget.value += "-" + phoneNumber.slice(3, 7);
    }

    if (phoneNumberLength >= 8) {
      e.currentTarget.value += "-" + phoneNumber.slice(7, 11);
    }
  }
};

export default formatPhoneNumber;
