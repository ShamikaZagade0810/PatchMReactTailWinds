import React from 'react';
import {
    CheckCircle2,
    ShieldCheck,
    XCircle,
    AlertTriangle,
    ArrowUpRight,
} from "lucide-react";

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
    },
];

function PatchTreeThirdDashboard() {
    return (
        <div className="mb-1 bg-gray-100 dark:bg-[#0B1220] p-3">
            <div className="grid grid-cols-12 gap-4 bg-[#121A2B] p-2">

                {/* LEFT SMALL CARDS SECTION */}
                <div className="col-span-12 xl:col-span-3">
                    <div className="col-span-12 xl:col-span-3">
                        <div className="grid grid-cols-2 gap-2">

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
                    h-[115px] group`}
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
                                                    {card.value}
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
                                        <div className="mt-3 flex items-end gap-[2px] h-6">
                                            <div className={`h-1 w-full rounded-full ${card.line} opacity-40`} />
                                            <div className={`h-2 w-full rounded-full ${card.line} opacity-60`} />
                                            <div className={`h-3 w-full rounded-full ${card.line} opacity-80`} />
                                            <div className={`h-2 w-full rounded-full ${card.line} opacity-60`} />
                                            <div className={`h-4 w-full rounded-full ${card.line}`} />
                                        </div>

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
                            <div className="bg-[#1E273A] rounded-lg p-1 border border-[#1E293B] h-[60px] flex flex-col justify-center">
                                <p className="text-[8px] uppercase tracking-[1.5px] text-gray-300">
                                    Computers
                                </p>

                                <h3 className="text-lg font-bold text-white leading-none mt-1">
                                    412
                                </h3>
                            </div>

                            {/* Groups */}
                            <div className="bg-[#1E273A] rounded-lg p-2 border border-[#1E293B]  h-[60px] flex flex-col justify-center">
                                <p className="text-[8px] uppercase tracking-[1.5px] text-gray-300">
                                    Groups
                                </p>

                                <h3 className="text-lg font-bold text-white leading-none mt-1">
                                    18
                                </h3>
                            </div>

                            {/* Sync Errors */}
                            <div className="bg-[#1E273A] rounded-lg p-2 border border-red-500/20  h-[60px] flex flex-col justify-center">
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
                    <div className="rounded-2xl bg-[#0E1728] rounded-xl border border-white/10 shadow-xl p-3">

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
                                    — last sync succeeded
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
                                    Status
                                </p>

                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-indigo-400"></div>

                                    <span className="text-white text-sm font-semibold">
                                        Idle
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

                                    Today, 04:22 AM
                                </div>
                            </div>

                            <div className='bg-[#1E273A] rounded-xl p-3'>
                                <p className="text-[10px] uppercase tracking-wider text-gray-300 mb-2">
                                    Next Sync
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

                                    Today, 04:22 AM
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
                                        105,132
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
                                        13
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
                                        3,105
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
                                        108,250
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


            <div className="grid grid-cols-12 gap-4 mt-1 bg-[#121A2B] p-2">

                {/* LEFT SMALL CARDS SECTION */}
                <div className="col-span-12 xl:col-span-4">
                    <div className="rounded-2xl bg-[#0E1728] rounded-xl border border-white/10 shadow-xl p-3">

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

                                {/* Donut */}
                                <div
                                    className="w-44 h-44 rounded-full"
                                    style={{
                                        background: `
            conic-gradient(
              #38E27B 0% 75.7%,
              #11C5F5 75.7% 87.4%,
              #F7B500 87.4% 94%,
              #FF4D4F 94% 97.4%,
              #F84DFF 97.4% 100%
            )
          `,
                                    }}
                                >
                                    <div className="w-full h-full flex items-center justify-center">
                                        <div className="w-28 h-28 rounded-full bg-[#07111F] border border-slate-700 flex flex-col items-center justify-center">
                                            <h3 className="text-white text-4xl font-bold">412</h3>
                                            <p className="text-slate-400 text-xs tracking-[3px] mt-1">
                                                ENDPOINTS
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="flex-1 space-y-5">

                                {[
                                    {
                                        label: "Patched",
                                        percent: "75.7%",
                                        value: 312,
                                        color: "bg-green-400",
                                        width: "75%",
                                    },
                                    {
                                        label: "Partial",
                                        percent: "11.7%",
                                        value: 48,
                                        color: "bg-cyan-400",
                                        width: "12%",
                                    },
                                    {
                                        label: "Unpatched",
                                        percent: "6.6%",
                                        value: 27,
                                        color: "bg-yellow-400",
                                        width: "7%",
                                    },
                                    {
                                        label: "Failed",
                                        percent: "3.4%",
                                        value: 14,
                                        color: "bg-red-400",
                                        width: "4%",
                                    },
                                    {
                                        label: "Offline",
                                        percent: "2.7%",
                                        value: 11,
                                        color: "bg-pink-400",
                                        width: "3%",
                                    },
                                ].map((item, index) => (
                                    <div key={index} className="flex items-center gap-3">

                                        {/* Dot */}
                                        <div className={`w-3 h-3 rounded-full ${item.color} shadow-lg`} />

                                        {/* Label */}
                                        <div className="w-20 text-sm text-slate-200">
                                            {item.label}
                                        </div>

                                        {/* Progress */}
                                        <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full ${item.color} rounded-full`}
                                                style={{ width: item.width }}
                                            />
                                        </div>

                                        {/* Percentage */}
                                        <div className="w-14 text-right text-sm text-slate-400">
                                            {item.percent}
                                        </div>

                                        {/* Value */}
                                        <div className="w-8 text-right text-sm font-semibold text-white">
                                            {item.value}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>



                    </div>




                </div>



                <div className="col-span-12 xl:col-span-4">
                    <div className="rounded-2xl bg-[#0E1728] rounded-xl border border-white/10 shadow-xl p-3">

                        <div className="flex items-start justify-between mb-6">
                            <div>
                                <h2 className="text-white text-lg font-semibold flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                                    Patch Status
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

                                {/* Donut */}
                                <div
                                    className="w-44 h-44 rounded-full"
                                    style={{
                                        background: `
            conic-gradient(
              #38E27B 0% 75.7%,
              #11C5F5 75.7% 87.4%,
              #F7B500 87.4% 94%,
              #FF4D4F 94% 97.4%,
              #F84DFF 97.4% 100%
            )
          `,
                                    }}
                                >
                                    <div className="w-full h-full flex items-center justify-center">
                                        <div className="w-28 h-28 rounded-full bg-[#07111F] border border-slate-700 flex flex-col items-center justify-center">
                                            <h3 className="text-white text-4xl font-bold">412</h3>
                                            <p className="text-slate-400 text-xs tracking-[3px] mt-1">
                                                ENDPOINTS
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="flex-1 space-y-5">

                                {[
                                    {
                                        label: "Patched",
                                        percent: "75.7%",
                                        value: 312,
                                        color: "bg-green-400",
                                        width: "75%",
                                    },
                                    {
                                        label: "Partial",
                                        percent: "11.7%",
                                        value: 48,
                                        color: "bg-cyan-400",
                                        width: "12%",
                                    },
                                    {
                                        label: "Unpatched",
                                        percent: "6.6%",
                                        value: 27,
                                        color: "bg-yellow-400",
                                        width: "7%",
                                    },
                                    {
                                        label: "Failed",
                                        percent: "3.4%",
                                        value: 14,
                                        color: "bg-red-400",
                                        width: "4%",
                                    },
                                    {
                                        label: "Offline",
                                        percent: "2.7%",
                                        value: 11,
                                        color: "bg-pink-400",
                                        width: "3%",
                                    },
                                ].map((item, index) => (
                                    <div key={index} className="flex items-center gap-3">

                                        {/* Dot */}
                                        <div className={`w-3 h-3 rounded-full ${item.color} shadow-lg`} />

                                        {/* Label */}
                                        <div className="w-20 text-sm text-slate-200">
                                            {item.label}
                                        </div>

                                        {/* Progress */}
                                        <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full ${item.color} rounded-full`}
                                                style={{ width: item.width }}
                                            />
                                        </div>

                                        {/* Percentage */}
                                        <div className="w-14 text-right text-sm text-slate-400">
                                            {item.percent}
                                        </div>

                                        {/* Value */}
                                        <div className="w-8 text-right text-sm font-semibold text-white">
                                            {item.value}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>



                    </div>




                </div>


                <div className="col-span-12 xl:col-span-4">
                    <div className="rounded-2xl bg-[#0E1728] rounded-xl border border-white/10 shadow-xl p-3">


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
                        <div className="relative space-y-4">

                            {/* Vertical Line */}
                            <div className="absolute left-[9px] top-0 bottom-0 w-px bg-slate-700"></div>

                            {[
                                {
                                    title: "KB5034441 deployed",
                                    sub: "WS-FIN-117 • Win 11",
                                    desc: "Took 3m 14s",
                                    time: "12:42",
                                    color: "bg-green-400",
                                },
                                {
                                    title: "Installation failed",
                                    sub: "SRV-DB-04 • KB5031988",
                                    desc: "Error 0x80073712",
                                    time: "12:31",
                                    color: "bg-red-400",
                                },
                                {
                                    title: "Patch approved by NPCIL",
                                    sub: "12 updates • Critical batch",
                                    desc: "by poc@npcil.gov.in",
                                    time: "12:18",
                                    color: "bg-cyan-400",
                                },
                                {
                                    title: "Reboot completed",
                                    sub: "8 endpoints • Server group A",
                                    desc: "Downtime 1m 08s",
                                    time: "11:54",
                                    color: "bg-yellow-400",
                                },
                            ].map((item, index) => (
                                <div
                                    key={index}
                                    className="relative pl-8"
                                >
                                    {/* Timeline Dot */}
                                    <div
                                        className={`absolute left-0 top-3 w-5 h-5 rounded-full border-4 border-[#081120] ${item.color} shadow-lg`}
                                    />

                                    {/* Activity Card */}
                                    <div className="rounded-2xl border border-slate-800 bg-[#0B1628]/80 backdrop-blur-md p-4 hover:border-cyan-500/30 transition-all duration-300">

                                        <div className="flex items-start justify-between">

                                            <div>
                                                <h3 className="text-white text-[15px] font-semibold">
                                                    {item.title}
                                                </h3>

                                                <p className="text-slate-400 text-sm mt-1">
                                                    {item.sub}
                                                </p>

                                                <p className="text-slate-500 text-sm mt-2">
                                                    {item.desc}
                                                </p>
                                            </div>

                                            <span className="text-xs text-slate-500">
                                                {item.time}
                                            </span>
                                        </div>
                                    </div>
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