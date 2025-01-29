const pages = [1, 2, 3, 4, 5];
const Pagination = () => {
  return (
    <div className="flex items-center justify-center mt-2 mb-10">
        <div
          className="border border-gray-700 text-gray-700 py-1 px-3 cursor-pointer text-xl hover:bg-gray-200 transition-all  font-bold"
        >
          Prev
        </div>
      {pages.map((page) => (
        <div
          key={page}
          className="border border-gray-700 text-gray-700 py-1 px-3 cursor-pointer text-xl hover:bg-gray-200 transition-all  font-bold"
        >
          {page}
        </div>
      ))}
      <div
        className="border border-gray-700 text-gray-700 py-1 px-3 cursor-pointer text-xl hover:bg-gray-200 transition-all  font-bold"
      >
        Next
      </div>
    </div>
  );
};

export default Pagination;
