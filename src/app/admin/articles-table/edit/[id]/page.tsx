import { getSingleArticle } from "@/apiCalls/articleApiCall";
import { verifyTokenForPage } from "@/app/utils/verifyToken";
import { Article } from "@prisma/client";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import EditArticleForm from "./EditArticleForm";

const EditArticlePage = async ({ params }: { params: { id: string } }) => {
  const token = (await cookies()).get("jwtToken")?.value;
  if (!token) redirect("/");
  const payload = verifyTokenForPage(token);
  if (!payload?.isAdmin) redirect("/");
  const article: Article = await getSingleArticle(params.id);
  return (
    <section className="fix-height flex items-center justify-center px-5 lg:px-20">
      <div className="shadow p-4 bg-purple-200 rounded w-full">
        <h2 className="text-2xl text-green-700 font-semibold mb-4">
          Edit Article
        </h2>
        <EditArticleForm article={article} />
      </div>
    </section>
  );
};

export default EditArticlePage;
