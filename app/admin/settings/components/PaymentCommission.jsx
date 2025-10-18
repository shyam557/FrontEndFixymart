import React from "react";

const PaymentCommission = ({ data, onChange, onToggle }) => (
  <div className="bg-white rounded-xl p-6 mb-6 shadow">
    <div className="flex items-center mb-4">
      <span className="bg-green-100 text-green-600 rounded-full p-2 mr-2"><i className="fa fa-money-bill" /></span>
      <h2 className="font-bold text-lg">Payment & Commission</h2>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
      <div>
        <label className="block text-sm font-medium mb-1">Commission Rate (%)</label>
        <input className="border rounded px-3 py-2 w-full" value={data.commission} onChange={e => onChange('commission', e.target.value)} />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Payment Gateway</label>
        <input className="border rounded px-3 py-2 w-full" value={data.gateway} onChange={e => onChange('gateway', e.target.value)} />
      </div>
    </div>
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1">Payment Instructions</label>
      <textarea className="border rounded px-3 py-2 w-full" value={data.instructions} onChange={e => onChange('instructions', e.target.value)} />
    </div>
    <div>
      <label className="block text-sm font-medium mb-1">Enable Payment Methods</label>
      <div className="flex flex-col gap-2 mt-2">
        {data.methods.map((m, i) => (
          <div key={i} className="flex items-center gap-2">
            <span>{m.label}</span>
            <input type="checkbox" checked={m.enabled} onChange={() => onToggle(i)} className="toggle toggle-primary" />
          </div>
        ))}
      </div>
    </div>
  </div>
);
export default PaymentCommission;
