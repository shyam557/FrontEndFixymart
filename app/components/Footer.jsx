"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaApple,
  FaGooglePlay,
} from "react-icons/fa";

export default function Footer() {
  const [year, setYear] = useState(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="hidden md:block bg-[#f5faff] text-[#2b3a67] border-t border-gray-200 pt-6 mt-6 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="overflow-x-auto md:overflow-visible">
          <div className="flex md:grid md:grid-cols-4 gap-10 min-w-[700px] md:min-w-0">
            <div className="min-w-[200px]">
              <h3 className="text-lg font-bold mb-4">Company</h3>
              <ul className="space-y-2 break-words">
                {[
                  ["About us", "/about"],
                  ["Investor Relations", "/investors"],
                  ["Terms & conditions", "/terms"],
                  ["Privacy policy", "/privacy"],
                ].map(([label, href]) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-gray-600 hover:text-black transition block py-1"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="min-w-[200px]">
              <h3 className="text-lg font-bold mb-4">For customers</h3>
              <ul className="space-y-2 break-words">
                {[
                  ["UC reviews", "/reviews"],
                  ["Contact us", "/contact"],
                  ["FAQs", "/faq"],
                  ["Safety Center", "/safety"],
                ].map(([label, href]) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-gray-600 hover:text-black transition block py-1"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="min-w-[200px]">
              <h3 className="text-lg font-bold mb-4">For professionals</h3>
              <ul className="space-y-2 break-words">
                {[
                  ["Register as a professional", "/pro-register"],
                  ["Resources", "/pro/resources"],
                  ["Professional Benefits", "/pro/benefits"],
                ].map(([label, href]) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-gray-600 hover:text-black transition block py-1"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-6">
                <h3 className="text-lg font-bold mb-3">Social links</h3>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-600 hover:text-black transition">
                    <FaFacebook size={20} />
                  </a>
                  <a href="#" className="text-gray-600 hover:text-black transition">
                    <FaTwitter size={20} />
                  </a>
                  <a href="#" className="text-gray-600 hover:text-black transition">
                    <FaInstagram size={20} />
                  </a>
                </div>
              </div>
            </div>

            <div className="min-w-[200px]">
              <h3 className="text-lg font-bold mb-4">Download our app</h3>
              <div className="space-y-4 max-w-xs">
                <a
                  href="#"
                  className="flex items-center gap-3 border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50 transition"
                >
                  <FaApple size={20} />
                  <div>
                    <p className="text-xs">Download on the</p>
                    <p className="font-semibold">App Store</p>
                  </div>
                </a>
                <a
                  href="#"
                  className="flex items-center gap-3 border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50 transition"
                >
                  <FaGooglePlay size={18} />
                  <div>
                    <p className="text-xs">Get it on</p>
                    <p className="font-semibold">Google Play</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 pt-6 text-center text-gray-500 text-sm mt-8">
          {year && <p>&copy; {year} UC Company. All rights reserved.</p>}
        </div>
      </div>
    </footer>
  );
}
