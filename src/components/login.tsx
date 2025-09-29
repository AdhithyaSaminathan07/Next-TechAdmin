"use client";

import { useRouter } from "next/navigation";
import React, { useState, ChangeEvent, FormEvent } from "react";

function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
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
    <div className="flex flex-col md:flex-row h-screen text-black bg-[#E6FFE6]">
      {/* Left Side */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-gray-300 p-6">
        <img
          src="/tech-v.png" // ✅ Correct path
          alt="Tech Vaseegrah"
          className="w-[120px] md:w-[150px] mb-4"
        />
        <h1 className="text-2xl md:text-3xl font-bold text-green-700 text-center leading-9">
          TECH <br /> VASEEGRAH
        </h1>
      </div>

      {/* Right Side */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center px-6 md:px-12 py-8">
        <h2 className="text-2xl md:text-3xl font-semibold mb-2">Welcome</h2>
        <p className="text-gray-700 mb-6 text-center md:text-left">
          Please login to Admin Dashboard
        </p>

        <form onSubmit={handleSubmit} className="w-full max-w-sm">
          {/* Username */}
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="w-full mb-4 px-4 py-2 rounded bg-white text-black outline-none"
            required
          />

          {/* Password with Toggle */}
          <div className="relative mb-4">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded bg-white text-black outline-none pr-12"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-black text-sm"
            >
              {showPassword ? "🙈 Hide" : "👁️ Show"}
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-2 bg-green-700 hover:bg-black rounded text-white transition"
          >
            LOGIN
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
