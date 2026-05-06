import React, { useState, useEffect } from 'react'
import { useForm } from "react-hook-form";
import { Pencil, Trash2, ShieldUser } from "lucide-react";

const ViewDevices = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setValue
    } = useForm();

    const devices = [
        { ipAddress: "192.168.0.104", hostName: "win-1j4tisp122i", OEMNames: "NPCIL", branchNames: "NPCIL", CustNames: "NPCIL", deviceStatus: "Up" },
        { ipAddress: "192.168.0.15", hostName: "SHAMIKA-ZAGADE", OEMNames: "NPCIL", branchNames: "NPCIL", CustNames: "NPCIL", deviceStatus: "Up" },
        { ipAddress: "192.168.0.164", hostName: "desktop-k1gg83m", OEMNames: "NPCIL", branchNames: "NPCIL", CustNames: "NPCIL", deviceStatus: "Up" },
        { ipAddress: "192.168.0.164", hostName: "desktop-k1gg83m", OEMNames: "UNMANAGED", branchNames: "UNMANAGED", CustNames: "UNMANAGED", deviceStatus: "Up" },
        { ipAddress: "192.168.0.2", hostName: "sumeetnalawade18052003", OEMNames: "NPCIL", branchNames: "NPCIL", CustNames: "NPCIL", deviceStatus: "Up" },
        { ipAddress: "192.168.0.236", hostName: "desktop-f7v9a7c", OEMNames: "NPCIL", branchNames: "NPCIL", CustNames: "NPCIL", deviceStatus: "Up" },
        { ipAddress: "192.168.0.37", hostName: "SHRIDHAR-VARADKAR.VELOX.CO.IN", OEMNames: "NPCIL", branchNames: "NPCIL", CustNames: "NPCIL", deviceStatus: "Up" }
    ];


    const OEMOptions = [
        { value: "NPCIL", label: "NPCIL" },
        { value: "NHPC", label: "NHPC" },
    ];
    const CustNameOptions = [
        { value: "NPCIL", label: "NPCIL" },
        { value: "NHPC", label: "NHPC" },
    ];
    const branchOptions = [
        { value: "NPCIL", label: "NPCIL" },
        { value: "NHPC", label: "NHPC" },
    ];

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

        } catch (error) {s
            console.error(error);
            toast.error("Delete failed");
        }
    };

    const labelClass = "text-[15px] text-[#d1d5db] mb-1 block";
    const inputClass = "w-full h-[34px] px-2 text-[12px] bg-[#1E293B] text-white rounded-md border border-[#2A3A55] focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500";
    const btnClass = "px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.03] active:scale-[0.97] focus:outline-none focus:ring-2 focus:ring-blue-400/60";
    const resetClass = "px-6 py-2 bg-gradient-to-r from-gray-800 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white rounded-lg transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.03] active:scale-[0.97] focus:outline-none focus:ring-2 focus:ring-blue-400/60";


    // MAIN CONTENT
    return (
        <div className="bg-[#0B1220] rounded-2xl p-6 border border-white/10 shadow-xl">
            <h2 className="text-lg font-semibold mb-4">
                View Application User
            </h2>

            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead className="text-gray-300 border-b border-white/40 bg-[#1E293B]">
                        <tr>
                            <th className="p-3 text-left">IP Address</th>
                            <th className="p-3 text-left">Host Name</th>
                            <th className="p-3 text-left">OEM</th>
                            <th className="p-3 text-left">Branch Name</th>
                            <th className="p-3 text-left">Customer Name</th>
                            <th className="p-3 text-left">Device status</th>
                            <th className="p-3 text-center">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {devices.map((item, index) => (
                            <tr
                                key={index}
                                className="border-b border-white/10 hover:bg-[#172033] transition"
                            >
                                <td className="p-3">{item.ipAddress}</td>
                                <td className="p-3">{item.hostName}</td>
                                <td className="p-3">{item.OEMNames}</td>
                                <td className="p-3">{item.branchNames}</td>
                                <td className="p-3">{item.CustNames}</td>
                                <td className="p-3">{item.deviceStatus}</td>
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

                        {/* Modal Box */}
                        <div className="bg-[#0B1220] rounded-2xl p-6 w-[700px] border border-white/10 shadow-xl">

                            <h2 className="text-lg font-semibold mb-6">Update Device Details</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                {/* Ip Address */}
                                <div>
                                    <label className={labelClass}>IP Address</label>
                                    <input
                                        className={inputClass}
                                        value={editData?.ipAddress || ""}
                                        // onChange={(e) =>
                                        //   setEditData({ ...editData, ipAddress: e.target.value })
                                        // }
                                        readOnly
                                    />
                                </div>

                                {/* Host Name */}
                                <div>
                                    <label className={labelClass}>Host Name</label>
                                    <input
                                        className={inputClass}
                                        value={editData?.hostName || ""}
                                        // onChange={(e) =>
                                        //   setEditData({ ...editData, hostName: e.target.value })
                                        // }
                                        readOnly
                                    />
                                </div>

                                {/* OEM */}
                                <div>
                                    <label className={labelClass}>OEM</label>
                                    <select className={inputClass}
                                        value={editData?.OEMNames || ""}
                                        onChange={(e) => setEditData({ ...editData, OEMNames: e.target.value })} >
                                        <option value="" disabled>-- Please select value --</option>
                                        {OEMOptions.map((opt) => (<option key={opt.value} value={opt.value}> {opt.label} </option>))}
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

                            </div>

                            {/* Buttons */}
                            <div className="flex justify-end gap-3 mt-6">
                                <button className="px-4 py-2 text-gray-400 hover:text-white" onClick={() => setIseditModalOpen(false)} >Cancel </button>

                                <button className={btnClass} onClick={() => {
                                    console.log("Updated User Data:", editData);
                                    setIseditModalOpen(false);
                                }} > Update  </button>

                            </div>
                        </div>
                    </div>
                )}


                {/* Delete MODAL */}
                {isDeleteOpen && (
                    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
                        <div className="bg-[#0B1220] p-6 rounded-2xl border border-white/10 w-[400px] shadow-xl">
                            <h2 className="text-lg font-semibold mb-4">  Confirm Delete </h2>
                            <p className="text-gray-300 mb-6"> Are you sure you want to delete this activity? </p>
                            <div className="flex justify-end gap-3">
                                <button className="px-4 py-2 text-gray-400" onClick={() => setIsDeleteOpen(false)} > Cancel </button>
                                <button className="px-4 py-2 bg-red-600 text-white rounded" onClick={confirmDelete}> Yes, Delete </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ViewDevices