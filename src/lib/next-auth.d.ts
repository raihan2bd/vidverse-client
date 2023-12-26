import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: number;
      user_name: string;
      user_role: string;
      avatar: string;
    };
    token: string;
    expires_at: number;
    error?: "RefreshAccessTokenError"
  }
}

import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    user: {
      id: number;
      user_name: string;
      user_role: string;
      avatar: string;
    };
    token: string;
    expires_at: number;
    error?: "RefreshAccessTokenError"
  }
}
