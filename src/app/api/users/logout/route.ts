import prisma from "@/app/utils/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { setCookie } from "./../../../utils/generateToken";
import { cookies } from "next/headers";
/**
 * @method GET
 * @route ~/api/user/logout
 * @desc  Logout user
 * @access public
 */
export function GET(request: NextRequest) {
  try {
    cookies().delete("jwtToken");
    return NextResponse.json({ message: "logout" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}
