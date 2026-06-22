import React, { useState, useEffect } from 'react'
import { useForm } from "react-hook-form";
import { Plus, List, Play, Pencil, Trash2 } from "lucide-react";
import { ToastContainer, toast } from 'react-toastify';

import { AddGroupMaster, getGroupMasterList, getUpdateGroupMaster, deleteGroupMaster } from "../../api/projectApi";

const GroupMaster = () => {
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
        try {
                                               setLoading(true);                               
                                               const res = await getGroupMasterList();                               
                                               console.log("grouplist API Response:", res);                               
                                               // adjust based on backend response structure
                                               setgrouplist(res?.data?.data || res?.data || []);
                                       
                                           } catch (error) {
                                               console.error("Error fetching grouplist:", error);
                                               setgrouplist([]);
                                           } finally {
                                               setLoading(false);
                                           } 

    }
    const [activeTab, setActiveTab] = useState(0);
    const tabs = [
        { label: "Add Group", icon: <Plus size={16} /> },
        { label: "View Group List", icon: <List size={16} /> }
        // { label: "Multiple Run Command", icon: <Play size={16} /> },
    ];
          const [grouplist, setgrouplist] = useState([]);
                const [loading, setLoading] = useState([]);

    // const grouplist = [
    //     { name: "NPCIL", label: "NPCIL" },
    //     { name: "NHPC", label: "NHPC" },
    //     { name: "ABC", label: "ABC" }
    // ]

    // ---------------- SUBMIT API ----------------
                        const onSubmit = async (data) => {
                            const inputData = {
                                srNo: 4,
                                groupName: data.group,               
                            };
                    
                            console.log("Payload :", inputData);
                            try {
                                const response = await AddGroupMaster(inputData);
                                console.log("Add group Response :", response.data.status);
                                // alert("User Added Successfully");
                                if(response.data.status === 200){
                                     toast.success(response.data.message);
                                    handleReset();
                                }
                                 else if (response.data.status === 409) { toast.warning(response.data.message); }
                                else { toast.error(response.data.message); }                            
                            } catch (error) {
                                console.error("Add group Error :", error);
                                alert(  error?.response?.data?.message ||"Failed to add group" );
                            }
                        };

    const handleReset = () => { reset({ group: ""  });  };

    const [iseditModalOpen, setIseditModalOpen] = useState(false);
    const [editData, setEditData] = useState(null);

    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

     const [editErrors, setEditErrors] = useState({});
    
                     const validateGroupEdit = () => {
        let errors = {};
    
        const name = editData?.groupName?.trim();
    
        if (!name) {
            errors.groupName = "Customer Name is required";
        } 
        else if (!/^[A-Za-z\s]+$/.test(name)) {
            errors.groupName = "Only alphabets and spaces allowed";
        }
    
        setEditErrors(errors);
    
        return Object.keys(errors).length === 0;
    };

    const handleEdit = (item, index) => {
        console.log("Edit clicked:", item);
        setEditData(item);     // store selected row
        setIseditModalOpen(true);  // open modal
    };

    const handleUpdateGroup = async () => {
         if (!validateGroupEdit()) return;
                        console.log("Edit Data:", editData);
                            try {
                                const inputData = {
                        srNo: editData?.srNo,
                        groupName: editData?.groupName
                                };
                        
                                console.log("Update Payload :", inputData);
                                const response = await getUpdateGroupMaster(inputData);
                                console.log("Update Response :", response?.data);
                                 console.log("Update Response Satus:", response?.data.status);
                                // alert("User Updated Successfully");
                                if(response.data.status === 200){
                                                 toast.success(response.data.message);
                                                setIseditModalOpen(false);
                                            }
                                             else if (response.data.status === 409) {
                                                            toast.warning(response.data.message);
                                                        }
                                            else {
                                                toast.error(response.data.message);
                                           }
                                // setIsModalOpen(false);
                                initialApiReq();
                        
                            } catch (error) {
                        
                                console.error("Update Error :", error);
                        
                                alert(
                                    error?.response?.data?.message ||
                                    "Failed to update user"
                                );
                            }
                        };

    const handleDelete = (item) => {
        console.log("item:", item);
        console.log("item.id:", item.srNo) ;
        setDeleteId(item.srNo ); // or item.srNo       
        setIsDeleteOpen(true);
    };
    const confirmDelete = async () => {
        console.log("deleteId:", deleteId);
        console.log("type of deleteId:", typeof deleteId);
        try {
            const payload = {
                srNo: deleteId
            };
            // toast.success("Deleted successfully");
             console.log("Delete Payload:", payload);
                                                                const response = await deleteGroupMaster(payload);    
                                                                // toast.success("Deleted successfully");
                                                                 if(response.data.status === 200){
                                                                             toast.success(response.data.message);
                                                                            setIsDeleteOpen(false);
                                                                        }
                                                                else if (response.data.status === 409) { toast.warning(response.data.message); }
                                                                else { toast.error(response.data.message); }
            // setIsDeleteOpen(false);
            setDeleteId(null);
            // refresh table
            initialApiReq();

        } catch (error) {
            console.error(error);
            toast.error("Delete failed");
        }
    };

       const handleGroupSubmit = (data) => {
  console.log("Form Data:", data);
};

    const renderContent = () => {
        if (activeTab === 0) {
            return (
                 <>
                <form onSubmit={handleSubmit(onSubmit)}>
                <div className="bg-[#0B1220] rounded-2xl p-6 border border-white/10 shadow-xl">
                    <h2 className="text-lg font-semibold mb-6">Add Group</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className={labelClass}> Group Name</label>
                            <input className={inputClass} placeholder="Enter Group Name"  {...register("group",  { required: "Group Name is required",
                                 pattern: { value: /^[A-Za-z\s]+$/, message: "Only alphabets are allowed"  }  })} />
                            {errors.group && <p className="text-red-500 text-xs">{errors.group.message}</p>}
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
                        View Group Details
                    </h2>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="text-gray-300 border-b border-white/40 bg-[#1E293B]">
                                <tr>
                                    <th className="p-3 text-center">Group Name</th>
                                    <th className="p-3 text-center">Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {grouplist.map((item, index) => (
                                    <tr key={index} className="border-b border-white/10 hover:bg-[#172033] transition" >
                                        <td className="p-3 text-center">{item.groupName}</td>
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
                                {/* Modal Box */}
                                <div className="bg-[#0B1220] rounded-2xl p-6 w-[700px] border border-white/10 shadow-xl">
                                    <h2 className="text-lg font-semibold mb-6">Update Group Details</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {/* Group Name */}
                                        <div>
                                            <label className={labelClass}>Group Name</label>
                                            <input className={inputClass} value={editData?.groupName || ""}
                                                onChange={(e) => setEditData({ ...editData, groupName: e.target.value })} />
                                                 {editErrors.groupName && (<p className="text-red-500 text-xs mt-1"> {editErrors.groupName}  </p>  )}
                                        </div>

                                    </div>

                                    {/* Buttons */}
                                    <div className="flex justify-end gap-3 mt-6">
                                        <button className={btnClass} onClick={handleUpdateGroup}> Update  </button>
                                        <button className={resetClass} onClick={() => { setIseditModalOpen(false); setEditErrors({}); }} >Cancel </button>

                                    </div>
                                </div>
                            </div>
                        )}


                        {/* Delete MODAL */}
                        {isDeleteOpen && (
                            <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
                                <div className="bg-[#0B1220] p-6 rounded-2xl border border-white/10 w-[400px] shadow-xl">
                                    <h2 className="text-lg font-semibold mb-4"> Confirm Delete </h2>
                                    <p className="text-gray-300 mb-6"> Are you sure you want to delete this group? </p>
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

export default GroupMaster