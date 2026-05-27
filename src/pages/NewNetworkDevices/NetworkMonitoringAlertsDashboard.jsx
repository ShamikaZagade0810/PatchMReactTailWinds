import React from "react";
import {
    AlertTriangle,
    Activity,
    ShieldCheck,
    Clock3,
    Server,
    Cpu,
    MemoryStick,
    CheckCircle2,
} from "lucide-react";

const NewNetworkMonitoringAlertsDashboard = () => {
    const networkdevicecount = [
        { id: 1, title: "Active Alerts", count: 48 },
        { id: 2, title: "Healthy Devices", count: 12 },
        { id: 3, title: "Warning Devices", count: 5 },
        { id: 4, title: "Tasks Scheduled", count: "96%" },
    ];

    const alerts = [
        {
            severity: "Critical",
            device: "FortiGate Firewall",
            message: "Firmware vulnerability detected",
            time: "2 mins ago",
            status: "Open",
        },
        {
            severity: "High",
            device: "Core Switch",
            message: "Configuration changed detected",
            time: "10 mins ago",
            status: "Investigating",
        },
        {
            severity: "Medium",
            device: "Branch Router",
            message: "CPU utilization exceeded 85%",
            time: "20 mins ago",
            status: "Open",
        },
        {
            severity: "Low",
            device: "Wireless Controller",
            message: "Backup completed successfully",
            time: "35 mins ago",
            status: "Resolved",
        },
    ];

    const deviceHealth = [
        {
            name: "FortiGate Firewall",
            cpu: 72,
            memory: 68,
            uptime: "42 Days",
            status: "Healthy",
        },
        {
            name: "Core Switch",
            cpu: 88,
            memory: 81,
            uptime: "105 Days",
            status: "Warning",
        },
        {
            name: "Branch Router",
            cpu: 34,
            memory: 45,
            uptime: "66 Days",
            status: "Healthy",
        },
    ];

    const scheduledTasks = [
        {
            task: "Nightly Config Backup",
            devices: 42,
            schedule: "11:00 PM Daily",
            status: "Active",
        },
        {
            task: "Firmware Compliance Scan",
            devices: 48,
            schedule: "Every Sunday",
            status: "Active",
        },
        {
            task: "Security Audit",
            devices: 20,
            schedule: "Monthly",
            status: "Paused",
        },
    ];

    const eventLogs = [
        {
            time: "10:42:12",
            event: "SNMP Trap Received",
            device: "Core Switch",
            severity: "Warning",
        },
        {
            time: "10:40:08",
            event: "Configuration Updated",
            device: "FortiGate Firewall",
            severity: "Info",
        },
        {
            time: "10:38:44",
            event: "CPU Threshold Exceeded",
            device: "Branch Router",
            severity: "Critical",
        },
        {
            time: "10:36:01",
            event: "Firmware Scan Completed",
            device: "Wireless Controller",
            severity: "Success",
        },
    ];

    const getSeverityColor = (severity) => {
        switch (severity) {
            case "Critical":
                return "text-red-500 bg-red-500/10";
            case "High":
                return "text-orange-400 bg-orange-500/10";
            case "Medium":
            case "Warning":
                return "text-yellow-400 bg-yellow-500/10";
            case "Low":
            case "Info":
                return "text-blue-400 bg-blue-500/10";
            case "Success":
            case "Healthy":
            case "Resolved":
            case "Active":
                return "text-green-400 bg-green-500/10";
            case "Paused":
                return "text-gray-400 bg-gray-500/10";
            default:
                return "text-gray-300 bg-gray-700";
        }
    };

    return (
        <div className="p-3 min-h-screen text-white space-y-4 text-sm" >
            {/* ===== TOP SUMMARY CARDS ===== */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                {networkdevicecount.map((item, index) => {
                    const icons = [
                        <AlertTriangle size={24} />,
                        <ShieldCheck size={24} />,
                        <Activity size={24} />,
                        <Clock3 size={24} />,
                    ];

                    return (
                        <div
                            key={item.id}
                            className="bg-[#0f172a] rounded-2xl p-5 border border-gray-800 shadow-lg"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-400 text-sm">{item.title}</p>
                                    <h2 className="text-2xl font-semibold mt-2">{item.count}</h2>
                                </div>

                                <div className="h-12 w-12 rounded-xl bg-[#1e293b] flex items-center justify-center text-cyan-400">
                                    {icons[index]}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* ===== SECOND ROW ===== */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 items-stretch">
                {/* ===== REAL TIME ALERTS ===== */}
                <div className="xl:col-span-2 bg-[#0f172a] rounded-2xl border border-gray-800 p-4 flex flex-col h-[640px]">
                    <div className="flex justify-between items-center mb-4 flex-shrink-0">
                        <div>
                            <h2 className="text-xl font-semibold"> Real-Time Alerts </h2>
                            <p className="text-gray-400 text-xs"> Live monitoring alerts from network devices </p>
                        </div>

                        <div className="flex items-center gap-2 text-green-400 text-sm">
                            <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse"></span>  Live
                        </div>
                    </div>

                    <div className="overflow-y-auto hide-scrollbar flex-1 space-y-4 pr-1">
                        {alerts.map((alert, index) => (
                            <div key={index} className="bg-[#111c2d] border border-gray-800 rounded-xl p-4 hover:border-cyan-500/30 transition" >
                                <div className="flex items-start justify-between gap-3">
                                    <div className="flex items-start gap-3">
                                        <div className={`p-2 rounded-lg ${getSeverityColor( alert.severity )}`} > <AlertTriangle size={18} /> </div>

                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h3 className="font-medium">{alert.device}</h3>
                                                <span className={`text-xs px-2 py-1 rounded-full ${getSeverityColor( alert.severity )}`}  >
                                                    {alert.severity}
                                                </span>
                                            </div>

                                            <p className="text-gray-300 text-sm mt-1"> {alert.message} </p>

                                            <div className="flex gap-4 mt-3 text-xs text-gray-400">
                                                <span>{alert.time}</span>
                                                <span>Status: {alert.status}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ===== RIGHT SIDEBAR ===== */}
                <div className="flex flex-col gap-4 h-[640px]">
                    {/* ===== DEVICE HEALTH ===== */}
                    <div className="bg-[#0f172a] rounded-2xl border border-gray-800 p-4 flex flex-col flex-1 min-h-0">
                        <div className="mb-4 flex-shrink-0">
                            <h2 className="text-lg font-semibold">Device Health</h2>
                            <p className="text-gray-400 text-xs">
                                Infrastructure performance overview
                            </p>
                        </div>

                        <div className="overflow-y-auto hide-scrollbar space-y-4 pr-1">
                            {deviceHealth.map((device, index) => (
                                <div
                                    key={index}
                                    className="bg-[#111c2d] border border-gray-800 rounded-xl p-4"
                                >
                                    <div className="flex justify-between items-center mb-3">
                                        <div className="flex items-center gap-2">
                                            <Server size={16} className="text-cyan-400" />
                                            <h3 className="font-medium text-sm">{device.name}</h3>
                                        </div>

                                        <span
                                            className={`text-xs px-2 py-1 rounded-full ${getSeverityColor(
                                                device.status
                                            )}`}
                                        >
                                            {device.status}
                                        </span>
                                    </div>

                                    <div className="space-y-3">
                                        {/* CPU */}
                                        <div>
                                            <div className="flex justify-between text-xs mb-1">
                                                <span className="flex items-center gap-1">
                                                    <Cpu size={13} />
                                                    CPU
                                                </span>
                                                <span>{device.cpu}%</span>
                                            </div>

                                            <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-cyan-400 rounded-full"
                                                    style={{ width: `${device.cpu}%` }}
                                                ></div>
                                            </div>
                                        </div>

                                        {/* MEMORY */}
                                        <div>
                                            <div className="flex justify-between text-xs mb-1">
                                                <span className="flex items-center gap-1">
                                                    <MemoryStick size={13} />
                                                    Memory
                                                </span>
                                                <span>{device.memory}%</span>
                                            </div>

                                            <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-green-400 rounded-full"
                                                    style={{ width: `${device.memory}%` }}
                                                ></div>
                                            </div>
                                        </div>

                                        <div className="text-xs text-gray-400 pt-1">
                                            Uptime: {device.uptime}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ===== SCHEDULED TASKS ===== */}
                    <div className="bg-[#0f172a] rounded-2xl border border-gray-800 p-4 flex flex-col flex-1 min-h-0">
                        <div className="mb-4 flex-shrink-0">
                            <h2 className="text-lg font-semibold">Scheduled Tasks</h2>
                            <p className="text-gray-400 text-xs">
                                Automation & maintenance jobs
                            </p>
                        </div>

                        <div className="overflow-y-auto hide-scrollbar space-y-3 pr-1">
                            {scheduledTasks.map((task, index) => (
                                <div
                                    key={index}
                                    className="bg-[#111c2d] border border-gray-800 rounded-xl p-4"
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-medium text-sm">{task.task}</h3>

                                        <span
                                            className={`text-xs px-2 py-1 rounded-full ${getSeverityColor(
                                                task.status
                                            )}`}
                                        >
                                            {task.status}
                                        </span>
                                    </div>

                                    <div className="space-y-1 text-xs text-gray-400">
                                        <p>Devices: {task.devices}</p>
                                        <p>Schedule: {task.schedule}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

           
            <div className="bg-[#0f172a] rounded-2xl border border-gray-800 p-4">
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h2 className="text-xl font-semibold">Event Stream Logs</h2>
                        <p className="text-gray-400 text-sm">
                            Real-time network monitoring events
                        </p>
                    </div>

                    <div className="flex items-center gap-2 text-cyan-400 text-sm">
                        <CheckCircle2 size={16} /> Streaming Active
                    </div>
                </div>

                <div className="overflow-x-auto rounded-xl border border-gray-800">
                 
                    <div className="bg-[#0f172a] rounded-2xl p-2 shadow-lg">                      
                       
                        {/* TERMINAL LOG BOX */}
                        <div className="bg-[#020c22] rounded-xl h-[280px] overflow-y-auto hide-scrollbar">

                            <div className="space-y-1 font-mono text-sm p-2 text-green-400">

                                <p>[INFO] Device discovery completed successfully</p>

                                <p>[INFO] SNMP polling started for 48 devices</p>

                                <p>[WARNING] High CPU utilization detected on Core Switch</p>

                                <p>[ALERT] Vulnerable firmware identified on FortiGate Firewall</p>

                                <p>[INFO] Configuration backup completed for Branch Router</p>

                                <p>[SUCCESS] Firmware compliance scan completed</p>

                                <p>[INFO] Firewall policy synchronized</p>

                                <p>[WARNING] Interface Gi0/1 packet drops increased</p>

                                <p>[INFO] VPN tunnel connectivity restored</p>

                                <p>[SUCCESS] Patch deployment completed on 12 devices</p>

                                <p>[ALERT] Unauthorized login attempt detected</p>

                                <p>[INFO] Syslog event forwarded to SIEM collector</p>

                                <p>[SUCCESS] Device health check completed</p>

                                <p>[WARNING] Memory utilization exceeded threshold</p>

                                <p>[INFO] Scheduled compliance task started</p>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewNetworkMonitoringAlertsDashboard;