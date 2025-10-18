'use client';

import { useSearchParams } from "next/navigation";
import AcRepairPage from "./ac/AcRepairPage";
import PlumberPage from "./plumber/PlumberPage";
import ElectricianPage from "./electrician/ElectricianPage";
import CarpenterPage from "./carpenter/CarpenterPage";
import CleaningPage from "./cleaning/CleaningPage";
import PainterPage from "./Painter/PainterPage";
import SingleServiceSearch from "./SingleServiceSearch/SingleServiceSearch";


export default function ServicesPage() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");

  return <SingleServiceSearch/>;
  // return <PlumberPage/>;

  if (type === "ac") return <AcRepairPage />;
  if (type === "plumber") return <PlumberPage />;
  if (type === "electrician") return <ElectricianPage />;
  if (type === "carpenter") return <CarpenterPage />;
  if (type === "cleaning") return <CleaningPage />;
  if (type === "painter") return <PainterPage />; // ✅ Painter route

  return (
    <div className="p-6 text-center text-gray-600">
      Service not found or coming soon.
    </div>
  );
}
