/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/utils/db";
import { verifyToken } from "@/app/utils/verifyToken";
import { UpdateCommentDto } from "@/app/utils/dtos";

interface Props {
  params: { id: string };
}

/**
 * @method PUT
 * @route ~/api/comments/:id
 * @desc  Update Comment
 * @access private (only logged in user)
 */

export async function PUT(request: NextRequest, { params }: Props) {
  try {
    const comment = await prisma.comment.findUnique({
      where: { id: parseInt(params.id) },
    });
    if (!comment) {
      return NextResponse.json(
        { message: "Comment not found" },
        { status: 404 }
      );
    }
    const user = verifyToken(request);
    if (user === null || user.id !== comment.userId) {
      return NextResponse.json(
        {
          message:
            "You are not authorized to update this comment, Access denied",
        },
        { status: 403 } //Forbidden
      );
    }
    const body = (await request.json()) as UpdateCommentDto;
    const updatedComment = await prisma.comment.update({
      where: { id: parseInt(params.id) },
      data: { text: body.text },
    });
    return NextResponse.json(updatedComment, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}

/**
 * @method DELETE
 * @route ~/api/comments/:id
 * @desc  Delete Comment
 * @access private (only admin or owner of the comment)
 */

export async function DELETE(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const comment = await prisma.comment.findUnique({
      where: { id: parseInt(context.params.id) },
    });
    if (!comment) {
      return NextResponse.json(
        { message: "Comment not found" },
        { status: 404 }
      );
    }
    const user = verifyToken(request);
    if (user === null) {
      return NextResponse.json(
        {
          message:
            "No Token Provided and you are not authorized to delete this comment, Access denied",
        },
        { status: 401 }
      );
    }
    if (user.isAdmin || user.id === comment.userId) {
      await prisma.comment.delete({
        where: { id: parseInt(context.params.id) },
      });
      return NextResponse.json(
        { message: "Comment deleted successfully" },
        { status: 200 }
      );
    }
    return NextResponse.json(
      {
        message: "You are not authorized (allowed) to delete this comment, Access denied",
      },
      { status: 403 } //Forbidden
    );
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}
