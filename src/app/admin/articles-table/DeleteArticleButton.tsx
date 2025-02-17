"use client";

import { DOMAIN } from "@/app/utils/constants";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface DeleteArticleButtonProps {
  articleId: number;
}

const DeleteArticleButton = ({ articleId }: DeleteArticleButtonProps) => {
  const router = useRouter();
  const deleteArticleHandler = async () => {
    try {
      if (confirm("Are you sure you want to delete this Article")) {
        await axios.delete(`${DOMAIN}/api/articles/${articleId}`);
        router.refresh();
        toast.success("Article deleted successfully");
      }
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
    <div
      onClick={deleteArticleHandler}
      className="bg-red-600 text-white rounded-lg cursor-pointer inline-block text-center py-1 px-2 hover:bg-red-800 transition"
    >
      Delete
    </div>
  );
};

export default DeleteArticleButton;
