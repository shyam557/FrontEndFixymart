"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function PrivacyPolicyPage() {
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
            <span className="inline-block mb-4 rounded-full bg-blue-50 px-4 py-1 text-sm font-medium text-blue-600">
              Privacy & Data Protection
            </span>
            <h1 className="text-4xl md:text-5xl font-semibold text-gray-900">
              Privacy Policy
            </h1>
            <p className="mt-5 text-gray-600 leading-relaxed max-w-xl">
              This Privacy Policy describes how FixyMart collects, uses,
              processes, stores, and protects your personal information when
              you use our website, mobile application, and services.
            </p>
          </div>

          <div className="rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-600 p-10 text-white shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">
              Our Commitment
            </h3>
            <p className="text-blue-100 leading-relaxed">
              We are committed to maintaining the confidentiality, integrity,
              and security of your personal data while delivering reliable and
              transparent services.
            </p>
          </div>
        </motion.section>

        {/* INTRO */}
        <PolicyBlock
          title="Introduction"
          content={`FixyMart ("we", "our", or "us") respects your privacy and
          is committed to protecting your personal data. This policy explains
          your privacy rights and how the law protects you when you use our
          platform.`}
        />

        {/* INFO COLLECTED */}
        <PolicyBlock
          title="Information We Collect"
          content={`We may collect different types of information including
          personal, transactional, and technical data. This includes your
          name, mobile number, email address, service location, payment details,
          booking history, device identifiers, IP address, and usage behavior
          on our platform.`}
          list={[
            "Identity data such as name and profile details",
            "Contact data including phone number and email",
            "Transaction data related to bookings and payments",
            "Technical data such as device type, browser, and IP address",
            "Usage data including app interactions and preferences",
          ]}
        />

        {/* USAGE */}
        <PolicyBlock
          title="How We Use Your Information"
          list={[
            "To provide, operate, and improve our services",
            "To process bookings, payments, and refunds",
            "To communicate service updates, support, and notifications",
            "To ensure safety, security, and fraud prevention",
            "To comply with legal and regulatory obligations",
          ]}
        />

        {/* SHARING */}
        <PolicyBlock
          title="Sharing and Disclosure of Data"
          content={`We only share your personal information with verified
          service professionals, payment gateways, and trusted partners when
          necessary to deliver services. We do not sell or rent your personal
          data to third parties.`}
          list={[
            "Service professionals assigned to your booking",
            "Payment service providers for secure transactions",
            "Regulatory authorities when legally required",
          ]}
        />

        {/* SECURITY */}
        <PolicyBlock
          title="Data Security"
          content={`We implement appropriate technical and organizational
          security measures to protect your data from unauthorized access,
          loss, misuse, or alteration. However, no digital platform can
          guarantee complete security.`}
        />

        {/* DATA RETENTION */}
        <PolicyBlock
          title="Data Retention"
          content={`We retain your personal data only for as long as necessary
          to fulfill service obligations, comply with legal requirements, and
          resolve disputes.`}
        />

        {/* USER RIGHTS */}
        <PolicyBlock
          title="Your Rights"
          list={[
            "Right to access your personal data",
            "Right to correct or update inaccurate information",
            "Right to request deletion of your data",
            "Right to withdraw consent for data processing",
          ]}
        />

        {/* COOKIES */}
        <PolicyBlock
          title="Cookies & Tracking Technologies"
          content={`We may use cookies and similar technologies to enhance
          user experience, analyze usage, and improve platform performance.
          You can manage cookie preferences through your browser settings.`}
        />

        {/* THIRD PARTY */}
        <PolicyBlock
          title="Third-Party Links"
          content={`Our platform may contain links to third-party websites.
          We are not responsible for the privacy practices of such external
          sites.`}
        />

        {/* POLICY UPDATES */}
        <PolicyBlock
          title="Changes to This Policy"
          content={`We may update this Privacy Policy periodically. Continued
          use of our platform after updates constitutes acceptance of the
          revised policy.`}
        />

        {/* CONTACT */}
        <PolicyBlock
          title="Contact Us"
          content={`If you have any questions or concerns regarding this
          Privacy Policy or data practices, please contact us at:`}
        >
          <p className="mt-2 font-medium text-gray-900">
            privacy@fixymart.example
          </p>
        </PolicyBlock>

        <Link href="/" className="text-blue-600 font-medium hover:underline">
          ← Back to Home
        </Link>
      </main>
    </div>
  );
}

/* ---------------- COMPONENT ---------------- */

function PolicyBlock({ title, content, list, children }) {
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

      {content && (
        <p className="text-gray-600 leading-relaxed mb-4">
          {content}
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
