// import React from 'react'
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, ChevronRight } from "lucide-react";

const devices = [
  { id: 1, username: "Shamika", ip: "192.168.0.15", lastReported: "2026-03-25 10:30", available: "Yes", deviceType: "Desktop", pendingReboot: "No", updates: 3, branchName: "NPCIL" },
  { id: 2, username: "jane.smith", ip: "192.168.1.20", lastReported: "2026-03-26 09:15", available: "No", deviceType: "Desktop", pendingReboot: "Yes", updates: 5, branchName: "NHPC" },
  { id: 3, username: "Sumit.Shedge", ip: "192.168.1.53", lastReported: "2026-03-26 10:15", available: "Yes", deviceType: "Desktop", pendingReboot: "Yes", updates: 5, branchName: "NPCIL" }
];

// Transform devices into tree structure
const getTreeData = (devices) => {
  const branches = {};
  devices.forEach((d) => {
    if (!branches[d.branchName]) branches[d.branchName] = [];
    branches[d.branchName].push(d);
  });
  return Object.entries(branches).map(([branchName, children]) => ({
    branchName,
    children
  }));
};


const DeviceDashboard = () => {
     const [expandedBranches, setExpandedBranches] = useState([]);
  const [selectedDevices, setSelectedDevices] = useState([]);
  const navigate = useNavigate();

  const treeData = getTreeData(devices);

  const toggleBranch = (branchName) => {
    setExpandedBranches((prev) =>
      prev.includes(branchName)
        ? prev.filter((b) => b !== branchName)
        : [...prev, branchName]
    );
  };

  const toggleSelectDevice = (deviceId) => {
    setSelectedDevices((prev) =>
      prev.includes(deviceId)
        ? prev.filter((id) => id !== deviceId)
        : [...prev, deviceId]
    );
  };
  return (
     <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-200" >
        <thead className="bg-gray-400 dark:bg-[#101726] border-3 border-white dark:border-[#0F172A] text-gray-700 dark:text-white">
          <tr>
            <th className="px-4 py-2 text-left ">Branch / Username</th>
            <th className="px-4 py-2">IP Address</th>
            <th className="px-4 py-2">Last Reported</th>
            <th className="px-4 py-2">Available</th>
            <th className="px-4 py-2">Device Type</th>
            <th className="px-4 py-2">Pending Reboot</th>
            <th className="px-4 py-2">Software Updates</th>
          </tr>
        </thead>
        <tbody>
  {treeData.map((branch) => (
    <React.Fragment key={branch.branchName}>
      {/* Branch row */}
      <tr
        className="bg-gray-100 dark:bg-[#1A2438] dark:border-4 dark:border-[#0F172A] cursor-pointer hover:bg-gray-100 dark:hover:bg-[#101726]  "
        onClick={() => toggleBranch(branch.branchName)}
      >
        <td className="px-4 py-2 font-medium flex items-center text-gray-900 dark:text-white">
          <input
            type="checkbox"
            className="mr-2"
            checked={branch.children.every((d) =>
              selectedDevices.includes(d.id)
            )}
            onChange={(e) =>
              branch.children.forEach((d) => toggleSelectDevice(d.id))
            }
            onClick={(e) => e.stopPropagation()}
          />
          <span>{branch.branchName}</span>
          <span className="ml-2 text-gray-400">
            {expandedBranches.includes(branch.branchName) ? <ChevronDown /> : <ChevronRight />}
          </span>
        </td>
        <td colSpan={6}></td>
      </tr>

      {/* Device rows */}
      {expandedBranches.includes(branch.branchName) &&
        branch.children.map((device) => (
          <tr
            key={device.id}
            className="bg-white dark:bg-[#1A2438] dark:border-4 dark:border-[#0F172A] hover:bg-gray-50 dark:hover:bg-[#101726]"
          >
            
            <td className="px-8 py-2 flex items-center text-gray-800">
              <input
                type="checkbox"
                className="mr-2"
                checked={selectedDevices.includes(device.id)}
                onChange={() => toggleSelectDevice(device.id)}
              />
              
              <span
                className="text-blue-600 dark:text-cyan-400 cursor-pointer font-medium"
                onClick={() => navigate(`/devices/${device.username}`)}
              >
                {device.username}
              </span>
            </td>
            <td className="px-4 py-2 text-gray-700 dark:text-white">{device.ip}</td>
            <td className="px-4 py-2 text-gray-700 dark:text-white">{device.lastReported}</td>
            <td className="px-4 py-2 text-gray-700 dark:text-white">{device.available}</td>
            <td className="px-4 py-2 text-gray-700 dark:text-white ">{device.deviceType}</td>
            <td className="px-4 py-2 text-gray-700 dark:text-white">{device.pendingReboot}</td>
            <td className="px-4 py-2 text-gray-700 dark:text-white">{device.updates}</td>
          </tr>
        ))}
    </React.Fragment>
  ))}
</tbody>
      </table>
    </div>
  );
};

export default DeviceDashboard;
