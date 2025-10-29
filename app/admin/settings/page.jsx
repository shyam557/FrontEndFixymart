"use client";
import React, { useState, useEffect } from "react";
import { fetchAllCategories  ,deleteCategory ,createCategory, createSubCategory} from "../../../src/lib/api/adminApi";
import GeneralSettings from "./components/GeneralSettings";
import PaymentCommission from "./components/PaymentCommission";
import ServiceCategories from "./components/ServiceCategories";
import NotificationSettings from "./components/NotificationSettings";
import MaintenanceMode from "./components/MaintenanceMode";
import CreateCategoryModal from './components/CreateCategoryModal';
import CreateSubcategoryModal from './components/CreateSubcategoryModal';

export default function SettingsPage() {
  // State for all sections
  const [general, setGeneral] = useState({
    name: "UrbanClap",
    email: "admin@urbanclap.com",
    currency: "INR",
    timezone: "Asia/Kolkata",
    logo: null,
  });
  const [payment, setPayment] = useState({
    commission: 20,
    gateway: "Razorpay",
    instructions: "Payment will be processed within 7 working days. Service providers should ensure their bank details are up to date.",
    methods: [
      { label: "Credit/Debit Cards", enabled: true },
      { label: "UPI Payments", enabled: true },
      { label: "Net Banking", enabled: false },
    ],
  });
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notifications, setNotifications] = useState({
    email: [
      { label: "New Booking Alerts", enabled: true },
      { label: "Payment Updates", enabled: true },
      { label: "Service Provider Approvals", enabled: false },
    ],
    sms: [
      { label: "Emergency Alerts", enabled: true },
      { label: "Service Reminders", enabled: false },
    ],
    push: [
      { label: "Promotional Offers", enabled: true },
      { label: "Rating Reminders", enabled: false },
    ],
  });
  const [maintenance, setMaintenance] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isCreateSubcategoryModalOpen, setIsCreateSubcategoryModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [subcategories, setSubcategories] = useState([]);

  // Fetch categories on component mount
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchAllCategories();
        setCategories(data.map(cat => ({
          id: cat.id,
          name: cat.name,
          description: cat.description,
          icon: cat.icon,
          status: cat.is_active ? "Active" : "Inactive",
          subcategories: cat.subcategories
        })));
        setIsLoading(false);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
        setError("Failed to load categories");
        setIsLoading(false);
      }
    };

    loadCategories();
  }, []);

  // Handlers
  const handleGeneralChange = (key, value) => setGeneral(g => ({ ...g, [key]: value }));
  const handleLogoChange = e => {
    // For demo, just set file name
    if (e.target.files[0]) setGeneral(g => ({ ...g, logo: e.target.files[0].name }));
  };
  const handlePaymentChange = (key, value) => setPayment(p => ({ ...p, [key]: value }));
  const handlePaymentToggle = idx => setPayment(p => ({ ...p, methods: p.methods.map((m, i) => i === idx ? { ...m, enabled: !m.enabled } : m) }));
  const handleCategoryAdd = async (categoryData) => {
    try {
      // You'll need to implement createCategory in adminApi.js
      const newCategory = await createCategory(categoryData);
      setCategories(prev => [...prev, {
        id: newCategory.id,
        name: newCategory.name,
        status: newCategory.is_active ? "Active" : "Inactive"
      }]);
      setIsCreateModalOpen(false); // Close modal on success
    } catch (err) {
      console.error("Failed to add category:", err);
      alert("Failed to add category");
    }
  };
  const handleSubcategoryAdd = async (subcategoryData) => {
    try {
      if (!selectedCategory) {
        alert("Please select a category first");
        return;
      }

      // Add category_id to the subcategory data
      const subcategoryWithCategory = {
        ...subcategoryData,
        category_id: selectedCategory.id  // Add the category_id from selected category
      };

      const newSubcategory = await createSubCategory(subcategoryWithCategory);
      
      // Update both the subcategories list and the categories state
      setSubcategories(prev => [...prev, newSubcategory]);
      
      // Update the subcategories in the parent category as well
      setCategories(prev => prev.map(cat => 
        cat.id === selectedCategory.id 
          ? { ...cat, subcategories: [...cat.subcategories, newSubcategory] }
          : cat
      ));

      setIsCreateSubcategoryModalOpen(false);
    } catch (err) {
      console.error("Failed to add subcategory:", err);
      alert("Failed to add subcategory");
    }
  };
  const handleCategoryEdit = async (cat) => {
    const name = prompt("Edit category name:", cat.name);
    // if (name) {
    //   try {
    //     // You'll need to implement updateCategory in adminApi.js
    //     await updateCategory(cat.id, { name });
    //     setCategories(prev => prev.map(x => 
    //       x.id === cat.id ? { ...x, name } : x
    //     ));
    //   } catch (err) {
    //     console.error("Failed to update category:", err);
    //     alert("Failed to update category");
    //   }
    // }
  };
  const handleCategoryDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        // You'll need to implement deleteCategory in adminApi.js
        await deleteCategory(id);
        setCategories(prev => prev.filter(x => x.id !== id));
      } catch (err) {
        console.error("Failed to delete category:", err);
        alert("Failed to delete category");
      }
    }
  };
  const handleNotifToggle = (type, idx) => setNotifications(n => ({ ...n, [type]: n[type].map((x, i) => i === idx ? { ...x, enabled: !x.enabled } : x) }));
  const handleMaintenanceToggle = () => setMaintenance(m => !m);
  const handleSave = () => {
    // Save logic here (API call etc.)
    alert("Settings saved!");
  };
  const handleCategorySelect = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    setSelectedCategory(category);
    if (category) {
      setSubcategories(category.subcategories);
    } else {
      setSubcategories([]);
    }
  };

  return (
    <div className="p-6">
      <GeneralSettings data={general} onChange={handleGeneralChange} onLogoChange={handleLogoChange} />
      <PaymentCommission data={payment} onChange={handlePaymentChange} onToggle={handlePaymentToggle} />
      {isLoading ? (
        <div>Loading categories...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <>
          <ServiceCategories 
            categories={categories} 
            onAdd={() => setIsCreateModalOpen(true)} 
            onEdit={handleCategoryEdit} 
            onDelete={handleCategoryDelete}
            onSelect={handleCategorySelect}
            selectedCategory={selectedCategory}
          />
          
          {/* Add Subcategories Section */}
          {selectedCategory && (
            <div className="mt-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">
                  Subcategories for {selectedCategory.name}
                </h3>
                <button 
                  className="bg-green-500 text-white px-4 py-2 rounded"
                  onClick={() => setIsCreateSubcategoryModalOpen(true)}
                >
                  Add Subcategory
                </button>
              </div>
              
              <div className="bg-white rounded-lg shadow">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Duration</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Base Price</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {subcategories.map(sub => (
                      <tr key={sub.id}>
                        <td className="px-6 py-4 whitespace-nowrap">{sub.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{sub.duration} mins</td>
                        <td className="px-6 py-4 whitespace-nowrap">₹{sub.base_price}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <button 
                            className="text-blue-600 hover:text-blue-900 mr-4"
                            onClick={() => {/* Edit subcategory handler */}}
                          >
                            Edit
                          </button>
                          <button 
                            className="text-red-600 hover:text-red-900"
                            onClick={() => {/* Delete subcategory handler */}}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}
      <CreateCategoryModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCategoryAdd}
      />
      <CreateSubcategoryModal
        isOpen={isCreateSubcategoryModalOpen}
        onClose={() => setIsCreateSubcategoryModalOpen(false)}
        onSubmit={handleSubcategoryAdd}
        categoryId={selectedCategory?.id}
      />
      <NotificationSettings data={notifications} onToggle={handleNotifToggle} />
      <MaintenanceMode enabled={maintenance} onToggle={handleMaintenanceToggle} />
      <div className="flex justify-end">
        <button className="bg-blue-600 text-white px-6 py-2 rounded" onClick={handleSave}>
          Save All Changes
        </button>
      </div>
    </div>
  );
}
