import React, { useMemo, useState } from 'react'
import { useParams, useNavigate } from "react-router-dom";

import { Search, RefreshCw, Download, CheckCircle2, ShieldAlert, AlertTriangle,  Package,Monitor,
  Building2,
} from 'lucide-react';

const HostDetails = () => {
     const { ipAddress } = useParams();

     const hostdetailsinfo =[
        {srNo: 1, hostname: "DESKTOP-F7V9A7C", ipAddress: "192.168.0.236", osdescription: "Windows 11 Pro"}
     ]

     const host = hostdetailsinfo?.[0] || {};

     const hostdetailapps = [
  { srNo: 1, application: "@BIOS", installedVersion: "4.24.0130.1", latestVersion: "NA", status: "Up-to-date", publisher: "GIGABYTE" },
  { srNo: 2, application: "Apache NetBeans IDE 14", installedVersion: "14", latestVersion: "NA", status: "Up-to-date", publisher: "Apache NetBeans" },
  { srNo: 3, application: "Apache Tomcat 9.0 Tomcat9", installedVersion: "9.0.63", latestVersion: "NA", status: "Up-to-date", publisher: "The Apache Software Foundation" },
  { srNo: 4, application: "APP Center", installedVersion: "3.24.1105.1", latestVersion: "NA", status: "Up-to-date", publisher: "Gigabyte" },
  { srNo: 5, application: "Chrome Remote Desktop Host", installedVersion: "143.0.7499.7", latestVersion: "127.0.6533.21", status: "Up-to-date", publisher: "Google LLC" },
  { srNo: 6, application: "EasyTune", installedVersion: "1.24.0418", latestVersion: "NA", status: "Up-to-date", publisher: "GIGABYTE" },
  { srNo: 7, application: "EasyTuneEngineService", installedVersion: "1.24.0418", latestVersion: "NA", status: "Up-to-date", publisher: "GIGABYTE" },
  { srNo: 8, application: "Git", installedVersion: "2.49.0", latestVersion: "2.53.0.0.0", status: "Outdated", publisher: "The Git Development Community" },
  { srNo: 9, application: "Google Chrome", installedVersion: "143.0.7499.193", latestVersion: "145.0.7632.76", status: "Outdated", publisher: "Google LLC" },
  { srNo: 10, application: "GService", installedVersion: "1.19.0624.1", latestVersion: "NA", status: "Up-to-date", publisher: "GIGABYTE" },
  { srNo: 11, application: "HeidiSQL", installedVersion: "12.2", latestVersion: "12.15.0.7171", status: "Outdated", publisher: "Ansgar Becker" },
  { srNo: 12, application: "Internet Security Essentials", installedVersion: "1.6.472587.185", latestVersion: "NA", status: "Up-to-date", publisher: "Comodo" },
  { srNo: 13, application: "IP Messenger for Win", installedVersion: "5.7.6", latestVersion: "NA", status: "Up-to-date", publisher: "H.Shirouzu & FastCopy Lab, LLC." },
  { srNo: 14, application: "Java", installedVersion: "17.0.12.0", latestVersion: "NA", status: "Up-to-date", publisher: "Oracle Corporation" },
  { srNo: 15, application: "Microsoft Edge", installedVersion: "144.0.3719.82", latestVersion: "145.0.3800.58", status: "Outdated", publisher: "Microsoft Corporation" },
  { srNo: 16, application: "Microsoft Office 32-bit Components 2013", installedVersion: "15.0.4569.1506", latestVersion: "NA", status: "Up-to-date", publisher: "Microsoft Corporation" },
  { srNo: 17, application: "Microsoft Office Proofing", installedVersion: "15.0.4569.1506", latestVersion: "NA", status: "Up-to-date", publisher: "Microsoft Corporation" },
  { srNo: 18, application: "Microsoft Office Proofing Tools 2013 - English", installedVersion: "15.0.4569.1506", latestVersion: "NA", status: "Up-to-date", publisher: "Microsoft Corporation" },
  { srNo: 19, application: "Microsoft Office Proofing Tools 2013 - Español", installedVersion: "15.0.4569.1506", latestVersion: "NA", status: "Up-to-date", publisher: "Microsoft Corporation" },
  { srNo: 20, application: "Microsoft Office Standard 2013", installedVersion: "15.0.4569.1506", latestVersion: "NA", status: "Up-to-date", publisher: "Microsoft Corporation" }
];

const [currentPage, setCurrentPage] = useState(1);
const [rowsPerPage, setRowsPerPage] = useState(10);

const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const filteredData = useMemo(() => {
    return hostdetailapps.filter((item) => {
      const matchesSearch = item.application .toLowerCase() .includes(search.toLowerCase()) ||
        item.publisher.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === "" ? true : item.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  const totalApps = hostdetailapps.length;

  const updatedApps = hostdetailapps.filter( (item) => item.status === "Up-to-date" ).length;

  const outdatedApps = hostdetailapps.filter( (item) => item.status === "Outdated").length;

  return (
       <div className="bg-[#050B18] rounded-xl p-3 border border-white/10 min-h-screen text-white text-sm">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-5">
        <div>
            <p className="text-xs text-gray-400 mb-1">Host</p>
          <h1 className="text-xl font-bold"> {host.hostname} </h1>

          <p className="text-xs text-gray-400 mt-1 ">{host.ipAddress || ipAddress} | {host.osdescription} </p>
        </div>

        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-3 py-2 text-xs rounded-lg bg-[#111827] border border-[#1e293b] hover:border-cyan-500 transition-all duration-300">
            <RefreshCw size={14} /> Refresh
          </button>

          <button className="flex items-center gap-2 px-3 py-2 text-xs rounded-lg bg-emerald-500 text-black font-semibold hover:bg-emerald-400 transition-all duration-300">
            <Download size={14} /> Export
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
        {/* Total */}
        <div className="bg-[#0B1220] rounded-xl p-4 border border-[#1e293b] hover:border-cyan-400 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] text-cyan-500 uppercase tracking-wide"> Total Applications </p>
              <h2 className="text-2xl font-bold mt-1"> {totalApps} </h2>
            </div>

            <div className="w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center">
              <Package size={18} className="text-cyan-400" />
            </div>
          </div>
        </div>

        {/* Updated */}
        <div className="bg-[#0B1220] rounded-xl p-4 border border-[#1e293b] hover:border-emerald-400 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] text-emerald-500 uppercase tracking-wide"> Up To Date </p>
              <h2 className="text-2xl font-bold mt-1"> {updatedApps} </h2>
            </div>

            <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center">
              <CheckCircle2 size={18} className="text-emerald-400" />
            </div>
          </div>
        </div>

        {/* Outdated */}
        <div className="bg-[#0B1220] rounded-xl p-4 border border-[#1e293b] hover:border-red-400 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] text-red-500 uppercase tracking-wide"> Outdated Applications </p>
              <h2 className="text-2xl font-bold mt-1"> {outdatedApps} </h2>
            </div>

            <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center">
              <AlertTriangle size={18} className="text-red-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-[#0B1220] rounded-xl p-3 border border-[#1e293b] mb-4">
        <div className="flex flex-col lg:flex-row gap-3 items-center">
          {/* Search */}
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

            <input type="text" placeholder="Search application or publisher..." value={search}
              onChange={(e) => setSearch(e.target.value)} className="w-full bg-[#111827] border border-[#1e293b] focus:border-cyan-500 outline-none rounded-lg pl-9 pr-4 py-2.5 text-xs"/>
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }
            className="bg-[#111827] border border-[#1e293b] focus:border-cyan-500 outline-none rounded-lg px-3 py-2.5 text-xs min-w-[200px]"
          >
            <option value="">All Status</option>

            <option value="Up-to-date">
              Up-to-date
            </option>

            <option value="Outdated">
              Outdated
            </option>
          </select>

          {/* Count */}
          <div className="text-[11px] text-gray-400 whitespace-nowrap">
            Showing {filteredData.length} of{" "}
            {hostdetailapps.length}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-[#1e293b]">
        <table className="w-full min-w-[1000px] text-xs">
          <thead className="bg-[#1e293b] border-b border-[#1e293b]">
            <tr className="text-left text-gray-300">
              <th className="px-4 py-3 font-medium">
                Application
              </th>

              <th className="px-4 py-3 font-medium">
                Publisher
              </th>

              <th className="px-4 py-3 font-medium">
                Installed Version
              </th>

              <th className="px-4 py-3 font-medium">
                Latest Version
              </th>

              <th className="px-4 py-3 font-medium">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <tr
                  key={item.srNo}
                  className="border-b border-[#1e293b] hover:bg-[#111827] transition-all duration-300"
                >
                  {/* Application */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                        <Monitor
                          size={14}
                          className="text-cyan-400"
                        />
                      </div>

                      <div>
                        <p className="font-medium text-white">
                          {item.application}
                        </p>

                        <p className="text-[10px] text-gray-500 mt-1">
                          App ID : {item.srNo}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Publisher */}
                  <td className="px-4 py-3 text-gray-300">
                    <div className="flex items-center gap-2">
                      <Building2
                        size={13}
                        className="text-gray-500"
                      />

                      {item.publisher}
                    </div>
                  </td>

                  {/* Installed Version */}
                  <td className="px-4 py-3 text-cyan-400">
                    {item.installedVersion}
                  </td>

                  {/* Latest Version */}
                  <td className="px-4 py-3 text-gray-300">
                    {item.latestVersion}
                  </td>

                  {/* Status */}
                  <td className="px-4 py-3">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] border ${
                        item.status === "Up-to-date"
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                          : "bg-red-500/10 text-red-400 border-red-500/20"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-8 text-gray-400 text-xs"
                >
                  No Applications Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default HostDetails
