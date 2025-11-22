"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../firebase/firebase";

export default function PhoneLogin() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [name, setName] = useState("");

  // Initialize invisible recaptcha
  useEffect(() => {
    if (typeof window !== "undefined" && !window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        { size: "invisible" }
      );
    }
  }, []);

  // Send OTP
  const sendOtp = async () => {
    const appVerifier = window.recaptchaVerifier;

    try {
      const confirmation = await signInWithPhoneNumber(auth, phone, appVerifier);
      window.confirmationResult = confirmation;
      alert("OTP sent!");
    } catch (err) {
      console.error(err);
      alert("Failed to send OTP");
    }
  };

  // Verify OTP + Send ID token & name to API
const verifyOtp = async () => {
  try {
    // Step 1: Verify OTP with Firebase
    const result = await window.confirmationResult.confirm(otp);

    // Step 2: Get Firebase ID Token
    const idToken = await result.user.getIdToken(true);

    // Step 3: Send token + name to backend
    const response = await axios.post("http://localhost:3002/api/v1/auths/verify", {
      token: idToken,
      name: name,
    });

    // Step 4: Validate backend response
    if (response.data?.success) {
      alert("OTP Verified Successfully!");
      console.log("Backend Response:", response.data);

      alert(
        `Verified!\n\nMessage: ${response.data.message}\nUserID: ${response.data.user?.id ?? "N/A"}`
      );
    } else {
      alert("Verification failed on backend!");
      console.log("Backend Error:", response.data);
    }

  } catch (err) {
    console.error("OTP Verification Failed:", err);

    if (err.response) {
      alert(`Backend Error: ${err.response.data.message}`);
    } else {
      alert("Invalid OTP or Backend Error!");
    }
  }
};


  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-sm">

        {/* Recaptcha */}
        <div id="recaptcha-container"></div>

        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Phone Login
        </h1>

        {/* Name */}
        <label className="block text-gray-600 mb-1">Full Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          className="w-full px-4 py-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />

        {/* Phone */}
        <label className="block text-gray-600 mb-1">Phone Number</label>
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="+91XXXXXXXXXX"
          className="w-full px-4 py-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          onClick={sendOtp}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition mb-6"
        >
          Send OTP
        </button>

        {/* OTP */}
        <label className="block text-gray-600 mb-1">Enter OTP</label>
        <input
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP"
          className="w-full px-4 py-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-green-400"
        />

        <button
          onClick={verifyOtp}
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
        >
          Verify OTP & Submit
        </button>

      </div>
    </div>
  );
}
