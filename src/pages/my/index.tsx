import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

import Link from "next/link";
import LogoutIcon from "assets/icon/logout.svg";
import SettingIcon from "assets/icon/setting.svg";

export default function My() {
  const { data } = useSession();

  return (
    <article className="p-4 flex flex-col items-center justify-between sm:p-8">
      <section className="relative w-full max-w-4xl">
        <div className="pb-4 w-full flex justify-between sm:pb-8">
          <h1 className="text-2xl font-bold tracking-tight text-orange-500 sm:text-3xl">
            {data?.user?.name}{" "}
            <span className="text-xl font-semibold text-gray-900 tracking-tight">
              {data?.user?.role === "ADMIN" && "관리자"}님 반갑습니다
            </span>
          </h1>
          <div className="flex-shrink-0 flex gap-x-4">
            <Link
              href={"/admin"}
              className="px-3 py-2.5 flex items-center text-xs font-semibold rounded-md 
              shadow hover:shadow-lg hover:translate-y-[1px] transition-all"
            >
              <SettingIcon className="w-6 h-6 sm:mr-2" />
              <span className="hidden sm:inline-block">관리자 페이지</span>
            </Link>
            <button
              onClick={() => signOut()}
              className="px-3.5 py-2.5 flex items-center text-xs font-semibold rounded-md 
              shadow hover:shadow-lg hover:translate-y-[1px] transition-all"
            >
              <LogoutIcon className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline-block">로그아웃</span>
            </button>
          </div>
        </div>

        <div className="my-4 w-full flex flex-col rounded-md shadow">
          <h2>나의 주문 현황</h2>
          <div className="mx-auto w-full max-w-2xl flex justify-between">
            <figure className="py-10 w-full">출고대기</figure>
            <figure className="py-10 w-full">배송중</figure>
            <figure className="py-10 w-full">배송완료</figure>
            <figure className="py-10 w-full">취소/반품</figure>
          </div>
        </div>

        <div className="my-4 w-full rounded-md overflow-x-scroll">
          <table className="w-full text-sm text-left text-gray-500 border-collapse">
            <thead className="text-xs font-semibold text-gray-700 bg-gray-50">
              <tr>
                <th scope="col" className="p-4">
                  주문번호
                </th>
                <th scope="col" className="p-4">
                  주문이름
                </th>
                <th scope="col" className="p-4">
                  주문금액
                </th>
                <th scope="col" className="p-4">
                  진행상태
                </th>
                <th scope="col" className="p-4">
                  접수
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-3 whitespace-nowrap">1349781923</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  레시틴 콩크림 외 1개
                </td>
                <td className="px-4 py-3 whitespace-nowrap">38,000 원</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  결제완료 / 배송중 / 배송완료
                  <button>배송조회</button>
                  <button>후기작성</button>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <button>취소신청</button>
                  <button>반품신청</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </article>
  );
}
