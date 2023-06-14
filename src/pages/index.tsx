import Image from "next/image";
import Head from "next/head";
import image from "assets/test_photo.webp";

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
      <article className="flex flex-col items-center justify-between">
        <section className="relative w-screen h-screen">
          <Image
            src={image}
            alt="배경 이미지"
            fill
            style={{
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
        </section>

        <section className="w-screen h-screen bg-slate-300">test</section>
      </article>
    </>
  );
}
