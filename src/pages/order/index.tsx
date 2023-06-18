import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useSetRecoilState } from "recoil";
import { customAlphabet } from "nanoid";
import {
  loadPaymentWidget,
  PaymentWidgetInstance,
} from "@tosspayments/payment-widget-sdk";
import axios from "axios";

import { CartItemType, ShippingInfoType } from "common/types/user";
import { orderAdrsIdAtom } from "common/recoil/atom";
import ShippingInfo from "components/Order/ShippingInfo";
import CartInfo from "components/Order/CartInfo";
import PostSearchModal from "components/Order/PostSearchModal";
import Notification from "components/Notification";
import Loader from "components/Loader/Loader";

export type NewAddressType = {
  name: string;
  contact: string;
  postcode: string;
  address: string;
  detailAddress: string;
  memo: string;
};

export default function Order() {
  const router = useRouter();
  const { data } = useSession();

  const paymentWidgetRef = useRef<PaymentWidgetInstance | null>(null);
  const paymentMethodsWidgetRef = useRef<ReturnType<
    PaymentWidgetInstance["renderPaymentMethods"]
  > | null>(null);

  const setOrderAdrsId = useSetRecoilState(orderAdrsIdAtom);
  const [adrsList, setAdrsList] = useState<ShippingInfoType[]>([]);
  const [cartItems, setCartItems] = useState<CartItemType[] | null>(null);
  const [orderTitle, setOrderTitle] = useState<string>("");
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [selectedAdrs, setSelectedAdrs] = useState<ShippingInfoType>({
    id: "",
    idDefault: true,
    name: "",
    contact: "",
    postcode: "",
    address: "",
    detailAddress: "",
    memo: "",
  });
  const [newAdrs, setNewAdrs] = useState<NewAddressType>({
    name: "",
    contact: "010-",
    postcode: "",
    address: "",
    detailAddress: "",
    memo: "",
  });
  const [isNewDefault, setIsNewDefault] = useState<boolean>(false);
  const [isNewAdrs, setIsNewAdrs] = useState<boolean>(true);
  const [isPostSearchOpen, setIsPostSearchOpen] = useState<boolean>(false);
  const [isNotifOpen, setIsNotifOpen] = useState<boolean>(false);
  const [notifInfo, setNotifInfo] = useState({
    content: "",
    btnTitle: "",
    callback: () => {},
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // 결제 정보
  const selector = "#payment-widget";
  const clientKey = process.env.NEXT_PUBLIC_PAYMENTS_CLIENT!;

  // 주문번호 생성 로직
  const today = new Date();
  const year = today.getFullYear().toString().slice(-2);
  const month = (today.getMonth() + 1).toString().padStart(2, "0");
  const day = today.getDate().toString().padStart(2, "0");
  const yymmdd = year + month + day;

  const nanoid = customAlphabet("1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ", 5);
  const orderId = yymmdd + nanoid();

  useEffect(() => {
    if (!data?.user) return;

    // 주소 정보 불러오기
    const getUserAddress = async () => {
      const address = await axios.get(`api/user/address/${data?.user?.id}`);
      const adrsData: ShippingInfoType[] = address.data.data;

      if (adrsData.length > 0) {
        // 기본 배송지가 있으면 해당 주소로 설정한다.
        adrsData.map((adrs) => {
          if (adrs.idDefault) {
            setSelectedAdrs(adrs);
            setIsNewAdrs(false);
          }
        });
        setAdrsList(adrsData);
      } else {
        setIsNewAdrs(true);
      }
    };

    const getCartData = async () => {
      const cart = await axios.get(`/api/user/cart/${data?.user?.id}`);
      const cartData: CartItemType[] = cart.data.data.items;

      // 카트 데이터가 없으면 제품 화면으로 리다이렉트
      if (cartData.length < 1) {
        router.push("/product");
        return;
      }

      setCartItems(cartData);
      setTotalPrice(cartData.reduce((acc, item) => acc + item.price, 0));
      setOrderTitle(
        `${cartData[0].title} ${
          cartData.length - 1 > 0 ? `외 ${cartData.length - 1}개` : ""
        }`
      );
    };

    setIsLoading(true);
    getUserAddress();
    getCartData();

    const customerKey = data.user.id!;

    (async () => {
      const paymentWidget = await loadPaymentWidget(clientKey, customerKey);

      const paymentMethodsWidget = paymentWidget.renderPaymentMethods(
        selector,
        totalPrice
      );
      paymentWidget.renderAgreement("#agreement");

      paymentWidgetRef.current = paymentWidget;
      paymentMethodsWidgetRef.current = paymentMethodsWidget;
    })();

    setIsLoading(false);
  }, [clientKey, data, router, totalPrice]);

  const proceedPayment = async () => {
    if (!data?.user) return;
    const paymentWidget = paymentWidgetRef.current;

    try {
      await paymentWidget?.requestPayment({
        orderId: orderId,
        orderName: orderTitle,
        customerName: data.user.name!,
        successUrl: `${window.location.origin}/order/success`,
        failUrl: `${window.location.origin}/order/fail`,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const onPayClicked = async () => {
    if (isNewAdrs) {
      // 모든 필수값 입력되었는지 확인
      if (
        newAdrs.name === "" ||
        newAdrs.contact === "" ||
        newAdrs.postcode === "" ||
        newAdrs.address === ""
      ) {
        setNotifInfo({
          content: "필수 값을 모두 입력해 주세요!",
          btnTitle: "",
          callback: () => {},
        });
        setIsNotifOpen(true);
        return;
      }
      try {
        const address = await axios.post(`api/user/address/${data?.user?.id}`, {
          name: newAdrs.name,
          contact: newAdrs.contact,
          postcode: newAdrs.postcode,
          address: newAdrs.address,
          detailAddress: newAdrs.detailAddress,
          memo: newAdrs.memo,
          isNewDefault: isNewDefault,
        });

        const shippingInfo: ShippingInfoType = address.data.data;
        setOrderAdrsId(shippingInfo.id);
        proceedPayment();
      } catch (error) {
        setNotifInfo({
          content: "주소 저장중 오류가 발생했습니다. 다시 시도해 주세요!",
          btnTitle: "",
          callback: () => {},
        });
        setIsNotifOpen(true);
      }
    } else {
      setOrderAdrsId(selectedAdrs.id);
      proceedPayment();
    }
  };

  return (
    <article className="px-4 py-6 flex flex-col items-center justify-between sm:px-6 sm:py-16 lg:px-8">
      <section
        className="grid max-w-2xl grid-cols-1 items-start
          gap-x-8 lg:max-w-7xl lg:grid-cols-2"
      >
        <ShippingInfo
          adrsList={adrsList}
          selectedAdrs={selectedAdrs}
          newAdrs={newAdrs}
          setNewAdrs={setNewAdrs}
          isNewAdrs={isNewAdrs}
          setIsNewAdrs={setIsNewAdrs}
          isNewDefault={isNewDefault}
          setIsNewDefault={setIsNewDefault}
          setIsPostSearchOpen={setIsPostSearchOpen}
        />

        <div className="col-span-1 pt-4 flex flex-col gap-2 lg:pt-0">
          <CartInfo cartItems={cartItems} />

          <div className="w-full">
            <div id="payment-widget" />
            <div id="agreement" />
          </div>

          <div className="px-6">
            <button
              type="button"
              className="col-span-full py-3 w-full flex justify-center items-center
              font-medium text-white bg-orange-500 rounded-md shadow
              hover:shadow-lg hover:translate-y-[1px] transition-all"
              onClick={onPayClicked}
            >
              결제하기
            </button>
          </div>
        </div>
      </section>

      <PostSearchModal
        isOpen={isPostSearchOpen}
        setIsOpen={setIsPostSearchOpen}
        setNewAdrs={setNewAdrs}
      />

      <Notification
        isOpen={isNotifOpen}
        setIsOpen={setIsNotifOpen}
        content={notifInfo.content}
        btnTitle={notifInfo.btnTitle}
        callback={notifInfo.callback}
      />

      <Loader isLoading={isLoading} />
    </article>
  );
}
