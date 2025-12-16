"use client";

import Link from "next/link";

export default function PrivacyPage(){
  return (
    <div className="min-h-screen pt-24 pb-20 bg-gradient-to-b from-white to-gray-50">
      <main className="max-w-3xl mx-auto px-6">
        <div className="bg-white shadow rounded-lg p-8">
          <h1 className="text-3xl font-bold mb-3">Privacy Policy</h1>
          <p className="text-gray-600 mb-4">Your privacy matters. We collect minimal data required to provide services and never sell personal data.</p>

          <section className="text-gray-700 space-y-3">
            <h2 className="font-semibold">Information We Collect</h2>
            <p>We collect contact details, service history, and preferences to improve your experience.</p>

            <h2 className="font-semibold">How We Use Data</h2>
            <p>Data is used to match you with professionals and for support and analytics.</p>
          </section>

          <div className="mt-6">
            <Link href="/" className="text-purple-600 font-semibold hover:underline">Back to Home</Link>
          </div>
        </div>
      </main>
    </div>
  )
}
