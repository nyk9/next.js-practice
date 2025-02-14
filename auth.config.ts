import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    // 公式のコードでは上手く動かなかったので、下記のように修正
    // authorized({ auth, request: { nextUrl } }) {
    //   const isLoggedIn = !!auth?.user;
    //   const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
    //   if (isOnDashboard) {
    //     if (isLoggedIn) return false;  // ここが問題
    //     return false;  // ここも問題
    //   } else if (isLoggedIn) {
    //     return Response.redirect(new URL("/dashboard", nextUrl));
    //   }
    //   return true;
    // },

    // Claude 3.5 sonnet さんのコード（これだと上手くいった）
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
      
      if (isOnDashboard) {
        return isLoggedIn;
      }
      
      if (isLoggedIn && nextUrl.pathname === '/login') {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }
      
      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
