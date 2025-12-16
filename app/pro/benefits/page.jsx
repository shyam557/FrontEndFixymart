"use client";

import Link from "next/link";

export default function ProBenefitsPage(){
  return (
    <div className="min-h-screen pt-24 pb-20 bg-gradient-to-b from-white to-gray-50">
      <main className="max-w-4xl mx-auto px-6">
        <div className="bg-white shadow rounded-lg p-8">
          <h1 className="text-3xl font-bold mb-3">Professional Benefits</h1>
          <p className="text-gray-600 mb-4">Grow your reach, get reliable leads, and manage bookings smoothly using our platform.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <div className="p-4 border rounded">
              <h3 className="font-semibold">More Customers</h3>
              <p className="text-sm text-gray-500">Get discovered by local customers actively searching for services.</p>
            </div>
            <div className="p-4 border rounded">
              <h3 className="font-semibold">Secure Payments</h3>
              <p className="text-sm text-gray-500">Fast and secure payout options.</p>
            </div>
          </div>

          <div className="mt-6">
            <Link href="/pro-register" className="text-purple-600 font-semibold hover:underline">Register Now</Link>
          </div>
        </div>
      </main>
    </div>
  )
}
