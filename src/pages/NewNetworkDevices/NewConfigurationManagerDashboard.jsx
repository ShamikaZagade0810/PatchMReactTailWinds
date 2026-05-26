import React from "react";
import {
  ShieldCheck,
  AlertTriangle,
  Database,
  RefreshCw,
  Download,
  Upload,
  CheckCircle2,
  Clock3,
} from "lucide-react";

export default function NewConfigurationManagerDashboard() {
  const configurations = [
    {
      device: "FortiGate Firewall",
      vendor: "Fortinet",
      lastBackup: "26-May-2026 10:20 PM",
      configVersion: "v12",
      status: "Protected",
    },
    {
      device: "Core Switch",
      vendor: "Cisco",
      lastBackup: "26-May-2026 09:10 PM",
      configVersion: "v8",
      status: "Changed",
    },
    {
      device: "Branch Router",
      vendor: "Juniper",
      lastBackup: "25-May-2026 11:45 PM",
      configVersion: "v5",
      status: "Protected",
    },
    {
      device: "Wireless Controller",
      vendor: "Aruba",
      lastBackup: "24-May-2026 08:00 PM",
      configVersion: "v4",
      status: "Backup Failed",
    },
  ];

  const compliancePolicies = [
    {
      policy: "SSH Enabled",
      compliant: 44,
      failed: 4,
    },
    {
      policy: "Telnet Disabled",
      compliant: 40,
      failed: 8,
    },
    {
      policy: "SNMPv3 Configured",
      compliant: 38,
      failed: 10,
    },
  ];

  const auditLogs = [
    {
      user: "admin",
      action: "Configuration Modified",
      device: "Core Switch",
      time: "26-May-2026 11:15 PM",
    },
    {
      user: "system",
      action: "Backup Completed",
      device: "FortiGate Firewall",
      time: "26-May-2026 10:20 PM",
    },
    {
      user: "networkops",
      action: "Rollback Executed",
      device: "Branch Router",
      time: "25-May-2026 09:00 PM",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Protected":
        return "bg-green-500/10 text-green-400";

      case "Changed":
        return "bg-yellow-500/10 text-yellow-400";

      case "Backup Failed":
        return "bg-red-500/10 text-red-400";

      default:
        return "bg-gray-500/10 text-gray-300";
    }
  };

  return (
    <div className="p-3 min-h-screen text-white space-y-4">
      {/* ===== HEADER ===== */}
      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">
        {/* <div>
          <h1 className="text-3xl font-bold text-white">
            Network Configuration Manager
          </h1>

          <p className="text-gray-400 mt-1">
            Centralized configuration backup, compliance & change
            management
          </p>
        </div> */}

        <div className="flex gap-3">
          <button className="bg-cyan-600 hover:bg-cyan-700 px-5 py-2 rounded-xl text-sm font-medium flex items-center gap-2">
            <Download size={16} />
            Backup All Devices
          </button>

          <button className="bg-[#1e293b] hover:bg-[#263548] border border-gray-700 px-5 py-2 rounded-xl text-sm flex items-center gap-2">
            <ShieldCheck size={16} />
            Add Compliance Policy
          </button>
        </div>
      </div>

      {/* ===== SUMMARY CARDS ===== */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          {
            title: "Managed Devices",
            count: 48,
            color: "text-cyan-400",
            icon: <Database size={22} />,
          },
          {
            title: "Successful Backups",
            count: 44,
            color: "text-green-400",
            icon: <CheckCircle2 size={22} />,
          },
          {
            title: "Config Changes",
            count: 6,
            color: "text-yellow-400",
            icon: <RefreshCw size={22} />,
          },
          {
            title: "Policy Violations",
            count: 10,
            color: "text-red-400",
            icon: <AlertTriangle size={22} />,
          },
        ].map((item, index) => (
          <div
            key={index}
            className="bg-[#0f172a] border border-gray-800 rounded-2xl p-5"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-400 text-sm">{item.title}</p>

                <h2 className={`text-3xl font-bold mt-3 ${item.color}`}>
                  {item.count}
                </h2>
              </div>

              <div className="w-12 h-12 rounded-xl bg-[#1e293b] flex items-center justify-center text-cyan-400">
                {item.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ===== DEVICE CONFIGURATION TABLE ===== */}
      <div className="bg-[#0f172a] border border-gray-800 rounded-2xl p-4 flex flex-col h-[520px]">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 mb-4">
          <div>
            <h2 className="text-xl font-semibold">
              Device Configuration Repository
            </h2>

            <p className="text-gray-400 text-sm mt-1">
              Secure configuration storage & backup management
            </p>
          </div>

          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Search device..."
              className="bg-[#1e293b] border border-gray-700 rounded-xl px-4 py-2 text-sm outline-none"
            />

            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl text-sm">
              Export Configs
            </button>
          </div>
        </div>

        <div className="overflow-auto hide-scrollbar rounded-xl border border-gray-800 flex-1">
          <table className="w-full text-sm">
            <thead className="bg-[#1e293b] sticky top-0 z-10">
              <tr>
                <th className="text-left py-3 px-4">Device</th>
                <th className="text-left py-3 px-4">Vendor</th>
                <th className="text-left py-3 px-4">Last Backup</th>
                <th className="text-left py-3 px-4">
                  Config Version
                </th>
                <th className="text-left py-3 px-4">Status</th>
                <th className="text-left py-3 px-4">Action</th>
              </tr>
            </thead>

            <tbody>
              {configurations.map((config, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-800 hover:bg-[#111c2d]"
                >
                  <td className="py-3 px-4 font-medium">
                    {config.device}
                  </td>

                  <td className="px-4">{config.vendor}</td>

                  <td className="px-4 text-gray-400">
                    {config.lastBackup}
                  </td>

                  <td className="px-4">
                    {config.configVersion}
                  </td>

                  <td className="px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        config.status
                      )}`}
                    >
                      {config.status}
                    </span>
                  </td>

                  <td className="px-4">
                    <div className="flex gap-2">
                      <button className="bg-cyan-600 hover:bg-cyan-700 px-3 py-1 rounded-lg text-xs">
                        Backup
                      </button>

                      <button className="bg-[#1e293b] hover:bg-[#263548] px-3 py-1 rounded-lg text-xs border border-gray-700">
                        Restore
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ===== COMPLIANCE + DIFF VIEWER ===== */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {/* ===== COMPLIANCE ===== */}
        <div className="bg-[#0f172a] border border-gray-800 rounded-2xl flex flex-col">
          <div className="p-4 border-b border-gray-800">
            <h2 className="text-xl font-semibold">
              Compliance Policies
            </h2>

            <p className="text-gray-400 text-sm mt-1">
              Security policy compliance monitoring
            </p>
          </div>

          <div className="divide-y divide-gray-800">
            {compliancePolicies.map((policy, index) => (
              <div
                key={index}
                className="p-4 hover:bg-[#111c2d] transition"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">
                      {policy.policy}
                    </h3>

                    <p className="text-sm text-gray-400 mt-1">
                      {policy.compliant} compliant •{" "}
                      {policy.failed} failed
                    </p>
                  </div>

                  <button className="bg-cyan-600 hover:bg-cyan-700 px-4 py-2 rounded-xl text-xs">
                    View Report
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ===== CONFIG DIFF VIEWER ===== */}
        <div className="bg-[#0f172a] border border-gray-800 rounded-2xl overflow-hidden">
          <div className="p-4 border-b border-gray-800">
            <h2 className="text-xl font-semibold">
              Configuration Difference Viewer
            </h2>

            <p className="text-gray-400 text-sm mt-1">
              Real-time configuration comparison engine
            </p>
          </div>

          <div className="bg-[#020c22] rounded-b-2xl p-5 h-[320px] overflow-auto hide-scrollbar border-t border-[#112240]">
            <pre className="text-green-400 font-mono text-sm leading-7">
{`- telnet enable
+ ssh enable

- snmp-server community public
+ snmp-server group secure v3

- interface vlan 100
+ interface vlan 200

- password admin123
+ encrypted-secret enabled`}
            </pre>
          </div>
        </div>
      </div>

      {/* ===== AUDIT LOGS ===== */}
      <div className="bg-[#0f172a] border border-gray-800 rounded-2xl p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold">
              Configuration Audit Logs
            </h2>

            <p className="text-gray-400 text-sm mt-1">
              Historical configuration changes & activity logs
            </p>
          </div>

          <button className="bg-[#1e293b] hover:bg-[#263548] border border-gray-700 px-4 py-2 rounded-xl text-sm">
            Export Logs
          </button>
        </div>

        <div className="overflow-auto hide-scrollbar rounded-xl border border-gray-800">
          <table className="w-full text-sm">
            <thead className="bg-[#1e293b]">
              <tr>
                <th className="text-left py-3 px-4">User</th>
                <th className="text-left py-3 px-4">Action</th>
                <th className="text-left py-3 px-4">Device</th>
                <th className="text-left py-3 px-4">
                  Timestamp
                </th>
              </tr>
            </thead>

            <tbody>
              {auditLogs.map((log, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-800 hover:bg-[#111c2d]"
                >
                  <td className="py-3 px-4 font-medium">
                    {log.user}
                  </td>

                  <td className="px-4">{log.action}</td>

                  <td className="px-4">{log.device}</td>

                  <td className="px-4 text-gray-400">
                    {log.time}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ===== AUTOMATED WORKFLOW ===== */}
    
    </div>
  );
}