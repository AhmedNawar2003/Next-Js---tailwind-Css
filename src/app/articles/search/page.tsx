import { getArticlesBasedOnSearch } from "@/apiCalls/articleApiCall";
import ArticleItem from "@/Components/article/ArticleItem";
import { Article } from "@prisma/client";
interface SearchArticlePageProps {
  searchParams: { searchText: string };
}
const SearchPage = async ({
  searchParams: { searchText },
}: SearchArticlePageProps) => {
  const articles: Article[] = await getArticlesBasedOnSearch(searchText);
  return (
    <section className="fix-height container m-auto px-5">
      {articles.length ===0 ? (
      <h2 className="text-gray-800 text-2xl font-bold p-5">
        <span className="my-3"> No articles found matching the search query:</span>
        <span className="text-red-500"> {searchText}</span>
      </h2>
      ):(
      <>
        <h1 className="text-2xl font-bold my-5 text-gray-800">
          <span className="me-2">Articles based on</span>
          <span className="ms-1 text-green-700 text-3xl font-bold">
            {searchText}
          </span>
        </h1>
        <div className="flex items-center justify-center flex-wrap gap-7">
          {articles.map((article) => (
            <ArticleItem key={article.id} article={article} />
          ))}
        </div>
      </>
      )}
    </section>
  );
};

export default SearchPage;
