export { default } from "next-auth/middleware";

import { type NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export const middleware = async (req: NextRequest) => {
  const token = await getToken({ req });

  if (!token) {
    if (req.nextUrl.pathname.startsWith("/api")) {
      return {
        status: 401,
        body: "Unauthorized",
      };
    }
    const { pathname, search, origin, basePath } = req.nextUrl;
    const signInUrl = new URL(`${basePath}/auth/signin`, origin);
    signInUrl.searchParams.append(
      "callbackUrl",
      `${basePath}${pathname}${search}`,
    );
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
};

export const config = {
  matcher: [
    "/new",
    "/",
    "/api/bookmarks",
    "/api/comments",
    "/api/follow",
    "/api/me",
    "/api/posts/:path*",
  ],
};
