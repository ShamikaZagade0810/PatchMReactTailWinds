import React from 'react'
import { useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";

import { Calendar, Activity, Settings, ArrowLeft, AppWindow, Dot } from "lucide-react";
import 'primeicons/primeicons.css';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
const Devices = () => {
  const navigate = useNavigate();
  const { username } = useParams();
  const overvdata = [
    { name: "Machine name", value: "Michael's laptop" },
    { name: "Agent version", value: "1.8.7.3" },
    { name: "Domain", value: "WORKGROUP" },
    { name: "Public IP", value: "203.0.113.45" },
    { name: "Private IP", value: "192.168.1.10" },
    { name: "Last login", value: "MichaelScott (Dec 27, 2023 10:03:53 am)" },
    { name: "Last seen", value: "Now" },
    { name: "Last reboot", value: "Jun 25, 2023 11:50:17 AM" },
  ];

  const relationData = [
    { name: "Site", value: "Dunder Mifflin" },
    { name: "Folder", value: "Laptops" },
    { name: "Users", value: "Michael Scott" },
    { name: "Role", value: "Management" },
    { name: "Email", value: "prisonmike@dundermifflin.com" },
    { name: "Phone", value: "+1 212 456 7890" },
  ];
  const hardwaredata = [
    { name: "Vendor", value: "Dell Inc." },
    { name: "Model", value: "Precision Tower 3620" },
    { name: "Serial number", value: "DT3620X1234ABCD" },
    { name: "Motherboard", value: "Dell Inc. 0MWYPT" },
    { name: "BIOS manufacturer", value: "Dell Inc." },
    { name: "BIOS version", value: "1.13.0" },
    { name: "BIOS version date", value: "5/13/2024" },
    { name: "Processor", value: "Intel(R) Core(TM) i7-8565U CPU @1.80GHz - 4 - 4" },
    { name: "Memory", value: "31 MB" },
    { name: "Video card", value: "Microsoft Hyper-V Video" },
    { name: "Sound", value: "Intel(R) Display Audio" },
    { name: "MAC addresses", value: "00:09:0F:FE:00:01, (Primary), 00:FF:9A:AA:9A:05" }
  ];
  const osstatusdata = [
    { name: "OS edition", value: "Microsoft Windows 11 Enterprise 64" },
    { name: "OS Version", value: "21H2" },
    { name: "OS build", value: "22000.469" },
    { name: "Office version", value: "Microsoft Office 365 for Windows, Build 16.0.14701.20262" }
  ];

  const splitIndex = hardwaredata.findIndex(
    (item) => item.name === "BIOS version date"
  ) + 1;

  const leftData = hardwaredata.slice(0, splitIndex);
  const rightData = hardwaredata.slice(splitIndex);

  const [activeTab, setActiveTab] = useState(0);
  const tabs = [
    {
      label: "Overview",
      icon: <Calendar size={18} />,
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

          {/* Device Info */}
          <div className="p-4 bg-gray-100 dark:bg-[#121A2B] rounded-xl shadow">
            <h3 className="text-md font-semibold mb-3  text-black dark:text-white">
              Device Info
            </h3>

            <div className="space-y-2 text-sm">
              {overvdata.map((item, i) => (
                <div key={i} className="flex justify-between border-b border-gray-100 dark:border-gray-800 py-1">
                  <span className="text-gray-800 dark:text-gray-400">{item.name}</span>
                  <span className="text-gray-800 dark:text-gray-100 font-medium text-right">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Device Relations */}
          <div className="p-4 bg-gray-100 dark:bg-[#121A2B] rounded-xl shadow">
            <h3 className="text-md font-semibold mb-3 text-black dark:text-white">
              Device Relations
            </h3>

            <div className="space-y-2 text-sm">
              {relationData.map((item, i) => (
                <div key={i} className="flex justify-between border-b border-gray-100 dark:border-gray-800 py-1">
                  <span className="text-gray-800 dark:text-gray-500">{item.name}</span>
                  <span className="text-gray-800 dark:text-gray-100 font-medium text-right">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      ),
    },
    {
      label: "Hardware",
      icon: <Activity size={18} />,
      content: (
        <div className="p-4 bg-gray-100 dark:bg-[#121A2B] rounded-xl shadow">
          <h3 className="text-md font-semibold mb-3 text-gray-700 dark:text-white">
            Hardware Info
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-sm">

            {/* Left Column */}
            <div className="space-y-2">
              {leftData.map((item, i) => (
                <div
                  key={i}
                  className="flex justify-between border-b border-gray-100 dark:border-gray-800 py-1"
                >
                  <span className="text-gray-800 dark:text-gray-500">{item.name}</span>
                  <span className="text-black dark:text-gray-200 font-medium text-right">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Right Column */}
            <div className="space-y-2">
              {rightData.map((item, i) => (
                <div
                  key={i}
                  className="flex justify-between border-b border-gray-100 dark:border-gray-800 py-1"
                >
                  <span className="text-gray-800 dark:text-gray-500">{item.name}</span>
                  <span className="text-black dark:text-gray-200 font-medium text-right break-all">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>

          </div>
        </div>
      ),
    },
    {
      label: "OS and Security",
      icon: <Settings size={18} />,
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Device Info */}
          <div className="p-4 bg-gray-100 dark:bg-[#121A2B] rounded-xl shadow">
            <h3 className="text-md font-semibold mb-3 text-gray-700 dark:text-white"> Os Info </h3>
            <div className="space-y-2 text-sm">
              {osstatusdata.map((item, i) => (
                <div key={i} className="flex justify-between border-b border-gray-100 dark:border-gray-800 py-1">
                  <span className="text-gray-800 dark:text-gray-500">{item.name}</span>
                  <span className="text-black dark:text-gray-200 font-medium text-right">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
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

  const alertsData = [
    {
      title: "Event Logs",
      created: "an hour ago",
      severity: "Critical",
      category: "General",
    },
    {
      title: "Disk Usage (C:)",
      created: "an hour ago",
      severity: "Warning",
      category: "Disk",
    },
  ];

  const performanceData = [
  { time: "10:15", cpu: 35, memory: 45 },
  { time: "11:05", cpu: 48, memory: 52 },
  { time: "11:35", cpu: 42, memory: 50 },
  { time: "12:22", cpu: 60, memory: 65 },
  { time: "12:20", cpu: 45, memory: 70 },
  { time: "10:25", cpu: 68, memory: 75 },
  { time: "1:30", cpu: 78, memory: 38 },
  { time: "11:55", cpu: 66, memory: 74 },
  { time: "10:40", cpu: 28, memory: 65 },
  { time: "2:28", cpu: 62, memory: 72 },
];
const formatTime = (time) => {
  const [h, m] = time.split(":");
  return `${h.padStart(2, "0")}:${m.padStart(2, "0")}`;
};

const sortedData = [...performanceData]
  .map((d) => ({ ...d, time: formatTime(d.time) }))
  .sort((a, b) => a.time.localeCompare(b.time));
  return (
    <div className="min-h-screen bg-gray-200 dark:bg-black p-3 space-y-3">
      {/* 🔷 Header */}
      <div className="flex items-center gap-3 bg-white dark:bg-[#0B1220] p-3 rounded-md shadow">
        <button onClick={() => navigate(-1)} className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800" >
          <ArrowLeft size={20} className="text-gray-600 dark:text-gray-300" />
        </button>

        <i className="pi pi-microsoft text-lg text-gray-600 dark:text-white"></i>
        <h2 className="text-lg font-semibold text-gray-700 dark:text-white"> {username || "User"} </h2>

        <div className="flex items-center gap-1 ml-2">
          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
          <span className="text-sm text-gray-500 dark:text-gray-300">Online</span>
        </div>
      </div>

      {/* 🔷 Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Alert Status */}
        <div className="bg-white dark:bg-[#0B1220] p-4 rounded-md shadow">
          <h3 className="text-sm font-semibold text-gray-600 dark:text-white mb-2"> Alert Status </h3>

          <div className="flex gap-4 text-sm">
            {alertstatus.map((item, i) => {
              const colorMap = {
                critical: "text-red-500 bg-red-500/10 rounded px-2 ",
                warning: "text-yellow-500 bg-yellow-500/10 rounded px-2",
                information: "text-cyan-500 bg-cyan-500/10 rounded px-2",
              };
              return (
                <div key={i} className="flex gap-1">
                  <span className="capitalize text-gray-500">{item.name}</span>
                  <span className={`font-semibold ${colorMap[item.name]} `}>
                    {item.value}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Patching Status */}
        <div className="bg-white dark:bg-[#0B1220] p-4 rounded-md shadow">
          <h3 className="text-sm font-semibold text-gray-600 dark:text-white mb-2"> Patching Status </h3>

          <div className="flex gap-4 text-sm">
            {patchingData.map((item, i) => (
              <div key={i} className="flex gap-2">
                <span className="capitalize text-gray-500">{item.name}:</span>
                <span className="bg-blue-500/10 text-blue-500 px-2 rounded text-xs font-semibold">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 🔷 Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">

        {/* LEFT SIDE */}
        <div className="lg:col-span-2 space-y-3">

          {/* Tabs */}
          <div className="bg-white dark:bg-[#0B1220] rounded-md shadow p-3">
            <div className="flex gap-6 border-b pb-2 text-sm">
              {tabs.map((tab, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`flex items-center gap-2 pb-2
                ${activeTab === index
                      ? "border-b-2 border-blue-500 text-blue-600"
                      : "text-gray-500"
                    }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="pt-3">{tabs[activeTab].content}</div>
          </div>

          {/* Alerts Table */}
          <div className="bg-white dark:bg-[#121A2B] rounded-xl shadow p-4">

            {/* Header */}
            <h3 className="text-sm font-semibold text-gray-600 dark:text-white mb-3">
              Alerts
            </h3>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">

                {/* Table Head */}
                <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-white">
                  <tr>
                    <th className="p-2 text-left">Alert Title</th>
                    <th className="p-2 text-left">Created</th>
                    <th className="p-2 text-left">Severity</th>
                    <th className="p-2 text-left">Category</th>
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody>
                  {alertsData.map((item, i) => (
                    <tr
                      key={i}
                      className="border-b border-gray-300 dark:border-gray-700"
                    >
                      <td className="p-2 text-gray-700 dark:text-white">{item.title}</td>
                      <td className="p-2  text-gray-700 dark:text-white">{item.created}</td>
                      <td className={`p-2 font-medium ${item.severity === "Critical" ? "text-red-500" : "text-yellow-500" }`} >
                        {item.severity}
                      </td>
                      <td className="p-2  text-gray-700 dark:text-white">{item.category}</td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-3">

          {/* Metrics */}
          <div className="bg-white dark:bg-[#0B1220] rounded-md shadow p-3">
            <h3 className="text-sm font-semibold text-gray-600 dark:text-white mb-2">
              Metrics
            </h3>

            {/* Replace with chart */}
            <div className="h-40 ">
              <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={sortedData}>
        
        {/* Gradients */}
        <defs>
          <linearGradient id="cpuColor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#FCD34D" stopOpacity={0.4} />
          <stop offset="95%" stopColor="#FCD34D" stopOpacity={0} />
        </linearGradient>

          <linearGradient id="memoryColor" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#22C55E" stopOpacity={0.4}/>
            <stop offset="95%" stopColor="#22C55E" stopOpacity={0}/>
          </linearGradient>
        </defs>

        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />

        <XAxis
          dataKey="time"
          tick={{ fill: "#9CA3AF", fontSize: 10 }}
        />

        <YAxis tick={{ fill: "#9CA3AF", fontSize: 10 }} />

        <Tooltip
          contentStyle={{
            backgroundColor: "#0B1220",
            border: "1px solid #374151",
            color: "#fff",
          }}
        />

        {/* CPU Area */}
        <Area
          type="monotone"
          dataKey="cpu"
         stroke="#FCD34D"
          fill="url(#cpuColor)"
          strokeWidth={2}
        />

        {/* Memory Area */}
        <Area
          type="monotone"
          dataKey="memory"
          stroke="#22C55E"
          fill="url(#memoryColor)"
          strokeWidth={2}
        />

      </AreaChart>
    </ResponsiveContainer>
            </div>
          </div>

          {/* Activity Logs */}
          <div className="bg-white dark:bg-[#0B1220] rounded-md shadow p-3">
            <h3 className="text-sm font-semibold text-gray-600 dark:text-white">
              Activity Logs
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Devices
