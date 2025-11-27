"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { loginUser } from "../../../src/lib/api/api";
import { setSessionData, setToken } from "../../../src/lib/auth/auth";

// ✔ v10+ import (correct)
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../../firebase/firebase";

export default function Login() {
  const router = useRouter();

  const [form, setForm] = useState({
    phoneNumber: "",
    password: "",
  });

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  /* ------------------ HANDLE INPUT ------------------ */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* ------------------ INITIALIZE RECAPTCHA (v10 syntax) ------------------ */
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!auth) return;

    if (!window.recaptchaVerifier) {
      try {
        // ✔ Correct order: auth → container → options
        window.recaptchaVerifier = new RecaptchaVerifier(
          auth,
          "recaptcha-container",
          { size: "invisible" }
        );
      } catch (error) {
        console.error("Recaptcha initialization failed:", error);
      }
    }
  }, []);

  /* ------------------ SEND OTP ------------------ */
  const sendOtp = async () => {
    try {
      if (!window.recaptchaVerifier) {
        alert("Recaptcha not ready.");
        return;
      }

      const phoneNumber = "+91" + form.phoneNumber;

      const confirmationResult = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        window.recaptchaVerifier
      );

      window.confirmationResult = confirmationResult;

      alert("OTP Sent!");
    } catch (error) {
      console.error("OTP sending error:", error);

      // Reset Recaptcha
      try {
        window.recaptchaVerifier.clear();
      } catch {}

      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        { size: "invisible" }
      );

      alert("OTP sending failed.");
    }
  };

  /* ------------------ VERIFY OTP + LOGIN ------------------ */
  const verifyOtp = async () => {
    try {
      setLoading(true);

      const result = await window.confirmationResult.confirm(otp);

      const idToken = await result.user.getIdToken(true);

      const response = await loginUser(
        form.phoneNumber,
        form.password,
        idToken
      );

      if (response.access_token) {
        setToken(response.access_token);
        setSessionData(response);
        router.push("../../");
      } else {
        alert(response.message || "Login failed");
      }
    } catch (error) {
      console.error("Verify OTP error:", error);
      alert("Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">

      {/* Required Recaptcha container */}
      <div id="recaptcha-container"></div>

      <h1 className="text-3xl font-bold mb-6">Phone Login</h1>

      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-sm">

        {/* Phone field */}
        <label className="block text-sm font-medium mb-1">Phone Number</label>
        <input
          type="text"
          name="phoneNumber"
          value={form.phoneNumber}
          onChange={handleChange}
          placeholder="Enter 10-digit mobile"
          className="w-full border px-3 py-2 rounded mb-4"
        />

        {/* Password field */}
        <label className="block text-sm font-medium mb-1">Password</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Enter Password"
          className="w-full border px-3 py-2 rounded mb-4"
        />

        {/* Send OTP */}
        <button
          onClick={sendOtp}
          className="w-full bg-blue-600 text-white py-2 rounded mb-4 hover:bg-blue-700"
        >
          Send OTP
        </button>

        {/* OTP input */}
        <label className="block text-sm font-medium mb-1">Enter OTP</label>
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP"
          className="w-full border px-3 py-2 rounded mb-4"
        />

        {/* Verify + Login */}
        <button
          onClick={verifyOtp}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          {loading ? "Verifying..." : "Verify OTP & Login"}
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
