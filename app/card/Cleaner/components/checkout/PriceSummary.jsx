

import React from "react";


const paymentSections = [
  {
    header: "Cards",
    options: [
      {
        key: "card",
        label: "Add new card",
        icon: <img src="/icons/card.svg" alt="card" className="w-6 h-6" />,
        disabled: false,
      },
    ],
  },
  {
    header: "UPI",
    options: [
      {
        key: "upi",
        label: "Add a new UPI ID",
        icon: <img src="/icons/upi.svg" alt="upi" className="w-6 h-6" />,
        disabled: false,
      },
    ],
  },
  {
    header: "Netbanking",
    options: [
      {
        key: "netbanking",
        label: "Netbanking",
        icon: <img src="/icons/netbanking.svg" alt="netbanking" className="w-6 h-6" />,
        disabled: false,
      },
    ],
  },
  {
    header: "Pay after service",
    options: [
      {
        key: "pay-after",
        label: "Pay after service",
        icon: <img src="/icons/payafter.svg" alt="pay after" className="w-6 h-6" />,
        disabled: false,
        subOptions: [
          { key: "pay-online-after", label: "Pay online after service", icon: <img src="/icons/online.svg" alt="online" className="w-5 h-5" /> },
          { key: "pay-cash-after", label: "Pay with cash after service", icon: <img src="/icons/cash.svg" alt="cash" className="w-5 h-5" /> },
        ],
      },
    ],
  },
];

export default function PriceSummary({ onClose, total = 348 }) {
  // Provide a default no-op if onClose is not passed
  const handleClose = onClose || (() => {});
  const [success, setSuccess] = React.useState(false);
  const [selectedMethod, setSelectedMethod] = React.useState(null);
  const [selectedSubOption, setSelectedSubOption] = React.useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => {
      handleClose();
      setSuccess(false);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-0 overflow-hidden">
        <div className="border-b px-6 py-4 flex items-center justify-between">
          <div className="font-bold text-lg flex-1">Select payment method</div>
          <button className="text-3xl text-gray-500 hover:text-gray-700 ml-2" onClick={handleClose} aria-label="Close">&times;</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="px-0 pt-2 pb-4">
            <div className="px-6 text-sm text-gray-500 mb-2">Amount to pay: <span className="font-bold text-gray-900">₹{total.toLocaleString()}</span></div>
            <div className="flex flex-col">
              {paymentSections.map((section, idx) => (
                <div key={section.header} className="">
                  <div className="px-6 py-2 text-xs font-semibold text-gray-500 tracking-wide bg-gray-50 border-t border-b border-gray-200">{section.header}</div>
                  {section.options.map(opt => (
                    <div key={opt.key} className={`flex flex-col ${opt.disabled ? 'bg-gray-100 opacity-60' : ''}`}> 
                      <label className="flex items-center gap-3 px-6 py-4 w-full text-left border-b border-gray-100 cursor-pointer">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value={opt.key}
                          disabled={opt.disabled}
                          checked={selectedMethod === opt.key}
                          onChange={() => {
                            setSelectedMethod(opt.key);
                            setSelectedSubOption(null);
                          }}
                          className="accent-purple-600 w-4 h-4 mr-3 mt-0.5"
                        />
                        <span className="text-2xl flex-shrink-0">{opt.icon}</span>
                        <div className="flex flex-col flex-1 min-w-0">
                          <span className="font-semibold text-base text-gray-900 whitespace-normal break-words">{opt.label}</span>
                        </div>
                        {!opt.disabled && (
                          <span className="text-gray-400 text-xl ml-2">&#8250;</span>
                        )}
                      </label>
                      {/* Sub-options for pay-after-service */}
                      {opt.key === "pay-after" && selectedMethod === "pay-after" && (
                        <div className="pl-16 pb-2 flex flex-col gap-2">
                          {opt.subOptions.map(sub => (
                            <label key={sub.key} className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="radio"
                                name="payAfterSubOption"
                                value={sub.key}
                                checked={selectedSubOption === sub.key}
                                onChange={() => setSelectedSubOption(sub.key)}
                                className="accent-purple-600 w-4 h-4 mr-2"
                              />
                              <span>{sub.icon}</span>
                              <span className="text-gray-700 text-sm font-medium">{sub.label}</span>
                            </label>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div className="px-6 mt-4">
              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-3 rounded-lg font-bold text-base hover:bg-purple-700 transition"
                disabled={
                  !selectedMethod || success ||
                  (selectedMethod === "pay-after" && !selectedSubOption)
                }
              >
                {success ? "Payment Successful!" : "Submit Payment"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
