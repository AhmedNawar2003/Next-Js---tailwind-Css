import ArticleItem from "@/Components/article/ArticleItem";
import { Article } from "../utils/types";
import { Metadata } from "next";
import SearchArticleInput from "@/Components/article/SearchArticleInput";
import Pagination from "@/Components/article/Pagination";
const ArticlePage = async () => {
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
    }, 2000);
  });
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const articles: Article[] = await response.json();

  return (
    <section className="container m-auto px-5">
      <SearchArticleInput />
      <div className="flex items-center justify-center flex-wrap gap-7">
        {articles.slice(0, 6).map((item) => (
          <ArticleItem article={item} key={item.id} />
        ))}
      </div>
      <Pagination/>
    </section>
  );
};

export default ArticlePage;

export const metadata: Metadata = {
  title: "Articles Page",
  description: " Articles about programming",
};
