import "styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { Noto_Sans_KR } from "next/font/google";

import Layout from "./layout";

const notoSansKR = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session} baseUrl={process.env.NEXTAUTH_URL!}>
      <Layout>
        <main className={notoSansKR.className}>
          <Component {...pageProps} />
        </main>
      </Layout>
    </SessionProvider>
  );
}
