// import React from 'react'
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, ChevronRight } from "lucide-react";

const devices = [
  { id: 1, username: "Shamika", ipaddress: "192.168.0.15", lastreported: "2026-03-25 10:30", agentstatus: "Yes", devicetype: "Desktop",  updates: 3, branchname: "NPCIL" },
  { id: 2, username: "jane.smith", ipaddress: "192.168.1.20", lastreported: "2026-03-26 09:15", agentstatus: "No", devicetype: "Desktop",  updates: 5, branchname: "NHPC" },
  { id: 3, username: "Sumit.Shedge", ipaddress: "192.168.1.53", lastreported: "2026-03-26 10:15", agentstatus: "Yes", devicetype: "Desktop", updates: 5, branchname: "NPCIL" }
];

const columns= [
  {name:"branchname" , label:"Branch/Username"},
  {name:"ipaddress" , label:"IP Address"},
  {name:"lastreported" , label:"Last Reported"},
  {name:"agentstatus" , label:"Agent Status"},
  {name:"devicetype" , label:"Device Type"},
  {name:"groupname" , label:"Group Name"},
  {name:"updates" , label:"Software Updates"}

]
// Transform devices into tree structure
const getTreeData = (devices) => {
  const branches = {};
  devices.forEach((d) => {
    if (!branches[d.branchname]) branches[d.branchname] = [];
    branches[d.branchname].push(d);
  });
  return Object.entries(branches).map(([branchname, children]) => ({
    branchname,
    children
  }));
};


const DeviceDashboard = () => {
     const [expandedBranches, setExpandedBranches] = useState([]);
  const [selectedDevices, setSelectedDevices] = useState([]);
  const navigate = useNavigate();

  const treeData = getTreeData(devices);

  const toggleBranch = (branchname) => {
    setExpandedBranches((prev) =>
      prev.includes(branchname)
        ? prev.filter((b) => b !== branchname)
        : [...prev, branchname]
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
    {columns.map((col) => (
      <th key={col.name} className="px-4 py-2 text-left">
        {col.label}
      </th>
    ))}
  </tr>
</thead>
        <tbody>
  {treeData.map((branch) => (
    <React.Fragment key={branch.branchname}>
      {/* Branch row */}
      <tr className="bg-gray-100 dark:bg-[#1A2438] dark:border-4 dark:border-[#0F172A] cursor-pointer hover:bg-gray-100 dark:hover:bg-[#101726]  "
        onClick={() => toggleBranch(branch.branchname)}
      >
        <td className="px-4 py-2 font-medium flex items-center text-gray-900 dark:text-white">
          <input type="checkbox" className="mr-2 w-4 h-4 appearance-none border border-gray-400 rounded-sm checked:bg-white checked:border-black relative
  checked:after:content-['✔'] checked:after:text-black checked:after:absolute checked:after:left-[2px] checked:after:top-[-2px] checked:after:text-xs"
            checked={branch.children.every((d) =>
              selectedDevices.includes(d.id)
            )}
            onChange={(e) =>
              branch.children.forEach((d) => toggleSelectDevice(d.id))
            }
            onClick={(e) => e.stopPropagation()}
          />
          <span>{branch.branchname}</span>
          <span className="ml-2 text-gray-400">
            {expandedBranches.includes(branch.branchname) ? <ChevronDown /> : <ChevronRight />}
          </span>
        </td>
        <td colSpan={columns.length - 1}></td>
      </tr>

      {/* Device rows */}
      {expandedBranches.includes(branch.branchname) &&
  branch.children.map((device) => (
    <tr
      key={device.id}
      className="bg-white dark:bg-[#1A2438] dark:border-4 dark:border-[#0F172A] hover:bg-gray-50 dark:hover:bg-[#101726]"
    >
      {columns.map((col, index) => {
        // First column (special UI: checkbox + username link)
        if (index === 0) {
          return (
            <td key={col.name} className="px-8 py-2 flex items-center text-gray-800">
              <input
                type="checkbox"
                className="mr-2 w-4 h-4 appearance-none border border-gray-400 rounded-sm checked:bg-white checked:border-black relative
                checked:after:content-['✔'] checked:after:text-black checked:after:absolute checked:after:left-[2px] checked:after:top-[-2px] checked:after:text-xs"
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
          );
        }

        // Other columns (dynamic)
        return (
          <td key={col.name} className="px-4 py-2 text-gray-700 dark:text-white">
            {device[col.name]}
          </td>
        );
      })}
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
