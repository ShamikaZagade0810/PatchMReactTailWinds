import React, { useEffect } from 'react'
import '../../layouts/Css/Style.css';
import { useForm } from "react-hook-form";
import MultiSelect from '../../layouts/MultiSelect.jsx';
import Select, { components } from "react-select";
import {
    Calendar,
    FileText,
    ShieldAlert,
    ClipboardClock,
    ListCheck,
    ListTree,
    Monitor,
    Radius,
    SquareActivity,
    Activity,
    TriangleAlert

} from "lucide-react";
import { useState } from "react";
import {
    getThirdPartyCompletedApps,
    getThirdPartyPendingApps,
    getThirdPartyFailedApps
} from "../../api/projectApi";
import { ToastContainer, toast } from 'react-toastify';
import { AsyncMotionValueAnimation } from 'framer-motion';
import ReusableTable from '../../components/Table/ReusableTable.jsx';


const ThirdPartyReport = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setValue
    } = useForm();
    const [activeIndex, setActiveIndex] = useState(null);
    const [selectedRange, setSelectedRange] = useState(null);
    const [showCustomDates, setShowCustomDates] = useState(false);
    const [branchList, setBranchList] = useState([]);
    const [ipAddressList, setIpAddressList] = useState([]);
    const [dynamicReport, setdynamicReport] = useState({ columndata: [], maindata: [] });
    const [loading, setLoading] = useState(false);
    const [customDate, setCustomDate] = useState({
        from: "",
        to: ""
    });

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

    const patchOptions = [
        { value: "KB5072033", label: "KB5072033" },
        { value: "KB5071547", label: "KB5071547" },
        { value: "KB5071142", label: "KB5071142" },
        { value: "KB5010475", label: "KB5010475" },
    ];
    const groupnameOptions = [
        { value: "allcomputers", label: "All Computers" },
        { value: "unassigned", label: "Unassigned Computers" },
        { value: "windows 10", label: "Windows 10" },

    ]

    const [selectedBranches, setSelectedBranches] = useState([]);
    const [selectedIPs, setSelectedIPs] = useState([]);
    const [selectedPatches, setSelectedPatches] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedGroup, setSelectedGroup] = useState("");

    const DEFAULT_COLOR = "#3B82F6";



    const branchChange = async (Data) => {

        setSelectedBranches(Data);
        const singleBranchlist = Data.map(obj => obj.label);

        const reqData = {
            "branch": singleBranchlist
        }

        const Iplist = await getBranchWiseIpaddressList(reqData);
        setIpAddressList(Iplist.data.data);

    }






    const apiMapping = {
        Report: {
            completed: getThirdPartyCompletedApps,
            failed: getThirdPartyFailedApps,
            pending: getThirdPartyPendingApps,
            // patchProgressRep: getYearMonthReport,

        }

    };



    const modules = [
        { id: "completed", name: "Completed Report", icons: FileText, iconcolor: "#3B82F6" },
        { id: "failed", name: "Failed Report", icons: ShieldAlert, iconcolor: "#F59E0B" },
        { id: "pending", name: "Pending Report", icons: ListTree, iconcolor: "#8B5CF6" },
        { id: "patchProgressRep", name: "Patch Progress Report", icons: Monitor, iconcolor: "#06B6D4" },
        // { id: "yearMonth", name: "Year & Month Wise Patches Report", icons: Calendar, iconcolor: "#0EA5E9" },
        // { id: "status", name: "All Status Patch Report", icons: ListCheck, iconcolor: "#10B981" },
        // { id: "timeline", name: "Update Timeline Report", icons: ClipboardClock, iconcolor: "#6366F1" },
        // { id: "agent", name: "Device Agent Status Report", icons: Activity, iconcolor: "#22C55E" },
        // { id: "failed", name: "Failed Update Report", icons: TriangleAlert, iconcolor: "#EF4444" },
    ];

    const filterConfig = {
        patch: ["update", "type"],
        missing: ["branchNames", "ipAddresses"],
        category: ["year", "month", "category"],
        device: ["branchNames", "ipAddresses"],
        yearMonth: ["year", "month"],
        status: ["branchNames", "ipAddresses"],
        timeline: ["groupname"],
        agent: [],
        failed: [],

    };
    const selectedModule = modules[activeIndex];
    const activeFilters = filterConfig[selectedModule?.id] || [];

    const inputClass =
        "w-full mt-1 bg-[#1E293B] px-3 h-12 text-base rounded-lg border border-[#2A3A55] focus:outline-none focus:ring-2 focus:ring-blue-500";

    const labelClass = "text-base text-gray-300 mb-1 block ";



    const handleGenerateReportClick = async () => {


        console.log("selected module", selectedModule?.id);
        const result = {};


        if (customDate.from == "" || customDate.to == "") {
            toast("Plz Fill The Date Range Field!! ");
            return;
        } else {
            result["fromDate"] = customDate.from;
            result["toDate"] = customDate.to;
        }



        console.log("Final Payload:", result);
        const emptyFields = Object.entries(result)
            .filter(([key, value]) =>
                value === null ||
                value === undefined ||
                value === ""
            )
            .map(([key]) => key);

        if (emptyFields.length > 0) {
            toast.error(`Please fill the following fields: ${emptyFields.join(", ")}`);
            return;
        }


        setLoading(true);
        try {
            const data = await apiMapping['Report'][selectedModule?.id](result);
            console.log("API Response:", data);
            let MainData = data.data.data[0].data;
            let ColumnData = data.data.data[0].column;
            let obj = {};
            obj.maindata = MainData;
            obj.columndata = ColumnData;
            console.log("obj ---> ", obj);
            setdynamicReport(obj)

        } catch (error) {
            console.error("API Error:", error);
        }
        setLoading(false);
    };

    {/* MAIN CONTENT */ }
    return (
        <div className="min-h-screen bg-[#000000] text-white p-1">
            <ToastContainer />
            {loading && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[999]">
                    <div className="flex flex-col items-center gap-3">

                        {/* Spinner */}
                        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

                        {/* Text */}
                        <p className="text-white text-sm">Loading data...</p>

                    </div>
                </div>
            )}

            <div className="bg-[#0B1220] rounded-2xl p-6 ">
                {/* Header */}
                {/* <h2 className="text-sm text-gray-400 mb-1">REPORTS</h2> */}
                <h1 className="text-2xl font-semibold mb-6">Report Center</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {/* 1. MODULE */}
                    {/* <div className="bg-[#141D2E] rounded-xl p-4"> */}
                    <div className="bg-[#0F172A] rounded-xl p-4">
                        <h2 className="mb-3 font-semibold text-lg">1. Report Name</h2>

                        <div className="h-[320px] overflow-y-auto pr-2 space-y-2 hide-scrollbar">
                            {modules.map((item, i) => {
                                const Icon = item.icons;
                                const isActive = activeIndex === i;

                                return (
                                    <div
                                        key={i}
                                        onClick={() => { setActiveIndex(i); setSelectedBranches([]); setSelectedIPs([]); }}
                                        className={`flex justify-between items-center p-3 rounded-lg cursor-pointer transition-colors 
                                                ${isActive ? "border border-[#7094ff]/40 bg-[#7094ff]/30 text-[#4f73e6] shadow-lg"
                                                : "bg-[#1E293B] hover:bg-[#273449]"}
                                                 `} >
                                        {/* Left side */}
                                        <div className="flex items-center gap-3">
                                            <div className={`p-2 rounded-md ${isActive ? "bg-white/10" : "bg-[#141D2E]"}`}>
                                                <Icon size={20} style={{ color: isActive ? "#ffffff" : item.iconcolor }} />
                                            </div>

                                            <span className={`text-sm ${isActive ? "font-semibold  text-[#7094ff] " : ""}`}>
                                                {item.name}
                                            </span>
                                        </div>

                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* 2. REPORT */}
                    {/* <div className="bg-[#0F172A] rounded-xl p-4">
                        <h3 className="mb-3 font-semibold text-xl">2. Report</h3>

                        <div className="bg-[#141D2E] p-3 rounded-lg flex justify-between items-center cursor-pointer">
                            <span>Prevented App</span>
                            <span className="text-blue-400">✓</span>
                        </div>
                    </div> */}

                    {/* 3. Filter*/}


                    {/* 4. DATE RANGE */}

                    <div className="bg-[#0F172A] rounded-xl p-4">

                        <h3 className="mb-3 font-semibold text-lg text-white">
                            Select Date Range
                        </h3>

                        <div className="grid grid-cols-2 gap-3">
                            {/* {["This Week", "Last Month", "Last 6 Months", "Custom"].map((item, i) => { */}
                            {/* {["This Week", "Last Month", "Last 6 Months", "Custom"].map((item, i) => {
                                    const isActive = selectedRange === item;

                                    return (
                                        <button
                                            key={i}
                                            onClick={() => {
                                                setSelectedRange(item);

                                                if (item === "Custom") {
                                                    setShowCustomDates(true);
                                                } else {
                                                    setShowCustomDates(false);
                                                }
                                            }}
                                            className={` h-12 rounded-lg text-base font-medium transition-all border
                                                    ${isActive ? "border border-[#7094ff]/40 bg-[#7094ff]/30 text-[#4f73e6] shadow-md"
                                                    : "bg-[#141D2E] text-gray-300 border-[#2A3A55] hover:bg-[#1B2A44]"}
                                                     `} >
                                            {item}
                                        </button>
                                    );
                                })}
                            </div> */}
                            {/* fromdate --> todate */}
                            {/* {showCustomDates && (
                                <div className="grid grid-cols-2 gap-3 mt-4"> */}

                            {/* From Date */}
                            <div>
                                <label className="text-sm text-gray-300 mb-1 block"> From Date </label>
                                <input
                                    type="date"
                                    value={customDate.from}
                                    onChange={(e) =>
                                        setCustomDate({ ...customDate, from: e.target.value })
                                    }

                                    className="w-full h-10 px-3 bg-[#1E293B] text-white text-sm rounded-lg border border-[#2A3A55] focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* To Date */}
                            <div>
                                <label className="text-sm text-gray-300 mb-1 block"> To Date </label>
                                <input type="date"
                                    value={customDate.to}
                                    onChange={(e) =>
                                        setCustomDate({ ...customDate, to: e.target.value })
                                    }

                                    className="w-full h-10 px-3 bg-[#1E293B] text-white text-sm rounded-lg border border-[#2A3A55] focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                        </div>
                        {/* )} */}
                        {/* fromdate--> todateend */}
                    </div>

                </div>


                {/* Generate Button */}
                <div className="flex justify-end mt-6">
                    <button className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-lg" onClick={() => { handleGenerateReportClick() }}>
                        Generate Report
                    </button>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="bg-[#111C2E] rounded-2xl mt-6 p-10 text-center">
                <h3 className="text-md text-gray-200 mb-2">REPORT</h3>
                {/* <h2 className="text-xl font-semibold mb-2">
                    No Report Generated Yet
                </h2>
                <p className="text-gray-400">
                    Configure the filters above and click Generate Report.
                </p> */}
                <ReusableTable data={dynamicReport.maindata} columns={dynamicReport.columndata} pageSize={10} />


            </div>
        </div>
    )
}

export default ThirdPartyReport
