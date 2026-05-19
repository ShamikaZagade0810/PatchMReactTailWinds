import React, { useState, useEffect } from 'react'
import { useForm } from "react-hook-form";
import { Plus, List, Play, Pencil, Trash2, ClipboardList, SquareCheckBig, Ban } from "lucide-react";
import { ToastContainer, toast } from 'react-toastify';

import MultiSelect from '../../layouts/MultiSelect.jsx';

import { AddClientWiseSyncPolicy } from "../../api/projectApi";

const ClientWiseSyncPolicy = ({ editData, setEditData }) => {
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
    const [selectedip, setSelectedip] = useState([]);

    const ostypeOptions = [
        { value: "NPCIL", label: "NPCIL" },
        { value: "NHPC", label: "NHPC" },
    ];

    const ipaddress = [
        { value: "192.168.0.15", label: "192.168.0.15" },
        { value: "192.168.0.2", label: "192.168.0.2" },
        { value: "192.168.0.4", label: "192.168.0.4" },
        { value: "192.168.0.24", label: "192.168.0.24" },
    ];

    useEffect(() => {
        register("ipaddress", { validate: (value) => value?.length > 0 || "At least 1 IP must be selected" });
    }, [register]);

    useEffect(() => {
    if (editData) {

        reset({
            policyName: editData.policyName || "",
            serverIp: editData.serverIp || "",
            port: editData.port || "",
            parameter: editData.parameter || "",
            scheduleDay: editData.day || "",
            scheduleTime: editData.time || "",
            ostype: editData.ostype || "",
            ipaddress: editData.ipAddress || [],
        });

        const formattedIPs = editData.ipAddress?.map((ip) => ({ value: ip, label: ip, })) || [];

        setSelectedip(formattedIPs);
    }
}, [editData, reset]);

    const handleReset = () => {
        reset({ policyName: "", serverIp: "", port: "", parameter: "", ostype: "", ipaddress: [] , scheduleDay: "", scheduleTime: "",}); setSelectedip([]);
    };

    // ---------------- SUBMIT API ----------------
    const onSubmit = async (data) => {
        const inputData = {
            policyName: data.policyName,
            serverIp: data.serverIp,
            port: data.port,
            patchUpdateParameter: data.parameter,
            osType: data.ostype,
            scheduleDay: data.scheduleDay,
            scheduleTime: data.scheduleTime ? `${data.scheduleTime}:00` : "00:00:00",
            type: data.type,            
            ipAddress: selectedip.map((item) => item.value),
            
        };        

        console.log("Payload :", inputData);
        try {
                const response = await AddClientWiseSyncPolicy(inputData);
                console.log("Add Client Wise Sync Policy Response :", response.data.status);
                // alert("User Added Successfully");
                if(response.data.status === 200){
                     toast.success(response.data.message);
                    handleReset();
                }
                 else if (response.data.status === 409) { toast.warning(response.data.message); }
                else { toast.error(response.data.message); }
        } catch (error) {
            console.error("Add Client Wise Sync Policy Error :", error);
            alert( error?.response?.data?.message || "Failed to  Add Client Wise Sync Policy" );
        }
    };

    return (
        <>
            {/* <form onSubmit={handleSubmit((data) => handleCustomerSubmit(data))}> */}
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="bg-[#0B1220] rounded-2xl p-6 border border-white/10 shadow-xl">
                    <h2 className="text-lg font-semibold mb-6">Client Wise Synchronization Policy</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className={labelClass}> Policy Name</label>
                            <input className={inputClass} placeholder="Enter Policy Name"  {...register("policyName", { required: "Policy Name is required" })} />
                            {errors.policyName && <p className="text-red-500 text-xs">{errors.policyName.message}</p>}
                        </div>
                        <div>
                            <label className={labelClass}> Server IP</label>
                            <input className={inputClass} placeholder="Enter Server IP"  {...register("serverIp", { required: "Server IP is required" })} />
                            {errors.serverIp && <p className="text-red-500 text-xs">{errors.serverIp.message}</p>}
                        </div>
                        <div>
                            <label className={labelClass}> Port</label>
                            <input className={inputClass} placeholder="Enter port"  {...register("port", { required: "Port is required" })} />
                            {errors.port && <p className="text-red-500 text-xs">{errors.port.message}</p>}
                        </div>
                        {/* Parameter */}
                        <div>
                            <label className={labelClass}>Parameter</label>
                            <select className={inputClass} defaultValue="" {...register("parameter", { required: "Parameteris required" })} >
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
                        {/* OS Type */}
                        <div>
                            <label className={labelClass}>OS Type</label>
                            <select className={inputClass} defaultValue="" {...register("ostype", { required: "OS Type is required" })} >
                                <option value="" disabled>-- Please select value --</option>
                                {ostypeOptions.map((opt) => (<option key={opt.value} value={opt.value}> {opt.label} </option>))}
                            </select>
                            {errors.ostype && <p className="text-red-500 text-xs">{errors.ostype.message}</p>}
                        </div>
                        <div>


                            <label className={labelClass}> IP Address </label>
                            <MultiSelect options={ipaddress}
                                value={selectedip}
                                onChange={setSelectedip}
                                placeholder="Select IP Address"
                                id={"ipaddress"}
                                setValue={setValue} />
                            {errors?.ipaddress && (<p className="text-red-400 text-xs mt-1"> {errors.ipaddress.message} </p>)}
                        </div>

                    </div>
                    <div className="flex justify-end mt-8 gap-3">
                        <button type="submit" className={btnClass}> Submit  </button>
                        <button type="button" className={resetClass} onClick={handleReset}>Reset</button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default ClientWiseSyncPolicy
