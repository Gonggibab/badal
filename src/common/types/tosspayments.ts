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
  lastTransactionKey: string;
  paymentKey: string;
  orderId: string;
  orderName: string;
  currency: string;
  method: string;
  status: string;
  requestedAt: string;
  approvedAt: string;
  useEscrow: boolean;
  cultureExpense: boolean;
  card: {
    amount: number;
    issuerCode: string;
    acquirerCode: string;
    number: string;
    installmentPlanMonths: number;
    isInterestFree: boolean;
    approveNo: string;
    useCardPoint: boolean;
    cardType: string;
    ownerType: string;
    acquireStatus: string;
  };
  receipt: {
    url: string;
  };
  checkout: {
    url: string;
  };
  type: string;
  country: string;
  totalAmount: number;
  balanceAmount: number;
  suppliedAmount: number;
  vat: number;
  taxFreeAmount: number;
  taxExemptionAmount: number;
};
