"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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

      const result = await signInWithPhoneNumber(auth, fullPhone, appVerifier);
      setConfirmationResult(result);
      setOtpSent(true);

      alert("OTP Sent!");
    } catch (err) {
      console.error(err);
      alert("Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------------- VERIFY OTP & LOGIN ---------------------- */
  const verifyOtp = async () => {
    if (!otp) {
      alert("Please enter OTP");
      return;
    }

    try {
      setLoading(true);

      // confirm OTP
      const result = await confirmationResult.confirm(otp);
      const firebaseUser = result.user;
      const firebaseToken = await firebaseUser.getIdToken();

      const defaultPassword = "123456789";

      // call backend login API
      const response = await loginUser(phoneNumber, defaultPassword, firebaseToken);

      if (!response?.access_token) {
        alert("Login failed");
        return;
      }

      setToken(response.access_token);
      setSessionData(response);
      console.log(response);
      router.push("../../");

    } catch (error) {
      console.error(error);
      alert("Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-200 via-indigo-100 to-blue-100 p-4">
      <div className="w-full max-w-sm bg-white/70 p-8 rounded-2xl shadow-xl backdrop-blur-lg border border-white/40">

        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Login
        </h1>

        {/* Phone Input */}
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
            <label className="block text-sm font-semibold mb-1">Enter OTP</label>
            <input
              type="text"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full border px-3 py-2 rounded-lg text-center tracking-[8px] font-bold mb-3 focus:ring-2 focus:ring-green-400 outline-none"
              placeholder="------"
            />

            <button
              onClick={verifyOtp}
              disabled={loading}
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
            >
              {loading ? "Verifying..." : "Verify OTP & Login"}
            </button>
          </>
        )} 

        {/* Recaptcha container */}
        <div id="recaptcha-container"></div>
      </div>
    </div>
  );
}
