import Link from "next/link";

export default function Custom500() {
  return (
    <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold text-orange-500">500</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          서버 에러가 발생 했습니다
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600">
          죄송합니다, 잠시후에 다시 시도해 주십시오.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <button
            type="button"
            className="rounded-md bg-orange-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm
            hover:bg-orange-400 focus-visible:outline focus-visible:outline-2  
            focus-visible:outline-offset-2 focus-visible:outline-orange-500"
            onClick={() => window.location.reload()}
          >
            페이지 새로고침
          </button>
        </div>
      </div>
    </main>
  );
}
