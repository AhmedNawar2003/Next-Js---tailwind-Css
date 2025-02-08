import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyTokenForPage } from "../../utils/verifyToken";
import { ARTICLE_PER_PAGE } from "@/app/utils/constants";
import { Article } from "@prisma/client";
import Link from "next/link";
import { getArticles } from "@/apiCalls/articleApiCall";
import Pagination from "@/Components/article/Pagination";
import DeleteArticleButton from "./DeleteArticleButton";
import prisma from "@/app/utils/db";
interface AdminArticlesTableProps {
  searchParams: { pageNumber: string };
}
const AdminArticlesTable = async ({
  searchParams: { pageNumber },
}: AdminArticlesTableProps) => {
  const token = (await cookies()).get("jwtToken")?.value;
  if (!token) redirect("/");
  const payload = verifyTokenForPage(token);
  if (!payload?.isAdmin) redirect("/");
  const articles: Article[] = await getArticles(pageNumber);
  const count: number = await prisma.article.count();
  const pages = Math.ceil(count / ARTICLE_PER_PAGE);
  return (
    <section className="p-5">
      <h1 className="mb-7 text-2xl font-semibold text-gray-700">
        Admin Articles Table
      </h1>
      <table className="w-full  text-left">
        <thead className="border-t-2 border-b-2 border-gray-500 lg:text-xl">
          <tr>
            <th className="p-1 lg:p-">Title</th>
            <th className="hidden lg:inline-block">CreatedAt</th>
            <th>Actions</th>
            <th className="hidden lg:inline-block"></th>
          </tr>
        </thead>
        <tbody>
          {articles.map((article) => (
            <tr key={article.id} className="border-b border-t border-gray-300">
              <td className="p-3 text-gray-700">{article.title}</td>
              <td className="hidden lg:inline-block text-gray-700 font-normal p-3">
                {new Date(article.createAt).toDateString()}
              </td>
              <td className="p-3">
                <Link href={`/admin/articles-table/edit/${article.id}`} className="bg-green-600  text-white rounded-lg py-1 px-2 inline-block text-center mb-2 me-2 lg:me-3 hover:bg-green-800 transition  ">
                  Edit
                </Link>
                <DeleteArticleButton articleId={article.id} />
              </td>
              <td className="hidden lg:inline-block  p-3">
                <Link href={`/articles/${article.id}`} className="bg-blue-600 hover:bg-blue-800 text-white p-2 rounded-lg">
                  Read More
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination pages={pages} pageNumber={parseInt(pageNumber)} route="/admin/articles-table"/>
    </section>
  );
};

export default AdminArticlesTable;
