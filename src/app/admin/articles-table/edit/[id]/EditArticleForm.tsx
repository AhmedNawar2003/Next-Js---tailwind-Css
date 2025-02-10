"use client";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { DOMAIN } from "../../../../utils/constants";
import { useRouter } from "next/navigation";
import { Article } from "@prisma/client";

interface EditArticleFormProps {
  article: Article | null;  // Ensure article can be null for safety
}

const EditArticleForm = ({ article }: EditArticleFormProps) => {
  const router = useRouter();

  // Ensure default values in case article is null/undefined
  const [title, setTitle] = useState(article?.title ?? "");
  const [description, setDescription] = useState(article?.description ?? "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) return toast.error("Title is required");
    if (!description.trim()) return toast.error("Description is required");

    try {
      await axios.put(`${DOMAIN}/api/articles/${article?.id}`, { title, description });
      toast.success("Article updated successfully");
      router.refresh();
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || "An error occurred");
      } else {
        toast.error("An unexpected error occurred");
      }
      console.error(error);
    }
  };

  if (!article) {
    return <p className="text-red-500">Article not found or loading...</p>;
  }

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
