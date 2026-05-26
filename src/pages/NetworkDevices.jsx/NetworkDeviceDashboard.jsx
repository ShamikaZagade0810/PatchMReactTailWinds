import React, { useMemo, useState } from "react";

const NetworkDeviceDashboard = () => {

    const networkdevicecount = [
        { id: 1, title: "Total Devices", count: 48 },
        { id: 2, title: "Outdated Devices", count: 12 },
        { id: 3, title: "Critical Vulnerabilities", count: 5 },
        { id: 4, title: "Backup Success Rate", count: "96%" }
    ];

    const DeviceInventoryTable = [
        { device: "FortiGate Firewall", vendor: "Fortinet", model: "30E", ipAddress: "192.168.1.1", currentFirmware: "7.0.8", latestFirmware: "7.0.12", status: "Critical", action: "Deploy Patch" },
        { device: "Core Switch", vendor: "Cisco", model: "Catalyst 2960", ipAddress: "192.168.1.10", currentFirmware: "15.2", latestFirmware: "15.2.7", status: "Outdated", action: "Deploy Patch" },
        { device: "Branch Router", vendor: "Juniper", model: "SRX300", ipAddress: "192.168.1.20", currentFirmware: "21.2R1", latestFirmware: "21.4R3", status: "Compliant", action: "Deploy Patch" },
        { device: "Wireless Controller", vendor: "Aruba", model: "7205", ipAddress: "192.168.1.50", currentFirmware: "8.6.0", latestFirmware: "8.10.0", status: "Medium", action: "Deploy Patch" },

        { device: "Edge Firewall", vendor: "Palo Alto", model: "PA-220", ipAddress: "192.168.1.60", currentFirmware: "10.1.5", latestFirmware: "10.1.11", status: "Critical", action: "Deploy Patch" },
        { device: "Distribution Switch", vendor: "Cisco", model: "Catalyst 9300", ipAddress: "192.168.1.11", currentFirmware: "17.3.2", latestFirmware: "17.9.4", status: "Outdated", action: "Deploy Patch" },
        { device: "Access Point Controller", vendor: "Ubiquiti", model: "UniFi Cloud Key", ipAddress: "192.168.1.70", currentFirmware: "6.2.25", latestFirmware: "6.5.62", status: "Medium", action: "Deploy Patch" },
        { device: "VPN Gateway", vendor: "Sophos", model: "XG 125", ipAddress: "192.168.1.80", currentFirmware: "18.0.4", latestFirmware: "19.0.1", status: "Critical", action: "Deploy Patch" },
        { device: "Datacenter Switch", vendor: "Arista", model: "7050X3", ipAddress: "192.168.1.90", currentFirmware: "4.24.1F", latestFirmware: "4.31.2F", status: "Outdated", action: "Deploy Patch" },
        { device: "Load Balancer", vendor: "F5", model: "BIG-IP i2600", ipAddress: "192.168.1.100", currentFirmware: "15.1.2", latestFirmware: "17.1.0", status: "Critical", action: "Deploy Patch" },
        { device: "Wireless Access Point", vendor: "Aruba", model: "AP-515", ipAddress: "192.168.1.110", currentFirmware: "8.7.0", latestFirmware: "8.10.0", status: "Outdated", action: "Deploy Patch" },
        { device: "Security Appliance", vendor: "Cisco", model: "ASA 5506-X", ipAddress: "192.168.1.120", currentFirmware: "9.12.3", latestFirmware: "9.18.2", status: "Critical", action: "Deploy Patch" },
        { device: "WAN Optimizer", vendor: "Riverbed", model: "SteelHead CX", ipAddress: "192.168.1.130", currentFirmware: "9.5.1", latestFirmware: "9.12.0", status: "Medium", action: "Deploy Patch" },
        { device: "Network IDS", vendor: "Snort", model: "NSM-500", ipAddress: "192.168.1.140", currentFirmware: "3.1.10", latestFirmware: "3.1.15", status: "Outdated", action: "Deploy Patch" },
        { device: "Proxy Server", vendor: "Blue Coat", model: "SG-S200", ipAddress: "192.168.1.150", currentFirmware: "6.7.4", latestFirmware: "7.3.1", status: "Critical", action: "Deploy Patch" },
        { device: "SD-WAN Router", vendor: "VMware", model: "Edge 620", ipAddress: "192.168.1.160", currentFirmware: "4.3.0", latestFirmware: "5.0.1", status: "Medium", action: "Deploy Patch" },
        { device: "Network Monitor", vendor: "SolarWinds", model: "NPM-300", ipAddress: "192.168.1.170", currentFirmware: "2023.2", latestFirmware: "2025.1", status: "Outdated", action: "Deploy Patch" },
        { device: "Firewall Cluster", vendor: "Check Point", model: "Quantum 6200", ipAddress: "192.168.1.180", currentFirmware: "R81.10", latestFirmware: "R82", status: "Critical", action: "Deploy Patch" },
        { device: "Core Router", vendor: "Huawei", model: "AR3260", ipAddress: "192.168.1.190", currentFirmware: "V300R019", latestFirmware: "V300R021", status: "Outdated", action: "Deploy Patch" }
    ];

    const ConfigurationHistorydata = [
        { device: "FortiGate Firewall", date: "26-May-2026 10:20 AM", status: "Success" },
        { device: "Core Switch", date: "26-May-2026 09:40 AM", status: "Success" },
        { device: "Wireless Controller", date: "25-May-2026 11:15 PM", status: "Failed" },

        { device: "Branch Router", date: "25-May-2026 08:30 PM", status: "Success" },
        { device: "Edge Firewall", date: "25-May-2026 06:10 PM", status: "Success" },
        { device: "Datacenter Switch", date: "25-May-2026 04:45 PM", status: "Failed" },
        { device: "VPN Gateway", date: "25-May-2026 02:20 PM", status: "Success" },
        { device: "Load Balancer", date: "25-May-2026 12:05 PM", status: "Success" },
        { device: "Access Point Controller", date: "24-May-2026 11:00 PM", status: "Failed" }
    ];
    const VulnerabilityMappingdata = [
        { cve: "CVE-2026-1001", device: "FortiGate Firewall", severity: "Critical" },
        { cve: "CVE-2026-2044", device: "Core Switch", severity: "High" },

        { cve: "CVE-2026-3055", device: "Wireless Controller", severity: "Medium" },
        { cve: "CVE-2026-4120", device: "Branch Router", severity: "High" },
        { cve: "CVE-2026-5188", device: "Edge Firewall", severity: "Critical" },
        { cve: "CVE-2026-6241", device: "Datacenter Switch", severity: "High" },
        { cve: "CVE-2026-7333", device: "VPN Gateway", severity: "Medium" }
    ];


    // ===== STATUS COLORS =====
    const getStatusColor = (status) => {
        switch (status) {
            case "Critical":
            case "Failed":
                return "px-2.5 py-1 rounded-full text-[12px] border bg-red-500/10 text-red-400 border-red-500/20";
            case "Outdated":
            case "High":
                return "px-2.5 py-1 rounded-full text-[12px]  border bg-orange-500/10 text-orange-400 border-orange-500/20";
            case "Medium":
                return "px-2.5 py-1 rounded-full text-[12px]  border bg-yellow-500/10 text-yellow-300 border-yellow-500/20";
            case "Compliant":
            case "Success":
                return "px-2.5 py-1 rounded-full text-[12px]  border bg-green-500/10 text-green-400 border-green-500/20";

            default:
                return "px-2.5 py-1 rounded-full text-[12px]  border bg-gray-500/10 text-gray-300 border-gray-500/20";
        }
    };

    // ===== SEARCH + PAGINATION STATE =====
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10;

    // ===== FILTER DATA =====
    const filteredData = useMemo(() => {
        return DeviceInventoryTable.filter((item) =>
            Object.values(item)
                .join(" ")
                .toLowerCase()
                .includes(search.toLowerCase())
        );
    }, [search, DeviceInventoryTable]);

    // reset page on search
    React.useEffect(() => {
        setCurrentPage(1);
    }, [search]);

    // ===== PAGINATION =====
    const totalPages = Math.ceil(filteredData.length / rowsPerPage);

    const paginatedData = useMemo(() => {
        const start = (currentPage - 1) * rowsPerPage;
        return filteredData.slice(start, start + rowsPerPage);
    }, [filteredData, currentPage]);

    return (
        //    <div className="p-6 bg-[#0f172a] min-h-screen text-white space-y-6">
        <div className="p-2 min-h-screen text-white space-y-4">
            {/* ===== Row 1: Summary Cards ===== */}
   {/* ===== Row 1: Summary Cards ===== */}
<div className="grid grid-cols-1 md:grid-cols-4 gap-4">

    {networkdevicecount.map((item) => {

        const cardStyles = {
            1: "text-cyan-400 hover:border-cyan-500 hover:shadow-cyan-500/30",
            2: "text-orange-400 hover:border-orange-500 hover:shadow-orange-500/30",
            3: "text-red-400 hover:border-red-500 hover:shadow-red-500/30",
            4: "text-green-400 hover:border-green-500 hover:shadow-green-500/30",
        };

        return (
            <div
                key={item.id}
                className={` bg-[#0f172a] p-4 rounded-xl border border-transparent shadow-none transition-all duration-300
                    hover:-translate-y-1 hover:shadow-lg ${cardStyles[item.id]} `} >
                <p className="text-sm opacity-80"> {item.title} </p>
                <h2 className="text-2xl font-bold mt-1"> {item.count} </h2>
            </div>
        );
    })}
</div>

            {/* ===== Row 2 ===== */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 items-stretch">

                {/* LEFT: DEVICE TABLE */}
                <div className="lg:col-span-2 bg-[#0f172a] p-4 rounded-xl flex flex-col max-h-[600px]">

                    {/* FIXED TITLE */}
                    <h2 className="text-lg font-semibold mb-3 flex-shrink-0">
                        Device Inventory
                    </h2>

                    {/* SEARCH + COUNT ROW */}
                    <div className="flex justify-between items-center mb-3 flex-shrink-0">

                        {/* SEARCH */}
                        <input type="text" placeholder="Search devices..." value={search} onChange={(e) => setSearch(e.target.value)}
                            className="w-1/2 px-3 py-2 text-sm rounded-lg bg-[#1e293b] text-white outline-none border border-gray-700" />

                        {/* SHOWING TEXT */}
                        <div className="text-sm text-gray-400"> Showing {paginatedData.length} of {filteredData.length} </div>
                    </div>

                    {/* TABLE WRAPPER */}
                    <div className="overflow-y-auto flex-1 rounded-lg border border-gray-700 hide-scrollbar">

                        <table className="w-full text-sm">

                            {/* HEADER */}
                            <thead className="bg-[#1e293b] text-gray-300 sticky top-0">
                                <tr>
                                    <th className="py-3 px-3 text-left">Device</th>
                                    <th className="py-3 px-3 text-left">Vendor</th>
                                    <th className="py-3 px-3 text-left">IP</th>
                                    <th className="py-3 px-3 text-left">Current</th>
                                    <th className="py-3 px-3 text-left">Latest</th>
                                    <th className="py-3 px-3 text-left">Status</th>
                                </tr>
                            </thead>

                            {/* BODY */}
                            <tbody>
                                {paginatedData.map((d, i) => (
                                    <tr key={i} className="border-b border-gray-800 hover:bg-[#1f2a3a] transition" >
                                        <td className="py-2 px-3">{d.device}</td>
                                        <td className="px-3">{d.vendor}</td>
                                        <td className="px-3">{d.ipAddress}</td>
                                        <td className="px-3">{d.currentFirmware}</td>
                                        <td className="px-3">{d.latestFirmware}</td>
                                        <td className="px-3">
                                            <span className={getStatusColor(d.status)}> {d.status} </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* PAGINATION */}
                    <div className="flex justify-end gap-2 mt-3 flex-shrink-0">
                        <button disabled={currentPage === 1} onClick={() => setCurrentPage((p) => p - 1)}
                            className="px-3 py-1 text-sm bg-[#1e293b] rounded disabled:opacity-40" > Prev
                        </button>

                        <span className="text-sm px-2 py-1"> {currentPage} / {totalPages || 1} </span>

                        <button disabled={currentPage === totalPages} onClick={() => setCurrentPage((p) => p + 1)}
                            className="px-3 py-1 text-sm bg-[#1e293b] rounded disabled:opacity-40" > Next
                        </button>
                    </div>
                </div>


                {/* RIGHT COLUMN */}
                <div className="flex flex-col gap-6 h-[650px]">
                    {/* ===== Configuration History CARD ===== */}
                    {/* ===== Configuration History CARD ===== */}
                    <div className="bg-[#0f172a] p-4 rounded-xl flex flex-col max-h-[300px]">

                        {/* FIXED TITLE */}
                        <h2 className="text-lg font-semibold flex-shrink-0">
                            Configuration Backup History
                        </h2>

                        {/* DIVIDER */}
                        <div className="h-px bg-gray-800 my-3"></div>

                        {/* SCROLL AREA */}
                        <div className="overflow-y-auto pr-2 space-y-3 hide-scrollbar">
                            {ConfigurationHistorydata.map((item, i) => (
                                <div
                                    key={i}
                                    className="flex justify-between items-start text-sm border-b border-gray-800 pb-2"
                                >
                                    <div>
                                        <p>{item.device}</p>
                                        <p className="text-gray-400 text-xs">{item.date}</p>
                                    </div>

                                    <span className={getStatusColor(item.status)}> {item.status} </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ===== Vulnerability Mapping CARD ===== */}
                    {/* ===== Vulnerability Mapping CARD ===== */}
                    <div className="bg-[#0f172a] p-4 rounded-xl flex flex-col max-h-[300px]">

                        {/* FIXED TITLE */}
                        <h2 className="text-lg font-semibold flex-shrink-0">
                            Vulnerability Mapping
                        </h2>

                        {/* DIVIDER */}
                        <div className="h-px bg-gray-800 my-3"></div>

                        {/* SCROLL AREA */}
                        <div className="overflow-y-auto pr-2 space-y-3 hide-scrollbar">
                            {VulnerabilityMappingdata.map((item, i) => (
                                <div
                                    key={i}
                                    className="flex justify-between items-start text-sm border-b border-gray-800 pb-2"
                                >
                                    <div>
                                        <p className="font-medium">{item.cve}</p>
                                        <p className="text-gray-400 text-xs">{item.device}</p>
                                    </div>

                                    <span className={getStatusColor(item.severity)}> {item.severity} </span>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default NetworkDeviceDashboard
