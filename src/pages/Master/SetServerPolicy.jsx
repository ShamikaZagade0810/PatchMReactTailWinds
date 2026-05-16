import React, { useState, useEffect } from 'react'
import { useForm } from "react-hook-form";
import { Plus, List, Play, Pencil, Trash2 } from "lucide-react";
import { div } from 'framer-motion/client';
import {
    addSetServerPolicy,
    viewAllServerPolicy,
    editSetServerPolicy,
    deleteSelectedPolicyServer 
} from "../../api/projectApi";
import { ToastContainer, toast } from 'react-toastify';

const SetServerPolicy = () => {
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
     const [activeTab, setActiveTab] = useState(0);
     const [viewServerListData ,setViewServerListData] = useState([]);

    useEffect(() => {

        if (activeTab === 1) {
            getData();
        }

    }, [activeTab]);
 

    const getData = async()=>{
          console.log("Hello World");
          const resData = await viewAllServerPolicy();

          console.log("resData ",resData.data.data);
          setViewServerListData(resData.data.data);

    }


    const initialApiReq = async () => {
        // const data = await getActivityCmdList();
        try {
            console.log("inside initialApiReq--> ");

        } catch (error) {
            console.error("API Error:", error);
        }

    }
   
    const tabs = [
        { label: "Add Server Policy", icon: <Plus size={16} /> },
        { label: "View Server Policy List", icon: <List size={16} /> }
        // { label: "Multiple Run Command", icon: <Play size={16} /> },
    ];

    const serversPolicyList = [
        { id: 2, policyName: "WIN-1J4TISP122I", serverIpAddress: "192.168.0.4", serverPort: 8530, parameter: "3", priorityServer: "primary", branchName: "NPCIL", serverStatus: "UpStream" },
        { id: 3, policyName: "abc", serverIpAddress: "192.168.0.1", serverPort: 8081, parameter: "Notify for download and notify for install", priorityServer: "secondary", branchName: "Vashi", serverStatus: "UpStream" }
    ];
    const branchOptions = [
        { value: "NPCIL", label: "NPCIL" },
        { value: "NHPC", label: "NHPC" },
    ];
    const selectedParam = watch("parameter");

    const handleReset = () => { reset({ policyName: "", ipAddress: "", port: "", branchNames: "", parameter: "", priorityServer: false }); };

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
        setDeleteId( item.id); // or item.srNo       
        setIsDeleteOpen(true);
    };
    const confirmDelete = async () => {
        console.log("deleteId:", deleteId);
        console.log("type of deleteId:", typeof deleteId);
        try {
            const payload = {
                id: deleteId
            };
           const res = await deleteSelectedPolicyServer(payload);
            // await getdeleteActivityCmd(payload); // your API
            if(res.data.status == 200){
                 toast.success(res.data.message );
                  window.location.reload();
            }else{
                  toast.success(res.data.message );
            }
            

            setIsDeleteOpen(false);
            setDeleteId(null);

            // refresh table
            initialApiReq();

        } catch (error) {
            console.error(error);
            toast.error("Delete failed");
        }
    };

    const handleSetPolicySubmit = async (data) => {


        const payload = {
            policyName: data.policyName,
            serverIpAddress: data.serverIpAddress,
            serverPort: Number(data.serverPort),
            parameter: data.parameter,
            priorityServer: String(data.priorityServer),
            branchName: data.branchName,
            scheduleDay: data.scheduleDay || "",
            scheduleTime: data.scheduleTime ? `${data.scheduleTime}:00` : "00:00:00",
        };

        console.log("Final Payload :", payload);
        try {


            const res = await addSetServerPolicy(payload);
            console.log("Res Data--->  ", res);
            if (res.data.status == 200) {
                toast.success(res.data.message);
            } else {
                toast.error(res.data.message);
            }
            reset();
        } catch (ex) {
            console.log("Exception ", ex);
        }


    };


      const handleEditSetPolicySubmit = async (data) => {


    

        console.log("Final Payload :", data);
        try {


            const res = await editSetServerPolicy(data);
            console.log("Res Data--->  ", res);
            if (res.data.status == 200) {
                toast.success(res.data.message);
                  window.location.reload();
            } else {
                toast.error(res.data.message);
            }
           
        } catch (ex) {
            console.log("Exception ", ex);
        }


    };

    const renderContent = () => {
        if (activeTab === 0) {
            return (
                <>
                    <form onSubmit={handleSubmit((data) => handleSetPolicySubmit(data))}>
                        <div className="bg-[#0B1220] rounded-2xl p-6 border border-white/10 shadow-xl">
                            <h2 className="text-lg font-semibold mb-6">Set Server Policy</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <label className={labelClass}> Policy Name</label>
                                    <input className={inputClass} placeholder="Enter Policy Name"  {...register("policyName", { required: "Policy Name is required" })} />
                                    {errors.policyName && <p className="text-red-500 text-xs">{errors.policyName.message}</p>}
                                </div>
                                <div>
                                    <label className={labelClass}>IP Address</label>
                                    <input className={inputClass} placeholder="Enter IP Address"  {...register("serverIpAddress", { required: "IP Address is required" })} />
                                    {errors.ipAddress && <p className="text-red-500 text-xs">{errors.ipAddress.message}</p>}
                                </div>
                                <div>
                                    <label className={labelClass}> Port</label>
                                    <input type="number" className={inputClass} placeholder="Enter Policy Name"  {...register("serverPort", { required: "Policy Name is required" })} />
                                    {errors.port && <p className="text-red-500 text-xs">{errors.port.message}</p>}
                                </div>
                                {/* Branch Name */}
                                <div>
                                    <label className={labelClass}>Branch Name</label>
                                    <select className={inputClass} defaultValue="" {...register("branchName", { required: "Branch Name is required" })} >
                                        <option value="" disabled>-- Please select value --</option>
                                        {branchOptions.map((opt) => (<option key={opt.value} value={opt.value}> {opt.label} </option>))}
                                    </select>
                                    {errors.branchNames && <p className="text-red-500 text-xs">{errors.branchNames.message}</p>}
                                </div>

                                {/* Parameter */}
                                <div>
                                    <label className={labelClass}>Parameter</label>
                                    <select className={inputClass} defaultValue="" {...register("parameter", { required: "Branch Name is required" })} >
                                        <option value="" disabled>-- Please select value --</option>
                                        <option value="2">Notify for download and notify for install</option>
                                        <option value="3">Auto download and notify for install</option>
                                        <option value="4">Auto download and schedule the install</option>
                                        {/* {CustNameOptions.map((opt) => (<option key={opt.value} value={opt.value}> {opt.label} </option>))} */}
                                    </select>
                                    {errors.parameter && <p className="text-red-500 text-xs">{errors.parameter.message}</p>}
                                </div>
                                {selectedParam === "4" && (
                                    <>
                                        {/* Schedule Day */}
                                        <div>
                                            <label className={labelClass}>Schedule Day</label>
                                            <select className={inputClass} {...register("scheduleDay", { required: "Schedule Day is required" })}>
                                                <option value="">-- Select Day --</option>
                                                <option value="Monday">Monday</option>
                                                <option value="Tuesday">Tuesday</option>
                                                <option value="Wednesday">Wednesday</option>
                                                <option value="Thursday">Thursday</option>
                                                <option value="Friday">Friday</option>
                                                <option value="Saturday">Saturday</option>
                                                <option value="Sunday">Sunday</option>
                                            </select>
                                            {errors.scheduleDay && <p className="text-red-500 text-xs">{errors.scheduleDay.message}</p>}
                                        </div>

                                        {/* Schedule Time */}
                                        <div>
                                            <label className={labelClass}>Schedule Time</label>
                                            <input type="time" className={inputClass} {...register("scheduleTime", { required: "Schedule Time is required" })} />
                                            {errors.scheduleTime && <p className="text-red-500 text-xs">{errors.scheduleTime.message}</p>}
                                        </div>
                                    </>
                                )}

                                <div>
                                    <div className="flex items-center gap-3 mt-7">
                                        <input type="checkbox" id="priorityServer" className="h-4 w-4 accent-blue-500" {...register("priorityServer")} />
                                        <label htmlFor="priorityServer" className={labelClass}> Priority Server </label>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-end mt-8 gap-3">
                                <button className={btnClass} type="submit">Submit</button>
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
                        View Sever Policy Details
                    </h2>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="text-gray-300 border-b border-white/40 bg-[#1E293B]">
                                <tr>
                                    <th className="p-3 text-center">Policy Name</th>
                                    <th className="p-3 text-center">IP Address</th>
                                    <th className="p-3 text-center">Port</th>
                                    <th className="p-3 text-center">Branch Name</th>
                                    <th className="p-3 text-center">Parameter</th>
                                    <th className="p-3 text-center">Priority</th>
                                    <th className="p-3 text-center">Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {viewServerListData.map((item, index) => (
                                    <tr key={index} className="border-b border-white/10 hover:bg-[#172033] transition" >
                                        <td className="p-3 text-center">{item.policyName}</td>
                                        <td className="p-3 text-center">{item.serverIpAddress}</td>
                                        <td className="p-3 text-center">{item.serverPort}</td>
                                        <td className="p-3 text-center">{item.branchName}</td>
                                        <td className="p-3 text-center">{item.parameter}</td>
                                        <td className="p-3 text-center">{item.priorityServer}</td>
                                        <td className="p-3 text-center">
                                            <div className="flex justify-center gap-2">
                                                {/* Edit Button */}
                                                <button className="px-2 py-1 text-xs text-blue-400 hover:text-blue-500 rounded-md hover:bg-blue-500/30 transition"
                                                    onClick={() => handleEdit(item, index)} > <Pencil size={20} /> </button>

                                                {/* Delete Button */}
                                                <button className="px-2 py-1 text-xs  text-red-400 hover:text-red-500 rounded-md hover:bg-red-500/30 transition"
                                                    onClick={() => handleDelete(item)}><Trash2 size={20} /> </button>
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
                                    <h2 className="text-lg font-semibold mb-6">Update OEM Details</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className={labelClass}>Policy Name</label>
                                            <input className={inputClass} value={editData?.policyName || ""}
                                                // onChange={(e) => setEditData({ ...editData, policyName: e.target.value })} 
                                                readOnly
                                            />
                                        </div>
                                        <div>
                                            <label className={labelClass}>IP Address</label>
                                            <input className={inputClass} value={editData?.serverIpAddress || ""}
                                                onChange={(e) => setEditData({ ...editData, serverIpAddress: e.target.value })} />
                                        </div>
                                        <div>
                                            <label className={labelClass}>Server Port</label>
                                            <input className={inputClass} value={editData?.serverPort || ""}
                                                onChange={(e) => setEditData({ ...editData, serverPort: e.target.value })} />
                                        </div>
                                        {/* Branch Name */}
                                        <div>
                                            <label className={labelClass}>Branch Name</label>
                                            <select className={inputClass} value={editData?.branchName || ""}
                                                onChange={(e) => setEditData({ ...editData, branchName: e.target.value })} >
                                                <option value="" disabled>-- Please select value --</option>
                                                {branchOptions.map((opt) => (<option key={opt.value} value={opt.value}> {opt.label} </option>))}
                                            </select>
                                        </div>

                                        <div>
                                            <label className={labelClass}>Parameter</label>
                                            <select className={inputClass} value={editData?.parameter || ""}
                                                onChange={(e) => setEditData({ ...editData, parameter: e.target.value })} >
                                                <option value="">-- Please select value --</option>
                                                <option value="2">Notify for download and notify for install</option>
                                                <option value="3">Auto download and notify for install</option>
                                                <option value="4">Auto download and schedule the install</option>
                                            </select>
                                        </div>
                                        {editData?.parameter === "4" && (
                                            <>
                                                {/* Schedule Day */}
                                                <div>
                                                    <label className={labelClass}>Schedule Day</label>
                                                    <select className={inputClass} value={editData?.scheduleDay || ""}
                                                        onChange={(e) => setEditData({ ...editData, scheduleDay: e.target.value })} >
                                                        <option value="">-- Select Day --</option>
                                                        <option value="Monday">Monday</option>
                                                        <option value="Tuesday">Tuesday</option>
                                                        <option value="Wednesday">Wednesday</option>
                                                        <option value="Thursday">Thursday</option>
                                                        <option value="Friday">Friday</option>
                                                        <option value="Saturday">Saturday</option>
                                                        <option value="Sunday">Sunday</option>
                                                    </select>
                                                </div>

                                                {/* Schedule Time */}
                                                <div>
                                                    <label className={labelClass}>Schedule Time</label>
                                                    <input type="time" className={inputClass} value={editData?.scheduleTime || ""}
                                                        onChange={(e) => setEditData({ ...editData, scheduleTime: e.target.value })} />
                                                </div>
                                            </>
                                        )}

                                    </div>

                                    {/* Buttons */}
                                    <div className="flex justify-end gap-3 mt-6">
                                        <button className={btnClass} onClick={() => {
                                            console.log("Updated OEM Data:", editData);
                                            handleEditSetPolicySubmit(editData);
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
                                    <p className="text-gray-300 mb-6"> Are you sure you want to delete this OEM? </p>
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
            <ToastContainer />
            <div className=" bg-[#0B1220] rounded-xl p-2 border border-white/10">
                <div className="flex gap-2 mb-4">
                    {tabs.map((tab, index) => (
                        <button key={index} onClick={() => setActiveTab(index)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all duration-300 
                              ${activeTab === index ? "bg-blue-500/20 text-blue-400 border border-blue-500/40 "
                                    : "text-gray-400 hover:text-blue-400 hover:bg-[#1E293B] "}`} >
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

export default SetServerPolicy