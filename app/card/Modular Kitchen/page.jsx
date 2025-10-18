"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ModularKitchen() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="relative w-full h-[420px] md:h-[500px] rounded-2xl overflow-hidden shadow-md">
        {/* Background Image */}
        <Image
          src="/images/modular-kitchen.jpg" // ✅ Replace with your image path
          alt="Modular Kitchen"
          fill
          className="object-cover"
            quality={100}
          priority
        />

        {/* Dark Overlay */}
        <div className="absolute inset-70 bg-black/60 z-10" />

        {/* ₹2000 off top-left */}
        <div className="absolute top-4 left-4 z-20">
          <span className="inline-block bg-green-600 text-xs font-semibold px-3 py-1 rounded-full">
            ₹2,000 off
          </span>
        </div>

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="absolute z-20 px-6 md:px-12 w-full h-full flex items-end md:items-end"
        >
          <div className="text-white max-w-md space-y-3 md:space-y-4 w-full md:w-auto text-right ml-auto pb-6 md:pb-16 md:text-left">
            <h2 className="text-2xl md:text-4xl font-bold">
              Modular Kitchen Designs
            </h2>
            <p className="text-sm text-gray-300">Modern. Durable. Custom-fit.</p>
            <Link
              href="/products/modular-kitchen"
              className="inline-block bg-white text-black text-sm font-medium px-5 py-2 rounded hover:bg-gray-200 transition"
            >
              Explore Designs
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
