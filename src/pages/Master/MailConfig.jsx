import React, { useState, useRef, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Pencil, Trash2 } from "lucide-react";
import {
    addMailConfig,
    viewAllMailConfig,
    editMailConfig,
    deleteSelectMailConfig
} from "../../api/projectApi";
import { ToastContainer, toast } from 'react-toastify';

const MailConfig = () => {
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
        reset,
        clearErrors
    } = useForm();
    const [viewMailConfigListData, setViewMailConfigListData] = useState([]);
    const [editId, setEditId] = useState(-1);
    const [isEditMode, setIsEditMode] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    useEffect(() => {
        initialApiReq();
    }, []);

    const initialApiReq = async () => {
        // const data = await getActivityCmdList();
        try {
            console.log("inside initialApiReq--> ");
            getData();
        } catch (error) {
            console.error("API Error:", error);
        }
    }



    const getData = async () => {
        console.log("Hello World");
        const resData = await viewAllMailConfig();

        console.log("resData ", resData.data.data);
        setViewMailConfigListData(resData.data.data);

    }


    const mailList = [
        { hostName: "test", active: "Yes", port: "8503", password: "Gmail@1234", senderemail: "newmail@gmail.com", senderId: "oldmail@gmail.com" }
    ];

    const handlemailconfig = async (data) => {
        console.log("Form Data:", data);


        try {
            if (!isEditMode) {

                const res = await addMailConfig(data);
                console.log("Res Data--->  ", res);
                if (res.data.status == 200) {
                    toast.success(res.data.message, {
                        onClose: () => {
                            window.location.reload();
                        }
                    });
                } else {
                    toast.error(res.data.message);
                }
            } else {
                data.srNo = editId;
                const res = await editMailConfig(data);
                console.log("Res Data--->  ", res);
                if (res.data.status == 200) {
                    toast.success(res.data.message, {
                        onClose: () => {
                            window.location.reload();
                        }
                    });
                } else {
                    toast.error(res.data.message);
                }
            }

            reset();
        } catch (ex) {
            console.log("Exception ", ex);
        }



    };

    const handleEdit = (item, index) => {
        console.log("item ", item);

        Object.entries(item).forEach(([key, value]) => {


            setValue(key, value);

        });
        setIsEditMode(true);
        setEditId(item.srNo);



    }

    const confirmDelete = async () => {
        console.log("deleteId:", deleteId);
        console.log("type of deleteId:", typeof deleteId);
        try {
            const payload = {
                srNo: deleteId
            };
            const res = await deleteSelectMailConfig(payload);
            // await getdeleteActivityCmd(payload); // your API
            if (res.data.status == 200) {
                toast.success(res.data.message, {
                    onClose: () => {
                        window.location.reload();
                    }
                });
            } else {
                toast.success(res.data.message);
            }


            setIsDeleteOpen(false);
            setDeleteId(null);

            // refresh table
            // initialApiReq();

        } catch (error) {
            console.error(error);
            toast.error("Delete failed");
        }
    };


    const handleDelete = (item) => {
        console.log("item:", item);
        console.log("item.id:", item.srNo);
        setDeleteId(item.srNo); // or item.srNo       
        setIsDeleteOpen(true);
    };


    const handleReset = () => { reset({ host: "", port: "", senderId: "", senderEmail: "", password: "", authentication: "" }); setEditId(-1); setIsEditMode(false); clearErrors(); };

    return (
        <>
            <ToastContainer />
            <form onSubmit={handleSubmit((data) => handlemailconfig(data))}>
                <div className="bg-[#0B1220] rounded-2xl p-6 border border-white/10 shadow-xl">
                    <h2 className="text-lg font-semibold mb-6">Mail Configuration</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className={labelClass}> Host Name</label>
                            <input className={inputClass} placeholder="Enter Host Name"  {...register("host", { required: "Host Name is required" })} />
                            {errors.host && <p className="text-red-500 text-xs">{errors.host.message}</p>}
                        </div>


                        <div>
                            <label className={labelClass}>Activate</label>
                            <select className={inputClass} defaultValue="" {...register("authentication", { required: "Please select activation status" })} >
                                <option value="" disabled>-- Please select value --</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                                {/* {CustNameOptions.map((opt) => (<option key={opt.value} value={opt.value}> {opt.label} </option>))} */}
                            </select>
                            {errors.authentication && <p className="text-red-500 text-xs">{errors.authentication.message}</p>}
                        </div>
                        <div>
                            <label className={labelClass}> Port</label>
                            <input className={inputClass} placeholder="Enter Port"   {...register("port", {
                                required: "Port is required",
                                pattern: { value: /^[0-9]+$/, message: "Only numbers allowed" }
                            })} />
                            {errors.port && <p className="text-red-500 text-xs">{errors.port.message}</p>}
                        </div>

                        <div>
                            <label className={labelClass}> Sender ID</label>
                            <input className={inputClass} placeholder="Enter Sender ID"  {...register("senderId", { required: "Sender ID is required" })} />
                            {errors.senderId && <p className="text-red-500 text-xs">{errors.senderId.message}</p>}
                        </div>
                        <div>
                            <label className={labelClass}>Sender Email </label>
                            <input className={inputClass} placeholder="Enter Sender Email"  {...register("senderEmail", {
                                required: "Sender Email is required",
                                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter a valid Sender email address" }
                            })} />
                            {errors.senderEmail && (<p className="text-red-500 text-xs mt-1"> {errors.senderEmail.message} </p>)}
                        </div>

                        <div>
                            <label className={labelClass}>Password</label>
                            <input type="password" className={inputClass} placeholder="Enter Password"  {...register("password", {
                                required: "Password is required",
                                minLength: { value: 6, message: "Minimum 6 characters required" }
                            })} />
                            {errors.password && (<p className="text-red-500 text-xs mt-1"> {errors.password.message} </p>)}
                        </div>

                    </div>
                    <div className="flex justify-end mt-8 gap-3">
                        <button className={btnClass} >Submit</button>
                        <button type="button" className={resetClass} onClick={handleReset}>Reset</button>
                    </div>
                </div>
            </form>
            {/* Divider */}
            {/* <div className="border-t border-white/10 my-8"></div> */}
            <div className="flex items-center my-6">
                <div className="flex-grow h-px bg-gray-700"></div>
                <span className="px-4 text-md text-gray-400">Mail Configuration List</span>
                <div className="flex-grow h-px bg-gray-700"></div>
            </div>

            {/* Table Section */}
            <div className="bg-[#0B1220] rounded-xl  shadow-lg">

                {/* <div className="p-4 border-b border-white/10">
    <h3 className="text-md font-semibold text-gray-300">
      Mail Configuration List
    </h3>
  </div> */}

                <div className="overflow-x-auto">
                    <table className="w-full text-sm">

                        {/* Header */}
                        <thead className="bg-[#1E293B] text-gray-300 border-b border-white/20">
                            <tr>
                                <th className="p-3 text-left">Host Name</th>
                                <th className="p-3 text-left">Port</th>
                                <th className="p-3 text-left">Sender ID</th>
                                <th className="p-3 text-left">Sender Email</th>
                                <th className="p-3 text-left">Status</th>
                                <th className="p-3 text-left">Action</th>
                            </tr>
                        </thead>

                        {/* Body */}
                        <tbody>
                            {viewMailConfigListData.map((item, index) => (
                                <tr key={index} className="border-b border-white/10 hover:bg-[#172033]">
                                    <td className="p-3">{item.host}</td>
                                    <td className="p-3">{item.port}</td>
                                    <td className="p-3">{item.senderId}</td>
                                    <td className="p-3">{item.senderEmail}</td>
                                    <td className="p-3"> <span className={`px-2 py-1 text-xs rounded ${item.authentication === "Yes" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
                                        {item.authentication === "Yes" ? "Active" : "Inactive"}
                                    </span>
                                    </td>
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
                </div>
            </div>

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

        </>
        
    )
}

export default MailConfig