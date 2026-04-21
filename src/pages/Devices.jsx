import React, { useEffect } from 'react'
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

import {
  getBasicInfo,
  getPatchSeverityCount,
  getPatchInstalledCount,
  getHardwareInfo,
  getComputerInfo,
  getRamGraph
} from "../api/projectApi";
import SinglePieCharts from '../components/Charts/SinglePiecharts';

const Devices = () => {
  const navigate = useNavigate();
  const { username, ipaddress } = useParams();
  const [PatchSeverity, setPatchSeverity] = useState([]);
  const [PatchInstalled, setPatchInstalled] = useState([]);
  const [basicInfo, setBasicInfo] = useState([]);
  const [hardwareInfo, setHardwareInfo] = useState([]);
  const [computerInfo, setComputerInfo] = useState({ columndata: [], maindata: [] });
  const [ramGraph, setRamGraph] = useState([]);




  useEffect(() => {
    console.log("Hello World111");
    apiCalls();


  }, []);



  const apiCalls = async () => {
    try {
      const [
        resPatchSeverity,
        resPatchInstalled,
        resGetBasicInfo,
        resGetHardwareInfo,
        resComputerInfo,
        resRamGraph,



      ] = await Promise.all([
        getPatchSeverityCount({ ipaddress: ipaddress }),
        getPatchInstalledCount({ ipaddress: ipaddress }),
        getBasicInfo({ pcname: username }),
        getHardwareInfo({ pcname: username }),
        getComputerInfo({ pcname: username }),
        getRamGraph({ pcname: username }),
      ]);
      console.log("Get Info ", resRamGraph.data.data);
      const defaultSeverity = [
        { name: "Security Updates", value: 0 },
        { name: "Definition Updates", value: 0 },
        { name: "Crictical Updates", value: 0 }
      ];

      const mergedSeverity = defaultSeverity.map(obj => {
        let found = resPatchSeverity.data.data.find(
          item => item.name.toLowerCase() === obj.name.toLowerCase()
        );
        return found ? found : obj;
      })

      setPatchSeverity(mergedSeverity);
      setPatchInstalled(resPatchInstalled.data.data);
      setBasicInfo(resGetBasicInfo.data.data);
      setHardwareInfo(resGetHardwareInfo.data.data);


      let MainData = resComputerInfo.data.data[0].data;
      let ColumnData = resComputerInfo.data.data[0].column;
      console.log("Maindata --> ", MainData);
      console.log("ColumnData --> ", ColumnData);
      let obj = {};
      obj.maindata = MainData;
      obj.columndata = ColumnData;
      setComputerInfo(obj);
      setRamGraph(resRamGraph.data.data);
    } catch (error) {
      console.error("API Error:", error);
    }
  };


  const handleClickModalParameter =() =>{
     
  }

  const overvdata = [
    { name: "Computer Name", value: "N/A" },
    { name: "Name of OS", value: "N/A" },
    { name: "Version", value: "N/A" },
    { name: "Architecture", value: "N/A" },
    { name: "Total RAM(MB)", value: "N/A" },
    { name: "Available RAM(MB)", value: "N/A" },
    { name: "CPU Utilization(%)", value: "N/A" },

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
    { name: "Computer Name", value: "N/A" },
    { name: "IP Address", value: "N/A" },
    { name: "MAC Address", value: "N/A" },
    { name: "Processor Info", value: "N/A" },
    { name: "BIOS Info", value: "N/A" },
    { name: "Motherboard Info", value: "N/A" },
    { name: "All Drive", value: "N/A" },
    { name: "Hard Disk Model", value: "N/A" },
    { name: "RAM Size", value: "N/A" },
    { name: "Graphic Card", value: "N/A" },

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
            <h3 className="text-xl font-semibold mb-3 text-black dark:text-white"> Device Info </h3>

            <div className="space-y-2 text-sm">
              {(basicInfo && basicInfo.length > 0 ? basicInfo : overvdata).map((item, i) => (
                <div key={i} className="flex justify-between border-b border-gray-100 dark:border-gray-800 py-1 text-lg">
                  <span className="text-gray-800 dark:text-gray-400">{item.name}</span>
                  <span className="text-gray-800 dark:text-gray-100 font-normal text-right">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Device Relations */}
          <div className="p-4 bg-gray-100 dark:bg-[#121A2B] rounded-xl shadow ">
            <h3 className="text-xl font-semibold mb-3 text-black dark:text-white"> Hardware Details </h3>

            <div className="space-y-2 text-sm">
              {(hardwareInfo.length > 0 ? hardwareInfo : hardwaredata).map((item, i) => (
                <div key={i} className="flex justify-between border-b border-gray-100 dark:border-gray-800 py-1 text-lg">
                  <span className="text-gray-800 dark:text-gray-400">{item.name}</span>
                  <span className="text-gray-800 dark:text-gray-100 font-normal text-right">
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
          <h3 className="text-xl font-semibold mb-3 text-gray-700 dark:text-white"> Hardware Info </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-sm">

            {/* Left Column */}
            <div className="space-y-2">
              {leftData.map((item, i) => (
                <div
                  key={i}
                  className="flex justify-between border-b border-gray-100 dark:border-gray-800 py-1 text-lg"  >
                  <span className="text-gray-800 dark:text-gray-400">{item.name}</span>
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
                  className="flex justify-between border-b border-gray-100 dark:border-gray-800 py-1 text-lg"
                >
                  <span className="text-gray-800 dark:text-gray-400">{item.name}</span>
                  <span className="text-black dark:text-gray-200 font-normal text-right break-all">
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
            <h3 className="text-xl font-semibold mb-3 text-gray-700 dark:text-white"> OS Info </h3>
            <div className="space-y-2 text-sm">
              {osstatusdata.map((item, i) => (
                <div key={i} className="flex justify-between border-b border-gray-100 dark:border-gray-800 py-1 text-lg">
                  <span className="text-gray-800 dark:text-gray-400">{item.name}</span>
                  <span className="text-black dark:text-gray-200 font-normal text-right">
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
          <ArrowLeft size={25} className="text-gray-600 dark:text-gray-300" />
        </button>

        <i className="pi pi-microsoft text-xl text-gray-600 dark:text-white"></i>
        <h2 className="text-2xl font-semibold text-gray-700 dark:text-white"> {username || "User"} </h2>

        <div className="flex items-center gap-1 ml-2">
          <span className="w-3 h-3 bg-green-500 rounded-full"></span>
          <span className="text-md text-bold text-gray-500 dark:text-gray-100">Online</span>
        </div>
      </div>

      {/* 🔷 Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Alert Status */}
        <div className="bg-white dark:bg-[#0B1220] p-4 rounded-md shadow">
          <h3 className="text-xl font-semibold text-gray-600 dark:text-white mb-2"> Alert Status </h3>

          <div className="flex gap-4  items-center text-lg">
            {PatchSeverity.map((item, i) => {
              const colorMap = {
                Critical: "text-red-500 bg-red-500/10 rounded px-2 ",
                Security: "text-yellow-500 bg-yellow-500/10 rounded px-2",
                Definition: "text-cyan-500 bg-cyan-500/10 rounded px-2",
              };
              return (
                <div key={i} className="flex gap-1">
                  <span className="capitalize text-gray-400 ">{item.name}</span>
                  <span className={`font-semibold ${colorMap[item.name.split(" ")[0]]} `}>
                    {item.value}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Patching Status */}
        <div className="bg-white dark:bg-[#0B1220] p-4 rounded-md shadow">
          <h3 className="text-xl font-semibold text-gray-600 dark:text-white mb-2"> Patching Status </h3>

          <div className="flex gap-4 text-lg">
            {PatchInstalled.map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="capitalize text-gray-400">{item.name}:</span>
                <span className="bg-blue-500/10 text-blue-500 px-2 rounded font-semibold">
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
            <div className="flex gap-6 pb-2 text-md">
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
            <h3 className="text-xl font-semibold text-gray-600 dark:text-white mb-3">
              Computer Info
            </h3>

            {/* Table */}


            <div className="min-w-[600px]">

              {/* Header */}
              <div
                className="grid text-lg font-semibold text-gray-400 bg-[#1e293b] p-3 rounded-t-lg sticky top-0 z-10"
                style={{
                  gridTemplateColumns: `repeat(${computerInfo?.columndata.length || 1}, minmax(120px, 1fr))`,
                }}
              >
                {(computerInfo?.columndata || []).map((col, i) => (
                  <span key={i}>{col.label}</span>
                ))}
              </div>

              {/* Rows */}
              <div className="space-y-2 mt-2">
                {(computerInfo?.maindata || []).map((row, rowIndex) => (
                  <div
                    key={rowIndex}
                    className="grid items-center text-md bg-[#141D2E] p-3 rounded"
                    style={{
                      gridTemplateColumns: `repeat(${computerInfo?.columndata.length}, minmax(120px, 1fr))`,
                    }}
                  >
                    {(computerInfo?.columndata || []).map((col, colIndex) => {
                      const value = row[col.name.toLowerCase()];
                      console.log("col.label ", col.name);


                      // Custom styling logic
                      let className = "text-gray-300";

                      if (col.key === "status") {
                        className =
                          value === "Outdated"
                            ? "text-red-400"
                            : "text-green-400";
                      }

                      if (col.key === "severity") {
                        className =
                          value === "High"
                            ? "text-red-500"
                            : value === "Medium"
                              ? "text-yellow-400"
                              : "text-green-400";
                      }

                      return (
                        <span key={colIndex} className={className}>
                          {value}
                        </span>
                      );
                    })}
                  </div>
                ))}
              </div>

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
                      <stop offset="5%" stopColor="#22C55E" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
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
          <div className="bg-white dark:bg-[#0B1220] rounded-md shadow p-3 ">
            <h3 className="text-sm font-semibold text-gray-600 dark:text-white ">
              Activity Logs
            </h3>

            <div className="relative ">
              <SinglePieCharts
                data={ramGraph}
                onSliceClick={handleClickModalParameter}
                datakey={"ramGrphpie"}
              />

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Devices
