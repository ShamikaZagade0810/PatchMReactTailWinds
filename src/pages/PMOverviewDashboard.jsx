import React from 'react'
import { useState } from 'react';

import { Calendar, Activity, Settings } from "lucide-react";


import OverviewDashboard from './OverviewDashboard';

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
                  <OverviewDashboard />
            ),
        },
        {
            label: "Device",
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

                {tabs[activeTab].content}

            </div>


        </div >

    )
}
