import React from 'react'

export default function NetworkPatchDashboard() {
  const devices = [
    {
      id: 1,
      device: "FortiGate Firewall",
      vendor: "Fortinet",
      model: "30E",
      firmware: "7.0.8",
      latest: "7.0.12",
      status: "Critical",
      ip: "192.168.1.1",
    },
    {
      id: 2,
      device: "Core Switch",
      vendor: "Cisco",
      model: "Catalyst 2960",
      firmware: "15.2",
      latest: "15.2.7",
      status: "Outdated",
      ip: "192.168.1.10",
    },
    {
      id: 3,
      device: "Branch Router",
      vendor: "Juniper",
      model: "SRX300",
      firmware: "21.2R1",
      latest: "21.4R3",
      status: "Compliant",
      ip: "192.168.1.20",
    },
    {
      id: 4,
      device: "Wireless Controller",
      vendor: "Aruba",
      model: "7205",
      firmware: "8.6.0",
      latest: "8.10.0",
      status: "Medium",
      ip: "192.168.1.50",
    },
  ];

  const backups = [
    {
      device: "FortiGate Firewall",
      date: "26-May-2026 10:20 AM",
      status: "Success",
    },
    {
      device: "Core Switch",
      date: "26-May-2026 09:40 AM",
      status: "Success",
    },
    {
      device: "Wireless Controller",
      date: "25-May-2026 11:15 PM",
      status: "Failed",
    },
  ];

  const vulnerabilities = [
    {
      cve: "CVE-2026-1001",
      device: "FortiGate Firewall",
      severity: "Critical",
    },
    {
      cve: "CVE-2026-2044",
      device: "Core Switch",
      severity: "High",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Critical":
        return "bg-red-100 text-red-700";
      case "Outdated":
        return "bg-orange-100 text-orange-700";
      case "Medium":
        return "bg-yellow-100 text-yellow-700";
      case "Compliant":
        return "bg-green-100 text-green-700";
      case "Success":
        return "bg-green-100 text-green-700";
      case "Failed":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">
              Network Device Patch Management
            </h1>
            <p className="text-gray-500 mt-2">
              Unified dashboard for inventory, configuration backup and
              firmware patching
            </p>
          </div>

          <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-2xl shadow-lg">
            Discover Devices
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          <div className="bg-white rounded-2xl shadow-md p-5">
            <h2 className="text-gray-500 text-sm">Total Devices</h2>
            <p className="text-3xl font-bold mt-3">48</p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-5">
            <h2 className="text-gray-500 text-sm">Outdated Devices</h2>
            <p className="text-3xl font-bold mt-3 text-orange-600">12</p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-5">
            <h2 className="text-gray-500 text-sm">Critical Vulnerabilities</h2>
            <p className="text-3xl font-bold mt-3 text-red-600">5</p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-5">
            <h2 className="text-gray-500 text-sm">Backup Success Rate</h2>
            <p className="text-3xl font-bold mt-3 text-green-600">96%</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="p-5 border-b">
            <h2 className="text-2xl font-semibold text-gray-800">
              Device Inventory & Patch Status
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-4">Device</th>
                  <th className="p-4">Vendor</th>
                  <th className="p-4">Model</th>
                  <th className="p-4">IP Address</th>
                  <th className="p-4">Current Firmware</th>
                  <th className="p-4">Latest Firmware</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Action</th>
                </tr>
              </thead>

              <tbody>
                {devices.map((device) => (
                  <tr key={device.id} className="border-t hover:bg-gray-50">
                    <td className="p-4 font-medium">{device.device}</td>
                    <td className="p-4">{device.vendor}</td>
                    <td className="p-4">{device.model}</td>
                    <td className="p-4">{device.ip}</td>
                    <td className="p-4">{device.firmware}</td>
                    <td className="p-4">{device.latest}</td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                          device.status
                        )}`}
                      >
                        {device.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm">
                        Deploy Patch
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
                Configuration Backup History
              </h2>
            </div>

            <div className="divide-y">
              {backups.map((backup, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-5"
                >
                  <div>
                    <p className="font-medium text-gray-800">
                      {backup.device}
                    </p>
                    <p className="text-sm text-gray-500">{backup.date}</p>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                      backup.status
                    )}`}
                  >
                    {backup.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md overflow-hidden">
            <div className="p-5 border-b">
              <h2 className="text-2xl font-semibold text-gray-800">
                Vulnerability Mapping
              </h2>
            </div>

            <div className="divide-y">
              {vulnerabilities.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-5"
                >
                  <div>
                    <p className="font-semibold text-gray-800">{item.cve}</p>
                    <p className="text-sm text-gray-500">{item.device}</p>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                      item.severity
                    )}`}
                  >
                    {item.severity}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-2xl font-semibold text-gray-800">
              Patch Deployment Workflow
            </h2>

            <button className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-2xl">
              Schedule Upgrade
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              "Device Discovery",
              "Firmware Detection",
              "Patch Recommendation",
              "Deployment",
              "Verification",
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


function ComplianceSection() {
  const complianceData = [
    {
      policy: "SSH Enabled",
      compliant: 42,
      nonCompliant: 6,
    },
    {
      policy: "SNMPv3 Configured",
      compliant: 38,
      nonCompliant: 10,
    },
    {
      policy: "Default Password Removed",
      compliant: 45,
      nonCompliant: 3,
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden mt-6">
      <div className="p-5 border-b">
        <h2 className="text-2xl font-semibold text-gray-800">
          Compliance & Security Policies
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-4">Policy</th>
              <th className="p-4">Compliant Devices</th>
              <th className="p-4">Non-Compliant Devices</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>

          <tbody>
            {complianceData.map((item, index) => (
              <tr key={index} className="border-t hover:bg-gray-50">
                <td className="p-4 font-medium">{item.policy}</td>
                <td className="p-4 text-green-600 font-semibold">
                  {item.compliant}
                </td>
                <td className="p-4 text-red-600 font-semibold">
                  {item.nonCompliant}
                </td>
                <td className="p-4">
                  {item.nonCompliant > 5 ? (
                    <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">
                      Attention Needed
                    </span>
                  ) : (
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                      Healthy
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ConfigDiffViewer() {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden mt-6">
      <div className="p-5 border-b flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-800">
          Configuration Difference Viewer
        </h2>

        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm">
          Compare Configurations
        </button>
      </div>

      <div className="p-5 bg-gray-900 text-green-400 font-mono text-sm overflow-x-auto">
        <pre>
{`- telnet enable
+ ssh enable

- snmp-server community public
+ snmp-server group secure v3

- vlan 100
+ vlan 200`}
        </pre>
      </div>
    </div>
  );
}

function TopologyOverview() {
  const nodes = [
    "Core Firewall",
    "Core Switch",
    "Distribution Switch",
    "Branch Router",
    "Wireless Controller",
  ];

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden mt-6 mb-10">
      <div className="p-5 border-b">
        <h2 className="text-2xl font-semibold text-gray-800">
          Network Topology Overview
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 p-6">
        {nodes.map((node, index) => (
          <div
            key={index}
            className="bg-blue-50 border border-blue-200 rounded-2xl p-5 text-center shadow-sm"
          >
            <div className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center mx-auto mb-4 text-lg font-bold">
              {index + 1}
            </div>

            <h3 className="font-semibold text-gray-700">{node}</h3>
            <p className="text-sm text-gray-500 mt-2">Online</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ExtendedSections() {
  return (
    <div className="max-w-7xl mx-auto px-6">
      <ComplianceSection />
      <ConfigDiffViewer />
      <TopologyOverview />
    </div>
  );
}
