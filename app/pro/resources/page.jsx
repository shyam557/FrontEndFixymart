"use client";

import Link from "next/link";

export default function ProResourcesPage(){
  return (
    <div className="min-h-screen pt-24 pb-20 bg-gray-50">
      <main className="max-w-4xl mx-auto px-6">
        <div className="bg-white shadow rounded-lg p-8">
          <h1 className="text-3xl font-bold mb-3">Resources for Professionals</h1>
          <p className="text-gray-600 mb-4">Tools, tips, and guides to help professionals grow their business on our platform.</p>

          <ul className="list-disc pl-5 text-gray-700 space-y-2">
            <li>Onboarding Guide</li>
            <li>Best Practices</li>
            <li>Pricing & Promotions</li>
          </ul>

          <div className="mt-6">
            <Link href="/pro/benefits" className="text-purple-600 font-semibold hover:underline">See Professional Benefits</Link>
          </div>
        </div>
      </main>
    </div>
  )
}
