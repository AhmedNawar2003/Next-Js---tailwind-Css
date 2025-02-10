import { getSingleArticle } from "@/apiCalls/articleApiCall";
import { verifyTokenForPage } from "@/app/utils/verifyToken";
import { Article } from "@prisma/client";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import EditArticleForm from "./EditArticleForm";

interface EditArticlePageProps {
  params: { id: string }; // Ensure ID is a string
}

const EditArticlePage = async ({ params }: EditArticlePageProps) => {
  const cookieStore = cookies();
  const token = (await cookieStore).get("jwtToken")?.value;

  // Redirect if token is missing
  if (!token) {
    redirect("/");
  }

  const payload = verifyTokenForPage(token);

  // Redirect if the user is not an admin
  if (!payload?.isAdmin) {
    redirect("/");
  }

  try {
    const article: Article | null = await getSingleArticle(params.id);

    // Redirect if article is not found
    if (!article) {
      redirect("/not-found");
    }

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
  } catch (error) {
    console.error("Error fetching article:", error);
    redirect("/error");
  }
};

export default EditArticlePage;
