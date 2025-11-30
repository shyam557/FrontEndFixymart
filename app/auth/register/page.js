"use client";
import { useState } from "react";
import { User, Phone } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { registerUser } from "../../../src/lib/api/api";

export default function Register() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    phoneNumber: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.phoneNumber) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      // Default values
      const defaultEmail = "default@example.com";
      const defaultPassword = "123456789";

      const data = await registerUser(
        form.name,
        defaultEmail,
        form.phoneNumber,
        defaultPassword
      );

      if (data.user) {
        alert("Registration successful!");
        router.push("/auth/login");
      } else {
        alert(data.error || "Error signing up");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white mt-10">
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

        <button
          type="submit"
          className="w-full py-2 mt-2 bg-purple-500 text-white font-semibold rounded-md hover:bg-purple-600 transition"
        >
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
