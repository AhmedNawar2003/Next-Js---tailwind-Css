import { CreateArticleSchema } from "@/app/utils/validationSchemas";
import { NextRequest, NextResponse } from "next/server";
import { CreateArticleDto } from "./../../utils/dtos";
import { Article } from "@prisma/client";
import prisma from "@/app/utils/db";
/**
 * @method GET
 * @route ~/api/articles
 * @desc  Get All Articles
 * @access public
 */
export async function GET(request: NextRequest) {
  try {
    const articles = await prisma.article.findMany();
    return NextResponse.json(articles, { status: 200 });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
 * @access public
 */
export async function POST(request: NextResponse) {
  try {
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}
