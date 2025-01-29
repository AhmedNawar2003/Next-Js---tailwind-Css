"use client";
import { useState } from "react";
import { toast } from "react-toastify";
const AddCommentForm = () => {
  const [text, setText] = useState("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text === "") return toast.error("Please Write Something");
    console.log({ text });
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
         <button className="rounded-lg text-xl w-min bg-green-700 hover:bg-green-900 text-white my-2 p-3" type="submit">
          Comment
        </button>
       
      </form>
    </div>
  );
};

export default AddCommentForm;
