import React from 'react'
export default function FirmwareInventoryDashboard() {
  const firmwareInventory = [
    {
      device: 'FortiGate Firewall',
      vendor: 'Fortinet',
      model: '30E',
      currentVersion: '7.0.8',
      latestVersion: '7.0.12',
      releaseDate: '12-Apr-2026',
      vulnerability: 'Critical',
      compliance: 'Outdated',
    },
    {
      device: 'Core Switch',
      vendor: 'Cisco',
      model: 'Catalyst 2960',
      currentVersion: '15.2',
      latestVersion: '15.2.7',
      releaseDate: '22-Mar-2026',
      vulnerability: 'High',
      compliance: 'Outdated',
    },
    {
      device: 'Branch Router',
      vendor: 'Juniper',
      model: 'SRX300',
      currentVersion: '21.4R3',
      latestVersion: '21.4R3',
      releaseDate: '18-Feb-2026',
      vulnerability: 'None',
      compliance: 'Compliant',
    },
    {
      device: 'Wireless Controller',
      vendor: 'Aruba',
      model: '7205',
      currentVersion: '8.6.0',
      latestVersion: '8.10.0',
      releaseDate: '11-May-2026',
      vulnerability: 'Medium',
      compliance: 'Outdated',
    },
  ];

  const firmwareRepository = [
    {
      fileName: 'FortiOS-7.0.12.img',
      vendor: 'Fortinet',
      size: '1.4 GB',
      checksum: 'SHA256-A1B2C3D4',
      uploadDate: '20-May-2026',
    },
    {
      fileName: 'Cisco-IOS-15.2.7.bin',
      vendor: 'Cisco',
      size: '850 MB',
      checksum: 'SHA256-X7Y8Z9K0',
      uploadDate: '18-May-2026',
    },
    {
      fileName: 'JunOS-21.4R3.tgz',
      vendor: 'Juniper',
      size: '2.1 GB',
      checksum: 'SHA256-P9Q8R7S6',
      uploadDate: '10-May-2026',
    },
  ];

  const getSeverityColor = (value) => {
    switch (value) {
      case 'Critical':
        return 'bg-red-100 text-red-700';
      case 'High':
        return 'bg-orange-100 text-orange-700';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-700';
      case 'Compliant':
      case 'None':
        return 'bg-green-100 text-green-700';
      case 'Outdated':
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
              Firmware Inventory Management
            </h1>
            <p className="text-gray-500 mt-2">
              Track firmware lifecycle, compliance and vulnerability exposure
            </p>
          </div>

          <div className="flex gap-3">
            <button className="bg-gray-800 hover:bg-gray-900 text-white px-5 py-3 rounded-2xl shadow-lg">
              Scan Firmware
            </button>

            <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-2xl shadow-lg">
              Upload Firmware
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          <div className="bg-white rounded-2xl shadow-md p-5">
            <h2 className="text-gray-500 text-sm">Managed Devices</h2>
            <p className="text-3xl font-bold mt-3 text-blue-600">48</p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-5">
            <h2 className="text-gray-500 text-sm">Outdated Firmware</h2>
            <p className="text-3xl font-bold mt-3 text-red-600">12</p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-5">
            <h2 className="text-gray-500 text-sm">Critical CVEs</h2>
            <p className="text-3xl font-bold mt-3 text-orange-600">5</p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-5">
            <h2 className="text-gray-500 text-sm">Compliance Score</h2>
            <p className="text-3xl font-bold mt-3 text-green-600">82%</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="p-5 border-b flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-gray-800">
              Firmware Inventory Repository
            </h2>

            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Search firmware or device..."
                className="border rounded-xl px-4 py-2"
              />

              <select className="border rounded-xl px-4 py-2">
                <option>All Vendors</option>
                <option>Fortinet</option>
                <option>Cisco</option>
                <option>Juniper</option>
                <option>Aruba</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-4">Device</th>
                  <th className="p-4">Vendor</th>
                  <th className="p-4">Model</th>
                  <th className="p-4">Current Version</th>
                  <th className="p-4">Latest Version</th>
                  <th className="p-4">Release Date</th>
                  <th className="p-4">Vulnerability</th>
                  <th className="p-4">Compliance</th>
                  <th className="p-4">Action</th>
                </tr>
              </thead>

              <tbody>
                {firmwareInventory.map((item, index) => (
                  <tr key={index} className="border-t hover:bg-gray-50">
                    <td className="p-4 font-medium">{item.device}</td>
                    <td className="p-4">{item.vendor}</td>
                    <td className="p-4">{item.model}</td>
                    <td className="p-4">{item.currentVersion}</td>
                    <td className="p-4">{item.latestVersion}</td>
                    <td className="p-4">{item.releaseDate}</td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getSeverityColor(
                          item.vulnerability
                        )}`}
                      >
                        {item.vulnerability}
                      </span>
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getSeverityColor(
                          item.compliance
                        )}`}
                      >
                        {item.compliance}
                      </span>
                    </td>
                    <td className="p-4">
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm">
                        Upgrade
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
            <div className="p-5 border-b flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-gray-800">
                Firmware Repository Files
              </h2>

              <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl text-sm">
                Add File
              </button>
            </div>

            <div className="divide-y">
              {firmwareRepository.map((file, index) => (
                <div key={index} className="p-5 flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {file.fileName}
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      {file.vendor} • Uploaded on {file.uploadDate}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="font-medium text-gray-700">{file.size}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {file.checksum}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md overflow-hidden">
            <div className="p-5 border-b">
              <h2 className="text-2xl font-semibold text-gray-800">
                Firmware Lifecycle Workflow
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-4 p-6">
              {[
                'Discover Device Firmware',
                'Detect Vulnerabilities',
                'Validate Compatibility',
                'Upload Approved Firmware',
                'Schedule Deployment',
                'Generate Compliance Report',
              ].map((step, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-2xl p-5 flex items-center gap-4"
                >
                  <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg">
                    {index + 1}
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-800">{step}</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Automated firmware inventory workflow
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="p-5 border-b flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-gray-800">
              Firmware Vulnerability Event Logs
            </h2>

            <button className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-xl text-sm">
              Export Report
            </button>
          </div>

          <div className="bg-gray-900 text-green-400 p-5 font-mono text-sm overflow-x-auto">
            <pre>
{`[INFO] Firmware inventory scan started
[INFO] 48 devices scanned successfully
[WARNING] FortiGate Firewall running outdated firmware 7.0.8
[ALERT] Critical CVE detected in Cisco IOS 15.2
[INFO] Firmware compliance report generated
[SUCCESS] Firmware repository synchronized`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
