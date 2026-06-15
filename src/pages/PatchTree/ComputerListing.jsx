import React, { useState, useEffect } from 'react'
import { useParams, useLocation, useNavigate, useSearchParams   } from "react-router-dom";

import { ChevronLeft, ChevronRight, RefreshCw, Download, Search } from "lucide-react";

import {  getGroupDataList } from "../../api/projectApi";


const ComputerListing = () => {
    const navigate = useNavigate();
    // const { groupId } = useParams();

    const location = useLocation();
const [searchParams] = useSearchParams()
    // const queryParams = new URLSearchParams(location.search);
   const { groupName } = useParams();
    const { serverName, groupId } = location.state || {};

console.log("Group Name:", groupName);
console.log("Server Name:", serverName);
console.log("Group ID:", groupId);

    // const computerListData = [
    //     { srNo: 1, name: "sumeetnalawade18052003", ipAddress: "192.168.0.2", model: "H310M M.2 2.0", make: "Gigabyte Technology Co., Ltd.", id: "e9ee642e-bf09-4feb-a22e-44639bf63a09", architecture: "AMD64", clientVersion: "1450.2510.14022.1", osDescription: "Windows 10 Pro", lastSyncTime: "1/9/2026 2:21:47 AM", lastReportedStatusTime: "1/9/2026 2:29:52 AM", lastSyncResult: "Succeeded", syncFromDownStream: "Windows" },
    //     { srNo: 2, name: "shamika-zagade", ipAddress: "192.168.0.15", model: "H410M S2 V2", make: "Gigabyte Technology Co., Ltd.", id: "0ae0158e-8a47-4f03-9f47-8dc5d62287ea", architecture: "AMD64", clientVersion: "1450.2510.14022.1", osDescription: "Windows 10 Pro", lastSyncTime: "3/5/2026 5:34:31 AM", lastReportedStatusTime: "3/5/2026 5:34:32 AM", lastSyncResult: "Succeeded", syncFromDownStream: "Windows" },
    //     { srNo: 3, name: "desktop-db0nlc1", ipAddress: "192.168.0.92", model: "H310", make: "INTEL", id: "dbc52ec4-0864-42e2-91c1-645a54d83af2", architecture: "AMD64", clientVersion: "1308.2408.15032.0", osDescription: "Windows 10 Pro", lastSyncTime: "2/23/2026 4:25:16 AM", lastReportedStatusTime: "2/23/2026 4:33:21 AM", lastSyncResult: "Succeeded", syncFromDownStream: "Windows" },
    //     { srNo: 4, name: "Sumit-Shedge", ipAddress: "192.168.0.53", model: "H310M M.2 2.0", make: "Gigabyte Technology Co., Ltd.", id: "9517f707-3be6-481d-b6d4-ddd10180ae31", architecture: "AMD64", clientVersion: "1450.2508.27012.0", osDescription: "Windows 10 Pro", lastSyncTime: "1/9/2026 7:51:08 AM", lastReportedStatusTime: "1/8/2026 7:24:56 PM", lastSyncResult: "Succeeded", syncFromDownStream: "Windows" },
    //     { srNo: 5, name: "desktop-k1gg83m", ipAddress: "192.168.0.164", model: "H310", make: "INTEL", id: "9e5e0574-a7e5-4133-9f34-bf9c94456734", architecture: "AMD64", clientVersion: "10.0.17134.191", osDescription: "Windows 10 Pro", lastSyncTime: "3/5/2026 7:14:04 AM", lastReportedStatusTime: "3/5/2026 7:22:13 AM", lastSyncResult: "Succeeded", syncFromDownStream: "Windows" },
    //     { srNo: 6, name: "desktop-k1gg83m", ipAddress: "192.168.0.164", model: "H310", make: "INTEL", id: "9e5e0574-a7e5-4133-9f34-bf9c94456734", architecture: "AMD64", clientVersion: "10.0.17134.191", osDescription: "Windows 10 Pro", lastSyncTime: "3/5/2026 7:14:04 AM", lastReportedStatusTime: "3/5/2026 7:22:13 AM", lastSyncResult: "Succeeded", syncFromDownStream: "Windows" }
    // ];

   const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);
    const [computerListData, setComputerListData] = useState([]);

    useEffect(() => {
    const fetchData = async () => {
        try {
            setLoading(true);

           const payload = {
    group: groupName,
    serverName: serverName,
};

            const res = await getGroupDataList(payload);
            console.log(groupName," Data:  ",res)

            // adjust based on backend response structure
            setComputerListData(res.data?.data || res.data || []);

        } catch (error) {
            console.error("Error fetching group data:", error);
            setComputerListData([]);
        } finally {
            setLoading(false);
        }
    };

    if (groupName && serverName) {
        fetchData();
    }
}, [groupName, serverName]);

    


    const PAGE_SIZE = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const filteredData = computerListData.filter(
        (item) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.ipAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.osDescription.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalRecords = filteredData.length;
    const totalPages = Math.ceil(totalRecords / PAGE_SIZE);

    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;

    const currentData = filteredData.slice(startIndex, endIndex);

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handlePrev = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const labelClass = "text-[15px] text-[#d1d5db] mb-1 block";
    const inputClass = "w-full h-[34px] px-2 text-[12px] bg-[#1E293B] text-white rounded-md border border-[#2A3A55] focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500";
    const btnClass = "px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.03] active:scale-[0.97] focus:outline-none focus:ring-2 focus:ring-blue-400/60";
    const resetClass = "px-6 py-2 bg-gradient-to-r from-gray-800 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white rounded-lg transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.03] active:scale-[0.97] focus:outline-none focus:ring-2 focus:ring-blue-400/60";

    return (
        <div className="min-h-screen bg-[#0B1220] rounded-2xl p-6">
            {/* <h2 className="text-lg font-semibold mb-4">
                    Synchronization History
                </h2> */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-5">
                <div>
                    <h1 className="text-xl font-bold"> {groupName} </h1>
                </div>



            </div>

            <div className="m-4 border-b border-white/10" />

            {/* Top Right Info */}
            <div className="flex justify-between items-center mb-3 gap-4">
                <div className="relative w-full max-w-sm">
                    <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                    <input
                        type="text"
                        placeholder="Search computer name, IP, OS..."
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="w-[800px] h-10 pl-10 pr-4 bg-[#1E293B] border border-white/10 rounded-lg text-sm text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500"
                    />


                </div>

                <div className="text-sm text-gray-400 whitespace-nowrap mr-5">
                    Showing {Math.min(endIndex, totalRecords)} of {totalRecords}
                </div>
            </div>

            <div className="overflow-x-auto">
                <div className="rounded-xl border border-white/10 overflow-hidden">
                    <table className="w-full text-sm">
                        <thead className="text-gray-300 bg-[#1E293B]">
                            <tr>
                                {/* <th className="p-3 text-left">Sr No</th> */}
                                <th className="p-3 text-left">Computer Name</th>
                                <th className="p-3 text-left">IP Address</th>
                                <th className="p-3 text-left">Model</th>
                                <th className="p-3 text-left">Manufacturer</th>
                                <th className="p-3 text-left">Architecture</th>
                                <th className="p-3 text-left">OS</th>
                                <th className="p-3 text-left">Client Version</th>
                                <th className="p-3 text-left">Last Sync Time</th>
                                <th className="p-3 text-left">Last Reported</th>
                                <th className="p-3 text-left">Sync Result</th>
                            </tr>
                        </thead>

                        <tbody>

                            {loading ? (
        <tr>
            <td colSpan="10" className="text-center py-6">
    <div className="flex justify-center items-center gap-2 text-gray-400">
        <RefreshCw className="animate-spin" size={16} />
        Loading data...
    </div>
</td>
        </tr>
    ) : currentData.length === 0 ? (
        <tr>
            <td colSpan="10" className="text-center py-6 text-gray-400">
                No data available
            </td>
        </tr>
    ) : (currentData.map((item, index) => (
                                <tr
                                    key={index}
                                    className="border-b border-white/10 last:border-b-0 hover:bg-[#172033] transition"
                                >
                                    {/* <td className="p-3">{item.srNo}</td> */}
                                    <td  onClick={() => navigate(`/patchTree/computer-details/${encodeURIComponent(item.name)}`, { state: {  groupId,  groupName, serverName}, }) } 
                                        className="p-3 font-medium hover:text-cyan-400 hover:underline ">{item.name}</td>
                                    <td className="p-3">{item.ipAddress}</td>
                                    <td className="p-3">{item.model}</td>
                                    <td className="p-3">{item.make}</td>
                                    <td className="p-3">{item.architecture}</td>
                                    <td className="p-3">{item.osDescription}</td>
                                    <td className="p-3">{item.clientVersion}</td>
                                    <td className="p-3 whitespace-nowrap">{item.lastSyncTime}</td>
                                    <td className="p-3 whitespace-nowrap"> {item.lastReportedTime} </td>
                                    <td className="p-3">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${item.lastsyncResult === "Succeeded"
                                                    ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400" }`} >
                                            {item.lastsyncResult}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Bottom Pagination */}
            <div className="flex justify-between items-center mt-3 text-sm text-gray-400">
                <div> Page {currentPage} / {totalPages} </div>

                <div className="flex gap-3 items-center">
                    {/* Prev */}
                    <button onClick={handlePrev} disabled={currentPage === 1}
                        className="w-9 h-9 flex items-center justify-center rounded-lg bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 disabled:opacity-30 disabled:cursor-not-allowed"   >
                        <ChevronLeft size={18} />
                    </button>

                    {/* Next */}
                    <button onClick={handleNext} disabled={currentPage === totalPages}
                        className="w-9 h-9 flex items-center justify-center rounded-lg bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 disabled:opacity-30 disabled:cursor-not-allowed"    >
                        <ChevronRight size={18} />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ComputerListing
