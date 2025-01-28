"use client";
import { useState } from "react";
import { toast } from "react-toastify";
const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === "") return toast.error("Email is required");
    if (password === "") return toast.error("Password is required");
    console.log({ email, password });
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg mb-4"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg mb-4"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="w-full px-5 py-2 text-white bg-blue-700 rounded-lg hover:bg-blue-800 transition-all"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
