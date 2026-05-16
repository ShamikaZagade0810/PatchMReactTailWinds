import React, { useState, useEffect } from 'react'
import { useForm } from "react-hook-form";
import { Plus, List, Play, Pencil, Trash2, ClipboardList, SquareCheckBig, Ban } from "lucide-react";

import MultiSelect from '../../layouts/MultiSelect.jsx';

const ViewClientWiseSyncPolicy = () => {
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
    
         const selectedParam = watch("parameter");

  const [clientSyncPolicy, setClientSyncPolicy] = useState([
        { policyName: "test", serverIp: "192.168.0.4", ipAddress: ["192.168.0.53", "192.168.0.17"], port: 8086, parameter: "2", day: "NA", time: "NA" },
        { policyName: "Policy 2", serverIp: "192.168.0.4", ipAddress: ["192.168.0.53", "192.168.0.17"], port: 8086, parameter:"4", day: "Sunday", time: "19:52:00" }
    ]);

      const ipaddress = [
        { value: "192.168.0.15", label: "192.168.0.15" },
        { value: "192.168.0.2", label: "192.168.0.2" },
        { value: "192.168.0.4", label: "192.168.0.4" },
        { value: "192.168.0.24", label: "192.168.0.24" },
          { value: "192.168.0.17", label: "192.168.0.17" },
            { value: "192.168.0.53", label: "192.168.0.53" }
    ];


    // -------------------- EDIT API
    const [isModalOpen, setIsModalOpen] = useState(false);
const [editData, setEditData] = useState(null);

const handleEdit = (item, index) => {
    console.log("Edit Item:", item);

    setEditData({
        ...item,
        ipAddress: item.ipAddress.map((ip) => ({
            value: ip,
            label: ip
        }))
    });

    setIsModalOpen(true);
};
// UPDATE COMMAND
const handleUpdateUser = () => {
    const updatedList = clientSyncPolicy.map((item) =>
        item.policyName === editData.policyName
            ? editData
            : item
    );

    setClientSyncPolicy(updatedList);

    console.log("Updated Data:", editData);

    setIsModalOpen(false);
    setEditData(null);
};


// --------------------------- DELETE API
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    // DELETE COMMAND       
    const handleDelete = (item) => {
        console.log("item:", item.srNo);
        setDeleteId(item.srNo); // or item.srNo       
        setIsDeleteOpen(true);
    };

    const confirmDelete = async () => {
        console.log("deleteId:", deleteId);
        console.log("type of deleteId:", typeof deleteId);
        try {
            const inputData = {
                id: deleteId
            };
            // await getdeleteActivityCmd(payload); // your API
            console.log("Delete Payload:");
            // const response =  await deleteAutoApprovalRule(inputData , deleteId);;
            // // toast.success("Deleted successfully");
            //  if(response.data.status === 200){
            //              toast.success(response.data.message);
            //             setIsDeleteOpen(false);
            //              setDeleteId(null);
            //                // refresh table
            //             await getData();
            // }
            // else if (response.data.status === 409) { toast.warning(response.data.message || "Something went Wrong"); }
            // else { toast.error(response.data.message || "Error"); }

            // setIsDeleteOpen(false);
            // setDeleteId(null);        
            // // refresh table
            // initialApiReq();

        } catch (error) {
            console.error(error);
            toast.error("Delete failed");
        }
    };

    // MAIN CONTENT
    return (
        <div className="bg-[#0B1220] rounded-2xl p-6 border border-white/10 shadow-xl">
            <h2 className="text-lg font-semibold mb-4"> View Client Wise Synchronization Policy </h2>
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead className="text-gray-300 border-b border-white/40 bg-[#1E293B]">
                        <tr>
                            <th className="p-3 text-left">Policy Name</th>
                            <th className="p-3 text-left">Server IP</th>
                            <th className="p-3 text-left">IP Address</th>
                            <th className="p-3 text-left">port</th>
                            <th className="p-3 text-left">Parameter</th>
                            <th className="p-3 text-left">Day</th>
                            <th className="p-3 text-left">Time</th>
                            <th className="p-3 text-center">Run Policy</th>
                            <th className="p-3 text-center">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {clientSyncPolicy.map((item, index) => (
                            <tr key={index} className="border-b border-white/10 hover:bg-[#172033] transition" >
                                {/* <td className="p-3">{item.srNo}</td> */}  {/* Sr No */}

                                <td className="p-3">{item.policyName}</td> {/* serverIp */}
                                <td className="p-3">{item.serverIp}</td> {/* serverIp */}
                                {/* <td className="p-3">{item.ipAddress}</td> ipAddress */}
                                <td className="p-3">
                                    <div className="flex flex-wrap gap-1">
                                        {item.ipAddress.map((ip, idx) => (
                                            <span key={idx} className="px-2 py-0.5 text-xs rounded-md bg-blue-500/20 text-blue-300 border border-blue-500/20">
                                                {ip}
                                            </span>
                                        ))}
                                    </div>
                                </td>
                                <td className="p-3">{item.port}</td> {/* port */}
                                <td className="p-3">{item.parameter}</td> {/* parameter */}
                                <td className="p-3">{item.day}</td> {/* day */}
                                <td className="p-3 ">{item.time}</td> {/* time */}
                                <td className="p-3 text-center">
                                    {/* Run Policy Button */}
                                    <button className="px-2 py-1 text-xs  text-cyan-400 hover:text-cyan-500 rounded-md hover:bg-cyan-500/30 transition">
                                        < Play size={20} /> </button>
                                </td>

                                {/* Status */}
                                {/* <td className="p-3">
                                               <span className={`px-3 py-1 rounded-full text-xs font-medium  ${item.status === "Enable"
                                                   ? "bg-green-500/20 text-green-400"
                                                   : "bg-red-500/20 text-red-400"
                                                   }`} > {item.status}  </span>
                                           </td>
                                        */}
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
{isModalOpen && (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
        <div className="bg-[#0B1220] rounded-2xl p-6 w-[700px] border border-white/10 shadow-xl">

            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white"> Update Client Wise Sync Policy </h2>               
            </div>

            {/* Form Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Policy Name */}
                <div>
                    <label className={labelClass}>Policy Name</label>
                    <input className={inputClass} value={editData?.policyName || ""}
                        onChange={(e) =>  setEditData({ ...editData, policyName: e.target.value }) } />
                </div>

                {/* Server IP */}
                <div>
                    <label className={labelClass}>Server IP</label>
                    <input className={inputClass} value={editData?.serverIp || ""}
                        onChange={(e) => setEditData({ ...editData, serverIp: e.target.value }) } />
                </div>

                {/* Port */}
                <div>
                    <label className={labelClass}>Port</label>
                    <input type="number" className={inputClass} value={editData?.port || ""}
                        onChange={(e) => setEditData({ ...editData, port: e.target.value }) } />
                </div>

                {/* Parameter */}
                <div>
                    <label className={labelClass}>Parameter</label>
                    <select className={inputClass} value={editData?.parameter || ""}
                        onChange={(e) => setEditData({ ...editData, parameter: e.target.value }) } >
                        <option value="">-- Select Parameter --</option>
                        <option value="2"> Notify for download </option>
                        <option value="3"> Notify for download and notify for install </option>
                        <option value="4"> Auto download and schedule install </option>
                    </select>
                </div>

              {editData?.parameter == 4 && (
                      <>

                {/* Day */}
                <div>
                    <label className={labelClass}>Day</label>
                    <select className={inputClass} value={editData?.day || ""}
                        onChange={(e) => setEditData({ ...editData, day: e.target.value }) } >
                        <option value="NA">NA</option>
                        <option value="Monday">Monday</option>
                        <option value="Tuesday">Tuesday</option>
                        <option value="Wednesday">Wednesday</option>
                        <option value="Thursday">Thursday</option>
                        <option value="Friday">Friday</option>
                        <option value="Saturday">Saturday</option>
                        <option value="Sunday">Sunday</option>
                    </select>
                </div>

                {/* Time */}
                <div>
                    <label className={labelClass}>Time</label>
                    <input type="time" className={inputClass} value={editData?.time || ""}
                        onChange={(e) => setEditData({ ...editData, time: e.target.value }) } />
                </div>
                </>
                 )}

                {/* IP Address */}
                      {/* Customer Name */}
<div>
  <label className={labelClass}>ipaddress</label>
  <MultiSelect
    options={ipaddress}
    value={editData?.ipAddress || []}
    onChange={(val) => {
      setEditData({ ...editData, ipAddress: val });
      setValue("ipAddress", val);
    }}
    placeholder="Select ipaddress "
    id={"ipaddress"}
    setValue={setValue}
  />
</div>

            </div>

            {/* Footer Buttons */}
            <div className="flex justify-end gap-3 mt-6">
                <button className={resetClass}  onClick={() => setIsModalOpen(false)} >  Cancel </button>
                 <button className={btnClass} onClick={handleUpdateUser}> Update </button>
            </div>
        </div>
    </div>
)}

                {/* Delete MODAL */}
                {isDeleteOpen && (
                    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
                        <div className="bg-[#0B1220] p-6 rounded-2xl border border-white/10 w-[400px] shadow-xl">
                            <h2 className="text-lg font-semibold mb-4"> Confirm Delete </h2>
                            <p className="text-gray-300 mb-6"> Are you sure you want to delete this Rule? </p>

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

export default ViewClientWiseSyncPolicy
