const articleSkeleton = [1, 2, 3, 4, 5, 6];
const ArticleLoading = () => {
  return (
    <section className="fix-height container m-auto px-5 animate-pulse">
      <div className="my-5 w-full md:w-2/3 m-auto bg-gray-300 h-12 rounded"></div>
      <div className="flex items-center justify-center flex-wrap gap-7">
      {articleSkeleton.map((item) => (
        <div
          key={item}
          className="p-5 rounded-lg shadow-lg bg-gray-200  w-full md:w-2/5 lg:w-1/4 m-3"
        >
          <h3 className="h-6 bg-gray-300 "></h3>
          <p className="my-2  bg-gray-300 p-1 h-10"></p>
          <div className="w-full block  p-1 bg-gray-400 rounded-lg h-8"></div>
        </div>
      ))}
      </div>
      <div className="flex items-center justify-center mt-2 mb-10">
        <div className="bg-gray-300 w-72 rounded-sm h-9"></div>
      </div>
    </section>
  );
};

export default ArticleLoading;
