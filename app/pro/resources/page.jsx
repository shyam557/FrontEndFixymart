"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const resources = [
  {
    title: "Home Cleaning Tips",
    type: "Guide",
    description:
      "Learn professional tips for cleaning your home efficiently and safely.",
  },
  {
    title: "Choosing the Right Service Professional",
    type: "Blog",
    description:
      "A comprehensive guide to selecting verified and trustworthy service providers.",
  },
  {
    title: "Maintenance Checklist",
    type: "Checklist",
    description:
      "Step-by-step maintenance checklist for home appliances and utilities.",
  },
  {
    title: "Safety Best Practices",
    type: "Guide",
    description:
      "Essential safety practices for customers and professionals during home services.",
  },
  {
    title: "Home Improvement Ideas",
    type: "Blog",
    description:
      "Creative and practical ideas to improve your home space efficiently.",
  },
  {
    title: "Service Preparation Tips",
    type: "Guide",
    description:
      "How to prepare for a service visit to get the most effective results.",
  },
];

export default function ResourcesPage() {
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
          <span className="inline-block mb-4 rounded-full bg-blue-50 px-4 py-1 text-sm font-medium text-blue-600">
            Learn & Explore
          </span>
          <h1 className="text-4xl md:text-5xl font-semibold text-gray-900">
            Resources & Guides
          </h1>
          <p className="mt-5 text-gray-600 leading-relaxed">
            Access expert tips, guides, and best practices to make the most
            of FixyMart services and improve your home experience.
          </p>
        </motion.section>

        {/* RESOURCES GRID */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
        >
          {resources.map((resource, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition"
            >
              <span className="inline-block mb-3 px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-600">
                {resource.type}
              </span>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {resource.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {resource.description}
              </p>
              <Link
                href="#"
                className="mt-4 inline-block text-blue-600 font-medium hover:underline"
              >
                Read More →
              </Link>
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
          className="bg-white rounded-3xl p-10 text-center shadow-sm"
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Explore More Resources
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed mb-6">
            Stay updated with tips, best practices, and guides to make the
            most of FixyMart services.
          </p>
          <Link
            href="#"
            className="inline-block rounded-full bg-blue-600 px-6 py-3 text-white font-medium hover:bg-blue-700 transition"
          >
            Browse All Resources
          </Link>
        </motion.section>

        <Link href="/" className="text-blue-600 font-medium hover:underline">
          ← Back to Home
        </Link>
      </main>
    </div>
  );
}
