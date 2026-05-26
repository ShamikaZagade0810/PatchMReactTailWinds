import React from 'react'

export default function ConfigurationManagerDashboard() {
  const configurations = [
    {
      device: 'FortiGate Firewall',
      vendor: 'Fortinet',
      lastBackup: '26-May-2026 10:20 PM',
      configVersion: 'v12',
      status: 'Protected',
    },
    {
      device: 'Core Switch',
      vendor: 'Cisco',
      lastBackup: '26-May-2026 09:10 PM',
      configVersion: 'v8',
      status: 'Changed',
    },
    {
      device: 'Branch Router',
      vendor: 'Juniper',
      lastBackup: '25-May-2026 11:45 PM',
      configVersion: 'v5',
      status: 'Protected',
    },
    {
      device: 'Wireless Controller',
      vendor: 'Aruba',
      lastBackup: '24-May-2026 08:00 PM',
      configVersion: 'v4',
      status: 'Backup Failed',
    },
  ];

  const compliancePolicies = [
    {
      policy: 'SSH Enabled',
      compliant: 44,
      failed: 4,
    },
    {
      policy: 'Telnet Disabled',
      compliant: 40,
      failed: 8,
    },
    {
      policy: 'SNMPv3 Configured',
      compliant: 38,
      failed: 10,
    },
  ];

  const auditLogs = [
    {
      user: 'admin',
      action: 'Configuration Modified',
      device: 'Core Switch',
      time: '26-May-2026 11:15 PM',
    },
    {
      user: 'system',
      action: 'Backup Completed',
      device: 'FortiGate Firewall',
      time: '26-May-2026 10:20 PM',
    },
    {
      user: 'networkops',
      action: 'Rollback Executed',
      device: 'Branch Router',
      time: '25-May-2026 09:00 PM',
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Protected':
        return 'bg-green-100 text-green-700';
      case 'Changed':
        return 'bg-yellow-100 text-yellow-700';
      case 'Backup Failed':
        return 'bg-red-100 text-red-700';
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
              Network Configuration Manager
            </h1>
            <p className="text-gray-500 mt-2">
              Centralized configuration backup, compliance and change management
            </p>
          </div>

          <div className="flex gap-3">
            <button className="bg-gray-800 hover:bg-gray-900 text-white px-5 py-3 rounded-2xl shadow-lg">
              Backup All Devices
            </button>

            <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-2xl shadow-lg">
              Add Compliance Policy
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          <div className="bg-white rounded-2xl shadow-md p-5">
            <h2 className="text-gray-500 text-sm">Managed Devices</h2>
            <p className="text-3xl font-bold mt-3 text-blue-600">48</p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-5">
            <h2 className="text-gray-500 text-sm">Successful Backups</h2>
            <p className="text-3xl font-bold mt-3 text-green-600">44</p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-5">
            <h2 className="text-gray-500 text-sm">Config Changes</h2>
            <p className="text-3xl font-bold mt-3 text-yellow-600">6</p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-5">
            <h2 className="text-gray-500 text-sm">Policy Violations</h2>
            <p className="text-3xl font-bold mt-3 text-red-600">10</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="p-5 border-b flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-gray-800">
              Device Configuration Repository
            </h2>

            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Search device..."
                className="border rounded-xl px-4 py-2"
              />

              <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl text-sm">
                Export Configs
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-4">Device</th>
                  <th className="p-4">Vendor</th>
                  <th className="p-4">Last Backup</th>
                  <th className="p-4">Config Version</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Action</th>
                </tr>
              </thead>

              <tbody>
                {configurations.map((config, index) => (
                  <tr key={index} className="border-t hover:bg-gray-50">
                    <td className="p-4 font-medium">{config.device}</td>
                    <td className="p-4">{config.vendor}</td>
                    <td className="p-4">{config.lastBackup}</td>
                    <td className="p-4">{config.configVersion}</td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                          config.status
                        )}`}
                      >
                        {config.status}
                      </span>
                    </td>
                    <td className="p-4 flex gap-2">
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm">
                        Backup
                      </button>

                      <button className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-xl text-sm">
                        Restore
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
                Compliance Policies
              </h2>
            </div>

            <div className="divide-y">
              {compliancePolicies.map((policy, index) => (
                <div
                  key={index}
                  className="p-5 flex items-center justify-between"
                >
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {policy.policy}
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      {policy.compliant} compliant • {policy.failed} failed
                    </p>
                  </div>

                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm">
                    View Report
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md overflow-hidden">
            <div className="p-5 border-b">
              <h2 className="text-2xl font-semibold text-gray-800">
                Configuration Difference Viewer
              </h2>
            </div>

            <div className="bg-gray-900 text-green-400 p-5 font-mono text-sm overflow-x-auto">
              <pre>
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

        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="p-5 border-b flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-gray-800">
              Configuration Audit Logs
            </h2>

            <button className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-xl text-sm">
              Export Logs
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-4">User</th>
                  <th className="p-4">Action</th>
                  <th className="p-4">Device</th>
                  <th className="p-4">Timestamp</th>
                </tr>
              </thead>

              <tbody>
                {auditLogs.map((log, index) => (
                  <tr key={index} className="border-t hover:bg-gray-50">
                    <td className="p-4 font-medium">{log.user}</td>
                    <td className="p-4">{log.action}</td>
                    <td className="p-4">{log.device}</td>
                    <td className="p-4 text-gray-500">{log.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="p-5 border-b">
            <h2 className="text-2xl font-semibold text-gray-800">
              Automated Workflow
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 p-6">
            {[
              'Discover Devices',
              'Fetch Configurations',
              'Store Secure Backup',
              'Check Compliance',
              'Generate Alerts',
            ].map((step, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-2xl p-5 text-center shadow-sm"
              >
                <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center mx-auto mb-3 text-lg font-bold">
                  {index + 1}
                </div>

                <p className="font-medium text-gray-700">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
