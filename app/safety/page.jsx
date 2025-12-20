"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function SafetyCenterPage() {
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
            <span className="inline-block mb-4 rounded-full bg-green-50 px-4 py-1 text-sm font-medium text-green-600">
              Safety & Trust
            </span>
            <h1 className="text-4xl md:text-5xl font-semibold text-gray-900">
              Safety Center
            </h1>
            <p className="mt-5 text-gray-600 leading-relaxed max-w-xl">
              Your safety is our top priority. FixyMart is built on strong
              safety practices designed to protect customers, professionals,
              and every interaction on our platform.
            </p>
          </div>

          <div className="rounded-3xl bg-gradient-to-br from-green-600 to-emerald-600 p-10 text-white shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">
              Built on Trust
            </h3>
            <p className="text-green-100 leading-relaxed">
              From verified professionals to secure payments, every step is
              designed with safety and reliability in mind.
            </p>
          </div>
        </motion.section>

        {/* SAFETY PRINCIPLES */}
        <Section
          title="Our Safety Principles"
          text="FixyMart follows a safety-first approach across the platform. We
          continuously review and enhance our processes to maintain a secure
          and reliable service experience."
        />

        {/* SAFETY CARDS */}
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
              title: "Verified Professionals",
              desc: "All service professionals undergo identity checks, background verification, and skill validation.",
            },
            {
              title: "Secure Payments",
              desc: "Payments are processed through trusted gateways with encryption and fraud protection.",
            },
            {
              title: "Customer Support",
              desc: "Dedicated support is available to address safety concerns and service issues promptly.",
            },
            {
              title: "Transparent Pricing",
              desc: "Clear and upfront pricing ensures no hidden charges or surprises.",
            },
            {
              title: "Service Quality Checks",
              desc: "Post-service feedback and audits help us maintain consistent quality.",
            },
            {
              title: "Data Protection",
              desc: "We follow strict data privacy and security standards to protect user information.",
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

        {/* CUSTOMER GUIDELINES */}
        <Section
          title="Customer Safety Guidelines"
          list={[
            "Book services only through the FixyMart platform",
            "Verify professional details shown in the app",
            "Avoid sharing OTPs or personal information",
            "Report issues immediately through support",
          ]}
        />

        {/* PROFESSIONAL GUIDELINES */}
        <Section
          title="Professional Safety Guidelines"
          list={[
            "Carry valid identification during service visits",
            "Maintain professional conduct at all times",
            "Follow safety protocols and usage instructions",
            "Report unsafe situations immediately",
          ]}
        />

        {/* INCIDENT SUPPORT */}
        <Section
          title="Incident Support & Reporting"
          text="If you encounter any safety-related concerns during or after a
          service, please contact our support team immediately. We take all
          reports seriously and act promptly to ensure user safety."
        />

        {/* CONTACT */}
        <Section title="Safety Contact">
          <p className="text-gray-600">
            For safety-related concerns, reach us at:
          </p>
          <p className="mt-2 font-medium text-gray-900">
            safety@fixymart.example
          </p>
        </Section>

        <Link href="/" className="text-green-600 font-medium hover:underline">
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
      className="max-w-3xl"
    >
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">
        {title}
      </h2>

      {text && (
        <p className="text-gray-600 leading-relaxed mb-4">
          {text}
        </p>
      )}

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
