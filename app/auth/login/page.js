"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { loginUser } from "../../../src/lib/api/api";
import { setSessionData, setToken } from "../../../src/lib/auth/auth";

export default function Login() {
  const router = useRouter();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);

  /* ------------------ SIMPLE LOGIN (DEFAULT PASSWORD) ------------------ */
  const loginWithoutOtp = async () => {
    if (!phoneNumber) {
      alert("Please enter your phone number.");
      return;
    }

    try {
      setLoading(true);

      const defaultPassword = "123456789";
      const fakeToken = "1232323";

      const response = await loginUser(phoneNumber, defaultPassword, fakeToken);

      if (response.access_token) {
        setToken(response.access_token);
        setSessionData(response);
        router.push("../../");
      } else {
        alert(response.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">

      <h1 className="text-3xl font-bold mb-6">Phone Login</h1>

      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-sm">

        {/* Phone field */}
        <label className="block text-sm font-medium mb-1">Phone Number</label>
        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Enter 10-digit mobile"
          className="w-full border px-3 py-2 rounded mb-4"
        />

        {/* Login Button */}
        <button
          onClick={loginWithoutOtp}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>

      <p className="mt-6 text-gray-700">
        Don’t have an account?{" "}
        <Link href="/auth/register" className="text-purple-600 font-medium">
          Register
        </Link>
      </p>
    </div>
  );
}
