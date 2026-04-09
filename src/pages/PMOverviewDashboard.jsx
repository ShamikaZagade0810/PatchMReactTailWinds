import React from 'react'
import { useState } from 'react';
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
import { Calendar, Activity, Settings } from "lucide-react";
import { TabView, TabPanel } from 'primereact/tabview';
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

export const PMOverviewDashboard = () => {
    const [activeTab, setActiveTab] = useState(0);
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



    const breadcrumbMap = {
        "/": [{ label: "Dashboard" }],
        "/dashboard/status": [
            { label: "Dashboard" },
            { label: "Status" }
        ],
        "/dashboard/thirdparty": [
            { label: "Dashboard" },
            { label: "Third Party" }
        ],
        "/content/send": [
            { label: "Content Distribution" },
            { label: "Send Multiple Patches" }
        ],
        "/content/view": [
            { label: "Content Distribution" },
            { label: "View Multiple Patches" }
        ]
    };



    const tabs = [
        {
            label: "Overview",
            icon: <Calendar size={18} />,
            content: (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-white rounded-xl shadow border-l-4 border-blue-500">
                        <p className="text-gray-500 text-sm">Users</p>
                        <h2 className="text-2xl font-semibold">1,240</h2>
                    </div>
                    <div className="p-4 bg-white rounded-xl shadow border-l-4 border-green-500">
                        <p className="text-gray-500 text-sm">Sessions</p>
                        <h2 className="text-2xl font-semibold">320</h2>
                    </div>
                    <div className="p-4 bg-white rounded-xl shadow border-l-4 border-purple-500">
                        <p className="text-gray-500 text-sm">Revenue</p>
                        <h2 className="text-2xl font-semibold">₹45,000</h2>
                    </div>
                </div>
            ),
        },
        {
            label: "Devices",
            icon: <Activity size={18} />,
            content: (
                <div className="space-y-3">
                    <div className="p-3 bg-white rounded-lg shadow">User logged in</div>
                    <div className="p-3 bg-white rounded-lg shadow">Order placed</div>
                    <div className="p-3 bg-white rounded-lg shadow">Server restarted</div>
                </div>
            ),
        },
        {
            label: "Settings",
            icon: <Settings size={18} />,
            content: (
                <div className="p-4 bg-white rounded-xl shadow">
                    <h3 className="text-lg font-semibold mb-2">Preferences</h3>
                    <p className="text-gray-500 text-sm">
                        Manage your settings here.
                    </p>
                </div>
            ),
        },
    ];

    const breadcrumbItems = breadcrumbMap[location.pathname] || [
        { label: "Dashboard" }
    ];

    const home = { icon: 'pi pi-home', url: '/' };
    return (





        <div className="min-h-screen bg-gray-200 dark:bg-[#000000] text-white  ">
            <div className="mb-1 bg-white dark:bg-[#0B1220] p-4 ">
                <div className="flex border-b">
                    {tabs.map((tab, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveTab(index)}
                            className={`flex items-center gap-2 px-5 py-3 text-sm font-medium transition-all
                ${activeTab === index
                                    ? "border-b-2 border-blue-500 text-blue-600"
                                    : "text-gray-500 hover:text-blue-500"
                                }`}
                        >
                            {tab.icon}
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>
            {/* Header */}

 <div className="mb-1 bg-white dark:bg-[#0B1220] p-4 "> 
              
        {activeTab == 0 && 
        ( 
              <div className="mb-1 bg-white dark:bg-[#0B1220] p-4 ">
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


                                        <p className="text-md font-semibold">17</p>
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
                                    <CircularProgress percentage={34} label={item.os} color={item.color} />



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
                                <div className="text-3xl font-bold text-white">64%</div>
                                <p className="text-sm text-gray-300 mt-1">Compliance</p>
                                <p className="text-xs text-green-400 mt-1">+3% this week</p>
                            </div>

                            {/* Right Card */}
                            <div className="col-span-8 rounded-xl flex flex-col gap-1">

                                {/* Chart / Content Placeholder */}
                                <div className="w-full h-13 bg-[#141D2E] rounded-lg flex items-center justify-between px-3 text-gray-300  border border-[#191F48]">
                                    <div>
                                        <div>Compliance</div>
                                        <div>14</div>
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
                                        <div>14</div>
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
                        <h2 className="text-lg text-white mb-3 border-l-4 border-indigo-500 px-2">Device Info</h2>

                        {/* Fake Chart Line */}
                        <div className="h-32  rounded-lg">
                            <div className="w-full h-[250px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart
                                        data={data}
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
                                    data={pieData}
                                    centerValue={pieData.reduce((sum, item) => sum + item.value, 0)} // sum of all values
                                    centerLabel="Total" // you can customize this
                                />

                            </div>

                            {/* Table */}
                            <div className="flex-1">
                                <div className="text-xs text-gray-400 grid grid-cols-4 mb-2">
                                    <span>Software</span>
                                    <span>Version</span>
                                    <span>CVSS</span>
                                    <span>State</span>
                                </div>

                                {[1, 2, 3, 4, 5].map((_, i) => (
                                    <div key={i} className="grid grid-cols-4 text-xs bg-[#141D2E] p-2 rounded mb-1 items-center">
                                        <span>Jenkins</span>
                                        <span>2.3.1.4</span>
                                        <span>9.8</span>
                                        <span className="text-red-400">Critical</span>
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
                                    data={pieData}
                                    centerValue={pieData.reduce((sum, item) => sum + item.value, 0)} // sum of all values
                                    centerLabel="Total" // you can customize this
                                />

                            </div>

                            {/* Table */}
                            <div className="flex-1">
                                <div className="text-xs text-gray-400 grid grid-cols-4 mb-2">
                                    <span>Update</span>
                                    <span>Installed</span>
                                    <span>Needed</span>
                                    <span>Severity</span>
                                </div>

                                {[1, 2, 3, 4, 5].map((_, i) => (
                                    <div key={i} className="grid grid-cols-4 text-xs bg-[#141D2E] p-2 rounded mb-1 items-center">
                                        <span>Windows Update</span>
                                        <span>1</span>
                                        <span>1</span>
                                        <span className="text-yellow-400">Medium</span>
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

                        {[1, 2, 3, 4, 5].map((_, i) => (
                            <div key={i} className="grid grid-cols-4 text-xs bg-[#141D2E] p-2 rounded mb-1">
                                <span>10.30.13.60</span>
                                <span>10</span>
                                <span>0d Ago</span>
                                <span className="text-red-400">Critical</span>
                            </div>
                        ))}
                    </div>

                    {/* BOTTOM RIGHT (Bar Chart Placeholder) */}
                    <div className="col-span-6 bg-[#0F172A] border border-[#1C2541] rounded-xl p-4">
                        <h2 className="text-lg text-white mb-3 border-l-4 border-indigo-500 px-2">Patch History</h2>


                        <SingleBarcharts />

                    </div>

                </div>
            </div>
        )
        
        
        
        } 

 </div>

          
        </div >

    )
}
