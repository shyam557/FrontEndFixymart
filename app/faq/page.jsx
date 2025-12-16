"use client";

import Link from "next/link";

export default function FaqPage(){
  const faqs = [
    {q: 'How do I book a service?', a: 'Search for a service, select provider and book.'},
    {q: 'What is the cancellation policy?', a: 'You can cancel within 24 hours for a refund.'}
  ];

  return (
    <div className="min-h-screen pt-24 pb-20 bg-gray-50">
      <main className="max-w-4xl mx-auto px-6">
        <div className="bg-white shadow rounded-lg p-8">
          <h1 className="text-3xl font-bold mb-4">FAQs</h1>
          <div className="space-y-4">
            {faqs.map((f, idx) => (
              <details key={idx} className="p-4 border rounded">
                <summary className="font-semibold">{f.q}</summary>
                <p className="mt-2 text-gray-600">{f.a}</p>
              </details>
            ))}
          </div>

          <div className="mt-6">
            <Link href="/contact" className="text-purple-600 font-semibold hover:underline">Still need help? Contact us</Link>
          </div>
        </div>
      </main>
    </div>
  )
}
