"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  FaBroom,
  FaBolt,
  FaHammer,
  FaTools,
} from "react-icons/fa";
import { MdPlumbing } from "react-icons/md";
import { GiPaintRoller } from "react-icons/gi";

const services = [
  { icon: <FaTools className="text-blue-400 text-3xl" />, key: "ac" },
  { icon: <MdPlumbing className="text-orange-500 text-3xl" />, key: "plumber" },
  { icon: <FaBolt className="text-blue-500 text-3xl" />, key: "electrician" },
  { icon: <FaHammer className="text-yellow-500 text-3xl" />, key: "carpenter" },
  { icon: <FaBroom className="text-pink-500 text-3xl" />, key: "cleaning" },
  { icon: <GiPaintRoller className="text-teal-500 text-3xl" />, key: "painter" },
];

export default function HeroSection({ data }) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    services.forEach((service) => {
      router.prefetch(`/services?type=${service.key}`);
    });
  }, [router]);

  const handleClick = (key) => {
    router.push(`/services?type=${key}`);
  };

  return (
    <section className="bg-white mt-4 md:mt-0 py-12 px-4 text-center overflow-x-hidden">
      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mt-16">
        Trusted Home Services <br />
        <span className="text-purple-600">At Your Doorstep</span>
      </h1>

      {/* SERVICES GRID */}
      <div className="mt-10 flex flex-wrap justify-center gap-4 px-2">
        {data.map((cat, index) => {
          const serviceIcon = services[index % services.length]?.icon;

          return (
            <div
              key={cat.id}
              className="w-[100px] sm:w-[110px] md:w-[130px]
                         bg-slate-100 rounded-md shadow-md
                         flex flex-col items-center justify-center
                         hover:shadow-xl cursor-pointer
                         transition-transform duration-200
                         hover:scale-105 p-4"
              onClick={() => handleClick(cat.id)}
            >
              {/* ICON */}
              <div className="mb-1">{serviceIcon}</div>

              {/* NAME */}
              <span className="text-xs text-[#4C51BF] font-medium text-center">
                {cat.name}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
