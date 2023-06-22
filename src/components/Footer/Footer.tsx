import Logo from "assets/logo.svg";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-10 p-8 pb-10 w-full flex flex-col gap-y-2 text-sm border-t border-gray-300">
      <div
        className="pb-4 w-full flex justify-between items-start border-b border-gray-200 
          sm:flex-row sm:border-0"
      >
        <Logo className="flex-shrink-0 mr-4 w-auto h-10" />

        <div className="flex justify-end flex-wrap gap-x-8 gap-y-2 font-semibold">
          <Link href={"/term"} className="hover:underline">
            이용 약관
          </Link>
          <Link href={"/personal-information"} className="hover:underline">
            개인정보처리방침
          </Link>
          <Link href={"/delivery"} className="hover:underline">
            배송안내
          </Link>
          <Link href={"/cancel-refund"} className="hover:underline">
            반품/교환 안내
          </Link>
          <Link href={"/FAQ"} className="hover:underline">
            FAQs
          </Link>
        </div>
      </div>

      <div className="pt-4 flex flex-col gap-x-4 sm:flex-row">
        <p>경상남도 밀양시 단장면 바드리길 385 (우 : 50418)</p>
        <p>대표자: 정재훈</p>
      </div>

      <div className="flex flex-col gap-x-4 sm:flex-row">
        <p>상호명: 해달뫼</p>
        <p>사업자등록번호: 2037904445</p>
        <p>제품 문의: 010-3556-2595</p>
        <p>전자 우편 주소: healcoline@naver.com</p>
      </div>

      <p>Copyright © 2023 해달뫼. All Rights Reserved.</p>
    </footer>
  );
}
