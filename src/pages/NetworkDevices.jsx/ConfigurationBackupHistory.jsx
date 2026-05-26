import React, { useState } from "react";
import {
  Download,
  RotateCcw,
  Clock,
  CheckCircle,
  XCircle,
  Search,
  ShieldCheck,
  Server,
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

export default function ConfigurationBackupHistory() {
  const [search, setSearch] = useState("");

  const filteredData = backupData.filter(
    (item) =>
      item.device.toLowerCase().includes(search.toLowerCase()) ||
      item.vendor.toLowerCase().includes(search.toLowerCase()) ||
      item.ip.includes(search)
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Configuration Backup History
          </h1>
          <p className="text-gray-500 mt-1">
            Monitor and manage network device configuration backups
          </p>
        </div>

        <button className="rounded-xl bg-blue-600 px-5 py-3 text-white shadow-lg hover:bg-blue-700">
          + Take Backup
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-4">
        <div className="rounded-2xl bg-white p-5 shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Total Backups</p>
              <h2 className="text-3xl font-bold mt-2">248</h2>
            </div>
            <Server className="text-blue-600" size={40} />
          </div>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Successful</p>
              <h2 className="text-3xl font-bold text-green-600 mt-2">231</h2>
            </div>
            <CheckCircle className="text-green-600" size={40} />
          </div>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Failed</p>
              <h2 className="text-3xl font-bold text-red-600 mt-2">17</h2>
            </div>
            <XCircle className="text-red-600" size={40} />
          </div>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Last Backup</p>
              <h2 className="text-lg font-bold mt-2">10:30 AM</h2>
            </div>
            <Clock className="text-orange-500" size={40} />
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="mt-8 rounded-2xl bg-white p-4 shadow">
        <div className="flex items-center gap-3 border rounded-xl px-4 py-3">
          <Search className="text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search device, vendor, or IP..."
            className="w-full outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div className="mt-6 overflow-hidden rounded-2xl bg-white shadow">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50 text-left">
              <tr>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                  Device
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                  IP Address
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                  Vendor
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                  Config Version
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                  Firmware
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                  Backup Type
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                  Status
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                  Size
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                  Backup Time
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredData.map((item) => (
                <tr
                  key={item.id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4 font-medium text-gray-800">
                    {item.device}
                  </td>

                  <td className="px-6 py-4 text-gray-600">{item.ip}</td>

                  <td className="px-6 py-4 text-gray-600">{item.vendor}</td>

                  <td className="px-6 py-4">
                    <span className="rounded-lg bg-blue-100 px-3 py-1 text-sm text-blue-700">
                      {item.version}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-gray-600">
                    {item.firmware}
                  </td>

                  <td className="px-6 py-4">
                    <span className="rounded-lg bg-gray-100 px-3 py-1 text-sm">
                      {item.backupType}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    {item.status === "Success" ? (
                      <span className="flex items-center gap-1 text-green-600 font-medium">
                        <CheckCircle size={16} />
                        Success
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-red-600 font-medium">
                        <XCircle size={16} />
                        Failed
                      </span>
                    )}
                  </td>

                  <td className="px-6 py-4 text-gray-600">{item.size}</td>

                  <td className="px-6 py-4 text-gray-600">{item.time}</td>

                  <td className="px-6 py-4">
                    <div className="flex gap-3">
                      <button className="rounded-lg bg-blue-100 p-2 text-blue-600 hover:bg-blue-200">
                        <Download size={18} />
                      </button>

                      <button className="rounded-lg bg-green-100 p-2 text-green-600 hover:bg-green-200">
                        <RotateCcw size={18} />
                      </button>

                      <button className="rounded-lg bg-orange-100 p-2 text-orange-600 hover:bg-orange-200">
                        <ShieldCheck size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-6 text-center text-sm text-gray-500">
        Network Configuration Backup & Restore Management Dashboard
      </div>
    </div>
  );
}