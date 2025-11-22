"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { loginUser } from "../../../src/lib/api/api";
import { setSessionData, setToken } from "../../../src/lib/auth/auth";

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

  /* ------------------ FIREBASE OTP SETUP ------------------ */
  useEffect(() => {
    if (typeof window !== "undefined" && !window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        { size: "invisible" }
      );
    }
  }, []);

  /* ------------------ SEND OTP ------------------ */
  const sendOtp = async () => {
    try {
      const appVerifier = window.recaptchaVerifier;

      const confirmation = await signInWithPhoneNumber(
        auth,
        "+91"+form.phoneNumber,
        appVerifier
      );

      window.confirmationResult = confirmation;
      alert("OTP sent successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to send OTP");
    }
  };

  /* ------------------ VERIFY OTP + LOGIN ------------------ */
  const verifyOtp = async () => {
    try {
      setLoading(true);

      // Step 1: Verify the OTP with Firebase
      const result = await window.confirmationResult.confirm(otp);

      // Step 2: Get Firebase ID token
      const idToken = await result.user.getIdToken(true);

      // Step 3: Send phone + password + idToken to backend
      const response = await loginUser(form.phoneNumber, form.password, idToken);

      if (response.access_token) {
        setToken(response.access_token);
        setSessionData(response);
        // alert("OTP Login Successful!");
        router.push("../../");
      } else {
        alert(response.message || "OTP login failed");
      }
    } catch (err) {
      console.error(err);
      alert("Invalid OTP. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">

      <div id="recaptcha-container"></div>

      <h1 className="text-3xl font-bold mb-6">Phone Login</h1>

      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-sm">

        {/* PHONE NUMBER INPUT */}
        <label className="block text-sm font-medium mb-1">Phone Number</label>
        <input
          type="text"
          name="phoneNumber"
          value={form.phoneNumber}
          onChange={handleChange}
          placeholder="XXXXXXXXXX"
          className="w-full border px-3 py-2 rounded mb-4"
        />

        {/* PASSWORD INPUT */}
        <label className="block text-sm font-medium mb-1">Password</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Enter Password"
          className="w-full border px-3 py-2 rounded mb-4"
        />

        {/* SEND OTP */}
        <button
          onClick={sendOtp}
          className="w-full bg-blue-600 text-white py-2 rounded mb-4 hover:bg-blue-700"
        >
          Send OTP
        </button>

        {/* OTP INPUT */}
        <label className="block text-sm font-medium mb-1">Enter OTP</label>
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP"
          className="w-full border px-3 py-2 rounded mb-4"
        />

        {/* VERIFY OTP */}
        <button
          onClick={verifyOtp}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          {loading ? "Verifying..." : "Verify OTP & Login"}
        </button>
      </div>

      <p className="mt-6 text-gray-700">
        Don’t have an account?{" "}
        <Link href="register" className="text-purple-600 font-medium">
          Register
        </Link>
      </p>
    </div>
  );
}
