"use client";

import Link from "next/link";

export default function TermsPage(){
  return (
    <div className="min-h-screen pt-24 pb-20 bg-gray-50">
      <main className="max-w-4xl mx-auto px-6">
        <div className="bg-white shadow rounded-lg p-8">
          <h1 className="text-3xl font-bold mb-4">Terms & Conditions</h1>
          <p className="text-gray-600 mb-4">Please read these terms carefully before using our services. By using FixyMart, you agree to the following terms.</p>

          <article className="prose max-w-none text-gray-700">
            <h2>1. Use of Service</h2>
            <p>Services are provided by independent professionals. We act as a marketplace platform and are not responsible for services rendered.</p>

            <h2>2. Payment</h2>
            <p>Payments are processed securely. Refunds and disputes follow our refund policy.</p>

            <h2>3. Liability</h2>
            <p>Our liability is limited to the extent permitted by law.</p>
          </article>

          <div className="mt-6">
            <Link href="/" className="text-purple-600 font-semibold hover:underline">Back to Home</Link>
          </div>
        </div>
      </main>
    </div>
  )
}
