import React, { useState } from "react";

import MultiSelect from '../layouts/MultiSelect.jsx';
import { useForm } from "react-hook-form";

const MultipleRunForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue
  } = useForm();
  const [showTable, setShowTable] = useState(false);
  const handleSubmitClick = () => {
    setShowTable(true);
  };
  const branchOptions = [
    { value: "npcil", label: "NPCIL" },
    { value: "nhpc", label: "NHPC" },
    { value: "mumbai", label: "Mumbai Branch" },
  ];
  const ipOptions = [
    { value: "192.168.0.15", label: "192.168.0.15" },
    { value: "192.168.0.54", label: "192.168.0.54" },
    { value: "192.168.0.104", label: "192.168.0.104" },
    { value: "192.168.0.53", label: "192.168.0.53" },
  ];
  const [selectedBranches, setSelectedBranches] = useState([]);
  const [selectedIPs, setSelectedIPs] = useState([]);
  const [branchList, setBranchList] = useState([]);
  const [ipAddressList, setIpAddressList] = useState([]);
  const [loading, setLoading] = useState(false);

  const detailsinfo = [
    { "ipaddress": "192.168.0.15", "pcName": "shamika", "status": "Failed", "branchName": "NPCIL" },
    { "ipaddress": "192.168.0.2", "pcName": "sumit", "status": "Success", "branchName": "NPCIL" },
    { "ipaddress": "192.168.0.37", "pcName": "Bharti", "status": "Failed", "branchName": "NPCIL" }
  ]

  const labelClass = "text-[15px] text-[#d1d5db] mb-1 block";
  const inputClass = "w-full h-[34px] px-2 text-[12px] bg-[#1E293B] text-white rounded-md border border-[#2A3A55] focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500";
  const btnClass =
    "px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.03] active:scale-[0.97] focus:outline-none focus:ring-2 focus:ring-blue-400/60";


  return (
    <div className="bg-[#0B1220] rounded-2xl p-6 border border-white/10 shadow-xl">

      <h2 className="text-md font-semibold mb-6">
        <button
          className="px-2 py-1.5 text-sm bg-[#1E293B] text-gray-300 rounded-md border border-white/10 hover:bg-[#172033] transition"
          onClick={() => setShowTable(false)}
        >
          ← Back
        </button>
        {/* Multiple Run Command */}
      </h2>

      {/* 🔥 SHOW FORM */}
      {!showTable && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">




            <div>
              <label className={labelClass}>IP Address</label>
              <MultiSelect
                options={ipOptions}
                value={selectedIPs}
                onChange={setSelectedIPs}
                placeholder="Select IP Address"
                id={"ipAddress"}
                setValue={setValue}
              />
            </div>
            <div>
              <label className={labelClass}>Branch Name</label>
              <MultiSelect
                options={branchOptions}
                value={selectedBranches}
                onChange={setSelectedBranches}
                placeholder="Select Branch Names"
                id={"branchNames"}
                setValue={setValue}
              />
            </div>

            <div>
              <label className={labelClass}>Activity Command</label>
              <MultiSelect
                options={branchOptions}
                value={selectedBranches}
                onChange={setSelectedBranches}
                placeholder="Select Activity Command"
                id={"branchNames"}
                setValue={setValue}
              />
            </div>


          </div>

          <div className="flex justify-end mt-6">
            <button className={btnClass} onClick={handleSubmitClick}>
              Submit
            </button>
          </div>
        </>
      )}

      {/* 🔥 SHOW TABLE */}
      {showTable && (
        <div className="mt-4">

          {/* 🔥 Header + Back */}
          <div className="flex  items-center mb-4">

            <h2 className="text-lg font-semibold text-gray-300 ">
              Execution Result
            </h2>

          </div>

          {/* 🔥 Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-gray-400 border-b border-white/10">
                <tr>
                  <th className="p-3 text-left">IP Address</th>
                  <th className="p-3 text-left">PC Name</th>
                  <th className="p-3 text-left">Branch</th>
                  <th className="p-3 text-left">Status</th>
                </tr>
              </thead>

              <tbody>
                {detailsinfo.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b border-white/5 hover:bg-[#172033] transition"
                  >
                    <td className="p-3">{item.ipaddress}</td>
                    <td className="p-3">{item.pcName}</td>
                    <td className="p-3">{item.branchName}</td>
                    <td
                      className={`p-3 font-medium ${item.status === "Success"
                        ? "text-green-400"
                        : "text-red-400"
                        }`}
                    >
                      {item.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      )}
    </div>
  )
}


export default MultipleRunForm