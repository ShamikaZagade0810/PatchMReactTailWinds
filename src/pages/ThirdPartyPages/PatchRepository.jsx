import React, { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom"
import {
    Search,
    RefreshCw,
    Download,
    CheckCircle2,
    ShieldAlert,
    AlertTriangle,
    PackageCheck
} from 'lucide-react';
import {
    getThirdPartyPatchRepo,

} from "../../api/projectApi";


const PatchRepository = () => {
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const [severityFilter, setSeverityFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [repoData, setRepoData] = useState([]);
    const [loading, setLoading] = useState(false);
    const handleOpen = (srNo) => {
        navigate(`/patchTree/patchDetails/${srNo}`);
    };



    useEffect(() => {

        getData();


    }, []);

    const getData = async () => {

        setLoading(true);
        const Repodata = await getThirdPartyPatchRepo();
        console.log("Data --> ", Repodata.data.data);
        setRepoData(Repodata.data.data);
        setLoading(false);

    }




    const softwareData = [
        {
            id: 1,
            name: "ZWCAD Personal",
            vendor: "ZWSOFT",
            size: "412 MB",
            version: "3.0.0.19841",
            updated: "2026-02-20 16:50",
            installed: false,
            icon: "📦",
        },
        {
            id: 2,
            name: "Google Chrome",
            vendor: "Google LLC",
            size: "93 MB",
            version: "133.0.6943.60",
            updated: "2026-02-18 14:35",
            installed: true,
            icon: "🌐",
        },
        {
            id: 3,
            name: "Adobe Reader",
            vendor: "Adobe",
            size: "548 MB",
            version: "24.005.20320",
            updated: "2026-02-15 09:15",
            installed: true,
            icon: "📕",
        },
        {
            id: 4,
            name: "7-Zip",
            vendor: "Igor Pavlov",
            size: "5.5 MB",
            version: "24.09",
            updated: "2026-01-10 10:00",
            installed: false,
            icon: "🗜️",
        },
    ];

    const filteredSoftware = useMemo(() => {
        return repoData.filter((app) =>
            app.appName.toLowerCase().includes(search.toLowerCase()) ||
            app.installedVersion.toLowerCase().includes(search.toLowerCase()) ||
            app.latestVersion.toLowerCase().includes(search.toLowerCase())
        );
    }, [search, repoData]);





    const SoftwareCard = ({ app }) => {
        return (
            <div className="bg-[#081224] border border-[#1b2a45] rounded-3xl p-5 shadow-lg hover:shadow-cyan-500/10 transition-all duration-300 hover:-translate-y-1">

                {/* Top */}
                <div className="flex items-start justify-between mb-2">
                    <div className="w-10 h-10 rounded-2xl bg-[#131f38] flex items-center justify-center text-2xl">
                        {softwareData[0].icon}
                    </div>

                    <div
                        className={`px-4 py-1 rounded-full text-sm  border
          ${app.installedVersion == "Installed"
                                ? "bg-green-500/10 text-green-400 border-green-500/30"
                                : "bg-yellow-500/10 text-yellow-400 border-yellow-500/30"
                            }`}
                    >
                        {app.installedVersion}
                    </div>
                </div>

                {/* Content */}
                <h2 className="text-white text-sm font-bold mb-1">
                    {app.appName}
                </h2>



                {/* Details */}
                <div className="space-y-3 mb-6">
                    <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm">Latest</span>
                        <span className="text-cyan-400 font-semibold text-sm">
                            {app.latestVersion}
                        </span>
                    </div>



                    <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-xs">Updated</span>
                        <span className="text-white text-sm">
                            {new Date(app.updatedAt).toLocaleDateString("en-IN", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                            })}
                        </span>
                    </div>
                </div>

                {/* Button */}
                <button className="w-full h-12 rounded-2xl bg-[#131f38] hover:bg-[#1a2a48] border border-[#223457] text-white font-semibold flex items-center justify-center gap-2 transition-all duration-300">
                    <Download size={18} />
                    Download
                </button>
            </div>
        );
    };
    return (
        <div className="bg-[#050B18] rounded-xl p-2 border border-white/10 min-h-screen text-white text-sm">

            {/* <div className="bg-[#0F172A] rounded-xl border border-white/10 p-4"> */}

            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-5">

               

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


            {/* Search + Filters */}
            <div className="bg-[#0B1220] rounded-xl p-3 border border-[#1e293b] mb-3">
                <div className="flex flex-col lg:flex-row gap-3 items-center">

                    {/* Search */}
                    <div className="relative flex-1">
                        <Search
                            size={15}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        />

                        <input
                            type="text"
                            placeholder="Search software..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-[#111827] border border-[#1e293b] 
        focus:border-cyan-500 outline-none rounded-lg 
        pl-9 pr-4 py-2.5 text-xs text-white"
                        />
                    </div>

                    {/* Status Dropdown */}
                 

                    {/* Showing Count */}
                    <div className="text-[11px] text-gray-400 whitespace-nowrap ml-auto">
                        Showing {filteredSoftware.length} of {repoData.length}
                    </div>

                </div>
            </div>

            {/* Table */}
          {loading ? (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[999]">
                    <div className="flex flex-col items-center gap-3">

                        {/* Spinner */}
                        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

                        {/* Text */}
                        <p className="text-white text-sm">Loading data...</p>

                    </div>
                </div>
            ) :

            (<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                {filteredSoftware.map((app) => (
                    <SoftwareCard key={app.id} app={app} />
                ))}
            </div>)

             }



        </div>
    )
}

export default PatchRepository;
