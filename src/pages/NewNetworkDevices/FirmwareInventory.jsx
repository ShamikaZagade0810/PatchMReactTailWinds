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
const firmwareVersions = {
    Switches: {
        Cisco: {
            "Catalyst 9200": [
                "16.9.1", "16.9.4", "16.12.4", "17.3.3", "17.3.5",
                "17.6.3", "17.6.5", "17.9.4", "17.12.4", "17.15.1"
            ],
            "Catalyst 9300": [
                "16.9.1", "16.9.5", "16.12.5", "17.3.4", "17.3.6",
                "17.6.4", "17.6.5", "17.9.5", "17.12.4", "17.15.2"
            ],
            "Catalyst 9500": [
                "16.12.3", "16.12.5", "17.3.4", "17.6.4", "17.6.5",
                "17.9.3", "17.9.5", "17.12.3", "17.12.4", "17.15.1"
            ],
            "Nexus 9000": [
                "9.3.1", "9.3.5", "9.3.8", "9.3.10", "10.1.1",
                "10.2.1", "10.2.4", "10.3.1", "10.3.3", "10.4.1"
            ]
        },

        Juniper: {
            "EX2300": [
                "20.4R3", "21.2R1", "21.2R3", "21.4R2", "21.4R3",
                "22.1R1", "22.2R1", "22.2R3", "22.4R1", "23.2R1"
            ],
            "EX3400": [
                "20.4R3", "21.2R1", "21.4R1", "21.4R3", "22.1R1",
                "22.2R1", "22.4R1", "22.4R2", "23.2R1", "23.4R1"
            ],
            "EX4400": [
                "21.2R3", "21.4R3", "22.1R1", "22.2R1", "22.4R1",
                "22.4R2", "23.2R1", "23.2R2", "23.4R1", "23.4R2"
            ]
        },

        Aruba: {
            "CX 6100": [
                "10.08.1010", "10.09.1020", "10.10.1040", "10.11.0010",
                "10.12.0010", "10.12.1020", "10.13.0010", "10.13.1040",
                "10.14.0010", "10.14.1020"
            ]
        },
        HPE: {
            "5130 EI": [
                "7.1.045", "7.1.059", "7.1.070", "7.1.075", "7.1.080",
                "7.1.090", "7.1.099", "7.1.100", "7.1.110", "7.1.120"
            ],

            "5140 EI": [
                "7.1.045", "7.1.060", "7.1.070", "7.1.080", "7.1.090",
                "7.1.100", "7.1.110", "7.1.120", "7.1.130", "7.1.140"
            ],

            "5510 HI": [
                "7.1.059", "7.1.070", "7.1.080", "7.1.090", "7.1.100",
                "7.1.110", "7.1.120", "7.1.130", "7.1.140", "7.1.150"
            ]
        },

        Dell: {
            "N1548": [
                "6.5.1.1", "6.5.2.2", "6.6.0.1", "6.6.1.2", "6.6.2.3",
                "6.7.0.1", "6.7.1.1", "6.7.1.2", "6.7.2.1", "6.7.3.1"
            ],

            "N2048": [
                "6.5.0.3", "6.5.1.1", "6.5.2.2", "6.6.0.1", "6.6.1.2",
                "6.6.2.3", "6.7.0.1", "6.7.1.1", "6.7.2.1", "6.7.3.1"
            ],

            "S4148F": [
                "10.4.0.1", "10.4.1.1", "10.5.0.1", "10.5.1.2", "10.5.2.3",
                "10.5.3.1", "10.5.4.0", "10.5.5.1", "10.5.6.2", "10.5.7.0"
            ]
        },

        "Extreme Networks": {
            "X440-G2": [
                "30.2.1.8", "30.3.1.4", "30.4.1.1", "30.5.1.3", "31.1.1.2",
                "31.2.1.1", "31.3.1.1", "31.4.1.2", "32.1.1.4", "32.2.1.1"
            ],

            "X460-G2": [
                "30.2.1.8", "30.3.1.4", "30.4.1.1", "30.5.1.3", "31.1.1.2",
                "31.2.1.1", "31.3.1.1", "31.4.1.2", "32.1.1.4", "32.2.1.1"
            ],

            "X670-G2": [
                "30.3.1.4", "30.4.1.1", "30.5.1.3", "31.1.1.2", "31.2.1.1",
                "31.3.1.1", "31.4.1.2", "32.1.1.4", "32.2.1.1", "32.3.1.2"
            ]
        }
    },

    Routers: {
        Cisco: {
            "ISR4321": [
                "16.12.5", "17.3.3", "17.3.5", "17.6.2", "17.6.4",
                "17.9.1", "17.9.4", "17.12.1", "17.12.4", "17.15.1"
            ]
        },

        Huawei: {
            "NE40E-X8": [
                "V8R10", "V8R11", "V8R12", "V8R13", "V8R15",
                "V8R16", "V8R18", "V8R20", "V8R21", "V8R22"
            ]
        },

        MikroTik: {
            "CCR2004": [
                "6.49.6", "7.1", "7.2", "7.4", "7.6",
                "7.8", "7.10", "7.12", "7.15", "7.18"
            ]
        },
        Juniper: {
            "MX204": [
                "20.4R3", "21.2R1", "21.2R3", "21.4R2", "21.4R3",
                "22.1R1", "22.2R1", "22.2R3", "22.4R1", "23.2R1"
            ],

            "MX480": [
                "20.4R3", "21.2R1", "21.4R1", "21.4R3", "22.1R1",
                "22.2R1", "22.4R1", "22.4R2", "23.2R1", "23.4R1"
            ],

            "MX960": [
                "20.4R3", "21.2R3", "21.4R3", "22.1R1", "22.2R3",
                "22.4R1", "22.4R2", "23.2R1", "23.4R1", "23.4R2"
            ]
        },

        Fortinet: {
            "FortiGate 60F": [
                "6.4.8", "6.4.10", "6.4.12", "7.0.1", "7.0.4",
                "7.0.8", "7.0.12", "7.2.4", "7.2.8", "7.4.5"
            ],

            "FortiGate 100F": [
                "6.4.8", "6.4.11", "6.4.12", "7.0.4", "7.0.8",
                "7.0.12", "7.2.4", "7.2.8", "7.4.3", "7.4.5"
            ]
        }
    },

    Firewalls: {
        Fortinet: {
            "FortiGate 100F": [
                "6.4.8", "6.4.10", "6.4.12", "7.0.1", "7.0.4",
                "7.0.8", "7.0.12", "7.2.4", "7.2.8", "7.4.5"
            ]
        },

        "Palo Alto": {
            "PA-850": [
                "10.1.3", "10.1.8", "10.1.14", "10.2.1", "10.2.6",
                "10.2.8", "11.0.2", "11.0.6", "11.1.3", "11.2.3"
            ]
        },
        Sophos: {
            "XGS 116": [
                "18.5", "18.5 MR1", "18.5 MR2", "19.0", "19.0 MR1",
                "19.5", "19.5 MR1", "20.0", "20.0 MR1", "20.0 MR2"
            ],

            "XGS 2300": [
                "18.5", "18.5 MR1", "18.5 MR2", "19.0", "19.0 MR1",
                "19.5", "19.5 MR1", "20.0", "20.0 MR1", "20.0 MR2"
            ],

            "XGS 4300": [
                "18.5", "18.5 MR1", "18.5 MR2", "19.0", "19.0 MR1",
                "19.5", "19.5 MR1", "20.0", "20.0 MR1", "20.0 MR2"
            ]
        },

        "Check Point": {
            "Quantum 6200": [
                "R80.40", "R81", "R81.10", "R81.10 JHF 55", "R81.10 JHF 78",
                "R81.20", "R81.20 JHF 26", "R82 EA", "R82", "R82 JHF 10"
            ],

            "Quantum 6600": [
                "R80.40", "R81", "R81.10", "R81.10 JHF 55", "R81.10 JHF 78",
                "R81.20", "R81.20 JHF 26", "R82 EA", "R82", "R82 JHF 10"
            ]
        },

        SonicWall: {
            "NSA 2700": [
                "6.5.4.7", "6.5.4.8", "6.5.4.10", "7.0.0", "7.0.1",
                "7.0.1.1", "7.0.1.2", "7.0.1.3", "7.1.0", "7.1.1"
            ],

            "NSA 4700": [
                "6.5.4.7", "6.5.4.8", "6.5.4.10", "7.0.0", "7.0.1",
                "7.0.1.1", "7.0.1.2", "7.0.1.3", "7.1.0", "7.1.1"
            ],

            "NSa 5700": [
                "6.5.4.7", "6.5.4.8", "6.5.4.10", "7.0.0", "7.0.1",
                "7.0.1.1", "7.0.1.2", "7.0.1.3", "7.1.0", "7.1.1"
            ]
        }
    },
    "Wireless Controllers": {
        Cisco: {
            "9800-L": [
                "17.3.4", "17.3.5", "17.6.3", "17.6.5", "17.9.3",
                "17.9.4", "17.12.1", "17.12.3", "17.12.4", "17.15.1"
            ],

            "9800-40": [
                "17.3.4", "17.3.5", "17.6.3", "17.6.5", "17.9.3",
                "17.9.4", "17.12.1", "17.12.3", "17.12.4", "17.15.1"
            ],

            "9800-80": [
                "17.3.4", "17.3.5", "17.6.3", "17.6.5", "17.9.3",
                "17.9.4", "17.12.1", "17.12.3", "17.12.4", "17.15.1"
            ]
        },

        Aruba: {
            "7205": [
                "8.7.1", "8.8.0", "8.8.1", "8.9.0", "8.10.0",
                "8.10.1", "8.11.0", "8.11.1", "8.12.0", "8.12.1"
            ],

            "7210": [
                "8.7.1", "8.8.0", "8.8.1", "8.9.0", "8.10.0",
                "8.10.1", "8.11.0", "8.11.1", "8.12.0", "8.12.1"
            ],

            "7240": [
                "8.7.1", "8.8.0", "8.8.1", "8.9.0", "8.10.0",
                "8.10.1", "8.11.0", "8.11.1", "8.12.0", "8.12.1"
            ]
        },

        Juniper: {
            "Mist Edge": [
                "1.0.0", "1.1.0", "1.2.0", "1.3.0", "1.4.0",
                "2.0.0", "2.1.0", "2.2.0", "2.3.0", "2.4.0"
            ],

            "WLC-100": [
                "1.0.0", "1.1.0", "1.2.0", "1.3.0", "1.4.0",
                "2.0.0", "2.1.0", "2.2.0", "2.3.0", "2.4.0"
            ]
        }
    },
    "Access Points": {
        Cisco: {
            "C9120": [
                "17.3.4", "17.3.5", "17.6.3", "17.6.5", "17.9.3",
                "17.9.4", "17.12.1", "17.12.3", "17.12.4", "17.15.1"
            ],

            "C9130": [
                "17.3.4", "17.3.5", "17.6.3", "17.6.5", "17.9.3",
                "17.9.4", "17.12.1", "17.12.3", "17.12.4", "17.15.1"
            ],

            "C9166": [
                "17.6.3", "17.6.5", "17.9.3", "17.9.4", "17.12.1",
                "17.12.3", "17.12.4", "17.15.1", "17.15.2", "17.15.3"
            ]
        },

        Ubiquiti: {
            "U6 Lite": [
                "6.0.14", "6.2.26", "6.5.28", "6.5.54", "6.6.55",
                "6.6.65", "7.0.23", "7.1.24", "7.2.94", "7.3.76"
            ],

            "U6 Pro": [
                "6.0.14", "6.2.26", "6.5.28", "6.5.54", "6.6.55",
                "6.6.65", "7.0.23", "7.1.24", "7.2.94", "7.3.76"
            ],

            "U7 Pro": [
                "7.0.23", "7.1.24", "7.2.94", "7.3.76", "7.4.12",
                "7.5.18", "7.6.10", "7.7.15", "7.8.20", "7.9.5"
            ]
        },

        Aruba: {
            "AP-515": [
                "8.7.1", "8.8.0", "8.9.0", "8.10.0", "8.10.1",
                "8.11.0", "8.11.1", "8.12.0", "8.12.1", "8.13.0"
            ],

            "AP-535": [
                "8.7.1", "8.8.0", "8.9.0", "8.10.0", "8.10.1",
                "8.11.0", "8.11.1", "8.12.0", "8.12.1", "8.13.0"
            ],

            "AP-635": [
                "8.10.0", "8.10.1", "8.11.0", "8.11.1", "8.12.0",
                "8.12.1", "8.13.0", "8.13.1", "8.14.0", "8.14.1"
            ]
        }
    },
    "Load Balancers": {
        F5: {
            "BIG-IP i2600": [
                "15.1.5", "15.1.8", "16.1.2", "16.1.3", "16.1.4",
                "17.0.0", "17.1.0", "17.1.1", "17.1.2", "17.1.3"
            ],

            "BIG-IP i5800": [
                "15.1.5", "15.1.8", "16.1.2", "16.1.3", "16.1.4",
                "17.0.0", "17.1.0", "17.1.1", "17.1.2", "17.1.3"
            ]
        },

        Citrix: {
            "ADC VPX": [
                "13.0-82", "13.0-88", "13.0-91", "13.1-24", "13.1-33",
                "13.1-37", "13.1-42", "14.1-8", "14.1-12", "14.1-17"
            ],

            "ADC MPX": [
                "13.0-82", "13.0-88", "13.0-91", "13.1-24", "13.1-33",
                "13.1-37", "13.1-42", "14.1-8", "14.1-12", "14.1-17"
            ]
        },

        A10: {
            "Thunder 4435": [
                "4.1.4", "4.1.4-P3", "4.1.4-P5", "5.0.0", "5.1.0",
                "5.1.1", "5.2.0", "5.2.1", "5.2.2", "5.2.3"
            ],

            "Thunder 7445": [
                "4.1.4", "4.1.4-P3", "4.1.4-P5", "5.0.0", "5.1.0",
                "5.1.1", "5.2.0", "5.2.1", "5.2.2", "5.2.3"
            ]
        }
    },
    "SD-WAN Devices": {
        Cisco: {
            "vEdge 1000": [
                "17.3.4", "17.6.3", "17.6.5", "17.9.4", "17.12.1",
                "17.12.4", "17.15.1", "17.15.2", "17.15.3", "17.16.1"
            ],

            "Catalyst 8500": [
                "17.3.4", "17.6.3", "17.6.5", "17.9.4", "17.12.1",
                "17.12.4", "17.15.1", "17.15.2", "17.15.3", "17.16.1"
            ]
        },

        VMware: {
            "Edge 510": [
                "4.3.0", "4.3.1", "4.4.0", "4.5.0", "5.0.0",
                "5.1.0", "5.2.0", "5.2.1", "5.3.0", "5.4.0"
            ],

            "Edge 610": [
                "4.3.0", "4.3.1", "4.4.0", "4.5.0", "5.0.0",
                "5.1.0", "5.2.0", "5.2.1", "5.3.0", "5.4.0"
            ]
        },

        Fortinet: {
            "FortiGate SD-WAN 100F": [
                "6.4.12", "7.0.4", "7.0.8", "7.0.12", "7.2.4",
                "7.2.8", "7.2.10", "7.4.1", "7.4.3", "7.4.5"
            ],

            "FortiGate SD-WAN 200F": [
                "6.4.12", "7.0.4", "7.0.8", "7.0.12", "7.2.4",
                "7.2.8", "7.2.10", "7.4.1", "7.4.3", "7.4.5"
            ]
        }
    }
};
const buildFirmwareRecords = (oem, model, versions) => {
    return versions.map((version, index) => ({
        firmwareName: `${oem} ${model} Firmware`,
        model,
        currentVersion: index === 0 ? version : versions[index - 1],
        latestVersion: version,
        releaseDate: `2025-${String((index % 12) + 1).padStart(2, "0")}-15`,
        type: [
            "Security Patch",
            "Feature Update",
            "Hotfix",
            "Maintenance"
        ][index % 4],
        severity: [
            "Critical",
            "High",
            "Medium",
            "Low"
        ][index % 4],
        cve: `CVE-2025-${5000 + index}`,
        repoStatus: [
            "Available",
            "Testing",
            "Outdated",
            "Up-to-date"
        ][index % 4],
        size: `${700 + (index * 100)} MB`,
        uploadedBy: "Firmware Team",
        lastUpdated: `${index + 1} days ago`
    }));
};

const firmwareData = [];

Object.entries(firmwareVersions).forEach(([category, oems]) => {
    const categoryObj = {};

    Object.entries(oems).forEach(([oem, models]) => {
        categoryObj[oem] = [];

        Object.entries(models).forEach(([model, versions]) => {
            categoryObj[oem].push(
                ...buildFirmwareRecords(
                    oem,
                    model,
                    versions
                )
            );
        });
    });

    firmwareData.push({
        [category]: [categoryObj]
    });
});

console.log(firmwareData);

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
    const categoryEntry = firmwareData.find(
        item => item[category]
    );

    if (!categoryEntry) {
        return [];
    }

    const categoryData = categoryEntry[category]?.[0];

    return categoryData?.[oem] || [];
};
const FirmwareInventory = () => {
    const [selectedCategory, setSelectedCategory] = useState("Switches");
    const [selectedOEM, setSelectedOEM] = useState("Cisco");
    const [expandedCategory, setExpandedCategory] = useState("Switches");
    const [search, setSearch] = useState("");
    const [expandedRow, setExpandedRow] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [showUploadModal, setShowUploadModal] = useState(false);
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

                            <button className="px-3 py-2 rounded-2xl bg-cyan-500 hover:opacity-90 transition font-medium" onClick={() => setShowUploadModal(true)}> Upload Package    </button>
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
                                        {/* <th className="px-4 py-3 font-medium">Current</th> */}
                                        <th className="px-4 py-3 font-medium">Version</th>
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
                                                    {/* <td className="px-4 py-3 text-slate-300">
                                                        {item.currentVersion}
                                                    </td> */}

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
            <AnimatePresence>
                {showUploadModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="w-[1000px] max-h-[90vh] overflow-y-auto rounded-3xl bg-[#071018] border border-white/10 shadow-2xl"
                        >
                            {/* HEADER */}
                            <div className="flex items-center justify-between p-5 border-b border-white/10">
                                <div>
                                    <h2 className="text-xl font-bold text-cyan-400">
                                        Upload Firmware Package
                                    </h2>

                                    <p className="text-sm text-slate-400 mt-1">
                                        Add a new firmware package to repository
                                    </p>
                                </div>

                                <button
                                    onClick={() => setShowUploadModal(false)}
                                    className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10"
                                >
                                    ✕
                                </button>
                            </div>

                            {/* BODY */}
                            <div className="p-6">

                                <div className="grid grid-cols-2 gap-4">

                                    <div>
                                        <label className="text-sm text-slate-300">
                                            Category
                                        </label>

                                        <select className="w-full  bg-[#0d1722] border border-white/10 rounded-xl p-2">
                                            <option>Switches</option>
                                            <option>Routers</option>
                                            <option>Firewalls</option>
                                            <option>Wireless Controllers</option>
                                            <option>Access Points</option>
                                            <option>Load Balancers</option>
                                            <option>SD-WAN Devices</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="text-sm text-slate-300">
                                            OEM
                                        </label>

                                        <input
                                            className="w-full  bg-[#0d1722] border border-white/10 rounded-xl p-2"
                                            placeholder="Cisco"
                                        />
                                    </div>

                                    <div>
                                        <label className="text-sm text-slate-300">
                                            Model
                                        </label>

                                        <input
                                            className="w-full  bg-[#0d1722] border border-white/10 rounded-xl p-2"
                                            placeholder="Catalyst 9300"
                                        />
                                    </div>

                                    <div>
                                        <label className="text-sm text-slate-300">
                                            Firmware Name
                                        </label>

                                        <input
                                            className="w-full  bg-[#0d1722] border border-white/10 rounded-xl p-2"
                                            placeholder="Cisco Catalyst Security Release"
                                        />
                                    </div>

                                    <div>
                                        <label className="text-sm text-slate-300">
                                            Current Version
                                        </label>

                                        <input
                                            className="w-full  bg-[#0d1722] border border-white/10 rounded-xl p-2"
                                            placeholder="17.9.4"
                                        />
                                    </div>

                                    <div>
                                        <label className="text-sm text-slate-300">
                                            Latest Version
                                        </label>

                                        <input
                                            className="w-full bg-[#0d1722] border border-white/10 rounded-xl p-2"
                                            placeholder="17.12.4"
                                        />
                                    </div>

                                    <div>
                                        <label className="text-sm text-slate-300">
                                            Severity
                                        </label>

                                        <select className="w-full  bg-[#0d1722] border border-white/10 rounded-xl p-2">
                                            <option>Critical</option>
                                            <option>High</option>
                                            <option>Medium</option>
                                            <option>Low</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="text-sm text-slate-300">
                                            Firmware Type
                                        </label>

                                        <select className="w-full bg-[#0d1722] border border-white/10 rounded-xl p-2">
                                            <option>Security Patch</option>
                                            <option>Feature Update</option>
                                            <option>Maintenance</option>
                                            <option>Hotfix</option>
                                        </select>
                                    </div>

                                </div>

                                {/* Upload Section */}

                                <div className="mt-6">

                                    <label className="block text-sm text-slate-300 ">
                                        Firmware Package
                                    </label>

                                    <input
                                        type="file"
                                        className="w-full rounded-xl border border-dashed border-cyan-500/30 bg-[#0d1722] p-3"
                                    />
                                </div>

                                <div className="mt-4">

                                    <label className="block text-sm text-slate-300">
                                        Release Notes
                                    </label>

                                    <input
                                        type="file"
                                        className="w-full rounded-xl border border-dashed border-cyan-500/30 bg-[#0d1722] p-3"
                                    />
                                </div>

                                <div className="mt-4">

                                    <label className="block text-sm text-slate-300 mb-2">
                                        Description
                                    </label>

                                    <textarea
                                        rows="4"
                                        className="w-full rounded-xl border border-white/10 bg-[#0d1722] p-3"
                                        placeholder="Enter firmware details..."
                                    />
                                </div>
                            </div>

                            {/* FOOTER */}

                            <div className="flex justify-end gap-3 p-5 border-t border-white/10">

                                <button
                                    onClick={() => setShowUploadModal(false)}
                                    className="px-5 py-2 rounded-xl bg-white/5 hover:bg-white/10"
                                >
                                    Cancel
                                </button>

                                <button className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-600">
                                    Upload Firmware
                                </button>

                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default FirmwareInventory;