import React from 'react'
import { useState } from 'react';

import { Calendar, Activity, Settings } from "lucide-react";

const Devices = () => {
    const [activeTab, setActiveTab] = useState(0);
    const tabs = [
        {
            label: "Overview",
            icon: <Calendar size={18} />,
            content: (
                <div className="p-4 bg-white rounded-xl shadow">
                    <h3 className="text-lg font-semibold mb-2">Preferences</h3>
                    <p className="text-gray-500 text-sm">
                        Manage your settings here.
                    </p>
                </div>
            ),
        },
        {
            label: "Hardware",
            icon: <Activity size={18} />,
            content: (
                <div className="p-4 bg-white rounded-xl shadow">
                    <h3 className="text-lg font-semibold mb-2">Preferences</h3>
                    <p className="text-gray-500 text-sm">
                        Manage your settings here.
                    </p>
                </div>
            ),
        },
        {
            label: "OS and Security",
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

    const alertstatus = [
        { name: "critical", value: 74 },
        { name: "warning", value: 43 },
        { name: "information", value: 30 },
    ];
    const patchingData = [
        { name: "os", value: 74 },
        { name: "software", value: 15 },
    ];
    return (
        <div className="min-h-screen bg-gray-200 dark:bg-[#000000] text-white">

            {/* ✅ Top Cards */}
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white dark:bg-[#0B1220] rounded-xl p-4 shadow-md">
                    <h3 className="text-xl font-bold text-gray-500 dark:text-white mb-4"> Total Patches </h3>
                    <div className="flex items-center gap-6 flex-wrap">
                        {alertstatus.map((item, index) => {
                            // Color mapping
                            const colorMap = {
                                critical: "text-red-400 bg-red-500/10",
                                warning: "text-yellow-400 bg-yellow-500/10",
                                information: "text-cyan-400 bg-blue-500/10",
                            };
                            return (
                                <div key={index} className="flex items-center gap-2">
                                    <span className="text-sm capitalize text-gray-500 dark:text-gray-300"> {item.name} </span>
                                    <span className={`px-3 py-1 rounded-md font-semibold text-sm ${colorMap[item.name.toLowerCase()] }`} >
                                        {item.value}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Card 2 */}
                <div className="bg-white dark:bg-[#0B1220] rounded-xl p-4 shadow-md">
                    <h3 className="text-xl font-bold text-gray-500 dark:text-white mb-4"> Patching Status </h3>
                    <div className="flex items-center gap-6 flex-wrap">
                        {patchingData.map((item, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <span className="text-sm capitalize text-gray-500 dark:text-gray-300"> {item.name}</span>
                                <span className="px-3 py-1 rounded-md font-semibold text-sm text-cyan-400 bg-cyan-400/10">{item.value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Tabs Header */}
            <div className="mb-1 bg-white dark:bg-[#0B1220] p-4 pb-2 mx-4">
                <div className="flex ">
                    {tabs.map((tab, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveTab(index)}
                            className={`flex items-center gap-2 px-5 py-3  text-sm font-medium transition-all
                             ${activeTab === index
                                    ? " text-blue-600 "
                                    : "text-gray-500 hover:text-blue-500"
                                }`}
                        >
                            {tab.icon}
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Tab Content */}
            <div className="mb-1 bg-white dark:bg-[#0B1220] p-4 mx-4">
                {tabs[activeTab].content}
            </div>

        </div>
    );
}

export default Devices
