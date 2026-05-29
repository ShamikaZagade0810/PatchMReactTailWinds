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
      backupId: "CFG-10001",

      deviceId: "DEV-FW-22019",

      device: "PUNE-FW-CORE-01",

      hostname: "PUNE-FW-CORE-01",

      vendor: "Fortinet",

      deviceType: "Firewall",

      model: "FortiGate 200F",

      ipAddress: "10.40.2.254",

      location: "Pune HQ",

      currentVersion: "7.0.9",

      configVersion: "v12",

      backupType: "Automatic Scheduled Backup",

      lastBackup: "29-May-2026 09:20 PM",

      backupSize: "48 MB",

      backupStorage:
        "Primary Config Repository",

      encryption: "AES-256 Enabled",

      checksumStatus: "Verified",

      status: "Protected",

      initiatedBy: "Backup Automation Engine",

      restorePoint: true
    },

    {
      backupId: "CFG-10002",

      deviceId: "DEV-RT-11021",

      device: "MUM-EDGE-RTR-01",

      hostname: "MUM-EDGE-RTR-01",

      vendor: "Cisco",

      deviceType: "Router",

      model: "ISR4451-X/K9",

      ipAddress: "10.10.14.1",

      location: "Mumbai Data Center",

      currentVersion: "17.6.4",

      configVersion: "v8",

      backupType: "Pre-Upgrade Backup",

      lastBackup: "29-May-2026 08:45 PM",

      backupSize: "36 MB",

      backupStorage:
        "Disaster Recovery Vault",

      encryption: "AES-256 Enabled",

      checksumStatus: "Verified",

      status: "Changed",

      initiatedBy: "SOC Automation",

      restorePoint: true
    },

    {
      backupId: "CFG-10003",

      deviceId: "DEV-WLC-44011",

      device: "DEL-WLC-CORE-01",

      hostname: "DEL-WLC-CORE-01",

      vendor: "Cisco",

      deviceType:
        "Wireless Controller",

      model: "Catalyst 9800-L",

      ipAddress: "10.80.1.20",

      location:
        "Delhi Corporate Office",

      currentVersion: "17.9.2",

      configVersion: "v5",

      backupType:
        "Wireless Policy Snapshot",

      lastBackup: "29-May-2026 07:10 PM",

      backupSize: "64 MB",

      backupStorage:
        "Central Configuration Manager",

      encryption: "AES-256 Enabled",

      checksumStatus: "Verified",

      status: "Protected",

      initiatedBy: "Wireless Operations",

      restorePoint: true
    },

    {
      backupId: "CFG-10004",

      deviceId: "DEV-SW-33012",

      device: "BLR-ACCESS-SW-12",

      hostname: "BLR-ACCESS-SW-12",

      vendor: "Aruba",

      deviceType: "Switch",

      model: "Aruba CX 6300M",

      ipAddress: "10.60.8.22",

      location: "Bangalore Branch",

      currentVersion: "10.10.1010",

      configVersion: "v4",

      backupType:
        "Manual Admin Backup",

      lastBackup: "29-May-2026 06:00 PM",

      backupSize: "28 MB",

      backupStorage:
        "Branch Backup Repository",

      encryption: "AES-256 Enabled",

      checksumStatus: "Failed",

      status: "Backup Failed",

      initiatedBy: "Branch IT Team",

      restorePoint: false
    },

    {
      backupId: "CFG-10005",

      deviceId: "DEV-LB-55002",

      device: "HYD-LB-ADC-01",

      hostname: "HYD-LB-ADC-01",

      vendor: "F5",

      deviceType: "Load Balancer",

      model: "BIG-IP i5800",

      ipAddress: "10.90.4.15",

      location: "Hyderabad DR Site",

      currentVersion: "16.1.2",

      configVersion: "v11",

      backupType:
        "Pre-Patch Snapshot",

      lastBackup: "29-May-2026 10:05 PM",

      backupSize: "72 MB",

      backupStorage:
        "Enterprise DR Vault",

      encryption: "AES-256 Enabled",

      checksumStatus: "Verified",

      status: "Protected",

      initiatedBy: "Patch Automation",

      restorePoint: true
    },

    {
      backupId: "CFG-10006",

      deviceId: "DEV-FW-99008",

      device: "BLR-FW-EDGE-02",

      hostname: "BLR-FW-EDGE-02",

      vendor: "Palo Alto Networks",

      deviceType: "Firewall",

      model: "PA-3220",

      ipAddress: "10.45.0.2",

      location: "Bangalore Edge DC",

      currentVersion: "11.1.2",

      configVersion: "v9",

      backupType:
        "Compliance Snapshot",

      lastBackup: "29-May-2026 08:30 PM",

      backupSize: "51 MB",

      backupStorage:
        "Security Compliance Vault",

      encryption: "AES-256 Enabled",

      checksumStatus: "Verified",

      status: "Protected",

      initiatedBy: "Compliance Engine",

      restorePoint: true
    }
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

        <div className="flex  gap-3 xl:ml-auto justify-end">
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
                    <h3 className="font-medium text-sm">
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