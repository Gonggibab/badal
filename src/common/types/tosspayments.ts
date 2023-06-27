export type OrderConfirmType = {
  mId: string;
  lastTransactionKey: string;
  paymentKey: string;
  orderId: string;
  orderName: string;
  taxExemptionAmount: 0;
  status: string;
  requestedAt: string; // Date ISO 8601
  approvedAt: string; // Date ISO 8601
  useEscrow: boolean;
  cultureExpense: boolean;
  card?: object;
  virtualAccount?: object;
  transfer: {
    bankCode: string;
    settlementStatus: string;
  };
  mobilePhone?: null;
  giftCertificate?: null;
  cashReceipt: {
    type: string;
    receiptKey: string;
    issueNumber: string;
    receiptUrl: string;
    amount: number;
    taxFreeAmount: number;
  };
  cashReceipts?: null;
  discount?: null;
  cancels?: null;
  secret: string;
  type: string;
  easyPay?: null;
  country: string;
  failure?: null;
  isPartialCancelable: boolean;
  receipt: {
    url: string;
  };
  checkout: {
    url: string;
  };
  currency: string;
  totalAmount: number;
  balanceAmount: number;
  suppliedAmount: number;
  vat: number;
  taxFreeAmount: number;
  method: string;
  version: string;
};

export type PaymentDataType = {
  mId: string;
  version: string;
  type: string; //  NORMAL(일반결제), BILLING(자동결제), BRANDPAY(브랜드페이)
  method: string; // 카드, 가상계좌, 간편결제, 휴대폰, 계좌이체, 문화상품권, 도서문화상품권, 게임문화상품권
  paymentKey: string;
  orderId: string;
  orderName: string;
  currency: string;
  status: string;
  requestedAt: string;
  approvedAt: string;
  cancels?: CancelDataType[];
  useEscrow: boolean;
  cultureExpense: boolean;
  card?: CardPaymentType;
  virtualAccount?: VirtualAccountPaymentType;
  mobilePhone?: {
    customerMobilePhone: string;
    settlementStatus: string;
    receiptUrl: string;
  };
  giftCertificate?: { approveNo: string; settlementStatus: string };
  transfer?: {
    bankCode: string;
    settlementStatus: string;
  };
  easyPay?: { provider: string; amount: number; discountAmount: number };
  receipt: {
    url: string;
  };
  checkout: {
    url: string;
  };
  country: string;
  totalAmount: number;
  balanceAmount: number;
  suppliedAmount: number;
  vat: number;
  taxFreeAmount: number;
  taxExemptionAmount: number;
  lastTransactionKey: string;
};

export type CancelDataType = {
  cancelAmount: number;
  cancelReason: string;
  taxFreeAmount: number;
  taxExemptionAmount: number;
  refundableAmount: number;
  easyPayDiscountAmount: number;
  canceledAt: string;
  transactionKey: string;
  receiptKey: string;
};

type CardPaymentType = {
  amount: number;
  issuerCode: string;
  acquirerCode?: string;
  number: string;
  installmentPlanMonths: number;
  approveNo: string;
  useCardPoint: boolean;
  cardType: string;
  ownerType: string;
  acquireStatus: string;
  isInterestFree: boolean;
  interestPayer?: string;
};

type VirtualAccountPaymentType = {
  accountType: string;
  accountNumber: string;
  bankCode: string;
  customerName: string;
  dueDate: string;
  refundStatus: string;
  expired: boolean;
  settlementStatus: string;
  refundReceiveAccount: object;
};
