"use client";
import Image from "next/image";

import logo from "assets/logo2.svg";

export default function Login() {
  return (
    <main className="flex h-[calc(100vh-280px)] flex-col justify-center px-6 py-12 lg:px-8">
      <div className="flex flex-col items-center sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="relative mx-auto">
          <span className="sr-only">FO:CEL</span>
          <Image
            src={logo}
            alt="FO:CEL"
            width="0"
            height="0"
            sizes="100vw"
            className="w-full h-auto"
          />
        </div>
        <h1 className="text-2xl font-semibold leading-6 tracking-wider text-gray-900">
          간편 로그인
        </h1>
        <hr className="mt-6 w-[90%] border-gray-300" />
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <div>
          <button
            className="px-3 py-2.5 relative flex w-full justify-center items-center rounded-sm bg-[#1ec800] 
              text-sm font-normal leading-6 tracking-wider text-white shadow-sm hover:bg-[#1ec800ab] 
              focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 
              focus-visible:outline-indigo-600"
          >
            <svg
              className="absolute left-[23px] w-5 h-5"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M16.273 12.845L7.376 0H0v24h7.726V11.156L16.624 24H24V0h-7.727v12.845z" />
            </svg>
            네이버 로그인
          </button>
        </div>
        <div className="mt-4">
          <button
            className="px-3 py-2.5 relative flex w-full justify-center items-center rounded-sm bg-[#fee500] 
              text-sm font-normal leading-6 tracking-wider text-black shadow-sm hover:bg-[#fee500b9]  
              focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 
              focus-visible:outline-indigo-600"
          >
            <svg
              className="absolute left-4 w-8 h-8"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path d="M12 3c5.799 0 10.5 3.664 10.5 8.185 0 4.52-4.701 8.184-10.5 8.184a13.5 13.5 0 01-1.727-.11l-4.408 2.883c-.501.265-.678.236-.472-.413l.892-3.678c-2.88-1.46-4.785-3.99-4.785-6.866C1.5 6.665 6.201 3 12 3zm5.907 8.06l1.47-1.424a.472.472 0 00-.656-.678l-1.928 1.866V9.282a.472.472 0 00-.944 0v2.557a.471.471 0 000 .222V13.5a.472.472 0 00.944 0v-1.363l.427-.413 1.428 2.033a.472.472 0 10.773-.543l-1.514-2.155zm-2.958 1.924h-1.46V9.297a.472.472 0 00-.943 0v4.159c0 .26.21.472.471.472h1.932a.472.472 0 100-.944zm-5.857-1.092l.696-1.707.638 1.707H9.092zm2.523.488l.002-.016a.469.469 0 00-.127-.32l-1.046-2.8a.69.69 0 00-.627-.474.696.696 0 00-.653.447l-1.661 4.075a.472.472 0 00.874.357l.33-.813h2.07l.299.8a.472.472 0 10.884-.33l-.345-.926zM8.293 9.302a.472.472 0 00-.471-.472H4.577a.472.472 0 100 .944h1.16v3.736a.472.472 0 00.944 0V9.774h1.14a.472.472 0 00.472-.472z" />
            </svg>
            카카오 로그인
          </button>
        </div>
      </div>
    </main>
  );
}
