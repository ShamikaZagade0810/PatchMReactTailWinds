import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Monitor, ShieldAlert, AlertTriangle,
    DatabaseBackup, X
} from "lucide-react";


const DeviceInventory = () => {

    const navigate = useNavigate();

    const networkdevicecount = [
        { id: 1, title: "Total Devices", count: 48 },
        { id: 2, title: "Outdated Devices", count: 12 },
        { id: 3, title: "Critical Vulnerabilities", count: 5 },
        { id: 4, title: "Backup Success Rate", count: "96%" }
    ];

    const getRandomFutureTime = () => {
        const now = new Date();

        // random 1 to 6 hours in future
        const randomHours = Math.floor(Math.random() * 6) + 1;
        const randomMinutes = Math.floor(Math.random() * 60);

        const future = new Date(
            now.getTime() + randomHours * 60 * 60 * 1000 + randomMinutes * 60 * 1000
        );

        return future.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        });
    };




    const NetworkDevice = [
        {
            deviceData: {
                deviceId: "DEV-RT-11021",
                hostname: "MUM-EDGE-RTR-01",
                ipAddress: "10.10.14.1",
                macAddress: "3C:8D:20:7A:91:EF",
                vendor: "Cisco",
                deviceType: "Router",
                model: "ISR4451-X/K9",
                serialNumber: "FGL2510ABCD",
                vulnerabilityCount: 3,
                riskLevel: "Critical",
                os: "Cisco IOS XE",
                currentVersion: "17.6.4",
                latestVersion: "17.12.3",
                compliance: "Outdated",
                lastScan: "2026-05-28 09:21:12",
                location: "Mumbai Data Center"
            },

            firmwareInformation: {
                version: "17.12.3",
                releaseDate: "2026-04-16",
                releaseType: "Critical Security Release",
                fileName: "isr4400-universalk9.17.12.03.SPA.bin",
                fileSize: "1.9 GB",
                checksumVerified: true,
                rebootRequired: true,
                estimatedDowntime: "9 Minutes"
            },

            vulnerabilities: [
                {
                    cveId: "CVE-2026-2145",
                    severity: "Critical",
                    cvssScore: 9.8,
                    status: "Affected",
                    description: "Remote code execution vulnerability in web management interface."
                },
                {
                    cveId: "CVE-2026-3301",
                    severity: "High",
                    cvssScore: 8.7,
                    status: "Affected",
                    description: "Privilege escalation vulnerability in IOS XE API service."
                },
                {
                    cveId: "CVE-2025-9981",
                    severity: "Medium",
                    cvssScore: 6.9,
                    status: "Affected",
                    description: "SNMP information disclosure issue."
                }
            ],

            recentActivities: [
                {
                    time: "2026-05-28 09:21:12",
                    activity: "Firmware Compliance Scan Completed",
                    status: "Success"
                },
                {
                    time: "2026-05-28 08:58:42",
                    activity: "Critical Vulnerability Match Found",
                    status: "Warning"
                }
            ]
        },
        {
            deviceData: {
                deviceId: "DEV-FW-99008",
                hostname: "BLR-FW-EDGE-02",
                ipAddress: "10.45.0.2",
                macAddress: "18:E7:28:FA:44:91",
                vendor: "Palo Alto Networks",
                deviceType: "Firewall",
                model: "PA-3220",
                serialNumber: "PA3220BLR9908",
                vulnerabilityCount: 0,
                riskLevel: "Low",
                os: "PAN-OS",
                currentVersion: "11.1.2",
                latestVersion: "11.1.2",
                compliance: "Compliant",
                lastScan: "2026-05-28 10:31:17",
                location: "Bangalore Edge DC"
            },

            firmwareInformation: {
                version: "11.1.2",
                releaseDate: "2026-03-11",
                releaseType: "Preferred Stable Release",
                fileName: "PanOS_vm-11.1.2.img",
                fileSize: "1.7 GB",
                checksumVerified: true,
                rebootRequired: false,
                estimatedDowntime: "0 Minutes"
            },

            vulnerabilities: [],

            recentActivities: [
                {
                    time: "2026-05-28 10:31:17",
                    activity: "Threat Prevention Signature Updated",
                    status: "Success"
                },
                {
                    time: "2026-05-28 10:02:09",
                    activity: "Compliance Baseline Verified",
                    status: "Success"
                }
            ]
        },


        {
            deviceData: {
                deviceId: "DEV-FW-22019",
                hostname: "PUNE-FW-CORE-01",
                ipAddress: "10.40.2.254",
                macAddress: "58:AC:78:11:2F:AB",
                vendor: "Fortinet",
                deviceType: "Firewall",
                model: "FortiGate 200F",
                serialNumber: "FG200FTK22001992",
                vulnerabilityCount: 2,
                riskLevel: "Critical",
                os: "FortiOS",
                currentVersion: "7.0.9",
                latestVersion: "7.2.7",
                compliance: "Outdated",
                lastScan: "2026-05-28 10:11:02",
                location: "Pune HQ"
            },

            firmwareInformation: {
                version: "7.2.7",
                releaseDate: "2026-03-21",
                releaseType: "Security & Stability Release",
                fileName: "FGT_200F-v7.2.7-build1624-FORTINET.out",
                fileSize: "2.3 GB",
                checksumVerified: true,
                rebootRequired: true,
                estimatedDowntime: "7 Minutes"
            },

            vulnerabilities: [
                {
                    cveId: "CVE-2026-4421",
                    severity: "Critical",
                    cvssScore: 9.4,
                    status: "Affected",
                    description: "Authentication bypass in SSL VPN service."
                },
                {
                    cveId: "CVE-2026-5518",
                    severity: "High",
                    cvssScore: 8.2,
                    status: "Affected",
                    description: "Improper session validation vulnerability."
                }
            ],

            recentActivities: [
                {
                    time: "2026-05-28 10:11:02",
                    activity: "Threat Intelligence Feed Synced",
                    status: "Success"
                },
                {
                    time: "2026-05-28 09:42:15",
                    activity: "SSL VPN Vulnerability Detected",
                    status: "Warning"
                }
            ]
        },

        {
            deviceData: {
                deviceId: "DEV-SW-33012",
                hostname: "BLR-ACCESS-SW-12",
                ipAddress: "10.60.8.22",
                macAddress: "94:B4:0F:2C:AA:19",
                vendor: "Aruba",
                deviceType: "Switch",
                model: "Aruba CX 6300M",
                serialNumber: "SG92JKL1201",
                vulnerabilityCount: 1,
                riskLevel: "Medium",
                os: "ArubaOS-CX",
                currentVersion: "10.10.1010",
                latestVersion: "10.13.0005",
                compliance: "Outdated",
                lastScan: "2026-05-28 07:44:55",
                location: "Bangalore Branch"
            },

            firmwareInformation: {
                version: "10.13.0005",
                releaseDate: "2026-01-12",
                releaseType: "Maintenance Release",
                fileName: "ArubaCX_6300M_10_13_0005.swi",
                fileSize: "1.1 GB",
                checksumVerified: true,
                rebootRequired: true,
                estimatedDowntime: "5 Minutes"
            },

            vulnerabilities: [
                {
                    cveId: "CVE-2025-7711",
                    severity: "Medium",
                    cvssScore: 6.5,
                    status: "Affected",
                    description: "Web UI session handling vulnerability."
                }
            ],

            recentActivities: [
                {
                    time: "2026-05-28 07:44:55",
                    activity: "Switch Health Audit Completed",
                    status: "Success"
                },
                {
                    time: "2026-05-28 07:01:14",
                    activity: "Configuration Drift Detected",
                    status: "Warning"
                }
            ]
        },

        {
            deviceData: {
                deviceId: "DEV-WLC-44011",
                hostname: "DEL-WLC-CORE-01",
                ipAddress: "10.80.1.20",
                macAddress: "40:55:39:9D:AB:44",
                vendor: "Cisco",
                deviceType: "Wireless Controller",
                model: "Catalyst 9800-L",
                serialNumber: "FCW9876XYZ12",
                vulnerabilityCount: 4,
                riskLevel: "Critical",
                os: "Cisco IOS XE Wireless",
                currentVersion: "17.9.2",
                latestVersion: "17.12.2",
                compliance: "Outdated",
                lastScan: "2026-05-28 11:26:18",
                location: "Delhi Corporate Office"
            },

            firmwareInformation: {
                version: "17.12.2",
                releaseDate: "2026-04-28",
                releaseType: "Critical Security Update",
                fileName: "c9800-l-universalk9_wlc.17.12.02.SPA.bin",
                fileSize: "2.5 GB",
                checksumVerified: true,
                rebootRequired: true,
                estimatedDowntime: "11 Minutes"
            },

            vulnerabilities: [
                {
                    cveId: "CVE-2026-5511",
                    severity: "Critical",
                    cvssScore: 9.3,
                    status: "Affected",
                    description: "Arbitrary file upload vulnerability."
                },
                {
                    cveId: "CVE-2026-6002",
                    severity: "High",
                    cvssScore: 8.5,
                    status: "Affected",
                    description: "Authentication token leakage issue."
                },
                {
                    cveId: "CVE-2026-6121",
                    severity: "High",
                    cvssScore: 8.1,
                    status: "Affected",
                    description: "Wireless client session hijacking vulnerability."
                },
                {
                    cveId: "CVE-2025-9021",
                    severity: "Medium",
                    cvssScore: 6.4,
                    status: "Affected",
                    description: "Management interface information disclosure."
                }
            ],

            recentActivities: [
                {
                    time: "2026-05-28 11:26:18",
                    activity: "Wireless Compliance Audit Completed",
                    status: "Success"
                },
                {
                    time: "2026-05-28 10:52:31",
                    activity: "Critical Vulnerability Match Found",
                    status: "Warning"
                }
            ]
        },

        {
            deviceData: {
                deviceId: "DEV-LB-55002",
                hostname: "HYD-LB-ADC-01",
                ipAddress: "10.90.4.15",
                macAddress: "A4:5E:60:9C:22:1A",
                vendor: "F5",
                deviceType: "Load Balancer",
                model: "BIG-IP i5800",
                serialNumber: "F5I5800HYD992",
                vulnerabilityCount: 2,
                riskLevel: "High",
                os: "TMOS",
                currentVersion: "16.1.2",
                latestVersion: "17.1.1",
                compliance: "Outdated",
                lastScan: "2026-05-28 12:02:44",
                location: "Hyderabad DR Site"
            },

            firmwareInformation: {
                version: "17.1.1",
                releaseDate: "2026-02-09",
                releaseType: "Security Hotfix",
                fileName: "BIGIP-17.1.1-0.0.4.iso",
                fileSize: "3.2 GB",
                checksumVerified: true,
                rebootRequired: true,
                estimatedDowntime: "12 Minutes"
            },

            vulnerabilities: [
                {
                    cveId: "CVE-2026-7710",
                    severity: "Critical",
                    cvssScore: 9.1,
                    status: "Affected",
                    description: "Remote command execution via iControl REST."
                },
                {
                    cveId: "CVE-2025-8884",
                    severity: "High",
                    cvssScore: 7.8,
                    status: "Affected",
                    description: "TLS inspection bypass vulnerability."
                }
            ],

            recentActivities: [
                {
                    time: "2026-05-28 12:02:44",
                    activity: "Firmware Integrity Validation Completed",
                    status: "Success"
                },
                {
                    time: "2026-05-28 11:28:09",
                    activity: "Security Advisory Matched",
                    status: "Warning"
                }
            ]
        },
        {
            deviceData: {
                deviceId: "DEV-SW-77101",
                hostname: "CHN-ACCESS-SW-01",
                ipAddress: "10.55.1.12",
                macAddress: "D8:9C:67:2F:11:AB",
                vendor: "Cisco",
                deviceType: "Switch",
                model: "Catalyst 9300-48P",
                serialNumber: "FCW2211ABCD",
                vulnerabilityCount: 0,
                riskLevel: "Low",
                os: "Cisco IOS XE",
                currentVersion: "17.12.3",
                latestVersion: "17.12.3",
                compliance: "Compliant",
                lastScan: "2026-05-28 08:12:22",
                location: "Chennai Branch"
            },

            firmwareInformation: {
                version: "17.12.3",
                releaseDate: "2026-04-16",
                releaseType: "Security Maintenance Release",
                fileName: "cat9k_iosxe.17.12.03.SPA.bin",
                fileSize: "2.0 GB",
                checksumVerified: true,
                rebootRequired: false,
                estimatedDowntime: "0 Minutes"
            },

            vulnerabilities: [],

            recentActivities: [
                {
                    time: "2026-05-28 08:12:22",
                    activity: "Compliance Verification Passed",
                    status: "Success"
                },
                {
                    time: "2026-05-28 07:40:11",
                    activity: "Firmware Baseline Matched",
                    status: "Success"
                }
            ]
        },
        {
            deviceData: {
                deviceId: "DEV-AP-88021",
                hostname: "MUM-WIFI-AP-21",
                ipAddress: "10.70.12.44",
                macAddress: "84:3D:C6:AA:92:10",
                vendor: "Aruba",
                deviceType: "Access Point",
                model: "Aruba AP-535",
                serialNumber: "CN93APL8821",
                vulnerabilityCount: 0,
                riskLevel: "Low",
                os: "ArubaOS",
                currentVersion: "10.6.0.2",
                latestVersion: "10.6.0.2",
                compliance: "Compliant",
                lastScan: "2026-05-28 09:44:51",
                location: "Mumbai Office Floor-5"
            },

            firmwareInformation: {
                version: "10.6.0.2",
                releaseDate: "2026-02-02",
                releaseType: "Stable Release",
                fileName: "ArubaInstant_Hercules_10.6.0.2.pkg",
                fileSize: "780 MB",
                checksumVerified: true,
                rebootRequired: false,
                estimatedDowntime: "0 Minutes"
            },

            vulnerabilities: [],

            recentActivities: [
                {
                    time: "2026-05-28 09:44:51",
                    activity: "Wireless Security Audit Passed",
                    status: "Success"
                },
                {
                    time: "2026-05-28 09:20:33",
                    activity: "Firmware Integrity Verified",
                    status: "Success"
                }
            ]
        },


    ];



    const RecentActivityData = [
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
    // const VulnerabilityMappingdata = [
    //     { cve: "CVE-2026-1001", device: "FortiGate Firewall", severity: "Critical" },
    //     { cve: "CVE-2026-2044", device: "Core Switch", severity: "High" },

    //     { cve: "CVE-2026-3055", device: "Wireless Controller", severity: "Medium" },
    //     { cve: "CVE-2026-4120", device: "Branch Router", severity: "High" },
    //     { cve: "CVE-2026-5188", device: "Edge Firewall", severity: "Critical" },
    //     { cve: "CVE-2026-6241", device: "Datacenter Switch", severity: "High" },
    //     { cve: "CVE-2026-7333", device: "VPN Gateway", severity: "Medium" }
    // ];

    const VulnerabilityMappingdata = [
        { cve: "CVE-2026-2145", device: "MUM-EDGE-RTR-01", vendor: "Cisco", model: "ISR4451-X/K9", severity: "Critical", cvssScore: 9.8, status: "Affected", affectedVersion: "17.6.4", fixedVersion: "17.12.3", description: "Remote code execution vulnerability in Cisco IOS XE web management interface." },
        { cve: "CVE-2026-3301", device: "MUM-EDGE-RTR-01", vendor: "Cisco", model: "ISR4451-X/K9", severity: "High", cvssScore: 8.7, status: "Affected", affectedVersion: "17.6.4", fixedVersion: "17.12.3", description: "Privilege escalation vulnerability in IOS XE API service." },
        { cve: "CVE-2026-4421", device: "PUNE-FW-CORE-01", vendor: "Fortinet", model: "FortiGate 200F", severity: "Critical", cvssScore: 9.4, status: "Affected", affectedVersion: "7.0.9", fixedVersion: "7.2.7", description: "Authentication bypass vulnerability in SSL VPN portal." },
        { cve: "CVE-2026-5518", device: "PUNE-FW-CORE-01", vendor: "Fortinet", model: "FortiGate 200F", severity: "High", cvssScore: 8.2, status: "Affected", affectedVersion: "7.0.9", fixedVersion: "7.2.7", description: "Improper session validation allowing unauthorized access." },
        { cve: "CVE-2025-7711", device: "BLR-ACCESS-SW-12", vendor: "Aruba", model: "Aruba CX 6300M", severity: "Medium", cvssScore: 6.5, status: "Affected", affectedVersion: "10.10.1010", fixedVersion: "10.13.0005", description: "Web management session handling vulnerability." },
        { cve: "CVE-2026-5511", device: "DEL-WLC-CORE-01", vendor: "Cisco", model: "Catalyst 9800-L", severity: "Critical", cvssScore: 9.3, status: "Affected", affectedVersion: "17.9.2", fixedVersion: "17.12.2", description: "Arbitrary file upload vulnerability in wireless controller management." },
        { cve: "CVE-2026-6002", device: "DEL-WLC-CORE-01", vendor: "Cisco", model: "Catalyst 9800-L", severity: "High", cvssScore: 8.5, status: "Affected", affectedVersion: "17.9.2", fixedVersion: "17.12.2", description: "Authentication token leakage vulnerability." },
        { cve: "CVE-2026-6121", device: "DEL-WLC-CORE-01", vendor: "Cisco", model: "Catalyst 9800-L", severity: "High", cvssScore: 8.1, status: "Affected", affectedVersion: "17.9.2", fixedVersion: "17.12.2", description: "Wireless client session hijacking issue." },
        { cve: "CVE-2026-7710", device: "HYD-LB-ADC-01", vendor: "F5", model: "BIG-IP i5800", severity: "Critical", cvssScore: 9.1, status: "Affected", affectedVersion: "16.1.2", fixedVersion: "17.1.1", description: "Remote command execution through iControl REST API." },
        { cve: "CVE-2025-8884", device: "HYD-LB-ADC-01", vendor: "F5", model: "BIG-IP i5800", severity: "High", cvssScore: 7.8, status: "Affected", affectedVersion: "16.1.2", fixedVersion: "17.1.1", description: "TLS inspection bypass vulnerability." }
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
            case "Low":
                return "px-2.5 py-1 rounded-full text-[12px]  border bg-green-500/10 text-green-400 border-green-500/20";

            default:
                return "px-2.5 py-1 rounded-full text-[12px]  border bg-gray-500/10 text-gray-300 border-gray-500/20";
        }
    };
    // ===== STATE =====
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10;

    const [selectedFirmware, setSelectedFirmware] = useState(null);
    const [selectedVuln, setSelectedVuln] = useState(null);

    // ===== TABLE FORMAT =====
    const DeviceInventoryTable = useMemo(() => {
        return NetworkDevice.map((item) => ({
            device: item.deviceData.hostname,
            vendor: item.deviceData.vendor,
            ipAddress: item.deviceData.ipAddress,
            currentVersion: item.deviceData.currentVersion,
            latestVersion: item.deviceData.latestVersion,
            vulnerabilityCount: item.deviceData.vulnerabilityCount,
            os: item.deviceData.os,
            compliance: item.deviceData.compliance,
            firmwareInformation: item.firmwareInformation,
            vulnerabilities: item.vulnerabilities
        }));
    }, []);

    // ===== FILTER =====
    const filteredData = useMemo(() => {
        return DeviceInventoryTable.filter((item) =>
            Object.values(item)
                .join(" ")
                .toLowerCase()
                .includes(search.toLowerCase())
        );
    }, [search, DeviceInventoryTable]);

    const totalPages = Math.ceil(filteredData.length / rowsPerPage);

    const paginatedData = useMemo(() => {
        const start = (currentPage - 1) * rowsPerPage;
        return filteredData.slice(start, start + rowsPerPage);
    }, [filteredData, currentPage]);


    return (
        //    <div className="p-6 bg-[#0f172a] min-h-screen text-white space-y-6">
        <div className="p-4 min-h-screen text-white space-y-4">
            {/* ===== HEADER ACTION ===== */}
            {/* <div className="flex justify-end mb-4">
                <button
                    className="
            px-4 py-2
            text-sm font-medium
            rounded-lg
            bg-cyan-400/50
            text-cyan-200
            border border-cyan-500/20
            hover:bg-cyan-500/40
            hover:border-cyan-500/40
            transition-all duration-300
            shadow-sm hover:shadow-cyan-500/20
        "
                >
                    Discover Devices
                </button>
            </div> */}
            <div className="flex justify-between items-center">
                {/* <h1 className="text-xl font-semibold">Network Device Patch Management</h1> */}
                <div>
                    <h1 className="text-2xl font-semibold"> Network Device Dashboard </h1>
                    <p className="text-sm text-gray-400 mt-1"> Unified dashboard for inventory, configuration backup and firmware patching </p>
                </div>

                <div className="flex gap-3">

                    <button className="flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 rounded-lg"> Discover Devices </button>
                </div>
            </div>
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

                    const icons = {
                        1: <Monitor size={22} />,
                        2: <AlertTriangle size={22} />,
                        3: <ShieldAlert size={22} />,
                        4: <DatabaseBackup size={22} />,
                    };
                    const iconBgStyles = {
                        1: "bg-cyan-500/10",
                        2: "bg-orange-500/10",
                        3: "bg-red-500/10",
                        4: "bg-green-500/10",
                    };

                    return (
                        <div
                            key={item.id}
                            className={`
                    bg-[#0f172a]
                    p-4 rounded-xl
                    border border-transparent
                    shadow-none
                    transition-all duration-300
                    hover:-translate-y-1 hover:shadow-lg
                    ${cardStyles[item.id]}
                `}
                        >

                            {/* TOP SECTION */}
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm opacity-80"> {item.title} </p>
                                    <h2 className="text-2xl font-bold mt-2"> {item.count} </h2>
                                </div>

                                {/* ICON */}
                                <div className={` h-12 w-12 rounded-full flex items-center justify-center ${iconBgStyles[item.id]} `} >
                                    {icons[item.id]}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* ===== Row 2 ===== */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 items-stretch">

                {/* LEFT: DEVICE TABLE */}
                <div
                    className={`bg-[#0f172a] p-4 rounded-xl flex flex-col max-h-[610px] transition-all duration-300
                     ${selectedFirmware || selectedVuln ? "lg:col-span-2" : "lg:col-span-3"}`}
                >
                    <h2 className="text-lg font-semibold mb-3 flex-shrink-0">
                        Device Inventory
                    </h2>

                    <div className="h-px bg-gray-800 my-2"></div>

                    <div className="flex justify-between items-center mb-3 flex-shrink-0">
                        <input
                            type="text"
                            placeholder="Search devices..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-[85%] px-3 py-2 text-sm rounded-lg bg-[#111827] text-white outline-none border border-gray-700"
                        />

                        <div className="text-sm text-gray-400 pr-4">
                            Showing {paginatedData.length} of {filteredData.length}
                        </div>
                    </div>

                    <div className="overflow-y-auto flex-1 rounded-lg border border-gray-700 hide-scrollbar">
                        <table className="w-full text-sm">
                            <thead className="bg-[#2a3a52] text-gray-300 sticky top-0">
                                <tr>
                                    <th className="py-3 px-3 text-left">Device</th>
                                    <th className="py-3 px-3 text-left">Vendor</th>
                                    <th className="py-3 px-3 text-left">IP</th>
                                    <th className="py-3 px-3 text-left">Current Version</th>
                                    <th className="py-3 px-3 text-left">Latest Version</th>
                                    <th className="py-3 px-3 text-left">Vulnerabilities</th>
                                    <th className="py-3 px-3 text-left">OS</th>
                                    <th className="py-3 px-3 text-left">Compliance</th>
                                    <th className="py-3 px-3 text-center">Action</th>
                                    <th className="py-3 px-3 text-left">Schedule</th>
                                </tr>
                            </thead>

                            <tbody>
                                {paginatedData.map((d, i) => (
                                    <tr key={i} className="border-b border-gray-800 hover:bg-[#1f2a3a] transition">
                                        <td className="py-2 px-3">{d.device}</td>
                                        <td className="px-3">{d.vendor}</td>
                                        <td className="px-3">{d.ipAddress}</td>
                                        <td className="px-3">{d.currentVersion}</td>
                                        <td className="px-3 text-cyan-400 cursor-pointer hover:underline"
                                            onClick={() => {
                                                setSelectedFirmware(d.firmwareInformation)
                                                setSelectedVuln(null)
                                            }} > {d.latestVersion}
                                        </td>
                                        <td className="px-3 text-red-400 cursor-pointer hover:underline"
                                            onClick={() => {
                                                setSelectedVuln({
                                                    device: d.device,
                                                    vulnerabilities: d.vulnerabilities
                                                })
                                                setSelectedFirmware(null)
                                            }} > {d.vulnerabilityCount}
                                        </td>

                                        <td className="px-3">{d.os}</td>
                                        <td className="px-3"> <span className={getStatusColor(d.compliance)}> {d.compliance} </span> </td>
                                        <td className="px-4">
                                            <button onClick={() => navigate("/section/NewFirmwareUpgrade", { state: { device: d } })}
                                                className="bg-cyan-600 hover:bg-cyan-700 px-4 py-2 rounded-lg text-xs"> Upgrade </button>
                                        </td>
                                        <td className="px-3">
                                            <div className="flex items-center gap-2">

                                                {/* status dot */}
                                                <div className="relative">
                                                    <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
                                                    <div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-green-400 opacity-30 blur-sm" />
                                                </div>

                                                {/* label */}
                                                <div>

                                                    <p>{getRandomFutureTime()}</p>
                                                </div>

                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* PAGINATION */}
                    <div className="flex justify-end gap-2 mt-3 flex-shrink-0">
                        <button
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage((p) => p - 1)}
                            className="px-3 py-1 text-sm bg-[#1e293b] rounded disabled:opacity-40"
                        >
                            Prev
                        </button>

                        <span className="text-sm px-2 py-1">
                            {currentPage} / {totalPages || 1}
                        </span>

                        <button
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage((p) => p + 1)}
                            className="px-3 py-1 text-sm bg-[#1e293b] rounded disabled:opacity-40"
                        >
                            Next
                        </button>
                    </div>
                </div>

                {/* RIGHT SIDE CARD (FIRMWARE PANEL) */}
                {selectedFirmware && (
                    <div className="lg:col-span-1 bg-[#0f172a] p-4 rounded-xl border border-gray-700 relative">

                        {/* CLOSE BUTTON */}
                        <button
                            onClick={() => setSelectedFirmware(null)}
                            className="absolute top-3 right-3 text-gray-400 hover:text-white"
                        >
                            <X size={18} />
                        </button>

                        <h2 className="text-lg font-semibold mb-4 text-cyan-400">
                            Firmware Details
                        </h2>

                        <div className="space-y-3 text-sm text-gray-300">
                            <div>
                                <p className="text-gray-500">Version</p>
                                <p>{selectedFirmware.version}</p>
                            </div>

                            <div>
                                <p className="text-gray-500">Release Date</p>
                                <p>{selectedFirmware.releaseDate}</p>
                            </div>

                            <div>
                                <p className="text-gray-500">Release Type</p>
                                <p>{selectedFirmware.releaseType}</p>
                            </div>

                            <div>
                                <p className="text-gray-500">File Name</p>
                                <p className="break-all">{selectedFirmware.fileName}</p>
                            </div>

                            <div>
                                <p className="text-gray-500">Size</p>
                                <p>{selectedFirmware.fileSize}</p>
                            </div>

                            <div>
                                <p className="text-gray-500">Checksum</p>
                                <p> {selectedFirmware.checksumVerified ? "Verified" : "Not Verified"} </p>
                            </div>

                            <div>
                                <p className="text-gray-500">Downtime</p>
                                <p>{selectedFirmware.estimatedDowntime}</p>
                            </div>
                        </div>
                    </div>
                )}

                {selectedVuln && (
                    <div className="lg:col-span-1 bg-[#0f172a] p-4 rounded-xl border border-gray-700 relative">

                        {/* CLOSE BUTTON */}
                        <button
                            onClick={() => setSelectedVuln(null)}
                            className="absolute top-3 right-3 text-gray-400 hover:text-white"
                        >
                            <X size={18} />
                        </button>

                        <h2 className="text-lg font-semibold mb-4 text-red-400">
                            Vulnerabilities
                        </h2>

                        <p className="text-sm text-gray-400 mb-3">
                            Device: <span className="text-white">{selectedVuln.device}</span>
                        </p>

                        <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                            {selectedVuln.vulnerabilities.map((v, i) => (
                                <div key={i} className="p-3 rounded-lg border border-gray-700 bg-[#111827]" >
                                    <p className="text-sm text-red-400 font-semibold"> {v.cveId} </p>
                                    <p className="text-xs text-gray-400 mt-1">
                                        Severity:{" "} <span className={v.severity === "Critical" ? "text-red-400"
                                            : v.severity === "High" ? "text-orange-400" : "text-yellow-400"
                                        }> {v.severity} </span>
                                    </p>

                                    <p className="text-xs text-gray-400"> CVSS: {v.cvssScore} </p>

                                    <p className="text-xs text-gray-500">  Status: {v.status} </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* ===== Row 3 : Bottom Cards ===== */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 max-w-5xl  max-w-5xl">

                {/* ===== Recent Activity CARD ===== */}
                <div className="bg-[#0f172a] p-4 rounded-xl flex flex-col h-[350px] w-full">

                    {/* TITLE */}
                    <h2 className="text-lg font-semibold flex-shrink-0">
                        Recent Activity
                    </h2>

                    {/* DIVIDER */}
                    <div className="h-px bg-gray-800 my-3"></div>

                    {/* SCROLL AREA */}
                    <div className="overflow-y-auto pr-2 space-y-3 hide-scrollbar flex-1">

                        {NetworkDevice.flatMap((device) =>
                            device.recentActivities.map((activity, index) => ({
                                ...activity,
                                hostname: device.deviceData.hostname,
                                riskLevel: device.deviceData.riskLevel,
                                id: `${device.deviceData.deviceId}-${index}`
                            }))).sort((a, b) => new Date(b.time) - new Date(a.time)).map((item) => (
                                <div key={item.id} className="flex justify-between items-start border-b border-gray-800 pb-3" >
                                    <div className="flex flex-col">
                                        <p className="text-sm font-medium text-white"> {item.hostname} </p>
                                        <p className="text-xs text-gray-300 mt-1"> {item.activity} </p>
                                        <p className="text-[11px] text-gray-500 mt-1">{item.time} </p>
                                    </div>
                                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(item.status)}`} > {item.status} </span>
                                </div>
                            ))}
                    </div>
                </div>

                {/* ===== Vulnerability Mapping CARD ===== */}
                <div className="bg-[#0f172a] p-4 rounded-xl flex flex-col h-[350px] w-full">

                    {/* TITLE */}
                    <h2 className="text-lg font-semibold flex-shrink-0"> Vulnerability Mapping
                    </h2>

                    {/* DIVIDER */}
                    <div className="h-px bg-gray-800 my-3"></div>

                    {/* SCROLL AREA */}
                    <div className="overflow-y-auto pr-2 space-y-3 hide-scrollbar flex-1">

                        {VulnerabilityMappingdata.map((item, i) => (
                            <div
                                key={i}
                                className="border-b border-gray-800 pb-3"
                            >

                                <div className="flex items-start justify-between gap-3">

                                    <div className="flex-1">

                                        <p className="text-sm font-semibold text-white">
                                            {item.cve}
                                        </p>

                                        <p className="text-xs text-gray-300 mt-1">
                                            {item.device}
                                        </p>

                                        <p className="text-[11px] text-gray-500 mt-1">
                                            {item.vendor} | {item.model}
                                        </p>

                                        <p className="text-[11px] text-gray-400 mt-1 line-clamp-2">
                                            {item.description}
                                        </p>

                                        <div className="flex gap-3 mt-2 text-[11px] text-gray-500">
                                            <span>
                                                Current: {item.affectedVersion}
                                            </span>

                                            <span>
                                                Fixed: {item.fixedVersion}
                                            </span>
                                        </div>
                                    </div>

                                    <span
                                        className={`text-[11px] px-2 py-1 rounded-full font-medium whitespace-nowrap ${getStatusColor(item.severity)}`}
                                    >
                                        {item.severity}
                                    </span>

                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>




        </div>
    )
}

export default DeviceInventory
