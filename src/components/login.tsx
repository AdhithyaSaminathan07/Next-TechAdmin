"use client";

import { useRouter } from "next/navigation";
import React, { useState, ChangeEvent, FormEvent } from "react";

function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });

  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      formData.username === "Techvaseegrah" &&
      formData.password === "tech1234"
    ) {
      router.push("/admin/dashboard"); // ✅ Next.js redirect
    } else {
      alert("❌ Invalid credentials");
    }
  };

  return (
    <div className="flex h-screen text-black bg-[#E6FFE6]">
      {/* Left Side */}
      <div className="w-1/2 flex flex-col items-center justify-center border-r border-gray-300">
        <img
          src="/public/tech-v.png"
          alt="Tech Vaseegrah"
          className="w-[150px] mb-4"
        />
        <h1 className="text-3xl font-bold text-green-700 text-center leading-10">
          TECH <br /> VASEEGRAH
        </h1>
      </div>

      {/* Right Side */}
      <div className="w-1/2 flex flex-col items-center justify-center px-8">
        <h2 className="text-3xl font-semibold mb-2">Welcome</h2>
        <p className="text-gray-700 mb-6">Please login to Admin Dashboard</p>

        <form onSubmit={handleSubmit} className="w-full max-w-sm px-8">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="w-full mb-4 px-4 py-2 rounded bg-white text-black outline-none"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full mb-4 px-4 py-2 rounded bg-white text-black outline-none"
            required
          />
          <button
            type="submit"
            className="w-full py-2 bg-green-700 hover:bg-black rounded text-white"
          >
            LOGIN
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
