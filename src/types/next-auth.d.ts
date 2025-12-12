import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    email: string;
    fullName: string | null;
  }

  interface Session {
    user: {
      id: string;
      email: string;
      fullName: string | null;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user?: {
      id: string;
      email: string;
      fullName: string | null;
    };
  }
}