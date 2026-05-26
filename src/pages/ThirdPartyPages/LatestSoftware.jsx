import React, { useMemo, useState, useEffect } from "react";
import { 
    Search, ChevronDown, ChevronUp, Monitor, ShieldCheck, Package, Clock3,
  Download, Filter, Laptop, ChevronLeft , ChevronRight
} from "lucide-react";


import { getThirdPartylatestSoftware } from "../../api/projectApi";

const LatestSoftware = () => {
  // formating datetime
const formatDateTime = (dateString) => {
  if (!dateString) return "-";

  const date = new Date(dateString);

  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const yyyy = date.getFullYear();

  const HH = String(date.getHours()).padStart(2, "0");
  const min = String(date.getMinutes()).padStart(2, "0");

  return `${dd}-${mm}-${yyyy} ${HH}:${min}`;
};

const [latestSoftwaredata, setLatestSoftwaredata] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
useEffect(() => {
  const fetchData = async () => {
    try {
      setLoading(true);

      // small artificial delay (for UI visibility only)
      const response = await getThirdPartylatestSoftware();

      setLatestSoftwaredata(response.data.data || []);
    } catch (err) {
      setError("Failed to load software data");
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 300); // 👈 ensures spinner is visible
    }
  };

  fetchData();
}, []);

  const [search, setSearch] = useState("");
  const [expandedRow, setExpandedRow] = useState(null);

    // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(8);


  // Group by app name
  const groupedApps = useMemo(() => {
    const grouped = {};

    latestSoftwaredata.forEach((item) => {
      if (!grouped[item.appName]) {
        grouped[item.appName] = {
          appName: item.appName,
          publisher: item.publisher,
          latestVersion: item.latestVersion,
          lastUpdated: item.lastUpdated,
          devices: [],
        };
      }

    //   grouped[item.appName].devices.push(item);
     grouped[item.appName].devices.push({
        ...item,
        ip: item.ipAddress || "192.168.0.10",
        // downloadStatus:
        //   item.patchStatus === "OUTDATED"
        //     ? "Pending"
        //     : "Downloaded",
      });
    });

    return Object.values(grouped);
}, [latestSoftwaredata]);

  // const filteredApps = groupedApps.filter((item) =>
  //   item.appName.toLowerCase().includes(search.toLowerCase())
  // );
  const filteredApps = groupedApps.filter((item) => {
  const query = search.toLowerCase();

  return (
    item.appName?.toLowerCase().includes(query) ||
    item.publisher?.toLowerCase().includes(query) ||
    item.devices?.some(
      (device) =>
        device.hostname?.toLowerCase().includes(query) ||
        device.ipAddress?.toLowerCase().includes(query) ||
        device.ip?.toLowerCase().includes(query)
    )
  );
});

   // Pagination Logic
  const totalPages = Math.ceil(
    filteredApps.length / rowsPerPage
  );

  const paginatedApps = filteredApps.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );


  const outdatedCount = latestSoftwaredata.filter(  (item) => item.patchstatus === "OUTDATED" ).length;
  const upToDateCount = latestSoftwaredata.filter( (item) => item.patchstatus === "UPTODATE" ).length;
  const vendorCount = useMemo(() => {
  const uniquePublishers = new Set( latestSoftwaredata.map((item) => item.publisher).filter(Boolean) );
  return uniquePublishers.size;
}, [latestSoftwaredata]);

if (loading) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050B18] text-white">
      <div className="flex flex-col items-center gap-4">
        
        {/* Spinner */}
        <div className="w-10 h-10 border-4 border-slate-700 border-t-cyan-400 rounded-full animate-spin"></div>

        {/* Text */}
        <p className="text-sm text-slate-400">
          Loading latest software...
        </p>
      </div>
    </div>
  );
}

if (error) {
  return ( <div className="text-red-400 p-5"> {error} </div>
  );
}
  return (
    //  <div className="min-h-screen bg-[#050B18] text-white p-5">
    <div className="min-h-screen text-white p-5">
      {/* Top Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-5">
        {/* Card */}
        <div className="bg-gradient-to-br from-[#050B18] to-[#0F172A] border border-white/10 rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold"> {groupedApps.length} </h2>
              <p className="text-xs text-slate-400 mt-1"> Software Tracked </p>
            </div>

            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center">
              <Package size={22} className="text-cyan-400" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#050B18] to-[#0F172A] border border-white/10 rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold"> {upToDateCount}</h2>
              <p className="text-xs text-slate-400 mt-1">  Up To Date </p>
            </div>

            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
              <ShieldCheck size={22} className="text-emerald-400" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#050B18] to-[#0F172A] border border-white/10 rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold"> {outdatedCount} </h2>
              <p className="text-xs text-slate-400 mt-1"> Outdated </p>
            </div>

            <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center">
              <Clock3 size={22} className="text-amber-400" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#050B18] to-[#0F172A] border border-white/10 rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold">{vendorCount}</h2>
              <p className="text-xs text-slate-400 mt-1"> Publisher   </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center">
              <Monitor size={22} className="text-violet-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-gradient-to-b from-[#050B18] to-[#0F172A] border border-white/10 rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="p-5">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold tracking-wide"> Latest Software Catalog </h2>
              <p className="text-xs text-slate-400 mt-1"> Monitor latest versions across all endpoints </p>
            </div>
            {/* <button className="h-10 px-4 rounded-xl border border-white/10 bg-[#111827] hover:bg-[#182338] transition flex items-center gap-2 text-sm w-fit">
              <Filter size={16} />              Filter
            </button> */}
          </div>

          {/* Divider */}
          <div className="border-t border-white/10 my-5"></div>

          {/* Full Width Search */}
          {/* Search + Count Row */}
<div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 w-full">

  {/* Search */}
  <div className="relative w-full">
    <Search  size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />

    <input type="text" placeholder="Search software catalog..." value={search}
      onChange={(e) => {
        setSearch(e.target.value);
        setCurrentPage(1);
      }}
      className="w-full bg-[#0B1220] border border-white/10 rounded-lg pl-12 pr-4 py-2 text-sm outline-none focus:border-cyan-500 text-slate-200" />
  </div>

  {/* Count */}
  <div className="text-[11px] text-gray-400 whitespace-nowrap lg:ml-4">
    Showing{" "} <span className="text-slate-200 font-medium"> {paginatedApps.length} </span>{" "} of{" "}
    <span className="text-slate-200 font-medium"> {filteredApps.length} </span>
  </div>

</div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/[0.03] border-y border-white/5">
              <tr className="text-left text-[11px] uppercase tracking-wider text-slate-500">
                <th className="px-6 py-4 font-medium"> App Name </th>
                <th className="px-6 py-4 font-medium"> Publisher </th>
                <th className="px-6 py-4 font-medium"> Latest Version </th>
                <th className="px-6 py-4 font-medium"> Last Updated </th>
                <th className="px-6 py-4 font-medium text-center"> Installed In </th>
                <th className="px-6 py-4 font-medium text-right"> Action </th>
              </tr>
            </thead>

            <tbody>
              {paginatedApps.map((app, index) => (
                <React.Fragment key={index}>
                  {/* Main Row */}
                  <tr className="border-t border-white/5 hover:bg-white/[0.02] transition">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/10 flex items-center justify-center">
                          <Package size={18} className="text-cyan-400" />
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-slate-100"> {app.appName} </h3>
                          <p className="text-xs text-slate-500 mt-1"> Software Package </p>
                        </div>
                      </div>
                    </td>

                    {/* Light Table Text */}
                    <td className="px-6 py-4 text-sm text-slate-200"> {app.publisher} </td>

                    <td className="px-6 py-4"> <span className="text-cyan-300 text-sm font-semibold"> {app.latestVersion} </span> </td>
                    <td className="px-6 py-4 text-sm text-slate-300"> {formatDateTime(app.lastUpdated)} </td>

                    {/* Installed In */}
                    <td className="px-6 py-4">
                      <div className="flex justify-center">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs bg-violet-500/10 text-violet-300 border border-violet-500/10">
                          <Laptop size={13} /> {app.devices.length} Devices
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-right">
                      <button onClick={() => setExpandedRow( expandedRow === app.appName ? null : app.appName  ) }
                        className="w-9 h-9 rounded-lg border border-white/10 hover:border-cyan-500/40 hover:bg-cyan-500/10 transition inline-flex items-center justify-center" >
                        {expandedRow === app.appName ? (
                          <ChevronUp size={18} />
                        ) : (
                          <ChevronDown size={18} />
                        )}
                      </button>
                    </td>
                  </tr>

                  {/* Expanded Row */}
                  {expandedRow === app.appName && (
                    <tr className="bg-[#08101F] border-t border-white/5">
                      <td colSpan={6} className="px-3 py-3">
                        <div className="space-y-3">
                          {app.devices.map((device) => (
                            <div key={device.id} className="border border-white/10 rounded-2xl p-4 hover:border-cyan-500/40 transition" >
                              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                                {/* Installed In */}
                                <div className="flex items-center gap-4">                             
                                  <div>
                                    <p className="text-[11px] uppercase tracking-wider text-slate-500 mb-1"> Installed In </p>
                                    <h3 className="text-sm font-semibold text-slate-100"> {device.hostname} |  <span>{device.ipAddress}</span> </h3>
                                    {/* <p className="text-xs text-slate-400 mt-1">
                                      {device.ip}
                                    </p> */}
                                  </div>
                                </div>

                                {/* Installed Version */}
                                <div>
                                  <p className="text-[11px] uppercase tracking-wider text-slate-500"> Installed Version </p>
                                  <h4 className="text-sm font-semibold mt-1 text-cyan-300"> {device.version || "N/A"} </h4>
                                </div>

                                {/* Latest Version */}
                                <div>
                                  <p className="text-[11px] uppercase tracking-wider text-slate-500"> Latest Version </p>
                                  <h4 className="text-sm font-semibold mt-1 text-slate-100"> {device.latestVersion} </h4>
                                </div>
                                {/* Patch Status */}
                                <div>
                                  <p className="text-[11px] uppercase tracking-wider text-slate-500 mb-2"> Patch Status </p>

                                  <div className={`px-3 py-1 rounded-full text-xs border w-fit ${
                                      device.patchstatus === "NEWER_THAN_LATEST"
                                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                                        : device.patchstatus === "UNKNOWN"
                                        ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                                        : "bg-red-500/10 text-red-400 border-red-500/20"
                                    }`} >
                                    {device.patchstatus}
                                  </div>
                                </div>

                                {/* Download Status */}
                                {/* <div>
                                  <p className="text-[11px] uppercase tracking-wider text-slate-500 mb-2"> Download Status </p>

                                  <div className={`px-3 py-1 rounded-full text-xs border w-fit ${
                                      device.downloadStatus === "Downloaded"
                                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                                        : device.downloadStatus === "Pending"
                                        ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                                        : "bg-red-500/10 text-red-400 border-red-500/20"
                                    }`} >
                                    {device.downloadStatus}
                                  </div>
                                </div> */}

                                {/* Action */}
                                {/* <button className="h-10 px-4 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/20 text-cyan-300 transition flex items-center gap-2 text-sm">
                                  <Download size={16} /> Deploy
                                </button> */}
                              </div>
                            </div>
                          ))}
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="border-t border-white/10 px-5 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Rows Per Page */}
          <div className="flex items-center gap-3">
            <span className="text-sm text-slate-400">
              Rows Per Page
            </span>

            <select value={rowsPerPage}
              onChange={(e) => {
                setRowsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="bg-[#111827] border border-white/10 rounded-lg px-3 py-2 text-sm outline-none" >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
            </select>
          </div>

          {/* Page Info */}
          <div className="text-sm text-slate-400">
            Showing{" "} <span className="text-slate-200 font-medium"> {(currentPage - 1) * rowsPerPage + 1} </span>{" "} to{" "}
            <span className="text-slate-200 font-medium"> {Math.min( currentPage * rowsPerPage, filteredApps.length )} </span>{" "} of{" "}
            <span className="text-slate-200 font-medium"> {filteredApps.length} </span>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() =>
                setCurrentPage((prev) => prev - 1)
              }
              className="w-10 h-10 rounded-xl border border-white/10 hover:bg-white/5 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition"
            >
              <ChevronLeft size={18} />
            </button>

            <div className="px-4 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-sm font-medium text-cyan-300">
              {/* {currentPage} */}  Page {currentPage} of {totalPages || 1}
            </div>

            <button
              disabled={currentPage === totalPages}
              onClick={() =>
                setCurrentPage((prev) => prev + 1)
              } className="w-10 h-10 rounded-xl border border-white/10 hover:bg-white/5 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition"   >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LatestSoftware
