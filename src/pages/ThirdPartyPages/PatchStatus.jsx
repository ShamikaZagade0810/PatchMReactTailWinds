import React, { useEffect, useMemo, useState } from "react";
import {
    CheckCircle2,
    Clock3,
    XCircle,
    ShieldX,
    Search,
    ChevronDown,
    ChevronUp,
    Download,
} from "lucide-react";

import { getThirdPartyPatchStatus } from "../../api/projectApi";
import SinglePieCharts from '../../components/Charts/SinglePiecharts';

const statusStyles = {
    INIT: {
        bg: "bg-cyan-500/10",
        text: "text-cyan-400",
        border: "border-cyan-500/20",
    },
    PENDING: {
        bg: "bg-yellow-500/10",
        text: "text-yellow-400",
        border: "border-yellow-500/20",
    },
    Completed: {
        bg: "bg-emerald-500/10",
        text: "text-emerald-400",
        border: "border-emerald-500/20",
    },
    FAILED: {
        bg: "bg-red-500/10",
        text: "text-red-400",
        border: "border-red-500/20",
    },
    DECLINED: {
        bg: "bg-pink-500/10",
        text: "text-pink-400",
        border: "border-pink-500/20",
    },
};

const PatchStatus = () => {

    const [expanded, setExpanded] = useState(null);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");

    const [thirdPartyPatchingStatus, setThirdPartyPatchingStatus] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {

        try {

            setLoading(true);

            const response = await getThirdPartyPatchStatus();

            console.log("Patch Status Response --> ", response);

            if (response?.data?.data) {
                setThirdPartyPatchingStatus(response.data.data);
            } else {
                setThirdPartyPatchingStatus([]);
            }

        } catch (error) {

            console.error("Error fetching patch status:", error);
            setThirdPartyPatchingStatus([]);

        } finally {

            setLoading(false);

        }
    };

    const summary = useMemo(() => {

        return {

            INIT: thirdPartyPatchingStatus.filter(
                (i) => i.transferStatus === "INIT"
            ).length,

            PENDING: thirdPartyPatchingStatus.filter(
                (i) => i.transferStatus === "PENDING"
            ).length,

            Completed: thirdPartyPatchingStatus.filter(
                (i) => i.transferStatus === "Completed"
            ).length,

            FAILED: thirdPartyPatchingStatus.filter(
                (i) => i.transferStatus === "FAILED"
            ).length,

            DECLINED: thirdPartyPatchingStatus.filter(
                (i) => i.transferStatus === "DECLINED"
            ).length,
        };

    }, [thirdPartyPatchingStatus]);

   

    const total = thirdPartyPatchingStatus.length;

    const compliantPercentage =
        total > 0
            ? Math.round((summary.Completed / total) * 100)
            : 0;

    const filteredData = thirdPartyPatchingStatus.filter((item) => {

        const searchMatch =
            item?.appName
                ?.toLowerCase()
                ?.includes(search.toLowerCase()) ||

            item?.hostname
                ?.toLowerCase()
                ?.includes(search.toLowerCase()) ||

            item?.ipAddress
                ?.includes(search);

        const statusMatch =
            statusFilter === "ALL"
                ? true
                : item.transferStatus === statusFilter;

        return searchMatch && statusMatch;
    });

    const stats = [
        {
            title: "Init",
            value: summary.INIT,
            icon: <Clock3 size={18} />,
            status: "INIT",
        },
        {
            title: "Pending",
            value: summary.PENDING,
            icon: <Clock3 size={18} />,
            status: "PENDING",
        },
        {
            title: "Completed",
            value: summary.Completed,
            icon: <CheckCircle2 size={18} />,
            status: "Completed",
        },
        {
            title: "Failed",
            value: summary.FAILED,
            icon: <XCircle size={18} />,
            status: "FAILED",
        },
        {
            title: "Declined",
            value: summary.DECLINED,
            icon: <ShieldX size={18} />,
            status: "DECLINED",
        },
    ];

     console.log("Summary ",summary ,"compliantPercentage ",compliantPercentage);

    return (
        <div className="min-h-screen bg-[#060B16] text-white p-4">

            {/* TOP CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4 mb-4">

                {stats.map((item, index) => (

                    <div
                        key={index}
                        className={`bg-[#0B1220] rounded-xl p-4 border ${statusStyles[item.status].border}`}
                    >

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-xs text-white/50 mb-1">
                                    {item.title}
                                </p>

                                <h2 className="text-2xl font-bold">
                                    {item.value}
                                </h2>

                            </div>

                            <div
                                className={`h-10 w-10 rounded-lg flex items-center justify-center ${statusStyles[item.status].bg} ${statusStyles[item.status].text}`}
                            >
                                {item.icon}
                            </div>

                        </div>

                    </div>

                ))}

            </div>

            {/* COMPLIANCE + TREND */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-4">

                {/* COMPLIANCE */}
                <div className="bg-[#0B1220] rounded-xl p-5 border border-white/10">

                    <div className="flex items-center justify-between mb-5">

                        <h2 className="text-sm font-semibold">
                            Compliance
                        </h2>

                        <span className="text-xs text-white/40">
                            Overall
                        </span>

                    </div>

                    <div className="flex flex-col items-center">

                        <div className="relative w-40 h-40">

                            <svg className="w-40 h-40 rotate-[-90deg]">

                                <circle
                                    cx="80"
                                    cy="80"
                                    r="65"
                                    stroke="#1E293B"
                                    strokeWidth="12"
                                    fill="none"
                                />

                                <circle
                                    cx="80"
                                    cy="80"
                                    r="65"
                                    stroke="#22D3EE"
                                    strokeWidth="12"
                                    fill="none"
                                    strokeDasharray={408}
                                    strokeDashoffset={
                                        408 -
                                        (408 * compliantPercentage) / 100
                                    }
                                    strokeLinecap="round"
                                />

                            </svg>

                            <div className="absolute inset-0 flex flex-col items-center justify-center">

                                <h2 className="text-3xl font-bold">
                                    {compliantPercentage}%
                                </h2>

                                <p className="text-xs text-white/40">
                                    COMPLIANT
                                </p>

                            </div>

                        </div>

                        <div className="w-full mt-6 space-y-3">

                            {Object.entries(summary).map(([key, value]) => (

                                <div
                                    key={key}
                                    className="flex items-center justify-between"
                                >

                                    <div className="flex items-center gap-2">

                                        <div
                                            className={`h-2 w-2 rounded-full ${statusStyles[key].bg}`}
                                        />

                                        <span className="text-sm text-white/70">
                                            {key}
                                        </span>

                                    </div>

                                    <span className="text-sm font-semibold">
                                        {value}
                                    </span>

                                </div>

                            ))}





                        </div>

                    </div>

                </div>

                {/* TREND */}
                <div className="xl:col-span-2 bg-[#0B1220] rounded-xl p-5 border border-white/10">

                    <div className="flex items-center justify-between mb-5">

                        <h2 className="text-sm font-semibold">
                            Deployment Trend (7 Days)
                        </h2>

                    </div>

                    <div className="h-[300px] flex items-end justify-between gap-4">

                        {[40, 55, 75, 52, 88, 35, 48].map((height, index) => (

                            <div
                                key={index}
                                className="flex flex-col items-center w-full"
                            >

                                <div className="w-full h-[240px] flex items-end justify-center">

                                    <div
                                        className="w-10 rounded-t-xl bg-gradient-to-t from-emerald-700 to-emerald-400"
                                        style={{
                                            height: `${height}%`,
                                        }}
                                    />

                                </div>

                                <span className="text-xs text-white/40 mt-2">

                                    {
                                        [
                                            "Mon",
                                            "Tue",
                                            "Wed",
                                            "Thu",
                                            "Fri",
                                            "Sat",
                                            "Sun",
                                        ][index]
                                    }

                                </span>

                            </div>

                        ))}

                    </div>

                </div>

            </div>

            {/* TABLE */}
            <div className="bg-[#0B1220] rounded-xl p-2 border border-white/10">

                {/* HEADER */}
                <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4 p-3 border-b border-white/10">

                    <h2 className="text-sm font-semibold">
                        Deployment Records
                    </h2>

                    <div className="flex flex-col md:flex-row gap-3">

                        {/* SEARCH */}
                        <div className="relative">

                            <Search
                                size={16}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40"
                            />

                            <input
                                type="text"
                                placeholder="Search..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="bg-[#111827] border border-white/10 rounded-lg h-10 pl-9 pr-3 text-sm outline-none w-full md:w-72"
                            />

                        </div>

                        {/* FILTER */}
                        <div className="flex gap-2 flex-wrap">

                            {[
                                "ALL",
                                "INIT",
                                "PENDING",
                                "SUCCESS",
                                "FAILED",
                                "DECLINED",
                            ].map((status) => (

                                <button
                                    key={status}
                                    onClick={() => setStatusFilter(status)}
                                    className={`px-3 h-10 rounded-lg border text-xs transition ${statusFilter === status
                                            ? "bg-cyan-500/20 border-cyan-500/30 text-cyan-300"
                                            : "bg-[#111827] border-white/10 text-white/60"
                                        }`}
                                >
                                    {status}
                                </button>

                            ))}

                        </div>

                    </div>

                </div>

                {/* LOADING */}
                {loading && (

                    <div className="flex items-center justify-center py-20">

                        <div className="h-12 w-12 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>

                    </div>

                )}

                {/* TABLE DATA */}
                {!loading && (

                    <div className="overflow-x-auto">

                        <table className="w-full">

                            <thead>

                                <tr className="border-b border-white/10 text-white/40 text-xs">

                                    <th className="p-4"></th>
                                    <th className="p-4 text-left">PATCH</th>
                                    <th className="p-4 text-left">HOST</th>
                                    <th className="p-4 text-left">IP</th>
                                    <th className="p-4 text-left">CREATED</th>
                                    <th className="p-4 text-left">STATUS</th>
                                    <th className="p-4 text-right">ACTION</th>

                                </tr>

                            </thead>

                            <tbody>

                                {filteredData.length === 0 && (

                                    <tr>

                                        <td
                                            colSpan={7}
                                            className="text-center py-16 text-white/40"
                                        >
                                            No Patch Records Found
                                        </td>

                                    </tr>

                                )}

                                {filteredData.map((item) => {

                                    const expandedRow = expanded === item.id;

                                    return (

                                        <React.Fragment key={item.id}>

                                            <tr className="border-b border-white/5 hover:bg-white/[0.02] transition">

                                                <td className="p-4">

                                                    <button
                                                        onClick={() =>
                                                            setExpanded(
                                                                expandedRow
                                                                    ? null
                                                                    : item.id
                                                            )
                                                        }
                                                    >

                                                        {expandedRow ? (
                                                            <ChevronUp size={16} />
                                                        ) : (
                                                            <ChevronDown size={16} />
                                                        )}

                                                    </button>

                                                </td>

                                                <td className="p-4">

                                                    <div>

                                                        <p className="text-sm font-medium">
                                                            {item.appName}
                                                        </p>

                                                        <p className="text-xs text-white/40 mt-1">
                                                            JOB ID #{item.id}
                                                        </p>

                                                    </div>

                                                </td>

                                                <td className="p-4 text-sm text-white/70">
                                                    {item.hostname || "--"}
                                                </td>

                                                <td className="p-4 text-sm text-white/70">
                                                    {item.ipAddress}
                                                </td>

                                                <td className="p-4 text-sm text-white/50">

                                                    {new Date(
                                                        item.createdAt
                                                    ).toLocaleString()}

                                                </td>

                                                <td className="p-4">

                                                    <span
                                                        className={`px-3 py-1 rounded-full border text-xs font-medium ${statusStyles[item.transferStatus]?.bg
                                                            } ${statusStyles[item.transferStatus]?.border
                                                            } ${statusStyles[item.transferStatus]?.text
                                                            }`}
                                                    >
                                                        {item.transferStatus}
                                                    </span>

                                                </td>

                                                <td className="p-4 text-right">

                                                    <button className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-xs">

                                                        <Download size={14} />

                                                        Log

                                                    </button>

                                                </td>

                                            </tr>

                                            {/* EXPANDED ROW */}
                                            {expandedRow && (

                                                <tr>

                                                    <td
                                                        colSpan={7}
                                                        className="px-4 pb-4"
                                                    >

                                                        <div className="bg-[#09101C] rounded-xl border border-white/10 p-4">

                                                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">

                                                                <div>

                                                                    <p className="text-xs text-white/40 mb-1">
                                                                        Installed Version
                                                                    </p>

                                                                    <p className="text-sm">
                                                                        {item.installedVersion || "--"}
                                                                    </p>

                                                                </div>

                                                                <div>

                                                                    <p className="text-xs text-white/40 mb-1">
                                                                        Latest Version
                                                                    </p>

                                                                    <p className="text-sm">
                                                                        {item.latestVersion}
                                                                    </p>

                                                                </div>

                                                                <div>

                                                                    <p className="text-xs text-white/40 mb-1">
                                                                        Download URL
                                                                    </p>

                                                                    <a
                                                                        href={item.downloadUrl}
                                                                        target="_blank"
                                                                        rel="noreferrer"
                                                                        className="text-cyan-400 text-xs break-all"
                                                                    >
                                                                        {item.downloadUrl || "--"}
                                                                    </a>

                                                                </div>

                                                                <div>

                                                                    <p className="text-xs text-white/40 mb-1">
                                                                        Status
                                                                    </p>

                                                                    <p className="text-sm">
                                                                        {item.transferStatus}
                                                                    </p>

                                                                </div>

                                                            </div>

                                                            <div className="mt-4 bg-black/30 border border-white/10 rounded-lg p-3 text-xs font-mono text-emerald-400">

                                                                [{item.createdAt}] Patch deployment initiated for{" "}
                                                                {item.appName}

                                                                <br />

                                                                Status updated to{" "}
                                                                {item.transferStatus}

                                                            </div>

                                                        </div>

                                                    </td>

                                                </tr>

                                            )}

                                        </React.Fragment>

                                    );
                                })}

                            </tbody>

                        </table>

                    </div>

                )}

            </div>

        </div>
    );
};

export default PatchStatus;