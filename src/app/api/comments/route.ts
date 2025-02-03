/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/utils/db";
import { verifyToken } from "@/app/utils/verifyToken";
import { CreateCommentDto } from "@/app/utils/dtos";
import { CreateCommentSchema } from "@/app/utils/validationSchemas";

/**
 * @method POST
 * @route ~/api/comments
 * @desc  create New Comment
 * @access private (only logged in user)
 */

export async function POST(request: NextRequest) {
  try {
    const user = verifyToken(request);
    if (!user) {
      return NextResponse.json(
        { message: "unauthorized, allowed for logged user only" },
        { status: 401 }
      );
    }
    const body = (await request.json()) as CreateCommentDto;
    const validation = CreateCommentSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        { status: 400 }
      );
    }
    const newComment = await prisma.comment.create({
      data: {
        text: body.text,
        articleId: body.articleId,
        userId: user.id,
      },
    });
    return NextResponse.json(newComment, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}

/**
 * @method GET
 * @route ~/api/comments
 * @desc  Get All comments
 * @access private (only Admin can access this)
 */
export async function GET(request: NextRequest) {
  try {
    const user = verifyToken(request);
    if (!user || !user.isAdmin) {
      return NextResponse.json(
        { message: "unauthorized, allowed for admin only" },
        { status: 403 }
      );
    }
    const comments = await prisma.comment.findMany();
    return NextResponse.json(comments, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}
