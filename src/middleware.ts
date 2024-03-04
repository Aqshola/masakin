import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { isOpenInMobile } from "./utils/validation";

const LIST_VALIDATE = {
  "/cari": "/cari",
  "": "/",
  "/buku": "/buku",
  "/detail": "/detail",
};

export default createMiddleware({
  // A list of all locales that are supported
  locales: ["id"],

  // Used when no locale matches
  defaultLocale: "id",
});


export function middleware(request: NextRequest) {
  const userAgent = request.headers.get("user-agent") || "";
  const pathname = request.nextUrl.pathname;
  //   @ts-ignore
  const isNeedValidation = !!LIST_VALIDATE[pathname];

  const isMobile = isOpenInMobile(userAgent);
  console.log(isNeedValidation);
  if (isMobile || !isNeedValidation) {
    //   const userAgent = request.headers.get("user-agent") || "";
    //   const pathname = request.nextUrl.pathname;
    //   //   @ts-ignore
    //   const isNeedValidation = !!LIST_VALIDATE[pathname];

    //   const isMobile = isOpenInMobile(userAgent);
    //   console.log(isNeedValidation);
    //   if (isMobile || !isNeedValidation) {
    //     return NextResponse.next();
    //   }

    //   return NextResponse.redirect(`${request.nextUrl.origin}/forbidden`);

    return NextResponse.next();
  }

  return NextResponse.redirect(`${request.nextUrl.origin}/forbidden`);
}

export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/(de|en)/:path*"],
};
