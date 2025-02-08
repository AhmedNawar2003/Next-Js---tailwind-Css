import Link from "next/link";
interface PaginationProps {
  pages: number;
  pageNumber: number;
  route: string;
}
const Pagination = ({ pageNumber, pages, route }: PaginationProps) => {
  let pagesArray: number[] = [];
  for (let i = 1; i <= pages; i++) {
    pagesArray.push(i);
  }
  const prev = pageNumber - 1;
  const next = pageNumber + 1;
  return (
    <div className="flex items-center justify-center mt-2 mb-10">
      {pageNumber !== 1 && (
        <Link
          href={`${route}?pageNumber=${prev}`}
          className="border border-gray-700 text-gray-700 py-1 px-3 cursor-pointer text-xl hover:bg-gray-200 transition-all  font-bold"
        >
          Prev
        </Link>
      )}
      {pagesArray.map((page) => (
        <Link
          href={`${route}?pageNumber=${page}`}
          key={page}
          className={`${pageNumber === page ? "bg-gray-400":""} border border-gray-700 text-gray-700 py-1 px-3 cursor-pointer text-xl  font-bold`}
        >
          {page}
        </Link>
      ))}
      {pageNumber != pages && (
        <Link
          href={`${route}?pageNumber=${next}`}
          className="border border-gray-700 text-gray-700 py-1 px-3 cursor-pointer text-xl hover:bg-gray-200 transition-all  font-bold"
        >
          Next
        </Link>
      )}
    </div>
  );
};

export default Pagination;
