import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from "react-router-dom"

const PatchDetails = () => {
  const { srNo } = useParams();
  console.log("item srno ", srNo);


  const patchdetailslist = [
    {
      srNo: 1, patchtitle: "Update for Windows Server 2008 for Itanium-based Systems (KB955020)", updateId: "FC08B450-6BDD-400E-9A1A-2F86E23CE462", removable: "No", restartBehavior: "AlwaysRequiresReboot",
      mayRequestUserInput: "Yes", microsoftSoftwareLicenseTerms: "No", products: "NA", updatesSupersedingThisUpdate: "No", classification: "Security Updates", restartbehavior: "CanRequestReboot",
      updatesSupersededByThisUpdate: "No", kbArticleNumber: "NA", msrcSeverity: "Unspecified", moreInformation: "NA",
      description: "This update resolves the \"Unchecked Buffer in Universal Plug and Play Can Lead to System Compromise\" security vulnerability in Windows XP. Download now to help prevent a malicious user from compromising your computer or using your computer to compromise another computer's functionality."
    }
  ];
  const data = patchdetailslist.find((item) => item.srNo === Number(srNo));
  console.log("data srno ", data);

  if (!data) { return <div className="text-white p-4">No Data Found</div>; }

  const status = data?.stats || {
    installed: 15,
    needed: 5,
    failed: 1,
    noStatus: 24,
    total: 45,
  };

  // MAIN CONTENT
  return (
    <div className="min-h-screen bg-[#0B1220] text-white p-4 space-y-4">

      {/* HEADER */}
      <div className="bg-[#0B1220] rounded-xl p-2 border border-white/10">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 p-4">

          <div>
            <h1 className="text-lg font-semibold">{data.patchtitle}</h1>
            <p className="text-xs text-gray-400 mt-1"> Update ID: {data.updateId} </p>
          </div>

          {/* <div className="flex gap-2">
            <button className="px-3 py-1 text-xs rounded-md border border-white/10 hover:bg-white/5"> Download </button>
            <button className="px-3 py-1 text-xs rounded-md bg-red-500/20 text-red-400 border border-red-500/30"> Decline </button>
            <button className="px-3 py-1 text-xs rounded-md bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"> Approve & Deploy </button>
          </div> */}
        </div>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">

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

      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">

        {/* LEFT SIDE */}
        <div className="lg:col-span-3 space-y-4">

          {/* TABS */}
          <div className="flex gap-4 text-xs border-b border-white/10 pb-2">
            <button className="text-emerald-400 border-b border-emerald-400 pb-1"> Overview </button>
            <button className="text-gray-400">Deployment</button>
            <button className="text-gray-400">Systems</button>
            <button className="text-gray-400">Logs</button>
            <button className="text-gray-400">History</button>
          </div>

          {/* DESCRIPTION */}
          <div className="bg-[#0B1220] rounded-xl p-4 border border-white/10">
            <h2 className="text-sm font-semibold mb-2">Description</h2>
            <p className="text-xs text-gray-400 leading-relaxed">
              {data.description}
            </p>
          </div>

          {/* DETAILS GRID */}
          <div className="bg-[#0B1220] rounded-2xl p-5 border border-white/10 shadow-lg">

            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-white">
                Additional Details
              </h2>
              <span className="text-[10px] px-2 py-1 rounded-full bg-white/10 text-gray-300">
                Patch Info
              </span>
            </div>

            {/* Info Stack */}
            <div className="space-y-3 text-sm">

              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-gray-400">Removable</span>
                <span className="text-white font-medium">{data.removable}</span>
              </div>

              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-gray-400">Restart Behavior</span>
                <span className="text-white font-medium">{data.restartBehavior}</span>
              </div>

              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-gray-400">May Request User Input</span>
                <span className="text-white font-medium">{data.mayRequestUserInput}</span>
              </div>

              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-gray-400">License Terms</span>
                <span className="text-white font-medium">
                  {data.microsoftSoftwareLicenseTerms}
                </span>
              </div>

              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-gray-400">Products</span>
                <span className="text-white font-medium">{data.products}</span>
              </div>

              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-gray-400">Superseding</span>
                <span className="text-white font-medium">
                  {data.updatesSupersedingThisUpdate}
                </span>
              </div>

              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-gray-400">Superseded By</span>
                <span className="text-white font-medium">
                  {data.updatesSupersededByThisUpdate}
                </span>
              </div>

              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-gray-400">KB Article</span>
                <span className="text-white font-medium">{data.kbArticleNumber}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-400">MSRC Severity</span>
                <span className="text-white font-medium">
                  {data.msrcSeverity}
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
              <h2 className="text-sm font-semibold">Patch Graph</h2>
              <span className="text-xs text-emerald-400">LIVE</span>
            </div>

            <div className="h-40 flex items-center justify-center text-gray-500 text-xs border border-white/10 rounded-lg">
              Graph Placeholder
            </div>

            <div className="grid grid-cols-2 gap-2 mt-3 text-xs">
              <div className="text-green-400">Installed: {status.installed}</div>
              <div className="text-yellow-400">Needed: {status.needed}</div>
              <div className="text-red-400">Failed: {status.failed}</div>
              <div className="text-gray-400">No Status: {status.noStatus}</div>
            </div>
          </div>

          {/* TIMELINE */}
          <div className="bg-[#0B1220] rounded-xl p-4 border border-white/10">
            <h2 className="text-sm font-semibold mb-3">Status Timeline</h2>

            <div className="space-y-3 text-xs text-gray-400">

              <div>
                <p className="text-white">Today, 04:22</p>
                <p>Synced from Microsoft Update</p>
              </div>

              <div>
                <p className="text-white">Yesterday, 23:51</p>
                <p>Indexed by ScanPlus</p>
              </div>

              <div>
                <p className="text-white">Yesterday, 12:10</p>
                <p>Approved by Admin</p>
              </div>

              <div>
                <p className="text-white">Yesterday, 10:10</p>
                <p>Pushed to staging group</p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default PatchDetails
