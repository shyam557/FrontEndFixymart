"use client";

import Link from "next/link";

export default function ReviewsPage(){
  return (
    <div className="min-h-screen pt-24 pb-20 bg-gray-50">
      <main className="max-w-4xl mx-auto px-6">
        <div className="bg-white shadow rounded-lg p-8">
          <h1 className="text-3xl font-bold mb-3">UC Reviews</h1>
          <p className="text-gray-600 mb-4">Read honest reviews from customers about local professionals.</p>

          <div className="space-y-4">
            <div className="p-4 border rounded">
              <p className="font-semibold">John D.</p>
              <p className="text-sm text-gray-600">Great service, arrived on time and fixed the issue quickly.</p>
            </div>
            <div className="p-4 border rounded">
              <p className="font-semibold">Priya S.</p>
              <p className="text-sm text-gray-600">Friendly and professional. Highly recommended.</p>
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
