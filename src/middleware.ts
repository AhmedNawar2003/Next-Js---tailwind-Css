import { NextRequest, NextResponse } from "next/server";

export default function middleWare(request: NextRequest) {
  const jwtToken = request.cookies.get("jwtToken");
  const token = jwtToken?.value as string;
  if (!token) {
    return NextResponse.json(
      {
        message:
          "Token not provided,access denied , This message from MiddleWare",
      },
      { status: 401 } //unauthorized
    );
  }
}

export const config = {
  matcher: ["/api/users/profile/:path*"],
};
