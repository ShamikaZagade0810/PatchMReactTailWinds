import React, { useState, useEffect } from 'react'
import PatchGauge from '../components/Charts/PatchGauge';
import SinglePieCharts from '../components/Charts/SinglePiecharts';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LineChart,
  Line,
  CartesianGrid,

  Scatter,
} from "recharts";
import { Modal } from '../components/Layout/Modal';


import {
  getLinuxDashboardCount,
  getLinuxPatchStatus,
  getLinuxBranchWiseDevices,
  getLinuxDeviceWiseInstallOrNeededCount,
  getPatchActivityOvertime,
  getLinuxInstalledPatchList,
  getLinuxRiskyEndpoint,
  getLinuxModalEndpointData,
  getLinuxModalPatchData,
  getLinuxBranchwiseModal,
  getLinuxIpwiseModal

} from "../api/projectApi";


const LinuxDashboard = () => {
  const [osPie, setOsPie] = useState([]);
  const [osList, setOsList] = useState([]);
  const [MissingPatches, setMissingPatches] = useState([]);
  const [modalData, setModalData] = useState({ columndata: [], maindata: [] });
  const [dashboardCount, setDashboardCount] = useState([]);
  const [patchStatus, setPatchStatus] = useState([]);
  const [branchDistribution, setBranchDistribution] = useState([]);
  const [iPWisePatchStatus, SetiPWisePatchStatus] = useState([]);
  const [patchActivityOverTime, SetpatchActivityOverTime] = useState([]);
  const [endpointInstalledPatches, setEndpointInstalledPatches] = useState({ columndata: [], maindata: [] });
  const [riskyEndpoint, setRiskyEndpoint] = useState({ columndata: [], maindata: [] });
  const [loading, setLoading] = useState(false);
   const [show, setShow] = useState(false);
  
  useEffect(() => {
    console.log("Hello World");
    apiCalls();


  }, []);


  const apiMapping = {
    patches: {
      total_endpoints : getLinuxModalEndpointData,
      patchesstatus : getLinuxModalPatchData,
      branchwise : getLinuxBranchwiseModal,
      ipwisepatchStatus :getLinuxIpwiseModal

    },

  };




  const apiCalls = async () => {
    try {
      const [
        dashboardCountRes,
        linuxPatchStatusRes,
        linuxBranchWiseDevicesRes,
        linuxDeviceWiseInstallOrNeededCountRes,
        patchActivityOvertimeRes,
        linuxInstalledPatchListRes,
        linuxRiskyDevices


      ] = await Promise.all([
        getLinuxDashboardCount(),
        getLinuxPatchStatus(),
        getLinuxBranchWiseDevices(),
        getLinuxDeviceWiseInstallOrNeededCount(),
        getPatchActivityOvertime(),
        getLinuxInstalledPatchList(),
        getLinuxRiskyEndpoint()
      ]);


      const result = Object.entries(dashboardCountRes.data.data[0]).map(([key, value]) => ({
        [key]: value
      }));
      console.log(result);
      setDashboardCount(result);
      setPatchStatus(linuxPatchStatusRes.data.data);
      setBranchDistribution(linuxBranchWiseDevicesRes.data.data);
      SetiPWisePatchStatus(linuxDeviceWiseInstallOrNeededCountRes.data.data);
      SetpatchActivityOverTime(patchActivityOvertimeRes.data.data);
      let MainData = linuxInstalledPatchListRes.data.data[0].data;
      let ColumnData = linuxInstalledPatchListRes.data.data[0].column;
      let obj = {};
      obj.maindata = MainData;
      obj.columndata = ColumnData;
      console.log("obj --> ", obj);
      setEndpointInstalledPatches(obj);


      let MainData1 = linuxRiskyDevices.data.data[0].data;
      let ColumnData1 = linuxRiskyDevices.data.data[0].column;
      let obj1 = {};
      obj1.maindata = MainData1;
      obj1.columndata = ColumnData1;
      console.log("obj --> ", obj1);

      setRiskyEndpoint(obj1);

    } catch (error) {
      console.error("API Error:", error);
    }
  };


  const cardConfig = {
    total_devices: {
      title: "Total Endpoints",
      color: "blue",
      id: "total_endpoints",
      inputData: "",

    },
    active_devices: {
      title: "Active Agents",
      color: "green",
      id: "total_endpoints",
      inputData: "UP",
    },
    Inactive_devices: {
      title: "Inactive Agents",
      color: "red",
      id: "total_endpoints",
       inputData: "Down",
    },
    Installed_package: {
      title: "Installed Packages",
      color: "purple",
      id: "installed_packages"
    },
    missing_patches: {
      title: "Missing Patches",
      color: "orange",
      id: "patchesstatus",
       inputData: "Declined"
    },
    success_patches: {
      title: "Successful Patches",
      color: "emerald",
      id: "patchesstatus",
        inputData: "Success"
    },
    failed_patches: {
      title: "Failed / Declined",
      color: "rose",
      id: "patchesstatus",
      inputData: "failed",
    },
    success_rate_percent: {
      title: "Patch Health (%)",
      color: "cyan",
      id: "patch_health"
    }
  };

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

  const data = [
    { name: "1", value: 90 },
    { name: "2", value: 300 },
    { name: "3", value: 120 },
    { name: "4", value: 200 },
    { name: "5", value: 180 },
    { name: "6", value: 260 },
    { name: "7", value: 210 },
    { name: "8", value: 240 },
    { name: "9", value: 170 },
    { name: "10", value: 290 },
    { name: "11", value: 220 },
    { name: "12", value: 180 },
    { name: "13", value: 260 },
    { name: "14", value: 310 },
    { name: "15", value: 200 },
  ];

  // White highlight points (like your image)
  const highlightPoints = [
    { name: "8", value: 170 },
    { name: "10", value: 310 },
    { name: "12", value: 220 },
    { name: "13", value: 260 },
  ];


  function EndpointCard({ key, title, value, total, color,onClickId ,inputData}) {
   
    const percent = (value / total) * 100;

    const colorMap = {
      blue: "text-blue-400 border-blue-500 bg-blue-500",
      green: "text-green-400 border-green-500 bg-green-500",
      red: "text-red-400 border-red-500 bg-red-500",
      purple: "text-purple-400 border-purple-500 bg-purple-500",
      orange: "text-orange-400 border-orange-500 bg-orange-500",
      emerald: "text-emerald-400 border-emerald-500 bg-emerald-500",
      rose: "text-rose-400 border-rose-500 bg-rose-500",
      cyan: "text-cyan-400 border-cyan-500 bg-cyan-500",
    };


    const score = 741;
    const max = 1000;

    const percent1 = score / max; // 0 → 1

    const radius = 80;
    const stroke = 12;
    const circumference = Math.PI * radius; // half circle only

    const dashOffset = circumference * (1 - percent1);

    const reqData = { 
        value :inputData
    }

    return (
      <div key={key}
        onClick={() => {  console.log(onClickId); handleClickModalParameter('Patches', onClickId.toLowerCase(),reqData) }}
        className="dark:bg-[#121A2B] border border-gray-700 rounded-lg p-3 text-white shadow-md">

        {/* Top */}
        <div className="flex justify-between items-center mb-2">
          <div className={`w-6 h-6 flex items-center justify-center border rounded ${colorMap[color].split(" ")[1]}`}>
            <span className={`text-xs ${colorMap[color].split(" ")[0]}`}>≡</span>
          </div>

          <div className="bg-green-600/20 text-green-400 text-[10px] px-2 py-[2px] rounded">
            ↗ +2 today
          </div>
        </div>

        {/* Value */}
        <div className={`text-lg font-semibold ${colorMap[color].split(" ")[0]}`}>
          {value}
        </div>

        {/* Title */}
        <div className="text-sm text-gray-300">{title}</div>

        {/* Progress */}
        <div className="mt-2">
          <div className="w-full h-[3px] bg-gray-700 rounded">
            <div
              className={`h-full rounded ${colorMap[color].split(" ")[2]} transition-all duration-500`}
              style={{ width: `${percent}%` }}
            ></div>
          </div>

          <div className="flex justify-between text-[10px] text-gray-400 mt-1">
            <span>Status</span>
            <span>{value}/{total}</span>
          </div>
        </div>
      </div>
    );
  }




  return (
    <div className="mb-1 bg-white dark:bg-[#0B1220] ">

        <Modal
                      show={show}
                      setShow={setShow}
                      data={modalData}
      
                  />
      <div className="grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-8 gap-4 p-4">
        {dashboardCount.map((obj, index) => {
          const key = Object.keys(obj)[0];
          const value = obj[key];

          const config = cardConfig[key] || { title: key, color: "gray" , id:"" };
          console.log("config ",config);
          
          return (
            <EndpointCard
              key={index}
              title={config.title}
              value={value}
              total={100}
              color={config.color}
              onClickId={config.id}
              inputData ={config.inputData}
            />
          );
        })}

        {/* <EndpointCard title="Active Agents" value={100} total={120} color="green" />
        <EndpointCard title="Inactive Agents" value={20} total={120} color="red" />
        <EndpointCard title="Installed Packages" value={300} total={400} color="purple" />
        <EndpointCard title="Missing Patches" value={50} total={200} color="orange" />
        <EndpointCard title="Successful Patches" value={180} total={200} color="emerald" />
        <EndpointCard title="Failed / Declined" value={20} total={200} color="rose" />
        <EndpointCard title="Patch Health" value={85} total={100} color="cyan" /> */}

      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-4 px-4">

        <div className=" bg-[#0F172A] border border-[#1C2541] rounded-xl p-4 ">

          {/* <h2 className="text-lg text-white mb-3 border-l-4 border-indigo-500 px-2">Patch Status</h2> */}

  <h2 className="card-header"> Patch Status </h2>

          {/* Donut */}
          <div className="w-full flex justify-center items-center">
            <div className="w-50 h-50">
              <SinglePieCharts
                data={patchStatus}
                onSliceClick={handleClickModalParameter}
                datakey={"linuxPatchstatus"}
              />
            </div>
          </div>




        </div>
        <div className=" bg-[#0F172A] border border-[#1C2541] rounded-xl p-4">

          {/* <h2 className="text-lg text-white mb-3 border-l-4 border-indigo-500 px-2">Branch Distribution</h2> */}
            <h2 className="card-header"> Branch Distribution </h2>
          <div className="flex gap-4">

            {/* Donut */}
            <div className="w-full flex justify-center items-center">
              <div className="w-50 h-50">
                <SinglePieCharts
                  data={branchDistribution}
                  onSliceClick={handleClickModalParameter}
                  datakey={"linuxBranchDistribution"}
                />

              </div>
            </div>


          </div>
        </div>

        <PatchGauge />
      </div>


      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 px-4 mt-3">


        <div className="bg-[#121A2B] rounded-xl p-4">
          {/* <h2 className="text-lg text-white mb-3 border-l-4 border-indigo-500 px-2">IPWise Patch Status</h2> */}
  <h2 className="card-header"> IPWise Patch Status </h2>
          {/* Fake Chart Line */}
          <div className="  rounded-lg">
            <div className="w-full h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={iPWisePatchStatus}
                  layout="vertical"
                // margin={{ top: 10, right: 20, left: 20, bottom: 10 }}
                >
                  <XAxis type="number" stroke="#ccc" fontSize={12} />
                  <YAxis type="category" dataKey="endpoint_ip" stroke="#ccc" width={100} fontSize={12} />
                  <Tooltip
                    cursor={false}
                    contentStyle={{
                      backgroundColor: "#1f2937",
                      border: "none",
                    }}
                  />
                  <Legend />

                  <Bar
                    dataKey="success_count"
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
                    dataKey="missing_count"
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


        <div className="bg-[#121A2B] p-6 rounded-xl w-full">

          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            {/* <div className="w-1 h-6 bg-blue-500 rounded"></div> */}
            {/* <h2 className="text-white text-lg font-semibold">Patch Activity Over Time </h2> */}
            <h2 className="card-header"> Patch Activity Over Time  </h2>
          </div>

          {/* Chart */}
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={patchActivityOverTime}>

              {/* Grid */}
              <CartesianGrid
                strokeDasharray="3 6"
                stroke="#1e293b"
                vertical={false}
              />

              {/* X Axis */}
              <XAxis
                dataKey="patch_date"
                stroke="#64748b"
                tickLine={false}
                axisLine={false}
              />

              {/* Y Axis */}
              <YAxis
                stroke="#64748b"
                tickLine={false}
                axisLine={false}
                domain={[80, 340]}
              />

              {/* Tooltip */}
              <Tooltip
                contentStyle={{
                  backgroundColor: "#020617",
                  border: "1px solid #1e293b",
                  color: "#fff",
                }}
              />

              {/* Purple Line */}
              <Line
                type="monotone"
                dataKey="success_count"
                stroke="#7c3aed"
                strokeWidth={3}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="missing_count"
                stroke="#98b12b"
                strokeWidth={3}
                dot={false}
              />

              <Line
                type="monotone"
                dataKey="failed_count"
                stroke="#ee2f0d"
                strokeWidth={3}
                dot={false}
              />

              {/* White Highlight Dots */}
              <Scatter
                data={highlightPoints}
                fill="#ffffff"
                shape="circle"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>


      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 px-4 mt-3">

        <div className="bg-[#121A2B] rounded-xl p-4">
          {/* <h2 className="text-lg text-white mb-3 border-l-4 border-indigo-500 px-2">Endpoint Installed Package</h2> */}
                  <h2 className="card-header"> Endpoint Installed Package </h2>
          {/* Fake Chart Line */}
          <div className="  rounded-lg">
            <div className="w-full h-[400px] overflow-auto">
              <div
                className="grid text-xs font-semibold text-gray-400 bg-[#1e293b] p-3 rounded-t-lg sticky top-0 z-10"
                style={{
                  gridTemplateColumns: `repeat(${endpointInstalledPatches.columndata.length}, minmax(120px, 1fr))`,
                }}
              >
                {endpointInstalledPatches.columndata.map((col, i) => (
                  <span key={i}>{col.label}</span>
                ))}
              </div>

              {/* Rows */}
              <div className="space-y-2 mt-2">
                {endpointInstalledPatches.maindata.map((row, rowIndex) => (
                  <div
                    key={rowIndex}
                    className="grid items-center text-sm bg-[#141D2E] p-3 rounded"
                    style={{
                      gridTemplateColumns: `repeat(${endpointInstalledPatches.columndata.length}, minmax(120px, 1fr))`,
                    }}
                  >
                    {endpointInstalledPatches.columndata.map((col, colIndex) => {
                      const value = row[col.name.toLowerCase()];
                  


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

          {/* Filters */}

        </div>

        <div className="bg-[#121A2B] rounded-xl p-4">
          {/* <h2 className="text-lg text-white mb-3 border-l-4 border-indigo-500 px-2">Risky Devices</h2> */}
 <h2 className="card-header"> Risky Devices</h2>
          {/* Fake Chart Line */}
          <div className="rounded-lg">
            <div className="w-full h-[400px] overflow-auto">
              <div
                className="grid text-xs font-semibold text-gray-400 bg-[#1e293b] p-3 rounded-t-lg sticky top-0 z-10"
                style={{
                  gridTemplateColumns: `repeat(${riskyEndpoint.columndata.length}, minmax(120px, 1fr))`,
                }}
              >
                {riskyEndpoint.columndata.map((col, i) => (
                  <span key={i}>{col.label}</span>
                ))}
              </div>

              {/* Rows */}
              <div className="space-y-2 mt-2">
                {riskyEndpoint.maindata.map((row, rowIndex) => (
                  <div
                    key={rowIndex}
                    className="grid items-center text-sm bg-[#141D2E] p-3 rounded"
                    style={{
                      gridTemplateColumns: `repeat(${riskyEndpoint.columndata.length}, minmax(120px, 1fr))`,
                    }}
                  >
                    {riskyEndpoint.columndata.map((col, colIndex) => {
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

          {/* Filters */}

        </div>

      </div>
    </div>
  )
}

export default LinuxDashboard