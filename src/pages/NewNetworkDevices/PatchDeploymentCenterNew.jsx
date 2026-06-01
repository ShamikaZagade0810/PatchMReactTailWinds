import React, { useMemo, useState } from "react";
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

  const DeploymentCenterSummary = [
    { title: "Scheduled Jobs", count: 14, icon: CalendarCheck, color: "text-blue-400", bg: "bg-blue-500/10" },
    { title: "Running Deployments", count: 3, icon: Activity, color: "text-yellow-400", bg: "bg-yellow-500/10" },
    { title: "Completed Today", count: 27, icon: Rocket, color: "text-green-400", bg: "bg-green-500/10" },
    { title: "Failed Deployments", count: 2, icon: XCircle, color: "text-red-400", bg: "bg-red-500/10" },
  ];

  const iconStyle = [
    { title: "Scheduled Jobs", icon: CalendarCheck, color: "text-blue-400", bg: "bg-blue-500/10" },
    { title: "Running Deployments", icon: Activity, color: "text-yellow-400", bg: "bg-yellow-500/10" },
    { title: "Completed Today", icon: Rocket, color: "text-green-400", bg: "bg-green-500/10" },
    { title: "Failed Deployments", icon: XCircle, color: "text-red-400", bg: "bg-red-500/10" },
  ]
  // const DeploymentJobsTable = [
  //   { device: "FortiGate Firewall", vendor: "Fortinet", currentVersion: "7.0.8", targetVersion: "7.0.12", schedule: "26-May-2026 11:00 PM", progress: "0% Completed", status: "Scheduled", action: "View Logs" },
  //   { device: "Core Switch", vendor: "Cisco", currentVersion: "15.2", targetVersion: "15.2.7", schedule: "26-May-2026 10:30 PM", progress: "65% Completed", status: "In Progress", action: "View Logs" },
  //   { device: "Branch Router", vendor: "Juniper", currentVersion: "21.2R1", targetVersion: "21.4R3", schedule: "27-May-2026 01:00 AM", progress: "100% Completed", status: "Completed", action: "View Logs" },
  //   { device: "Wireless Controller", vendor: "Aruba", currentVersion: "8.6.0", targetVersion: "8.10.0", schedule: "27-May-2026 02:30 AM", progress: "100% Completed", status: "Failed", action: "View Logs" },

  //   { device: "Edge Firewall", vendor: "Palo Alto", currentVersion: "10.1.5", targetVersion: "10.1.11", schedule: "27-May-2026 03:15 AM", progress: "45% Completed", status: "In Progress", action: "View Logs" },
  //   { device: "Datacenter Switch", vendor: "Arista", currentVersion: "4.24.1F", targetVersion: "4.31.2F", schedule: "27-May-2026 04:00 AM", progress: "0% Completed", status: "Scheduled", action: "View Logs" },
  //   { device: "VPN Gateway", vendor: "Sophos", currentVersion: "18.0.4", targetVersion: "19.0.1", schedule: "27-May-2026 05:30 AM", progress: "80% Completed", status: "In Progress", action: "View Logs" },
  //   { device: "Load Balancer", vendor: "F5", currentVersion: "15.1.2", targetVersion: "17.1.0", schedule: "27-May-2026 06:00 AM", progress: "100% Completed", status: "Completed", action: "View Logs" },
  //   { device: "Access Point Controller", vendor: "Ubiquiti", currentVersion: "6.2.25", targetVersion: "6.5.62", schedule: "27-May-2026 07:00 AM", progress: "30% Completed", status: "In Progress", action: "View Logs" },
  //   { device: "Security Appliance", vendor: "Cisco", currentVersion: "9.12.3", targetVersion: "9.18.2", schedule: "27-May-2026 08:15 AM", progress: "100% Completed", status: "Completed", action: "View Logs" },
  //   { device: "WAN Optimizer", vendor: "Riverbed", currentVersion: "9.5.1", targetVersion: "9.12.0", schedule: "27-May-2026 09:00 AM", progress: "0% Completed", status: "Scheduled", action: "View Logs" },
  //   { device: "Network IDS", vendor: "Snort", currentVersion: "3.1.10", targetVersion: "3.1.15", schedule: "27-May-2026 10:30 AM", progress: "55% Completed", status: "In Progress", action: "View Logs" },
  //   { device: "Proxy Server", vendor: "Blue Coat", currentVersion: "6.7.4", targetVersion: "7.3.1", schedule: "27-May-2026 11:45 AM", progress: "100% Completed", status: "Completed", action: "View Logs" }
  // ];
  const formatScheduleTime = (hoursToAdd = 2) => {
    const date = new Date();

    date.setHours(date.getHours() + hoursToAdd);

    return date.toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    });
  };

  const DeploymentJobsTable = [
    {
      deploymentId: "DEP-10001",
      deviceId: "DEV-RT-11021",
      device:  "HQ-FLR01-GW-RTR01",
      vendor: "Cisco",
      deviceType: "Router",
      location: "Mumbai Data Center",
      currentVersion: "17.6.4",
      targetVersion: "17.12.3",
      firmwareFile:  "isr4400-universalk9.17.12.03.SPA.bin",
      schedule: formatScheduleTime(),
      progress: "68% Completed",
      progressValue: 68,
      status: "In Progress",

      deploymentPhase:
        "Installing Firmware",

      riskLevel: "Critical",

      rebootRequired: true,

      estimatedDowntime: "9 Minutes",

      vulnerabilitiesFixed: 3,

      initiatedBy: "SOC Automation",

      action: "View Logs"
    },

    {
      deploymentId: "DEP-10002",

      deviceId: "DEV-FW-22019",

      device:"PUNE-FW-CORE-01",

      vendor: "Fortinet",

      deviceType: "Firewall",

      location: "Pune HQ",

      currentVersion: "7.0.9",

      targetVersion: "7.2.7",

      firmwareFile:
        "FGT_200F-v7.2.7-build1624-FORTINET.out",

      schedule: formatScheduleTime(),

      progress: "12% Completed",

      progressValue: 12,

      status: "Queued",

      deploymentPhase:
        "Pre-Upgrade Validation",

      riskLevel: "Critical",

      rebootRequired: true,

      estimatedDowntime: "7 Minutes",

      vulnerabilitiesFixed: 2,

      initiatedBy: "Patch Automation",

      action: "View Logs"
    },

    {
      deploymentId: "DEP-10003",

      deviceId: "DEV-WLC-44011",

      device: "HQ-WLC01",

      vendor: "Cisco",

      deviceType:
        "Wireless Controller",

      location:
        "Delhi Corporate Office",

      currentVersion: "17.9.2",

      targetVersion: "17.12.2",

      firmwareFile:
        "c9800-l-universalk9_wlc.17.12.02.SPA.bin",

      schedule: formatScheduleTime(),

      progress: "91% Completed",

      progressValue: 91,

      status: "Failed",

      deploymentPhase:
        "Post-Reboot Validation",

      riskLevel: "Critical",

      rebootRequired: true,

      estimatedDowntime: "11 Minutes",

      vulnerabilitiesFixed: 4,

      initiatedBy: "Network Operations",

      action: "View Logs"
    },

    {
      deploymentId: "DEP-10004",

      deviceId: "DEV-LB-55002",

      device: "HQ-ADC01",

      vendor: "F5",

      deviceType: "Load Balancer",

      location: "Hyderabad DR Site",

      currentVersion: "16.1.2",

      targetVersion: "17.1.1",

      firmwareFile:
        "BIGIP-17.1.1-0.0.4.iso",

      schedule: formatScheduleTime(),

      progress: "100% Completed",

      progressValue: 100,

      status: "Completed",

      deploymentPhase:
        "Deployment Successful",

      riskLevel: "High",

      rebootRequired: true,

      estimatedDowntime: "12 Minutes",

      vulnerabilitiesFixed: 2,

      initiatedBy: "Patch Automation",

      action: "View Logs"
    },

    {
      deploymentId: "DEP-10005",

      deviceId: "DEV-SW-33012",

      device: "HQ-FLR01-CORE-SW01",

      vendor: "Aruba",

      deviceType: "Switch",

      location: "Bangalore Branch",

      currentVersion: "10.10.1010",

      targetVersion: "10.13.0005",

      firmwareFile:
        "ArubaCX_6300M_10_13_0005.swi",

      schedule: formatScheduleTime(),

      progress: "0% Completed",

      progressValue: 0,

      status: "Scheduled",

      deploymentPhase:
        "Awaiting Approval",

      riskLevel: "Medium",

      rebootRequired: true,

      estimatedDowntime: "5 Minutes",

      vulnerabilitiesFixed: 1,

      initiatedBy: "Branch IT Team",

      action: "View Logs"
    },

    {
      deploymentId: "DEP-10006",

      deviceId: "DEV-FW-99008",

      device: "HQ-DC-FW01",

      vendor: "Palo Alto Networks",

      deviceType: "Firewall",

      location: "Bangalore Edge DC",

      currentVersion: "11.1.2",

      targetVersion: "11.1.2",

      firmwareFile:
        "PanOS_vm-11.1.2.img",

      schedule: formatScheduleTime(),
      progress: "100% Completed",

      progressValue: 100,

      status: "Completed",

      deploymentPhase:
        "Baseline Verification Completed",

      riskLevel: "Low",

      rebootRequired: false,

      estimatedDowntime: "0 Minutes",

      vulnerabilitiesFixed: 0,

      initiatedBy: "Compliance Engine",

      action: "View Logs"
    },

    {
      deploymentId: "DEP-10007",

      deviceId: "DEV-SW-77101",

      device: "CHN-ACCESS-SW-01",

      vendor: "Cisco",

      deviceType: "Switch",

      location: "Chennai Branch",

      currentVersion: "17.12.3",

      targetVersion: "17.12.3",

      firmwareFile:
        "cat9k_iosxe.17.12.03.SPA.bin",

      schedule: formatScheduleTime(),

      progress: "100% Completed",

      progressValue: 100,

      status: "Completed",

      deploymentPhase:
        "Compliance Verified",

      riskLevel: "Low",

      rebootRequired: false,

      estimatedDowntime: "0 Minutes",

      vulnerabilitiesFixed: 0,

      initiatedBy: "Network Compliance",

      action: "View Logs"
    },

    {
      deploymentId: "DEP-10008",

      deviceId: "DEV-AP-88021",

      device: "WIFI-AP-21",

      vendor: "Aruba",

      deviceType: "Access Point",

      location: "Mumbai Office Floor-5",

      currentVersion: "10.6.0.2",

      targetVersion: "10.6.0.2",

      firmwareFile:
        "ArubaInstant_Hercules_10.6.0.2.pkg",

       schedule: formatScheduleTime(),

      progress: "100% Completed",

      progressValue: 100,

      status: "Completed",

      deploymentPhase:
        "Wireless Validation Completed",

      riskLevel: "Low",

      rebootRequired: false,

      estimatedDowntime: "0 Minutes",

      vulnerabilitiesFixed: 0,

      initiatedBy: "Wireless Team",

      action: "View Logs"
    }
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

  // ===== SEARCH + PAGINATION STATE =====
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  // ===== FILTER DATA =====
  const filteredData = useMemo(() => {
    return DeploymentJobsTable.filter((item) =>
      Object.values(item)
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [search, DeploymentJobsTable]);

  // reset page on search
  React.useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  // ===== PAGINATION =====
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filteredData.slice(start, start + rowsPerPage);
  }, [filteredData, currentPage]);


  return (
    <div className="p-6  min-h-screen text-white space-y-3">

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
      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {DeploymentCenterSummary.map((item, i) => {
          const Icon = item.icon;
          const style = iconStyle[i];
          const IconRight = style.icon;

          const shadowMap = {
            "text-blue-400": "rgba(59,130,246,0.35)",
            "text-yellow-400": "rgba(234,179,8,0.35)",
            "text-green-400": "rgba(34,197,94,0.35)",
            "text-red-400": "rgba(239,68,68,0.35)",
          };

          return (
            <div
              key={i}
              className={`group relative p-4 rounded-xl bg-[#0f172a] border border-slate-800 transition-all duration-300 hover:-translate-y-1`}
              style={{
                boxShadow: "0 0 0px transparent",
              }}
            >
              {/* hover glow + border */}
              <div
                className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300`}
                style={{
                  border: `1px solid ${style.color.replace("text-", "")}`,
                  boxShadow: `0 0 18px ${shadowMap[style.color]
                    }`,
                }}
              />

              <div className="relative flex items-center justify-between">
                {/* LEFT CONTENT */}
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-wide">
                    {item.title}
                  </p>
                  <p className="text-2xl font-bold text-white mt-1">
                    {item.count}
                  </p>
                </div>

                {/* RIGHT ICON */}
                <div
                  className={`p-3 rounded-full ${style.bg} flex items-center justify-center`}
                >
                  <IconRight className={style.color} size={20} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ROW 2 - TABLE + REPOSITORY */}
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-3">

        {/* LEFT - DEPLOYMENT JOBS TABLE */}
        <div className="lg:col-span-2 p-4 bg-[#0f172a]  border border-slate-800 rounded-xl">
          {/* <div className="p-3 border-b border-slate-800 font-semibold flex items-center gap-2">
            Patch Deployment Jobs
          </div> */}
          <h2 className="text-lg font-semibold mb-3 flex-shrink-0">  Patch Deployment Jobs </h2>

          <div className="h-px bg-gray-800 my-2"></div>
          {/* SEARCH + COUNT ROW */}
          <div className="flex justify-between items-center mb-3 flex-shrink-0">
            {/* SEARCH */}
            <input type="text" placeholder="Search devices..." value={search} onChange={(e) => setSearch(e.target.value)}
              className=" w-[85%] px-3 py-2 text-sm rounded-lg bg-[#111827] text-white outline-none border border-gray-700" />

            {/* SHOWING TEXT */}
            <div className="text-sm text-gray-400 pr-4"> Showing {paginatedData.length} of {filteredData.length} </div>
          </div>

          <div className="overflow-y-auto flex-1 rounded-lg border border-gray-700 hide-scrollbar">
            <table className="w-full text-sm">
              <thead className="bg-[#2a3a52] text-gray-300 border-b border-[#2a3a52]">
                <tr>
                  <th className="p-3 text-left">Device</th>
                  <th>Vendor</th>
                  <th>Version</th>
                  <th>Schedule</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {paginatedData.map((job, i) => (
                  <tr key={i} className="border-b border-slate-800 hover:bg-slate-800/50">
                    <td className="p-3">{job.device}</td>
                    <td>{job.vendor}</td>
                    <td>{job.currentVersion} → {job.targetVersion}</td>
                    <td>{job.schedule}</td>
                    <td>
                      <span className={`px-2 py-1 rounded text-xs ${job.status === "Completed"
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
          {/* PAGINATION */}
          <div className="flex justify-end gap-2 mt-3 flex-shrink-0">
            <button disabled={currentPage === 1} onClick={() => setCurrentPage((p) => p - 1)}
              className="px-3 py-1 text-sm bg-[#1e293b] rounded disabled:opacity-40" > Prev
            </button>

            <span className="text-sm px-2 py-1"> {currentPage} / {totalPages || 1} </span>

            <button disabled={currentPage === totalPages} onClick={() => setCurrentPage((p) => p + 1)}
              className="px-3 py-1 text-sm bg-[#1e293b] rounded disabled:opacity-40" > Next
            </button>
          </div>
        </div>

        {/* RIGHT - FIRMWARE REPOSITORY */}
        {/* <div className="bg-[#0f172a]  border border-slate-800 rounded-xl">
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
        </div> */}
      </div>

      {/* ROW 3 - ACTIVITY LOGS (LIKE YOUR IMAGE) */}
      {/* <div className="bg-[#0f172a]  border border-slate-800 rounded-xl">
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
      </div> */}

    </div>
  )
}

export default PatchDeploymentCenterNew
