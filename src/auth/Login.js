"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock } from "lucide-react";

import Link from "next/link";
import axios from "axios";

import { loginUser } from "../src/lib/api/api";


export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

     
       const data = await loginUser(form.email, form.password);
    if (data.access_token) {
      setToken(data.token);
      alert("LogIn successful!.");
      router.push("../../");
    } else {
      alert(data.message || "Error signing up");
    }

      // alert(data.message || "Login successful!");
      // router.push("/"); // ✅ Redirect after login
    alert(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <div className="mb-4">
        <Link href="/" className="text-gray-500 mb-2 hover:underline px-12">
          &larr; Back to Home
        </Link>
        <h1 className="text-3xl font-bold text-center mb-2">Welcome Back</h1>
        <p className="text-center text-gray-500 mb-4">
          Sign in to your account to continue
        </p>
      </div>
      <div className="w-full max-w-md bg-white rounded-2xl p-8 shadow">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-1">Email</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <Mail size={20} />
              </span>
              <input
                name="email"
                type="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
                className="w-full border px-3 py-2 pl-10 rounded focus:outline-none"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Password</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <Lock size={20} />
              </span>
              <input
                name="password"
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className="w-full border px-3 py-2 pl-10 rounded focus:outline-none"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 mt-2 bg-purple-500 text-white font-semibold rounded-md hover:bg-purple-600 transition"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
        <div className="flex items-center my-4">
          <hr className="flex-1" />
          <span className="px-2 text-gray-400">Or continue with</span>
          <hr className="flex-1" />
        </div>
        <button
          type="button"
          className="w-full flex items-center justify-center gap-2 border px-3 py-2 rounded hover:bg-gray-100"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          Continue with Google
        </button>
        <p className="text-center mt-4 text-gray-600">
          Don&apos;t have an account?{" "}
          <Link
            href="register.js"
            className="text-purple-600 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
