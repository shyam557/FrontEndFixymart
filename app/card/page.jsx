"use client";

import React, { useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Mostservice = () => {
  const scrollRef = useRef(null);

  // Scroll by buttons
  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -320, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 320, behavior: "smooth" });
    }
  };

  // Fix: allow vertical scroll when horizontal edges reached
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onWheel = (e) => {
      const canScrollLeft = el.scrollLeft > 0;
      const canScrollRight =
        el.scrollLeft < el.scrollWidth - el.clientWidth;

      if (e.deltaY !== 0 && (canScrollLeft || canScrollRight)) {
        e.preventDefault();
        el.scrollBy({ left: e.deltaY, behavior: "smooth" });
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  const services = [
    { title: "Painter", img: "/images/painter1.jpg" },
    { title: "AC Service", img: "/images/acservice1.jpg" },
    { title: "Electrician", img: "/images/electrician1.jpg" },
    { title: "Men Saloon", img: "/images/mensaloon1.jpg" },
    { title: "Cooks", img: "/images/cooks1.jpg" },
    { title: "Cleaner", img: "/images/cleaner1.jpg" },
  ];

  return (
    <section
      className="relative px-2 sm:px-4 py-8 max-w-7xl mx-auto w-full overflow-x-hidden"
      aria-labelledby="most-booked-services"
    >
      <h2
        id="most-booked-services"
        className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900"
      >
        Most Booked Services
      </h2>

      {/* Arrows */}
      <button
        aria-label="Scroll left"
        onClick={scrollLeft}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full hidden md:flex hover:bg-gray-100"
        type="button"
      >
        <ChevronLeft className="w-5 h-5 text-gray-700" />
      </button>

      <button
        aria-label="Scroll right"
        onClick={scrollRight}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full hidden md:flex hover:bg-gray-100"
        type="button"
      >
        <ChevronRight className="w-5 h-5 text-gray-700" />
      </button>

      {/* Scrollable Card Container */}
      <div className="overflow-hidden">
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scroll-smooth no-scrollbar pb-1"
          tabIndex={0}
          aria-label="Service cards"
        >
          {services.map((item, index) => (
            <article
              key={index}
              className="w-64 sm:w-72 md:w-80 flex-shrink-0 bg-white rounded-xl overflow-hidden border border-gray-100"
            >
              <img
                src={item.img}
                alt={`${item.title} - Professional and trusted`}
                className="w-full h-40 sm:h-48 object-cover"
                loading="lazy"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                <p className="text-gray-500 text-sm mb-2">
                  Professional and trusted
                </p>
                <button
                  className="mt-2 px-4 py-1 bg-black text-white rounded text-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black"
                  type="button"
                  aria-label={`Book ${item.title} service`}
                >
                  Book Now
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Mostservice;
