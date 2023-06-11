import NextAuth, { Profile } from "next-auth";

declare module "next-auth" {
  interface Profile extends Profile {
    response?: {
      id?: string;
      email?: string;
      name?: string;
    };
  }
}
