import React from "react";
import {
    ShieldAlert,
    Upload,
    Cpu,
    AlertTriangle,
    CheckCircle2,
    Database,
    FileArchive,
    RefreshCcw,
} from "lucide-react";

export default function NewFirmwareInventoryDashboard() {
    const firmwareInventory = [
        {
            device: "FortiGate Firewall",
            vendor: "Fortinet",
            model: "30E",
            currentVersion: "7.0.8",
            latestVersion: "7.0.12",
            releaseDate: "12-Apr-2026",
            vulnerability: "Critical",
            compliance: "Outdated",
        },
        {
            device: "Core Switch",
            vendor: "Cisco",
            model: "Catalyst 2960",
            currentVersion: "15.2",
            latestVersion: "15.2.7",
            releaseDate: "22-Mar-2026",
            vulnerability: "High",
            compliance: "Outdated",
        },
        {
            device: "Branch Router",
            vendor: "Juniper",
            model: "SRX300",
            currentVersion: "21.4R3",
            latestVersion: "21.4R3",
            releaseDate: "18-Feb-2026",
            vulnerability: "None",
            compliance: "Compliant",
        },
        {
            device: "Wireless Controller",
            vendor: "Aruba",
            model: "7205",
            currentVersion: "8.6.0",
            latestVersion: "8.10.0",
            releaseDate: "11-May-2026",
            vulnerability: "Medium",
            compliance: "Outdated",
        },
    ];

    const firmwareRepository = [
        {
            fileName: "FortiOS-7.0.12.img",
            vendor: "Fortinet",
            size: "1.4 GB",
            checksum: "SHA256-A1B2C3D4",
            uploadDate: "20-May-2026",
        },
        {
            fileName: "Cisco-IOS-15.2.7.bin",
            vendor: "Cisco",
            size: "850 MB",
            checksum: "SHA256-X7Y8Z9K0",
            uploadDate: "18-May-2026",
        },
        {
            fileName: "JunOS-21.4R3.tgz",
            vendor: "Juniper",
            size: "2.1 GB",
            checksum: "SHA256-P9Q8R7S6",
            uploadDate: "10-May-2026",
        },
    ];

    const getSeverityColor = (value) => {
        switch (value) {
            case "Critical":
                return "bg-red-500/10 text-red-400";

            case "High":
                return "bg-orange-500/10 text-orange-400";

            case "Medium":
                return "bg-yellow-500/10 text-yellow-400";

            case "Compliant":
            case "None":
                return "bg-green-500/10 text-green-400";

            case "Outdated":
                return "bg-red-500/10 text-red-400";

            default:
                return "bg-gray-500/10 text-gray-300";
        }
    };

    return (
        <div className="p-3 min-h-screen text-white space-y-4">

            {/* ===== HEADER ===== */}
            <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">



                <div className="flex gap-3">
                    <button className="bg-cyan-600 hover:bg-cyan-700 px-5 py-2 rounded-xl text-sm flex items-center gap-2">
                        <RefreshCcw size={16} />
                        Scan Firmware
                    </button>

                    <button className="bg-[#1e293b] hover:bg-[#263548] border border-gray-700 px-5 py-2 rounded-xl text-sm flex items-center gap-2">
                        <Upload size={16} />
                        Upload Firmware
                    </button>
                </div>
            </div>

            {/* ===== SUMMARY CARDS ===== */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">

                {[
                    {
                        title: "Managed Devices",
                        count: 48,
                        color: "text-cyan-400",
                        icon: <Database size={22} />,
                    },
                    {
                        title: "Outdated Firmware",
                        count: 12,
                        color: "text-red-400",
                        icon: <AlertTriangle size={22} />,
                    },
                    {
                        title: "Critical CVEs",
                        count: 5,
                        color: "text-orange-400",
                        icon: <ShieldAlert size={22} />,
                    },
                    {
                        title: "Compliance Score",
                        count: "82%",
                        color: "text-green-400",
                        icon: <CheckCircle2 size={22} />,
                    },
                ].map((item, index) => (
                    <div
                        key={index}
                        className="bg-[#0f172a] border border-gray-800 rounded-2xl p-5"
                    >
                        <div className="flex justify-between items-center">

                            <div>
                                <p className="text-gray-400 text-sm">
                                    {item.title}
                                </p>

                                <h2 className={`text-3xl font-bold mt-3 ${item.color}`}>
                                    {item.count}
                                </h2>
                            </div>

                            <div className="w-12 h-12 rounded-xl bg-[#1e293b] flex items-center justify-center text-cyan-400">
                                {item.icon}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* ===== INVENTORY TABLE ===== */}
            <div className="bg-[#0f172a] border border-gray-800 rounded-2xl p-4 flex flex-col h-[300px]">

                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 mb-4">



                    <div className="flex gap-3">
                        <input
                            type="text"
                            placeholder="Search firmware..."
                            className="bg-[#1e293b] border border-gray-700 rounded-xl px-4 py-2 text-sm outline-none"
                        />

                        <select className="bg-[#1e293b] border border-gray-700 rounded-xl px-4 py-2 text-sm outline-none">
                            <option>All Vendors</option>
                            <option>Fortinet</option>
                            <option>Cisco</option>
                            <option>Juniper</option>
                            <option>Aruba</option>
                        </select>
                    </div>
                </div>

                <div className="overflow-auto hide-scrollbar rounded-xl border border-gray-800 flex-1">

                    <table className="w-full text-sm">

                        <thead className="bg-[#1e293b] sticky top-0 z-10">
                            <tr>
                                <th className="text-left py-3 px-4">Device</th>
                                <th className="text-left py-3 px-4">Vendor</th>
                                <th className="text-left py-3 px-4">Model</th>
                                <th className="text-left py-3 px-4">Current</th>
                                <th className="text-left py-3 px-4">Latest</th>
                                <th className="text-left py-3 px-4">Release Date</th>
                                <th className="text-left py-3 px-4">Vulnerability</th>
                                <th className="text-left py-3 px-4">Compliance</th>
                                <th className="text-left py-3 px-4">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {firmwareInventory.map((item, index) => (
                                <tr
                                    key={index}
                                    className="border-b border-gray-800 hover:bg-[#111c2d]"
                                >
                                    <td className="py-3 px-4 font-medium">
                                        {item.device}
                                    </td>

                                    <td className="px-4">{item.vendor}</td>

                                    <td className="px-4">{item.model}</td>

                                    <td className="px-4">{item.currentVersion}</td>

                                    <td className="px-4 text-cyan-400">
                                        {item.latestVersion}
                                    </td>

                                    <td className="px-4 text-gray-400">
                                        {item.releaseDate}
                                    </td>

                                    <td className="px-4">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-medium ${getSeverityColor(
                                                item.vulnerability
                                            )}`}
                                        >
                                            {item.vulnerability}
                                        </span>
                                    </td>

                                    <td className="px-4">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-medium ${getSeverityColor(
                                                item.compliance
                                            )}`}
                                        >
                                            {item.compliance}
                                        </span>
                                    </td>

                                    <td className="px-4">
                                        <button className="bg-cyan-600 hover:bg-cyan-700 px-4 py-2 rounded-lg text-xs">
                                            Upgrade
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>
            </div>

            {/* ===== SECOND ROW ===== */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">

                {/* ===== REPOSITORY FILES ===== */}
                <div className="bg-[#0f172a] border border-gray-800 rounded-2xl flex flex-col">

                    <div className="p-4 border-b border-gray-800 flex justify-between items-center">
                        <div>
                            <h2 className="text-xl font-semibold">
                                Firmware Repository Files
                            </h2>

                            <p className="text-gray-400 text-sm mt-1">
                                Approved firmware storage repository
                            </p>
                        </div>

                        <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-xl text-sm">
                            Add File
                        </button>
                    </div>

                    <div className="divide-y divide-gray-800">
                        {firmwareRepository.map((file, index) => (
                            <div
                                key={index}
                                className="p-4 hover:bg-[#111c2d] transition"
                            >
                                <div className="flex justify-between items-start">

                                    <div>
                                        <div className="flex items-center gap-2">
                                            <FileArchive size={16} className="text-cyan-400" />

                                            <h3 className="font-medium text-md">
                                                {file.fileName}
                                            </h3>
                                        </div>

                                        <p className="text-xs text-gray-400 mt-2">
                                            {file.vendor} • Uploaded on {file.uploadDate}
                                        </p>
                                    </div>

                                    <div className="text-right">
                                        <p className="font-normal">{file.size}</p>

                                        <p className="text-xs text-gray-500 mt-1">
                                            {file.checksum}
                                        </p>
                                    </div>

                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="bg-[#0f172a] border border-gray-800 rounded-2xl p-4">

                    <div className="flex items-center justify-between mb-4">

                        <div>
                            <h2 className="text-xl font-semibold">
                                Firmware Vulnerability Event Logs
                            </h2>

                            <p className="text-gray-400 text-sm mt-1">
                                Real-time firmware monitoring & detection logs
                            </p>
                        </div>

                        <button className="bg-[#1e293b] hover:bg-[#263548] border border-gray-700 px-4 py-2 rounded-xl text-sm">
                            Export Report
                        </button>
                    </div>

                    <div className="bg-[#020c22] rounded-xl p-4 h-[260px] overflow-y-auto hide-scrollbar border border-[#112240]">

                        <div className="space-y-2 font-mono text-sm text-green-400">

                            <p>[INFO] Firmware inventory scan started</p>

                            <p>[INFO] 48 devices scanned successfully</p>

                            <p>[WARNING] FortiGate Firewall running outdated firmware 7.0.8</p>

                            <p>[ALERT] Critical CVE detected in Cisco IOS 15.2</p>

                            <p>[INFO] Firmware compliance report generated</p>

                            <p>[SUCCESS] Firmware repository synchronized</p>

                            <p>[INFO] Upload verification checksum completed</p>

                            <p>[WARNING] Aruba Controller requires immediate upgrade</p>

                            <p>[SUCCESS] Vulnerability mapping completed</p>

                        </div>
                    </div>
                </div>
                {/* ===== WORKFLOW ===== */}

            </div>


        </div>
    );
}