"use client";

import Link from "next/link";

export default function SafetyPage(){
  return (
    <div className="min-h-screen pt-24 pb-20 bg-gradient-to-b from-white to-gray-50">
      <main className="max-w-3xl mx-auto px-6">
        <div className="bg-white shadow rounded-lg p-8">
          <h1 className="text-3xl font-bold mb-3">Safety Center</h1>
          <p className="text-gray-600 mb-4">We prioritize safety for customers and professionals. All professionals go through identity verification and quality checks.</p>

          <ul className="list-disc pl-5 text-gray-700">
            <li>Verified identities</li>
            <li>Rating & review system</li>
            <li>Secure payments</li>
          </ul>

          <div className="mt-6">
            <Link href="/" className="text-purple-600 font-semibold hover:underline">Back to Home</Link>
          </div>
        </div>
      </main>
    </div>
  )
}
