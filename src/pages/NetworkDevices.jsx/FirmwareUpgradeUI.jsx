import React, { useState } from "react";

export default function FirmwareUpgradeUI() {
  const [showReadiness, setShowReadiness] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  const [progress, setProgress] = useState(65);

  const startUpgrade = () => {
    setShowProgress(true);
  };

  return (
    <div className="min-h-screen bg-[#081028] text-white p-6">
      {/* Header */}
      <h1 className="text-3xl font-bold mb-6">Device Inventory</h1>

      {/* Table */}
      <div className="bg-[#101935] rounded-xl overflow-hidden border border-gray-700">
        <table className="w-full">
          <thead className="bg-[#1B254B]">
            <tr>
              <th className="p-4 text-left">Device</th>
              <th className="p-4 text-left">Vendor</th>
              <th className="p-4 text-left">IP</th>
              <th className="p-4 text-left">Current Version</th>
              <th className="p-4 text-left">Latest Version</th>
              <th className="p-4 text-left">Compliance</th>
              <th className="p-4 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-t border-gray-700">
              <td className="p-4">MUM-EDGE-RTR-01</td>
              <td className="p-4">Cisco</td>
              <td className="p-4">10.20.14.1</td>
              <td className="p-4">17.3.3</td>
              <td className="p-4 text-cyan-400">17.9.4a</td>
              <td className="p-4">
                <span className="bg-orange-500/20 text-orange-400 px-3 py-1 rounded-full text-sm">
                  Outdated
                </span>
              </td>

              <td className="p-4">
                <button
                  onClick={() => setShowReadiness(true)}
                  className="bg-cyan-600 hover:bg-cyan-700 px-4 py-2 rounded-lg"
                >
                  Upgrade
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Readiness Modal */}
      {showReadiness && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="bg-[#101935] w-[550px] rounded-2xl p-6 border border-gray-700">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">
                Device Upgrade Readiness
              </h2>

              <button onClick={() => setShowReadiness(false)}>✕</button>
            </div>

            <div className="space-y-4">
              <div className="bg-[#0D1630] p-4 rounded-xl">
                <div className="flex justify-between">
                  <span>Device Reachable</span>
                  <span className="text-green-400">✓</span>
                </div>
              </div>

              <div className="bg-[#0D1630] p-4 rounded-xl">
                <div className="flex justify-between">
                  <span>SSH Accessible</span>
                  <span className="text-green-400">✓</span>
                </div>
              </div>

              <div className="bg-[#0D1630] p-4 rounded-xl">
                <div className="flex justify-between">
                  <span>File Transfer Service</span>
                  <span className="text-red-400">Disabled</span>
                </div>
              </div>

              <div className="bg-orange-500/10 border border-orange-500 p-4 rounded-xl text-orange-300">
                File Transfer Service configuration required before upgrade.
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setShowReadiness(false);
                  setShowConfig(true);
                }}
                className="bg-cyan-600 hover:bg-cyan-700 px-5 py-2 rounded-lg"
              >
                Configure
              </button>

              <button className="border border-gray-600 px-5 py-2 rounded-lg">
                Revalidate
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Configuration Modal */}
      {showConfig && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="bg-[#101935] w-[650px] rounded-2xl p-6 border border-gray-700">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Device Configuration</h2>

              <button onClick={() => setShowConfig(false)}>✕</button>
            </div>

            <div className="space-y-5">
              {/* Protocol */}
              <div>
                <label className="block mb-2 text-gray-300">
                  Transfer Protocol
                </label>

                <select className="w-full bg-[#0D1630] border border-gray-700 rounded-lg p-3">
                  <option>SCP</option>
                  <option>SFTP</option>
                  <option>TFTP</option>
                </select>
              </div>

              {/* Enable Service */}
              <div className="flex items-center gap-3">
                <input type="checkbox" defaultChecked />
                <label>Enable File Transfer Service</label>
              </div>

              {/* Repository IP */}
              <div>
                <label className="block mb-2 text-gray-300">
                  Repository IP
                </label>

                <input
                  type="text"
                  defaultValue="10.10.10.5"
                  className="w-full bg-[#0D1630] border border-gray-700 rounded-lg p-3"
                />
              </div>

              {/* Repository Path */}
              <div>
                <label className="block mb-2 text-gray-300">
                  Repository Path
                </label>

                <input
                  type="text"
                  defaultValue="/firmware/cisco/"
                  className="w-full bg-[#0D1630] border border-gray-700 rounded-lg p-3"
                />
              </div>

              {/* Username */}
              <div>
                <label className="block mb-2 text-gray-300">
                  Username
                </label>

                <input
                  type="text"
                  defaultValue="admin"
                  className="w-full bg-[#0D1630] border border-gray-700 rounded-lg p-3"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block mb-2 text-gray-300">
                  Password
                </label>

                <input
                  type="password"
                  defaultValue="password"
                  className="w-full bg-[#0D1630] border border-gray-700 rounded-lg p-3"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button className="border border-gray-600 px-5 py-2 rounded-lg">
                Test Connection
              </button>

              <button
                onClick={() => {
                  setShowConfig(false);
                  startUpgrade();
                }}
                className="bg-cyan-600 hover:bg-cyan-700 px-5 py-2 rounded-lg"
              >
                Save & Start Upgrade
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Progress Drawer */}
      {showProgress && (
        <div className="fixed right-0 top-0 h-full w-[450px] bg-[#101935] border-l border-gray-700 p-6 overflow-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">
              Firmware Upgrade Progress
            </h2>

            <button onClick={() => setShowProgress(false)}>✕</button>
          </div>

          {/* Progress */}
          <div className="mb-6">
            <div className="flex justify-between mb-2">
              <span>Overall Progress</span>
              <span>{progress}%</span>
            </div>

            <div className="w-full bg-gray-700 rounded-full h-3">
              <div
                className="bg-cyan-500 h-3 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Steps */}
          <div className="space-y-4">
            <div className="text-green-400">
              ✓ Connectivity Validation
            </div>

            <div className="text-green-400">
              ✓ Firmware Validation
            </div>

            <div className="text-cyan-400">
              ● Uploading Firmware...
            </div>

            <div className="text-gray-500">
              ○ Installing Firmware
            </div>

            <div className="text-gray-500">
              ○ Rebooting Device
            </div>

            <div className="text-gray-500">
              ○ Verifying Upgrade
            </div>
          </div>

          {/* Logs */}
          <div className="mt-8">
            <h3 className="mb-3 text-lg font-semibold">Live Logs</h3>

            <div className="bg-black rounded-xl p-4 text-green-400 font-mono text-sm h-[250px] overflow-auto">
              <p>10:22 Connected to device</p>
              <p>10:23 SSH session established</p>
              <p>10:24 Repository connected</p>
              <p>10:25 Upload started</p>
              <p>10:26 Upload progress 65%</p>
            </div>
          </div>

          <button className="mt-6 w-full bg-red-600 hover:bg-red-700 py-3 rounded-xl">
            Cancel Upgrade
          </button>
        </div>
      )}
    </div>
  );
}