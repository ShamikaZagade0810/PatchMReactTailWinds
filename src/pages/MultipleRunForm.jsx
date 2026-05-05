import React, { useEffect, useState } from "react";

import {
    requestToServerForRemoteAction,
    requestIdForRemoteAction
} from "../api/projectApi";
import MultiSelect from '../layouts/MultiSelect.jsx';
import { useForm } from "react-hook-form";
import ReusableTable from '../components/Table/ReusableTable.jsx';

const MultipleRunForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset
  } = useForm();
  const [showTable, setShowTable] = useState(false);
  const [dynamicReport, setdynamicReport] = useState({ columndata: [], maindata: [] });
  const [loading, setLoading] = useState(false);
  //        const handleSubmitClick = () => {
  //   setShowTable(true);
  // };
  // const onSubmit = (data) => {
  //   console.log(data);
  //   setShowTable(true);
  // };

  const onSubmit = async (data) => {
  console.log("Form Data:", data);

  const payload = {
    ipAddress: data.ipAddress,        // selected IPs from MultiSelect
    branchNames: data.branchNames,  // selected branches
    command: data.command,         // dropdown command
    type: "Execute_Command"
  };

  console.log("Request Payload:", payload);

  try {
     setLoading(true); // 🔥 START loader
    const response = await requestToServerForRemoteAction(payload);

    console.log("API Response:", response);
    let requestid = response.data.data[0].ReqId;
            console.log("response ---> ", requestid);
            gettabledata(requestid);

            const interval = setInterval(() => {
                gettabledata(requestid);
            }, 10000);

            // Cleanup (VERY IMPORTANT)
            // return () => clearInterval(interval);

    // optional: move to table view after success
    setShowTable(true);

  } catch (error) {
    console.error("API Error:", error);
     setLoading(false); // stop loader on error
  }
};

 const gettabledata = async (requestid) => {

        let requestdata = {
            "reqId": requestid
        }
        const data = await requestIdForRemoteAction(requestdata);

        try {
            console.log("API Response:", data);
            let MainData = data.data.data[0].data;
            let ColumnData = data.data.data[0].column;
            let obj = {};
            obj.maindata = MainData;
            obj.columndata = ColumnData;
            console.log("obj ---> ", obj);
            setdynamicReport(obj)
               setLoading(false); // 🔥 STOP loader when data arrives


        } catch (error) {
            console.error("API Error:", error);
               setLoading(false); // 🔥 STOP loader when data arrives

        }

        console.log("New table data", data)
    }


  useEffect(() => {
    register("branchNames", {
      validate: (value) =>
        value?.length > 0 || "At least 1 branch must be selected"
    });

    register("ipAddress", {
      validate: (value) =>
        value?.length > 0 || "At least 1 IP must be selected"
    });
  }, [register]);

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
  const commandOptions = [
    { value: "Restart System", label: "Restart System" },
    { value: "Shutdown System", label: "Shutdown System" },
    { value: "Disk Cleanup", label: "Disk Cleanup" },
     { value: "Ping cmd2", label: "Ping cmd2" }
  ];
  const [selectedBranches, setSelectedBranches] = useState([]);
  const [selectedIPs, setSelectedIPs] = useState([]);

  const detailsinfo = [
    { "ipaddress": "192.168.0.15", "pcName": "shamika", "status": "Failed", "branchName": "NPCIL" },
    { "ipaddress": "192.168.0.2", "pcName": "sumit", "status": "Success", "branchName": "NPCIL" },
    { "ipaddress": "192.168.0.37", "pcName": "Bharti", "status": "Failed", "branchName": "NPCIL" }
  ]

  const labelClass = "text-[15px] text-[#d1d5db] mb-1 block";
  const inputClass = "w-full h-[34px] px-2 text-[12px] bg-[#1E293B] text-white rounded-md border border-[#2A3A55] focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500";
  const btnClass = "px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.03] active:scale-[0.97] focus:outline-none focus:ring-2 focus:ring-blue-400/60";
 const resetClass = "px-6 py-2 bg-gradient-to-r from-gray-800 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white rounded-lg transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.03] active:scale-[0.97] focus:outline-none focus:ring-2 focus:ring-blue-400/60";
    
  const handleReset = () => {
      reset({
    command: "",        // 👈 force reset explicitly
    branchNames: [],
    ipAddress: []
  });
    setSelectedBranches([]);
    setSelectedIPs([]);
  };

  return (
    <div className="bg-[#0B1220] rounded-2xl p-6 border border-white/10 shadow-xl">

      <h2 className="text-md font-semibold mb-6">
        {/* <button
        className="px-2 py-1.5 text-sm bg-[#1E293B] text-gray-300 rounded-md border border-white/10 hover:bg-[#172033] transition"
        onClick={() => setShowTable(false)}
      >
        ← Back
      </button>  */}
        {/* Multiple Run Command */}
      </h2>

      {/* 🔥 SHOW FORM */}
      {!showTable && (

        <>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div>
              <label className={labelClass}>Branch Name</label>
              <MultiSelect
                options={branchOptions}
                value={selectedBranches}
                onChange={setSelectedBranches}
                placeholder="Select Branch Names"
                id={"branchNames"}
                setValue={setValue}
              //  error={errors?.branchNames}
              />
              {errors?.branchNames && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.branchNames.message}
                </p>
              )}

            </div>

            <div>
              <label className={labelClass}>IP Address</label>
              <MultiSelect
                options={ipOptions}
                value={selectedIPs}
                onChange={setSelectedIPs}
                placeholder="Select IP Address"
                id={"ipAddress"}
                setValue={setValue}
              // error={errors?.ipAddress}
              />
              {errors?.ipAddress && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.ipAddress.message}
                </p>
              )}
            </div>

            {/* Time */}
            {/* <div>
              <label className={labelClass}>Time (MM:SS)</label>
              <input
                type="text"
                placeholder="MM:SS (e.g. 05:30)"
                className={inputClass}
                {...register("time", {
                  required: "Time is required",
                  pattern: {
                    value: /^([0-5]\d):([0-5]\d)$/,
                    message: "Enter valid MM:SS format"
                  }
                })}
              />

              {errors.time && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.time.message}
                </p>
              )}
            </div> */}
            {/* Command Dropdown */}
            <div>
              <label className={labelClass}>Command</label>
              <select
                className={inputClass}
                defaultValue=""
                {...register("command", {
                  required: "Command is required"
                })}
              >
                <option value="" disabled>Select Command</option>
                {commandOptions.map((cmd, i) => (
                  <option key={i} value={cmd.value}>
                    {cmd.label}
                  </option>
                ))}
              </select>
              {errors.command && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.command.message}
                </p>
              )}
            </div>

          </div>

          <div className="flex justify-end mt-6 gap-2">
            <button className={`${btnClass} flex items-center gap-2`} onClick={handleSubmit(onSubmit)}  disabled={loading}>  
             Submit {loading && (<div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div> )} </button>
            <button type="button" className={resetClass} onClick={handleReset}> Reset </button>
          </div>
        </>
      )}

      {/* 🔥 SHOW TABLE */}
      {showTable && (
        <div className="mt-4">

          {/* 🔥 Header + Back */}
          <div className="flex items-center justify-between mb-4">

            {/* Left side (Back + Title) */}
            <div className="flex items-center gap-3">
              <button
                className="px-3 py-1.5 text-sm bg-[#1E293B] text-gray-300 rounded-md border border-white/10 hover:bg-[#172033] transition"
                onClick={() => setShowTable(false)}
              >
                ← Back
              </button>

              <h2 className="text-lg font-semibold text-gray-300">
                Execution Result
              </h2>
            </div>

          </div>

          {/* 🔥 Table */}
          <div className="overflow-x-auto">
            {/* <table className="w-full text-sm">
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
            </table> */}
            <div className="bg-[#111C2E] rounded-2xl mt-6 p-10 text-center ">
                {/* <h3 className="text-sm text-gray-400 mb-2">REPORT</h3> */}
                {/* <h2 className="text-xl font-semibold mb-2">
                    No Report Generated Yet
                </h2>
                <p className="text-gray-400">
                    Configure the filters above and click Generate Report.
                </p> */}
                <ReusableTable data={dynamicReport.maindata} columns={dynamicReport.columndata} pageSize={10} />


            </div>
          </div>

        </div>
      )}
    </div>
  )
}


export default MultipleRunForm