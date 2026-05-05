import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import MultipleRunForm from "./MultipleRunForm";

import {
    AddActivityCmd,
    getActivityCmdList,
    getUpdateActivityCmd,
    getdeleteActivityCmd
} from "../api/projectApi";

import { Plus, List, Play, Pencil, Trash2 } from "lucide-react";

const RunCommand = () => {
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
    // const [dynamicReport, setdynamicReport] = useState({ columndata: [], maindata: [] });
    const [activityList, setActivityList] = useState([]);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    console.log("Edit Data -->", editData);
    const tabs = [
        { label: "Add Activity", icon: <Plus size={16} /> },
        { label: "Activity Command List", icon: <List size={16} /> },
        { label: "Multiple Run Command", icon: <Play size={16} /> },
    ];

    const rumtable = [
        { "ActivityName": "Restart Service", "Command": "net stop / start", "SubCommand": "Spooler" },
        { "ActivityName": "Check Disk", "Command": "chkdsk", "SubCommand": "/f" },
        { "ActivityName": "Ping Cmd", "Command": "ping 192.168.0.15", "SubCommand": "ping 192.168.0.15" }
    ]


    const labelClass = "text-[15px] text-[#d1d5db] mb-1 block";
    const inputClass = "w-full h-[34px] px-2 text-[12px] bg-[#1E293B] text-white rounded-md border border-[#2A3A55] focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500";
    const btnClass = "px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.03] active:scale-[0.97] focus:outline-none focus:ring-2 focus:ring-blue-400/60";
   const resetClass = "px-6 py-2 bg-gradient-to-r from-gray-800 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white rounded-lg transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.03] active:scale-[0.97] focus:outline-none focus:ring-2 focus:ring-blue-400/60";
    
  
  const handleAddActivityCmd = async () => {
        const activity = watch('activity');
        const filepath = watch('filepath');
        const command = watch('command');

        if (!activity || activity.trim() === "" || !filepath || filepath.trim() === "" || !command || command.trim() === "") {
            toast.error("All Fields are required");
            return;
        }

        let requestdata = {
            "activity": activity,
            "filepath": filepath,
            "command": command
        }

        console.log("watch", watch('activity'));

        const data = await AddActivityCmd(requestdata);


        try {
            console.log("API Response:", data);
            let Message = data.data.message;
            let obj = {};
            if (data.data.status == 200) {
                let MainData = data.data.data.activity;
                obj.maindata = MainData;
                toast.success(Message);
                reset();
            }
            else if (data.data.status == 409) {
                toast.warning(Message);
            }
            else {
                toast.error(Message);
            }

            obj.Message = Message;
            console.log("obj ---> ", obj);
            // setdynamicReport(obj)

        } catch (error) {
            console.error("API Error:", error);
            toast.error(error?.response?.data?.message || "Something went wrong");
        }
    };

    const handleReset = () => {
        reset(); // resets to defaultValues
    };


    useEffect(() => {
        initialApiReq();
    }, []);

    const initialApiReq = async () => {
        const data = await getActivityCmdList();
        try {
            console.log("data --> ", data);
            let tableData = data.data.data[0].data;
            // let ColumnData = data.data.data[0].column;
            // let obj = {};
            // obj.maindata = MainData;
            // obj.columndata = ColumnData;
            console.log("tableData ---> ", tableData);
            setActivityList(tableData);
            // setdynamicReport(obj)
        } catch (error) {
            console.error("API Error:", error);
        }


    }

    const handleUpdateActivityCmd = async () => {

        try {
            const payload = {
                srNo: editData.srNo,
                activity: editData.ActivityName,
                filepath: editData.SubCommand,
                command: editData.Command
            };

            const res = await getUpdateActivityCmd(payload);
            console.log("Update Response:", res);
            toast.success("Updated successfully");
            setIsModalOpen(false);
            // refresh table
            initialApiReq();
        } catch (error) {
            console.error("Update Error:", error);
            toast.error("Update failed");
        }

    };

    // DELETE COMMAND
    

    const handleDelete = (item) => {
        console.log("item:", item);
        //  console.log("item.id:", item.id);

    setDeleteId(item); // or item.srNo
   
    setIsDeleteOpen(true);
};
const confirmDelete = async () => {
     console.log("deleteId:", deleteId);
     console.log("type of deleteId:", typeof deleteId);
    try {
        const payload = {
            srNo: deleteId
        };

        await getdeleteActivityCmd(payload); // your API

        toast.success("Deleted successfully");

        setIsDeleteOpen(false);
        setDeleteId(null);

        // refresh table
        initialApiReq();

    } catch (error) {
        console.error(error);
        toast.error("Delete failed");
    }
};

    // 🔹 TAB 1 → Add Activity
    const AddActivityForm = () => (
        <div className="bg-[#0B1220] rounded-2xl p-6 border border-white/10 shadow-xl">
            <h2 className="text-lg font-semibold mb-6">Add Activity Command</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                    <label className={labelClass}> Activity Name </label>
                    <input className={inputClass} placeholder="Enter Activity Name"  {...register("activity")} />
                </div>

                <div>
                    <label className={labelClass}> Activity Command </label>
                    <input className={inputClass} placeholder="Enter Activity Command" {...register("command")} />
                </div>

                <div>
                    <label className={labelClass}>Activity Sub-Command </label>
                    <input className={inputClass} placeholder="Enter Activity Sub-Command" {...register("filepath")} />
                </div>
            </div>

            <div className="flex justify-end mt-8 gap-3">
                <button className={btnClass} onClick={() => { handleAddActivityCmd() }}>Submit</button>
                <button className={resetClass} onClick={handleReset}>Reset</button>
            </div>
        </div>  
    );

    // 🔹 TAB 2 → Activity List
    const ActivityList = () => (
        <div className="bg-[#0B1220] rounded-2xl p-6 border border-white/10 shadow-xl">
            <h2 className="text-lg font-semibold mb-4">
                Activity Command List
            </h2>

            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead className="text-gray-300 border-b border-white/40 bg-[#1E293B]">
                        <tr>
                            <th className="p-3 text-left">Activity Name</th>
                            <th className="p-3 text-left">Command</th>
                            <th className="p-3 text-left">Sub Command</th>
                            <th className="p-3 text-center">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {activityList.map((item, index) => (
                            <tr
                                key={index}
                                className="border-b border-white/10 hover:bg-[#172033] transition"
                            >
                                <td className="p-3">{item.activityname}</td>
                                <td className="p-3">{item.command}</td>
                                <td className="p-3">{item.subcommand}</td>

                                {/* ACTION COLUMN */}
                                <td className="p-3 text-center">
                                    <div className="flex justify-center gap-2">
                                        <button className="px-2 py-1 text-blue-400 hover:bg-blue-500/30 rounded"
                                            onClick={() => handleEdit(item, index)} > <Pencil size={20} />
                                        </button>
                                        <button className="px-2 py-1 text-red-400 hover:bg-red-500/30 rounded"
                                            onClick={() => handleDelete(item.id)} > <Trash2 size={20} />
                                        </button>
                                    </div>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* EDIT MODAL */}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

                        {/* Modal Box */}
                        <div className="bg-[#0B1220] rounded-2xl p-6 w-[500px] border border-white/10 shadow-xl">

                            <h2 className="text-lg font-semibold mb-4">Edit Activity</h2>
                            <div className="grid gap-4">

                                <div>
                                    <label className={labelClass}>Activity Name</label>
                                    <input className={inputClass}
                                        value={editData?.ActivityName || ""}
                                        onChange={(e) => setEditData(prev => ({
                                            ...prev,
                                            ActivityName: e.target.value
                                        }))} />
                                </div>

                                <div>
                                    <label className={labelClass}>Command</label>
                                    <input
                                        className={inputClass}
                                        value={editData?.Command || ""}
                                        onChange={(e) =>
                                            setEditData(prev => ({
                                                ...prev,
                                                Command: e.target.value
                                            }))
                                        } />
                                </div>

                                <div>
                                    <label className={labelClass}>Sub Command</label>
                                    <input
                                        className={inputClass}
                                        value={editData?.SubCommand || ""}
                                        onChange={(e) =>

                                            setEditData(prev => ({
                                                ...prev,
                                                SubCommand: e.target.value
                                            }))
                                        }
                                    />
                                </div>
                            </div>

                            {/* Buttons */}
                            <div className="flex justify-end gap-3 mt-6">
                                <button className="px-4 py-2 text-gray-400 hover:text-white" onClick={() => setIsModalOpen(false)} > Cancel </button>
                                <button className={btnClass} onClick={() => handleUpdateActivityCmd()}> Update </button>
                            </div>
                        </div>
                    </div>
                )}

                {isDeleteOpen && (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

        <div className="bg-[#0B1220] p-6 rounded-2xl border border-white/10 w-[400px] shadow-xl">

            <h2 className="text-lg font-semibold mb-4">
                Confirm Delete
            </h2>

            <p className="text-gray-300 mb-6">
                Are you sure you want to delete this activity?
            </p>

            <div className="flex justify-end gap-3">

                <button
                    className="px-4 py-2 text-gray-400"
                    onClick={() => setIsDeleteOpen(false)}
                >
                    Cancel
                </button>

                <button
                    className="px-4 py-2 bg-red-600 text-white rounded"
                    onClick={confirmDelete}>
                    Yes, Delete
                </button>

            </div>

        </div>

    </div>
)}
            </div>
        </div>

    );


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
                return <MultipleRunForm />;
            default:
                return null;
        }
    };

    const handleEdit = (item, index) => {
        console.log("Edit clicked:", item);

        // setEditData(item);     // store selected row
        // setIsModalOpen(true);  // open modal
        setEditData({
            srNo: item.id,
            ActivityName: item.activityname,
            Command: item.command,
            SubCommand: item.subcommand
        });

        setIsModalOpen(true);

        // Example: populate form (you can extend this)
        // setActiveTab(0);
        // setFormData(item);
    };

    // MAIN CONTENT
    return (
        <div className="min-h-screen  text-white p-2">
            <ToastContainer />


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

export default RunCommand