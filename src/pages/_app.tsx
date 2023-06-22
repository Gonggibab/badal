import "styles/globals.css";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import { SessionProvider } from "next-auth/react";
import { Roboto_Condensed } from "next/font/google";

import Layout from "./layout";
import Notification from "components/Notification";

const roboto_condensed = Roboto_Condensed({
  weight: ["300", "400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "fallback",
  fallback: ["system-ui"],
});

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <RecoilRoot>
      <SessionProvider session={session}>
        <Layout>
          <style jsx global>{`
            html {
              font-family: ${roboto_condensed.style.fontFamily};
            }
          `}</style>
          <Component {...pageProps} />

          <Notification />
        </Layout>
      </SessionProvider>
    </RecoilRoot>
  );
}
