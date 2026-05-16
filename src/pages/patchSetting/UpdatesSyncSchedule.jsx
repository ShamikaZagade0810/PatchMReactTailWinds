import React, { useState, useRef, useEffect } from 'react';
import {
    Clock3,
    RefreshCcw,
    CalendarClock,
    ShieldCheck,
    Zap,
    RotateCw,
    Search,
    Circle,
    RotateCcw,
    Save,
    CalendarDays,
} from "lucide-react";

const UpdatesSyncSchedule = () => {

    const [syncMode, setSyncMode] = useState("manual");
    const [syncPerDay, setSyncPerDay] = useState(4);
    const [firstSync, setFirstSync] = useState("08:00");
    const [status, setStatus] = useState("Pending");
   
    // const [tableData, setTableData] = useState([]);
 const tableData = [
    { syncType: "manual", firstSyncOn: "NA", syncPerDay: "NA" }
];


    const syncOptions = Array.from({ length: 24 }, (_, i) => i + 1);

    const isManual = syncMode === "manual";

    const handleSubmit = () => {
        const payload = {
            syncType: isManual ? "Manual" : "Automatic",
            firstSync: isManual ? "NA" : firstSync,
            perDay: isManual ? "NA" : `${syncPerDay}×`,
            status: "Saved",
        };

        console.log("submit payload "+payload);

        setStatus("Saved");

        // setTableData([payload]);
    };

    const handleReset = () => {
    setSyncMode("manual");
    setSyncPerDay(4);
    setFirstSync("08:00");
    setStatus("Pending");
    };

    const inputRef = useRef(null);

      const openPicker = () => {
    inputRef.current?.showPicker?.(); // modern Chrome
    inputRef.current?.click();        // fallback
  };


    return (
        <>
            <div className="min-h-screen text-white p-2">
                {/* Main Wrapper */}
                <div className="bg-[#0B1220] rounded-xl p-2 border border-white/10">
                    {/* Header */}
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 p-4 border-b border-white/10">
                        <div>
                            <h2 className="text-xl font-semibold"> Update Sync Schedule  </h2>
                            <p className="text-xs text-gray-400 mt-1">Configure when and how often updates synchronize from Microsoft Update. </p>
                        </div>

                        <div className="flex items-center gap-3">
                            <button onClick={handleReset} className="h-10 px-4 rounded-lg border border-white/10 bg-[#131D2E] hover:bg-[#182335] transition-all flex items-center gap-2 text-sm">
                                <RotateCcw size={16} /> Reset
                            </button>


                            <button onClick={handleSubmit} className="h-10 px-5 rounded-lg bg-blue-600 hover:bg-blue-700 transition flex items-center gap-2 text-sm font-medium shadow-md shadow-blue-500/20">
                                <Save size={16} /> Submit
                            </button>
                        </div>
                    </div>

                    {/* Top Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 p-4">
                        {/* Card 1 */}
                        <div className="bg-[#0E1728] rounded-xl p-4 border border-white/10">
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-xs text-gray-400">Sync mode</p>
                                    <h2 className="text-xl font-semibold mt-2"> {isManual ? "Manual" : "Automatic"} </h2>
                                    <p className="text-xs text-gray-400 mt-1"> {isManual ? "On-demand only" : "Scheduled runs"} </p>
                                </div>

                                <div className={`h-9 w-9 rounded-lg flex items-center justify-center ${isManual
                                    ? "bg-cyan-500/10 text-cyan-400"
                                    : "bg-yellow-500/10 text-yellow-400"}`} >
                                    {isManual ? <RefreshCcw size={18} /> : <Zap size={18} />}
                                </div>

                            </div>
                        </div>

                        {/* Card 2 */}
                       <div className="bg-[#0E1728] rounded-xl p-4 border border-white/10">
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-xs text-gray-400">First sync at</p>
                                    <h2 className="text-xl font-semibold mt-2"> {isManual ? "--" : firstSync} </h2>
                                    <p className="text-xs text-gray-400 mt-1"> Local time </p>
                                </div>
                            </div>
                        </div>

                        {/* Card 3 */}
                       <div className="bg-[#0E1728] rounded-xl p-4 border border-white/10">
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-xs text-gray-400">Per day</p>
                                    <h2 className="text-xl font-semibold mt-2"> {isManual ? "--" : `${syncPerDay}×`} </h2>
                                    <p className="text-xs text-gray-400 mt-1"> {isManual ? "Manual" : `Every ${Math.floor(24 / syncPerDay)}h`}</p>
                                </div>
                                <div className="h-9 w-9 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
                                    <RefreshCcw size={18} />
                                </div>
                            </div>
                        </div>

                        {/* Card 4 */}
                       <div className="bg-[#0E1728] rounded-xl p-4 border border-white/10">
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-xs text-gray-400">Status</p>
                                    <h2 className="text-xl font-semibold mt-2">{status}</h2>
                                    <p className="text-xs text-gray-400 mt-1">  {status === "Saved" ? "Configuration updated" : "Awaiting submit"} </p>
                                </div>
                                <div className={`h-9 w-9 rounded-lg flex items-center justify-center ${ status === "Saved"
                                            ? "bg-green-500/10 text-green-400"
                                            : "bg-yellow-500/10 text-yellow-400" }`} >
                                    <ShieldCheck size={18} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Section */}
                    <div className="grid grid-cols-1 xl:grid-cols-6 gap-4 p-4 pt-0">
                        {/* Left Schedule Card */}
                        <div className="xl:col-span-3 bg-[#0E1728] rounded-xl border border-white/10 overflow-hidden">
                            {/* Header */}
                            <div className="p-5 border-b border-white/10 flex items-start gap-3">
                                <div className="h-10 w-10 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
                                    <CalendarClock size={20} />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-[15px]"> Updates Synchronization Schedule </h3>
                                    <p className="text-xs text-gray-400 mt-1"> Choose how this server pulls updates </p>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-4 space-y-5">
                                {/* Mode Selection */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {/* Manual */}
                                    <div
                                        onClick={() => setSyncMode("manual")}
                                        className={`cursor-pointer rounded-xl border p-4 transition-all ${syncMode === "manual" ? "border-cyan-500 bg-cyan-500/10" : "border-white/10 bg-[#101A2C]"
                                            }`}
                                    >
                                        <div className="flex items-start justify-between">
                                            <div className="flex gap-3">
                                                <div className="h-9 w-9 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center">
                                                    <RefreshCcw size={18} />
                                                </div>
                                                <div>
                                                    <h4 className="font-medium text-sm"> Synchronize Manually </h4>
                                                    <p className="text-xs text-gray-400 mt-1"> Trigger sync only when you choose to.
                                                    </p>
                                                </div>
                                            </div>

                                            <div className={`h-3 w-3 rounded-full mt-1 ${syncMode === "manual" ? "bg-cyan-500" : "border border-white/20"}`} />
                                        </div>
                                    </div>

                                    {/* Automatic */}
                                    <div
                                        onClick={() => setSyncMode("auto")}
                                        className={`cursor-pointer rounded-xl border p-4 transition-all ${syncMode === "auto" ? "border-cyan-500 bg-cyan-500/10" : "border-white/10 bg-[#101A2C]"}`} >
                                        <div className="flex items-start justify-between">
                                            <div className="flex gap-3">
                                                <div className="h-9 w-9 rounded-lg bg-yellow-500/10 text-yellow-400 flex items-center justify-center">
                                                    <Zap size={18} />
                                                </div>
                                                <div>
                                                    <h4 className="font-medium text-sm"> Synchronize Automatically </h4>
                                                    <p className="text-xs text-gray-400 mt-1"> Run on a recurring schedule. </p>
                                                </div>
                                            </div>

                                            <div
                                                className={`h-3 w-3 rounded-full mt-1 ${syncMode === "auto" ? "bg-cyan-500" : "border border-white/20"}`} />
                                        </div>
                                    </div>
                                </div>

                                {/* Time */}
                                <div>
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm text-gray-300">First sync on</label>
        <span className="text-xs text-gray-500">24-hour local time</span>
      </div>

      {/* Custom UI */}
      <div onClick={openPicker}
        className="h-10 rounded-xl border border-white/10 bg-[#101A2C] px-4 flex items-center justify-between cursor-pointer"     >
        <div className="flex items-center gap-3 text-gray-400">
          <Clock3 size={16} />
          <span>{firstSync}</span>
        </div>
        <Circle size={12} className="text-gray-600" />
      </div>
      {/* Hidden native input */}
      <input ref={inputRef}
        type="time"
        value={firstSync}
        onChange={(e) => setFirstSync(e.target.value)}
        className="absolute opacity-0 pointer-events-none"  />
    </div>

                                {/* Sync Per Day */}
                                <div>
                                    <div className="flex items-center justify-between mb-3">
                                        <label className="text-sm text-gray-300"> Synchronizations per day </label>
                                        <span className="text-xs text-gray-500"> Every 6 hours </span>
                                    </div>
                                    <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                                        {syncOptions.map((item) => (
                                        <button key={item} onClick={() => setSyncPerDay(item)} className={`h-9 rounded-lg text-sm transition-all border ${
                                            syncPerDay === item
                                            ? "bg-cyan-500/20 border-cyan-500 text-cyan-300"
                                            : "bg-[#101A2C] border-white/10 text-gray-400 hover:border-white/20" }`} >
                                        {item}
                                        </button> ))}
                                    </div>
                                </div>

                                {/* Footer Info */}
                                <div className="rounded-xl border border-white/10 bg-[#101A2C] p-4 flex items-start gap-3">
                                    <div className="text-cyan-400 mt-0.5">
                                        <RotateCw size={16} />
                                    </div>
                                    <p className="text-sm text-gray-400 leading-6"> Changes apply on submit. Previously running schedules
                                        will be replaced without losing in-flight syncs.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Right Table */}
                        <div className="xl:col-span-3 bg-[#0E1728] rounded-xl border border-white/10 overflow-hidden">
                            {/* Header */}
                            <div className="p-5 border-b border-white/10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                                <div className="flex items-start gap-3">
                                    <div className="h-10 w-10 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
                                        <RefreshCcw size={20} />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-[15px]"> View Updates Synchronization Schedule </h3>
                                        <p className="text-xs text-gray-400 mt-1"> Past and current schedules </p>
                                    </div>
                                </div>

                                {/* Search */}
                                <div className="relative w-full lg:w-[260px]">
                                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />

                                    <input type="text" placeholder="Search..."
                                        className="w-full h-11 rounded-xl bg-[#101A2C] border border-white/10 pl-10 pr-4 text-sm outline-none focus:border-cyan-500/40" />
                                </div>
                            </div>

                            {/* Table */}
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="border-b border-white/10">
                                        <tr className="text-left text-xs text-gray-500 uppercase">
                                            <th className="px-6 py-4 font-medium"> Sync Type </th>
                                            <th className="px-6 py-4 font-medium"> First Sync On </th>
                                            <th className="px-6 py-4 font-medium"> Sync Per Day </th>
                                        </tr>
                                    </thead>

                                    <tbody>
  {tableData.map((item, index) => (
    <tr
      key={index}
      className="border-b border-white/5 hover:bg-white/[0.02] transition-all"
    >
      <td className="px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="h-2 w-2 rounded-full bg-cyan-400" />

          <span className="text-xs capitalize">
            {item.syncType}
          </span>
        </div>
      </td>

      <td className="px-5 py-4 text-xs text-gray-400">
        {item.firstSyncOn}
      </td>

      <td className="px-5 py-4 text-xs text-gray-400">
        {item.syncPerDay}
      </td>
     
    </tr>
  ))}
</tbody>
                                </table>
                            </div>

                            {/* Footer */}
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 px-6 py-4">
                                <p className="text-sm text-gray-500"> Showing 1 to 1 of 1 entries </p>
                                <div className="flex items-center gap-2">
                                    <button className="h-9 px-3 rounded-lg border border-white/10 bg-[#101A2C] text-sm text-gray-400"> Previous </button>
                                    <button className="h-9 w-9 rounded-lg bg-cyan-600 text-sm font-medium"> 1 </button>
                                    <button className="h-9 px-3 rounded-lg border border-white/10 bg-[#101A2C] text-sm text-gray-400"> Next </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UpdatesSyncSchedule
