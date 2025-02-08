/* eslint-disable @typescript-eslint/no-unused-vars */
import { CreateArticleSchema } from "@/app/utils/validationSchemas";
import { NextRequest, NextResponse } from "next/server";
import { CreateArticleDto } from "./../../utils/dtos";
import { Article } from "@prisma/client";
import prisma from "@/app/utils/db";
import { ARTICLE_PER_PAGE } from "@/app/utils/constants";
import { verifyToken } from "@/app/utils/verifyToken";
/**
 * @method GET
 * @route ~/api/articles
 * @desc  Get Articles By page number
 * @access public
 */
export async function GET(request: NextRequest) {
  const pageNumber = request.nextUrl.searchParams.get("pageNumber") || "1";
  try {
    const articles = await prisma.article.findMany({
      skip: ARTICLE_PER_PAGE * (parseInt(pageNumber) - 1),
      take: ARTICLE_PER_PAGE,
      orderBy: { createAt: "desc" },
    });
    return NextResponse.json(articles, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}

/**
 * @method POST
 * @route ~/api/articles
 * @desc  Create a New Article
 * @access private (only admin can create article)
 */
export async function POST(request: NextRequest) {
  try {
    const user = verifyToken(request);
    if (!user || !user.isAdmin) {
      return NextResponse.json(
        { message: "unauthorized, allowed for admin only" },
        { status: 403 }
      );
    }
    const body = (await request.json()) as CreateArticleDto;
    const validation = CreateArticleSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        { status: 400 }
      );
    }
    const newArticle: Article = await prisma.article.create({
      data: {
        title: body.title,
        description: body.description,
      },
    });
    return NextResponse.json(newArticle, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}
