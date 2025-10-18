"use client";

export default function NavbarMobile() {
  return (
    <div className="sticky top-0 z-50 p-4 flex justify-between items-center bg-white border-b">
      <span className="text-xl font-bold">
        urban<span className="text-xs">x</span>
      </span>
      <input
        type="text"
        placeholder="Search services"
        className="border px-3 py-1 rounded-md w-full max-w-xs text-sm ml-4"
      />
    </div>
  );
}
