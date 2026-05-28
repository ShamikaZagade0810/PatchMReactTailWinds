import React from "react";
import {
    ShieldAlert,
    Upload,
    Database,
    FileArchive,
    RefreshCcw,
    AlertTriangle,
    CheckCircle2,
} from "lucide-react";

export default function NewFirmwareInventoryDashboard() {

    const firmwareRepository = [
        {
            fileName: "FGT_7.0.12-build0456-FORTINET.out",
            vendor: "Fortinet",
            product: "FortiGate",
            platform: "FGT-30E / 40F / 60F",
            version: "7.0.12",
            releaseDate: "20-May-2026",
            size: "1.4 GB",
            checksum: "SHA256:A1B2-C3D4-E5F6-G7H8",
            severity: "Critical",
            cveFixed: 14,
            approval: "Approved",
        },

        {
            fileName: "cat9k_iosxe.17.09.04a.SPA.bin",
            vendor: "Cisco",
            product: "Catalyst Switches",
            platform: "9200 / 9300",
            version: "17.9.4a",
            releaseDate: "18-May-2026",
            size: "850 MB",
            checksum: "SHA256:X7Y8-Z9K0-L1M2",
            severity: "High",
            cveFixed: 9,
            approval: "Approved",
        },

        {
            fileName: "junos-srxsme-21.4R3-S2.5.tgz",
            vendor: "Juniper",
            product: "SRX Firewall",
            platform: "SRX300 / SRX320",
            version: "21.4R3-S2.5",
            releaseDate: "10-May-2026",
            size: "2.1 GB",
            checksum: "SHA256:P9Q8-R7S6-T5U4",
            severity: "Medium",
            cveFixed: 6,
            approval: "Approved",
        },

        {
            fileName: "ArubaOS_8.10.0.1_91111.img",
            vendor: "Aruba",
            product: "Mobility Controller",
            platform: "7205 / 7210",
            version: "8.10.0.1",
            releaseDate: "22-May-2026",
            size: "1.9 GB",
            checksum: "SHA256:A8B7-C6D5-E4F3",
            severity: "Medium",
            cveFixed: 3,
            approval: "Testing",
        },

        {
            fileName: "PanOS_10.1.11-h3_release.img",
            vendor: "Palo Alto",
            product: "PA-Series Firewall",
            platform: "PA-220 / PA-440",
            version: "10.1.11-h3",
            releaseDate: "16-May-2026",
            size: "2.6 GB",
            checksum: "SHA256:F4E5-D6C7-B8A9",
            severity: "Critical",
            cveFixed: 11,
            approval: "Approved",
        },

        {
            fileName: "BIGIP-17.1.0.0.0.19.iso",
            vendor: "F5",
            product: "BIG-IP",
            platform: "i2600 / i4600",
            version: "17.1.0",
            releaseDate: "12-May-2026",
            size: "3.0 GB",
            checksum: "SHA256:Y3Z4-A5B6-C7D8",
            severity: "Critical",
            cveFixed: 17,
            approval: "Approved",
        },

        {
            fileName: "EOS-4.31.2F.swi",
            vendor: "Arista",
            product: "EOS Switches",
            platform: "7050X / 7280R",
            version: "4.31.2F",
            releaseDate: "25-May-2026",
            size: "980 MB",
            checksum: "SHA256:S7T8-U9V0-W1X2",
            severity: "High",
            cveFixed: 5,
            approval: "Approved",
        },

        {
            fileName: "PulseSecure_PSA_9.1R16.pkg",
            vendor: "Pulse Secure",
            product: "VPN Gateway",
            platform: "PSA-5000",
            version: "9.1R16",
            releaseDate: "07-May-2026",
            size: "1.1 GB",
            checksum: "SHA256:H7I8-J9K0-L1M2",
            severity: "Critical",
            cveFixed: 12,
            approval: "Approved",
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

            default:
                return "bg-green-500/10 text-green-400";
        }
    };

    return (
        <div className="p-4 min-h-screen bg-[#020817] text-white space-y-4">

            {/* ===== HEADER ===== */}
            <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">

                <div>
                    <h1 className="text-3xl font-bold">
                        Enterprise Firmware Repository
                    </h1>

                    <p className="text-gray-400 mt-1">
                        OEM firmware lifecycle & patch repository management
                    </p>
                </div>

                <div className="flex gap-3">
                    <button className="bg-cyan-600 hover:bg-cyan-700 px-5 py-2 rounded-xl text-sm flex items-center gap-2">
                        <RefreshCcw size={16} />
                        Sync OEM Repository
                    </button>

                    <button className="bg-[#1e293b] hover:bg-[#263548] border border-gray-700 px-5 py-2 rounded-xl text-sm flex items-center gap-2">
                        <Upload size={16} />
                        Upload Firmware
                    </button>
                </div>
            </div>

            {/* ===== SUMMARY ===== */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">

                {[
                    {
                        title: "Repository Files",
                        count: 248,
                        color: "text-cyan-400",
                        icon: <Database size={22} />,
                    },

                    {
                        title: "Critical Patches",
                        count: 38,
                        color: "text-red-400",
                        icon: <ShieldAlert size={22} />,
                    },

                    {
                        title: "Pending Approval",
                        count: 12,
                        color: "text-orange-400",
                        icon: <AlertTriangle size={22} />,
                    },

                    {
                        title: "Verified Packages",
                        count: "96%",
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

            {/* ===== SEARCH ===== */}
            <div className="bg-[#0f172a] border border-gray-800 rounded-2xl p-4">

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

                    <input
                        type="text"
                        placeholder="Search firmware package..."
                        className="bg-[#1e293b] border border-gray-700 rounded-xl px-4 py-3 text-sm outline-none"
                    />

                    <select className="bg-[#1e293b] border border-gray-700 rounded-xl px-4 py-3 text-sm outline-none">
                        <option>All Vendors</option>
                        <option>Cisco</option>
                        <option>Fortinet</option>
                        <option>Juniper</option>
                        <option>Palo Alto</option>
                    </select>

                    <select className="bg-[#1e293b] border border-gray-700 rounded-xl px-4 py-3 text-sm outline-none">
                        <option>All Severity</option>
                        <option>Critical</option>
                        <option>High</option>
                        <option>Medium</option>
                    </select>

                    <button className="bg-cyan-600 hover:bg-cyan-700 rounded-xl text-sm">
                        Search Repository
                    </button>

                </div>
            </div>

            {/* ===== REPOSITORY TABLE ===== */}
            <div className="bg-[#0f172a] border border-gray-800 rounded-2xl overflow-hidden">

                <div className="p-4 border-b border-gray-800 flex justify-between items-center">

                    <div>
                        <h2 className="text-xl font-semibold">
                            OEM Firmware Packages
                        </h2>

                        <p className="text-gray-400 text-sm mt-1">
                            Enterprise approved firmware repository
                        </p>
                    </div>

                    <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-xl text-sm">
                        Add Package
                    </button>

                </div>

                <div className="overflow-auto max-h-[650px]">

                    <table className="w-full text-sm">

                        <thead className="bg-[#1e293b] sticky top-0 z-10">

                            <tr>
                                <th className="text-left py-3 px-4">Firmware File</th>
                                <th className="text-left py-3 px-4">Vendor</th>
                                <th className="text-left py-3 px-4">Product</th>
                                <th className="text-left py-3 px-4">Platform</th>
                                <th className="text-left py-3 px-4">Version</th>
                                <th className="text-left py-3 px-4">Release Date</th>
                                <th className="text-left py-3 px-4">Size</th>
                               {/* <th className="text-left py-3 px-4">CVEs</th>
                                <th className="text-left py-3 px-4">Severity</th>
                                <th className="text-left py-3 px-4">Approval</th>
                                <th className="text-left py-3 px-4">Action</th> */}
                            </tr>

                        </thead>

                        <tbody>

                            {firmwareRepository.map((file, index) => (
                                <tr
                                    key={index}
                                    className="border-b border-gray-800 hover:bg-[#111c2d]"
                                >

                                    <td className="py-4 px-4 font-medium">

                                        <div className="flex items-center gap-2">
                                            <FileArchive size={16} className="text-cyan-400" />

                                            <div>
                                                <p>{file.fileName}</p>

                                                <p className="text-xs text-gray-500 mt-1">
                                                    {file.checksum}
                                                </p>
                                            </div>
                                        </div>

                                    </td>

                                    <td className="px-4">{file.vendor}</td>

                                    <td className="px-4">{file.product}</td>

                                    <td className="px-4 text-gray-400">
                                        {file.platform}
                                    </td>

                                    <td className="px-4 text-cyan-400">
                                        {file.version}
                                    </td>

                                    <td className="px-4 text-gray-400">
                                        {file.releaseDate}
                                    </td>

                                    <td className="px-4">
                                        {file.size}
                                    </td>

                                    {/* <td className="px-4 text-red-400 font-medium">
                                        {file.cveFixed}
                                    </td>

                                    <td className="px-4">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-medium ${getSeverityColor(
                                                file.severity
                                            )}`}
                                        >
                                            {file.severity}
                                        </span>
                                    </td>

                                    <td className="px-4">

                                        <span className="bg-green-500/10 text-green-400 px-3 py-1 rounded-full text-xs font-medium">
                                            {file.approval}
                                        </span>

                                    </td>

                                    <td className="px-4">

                                        <button className="bg-cyan-600 hover:bg-cyan-700 px-4 py-2 rounded-lg text-xs">
                                            Deploy
                                        </button>

                                    </td> */}

                                </tr>
                            ))}

                        </tbody>

                    </table>

                </div>
            </div>

            {/* ===== LOGS ===== */}
            <div className="bg-[#0f172a] border border-gray-800 rounded-2xl p-4">

                <div className="flex items-center justify-between mb-4">

                    <div>
                        <h2 className="text-xl font-semibold">
                            Repository Synchronization Logs
                        </h2>

                        <p className="text-gray-400 text-sm mt-1">
                            Real-time OEM repository synchronization events
                        </p>
                    </div>

                    <button className="bg-[#1e293b] hover:bg-[#263548] border border-gray-700 px-4 py-2 rounded-xl text-sm">
                        Export Logs
                    </button>
                </div>

                <div className="bg-[#020c22] rounded-xl p-4 h-[260px] overflow-y-auto border border-[#112240]">

                    <div className="space-y-2 font-mono text-sm text-green-400">

                        <p>[INFO] OEM repository synchronization started</p>

                        <p>[INFO] Cisco IOS-XE firmware imported successfully</p>

                        <p>[SUCCESS] Palo Alto hotfix verification completed</p>

                        <p>[WARNING] Aruba firmware pending approval workflow</p>

                        <p>[INFO] SHA256 checksum validation completed</p>

                        <p>[ALERT] Critical Fortinet security update detected</p>

                        <p>[SUCCESS] Repository metadata synchronized</p>

                        <p>[INFO] 248 firmware packages available</p>

                    </div>

                </div>
            </div>
                                    
        </div>
    );
}