"use client";

import Link from "next/link";

export default function InvestorsPage(){
  return (
    <div className="min-h-screen pt-24 pb-20 bg-gray-50">
      <main className="max-w-4xl mx-auto px-6">
        <div className="bg-white shadow rounded-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Investor Relations</h1>
          <p className="text-gray-600 mb-4">Welcome investors — here you'll find our company highlights, financials, and growth strategy. For detailed reports, please contact our team.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 border rounded">
              <h3 className="font-semibold">Quarterly Reports</h3>
              <p className="text-sm text-gray-500">Available on request.</p>
            </div>
            <div className="p-4 border rounded">
              <h3 className="font-semibold">Contact Investor Team</h3>
              <p className="text-sm text-gray-500">investors@fixymart.example</p>
            </div>
          </div>

          <div className="mt-6">
            <Link href="/" className="text-purple-600 font-semibold hover:underline">Back to Home</Link>
          </div>
        </div>
      </main>
    </div>
  )
}
