
"use client";
import React from "react";
import RelatedServices from "./RelatedServices";

export default function RelatedServicesPage({ relatedAddOns, selectedAddOns, toggleAddOn }) {
  return (
    <div className="w-full lg:w-[420px] flex-shrink-0">
      <RelatedServices
        relatedAddOns={relatedAddOns}
        selectedAddOns={selectedAddOns}
        toggleAddOn={toggleAddOn}
      />
    </div>
  );
}
