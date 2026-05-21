import React, { useMemo, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom"
import {
    Search, RefreshCw, Download, CheckCircle2, ShieldAlert, AlertTriangle,
    ChevronLeft, ChevronRight
} from 'lucide-react';

const InstalledApps = () => {

    const thirdinstalledapps = [
        { srNo: 1, application: "OpenSSH", hostName: "DESKTOP-F7V9A7C", ipAddress: "192.168.0.236", installedVersion: "9.8.3.0", patchStatus: "NA", latestVersion: "No", update: "UNKNOWN", publisher: "Microsoft Corporation", firstSeen: "2026-01-19 13:15:22.0", lastUpdated: "2026-02-21 10:15:38.0" },
        { srNo: 2, application: "Outils de vérification linguistique 2013 de Microsoft Office - Français", hostName: "DESKTOP-F7V9A7C", ipAddress: "192.168.0.236", installedVersion: "15.0.4569.1506", patchStatus: "NA", latestVersion: "No", update: "UNKNOWN", publisher: "Microsoft Corporation", firstSeen: "2026-01-19 13:15:22.0", lastUpdated: "2026-02-21 10:15:38.0" },
        { srNo: 3, application: "Patch-Client-Setup", hostName: "DESKTOP-F7V9A7C", ipAddress: "192.168.0.236", installedVersion: "30.05.24.1", patchStatus: "NA", latestVersion: "No", update: "UNKNOWN", publisher: "Velox Solutions Pvt. Ltd.", firstSeen: "2026-01-19 13:15:22.0", lastUpdated: "2026-02-21 10:15:38.0" },
        { srNo: 4, application: "Postman x64", hostName: "DESKTOP-F7V9A7C", ipAddress: "192.168.0.236", installedVersion: "11.79.5", patchStatus: "NA", latestVersion: "No", update: "UNKNOWN", publisher: "Postman", firstSeen: "2026-01-19 13:15:22.0", lastUpdated: "2026-02-21 10:15:38.0" },
        { srNo: 5, application: "Python", hostName: "DESKTOP-F7V9A7C", ipAddress: "192.168.0.236", installedVersion: "2.7.16150", patchStatus: "NA", latestVersion: "No", update: "UNKNOWN", publisher: "Python Software Foundation", firstSeen: "2026-01-19 13:15:22.0", lastUpdated: "2026-02-21 10:15:38.0" },
        { srNo: 6, application: "SIV", hostName: "DESKTOP-F7V9A7C", ipAddress: "192.168.0.236", installedVersion: "1.24.0418", patchStatus: "NA", latestVersion: "No", update: "UNKNOWN", publisher: "GIGABYTE", firstSeen: "2026-01-19 13:15:22.0", lastUpdated: "2026-02-21 10:15:38.0" },
        { srNo: 7, application: "Smart Backup", hostName: "DESKTOP-F7V9A7C", ipAddress: "192.168.0.236", installedVersion: "3.21.0326.1", patchStatus: "NA", latestVersion: "No", update: "UNKNOWN", publisher: "GIGABYTE", firstSeen: "2026-01-19 13:15:22.0", lastUpdated: "2026-02-21 10:15:38.0" },
        { srNo: 8, application: "TeamViewer", hostName: "DESKTOP-F7V9A7C", ipAddress: "192.168.0.236", installedVersion: "15.67.5", patchStatus: "15.74.6", latestVersion: "Yes", update: "OUTDATED", publisher: "TeamViewer", firstSeen: "2026-01-19 13:15:22.0", lastUpdated: "2026-02-21 10:15:38.0" },
        { srNo: 9, application: "TreeSize Free V4.8", hostName: "DESKTOP-F7V9A7C", ipAddress: "192.168.0.236", installedVersion: "4.8", patchStatus: "NA", latestVersion: "No", update: "UNKNOWN", publisher: "JAM Software", firstSeen: "2026-01-19 13:15:22.0", lastUpdated: "2026-02-21 10:15:38.0" },
        { srNo: 10, application: "Winlogbeat Agent version", hostName: "DESKTOP-F7V9A7C", ipAddress: "192.168.0.236", installedVersion: "1.0", patchStatus: "NA", latestVersion: "No", update: "UNKNOWN", publisher: "", firstSeen: "2026-01-19 13:15:22.0", lastUpdated: "2026-02-21 10:15:38.0" },
        { srNo: 11, application: "AD-User-Server-Setup", hostName: "Shamika-Zagade", ipAddress: "192.168.0.15", installedVersion: "30.05.24.1", patchStatus: "NA", latestVersion: "No", update: "UNKNOWN", publisher: "Velox Solutions Pvt. Ltd.", firstSeen: "2026-02-20 18:05:50.0", lastUpdated: "2026-02-21 10:15:38.0" },
        { srNo: 12, application: "Apache NetBeans IDE 14", hostName: "Shamika-Zagade", ipAddress: "192.168.0.15", installedVersion: "14", patchStatus: "NA", latestVersion: "No", update: "UNKNOWN", publisher: "Apache NetBeans", firstSeen: "2026-02-20 18:05:50.0", lastUpdated: "2026-02-21 10:15:38.0" },
        { srNo: 13, application: "Apache Tomcat 9.0 Tomcat9", hostName: "Shamika-Zagade", ipAddress: "192.168.0.15", installedVersion: "9.0.63", patchStatus: "NA", latestVersion: "No", update: "UNKNOWN", publisher: "The Apache Software Foundation", firstSeen: "2026-02-20 18:05:50.0", lastUpdated: "2026-02-21 10:15:38.0" },
        { srNo: 14, application: "Chrome Remote Desktop", hostName: "Shamika-Zagade", ipAddress: "192.168.0.15", installedVersion: "1.0", patchStatus: "NA", latestVersion: "No", update: "NEWER_THAN_LATEST", publisher: "Google\\Chrome", firstSeen: "2026-02-20 18:05:50.0", lastUpdated: "2026-02-21 10:15:38.0" },
        { srNo: 15, application: "Chrome Remote Desktop Host", hostName: "Shamika-Zagade", ipAddress: "192.168.0.15", installedVersion: "145.0.7632.25", patchStatus: "127.0.6533.21", latestVersion: "No", update: "NEWER_THAN_LATEST", publisher: "Google LLC", firstSeen: "2026-02-20 18:05:50.0", lastUpdated: "2026-02-21 10:15:38.0" },
        { srNo: 16, application: "ClickOnce Bootstrapper Package for Microsoft .NET Framework", hostName: "Shamika-Zagade", ipAddress: "192.168.0.15", installedVersion: "4.8.09256", patchStatus: "NA", latestVersion: "No", update: "UNKNOWN", publisher: "Microsoft Corporation", firstSeen: "2026-02-20 18:05:50.0", lastUpdated: "2026-02-21 10:15:38.0" },
        { srNo: 17, application: "ClientSOARAgent", hostName: "Shamika-Zagade", ipAddress: "192.168.0.15", installedVersion: "1.0", patchStatus: "NA", latestVersion: "No", update: "UNKNOWN", publisher: "VELOX", firstSeen: "2026-02-20 18:05:50.0", lastUpdated: "2026-02-21 10:15:38.0" },
        { srNo: 18, application: "DiagnosticsHub_CollectionService", hostName: "Shamika-Zagade", ipAddress: "192.168.0.15", installedVersion: "17.14.36412", patchStatus: "NA", latestVersion: "No", update: "UNKNOWN", publisher: "Microsoft Corporation", firstSeen: "2026-02-20 18:05:50.0", lastUpdated: "2026-02-21 10:15:38.0" },
        { srNo: 19, application: "Entity Framework 6.5.0 Tools for Visual Studio 2022", hostName: "Shamika-Zagade", ipAddress: "192.168.0.15", installedVersion: "6.5.0.0", patchStatus: "NA", latestVersion: "No", update: "NEWER_THAN_LATEST	", publisher: "Microsoft Corporation", firstSeen: "2026-02-20 18:05:50.0", lastUpdated: "2026-02-21 10:15:38.0" },
        { srNo: 20, application: "Git", hostName: "Shamika-Zagade", ipAddress: "192.168.0.15", installedVersion: "2.52.0", patchStatus: "2.53.0.0.0", latestVersion: "Yes", update: "OUTDATED", publisher: "The Git Development Community", firstSeen: "2026-02-20 18:05:50.0", lastUpdated: "2026-02-21 10:15:38.0" },
        { srNo: 21, application: "Google Chrome", hostName: "Shamika-Zagade", ipAddress: "192.168.0.15", installedVersion: "145.0.7632.76", patchStatus: "145.0.7632.76", latestVersion: "No", update: "UPTODATE", publisher: "Google LLC", firstSeen: "2026-02-20 18:05:50.0", lastUpdated: "2026-02-21 10:15:38.0" },
        { srNo: 22, application: "HeidiSQL", hostName: "Shamika-Zagade", ipAddress: "192.168.0.15", installedVersion: "12.13.0.7147", patchStatus: "12.15.0.7171", latestVersion: "Yes", update: "OUTDATED", publisher: "Ansgar Becker", firstSeen: "2026-02-20 18:05:50.0", lastUpdated: "2026-02-21 10:15:38.0" },
        { srNo: 23, application: "IIS 10.0 Express", hostName: "Shamika-Zagade", ipAddress: "192.168.0.15", installedVersion: "10.0.10007", patchStatus: "NA", latestVersion: "No", update: "UNKNOWN", publisher: "Microsoft Corporation", firstSeen: "2026-02-20 18:05:50.0", lastUpdated: "2026-02-21 10:15:38.0" },
        { srNo: 24, application: "IIS Express Application Compatibility Database for x64", hostName: "Shamika-Zagade", ipAddress: "192.168.0.15", installedVersion: "", patchStatus: "NA", latestVersion: "No", update: "UNKNOWN", publisher: "", firstSeen: "2026-02-20 18:05:50.0", lastUpdated: "2026-02-21 10:15:38.0" },
        { srNo: 25, application: "IIS Express Application Compatibility Database for x86", hostName: "Shamika-Zagade", ipAddress: "192.168.0.15", installedVersion: "", patchStatus: "NA", latestVersion: "No", update: "UNKNOWN", publisher: "", firstSeen: "2026-02-20 18:05:50.0", lastUpdated: "2026-02-21 10:15:38.0" }
    ];

    const [search, setSearch] = useState("");
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    // Filter Data
    const filteredData = useMemo(() => {
        return thirdinstalledapps.filter((item) =>
            item.application.toLowerCase().includes(search.toLowerCase()) ||
            item.hostName.toLowerCase().includes(search.toLowerCase()) ||
            item.ipAddress.toLowerCase().includes(search.toLowerCase())
        );
    }, [search]);

    // Pagination
    const totalPages = Math.ceil(filteredData.length / rowsPerPage);
    const paginatedData = useMemo(() => {
        const start = (currentPage - 1) * rowsPerPage;
        return filteredData.slice(start, start + rowsPerPage);
    }, [filteredData, currentPage, rowsPerPage]);




    return (
        <div className="bg-[#050B18] rounded-xl p-4 border border-white/10 min-h-screen text-white text-sm">

            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-5">

                <div>
                    <h1 className="text-xl font-bold"> Installed Applications </h1>
                    <p className="text-xs text-gray-400 mt-1"> Inventory of all installed applications across endpoints with version and patch status tracking. </p>
                </div>

                <div className="flex items-center gap-2">
                    <button className="flex items-center gap-2 px-3 py-2 text-xs rounded-lg bg-[#111827] border border-[#1e293b] hover:border-cyan-500 transition-all duration-300">
                        <RefreshCw size={14} /> Refresh
                    </button>

                    <button className="flex items-center gap-2 px-3 py-2 text-xs rounded-lg bg-emerald-500 text-black font-semibold hover:bg-emerald-400 transition-all duration-300">
                        <Download size={14} /> Export
                    </button>
                </div>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
                <div className="bg-[#0B1220] rounded-xl p-4 border border-[#1e293b] hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(34,211,238,0.25)] transition-all duration-300">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-[10px] text-cyan-500 uppercase tracking-wide"> Total Installed Apps </p>
                            <h2 className="text-2xl font-bold mt-1"> {thirdinstalledapps.length} </h2>
                        </div>

                        <div className="w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center">
                            <ShieldAlert size={18} className="text-cyan-400" />
                        </div>
                    </div>
                </div>

                <div className="bg-[#0B1220] rounded-xl p-4 border border-[#1e293b] hover:border-red-400 hover:shadow-[0_0_15px_rgba(239,68,68,0.25)] transition-all duration-300">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-[10px] text-red-500 uppercase tracking-wide"> Outdated Apps </p>
                            <h2 className="text-2xl font-bold mt-1">
                                {thirdinstalledapps.filter(item => item.status === "OUTDATED").length}
                            </h2>
                        </div>

                        <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center">
                            <AlertTriangle size={18} className="text-red-400" />
                        </div>
                    </div>
                </div>
                <div className="bg-[#0B1220] rounded-xl p-4 border border-[#1e293b] hover:border-emerald-400 hover:shadow-[0_0_15px_rgba(16,185,129,0.25)] transition-all duration-300">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-[10px] text-green-500 uppercase tracking-wide"> Latest Version Available </p>
                            <h2 className="text-2xl font-bold mt-1"> {thirdinstalledapps.filter(item => item.latestVersion === "Yes").length}</h2>
                        </div>

                        <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center">
                            <CheckCircle2 size={18} className="text-emerald-400" />
                        </div>
                    </div>
                </div>

            </div>

            {/* Search + Page Size */}
            <div className="bg-[#0B1220] rounded-xl p-3 border border-[#1e293b] mb-4">
                <div className="flex flex-col lg:flex-row gap-3 items-center">
                    {/* Search */}
                    <div className="relative flex-1">
                        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

                        <input type="text" placeholder="Search application / hostname / ip..." value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setCurrentPage(1);
                            }} className="w-full bg-[#111827] border border-[#1e293b] focus:border-cyan-500 outline-none rounded-lg pl-9 pr-4 py-2.5 text-xs"
                        />
                    </div>

                    {/* Rows Per Page */}
                    <select value={rowsPerPage}
                        onChange={(e) => {
                            setRowsPerPage(Number(e.target.value));
                            setCurrentPage(1);
                        }}
                        className="bg-[#111827] border border-[#1e293b] focus:border-cyan-500 outline-none rounded-lg px-3 py-2.5 text-xs min-w-[120px]" >
                        <option value={10}>10 / page</option>
                        <option value={20}>20 / page</option>
                        <option value={30}>30 / page</option>
                    </select>

                    {/* Count */}
                    <div className="text-[11px] text-gray-400 whitespace-nowrap">
                        Showing {paginatedData.length} of {filteredData.length}
                    </div>

                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-xl border border-[#1e293b]">

                <table className="w-full min-w-[1100px] text-xs">
                    <thead className="bg-[#1e293b] border-b border-[#1e293b] ">
                        <tr className="text-left text-sm font-semibold text-gray-300">
                            {/* <th className="px-4 py-3 font-medium">Sr No</th> */}
                            <th className="px-4 py-3 font-medium">IP Address</th>
                            <th className="px-4 py-3 font-medium">Host Name</th>
                            <th className="px-4 py-3 font-medium">Application</th>
                            <th className="px-4 py-3 font-medium">Installed Version</th>
                            <th className="px-4 py-3 font-medium">Latest Version</th>
                            <th className="px-4 py-3 font-medium">Update</th>
                            <th className="px-4 py-3 font-medium">Publisher</th>
                            <th className="px-4 py-3 font-medium">First Seen</th>
                            <th className="px-4 py-3 font-medium">Last Updated</th>
                        </tr>
                    </thead>

                    <tbody>
                        {paginatedData.length > 0 ? (
                            paginatedData.map((item) => (
                                <tr key={item.srNo} className="border-b border-[#1e293b] hover:bg-[#111827] transition-all duration-300" >

                                    <td className="px-4 py-3 text-gray-300 whitespace-nowrap"> {item.ipAddress} </td>
                                    <td className="px-4 py-3"> {item.hostName} </td>
                                    <td className="px-4 py-3 font-medium text-white"> {item.application} </td>
                                    <td className="px-4 py-3 text-gray-300"> {item.installedVersion} </td>
                                    <td className={`px-4 py-3 font-medium ${ item.latestVersion === "Yes" ? "text-emerald-400" : "text-red-400" }`}> {item.latestVersion} </td>
                                    <td className="px-4 py-3">
                                        <span className="px-2.5 py-1 rounded-full text-[10px] bg-red-500/10 border border-red-500/20 text-red-400 ">
                                            {item.update}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-cyan-400"> {item.publisher} </td>
                                    <td className="px-4 py-3"> {new Date(item.firstSeen).toLocaleString("en-GB", {
                                        day: "2-digit", month: "2-digit", year: "numeric",
                                        hour: "2-digit", minute: "2-digit", hour12: false,
                                    }).replace(/\//g, "-").replace(",", "")}</td>

                                    <td className="px-4 py-3"> {new Date(item.lastUpdated).toLocaleString("en-GB", {
                                        day: "2-digit", month: "2-digit", year: "numeric",
                                        hour: "2-digit", minute: "2-digit", hour12: false,
                                    }).replace(/\//g, "-").replace(",", "")}</td>

                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="text-center py-8 text-gray-400 text-xs" > No Data Available </td>
                            </tr>
                        )}
                    </tbody>

                </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-4">

                <div className="text-xs text-gray-400"> Page {currentPage} of {totalPages} </div>

                <div className="flex items-center gap-2">
                    <button disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)}
                        className="w-8 h-8 rounded-lg border border-[#1e293b] bg-[#111827] flex items-center justify-center disabled:opacity-40" >
                        <ChevronLeft size={15} />
                    </button>

                    <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)}
                        className="w-8 h-8 rounded-lg border border-[#1e293b] bg-[#111827] flex items-center justify-center disabled:opacity-40" >
                        <ChevronRight size={15} />
                    </button>

                </div>
            </div>
        </div>
    )
}

export default InstalledApps
