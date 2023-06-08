import "./globals.css";
import { Noto_Sans_KR } from "next/font/google";

import Header from "common/components/Header/Header";

const notoSansKR = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export const metadata = {
  title: "FO:CEL",
  description: "피부 걱정 없이 살아가는 모두를 위한 솔루션",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="kr">
      <body className={notoSansKR.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}
