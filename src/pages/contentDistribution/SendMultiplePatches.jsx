import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import MultiSelect from "../../layouts/MultiSelect";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';

// import MultipleRunForm from "../MultipleRunForm";

import { Plus, List, Play, Pencil, Trash2 } from "lucide-react";
import {
    getAllBranchList,
    getBranchWiseIpaddressList,
    sendMultiplePatches,
    getDownloadingPatchProgress
} from "../../api/projectApi";


const SendMultiplePatches = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setValue,
        reset
    } = useForm();
    const [activeTab, setActiveTab] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editData, setEditData] = useState(null);
    const [branchList, setBranchList] = useState([]);
    const [selectedHostName, setSelectedHostName] = useState([]);
    const [hostNameList, setHostNameList] = useState([]);
    const [viewDownloadingProgressData, setViewDownloadingProgressData] = useState([]);
    const [file, setFile] = useState(null);


    useEffect(() => {


        initialApiReq();

    }, []);


    const initialApiReq = async () => {
        const data = await getAllBranchList();
        console.log("data --> ", data.data.data);
        setBranchList(data.data.data);


    }


    const tabs = [
        { label: "IP's To Send Patches", icon: <Plus size={16} /> },
        { label: "View Sending Patches", icon: <List size={16} /> }


    ];

    const rumtable = [
        { "ActivityName": "Restart Service", "Command": "net stop / start", "SubCommand": "Spooler" },
        { "ActivityName": "Check Disk", "Command": "chkdsk", "SubCommand": "/f" },
        { "ActivityName": "Ping Cmd", "Command": "ping 192.168.0.15", "SubCommand": "ping 192.168.0.15" }
    ]




    const labelClass = "text-[15px] text-[#d1d5db] mb-1 block";
    const inputClass = "w-full h-[34px] px-2 text-[12px] bg-[#1E293B] text-white rounded-md border border-[#2A3A55] focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500";
    const btnClass =
        "px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.03] active:scale-[0.97] focus:outline-none focus:ring-2 focus:ring-blue-400/60";
    const branchOptions = [
        { value: "npcil", label: "NPCIL" },
        { value: "sbi", label: "SBI" },
        { value: "hdfc", label: "HDFC" },
        { value: "icici", label: "ICICI" }
    ];


    const handleBranchChange = async (branch) => {

        console.log("Hello Branch", branch);
        let singleBranchlist = [];
        singleBranchlist.push(branch)
        const reqData = {
            "branch": singleBranchlist
        }

        const Iplist = await getBranchWiseIpaddressList(reqData);
        setHostNameList(Iplist.data.data);



    }


    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleNextClick = () => {
        console.log("Handle Click ", watch('hostNames'));
    }

    const onSubmit = async (e) => {

        // try {
        //     const formData = new FormData();

        //     formData.append("branch", "gh"); // use state/value, not string

        //     if (!file) {
        //         console.error("File is missing");
        //         return;
        //     }

        //     formData.append("file", file);

        //     const res = await sendMultiplePatches(formData);

        //     console.log("Success:", res.data);

        // } catch (err) {
        //     console.error("Upload error:", err);
        // }


    };


    const handleUpload = async () => {

        // if (!selectedFile) {
        //     alert("Please select a file");
        //     return;
        // }
        console.log("File ", file);
        const ipList = watch('ipAddress');

        console.log("file", file);
        console.log("ipAddress", watch('ipAddress'));
        console.log("DestPath", watch('DestPath'));
        console.log("packetsize", watch('packetsize'));
        console.log("timeout", watch('timeout'));
        console.log("intervaltime", watch('intervaltime'));
        console.log("executevalue", watch('executevalue'));




        try {

            const formData = new FormData();


            formData.append("file", file);
            formData.append("ipAddress", ipList);
            formData.append("destPath", watch('DestPath'));
            formData.append("packetsize", watch('packetsize'));
            formData.append("timeout", watch('timeout'));
            formData.append("intervaltime", watch('intervaltime'));
            formData.append("executevalue", watch('executevalue'));


            const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwb2MiLCJpYXQiOjE3Nzg0ODExOTMsImV4cCI6MTc3ODU2NzU5M30.g4KwgWuH5CKUGuPfrTGEeGFVk3NTLx8qlDet5X1LkzI';
            const response = await axios.post(
                "http://192.168.0.54:8081/upload/contentDistribution",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Authorization": `Bearer ${token}`
                    },
                }
            );
            console.log("response ", response);
            if (response.status == 200) {
                toast.success(response.data);
            } else {
                toast.error(response.data);
            }
            reset();
            // setMessage(response.data);
            // setActiveTab(1);
        } catch (error) {
            console.error(error);
            // setMessage("File upload failed");
        }
    };


    const SendPatches = async () => {


        const formData = new FormData();
        formData.append("branch", "hello");
        formData.append("file", file);
        console.log(file);

        try {
            const res = await axios.post(
                "http://localhost:8080/upload/contentDistribution",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            );

            console.log("Success:", res.data);
        } catch (err) {
            console.error("Upload error:", err);
        }
    };



    // 🔹 TAB 1 → Add Activity
    const AddActivityForm = () => (
        <>
            <form onSubmit={handleSubmit(handleUpload)}>

                <div className="bg-[#0B1220] rounded-2xl p-6 border border-white/10 shadow-xl">

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                        {/* Branch */}
                        <div>
                            <label className={labelClass}>Branch Name</label>

                            <select
                                className={inputClass}
                                {...register("branchName", {
                                    required: "Please select branch",
                                    onChange: (e) =>
                                        handleBranchChange(e.target.value)
                                })}

                            >
                                <option value="">Select Branch</option>

                                {branchList.map((branch) => (
                                    <option
                                        key={branch.label}
                                        value={branch.label}
                                    >
                                        {branch.label}
                                    </option>
                                ))}
                            </select>

                            {errors.branchName && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.branchName.message}
                                </p>
                            )}
                        </div>

                        {/* IP Address */}
                        <div>
                            <label className={labelClass}>ipAddress</label>

                            <MultiSelect
                                options={hostNameList}
                                value={selectedHostName}
                                onChange={setSelectedHostName}
                                placeholder="Select Host Names"
                                id={"ipAddress"}
                                setValue={setValue}
                            />
                        </div>

                        {/* File */}
                        <div>
                            <label className={labelClass}> Browse File </label>
                            <div style={{ display: "flex", gap: "5px", alignItems: "center" }} >
                                <input id="fileUpload" type="file" onChange={handleFileChange} style={{ display: "none" }} />

                                {/* Custom button */}
                                <label htmlFor="fileUpload" style={{
                                    padding: "9px 16px", background: "#3b82f6", color: "#fff", borderRadius: "8px", cursor: "pointer",
                                    fontSize: "14px", fontWeight: 500, transition: "all 0.2s ease", boxShadow: "0 2px 6px rgba(59,130,246,0.25)", userSelect: "none",
                                }} onMouseEnter={(e) => {
                                    e.currentTarget.style.background = "#2563eb";
                                    e.currentTarget.style.transform = "translateY(-1px)";
                                    e.currentTarget.style.boxShadow = "0 6px 12px rgba(37,99,235,0.3)";
                                }} onMouseLeave={(e) => {
                                    e.currentTarget.style.background = "#3b82f6";
                                    e.currentTarget.style.transform = "translateY(0px)";
                                    e.currentTarget.style.boxShadow = "0 2px 6px rgba(59,130,246,0.25)";
                                }} onMouseDown={(e) => { e.currentTarget.style.transform = "scale(0.96)"; }}
                                    onMouseUp={(e) => { e.currentTarget.style.transform = "translateY(-1px)"; }} >
                                    Choose File </label>
                                <input type="text" value={file ? file.name : ""} placeholder="No file selected" readOnly
                                    className={inputClass} style={{ width: "300px" }} />
                            </div>
                        </div>
                        {/* Destination Path */}
                        <div>
                            <label className={labelClass}> Destination Path </label>
                            <input className={inputClass} {...register("DestPath", { required: "Destination Path is required" })} />
                            {errors.DestPath && (<p className="text-red-500 text-sm mt-1"> {errors.DestPath.message} </p>
                            )}
                        </div>

                        {/* Packet / Interval / Timeout */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                            {/* Packet Size */}
                            <div>

                                <label className={labelClass}>
                                    Packet Size
                                </label>

                                <input
                                    className={inputClass}
                                    placeholder="204800 is 200KB"
                                    {...register("packetsize", {
                                        required:
                                            "Packet Size is required",
                                        pattern: {
                                            value: /^[0-9]+$/,
                                            message:
                                                "Only numeric value allowed"
                                        }
                                    })}
                                />

                                {errors.packetsize && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.packetsize.message}
                                    </p>
                                )}

                            </div>

                            {/* Interval */}
                            <div>

                                <label className={labelClass}>
                                    Interval
                                </label>

                                <input
                                    className={inputClass}
                                    placeholder="Example : 100"
                                    {...register("intervaltime", {
                                        required:
                                            "Interval is required",
                                        pattern: {
                                            value: /^[0-9]+$/,
                                            message:
                                                "Only numeric value allowed"
                                        }
                                    })}
                                />

                                {errors.intervaltime && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.intervaltime.message}
                                    </p>
                                )}

                            </div>

                            {/* Timeout */}
                            <div>

                                <label className={labelClass}>
                                    TimeOut
                                </label>

                                <input
                                    className={inputClass}
                                    placeholder="Example : 100"
                                    {...register("timeout", {
                                        required:
                                            "Timeout is required",
                                        pattern: {
                                            value: /^[0-9]+$/,
                                            message:
                                                "Only numeric value allowed"
                                        }
                                    })}
                                />

                                {errors.timeout && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.timeout.message}
                                    </p>
                                )}

                            </div>
                        </div>

                        {/* Execute Checkbox */}
                        <div className="flex items-center gap-2 mt-6">

                            <input
                                type="checkbox"
                                {...register("executevalue")}
                            />

                            <label className={labelClass}>
                                Execute
                            </label>

                        </div>

                    </div>

                    {/* Submit */}
                    <div className="flex justify-end mt-8">

                        <button
                            type="submit"
                            className={btnClass}
                        >
                            Submit
                        </button>

                    </div>
                </div>
            </form>
        </>

    );

    // 🔹 TAB 2 → Activity List
    const ActivityList = () => (
        <div></div>

    );

    // 🔹 TAB 3 → Activity List
    // 🔹 TAB 3 → Activity List
    const ViewMultiplePatch = () => {
        const data = [
            {
                ip: "192.168.1.10", speed: "2 MB/s", interval: "5 sec", fileName: "patch_v1.zip, patch_v2.zip", percentage: 65,
                totalFileSent: "650 MB", totalFileSize: "1 GB", elapsedTime: "00:05:20", status: "In Progress"
            },
            {
                ip: "192.168.1.11", speed: "3 MB/s", interval: "5 sec", fileName: "patch_v1.zip", percentage: 100,
                totalFileSent: "1 GB", totalFileSize: "1 GB", elapsedTime: "00:03:10", status: "Completed"
            }
        ];
        useEffect(() => {

            getViewListingData();

            const interval = setInterval(() => {
                getViewListingData();
            }, 60000);

            return () => clearInterval(interval);

        }, []);

        const getViewListingData = async () => {
            try {

                const data = await getDownloadingPatchProgress();

                const listingData = data.data.data[0].data;

                setViewDownloadingProgressData(listingData);

            } catch (error) {
                console.error("API Error:", error);
            }
        };

        return (
            <div className="bg-[#0B1220] rounded-2xl p-6 border border-white/10 shadow-xl overflow-x-auto">

                <table className="w-full text-sm text-left text-white">
                    <thead className="text-xs uppercase bg-white/10">
                        <tr>
                            <th className="px-4 py-3">IP Address</th>
                            <th className="px-4 py-3">File Name</th>
                            <th className="px-4 py-3">Interval Time</th>
                            <th className="px-4 py-3">Packet Size</th>
                            <th className="px-4 py-3">Current Packet</th>
                            <th className="px-4 py-3">Current Status</th>
                            <th className="px-4 py-3">Transfer Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {viewDownloadingProgressData.map((row, index) => (
                            <tr key={index} className="border-b border-white/10 hover:bg-white/5">
                                <td className="px-4 py-3">{row.ip_address}</td>
                                <td className="px-4 py-3">{row.app_name}</td>
                                <td className="px-4 py-3">{row.intervaltime}</td>
                                <td className="px-4 py-3">{row.packetsize}</td>
                                <td className="px-4 py-3">{row.current_packet}</td>
                                <td className="px-4 py-3">{row.current_status}</td>
                                <td className="px-4 py-3">{"Inprocess"}</td>
                                {/* <td className="px-4 py-3">{row.fileName2}</td> */}

                                {/* Progress Bar */}
                                {/* <td className="px-4 py-3 w-40">
                                    <div className="w-full bg-gray-700 rounded-full h-3">
                                        <div
                                            className="bg-green-500 h-3 rounded-full transition-all"
                                            style={{ width: `${row.percentage}%` }}
                                        ></div>
                                    </div>
                                    <div className="text-xs mt-1">{row.percentage}%</div>
                                </td> */}

                                {/* <td className="px-4 py-3">{row.totalFileSent}</td>
                                <td className="px-4 py-3">{row.totalFileSize}</td>
                                <td className="px-4 py-3">{row.elapsedTime}</td> */}

                                {/* <td className="px-4 py-3">
                                    <span
                                        className={`px-2 py-1 rounded text-xs ${row.status === "Completed"
                                            ? "bg-green-600"
                                            : "bg-yellow-500"
                                            }`}
                                    >
                                        {row.status}
                                    </span>
                                </td> */}
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
        );
    };

    // 🔹 TAB 3 → Multiple Run
    //     const MultipleRunForm = () => (
    //         <div className="bg-[#0B1220] rounded-2xl p-6 border border-white/10 shadow-xl">
    //             <h2 className="text-lg font-semibold mb-6">
    //                 Multiple Run Command
    //             </h2>
    //  <div className="grid gap-4">
    //     <div>
    //            <label className={labelClass}>Branch Name</label>

    //                 <MultiSelect options={branchOptions}
    //                     value={selectedBranches}
    //                     onChange={setSelectedBranches}
    //                     placeholder="Select Branch Names"
    //                     id={"branchNames"}
    //                     setValue={setValue}

    //                 />
    // </div>
    // <div>
    //                 <label className={labelClass}>Branch Name</label>

    //                 <MultiSelect
    //                     options={branchOptions}
    //                     value={selectedBranches}
    //                     onChange={setSelectedBranches}
    //                     placeholder="Select Branch Names"
    //                     id={"branchNames"}
    //                     setValue={setValue}

    //                 />
    //                 </div>
    //                 </div>

    //             <div className="flex justify-end mt-6">
    //                 <button className={btnClass}>Execute</button>
    //             </div>
    //         </div>
    //     );
    // 🔹 Render based on tab
    const renderContent = () => {
        switch (activeTab) {
            case 0:
                return <AddActivityForm />;
            case 1:
                return <ViewMultiplePatch />;

            default:
                return null;
        }
    };

    const handleEdit = (item, index) => {
        console.log("Edit clicked:", item);

        setEditData(item);     // store selected row
        setIsModalOpen(true);  // open modal

        // Example: populate form (you can extend this)
        // setActiveTab(0);
        // setFormData(item);
    };

    // MAIN CONTENT
    return (
        <div className="min-h-screen text-white p-2">

            {/* Toast Container */}

            <div className=" bg-[#0B1220] rounded-xl p-2 border border-white/10">
                <ToastContainer />
                <div className="flex gap-2 mb-4">
                    {tabs.map((tab, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveTab(index)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all duration-300 
                             ${activeTab === index
                                    ? "bg-blue-500/20 text-blue-400 border border-blue-500/40 "
                                    : "text-gray-400 hover:text-blue-400 hover:bg-[#1E293B] "
                                }`}
                        >
                            {tab.icon}
                            {tab.label}
                        </button>
                    ))}
                </div>


                {/* 🔷 Content */}
                <div className="transition-all duration-300">
                    {renderContent()}
                </div>
            </div>

        </div>


    )
}

export default SendMultiplePatches