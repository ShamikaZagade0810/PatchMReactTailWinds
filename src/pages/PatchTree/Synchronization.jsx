import React, {useState } from 'react'

import { ChevronLeft, ChevronRight, RefreshCw, Download  } from "lucide-react";

const Synchronization = () => {
    const SynchronizationData = [
    { srNo: 1, startDate: "2/19/2026 6:48:01 AM", finishDate: "2/19/2026 6:49:25 AM", type: "Automatic", result: "Succeeded" },
    { srNo: 2, startDate: "2/18/2026 12:42:07 PM", finishDate: "2/18/2026 12:42:51 PM", type: "Manual", result: "Succeeded" },
    { srNo: 3, startDate: "2/18/2026 6:48:01 AM", finishDate: "2/18/2026 6:50:26 AM", type: "Automatic", result: "Succeeded" },
    { srNo: 4, startDate: "2/17/2026 6:48:04 AM", finishDate: "2/17/2026 6:50:48 AM", type: "Automatic", result: "Succeeded" },
    { srNo: 5, startDate: "2/16/2026 6:48:00 AM", finishDate: "2/16/2026 6:51:08 AM", type: "Automatic", result: "Succeeded" },
    { srNo: 6, startDate: "2/15/2026 7:33:09 AM", finishDate: "2/15/2026 7:33:09 AM", type: "Automatic", result: "Failed" },
    { srNo: 7, startDate: "2/15/2026 7:18:07 AM", finishDate: "2/15/2026 7:18:07 AM", type: "Automatic", result: "Failed" },
    { srNo: 8, startDate: "2/15/2026 7:03:04 AM", finishDate: "2/15/2026 7:03:04 AM", type: "Automatic", result: "Failed" },
    { srNo: 9, startDate: "2/15/2026 6:48:02 AM", finishDate: "2/15/2026 6:48:02 AM", type: "Automatic", result: "Failed" },
    { srNo: 10, startDate: "2/14/2026 6:48:01 AM", finishDate: "2/14/2026 6:50:54 AM", type: "Automatic", result: "Succeeded" },
    { srNo: 11, startDate: "2/13/2026 6:48:04 AM", finishDate: "2/13/2026 7:03:42 AM", type: "Automatic", result: "Succeeded" },
    { srNo: 12, startDate: "2/12/2026 6:48:00 AM", finishDate: "2/12/2026 6:50:25 AM", type: "Automatic", result: "Succeeded" },
    { srNo: 13, startDate: "2/11/2026 6:48:03 AM", finishDate: "2/11/2026 6:53:27 AM", type: "Automatic", result: "Succeeded" },
    { srNo: 14, startDate: "2/10/2026 6:48:04 AM", finishDate: "2/10/2026 6:49:40 AM", type: "Automatic", result: "Succeeded" },
    { srNo: 15, startDate: "2/9/2026 6:48:01 AM", finishDate: "2/9/2026 6:50:45 AM", type: "Automatic", result: "Succeeded" },
    { srNo: 16, startDate: "2/7/2026 6:48:00 AM", finishDate: "2/7/2026 6:49:39 AM", type: "Automatic", result: "Succeeded" },
    { srNo: 17, startDate: "2/6/2026 6:48:04 AM", finishDate: "2/6/2026 6:50:47 AM", type: "Automatic", result: "Succeeded" },
    { srNo: 18, startDate: "2/5/2026 7:33:09 AM", finishDate: "2/5/2026 7:33:09 AM", type: "Automatic", result: "Failed" },
    { srNo: 19, startDate: "2/5/2026 7:18:06 AM", finishDate: "2/5/2026 7:18:06 AM", type: "Automatic", result: "Failed" },
    { srNo: 20, startDate: "2/5/2026 7:03:04 AM", finishDate: "2/5/2026 7:03:04 AM", type: "Automatic", result: "Failed" }
];
//   const [SynchronizationData, setASynchronizationData] = useState([]);
     const [loading, setLoading] = useState(false);

     const PAGE_SIZE = 10;
      const [currentPage, setCurrentPage] = useState(1);

    const totalRecords = SynchronizationData.length;
    const totalPages = Math.ceil(totalRecords / PAGE_SIZE);

    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;

    const currentData = SynchronizationData.slice(startIndex, endIndex);

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handlePrev = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

 const labelClass = "text-[15px] text-[#d1d5db] mb-1 block";
    const inputClass = "w-full h-[34px] px-2 text-[12px] bg-[#1E293B] text-white rounded-md border border-[#2A3A55] focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500";
    const btnClass = "px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.03] active:scale-[0.97] focus:outline-none focus:ring-2 focus:ring-blue-400/60";
 const resetClass = "px-6 py-2 bg-gradient-to-r from-gray-800 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white rounded-lg transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.03] active:scale-[0.97] focus:outline-none focus:ring-2 focus:ring-blue-400/60";
    

  return (
      <div className="bg-[#0B1220] rounded-2xl p-6">
            {/* <h2 className="text-lg font-semibold mb-4">
                Synchronization History
            </h2> */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-5">
          <div>
            <h1 className="text-xl font-bold"> Synchronization History </h1>           
          </div>

          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-3 py-2 text-xs rounded-lg bg-[#111827] border border-[#1e293b] bg-gray-800 hover:bg-gray-700 hover:border-gray-800 transition-all duration-300">
              <RefreshCw size={14} /> Discover
            </button>
            

          </div>

        </div>

            {/* Top Right Info */}
            <div className="flex justify-end mb-2 text-sm text-gray-400">
                Showing {Math.min(endIndex, totalRecords)} of {totalRecords}
            </div>

            <div className="overflow-x-auto">
                <div className="rounded-xl border border-white/10 overflow-hidden">
                    <table className="w-full text-sm">
                        <thead className="text-gray-300 bg-[#1E293B]">
                            <tr>
                                <th className="p-3 text-left">Sr No</th>
                                <th className="p-3 text-left">Start Date</th>
                                <th className="p-3 text-left">Finish Date</th>
                                <th className="p-3 text-left">Type</th>
                                <th className="p-3 text-left">Result</th>
                            </tr>
                        </thead>

                        <tbody>
                            {currentData.map((item, index) => (
                                <tr
                                    key={index}
                                    className="border-b border-white/10 last:border-b-0 hover:bg-[#172033] transition"
                                >
                                    <td className="p-3">{item.srNo}</td>
                                    <td className="p-3">{item.startDate}</td>
                                    <td className="p-3">{item.finishDate}</td>
                                    <td className="p-3">{item.type}</td>
                                    <td className="p-3">
                                        <span
                                            className={
                                                item.result === "Succeeded"
                                                    ? "text-emerald-400"
                                                    : "text-red-400"
                                            }
                                        >
                                            {item.result}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Bottom Pagination */}
            <div className="flex justify-between items-center mt-3 text-sm text-gray-400">
    <div>
        Page {currentPage} / {totalPages}
    </div>

    <div className="flex gap-3 items-center">
        {/* Prev */}
        <button onClick={handlePrev} disabled={currentPage === 1}
            className="w-9 h-9 flex items-center justify-center rounded-lg bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 disabled:opacity-30 disabled:cursor-not-allowed"   >
            <ChevronLeft size={18} />
        </button>

        {/* Next */}
        <button onClick={handleNext} disabled={currentPage === totalPages}
        className="w-9 h-9 flex items-center justify-center rounded-lg bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 disabled:opacity-30 disabled:cursor-not-allowed"    >
            <ChevronRight size={18} />
        </button>
    </div>
</div>
        </div>
  )
}

export default Synchronization
