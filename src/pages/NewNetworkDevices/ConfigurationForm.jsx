import React, { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { X } from "lucide-react";

const ConfigurationForm = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const device = state?.device;

  // fallback safety
  if (!device) {
    return (
      <div className="p-6 text-white">
        No device selected
        <button onClick={() => navigate(-1)} className="ml-3 text-cyan-400">
          Go Back
        </button>
      </div>
    );
  }

  const connectionDefaults = {
    protocol: "SCP",
    repoIp: "10.10.10.5",
    repoPath: "/firmware/cisco/",
  };

  const authDefaults = {
    username: "admin",
    password: "••••••••",
  };

  const firmware = device?.firmwareInformation;

  return (
    // min-h-screen
    <div className=" bg-[#0b1220] text-white p-4 space-y-4">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-lg font-semibold">
            Device Configuration · {device?.device}
          </h1>
          <p className="text-xs text-gray-400">
            Context is auto-filled from selected device
          </p>
        </div>

        {/* <button
          onClick={() => navigate(-1)}
          className="text-gray-400 hover:text-white"
        >
          <X />
        </button> */}
      </div>
      <div className="bg-[#0f172a] border border-gray-800 rounded-xl px-4 py-3 flex items-center justify-between mb-4">

        {["Device", "Validation", "Configuration", "Upgrade", "Result"].map((s, i, arr) => (
          <div key={i} className="flex items-center flex-1">
            <div className="flex items-center gap-2">
              <div className={`w-7 h-7 flex items-center justify-center rounded-full text-xs font-semibold 
                                     ${i === 2 ? "bg-cyan-500 text-black" : i < 2 ? "bg-green-500 text-black" : "bg-gray-800 text-gray-300"}`} >
                {i + 1}
              </div>
              <span className={`text-xs ${i === 2 ? "text-cyan-400" : "text-gray-400"}`}> {s} </span>
            </div>
            {i !== arr.length - 1 && (<div className="flex-1 h-px mx-3 bg-gray-700" />)}
          </div>
        ))}
      </div>

      {/* GRID */}
      <div className="grid grid-cols-3 gap-4">

        {/* LEFT SUMMARY */}
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-4">

          {/* ================= DEVICE SUMMARY CARD ================= */}
          <div className="bg-[#0f172a] border border-gray-800 rounded-xl p-5">

            <h2 className="text-sm font-semibold mb-4 text-white">
              Device Summary
            </h2>

            {/* 2 COLUMN GRID */}
            <div className="grid grid-cols-2 gap-y-3 gap-x-6 text-xs">

              <div>
                <p className="text-gray-400">Hostname</p>
                <p className="text-gray-200 font-medium">{device.device}</p>
              </div>

              <div>
                <p className="text-gray-400">IP Address</p>
                <p className="text-gray-200 font-medium">{device.ipAddress}</p>
              </div>

              <div>
                <p className="text-gray-400">Vendor</p>
                <p className="text-gray-200 font-medium">{device.vendor}</p>
              </div>

              <div>
                <p className="text-gray-400">OS</p>
                <p className="text-gray-200 font-medium">{device.os}</p>
              </div>

              <div>
                <p className="text-gray-400">Current Version</p>
                <p className="text-orange-400 font-medium">
                  {device.currentVersion}
                </p>
              </div>

              <div>
                <p className="text-gray-400">Target Version</p>
                <p className="text-green-400 font-medium">
                  {device.latestVersion}
                </p>
              </div>

              <div className="col-span-2">
                <p className="text-gray-400">Vulnerabilities</p>
                <p className="text-red-400 font-semibold">
                  {device.vulnerabilityCount} detected
                </p>
              </div>

            </div>
          </div>


          {/* ================= FIRMWARE CARD ================= */}
          <div className="bg-[#0f172a] border border-gray-800 rounded-xl p-5">

            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-white"> Firmware Package Validation </h2>

              <span className="text-xs bg-cyan-500/10 text-cyan-400 px-2 py-1 rounded"> Ready </span>
            </div>

            {/* FILE INFO */}
            <div className="space-y-3 text-xs">

              <div>
                <p className="text-gray-400">File Name</p>
                <p className="text-gray-200 font-medium break-all">
                  {firmware?.fileName}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">

                <div>
                  <p className="text-gray-400">Version</p>
                  <p className="text-gray-200 font-medium">
                    {firmware.version}
                  </p>
                </div>

                <div>
                  <p className="text-gray-400">Size</p>
                  <p className="text-gray-200 font-medium">
                    {firmware?.fileSize}
                  </p>
                </div>

                <div>
                  <p className="text-gray-400">Release Date</p>
                  <p className="text-gray-200 font-medium">
                    {firmware.releaseDate}
                  </p>
                </div>

                <div>
                  <p className="text-gray-400">Type</p>
                  <p className="text-yellow-400 font-medium">
                    {firmware.releaseType}
                  </p>
                </div>

                <div>
                  <p className="text-gray-400">Downtime</p>
                  <p className="text-orange-400 font-medium">
                    {firmware.estimatedDowntime}
                  </p>
                </div>

                <div>
                  <p className="text-gray-400">Reboot</p>
                  <p className={firmware.rebootRequired
                    ? "text-red-400 font-semibold"
                    : "text-green-400 font-semibold"
                  }>
                    {firmware.rebootRequired ? "Required" : "Not Required"}
                  </p>
                </div>

              </div>

              {/* STATUS BADGES */}
              <div className="flex gap-2 pt-2">

                <span className={`text-xs px-2 py-1 rounded border
                    ${firmware.checksumVerified
                    ? "bg-green-500/10 text-green-400 border-green-500/20"
                    : "bg-red-500/10 text-red-400 border-red-500/20"
                  }`}
                >
                  {firmware.checksumVerified
                    ? "Checksum Verified"
                    : "Checksum Failed"}
                </span>

              </div>

            </div>
          </div>

        </div>

        {/* RIGHT FORMS */}
        <div className="col-span-2 space-y-4">

          {/* CONNECTION SETTINGS */}
          <div className="bg-[#0f172a] p-4 rounded-xl border border-gray-800">
            <h2 className="text-sm font-semibold mb-3">Connection Settings</h2>

            <div className="grid grid-cols-2 gap-3 text-xs">

            <div>
  <label className="text-gray-400">Transfer Protocol</label>

  <select
    defaultValue={connectionDefaults.protocol}
    className="w-full mt-1 p-2 bg-[#111827] rounded border border-gray-700 text-white outline-none"
  >
    <option value="SCP">SCP</option>
    <option value="SFTP">SFTP</option>
    <option value="FTP">FTP</option>
    <option value="TFTP">TFTP</option>
  </select>
</div>

              <div>
                <label className="text-gray-400">Repository IP</label>
                <input
                  defaultValue={connectionDefaults.repoIp}
                  className="w-full mt-1 p-2 bg-[#111827] rounded border border-gray-700"
                />
              </div>

              <div className="col-span-2">
                <label className="text-gray-400">Repository Path</label>
                <input
                  defaultValue={connectionDefaults.repoPath}
                  className="w-full mt-1 p-2 bg-[#111827] rounded border border-gray-700"
                />
              </div>
            </div>
          </div>

          {/* AUTH */}
          <div className="bg-[#0f172a] p-4 rounded-xl border border-gray-800">
            <h2 className="text-sm font-semibold mb-3">Authentication</h2>

            <div className="grid grid-cols-2 gap-3 text-xs">

              <div>
                <label className="text-gray-400">Username</label>
                <input
                  defaultValue={authDefaults.username}
                  className="w-full mt-1 p-2 bg-[#111827] rounded border border-gray-700"
                />
              </div>

              <div>
                <label className="text-gray-400">Password</label>
                <input
                  type="password"
                  defaultValue={authDefaults.password}
                  className="w-full mt-1 p-2 bg-[#111827] rounded border border-gray-700"
                />
              </div>
            </div>
          </div>

          {/* UPGRADE PARAMS */}
          <div className="bg-[#0f172a] p-4 rounded-xl border border-gray-800">
            <h2 className="text-sm font-semibold mb-3">Upgrade Parameters</h2>

            <div className="grid grid-cols-2 gap-3 text-xs">

              <div>
                <label className="text-gray-400">Firmware File</label>
                <input
                  defaultValue={firmware?.fileName}
                  className="w-full mt-1 p-2 bg-[#111827] rounded border border-gray-700"
                />
              </div>

              <div>
                <label className="text-gray-400">Maintenance Window</label>
                <input
                  defaultValue="Tonight 02:00 - 05:00 IST"
                  className="w-full mt-1 p-2 bg-[#111827] rounded border border-gray-700"
                />
              </div>

              <div className="col-span-2 flex gap-4 mt-2 text-xs">
                <label><input type="checkbox" defaultChecked /> Verify Integrity</label>
                <label><input type="checkbox" defaultChecked /> Auto Reboot</label>
                <label><input type="checkbox" /> Rollback on Failure</label>
              </div>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex justify-between">
            <button
              onClick={() => navigate(-1)}
              className="px-4 py-2 bg-gray-800 rounded text-xs"
            >
              Back
            </button>
            <button className="px-4 py-2 bg-cyan-600 rounded text-xs">
              Test Configuartion
            </button>

            <button onClick={() =>
              navigate("/section/UgradeFirmware", {
                state: { device },
              })
            } className="px-4 py-2 bg-cyan-600 rounded text-xs">
              Save Configuration
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ConfigurationForm;