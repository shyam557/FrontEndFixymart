"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const investorHighlights = [
  { label: "Founded", value: "2025" },
  { label: "Cities Covered", value: "5+" },
  { label: "Service Partners", value: "5000+" },
  { label: "Completed Bookings", value: "50,000+" },
  { label: "Average Rating", value: "4.8 / 5" },
  { label: "Annual Growth", value: "120%" },
];

export default function InvestorsPage() {
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
            Investor Relations
          </span>
          <h1 className="text-4xl md:text-5xl font-semibold text-gray-900">
            Invest in FixyMart
          </h1>
          <p className="mt-5 text-gray-600 leading-relaxed">
            FixyMart is building a scalable, technology-driven home services
            platform focused on long-term growth, transparency, and trust.
          </p>
        </motion.section>

        {/* HIGHLIGHTS GRID */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
        >
          {investorHighlights.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition text-center"
            >
              <p className="text-3xl font-semibold text-gray-900">{item.value}</p>
              <p className="mt-2 text-gray-500">{item.label}</p>
            </motion.div>
          ))}
        </motion.section>

        {/* ABOUT COMPANY */}
        <Section
          title="About FixyMart"
          text="FixyMart is a technology-enabled platform connecting customers with verified professionals for home and utility services. Our platform ensures safety, transparency, and quality across every booking."
        />

        {/* BUSINESS MODEL */}
        <Section
          title="Business Model"
          list={[
            "Commission-based revenue from service bookings",
            "Subscription plans for professional partners",
            "Operational efficiency through tech-driven logistics",
            "Quality control via audits and feedback",
          ]}
        />

        {/* GROWTH STRATEGY */}
        <Section
          title="Growth Strategy"
          list={[
            "Expand into new cities with high service demand",
            "Focus on repeat customers and retention",
            "Continuous partner training and quality improvement",
            "Leverage data for category and pricing optimization",
          ]}
        />

        {/* MARKET OPPORTUNITY */}
        <Section
          title="Market Opportunity"
          text="India’s home services market is fragmented and rapidly growing. FixyMart aims to organize this ecosystem with reliable technology and professional standards."
        />

        {/* GOVERNANCE & TRUST */}
        <Section
          title="Governance & Trust"
          list={[
            "Mandatory background verification for all partners",
            "Secure digital payments and transparent pricing",
            "Continuous monitoring of service quality",
            "Compliance with regulatory standards",
          ]}
        />

        {/* CONTACT INVESTOR */}
        <Section
          title="Investor Contact"
          text="For inquiries, partnerships, or detailed reports, please contact our investor relations team:"
        >
          <p className="mt-2 font-medium text-gray-900">
            investors@fixymart.example
          </p>
        </Section>

        <Link href="/" className="text-purple-600 font-medium hover:underline">
          ← Back to Home
        </Link>
      </main>
    </div>
  );
}

/* ---------------- COMPONENT ---------------- */

function Section({ title, text, list, children }) {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeUp}
      transition={{ duration: 0.6 }}
      className="max-w-3xl mb-12"
    >
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">{title}</h2>

      {text && <p className="text-gray-600 leading-relaxed mb-4">{text}</p>}

      {list && (
        <ul className="list-disc pl-5 space-y-2 text-gray-600">
          {list.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      )}

      {children}
    </motion.section>
  );
}
