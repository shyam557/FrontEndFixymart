"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function ProfessionalRegisterPage() {
  return (
    <div className="bg-gray-50 pt-24 pb-24">
      <main className="max-w-6xl mx-auto px-6 space-y-24">

        {/* HERO */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          <div>
            <span className="inline-block mb-4 rounded-full bg-indigo-50 px-4 py-1 text-sm font-medium text-indigo-600">
              Partner with FixyMart
            </span>
            <h1 className="text-4xl md:text-5xl font-semibold text-gray-900">
              Register as a Professional
            </h1>
            <p className="mt-5 text-gray-600 leading-relaxed max-w-xl">
              Join FixyMart as a service professional and grow your business
              with consistent work opportunities, transparent earnings, and
              dedicated support.
            </p>
          </div>

          <div className="rounded-3xl bg-gradient-to-br from-indigo-600 to-purple-600 p-10 text-white shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">
              Why Join FixyMart?
            </h3>
            <ul className="space-y-2 text-indigo-100">
              <li>✔ Regular service requests</li>
              <li>✔ Fair and transparent payouts</li>
              <li>✔ Training and skill growth</li>
              <li>✔ Platform support & tools</li>
            </ul>
          </div>
        </motion.section>

        {/* BENEFITS */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
        >
          {[
            {
              title: "Consistent Work",
              desc: "Get access to regular service requests in your selected category and location.",
            },
            {
              title: "Timely Payments",
              desc: "Receive transparent and on-time payments directly to your account.",
            },
            {
              title: "Flexible Schedule",
              desc: "Choose your availability and work at your convenience.",
            },
            {
              title: "Skill Development",
              desc: "Get training, guidelines, and performance feedback.",
            },
            {
              title: "Growth Opportunities",
              desc: "Build long-term income and professional credibility.",
            },
            {
              title: "Dedicated Support",
              desc: "Our team assists you with onboarding, queries, and issues.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {item.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </motion.section>

        {/* REQUIREMENTS */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Who Can Join?
          </h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-600">
            <li>Experienced service professionals</li>
            <li>Valid government-issued ID</li>
            <li>Relevant tools and equipment</li>
            <li>Commitment to quality and safety</li>
          </ul>
        </motion.section>

        {/* FORM (BASIC) */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-3xl p-10 shadow-sm max-w-3xl"
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Express Your Interest
          </h2>

          <form className="space-y-5">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="tel"
              placeholder="Mobile Number"
              className="w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="text"
              placeholder="Service Category"
              className="w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="text"
              placeholder="City"
              className="w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <button
              type="submit"
              className="w-full rounded-full bg-indigo-600 py-3 text-white font-medium hover:bg-indigo-700 transition"
            >
              Submit Details
            </button>
          </form>

          <p className="mt-4 text-sm text-gray-500">
            Our team will review your details and contact you shortly.
          </p>
        </motion.section>

        <Link href="/" className="text-indigo-600 font-medium hover:underline">
          ← Back to Home
        </Link>
      </main>
    </div>
  );
}
