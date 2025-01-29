"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
const SearchArticleInput = () => {
  const router=useRouter();
  const [searchText, setSearchText] = useState("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ searchText });
    router.push(`/articles/search?searchText=${searchText}`); // Redirect to search results page with query parameter
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className="my-5 w-full md:w-2/3 m-auto">
        <input
          className="w-full p-3 text-xl  border-none rounded-lg text-gray-900"
          type="search"
          placeholder="Search for articles"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
       
      </form>
    </div>
  );
};

export default SearchArticleInput;
