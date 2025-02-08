/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { DOMAIN } from "../../../../utils/constants";
import { useRouter } from "next/navigation";
import { Article } from "@prisma/client";

interface EditArticleFormProps {
  article: Article;
}
const EditArticleForm = ({ article }:EditArticleFormProps) => {
  const router = useRouter();
  const [title, setTitle] = useState(article.title);
  const [description, setDescription] = useState(article.description);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title === "") return toast.error("Title is required");
    if (description === "") return toast.error("Description is required");
    try {
      await axios.put(`${DOMAIN}/api/articles/${article.id}`, { title, description });
      toast.success("Article Updated successfully");
      router.refresh();
    } catch (error: any) {
      toast.error(error?.response?.data.message);
      console.log(error);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg mb-4"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="p-2 mb-4 lg:text-xl rounded resize-none w-full"
          rows={5}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button
          className="w-full px-5 py-2 text-white bg-green-700 rounded-lg hover:bg-green-900 transition-all"
          type="submit"
        >
          Edit
        </button>
      </form>
    </div>
  );
};

export default EditArticleForm;
