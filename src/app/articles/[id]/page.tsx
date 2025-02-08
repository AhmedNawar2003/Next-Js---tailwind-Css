import { getSingleArticle } from "@/apiCalls/articleApiCall";
import AddCommentForm from "@/Components/comments/AddCommentForm";
import CommentItem from "@/Components/comments/CommentItem";
import { SingleArticle } from "@/app/utils/types";
import { cookies } from "next/headers";
import { verifyTokenForPage } from "@/app/utils/verifyToken";
import { Metadata } from "next";

interface SingleArticlePageProps {
  params: { id: string };
}
const SingleArticlePage = async ({ params }: SingleArticlePageProps) => {
  const token = (await cookies()).get("jwtToken")?.value || "";
  const payload = verifyTokenForPage(token);
  const article: SingleArticle = await getSingleArticle(params.id);

  return (
    <section className="fix-height container m-auto w-full px-5 pt-8 md:w-3/4">
      <div className="bg-white p-7 rounded-lg">
        <h1 className="text-3xl font-bold text-gray-700 my-3">
          {article.title}
        </h1>
      </div>
      <div className=" text-gray-400 my-3">
        {new Date(article.createAt).toDateString()}
      </div>
      <p className="text-gray-800 text-xl my-3">{article.description}</p>
      <div className="my-4">
        {payload ? (
          <AddCommentForm articleId={article.id} />
        ) : (
          <p className="text-blue-600 md:text-xl">
            Please log in to add a comment.
          </p>
        )}
      </div>
      <h4 className="text-xl text-gray-800 ps-1 font-semibold mb-2 mt-7 capitalize">
        comments
      </h4>
      {article.comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} userId={payload?.id} />
      ))}
    </section>
  );
};

export default SingleArticlePage;

export const metadata: Metadata = {
  title: "Article page",
  description: "This is an article page",
};
