"use client";
import Link from "next/link";

interface errorProps {
  error: Error;
  reset: () => void;
}
const ArticlesErrorPage = ({ error, reset }: errorProps) => {
  return (
    <div className="p-7 text-center">
        <p className="mb-2">This is custom error page for articles route/page</p>
      <div className="text-3xl text-red-600 font-semibold">
        <h1>404 Page Not Found</h1>
        <p>عذر��ا، المصفحة التي تحتا�� ��ليها ��ير موجودة.</p>
        <h2 className="text-gray-700 my-3 text-xl">Error Message : {error.message}</h2>
        <button onClick={reset} className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-full font-bold mt-6 ">
          Try again
        </button>
      </div>
      <Link href="/" className="text-xl underline text-blue-700 block mt-6">
        Go to home page
      </Link>
    </div>
  );
};

export default ArticlesErrorPage;
