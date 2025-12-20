"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const benefits = [
  {
    title: "Higher Earnings",
    description: "Earn competitive rates with flexible working hours and transparent commission structure.",
    icon: "💰",
  },
  {
    title: "Verified Customers",
    description: "Connect with genuine customers, reducing fraud and ensuring reliability.",
    icon: "✅",
  },
  {
    title: "Flexible Schedule",
    description: "Choose your own working hours and availability, giving you complete control over your work.",
    icon: "⏰",
  },
  {
    title: "Skill Development",
    description: "Access training programs and performance insights to enhance your skills and career growth.",
    icon: "📚",
  },
  {
    title: "Support & Assistance",
    description: "Dedicated support team to help with bookings, payments, and customer disputes.",
    icon: "🛠️",
  },
  {
    title: "Rewards & Recognition",
    description: "Get featured in top-rated professionals, loyalty rewards, and customer feedback highlights.",
    icon: "🏆",
  },
];

export default function ProfessionalBenefits() {
  return (
    <div className="bg-gray-50 pt-24 pb-24">
      <main className="max-w-6xl mx-auto px-6 space-y-24">

        {/* HERO */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <span className="inline-block mb-4 rounded-full bg-purple-50 px-4 py-1 text-sm font-medium text-purple-600">
            Join the FixyMart Network
          </span>
          <h1 className="text-4xl md:text-5xl font-semibold text-gray-900">
            Benefits for Professionals
          </h1>
          <p className="mt-5 text-gray-600 leading-relaxed">
            FixyMart empowers service professionals with growth opportunities,
            reliable earnings, and tools to provide exceptional service to
            customers.
          </p>
        </motion.section>

        {/* BENEFITS GRID */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
        >
          {benefits.map((benefit, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-md transition flex flex-col items-center text-center"
            >
              <div className="text-4xl mb-4">{benefit.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {benefit.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
            </motion.div>
          ))}
        </motion.section>

        {/* CTA */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          transition={{ duration: 0.6 }}
          className="bg-purple-600 text-white rounded-3xl p-10 text-center shadow-sm"
        >
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">
            Ready to Join FixyMart?
          </h2>
          <p className="mb-6 text-lg">
            Register as a professional today and start providing services to thousands of customers.
          </p>
          <Link
            href="/professional-register"
            className="inline-block bg-white text-purple-600 font-semibold px-6 py-3 rounded-xl hover:bg-gray-100 transition"
          >
            Register Now
          </Link>
        </motion.section>

        <Link href="/" className="text-purple-600 font-medium hover:underline">
          ← Back to Home
        </Link>
      </main>
    </div>
  );
}
