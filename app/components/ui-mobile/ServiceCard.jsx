"use client";
export default function ServiceCard({ title, price, description }) {
  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-lg transition duration-200">
      <h3 className="font-bold text-lg mb-1">{title}</h3>
      <p className="text-sm text-gray-500 mb-2">{description}</p>
      <div className="text-purple-600 font-semibold">₹{price}</div>
    </div>
  );
}
