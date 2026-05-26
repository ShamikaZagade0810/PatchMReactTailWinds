import React from 'react'
export default function NetworkMonitoringAlertsDashboard() {
  const alerts = [
    {
      severity: 'Critical',
      device: 'FortiGate Firewall',
      message: 'Firmware vulnerability detected',
      time: '2 mins ago',
      status: 'Open',
    },
    {
      severity: 'High',
      device: 'Core Switch',
      message: 'Configuration changed detected',
      time: '10 mins ago',
      status: 'Investigating',
    },
    {
      severity: 'Medium',
      device: 'Branch Router',
      message: 'CPU utilization exceeded 85%',
      time: '20 mins ago',
      status: 'Open',
    },
    {
      severity: 'Low',
      device: 'Wireless Controller',
      message: 'Backup completed successfully',
      time: '35 mins ago',
      status: 'Resolved',
    },
  ];

  const deviceHealth = [
    {
      name: 'FortiGate Firewall',
      cpu: 72,
      memory: 68,
      uptime: '42 Days',
      status: 'Healthy',
    },
    {
      name: 'Core Switch',
      cpu: 88,
      memory: 81,
      uptime: '105 Days',
      status: 'Warning',
    },
    {
      name: 'Branch Router',
      cpu: 34,
      memory: 45,
      uptime: '66 Days',
      status: 'Healthy',
    },
  ];

  const scheduledTasks = [
    {
      task: 'Nightly Config Backup',
      devices: 42,
      schedule: '11:00 PM Daily',
      status: 'Active',
    },
    {
      task: 'Firmware Compliance Scan',
      devices: 48,
      schedule: 'Every Sunday',
      status: 'Active',
    },
    {
      task: 'Security Audit',
      devices: 20,
      schedule: 'Monthly',
      status: 'Paused',
    },
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'Critical':
        return 'bg-red-100 text-red-700';
      case 'High':
        return 'bg-orange-100 text-orange-700';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-700';
      case 'Low':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getHealthColor = (status) => {
    switch (status) {
      case 'Healthy':
        return 'bg-green-100 text-green-700';
      case 'Warning':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">
              Network Monitoring & Alerts
            </h1>
            <p className="text-gray-500 mt-2">
              Real-time monitoring, health tracking and alert management
            </p>
          </div>

          <button className="bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-2xl shadow-lg">
            View Critical Alerts
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          <div className="bg-white rounded-2xl shadow-md p-5">
            <h2 className="text-gray-500 text-sm">Active Alerts</h2>
            <p className="text-3xl font-bold mt-3 text-red-600">18</p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-5">
            <h2 className="text-gray-500 text-sm">Healthy Devices</h2>
            <p className="text-3xl font-bold mt-3 text-green-600">39</p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-5">
            <h2 className="text-gray-500 text-sm">Warning Devices</h2>
            <p className="text-3xl font-bold mt-3 text-yellow-600">7</p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-5">
            <h2 className="text-gray-500 text-sm">Tasks Scheduled</h2>
            <p className="text-3xl font-bold mt-3 text-blue-600">12</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="p-5 border-b flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-gray-800">
              Real-Time Alerts
            </h2>

            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm">
              Export Alerts
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-4">Severity</th>
                  <th className="p-4">Device</th>
                  <th className="p-4">Alert Message</th>
                  <th className="p-4">Time</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Action</th>
                </tr>
              </thead>

              <tbody>
                {alerts.map((alert, index) => (
                  <tr key={index} className="border-t hover:bg-gray-50">
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getSeverityColor(
                          alert.severity
                        )}`}
                      >
                        {alert.severity}
                      </span>
                    </td>
                    <td className="p-4 font-medium">{alert.device}</td>
                    <td className="p-4">{alert.message}</td>
                    <td className="p-4 text-gray-500">{alert.time}</td>
                    <td className="p-4">{alert.status}</td>
                    <td className="p-4">
                      <button className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-xl text-sm">
                        Investigate
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow-md overflow-hidden">
            <div className="p-5 border-b">
              <h2 className="text-2xl font-semibold text-gray-800">
                Device Health Overview
              </h2>
            </div>

            <div className="divide-y">
              {deviceHealth.map((device, index) => (
                <div
                  key={index}
                  className="p-5 flex items-center justify-between"
                >
                  <div className="space-y-2 w-full">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-gray-800">
                        {device.name}
                      </h3>

                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getHealthColor(
                          device.status
                        )}`}
                      >
                        {device.status}
                      </span>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>CPU Usage</span>
                        <span>{device.cpu}%</span>
                      </div>

                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="bg-blue-600 h-3 rounded-full"
                          style={{ width: `${device.cpu}%` }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Memory Usage</span>
                        <span>{device.memory}%</span>
                      </div>

                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="bg-green-600 h-3 rounded-full"
                          style={{ width: `${device.memory}%` }}
                        ></div>
                      </div>
                    </div>

                    <p className="text-sm text-gray-500">
                      Uptime: {device.uptime}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md overflow-hidden">
            <div className="p-5 border-b flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-gray-800">
                Scheduled Automation Tasks
              </h2>

              <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl text-sm">
                Create Task
              </button>
            </div>

            <div className="divide-y">
              {scheduledTasks.map((task, index) => (
                <div
                  key={index}
                  className="p-5 flex items-center justify-between"
                >
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {task.task}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {task.devices} Devices • {task.schedule}
                    </p>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      task.status === 'Active'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {task.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="p-5 border-b flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-gray-800">
              Event Stream Logs
            </h2>

            <button className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-xl text-sm">
              Live Monitoring
            </button>
          </div>

          <div className="bg-gray-900 text-green-400 p-5 font-mono text-sm overflow-x-auto">
            <pre>
{`[INFO] Device discovery completed successfully
[INFO] SNMP polling started for 48 devices
[WARNING] High CPU utilization detected on Core Switch
[ALERT] Vulnerable firmware identified on FortiGate Firewall
[INFO] Configuration backup completed for Branch Router
[SUCCESS] Firmware compliance scan completed`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
