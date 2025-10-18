"use client";
import React, { useState } from "react";
import LocationTabs from "./components/LocationTabs";
import CityList from "./components/CityList";
import CityDetails from "./components/CityDetails";
import CityMapPlaceholder from "./components/CityMapPlaceholder";
import LocationModal from "./components/LocationModal";

const initialCities = [
  {
    id: 1,
    name: "Mumbai",
    state: "Maharashtra",
    country: "India",
    servicePros: 1240,
    localities: 54,
    pincodes: "320+",
    activationDate: "15 Jan 2018",
    lastUpdated: "2 days ago",
    services: ["Plumbing", "Cleaning", "Electrician", "Pest Control", "AC Repair", "Carpentry"],
  },
  {
    id: 2,
    name: "Delhi NCR",
    state: "Delhi",
    country: "India",
    servicePros: 1540,
    localities: 78,
    pincodes: "400+",
    activationDate: "10 Mar 2017",
    lastUpdated: "5 days ago",
    services: ["Plumbing", "Cleaning", "Electrician", "Carpentry"],
  },
  {
    id: 3,
    name: "Bangalore",
    state: "Karnataka",
    country: "India",
    servicePros: 980,
    localities: 42,
    pincodes: "210+",
    activationDate: "22 Aug 2019",
    lastUpdated: "1 week ago",
    services: ["Plumbing", "Cleaning", "Electrician", "AC Repair"],
  },
];

export default function LocationManagerPage() {

  const [tab, setTab] = useState("Cities");
  const [cities, setCities] = useState(initialCities);
  const [selectedId, setSelectedId] = useState(cities[0].id);
  const [modalOpen, setModalOpen] = useState(false);
  const [editCity, setEditCity] = useState(null);

  const handleTab = t => setTab(t);
  const handleSelect = id => setSelectedId(id);
  const handleAdd = () => {
    setEditCity(null);
    setModalOpen(true);
  };
  const handleEdit = () => {
    setEditCity(cities.find(c => c.id === selectedId));
    setModalOpen(true);
  };
  const handleModalClose = () => {
    setModalOpen(false);
    setEditCity(null);
  };
  const handleModalSave = (data) => {
    if (editCity) {
      // Edit existing
      setCities(cities.map(c => c.id === editCity.id ? { ...c, ...data, lastUpdated: "just now" } : c));
    } else {
      // Add new
      const newCity = {
        ...data,
        id: cities.length ? Math.max(...cities.map(c => c.id)) + 1 : 1,
        lastUpdated: "just now",
      };
      setCities([...cities, newCity]);
      setSelectedId(newCity.id);
    }
    setModalOpen(false);
    setEditCity(null);
  };
  const handleViewAll = () => alert("Show all locations modal or page");
  const handleDeactivate = () => alert("Deactivate city logic");

  const selectedCity = cities.find(c => c.id === selectedId) || cities[0];

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold flex items-center gap-2"><span className="text-purple-600"><i className="fa fa-map-marker-alt" /></span> Location Manager</h1>
        <div className="flex gap-2">
          <input type="text" className="border rounded px-4 py-2 w-72" placeholder="Search locations..." />
          <button className="bg-indigo-600 text-white px-4 py-2 rounded" onClick={handleAdd}>+ Add New Location</button>
        </div>
      </div>
      <LocationTabs active={tab} onTab={handleTab} />
      {tab === "Cities" && (
        <div className="flex flex-col md:flex-row gap-6 mt-2">
          <CityList cities={cities} selectedId={selectedId} onSelect={handleSelect} onAdd={handleAdd} onViewAll={handleViewAll} />
          <div className="flex-1 flex flex-col gap-6">
            <CityMapPlaceholder />
            <CityDetails city={selectedCity} onEdit={handleEdit} onDeactivate={handleDeactivate} />
          </div>
        </div>
      )}
      <LocationModal open={modalOpen} onClose={handleModalClose} onSave={handleModalSave} initial={editCity} />
      {/* Service Areas, Zones, Pincodes tabs can be implemented similarly */}
    </div>
  );
}
