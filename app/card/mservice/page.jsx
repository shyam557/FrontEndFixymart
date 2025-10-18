"use client";

import Image from "next/image";
import Link from "next/link";
import { CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function Mservice() {
  const items = [
    {
      title: "Rooms/walls painting consultation",
      rating: "★ 4.79 (4K)",
      price: "₹49",
      image: "/images/ac.jpg",
    },
    {
      title: "Pest control (includes utensil removal)",
      rating: "★ 4.79 (106K)",
      price: "₹1,098",
      image: "/images/en2.jpg",
    },
    {
      title: "Apartment pest control",
      rating: "★ 4.80 (35K)",
      price: "₹1,498",
      image: "/images/man2.jpg",
    },
    {
      title: "Foam-jet AC service",
      rating: "★ 4.78 (1.5M)",
      price: "₹599",
      image: "/images/en7.jpg",
    },
    {
      title: "Apartment termite control",
      rating: "★ 4.83 (15K)",
      price: "₹3,999",
      image: "/images/mensaloon1.jpg",
    },
  ];

  return (
    <section
      className="max-w-7xl mx-auto px-4 py-6"
      aria-labelledby="most-booked-services"
    >
      {/* Heading */}
      <div className="flex items-center justify-between mb-4">
        <h2
          id="most-booked-services"
          className="text-2xl font-semibold text-gray-900"
        >
          Most Booked Services
        </h2>
        <Link
          href="/services/most-booked"
          className="text-sm px-4 py-2 text-blue-600 hover:underline border border-gray-200 rounded"
        >
          See all
        </Link>
      </div>

      {/* Carousel */}
      <Carousel className="w-full">
        <CarouselContent className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory no-scrollbar flex-nowrap">
          {items.map((item, index) => (
            <CarouselItem
              key={index}
              className="shrink-0 snap-start basis-[85%] sm:basis-1/2 md:basis-1/3 lg:basis-1/5 max-w-[320px]"
              aria-label={item.title}
            >
              <article className="group overflow-hidden rounded-md shadow bg-white border border-gray-100 flex flex-col h-full">
                <div className="relative w-full h-52 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-700 ease-in-out "
                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 40vw, 20vw"
                  />
                </div>
                <CardContent className="p-3 flex flex-col flex-1">
                  <h3 className="text-sm font-medium text-gray-800 mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-500 mb-1">{item.rating}</p>
                  <p className="text-sm font-semibold text-gray-900 mt-auto">
                    {item.price}
                  </p>
                </CardContent>
              </article>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Carousel Arrows */}
        <CarouselPrevious className="text-gray-600 hidden md:flex" />
        <CarouselNext className="text-gray-600 hidden md:flex" />
      </Carousel>
    </section>
  );
}
