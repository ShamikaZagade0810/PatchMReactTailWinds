import React, { useEffect, useMemo, useState } from 'react';
import {
    Monitor, Search, ChevronRight, AlertTriangle, CheckCircle2, Boxes, Clock3, ChevronLeft, Package, X, Download
} from "lucide-react";
import { getThirdPartyPatchRepo } from "../../api/projectApi";
const PatchRepositoryNew = () => {
   
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [patchRepositoryList, setPatchRepositoryList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedApp, setSelectedApp] = useState(null);

    // ✅ Filters
    const filteredData = useMemo(() => {
        return patchRepositoryList.filter((item) =>
            `${item.appName} ${item.hostName} ${item.ipAddress}`
                .toLowerCase()
                .includes(search.toLowerCase())
        );
    }, [search]);

    // ✅ Pagination logic
    const totalPages = Math.ceil(filteredData.length / rowsPerPage);

    const paginatedData = useMemo(() => {
        const start = (currentPage - 1) * rowsPerPage;
        return filteredData.slice(start, start + rowsPerPage);
    }, [filteredData, currentPage, rowsPerPage,patchRepositoryList]);


    const formatDateTime = (dateStr) => {
        const date = new Date(dateStr);

        const dd = String(date.getDate()).padStart(2, "0");
        const mm = String(date.getMonth() + 1).padStart(2, "0");
        const yyyy = date.getFullYear();

        const hh = String(date.getHours()).padStart(2, "0");
        const min = String(date.getMinutes()).padStart(2, "0");

        return `${dd}-${mm}-${yyyy} ${hh}:${min}`;
    };


    useEffect(() => {

        getData();


    }, []);

    const getData = async () => {

        setLoading(true);
        const Repodata = await getThirdPartyPatchRepo();
        console.log("Data --> ", Repodata.data.data);
        setPatchRepositoryList(Repodata.data.data);
        setLoading(false);

    }



    return (
        //   <div className="p-6 bg-[#050B18] min-h-screen text-white">
        <div className="p-6 text-white">

            {/* HEADER */}
            <div className="bg-[#0B1220] border border-[#1e293b] rounded-xl p-4 mb-4">
                <h1 className="text-lg font-semibold">📦 Package Catalog</h1>
                <p className="text-xs text-gray-400">
                    Manage application repository
                </p>
            </div>

            {/* SEARCH */}
            <div className="bg-[#0B1220] border border-[#1e293b] rounded-xl p-4 mb-4 flex flex-col md:flex-row gap-3 items-center">

                <div className="relative flex-1 w-full">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setCurrentPage(1);
                        }}
                        placeholder="Search applications..."
                        className="w-full bg-[#111827] border border-[#1e293b] rounded-lg pl-9 pr-3 py-2 text-xs focus:outline-none focus:border-cyan-500 transition" />
                </div>

                <select
                    value={rowsPerPage}
                    onChange={(e) => {
                        setRowsPerPage(Number(e.target.value));
                        setCurrentPage(1);
                    }}
                    className="bg-[#111827] border border-[#1e293b] rounded-lg px-3 py-2 text-xs"
                >
                    <option value={5}>5 / page</option>
                    <option value={10}>10 / page</option>
                    <option value={20}>20 / page</option>
                </select>
                <div className="text-xs text-gray-400 whitespace-nowrap">
                    Showing {paginatedData.length} out of {filteredData.length}
                </div>

            </div>

            {/* MAIN LAYOUT */}
            <div className="flex gap-4">

                {/* TABLE CARD */}
                <div className="flex-[2]  bg-[#0B1220] border border-[#1e293b] rounded-xl overflow-hidden">

                    <div className="p-4 bg-[#050B18] ">

                        {/* TABLE CARD ONLY */}
                        <div className="bg-[#050B18] border border-[#1e293b] rounded-xl overflow-hidden">

                            <table className="w-full text-xs">
                                <thead className="bg-[#1e293b] text-gray-300">
                                    <tr>
                                        <th className="px-4 py-3 text-left">Application</th>
                                        <th className="px-4 py-3 text-left">Latest</th>
                                        <th className="px-4 py-3 text-left">Updated</th>
                                        <th className="px-4 py-3 text-center">Export</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {paginatedData.map((item) => {
                                        const isSelected = selectedApp?.id === item.id;

                                        return (
                                            <tr
                                                key={item.id}
                                                onClick={() => setSelectedApp(item)}
                                                className={` border-b border-[#1e293b] cursor-pointer transition
                                                ${isSelected ? "bg-cyan-500/20 text-cyan-400" : " text-white-400 hover:bg-[#111827]"} `} >
                                                <td className="px-4 py-3  font-medium">
                                                    {item.appName}
                                                </td>
                                                <td className="px-4 py-3 text-gray-300">
                                                    {item.latestVersion}
                                                </td>
                                                <td className="px-4 py-3 text-gray-300">
                                                    {item.updatedAt}
                                                </td>
                                                <td className="px-4 py-3 text-center">
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            console.log("Download:", item.appName);
                                                        }}
                                                        className="w-8 h-8 rounded-lg bg-cyan-500/8 border border-cyan-500/15
hover:bg-cyan-500/15 hover:border-cyan-400/30
flex items-center justify-center transition duration-200 mx-auto"
                                                    >
                                                        <Download size={14} className="text-cyan-400" />
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody> 
                            </table>

                            {/* PAGINATION */}
                            <div className="flex justify-between items-center p-3 border-t border-[#1e293b]">
                                <span className="text-xs text-gray-400">
                                    Page {currentPage} of {totalPages || 1}
                                </span>

                                <div className="flex gap-2">
                                    <button
                                        disabled={currentPage === 1}
                                        onClick={() => setCurrentPage((p) => p - 1)}
                                        className="w-8 h-8 border border-[#1e293b] rounded disabled:opacity-40 text-gray-300"
                                    >
                                        <ChevronLeft size={14} />
                                    </button>

                                    <button
                                        disabled={currentPage === totalPages}
                                        onClick={() => setCurrentPage((p) => p + 1)}
                                        className="w-8 h-8 border border-[#1e293b] rounded disabled:opacity-40 text-gray-300"
                                    >
                                        <ChevronRight size={14} />
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>

                {/* SIDE CARD */}
                {selectedApp && (
                    <div className="w-[420px] bg-[#0B1220] border border-[#1e293b] rounded-xl p-4 relative">

                        {/* CLOSE BUTTON */}
                        <button
                            onClick={() => setSelectedApp(null)}
                            className="absolute top-3 right-3 p-1 rounded-md hover:bg-[#111827] text-gray-400 hover:text-white transition"
                        >
                            <X size={16} />
                        </button>

                        {/* ROW 1: Logo + App Name */}
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
                                <Package size={18} className="text-cyan-400" />
                            </div>

                            <h2 className="text-sm font-semibold text-cyan-400">
                                {selectedApp.appName}
                            </h2>
                        </div>

                        {/* ROW 2: Cards */}
                        <div className="grid grid-cols-2 gap-2 mb-4">
                            <div className="bg-[#111827] border border-[#1e293b] rounded-lg p-3">
                                <p className="text-[10px] text-gray-400">Latest Version</p>
                                <p className="text-xs text-cyan-400 font-medium">
                                    {selectedApp.latestVersion}
                                </p>
                            </div>

                            <div className="bg-[#111827] border border-[#1e293b] rounded-lg p-3">
                                <p className="text-[10px] text-gray-400">Updated At</p>
                                <p className="text-xs text-gray-300 font-medium">
                                    {formatDateTime(selectedApp.updatedAt)}
                                </p>
                            </div>
                        </div>

                        {/* ROW 3: Silent Command */}
                        <div className="bg-[#050B18] border border-[#1e293b] rounded-lg p-3">
                            <p className="text-[11px] text-gray-500 mb-1">Silent Command</p>
                            <code className="text-[12px] text-gray-300 break-all">
                                {selectedApp.silentCommand || "N/A"}
                            </code>
                        </div>

                        <button
                            className="mt-4 w-full bg-cyan-600/60 border border-cyan-600/60
hover:bg-cyan-500/30 hover:border-cyan-500/30
transition duration-200 text-cyan-300 text-xs py-2.5 rounded-lg
flex items-center justify-center gap-2"
                        >
                            <Download size={14} />
                            Download Package
                        </button>
                    </div>
                )}

            </div>
        </div>
    )
}

export default PatchRepositoryNew
