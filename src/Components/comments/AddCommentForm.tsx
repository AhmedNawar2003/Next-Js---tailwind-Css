"use client";
import { DOMAIN } from "@/app/utils/constants";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

interface AddCommentFormProps {
  articleId: number;
}

const AddCommentForm = ({ articleId }: AddCommentFormProps) => {
  const router = useRouter();
  const [text, setText] = useState("");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (text === "") return toast.error("Please Write Something");
    try {
      await axios.post(`${DOMAIN}/api/comments`, { text, articleId });
      router.refresh();
      setText("");
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
      <form onSubmit={handleSubmit} className="my-5">
        <input
          className="rounded-lg text-xl w-full bg-white focus:shadow-md p-3"
          type="text"
          placeholder="Add a Comment"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          className="rounded-lg text-xl w-min bg-green-700 hover:bg-green-900 text-white my-2 p-3"
          type="submit"
        >
          Comment
        </button>
      </form>
    </div>
  );
};

export default AddCommentForm;
