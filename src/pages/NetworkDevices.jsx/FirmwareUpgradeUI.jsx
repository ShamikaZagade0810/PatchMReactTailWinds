import React, { useEffect, useState } from "react";

export default function FirmwareUpgradeUI() {
  const [showReadiness, setShowReadiness] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  const [showProgress, setShowProgress] = useState(false);

  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    "Connectivity Validation",
    "Firmware Validation",
    "Uploading Firmware",
    "Installing Firmware",
    "Rebooting Device",
    "Verifying Upgrade",
    "Upgrade Successful",
  ];

  const logs = [
    "10:22 Connected to device",
    "10:23 SSH session established",
    "10:24 Repository connected",
    "10:25 Upload started",
    "10:26 Upload completed",
    "10:27 Firmware installation started",
    "10:28 Device reboot initiated",
    "10:30 Device online",
    "10:31 Upgrade verification successful",
  ];

  const [visibleLogs, setVisibleLogs] = useState([]);

  const startUpgrade = () => {
    setShowProgress(true);
  };

  useEffect(() => {
    if (!showProgress) return;

    let stepIndex = 0;
    let progressValue = 0;

    const interval = setInterval(() => {
      progressValue += 15;

      setProgress(progressValue);

      if (stepIndex < steps.length - 1) {
        setCurrentStep(stepIndex);
        stepIndex++;
      }

      if (progressValue >= 100) {
        clearInterval(interval);
      }
    }, 1500);

    return () => clearInterval(interval);
  }, [showProgress]);

  useEffect(() => {
    if (!showProgress) return;

    let logIndex = 0;

    const logInterval = setInterval(() => {
      setVisibleLogs((prev) => [...prev, logs[logIndex]]);
      logIndex++;

      if (logIndex >= logs.length) {
        clearInterval(logInterval);
      }
    }, 1200);

    return () => clearInterval(logInterval);
  }, [showProgress]);

  return (
    <div className="min-h-screen bg-[#081028] text-white p-6">
      {/* Header */}
      <h1 className="text-3xl font-bold mb-6">
        Network Device Patch Management
      </h1>

      {/* Device Table */}
      <div className="bg-[#101935] rounded-2xl overflow-hidden border border-gray-700">
        <table className="w-full">
          <thead className="bg-[#1B254B]">
            <tr>
              <th className="p-4 text-left">Device</th>
              <th className="p-4 text-left">Vendor</th>
              <th className="p-4 text-left">IP Address</th>
              <th className="p-4 text-left">Current Version</th>
              <th className="p-4 text-left">Target Version</th>
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
                  className="bg-cyan-600 hover:bg-cyan-700 px-4 py-2 rounded-xl"
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
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-[#101935] w-[600px] rounded-3xl border border-gray-700 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">
                Device Upgrade Readiness
              </h2>

              <button onClick={() => setShowReadiness(false)}>
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div className="bg-[#0D1630] p-4 rounded-xl flex justify-between">
                <span>Device Reachable</span>
                <span className="text-green-400">✓</span>
              </div>

              <div className="bg-[#0D1630] p-4 rounded-xl flex justify-between">
                <span>SSH Accessible</span>
                <span className="text-green-400">✓</span>
              </div>

              <div className="bg-[#0D1630] p-4 rounded-xl flex justify-between">
                <span>File Transfer Service</span>
                <span className="text-red-400">Disabled</span>
              </div>

              <div className="bg-[#0D1630] p-4 rounded-xl flex justify-between">
                <span>Firmware Compatible</span>
                <span className="text-green-400">✓</span>
              </div>

              <div className="bg-orange-500/10 border border-orange-500 p-4 rounded-xl text-orange-300">
                Configuration required before firmware upgrade.
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setShowReadiness(false);
                  setShowConfig(true);
                }}
                className="bg-cyan-600 hover:bg-cyan-700 px-5 py-2 rounded-xl"
              >
                Configure
              </button>

              <button className="border border-gray-600 px-5 py-2 rounded-xl">
                Revalidate
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Configuration Modal */}
      {showConfig && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-[#101935] w-[750px] rounded-3xl border border-gray-700 p-6 overflow-auto max-h-[90vh]">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">
                Device Configuration
              </h2>

              <button onClick={() => setShowConfig(false)}>
                ✕
              </button>
            </div>

            <div className="space-y-5">
              {/* Protocol */}
              <div>
                <label className="block mb-2 text-gray-300">
                  Transfer Protocol
                </label>

                <select className="w-full bg-[#0D1630] border border-gray-700 rounded-xl p-3">
                  <option>SCP</option>
                  <option>SFTP</option>
                  <option>TFTP</option>
                </select>
              </div>

              {/* Service */}
              <div className="flex items-center gap-3">
                <input type="checkbox" defaultChecked />
                <label>Enable File Transfer Service</label>
              </div>

              <div className="flex items-center gap-3">
                <input type="checkbox" defaultChecked />
                <label>Enable SSH Access</label>
              </div>

              {/* Repository */}
              <div>
                <label className="block mb-2 text-gray-300">
                  Repository IP
                </label>

                <input
                  type="text"
                  defaultValue="10.10.10.5"
                  className="w-full bg-[#0D1630] border border-gray-700 rounded-xl p-3"
                />
              </div>

              <div>
                <label className="block mb-2 text-gray-300">
                  Repository Path
                </label>

                <input
                  type="text"
                  defaultValue="/firmware/cisco/"
                  className="w-full bg-[#0D1630] border border-gray-700 rounded-xl p-3"
                />
              </div>

              {/* Firmware */}
              <div>
                <label className="block mb-2 text-gray-300">
                  Firmware File
                </label>

                <select className="w-full bg-[#0D1630] border border-gray-700 rounded-xl p-3">
                  <option>cat9k_iosxe.17.09.04a.bin</option>
                  <option>cat9k_iosxe.17.06.03.bin</option>
                </select>
              </div>

              {/* Auth */}
              <div>
                <label className="block mb-2 text-gray-300">
                  Username
                </label>

                <input
                  type="text"
                  defaultValue="admin"
                  className="w-full bg-[#0D1630] border border-gray-700 rounded-xl p-3"
                />
              </div>

              <div>
                <label className="block mb-2 text-gray-300">
                  Password
                </label>

                <input
                  type="password"
                  defaultValue="password"
                  className="w-full bg-[#0D1630] border border-gray-700 rounded-xl p-3"
                />
              </div>

              {/* Options */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <input type="checkbox" defaultChecked />
                  <label>Verify Firmware Integrity</label>
                </div>

                <div className="flex items-center gap-3">
                  <input type="checkbox" defaultChecked />
                  <label>Auto Reboot After Upgrade</label>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button className="border border-gray-600 px-5 py-2 rounded-xl">
                Test Connection
              </button>

              <button
                onClick={() => {
                  setShowConfig(false);
                  startUpgrade();
                }}
                className="bg-cyan-600 hover:bg-cyan-700 px-5 py-2 rounded-xl"
              >
                Save & Start Upgrade
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upgrade Progress */}
      {showProgress && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-[#101935] w-[1200px] rounded-3xl border border-gray-700 overflow-hidden">
            {/* Header */}
            <div className="border-b border-gray-700 p-6 flex justify-between">
              <div>
                <h2 className="text-3xl font-bold">
                  Firmware Upgrade Progress
                </h2>

                <p className="text-gray-400 mt-2">
                  Device : MUM-EDGE-RTR-01
                </p>
              </div>

              <button onClick={() => setShowProgress(false)}>
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-8 p-8">
              {/* Left */}
              <div>
                {/* Progress */}
                <div className="mb-8">
                  <div className="flex justify-between mb-2">
                    <span>Overall Progress</span>
                    <span>{progress}%</span>
                  </div>

                  <div className="w-full bg-gray-700 rounded-full h-4">
                    <div
                      className="bg-cyan-500 h-4 rounded-full transition-all duration-1000"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                {/* Steps */}
                <div className="bg-[#0D1630] rounded-2xl p-5 border border-gray-700">
                  <h3 className="text-xl font-semibold mb-5">
                    Upgrade Steps
                  </h3>

                  <div className="space-y-5">
                    {steps.map((step, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-4"
                      >
                        {index < currentStep ? (
                          <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                            ✓
                          </div>
                        ) : index === currentStep ? (
                          <div className="w-6 h-6 rounded-full bg-cyan-500 animate-pulse"></div>
                        ) : (
                          <div className="w-6 h-6 rounded-full bg-gray-600"></div>
                        )}

                        <span
                          className={`${
                            index < currentStep
                              ? "text-green-400"
                              : index === currentStep
                              ? "text-cyan-400"
                              : "text-gray-500"
                          }`}
                        >
                          {step}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right */}
              <div>
                {/* Device Info */}
                <div className="bg-[#0D1630] rounded-2xl p-5 border border-gray-700 mb-6">
                  <h3 className="text-xl font-semibold mb-5">
                    Device Information
                  </h3>

                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Vendor</span>
                      <span>Cisco</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-400">
                        Current Version
                      </span>
                      <span>17.3.3</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-400">
                        Target Version
                      </span>
                      <span className="text-cyan-400">
                        17.9.4a
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-400">
                        Transfer Protocol
                      </span>
                      <span>SCP</span>
                    </div>
                  </div>
                </div>

                {/* Logs */}
                <div className="bg-black rounded-2xl border border-gray-700 p-5 h-[420px] overflow-auto">
                  <div className="flex justify-between mb-4">
                    <h3 className="text-xl font-semibold">
                      Live Logs
                    </h3>

                    <span className="text-green-400 animate-pulse">
                      ● LIVE
                    </span>
                  </div>

                  <div className="space-y-3 font-mono text-sm text-green-400">
                    {visibleLogs.map((log, index) => (
                      <div key={index}>{log}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-700 p-6 flex justify-between">
              <div className="text-gray-400">
                Estimated Remaining Time : 3 Minutes
              </div>

              <button className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-xl">
                Cancel Upgrade
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}