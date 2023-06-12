import NextAuth from "next-auth";
import NaverProvider from "next-auth/providers/naver";
import KakaoProvider from "next-auth/providers/kakao";
import type { NextAuthOptions } from "next-auth";
import prisma from "common/lib/prisma";

export const authOptions: NextAuthOptions = {
  providers: [
    NaverProvider({
      clientId: process.env.NAVER_ID!,
      clientSecret: process.env.NAVER_SECRET!,
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_ID!,
      clientSecret: process.env.KAKAO_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, profile }) {
      if (profile) {
        user.name = profile.response?.name || user.name;
        user.email = profile.response?.email || user.email;
      }

      try {
        // 데이터베이스에 유저가 있는지 확인
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email! },
        });

        // 없으면 데이터베이스에 유저 추가
        if (!existingUser) {
          await prisma.user.create({
            data: { name: user.name!, email: user.email! },
          });
        }

        return true;
      } catch (error) {
        console.log("로그인 도중 에러가 발생했습니다. " + error);
        return false;
      }
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
