"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock } from "lucide-react";

import Link from "next/link";
import axios from "axios";

import { loginUser } from "../../../../src/lib/api/adminApi";
import { setSessionData,getSessionData, setToken } from "../../../../src/lib/auth/auth";

// Debug imported values to help trace runtime import issues
// If you see 'storeData is not a function' in the console, this will show what was imported.
console.log('auth imports:', { storeData: setSessionData, getData: getSessionData, setToken });

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
       console.log("Login response data:", data);
    if (data.access_token) {
      setToken(data.access_token);
          setSessionData(data);
          // getData();

      // if (typeof storeData === 'function') {
      //   try {
      //   } catch (err) {
      //     console.warn('storeData threw an error:', err);
      //   }
      // } else {
      //   console.warn('storeData is not a function:', storeData);
      // }

      await alert("LogIn successful!.");
      console.log("All the data:", getSessionData());

      router.push("../../");
    } else {
      alert(data.message || "Error signing up");
    }

      // alert(data.message || "Login successful!");
      // router.push("/"); // ✅ Redirect after login
    // alert(errorMsg);
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
          Sign in to your account to continues
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




        <p className="text-center mt-4 text-gray-600">
          Don&apos;t have an account?{" "}
          <Link
            href="register"
            className="text-purple-600 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}