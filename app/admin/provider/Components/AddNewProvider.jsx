"use client"

import React, { useState, useEffect } from "react"

const MAIN_CATEGORIES = {
  Electrician: ["Wiring", "Home Appliances", "Switches"],
  Plumber: ["Leak Repair", "Drain Cleaning", "Faucet"],
  "AC Service": ["Installation", "Repair", "Maintenance"],
}

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

export default function AddNewProvider({ isOpen, onClose, onAdd }) {
  const [form, setForm] = useState({
    fullName: "",
    mobile: "",
    email: "",
    dob: "",
    mainCategory: "",
    experience: "0",
    skillDescription: "",
    serviceAreas: [],
    documents: {},
    profilePhoto: null,
    accountHolder: "",
    bankName: "",
    ifsc: "",
    accountNumber: "",
    upi: "",
    loginMethod: "password",
    password: "",
    status: "Active",
  })

  const [preview, setPreview] = useState(null)
  const [activeTab, setActiveTab] = useState("basic")

  useEffect(() => {
    // Optional: load draft from localStorage when modal opens
    if (isOpen) {
      const raw = localStorage.getItem("providerDraft")
      if (raw) {
        try {
          const parsed = JSON.parse(raw)
          // only populate simple fields (files cannot be restored fully)
          setForm((s) => ({ ...s, ...parsed }))
        } catch (e) {
          console.warn("Could not parse draft", e)
        }
      }
    }
  }, [isOpen])

  if (!isOpen) return null

  function setField(name, value) {
    setForm((s) => ({ ...s, [name]: value }))
  }

  function handleFileUpload(name, e) {
    const f = e.target.files && e.target.files[0]
    if (!f) return
    if (name === "profilePhoto") {
      setField("profilePhoto", f)
      setPreview(URL.createObjectURL(f))
      return
    }
    setForm((s) => ({ ...s, documents: { ...s.documents, [name]: f } }))
  }

  function toggleArea(area) {
    setForm((s) => ({ ...s, serviceAreas: s.serviceAreas.includes(area) ? s.serviceAreas.filter((a) => a !== area) : [...s.serviceAreas, area] }))
  }



  function saveDraft() {
    // Save lightweight draft (file names only)
    const draft = {
      ...form,
      profilePhoto: form.profilePhoto ? { name: form.profilePhoto.name, type: form.profilePhoto.type } : null,
      documents: Object.fromEntries(Object.entries(form.documents || {}).map(([k, v]) => [k, v ? { name: v.name, type: v.type } : null])),
    }
    localStorage.setItem("providerDraft", JSON.stringify(draft))
    console.log("Draft saved:", draft)
    alert("Draft saved locally")
  }

  function submitForm(e) {
    e.preventDefault()
    const fd = new FormData()
    fd.append("fullName", form.fullName)
    fd.append("mobile", form.mobile)
    fd.append("email", form.email)
    fd.append("dob", form.dob)
    fd.append("mainCategory", form.mainCategory)
    fd.append("experience", form.experience)
    fd.append("skillDescription", form.skillDescription)
    fd.append("serviceAreas", JSON.stringify(form.serviceAreas))
    fd.append("accountHolder", form.accountHolder)
    fd.append("bankName", form.bankName)
    fd.append("ifsc", form.ifsc)
    fd.append("accountNumber", form.accountNumber)
    fd.append("upi", form.upi)
    fd.append("loginMethod", form.loginMethod)
    if (form.loginMethod === "password") fd.append("password", form.password)
    fd.append("status", form.status)

    if (form.profilePhoto) fd.append("profilePhoto", form.profilePhoto)
    Object.entries(form.documents || {}).forEach(([k, f]) => {
      if (f) fd.append(k, f)
    })

    // Log entries for debugging
    console.log("Submitting FormData:")
    for (const p of fd.entries()) console.log(p[0], p[1])

    // Build a lightweight provider object to add to the UI list immediately
    const newProvider = {
      id: Date.now(),
      name: form.fullName || "Unnamed",
      role: form.mainCategory || form.skillDescription || "Provider",
      phone: form.mobile || "",
      email: form.email || "",
      category: form.mainCategory || "General",
      city: (form.serviceAreas && form.serviceAreas[0]) || "",
      kyc: "Pending",
      status: form.status || "Active",
      rating: 0,
      avatar: preview || (form.profilePhoto ? preview : "/uploads/1763918247764-948796361.avif"),
    }

    try {
      if (typeof onAdd === "function") onAdd(newProvider)
    } catch (err) {
      console.warn("onAdd handler failed", err)
    }

    alert("Submitted (see console)")
    onClose()
  }



  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="relative w-full max-w-5xl bg-white rounded-xl shadow-2xl overflow-hidden max-h-[90vh] mx-4 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-blue-600 to-blue-700 text-white sticky top-0 z-10">
          <h2 className="text-lg font-semibold">Add New Provider</h2>
          <button onClick={onClose} className="text-white text-2xl hover:bg-blue-700 w-8 h-8 flex items-center justify-center rounded">✕</button>
        </div>

        {/* Main Content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left Sidebar */}
          <div className="w-80 bg-gray-50 border-r p-6 overflow-y-auto">
            <div className="flex flex-col items-center mb-6">
              <div className="w-20 h-20 bg-blue-200 rounded-full flex items-center justify-center mb-3 overflow-hidden border-2 border-blue-300">
                {preview ? <img src={preview} alt="preview" className="w-full h-full object-cover" /> : <span className="text-2xl text-blue-600">👤</span>}
              </div>
              <input type="text" value={form.fullName} placeholder="Full Name" disabled className="text-center font-semibold text-gray-800 w-full mb-1 bg-transparent border-b border-gray-300" />
              <input type="text" value={`@${form.fullName.toLowerCase().replace(/\s/g, '')}`} placeholder="@username" disabled className="text-center text-sm text-gray-500 w-full bg-transparent border-none" />
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs text-gray-600 uppercase font-semibold">Profile Photo</label>
                <input type="file" accept="image/*" onChange={(e) => handleFileUpload("profilePhoto", e)} className="block w-full border rounded px-2 py-1 text-sm mt-1" />
                <div className="text-xs text-gray-400 mt-1">JPG/PNG (Max 5MB)</div>
              </div>

              <div>
                <label className="text-xs text-gray-600 uppercase font-semibold">Email</label>
                <input name="email" value={form.email} onChange={(e) => setField("email", e.target.value)} placeholder="email@example.com" className="block w-full border rounded px-2 py-1 text-sm mt-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              </div>

              <div>
                <label className="text-xs text-gray-600 uppercase font-semibold">Phone</label>
                <input name="mobile" value={form.mobile} onChange={(e) => setField("mobile", e.target.value)} placeholder="+92 XXXXXXXXXX" className="block w-full border rounded px-2 py-1 text-sm mt-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              </div>

              <div>
                <label className="text-xs text-gray-600 uppercase font-semibold">Status</label>
                <select name="status" value={form.status} onChange={(e) => setField('status', e.target.value)} className="block w-full border rounded px-2 py-1 text-sm mt-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>Active</option>
                  <option>Inactive</option>
                  <option>Blocked</option>
                </select>
              </div>
            </div>
          </div>

          {/* Right Content Area */}
          <div className="flex-1 overflow-hidden flex flex-col">
            {/* Tabs */}
            <div className="border-b bg-white flex gap-0 overflow-x-auto sticky top-0">
              <button onClick={() => setActiveTab("basic")} className={`px-6 py-3 font-medium text-sm whitespace-nowrap border-b-2 transition ${activeTab === "basic" ? "border-blue-600 text-blue-600" : "border-transparent text-gray-600 hover:text-gray-800"}`}>
                Basic Details
              </button>
              <button onClick={() => setActiveTab("service")} className={`px-6 py-3 font-medium text-sm whitespace-nowrap border-b-2 transition ${activeTab === "service" ? "border-blue-600 text-blue-600" : "border-transparent text-gray-600 hover:text-gray-800"}`}>
                Service Details
              </button>
              <button onClick={() => setActiveTab("documents")} className={`px-6 py-3 font-medium text-sm whitespace-nowrap border-b-2 transition ${activeTab === "documents" ? "border-blue-600 text-blue-600" : "border-transparent text-gray-600 hover:text-gray-800"}`}>
                Documents Upload
              </button>
              <button onClick={() => setActiveTab("bank")} className={`px-6 py-3 font-medium text-sm whitespace-nowrap border-b-2 transition ${activeTab === "bank" ? "border-blue-600 text-blue-600" : "border-transparent text-gray-600 hover:text-gray-800"}`}>
                Bank Details
              </button>
              <button onClick={() => setActiveTab("login")} className={`px-6 py-3 font-medium text-sm whitespace-nowrap border-b-2 transition ${activeTab === "login" ? "border-blue-600 text-blue-600" : "border-transparent text-gray-600 hover:text-gray-800"}`}>
                Login Access
              </button>
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-y-auto">
              <form onSubmit={submitForm} className="p-6 space-y-6">
                {/* Basic Details Tab */}
                {activeTab === "basic" && (
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-4 text-lg">Basic Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Full Name *</label>
                        <input name="fullName" value={form.fullName} onChange={(e) => setField("fullName", e.target.value)} placeholder="Full Name" className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent" required />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Mobile Number *</label>
                        <input name="mobile" value={form.mobile} onChange={(e) => setField("mobile", e.target.value)} placeholder="Mobile Number" className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent" required />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Email Address *</label>
                        <input name="email" value={form.email} onChange={(e) => setField("email", e.target.value)} placeholder="Email Address" className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent" required />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Date of Birth (Optional)</label>
                        <input type="date" name="dob" value={form.dob} onChange={(e) => setField("dob", e.target.value)} className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Profile Photo (Upload)</label>
                        <input type="file" accept="image/*" onChange={(e) => handleFileUpload('profilePhoto', e)} className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                        {preview && (
                          <div className="mt-2 flex justify-center">
                            <div className="h-20 w-20 rounded-full overflow-hidden border bg-white">
                              <img src={preview} alt="preview" className="w-full h-full object-cover" />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Service Details Tab */}
                {activeTab === "service" && (
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-4 text-lg">Service Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Main Category</label>
                        <select name="mainCategory" value={form.mainCategory} onChange={(e) => setField("mainCategory", e.target.value)} className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                          <option value="">Choose Main Category</option>
                          {Object.keys(MAIN_CATEGORIES).map((c) => (<option key={c} value={c}>{c}</option>))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Years of Experience</label>
                        <select name="experience" value={form.experience} onChange={(e) => setField("experience", e.target.value)} className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                          {Array.from({ length: 22 }).map((_, i) => (<option key={i} value={i}>{i === 21 ? "20+" : i}</option>))}
                        </select>
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm text-gray-600 mb-1">Skill Description</label>
                        <textarea name="skillDescription" value={form.skillDescription} onChange={(e) => setField("skillDescription", e.target.value)} placeholder="Describe your skills and expertise..." rows={3} className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm text-gray-600 mb-2">Service Areas</label>
                        <div className="flex flex-wrap gap-2">
                          {["Aligarh","Lucknow","Kanpur","Delhi","Noida"].map((a) => (
                            <button key={a} type="button" onClick={() => toggleArea(a)} className={`px-4 py-2 border-2 rounded-full text-sm font-medium transition ${form.serviceAreas.includes(a) ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400'}`}>
                              {a}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Documents Tab */}
                {activeTab === "documents" && (
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-4 text-lg">Documents Upload (KYC)</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Aadhaar (Front/Back) *</label>
                        <input type="file" accept="image/*,application/pdf" onChange={(e) => handleFileUpload('aadhaar', e)} className="block w-full border rounded px-2 py-2 text-sm" required />
                        <div className="text-xs text-gray-400 mt-1">JPG/PNG/PDF</div>
                      </div>

                      <div>
                        <label className="block text-sm text-gray-600 mb-1">PAN *</label>
                        <input type="file" accept="image/*,application/pdf" onChange={(e) => handleFileUpload('pan', e)} className="block w-full border rounded px-2 py-2 text-sm" required />
                      </div>

                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Police Verification (PDF) *</label>
                        <input type="file" accept="application/pdf" onChange={(e) => handleFileUpload('police', e)} className="block w-full border rounded px-2 py-2 text-sm" required />
                      </div>

                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Bank Passbook / Cancelled Cheque *</label>
                        <input type="file" accept="image/*,application/pdf" onChange={(e) => handleFileUpload('bankDoc', e)} className="block w-full border rounded px-2 py-2 text-sm" required />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm text-gray-600 mb-1">Certificates (optional)</label>
                        <input type="file" accept="image/*,application/pdf" onChange={(e) => handleFileUpload('certificates', e)} className="block w-full border rounded px-2 py-2 text-sm" />
                      </div>
                    </div>
                  </div>
                )}

                {/* Bank Details Tab */}
                {activeTab === "bank" && (
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-4 text-lg">Bank Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Account Holder Name *</label>
                        <input name="accountHolder" placeholder="Account Holder Name" value={form.accountHolder} onChange={(e) => setField('accountHolder', e.target.value)} className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent" required />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Bank Name *</label>
                        <input name="bankName" placeholder="Bank Name" value={form.bankName} onChange={(e) => setField('bankName', e.target.value)} className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent" required />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">IFSC Code *</label>
                        <input name="ifsc" placeholder="IFSC Code" value={form.ifsc} onChange={(e) => setField('ifsc', e.target.value)} className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent" required />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Account Number *</label>
                        <input name="accountNumber" placeholder="Account Number" value={form.accountNumber} onChange={(e) => setField('accountNumber', e.target.value)} className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent" required />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm text-gray-600 mb-1">UPI ID (Optional)</label>
                        <input name="upi" placeholder="UPI ID (Optional)" value={form.upi} onChange={(e) => setField('upi', e.target.value)} className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                      </div>
                    </div>
                  </div>
                )}

                {/* Login Access Tab */}
                {activeTab === "login" && (
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-4 text-lg">Login Access</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm text-gray-600 mb-3">Login Method</label>
                        <div className="flex items-center gap-6">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input type="radio" name="loginMethod" value="password" checked={form.loginMethod === 'password'} onChange={(e) => setField('loginMethod', e.target.value)} className="w-4 h-4 cursor-pointer" />
                            <span className="text-sm text-gray-700">Create Password</span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input type="radio" name="loginMethod" value="otp" checked={form.loginMethod === 'otp'} onChange={(e) => setField('loginMethod', e.target.value)} className="w-4 h-4 cursor-pointer" />
                            <span className="text-sm text-gray-700">Send OTP Login</span>
                          </label>
                        </div>
                      </div>

                      {form.loginMethod === 'password' && (
                        <div>
                          <label className="block text-sm text-gray-600 mb-1">Create Password *</label>
                          <input name="password" type="password" placeholder="Enter password" value={form.password} onChange={(e) => setField('password', e.target.value)} className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent" required />
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="border-t bg-gray-50 p-4 flex items-center justify-end gap-3 sticky bottom-0">
          <button type="button" onClick={saveDraft} className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-medium transition">Save as Draft</button>
          <button type="submit" onClick={submitForm} className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition">Submit</button>
        </div>
      </div>
    </div>
  )
}