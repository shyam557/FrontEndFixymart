"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  FaBroom,
  FaBolt,
  FaHammer,
  FaSearch,
  FaTools,
} from "react-icons/fa";
import { MdPlumbing } from "react-icons/md";
import { GiPaintRoller } from "react-icons/gi";

const services = [
  { icon: <FaTools className="text-blue-400 text-3xl" />, label: "AC & Appliance Repair", key: "ac" },
  { icon: <MdPlumbing className="text-orange-500 text-3xl" />, label: "Plumber", key: "plumber" },
  { icon: <FaBolt className="text-blue-500 text-3xl" />, label: "Electrician", key: "electrician" },
  { icon: <FaHammer className="text-yellow-500 text-3xl" />, label: "Carpenter", key: "carpenter" },
  { icon: <FaBroom className="text-pink-500 text-3xl" />, label: "Cleaning", key: "cleaning" },
  { icon: <GiPaintRoller className="text-teal-500 text-3xl" />, label: "Painter", key: "painter" },
];

export default function HeroSection({data} ) {
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

  const filteredServices = services.filter((service) =>
    service.label.toLowerCase().includes(searchTerm.toLowerCase())
  );




  return (
<section className="bg-white mt-10 md:mt-0 py-12 px-4  text-center overflow-x-hidden">
  <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 md:py-10 sm:my-10 ">
    Trusted Home Services <br />
  <span className="text-purple-600">At Your Doorest</span></h1>

  {/* Search bar - Desktop only */}
  {/* <div className="mt-4 max-w-sm mx-auto relative hidden md:block">
    <input
      type="text"
      placeholder="Search services..."
      className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
    <FaSearch className="absolute right-4 top-3 text-purple-600 text-lg" />
  </div> */}

  {/* Responsive Grid */}

  <div className="mt-10 flex flex-wrap justify-center gap-4 px-2">

 {data.map((cat) => (

   <div
          key={cat.id}
          className="w-[100px] sm:w-[110px] md:w-[130px] bg-slate-100 rounded-md shadow-md flex flex-col items-center justify-center hover:shadow-xl cursor-pointer transition-transform duration-200 hover:scale-105 p-4"
          // onClick={() => handleClick(cat.name)}
          onClick={() => handleClick("ac")}
        >
          <div>{cat.icon}</div>
          <span className="text-xs text-[#4C51BF] font-medium mt-1 text-center">
            {cat.name}
            {/* {cat.subcategories[0].id} */}
          </span>
        </div>


        // <div key={cat.id}>
        //   <h3>{cat.name}</h3>
        //   <ul>
        //     {cat.subcategories?.map((sub) => (
        //       <li key={sub.id}>{sub.name} - ₹{sub.basePrice}</li>
        //     ))}
        //   </ul>
        // </div>
      ))}

  {/*  {filteredServices.length > 0 ? (
      filteredServices.map((service, idx) => (
        <div
          key={idx}
          className="w-[100px] sm:w-[110px] md:w-[130px] bg-slate-100 rounded-md shadow-md flex flex-col items-center justify-center hover:shadow-xl cursor-pointer transition-transform duration-200 hover:scale-105 p-4"
          onClick={() => handleClick(service.key)}
        >
          <div>{service.icon}</div>
          <span className="text-xs text-[#4C51BF] font-medium mt-1 text-center">
            {service.label}
          </span>
        </div>
      ))
    ) : (
      <p className="text-gray-500 mt-4 col-span-full">No matching services found.</p>
    )}*/}
  </div>
</section>

  );
}
