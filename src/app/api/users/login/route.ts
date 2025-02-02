import prisma from "@/app/utils/db";
import { LoginUserDto } from "@/app/utils/dtos";
import { LoginSchema } from "@/app/utils/validationSchemas";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { generateJWT } from "./../../../utils/generateToken";
import { JWTPayload } from "@/app/utils/types";
/**
 * @method POST
 * @route ~/api/user/login
 * @desc  Login user ( Login || Sign in || Authentication)
 * @access public
 */
export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as LoginUserDto;
    const validation = LoginSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        { status: 400 }
      );
    }
    const user = await prisma.user.findUnique({ where: { email: body.email } });
    if (!user) {
      return NextResponse.json(
        {
          message: "Invalid email or password",
        },
        { status: 400 }
      );
    }
    const isPasswordMatch = await bcrypt.compare(body.password, user.password);
    if (!isPasswordMatch) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 400 }
      );
    }
    const jwtPayload: JWTPayload = {
      id: user.id,
      isAdmin: user.isAdmin,
      username: user.username,
    };
    const token = generateJWT(jwtPayload);
    return NextResponse.json(
      { message: "Authenticated", token },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}
