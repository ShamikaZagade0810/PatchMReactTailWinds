import React, { useState, useEffect } from 'react'
import { useForm } from "react-hook-form";
import { Plus, List, Play, Pencil, Trash2, ClipboardList, SquareCheckBig, Ban } from "lucide-react";
import { ToastContainer, toast } from 'react-toastify';
import { getAllViewSyncPolicy, deleteViewSyncPolicy } from "../../api/projectApi";


const ViewSyncPolicy = () => {

    // const syncpolicyList = [
    //     { serverIp: "192.168.0.4", ipAddress: "192.168.0.4", port: 8530, parameter: 3, day: "NA", time: "NA" }, 
    //     { serverIp: "192.168.0.4", ipAddress: "192.168.0.39", port: 8530, parameter: 3, day: "NA", time: "NA" }, 
    //     { serverIp: "192.168.0.4", ipAddress: "192.168.0.2", port: 8530, parameter: 3, day: "NA", time: "NA" }, 
    //     { serverIp: "192.168.0.4", ipAddress: "192.168.0.37", port: 8530, parameter: 3, day: "NA", time: "NA" }, 
    //     { serverIp: "192.168.0.4", ipAddress: "192.168.0.5", port: 8530, parameter: 3, day: "NA", time: "NA" }, 
    //     { serverIp: "192.168.0.4", ipAddress: "192.168.0.236", port: 8530, parameter: 3, day: "NA", time: "NA" }, 
    //     { serverIp: "192.168.0.4", ipAddress: "192.168.0.15", port: 8530, parameter: 3, day: "NA", time: "NA" }, 
    //     { serverIp: "192.168.0.4", ipAddress: "192.168.0.53", port: 8530, parameter: 3, day: "NA", time: "NA" }, 
    //     { serverIp: "192.168.0.4", ipAddress: "192.168.0.92", port: 8503, parameter: 4, day: "Sunday", time: "13" }, 
    //     { serverIp: "192.168.0.4", ipAddress: "192.168.0.132", port: 8503, parameter: 3, day: "NA", time: "NA" }
    // ];

    const [syncpolicyList, setsyncpolicyList] = useState([]);
        const [loading, setLoading] = useState(false);
    
        // ---------- Listing API
        useEffect(() => {
            initialApiReq();
        }, []);
    
        const initialApiReq = async () => {
            try {
                setLoading(true);
                const res = await getAllViewSyncPolicy();
                console.log("API Response:", res);
                setsyncpolicyList(res?.data?.data || res?.data || []);
            } catch (error) {
                console.error("Error fetching View Sync Policy:", error);
                setsyncpolicyList([]);
            } finally {
                setLoading(false);
            }  
        }
 // ------------------------------- DELETE API
      const [isDeleteOpen, setIsDeleteOpen] = useState(false);
        const [deleteId, setDeleteId] = useState(null);
    
        // DELETE COMMAND       
        const handleDelete = (item) => {
            console.log("item:", item.id);  
                setDeleteId(item.id); // or item.srNo       
                setIsDeleteOpen(true);
            };

        const confirmDelete = async () => {
                 console.log("deleteId:", deleteId);
                 console.log("type of deleteId:", typeof deleteId);
                try {
                    const inputData  = {
                        id: deleteId
                    };
                     console.log("Delete Payload:");
                    const response =  await deleteViewSyncPolicy(inputData , deleteId);;
                    // toast.success("Deleted successfully");
                     if(response.data.status === 200){
                                 toast.success(response.data.message);
                                setIsDeleteOpen(false);
                                 setDeleteId(null);
                                await initialApiReq();
                    }
                    else if (response.data.status === 409) { toast.warning(response.data.message || "Something went Wrong"); }
                    else { toast.error(response.data.message || "Error"); }
            
                    setIsDeleteOpen(false);
                    setDeleteId(null);     
                    initialApiReq();            
                } catch (error) {
                    console.error(error);
                    toast.error("Delete failed");
                }
            };

    // MAIN CONTENT
  return (
    <div className="bg-[#0B1220] rounded-2xl p-6 border border-white/10 shadow-xl">
                    <h2 className="text-lg font-semibold mb-4"> View Synchronization Policy </h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="text-gray-300 border-b border-white/40 bg-[#1E293B]">
                                <tr>
                                    {/* <th className="p-3 text-left">Sr No.</th> */}
                                    <th className="p-3 text-left">Server IP</th>
                                    <th className="p-3 text-left">IP Address</th>
                                    <th className="p-3 text-left">port</th>
                                    <th className="p-3 text-left">Parameter</th>
                                    <th className="p-3 text-left">Day</th>
                                    <th className="p-3 text-left">Time</th>
                                    <th className="p-3 text-center">Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {loading ? (
                            <tr>
                                <td colSpan="7" className="p-4 text-center text-gray-400"> Loading data... </td>
                            </tr>
                        ) : syncpolicyList.length === 0 ? (
                            <tr>
                                <td colSpan="7" className="p-4 text-center text-gray-400"> No Data found </td>
                            </tr>
                        ) : (                                
                                syncpolicyList.map((item, index) => (
                                    <tr key={index} className="border-b border-white/10 hover:bg-[#172033] transition" >
                                        {/* <td className="p-3">{item.srNo}</td> */}  {/* Sr No */}
                                        
                                        <td className="p-3">{item.serverIp}</td> {/* serverIp */}
                                        <td className="p-3">{item.ipAddress}</td> {/* ipAddress */}
                                        <td className="p-3">{item.port}</td> {/* port */}
                                        <td className="p-3">{item.parameter}</td> {/* parameter */}
                                        <td className="p-3">{item.day}</td> {/* day */}
                                        <td className="p-3 ">{item.time}</td> {/* time */}

                                        {/* Status */}
                                        {/* <td className="p-3">
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium  ${item.status === "Enable"
                                                ? "bg-green-500/20 text-green-400"
                                                : "bg-red-500/20 text-red-400"
                                                }`} > {item.status}  </span>
                                        </td>
                                     */}
                                        <td className="p-3 text-center">
                                            {/* Delete Button */}
                                            <button className="px-2 py-1 text-xs  text-red-400 hover:text-red-500 rounded-md hover:bg-red-500/30 transition"
                                                onClick={() => handleDelete(item)}><Trash2 size={20} /> </button>
                                        </td>


                                        
                                    </tr>
                                ))
                            )}
                            </tbody>
                        </table>


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

export default ViewSyncPolicy
