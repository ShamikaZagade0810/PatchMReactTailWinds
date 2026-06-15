import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, useLocation } from "react-router-dom"
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

import { getpatchDetailsData, getPatchgraphPieData, getPatchgraphClickData, getPatchgroupDetailsData } from "../../api/projectApi";


const PatchDetails = () => {
  const { title } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  console.log("item title ", title);

  const backUrl = location.state?.from;


  const [patchdetailslist, setPatchDetailsList] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedPatch, setSelectedPatch] = useState(null);
  const [open, setOpen] = useState(false);

  const [patchpieData, setPatchPieData] = useState([]);

  const [pieLoading, setPieLoading] = useState(true);
  const [pieonclickData, setPieOnclickData] = useState([]);

  const [groupdetails, setGroupDetails] = useState([]);
  const [page, setPage] = useState(1);
  const pageSize = 4;


  // const patchdetailslist = [  
  //   {
  //     patchtitle: "Remote Assistance Connection", updateId: "{4B62AA32-52F6-4C15-B739-1C8E696EB33E}", classification: "Critical Updates",
  //     IsApproved: false, IsDeclined: false, PublicationState: "Published", msrcSeverity: "Unspecified",
  //     KnowledgebaseArticle: "311889", SecurityBulletin: null, RevisionNumber: 100, UpdateType: "Software", UpdateSource: "MicrosoftUpdate",
  //     InstallationImpact: "Normal", InstallationRebootBehavior: "AlwaysRequiresReboot",
  //     description: "This update resolves the \"Cannot Establish a Remote Assistance Connection\" issue in Windows XP, and is discussed in Microsoft Knowledge Base (KB) Article 311889. When you try to establish a Remote Assistance session, you might receive an error message, and be unable to start a Remote Assistance session. Download now to ensure that you can establish a Remote Assistance session successfully. This item has been updated since it was released in October, 2001. If you have already installed this item, it is not necessary to reinstall it."
  //   }
  // ];

  useEffect(() => {
    fetchPatchDetails();
    fetchPatchPieData();
    fetchGroupDetails();
  }, [title]);

  useEffect(() => {
    setPage(1);
  }, [groupdetails]);

  const fetchPatchDetails = async () => {
    try {
      setLoading(true);
      console.log(title);

      const payload = {
        title: title
      };

      const response = await getpatchDetailsData(payload);
      console.log("Patch Details Response:", response.data);
      // If API already returns an array, use:
      setPatchDetailsList(response.data.data);

    } catch (error) {
      console.error("Error fetching patch details:", error);
    } finally {
      setLoading(false);
    }
  };
  const data = patchdetailslist?.[0];
  console.log("data patchtitle ", data);
  const hasData = !!data;

  const fetchPatchPieData = async () => {
    try {
      setPieLoading(true);
      const payload = {
        title: title
      };

      const response = await getPatchgraphPieData(payload);

      console.log("Pie Graph Response:", response.data);

      setPatchPieData(response.data.data || []);
    } catch (error) {
      console.error("Error fetching pie graph data:", error);
    }
    finally {
      setPieLoading(false);
    }
  };

  const fetchPatchClickData = async (status) => {
    try {
      const payload = {
        title: title,
        status: status
      };

      const response = await getPatchgraphClickData(payload);

      console.log("Pie Click Response:", response.data);

      setPieOnclickData(response.data.data || []);
    } catch (error) {
      console.error("Error fetching click data:", error);
      setPieOnclickData([]);
    }
  };

  const fetchGroupDetails = async () => {
    try {
      const payload = {
        title: title
      };

      const response = await getPatchgroupDetailsData(payload);

      console.log("Group Details Response:", response.data);

      setGroupDetails(response.data.data || []);
    } catch (error) {
      console.error("Error fetching group details:", error);
      setGroupDetails([]);
    }
  };
  // const groupdetails = [
  //   { ComputerGroup: "All Computers", ApprovalAction: "Install", AdministratorName: "WUS Server" },
  //   { ComputerGroup: "grouping", ApprovalAction: "Install", AdministratorName: "WIN-1J4TISP122I\\Administrator" },
  //   { ComputerGroup: "pm", ApprovalAction: "Install", AdministratorName: "WIN-1J4TISP122I\\Administrator" },
  //   { ComputerGroup: "Testing", ApprovalAction: "Install", AdministratorName: "WIN-1J4TISP122I\\Administrator" },
  //   { ComputerGroup: "Unassigned Computers", ApprovalAction: "Install", AdministratorName: "WIN-1J4TISP122I\\Administrator" }
  // ];




  // if (loading) {
  //   return <div className="text-white p-4">Loading...</div>;
  // }

  // if (!data) {
  //   return <div className="text-white p-4">No Data Found</div>;
  // }

  // const status = data?.stats || { installed: 15, needed: 5, failed: 1, noStatus: 24, total: 45, };
  // const patchpieData = [
  //   { name: "Installed", value: 15 }, { name: "Needed", value: 5 }, { name: "Failed", value: 1 }, { name: "No Status", value: 0 }
  // ];

  // const pieonclickData = [
  //   {
  //     computerName: "desktop-f7v9a7c", state: 4, status: "Needed",
  //     patchName: "2025-12 Cumulative Update for Windows 11, version 25H2 for x64-based Systems (KB5072033) (26200.7462)"
  //   }
  // ];


  const totalPages = Math.ceil((groupdetails?.length || 0) / pageSize);

  const paginatedData = groupdetails?.slice(
    (page - 1) * pageSize,
    page * pageSize
  );


  // MAIN CONTENT
  return (
    <>
      <button onClick={() => navigate(backUrl || -1)} className="flex items-center gap-2 px-3 py-2 mb-2 text-xs rounded-lg border border-transparent bg-transparent text-white transition-all duration-300 hover:text-cyan-500 hover:bg-gray-500/50 ">
        ← Back
      </button>
      <div className="min-h-screen bg-[#0B1220] text-white p-4 space-y-4">

        {/* HEADER */}
        <div className="bg-[#0B1220] rounded-xl p-2 border border-white/10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 p-4">

            {/* <div>
                  <h1 className="text-lg font-semibold">{data.patchtitle || title}</h1>
                  <p className="text-xs text-gray-400 mt-1"> Update ID: {data.updateId || "N/A"} </p>
                </div> */}
            <div>
              {loading ? (
                <>
                  <div className="h-5 w-64 bg-white/10 animate-pulse rounded mb-2"></div>
                  <div className="h-3 w-40 bg-white/10 animate-pulse rounded"></div>
                </>
              ) : (
                <>
                  <h1 className="text-lg font-semibold">{data.patchtitle || title}</h1>
                  <p className="text-xs text-gray-400 mt-1">
                    Update ID: {data.updateId || "N/A"}
                  </p>
                </>
              )}
            </div>

            {/* <div className="flex gap-2">
            <button className="px-3 py-1 text-xs rounded-md border border-white/10 hover:bg-white/5"> Download </button>
            <button className="px-3 py-1 text-xs rounded-md bg-red-500/20 text-red-400 border border-red-500/30"> Decline </button>
            <button className="px-3 py-1 text-xs rounded-md bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"> Approve & Deploy </button>
          </div> */}
          </div>
        </div>

        {/* STATS CARDS */}
        {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-3">

          <div className="bg-[#0B1220] rounded-xl p-3 border border-white/10">
            <p className="text-xs text-gray-400">Installed</p>
            <p className="text-xl font-semibold text-green-400">{status.installed}</p>
          </div>

          <div className="bg-[#0B1220] rounded-xl p-3 border border-white/10">
            <p className="text-xs text-gray-400">Needed</p>
            <p className="text-xl font-semibold text-yellow-400">{status.needed}</p>
          </div>

          <div className="bg-[#0B1220] rounded-xl p-3 border border-white/10">
            <p className="text-xs text-gray-400">Failed</p>
            <p className="text-xl font-semibold text-red-400">{status.failed}</p>
          </div>

          <div className="bg-[#0B1220] rounded-xl p-3 border border-white/10">
            <p className="text-xs text-gray-400">No Status</p>
            <p className="text-xl font-semibold text-gray-300">{status.noStatus}</p>
          </div>

        </div> */}

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">

          {/* LEFT SIDE */}
          <div className="lg:col-span-3 space-y-4">
               {!hasData ? (
                  <div className="bg-[#0B1220] rounded-xl p-6 border border-white/10 text-center text-gray-400">
                    No Data Found
                  </div>
                ) : (
                  <>
            {/* TABS */}
            {/* <div className="flex gap-4 text-xs border-b border-white/10 pb-2">
              <button className="text-emerald-400 border-b border-emerald-400 pb-1"> Overview </button>
              <button className="text-gray-400">Deployment</button>
              <button className="text-gray-400">Systems</button>
              <button className="text-gray-400">Logs</button>
              <button className="text-gray-400">History</button>
            </div> */}

            {/* DESCRIPTION */}
            <div className="bg-[#0B1220] rounded-xl p-4 border border-white/10">
              <h2 className="text-sm font-semibold mb-2">Description</h2>
              <div className="border-b border-white/15 mb-2"></div>
              {/* <p className="text-xs text-gray-400 leading-relaxed">{data.description || "N/A"}</p> */}
              {loading ? (
                <div className="space-y-2">
                  <div className="h-3 bg-white/10 rounded animate-pulse"></div>
                  <div className="h-3 bg-white/10 rounded animate-pulse w-5/6"></div>
                  <div className="h-3 bg-white/10 rounded animate-pulse w-4/6"></div>
                </div>
              ) : (
                <p className="text-xs text-gray-400 leading-relaxed">
                  {data.description || "N/A"}
                </p>
              )}
            </div>

            {/* DETAILS GRID */}
            <div className="bg-[#0B1220] rounded-2xl p-5 border border-white/10 shadow-lg">

              {/* Header */}
              <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold text-white"> Additional Details    </h2>
                {/* <span className="text-[10px] px-2 py-1 rounded-full bg-white/10 text-gray-300"> Patch Info      </span> */}
              </div>

              <div className="border-b border-white/15 my-4"></div>

              {/* Info Stack */}
              <div className="space-y-3 text-sm">
                {loading ? (
                  Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="flex justify-between pb-2">
                      <div className="h-3 w-24 bg-white/10 rounded animate-pulse"></div>
                      <div className="h-3 w-32 bg-white/10 rounded animate-pulse"></div>
                    </div>
                  ))
                ) : (
                  <>

                    <div className="flex justify-between border-b border-white/5 pb-2">
                      <span className="text-gray-400">Update Title</span>
                      <span className="text-white font-medium">{data.patchtitle || "N/A"}</span>
                    </div>

                    <div className="flex justify-between border-b border-white/5 pb-2">
                      <span className="text-gray-400">Update Id</span>
                      <span className="text-white font-medium">{data.updateId || "N/A"}</span>
                    </div>

                    <div className="flex justify-between border-b border-white/5 pb-2">
                      <span className="text-gray-400">Classification</span>
                      <span className="text-white font-medium">{data.classification || "N/A"}</span>
                    </div>

                    <div className="flex justify-between border-b border-white/5 pb-2">
                      <span className="text-gray-400">KB Article</span>
                      <span className="text-white font-medium">{data.KnowledgebaseArticle || "N/A"}</span>
                    </div>

                    <div className="flex justify-between border-b border-white/5 pb-2">
                      <span className="text-gray-400">Revision</span>
                      <span className="text-white font-medium">{data.RevisionNumber || "N/A"}</span>
                    </div>

                    <div className="flex justify-between border-b border-white/5 pb-2">
                      <span className="text-gray-400">Update Source</span>
                      <span className="text-white font-medium">{data.UpdateSource || "N/A"}</span>
                    </div>

                    <div className="flex justify-between border-b border-white/5 pb-2">
                      <span className="text-gray-400">Update Type</span>
                      <span className="text-white font-medium">{data.UpdateType || "N/A"}</span>
                    </div>

                    <div className="flex justify-between border-b border-white/5 pb-2">
                      <span className="text-gray-400">Restart Behavior</span>
                      <span className="text-white font-medium">{data.InstallationRebootBehavior || "N/A"}</span>
                    </div>
                  </>
                )}
              </div>
            </div>
              </>
  )}

          </div>

          {/* RIGHT SIDE */}
          <div className="lg:col-span-2 space-y-4">

            {/* PATCH GRAPH */}
            <div className="bg-[#0B1220] rounded-xl p-4 border border-white/10">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-sm font-semibold">Patch Graph</h2>
                <span className="text-xs text-emerald-400">LIVE</span>
              </div>

              <div className="w-full border border-white/10 rounded-lg p-2 flex">

                {/* PIE CHART */}
                <div className="w-1/2">
                  {/* {patchpieData && patchpieData.length > 0 ? ( */}
                  {pieLoading ? (
                    <div className="h-[180px] w-full flex items-center justify-center">
                      <div className="h-6 w-6 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                    </div>
                  ) : patchpieData && patchpieData.length > 0 ? (
                    <ResponsiveContainer width="100%" height={180}>
                      <PieChart>
                        <Pie
                          data={patchpieData}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          outerRadius={60}
                          // label
                          stroke="none"
                          onClick={(data) => {
                            setSelectedPatch(data);
                            setOpen(true);
                            fetchPatchClickData(data.name);
                          }}
                        >
                          {patchpieData.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={
                                index === 0
                                  ? "#16a34a"
                                  : index === 1
                                    ? "#ca8a04"
                                    : index === 2
                                      ? "#dc2626"
                                      : "#6b7280"
                              }
                            />
                          ))}
                        </Pie>

                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-[180px] flex items-center justify-center text-gray-400 text-sm">
                      No Data Available
                    </div>
                  )}
                </div>

                {/* LEGEND */}
                <div className="w-1/2 flex flex-col justify-center gap-2 text-xs text-gray-300 pl-2">
                  {/* {patchpieData.map((item, index) => ( */}
                  {pieLoading ? (
                    <div className="space-y-2">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="flex justify-between">
                          <div className="h-3 w-24 bg-white/10 rounded animate-pulse"></div>
                          <div className="h-3 w-8 bg-white/10 rounded animate-pulse"></div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    patchpieData.map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span
                            className="w-2.5 h-2.5 rounded-full"
                            style={{
                              backgroundColor:
                                index === 0
                                  ? "#16a34a"
                                  : index === 1
                                    ? "#ca8a04"
                                    : index === 2
                                      ? "#dc2626"
                                      : "#6b7280",
                            }}
                          />
                          <span>{item.name}</span>
                        </div>

                        <span className="text-white font-medium">{item.value}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* <div className="grid grid-cols-2 gap-2 mt-3 text-xs">
                <div className="text-green-400">Installed: {status.installed}</div>
                <div className="text-yellow-400">Needed: {status.needed}</div>
                <div className="text-red-400">Failed: {status.failed}</div>
                <div className="text-gray-400">No Status: {status.noStatus}</div>
              </div> */}
            </div>

            {open && selectedPatch && (
              <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
                <div className="bg-[#0B1220] p-6 rounded-xl border border-white/10 w-[600px] max-h-[80vh] overflow-auto">

                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-white text-lg font-semibold">
                      Patch Details
                    </h2>

                    <button
                      className="px-3 py-1 bg-red-600 text-white rounded"
                      onClick={() => setOpen(false)}
                    >
                      Close
                    </button>
                  </div>

                  <div className="mb-4">
                    <span className="text-gray-300">Selected Status: </span>
                    <span className="text-white font-medium">
                      {selectedPatch.name || "NA"}
                    </span>
                  </div>

                  <div className="overflow-x-auto rounded-lg border border-white/10">
                    <table className="w-full text-sm text-left">
                      <thead className="bg-[#1E293B] text-gray-300">
                        <tr>
                          <th className="px-4 py-3">Computer Name</th>
                          <th className="px-4 py-3">Status</th>
                        </tr>
                      </thead>

                      <tbody>
                        {pieonclickData.length > 0 ? (
                          pieonclickData.map((item, index) => (
                            <tr
                              key={index}
                              className="border-t border-white/10 hover:bg-white/5"
                            >
                              <td className="px-4 py-3 text-white">
                                {item.hostName}
                              </td>

                              <td className="px-4 py-3 text-yellow-400">
                                {item.status}
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td
                              colSpan="2"
                              className="px-4 py-3 text-center text-gray-400"
                            >
                              No records found
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
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
                      <th className="py-2 px-3">Computer Group</th>
                      <th className="py-2 px-3">Approval Action</th>
                      <th className="py-2 px-3">Administrator</th>
                    </tr>
                  </thead>

                  <tbody>
                    {paginatedData?.map((item, index) => (
                      <tr key={index} className="border-b border-white/5 hover:bg-white/5 transition" >
                        <td className="py-2 px-3 text-white"> {item.ComputerGroup} </td>
                        <td className="py-2 px-3"> {item.ApprovalAction} </td>
                        <td className="py-2 px-3"> {item.AdministratorName} </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="flex justify-end items-center gap-2 mt-3 text-xs">
                  <button
                    onClick={() => setPage((p) => Math.max(p - 1, 1))}
                    disabled={page === 1}
                    className="px-2 py-1 border border-white/10 rounded disabled:opacity-40"
                  >
                    Prev
                  </button>

                  <span className="text-gray-400">
                    {page} / {totalPages || 1}
                  </span>

                  <button
                    onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                    disabled={page === totalPages}
                    className="px-2 py-1 border border-white/10 rounded disabled:opacity-40"
                  >
                    Next
                  </button>
                </div>

              </div>
            </div>

          </div>
        </div>

      </div>
    </>
  )
}

export default PatchDetails
