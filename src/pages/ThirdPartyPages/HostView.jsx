import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import {
  Monitor, Search, ChevronRight, AlertTriangle, CheckCircle2, Boxes, Clock3,
} from "lucide-react";

import { getThirdPartyHostView } from "../../api/projectApi";

const HostView = () => {
  const navigate = useNavigate();

    // -------------------- API BINDING
   const [hostviewdata, sethostviewdata] = useState([]);
       const [loading, setLoading] = useState(false);

    useEffect(() => {
          initialApiReq();
      }, []);

       const initialApiReq = async () => {
                 try {
                         setLoading(true);           
                         const res = await getThirdPartyHostView();           
                         console.log("API Response:", res);           
                         // adjust based on backend response structure
                         sethostviewdata(res?.data?.data || res?.data || []);           
                     } catch (error) {
                         console.error("Error fetching devices:", error);
                         sethostviewdata([]);
                     } finally {
                         setLoading(false);
                     }
          
          
              }


  // const hostviewdata = [
  //   { srNo: 1, hostname: "DESKTOP-F7V9A7C", ipAddress: "192.168.0.236", osdescription: "Windows 11 Pro", totalApps: 37, outdated: 9, upToDate: 28, compliance: 20 },
  //   { srNo: 2, hostname: "Neeraj-Sharma", ipAddress: "192.168.0.39", osdescription: "Windows 9", totalApps: 79, outdated: 9, upToDate: 70, compliance: 76 },
  //   { srNo: 3, hostname: "Shamika-Zagade", ipAddress: "192.168.0.15", osdescription: "Windows 11", totalApps: 95, outdated: 6, upToDate: 89, compliance: 86 },
  //   { srNo: 4, hostname: "Shridhar-Varadkar", ipAddress: "192.168.0.37", osdescription: "Windows 10 Pro", totalApps: 44, outdated: 12, upToDate: 32, compliance: 56 },
  //   { srNo: 5, hostname: "Sumit-Shedge", ipAddress: "192.168.0.105", osdescription: "Windows 11 Pro", totalApps: 163, outdated: 14, upToDate: 149, compliance: 60 }
  // ];
  const totalHosts = hostviewdata.length;

  const totalApps = hostviewdata.reduce(
    (acc, item) => acc + item.totalApps,
    0
  );

  const totalOutdated = hostviewdata.reduce(
    (acc, item) => acc + item.outdated,
    0
  );

  const totalUpdated = hostviewdata.reduce(
    (acc, item) => acc + item.upToDate,
    0
  );

  const getComplianceColor = (value) => {
    if (value >= 80) return "bg-emerald-400";
    if (value >= 50) return "bg-yellow-400";
    return "bg-red-500";
  };

  const getTextColor = (value) => {
    if (value >= 80) return "text-emerald-400";
    if (value >= 50) return "text-yellow-400";
    return "text-red-400";
  };



  return (
    // <div className="bg-[#050B18] rounded-xl p-2 border border-white/10 min-h-screen">
    <div className=" rounded-xl p-2  min-h-screen">
      {/* Top Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 mb-4">
        <div className="bg-[#050B18] border border-white/10 rounded-xl p-3 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">{totalHosts}</h2>
            <p className="text-xs text-gray-400 mt-0.5">Total Hosts</p>
          </div>

          <div className="w-10 h-10 rounded-lg bg-violet-500/15 flex items-center justify-center">
            <Monitor className="text-violet-400" size={18} />
          </div>
        </div>
        {/* 111827 */}
        <div className="bg-[#050B18] border border-white/10 rounded-xl p-3 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">{totalApps}</h2>
            <p className="text-xs text-gray-400 mt-0.5">Total Apps</p>
          </div>

          <div className="w-10 h-10 rounded-lg bg-cyan-500/15 flex items-center justify-center">
            <Boxes className="text-cyan-400" size={18} />
          </div>
        </div>

        <div className="bg-[#050B18] border border-white/10 rounded-xl p-3 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">
              {totalOutdated}
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">Outdated</p>
          </div>

          <div className="w-10 h-10 rounded-lg bg-yellow-500/15 flex items-center justify-center">
            <AlertTriangle className="text-yellow-400" size={18} />
          </div>
        </div>

        <div className="bg-[#050B18] border border-white/10 rounded-xl p-3 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">
              {totalUpdated}
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">Up To Date</p>
          </div>

          <div className="w-10 h-10 rounded-lg bg-emerald-500/15 flex items-center justify-center">
            <CheckCircle2 className="text-emerald-400" size={18} />
          </div>
        </div>
      </div>

      {/* Main Section */}
      <div className="bg-[#050B18] border border-white/10 rounded-xl overflow-hidden">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 p-3 border-b border-white/10">
          <div className="flex items-center gap-2">

            <h2 className="card-header "> Managed Hosts </h2>
          </div>

          {/* Search */}
          <div className="relative w-full lg:w-[240px]">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />

            <input
              type="text"
              placeholder="Search hosts..."
              className="w-full bg-[#111827] border border-white/10 rounded-lg py-2 pl-9 pr-3 text-xs text-white placeholder:text-gray-500 outline-none focus:border-cyan-500"
            />
          </div>
        </div>

        {/* Host Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3 p-3">
          {hostviewdata.map((item, index) => (
            <div
              key={index}
              className="bg-[#0F172A] border border-white/10 rounded-xl p-4 hover:border-cyan-500/40 hover:shadow-[0_0_25px_rgba(34,211,238,0.15)] transition-all duration-300 flex flex-col justify-between"
            >
              {/* Top */}
              <div>
                <div className="flex items-start justify-between">
                  <div className="flex gap-2.5">
                    <div className="w-10 h-10 rounded-lg bg-violet-500/15 flex items-center justify-center">
                      <Monitor className="text-violet-400" size={18} />
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-white">
                        {item.hostname}
                      </h3>

                      <p className="text-[11px] text-gray-400 mt-0.5">
                        {item.ipAddress}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-2 mt-4">
                  <div className="bg-[#1B2637] rounded-lg py-3 text-center">
                    <h2 className="text-lg font-bold text-cyan-400">
                      {item.totalApps}
                    </h2>

                    <p className="text-[10px] tracking-wide text-gray-500 mt-1 uppercase">
                      Total
                    </p>
                  </div>

                  <div className="bg-[#1B2637] rounded-lg py-3 text-center">
                    <h2 className="text-lg font-bold text-yellow-400">
                      {item.outdated}
                    </h2>

                    <p className="text-[10px] tracking-wide text-gray-500 mt-1 uppercase">
                      Outdated
                    </p>
                  </div>

                  <div className="bg-[#1B2637] rounded-lg py-3 text-center">
                    <h2 className="text-lg font-bold text-emerald-400">
                      {item.upToDate}
                    </h2>

                    <p className="text-[10px] tracking-wide text-gray-500 mt-1 uppercase">
                      Updated
                    </p>
                  </div>
                </div>

                {/* Compliance */}
                {/* <div className="mt-4">
                  <div className="flex items-center justify-between mb-1.5">
                    <p className="text-xs text-gray-400">Compliance</p>

                    <span
                      className={`text-xs font-semibold ${getTextColor(
                        item.compliance
                      )}`}
                    >
                      {item.compliance}%
                    </span>
                  </div>

                  <div className="w-full h-1.5 bg-[#1E293B] rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${getComplianceColor(
                        item.compliance
                      )}`}
                      style={{ width: `${item.compliance}%` }}
                    />
                  </div>
                </div> */}

                {/* Footer */}
                {/* <div className="flex items-center justify-between mt-4">
          <p className="text-[11px] text-gray-400">Windows 11 Pro</p>          
        </div> */}
              </div>

              {/* Bottom Action */}
              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                <p className="text-[11px] text-gray-400">{item.osdescription}</p>
                <button onClick={() => navigate(`/Thirdparty/host-details/${item.ipAddress}`)} className="flex items-center gap-1 text-[11px] text-gray-400 hover:text-cyan-400 transition-all duration-300 group">
                  View Details<ChevronRight className="text-gray-400 group-hover:text-cyan-400" size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default HostView
