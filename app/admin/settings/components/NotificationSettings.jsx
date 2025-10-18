import React from "react";

const NotificationSettings = ({ data, onToggle }) => (
  <div className="bg-white rounded-xl p-6 mb-6 shadow">
    <div className="flex items-center mb-4">
      <span className="bg-yellow-100 text-yellow-600 rounded-full p-2 mr-2"><i className="fa fa-bell" /></span>
      <h2 className="font-bold text-lg">Notification Settings</h2>
    </div>
    <div className="mb-2 font-semibold">Email Notifications</div>
    {data.email.map((n, i) => (
      <div key={i} className="flex items-center justify-between mb-1">
        <span>{n.label}</span>
        <input type="checkbox" checked={n.enabled} onChange={() => onToggle('email', i)} className="toggle toggle-primary" />
      </div>
    ))}
    <div className="mb-2 mt-4 font-semibold">SMS Notifications</div>
    {data.sms.map((n, i) => (
      <div key={i} className="flex items-center justify-between mb-1">
        <span>{n.label}</span>
        <input type="checkbox" checked={n.enabled} onChange={() => onToggle('sms', i)} className="toggle toggle-primary" />
      </div>
    ))}
    <div className="mb-2 mt-4 font-semibold">Push Notifications</div>
    {data.push.map((n, i) => (
      <div key={i} className="flex items-center justify-between mb-1">
        <span>{n.label}</span>
        <input type="checkbox" checked={n.enabled} onChange={() => onToggle('push', i)} className="toggle toggle-primary" />
      </div>
    ))}
  </div>
);
export default NotificationSettings;
