"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function TermsConditionsPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-20">
      <main className="max-w-5xl mx-auto px-6">

        {/* HEADER */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="inline-block mb-3 rounded-full bg-blue-50 px-4 py-1 text-sm font-medium text-blue-600">
            Legal Information
          </p>

          <h1 className="text-4xl font-semibold text-gray-900">
            Terms & Conditions
          </h1>

          <p className="mt-4 max-w-3xl text-gray-600 leading-relaxed">
            These Terms & Conditions govern your access to and use of FixyMart’s
            website, mobile applications, and services. By using our platform,
            you agree to comply with the terms outlined below.
          </p>
        </motion.section>

        {/* CONTENT */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white rounded-2xl shadow-sm p-8 md:p-12 space-y-12"
        >

          <Section
            title="1. Acceptance of Terms"
            text="By accessing or using FixyMart, you confirm that you have read,
            understood, and agreed to be bound by these Terms & Conditions,
            along with our Privacy Policy and other applicable guidelines."
          />

          <Section
            title="2. Services Overview"
            text="FixyMart operates as a technology platform that connects users with
            independent, verified service professionals. We do not directly
            provide services but facilitate bookings, payments, and service
            management."
          />

          <Section
            title="3. User Responsibilities"
            list={[
              "Provide accurate and up-to-date personal information",
              "Use the platform only for lawful purposes",
              "Ensure safe access to the service location",
              "Avoid misuse, fraud, or unauthorized activities",
            ]}
          />

          <Section
            title="4. Pricing & Payments"
            text="All service prices are displayed transparently before booking.
            Payments are processed securely through approved payment gateways.
            Additional charges, if any, will be communicated prior to service
            execution."
          />

          <Section
            title="5. Cancellations & Refunds"
            text="Cancellations and refunds are governed by category-specific
            policies. Refund eligibility may vary based on service type, timing,
            and execution status."
          />

          <Section
            title="6. Professional Conduct"
            text="Service professionals are expected to maintain respectful,
            professional behavior. FixyMart reserves the right to suspend or
            remove professionals or users for policy violations."
          />

          <Section
            title="7. Limitation of Liability"
            text="FixyMart shall not be liable for indirect, incidental, or
            consequential damages arising from the use of the platform or
            services. Liability, if any, is limited to the value of the service
            booked."
          />

          <Section
            title="8. Account Suspension"
            text="We reserve the right to suspend or terminate accounts found to
            be in violation of these terms, applicable laws, or platform
            integrity standards."
          />

          <Section
            title="9. Changes to Terms"
            text="FixyMart may update these Terms & Conditions periodically. Any
            changes will be effective immediately upon posting on this page."
          />

          <Section
            title="10. Contact Information"
            text="For questions regarding these Terms & Conditions, please
            contact us at support@fixymart.example."
          />

          {/* BACK */}
          <div className="pt-4">
            <Link
              href="/"
              className="text-blue-600 font-medium hover:underline"
            >
              ← Back to Home
            </Link>
          </div>

        </motion.div>
      </main>
    </div>
  );
}

/* ---------------- COMPONENT ---------------- */

function Section({ title, text, list }) {
  return (
    <section>
      <h2 className="text-lg font-semibold text-gray-900 mb-3">
        {title}
      </h2>

      {text && (
        <p className="text-gray-600 leading-relaxed max-w-4xl">
          {text}
        </p>
      )}

      {list && (
        <ul className="mt-3 list-disc pl-5 text-gray-600 space-y-1">
          {list.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      )}
    </section>
  );
}
