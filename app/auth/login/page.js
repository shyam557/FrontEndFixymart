"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { loginUser } from "../../../src/lib/api/api";
import { setSessionData, setToken } from "../../../src/lib/auth/auth";

import { auth } from "../../firebase/firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

export default function Login() {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState(null);

  /* ---------------------- Setup Recaptcha ---------------------- */
useEffect(() => {
  if (!window.recaptchaVerifier) {
    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      { size: "invisible" }
    );
  }
}, []);


  /* ---------------------- SEND OTP ---------------------- */
  const sendOtp = async () => {
    if (!phoneNumber || phoneNumber.length !== 10) {
      alert("Enter valid 10-digit number");
      return;
    }

    const fullPhone = "+91" + phoneNumber;

    try {
      setLoading(true);

      const appVerifier = window.recaptchaVerifier;
      if (!appVerifier) {
        alert("Recaptcha not initialized yet");
        return;
      }

      const result = await signInWithPhoneNumber(auth, fullPhone, appVerifier);
      setConfirmationResult(result);
      setOtpSent(true);
      alert("OTP Sent Successfully!");
    } catch (error) {
      console.error("OTP error:", error);
      alert("Failed to send OTP: " + (error.message || error.code));
    } finally {
      setLoading(false);
    }
  };

  /* ---------------------- VERIFY OTP ---------------------- */
  const verifyOtp = async () => {
    if (!otp) {
      alert("Please enter OTP");
      return;
    }

    try {
      setLoading(true);
      const res = await confirmationResult.confirm(otp);
      const firebaseUser = res.user;
      const token = await firebaseUser.getIdToken();

      setToken(token);
      setSessionData({ phoneNumber });

      router.push("../../");
    } catch (error) {
      console.error(error);
      alert("Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  /* ------------------- DEFAULT LOGIN ------------------- */
  const loginWithoutOtp = async () => {
    try {
      setLoading(true);
      const defaultPassword = "123456789";
      const response = await loginUser(phoneNumber, defaultPassword);

      if (response.access_token) {
        setToken(response.access_token);
        setSessionData(response);
        router.push("../../");
      } else {
        alert("Login failed");
      }
    } catch (error) {
      console.error(error);
      alert("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-200 via-indigo-100 to-blue-100 p-4">
      <div className="w-full max-w-sm bg-white/70 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-white/40">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Login</h1>

        {/* Phone input */}
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Mobile Number</label>
          <input
            type="text"
            maxLength={10}
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Enter 10-digit phone"
            className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
          />
        </div>

        {/* Send OTP */}
        {!otpSent && (
          <button
            onClick={sendOtp}
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 mb-3"
          >
            {loading ? "Sending OTP..." : "Send OTP"}
          </button>
        )}

        {/* OTP Input */}
        {otpSent && (
          <>
            <div>
              <label className="block text-sm font-semibold mb-1">Enter OTP</label>
              <input
                type="text"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full border px-3 py-2 rounded-lg text-center tracking-[8px] font-bold mb-3 focus:ring-2 focus:ring-green-400 outline-none"
                placeholder="------"
              />
            </div>

            <button
              onClick={verifyOtp}
              disabled={loading}
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 mb-3"
            >
              {loading ? "Verifying..." : "Verify OTP & Login"}
            </button>
          </>
        )}

        {/* Divider */}
        <div className="flex items-center justify-center my-4">
          <span className="w-full h-px bg-gray-300"></span>
          <span className="px-2 text-gray-500 text-sm">OR</span>
          <span className="w-full h-px bg-gray-300"></span>
        </div>

        {/* Default password login */}
        <button
          onClick={loginWithoutOtp}
          disabled={loading}
          className="w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-black"
        >
          {loading ? "Logging in..." : "Login with Default Password"}
        </button>

        <p className="mt-6 text-center text-gray-700">
          Don’t have an account?{" "}
          <Link href="/auth/register" className="text-indigo-600 font-bold">
            Register
          </Link>
        </p>

        {/* Recaptcha Box */}
        <div id="recaptcha-container"></div>
      </div>
    </div>
  );
}
