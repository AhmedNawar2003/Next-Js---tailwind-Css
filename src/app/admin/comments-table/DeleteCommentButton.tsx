"use client";
import { DOMAIN } from "@/app/utils/constants";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface DeleteCommentButtonProps {
  commentId: number;
}
const DeleteCommentButton = ({ commentId }: DeleteCommentButtonProps) => {
  const router = useRouter();
  const deleteCommentHandler = async () => {
    try {
      if (confirm("Are you sure you want to delete this comment")) {
        await axios.delete(`${DOMAIN}/api/comments/${commentId}`);
        router.refresh();
        toast.success("Comment deleted successfully!");
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
      onClick={deleteCommentHandler}
      className="bg-red-600 hover:bg-red-800 text-white inline-block rounded-lg py-1 px-2 cursor-pointer transition"
    >
      Delete
    </div>
  );
};

export default DeleteCommentButton;
