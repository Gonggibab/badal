import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function Fail() {
  const searchParams = useSearchParams();

  // 고객에게 실패 사유 알려주고 다른 페이지로 이동
  return (
    <article className="px-4 py-6 flex flex-col items-center justify-start sm:px-6 sm:py-16 lg:px-8">
      <div className="w-full max-w-4xl">
        <p className="ml-1 text-xl font-semibold text-orange-500 tracking-tight">
          오류가 발생하여
        </p>
        <h1 className="mt-2 text-4xl font-bold text-gray-900 tracking-tight">
          주문에 실패하였습니다.
        </h1>
        <p className="mt-2 ml-1 text-sm leading-7 text-gray-600 tracking-tight">
          주문을 다시 시도해 주십시오.
        </p>
        <p className="mt-2 ml-1 text-sm leading-7 text-gray-600 tracking-tight">
          {`사유: ${searchParams.get("message")}`}
        </p>

        <Link
          href={"/order"}
          className="flex items-center justify-center rounded-md border border-transparent 
            px-4 py-3 text-sm font-semibold text-white bg-orange-500 shadow 
            hover:translate-y-[1px] hover:shadow-lg hover:bg-orange-400 transition-all 
            focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
        >
          주문 페이지로
        </Link>
      </div>
    </article>
  );
}
