// middleware.ts
import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { routing } from "./i18n/routing";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const isEnglishLocale = request.nextUrl.pathname.startsWith("/en");
  if (request.nextUrl.pathname.startsWith("/ar")) {
    const newPathname = request.nextUrl.pathname.replace("/ar", "");
    const url = new URL(request.nextUrl.origin + newPathname);

    return NextResponse.redirect(url);
  }
  response.cookies.set("NEXT_LOCALE", isEnglishLocale ? "en" : "ar");

  // const guestToken = request.cookies.get("guest");
  // const userToken = request.cookies.get("token");

  // if (!guestToken && !userToken) {
  //   const stringSpace =
  //     "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  //   const stringLength = stringSpace.length;
  //   let randomString = "";

  //   for (let i = 0; i < 128; i++) {
  //     randomString += stringSpace[Math.floor(Math.random() * stringLength)];
  //   }
  //   // const ONE_MONTH_IN_SECONDS = 30 * 24 * 60 * 60;
  //   response.cookies.set("guest", randomString, {
  //     maxAge: 360 * 24 * 60 * 60,
  //   });
  //   // response.cookies.set("guest", randomString, { expires: 30 });
  // }
  // if (userToken) {
  //   response.cookies.delete("guest");
  // }
  // if (!userToken) {
  //   response.cookies.delete("sessionToken");
  //   response.cookies.delete("token");
  // }
  // if (
  //   request.nextUrl.pathname.startsWith(
  //     `${isEnglishLocale ? "/en" : ""}/profile`
  //   ) &&
  //   !userToken
  // ) {
  //   return NextResponse.redirect(
  //     new URL(`${isEnglishLocale ? "/en" : "/"}`, request.url)
  //   );
  // }
  // if (
  //   request.nextUrl.pathname.startsWith(
  //     `${isEnglishLocale ? "/en" : ""}/auth`
  //   ) &&
  //   userToken
  // ) {
  //   return NextResponse.redirect(
  //     new URL(`${isEnglishLocale ? "/en" : "/"}`, request.url)
  //   );
  // }
  // Handle internationalization routing
  const handleI18nRouting = createMiddleware(routing);
  const i18nResponse = handleI18nRouting(request);

  // Merge headers and cookies from i18nResponse to response
  i18nResponse.headers.forEach((value, key) => {
    response.headers.set(key, value);
  });

  const setCookieHeaders = i18nResponse.headers.get("set-cookie");
  if (setCookieHeaders) {
    setCookieHeaders.split(",").forEach((cookie) => {
      response.headers.append("set-cookie", cookie);
    });
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|logo.png|logo_white.png|_next/static/chunks/app|_next/static/chunks|assets/images|assets/icons|assets/font).*)",
  ],
};
