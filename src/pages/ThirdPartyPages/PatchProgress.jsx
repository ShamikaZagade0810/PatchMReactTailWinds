import React, { useEffect, useMemo, useState } from 'react';
import {
    CheckCircle2,
    Download,
    Clock3,
    AlertCircle,
    Loader2,
    Monitor,
    Wifi,
    Activity,
    Zap,
} from "lucide-react";
import { getThirdPartypatchprogress } from "../../api/projectApi";
// const PatchProgressData = [
//     [
//         25,
//         "2026-05-06 13:15:47",
//         "NA",
//         "0",
//         "ClientFail",
//         "192.168.0.2",
//         "task_configpatch-0.0.0.1",
//         "configpatch-0.0.0.1",
//         "task_configpatch-0.0.0.1",
//         "WindowsPatch",
//         "Sumit-Shedge",
//     ],
//     [
//         34,
//         "2026-05-06 13:05:15",
//         "NA",
//         "0",
//         "Downloading",
//         "192.168.0.54",
//         "task_configpatch-0.0.0.1",
//         "configpatch-0.0.0.1",
//         "task_configpatch-0.0.0.1",
//         "WindowsPatch",
//         "Sumit-Shedge",
//     ],
//     [
//         32,
//         "2026-02-20 16:50:51",
//         "NA",
//         "0",
//         "Downloading",
//         "192.168.0.236",
//         "task_notepad__-8.8.8",
//         "notepad__-8.8.8",
//         "task_notepad__-8.8.8",
//         "WindowsPatch",
//         "DESKTOP-F7V9A7C",
//     ],
// ];

function PatchProgress() {
    const [PatchProgressData, setPatchProgressData] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {

        getData();


    }, []);

    const getData = async () => {

        setLoading(true);
        const Repodata = await getThirdPartypatchprogress();
        console.log("Data --> ", Repodata.data.data);
        setPatchProgressData(Repodata.data.data);
        setLoading(false);

    }


    const getStatusConfig = (status) => {
        switch (status) {
            case "Completed":
                return {
                    badge:
                        "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20",
                    progress: "bg-emerald-400",
                    icon: CheckCircle2,
                };

            case "Downloading":
                return {
                    badge:
                        "bg-violet-500/15 text-violet-300 border border-violet-500/20",
                    progress: "bg-violet-400",
                    icon: Download,
                };

            case "ClientFail":
                return {
                    badge: "bg-red-500/15 text-red-400 border border-red-500/20",
                    progress: "bg-red-400",
                    icon: AlertCircle,
                };

            default:
                return {
                    badge: "bg-slate-500/15 text-slate-300 border border-slate-500/20",
                    progress: "bg-slate-400",
                    icon: Clock3,
                };
        }
    };

    return (
        <div className="bg-[#0B1220] rounded-xl p-2 border border-white/10 min-h-screen text-white">
            {/* Top Summary */}


            {/* Main Panel */}
            <div className="bg-[#101A2E] border border-white/10 rounded-2xl p-4">
                {/* Header */}
                <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-2">
                        <div className="w-1 h-5 bg-cyan-400 rounded-full" />
                        <h2 className="font-semibold text-lg">
                            Live Deployment Monitor
                        </h2>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-gray-400">
                        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        LIVE
                        <span>Updated 20s ago</span>
                    </div>
                </div>

                {/* Patch Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {PatchProgressData.map((item, index) => {
                        const progress = item["srNo"];
                        const status = item["currentStatus"];
                        const ip = item["ipAddress"];
                        const patchName = item["profile"];
                        const machine = item["type"];

                        const statusConfig = getStatusConfig(status);
                        const StatusIcon = statusConfig.icon;

                        return (
                            <div
                                key={index}
                                className="bg-[#0D1526] border border-white/10 rounded-2xl p-4 hover:border-cyan-500/20 transition-all duration-300"
                            >
                                {/* Top */}
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h3 className="font-semibold text-sm capitalize">
                                            {patchName.replaceAll("_", " ")}
                                        </h3>

                                        <p className="text-cyan-400 text-xs mt-1">
                                            v{Math.floor(Math.random() * 20)}.
                                            {Math.floor(Math.random() * 10)}.
                                            {Math.floor(Math.random() * 10)}
                                        </p>
                                    </div>

                                    <div
                                        className={`px-3 py-1 rounded-full text-[11px] font-medium flex items-center gap-1 ${statusConfig.badge}`}
                                    >
                                        <StatusIcon className="w-3.5 h-3.5" />
                                        {status}
                                    </div>
                                </div>

                                {/* System Info */}
                                <div className="flex items-center gap-4 mt-4 text-xs text-gray-400">
                                    <div className="flex items-center gap-1">
                                        <Monitor className="w-3.5 h-3.5" />
                                        {machine}
                                    </div>

                                    <div className="flex items-center gap-1">
                                        <Wifi className="w-3.5 h-3.5" />
                                        {ip}
                                    </div>
                                </div>

                                {/* Progress */}
                                <div className="mt-5">
                                    <div className="flex items-center justify-between text-xs mb-2">
                                        <span className="text-gray-400">Progress</span>
                                        <span className="font-semibold">{progress}%</span>
                                    </div>

                                    <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                                        <div
                                            className={`h-full rounded-full transition-all duration-700 ${statusConfig.progress}`}
                                            style={{ width: `${progress}%` }}
                                        />
                                    </div>
                                </div>

                                {/* Footer */}
                                <div className="flex items-center justify-between mt-5 text-xs text-gray-500">
                                    <div className="flex items-center gap-2">
                                        <Download className="w-3.5 h-3.5" />
                                        42 MB
                                    </div>

                                    <div>{item[1]}</div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default PatchProgress;