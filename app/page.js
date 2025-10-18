"use client";

import HeroSection from "./components/Herosection";
//  import Mostservice from "./card/page";
 import CleaningServices from "./card/Cleaner/page";
 import Applianceservice from "./card/ACservices/page";
 import SmartLockBanner from "./card/smart doorbeell/page"; 
  // import Mservice from "./card/mservice/page";
import PlumberServices from "./card/plumber/page";
import ElectricianServices from "./card/electrician/page";

import PainterServices from "./card/Painter/page";
import ModularKitchen from "./card/Modular Kitchen/page";
import Carpenterservice from "./card/carpenter/page";

import { fetchAllCategories } from "../src/lib/api/api";
import { useEffect, useState } from 'react';

 import SingleService from "./card/SingleService/page";


export default function Home() {

     const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCategories() {
      const data = await fetchAllCategories();
      setCategories(data);
      setLoading(false);
      // console.log("Fetch all category",data);
    }
    loadCategories();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading categories...</p>;

//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold mb-4 text-center">All Categories</h1>

//       {categories.length === 0 ? (
//         <p className="text-center text-gray-600">No categories found.</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//           {categories.map((cat) => (
//             <div key={cat.id} className="border rounded-lg p-4 shadow-sm bg-white">
//               <h2 className="text-xl font-semibold">{cat.name}</h2>
//               <p className="text-gray-600">{cat.description}</p>
//               {cat.icon && (
//                 <img
//                   src={cat.icon}
//                   alt={cat.name}
//                   className="w-12 h-12 mt-2"
//                 />
//               )}

//               <div className="mt-3">
//                 <h4 className="font-medium">Subcategories:</h4>
//                 <ul className="list-disc list-inside">
//                   {cat.subcategories.map((sub) => (
//                     <li key={sub.id}>
//                       {sub.name} — {sub.duration} min — ₹{sub.basePrice}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

  return ( 
    
      <main className="">
        <HeroSection data={categories} />
        
          <div className="">
             {/* <Mostservice /> */}



 {categories.map((cat) => (

   <div
          key={cat.id}
          className="w-[100px] sm:w-[110px] md:w-[130px] bg-slate-100 rounded-md shadow-md flex flex-col items-center justify-center hover:shadow-xl cursor-pointer transition-transform duration-200 hover:scale-105 p-4"
          onClick={() => handleClick(cat.name)}
        >,
          <div>{cat.icon}</div>,
          <span className="text-xs text-[#4C51BF] font-medium mt-1 text-center">,
            {cat.subcategories[0].id},
          </span>,
        </div>,

        <SingleService key={cat.id}
  categoryName={cat.name} 
  subcategoryId={cat.subcategories[0].id} 
         />,


        // <div key={cat.id}>
        //   <h3>{cat.name}</h3>
        //   <ul>
        //     {cat.subcategories?.map((sub) => (
        //       <li key={sub.id}>{sub.name} - ₹{sub.basePrice}</li>
        //     ))}
        //   </ul>
        // </div>
      ))}


              <CleaningServices />
             <Applianceservice />
             <SmartLockBanner />
           {/* <Mservice /> */}
            <PlumberServices/>
            <ElectricianServices/>
            <PainterServices />
            <ModularKitchen />
            <Carpenterservice />
          </div> 
        
      </main>
    
  );
}
