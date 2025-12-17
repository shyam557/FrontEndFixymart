"use client";

import { useRouter } from "next/navigation";

export default function HeroSectionMobile({ data }) {
  const router = useRouter();

  const handleClick = (key) => {
    router.push(`/services?type=${key}`);
  };

  return (
    <section className="block md:hidden bg-white mt-20 py-6 px-3 text-center w-full">
      <h1 className="text-2xl md:text-3xl font-extrabold text-gray-800 py-3 break-words">
        Trusted Home Services <br />
        <span className="text-purple-600">At Your Doorest</span>
      </h1>

      {/* Service Grid */}
      <div className="mt-6 flex flex-wrap justify-center gap-2.5 px-1 w-full max-w-full">
        {data?.map((cat) => (
          <div
            key={cat.id}
            className="w-[80px] bg-slate-100 rounded-md shadow-md flex flex-col items-center justify-center hover:shadow-lg cursor-pointer transition-transform duration-200 active:scale-95 p-2.5 flex-shrink-0"
            onClick={() => handleClick(cat.id)}
          >
            <div className="text-2xl mb-1">{cat.icon}</div>
            <span className="text-xs text-[#4C51BF] font-medium text-center line-clamp-2 break-words">
              {cat.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}