"use client";

const NEXT_PUBLIC_BACKEND_PUBLIC_API_URL_FOR_IMG = process.env.NEXT_PUBLIC_BACKEND_PUBLIC_API_URL_FOR_IMG 

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchOneSubCategoryServices } from "../../../src/lib/api/api";

export default function ScrollingCard( props) {
  const [services, setServices] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  
    async function loadServices() {
      console.log("props in scrolling card",props); 
      const data = await fetchOneSubCategoryServices(props.subcategoryId);
      setServices(data);
      setLoading(false);
      console.log("data fetched",props.subcategoryId,services);
    }
    loadServices();
  }, [props.subcategoryId]);


  // Use another effect to log when services actually change
useEffect(() => {
  console.log("services updated:", services);
}, [services]);


  if (loading) return <p className="text-center mt-10">Loading services...</p>;
if (!services || services.length === 0) return <p>No services found.</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between w-full mb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 truncate">
          {props.categoryName}
        </h2>
        <Link
          href={`/services?type=${props.id}`}
          className="text-sm px-4 py-3 rounded text-blue-600 border border-gray-200 hover:underline whitespace-nowrap"
        >
          See all
        </Link>
      </div>

      <div
        className="flex gap-3 md:gap-6 scroll-smooth overflow-x-auto scrollbar-hide pb-2"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {services.map((service) => (
          <Link
            key={service.id || service.title}
            href={`/services?type=${props.id}`}
            // href={`/card/ACservices/${service.title.replace(/\s+/g, "-").toLowerCase()}`}
            className="flex-shrink-0 w-[160px] h-[200px] sm:w-[190px] sm:h-[230px] md:w-[220px] md:h-[260px] lg:w-[240px] lg:h-[280px] 
                       bg-white border border-gray-100 rounded-2xl shadow-sm flex flex-col items-center 
                       hover:border-gray-300 transition-all duration-300 overflow-hidden"
            style={{ textDecoration: "none" }}
          >
            <div className="w-full px-2 pt-3 pb-1 text-sm sm:text-base md:text-lg font-semibold text-gray-900 text-center truncate">
              {service.title}
            </div>
            <div className="relative w-full flex-1 flex items-center justify-center">
              <Image
                src={`${NEXT_PUBLIC_BACKEND_PUBLIC_API_URL_FOR_IMG}${service.image}`}
              
                            // src={service.image}
                // src={"http://localhost:3000/services?type=ac"}
                // src={service.image}
                alt={service.description}
                width={140}
                height={140}
                className="object-contain sm:w-[160px] sm:h-[140px] md:w-[200px] md:h-[160px] lg:w-[220px] lg:h-[180px]"
                quality={100}
                priority
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}




// "use client";

// import Image from "next/image";
// import Link from "next/link";

// import { useEffect, useState } from 'react';

// import { fetchOneSubCategoryServices } from "../../../src/lib/api/api";


// const services = [
//   { title: "AC Service & Repair", image: "/images/ac4.avif" },
//   { title: "Washing Machine", image: "/images/washingmachine.avif" },
//   { title: "Television", image: "/images/tv1.webp" },
//   { title: "Geyser", image: "/images/geyser2.png" },
//   { title: "Air Cooler", image: "/images/aircooler1.webp" },
// ];



// export default function ScrollingCard(categoryName,subcategoryId) {

// //fetch one subcategory all services
//      const [services, setServices] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function loadservices() {
//       const data = await fetchOneSubCategoryServices(subcategoryId);
//       setServices(data);
//       setLoading(false);

//       console.log("fetched service",services)
//     }
//     loadservices();
//   }, []);

//   if (loading) return <p className="text-center mt-10">Loading services...</p>;

//   if (!services) return <p>No services found.</p>;




//   return (



//     <div className="max-w-7xl mx-auto px-4 py-6">
//       {/* Heading and See all link */}
//       <div className="flex items-center justify-between w-full mb-4">
//         <h2 className="text-xl sm:text-2xl font-bold text-gray-800 truncate">
//           {categoryName}
//         </h2>
//         <Link
//           href="/services?type=ac"
//           className="text-sm px-4 py-3 rounded text-blue-600 border border-gray-200 hover:underline whitespace-nowrap"
//         >
//           See all
//         </Link>
//       </div>

//       {/* Scrollable cards */}
//       <div
//         className="flex gap-3 md:gap-6 scroll-smooth overflow-x-auto scrollbar-hide pb-2"
//         style={{ WebkitOverflowScrolling: "touch" }}
//       >



//  {

//         Array.isArray(services.data)?
// services.map((service) => (

//    <Link
//             key={service.id}
//             href={`/card/ACservices/${service.title.replace(/\s+/g, '-').toLowerCase()}`}
//             className="flex-shrink-0 w-[160px] h-[200px] sm:w-[190px] sm:h-[230px] md:w-[220px] md:h-[260px] lg:w-[240px] lg:h-[280px] 
//             bg-white border border-gray-100 rounded-2xl shadow-sm flex flex-col items-center 
//             hover:border-gray-300 transition-all duration-300 overflow-hidden"
//             style={{ textDecoration: 'none' }}
//           >
//             <div className="w-full px-2 pt-3 pb-1 text-sm sm:text-base md:text-lg font-semibold text-gray-900 text-center truncate">
//               {service.title}
//             </div>
//             <div className="relative w-full flex-1 flex items-center justify-center">
//               <Image
//                 src={service.image}
//                 alt={service.title}
//                 width={140}
//                 height={140}
//                 className="object-contain sm:w-[160px] sm:h-[140px] md:w-[200px] md:h-[160px] lg:w-[220px] lg:h-[180px]"
//                 quality={100}
//                 priority
//               />
//             </div>
//           </Link>


//         // <div key={cat.id}>
//         //   <h3>{cat.name}</h3>
//         //   <ul>
//         //     {cat.subcategories?.map((sub) => (
//         //       <li key={sub.id}>{sub.name} - ₹{sub.basePrice}</li>
//         //     ))}
//         //   </ul>
//         // </div>
//       ))

// : <p>No data found.</p>

// }

//         {/*{services.map((service, idx) => (
//           <Link
//             key={idx}
//             href={`/card/ACservices/${service.title.replace(/\s+/g, '-').toLowerCase()}`}
//             className="flex-shrink-0 w-[160px] h-[200px] sm:w-[190px] sm:h-[230px] md:w-[220px] md:h-[260px] lg:w-[240px] lg:h-[280px] 
//             bg-white border border-gray-100 rounded-2xl shadow-sm flex flex-col items-center 
//             hover:border-gray-300 transition-all duration-300 overflow-hidden"
//             style={{ textDecoration: 'none' }}
//           >
//             <div className="w-full px-2 pt-3 pb-1 text-sm sm:text-base md:text-lg font-semibold text-gray-900 text-center truncate">
//               {service.title}
//             </div>
//             <div className="relative w-full flex-1 flex items-center justify-center">
//               <Image
//                 src={service.image}
//                 alt={service.title}
//                 width={140}
//                 height={140}
//                 className="object-contain sm:w-[160px] sm:h-[140px] md:w-[200px] md:h-[160px] lg:w-[220px] lg:h-[180px]"
//                 quality={100}
//                 priority
//               />
//             </div>
//           </Link>
//         ))}*/}



//       </div>
//     </div>
//   );
// }
