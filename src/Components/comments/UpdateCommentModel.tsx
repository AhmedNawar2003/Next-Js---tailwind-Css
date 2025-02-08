"use client";
import { DOMAIN } from "@/app/utils/constants";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, Dispatch, SetStateAction } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { toast } from "react-toastify";
interface UpdateCommentModelProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
  text: string;
  commentId: number;
}
const UpdateCommentModel = ({
  setOpen,
  text,
  commentId,
}: UpdateCommentModelProps) => {
  const [updatedText, setUpdatedText] = useState(text);
  const router = useRouter();
  const formSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (updatedText === "") return toast.info("Please Write Something");
    try {
      await axios.put(`${DOMAIN}/api/comments/${commentId}`, {
        text: updatedText,
      });
      router.refresh();
      setUpdatedText("");
      setOpen(false);
    } catch (error: any) {
      toast.error(error?.response?.data.message);
      console.log(error);
    }
  };
  return (
    <div className="fixed inset-0 z-10 bg-black bg-opacity-40 flex items-center justify-center ">
      <div className="w-11/12 lg:w-2/4 bg-white rounded-lg p-3">
        <div className="flex justify-end items-start my-4">
          <IoMdCloseCircleOutline
            onClick={() => setOpen(false)}
            className="cursor-pointer text-red-500 text-3xl"
          />
        </div>
        <form onSubmit={formSubmitHandler}>
          <input
            type="text"
            placeholder="Edit Comment..."
            className="text-xl rounded-lg p-2 w-full bg-white mb-2"
            value={updatedText}
            onChange={(e) => setUpdatedText(e.target.value)}
          />
          <button
            type="submit"
            className="text-white bg-green-700 rounded-lg p-2 mt-2 w-full hover:bg-green-900 transition-all"
          >
            Edit
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateCommentModel;
