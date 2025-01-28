import { Article } from "@/app/utils/types"
import Link from "next/link";

interface SingleArticlePageProps {
    params: {id: string}
}
const SingleArticlePage = async ({params}:SingleArticlePageProps) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`)
    const article:Article = await response.json();
    if(!response.ok){
        throw new Error(`Failed to fetch article: ${response.status}`)
    }
  return (
    <section className="fix-height container m-auto w-full px-5 pt-8 md:w-3/4">
      <div className="bg-white p-7 rounded-lg">
      <h1 className="text-3xl font-bold text-gray-700 m-3">{article.title}</h1>
      </div>
      <h2 className="text-xl font-bold text-gray-700 m-3">Author: {article.userId}</h2>
      <p className="text-gray-800 text-xl m-3">{article.body}</p>
      <Link className="text-xl text-blue-700 underline m-3" href={`/articles`}>Back to articles</Link>
    </section>
  )
}

export default SingleArticlePage
