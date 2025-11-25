"use client";
import Image from "next/image";
import { useState } from "react";
import { Eye, EyeOff, User, Mail, Phone, Lock } from "lucide-react";
import Link from "next/link";
import axios from "axios";

import { useRouter } from "next/navigation";   // <-- FIX ADDED
import { registerUser } from "../../../../src/lib/api/adminApi";

export default function Register() {

  const router = useRouter();                 // <-- FIX ADDED

  const [form, setForm] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    role: "customer",
    profileImage: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const data = await registerUser(
        form.name,
        form.email,
        form.phoneNumber,
        form.role,
        form.profileImage,
        form.password
      );

      if (data.user) {
        alert("Registeration successful!");
        router.push("/auth/login");   // <-- NOW WORKS
      } else {
        alert(data.error || "Error signing up");
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white mt-10">
      <div className="h-12" />
      <h1 className="text-3xl font-bold text-center mb-2">Create Your Account</h1>
      <p className="text-center text-gray-500 mb-4">Join us and start your journey today</p>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow p-8 w-full max-w-md space-y-4">

        <div className="relative">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <User size={20} />
          </span>
          <input
            name="name"
            type="text"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded pl-10"
            required
          />
        </div>

        <div className="relative">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <Mail size={20} />
          </span>
          <input
            name="email"
            type="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded pl-10"
            required
          />
        </div>

        <div className="relative">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <Phone size={20} />
          </span>
          <input
            name="phoneNumber"
            type="tel"
            placeholder="Phone Number"
            value={form.phoneNumber}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded pl-10"
            required
          />
        </div>

        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        >
          <option value="customer">Customer</option>
          <option value="provider">Provider</option>
          <option value="admin">Admin</option>
        </select>

        <input
          name="profileImage"
          type="url"
          placeholder="Profile Image URL (optional)"
          value={form.profileImage}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />

        <div className="relative">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <Lock size={20} />
          </span>
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded pl-10 pr-10"
            required
          />
          <span
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
            onClick={() => setShowPassword((v) => !v)}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </span>
        </div>

        <div className="relative">
          <input
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded pr-10"
            required
          />
          <span
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
            onClick={() => setShowConfirmPassword((v) => !v)}
          >
            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </span>
        </div>

        <button type="submit" className="w-full py-2 mt-2 bg-purple-500 text-white font-semibold rounded-md hover:bg-purple-600 transition">
          Create Account
        </button>

     

        <p className="text-center mt-4 text-gray-600">
          Already have an account?
          <Link href="/auth/login" className="text-purple-600 hover:underline ml-1">
            Sign in
          </Link>
        </p>

      </form>
    </div>
  );
}