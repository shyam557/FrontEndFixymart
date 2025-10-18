import React from "react";

const MaintenanceMode = ({ enabled, onToggle }) => (
  <div className="bg-white rounded-xl p-6 mb-6 shadow flex items-center justify-between">
    <div>
      <div className="flex items-center mb-2">
        <span className="bg-red-100 text-red-600 rounded-full p-2 mr-2"><i className="fa fa-times-circle" /></span>
        <span className="font-bold text-lg">Maintenance Mode</span>
      </div>
      <div className="text-gray-500 text-sm">Enable maintenance mode to temporarily take down the platform for updates.<br />Users will see a maintenance page during this period.</div>
    </div>
    <input type="checkbox" checked={enabled} onChange={onToggle} className="toggle toggle-primary ml-4" />
  </div>
);
export default MaintenanceMode;
