import React, { useState } from "react";
import {
  Download,
  RotateCcw,
  Clock3,
  CheckCircle2,
  XCircle,
  Search,
  ShieldCheck,
  Server,
  Database,
  AlertTriangle,
} from "lucide-react";

const backupData = [
  {
    id: 1,
    device: "Firewall-01",
    ip: "192.168.1.1",
    vendor: "Fortinet",
    version: "CFG-101",
    firmware: "v7.2.1",
    backupType: "Auto",
    status: "Success",
    size: "2.1 MB",
    time: "26-May-2026 10:30 AM",
  },
  {
    id: 2,
    device: "Core-Switch-02",
    ip: "192.168.1.10",
    vendor: "Cisco",
    version: "CFG-98",
    firmware: "v16.3",
    backupType: "Scheduled",
    status: "Success",
    size: "1.5 MB",
    time: "26-May-2026 09:00 AM",
  },
  {
    id: 3,
    device: "Router-03",
    ip: "192.168.1.20",
    vendor: "Juniper",
    version: "CFG-77",
    firmware: "v5.6",
    backupType: "Manual",
    status: "Failed",
    size: "--",
    time: "25-May-2026 11:20 PM",
  },
  {
    id: 4,
    device: "ATM-Switch-01",
    ip: "10.10.20.5",
    vendor: "HP",
    version: "CFG-52",
    firmware: "v3.1",
    backupType: "Auto",
    status: "Success",
    size: "850 KB",
    time: "25-May-2026 08:15 PM",
  },
];

export default function NewConfigurationBackupHistory() {
  const [search, setSearch] = useState("");

  const filteredData = backupData.filter(
    (item) =>
      item.device.toLowerCase().includes(search.toLowerCase()) ||
      item.vendor.toLowerCase().includes(search.toLowerCase()) ||
      item.ip.includes(search)
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "Success":
        return "bg-green-500/10 text-green-400";

      case "Failed":
        return "bg-red-500/10 text-red-400";

      default:
        return "bg-gray-500/10 text-gray-300";
    }
  };

  return (
    <div className="p-3 min-h-screen text-white space-y-4">

      {/* ===== HEADER ===== */}
      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">

        <div>
          <h1 className="text-3xl font-bold">
            Configuration Backup History
          </h1>

          <p className="text-gray-400 mt-1">
            Monitor & manage network device configuration backups
          </p>
        </div>

        <button className="bg-cyan-600 hover:bg-cyan-700 px-5 py-2 rounded-xl text-sm font-medium">
          + Take Backup
        </button>
      </div>

      {/* ===== SUMMARY CARDS ===== */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">

        {[
          {
            title: "Total Backups",
            count: 248,
            color: "text-cyan-400",
            icon: <Database size={22} />,
          },
          {
            title: "Successful",
            count: 231,
            color: "text-green-400",
            icon: <CheckCircle2 size={22} />,
          },
          {
            title: "Failed",
            count: 17,
            color: "text-red-400",
            icon: <AlertTriangle size={22} />,
          },
          {
            title: "Last Backup",
            count: "10:30 AM",
            color: "text-orange-400",
            icon: <Clock3 size={22} />,
          },
        ].map((item, index) => (
          <div key={index}  className="bg-[#0f172a] border border-gray-800 rounded-2xl p-4" >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-400 text-sm"> {item.title} </p>
                <h2 className={`text-2xl font-semibold mt-3 ${item.color}`}> {item.count} </h2>
              </div>

              <div className="w-12 h-12 rounded-xl bg-[#1e293b] flex items-center justify-center text-cyan-400"> {item.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ===== SEARCH BAR ===== */}
      {/* <div className="bg-[#0f172a] border border-gray-800 rounded-2xl p-4">

        <div className="flex items-center gap-3 bg-[#1e293b] border border-gray-700 rounded-xl px-4 py-3">

          <Search className="text-gray-400" size={18} />

          <input
            type="text"
            placeholder="Search device, vendor or IP..."
            className="bg-transparent w-full outline-none text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>
      </div> */}

      {/* ===== TABLE ===== */}
      <div className="bg-[#0f172a] border border-gray-800 rounded-2xl p-4 flex flex-col h-[620px]">

        {/* <div className="flex items-center justify-between mb-4">

          <div>
            <h2 className="text-xl font-semibold">
              Backup Repository
            </h2>

            <p className="text-gray-400 text-sm mt-1">
              Historical configuration backup records
            </p>
          </div>

          <div className="text-sm text-gray-400">
            Showing {filteredData.length} Records
          </div>
        </div> */}

        <div className="mb-4">

  <div>
    <h2 className="text-xl font-semibold"> Backup Repository </h2>

    <p className="text-gray-400 text-sm mt-1"> Historical configuration backup records </p>
  </div>

    {/* DIVIDER */}
  <div className="my-4 border-t border-gray-800" />

  {/* SEARCH + RECORD COUNT */}
  <div className="mt-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">

    <div className="flex items-center gap-3 bg-[#1e293b] border border-gray-700 rounded-xl px-4 py-2 md:w-[600px]">
      <Search className="text-gray-400" size={18} />
      <input type="text" placeholder="Search device, vendor or IP..." className="bg-transparent w-full outline-none text-sm" value={search}
        onChange={(e) => setSearch(e.target.value)} />
    </div>
    <div className="text-sm text-gray-400">
      Showing {filteredData.length} Records
    </div>

  </div>

</div>

        {/* ===== TABLE WRAPPER ===== */}
        <div className="overflow-auto hide-scrollbar rounded-xl border border-gray-800 flex-1">

          <table className="w-full text-sm">

            {/* ===== TABLE HEADER ===== */}
            <thead className="bg-[#1e293b] sticky top-0 z-10">

              <tr>
                <th className="text-left py-3 px-4">Device</th>
                <th className="text-left py-3 px-4">IP Address</th>
                <th className="text-left py-3 px-4">Vendor</th>
                <th className="text-left py-3 px-4">Config Version</th>
                <th className="text-left py-3 px-4">Firmware</th>
                <th className="text-left py-3 px-4">Backup Type</th>
                <th className="text-left py-3 px-4">Status</th>
                <th className="text-left py-3 px-4">Size</th>
                <th className="text-left py-3 px-4">Backup Time</th>
                <th className="text-left py-3 px-4">Actions</th>
              </tr>

            </thead>

            {/* ===== TABLE BODY ===== */}
            <tbody>

              {filteredData.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-gray-800 hover:bg-[#111c2d] transition"
                >

                  <td className="py-3 px-4 font-medium">
                    {item.device}
                  </td>

                  <td className="px-4 text-gray-400">
                    {item.ip}
                  </td>

                  <td className="px-4">
                    {item.vendor}
                  </td>

                  <td className="px-4">
                    <span className="bg-cyan-500/10 text-cyan-400 px-3 py-1 rounded-full text-xs">
                      {item.version}
                    </span>
                  </td>

                  <td className="px-4">
                    {item.firmware}
                  </td>

                  <td className="px-4">
                    <span className="bg-[#1e293b] border border-gray-700 px-3 py-1 rounded-full text-xs">
                      {item.backupType}
                    </span>
                  </td>

                  <td className="px-4">

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 w-fit ${getStatusColor(
                        item.status
                      )}`}
                    >
                      {item.status === "Success" ? (
                        <CheckCircle2 size={14} />
                      ) : (
                        <XCircle size={14} />
                      )}

                      {item.status}
                    </span>

                  </td>

                  <td className="px-4 text-gray-400">
                    {item.size}
                  </td>

                  <td className="px-4 text-gray-400">
                    {item.time}
                  </td>

                  {/* ===== ACTION BUTTONS ===== */}
                  <td className="px-4">

                    <div className="flex gap-2">

                      <button className="w-9 h-9 rounded-lg bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 flex items-center justify-center transition">
                        <Download size={16} />
                      </button>

                      <button className="w-9 h-9 rounded-lg bg-green-500/10 text-green-400 hover:bg-green-500/20 flex items-center justify-center transition">
                        <RotateCcw size={16} />
                      </button>

                      <button className="w-9 h-9 rounded-lg bg-orange-500/10 text-orange-400 hover:bg-orange-500/20 flex items-center justify-center transition">
                        <ShieldCheck size={16} />
                      </button>

                    </div>

                  </td>
                </tr>
              ))}

            </tbody>
          </table>
        </div>
      </div>

      {/* ===== FOOTER ===== */}
      {/* <div className="text-center text-sm text-gray-500 py-2">
        Network Configuration Backup & Restore Management Dashboard
      </div> */}

    </div>
  );
}