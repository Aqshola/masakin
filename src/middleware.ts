import { NextRequest, NextResponse } from "next/server";
import { isOpenInMobile } from "./utils/validation";

const LIST_VALIDATE = {
  "/cari": "/cari",
  "/": "/",
  "/buku": "/buku",
  "/detail": "/detail",
};



export function middleware(request: NextRequest) {
  const userAgent = request.headers.get("user-agent") || "";
  const pathname = request.nextUrl.pathname;
  //   @ts-ignore
  const isNeedValidation = !!LIST_VALIDATE[pathname];

  const isMobile = isOpenInMobile(userAgent);
  if (isMobile || !isNeedValidation) {
      const userAgent = request.headers.get("user-agent") || "";
      const pathname = request.nextUrl.pathname;
      //   @ts-ignore
      const isNeedValidation = !!LIST_VALIDATE[pathname];
      
      const isMobile = isOpenInMobile(userAgent);
      console.log(pathname,isMobile,isNeedValidation)
      
      if (isMobile || !isNeedValidation) {
        return NextResponse.next();
      }

      return NextResponse.redirect(`${request.nextUrl.origin}/forbidden`);
  }

  return NextResponse.redirect(`${request.nextUrl.origin}/forbidden`);
}

