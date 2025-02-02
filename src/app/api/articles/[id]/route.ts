import { UpdateArticleDto } from "@/app/utils/dtos";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/utils/db";
/**
 * @method GET
 * @route ~/api/articles/:id
 * @desc  Get Single Article By Id
 * @access public
 */
export async function GET(request: NextRequest, context: { params: { id: string } }) {
  try {
    const { params } = context; // Extract params correctly
    const article = await prisma.article.findUnique({
      where: { id: parseInt(params.id) },
    });
    if (!article) {
      return NextResponse.json({ message: "Article not found" }, { status: 404 });
    }
    return NextResponse.json(article, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "internal server error" }, { status: 500 });
  }
}

/**
 * @method PUT
 * @route ~/api/articles/:id
 * @desc  Update Article
 * @access public
 */
export async function PUT(request: NextRequest, context: { params: { id: string } }) {
  try {
    const { params } = context; // Extract params correctly
    const article = await prisma.article.findUnique({
      where: { id: parseInt(params.id) },
    });
    if (!article) {
      return NextResponse.json({ message: "Article not found" }, { status: 404 });
    }
    const body = (await request.json()) as UpdateArticleDto;
    const updatedArticle = await prisma.article.update({
      where: { id: parseInt(params.id) },
      data: {
        title: body.title,
        description: body.description,
      },
    });

    return NextResponse.json(updatedArticle, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "internal server error" }, { status: 500 });
  }
}

/**
 * @method DELETE
 * @route ~/api/articles/:id
 * @desc  Delete Article
 * @access public
 */
export async function DELETE(request: NextRequest, context: { params: { id: string } }) {
  try {
    const { params } = context; // Extract params correctly
    const article = await prisma.article.findUnique({
      where: { id: parseInt(params.id) },
    });
    if (!article) {
      return NextResponse.json({ message: "Article not found" }, { status: 404 });
    }
    await prisma.article.delete({ where: { id: parseInt(params.id) } });
    return NextResponse.json({ message: "Article deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "internal server error" }, { status: 500 });
  }
}
