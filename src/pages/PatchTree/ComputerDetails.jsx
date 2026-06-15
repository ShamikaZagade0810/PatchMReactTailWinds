import React, { useState, useEffect } from 'react'
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { X } from "lucide-react";
// import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
} from "recharts";

import { getgrpComputerDetails, getComputerPiechart, getComputerPieonclick , getgrpComputerpolicy } from "../../api/projectApi";

const ComputerDetails = () => {
  const { computerName } = useParams();
  const navigate = useNavigate();
  console.log("item title ", computerName);
  const location = useLocation();

  const { groupId, groupName, serverName } = location.state || {};
  console.log("Group details : ", groupId, groupName, serverName)


  const [computerInfoData, setComputerInfoData] = useState(null);
  const [compPiechart, setCompPiechart] = useState([]);
  const [policyData, setPolicyData] = useState([]);

  const [openModal, setOpenModal] = useState(false);
  const [selectedBar, setSelectedBar] = useState(null);

  const [pieonclickData, setPieonclickData] = useState([]);

  const [loading, setLoading] = useState(true);
  const [barLoading, setBarLoading] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [error, setError] = useState(null);

  // const computerInfoData = [
  //   {
  //     name: "desktop-f7v9a7c", ipAddress: "192.168.0.236", model: "Gigabyte Technology Co., Ltd.", make: "H310M M.2 2.0", id: "68a9e321-db7e-44d1-a15b-62ca6d1cc163",
  //     architecture: "AMD64", clientVersion: "1451.2510.27012.0", osDescription: "Windows 10 Pro", lastSyncTime: "1/9/2026 3:48:56 AM", lastReportedStatusTime: "1/9/2026 3:57:04 AM",
  //     lastSyncResult: "Succeeded", syncDownStream: "Windows", groupName: "Windows 10, All Computers, Testing",
  //     installedCount: 9, installedPendingRebootCount: 0, downloadedCount: 0, notInstalledCount: 0, failedCount: 0,
  //     notApplicableCount: 17415, unknownCount: 111, computerRole: "Workstation"
  //   }
  // ];
  useEffect(() => {
    const fetchComputerDetails = async () => {
      try {
        setLoading(true);

        console.log("computerName+: ", computerName)
        const response = await getgrpComputerDetails(computerName);
        console.log(computerName, " Computer details: ", response)

        // adjust based on your API response shape
        setComputerInfoData(response.data.data);

      } catch (err) {
        console.error(err);
        setError("Failed to load computer details");
      } finally {
        setLoading(false);
      }
    };

    if (computerName) {
      fetchComputerDetails();
    }
  }, [computerName]);

  const computer = computerInfoData;
  console.log("computerInfoData : ", computerInfoData)

  //  const patchpieData = [
  //     { name: "Installed", value: 15 }, { name: "Needed", value: 5 }, { name: "Failed", value: 1 }, { name: "No Status", value: 0 }
  //   ];

  // const updateDetailsData = [
  //   { name: "Installed", value: 7 },
  //   { name: "Installed_Pending_Reboot", value: 20 },
  //   { name: "Downloaded", value: 35 },
  //   { name: "Not_Installed", value: 12 },
  //   { name: "Failed", value: 0 },
  //   { name: "Not_Applicable", value: 16 },
  //   { name: "Unknown", value: 111 }
  // ];

  // const compPiechart  =[[
  //       {
  //           "computerName": "sumeetnalawade18052003",
  //           "installedCount": 20,
  //           "installedPendingRebootCount": 10,
  //           "downloadedCount": 0,
  //           "notInstalledCount": 6,
  //           "failedCount": 0,
  //           "notApplicableCount": 46,
  //           "unknownCount": 14,
  //       }
  //   ]]
  useEffect(() => {
    const fetchPieChartData = async () => {
      try {
         setBarLoading(true);
        const response = await getComputerPiechart(computerName);

        console.log("Pie Chart API:", response.data.data);

        setCompPiechart(response.data.data || []);
      } catch (err) {
        console.error("Pie Chart Error:", err);
      } finally{
         setBarLoading(false);
      }
    };

    if (computerName) {
      fetchPieChartData();
    }
  }, [computerName]);

  const raw = compPiechart?.[0];

  const safeLog = (v) => (v === 0 ? 1 : v);

  const updateDetailsData = raw
    ? [
      { name: "Installed", value: safeLog(raw.installedCount) },
      { name: "Pending_Reboot", value: safeLog(raw.installedPendingRebootCount) },
      { name: "Downloaded", value: safeLog(raw.downloadedCount) },
      { name: "Needed", value: safeLog(raw.notInstalledCount) },
      { name: "Failed", value: safeLog(raw.failedCount) },
      { name: "Not_Applicable", value: safeLog(raw.notApplicableCount) },
      // { name: "Unknown", value: safeLog(raw.unknownCount) },
    ]
    : [];

  console.log("updateDetailsData", updateDetailsData);

  const statusColors = {
    Installed: "#15803d",                 // Dark Green
    Installed_Pending_Reboot: "#1d4ed8", // Dark Blue
    Downloaded: "#0891b2",               // Dark Cyan
    Not_Installed: "#a16207",            // Dark Amber
    Failed: "#b91c1c",                   // Dark Red
    Not_Applicable: "#0f766e",           // Dark Gray
    // Unknown: "#7e22ce",                  // Dark Purple
  };

  //   const policyData = [
  //     { policy: "Auto download and notify for install", days: "N/A", time: "NA" }
  // ];
  useEffect(() => {
    const fetchPolicyData = async () => {
       setPolicyData([]);
      try {
        const response = await getgrpComputerpolicy(computerName);

        console.log("Policy API:", response.data);

        setPolicyData(response.data.data || []);
      } catch (err) {
        console.error("Policy API Error:", err);
        setPolicyData([]);
      }
    };

    if (computerName) {
      fetchPolicyData();
    }
  }, [computerName]);

  // const pageSize = 5;
  // const [page, setPage] = useState(1);

  // const totalPages = Math.ceil(groupdetails.length / pageSize);

  // const paginatedData = groupdetails.slice(
  //   (page - 1) * pageSize,
  //   page * pageSize
  // );
  
//   const pieonclickData = [
//   { ComputerName: "shamika-zagade", PatchName: "2025-10 Cumulative Update for .NET Framework 3.5 and 4.8.1 for Windows 11, version 23H2 for x64 (KB5066133)", KnowledgebaseArticle: "5066133", State: 4, Status: "Needed" },
//   { ComputerName: "shamika-zagade", PatchName: "2025-10 Cumulative Update for .NET Framework 3.5 and 4.8.1 for Windows 11, version 24H2 for x64 (KB5066131)", KnowledgebaseArticle: "5066131", State: 4, Status: "Needed" },
//   { ComputerName: "shamika-zagade", PatchName: "2025-10 Cumulative Update for .NET Framework 3.5 and 4.8.1 for Windows 11, version 25H2 for x64 (KB5066128)", KnowledgebaseArticle: "5066128", State: 4, Status: "Needed" },
//   { ComputerName: "shamika-zagade", PatchName: "2025-10 Cumulative Update for Windows 11 Version 22H2 for x64-based Systems (KB5066793)", KnowledgebaseArticle: "5066793", State: 4, Status: "Needed" },
//   { ComputerName: "shamika-zagade", PatchName: "2025-11 Cumulative Update for Windows 11, version 25H2 for x64-based Systems (KB5068861) (26200.7171)", KnowledgebaseArticle: "5068861", State: 4, Status: "Needed" }
// ];

const [currentPage, setCurrentPage] = useState(1);
const pageSize = 5;
useEffect(() => {
  if (openModal) {
    setCurrentPage(1);
  }
}, [openModal]);

const fetchBarClickData = async (status) => {
  try {
     setModalLoading(true);
    console.log("SelectedBar:", status);

    const response = await getComputerPieonclick(computerName, status);

    console.log("Pieonclick API:", response.data);

    setPieonclickData(response.data.data || []);
  } catch (error) {
    console.error("Pieonclick API Error:", error);
    setPieonclickData([]);
  }
  finally {
    setModalLoading(false);
  }
};

const totalItems = pieonclickData.length;
const totalPages = Math.ceil(totalItems / pageSize);

const startIndex = (currentPage - 1) * pageSize;
const endIndex = startIndex + pageSize;

const paginatedData = pieonclickData.slice(startIndex, endIndex);
  return (
    // <div>
    //         Computer Name: {decodeURIComponent(computerName)}
    //     </div>

    <>
      <button onClick={() =>
        navigate(`/patchTree/computers/${encodeURIComponent(groupName)}`,
          {
            state: {
              groupId: groupId,
              groupName: groupName,
              serverName: serverName
            },
          })
      } className="flex items-center gap-2 px-3 py-2 mb-2 text-xs rounded-lg border border-transparent bg-transparent text-white transition-all duration-300 hover:text-cyan-500 hover:bg-gray-500/50 ">
        ← Back
      </button>
      <div className="min-h-screen bg-[#0B1220] text-white p-4 space-y-4">

        {/* HEADER */}
        <div className="bg-[#0B1220] rounded-xl p-2 border border-white/10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 p-4">

            <div>

              <h1 className="text-lg font-semibold">  {computerName}</h1>
              {/* <p className="text-xs text-gray-400 mt-1"> Update ID: {data.updateId} </p> */}
            </div>

            {/* <div className="flex gap-2">
                <button className="px-3 py-1 text-xs rounded-md border border-white/10 hover:bg-white/5"> Download </button>
                <button className="px-3 py-1 text-xs rounded-md bg-red-500/20 text-red-400 border border-red-500/30"> Decline </button>
                <button className="px-3 py-1 text-xs rounded-md bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"> Approve & Deploy </button>
              </div> */}
          </div>
        </div>

        {/* STATS CARDS */}


        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">

          {/* LEFT SIDE */}
          <div className="lg:col-span-3 space-y-4">

            {/* TABS */}
            {/* <div className="flex gap-4 text-xs border-b border-white/10 pb-2">
                  <button className="text-emerald-400 border-b border-emerald-400 pb-1"> Overview </button>
                  <button className="text-gray-400">Deployment</button>
                  <button className="text-gray-400">Systems</button>
                  <button className="text-gray-400">Logs</button>
                  <button className="text-gray-400">History</button>
                </div> */}

            {/* DESCRIPTION */}
            {/* <div className="bg-[#0B1220] rounded-xl p-4 border border-white/10">
                  <h2 className="text-sm font-semibold mb-2">Description</h2>
                  <div className="border-b border-white/15 mb-2"></div>
                  <p className="text-xs text-gray-400 leading-relaxed">{data.description}</p>
                </div> */}

            {/* DETAILS GRID */}
            <div className="bg-[#0B1220] rounded-2xl p-5 border border-white/10 shadow-lg">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold text-white">
                  Additional Details
                </h2>
              </div>

              <div className="border-b border-white/15 my-4"></div>

              {/* LOADER OVERLAY */}
              {loading ? (
                <div className="absolute inset-0 flex items-center justify-center bg-[#0B1220]/70 backdrop-blur-sm rounded-2xl">
                  <div className="w-8 h-8 border-4 border-gray-600 border-t-emerald-400 rounded-full animate-spin"></div>
                </div>
              ) : (
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-gray-400">Computer Name</span>
                    <span className="text-white font-medium">{computer.name || "NA"}</span>
                  </div>

                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-gray-400">IP Address</span>
                    <span className="text-white font-medium">{computer.ipAddress || "NA"}</span>
                  </div>

                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-gray-400">Model</span>
                    <span className="text-white font-medium">{computer.model || "NA"}</span>
                  </div>

                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-gray-400">Manufacturer</span>
                    <span className="text-white font-medium">{computer.make || "NA"}</span>
                  </div>

                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-gray-400">Computer ID</span>
                    <span className="text-white font-medium break-all"> {computer.id || "NA"} </span>
                  </div>

                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-gray-400">Architecture</span>
                    <span className="text-white font-medium">  {computer.architecture || "NA"} </span>
                  </div>

                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-gray-400">Operating System</span>
                    <span className="text-white font-medium"> {computer.osDescription || "NA"} </span>
                  </div>

                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-gray-400">Client Version</span>
                    <span className="text-white font-medium"> {computer.clientVersion || "NA"}  </span>
                  </div>

                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-gray-400">Group Name</span>
                    <span className="text-white font-medium"> {computer.groupName || "NA"} </span>
                  </div>

                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-gray-400">Computer Role</span>
                    <span className="text-white font-medium"> {computer.computerRole || "NA"} </span>
                  </div>

                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-gray-400">Last Sync Time</span>
                    <span className="text-white font-medium"> {computer.lastSyncTime || "NA"} </span>
                  </div>

                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-gray-400">Last Reported Time</span>
                    <span className="text-white font-medium"> {computer.lastReportedStatusTime || "NA"} </span>
                  </div>

                  <div className="flex justify-between pb-2">
                    <span className="text-gray-400">Last Sync Result</span>
                    <span className={`font-medium ${computer.lastSyncResult === "Succeeded"
                      ? "text-emerald-400"
                      : "text-red-400"
                      }`}
                    >
                      {computer.lastSyncResult || "NA"}
                    </span>
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* RIGHT SIDE */}
          <div className="lg:col-span-2 space-y-4">

            {/* PATCH GRAPH */}
            <div className="bg-[#0B1220] rounded-xl p-4 border border-white/10  relative">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-sm font-semibold">Patch Status</h2>
                <span className="text-xs text-emerald-400">LIVE</span>
              </div>
             
 {barLoading ? (
    <div className="absolute inset-0 flex items-center justify-center bg-[#0B1220]/70 backdrop-blur-sm rounded-xl z-10">
      <div className="w-10 h-10 border-4 border-gray-600 border-t-emerald-400 rounded-full animate-spin"></div>
    </div>
  ) : (

              <div className="w-full border border-white/10 rounded-lg p-2">
              
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={updateDetailsData}
                    margin={{ top: 20, right: 20, left: -10, bottom: 5 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="rgba(255,255,255,0.08)"
                    />

                    <XAxis
                      dataKey="name"
                      angle={-25}
                      textAnchor="end"
                      interval={0}
                      height={80}
                      tick={{ fill: "#D1D5DB", fontSize: 11 }}
                      tickFormatter={(value) => value.replaceAll("_", " ")}
                    />

                    <YAxis
                      scale="log"
                      domain={[1, "dataMax"]}
                      allowDataOverflow={true}
                      tickFormatter={(value) => (value === 1 ? 0 : value)}
                      tick={{ fill: "#9CA3AF", fontSize: 12 }}
                    />

                    <Tooltip
                      formatter={(value) => (value === 1 ? 0 : value)}
                      // formatter={(value) => [value.toLocaleString(), "Count"]}
                      contentStyle={{
                        background: "#111827",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: "8px",
                      }}
                    />

                    <Bar dataKey="value" radius={[4, 4, 0, 0]} >
                      {updateDetailsData.map((entry, index) => (
                        <Cell
                          key={index}
                          fill={statusColors[entry.name]}
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            setSelectedBar(entry);
                            setOpenModal(true);
                             fetchBarClickData(entry.name);
                          }}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
                )}
            </div>
           {openModal && selectedBar && (
  <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
    
    <div className="bg-[#0B1220] p-5 rounded-xl border border-white/10 w-[900px] max-h-[500vh] overflow-auto relative">

      {/* HEADER ROW */}
      <div className="flex items-center justify-center relative mb-4">

        {/* Center Title */}
        <h2 className="text-white text-lg font-semibold text-center">
          {selectedBar.name} - Patch Details
        </h2>

        {/* X ICON (TOP RIGHT) */}
        <button
          onClick={() => setOpenModal(false)}
          className="absolute right-0 text-gray-300 hover:text-red-400"
        >
          <X size={20} />
        </button>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto border border-white/10 rounded-lg">
        <table className="w-full text-xs text-left text-gray-300">
          <thead className="bg-[#1b2a3a] text-gray-200">
            <tr>
              <th className="px-3 py-2">Patch Name</th>
              <th className="px-3 py-2">KB Article</th>
              <th className="px-3 py-2">Status</th>
            </tr>
          </thead>

          <tbody>
            {modalLoading ? (
    <tr>
      <td colSpan="3" className="py-10 text-center">
        <div className="flex flex-col items-center justify-center gap-2 text-gray-400">
          <div className="w-6 h-6 border-2 border-gray-500 border-t-emerald-400 rounded-full animate-spin"></div>
          Loading data...
        </div>
      </td>
    </tr>
  ) : paginatedData.length > 0 ? (
  paginatedData.map((item, index) => (
                <tr key={index} className="border-t border-white/10 hover:bg-white/5" >
                  
                  <td className="px-3 py-2">
                    {item.patchName || "NA"}
                  </td>
                  <td className="px-3 py-2">
                    {item.knowledgebaseArticle || "NA"}
                  </td>
                  <td className="px-3 py-2">
                    {item.status || "NA"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-400"> No Data Found </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="flex items-center justify-between mt-4 text-xs text-gray-400">

  {/* Showing info */}
  <div>
    Showing{" "}  
    <span className="text-white">
      {Math.min( totalItems)}
    </span>{" "}
    of{" "}
    <span className="text-white">{totalItems}</span>
  </div>

  {/* Buttons */}
  <div className="flex gap-2">
    <button
      onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
      disabled={currentPage === 1}
      className="px-3 py-1 border border-white/10 rounded disabled:opacity-40"
    >
      Prev
    </button>

    <span className="px-2 text-gray-300"> {currentPage} / {totalPages || 1} </span>

    <button onClick={() =>
        setCurrentPage((p) => Math.min(p + 1, totalPages))
      }
      disabled={currentPage === totalPages || totalPages === 0}
      className="px-3 py-1 border border-white/10 rounded disabled:opacity-40"
    >
      Next
    </button>
  </div>

</div>
      </div>

      {/* BOTTOM ACTION */}
      <div className="flex justify-end mt-4">
        <button onClick={() => setOpenModal(false)} className="px-4 py-1 text-xs bg-red-600/50 text-red-200 rounded hover:bg-red-500/30" >
          Close
        </button>
      </div>

    </div>
  </div>
)}

            {/* TIMELINE */}
            <div className="bg-[#0B1220] rounded-xl p-4 border border-white/10">
              <h2 className="text-sm font-semibold mb-3">Group Details</h2>

              <div className="overflow-y-auto flex-1 rounded-lg border border-gray-700 hide-scrollbar ">
                <table className="w-full text-xs text-left text-gray-400">
                  <thead className="bg-[#2a3a52] text-gray-300 border-b border-white/10">
                    <tr>
                      <th className="py-3 px-3">Policy</th>
                      <th className="py-3 px-3">Days</th>
                      <th className="py-3 px-3">Time</th>
                    </tr>
                  </thead>

                  <tbody>
                    {policyData.length > 0 ? (
                      policyData.map((item, index) => (
                        <tr key={index} className="border-b border-white/5 hover:bg-white/5 transition" >
                          <td className="py-3 px-3 text-white"> {item.policy || "NA"} </td>
                          <td className="py-3 px-3"> {item.days || "NA"} </td>
                          <td className="py-3 px-3"> {item.time || "NA"} </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="3" className="text-center py-4 text-gray-400">
                          No Policy Data Found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
                {/* Pagination Controls */}
                {/* <div className="flex justify-end items-center gap-2 mt-3 text-xs">
                  <button onClick={() => setPage((p) => Math.max(p - 1, 1))} disabled={page === 1}
                    className="px-2 py-1 border border-white/10 rounded disabled:opacity-40" >
                    Prev
                  </button>

                  <span className="text-gray-400"> {page} / {totalPages} </span>

                  <button onClick={() => setPage((p) => Math.min(p + 1, totalPages))} disabled={page === totalPages}
                    className="px-2 py-1 border border-white/10 rounded disabled:opacity-40" >
                    Next
                  </button>
                </div> */}
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default ComputerDetails
