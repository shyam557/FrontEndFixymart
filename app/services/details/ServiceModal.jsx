"use client";

import Image from "next/image";

export default function ServiceModal({ service, onClose, onAdd, onDone, groupedServices = {}, DetailComponent }) {
  if (!service) return null;

  // Provide sane defaults so every page shows the same rich detail UI
  // (this mirrors the defaults used on the AC page).
  const svc = {
    ...service,
    process: service.process || [
      "Inspection of the area",
      "Diagnosis and quotation",
      "Service execution by expert",
      "Final check and handover",
    ],
    faqs: service.faqs || [
      { question: "How long will the service take?", answer: `${service.duration || 'Varies depending on issue'}` },
      { question: "Do I need to be present?", answer: "Yes, or someone authorized should be available." },
    ],
    ratings: service.ratings || 4.7,
    reviews: service.reviews || [
      { user: "Amit K.", rating: 5, comment: "Quick and professional." },
      { user: "Sneha R.", rating: 4, comment: "Good value for money." },
    ],
  };

  const Content = DetailComponent;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 md:p-8">
      <div className="fixed inset-0 bg-black/40" onClick={onClose} aria-hidden="true" />
      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-4xl mx-auto overflow-auto max-h-[90vh] z-10">
        {Content ? (
          <Content service={svc} onClose={onClose} onAdd={onAdd} onDone={onDone} groupedServices={groupedServices} />
        ) : (
          <div className="p-6">
            <div className="flex justify-between items-start p-2 border-b mb-4">
              <div>
                <h3 className="text-2xl font-bold">{svc.title}</h3>
                <div className="text-sm text-gray-600">{svc.category}</div>
              </div>
              <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-1 w-full h-48 bg-gray-100 rounded overflow-hidden">
                {svc.imgSrc ? (
                  <Image src={svc.imgSrc} alt={svc.alt || svc.title} width={600} height={400} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">No image</div>
                )}
              </div>
              <div className="md:col-span-2">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="text-2xl font-semibold">₹{svc.price}</div>
                    <div className="text-sm text-gray-600">Duration: {svc.duration}</div>
                    {svc.offer && <div className="text-sm text-green-600 mt-1">{svc.offer}</div>}
                  </div>
                  <div className="space-x-2">
                    <button onClick={() => onAdd && onAdd(svc)} className="bg-blue-600 text-white px-4 py-2 rounded">Add</button>
                    <button onClick={() => onDone && onDone(svc)} className="bg-green-600 text-white px-4 py-2 rounded">Done</button>
                  </div>
                </div>
                <p className="text-gray-700">{svc.description}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
