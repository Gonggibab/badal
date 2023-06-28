import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { useRecoilState, useSetRecoilState } from "recoil";
import Link from "next/link";
import axios from "axios";

import { Section, cartItemsAtom, mySectionAtom } from "common/recoil/atom";
import { UserType } from "common/types/user";
import UserSection from "components/My/UserSection/UserSection";
import OrderSection from "components/My/OrderSection/OrderSection";
import LogoutIcon from "assets/icon/logout.svg";
import SettingIcon from "assets/icon/setting.svg";
import Loader from "components/Loader/Loader";

export default function My() {
  const { data } = useSession();
  const setCartItems = useSetRecoilState(cartItemsAtom);
  const [section, setSection] = useRecoilState(mySectionAtom);
  const [curSection, setCurSection] = useState(Section.USER_INFO);
  const [user, setUser] = useState<UserType | null>(null);
  const [isLoadAdress, setIsLoadAdress] = useState<boolean>(false);

  // 저장된 마지막 섹션을 불러와 설정
  useEffect(() => {
    setCurSection(section);
  }, [section]);

  useEffect(() => {
    // 유저 데이터 불러오기
    const getUserData = async () => {
      if (!data?.user) return;

      const userRes = await axios.get(`/api/user/${data.user.id}`);
      const user: UserType = userRes.data.data;
      setUser(user);
    };

    getUserData();
  }, [data]);

  return (
    <main className="p-4 min-h-[calc(100vh-80px)] flex flex-col items-center sm:p-8">
      {user && (
        <>
          <div className="w-full max-w-4xl flex justify-between items-center">
            <h1 className="text-2xl font-bold tracking-tight text-orange-500 sm:text-3xl">
              {user.name}{" "}
              <span className="text-xl font-semibold text-gray-900 tracking-tight">
                님 반갑습니다
              </span>
            </h1>

            <div className="flex-shrink-0 flex gap-x-4">
              <Link
                href={"/admin"}
                className="px-2 py-1.5 flex items-center text-xs font-semibold rounded-md 
                  shadow hover:shadow-lg hover:translate-y-[1px] transition-all 
                  sm:px-3.5 sm:py-2.5 focus:ring-2 focus:ring-inset focus:ring-orange-500"
              >
                <SettingIcon className="w-6 h-6 sm:mr-2" />
                <span className="hidden sm:inline-block">관리자 페이지</span>
              </Link>
              <button
                onClick={() => {
                  setCartItems([]);
                  signOut();
                }}
                className="px-2.5 py-1.5 flex items-center text-xs font-semibold rounded-md 
                  shadow hover:shadow-lg hover:translate-y-[1px] transition-all 
                  sm:px-3.5 sm:py-2.5 focus:ring-2 focus:ring-inset focus:ring-orange-500"
              >
                <LogoutIcon className="w-5 h-5 sm:mr-2" />
                <span className="hidden sm:inline-block">로그아웃</span>
              </button>
            </div>
          </div>

          <nav className="mt-6 w-full h-14 max-w-4xl flex items-end gap-x-4 border-b border-gray-200">
            <button
              type="button"
              className={`${
                curSection === Section.USER_INFO
                  ? "font-semibold border-gray-500"
                  : "text-sm"
              } px-4 py-4 border-b-2 transition-all focus:border-orange-500`}
              onClick={() => setSection(Section.USER_INFO)}
            >
              고객 정보
            </button>
            <button
              type="button"
              className={`${
                curSection === Section.ORDER_INFO
                  ? "font-semibold border-gray-500"
                  : "text-sm"
              } px-4 py-4 border-b-2 transition-all focus:border-orange-500`}
              onClick={() => setSection(Section.ORDER_INFO)}
            >
              주문 정보
            </button>
          </nav>

          {curSection === Section.USER_INFO && (
            <UserSection user={user} setIsLoadAdress={setIsLoadAdress} />
          )}
          {curSection === Section.ORDER_INFO && (
            <OrderSection userId={data?.user?.id} />
          )}
        </>
      )}

      <Loader isLoading={!user || isLoadAdress} />
    </main>
  );
}
