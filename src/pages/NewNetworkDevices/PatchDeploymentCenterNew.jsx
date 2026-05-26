import React from 'react'
import {  
    UploadCloud,
  Rocket,
  CalendarCheck,
  Activity,
  XCircle,
  Server,
  Download,
  FileUp,
  TerminalSquare,
} from "lucide-react";

const PatchDeploymentCenterNew = () => {

    const DeploymentCenterSummary  = [
   { title: "Scheduled Jobs", count: 14, icon: CalendarCheck, color: "text-blue-400", bg: "bg-blue-500/10" },
  { title: "Running Deployments", count: 3, icon: Activity, color: "text-yellow-400", bg: "bg-yellow-500/10" },
  { title: "Completed Today", count: 27, icon: Rocket, color: "text-green-400", bg: "bg-green-500/10" },
  { title: "Failed Deployments", count: 2, icon: XCircle, color: "text-red-400", bg: "bg-red-500/10" },
];

// const iconStyle=[
//   { icon: CalendarCheck, color: "text-blue-400", bg: "bg-blue-500/10"}
//   { icon: Activity, color: "text-yellow-400", bg: "bg-yellow-500/10"}
// ]
    const DeploymentJobsTable  = [
  { device: "FortiGate Firewall", vendor: "Fortinet", currentVersion: "7.0.8", targetVersion: "7.0.12", schedule: "26-May-2026 11:00 PM", progress: "0% Completed", status: "Scheduled", action: "View Logs" },
  { device: "Core Switch", vendor: "Cisco", currentVersion: "15.2", targetVersion: "15.2.7", schedule: "26-May-2026 10:30 PM", progress: "65% Completed", status: "In Progress", action: "View Logs" },
  { device: "Branch Router", vendor: "Juniper", currentVersion: "21.2R1", targetVersion: "21.4R3", schedule: "27-May-2026 01:00 AM", progress: "100% Completed", status: "Completed", action: "View Logs" },
  { device: "Wireless Controller", vendor: "Aruba", currentVersion: "8.6.0", targetVersion: "8.10.0", schedule: "27-May-2026 02:30 AM", progress: "100% Completed", status: "Failed", action: "View Logs" },

  { device: "Edge Firewall", vendor: "Palo Alto", currentVersion: "10.1.5", targetVersion: "10.1.11", schedule: "27-May-2026 03:15 AM", progress: "45% Completed", status: "In Progress", action: "View Logs" },
  { device: "Datacenter Switch", vendor: "Arista", currentVersion: "4.24.1F", targetVersion: "4.31.2F", schedule: "27-May-2026 04:00 AM", progress: "0% Completed", status: "Scheduled", action: "View Logs" },
  { device: "VPN Gateway", vendor: "Sophos", currentVersion: "18.0.4", targetVersion: "19.0.1", schedule: "27-May-2026 05:30 AM", progress: "80% Completed", status: "In Progress", action: "View Logs" },
  { device: "Load Balancer", vendor: "F5", currentVersion: "15.1.2", targetVersion: "17.1.0", schedule: "27-May-2026 06:00 AM", progress: "100% Completed", status: "Completed", action: "View Logs" },
  { device: "Access Point Controller", vendor: "Ubiquiti", currentVersion: "6.2.25", targetVersion: "6.5.62", schedule: "27-May-2026 07:00 AM", progress: "30% Completed", status: "In Progress", action: "View Logs" },
  { device: "Security Appliance", vendor: "Cisco", currentVersion: "9.12.3", targetVersion: "9.18.2", schedule: "27-May-2026 08:15 AM", progress: "100% Completed", status: "Completed", action: "View Logs" },
  { device: "WAN Optimizer", vendor: "Riverbed", currentVersion: "9.5.1", targetVersion: "9.12.0", schedule: "27-May-2026 09:00 AM", progress: "0% Completed", status: "Scheduled", action: "View Logs" },
  { device: "Network IDS", vendor: "Snort", currentVersion: "3.1.10", targetVersion: "3.1.15", schedule: "27-May-2026 10:30 AM", progress: "55% Completed", status: "In Progress", action: "View Logs" },
  { device: "Proxy Server", vendor: "Blue Coat", currentVersion: "6.7.4", targetVersion: "7.3.1", schedule: "27-May-2026 11:45 AM", progress: "100% Completed", status: "Completed", action: "View Logs" }
];

    const FirmwareRepositoryData = [
  { fileName: "FortiOS-7.0.12.img", vendor: "Fortinet", uploadedBy: "Admin", size: "1.4 GB", action: "Download" },
  { fileName: "Cisco-IOS-15.2.7.bin", vendor: "Cisco", uploadedBy: "System", size: "850 MB", action: "Download" },
  { fileName: "JunOS-21.4R3.tgz", vendor: "Juniper", uploadedBy: "Admin", size: "2.1 GB", action: "Download" },

  { fileName: "ArubaOS-8.10.0.img", vendor: "Aruba", uploadedBy: "Admin", size: "1.9 GB", action: "Download" },
  { fileName: "PaloAlto-PANOS-10.1.11.img", vendor: "Palo Alto", uploadedBy: "Security Team", size: "2.6 GB", action: "Download" },
  { fileName: "Sophos-XG-19.0.1.iso", vendor: "Sophos", uploadedBy: "Admin", size: "1.2 GB", action: "Download" },
  { fileName: "Arista-EOS-4.31.2F.bin", vendor: "Arista", uploadedBy: "System", size: "980 MB", action: "Download" },
  { fileName: "F5-BIGIP-17.1.0.iso", vendor: "F5", uploadedBy: "Admin", size: "3.0 GB", action: "Download" },
  { fileName: "Ubiquiti-UniFi-6.5.62.bin", vendor: "Ubiquiti", uploadedBy: "Admin", size: "750 MB", action: "Download" },
  { fileName: "Riverbed-SteelHead-9.12.0.img", vendor: "Riverbed", uploadedBy: "System", size: "1.1 GB", action: "Download" }
];

const logs = [
  "[INFO] Connecting to device 192.168.1.1",
  "[INFO] Uploading firmware image FortiOS-7.0.12.img",
  "[INFO] Backup configuration completed successfully",
  "[INFO] Firmware validation passed",
  "[INFO] Reboot initiated",
  "[SUCCESS] Firmware upgraded successfully",
  "",
  "[INFO] Connecting to device 192.168.1.10",
  "[ERROR] Deployment failed due to insufficient storage",
];
  return (
    <div className="p-6 bg-slate-950 min-h-screen text-white space-y-6">

      {/* TOP ACTION BAR */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Patch Deployment Center</h1>

        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg">
            Upload Firmware
          </button>

          <button className="flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 rounded-lg">
            Deploy Patch
          </button>
        </div>
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {DeploymentCenterSummary.map((item, i) => {
          const Icon = item.icon;
          return (
            <div key={i}
              className={`p-4 rounded-xl border border-slate-800 ${item.bg} hover:shadow-lg hover:border-cyan-500 transition`} >
              <div className="flex items-center justify-between">
                <Icon className={item.color} />
                <span className="text-2xl font-bold">{item.count}</span>
              </div>
              <p className="text-sm text-slate-300 mt-2">{item.title}</p>
            </div>
          );
        })}
      </div>

      {/* ROW 2 - TABLE + REPOSITORY */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* LEFT - DEPLOYMENT JOBS TABLE */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl">
          <div className="p-4 border-b border-slate-800 font-semibold flex items-center gap-2">
            <Server size={18} /> Patch Deployment Jobs
          </div>

          <div className="overflow-auto">
            <table className="w-full text-sm">
              <thead className="text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="p-3 text-left">Device</th>
                  <th>Vendor</th>
                  <th>Version</th>
                  <th>Schedule</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {DeploymentJobsTable.map((job, i) => (
                  <tr key={i} className="border-b border-slate-800 hover:bg-slate-800/50">
                    <td className="p-3">{job.device}</td>
                    <td>{job.vendor}</td>
                    <td>{job.currentVersion} → {job.targetVersion}</td>
                    <td>{job.schedule}</td>
                    <td>
                      <span className={`px-2 py-1 rounded text-xs ${
                        job.status === "Completed"
                          ? "bg-green-500/20 text-green-400"
                          : job.status === "Failed"
                          ? "bg-red-500/20 text-red-400"
                          : job.status === "In Progress"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-blue-500/20 text-blue-400"
                      }`}>
                        {job.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* RIGHT - FIRMWARE REPOSITORY */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl">
          <div className="p-4 border-b border-slate-800 flex justify-between items-center">
            <h2 className="font-semibold flex items-center gap-2">
              <FileUp size={18} /> Firmware Repository
            </h2>

            <button className="text-xs px-3 py-1 bg-cyan-600 hover:bg-cyan-500 rounded">
              Add Firmware
            </button>
          </div>

          <div className="p-3 space-y-3">
            {FirmwareRepositoryData.map((file, i) => (
              <div key={i} className="flex justify-between items-center p-2 bg-slate-800 rounded hover:border hover:border-cyan-500">
                <div>
                  <p className="text-sm">{file.fileName}</p>
                  <p className="text-xs text-slate-400">{file.vendor} • {file.size}</p>
                </div>
                <Download size={16} className="text-cyan-400" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ROW 3 - ACTIVITY LOGS (LIKE YOUR IMAGE) */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl">
        <div className="p-4 border-b border-slate-800 flex items-center gap-2 font-semibold">
          <TerminalSquare size={18} /> Deployment Activity Logs
        </div>

        <div className="p-4 font-mono text-sm bg-slate-950 text-green-400 h-64 overflow-auto">
          {logs.map((log, i) => (
            <div key={i} className={log.includes("[ERROR]") ? "text-red-400" : "text-green-400"}>
              {log}
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default PatchDeploymentCenterNew
