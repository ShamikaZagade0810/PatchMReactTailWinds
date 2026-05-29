import React, { useMemo, useState } from "react";
import {
    Search,
    Download,
    ChevronRight,
    ChevronDown,
    ShieldAlert,
    Router,
    Network,
    Wifi,
    Server,
    Globe,
    Layers3,
    MoreHorizontal,
    Eye,
    RefreshCw,
    Package,
    Calendar,
    HardDrive,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const firmwareData = [
    {
        Switches: [
            {
                Cisco: [
                    {
                        firmwareName: "Catalyst 9300 Enterprise Firmware",
                        model: "Catalyst 9300-48P",
                        currentVersion: "17.6.3",
                        latestVersion: "17.12.4",
                        releaseDate: "2026-03-18",
                        type: "Security Patch",
                        severity: "Critical",
                        cve: "CVE-2026-1021",
                        repoStatus: "Outdated",
                        size: "1.8 GB",
                        uploadedBy: "Admin",
                        lastUpdated: "2 hrs ago",
                    },
                    {
                        firmwareName: "Catalyst Core Switch Package",
                        model: "Catalyst 9500",
                        currentVersion: "17.9.1",
                        latestVersion: "17.9.5",
                        releaseDate: "2026-04-09",
                        type: "Feature Update",
                        severity: "Medium",
                        cve: "No CVE",
                        repoStatus: "Testing",
                        size: "2.1 GB",
                        uploadedBy: "Firmware Team",
                        lastUpdated: "Yesterday",
                    },
                ],

                Juniper: [
                    {
                        firmwareName: "EX4400 Secure OS",
                        model: "EX4400-24T",
                        currentVersion: "21.2R3",
                        latestVersion: "22.1R1",
                        releaseDate: "2026-02-11",
                        type: "Hotfix",
                        severity: "High",
                        cve: "CVE-2026-4567",
                        repoStatus: "Vulnerable",
                        size: "950 MB",
                        uploadedBy: "Security Ops",
                        lastUpdated: "5 hrs ago",
                    },
                ],

                Aruba: [
                    {
                        firmwareName: "Aruba CX Access Firmware",
                        model: "CX 6300",
                        currentVersion: "10.12.001",
                        latestVersion: "10.13.004",
                        releaseDate: "2026-01-29",
                        type: "Maintenance",
                        severity: "Low",
                        cve: "No CVE",
                        repoStatus: "Up-to-date",
                        size: "670 MB",
                        uploadedBy: "Infra Team",
                        lastUpdated: "3 days ago",
                    },
                ],
            },
        ],

        Routers: [
            {
                Cisco: [
                    {
                        firmwareName: "ISR WAN Edge Firmware",
                        model: "ISR 4451-X",
                        currentVersion: "16.12.5",
                        latestVersion: "17.3.7",
                        releaseDate: "2026-05-01",
                        type: "Security Patch",
                        severity: "Critical",
                        cve: "CVE-2026-9001",
                        repoStatus: "EOS/EOL",
                        size: "1.4 GB",
                        uploadedBy: "Network Team",
                        lastUpdated: "1 hr ago",
                    },
                ],

                Juniper: [
                    {
                        firmwareName: "MX Edge Routing Package",
                        model: "MX480",
                        currentVersion: "20.1R2",
                        latestVersion: "22.4R1",
                        releaseDate: "2026-02-17",
                        type: "Feature Update",
                        severity: "Medium",
                        cve: "No CVE",
                        repoStatus: "Testing",
                        size: "1.1 GB",
                        uploadedBy: "Ops Team",
                        lastUpdated: "Today",
                    },
                ],

                Huawei: [
                    {
                        firmwareName: "NetEngine Secure Firmware",
                        model: "NE40E-X8",
                        currentVersion: "V8R11",
                        latestVersion: "V8R13",
                        releaseDate: "2026-03-10",
                        type: "Security Patch",
                        severity: "High",
                        cve: "CVE-2026-7123",
                        repoStatus: "Outdated",
                        size: "2.6 GB",
                        uploadedBy: "SOC Team",
                        lastUpdated: "4 hrs ago",
                    },
                ],
            },
        ],

        Firewalls: [
            {
                Fortinet: [
                    {
                        firmwareName: "FortiOS Enterprise Security",
                        model: "FortiGate 200F",
                        currentVersion: "7.0.4",
                        latestVersion: "7.4.1",
                        releaseDate: "2026-04-14",
                        type: "Critical Patch",
                        severity: "Critical",
                        cve: "CVE-2026-8888",
                        repoStatus: "Vulnerable",
                        size: "4.2 GB",
                        uploadedBy: "Cyber Defense",
                        lastUpdated: "30 mins ago",
                    },
                ],

                "Palo Alto": [
                    {
                        firmwareName: "PAN-OS Secure Release",
                        model: "PA-5220",
                        currentVersion: "10.1.3",
                        latestVersion: "11.0.2",
                        releaseDate: "2026-03-27",
                        type: "Feature Update",
                        severity: "High",
                        cve: "CVE-2026-7890",
                        repoStatus: "Testing",
                        size: "3.7 GB",
                        uploadedBy: "Security Admin",
                        lastUpdated: "Today",
                    },
                ],

                Sophos: [
                    {
                        firmwareName: "Sophos XGS Firmware",
                        model: "XGS 4300",
                        currentVersion: "19.0",
                        latestVersion: "20.0",
                        releaseDate: "2026-02-21",
                        type: "Security Patch",
                        severity: "Medium",
                        cve: "No CVE",
                        repoStatus: "Up-to-date",
                        size: "2.9 GB",
                        uploadedBy: "Infra Admin",
                        lastUpdated: "2 days ago",
                    },
                ],
            },
        ],
    },
];

const categories = [
    {
        name: "Switches",
        icon: Network,
        oems: ["Cisco", "Juniper", "Aruba", "HPE", "Dell", "Extreme Networks"],
    },
    {
        name: "Routers",
        icon: Router,
        oems: ["Cisco", "Juniper", "Huawei", "MikroTik", "Fortinet"],
    },
    {
        name: "Firewalls",
        icon: ShieldAlert,
        oems: ["Fortinet", "Palo Alto", "Sophos", "Check Point", "SonicWall"],
    },
    {
        name: "Wireless Controllers",
        icon: Wifi,
        oems: ["Cisco", "Aruba", "Juniper"],
    },
    {
        name: "Access Points",
        icon: Wifi,
        oems: ["Cisco", "Ubiquiti", "Aruba"],
    },
    {
        name: "Load Balancers",
        icon: Server,
        oems: ["F5", "Citrix", "A10"],
    },
    {
        name: "SD-WAN Devices",
        icon: Globe,
        oems: ["Cisco", "VMware", "Fortinet"],
    },
];

const statusColors = {
    "Up-to-date": "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20",
    Outdated: "bg-orange-500/15 text-orange-400 border border-orange-500/20",
    Vulnerable: "bg-red-500/15 text-red-400 border border-red-500/20",
    "EOS/EOL": "bg-purple-500/15 text-purple-400 border border-purple-500/20",
    Testing: "bg-blue-500/15 text-blue-400 border border-blue-500/20",
};

const severityColors = {
    Critical: "text-red-400",
    High: "text-orange-400",
    Medium: "text-yellow-400",
    Low: "text-green-400",
};

const getFirmwareRows = (category, oem) => {
    const dataRoot = firmwareData[0];

    const categoryData = dataRoot[category]?.[0];

    if (!categoryData) return [];

    return categoryData[oem] || [];
};

const FirmwareInventory = () => {
    const [selectedCategory, setSelectedCategory] = useState("Switches");
    const [selectedOEM, setSelectedOEM] = useState("Cisco");
    const [expandedCategory, setExpandedCategory] = useState("Switches");
    const [search, setSearch] = useState("");
    const [expandedRow, setExpandedRow] = useState(null);



    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const filteredData = useMemo(() => {
        return getFirmwareRows(selectedCategory, selectedOEM).filter((item) =>
            item.firmwareName.toLowerCase().includes(search.toLowerCase())
        );
    }, [selectedCategory, selectedOEM, search]);

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    const tableData = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredData.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredData, currentPage]);

    // const tableData = useMemo(() => {
    //     return getFirmwareRows(selectedCategory, selectedOEM).filter((item) =>
    //         item.firmwareName.toLowerCase().includes(search.toLowerCase())
    //     );
    // }, [selectedCategory, selectedOEM, search]);

    return (
        <div className="min-h-screen text-white p-4">
            <div className="flex gap-5 h-[95vh]">
                {/* SIDEBAR */}
                <div className="w-[320px] rounded-3xl border border-white/10 bg-[#071018]  backdrop-blur-xl shadow-2xl overflow-hidden">
                    <div className="p-5 border-b border-white/10">
                        <div className="flex items-center gap-3">
                            <div className="bg-cyan-500/20 p-3 rounded-2xl">
                                <Layers3 className="text-cyan-400" size={24} />
                            </div>

                            <div>
                                <h2 className="font-bold text-xl"> Firmware Repository </h2>
                                <p className="text-xs text-slate-400"> Enterprise Inventory </p>
                            </div>
                        </div>
                    </div>

                    <div className="overflow-y-auto h-full p-4 space-y-3 hide-scrollbar">
                        {categories.map((cat) => {
                            const Icon = cat.icon;
                            return (
                                <div key={cat.name} className="rounded-xl bg-white/[0.03] border border-white/5 overflow-hidden">
                                    <button
                                        onClick={() => setExpandedCategory(expandedCategory === cat.name ? "" : cat.name)}
                                        className="w-full flex items-center justify-between px-3 py-2.5 hover:bg-white/5 transition" >
                                        <div className="flex items-center gap-2">
                                            <div className="p-2 rounded-lg bg-cyan-500/10">
                                                <Icon className="text-cyan-400" size={15} />
                                            </div>

                                            <span className="font-medium text-[13px]"> {cat.name} </span>
                                        </div>

                                        {expandedCategory === cat.name ? (<ChevronDown size={15} />) : (<ChevronRight size={15} />)}
                                    </button>

                                    <AnimatePresence>
                                        {expandedCategory === cat.name && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: "auto" }}
                                                exit={{ opacity: 0, height: 0 }}
                                                className="px-2 pb-2"  >
                                                {cat.oems.map((oem) => {
                                                    const isActive = selectedCategory === cat.name && selectedOEM === oem;

                                                    return (
                                                        <motion.button
                                                            whileHover={{ x: 2 }}
                                                            key={oem}
                                                            onClick={() => {
                                                                setSelectedCategory(cat.name);
                                                                setSelectedOEM(oem); setCurrentPage(1); setExpandedRow(null);
                                                            }}
                                                            className={`w-full mt-1 rounded-lg px-3 py-3 flex items-center justify-between transition-all ${isActive ? "bg-cyan-400/50 shadow-md shadow-cyan-500/20"
                                                                : "bg-white/[0.03] hover:bg-white/[0.07]"}`}  >
                                                            <div className="flex items-center gap-2">
                                                                <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-bold">
                                                                    {oem.charAt(0)}
                                                                </div>

                                                                <span className="text-[12px]">
                                                                    {oem}
                                                                </span>
                                                            </div>

                                                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-black/20">
                                                                {getFirmwareRows(cat.name, oem).length}
                                                            </span>
                                                        </motion.button>
                                                    );
                                                })}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* CONTENT */}
                <div className="flex-1 min-w-0 rounded-3xl border border-white/10 bg-[#071018] backdrop-blur-xl shadow-2xl flex flex-col">

                    {/* TOP BAR */}
                    <div className="p-4  flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div>
                            <h1 className="text-2xl font-bold  bg-clip-text text-cyan-500"> {selectedCategory} Firmware Packages </h1>
                            <p className="text-slate-400 mt-1 text-sm"> OEM Repository Management Dashboard • {selectedOEM} </p>
                        </div>

                        <div className="flex items-center gap-3">
                            {/* <div className="relative">
                                <Search size={18} className="absolute left-3 top-3 text-slate-400" />
                                <input type="text" placeholder="Search firmware..." value={search} onChange={(e) => setSearch(e.target.value)}
                                    className="pl-10 pr-4 py-3 rounded-2xl bg-[#0d1722] border border-white/10 focus:outline-none focus:border-cyan-500 w-[280px]" />
                            </div> */}

                            <button className="px-3 py-2 rounded-2xl bg-cyan-500 hover:opacity-90 transition font-medium"> Upload Package    </button>
                        </div>
                    </div>

                    <div class="h-px bg-gray-800 my-2"></div>


                    <div className="flex justify-between items-center my-3 flex-shrink-0 px-3">
                        {/* SEARCH BAR */}
                        <div className="relative">
                            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                            <input type="text" placeholder="Search firmware package..." value={search} onChange={(e) => setSearch(e.target.value)}
                                className="pl-11 pr-4 py-3 rounded-2xl bg-[#0d1722] border border-white/10 focus:outline-none focus:border-cyan-500 w-[800px] text-sm" />
                        </div>

                        {/* PACKAGE COUNT */}
                        {/* <div className="text-sm text-gray-400 pr-4">
    Showing {tableData.length} of{" "}
    {getFirmwareRows(selectedCategory, selectedOEM).length}
  </div> */}
                        <div className="text-[12px] text-slate-400">
                            Showing{" "}  {tableData.length} {" "} of{" "}
                            {filteredData.length} {" "} packages
                        </div>
                    </div>

                    {/* TABLE */}
                    <div className="flex-1 overflow-auto p-2">
                        <div className="rounded-2xl border border-white/10 overflow-hidden">
                            <table className="w-full ">

                                {/* TABLE HEADER */}
                                <thead className="sticky top-0 bg-[#2a3a52] z-10 text-[14px]">
                                    <tr className="text-left text-slate-200 border-b border-white/10">

                                        <th className="px-4 py-3 font-medium">Firmware Name</th>
                                        <th className="px-4 py-3 font-medium">OEM</th>
                                        <th className="px-4 py-3 font-medium">Device</th>
                                        <th className="px-4 py-3 font-medium">Model</th>
                                        <th className="px-4 py-3 font-medium">Current</th>
                                        <th className="px-4 py-3 font-medium">Latest</th>
                                        <th className="px-4 py-3 font-medium">Release Date</th>
                                        <th className="px-4 py-3 font-medium">Type</th>
                                        <th className="px-4 py-3 font-medium text-center">
                                            Details
                                        </th>
                                    </tr>
                                </thead>

                                {/* TABLE BODY */}
                                <tbody className="text-[12px]">
                                    {tableData.length > 0 ? (
                                        tableData.map((item, index) => (
                                            <React.Fragment key={index}>

                                                <motion.tr
                                                    whileHover={{
                                                        backgroundColor: "rgba(255,255,255,0.03)",
                                                    }}
                                                    className="border-b border-white/5"
                                                >
                                                    {/* Firmware Name */}
                                                    <td className="px-4 py-3">
                                                        <div className="flex items-center gap-3">
                                                            <div className="p-1.5 rounded-lg bg-cyan-500/10">
                                                                <Package
                                                                    size={15}
                                                                    className="text-cyan-400"
                                                                />
                                                            </div>

                                                            <div>
                                                                <div className="font-medium text-[12px]">
                                                                    {item.firmwareName}
                                                                </div>

                                                                <div className="text-[10px] text-slate-500">
                                                                    Enterprise Package
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>

                                                    {/* OEM */}
                                                    <td className="px-4 py-3">
                                                        {selectedOEM}
                                                    </td>

                                                    {/* Device */}
                                                    <td className="px-4 py-3">
                                                        {selectedCategory}
                                                    </td>

                                                    {/* Model */}
                                                    <td className="px-4 py-3">
                                                        {item.model}
                                                    </td>

                                                    {/* Current */}
                                                    <td className="px-4 py-3 text-slate-300">
                                                        {item.currentVersion}
                                                    </td>

                                                    {/* Latest */}
                                                    <td className="px-4 py-3 text-cyan-400 font-semibold">
                                                        {item.latestVersion}
                                                    </td>

                                                    {/* Release Date */}
                                                    <td className="px-4 py-3">
                                                        <div className="flex items-center gap-2">
                                                            <Calendar size={13} />
                                                            {item.releaseDate}
                                                        </div>
                                                    </td>

                                                    {/* Type */}
                                                    <td className="px-4 py-3">
                                                        {item.type}
                                                    </td>

                                                    {/* Expand Button */}
                                                    <td className="px-4 py-3 text-center">
                                                        <button
                                                            onClick={() =>
                                                                setExpandedRow(
                                                                    expandedRow === index ? null : index
                                                                )
                                                            }
                                                            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition"
                                                        >
                                                            {expandedRow === index ? (
                                                                <ChevronDown size={15} />
                                                            ) : (
                                                                <ChevronRight size={15} />
                                                            )}
                                                        </button>
                                                    </td>
                                                </motion.tr>

                                                {/* EXPANDABLE ROW */}

                                                <AnimatePresence>
                                                    {expandedRow === index && (
                                                        <motion.tr
                                                            initial={{ opacity: 0, height: 0 }}
                                                            animate={{ opacity: 1, height: "auto" }}
                                                            exit={{ opacity: 0, height: 0 }}  >

                                                            <td colSpan="9" className="p-4 bg-[#071018]">
                                                                <motion.div
                                                                    initial={{ y: -10, opacity: 0 }}
                                                                    animate={{ y: 0, opacity: 1 }}
                                                                    className="relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-[#0d1722] via-[#101c2a] to-[#0b131c] p-4 shadow-xl"  >

                                                                    {/* TOP GLOW */}
                                                                    <div className="absolute top-0 left-0 w-full h-[2px]  " />
                                                                    {/* HEADER */}
                                                                    <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-3">

                                                                        <div>
                                                                            <h2 className="text-sm font-semibold text-white"> {item.firmwareName} </h2>
                                                                            <p className="text-xs text-slate-400 mt-1"> {selectedOEM} • {item.model} </p>
                                                                        </div>

                                                                        <div className={`px-3 py-1 rounded-full text-[11px] font-medium ${statusColors[item.repoStatus]}`} > {item.repoStatus}     </div>
                                                                    </div>

                                                                    {/* BODY */}
                                                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-5 mt-6">
                                                                        <div>
                                                                            <p className="text-[11px] text-slate-500 uppercase tracking-wider"> Severity </p>
                                                                            <h3 className={`mt-1 text-sm font-semibold ${severityColors[item.severity]}`} > {item.severity} </h3>
                                                                        </div>

                                                                        <div>
                                                                            <p className="text-[11px] text-slate-500 uppercase tracking-wider"> CVE </p>
                                                                            <h3 className="mt-1 text-sm font-semibold text-white"> {item.cve} </h3>
                                                                        </div>
                                                                        <div>
                                                                            <p className="text-[11px] text-slate-500 uppercase tracking-wider"> Current Version </p>
                                                                            <h3 className="mt-1 text-sm font-semibold text-slate-200">{item.currentVersion} </h3>
                                                                        </div>

                                                                        <div>
                                                                            <p className="text-[11px] text-slate-500 uppercase tracking-wider"> Latest Version </p>
                                                                            <h3 className="mt-1 text-sm font-semibold text-cyan-400">{item.latestVersion} </h3>
                                                                        </div>

                                                                        <div>
                                                                            <p className="text-[11px] text-slate-500 uppercase tracking-wider"> Release Date </p>
                                                                            <h3 className="mt-1 text-sm font-semibold text-slate-200"> {item.releaseDate}</h3>
                                                                        </div>

                                                                        <div>
                                                                            <p className="text-[11px] text-slate-500 uppercase tracking-wider"> Package Size </p>
                                                                            <div className="mt-1 flex items-center gap-2 text-sm font-semibold text-slate-200">
                                                                                <HardDrive size={14} className="text-cyan-400" /> {item.size}
                                                                            </div>
                                                                        </div>

                                                                        <div>
                                                                            <p className="text-[11px] text-slate-500 uppercase tracking-wider"> Uploaded By </p>
                                                                            <h3 className="mt-1 text-sm font-semibold text-slate-200"> {item.uploadedBy} </h3>
                                                                        </div>

                                                                        <div>
                                                                            <p className="text-[11px] text-slate-500 uppercase tracking-wider"> Last Updated </p>
                                                                            <h3 className="mt-1 text-sm font-semibold text-slate-200">{item.lastUpdated}
                                                                            </h3>
                                                                        </div>
                                                                    </div>

                                                                    {/* FOOTER ACTIONS */}
                                                                    {/* <div className="flex items-center justify-between mt-7 pt-5 border-t border-white/10">
                                                                        <div className="flex items-center gap-3">
                                                                            <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/20 transition">
                                                                                <Download
                                                                                    size={16}
                                                                                    className="text-emerald-400"
                                                                                />

                                                                                <span className="text-sm text-emerald-300 font-medium">
                                                                                    Download Package
                                                                                </span>
                                                                            </button>

                                                                            <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/20 transition">
                                                                                <RefreshCw
                                                                                    size={15}
                                                                                    className="text-cyan-400"
                                                                                />

                                                                                <span className="text-sm text-cyan-300 font-medium">
                                                                                    Deploy Update
                                                                                </span>
                                                                            </button>
                                                                        </div>

                                                                        <button className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition">
                                                                            <MoreHorizontal size={18} />
                                                                        </button>
                                                                    </div> */}
                                                                </motion.div>
                                                            </td>
                                                        </motion.tr>
                                                    )}
                                                </AnimatePresence>


                                            </React.Fragment>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan="9"
                                                className="text-center py-20 text-slate-400"
                                            >
                                                No firmware packages available for this OEM.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* PAGINATION */}

                        {/* PAGINATION */}
                        <div className="flex justify-end items-center mt-3 px-2 flex-shrink-0">

                            {/* LEFT INFO */}
                            {/* <div className="text-[12px] text-slate-400">
    Showing{" "}
    <span className="text-cyan-400 font-medium">
      {tableData.length}
    </span>{" "}
    of{" "}
    <span className="text-cyan-400 font-medium">
      {filteredData.length}
    </span>{" "}
    packages
  </div> */}

                            {/* RIGHT PAGINATION */}
                            <div className="flex justify-end gap-2">

                                <button
                                    disabled={currentPage === 1}
                                    onClick={() => {
                                        setCurrentPage((p) => p - 1);
                                        setExpandedRow(null);
                                    }}
                                    className="px-3 py-1 text-sm bg-[#1e293b] rounded-lg disabled:opacity-40 hover:bg-[#334155] transition"
                                >
                                    Prev
                                </button>

                                <span className="text-sm px-2 py-1 text-slate-300">
                                    {currentPage} / {totalPages || 1}
                                </span>

                                <button
                                    disabled={currentPage === totalPages || totalPages === 0}
                                    onClick={() => {
                                        setCurrentPage((p) => p + 1);
                                        setExpandedRow(null);
                                    }}
                                    className="px-3 py-1 text-sm bg-[#1e293b] rounded-lg disabled:opacity-40 hover:bg-[#334155] transition"
                                >
                                    Next
                                </button>
                            </div>
                        </div>

                    </div>


                </div>
            </div>
        </div>
    );
};

export default FirmwareInventory;