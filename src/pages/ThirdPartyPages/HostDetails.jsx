import React, { useMemo, useState, useEffect  } from 'react'
import { useParams, useNavigate } from "react-router-dom";

import { Search, RefreshCw, Download, CheckCircle2, ShieldAlert, AlertTriangle,  Package,Monitor,
  Building2
} from 'lucide-react';

import { getThirdPartyHostinfo, getThirdPartyHostappsdetails } from "../../api/projectApi";

const HostDetails = () => {
     const { ipAddress } = useParams();

     const navigate = useNavigate();

    //  const hostdetailsinfo =[
    //     {srNo: 1, hostname: "DESKTOP-F7V9A7C", ipAddress: "192.168.0.236", osdescription: "Windows 11 Pro"}
    //  ]
const [hostdetailsinfo, sethostdetailsinfo] = useState({});
const [loading, setLoading] = useState(true);
useEffect(() => {
  const fetchHost = async () => {
    try {
      setLoading(true);
      const res = await getThirdPartyHostinfo(ipAddress);
        console.log("API Response:" ,res)
      const data = res?.data?.data?.[0] || {};
      sethostdetailsinfo(data);
    } catch (error) {
      console.error("Error fetching host info:", error);
    } finally {
      setLoading(false);
    }
  };

  if (ipAddress) {
    fetchHost();
  }
}, [ipAddress]);

     const host = hostdetailsinfo || {};


const [hostdetailapps, setHostdetailapps] = useState([]);
useEffect(() => {
  if (!hostdetailsinfo?.hostname || !ipAddress) return;

  const fetchHostApps = async () => {
    try {
      const res = await getThirdPartyHostappsdetails(
        hostdetailsinfo.hostname,
        ipAddress
      );

      const data = res?.data?.data || [];
      setHostdetailapps(data);
    } catch (error) {
      console.error("Error fetching host apps:", error);
      setHostdetailapps([]);
    }
  };

  fetchHostApps();
}, [hostdetailsinfo?.hostname, ipAddress]);


const [currentPage, setCurrentPage] = useState(1);
const [rowsPerPage, setRowsPerPage] = useState(10);

const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const filteredData = useMemo(() => {
    return hostdetailapps.filter((item) => {
      const matchesSearch = item.appName .toLowerCase() .includes(search.toLowerCase()) ||
        item.publisher.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === "" ? true : item.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
}, [hostdetailapps, search, statusFilter]);

  const totalApps = hostdetailapps.length;
  const updatedApps = hostdetailapps.filter( (item) => item.status === "Up-to-date" ).length;
  const outdatedApps = hostdetailapps.filter( (item) => item.status === "Outdated").length;

  // pagination
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
const startIndex = (currentPage - 1) * rowsPerPage;
const endIndex = startIndex + rowsPerPage;
const paginatedData = filteredData.slice(startIndex, endIndex);

useEffect(() => {
  setCurrentPage(1);
}, [search, statusFilter, rowsPerPage]);

  return (
    <>
    <button onClick={() => navigate("/Thirdparty/host-view")}  className="flex items-center gap-2 px-3 py-2 text-xs rounded-lg border border-transparent bg-transparent text-white transition-all duration-300 hover:text-cyan-500 ">
  ← Back To Hosts
</button>
       <div className="bg-[#050B18] rounded-xl p-3 border border-white/10 min-h-screen text-white text-sm">
        
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-5">
        
        <div>
            <p className="text-xs text-gray-400 mb-1">Host</p>
          <h1 className="text-xl font-bold"> {host.hostname} </h1>

          <p className="text-xs text-gray-400 mt-1 ">{host.ipAddress || ipAddress} | {host.osDescription} </p>
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
          <select value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }
            className="bg-[#111827] border border-[#1e293b] focus:border-cyan-500 outline-none rounded-lg px-3 py-2.5 text-xs min-w-[200px]" >
            <option value="">All</option>
            <option value="Up-to-date"> Up-to-date </option>
            <option value="Outdated">  Outdated </option>
          </select>

          {/* Count */}
          <div className="text-[11px] text-gray-400 whitespace-nowrap">
            Showing {paginatedData.length} of{" "} {hostdetailapps.length}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-[#1e293b]">
        <table className="w-full min-w-[1000px] text-xs">
          <thead className="bg-[#1e293b] border-b border-[#1e293b]">
            <tr className="text-left text-gray-300">
              <th className="px-4 py-3 font-medium"> Application</th>
              <th className="px-4 py-3 font-medium"> Publisher </th>
              <th className="px-4 py-3 font-medium"> Installed Version </th>
              {/* <th className="px-4 py-3 font-medium"> Latest Version </th> */}
              <th className="px-4 py-3 font-medium"> Status </th> 
            </tr>
          </thead>

          <tbody>
            {filteredData.length > 0 ? (
              paginatedData.map((item) => (
                <tr key={item.srNo} className="border-b border-[#1e293b] hover:bg-[#111827] transition-all duration-300" >
                  {/* Application */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                        <Monitor size={14} className="text-cyan-400" />
                      </div>

                      <div>
                        <p className="font-medium text-white"> {item.appName} </p>
                        <p className="text-[10px] text-gray-400 mt-1"> Latest Ver: {item.latestVersion} </p>
                      </div>
                    </div>
                  </td>

                  {/* Publisher */}
                  <td className="px-4 py-3 text-gray-300">
                    <div className="flex items-center gap-2">
                      <Building2 size={13} className="text-gray-500" /> {item.publisher}
                    </div>
                  </td>

                  {/* Installed Version */}
                  <td className="px-4 py-3 text-cyan-400">{item.version} </td>
                  {/* Latest Version */}
                  {/* <td className="px-4 py-3 text-gray-300"> {item.latestVersion} </td> */}

                  {/* Status */}
                  <td className="px-4 py-3">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] border ${
                        item.status === "Up-to-date" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                          : "bg-red-500/10 text-red-400 border-red-500/20"
                      }`} > {item.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-8 text-gray-400 text-xs" > No Applications Found </td>
              </tr>
            )}
          </tbody>
        </table>
        {/* Pagination */}
<div className="flex flex-col md:flex-row items-center justify-between gap-3 mt-4">

  {/* Rows Per Page */}
  <select
    value={rowsPerPage}
    onChange={(e) => {
      setRowsPerPage(Number(e.target.value));
      setCurrentPage(1);
    }}
    className="bg-[#111827] border border-[#1e293b] focus:border-cyan-500 outline-none rounded-lg px-3 py-2 text-xs"
  >
    <option value={5}>5 Rows</option>
    <option value={10}>10 Rows</option>
    <option value={20}>20 Rows</option>
    <option value={50}>50 Rows</option>
  </select>

  {/* Page Info */}
  <div className="text-xs text-gray-400">
    Showing {startIndex + 1} -{" "}
    {Math.min(endIndex, filteredData.length)} of{" "}
    {filteredData.length}
  </div>

  {/* Pagination Buttons */}
  <div className="flex items-center gap-2">

    <button
      disabled={currentPage === 1}
      onClick={() => setCurrentPage((prev) => prev - 1)}
      className={`px-3 py-1.5 rounded-lg text-xs border transition-all duration-300 ${
        currentPage === 1
          ? "bg-[#111827] border-[#1e293b] text-gray-500 cursor-not-allowed"
          : "bg-[#111827] border-[#1e293b] hover:border-cyan-500 text-white"
      }`} > Previous
    </button>

    <div className="px-3 py-1.5 text-xs rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
      Page {currentPage} of {totalPages || 1}
    </div>

    <button
      disabled={currentPage === totalPages || totalPages === 0}
      onClick={() => setCurrentPage((prev) => prev + 1)}
      className={`px-3 py-1.5 rounded-lg text-xs border transition-all duration-300 ${
        currentPage === totalPages || totalPages === 0  ? "bg-[#111827] border-[#1e293b] text-gray-500 cursor-not-allowed"
          : "bg-[#111827] border-[#1e293b] hover:border-cyan-500 text-white"
      }`} > Next
    </button>

  </div>
</div>
      </div>
    </div>
    </>
  )
}

export default HostDetails
