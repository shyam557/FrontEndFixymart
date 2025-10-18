import React from "react";

const ServiceCategories = ({ categories, onAdd, onEdit, onDelete }) => (
  <div className="bg-white rounded-xl p-6 mb-6 shadow">
    <div className="flex items-center mb-4">
      <span className="bg-purple-100 text-purple-600 rounded-full p-2 mr-2"><i className="fa fa-list" /></span>
      <h2 className="font-bold text-lg">Service Categories</h2>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full mb-4 min-w-[600px]">
        <thead>
          <tr className="text-gray-500 text-sm">
            <th className="py-2 px-2 text-left">ID</th>
            <th className="py-2 px-2 text-left">ICON</th>
            <th className="py-2 px-2 text-left">CATEGORY</th>
            <th className="py-2 px-2 text-left">STATUS</th>
            <th className="py-2 px-2 text-left">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat, i) => (
            <tr key={cat.id} className="border-t hover:bg-gray-50">
              <td className="py-2 px-2">{cat.id}</td>
              <td className="py-2 px-2"><span className="bg-gray-200 rounded w-12 h-8 flex items-center justify-center text-xs">48 × 48</span></td>
              <td className="py-2 px-2">{cat.name}</td>
              <td className="py-2 px-2">
                {cat.status === 'Active' ? (
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">Active</span>
                ) : (
                  <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs">Pending</span>
                )}
              </td>
              <td className="py-2 px-2">
                <button className="text-blue-600 mr-2" onClick={() => onEdit(cat)}>Edit</button>
                <button className="text-red-500" onClick={() => onDelete(cat.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={onAdd}>+ Add New Category</button>
  </div>
);
export default ServiceCategories;
