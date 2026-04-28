import React, { useState, useEffect } from 'react'
import {
    TriangleAlert,
    Monitor,
    XCircle,
    RotateCw,
    ArrowUp,
    CheckCircle,
    Computer,
    X,
    MoveUp,
    Check
} from "lucide-react";
import SinglePieCharts from '../components/Charts/SinglePiecharts';
import SingleBarcharts from '../components/Charts/SingleBarcharts';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";
import { BreadCrumb } from 'primereact/breadcrumb';
import {
    getPatches,
    getOSCount,
    getSecurityPostureData,
    getThirdPartySeverity,
    getThirdPartyApplisting,
    getHistBarChart,
    getIpWiseStatusData,
    getOsUpdatesPie,
    getOsUpdatesList,
    getTopRiskyDevices,
    getCriticalPatchesList,
    getApprovedPatchesList,
    getFailedIpList,
    getTotalPatchList,
    getMissingPatchList,
    getWindowList,
    getServerList,
    getLinuxList,
    getMacList,
    getIpWisePatchList,
    getOSWisePatchList,
    getthirdPartySeverityPatchList,
    getPatchHistoryList
} from "../api/projectApi";
import { OverlayTrigger } from "react-bootstrap";
import { Modal } from '../components/Layout/Modal';
import '../layouts/Css/Mainstyle.css';

const OverviewDashboard = () => {
    const [patches, setPatches] = useState(null);
    const [osCount, setOsCount] = useState(null);
    const [securityPosture, setSecurityPosture] = useState(null);
    const [thirdPartySeverity, setThirdPartySeverity] = useState([]);
    const [thirdPartyList, setThirdPartyList] = useState([]);
    const [histData, setHistData] = useState([]);
    const [ipStatus, setIpStatus] = useState([]);
    const [osPie, setOsPie] = useState([]);
    const [osList, setOsList] = useState([]);
    const [topDevices, setTopDevices] = useState([]);
    const [show, setShow] = useState(false);
    const [modalData, setModalData] = useState({});
    const [loading, setLoading] = useState(false);

    // const columns = [
    //     { label: "Name", key: "name" },
    //     { label: "Version", key: "version" },
    //     { label: "Status", key: "status" },
    //     { label: "Severity", key: "severity" },
    // ];

    // const Modaldata = [
    //     { name: "Chrome", version: "120", status: "Updated", severity: "Low" },
    //     { name: "OpenSSL", version: "1.1.1", status: "Outdated", severity: "High" },
    //     { name: "Node.js", version: "18", status: "Updated", severity: "Medium" },
    // ];

    const apiMapping = {
        patches: {
            critical: getCriticalPatchesList,
            approved: getApprovedPatchesList,
            failed: getFailedIpList,
            total: getTotalPatchList,
            missing: getMissingPatchList,

        },
        os_status: {
            windows: getWindowList,
            server: getServerList,
            linux: getLinuxList,
            mac: getMacList

        },
        ip_wise: {
            patch: getIpWisePatchList,
        },
        patch_wise: {
            patch: getOSWisePatchList,
            thirdPiechart: getthirdPartySeverityPatchList,
            histbarchart: getPatchHistoryList
        }
    };



    useEffect(() => {
        console.log("Hello World");
        apiCalls();


    }, [])



    const handleClickModal = async (section, label) => {

        console.log(section, label);
        setLoading(true);
        const data = await apiMapping[section.toLowerCase().trim()][label]();
        console.log("data --> ", data);
        let MainData = data.data.data[0].data;
        let ColumnData = data.data.data[0].column;
        console.log("Maindata --> ", MainData);
        console.log("ColumnData --> ", ColumnData);
        let obj = {};
        obj.maindata = MainData;
        obj.columndata = ColumnData;
        obj.modelHeading = label.toUpperCase();

        setModalData(obj);



        setShow(true);
        setLoading(false);
    }

    const handleClickModalParameter = async (section, label, inputData) => {

        console.log(section, label);
        setLoading(true);
        const data = await apiMapping[section.toLowerCase().trim()][label](inputData);
        console.log("data --> ", data);
        let MainData = data.data.data[0].data;
        let ColumnData = data.data.data[0].column;
        console.log("Maindata --> ", MainData);
        console.log("ColumnData --> ", ColumnData);
        let obj = {};
        obj.maindata = MainData;
        obj.columndata = ColumnData;
        obj.modelHeading = label.toUpperCase();

        setModalData(obj);



        setShow(true);
        setLoading(false);
    }

    const apiCalls = async () => {
        try {
            const [
                patchesRes,
                osCountRes,
                securityRes,
                severityRes,
                severityListRes,
                histRes,
                ipRes,
                osPieRes,
                osListRes,
                topDevicesRes
            ] = await Promise.all([
                getPatches(),
                getOSCount(),
                getSecurityPostureData(),
                getThirdPartySeverity(),
                getThirdPartyApplisting(),
                getHistBarChart(),
                getIpWiseStatusData(),
                getOsUpdatesPie(),
                getOsUpdatesList(),
                getTopRiskyDevices()
            ]);


            setPatches(patchesRes.data.data[0]);
            setOsCount(osCountRes.data.data[0]);
            setSecurityPosture(securityRes.data.data[0]);


            setThirdPartySeverity(severityRes.data.data);
            setThirdPartyList(severityListRes.data.data);
            setHistData(histRes.data.data);


            setIpStatus(ipRes.data.data);
            setOsPie(osPieRes.data.data);
            setOsList(osListRes.data.data);
            setTopDevices(topDevicesRes.data.data);

        } catch (error) {
            console.error("API Error:", error);
        }
    };



    const CircularProgress = ({ percentage, label, size = 110, color = "#3b82f6", }) => {
    const radius = size / 2 - 10;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    return (
        <div className="flex flex-col items-center w-full max-w-[120px]">
            {/* Circle Wrapper */}
            <div className="relative w-full aspect-square">
                <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full -rotate-90" >
                    {/* Background */}
                    <circle cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        fill="none"
                        stroke="currentColor"
                        className="text-gray-300 dark:text-gray-600"
                        strokeWidth="10"
                    />

                    {/* Progress */}
                    <circle cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        fill="none"
                        stroke={color}
                        strokeWidth="10"
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        strokeLinecap="round"
                    />
                </svg>

                {/* Center Text */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-sm md:text-lg font-semibold text-white">
                        {percentage}%
                    </span>
                </div>
            </div>

            {/* Label */}
            <span className="text-xs md:text-sm text-gray-300 mt-2 text-center">
                {label}
            </span>
        </div>
    );
};

    const pieData = [
        { name: "Completed", value: 40 },
        { name: "Pending", value: 30 },
        { name: "Failed", value: 20 },
        { name: "In Progress", value: 10 },
    ];

    const data = [
        {
            NeededCount: 4,
            IPAddress: "192.168.0.15",
            InstalledCount: 11,
        },
        {
            NeededCount: 10,
            IPAddress: "192.168.0.164",
            InstalledCount: 2,
        },
        {
            NeededCount: 8,
            IPAddress: "192.168.0.16",
            InstalledCount: 6,
        },
        {
            NeededCount: 12,
            IPAddress: "192.168.0.14",
            InstalledCount: 2,
        },
        {
            NeededCount: 10,
            IPAddress: "192.168.0.15",
            InstalledCount: 24,
        },
    ];






    return (
        <div className="mb-1 bg-gray-100 dark:bg-[#0B1220] ">

            <Modal
                show={show}
                setShow={setShow}
                data={modalData}

            />
            {loading && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[999]">
                    <div className="flex flex-col items-center gap-3">

                        {/* Spinner */}
                        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

                        {/* Text */}
                        <p className="text-white text-sm">Loading data...</p>

                    </div>
                </div>
            )}
            <div className="grid grid-cols-12 gap-3">
                <div className="col-span-5">

                </div>
            </div>
            <div className="grid grid-cols-12 ">

                <div className="col-span-12 ">




                </div>

            </div>


            <div className="grid grid-cols-12 gap-3">

                {/* Compliance Circle */}
                <div className="col-span-12 lg:col-span-5 bg-white dark:bg-[#121A2B] rounded-xl p-4 shadow-lg">
   <h2 className="card-header"> Compliance </h2>

    <div className="flex flex-col lg:flex-row items-center gap-6">

        {/* Circle */}
        <div className="relative w-full max-w-[210px] aspect-[4/3]">
    <svg viewBox="0 0 120 80" className="w-full h-full">

        {/* Main Arc Background */}
        <path
            d="M20 55 A40 40 0 0 1 100 55"
            fill="none"
            stroke="#1e293b"
            strokeWidth="8"
        />

        {/* Progress Arc */}
        <path
            d="M20 55 A40 40 0 0 1 100 55"
            fill="none"
            stroke="#3b82f6"
            strokeWidth="8"
            strokeDasharray={`${45 * 2.51} 251`}
            // strokeLinecap="round"
        />

        {/* Inner Thin Arc (properly aligned) */}
       <path
            d="M28 55 A32 32 0 0 1 92 55"
            fill="none"
            stroke="#60a5fa"
            strokeWidth="1"
            opacity="0.9"
        />


        {/* Labels aligned properly on arc */}
        {[0, 25, 50, 75, 100].map((val, i) => {
            const angles = [180, 135, 90, 45, 0];

            const outerR = 50; // slightly outside main arc
            const cx = 60;
            const cy = 55;

            const rad = (angles[i] * Math.PI) / 180;

            const x = cx + outerR * Math.cos(rad);
            const y = cy - outerR * Math.sin(rad);

            return (
                <text
                    key={i}
                    x={x}
                    y={y}
                    fontSize="6"
                    fill="#9ca3af"
                    textAnchor="middle"
                    dominantBaseline="middle"
                >
                    {val}
                </text>
            );
        })}
    </svg>

    {/* Center Text */}
    <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-md md:text-xl text-black dark:text-white">
            45%
        </span>
        <span className="text-xs text-yellow-400">
            Medium
        </span>
    </div>
</div>

        {/* Bars */}
        <div className="flex-1 w-full space-y-3">
            {[
                { label: "Enrollment", value: 23 },
                { label: "Scan Failed", value: 43 },
                { label: "Device Patch Enabled", value: 33 },
                { label: "Device with scan failed", value: 13 },
                { label: "Device with no scan in 30 days", value: 73 },
                { label: "Device with failed patches", value: 23 },
            ].map((item, i) => (
                <div key={i}>
                    <div className="flex justify-between text-xs">
                        <span className="text-gray-700 dark:text-white">
                            {item.label}
                        </span>
                        <span className="text-gray-700 dark:text-white">
                            {item.value}%
                        </span>
                    </div>

                    <div className="h-2 bg-gray-300 dark:bg-gray-700 rounded">
                        <div
                            className="h-2 bg-blue-500 rounded"
                            style={{ width: `${item.value}%` }}
                        />
                    </div>
                </div>
            ))}
        </div>
    </div>
</div>

                {/* Compliance Stats */}
                <div className="col-span-12 lg:col-span-7 bg-[#121A2B] rounded-xl p-4 shadow-lg flex flex-col">
    {/* <h2 className="text-lg md:text-xl text-white mb-3 border-l-4 border-indigo-500 px-2">
        Patches
    </h2> */}
     <h2 className="card-header"> Patches </h2>


    <div className="text-gray-400 text-sm md:text-ms">
        Nike's "Just Do It", Apple's "Think Different", and De Beers' "A Diamond is Forever
    </div>
    <div className="text-gray-400 text-sm md:text-ms mb-4">
        A strong slogan is usually short, memorable, and differentiates the brand
    </div>

    {/* Cards Grid */}
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mt-auto">
        {[
            { label: "Critical", color: "#6B3EFF33", icon: TriangleAlert, iconcolor: "#3E6FFF" },
            { label: "Missing", color: "#6B3EFF33", icon: Computer, iconcolor: "#3E6FFF" },
            { label: "Failed", color: "#FF3E5433", icon: X, iconcolor: "#FF3E41" },
            { label: "Reboot", color: "#FFCB3E33", icon: RotateCw, iconcolor: "#FFBF3E" },
            { label: "Total", color: "#75FF3E33", icon: MoveUp, iconcolor: "#58FF3E" },
            { label: "Approved", color: "#6B3EFF33", icon: Check, iconcolor: "#3E6FFF" },
        ].map((item, i) => {
            const Icon = item.icon;

            return (
                <div
                    key={i}
                    onClick={() => handleClickModal('Patches', item.label.toLowerCase())}
                    className="bg-[#1E273A] rounded-lg p-3 flex flex-col items-center justify-center cursor-pointer hover:bg-[#26324A] transition"
                >
                    <p className="text-sm md:text-md font-semibold text-gray-400 mb-2 text-center">
                        {item.label}
                    </p>

                    {/* Icon Circle */}
                    <div
                        className="w-12 h-12 md:w-13 md:h-13 rounded-full flex items-center justify-center mb-2"
                        style={{ backgroundColor: item.color }}
                    >
                        <Icon size={18} className="md:w-6 md:h-6" style={{ color: item.iconcolor }} />
                    </div>

                    <p className="text-sm md:text-md font-medium text-white">
                        {patches?.[item.label.toLowerCase()] ?? 0}
                    </p>
                </div>
            );
        })}
    </div>
</div>
            </div>


            <div className="grid grid-cols-12 gap-3 mt-3">

                {/* OS Status */}
               <div className="col-span-12 md:col-span-6 lg:col-span-4 bg-[#121A2B] rounded-xl p-4">

    {/* <h2 className="text-lg md:text-xl text-white mb-3 border-l-4 border-indigo-500 px-2">
        OS Status
    </h2> */}

    <h2 className="card-header">OS Status</h2>

    {/* Progress */}
    <div className="w-full mt-4">
        <div className="flex justify-between text-sm md:text-md">
            <span className="text-white">Overall Distribution</span>
            <span className="text-white">{28}%</span>
        </div>

        <div className="h-2 md:h-3 bg-gray-700 rounded">
            <div
                className="h-2 md:h-3 rounded"
                style={{
                    width: `${28}%`,
                    backgroundColor: "#01A357",
                }}
            />
        </div>
    </div>

    {/* OS Cards */}
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 mt-8   ">
    {[
        { os: "Windows", color: "#3E6FFF" },
        { os: "Linux", color: "#01A355" },
        { os: "Mac", color: "#E8CF12E3" },
        { os: "Server", color: "#E83134D6" },
    ].map((item, i) => (
        <div
            key={i}
            onClick={() => handleClickModal('os_status', item.os.toLowerCase())}
            className="bg-[#1E273A] border border-[#234779]/70 
                       p-2 sm:p-3 
                       rounded-lg 
                       flex flex-col items-center justify-center 
                       cursor-pointer 
                       hover:bg-[#26324A] hover:scale-105 
                       transition 
                       min-h-[120px] sm:min-h-[140px]"
        >
            {/* Control size from parent */}
            <div className="w-14 sm:w-16 md:w-20">
                <CircularProgress
                    percentage={osCount?.[item.os.toLowerCase()] ?? 0}
                    label={item.os}
                    color={item.color}
                />
            </div>
        </div>
    ))}
</div>
</div>

                {/* Security Posture */}
                <div className="col-span-12 lg:col-span-4 bg-white dark:bg-[#121A2B] rounded-xl p-4 shadow-lg">

    {/* <h2 className="text-lg md:text-xl text-black dark:text-white mb-3 border-l-4 border-indigo-500 px-2">
        Security Posture
    </h2> */}

    <h2 className="card-header">Security Posture</h2>

    {/* Top Section */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

        {/* Left Card */}
        <div className="bg-white dark:bg-[#141D2E] rounded-xl p-4 flex flex-col items-center justify-center border dark:border-[#191F48] shadow-lg">
            <div className="text-lg md:text-2xl font-bold text-white">
                {securityPosture?.compliance ?? 0}%
            </div>
            <p className="text-sm md:text-md text-gray-300 mt-1">Compliance</p>
            <p className="text-xs md:text-xs text-green-400 mt-1">+3% this week</p>
        </div>

        {/* Right Cards */}
        <div className="flex flex-col gap-2">

            {/* Compliance */}
            <div className="h-14 bg-[#141D2E] rounded-lg flex items-center justify-between px-3 text-gray-300 border border-[#191F48]">
                <div className="text-sm md:text-md">
                    <div>Compliance</div>
                    <div>{securityPosture?.needed ?? 0}</div>
                </div>

                <div className="w-6 h-6 md:w-8 md:h-8 rounded-md flex items-center justify-center"
                    style={{ backgroundColor: "#FF3E5433" }}>
                    <TriangleAlert size={16}  style={{ color: "#FF3E41" }} />
                </div>
            </div>

            {/* Risk */}
            <div className="h-14 bg-[#141D2E] rounded-lg flex items-center justify-between px-3 text-gray-300 border border-[#191F48]">
                <div className="text-sm md:text-md">
                    <div>Risk Level</div>
                    <div>15</div>
                </div>

                <div className="w-6 h-6 md:w-8 md:h-8 rounded-md flex items-center justify-center"
                    style={{ backgroundColor: "#FFCB3E33" }}>
                    <RotateCw size={18}  style={{ color: "#FFBF3E" }} />
                </div>
            </div>

        </div>
    </div>

    {/* Bottom List */}
    <div className="space-y-2 mt-4 text-sm">

        {[
            { label: "MFA Not Enforced", status: "Failed" },
            { label: "Endpoint Encryption", status: "Critical" },
            { label: "Patch Management", status: "Warning" },
        ].map((item, i) => (
            <div
                key={i}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-0 bg-[#141D2E] p-2 border border-[#191F48] rounded-md"
            >
                <span className="text-gray-400 text-sm md:text-md">
                    {item.label}
                </span>

                <span
                    className={`text-sm md:text-md ${
                        item.status === "Failed"
                            ? "text-red-400"
                            : item.status === "Critical"
                            ? "text-orange-400"
                            : "text-yellow-400"
                    }`}
                >
                    {item.status}
                </span>
            </div>
        ))}
    </div>

</div>

                {/* Device Info (Chart Placeholder) */}
                <div className="col-span-4 bg-[#121A2B] rounded-xl p-4">
                    {/* <h2 className="text-xl text-white mb-3 border-l-4 border-indigo-500 px-2">IPWise Patch Status</h2> */}

                    <h2 className="card-header">IPWise Patch Status</h2>
                    {/* Fake Chart Line */}
                    <div className="h-32  rounded-lg">
                        <div className="w-full h-[280px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={ipStatus}
                                    layout="vertical"
                                // margin={{ top: 10, right: 20, left: 20, bottom: 10 }}
                                >
                                    <XAxis type="number" stroke="#ccc" fontSize={12} />
                                    <YAxis type="category" dataKey="IPAddress" stroke="#ccc" width={100} fontSize={14} />
                                    <Tooltip
                                        cursor={false}
                                        contentStyle={{
                                            backgroundColor: "#1f2937",
                                            border: "none",
                                        }}
                                    />
                                    <Legend />

                                    <Bar
                                        dataKey="InstalledCount"
                                        stackId="a"
                                        fill="#22c55e"         // normal bar color
                                        name="Installed"
                                        radius={[0, 4, 4, 0]}
                                        // custom hover color
                                        onMouseEnter={(data, index, e) => {
                                            e.target.setAttribute("fill", "#16a34a"); // darker green on hover
                                        }}
                                        onMouseLeave={(data, index, e) => {
                                            e.target.setAttribute("fill", "#22c55e"); // back to normal
                                        }}
                                        onClick={(data, index) => {
                                            console.log("Clicked:", data);
                                            const reqdata = {
                                                ipaddress: data.IPAddress,
                                                statusId: 4
                                            }
                                            handleClickModalParameter('ip_wise', 'patch', reqdata);

                                        }}
                                    />

                                    <Bar
                                        dataKey="NeededCount"
                                        stackId="a"
                                        fill="#ef4444"
                                        name="Needed"
                                        radius={[0, 4, 4, 0]}
                                        onMouseEnter={(data, index, e) => {
                                            e.target.setAttribute("fill", "#b91c1c"); // darker red on hover

                                        }}
                                        onMouseLeave={(data, index, e) => {
                                            e.target.setAttribute("fill", "#ef4444"); // back to normal
                                        }}
                                        onClick={(data, index) => {
                                            console.log("Clicked:", data);
                                            const reqdata = {
                                                ipaddress: data.IPAddress,
                                                statusId: 2
                                            }
                                            handleClickModalParameter('ip_wise', 'patch', reqdata);
                                        }}
                                    />
                                </BarChart>

                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Filters */}

                </div>

            </div>
            <div className="grid grid-cols-12 gap-3 mt-3">

                {/* LEFT TOP */}
                <div className="col-span-6 bg-[#0F172A] border border-[#1C2541] rounded-xl p-4">

                    {/* <h2 className="text-xl text-white mb-3 border-l-4 border-indigo-500 px-2">3rd Party PatchManagement</h2> */}
                    <h2 className="card-header">3rd Party PatchManagement</h2>
                    <div className="flex gap-3 ">

                        {/* Donut */}
                        <div className="w-50 h-50 relative">
                            <SinglePieCharts data={thirdPartySeverity} onSliceClick={handleClickModalParameter} datakey={"thirdpartypie"} />

                        </div>

                        {/* Table */}
                        <div className="flex-1 h-50 overflow-x-auto">
                            {/* <div className="text-md text-gray-400 grid grid-cols-4 mb-2"> */}
                             <div className="table-header">
                                <span>Software</span>
                                <span>Version</span>
                                <span>CVSS</span>
                                <span>State</span>
                            </div>

                            {thirdPartyList.map((item, i) => (
                                // <div
                                //     key={i}
                                //     className="grid grid-cols-4  text-sm bg-[#141D2E] p-2 rounded mb-1 items-center"
                                // >
                                  <div key={i} className="table-row">
                                    <span>{item.software}</span>
                                    <span>{item.version}</span>

                                    {/* CVES with Tooltip */}
                                    <div className="relative group tooltip-parent">
                                        <span className="truncate block max-w-[100px] cursor-pointer">
                                            {item.cves}
                                        </span>

                                        {/* Tooltip */}
                                        {/* <div className="absolute z-50 hidden group-hover:block bg-[#0B1220] text-white text-sm p-2 rounded shadow-lg w-64 top-6 left-0 border border-[#1C2541]"> */}
                                        <div className="tooltip-box">
                                            {item.cves}
                                        </div>
                                    </div>

                                    <span className="text-red-400">{item.severity}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Footer Stats */}
                    {/* <div className="mt-3 text-xs text-gray-400 space-y-1">
                            <p>● Total ATMs: 7,466</p>
                            <p>● Fully Encrypted: 7,463</p>
                            <p>● Not Encrypted: 3</p>
                            <p>● Encryption Coverage: 99.96%</p>
                        </div> */}
                </div>

                {/* RIGHT TOP */}
                <div className="col-span-6 bg-[#0F172A] border border-[#1C2541] rounded-xl p-4">

                    {/* <h2 className="text-xl text-white mb-3 border-l-4 border-indigo-500 px-2">Operating Systems Update</h2> */}
                    <h2 className="card-header">Operating Systems Update</h2>                    
                    <div className="flex gap-4">

                        {/* Donut */}
                        <div className="w-50 h-50 relative">
                            <SinglePieCharts
                                data={osPie}
                                onSliceClick={handleClickModalParameter}
                                datakey={"ospie"}
                            />

                        </div>

                        {/* Table */}
                        <div className="flex-1 h-50 overflow-x-auto">
                            {/* <div className="text-md text-gray-400 grid grid-cols-4 mb-2"> */}
                                  <div className="table-header">
                                <span>Update</span>
                                <span>Installed</span>
                                <span>Needed</span>
                                <span>Severity</span>
                            </div>

                            {osList.map((item, i) => (
                                // <div key={i} className="grid grid-cols-4 text-sm bg-[#141D2E] p-2 rounded mb-1 items-center">
                                 <div key={i} className="table-row">   
                                <span className="break-words pr-5">{item.PatchTitle}</span>
                                    <span>{item.InstalledCount}</span>
                                    <span>{item.NeededCount}</span>
                                    <span className="text-yellow-400">{item.classification}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* BOTTOM LEFT */}
                <div className="col-span-6 bg-[#0F172A] border border-[#1C2541] rounded-xl p-4">

                    {/* <h2 className="text-xl text-white mb-3 border-l-4 border-indigo-500 px-2">Top Risk Devices</h2> */}
                    <h2 className="card-header">Top Risk Devices</h2>
                    {/* <div className="text-lg text-gray-400 grid grid-cols-4 mb-2"> */}
                         <div className="table-header">
                        <span>Device</span>
                        <span>Patches</span>
                        <span>Last Scan</span>
                        <span>Severity</span>
                    </div>

                    {topDevices.map((item, i) => (
                        // <div key={i} className="grid grid-cols-4 text-md bg-[#141D2E] p-2 rounded mb-1">
                         <div key={i} className="table-row">   
                        <span>{item.IPAddress}</span>
                            <span>{item.MissingCount}</span>
                            <span>{item.LastScan}</span>
                            <span className="text-red-400">{item.Severity}</span>
                        </div>
                    ))}
                </div>

                {/* BOTTOM RIGHT (Bar Chart Placeholder) */}
                <div className="col-span-6 bg-[#0F172A] border border-[#1C2541] rounded-xl p-4">
                    {/* <h2 className="text-xl text-white mb-3 border-l-4 border-indigo-500 px-2">Patch History</h2> */}

                    <h2 className="card-header">Patch History</h2>

                    <SingleBarcharts data={histData} onSliceClick={handleClickModalParameter} />

                </div>

            </div>
        </div>
    )
}

export default OverviewDashboard