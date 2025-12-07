"use client"

import React from "react"
import { X, Phone, Mail, MapPin, Star, FileCheck, CreditCard } from "lucide-react"

export default function ProfileDetails({ isOpen, onClose, provider }) {
	if (!isOpen || !provider) return null

	return (
		<div className="fixed inset-0 bg-black/30 bg-opacity-50 z-50 flex items-center justify-center p-2">
			<div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[85vh] overflow-y-auto">
				{/* Header with background */}
				<div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-800 text-white flex items-center justify-between p-3 rounded-t-xl">
					<div>
						<h2 className="text-2xl font-bold">Provider Profile Details</h2>
						<p className="text-blue-100 text-xs">Complete provider information and verification status</p>
					</div>
					<button
						onClick={onClose}
						className="p-2 hover:bg-blue-700 rounded-lg transition"
					>
						<X className="w-5 h-5" />
					</button>
				</div>

				{/* Content */}
				<div className="p-8 space-y-8">
					{/* Profile Header Section */}
					<div className="flex flex-col sm:flex-row items-start gap-8 pb-8 border-b-2 border-gray-200">
						<div className="h-32 w-32 rounded-2xl overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300 flex-shrink-0 shadow-lg">
							<img
								src={provider.avatar}
								alt={provider.name}
								className="h-full w-full object-cover"
							/>
						</div>
						<div className="flex-1">
							<h3 className="text-2xl font-bold text-gray-900 mb-1">{provider.name}</h3>
							<p className="text-base text-blue-600 font-semibold mb-3">{provider.role}</p>
							
							<div className="space-y-2 mb-3">
								<div className="flex items-center gap-3 text-gray-700">
									<Phone className="w-4 h-4 text-blue-600" />
									<span className="text-sm">{provider.phone}</span>
								</div>
								<div className="flex items-center gap-3 text-gray-700">
									<Mail className="w-4 h-4 text-blue-600" />
									<span className="text-sm">{provider.email}</span>
								</div>
								<div className="flex items-center gap-3 text-gray-700">
									<MapPin className="w-4 h-4 text-blue-600" />
									<span className="text-sm">{provider.city}</span>
								</div>
							</div>

							<div className="flex flex-wrap gap-2 mt-4">
								<span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
									provider.kyc === "Verified"
										? "bg-green-100 text-green-800"
										: provider.kyc === "Pending"
										? "bg-amber-100 text-amber-800"
										: "bg-red-100 text-red-800"
								}`}>
									<FileCheck className="w-3 h-3" />
									KYC: {provider.kyc}
								</span>
								<span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
									provider.status === "Active"
										? "bg-blue-100 text-blue-800"
										: "bg-gray-100 text-gray-800"
								}`}>
									Status: {provider.status}
								</span>
								<span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-50 text-yellow-800 rounded-full text-xs font-semibold">
									<Star className="w-3 h-3 fill-yellow-500" />
									{provider.rating.toFixed(1)} / 5.0
								</span>
							</div>
						</div>
					</div>

					{/* Section 1: Basic Details */}
					<div>
						<h4 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
							<span className="bg-blue-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-xs">1</span>
							Basic Details
						</h4>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gradient-to-br from-blue-50 to-gray-50 p-5 rounded-xl border border-blue-100">
							<div>
								<p className="text-xs text-gray-600 font-semibold uppercase tracking-wide">Location</p>
								<p className="text-sm text-gray-900 font-semibold mt-1">{provider.city}</p>
							</div>
							<div>
								<p className="text-xs text-gray-600 font-semibold uppercase tracking-wide">Category</p>
								<p className="text-sm text-gray-900 font-semibold mt-1">{provider.category}</p>
							</div>
							<div>
								<p className="text-xs text-gray-600 font-semibold uppercase tracking-wide">Designation</p>
								<p className="text-sm text-gray-900 font-semibold mt-1">{provider.role}</p>
							</div>
							<div>
								<p className="text-xs text-gray-600 font-semibold uppercase tracking-wide">Rating</p>
								<div className="flex items-center gap-2 mt-1">
									<span className="text-sm text-gray-900 font-semibold">{provider.rating.toFixed(1)}</span>
									<div className="flex gap-0.5">
										{[...Array(5)].map((_, i) => (
											<Star key={i} className={`w-3 h-3 ${i < Math.floor(provider.rating) ? 'fill-yellow-500 text-yellow-500' : 'text-gray-300'}`} />
										))}
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Section 2: Service Details */}
					<div>
						<h4 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
							<span className="bg-blue-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-xs">2</span>
							Service Details
						</h4>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gradient-to-br from-indigo-50 to-gray-50 p-5 rounded-xl border border-indigo-100">
							<div>
								<p className="text-xs text-gray-600 font-semibold uppercase tracking-wide">Category</p>
								<p className="text-sm text-gray-900 font-semibold mt-1">{provider.category}</p>
							</div>
							<div>
								<p className="text-xs text-gray-600 font-semibold uppercase tracking-wide">Experience</p>
								<p className="text-sm text-gray-900 font-semibold mt-1">{provider.experience || "5+ Years"}</p>
							</div>
							<div className="md:col-span-2">
								<p className="text-xs text-gray-600 font-semibold uppercase tracking-wide">Skills</p>
								<p className="text-sm text-gray-900 font-semibold mt-1">{provider.skills || "Professional services"}</p>
							</div>
							<div>
								<p className="text-xs text-gray-600 font-semibold uppercase tracking-wide">Service Areas</p>
								<p className="text-sm text-gray-900 font-semibold mt-1">{provider.serviceAreas || "Multiple locations"}</p>
							</div>
						</div>
					</div>

					{/* Section 3: KYC Upload */}
					<div>
						<h4 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
							<span className="bg-blue-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-xs">3</span>
							KYC Upload
						</h4>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 bg-gradient-to-br from-green-50 to-gray-50 p-5 rounded-xl border border-green-100">
							{["Aadhaar", "PAN", "Police Verification", "Bank Passbook", "Certificates"].map((doc) => (
								<div key={doc} className="flex flex-col items-center justify-center p-3 bg-white rounded-lg border-2 border-green-200 hover:border-green-400 transition">
									<FileCheck className="w-5 h-5 text-green-600 mb-1" />
									<p className="text-xs text-gray-700 text-center font-semibold">{doc}</p>
									<p className="text-xs text-green-600 mt-0.5">✓ Verified</p>
								</div>
							))}
						</div>
					</div>

					{/* Section 4: Bank Information */}
					<div>
						<h4 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
							<span className="bg-blue-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-xs">4</span>
							Bank Information
						</h4>
						<div className="bg-gradient-to-br from-purple-50 to-gray-50 p-5 rounded-xl border border-purple-100">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
								<div className="bg-white p-3 rounded-lg border border-purple-200">
									<p className="text-xs text-gray-600 font-semibold uppercase tracking-wide">Account Holder</p>
									<p className="text-sm text-gray-900 font-semibold mt-1">{provider.accountHolder || provider.name}</p>
								</div>
								<div className="bg-white p-3 rounded-lg border border-purple-200">
									<p className="text-xs text-gray-600 font-semibold uppercase tracking-wide">Bank Name</p>
									<p className="text-sm text-gray-900 font-semibold mt-1">{provider.bankName || "Emirates NBD"}</p>
								</div>
								<div className="bg-white p-3 rounded-lg border border-purple-200">
									<p className="text-xs text-gray-600 font-semibold uppercase tracking-wide">Account Number</p>
									<p className="text-sm text-gray-900 font-semibold mt-1">{provider.accountNumber || "1234567890"}</p>
								</div>
								<div className="bg-white p-3 rounded-lg border border-purple-200">
									<p className="text-xs text-gray-600 font-semibold uppercase tracking-wide">IFSC Code</p>
									<p className="text-sm text-gray-900 font-semibold mt-1">{provider.ifscCode || "NBAD0000001"}</p>
								</div>
							</div>
							<div className="bg-white p-3 rounded-lg border border-purple-200">
								<p className="text-xs text-gray-600 font-semibold uppercase tracking-wide">UPI (Optional)</p>
								<p className="text-sm text-gray-900 font-semibold mt-1">{provider.upiId || "provider@upi"}</p>
							</div>
						</div>
					</div>

				{/* Action Buttons */}
				<div className="flex justify-end pt-4 border-t-2 border-gray-200">
					<button 
						onClick={() => {
							alert(`Profile for ${provider.name} saved successfully!`)
							onClose()
						}}
						className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg font-semibold hover:shadow-lg transition text-sm"
					>
						Save Profile
					</button>
				</div>
				</div>
			</div>
		</div>
	)
}