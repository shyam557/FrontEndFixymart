"use client";
import React, { useState ,useEffect } from "react";
import { Search, Calendar, Eye, SquarePen } from "lucide-react";
// import { usersData } from "./data/usersData";



import { fetchAllUsers } from "../../../src/lib/api/adminApi";




export default function UsersPage() {
	const [search, setSearch] = useState("");



 const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchuserData = async () => {
      try {
        // const response = await fetch("http://localhost:5000/api/sidebar");
        // if (!response.ok) throw new Error("Failed to fetch userData");

        const data = await fetchAllUsers();


        console.log("Fetched data:", data);

        setUserData(data);
        setLoading(false);
      } catch (err) {
        console.error("Error:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchuserData();
  }, []);

  if (loading) return <p className="text-gray-400 italic">Loading userData...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;







	return (
		<div className="min-h-screen bg-[#f8fafc] p-6">
			<div className="bg-white rounded-xl shadow p-6">
				<div className="flex flex-wrap gap-3 mb-4 items-center justify-between">
					<div className="flex gap-2 w-full md:w-auto">
						<div className="relative w-full max-w-xs">
							<input
								type="text"
								placeholder="Search by name"
								value={search}
								onChange={e => setSearch(e.target.value)}
								className="pl-10 pr-4 py-2 rounded border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-100 bg-gray-50 text-sm w-full"
							/>
							<Search className="absolute left-2 top-2.5 w-4 h-4 text-gray-400" />
						</div>
						<button className="flex items-center gap-1 px-3 py-2 rounded border border-gray-200 bg-white text-gray-700 text-sm font-medium whitespace-nowrap">
							<Calendar className="w-4 h-4" /> Pick a date range
						</button>
					</div>
				</div>
				<div className="w-full overflow-x-auto rounded-xl">
					<table className="w-full min-w-[1200px] text-sm">
						<thead className="bg-[#f8fafc] text-gray-700 font-semibold">
							<tr>
								<th className="px-3 py-3 whitespace-nowrap text-center">Sr. No.</th>
								<th className="px-3 py-3 whitespace-nowrap text-center">User ID</th>
								<th className="px-3 py-3 whitespace-nowrap text-center">Username</th>
								<th className="px-3 py-3 whitespace-nowrap text-center">Name</th>
								<th className="px-3 py-3 whitespace-nowrap text-center">Phone</th>
								<th className="px-3 py-3 whitespace-nowrap text-center">Email</th>
								<th className="px-3 py-3 whitespace-nowrap text-center">Register Type</th>
								<th className="px-3 py-3 whitespace-nowrap text-center">Date</th>
								<th className="px-3 py-3 whitespace-nowrap text-center">Status</th>
								<th className="px-3 py-3 whitespace-nowrap text-center">Action</th>
							</tr>
						</thead>
						<tbody>
							{userData
								.filter(user =>
									search.trim() === "" ||
									(user.name && user.name.toLowerCase().includes(search.trim().toLowerCase()))
								)
								.map((user, idx) => (
									<tr key={user.userId} className="border-b last:border-b-0 align-middle">
										<td className="px-3 py-2 text-center align-middle">{idx + 1}</td>
										<td className="px-3 py-2 text-center align-middle">{user.id}</td>
										<td className="px-3 py-2 text-center align-middle">{user.username}</td>
										<td className="px-3 py-2 text-center align-middle">{user.name}</td>
										<td className="px-3 py-2 text-center align-middle">{user.phone}</td>
										<td className="px-3 py-2 text-center align-middle">{user.email}</td>
										<td className="px-3 py-2 text-center align-middle">{user.registerType}</td>
										<td className="px-3 py-2 text-center align-middle">{user.date}</td>
										<td className="px-3 py-2 text-center align-middle">
											<span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-600">{user.status}</span>
										</td>
										<td className="px-3 py-2 text-center align-middle">
											<div className="flex items-center justify-center gap-2">
												<button className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-50 hover:bg-blue-100">
													<Eye className="w-5 h-5 text-blue-500" />
												</button>
												<button className="flex items-center justify-center w-8 h-8 rounded-lg bg-green-50 hover:bg-green-100">
													<SquarePen className="w-5 h-5 text-green-500" />
												</button>
											</div>
										</td>
									</tr>
								))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}
