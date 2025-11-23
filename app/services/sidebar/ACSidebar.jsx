'use client';

import React, { useEffect, useState } from "react";
import { fetchAllCategories } from "../../../src/lib/api/adminApi";

const FALLBACK_ITEMS = [
  { label: "Service", key: "Service" },
  { label: "Repair & Gas Refill", key: "Repair & Gas Refill" },
  { label: "Installation/Uninstallation", key: "Installation/Uninstallation" },
  { label: "Washing Machine", key: "Washing Machine" },
  { label: "Television", key: "Television" },
  { label: "Geyser", key: "Geyser" },
  { label: "Air Cooler", key: "Air Cooler" },
];

const ACSidebar = ({ onScrollTo }) => {
  const [items, setItems] = useState(FALLBACK_ITEMS);

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        const cats = await fetchAllCategories();
        if (!mounted || !Array.isArray(cats)) return;

        const acCategory = (cats || []).find((c) => {
          const name = (c.name || c.description || "").toString().toLowerCase();
          return (
            name.includes("ac") ||
            name.includes("appliance") ||
            name.includes("air") ||
            name.includes("ac & appliance")
          );
        });

        const acSubs = Array.isArray(acCategory?.subcategories) ? acCategory.subcategories : [];

        if (acSubs.length > 0) {
          // Use server-provided order (backend now returns created_at ascending)
          setItems(acSubs.map((s) => ({ label: s.name, key: s.name })));
        }
      } catch (err) {
        // eslint-disable-next-line no-console
        console.warn("ACSidebar: failed to load categories", err);
      }
    }

    load();
    return () => { mounted = false; };
  }, []);

  return (
    <aside className="p-4 space-y-4">
      <h3 className="text-lg font-bold mb-2">AC Services</h3>
      <nav className="space-y-2">
        {items.map((item, idx) => (
          <button
            key={item.key ?? idx}
            onClick={() => onScrollTo && onScrollTo(item.key)}
            className="block text-left w-full text-gray-700 hover:text-black hover:underline"
          >
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default ACSidebar;
