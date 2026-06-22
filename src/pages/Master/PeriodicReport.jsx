import React, { useState, useRef, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Plus, List, Play, Pencil, Trash2, MailPlus, CalendarClock } from "lucide-react";
import {
    addPeriodicReport,
    viewAllPeriodicReportList,
    editPeriodicReport,
    deleteSelectPeriodicReport 
} from "../../api/projectApi";
import { ToastContainer, toast } from 'react-toastify';

const PeriodicReport = () => {
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

    const [editId, setEditId] = useState(-1);
    const [isEditMode, setIsEditMode] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [viewPeriodicConfigListData, setViewPeriodicConfigListData] = useState([]);






    useEffect(() => {
        initialApiReq();
    }, []);
    const selectedParam = watch("reportType");
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
        const resData = await viewAllPeriodicReportList();

        console.log("resData ", resData.data.data);
        setViewPeriodicConfigListData(resData.data.data);

    }



    const reportsList = [
        { reportName: "NotInstalled Report", reportType: "Daily", scheduleTime: "13:00:00", scheduleDay: "", recipientName: "tester", recipientEmail: "test@gmail.com" },
        { reportName: "NotInstalled Report", reportType: "Daily", scheduleTime: "16:59:00", scheduleDay: "", recipientName: "test", recipientEmail: "tester@velox.co.in" }, { reportName: "NotInstalled Report", reportType: "Daily", scheduleTime: "16:59:00", scheduleDay: "", recipientName: "test", recipientEmail: "tester@velox.co.in" }, { reportName: "Playbook Response", reportType: "Daily", scheduleTime: "17:00:00", scheduleDay: "", recipientName: "test", recipientEmail: "test@gmail.com" }
    ];


    const reportNameList = [
        { value: "Patch Report", label: "Patch Report" },
        { value: "NotInstalled Report", label: "NotInstalled Report" },
        { value: "Update Timeline Report", label: "Update Timeline Report" },
        { value: "View Application Users", label: "View Application Users" }
    ]

    const handlemailconfig = async (data) => {
        console.log("Form Data:", data);
        data.scheduleDay = data.scheduleDay || "";
        data.scheduleTime = data.scheduleTime  ? `${data.scheduleTime}`  : "00:00:00";


        try {
            if (!isEditMode) {
                 data.id = 4;
                const res = await addPeriodicReport(data);
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
                data.id = editId;
                const res = await editPeriodicReport(data);
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
        setEditId(item.id);



    }

     const confirmDelete = async () => {
            console.log("deleteId:", deleteId);
            console.log("type of deleteId:", typeof deleteId);
            try {
                const payload = {
                    id: deleteId
                };
                const res = await deleteSelectPeriodicReport(payload);
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
        console.log("item.id:", item.id);
        setDeleteId(item.id); // or item.srNo       
        setIsDeleteOpen(true);
    };


    const handleReset = () => { reset({ reportName: "", recipientName: "", recipientemail: "", reportType: "", scheduleTime: "" }); clearErrors(); };

    return (
        <>
            <ToastContainer />
            <form onSubmit={handleSubmit((data) => handlemailconfig(data))}>
                <div className="bg-[#0B1220] rounded-2xl p-6 border border-white/10 shadow-xl">
                    <h2 className="text-lg font-semibold mb-6">Periodic Report</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className={labelClass}>Report Name</label>
                            <select className={inputClass} defaultValue="" {...register("reportName", { required: "Report Name is required" })} >
                                <option value="" disabled>-- Please select value --</option>
                                {reportNameList.map((opt) => (<option key={opt.value} value={opt.value}> {opt.label} </option>))}
                            </select>
                            {errors.reportName && <p className="text-red-500 text-xs">{errors.reportName.message}</p>}
                        </div>
                        <div>
                            <label className={labelClass}> Recipient Name</label>
                            <input className={inputClass} placeholder="Enter Recipient Name"  {...register("recipientName", { required: "Recipient Name is required" })} />
                            {errors.recipientName && <p className="text-red-500 text-xs">{errors.recipientName.message}</p>}
                        </div>
                        <div>
                            <label className={labelClass}>Recipient Email </label>
                            <input className={inputClass} placeholder="Enter Recipient  Email"  {...register("recipientEmail", {
                                required: "Recipient Email is required",
                                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter a valid Recipient email address" }
                            })} />
                            {errors.recipientEmail && (<p className="text-red-500 text-xs mt-1"> {errors.recipientEmail.message} </p>)}
                        </div>

                        <div>
                            <label className={labelClass}>Report Type</label>
                            <select className={inputClass} defaultValue="" {...register("reportType", { required: "Please select Report Type" })} >
                                <option value="" disabled>-- Please select value --</option>
                                <option value="Daily">Daily</option>
                                <option value="Weekly">Weekly</option>
                                {/* {CustNameOptions.map((opt) => (<option key={opt.value} value={opt.value}> {opt.label} </option>))} */}
                            </select>
                            {errors.reportType && <p className="text-red-500 text-xs">{errors.reportType.message}</p>}
                        </div>

                        {/* Schedule Time */}
                        <div>
                            <label className={labelClass}>Schedule Time</label>
                            <input type="time" className={inputClass} {...register("scheduleTime", { required: "Schedule Time is required" })} />
                            {errors.scheduleTime && <p className="text-red-500 text-xs">{errors.scheduleTime.message}</p>}
                        </div>

                        {selectedParam === "Weekly" && (
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
                            </>
                        )}

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
                <span className="px-4 text-md text-gray-400">Scheduled Periodic Reports</span>
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
                                <th className="p-3 text-left">Report Name</th>
                                <th className="p-3 text-left">Recipient Name </th>
                                <th className="p-3 text-left">RecipientName Email</th>
                                <th className="p-3 text-left">Report Type</th>
                                <th className="p-3 text-left">Schedule Day</th>
                                <th className="p-3 text-left">Schedule Time</th>
                                <th className="p-3 text-left">Action</th>
                            </tr>
                        </thead>

                        {/* Body */}
                        <tbody>
                            {viewPeriodicConfigListData.map((item, index) => (
                                <tr key={index} className="border-b border-white/10 hover:bg-[#172033]">
                                    <td className="p-3">{item.reportName}</td>
                                    <td className="p-3">{item.recipientName}</td>
                                    <td className="p-3">{item.recipientEmail}</td>
                                    <td className="p-3">{item.reportType}</td>
                                    <td className="p-3">{item.scheduleDay}</td>
                                    <td className="p-3">{item.scheduleTime}</td>
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

export default PeriodicReport