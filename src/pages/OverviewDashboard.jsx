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
import PieCharts from '../components/Charts/Piecharts';
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
    getTopRiskyDevices
} from "../api/projectApi";
import { OverlayTrigger } from "react-bootstrap";


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


    useEffect(() => {
        console.log("Hello World");
        apiCalls();


    }, [])

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

            // ✅ Set Data
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



    const CircularProgress = ({ percentage, label, size = 100, color }) => {
        const radius = size / 2 - 10;
        const circumference = 2 * Math.PI * radius;
        const offset = circumference - (percentage / 100) * circumference;
        // const color = percentage > 80 ? '#ef4444' : percentage > 60 ? '#f97316' : '#06b6d4';

        return (
            <div className="flex flex-col items-center">
                <svg width={size} height={size} className="transform -rotate-90">
                    <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="currentColor" className="text-gray-300 dark:text-gray-700" strokeWidth="8" />
                    <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={color} strokeWidth="8"
                        strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" />
                </svg>
                <div className="absolute flex pt-1 pl-1 items-center justify-center " style={{ marginTop: size / 2 - 20 }}>
                    <span className="text-xl font-bold dark:text-white">{percentage}%</span>
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400 mt-2">{label}</span>
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
        <div className="mb-1 bg-white dark:bg-[#0B1220] ">
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
                <div className="col-span-5 bg-white dark:bg-[#121A2B] rounded-xl p-4 shadow-lg">
                    <h2 className="text-lg text-black dark:text-white mb-3 border-l-4 border-indigo-500 px-2"> Compliance</h2>

                    <div className="flex items-center gap-6">
                        {/* Circle */}
                        <div className="relative w-50 h-30">
                            <svg viewBox="0 10 100 60" className="w-full h-full overflow-visible">

                                {/* Background arc */}
                                <path d="M10 50 A40 40 0 0 1 90 50"
                                    fill="none"
                                    stroke="#1e293b"
                                    strokeWidth="10"
                                />

                                {/* Progress arc */}
                                <path
                                    d="M10 50 A40 40 0 0 1 90 50"
                                    fill="none"
                                    stroke="#3b82f6"
                                    strokeWidth="10"
                                    strokeDasharray={`${45 * 1.25} 100`}
                                // strokeLinecap="round"
                                />
                                {/* Thin line arc below meter */}
                                <path
                                    d="M18 52 A30 30 0 1 1 82 52"
                                    fill="none"
                                    stroke="#3b82f6"                 // subtle gray
                                    strokeWidth="0.5"                  // thin line
                                />
                                {/* Meter Labels using angles */}
                                {[
                                    { val: 0, angle: 180 },
                                    { val: 25, angle: 135 },
                                    { val: 50, angle: 90 },
                                    { val: 75, angle: 45 },
                                    { val: 100, angle: 0 },
                                ].map((item, i) => {
                                    const r = 48; // radius slightly outside arc
                                    const cx = 50;
                                    const cy = 50;

                                    const rad = (item.angle * Math.PI) / 180;
                                    const x = cx + r * Math.cos(rad);
                                    const y = cy - r * Math.sin(rad);

                                    return (
                                        <text
                                            key={i}
                                            x={x}
                                            y={y}
                                            fontSize="5"
                                            fill="#9ca3af"
                                            textAnchor="middle"
                                            dominantBaseline="middle"
                                        >
                                            {item.val}
                                        </text>
                                    );
                                })}


                            </svg>


                            {/* Center text */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center ">
                                <span className="text-2xl font-normal">{45}%</span>
                                <span className="text-xs text-yellow-400">Medium</span>
                            </div>
                        </div>



                        {/* Bars */}
                        <div className="flex-1 space-y-2 text-xs">
                            {[
                                { label: "Enrollment", value: 23 },
                                { label: "Scan Failed", value: 43 },
                                { label: "Device Patch Enabled", value: 33 },
                                { label: "Device with scan failed", value: 13 },
                                { label: "Device with no scan in 30 days", value: 73 },
                                { label: "Device with failed patches", value: 23 },
                            ].map((item, i) => (
                                <div key={i}>
                                    <div className="flex justify-between">
                                        <span className="text-gray-700 dark:text-white text-sm">{item.label}</span>
                                        <span className='text-gray-700 dark:text-white'>{item.value}%</span>
                                    </div>
                                    <div className="h-2 bg-gray-300 dark:bg-gray-700 rounded">
                                        <div
                                            className="h-2 bg-blue-500 rounded"
                                            style={{ width: `${item.value}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Compliance Stats */}
                <div className=" relative  col-span-7 bg-[#121A2B] rounded-xl p-4 shadow-lg">
                    <h2 className="text-lg text-white mb-3 border-l-4 border-indigo-500 px-2"> Patches</h2>
                    <div className='text-gray-600'> Nike's "Just Do It", Apple's "Think Different", and De Beers' "A Diamond is Forever</div>
                    <div className='text-gray-600'>A strong slogan is usually short, memorable, and differentiates the brand</div>
                    <div className="absolute inset-x-0 bottom-0 grid grid-cols-6 p-2 gap-3  pb-5   ">
                        {[
                            { label: "Critical", color: "#6B3EFF33", icon: TriangleAlert, iconcolor: "#3E6FFF" },
                            { label: "Security", color: "#6B3EFF33", icon: Computer, iconcolor: "#3E6FFF" },
                            { label: "Failed", color: "#FF3E5433", icon: X, iconcolor: "#FF3E41" },
                            { label: "Reboot", color: "#FFCB3E33", icon: RotateCw, iconcolor: "#FFBF3E" },
                            { label: "Total", color: "#75FF3E33", icon: MoveUp, iconcolor: "#58FF3E" },
                            { label: "Approved", color: "#6B3EFF33", icon: Check, iconcolor: "#3E6FFF" },
                        ].map((item, i) => {
                            const Icon = item.icon;

                            return (
                                <div
                                    key={i}
                                    className="bg-[#1E273A] rounded-lg p-3 flex flex-col items-center justify-center"
                                >
                                    <p className="text-md text-gray-400">{item.label}</p>
                                    {/* Icon Circle */}
                                    <div className={`w-14 h-14 rounded-full  flex items-center justify-center mb-2`} style={{ backgroundColor: `${item.color}` }}>
                                        <Icon size={20} style={{ color: `${item.iconcolor}` }} />
                                    </div>


                                    <p className="text-md font-semibold">{patches?.[item.label.toLowerCase()] ?? 0}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>


            <div className="grid grid-cols-12 gap-3 mt-3">

                {/* OS Status */}
                <div className="col-span-4 bg-[#121A2B] rounded-xl p-4">
                    <h2 className="text-lg text-white mb-3 border-l-4 border-indigo-500 px-2">OS Status</h2>
                    <div className='w-70'>
                        <div className="flex justify-between">
                            <span className="text-white">Overall Distribution</span>
                            <span>{28}%</span>
                        </div>
                        <div className="h-2 bg-gray-700 rounded">
                            <div
                                className="h-2 bg-blue-500 rounded"
                                style={{ width: `${28}%`, backgroundColor: `#01A357` }}
                            ></div>
                        </div>
                    </div>
                    <div className="flex justify-between text-center text-xs mt-3">
                        {[
                            { os: "Windows", color: "#3E6FFF" },
                            { os: "Linux", color: "#01A355" },
                            { os: "Mac", color: "#E8CF12E3" },
                            { os: "Server", color: "#E83134D6" },
                        ].map((item, i) => (
                            <div
                                key={i}
                                className="border-1 border-[#234779]/70 p-2 rounded-lg"
                            >
                                {/* Circle */}
                                {/* <div
                                        className={`w-20 h-20 rounded-full border-4 ${item.color} flex items-center justify-center`}
                                    >
                                        <span className="font-semibold">5%</span>
                                    </div> */}
                                <CircularProgress percentage={osCount?.[item.os.toLowerCase()] ?? 0} label={item.os} color={item.color} />



                            </div>
                        ))}
                    </div>
                </div>

                {/* Security Posture */}
                <div className="col-span-4 bg-[#121A2B] rounded-xl p-4">
                    <h2 className="text-lg text-white mb-3 border-l-4 border-indigo-500 px-2">Security Posture</h2>
                    <div className="grid grid-cols-12 gap-3">

                        {/* Left Card */}
                        <div className="col-span-4  bg-[#141D2E] rounded-xl p-4 flex flex-col items-center justify-center border border-[#191F48]">
                            <div className="text-3xl font-bold text-white">{securityPosture?.compliance ?? 0}%</div>
                            <p className="text-sm text-gray-300 mt-1">Compliance</p>
                            <p className="text-xs text-green-400 mt-1">+3% this week</p>
                        </div>

                        {/* Right Card */}
                        <div className="col-span-8 rounded-xl flex flex-col gap-1">

                            {/* Chart / Content Placeholder */}
                            <div className="w-full h-13 bg-[#141D2E] rounded-lg flex items-center justify-between px-3 text-gray-300  border border-[#191F48]">
                                <div>
                                    <div>Compliance</div>
                                    <div>{securityPosture?.needed ?? 0}</div>
                                </div>
                                <div>
                                    <div className={`w-10 h-10 rounded-md  flex items-center justify-center`} style={{ backgroundColor: `#FF3E5433` }}>
                                        <TriangleAlert size={20} style={{ color: "#FF3E41" }} />
                                    </div>
                                </div>
                            </div>
                            <div className="w-full h-13 bg-[#141D2E] rounded-lg flex items-center justify-between px-3 text-gray-300  border border-[#191F48]">
                                <div>
                                    <div>Risk Level</div>
                                    <div>15</div>
                                </div>
                                <div>
                                    <div className={`w-10 h-10 rounded-md  flex items-center justify-center`} style={{ backgroundColor: `#FFCB3E33` }}>
                                        <RotateCw size={20} style={{ color: "#FFBF3E" }} />
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>

                    <div className="space-y-2 text-sm mt-1">
                        {[
                            { label: "MFA Not Enforced", status: "Failed" },
                            { label: "Endpoint Encryption", status: "Critical" },
                            { label: "Patch Management", status: "Warning" },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center  justify-between h-10 bg-[#141D2E] p-1  border border-[#191F48]">
                                <span className="text-gray-400">{item.label}</span>
                                <span className="text-red-400">{item.status}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Device Info (Chart Placeholder) */}
                <div className="col-span-4 bg-[#121A2B] rounded-xl p-4">
                    <h2 className="text-lg text-white mb-3 border-l-4 border-indigo-500 px-2">IPWise Patch Status</h2>

                    {/* Fake Chart Line */}
                    <div className="h-32  rounded-lg">
                        <div className="w-full h-[250px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={ipStatus}
                                    layout="vertical"
                                // margin={{ top: 10, right: 20, left: 20, bottom: 10 }}
                                >
                                    <XAxis type="number" stroke="#ccc" fontSize={12} />
                                    <YAxis type="category" dataKey="IPAddress" stroke="#ccc" width={100} fontSize={12} />
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

                    <h2 className="text-lg text-white mb-3 border-l-4 border-indigo-500 px-2">3rd Party PatchManagement</h2>
                    <div className="flex gap-4">

                        {/* Donut */}
                        <div className="w-50 h-50 relative">
                            <PieCharts
                                data={thirdPartySeverity}
                                centerValue={thirdPartySeverity.reduce((sum, item) => sum + item.value, 0)} // sum of all values
                                centerLabel="Total" // you can customize this
                            />

                        </div>

                        {/* Table */}
                        <div className="flex-1 h-45 overflow-x-auto">
                            <div className="text-xs text-gray-400 grid grid-cols-4 mb-2">
                                <span>Software</span>
                                <span>Version</span>
                                <span>CVSS</span>
                                <span>State</span>
                            </div>

                            {thirdPartyList.map((item, i) => (
                                <div
                                    key={i}
                                    className="grid grid-cols-4 text-xs bg-[#141D2E] p-2 rounded mb-1 items-center"
                                >
                                    <span>{item.software}</span>
                                    <span>{item.version}</span>

                                    {/* CVES with Tooltip */}
                                    <div className="relative group">
                                        <span className="truncate block max-w-[100px] cursor-pointer">
                                            {item.cves}
                                        </span>

                                        {/* Tooltip */}
                                        <div className="absolute z-50 hidden group-hover:block bg-[#0B1220] text-white text-xs p-2 rounded shadow-lg w-64 top-6 left-0 border border-[#1C2541]">
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

                    <h2 className="text-lg text-white mb-3 border-l-4 border-indigo-500 px-2">Operating Systems Update</h2>
                    <div className="flex gap-4">

                        {/* Donut */}
                        <div className="w-50 h-50 relative">
                            <PieCharts
                                data={osPie}
                                centerValue={osPie.reduce((sum, item) => sum + item.value, 0)} // sum of all values
                                centerLabel="Total" // you can customize this
                            />

                        </div>

                        {/* Table */}
                        <div className="flex-1 h-50 overflow-x-auto">
                            <div className="text-xs text-gray-400 grid grid-cols-4 mb-2">
                                <span>Update</span>
                                <span>Installed</span>
                                <span>Needed</span>
                                <span>Severity</span>
                            </div>

                            {osList.map((item, i) => (
                                <div key={i} className="grid grid-cols-4 text-xs bg-[#141D2E] p-2 rounded mb-1 items-center">
                                    <span>{item.PatchTitle}</span>
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

                    <h2 className="text-lg text-white mb-3 border-l-4 border-indigo-500 px-2">Top Risk Devices</h2>
                    <div className="text-xs text-gray-400 grid grid-cols-4 mb-2">
                        <span>Device</span>
                        <span>Patches</span>
                        <span>Last Scan</span>
                        <span>Severity</span>
                    </div>

                    {topDevices.map((item, i) => (
                        <div key={i} className="grid grid-cols-4 text-xs bg-[#141D2E] p-2 rounded mb-1">
                            <span>{item.IPAddress}</span>
                            <span>{item.MissingCount}</span>
                            <span>{item.LastScan}</span>
                            <span className="text-red-400">{item.Severity}</span>
                        </div>
                    ))}
                </div>

                {/* BOTTOM RIGHT (Bar Chart Placeholder) */}
                <div className="col-span-6 bg-[#0F172A] border border-[#1C2541] rounded-xl p-4">
                    <h2 className="text-lg text-white mb-3 border-l-4 border-indigo-500 px-2">Patch History</h2>


                    <SingleBarcharts  data={histData}/>

                </div>

            </div>
        </div>
    )
}

export default OverviewDashboard