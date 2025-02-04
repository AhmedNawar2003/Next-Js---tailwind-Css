/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/utils/db";
import { verifyToken } from "@/app/utils/verifyToken";
import { UpdateUserDto } from "@/app/utils/dtos";
import bcrypt from "bcryptjs";
import { UpdateUserSchema } from "@/app/utils/validationSchemas";
interface Props {
  params: { id: string };
}

/**
 * @method DELETE
 * @route ~/api/users/:id
 * @desc   Delete a profile
 * @access private (only user can delete his account)
 */
export async function DELETE(request: NextRequest, { params }: Props) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(params.id) },
      include: {
        comment: true,
      },
    });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const userFromToken = verifyToken(request);
    if (userFromToken !== null && userFromToken.id === user.id) {
      // delete the user's profile
      await prisma.user.delete({ where: { id: parseInt(params.id) } });
      // delete the comments that belong to this article
      const commentIds = user?.comment.map((comment) => comment.id);
      await prisma.comment.deleteMany({ where: { id: { in: commentIds } } });
      return NextResponse.json(
        { message: "Your Profile (account) has been deleted" },
        { status: 200 }
      );
    }
    return NextResponse.json(
      { message: "You are not authorized to delete this profile , forbidden" },
      { status: 403 } //Forbidden
    );
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}

/**
 * @method GET
 * @route ~/api/users/:id
 * @desc   Get Profile By Id
 * @access private (only user can Get his account)
 */
export async function GET(request: NextRequest, { params }: Props) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(params.id) },
      select: {
        id: true,
        username: true,
        email: true,
        isAdmin: true,
        createAt: true,
      },
    });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    const userFromToken = verifyToken(request);
    if (userFromToken === null || userFromToken.id !== user.id) {
      return NextResponse.json(
        {
          message: "You are not authorized to view this profile, Access denied",
        },
        { status: 403 } //Forbidden
      );
    }
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}

/**
 * @method PUT
 * @route ~/api/users/:id
 * @desc   Update Profile
 * @access private (only user can update his account)
 */

export async function PUT(request: NextRequest, { params }: Props) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(params.id) },
    });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    const userFromToken = verifyToken(request);
    if (userFromToken === null || userFromToken.id !== user.id) {
      return NextResponse.json(
        {
          message:
            "You are not authorized to update this profile, Access denied",
        },
        { status: 403 } //Forbidden
      );
    }
    const body = (await request.json()) as UpdateUserDto;
    const validation = UpdateUserSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        { status: 400 }
      );
    }
    if (body.password) {
      const salt = await bcrypt.genSalt(10);
      body.password = await bcrypt.hash(body.password, salt);
    }
    const updatedUser = await prisma.user.update({
      where: { id: parseInt(params.id) },
      data: {
        username: body.username,
        email: body.email,
        password: body.password,
      },
    });
    const { password, ...other } = updatedUser;
    return NextResponse.json({ ...other }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}
