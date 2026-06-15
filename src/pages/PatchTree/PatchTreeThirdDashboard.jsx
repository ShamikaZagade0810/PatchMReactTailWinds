import React, { useState, useEffect } from 'react'
import {
    CheckCircle2,
    ShieldCheck,
    XCircle,
    AlertTriangle,
    ArrowUpRight,
} from "lucide-react";
import SinglePieCharts from '../../components/Charts/SinglePiecharts';
import {
    PatchTreewsus_dashboard_statistics,
    getSynchronizeStatus,
    getSyncPercent,
    getServerStatisticData,
    getComputerStatusPie,
    getupdateStatus,
    getrecentActivity
} from "../../api/projectApi";

const patchCards = [
    {
        title: "Total Installed",
        value: "82,451",
        change: "+12.4%",
        icon: CheckCircle2,
        border: "border-cyan-500/40",
        glow: "shadow-cyan-500/20",
        bg: "from-cyan-500/10 to-cyan-700/5",
        iconBg: "bg-cyan-500/15",
        iconColor: "text-cyan-400",
        line: "bg-cyan-400",
        id: "totalPatches"
    },
    {
        title: "Successful Updates",
        value: "74,210",
        change: "+8.1%",
        icon: ShieldCheck,
        border: "border-emerald-500/40",
        glow: "shadow-emerald-500/20",
        bg: "from-emerald-500/10 to-emerald-700/5",
        iconBg: "bg-emerald-500/15",
        iconColor: "text-emerald-400",
        line: "bg-emerald-400",
        id: "successfullyInstalledPatches"
    },
    {
        title: "Failed Updates",
        value: "1,245",
        change: "-2.4%",
        icon: XCircle,
        border: "border-red-500/40",
        glow: "shadow-red-500/20",
        bg: "from-red-500/10 to-red-700/5",
        iconBg: "bg-red-500/15",
        iconColor: "text-red-400",
        line: "bg-red-400",
        id: "failedUniquePatches"
    },
    {
        title: "Missing Patches",
        value: "6,920",
        change: "+5.7%",
        icon: AlertTriangle,
        border: "border-yellow-500/40",
        glow: "shadow-yellow-500/20",
        bg: "from-yellow-500/10 to-yellow-700/5",
        iconBg: "bg-yellow-500/15",
        iconColor: "text-yellow-400",
        line: "bg-yellow-400",
        id: "missingUniquePatches"
    },
];


function PatchTreeThirdDashboard() {
    const [patchTreeWsusDashboardStatistics, setPatchTreeWsusDashboardStatistics] = useState({});
    const [synchronizeStatus, setSynchronizeStatus] = useState({});
    const [syncPercent, setSyncPercent] = useState({});
    const [serverStatisticData, setServerStatisticData] = useState({});
    const [computerStatusPie, setComputerStatusPie] = useState([]);
    const [updateStatus, setUpdateStatus] = useState([]);
    const [recentActivity, setRecentActivity] = useState([]);
    const COLORS = ["#ff4d4f", "#fa8c16", "#fadb14", "#52c41a"];


    useEffect(() => {
        console.log("Hello World");
        apiCalls();


    }, []);




    const apiCalls = async () => {
        try {
            const [
                PatchTreewsus_dashboard_statisticsRes,
                getSynchronizeStatusRes,
                getSyncPercentRes,
                getServerStatisticDataRes,
                getComputerStatusPieRes,
                getupdateStatusRes,
                getrecentActivityRes

            ] = await Promise.all([
                PatchTreewsus_dashboard_statistics(),
                getSynchronizeStatus(),
                getSyncPercent(),
                getServerStatisticData(),
                getComputerStatusPie(),
                getupdateStatus(),
                getrecentActivity()
            ]);
            console.log("Computer Status ", getComputerStatusPieRes.data.data);

            setPatchTreeWsusDashboardStatistics(
                PatchTreewsus_dashboard_statisticsRes.data.data
            );

            setSynchronizeStatus(
                getSynchronizeStatusRes.data.data[0] || {}
            );

            setSyncPercent(
                getSyncPercentRes.data.data
            );

            setServerStatisticData(
                getServerStatisticDataRes.data.data
            );

            setComputerStatusPie(
                getComputerStatusPieRes.data.data
            );

            setUpdateStatus(
                getupdateStatusRes.data.data
            );

            let approvedActivities = getrecentActivityRes.data.data.approvedUpdates;
            let installationTimeline = getrecentActivityRes.data.data.installationTimeline
            const mergedActivities = [
                ...approvedActivities,
                ...installationTimeline
            ];
            setRecentActivity(
                mergedActivities
            );



        } catch (error) {
            console.error("API Error:", error);
        }
    };

    const handleClickModalParameter = () => {

    }

    return (
        <div className="mb-1 bg-gray-100 dark:bg-[#0B1220] p-3">
            <div className="grid grid-cols-12 gap-4 bg-[#121A2B] p-2">

                {/* LEFT SMALL CARDS SECTION */}
                <div className="col-span-12 xl:col-span-3">
                    <div className="col-span-12 xl:col-span-3">
                        <div className="grid grid-cols-1 gap-2">

                            {patchCards.map((card, index) => {
                                const Icon = card.icon;

                                return (
                                    <div
                                        key={index}
                                        className={`relative overflow-hidden rounded-lg border
                    ${card.border}
                    bg-gradient-to-br ${card.bg}
                    p-2.5 transition-all duration-300
                    hover:scale-[1.02]
                    hover:shadow-lg ${card.glow}
                    h-[57px] group`}
                                    >

                                        {/* Glow */}
                                        <div className="absolute -top-6 -right-6 h-14 w-14 rounded-full bg-white/5 blur-2xl"></div>

                                        {/* Header */}
                                        <div className="flex items-start justify-between">

                                            <div>
                                                <p className="text-[8px] uppercase tracking-[1px] text-slate-400 font-medium">
                                                    {card.title}
                                                </p>

                                                <h2 className="mt-1 text-lg font-bold text-white leading-none">
                                                    {patchTreeWsusDashboardStatistics[card.id] || 0}
                                                </h2>
                                            </div>

                                            <div
                                                className={`flex h-7 w-7 items-center justify-center rounded-md
                            ${card.iconBg} border border-white/10`}
                                            >
                                                <Icon className={`h-3.5 w-3.5 ${card.iconColor}`} />
                                            </div>

                                        </div>

                                        {/* Change */}
                                        <div
                                            className={`mt-2 inline-flex items-center gap-1 rounded-full
                        px-1.5 py-[2px] text-[8px] font-medium
                        ${card.iconBg} ${card.iconColor}`}
                                        >
                                            <ArrowUpRight className="h-2 w-2" />
                                            {card.change}
                                        </div>

                                        {/* Mini Graph */}


                                        {/* Bottom Border */}
                                        <div
                                            className={`absolute bottom-0 left-0 h-[2px] w-full ${card.line}`}
                                        />
                                    </div>
                                );
                            })}

                        </div>
                        <div className='grid grid-cols-3 gap-2 mt-2'>
                            {/* Computers */}
                            <div className="bg-[#1E273A] rounded-lg p-1 border border-[#1E293B] h-[70px] flex flex-col justify-center">
                                <p className="text-[8px] uppercase tracking-[1.5px] text-gray-300">
                                    Computers
                                </p>

                                <h3 className="text-lg font-bold text-white leading-none mt-1">
                                    {patchTreeWsusDashboardStatistics['totalMachines'] || 0}
                                </h3>
                            </div>

                            {/* Groups */}
                            <div className="bg-[#1E273A] rounded-lg p-2 border border-[#1E293B]  h-[70px] flex flex-col justify-center">
                                <p className="text-[8px] uppercase tracking-[1.5px] text-gray-300">
                                    Groups
                                </p>

                                <h3 className="text-lg font-bold text-white leading-none mt-1">
                                    {patchTreeWsusDashboardStatistics['totalGroups'] || 0}
                                </h3>
                            </div>

                            {/* Sync Errors */}
                            <div className="bg-[#1E273A] rounded-lg p-2 border border-red-500/20  h-[70px] flex flex-col justify-center">
                                <p className="text-[8px] uppercase tracking-[1.5px] text-gray-300">
                                    Sync Errors
                                </p>

                                <h3 className="text-lg font-bold text-red-400 leading-none mt-1">
                                    —
                                </h3>
                            </div>

                        </div>

                    </div>
                </div>



                <div className="col-span-12 xl:col-span-4">
                    <div className="rounded-2xl bg-[#0E1728] rounded-xl border border-white/10 shadow-xl p-2">

                        {/* Header */}
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-1">

                                {/* Icon */}
                                <div className="w-8 h-8 rounded-lg bg-[#141E33] flex items-center justify-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-4 h-4 text-violet-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M4 4v5h.582M20 20v-5h-.581M5.64 9A7 7 0 0119 8m-.64 7A7 7 0 015 16"
                                        />
                                    </svg>
                                </div>

                                <h2 className="text-sm font-medium text-white">
                                    Synchronization status
                                </h2>
                            </div>

                        </div>

                        {/* Status Banner */}
                        <div className="bg-[#062B18] border border-green-900 rounded-xl p-2 mb-2">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>

                                <span className="text-green-400 text-sm font-semibold">
                                    Idle
                                </span>

                                <span className="text-gray-400 text-xs">
                                    — last sync  {synchronizeStatus?.lastSyncResult || "N/A"}
                                </span>
                            </div>

                            <p className="text-[11px] text-gray-500 mt-2">
                                Microsoft Update metadata • 12.4 MB received
                            </p>
                        </div>

                        {/* Status Boxes */}
                        <div className="grid grid-cols-2 gap-3 mb-5">

                            {/* Status */}
                            <div className="bg-[#1E273A] rounded-xl p-3">
                                <p className="text-[10px] uppercase tracking-wider text-gray-300 mb-2">
                                    Current  Status
                                </p>

                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-indigo-400"></div>

                                    <span className="text-white text-sm font-semibold">
                                        {synchronizeStatus?.syncStatus || "N/A"}
                                    </span>
                                </div>
                            </div>

                            {/* Result */}
                            <div className="bg-[#1E273A] rounded-xl p-3">
                                <p className="text-[10px] uppercase tracking-wider text-gray-300 mb-2">
                                    Result
                                </p>

                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-green-400"></div>

                                    <span className="text-green-400 text-sm font-semibold">
                                        Succeeded
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Last Sync / Next Sync */}
                        <div className="grid grid-cols-2 gap-3 mb-5">

                            <div className='bg-[#1E273A] rounded-xl p-3'>
                                <p className="text-[10px] uppercase tracking-wider text-gray-300 mb-2">
                                    Last Sync
                                </p>

                                <div className="flex items-center gap-2 text-gray-300 text-xs">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-4 h-4 text-gray-500"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M12 8v4l3 3"
                                        />
                                        <circle cx="12" cy="12" r="9" />
                                    </svg>

                                    {synchronizeStatus?.lastSyncTime || "N/A"}
                                </div>
                            </div>

                            <div className='bg-[#1E273A] rounded-xl p-3'>

                                <p className="text-[10px] uppercase tracking-wider text-gray-300 mb-2">
                                    Next Sync
                                </p>

                                <div className="flex items-center justify-between gap-3">

                                    {/* Time */}
                                    <div className="flex items-center gap-2 text-gray-300 text-xs">

                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-4 h-4 text-gray-500"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M12 8v4l3 3"
                                            />

                                            <circle cx="12" cy="12" r="9" />
                                        </svg>

                                        <span>
                                            {new Date().toLocaleString("en-IN", {
                                                hour: "2-digit",
                                                minute: "2-digit",
                                                hour12: true,
                                                day: "2-digit",
                                                month: "short"
                                            })}
                                        </span>
                                    </div>

                                    {/* Sync Button */}
                                    <button
                                        className="
                px-3 py-1.5
                rounded-lg
                bg-cyan-500/15
                border border-cyan-400/20
                text-cyan-300
                text-[11px]
                font-medium
                hover:bg-cyan-500/25
                hover:border-cyan-400/40
                transition-all duration-300
                active:scale-95
            "
                                      
                                    >
                                        Sync Now
                                    </button>

                                </div>
                            </div>

                        </div>

                        {/* Footer Progress */}

                    </div>




                </div>

                <div className="col-span-12 xl:col-span-5">
                    <div className="rounded-2xl bg-[#0E1728] rounded-xl border border-white/10 shadow-xl p-3">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-5">

                            <div className="flex items-center gap-2">

                                {/* Icon */}
                                <div className="w-8 h-8 rounded-lg bg-[#141E33] flex items-center justify-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-4 h-4 text-cyan-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M9 17v-2a4 4 0 014-4h7"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M3 7h18"
                                        />
                                    </svg>
                                </div>

                                <h2 className="text-sm font-medium text-white">
                                    Server statistics
                                </h2>
                            </div>

                            <span className="text-[10px] uppercase tracking-wider text-gray-500">
                                Aggregate
                            </span>
                        </div>

                        {/* Statistics */}
                        <div className="space-y-5">

                            {/* Row 1 */}
                            <div>
                                <div className="flex items-center justify-between mb-2">

                                    <div className="flex items-center gap-2">
                                        <div className="w-5 h-5 rounded-full bg-yellow-500/20 flex items-center justify-center">
                                            <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                                        </div>

                                        <span className="text-sm text-gray-300">
                                            Unapproved updates
                                        </span>
                                    </div>

                                    <span className="text-sm font-semibold text-white">
                                        {serverStatisticData['unapprovedPatches']}
                                    </span>
                                </div>

                                <div className="w-full h-1.5 bg-[#1B2437] rounded-full overflow-hidden">
                                    <div className="h-full w-[72%] bg-yellow-400 rounded-full"></div>
                                </div>
                            </div>

                            {/* Row 2 */}
                            <div>
                                <div className="flex items-center justify-between mb-2">

                                    <div className="flex items-center gap-2">
                                        <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
                                            <div className="w-2 h-2 rounded-full bg-green-400"></div>
                                        </div>

                                        <span className="text-sm text-gray-300">
                                            Approved updates
                                        </span>
                                    </div>

                                    <span className="text-sm font-semibold text-green-400">
                                        {serverStatisticData['approvedPatches']}
                                    </span>
                                </div>

                                <div className="w-full h-1.5 bg-[#1B2437] rounded-full overflow-hidden">
                                    <div className="h-full w-[18%] bg-green-400 rounded-full"></div>
                                </div>
                            </div>

                            {/* Row 3 */}
                            <div>
                                <div className="flex items-center justify-between mb-2">

                                    <div className="flex items-center gap-2">
                                        <div className="w-5 h-5 rounded-full bg-indigo-500/20 flex items-center justify-center">
                                            <div className="w-2 h-2 rounded-full bg-indigo-400"></div>
                                        </div>

                                        <span className="text-sm text-gray-300">
                                            Declined / Superseded
                                        </span>
                                    </div>

                                    <span className="text-sm font-semibold text-gray-300">
                                        {serverStatisticData['declinedPatches']}
                                    </span>
                                </div>

                                <div className="w-full h-1.5 bg-[#1B2437] rounded-full overflow-hidden">
                                    <div className="h-full w-[42%] bg-indigo-400 rounded-full"></div>
                                </div>
                            </div>

                            {/* Row 4 */}
                            <div>
                                <div className="flex items-center justify-between mb-2">

                                    <div className="flex items-center gap-2">
                                        <div className="w-5 h-5 rounded-full bg-cyan-500/20 flex items-center justify-center">
                                            <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
                                        </div>

                                        <span className="text-sm text-gray-300">
                                            Total updates indexed
                                        </span>
                                    </div>

                                    <span className="text-sm font-semibold text-cyan-400">
                                        {serverStatisticData['totalPatches']}
                                    </span>
                                </div>

                                <div className="w-full h-1.5 bg-[#1B2437] rounded-full overflow-hidden">
                                    <div className="h-full w-[88%] bg-cyan-400 rounded-full"></div>
                                </div>
                            </div>
                        </div>

                        {/* Footer Cards */}
                        <div className="grid grid-cols-3 gap-3 mt-6">


                        </div>


                    </div>




                </div>





            </div>


            <div className="grid grid-cols-12 gap-4 mt-1 bg-[#121A2B] p-2 items-stretch">

                {/* LEFT SMALL CARDS SECTION */}
                <div className="col-span-12 xl:col-span-4">
                    <div className="rounded-2xl bg-[#0E1728] rounded-xl border border-white/10 shadow-xl p-3  h-full flex flex-col">

                        <div className="flex items-start justify-between mb-6">
                            <div>
                                <h2 className="text-white text-lg font-semibold flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                                    Computer Status
                                </h2>
                                <p className="text-slate-400 text-sm mt-1">
                                    Real-time fleet patching breakdown
                                </p>
                            </div>

                            <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-medium">
                                LIVE
                            </span>
                        </div>

                        {/* Content */}
                        <div className="flex items-center gap-8">

                            {/* Donut Chart */}
                            <div className="relative w-48 h-48 flex items-center justify-center">

                                <div className="w-50 h-50 relative">
                                    <SinglePieCharts data={computerStatusPie} onSliceClick={handleClickModalParameter} datakey={"thirdpartypie"} />

                                </div>

                            </div>

                            {/* Stats */}
                            <div className="flex-1 space-y-3 overflow-x-auto pr-2">

                                {computerStatusPie.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-2 min-w-[40px]"
                                    >

                                        {/* Dot */}
                                        <div
                                            className="w-2.5 h-2.5 rounded-full shadow-lg"
                                            style={{
                                                backgroundColor:
                                                    COLORS[index % COLORS.length]
                                            }}
                                        />

                                        {/* Label */}
                                        <div className="w-24 text-[11px] text-slate-200 truncate">
                                            {item.name}
                                        </div>

                                        {/* Progress */}
                                        {/* <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">

                                            <div
                                                className="h-full rounded-full"
                                                style={{
                                                    width: "20%",
                                                    backgroundColor:
                                                        COLORS[index % COLORS.length]
                                                }}
                                            />
                                        </div> */}

                                        {/* Percentage */}
                                        <div className="w-12 text-right text-[10px] text-slate-400">
                                            20%
                                        </div>

                                        {/* Value */}
                                        <div className="w-8 text-right text-[11px] font-semibold text-white">
                                            {item.value}
                                        </div>

                                    </div>
                                ))}
                            </div>
                        </div>


                    </div>
                </div>



                <div className="col-span-12 xl:col-span-4">
                    <div className="rounded-2xl bg-[#0E1728] rounded-xl border border-white/10 shadow-xl p-3  h-full flex flex-col">

                        <div className="flex items-start justify-between mb-6">
                            <div>
                                <h2 className="text-white text-lg font-semibold flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                                    Computer Status
                                </h2>
                                <p className="text-slate-400 text-sm mt-1">
                                    Real-time fleet patching breakdown
                                </p>
                            </div>

                            <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-medium">
                                LIVE
                            </span>
                        </div>

                        {/* Content */}
                        <div className="flex items-center gap-8">

                            {/* Donut Chart */}
                            <div className="relative w-48 h-48 flex items-center justify-center">

                                <div className="w-50 h-50 relative">
                                    <SinglePieCharts data={updateStatus} onSliceClick={handleClickModalParameter} datakey={"updateStatuspie"} />

                                </div>

                            </div>

                            {/* Stats */}
                            <div className="flex-1 space-y-3 overflow-x-auto pr-2">

                                {updateStatus.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-2 min-w-[40px]"
                                    >

                                        {/* Dot */}
                                        <div
                                            className="w-2.5 h-2.5 rounded-full shadow-lg"
                                            style={{
                                                backgroundColor:
                                                    COLORS[index % COLORS.length]
                                            }}
                                        />

                                        {/* Label */}
                                        <div className="w-24 text-[11px] text-slate-200 truncate">
                                            {item.name}
                                        </div>

                                        {/* Progress */}
                                        {/* <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">

                                            <div
                                                className="h-full rounded-full"
                                                style={{
                                                    width: "20%",
                                                    backgroundColor:
                                                        COLORS[index % COLORS.length]
                                                }}
                                            />
                                        </div> */}

                                        {/* Percentage */}
                                        <div className="w-12 text-right text-[10px] text-slate-400">
                                            20%
                                        </div>

                                        {/* Value */}
                                        <div className="w-8 text-right text-[11px] font-semibold text-white">
                                            {item.value}
                                        </div>

                                    </div>
                                ))}
                            </div>
                        </div>


                    </div>
                </div>


                <div className="col-span-12 xl:col-span-4">
                    <div className="rounded-2xl bg-[#0E1728] rounded-xl border border-white/10 shadow-xl p-3  h-full flex flex-col">


                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">

                                {/* Pulse Icon */}
                                <div className="relative">
                                    <div className="w-8 h-8 rounded-xl bg-cyan-500/10 flex items-center justify-center border border-cyan-400/20">
                                        <svg
                                            className="w-4 h-4 text-cyan-400"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M3 12h4l2-5 4 10 2-5h6"
                                            />
                                        </svg>
                                    </div>

                                    <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
                                </div>

                                <div>
                                    <h2 className="text-white text-lg font-semibold">
                                        Live Activity Timeline
                                    </h2>
                                    <p className="text-slate-400 text-xs">
                                        Real-time endpoint activity stream
                                    </p>
                                </div>
                            </div>

                            {/* Streaming Badge */}
                            <div className="px-3 py-1 rounded-full bg-green-500/10 border border-green-400/20 text-green-400 text-xs font-medium flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                                Streaming
                            </div>
                        </div>

                        {/* Timeline */}
                        <div className="relative space-y-4 max-h-[300px] overflow-y-auto scrollbar-hide pr-2">

                            {/* Vertical Line */}
                            <div className="absolute left-[9px] top-0 bottom-0 w-px bg-slate-700"></div>

                            {recentActivity.map((item, index) => (

                                <div
                                    key={index}
                                    className="relative pl-8"
                                >

                                    {/* Timeline Dot */}
                                    <div
                                        className="absolute left-0 top-3 w-5 h-5 rounded-full border-4 border-[#081120] shadow-lg"
                                        style={{
                                            backgroundColor:
                                                item.Card === "APPROVAL"
                                                    ? "#22d3ee"
                                                    : item.InstallationStatus === "Installed"
                                                        ? "#4ade80"
                                                        : "#f87171"
                                        }}
                                    />

                                    {/* ========================= */}
                                    {/* APPROVAL CARD */}
                                    {/* ========================= */}
                                    {item.Card === "APPROVAL" ? (

                                        <div className="rounded-2xl border border-cyan-500/20 bg-[#0B1628]/80 backdrop-blur-md p-4 hover:border-cyan-400/40 transition-all duration-300 shadow-lg">

                                            <div className="flex items-start justify-between gap-3">

                                                {/* Left */}
                                                <div className="min-w-0 flex-1">

                                                    {/* Badge */}
                                                    <div className="inline-flex items-center gap-2 px-2 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/20 mb-3">

                                                        <div className="w-2 h-2 rounded-full bg-cyan-400" />

                                                        <span className="text-[10px] tracking-wider font-semibold text-cyan-300">
                                                            APPROVAL
                                                        </span>
                                                    </div>

                                                    {/* Patch */}
                                                    <h3 className="text-white text-[13px] font-semibold leading-snug line-clamp-2">

                                                        {item.PatchTitle}

                                                    </h3>

                                                    {/* Approved By */}
                                                    <div className="mt-3">

                                                        <p className="text-[10px] uppercase tracking-wide text-slate-500">
                                                            Approved By
                                                        </p>

                                                        <p className="text-[12px] text-slate-300 truncate">
                                                            {item.ApprovedBy}
                                                        </p>

                                                    </div>
                                                </div>

                                                {/* Time */}
                                                <div className="text-right shrink-0">

                                                    <p className="text-[10px] uppercase tracking-wide text-slate-500">
                                                        Approved
                                                    </p>

                                                    <p className="text-[11px] text-slate-300 mt-1">
                                                        {new Date(item.ApprovedDate).toLocaleDateString()}
                                                    </p>

                                                    <p className="text-[10px] text-slate-500">
                                                        {new Date(item.ApprovedDate).toLocaleTimeString()}
                                                    </p>

                                                </div>
                                            </div>
                                        </div>

                                    ) : (

                                        /* ========================= */
                                        /* INSTALLATION CARD */
                                        /* ========================= */

                                        <div className="rounded-2xl border border-slate-800 bg-[#0B1628]/80 backdrop-blur-md p-4 hover:border-cyan-500/30 transition-all duration-300">

                                            <div className="flex items-start justify-between gap-4">

                                                <div className="min-w-0">

                                                    {/* Patch Title */}
                                                    <h3 className="text-white text-[13px] font-semibold line-clamp-2">
                                                        {item.PatchTitle}
                                                    </h3>

                                                    {/* Machine */}
                                                    <p className="text-slate-400 text-[11px] mt-1">
                                                        {item.FullDomainName} • {item.IPAddress}
                                                    </p>

                                                    {/* Classification */}
                                                    <p className="text-slate-500 text-[11px] mt-2">
                                                        {item.Classification} • {item.InstallationStatus}
                                                    </p>

                                                </div>

                                                {/* Time */}
                                                <span className="text-[10px] text-slate-500 whitespace-nowrap">
                                                    {new Date(
                                                        item.LastChangeTime
                                                    ).toLocaleString()}
                                                </span>

                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                    </div>




                </div>






            </div>



        </div>
    )
}

export default PatchTreeThirdDashboard