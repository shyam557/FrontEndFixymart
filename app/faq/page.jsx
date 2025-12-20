"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const faqs = [
  {
    question: "What is FixyMart?",
    answer:
      "FixyMart is a technology-driven home services platform that connects customers with verified and trained professionals for reliable and hassle-free services.",
  },
  {
    question: "How do I book a service?",
    answer:
      "You can book a service through our website or mobile app by selecting the service category, choosing a suitable time slot, and confirming your booking.",
  },
  {
    question: "Are FixyMart professionals verified?",
    answer:
      "Yes. All FixyMart professionals undergo background verification, skill assessment, and regular training before onboarding.",
  },
  {
    question: "How is pricing decided?",
    answer:
      "Pricing is transparent and displayed upfront during booking. Final pricing depends on service type, scope of work, and any additional requests.",
  },
  {
    question: "What if I am not satisfied with the service?",
    answer:
      "Customer satisfaction is our priority. If you face any issues, you can raise a support request and our team will resolve it promptly.",
  },
  {
    question: "Is online payment safe?",
    answer:
      "Yes. All payments on FixyMart are secured using industry-standard encryption and trusted payment gateways.",
  },
  {
    question: "Can I reschedule or cancel my booking?",
    answer:
      "Yes. You can reschedule or cancel your booking from your account before the service start time, as per our cancellation policy.",
  },
  {
    question: "Which cities does FixyMart operate in?",
    answer:
      "FixyMart is currently expanding across major cities and will continue to add more locations over time.",
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="bg-gray-50 pt-24 pb-24">
      <main className="max-w-5xl mx-auto px-6 space-y-20">

        {/* HERO */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <span className="inline-block mb-4 rounded-full bg-blue-50 px-4 py-1 text-sm font-medium text-blue-600">
            Need Help?
          </span>
          <h1 className="text-4xl md:text-5xl font-semibold text-gray-900">
            Frequently Asked Questions
          </h1>
          <p className="mt-5 text-gray-600 leading-relaxed">
            Find clear answers to the most common questions about FixyMart
            services, bookings, payments, and safety.
          </p>
        </motion.section>

        {/* FAQ LIST */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-4"
        >
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-sm border overflow-hidden"
            >
              <button
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
                className="w-full flex justify-between items-center p-6 text-left"
              >
                <span className="font-medium text-gray-900">
                  {faq.question}
                </span>
                <span
                  className={`transform transition ${
                    openIndex === index ? "rotate-45" : "rotate-0"
                  }`}
                >
                  +
                </span>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-6 text-gray-600 leading-relaxed"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </motion.section>

        {/* SUPPORT CTA */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-3xl p-10 text-center shadow-sm"
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            Still have questions?
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto mb-6">
            Our support team is always here to help you with any additional
            queries or concerns.
          </p>
          <Link
            href="/contact"
            className="inline-block rounded-full bg-blue-600 px-6 py-3 text-white font-medium hover:bg-blue-700 transition"
          >
            Contact Support
          </Link>
        </motion.section>

        <Link href="/" className="text-blue-600 font-medium hover:underline">
          ← Back to Home
        </Link>
      </main>
    </div>
  );
}
