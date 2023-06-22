import Head from "next/head";

import FirstSection from "components/Main/FirstSection";
import SecondSection from "components/Main/SecondSection";

export default function Home() {
  return (
    <>
      <Head>
        <title>FO:CEL</title>
        <meta
          name="description"
          content="피부 걱정 없이 살아가는 모두를 위한 솔루션."
        />
      </Head>
      <main className="w-screen flex flex-col">
        <FirstSection />
        <SecondSection />
      </main>
    </>
  );
}
