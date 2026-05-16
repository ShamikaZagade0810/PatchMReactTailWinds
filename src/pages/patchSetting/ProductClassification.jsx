import React, { useState, useEffect } from 'react';
import {
    Boxes,
    Layers3,
    RefreshCcw,
    Clock3,
    Search,
    X,
    RotateCcw,
    Save,
    ShieldCheck,
    Wrench,
    Package,
    MonitorSmartphone,
    HardDrive,
    Cpu,
    Sparkles,
    BadgeAlert,
    CircleDot,
} from 'lucide-react';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ProductClassification = () => {

const productList = [
  { value: ".NET 10.0", label: ".NET 10.0" },
  { value: ".NET 5.0", label: ".NET 5.0" },
  { value: ".NET 6.0", label: ".NET 6.0" },
  { value: ".NET 7.0", label: ".NET 7.0" },
  { value: ".NET 8.0", label: ".NET 8.0" },
  { value: ".NET 9.0", label: ".NET 9.0" },
  { value: ".NET Core 2.1", label: ".NET Core 2.1" },
  { value: ".NET Core 3.1", label: ".NET Core 3.1" },
  { value: "Active Directory Rights Management Services Client 2.0", label: "Active Directory Rights Management Services Client 2.0" },
  { value: "Active Directory", label: "Active Directory" },
  { value: "AksEdge Category", label: "AksEdge Category" },
  { value: "AKS-EE", label: "AKS-EE" },
  { value: "Antigen for Exchange/SMTP", label: "Antigen for Exchange/SMTP" },
  { value: "Antigen", label: "Antigen" },
  { value: "ASP.NET Web and Data Frameworks", label: "ASP.NET Web and Data Frameworks" },
  { value: "ASP.NET Web Frameworks", label: "ASP.NET Web Frameworks" },
  { value: "Azure Connected Machine Agent 3", label: "Azure Connected Machine Agent 3" },
  { value: "Azure Connected Machine Agent", label: "Azure Connected Machine Agent" },
  { value: "Azure File Sync agent updates for Windows Server 2012 R2", label: "Azure File Sync agent updates for Windows Server 2012 R2" },
  { value: "Azure File Sync agent updates for Windows Server 2016", label: "Azure File Sync agent updates for Windows Server 2016" },
  { value: "Azure File Sync agent updates for Windows Server 2019", label: "Azure File Sync agent updates for Windows Server 2019" },
  { value: "Azure File Sync agent updates for Windows Server 2022", label: "Azure File Sync agent updates for Windows Server 2022" },
  { value: "Azure File Sync agent updates for Windows Server 2025", label: "Azure File Sync agent updates for Windows Server 2025" },
  { value: "Azure File Sync", label: "Azure File Sync" },
  { value: "Azure IoT Edge for Linux on Windows Category", label: "Azure IoT Edge for Linux on Windows Category" },
  { value: "Azure IoT Edge for Linux on Windows", label: "Azure IoT Edge for Linux on Windows" },
  { value: "Azure Stack HCI", label: "Azure Stack HCI" },
  { value: "Bing Bar", label: "Bing Bar" },
  { value: "Bing", label: "Bing" },
  { value: "BizTalk Server 2002", label: "BizTalk Server 2002" },
  { value: "BizTalk Server 2006R2", label: "BizTalk Server 2006R2" },
  { value: "BizTalk Server 2009", label: "BizTalk Server 2009" },
  { value: "BizTalk Server 2013", label: "BizTalk Server 2013" },
  { value: "BizTalk Server", label: "BizTalk Server" },
  { value: "CAPICOM", label: "CAPICOM" },
  { value: "Category for System Center Online Client", label: "Category for System Center Online Client" },
  { value: "Compute Cluster Pack", label: "Compute Cluster Pack" },
  { value: "Data Protection Manager 2006", label: "Data Protection Manager 2006" },
  { value: "Developer Tools, Runtimes, and Redistributables", label: "Developer Tools, Runtimes, and Redistributables" },
  { value: "Device Health", label: "Device Health" },
  { value: "Dictionary Updates for Microsoft IMEs", label: "Dictionary Updates for Microsoft IMEs" },
  { value: "EU Browser Choice Update-For Europe Only", label: "EU Browser Choice Update-For Europe Only" },
  { value: "Exchange 2000 Server", label: "Exchange 2000 Server" },
  { value: "Exchange Server 2003", label: "Exchange Server 2003" },
  { value: "Exchange Server 2007 and Above Anti-spam", label: "Exchange Server 2007 and Above Anti-spam" },
  { value: "Exchange Server 2007", label: "Exchange Server 2007" },
  { value: "Exchange Server 2010", label: "Exchange Server 2010" },
  { value: "Exchange Server 2013", label: "Exchange Server 2013" },
  { value: "Exchange Server 2016", label: "Exchange Server 2016" },
  { value: "Exchange Server 2019", label: "Exchange Server 2019" },
  { value: "Exchange Server 2025", label: "Exchange Server 2025" },
  { value: "Exchange", label: "Exchange" },
  { value: "Expression Design 1", label: "Expression Design 1" },
  { value: "Expression Design 2", label: "Expression Design 2" },
  { value: "Expression Design 3", label: "Expression Design 3" },
  { value: "Expression Design 4", label: "Expression Design 4" },
  { value: "Expression Media 2", label: "Expression Media 2" },
  { value: "Expression Media V1", label: "Expression Media V1" },
  { value: "Expression Web 3", label: "Expression Web 3" },
  { value: "Expression Web 4", label: "Expression Web 4" },
  { value: "Expression", label: "Expression" },
  { value: "Firewall Client for ISA Server", label: "Firewall Client for ISA Server" },
  { value: "Forefront Client Security", label: "Forefront Client Security" },
  { value: "Forefront Identity Manager 2010 R2", label: "Forefront Identity Manager 2010 R2" },
  { value: "Forefront Identity Manager 2010", label: "Forefront Identity Manager 2010" },
  { value: "Forefront Protection Category", label: "Forefront Protection Category" },
  { value: "Forefront Server Security Category", label: "Forefront Server Security Category" },
  { value: "Forefront Threat Management Gateway, Definition Updates for HTTP Malware Inspection", label: "Forefront Threat Management Gateway, Definition Updates for HTTP Malware Inspection" },
  { value: "Forefront TMG MBE", label: "Forefront TMG MBE" },
  { value: "Forefront TMG", label: "Forefront TMG" },
  { value: "Forefront", label: "Forefront" },
  { value: "HealthVault Connection Center Upgrades", label: "HealthVault Connection Center Upgrades" },
  { value: "HealthVault Connection Center", label: "HealthVault Connection Center" },
  { value: "Host Integration Server 2000", label: "Host Integration Server 2000" },
  { value: "Host Integration Server 2004", label: "Host Integration Server 2004" },
  { value: "Host Integration Server 2006", label: "Host Integration Server 2006" },
  { value: "Host Integration Server 2009", label: "Host Integration Server 2009" },
  { value: "Host Integration Server 2010", label: "Host Integration Server 2010" },
  { value: "HPC Pack 2008", label: "HPC Pack 2008" },
  { value: "HPC Pack", label: "HPC Pack" },
  { value: "Internet Security and Acceleration Server 2004", label: "Internet Security and Acceleration Server 2004" },
  { value: "Internet Security and Acceleration Server 2006", label: "Internet Security and Acceleration Server 2006" },
  { value: "Internet Security and Acceleration Server", label: "Internet Security and Acceleration Server" },
  { value: "Kernel Updates", label: "Kernel Updates" },
  { value: "Local Publisher", label: "Local Publisher" },
  { value: "Locally published packages", label: "Locally published packages" },
  { value: "Microsoft 365 Apps/Office 2019/Office LTSC", label: "Microsoft 365 Apps/Office 2019/Office LTSC" },
  { value: "Microsoft Advanced Threat Analytics", label: "Microsoft Advanced Threat Analytics" },
  { value: "Microsoft Application Virtualization 4.5", label: "Microsoft Application Virtualization 4.5" },
  { value: "Microsoft Application Virtualization 4.6", label: "Microsoft Application Virtualization 4.6" },
  { value: "Microsoft Application Virtualization 5.0", label: "Microsoft Application Virtualization 5.0" },
  { value: "Microsoft Application Virtualization", label: "Microsoft Application Virtualization" },
  { value: "Microsoft Azure Backup Server V3 - Data Protection Manager", label: "Microsoft Azure Backup Server V3 - Data Protection Manager" },
  { value: "Microsoft Azure Backup Server V4 - Data Protection Manager", label: "Microsoft Azure Backup Server V4 - Data Protection Manager" },
  { value: "Microsoft Azure Edge Appliance", label: "Microsoft Azure Edge Appliance" },
  { value: "Microsoft Azure Information Protection Unified Labeling Client", label: "Microsoft Azure Information Protection Unified Labeling Client" },
  { value: "Microsoft Azure Information Protection", label: "Microsoft Azure Information Protection" },
  { value: "Microsoft Azure Site Recovery Provider", label: "Microsoft Azure Site Recovery Provider" },
  { value: "Microsoft Azure StorSimple", label: "Microsoft Azure StorSimple" },
  { value: "Microsoft Azure", label: "Microsoft Azure" },
  { value: "Microsoft BitLocker Administration and Monitoring v1", label: "Microsoft BitLocker Administration and Monitoring v1" },
  { value: "Microsoft BitLocker Administration and Monitoring", label: "Microsoft BitLocker Administration and Monitoring" },
  { value: "Microsoft Defender Antivirus", label: "Microsoft Defender Antivirus" },
  { value: "Microsoft Defender for Endpoint", label: "Microsoft Defender for Endpoint" },
  { value: "Microsoft Dynamics CRM 2011 SHS", label: "Microsoft Dynamics CRM 2011 SHS" },
  { value: "Microsoft Dynamics CRM 2011", label: "Microsoft Dynamics CRM 2011" },
  { value: "Microsoft Dynamics CRM 2013", label: "Microsoft Dynamics CRM 2013" },
  { value: "Microsoft Dynamics CRM 2015", label: "Microsoft Dynamics CRM 2015" },
  { value: "Microsoft Dynamics CRM 2016 SHS", label: "Microsoft Dynamics CRM 2016 SHS" },
  { value: "Microsoft Dynamics CRM 2016", label: "Microsoft Dynamics CRM 2016" },
  { value: "Microsoft Dynamics CRM", label: "Microsoft Dynamics CRM" },
  { value: "Microsoft Edge", label: "Microsoft Edge" },
  { value: "Microsoft HealthVault", label: "Microsoft HealthVault" },
  { value: "Microsoft Lync 2010", label: "Microsoft Lync 2010" },
  { value: "Microsoft Lync Server 2010", label: "Microsoft Lync Server 2010" },
  { value: "Microsoft Lync Server 2013", label: "Microsoft Lync Server 2013" },
  { value: "Microsoft Lync Server and Microsoft Lync", label: "Microsoft Lync Server and Microsoft Lync" },
  { value: "Microsoft Monitoring Agent (MMA)", label: "Microsoft Monitoring Agent (MMA)" },
  { value: "Microsoft Monitoring Agent", label: "Microsoft Monitoring Agent" },
  { value: "Microsoft ODBC Driver 17 for SQL Server", label: "Microsoft ODBC Driver 17 for SQL Server" },
  { value: "Microsoft ODBC Driver 18 for SQL Server", label: "Microsoft ODBC Driver 18 for SQL Server" },
  { value: "Microsoft OLE DB Driver 18 for SQL Server", label: "Microsoft OLE DB Driver 18 for SQL Server" },
  { value: "Microsoft OLE DB Driver 19 for SQL Server", label: "Microsoft OLE DB Driver 19 for SQL Server" }
];

const classificationList = [
  { value: "Classifications Updates", label: "Classifications Updates" },
  { value: "Applications", label: "Applications" },
  { value: "Critical Updates", label: "Critical Updates" },
  { value: "Definition Updates", label: "Definition Updates" },
  { value: "Driver Sets", label: "Driver Sets" },
  { value: "Drivers", label: "Drivers" },
  { value: "Feature Packs", label: "Feature Packs" },
  { value: "Security Updates", label: "Security Updates" },
  { value: "Service Packs", label: "Service Packs" },
  { value: "Tools", label: "Tools" },
  { value: "Update Rollups", label: "Update Rollups" },
  { value: "Updates", label: "Updates" },
  { value: "Upgrades", label: "Upgrades" }
];

const classificationIcons = {
    Applications: MonitorSmartphone,
    'Critical Updates': BadgeAlert,
    'Definition Updates': ShieldCheck,
    'Driver Sets': HardDrive,
    Drivers: Cpu,
    'Feature Packs': Sparkles,
    'Security Updates': ShieldCheck,
    'Service Packs': Package,
    Tools: Wrench,
    'Update Rollups': Layers3,
    Updates: RefreshCcw,
    Upgrades: CircleDot,
};

    const [selectedProducts, setSelectedProducts] = useState([
        '.NET 10.0',
        '.NET 5.0',
        '.NET 6.0',
        '.NET 7.0',
    ]);

    const [enabledClassifications, setEnabledClassifications] = useState([
        'Applications',
        'Critical Updates',
        'Updates',
    ]);

    const [search, setSearch] = useState('');

    const toggleProduct = (product) => {
        setSelectedProducts((prev) =>
            prev.includes(product)
                ? prev.filter((p) => p !== product)
                : [...prev, product]
        );
    };

    const toggleClassification = (item) => {
        setEnabledClassifications((prev) =>
            prev.includes(item)
                ? prev.filter((p) => p !== item)
                : [...prev, item]
        );
    };

    const filteredProducts = productList.filter((item) =>
        item.label.toLowerCase().includes(search.toLowerCase())
    );

    const handleReset = () => {
    setSelectedProducts([]);
    setEnabledClassifications([]);
    setSearch('');
};

// MAIN CONTENT
    return (
        <div className="min-h-screen  text-white p-2 ">
            <ToastContainer />
            {/* Main Wrapper */}
            <div className="bg-[#0B1220] rounded-xl p-2 border border-white/10">
                {/* Header */}
               <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 p-4 border-b border-white/10">
                    <div>   
                        <h1 className="text-xl font-semibold"> Product & Classification </h1>
                        <p className="text-sm text-gray-400 mt-1">
                            Curate the products and update categories to sync
                            from Microsoft Update.
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <button onClick={handleReset} className="h-10 px-4 rounded-lg border border-white/10 bg-[#111C2F] hover:bg-[#16243a] transition flex items-center gap-2 text-sm">
                            <RotateCcw size={16} /> Reset
                        </button>

                        <button className="h-10 px-5 rounded-lg bg-blue-600 hover:bg-blue-700 transition flex items-center gap-2 text-sm font-medium shadow-md shadow-blue-500/20">
                            <Save size={16} /> Update
                        </button>
                    </div>
                </div>

                {/* Top Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 p-4 pt-0 mt-4">
                    {[
                        { title: 'Products selected', value: selectedProducts.length, total: productList.length, icon: Boxes, color: 'text-cyan-400',  },
                        { title: 'Classifications', value: enabledClassifications.length, total: classificationList.length, icon: Layers3, color: 'text-emerald-400', },
                        { title: 'Sync status', value: 'Pending', subtitle: 'Awaiting update', icon: RefreshCcw, color: 'text-yellow-400', }                        
                    ].map((card, idx) => {
                        const Icon = card.icon;
                        return (
                            <div key={idx} className="bg-[#0E1728] rounded-xl px-4 py-3 border border-white/10 min-h-[78px]" >
                                <div className="flex items-start justify-between">
                                    <div>
                                        <p className="text-xs text-gray-400"> {card.title} </p>
                                        <h3 className="text-xl font-semibold mt-3"> {card.value} </h3>
                                        {card.total && (
                                            <p className="text-xs text-gray-500 mt-1"> of {card.total} </p>
                                        )}
                                        {card.subtitle && (
                                            <p className="text-xs text-gray-500 mt-1">  {card.subtitle} </p>
                                        )}
                                    </div>

                                    <div className={`w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center ${card.color}`} >
                                        <Icon size={18} />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Content */}
                <div className="grid grid-cols-1 xl:grid-cols-[1.5fr_1fr] gap-4 p-4 pt-0">
                    {/* Products */}
                    <div className="bg-[#0E1728] rounded-xl border border-white/10 overflow-hidden flex flex-col h-[720px]">
                        {/* Header */}
                        <div className="border-b border-white/10 p-4">
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                                    <Boxes size={18} />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h2 className="font-semibold"> Products </h2>

                                        <span className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 text-[10px] border border-blue-500/20">
                                            {selectedProducts.length} active
                                        </span>
                                    </div>
                                    <p className="text-xs text-gray-400 mt-1"> Tap a product to add it. Click the × on  a chip to remove. </p>
                                </div>
                            </div>
                        </div>

                        {/* Selected */}
                        <div className="p-4 border-b border-white/10">
                            <p className="text-[11px] uppercase tracking-wide text-gray-500 mb-3"> Active Selection </p>

                            <div className="flex flex-wrap gap-2">
                                {selectedProducts.map((item) => (
                                    <div key={item} className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs bg-cyan-500/10 border border-cyan-500/30 text-sm text-cyan-300" >
                                        <span>{item}</span>
                                        <button onClick={() => toggleProduct(item) } className="hover:text-red-400" >
                                            <X size={14} />
                                        </button>
                                    </div>
                                ))}
                            </div>

                            {/* Search */}
                            <div className="relative mt-5">
                                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />

                                <input type="text" placeholder="Search catalog..." value={search} onChange={(e) => setSearch(e.target.value) }
                                    className="w-full h-9 rounded-xl border border-white/10 bg-[#111827] pl-11 pr-4 text-xs outline-none focus:border-cyan-500/50" />
                            </div>
                        </div>

                        {/* Product List */}
                        <div className="p-4 overflow-y-auto hide-scrollbar flex-1">
                            <div className="flex items-center justify-between mb-4">
                                <p className="text-[11px] uppercase tracking-wide text-gray-500"> Catalog </p>
                                <p className="text-[11px] text-cyan-400"> {filteredProducts.length} available </p>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {filteredProducts.map((item) => {
                                    const active = selectedProducts.includes(item.value);
                                    return (
                                        <button key={item.value} onClick={() => toggleProduct(item.value) }
                                            className={`px-2.5 py-1.5 rounded-full border text-xs transition-all duration-200
                                                ${ active
                                                        ? 'bg-cyan-500/15 border-cyan-500/40 text-cyan-300'
                                                        : 'bg-white/[0.03] border-white/10 text-gray-300 hover:border-cyan-500/40 hover:text-cyan-300'
                                                }
                                            `} >
                                            + {item.label}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Classification */}
                    <div className="bg-[#0E1728] rounded-xl border border-white/10 overflow-hidden">
                        {/* Header */}
                        <div className="border-b border-white/10 p-4">
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                                    <Layers3 size={18} />
                                </div>

                                <div>
                                    <div className="flex items-center gap-2">
                                        <h2 className="font-semibold"> Classifications </h2>

                                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] border border-emerald-500/20">
                                            { enabledClassifications.length
                                            }{' '} on
                                        </span>
                                    </div>

                                    <p className="text-xs text-gray-400 mt-1"> Toggle update categories on or off. </p>
                                </div>
                            </div>
                        </div>

                        {/* Cards */}
                        <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                            {classificationList.map((item) => {
                                const enabled =
                                    enabledClassifications.includes( item.value );

                                const Icon = classificationIcons[item.value] || Layers3;

                                return (
                                    <div
                                        key={item.value}
                                        className={`rounded-xl border p-4 transition-all
                                            ${
                                                enabled
                                                    ? 'border-cyan-500/40 bg-cyan-500/10'
                                                    : 'border-white/10 bg-white/[0.02]'
                                            }
                                        `}
                                    >
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="flex gap-3">
                                                <div
                                                    className={`w-10 h-10 rounded-lg flex items-center justify-center
                                                        ${
                                                            enabled
                                                                ? 'bg-cyan-500/10 text-cyan-400'
                                                                : 'bg-white/5 text-gray-400'
                                                        }
                                                    `}
                                                >
                                                    <Icon size={18} />
                                                </div>

                                                <div>
                                                    <h3 className="text-[13px] font-medium"> {item.label} </h3>
                                                    <p className="text-[11px] text-gray-500 mt-1"> Microsoft update category </p>
                                                </div>
                                            </div>

                                            {/* Toggle */}
                                            {/* <button
                                                onClick={() =>
                                                    toggleClassification(
                                                        item.value
                                                    )
                                                }
                                                className={`w-11 h-6 rounded-full transition relative
                                                    ${
                                                        enabled
                                                            ? 'bg-cyan-500'
                                                            : 'bg-[#1B2638]'
                                                    }
                                                `}
                                            >
                                                <div
                                                    className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all
                                                        ${
                                                            enabled
                                                                ? 'right-1'
                                                                : 'left-1'
                                                        }
                                                    `}
                                                />
                                            </button> */}
                                            <label className="relative flex items-center cursor-pointer mt-1">
    <input
        type="checkbox"
        checked={enabled}
        onChange={() => toggleClassification(item.value)}
        className="peer hidden"
    />

    <div className="w-5 h-5 rounded-md border border-white/20 bg-[#111827] flex items-center justify-center peer-checked:bg-cyan-500 peer-checked:border-cyan-500 transition-all">
        {enabled && (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-3 h-3 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                />
            </svg>
        )}
    </div>
</label>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductClassification
