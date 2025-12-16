"use client";

import Link from "next/link";

export default function ProRegisterPage(){
  return (
    <div className="min-h-screen pt-24 pb-20 bg-gray-50">
      <main className="max-w-3xl mx-auto px-6">
        <div className="bg-white shadow rounded-lg p-8">
          <h1 className="text-3xl font-bold mb-3">Register as a Professional</h1>
          <p className="text-gray-600 mb-4">Join our network of trusted professionals and get discovered by local customers.</p>

          <form className="space-y-4">
            <input className="w-full border rounded px-3 py-2" placeholder="Full name or company" />
            <input className="w-full border rounded px-3 py-2" placeholder="Phone" />
            <input className="w-full border rounded px-3 py-2" placeholder="Services offered" />
            <button type="button" className="bg-green-600 text-white px-4 py-2 rounded">Register</button>
          </form>

          <div className="mt-6">
            <Link href="/pro/resources" className="text-purple-600 font-semibold hover:underline">Learn about resources for professionals</Link>
          </div>
        </div>
      </main>
    </div>
  )
}
