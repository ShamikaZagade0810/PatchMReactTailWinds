import React, { useMemo, useState,useEffect } from "react";
import { useForm } from "react-hook-form";

import MultiSelect from '../../layouts/MultiSelect.jsx';

const IPWiseReport = () => {
    const labelClass = "text-[15px] text-[#d1d5db] mb-1 block";
    const inputClass = "w-full h-[34px] px-2 text-[12px] bg-[#1E293B] text-white rounded-md border border-[#2A3A55] focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500";
    const btnClass = "px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.03] active:scale-[0.97] focus:outline-none focus:ring-2 focus:ring-blue-400/60";
    const resetClass = "px-6 py-2 bg-gradient-to-r from-gray-800 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white rounded-lg transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.03] active:scale-[0.97] focus:outline-none focus:ring-2 focus:ring-blue-400/60";
    const {
        register,
        formState: { errors },
        watch,
        setValue,
        reset
    } = useForm();

    const contentDisatributiondata = [
        {
            srNo: 1, ipAddress: "192.168.0.15", appName: "spdownloader", currentPacket: "0", currentStatus: "Downloading", destinationPath: "D:\\patch",
            packetSize: "100Kb", intervalTime: "100", timeout: "60", createdAt: "2026-04-20 16:20:13.0"
        },
        {
            srNo: 2, ipAddress: "192.168.0.24", appName: "Patch_Desc", currentPacket: "0", currentStatus: "Downloaded", destinationPath: "D:\\patch",
            packetSize: "100Kb", intervalTime: "100", timeout: "60", createdAt: "2026-05-1 16:20:13.0"
        },
        {
            srNo: 3, ipAddress: "192.168.0.54", appName: "Patch_Desc", currentPacket: "0", currentStatus: "Downloading", destinationPath: "D:\\patch",
            packetSize: "100Kb", intervalTime: "100", timeout: "60", createdAt: "2026-05-20 16:20:13.0"
        },
        {
            srNo: 4, ipAddress: "192.168.0.15", appName: "Patch_Desc", currentPacket: "0", currentStatus: "Downloading", destinationPath: "D:\\patch",
            packetSize: "100Kb", intervalTime: "100", timeout: "60", createdAt: "2026-05-20 16:20:13.0"
        }
    ];

 const ipaddress = [
        { value: "192.168.0.15", label: "192.168.0.15" },
        { value: "192.168.0.2", label: "192.168.0.2" },
        { value: "192.168.0.4", label: "192.168.0.4" },
        { value: "192.168.0.24", label: "192.168.0.24" },
    ];    
    const [selectedip, setSelectedip] = useState([]);
    useEffect(() => {
            register("ipaddress", { validate: (value) => value?.length > 0 || "At least 1 IP must be selected" });
        }, [register]);
    

         const handleReset = () => {
        reset({ ipaddress: [] }); setSelectedip([]);
    };
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [ip, setIp] = useState("");

    const [showTable, setShowTable] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
const rowsPerPage = 2;

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowTable(true); // hide form, show table
    };
const totalPages = Math.ceil(contentDisatributiondata.length / rowsPerPage);

const indexOfLastRow = currentPage * rowsPerPage;
const indexOfFirstRow = indexOfLastRow - rowsPerPage;

const currentRows = contentDisatributiondata.slice(
  indexOfFirstRow,
  indexOfLastRow
);

const handlePageChange = (page) => {
  setCurrentPage(page);
};
    return (
        <div className="space-y-6 text-white">
            {/* FORM */}
            {!showTable && (
                <form onSubmit={handleSubmit} className="bg-[#0B1220] p-6 rounded-2xl border border-white/10" >
                    <h2 className="text-lg mb-4"> IP Wise Patch Report</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* From Date */}
                        <div>
                            <label className={labelClass}>From Date</label>
                            <input type="date" className={inputClass} />
                        </div>

                        {/* To Date */}
                        <div>
                            <label className={labelClass}>To Date</label>
                            <input type="date" className={inputClass} />
                        </div>

                        {/* IP Address */}
                        {/* <div>
                            <label className={labelClass}>IP Address</label>
                            <select className={inputClass}>
                                <option value="">Select IP</option>
                                <option value="192.168.0.15">192.168.0.15</option>
                                <option value="192.168.0.24">192.168.0.24</option>
                                <option value="192.168.0.54">192.168.0.54</option>
                            </select>
                        </div> */}
                        <div>


                            <label className={labelClass}> IP Address </label>
                            <MultiSelect options={ipaddress}
                                value={selectedip}
                                onChange={setSelectedip}
                                placeholder="Select IP Address"
                                id={"ipaddress"}
                                setValue={setValue} />
                            {errors?.ipaddress && (<p className="text-red-400 text-xs mt-1"> {errors.ipaddress.message} </p>)}
                        </div>

                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3 mt-4 justify-end">
                        <button type="submit" className={btnClass}> Submit </button>

                        <button type="reset" className={resetClass}> Reset  </button>
                    </div>
                </form>
            )}

            {/* TABLE (NO FILTERING, ALWAYS FULL DATA) */}
            {/* TABLE */}
            {showTable && (
                <div className="space-y-4">
                    {/* Back Button */}
                    <button onClick={() =>{ setShowTable(false);  setCurrentPage(1);}} className="px-3 py-2  hover:bg-gray-600 rounded-xl text-sm" > ← Back To Filter </button>

                    <div className="bg-[#0B1220] rounded-2xl p-6 border border-white/10 overflow-x-auto">
                        <table className="w-full text-sm text-left text-white">
                            <thead className="text-xs uppercase bg-white/10">
                                <tr>
                                    <th className="px-4 py-3">IP Address</th>
                                    <th className="px-4 py-3">File Name</th>
                                    <th className="px-4 py-3">Interval Time</th>
                                    <th className="px-4 py-3">Packet Size</th>
                                    <th className="px-4 py-3">Current Packet</th>
                                    <th className="px-4 py-3">Current Status</th>
                                    <th className="px-4 py-3">Destination Path</th>
                                    <th className="px-4 py-3">Created At</th>
                                </tr>
                            </thead>

                            <tbody>
                               {currentRows.map((row, index) => (
                                    <tr key={index} className="border-b border-white/10 hover:bg-white/5">
                                        <td className="px-4 py-3">{row.ipAddress}</td>
                                        <td className="px-4 py-3">{row.appName}</td>
                                        <td className="px-4 py-3">{row.intervalTime}</td>
                                        <td className="px-4 py-3">{row.packetSize}</td>
                                        <td className="px-4 py-3">{row.currentPacket}</td>
                                        <td className="px-4 py-3">{row.currentStatus}</td>
                                        <td className="px-4 py-3">{row.destinationPath}</td>
                                        <td className="px-4 py-3">
                                            {new Date(row.createdAt)
                                                .toLocaleString("en-GB", {
                                                    day: "2-digit",
                                                    month: "2-digit",
                                                    year: "numeric",
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                    hour12: false,
                                                })
                                                .replace(/\//g, "-")
                                                .replace(",", "")}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {/* Pagination */}
<div className="flex items-center justify-between mt-4">
  
  <p className="text-sm text-gray-400">
    Showing {indexOfFirstRow + 1} to{" "}
    {Math.min(indexOfLastRow, contentDisatributiondata.length)} of{" "}
    {contentDisatributiondata.length} entries
  </p>

  <div className="flex gap-2">
    
    {/* Previous */}
    <button
      onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
      disabled={currentPage === 1}
      className={`px-3 py-1 rounded-md text-sm border border-white/10 transition-all
        ${
          currentPage === 1
            ? "bg-gray-800 text-gray-500 cursor-not-allowed"
            : "bg-[#1E293B] hover:bg-[#334155]"
        }`}
    >
      Prev
    </button>

    {/* Page Numbers */}
    {[...Array(totalPages)].map((_, i) => (
      <button
        key={i}
        onClick={() => handlePageChange(i + 1)}
        className={`px-3 py-1 rounded-md text-sm transition-all
          ${
            currentPage === i + 1
              ? "bg-blue-600 text-white"
              : "bg-[#1E293B] hover:bg-[#334155]"
          }`}
      >
        {i + 1}
      </button>
    ))}

    {/* Next */}
    <button
      onClick={() =>
        currentPage < totalPages && handlePageChange(currentPage + 1)
      }
      disabled={currentPage === totalPages}
      className={`px-3 py-1 rounded-md text-sm border border-white/10 transition-all
        ${
          currentPage === totalPages
            ? "bg-gray-800 text-gray-500 cursor-not-allowed"
            : "bg-[#1E293B] hover:bg-[#334155]"
        }`}
    >
      Next
    </button>
  </div>
</div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default IPWiseReport
