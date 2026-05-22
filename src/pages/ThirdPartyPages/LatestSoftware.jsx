import React, { useMemo, useState } from "react";
import { 
    Search, ChevronDown, ChevronUp, Monitor, ShieldCheck, Package, Clock3,
  Download, Filter, Laptop, ChevronLeft , ChevronRight
} from "lucide-react";


const LatestSoftware = () => {
    const latestSoftwaredata = [
  { id: 1, hostname: "Shridhar-Varadkar", appName: "AnyDesk", version: "ad 7.0.15", latestVersion: "NA", patchStatus: "UNKNOWN", publisher: "philandro Software GmbH", lastUpdated: "2026-02-21 10:15:36.000000", downloadPath: null, updateAvailable: false },
  { id: 2, hostname: "Shridhar-Varadkar", appName: "Apache NetBeans IDE 14", version: "14", latestVersion: "NA", patchStatus: "UNKNOWN", publisher: "Apache NetBeans", lastUpdated: "2026-02-21 10:15:36.000000", downloadPath: null, updateAvailable: false },
  { id: 3, hostname: "Shridhar-Varadkar", appName: "Apache Tomcat 9.0 Tomcat9", version: "9.0.78", latestVersion: "NA", patchStatus: "UNKNOWN", publisher: "The Apache Software Foundation", lastUpdated: "2026-02-21 10:15:36.000000", downloadPath: null, updateAvailable: false },
  { id: 4, hostname: "Shridhar-Varadkar", appName: "Apache Tomcat 9.0 Tomcat91", version: "9.0.82", latestVersion: "NA", patchStatus: "UNKNOWN", publisher: "The Apache Software Foundation", lastUpdated: "2026-02-21 10:15:36.000000", downloadPath: null, updateAvailable: false },
  { id: 5, hostname: "Shridhar-Varadkar", appName: "Burp Suite Community Edition", version: "2024.5.4", latestVersion: "NA", patchStatus: "UNKNOWN", publisher: "PortSwigger Web Security", lastUpdated: "2026-02-21 10:15:36.000000", downloadPath: null, updateAvailable: false },
  { id: 10, hostname: "Shridhar-Varadkar", appName: "Git", version: "2.52.0", latestVersion: "2.53.0.0.0", patchStatus: "OUTDATED", publisher: "The Git Development Community", lastUpdated: "2026-02-21 10:15:36.000000", downloadPath: "C:\\Patchmanagment\\PatchRepo\\git-2.53.0.0.0\\git_2.53.0.0.0.exe", updateAvailable: true },
  { id: 12, hostname: "Shridhar-Varadkar", appName: "Google Chrome", version: "143.0.7499.193", latestVersion: "145.0.7632.76", patchStatus: "OUTDATED", publisher: "Google LLC", lastUpdated: "2026-02-21 10:15:36.000000", downloadPath: "C:\\Patchmanagment\\PatchRepo\\google_chrome-145.0.7632.76\\google_chrome_145.0.7632.76.msi", updateAvailable: true },
  { id: 13, hostname: "Shridhar-Varadkar", appName: "HeidiSQL", version: "12.13.0.7147", latestVersion: "12.15.0.7171", patchStatus: "OUTDATED", publisher: "Ansgar Becker", lastUpdated: "2026-02-21 10:15:36.000000", downloadPath: "C:\\Patchmanagment\\PatchRepo\\heidisql-12.15.0.7171\\heidisql_12.15.0.7171.exe", updateAvailable: true },

  { id: 99, hostname: "Sumit-Shedge", appName: "Adobe Reader XI", version: "11.0.04", latestVersion: "NA", patchStatus: "UNKNOWN", publisher: "Adobe Systems Incorporated", lastUpdated: "2026-02-21 10:15:37.000000", downloadPath: null, updateAvailable: false },
  { id: 105, hostname: "Sumit-Shedge", appName: "Avast Free Antivirus", version: "25.12.10659.3321", latestVersion: "NA", patchStatus: "UNKNOWN", publisher: "Gen Digital Inc.", lastUpdated: "2026-02-21 10:15:37.000000", downloadPath: null, updateAvailable: false },
  { id: 121, hostname: "Sumit-Shedge", appName: "Java", version: "17.0.12.0", latestVersion: "NA", patchStatus: "UNKNOWN", publisher: "Oracle Corporation", lastUpdated: "2026-02-21 10:15:37.000000", downloadPath: null, updateAvailable: false },
  { id: 151, hostname: "Sumit-Shedge", appName: "Microsoft Edge", version: "144.0.3719.82", latestVersion: "145.0.3800.58", patchStatus: "OUTDATED", publisher: "Microsoft Corporation", lastUpdated: "2026-02-21 10:15:37.000000", downloadPath: "C:\\Patchmanagment\\PatchRepo\\microsoft_edge-145.0.3800.58\\microsoft_edge_145.0.3800.58.msi", updateAvailable: true },
  { id: 159, hostname: "Sumit-Shedge", appName: "Microsoft OneDrive", version: "25.224.1116.0003", latestVersion: "26.012.0119.0002", patchStatus: "OUTDATED", publisher: "Microsoft Corporation", lastUpdated: "2026-02-21 10:15:37.000000", downloadPath: "C:\\Patchmanagment\\PatchRepo\\microsoft_onedrive-26.012.0119.0002\\microsoft_onedrive_26.012.0119.0002.exe", updateAvailable: true },

  { id: 658, hostname: "Neeraj-Sharma", appName: "Adobe Refresh Manager", version: "1.8.0", latestVersion: "NA", patchStatus: "UNKNOWN", publisher: "Adobe Systems Incorporated", lastUpdated: "2026-02-21 10:15:37.000000", downloadPath: null, updateAvailable: false },
  { id: 665, hostname: "Neeraj-Sharma", appName: "Git", version: "2.52.0", latestVersion: "2.53.0.0.0", patchStatus: "OUTDATED", publisher: "The Git Development Community", lastUpdated: "2026-02-21 10:15:37.000000", downloadPath: "C:\\Patchmanagment\\PatchRepo\\git-2.53.0.0.0\\git_2.53.0.0.0.exe", updateAvailable: true },
  { id: 666, hostname: "Neeraj-Sharma", appName: "Google Chrome", version: "143.0.7499.194", latestVersion: "145.0.7632.76", patchStatus: "OUTDATED", publisher: "Google LLC", lastUpdated: "2026-02-21 10:15:37.000000", downloadPath: "C:\\Patchmanagment\\PatchRepo\\google_chrome-145.0.7632.76\\google_chrome_145.0.7632.76.msi", updateAvailable: true },
  { id: 667, hostname: "Neeraj-Sharma", appName: "HeidiSQL", version: "12.1", latestVersion: "12.15.0.7171", patchStatus: "OUTDATED", publisher: "Ansgar Becker", lastUpdated: "2026-02-21 10:15:37.000000", downloadPath: "C:\\Patchmanagment\\PatchRepo\\heidisql-12.15.0.7171\\heidisql_12.15.0.7171.exe", updateAvailable: true },

  { id: 740, hostname: "DESKTOP-F7V9A7C", appName: "APP Center", version: "3.24.1105.1", latestVersion: "NA", patchStatus: "UNKNOWN", publisher: "Gigabyte", lastUpdated: "2026-02-21 10:15:37.000000", downloadPath: null, updateAvailable: false },
  { id: 747, hostname: "DESKTOP-F7V9A7C", appName: "Git", version: "2.49.0", latestVersion: "2.53.0.0.0", patchStatus: "OUTDATED", publisher: "The Git Development Community", lastUpdated: "2026-02-21 10:15:37.000000", downloadPath: "C:\\Patchmanagment\\PatchRepo\\git-2.53.0.0.0\\git_2.53.0.0.0.exe", updateAvailable: true },
  { id: 748, hostname: "DESKTOP-F7V9A7C", appName: "Google Chrome", version: "143.0.7499.193", latestVersion: "145.0.7632.76", patchStatus: "OUTDATED", publisher: "Google LLC", lastUpdated: "2026-02-21 10:15:38.000000", downloadPath: "C:\\Patchmanagment\\PatchRepo\\google_chrome-145.0.7632.76\\google_chrome_145.0.7632.76.msi", updateAvailable: true },
  { id: 749, hostname: "DESKTOP-F7V9A7C", appName: "HeidiSQL", version: "12.2", latestVersion: "12.15.0.7171", patchStatus: "OUTDATED", publisher: "Ansgar Becker", lastUpdated: "2026-02-21 10:15:38.000000", downloadPath: "C:\\Patchmanagment\\PatchRepo\\heidisql-12.15.0.7171\\heidisql_12.15.0.7171.exe", updateAvailable: true },

  { id: 786, hostname: "Shamika-Zagade", appName: "Entity Framework 6.5.0 Tools for Visual Studio 2022", version: "6.5.0.0", latestVersion: "NA", patchStatus: "UNKNOWN", publisher: "Microsoft Corporation", lastUpdated: "2026-02-21 10:15:38.000000", downloadPath: null, updateAvailable: false },
  { id: 787, hostname: "Shamika-Zagade", appName: "Git", version: "2.52.0", latestVersion: "2.53.0.0.0", patchStatus: "OUTDATED", publisher: "The Git Development Community", lastUpdated: "2026-02-21 10:15:38.000000", downloadPath: "C:\\Patchmanagment\\PatchRepo\\git-2.53.0.0.0\\git_2.53.0.0.0.exe", updateAvailable: true },
  { id: 788, hostname: "Shamika-Zagade", appName: "Google Chrome", version: "145.0.7632.76", latestVersion: "145.0.7632.76", patchStatus: "UPTODATE", publisher: "Google LLC", lastUpdated: "2026-02-21 10:15:38.000000", downloadPath: null, updateAvailable: false },
  { id: 789, hostname: "Shamika-Zagade", appName: "HeidiSQL", version: "12.13.0.7147", latestVersion: "12.15.0.7171", patchStatus: "OUTDATED", publisher: "Ansgar Becker", lastUpdated: "2026-02-21 10:15:38.000000", downloadPath: "C:\\Patchmanagment\\PatchRepo\\heidisql-12.15.0.7171\\heidisql_12.15.0.7171.exe", updateAvailable: true },
  { id: 829, hostname: "Shamika-Zagade", appName: "Microsoft Edge", version: "145.0.3800.65", latestVersion: "145.0.3800.58", patchStatus: "NEWER_THAN_LATEST", publisher: "Microsoft Corporation", lastUpdated: "2026-02-21 10:15:38.000000", downloadPath: null, updateAvailable: false },
  { id: 836, hostname: "Shamika-Zagade", appName: "Microsoft OneDrive", version: "26.017.0126.0002", latestVersion: "26.012.0119.0002", patchStatus: "NEWER_THAN_LATEST", publisher: "Microsoft Corporation", lastUpdated: "2026-02-21 10:15:38.000000", downloadPath: null, updateAvailable: false },
  { id: 866, hostname: "Shamika-Zagade", appName: "Visual Studio Community 2022", version: "17.14.17", latestVersion: "17.14.26", patchStatus: "OUTDATED", publisher: "Microsoft Corporation", lastUpdated: "2026-02-21 10:15:38.000000", downloadPath: "C:\\Patchmanagment\\PatchRepo\\visual_studio_community_2022-17.14.26\\visual_studio_community_2022_17.14.26.exe", updateAvailable: true }
];


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
        ip: item.ip || "192.168.0.10",
        downloadStatus:
          item.patchStatus === "OUTDATED"
            ? "Pending"
            : "Downloaded",
      });
    });

    return Object.values(grouped);
  }, []);

  const filteredApps = groupedApps.filter((item) =>
    item.appName.toLowerCase().includes(search.toLowerCase())
  );

   // Pagination Logic
  const totalPages = Math.ceil(
    filteredApps.length / rowsPerPage
  );

  const paginatedApps = filteredApps.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );


  const outdatedCount = latestSoftwaredata.filter(
    (item) => item.patchStatus === "OUTDATED"
  ).length;

  const upToDateCount = latestSoftwaredata.filter(
    (item) => item.patchStatus === "UPTODATE"
  ).length;

  return (
    //  <div className="min-h-screen bg-[#050B18] text-white p-5">
    <div className="min-h-screen text-white p-5">
      {/* Top Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-5">
        {/* Card */}
        <div className="bg-gradient-to-br from-[#050B18] to-[#0F172A] border border-white/10 rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold">
                {groupedApps.length}
              </h2>

              <p className="text-xs text-slate-400 mt-1">
                Software Tracked
              </p>
            </div>

            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center">
              <Package
                size={22}
                className="text-cyan-400"
              />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#050B18] to-[#0F172A] border border-white/10 rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold">
                {upToDateCount}
              </h2>

              <p className="text-xs text-slate-400 mt-1">
                Up To Date
              </p>
            </div>

            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
              <ShieldCheck
                size={22}
                className="text-emerald-400"
              />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#050B18] to-[#0F172A] border border-white/10 rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold">
                {outdatedCount}
              </h2>

              <p className="text-xs text-slate-400 mt-1">
                Outdated
              </p>
            </div>

            <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center">
              <Clock3
                size={22}
                className="text-amber-400"
              />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#050B18] to-[#0F172A] border border-white/10 rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold">8</h2>

              <p className="text-xs text-slate-400 mt-1">
                Vendors
              </p>
            </div>

            <div className="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center">
              <Monitor
                size={22}
                className="text-violet-400"
              />
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
              <h2 className="text-sm font-semibold tracking-wide"> Latest Software Catalog </h2>
              <p className="text-xs text-slate-400 mt-1"> Monitor latest versions across all endpoints </p>
            </div>
            {/* <button className="h-10 px-4 rounded-xl border border-white/10 bg-[#111827] hover:bg-[#182338] transition flex items-center gap-2 text-sm w-fit">
              <Filter size={16} />              Filter
            </button> */}
          </div>

          {/* Divider */}
          <div className="border-t border-white/10 my-5"></div>

          {/* Full Width Search */}
          <div className="relative w-full">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />

            <input type="text" placeholder="Search software catalog..." value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-[#0B1220] border border-white/10 rounded-xl pl-12 pr-4 py-3 text-sm outline-none focus:border-cyan-500 text-slate-200" />
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
                    <td className="px-6 py-4 text-sm text-slate-300"> {app.lastUpdated} </td>

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
                                    <h3 className="text-sm font-semibold text-slate-100"> {device.hostname} |  <span>{device.ip}</span> </h3>
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

                                {/* Download Status */}
                                <div>
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
                                </div>

                                {/* Action */}
                                <button className="h-10 px-4 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/20 text-cyan-300 transition flex items-center gap-2 text-sm">
                                  <Download size={16} /> Deploy
                                </button>
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

            <select
              value={rowsPerPage}
              onChange={(e) => {
                setRowsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="bg-[#111827] border border-white/10 rounded-lg px-3 py-2 text-sm outline-none"
            >
              <option value={5}>5</option>
              <option value={8}>8</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
            </select>
          </div>

          {/* Page Info */}
          <div className="text-sm text-slate-400">
            Showing{" "}
            <span className="text-slate-200 font-medium">
              {(currentPage - 1) * rowsPerPage + 1}
            </span>{" "}
            to{" "}
            <span className="text-slate-200 font-medium">
              {Math.min(
                currentPage * rowsPerPage,
                filteredApps.length
              )}
            </span>{" "}
            of{" "}
            <span className="text-slate-200 font-medium">
              {filteredApps.length}
            </span>
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
              {currentPage}
            </div>

            <button
              disabled={currentPage === totalPages}
              onClick={() =>
                setCurrentPage((prev) => prev + 1)
              }
              className="w-10 h-10 rounded-xl border border-white/10 hover:bg-white/5 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LatestSoftware
