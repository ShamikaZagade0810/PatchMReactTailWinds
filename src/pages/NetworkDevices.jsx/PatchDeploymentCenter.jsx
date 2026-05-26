import React from 'react'

export default function PatchDeploymentCenter() {
  const deployments = [
    {
      device: "FortiGate Firewall",
      vendor: "Fortinet",
      currentVersion: "7.0.8",
      targetVersion: "7.0.12",
      schedule: "26-May-2026 11:00 PM",
      status: "Scheduled",
      progress: 0,
    },
    {
      device: "Core Switch",
      vendor: "Cisco",
      currentVersion: "15.2",
      targetVersion: "15.2.7",
      schedule: "26-May-2026 10:30 PM",
      status: "In Progress",
      progress: 65,
    },
    {
      device: "Branch Router",
      vendor: "Juniper",
      currentVersion: "21.2R1",
      targetVersion: "21.4R3",
      schedule: "27-May-2026 01:00 AM",
      status: "Completed",
      progress: 100,
    },
    {
      device: "Wireless Controller",
      vendor: "Aruba",
      currentVersion: "8.6.0",
      targetVersion: "8.10.0",
      schedule: "27-May-2026 02:30 AM",
      status: "Failed",
      progress: 100,
    },
  ];

  const firmwareRepository = [
    {
      file: "FortiOS-7.0.12.img",
      vendor: "Fortinet",
      size: "1.4 GB",
      uploadedBy: "Admin",
    },
    {
      file: "Cisco-IOS-15.2.7.bin",
      vendor: "Cisco",
      size: "850 MB",
      uploadedBy: "System",
    },
    {
      file: "JunOS-21.4R3.tgz",
      vendor: "Juniper",
      size: "2.1 GB",
      uploadedBy: "Admin",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Scheduled":
        return "bg-blue-100 text-blue-700";
      case "In Progress":
        return "bg-yellow-100 text-yellow-700";
      case "Completed":
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
              Firmware Deployment Center
            </h1>
            <p className="text-gray-500 mt-2">
              Centralized firmware deployment and upgrade orchestration
            </p>
          </div>

          <div className="flex gap-3">
            <button className="bg-gray-800 hover:bg-gray-900 text-white px-5 py-3 rounded-2xl shadow-lg">
              Upload Firmware
            </button>

            <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-2xl shadow-lg">
              Deploy Patch
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          <div className="bg-white rounded-2xl shadow-md p-5">
            <h2 className="text-gray-500 text-sm">Scheduled Jobs</h2>
            <p className="text-3xl font-bold mt-3 text-blue-600">14</p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-5">
            <h2 className="text-gray-500 text-sm">Running Deployments</h2>
            <p className="text-3xl font-bold mt-3 text-yellow-600">3</p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-5">
            <h2 className="text-gray-500 text-sm">Completed Today</h2>
            <p className="text-3xl font-bold mt-3 text-green-600">27</p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-5">
            <h2 className="text-gray-500 text-sm">Failed Deployments</h2>
            <p className="text-3xl font-bold mt-3 text-red-600">2</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="p-5 border-b flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-gray-800">
              Patch Deployment Jobs
            </h2>

            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Search device..."
                className="border rounded-xl px-4 py-2"
              />

              <select className="border rounded-xl px-4 py-2">
                <option>All Status</option>
                <option>Scheduled</option>
                <option>In Progress</option>
                <option>Completed</option>
                <option>Failed</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-4">Device</th>
                  <th className="p-4">Vendor</th>
                  <th className="p-4">Current Version</th>
                  <th className="p-4">Target Version</th>
                  <th className="p-4">Schedule</th>
                  <th className="p-4">Progress</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Action</th>
                </tr>
              </thead>

              <tbody>
                {deployments.map((item, index) => (
                  <tr key={index} className="border-t hover:bg-gray-50">
                    <td className="p-4 font-medium">{item.device}</td>
                    <td className="p-4">{item.vendor}</td>
                    <td className="p-4">{item.currentVersion}</td>
                    <td className="p-4">{item.targetVersion}</td>
                    <td className="p-4">{item.schedule}</td>
                    <td className="p-4 w-56">
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="bg-blue-600 h-3 rounded-full"
                          style={{ width: `${item.progress}%` }}
                        ></div>
                      </div>

                      <p className="text-xs text-gray-500 mt-1">
                        {item.progress}% Completed
                      </p>
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                          item.status
                        )}`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <button className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-xl text-sm">
                        View Logs
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
                Firmware Repository
              </h2>

              <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl text-sm">
                Add Firmware
              </button>
            </div>

            <div className="divide-y">
              {firmwareRepository.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-5"
                >
                  <div>
                    <p className="font-semibold text-gray-800">{file.file}</p>
                    <p className="text-sm text-gray-500">
                      {file.vendor} • Uploaded by {file.uploadedBy}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="font-medium text-gray-700">{file.size}</p>
                    <button className="text-blue-600 text-sm mt-1">
                      Download
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md overflow-hidden">
            <div className="p-5 border-b">
              <h2 className="text-2xl font-semibold text-gray-800">
                Deployment Workflow
              </h2>
            </div>

            <div className="p-6 space-y-5">
              {[
                "Upload Firmware",
                "Validate Device Compatibility",
                "Backup Current Configuration",
                "Deploy Firmware",
                "Reboot Device",
                "Post Validation",
              ].map((step, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 bg-gray-50 rounded-2xl p-4"
                >
                  <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg">
                    {index + 1}
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-800">{step}</h3>
                    <p className="text-sm text-gray-500">
                      Automated orchestration step
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="p-5 border-b">
            <h2 className="text-2xl font-semibold text-gray-800">
              Deployment Activity Logs
            </h2>
          </div>

          <div className="bg-gray-900 text-green-400 p-5 font-mono text-sm overflow-x-auto">
            <pre>
{`[INFO] Connecting to device 192.168.1.1
[INFO] Uploading firmware image FortiOS-7.0.12.img
[INFO] Backup configuration completed successfully
[INFO] Firmware validation passed
[INFO] Reboot initiated
[SUCCESS] Firmware upgraded successfully

[INFO] Connecting to device 192.168.1.10
[ERROR] Deployment failed due to insufficient storage`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
