import React, { useRef } from "react";

const GeneralSettings = ({ data, onChange, onLogoChange }) => {
  const fileInput = useRef();
  return (
    <div className="bg-white rounded-xl p-6 mb-6 shadow">
      <div className="flex items-center mb-4">
        <span className="bg-blue-100 text-blue-600 rounded-full p-2 mr-2"><i className="fa fa-cog" /></span>
        <h2 className="font-bold text-lg">General Settings</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium mb-1">Platform Name</label>
          <input className="border rounded px-3 py-2 w-full" value={data.name} onChange={e => onChange('name', e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Admin Email</label>
          <input className="border rounded px-3 py-2 w-full" value={data.email} onChange={e => onChange('email', e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Default Currency</label>
          <select className="border rounded px-3 py-2 w-full" value={data.currency} onChange={e => onChange('currency', e.target.value)}>
            <option value="INR">INR (₹)</option>
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Time Zone</label>
          <input className="border rounded px-3 py-2 w-full" value={data.timezone} onChange={e => onChange('timezone', e.target.value)} />
        </div>
      </div>
      <div className="flex items-center gap-4 mt-2">
        <div className="bg-gray-200 rounded w-[150px] h-[50px] flex items-center justify-center text-gray-400 text-lg">150 × 50</div>
        <button className="bg-gray-100 px-4 py-2 rounded border" onClick={() => fileInput.current.click()}>Change Logo</button>
        <input type="file" ref={fileInput} className="hidden" accept="image/*" onChange={onLogoChange} />
      </div>
    </div>
  );
};
export default GeneralSettings;
