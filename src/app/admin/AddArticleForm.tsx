"use client";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { DOMAIN } from "../utils/constants";
import { useRouter } from "next/navigation";

const AddArticleForm = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title === "") return toast.error("Title is required");
    if (description === "") return toast.error("Description is required");
    try {
      await axios.post(`${DOMAIN}/api/articles`, { title, description });
      setTitle("");
      setDescription("");
      toast.success("New Article added successfully");
      router.refresh();
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "An error occurred");
      } else {
        toast.error("An unexpected error occurred");
      }
      console.error(error);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg mb-4"
          type="text"
          placeholder="Enter Article Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="p-2 mb-4 lg:text-xl rounded resize-none w-full"
          rows={5}
          placeholder="Enter Article Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button
          className="w-full px-5 py-2 text-white bg-blue-700 rounded-lg hover:bg-blue-900 transition-all"
          type="submit"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default AddArticleForm;
