"use client";
import { useState } from "react";
import { toast } from "react-toastify";
const AddArticleForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title === "") return toast.error("Title is required");
    if (description === "") return toast.error("Description is required");
    console.log({ title, description });
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
