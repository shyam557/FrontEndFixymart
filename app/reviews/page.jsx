"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const reviews = [
  {
    name: "Rahul Verma",
    city: "Delhi",
    rating: 5,
    comment:
      "Very professional service. The technician arrived on time and completed the work neatly. Highly recommended.",
  },
  {
    name: "Pooja Sharma",
    city: "Noida",
    rating: 4,
    comment:
      "Smooth booking experience and transparent pricing. Customer support was responsive and helpful.",
  },
  {
    name: "Amit Singh",
    city: "Gurugram",
    rating: 5,
    comment:
      "FixyMart feels reliable and safe. The service professional was polite and well-trained.",
  },
  {
    name: "Neha Gupta",
    city: "Ghaziabad",
    rating: 4,
    comment:
      "Good overall experience. Booking was easy and the service quality met expectations.",
  },
];

export default function ReviewsPage() {
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
          <span className="inline-block mb-4 rounded-full bg-green-50 px-4 py-1 text-sm font-medium text-green-600">
            Customer Experiences
          </span>
          <h1 className="text-4xl md:text-5xl font-semibold text-gray-900">
            What Our Customers Say
          </h1>
          <p className="mt-5 text-gray-600 leading-relaxed">
            Trusted by customers across cities for reliable, professional,
            and transparent home services.
          </p>
        </motion.section>

        {/* STATS */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center"
        >
          {[
            { label: "Average Rating", value: "4.7 / 5" },
            { label: "Verified Reviews", value: "10,000+" },
            { label: "Repeat Customers", value: "65%" },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition"
            >
              <p className="text-3xl font-semibold text-gray-900">
                {item.value}
              </p>
              <p className="mt-2 text-gray-500">{item.label}</p>
            </div>
          ))}
        </motion.section>

        {/* REVIEWS GRID */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-8"
        >
          {reviews.map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="font-semibold text-gray-900">
                    {review.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {review.city}
                  </p>
                </div>
                <RatingStars rating={review.rating} />
              </div>

              <p className="text-gray-600 leading-relaxed">
                “{review.comment}”
              </p>
            </motion.div>
          ))}
        </motion.section>

        {/* TRUST MESSAGE */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-3xl p-10 text-center shadow-sm"
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Verified & Transparent Reviews
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
            All reviews are collected from customers after successful service
            completion. We do not edit, remove, or manipulate feedback,
            ensuring transparency and trust.
          </p>
        </motion.section>

        <Link href="/" className="text-green-600 font-medium hover:underline">
          ← Back to Home
        </Link>
      </main>
    </div>
  );
}

/* ---------- COMPONENTS ---------- */

function RatingStars({ rating }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-4 h-4 ${
            star <= rating ? "text-yellow-400" : "text-gray-300"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.975a1 1 0 00.95.69h4.184c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.286 3.975c.3.921-.755 1.688-1.538 1.118l-3.385-2.46a1 1 0 00-1.176 0l-3.385 2.46c-.783.57-1.838-.197-1.538-1.118l1.286-3.975a1 1 0 00-.364-1.118L2.02 9.402c-.783-.57-.38-1.81.588-1.81h4.184a1 1 0 00.95-.69l1.286-3.975z" />
        </svg>
      ))}
    </div>
  );
}
