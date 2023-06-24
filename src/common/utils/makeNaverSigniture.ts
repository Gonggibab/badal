import { createHmac } from "crypto";

const makeNaverSigniture = (
  timestamp: String,
  accessKey: string,
  secretKey: string,
  serviceId: string
) => {
  const space = " ";
  const newLine = "\n";
  const method = "POST";
  const url = `/sms/v2/services/${serviceId}/messages`;

  const hmac = createHmac("sha256", secretKey);
  hmac.update(method);
  hmac.update(space);
  hmac.update(url);
  hmac.update(newLine);
  hmac.update(String(timestamp));
  hmac.update(newLine);
  hmac.update(accessKey);

  const hash = hmac.digest("base64");

  return hash;
};

export default makeNaverSigniture;
