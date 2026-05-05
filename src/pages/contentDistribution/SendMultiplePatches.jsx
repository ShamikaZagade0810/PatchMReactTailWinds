import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import MultiSelect from "../../layouts/MultiSelect";

import MultipleRunForm from "../MultipleRunForm";

import { Plus, List, Play, Pencil, Trash2 } from "lucide-react";
import {
    getAllBranchList,
    getBranchWiseIpaddressList
} from "../../api/projectApi";

const SendMultiplePatches = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setValue
    } = useForm();
    const [activeTab, setActiveTab] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editData, setEditData] = useState(null);
    const [branchList, setBranchList] = useState([]);
    const [selectedHostName, setSelectedHostName] = useState([]);
    const [hostNameList, setHostNameList] = useState([]);


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
        { label: "Send  Multiple Patches", icon: <List size={16} /> },
        { label: "View Sent Patches", icon: <List size={16} /> },

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


    const handleNextClick = ()=>{
         console.log("Handle Click ",watch('hostNames'));
    }


    // 🔹 TAB 1 → Add Activity
    const AddActivityForm = () => (
        <div className="bg-[#0B1220] rounded-2xl p-6 border border-white/10 shadow-xl">


            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* ROW 1 */}
                <div>
                    <label className={labelClass}>Branch Name</label>

                    <select
                        className={inputClass}
                        {...register("branchName", {
                            onChange: (e) => handleBranchChange(e.target.value)
                        })}
                    >
                        <option value="">Select Branch</option>
                        {branchList.map((branch) => (
                            <option key={branch.label} value={branch.label}>
                                {branch.label}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className={labelClass}>Host Name</label>

                    <MultiSelect
                        options={hostNameList}
                        value={selectedHostName}
                        onChange={setSelectedHostName}
                        placeholder="Select Host Names"
                        id={"hostNames"}
                        setValue={setValue}

                    />
                </div>

            </div>

            <div className="flex justify-end mt-8">
                <button className={btnClass}  onClick={() => {handleNextClick()}}>Next</button>
            </div>
        </div>

    );

    // 🔹 TAB 2 → Activity List
    const ActivityList = () => (
        <div className="bg-[#0B1220] rounded-2xl p-6 border border-white/10 shadow-xl">


            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* ROW 1 */}
                <div>
                    <div> <label className={labelClass}>Packet Size(Bytes)</label> <input type="number" className={inputClass} placeholder="Packet Size(Bytes)"  {...register("")} /> </div>
                </div>
                <div>
                    <div> <label className={labelClass}>Interval Time(MS)</label> <input type="number" className={inputClass} placeholder="Interval Time" /> </div>
                </div>

                <div>
                    <div> <label className={labelClass}>Time Out(MS)</label> <input type="number" className={inputClass} placeholder="Enter Timeout " /> </div>
                </div>
                <div>
                    <label className={labelClass}>Browse File</label>

                    <input
                        type="file"
                        className={inputClass}
                        onChange={(e) => console.log(e.target.files)}
                    />
                </div>
                <div>
                    <div> <label className={labelClass}>Destination Path </label> <input type="text" className={inputClass} placeholder="Enter Timeout " /> </div>
                </div>
            </div>

            <div className="flex justify-end mt-8">
                <button className={btnClass}>Submit</button>
            </div>
        </div>

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

        return (
            <div className="bg-[#0B1220] rounded-2xl p-6 border border-white/10 shadow-xl overflow-x-auto">

                <table className="w-full text-sm text-left text-white">
                    <thead className="text-xs uppercase bg-white/10">
                        <tr>
                            <th className="px-4 py-3">IP Address</th>
                            <th className="px-4 py-3">Speed</th>
                            <th className="px-4 py-3">Interval</th>
                            <th className="px-4 py-3">File Name</th>
                            {/* <th className="px-4 py-3">File Name</th> */}
                            <th className="px-4 py-3">Total %</th>
                            <th className="px-4 py-3">Total File Sent</th>
                            <th className="px-4 py-3">Total File Size</th>
                            <th className="px-4 py-3">Elapsed Time</th>
                            <th className="px-4 py-3">Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {data.map((row, index) => (
                            <tr key={index} className="border-b border-white/10 hover:bg-white/5">
                                <td className="px-4 py-3">{row.ip}</td>
                                <td className="px-4 py-3">{row.speed}</td>
                                <td className="px-4 py-3">{row.interval}</td>
                                <td className="px-4 py-3">{row.fileName}</td>
                                {/* <td className="px-4 py-3">{row.fileName2}</td> */}

                                {/* Progress Bar */}
                                <td className="px-4 py-3 w-40">
                                    <div className="w-full bg-gray-700 rounded-full h-3">
                                        <div
                                            className="bg-green-500 h-3 rounded-full transition-all"
                                            style={{ width: `${row.percentage}%` }}
                                        ></div>
                                    </div>
                                    <div className="text-xs mt-1">{row.percentage}%</div>
                                </td>

                                <td className="px-4 py-3">{row.totalFileSent}</td>
                                <td className="px-4 py-3">{row.totalFileSize}</td>
                                <td className="px-4 py-3">{row.elapsedTime}</td>

                                <td className="px-4 py-3">
                                    <span
                                        className={`px-2 py-1 rounded text-xs ${row.status === "Completed"
                                            ? "bg-green-600"
                                            : "bg-yellow-500"
                                            }`}
                                    >
                                        {row.status}
                                    </span>
                                </td>
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
                return <ActivityList />;
            case 2:
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
        <div className="min-h-screen  text-white p-2">

            {/* 🔷 Tabs */}
            <div className=" bg-[#0B1220] rounded-xl p-2 border border-white/10">
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