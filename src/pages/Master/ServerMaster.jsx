import React, { useState, useEffect } from 'react'
import { useForm } from "react-hook-form";
import { Plus, List, Play, Pencil, Trash2 } from "lucide-react"

const ServerMaster = () => {
    const labelClass = "text-[15px] text-[#d1d5db] mb-1 block";
    const inputClass = "w-full h-[34px] px-2 text-[12px] bg-[#1E293B] text-white rounded-md border border-[#2A3A55] focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500";
    const btnClass = "px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.03] active:scale-[0.97] focus:outline-none focus:ring-2 focus:ring-blue-400/60";
    const resetClass = "px-6 py-2 bg-gradient-to-r from-gray-800 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white rounded-lg transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.03] active:scale-[0.97] focus:outline-none focus:ring-2 focus:ring-blue-400/60";

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setValue,
        reset
    } = useForm();
    useEffect(() => {
        initialApiReq();
    }, []);

    const initialApiReq = async () => {
        // const data = await getActivityCmdList();
        try {
            console.log("inside initialApiReq--> ");
            // console.log("data --> ", data);
            // let tableData = data.data.data[0].data;
            // let ColumnData = data.data.data[0].column;
            // let obj = {};
            // obj.maindata = MainData;
            // obj.columndata = ColumnData;
            // console.log("tableData ---> ", tableData);
            // setActivityList(tableData);
            // setdynamicReport(obj)
        } catch (error) {
            console.error("API Error:", error);
        }

    }
    const [activeTab, setActiveTab] = useState(0);
    const tabs = [
        { label: "Add Server", icon: <Plus size={16} /> },
        { label: "View Server List", icon: <List size={16} /> }
        // { label: "Multiple Run Command", icon: <Play size={16} /> },
    ];


    const serverlist = [
        { serverName: "WIN-1J4TISP122I", ipAddress: "192.168.0.104", branchNames: "NPCIL", CustNames: "NPCIL", serverStatus: "Upstream" },
        { serverName: "kiran", ipAddress: "192.168.0.01", branchNames: "bvbvv", CustNames: "NHPC", serverStatus: "downstream" },
        { serverName: "DESKTOP-5jk", ipAddress: "192.168.0.4", branchNames: "NHPC", CustNames: "NHPC", serverStatus: "Upstream" }
    ];

    const branchOptions = [
        { value: "NPCIL", label: "NPCIL" },
        { value: "NHPC", label: "NHPC" },
    ];
    const CustNameOptions = [
        { value: "NPCIL", label: "NPCIL" },
        { value: "NHPC", label: "NHPC" },
    ];

    const handleReset = () => { reset({ branchNames: "", CustNames: "", server: "", ipaddress: "", serverstatus: "" }); };

    const [iseditModalOpen, setIseditModalOpen] = useState(false);
    const [editData, setEditData] = useState(null);

    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    const handleEdit = (item, index) => {
        console.log("Edit clicked:", item);
        setEditData(item);     // store selected row
        setIseditModalOpen(true);  // open modal
    };

    const handleDelete = (item) => {
        console.log("item:", item);
        console.log("item.id:", item.id);
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

            // await getdeleteActivityCmd(payload); // your API

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

    const handleServerSubmit = (data) => {
        console.log("Form Data:", data);
    };

    const renderContent = () => {
        if (activeTab === 0) {
            return (
                <>
                    <form onSubmit={handleSubmit((data) => handleServerSubmit(data))}>
                        <div className="bg-[#0B1220] rounded-2xl p-6 border border-white/10 shadow-xl">
                            <h2 className="text-lg font-semibold mb-6">Add Server</h2>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <label className={labelClass}> Server Name</label>
                                    <input className={inputClass} placeholder="Enter server Name"  {...register("server", { required: "Server Name is required" })} />
                                    {errors.server && <p className="text-red-500 text-xs">{errors.server.message}</p>}
                                </div>
                                <div>
                                    <label className={labelClass}> IP Address</label>
                                    <input className={inputClass} placeholder="Enter IP Address"  {...register("ipaddress", { required: "IP Address is required" })} />
                                    {errors.ipaddress && <p className="text-red-500 text-xs">{errors.ipaddress.message}</p>}
                                </div>

                                {/* Branch Name */}
                                <div>
                                    <label className={labelClass}>Branch Name</label>
                                    <select className={inputClass} defaultValue="" {...register("branchNames", { required: "Branch Name is required" })} >
                                        <option value="" disabled>-- Please select value --</option>
                                        {branchOptions.map((opt) => (<option key={opt.value} value={opt.value}> {opt.label} </option>))}
                                    </select>
                                    {errors.branchNames && <p className="text-red-500 text-xs">{errors.branchNames.message}</p>}
                                </div>

                                {/* Customer Name */}
                                <div>
                                    <label className={labelClass}>Customer Name</label>
                                    <select className={inputClass} defaultValue="" {...register("CustNames", { required: "Customer Name is required" })} >
                                        <option value="" disabled>-- Please select value --</option>
                                        {CustNameOptions.map((opt) => (<option key={opt.value} value={opt.value}> {opt.label} </option>))}
                                    </select>
                                    {errors.CustNames && <p className="text-red-500 text-xs">{errors.CustNames.message}</p>}
                                </div>

                                {/* Server Status */}
                                <div>
                                    <label className={labelClass}>Server Status</label>
                                    <select className={inputClass} defaultValue="" {...register("serverstatus", { required: "Server Status is required" })} >
                                        <option value="" disabled>-- Please select value --</option>
                                        <option value="Upstream">UpStream</option>
                                        <option value="DownStream">DownStream</option>
                                        {/* {CustNameOptions.map((opt) => (<option key={opt.value} value={opt.value}> {opt.label} </option>))} */}
                                    </select>
                                    {errors.serverstatus && <p className="text-red-500 text-xs">{errors.serverstatus.message}</p>}
                                </div>



                            </div>

                            <div className="flex justify-end mt-8 gap-3">
                                <button className={btnClass} >Submit</button>
                                <button type="button" className={resetClass} onClick={handleReset}>Reset</button>
                            </div>
                        </div>
                    </form>
                </>
            );
        }

        else if (activeTab === 1) {
            return (
                <div className="bg-[#0B1220] rounded-2xl p-6 border border-white/10 shadow-xl">
                    <h2 className="text-lg font-semibold mb-4">
                        View Branch Details
                    </h2>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="text-gray-300 border-b border-white/40 bg-[#1E293B]">
                                <tr>
                                    <th className="p-3 text-left">Server Name</th>
                                    <th className="p-3 text-left">IP Address </th>
                                    <th className="p-3 text-left">Branch Name</th>
                                    <th className="p-3 text-left">Customer Name</th>
                                    <th className="p-3 text-left">Server status</th>
                                    <th className="p-3 text-center">Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {serverlist.map((item, index) => (
                                    <tr key={index} className="border-b border-white/10 hover:bg-[#172033] transition" >
                                        <td className="p-3 ">{item.serverName}</td>
                                        <td className="p-3 ">{item.ipAddress}</td>
                                        <td className="p-3 ">{item.branchNames}</td>
                                        <td className="p-3 ">{item.CustNames}</td>
                                        <td className="p-3 ">{item.serverStatus}</td>
                                        <td className="p-3 text-center">
                                            <div className="flex justify-center gap-2">
                                                {/* Edit Button */}
                                                <button className="px-2 py-1 text-xs text-blue-400 hover:text-blue-500 rounded-md hover:bg-blue-500/30 transition"
                                                    onClick={() => handleEdit(item, index)} > <Pencil size={20} /> </button>
                                                {/* Delete Button */}
                                                <button className="px-2 py-1 text-xs  text-red-400 hover:text-red-500 rounded-md hover:bg-red-500/30 transition"
                                                    onClick={() => handleDelete(index)}><Trash2 size={20} /> </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* EDIT MODAL */}
                        {iseditModalOpen && (
                            <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
                                <div className="bg-[#0B1220] rounded-2xl p-6 w-[700px] border border-white/10 shadow-xl">
                                    <h2 className="text-lg font-semibold mb-6">Update Server Name</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {/* Customer Name */}
                                        <div>
                                            <label className={labelClass}>Server Name</label>
                                            <input className={inputClass} value={editData?.serverName || ""}
                                                onChange={(e) => setEditData({ ...editData, serverName: e.target.value })} />
                                        </div>
                                        <div>
                                            <label className={labelClass}>IP Address</label>
                                            <input className={inputClass} value={editData?.ipAddress || ""}
                                                onChange={(e) => setEditData({ ...editData, ipAddress: e.target.value })} />
                                        </div>

                                        {/* Branch Name */}
                                        <div>
                                            <label className={labelClass}>Branch Name</label>
                                            <select className={inputClass}
                                                value={editData?.branchNames || ""}
                                                onChange={(e) => setEditData({ ...editData, branchNames: e.target.value })} >
                                                <option value="" disabled>-- Please select value --</option>
                                                {branchOptions.map((opt) => (<option key={opt.value} value={opt.value}> {opt.label} </option>))}
                                            </select>
                                        </div>

                                        {/* Customer Name */}
                                        <div>
                                            <label className={labelClass}>Customer Name</label>
                                            <select className={inputClass}
                                                value={editData?.CustNames || ""}
                                                onChange={(e) => setEditData({ ...editData, CustNames: e.target.value })} >
                                                <option value="" disabled>-- Please select value --</option>
                                                {CustNameOptions.map((opt) => (<option key={opt.value} value={opt.value}> {opt.label} </option>))}
                                            </select>
                                        </div>

                                        {/* Type */}
                                        <div>
                                            <label className={labelClass}>Server Status</label>
                                            <select className={inputClass} value={editData?.serverStatus || ""}
                                                onChange={(e) => setEditData({ ...editData, serverStatus: e.target.value })} >
                                                <option value="">-- Please select value --</option>
                                                <option value="Upstream">UpStream</option>
                                                <option value="DownStream">DownStream</option>
                                            </select>
                                        </div>


                                    </div>

                                    {/* Buttons */}
                                    <div className="flex justify-end gap-3 mt-6">
                                        <button className={btnClass} onClick={() => {
                                            console.log("Updated Branch Data:", editData);
                                            setIseditModalOpen(false);
                                        }} > Update  </button>
                                        <button className={resetClass} onClick={() => setIseditModalOpen(false)} >Cancel </button>

                                    </div>
                                </div>
                            </div>
                        )}


                        {/* Delete MODAL */}
                        {isDeleteOpen && (
                            <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
                                <div className="bg-[#0B1220] p-6 rounded-2xl border border-white/10 w-[400px] shadow-xl">
                                    <h2 className="text-lg font-semibold mb-4"> Confirm Delete </h2>
                                    <p className="text-gray-300 mb-6"> Are you sure you want to delete this branch? </p>
                                    <div className="flex justify-end gap-3">
                                        <button className={resetClass} onClick={() => setIsDeleteOpen(false)} > Cancel </button>
                                        <button className="px-4 py-2 bg-red-600 text-white rounded" onClick={confirmDelete}> Yes, Delete </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            );
        }
    };

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
                                }`} >
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


export default ServerMaster