import React, { useEffect } from 'react'
import '../layouts/Css/Style.css';
import { useForm } from "react-hook-form";
import MultiSelect from '../layouts/MultiSelect.jsx';
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

import {
    Search,
    RefreshCw,
    Power,
    AlertTriangle,
    DownloadCloud,
    AppWindow,
    Settings,
    ShieldCheck
} from "lucide-react";
import { useState } from "react";
import {
    requestToServerForRemoteAction,
    requestIdForRemoteAction,
    getAllBranchList,
    getBranchWiseIpaddressList

} from "../api/projectApi";
import { AsyncMotionValueAnimation } from 'framer-motion';
import ReusableTable from '../components/Table/ReusableTable.jsx';
import { ToastContainer, toast } from 'react-toastify';


const RemoteAction = () => {
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
    const [loading, setLoading] = useState(false);
    const [dynamicReport, setdynamicReport] = useState({ columndata: [], maindata: [] });
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
    ];

    const patchOptions = [
        { value: "KB5072033", label: "KB5072033" },
        { value: "KB5071547", label: "KB5071547" },
        { value: "KB5071142", label: "KB5071142" },
    ];
    const groupnameOptions = [
        { value: "allcomputers", label: "All Computers" },
        { value: "unassigned", label: "Unassigned Computers" },
        { value: "windows 10", label: "Windows 10" },

    ]

    const patchUpdateParameter = [
        { value: "1", label: "Notify For Download and auto Install" },
        { value: "2", label: "Auto Download And Notify For Install" },
        { value: "3", label: "Auto Download And Schedule The Install" },

    ]

    const [selectedBranches, setSelectedBranches] = useState([]);
    const [selectedIPs, setSelectedIPs] = useState([]);
    const [selectedPatches, setSelectedPatches] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedGroup, setSelectedGroup] = useState("");

    const DEFAULT_COLOR = "#3B82F6";



    const apiMapping = {
        Remote: {
            DetectNow: requestToServerForRemoteAction,
        }

    };

    useEffect(() => {

        initialApiReq();


    }, []);


    const initialApiReq = async () => {
        const data = await getAllBranchList();
        console.log("data --> ", data.data.data);
        const Branches = [
            { label: "ALL", value: "All" },
            ...data.data.data
        ];
        setBranchList(Branches);


    }

    // const modules = [
    //     { id: "detect", name: "Detect Now", icons: FileText, iconcolor: "#3B82F6" },
    //     { id: "report", name: "Report Now", icons: ShieldAlert, iconcolor: "#F59E0B" },
    //     { id: "update", name: "Update Now", icons: ListTree, iconcolor: "#8B5CF6" },
    //     { id: "restart", name: "Restart Now", icons: Monitor, iconcolor: "#06B6D4" },
    //     { id: "missingpatches", name: "Missing Patches", icons: Calendar, iconcolor: "#0EA5E9" },
    //     { id: "discoverpatch", name: "Discover Patches", icons: ListCheck, iconcolor: "#10B981" },
    //     { id: "discoverapp", name: "Discover Application", icons: ClipboardClock, iconcolor: "#6366F1" },
    //     { id: "synchronizepolicy", name: "Set Synchronise Policy", icons: Activity, iconcolor: "#22C55E" },
    //     { id: "policydetails", name: "Policy Details", icons: TriangleAlert, iconcolor: "#EF4444" },
    // ];

    const branchChange = async (Data) => {

        setSelectedBranches(Data);
        const singleBranchlist = Data.map(obj => obj.label);

        const reqData = {
            "branch": singleBranchlist
        }

        const Iplist = await getBranchWiseIpaddressList(reqData);
        setIpAddressList(Iplist.data.data);


    }


    const modules = [
        {
            id: "DetectNow",
            name: "Detect Now",
            icons: Search,
            iconcolor: "#3B82F6"
        },
        {
            id: "report",
            name: "Report Now",
            icons: FileText,
            iconcolor: "#F59E0B"
        },
        {
            id: "update",
            name: "Update Now",
            icons: RefreshCw,
            iconcolor: "#8B5CF6"
        },
        {
            id: "restart",
            name: "Restart Now",
            icons: Power,
            iconcolor: "#06B6D4"
        },
        {
            id: "missingpatches",
            name: "Missing Patches",
            icons: AlertTriangle,
            iconcolor: "#0EA5E9"
        },
        {
            id: "discoverpatch",
            name: "Discover Patches",
            icons: DownloadCloud,
            iconcolor: "#10B981"
        },
        {
            id: "discoverapp",
            name: "Discover Application",
            icons: AppWindow,
            iconcolor: "#6366F1"
        },
        {
            id: "synchronizepolicy",
            name: "Set Synchronise Policy",
            icons: Settings,
            iconcolor: "#22C55E"
        },
        {
            id: "policydetails",
            name: "Policy Details",
            icons: ShieldCheck,
            iconcolor: "#EF4444"
        },
    ];

    const filterConfig = {
        DetectNow: ["branchNames", "ipAddress"],
        report: ["branchNames", "ipAddress"],
        update: ["branchNames", "ipAddress"],
        restart: ["branchNames", "ipAddress"],
        missingpatches: ["branchNames", "ipAddress"],
        discoverpatch: ["branchNames", "ipAddress"],
        discoverapp: ["branchNames", "ipAddress"],
        synchronizepolicy: ["ipAddress", "serverIp", "port", "patchUpdateParameter"]
    };
    const selectedModule = modules[activeIndex];
    const activeFilters = filterConfig[selectedModule?.id] || [];

    const inputClass = "w-full mt-1 bg-[#1E293B] px-3 h-12 text-base rounded-lg border border-[#2A3A55] focus:outline-none focus:ring-2 focus:ring-blue-500";

    const labelClass = "text-base text-gray-300 mb-1 block ";
    const filterFields = {

        branchNames: (
            <div>
                <label className={labelClass}>Branch Name</label>

                <MultiSelect
                    options={branchList}
                    value={selectedBranches}
                    onChange={branchChange}
                    placeholder="Select Branch Names"
                    id={"branchNames"}
                    setValue={setValue}

                />
            </div>
        ),
        ipAddress: (
            <div>
                <label className={labelClass}>IP Address</label>
                <MultiSelect
                    options={ipAddressList}
                    value={selectedIPs}
                    onChange={setSelectedIPs}
                    placeholder="Select IP Addresses"
                    id={"ipAddress"}
                    setValue={setValue}
                />
            </div>
        ),




        patchList: (
            <div>
                <label className={labelClass}>Patch List</label>
                <MultiSelect
                    options={patchOptions}
                    value={selectedPatches}
                    onChange={setSelectedPatches}
                    placeholder="Select Patches"
                    id={"patchList"}
                    setValue={setValue}
                />
            </div>
        ),


        serverIp: (
            <div>
                <label className={labelClass}>Server Ip</label>
                <input
                    type="text"
                    placeholder="Enter ServerIp"
                    className={inputClass}
                    {...register("serverIp")}
                />
            </div>
        ),
        port: (
            <div>
                <label className={labelClass}>Port</label>
                <input
                    type="int"
                    placeholder="Enter port"
                    className={inputClass}
                    {...register("serverIp")}
                />
            </div>
        ),
        patchUpdateParameter: (
            <div>
                <label className="text-base text-gray-300 mb-1 block"> Patch Update Parameter </label>
                <select
                    className="w-full h-12 px-3 bg-[#1E293B] text-white text-base rounded-lg border border-[#2A3A55] focus:outline-none focus:ring-2 focus:ring-blue-500"  {...register("groupname")}
                >
                    <option value=""  >-- Please select value --</option>

                    {patchUpdateParameter.map((g, i) => (
                        <option key={i} value={g.value}>
                            {g.label}
                        </option>
                    ))}
                </select>
            </div>
        )
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

        } catch (error) {
            console.error("API Error:", error);
        }

        console.log("New table data", data)
    }

    const handleSendRequestToMultipleClients = async () => {

        console.log("selectedModule ", selectedModule);

        const inputData = filterConfig[selectedModule?.id];
        console.log("input data", inputData);

        // console.log("customDate",customDate.to);

        const result = inputData.reduce((acc, element) => {
            acc[element] = watch(element);
            return acc;
        }, {});

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


        result["type"] = selectedModule?.id;
        console.log("Final Payload:", result);
        setLoading(true);
        try {
            const data = await apiMapping['Remote'][selectedModule?.id](result);
            console.log("API Response:", data);
            let requestid = data.data.data[0].ReqId;
            console.log("response ---> ", requestid);
            gettabledata(requestid);
            setLoading(false);
            const interval = setInterval(() => {
                gettabledata(requestid);
            }, 10000);

            // Cleanup (VERY IMPORTANT)
            return () => clearInterval(interval);
            // let MainData = data.data.data[0].data;
            // let ColumnData = data.data.data[0].column;
            // let obj = {};
            // obj.maindata = MainData;
            // obj.columndata = ColumnData;
            // console.log("obj ---> ", obj);
            // setdynamicReport(obj)
            //  inputData.forEach(obj =>  setValue(obj , ''));
        } catch (error) {
            console.error("API Error:", error);
        }
    };

    {/* MAIN CONTENT */ }
    return (
        // <div className="min-h-screen bg-[#000000] text-white p-1">
        <div>

            <div className="bg-[#0B1220] rounded-2xl p-6 shadow-xl border border-[#1E293B] ">
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
                {/* Header */}
                {/* <h2 className="text-sm text-gray-400 mb-1">REPORTS</h2> */}
                <h1 className="text-3xl font-semibold mb-6">Remote Action </h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {/* 1. MODULE */}
                    {/* <div className="bg-[#141D2E] rounded-xl p-4"> */}
                    <div className="bg-[#0F172A] rounded-xl p-4">
                        <h2 className="mb-3 font-semibold text-2xl">Actions</h2>

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

                                            <span className={`text-lg ${isActive ? "font-semibold  text-[#7094ff] " : ""}`}>
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
                    <div className="bg-[#0F172A] rounded-xl p-4">
                        <h3 className="mb-3 font-semibold text-2xl">Apply Filter</h3>

                        <div className="grid grid-cols-2 gap-3">
                            {/* {activeFilters.map((key, i) => (
                                <div key={i} className={activeFilters.length % 2 !== 0 && i === activeFilters.length - 1 ? "col-span-2" : ""}>
                                    {filterFields[key]}
                                </div>
                            ))} */}
                            {activeFilters.map((key, i) => (
                                <React.Fragment key={i}>

                                    {/* Normal filter */}
                                    <div>{filterFields[key]}</div>

                                    {/* 🔥 Dependent filters based on category */}
                                    {key === "category" && selectedCategory === "deployment" && (
                                        <>
                                            <div>{filterFields["ipAddress"]}</div>
                                            <div>{filterFields["patchList"]}</div>
                                        </>
                                    )}

                                    {key === "category" && selectedCategory === "endpoint" && (
                                        <div>{filterFields["ipAddress"]}</div>
                                    )}

                                    {key === "category" && selectedCategory === "patch" && (
                                        <div>{filterFields["patchList"]}</div>
                                    )}

                                </React.Fragment>
                            ))}
                        </div>
                    </div>


                </div>


                {/* Generate Button */}
                <div className="flex justify-end mt-6">
                    <button className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-lg" onClick={() => { handleSendRequestToMultipleClients() }}>
                        Send Request
                    </button>
                </div>
            </div>

            {/* 🔥 Divider */}
            {/* <div className="my-6 h-[1px] bg-gradient-to-r from-transparent via-gray-500 to-transparent"></div> */}
            <div className="flex items-center my-6">
                <div className="flex-grow h-px bg-gray-700"></div>
                <span className="px-4 text-sm text-gray-400">LIVE STATUS</span>
                <div className="flex-grow h-px bg-gray-700"></div>
            </div>


            {/* Bottom Section */}
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
    )
}

export default RemoteAction