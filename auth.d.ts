import NextAuth, { Profile, Session, User } from "next-auth";

declare module "next-auth" {
  interface User extends User {
    role?: string;
  }

  interface Profile extends Profile {
    response?: {
      id?: string;
      email?: string;
      name?: string;
      role?: string;
    };
  }

  interface Session extends Session {
    user?: {
      id?: string;
      role?: string;
      name?: string;
    };
  }
}
