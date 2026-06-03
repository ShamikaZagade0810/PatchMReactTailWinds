import React, { useState } from 'react'
import { useParams, useLocation, useNavigate } from "react-router-dom";
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

const ComputerDetails = () => {
  const { computerName } = useParams();
  const navigate = useNavigate();
  console.log("item title ", computerName);
   const location = useLocation();

  const { groupId, groupName } = location.state || {};
  console.log("Group details : ", groupId, groupName)




  const computerInfoData = [
    {
      name: "desktop-f7v9a7c", ipAddress: "192.168.0.236", model: "Gigabyte Technology Co., Ltd.", make: "H310M M.2 2.0", id: "68a9e321-db7e-44d1-a15b-62ca6d1cc163",
      architecture: "AMD64", clientVersion: "1451.2510.27012.0", osDescription: "Windows 10 Pro", lastSyncTime: "1/9/2026 3:48:56 AM", lastReportedStatusTime: "1/9/2026 3:57:04 AM",
      lastSyncResult: "Succeeded", syncDownStream: "Windows", groupName: "Windows 10, All Computers, Testing",
      installedCount: 9, installedPendingRebootCount: 0, downloadedCount: 0, notInstalledCount: 0, failedCount: 0,
      notApplicableCount: 17415, unknownCount: 111, computerRole: "Workstation"
    }
  ];

  const computer = computerInfoData[0];

  //  const patchpieData = [
  //     { name: "Installed", value: 15 }, { name: "Needed", value: 5 }, { name: "Failed", value: 1 }, { name: "No Status", value: 0 }
  //   ];

  const updateDetailsData = [
    { name: "Installed", value: 7 },
    { name: "Installed_Pending_Reboot", value: 20 },
    { name: "Downloaded", value: 35 },
    { name: "Not_Installed", value: 12 },
    { name: "Failed", value: 0 },
    { name: "Not_Applicable", value: 16 },
    { name: "Unknown", value: 111 }
  ];

const statusColors = {
  Installed: "#15803d",                 // Dark Green
  Installed_Pending_Reboot: "#1d4ed8", // Dark Blue
  Downloaded: "#0891b2",               // Dark Cyan
  Not_Installed: "#a16207",            // Dark Amber
  Failed: "#b91c1c",                   // Dark Red
  Not_Applicable: "#4b5563",           // Dark Gray
  Unknown: "#7e22ce",                  // Dark Purple
};



  const policyData = [
    { policy: "Auto download and notify for install", days: "N/A", time: "NA" }
];

  // const pageSize = 5;
  // const [page, setPage] = useState(1);

  // const totalPages = Math.ceil(groupdetails.length / pageSize);

  // const paginatedData = groupdetails.slice(
  //   (page - 1) * pageSize,
  //   page * pageSize
  // );
  return (
    // <div>
    //         Computer Name: {decodeURIComponent(computerName)}
    //     </div>

    <>
      <button  onClick={() =>
    navigate(`/patchTree/computers/${groupId}?name=${encodeURIComponent(groupName)}`)
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

              <div className="space-y-3 text-sm">
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-gray-400">Computer Name</span>
                  <span className="text-white font-medium">{computer.name}</span>
                </div>

                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-gray-400">IP Address</span>
                  <span className="text-white font-medium">{computer.ipAddress}</span>
                </div>

                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-gray-400">Model</span>
                  <span className="text-white font-medium">{computer.model}</span>
                </div>

                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-gray-400">Manufacturer</span>
                  <span className="text-white font-medium">{computer.make}</span>
                </div>

                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-gray-400">Computer ID</span>
                  <span className="text-white font-medium break-all">
                    {computer.id}
                  </span>
                </div>

                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-gray-400">Architecture</span>
                  <span className="text-white font-medium">
                    {computer.architecture}
                  </span>
                </div>

                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-gray-400">Operating System</span>
                  <span className="text-white font-medium">
                    {computer.osDescription}
                  </span>
                </div>

                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-gray-400">Client Version</span>
                  <span className="text-white font-medium">
                    {computer.clientVersion}
                  </span>
                </div>

                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-gray-400">Group Name</span>
                  <span className="text-white font-medium">
                    {computer.groupName}
                  </span>
                </div>

                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-gray-400">Computer Role</span>
                  <span className="text-white font-medium">
                    {computer.computerRole}
                  </span>
                </div>

                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-gray-400">Last Sync Time</span>
                  <span className="text-white font-medium">
                    {computer.lastSyncTime}
                  </span>
                </div>

                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-gray-400">Last Reported Time</span>
                  <span className="text-white font-medium">
                    {computer.lastReportedStatusTime}
                  </span>
                </div>

                <div className="flex justify-between pb-2">
                  <span className="text-gray-400">Last Sync Result</span>
                  <span
                    className={`font-medium ${computer.lastSyncResult === "Succeeded"
                        ? "text-emerald-400"
                        : "text-red-400"
                      }`}
                  >
                    {computer.lastSyncResult}
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT SIDE */}
          <div className="lg:col-span-2 space-y-4">

            {/* PATCH GRAPH */}
          <div className="bg-[#0B1220] rounded-xl p-4 border border-white/10">
  <div className="flex justify-between items-center mb-3">
    <h2 className="text-sm font-semibold">Patch Status</h2>
    <span className="text-xs text-emerald-400">LIVE</span>
  </div>

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
          tick={{ fill: "#9CA3AF", fontSize: 12 }}
        />

        <Tooltip
          formatter={(value) => [value.toLocaleString(), "Count"]}
          contentStyle={{
            background: "#111827",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "8px",
          }}
        />

        <Bar
          dataKey="value"
          radius={[4, 4, 0, 0]}
        >
          {updateDetailsData.map((entry, index) => (
            <Cell
              key={index}
              fill={statusColors[entry.name]}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  </div>
</div>

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
        {policyData.map((item, index) => (
          <tr key={index} className="border-b border-white/5 hover:bg-white/5 transition" >
            <td className="py-3 px-3 text-white"> {item.policy} </td>
            <td className="py-3 px-3"> {item.days} </td>
            <td className="py-3 px-3"> {item.time} </td>
          </tr>
        ))}
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
