import NextAuth, { Profile, Session } from "next-auth";

declare module "next-auth" {
  interface Profile extends Profile {
    response?: {
      id?: string;
      email?: string;
      name?: string;
    };
  }

  interface Session extends Session {
    user?: {
      id?: string;
    };
  }
}
