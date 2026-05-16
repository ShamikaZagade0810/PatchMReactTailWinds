import React, { useState, useRef, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import { Plus, List, Play, Pencil, Trash2, CalendarClock } from "lucide-react";
import MultiSelect from '../../layouts/MultiSelect.jsx';

import { AddActivityScheduler, getActivitySchedulerList, getUpdateActivityScheduler, deleteActivityScheduler, getUpdateStatusActivityScheduler } from "../../api/projectApi";


const ScheduleRunCmd = () => {
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

        useEffect(() => {
            register("ipAddress", { validate: (value) => value?.length > 0 || "At least 1 ipAddress must be selected" });           
            }, [register]);

              const [activityScheduleList, setactivityScheduleList] = useState([]);
                 const [loading, setLoading] = useState(false);
            useEffect(() => {
    initialApiReq();
}, []);



 const initialApiReq = async () => {
           try {
                   setLoading(true);           
                   const res = await getActivitySchedulerList();           
                   console.log("API Response:", res);           
                   // adjust based on backend response structure
                   setactivityScheduleList(res?.data?.data || res?.data || []);           
               } catch (error) {
                   console.error("Error fetching devices:", error);
                   setactivityScheduleList([]);
               } finally {
                   setLoading(false);
               }        
        }
            

         const [activitySchedule, setActivitySchedule] = useState([
            { srNo: 1, activityName: "Demo", activityCommand: "ping 127.0.0.1", activitySubCommand: "taskkill /F /IM AnyDesk.exe", scheduleTime: "16:11:00", ipList: ["192.168.0.15"]}
        ]);
       
        const handleToggleStatus = (index) => {
    const updated = [...activitySchedule];

    updated[index].status =
        updated[index].status === "ENABLED" ? "DISABLED" : "ENABLED";

    setActivitySchedule(updated);
};

    const ipOptions = [
        { value: "192.168.0.17", label: "192.168.0.17" },
        { value: "192.168.0.54", label: "192.168.0.54" },
        { value: "192.168.0.104", label: "192.168.0.104" },
        { value: "192.168.0.53", label: "192.168.0.53" },
    ];
    const [selectedIPs, setSelectedIPs] = useState([]);
      
           const [editId, setEditId] = useState(-1);
    const [isEditMode, setIsEditMode] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

         const handleReset = () => { reset({activity: "",  command: "", filepath: "", scheduleTime: "", ipAddress: [] })
         setSelectedIPs([]);    setIsEditMode(false); setEditId(-1);};

         // ---------------- SUBMIT API HANDLING BOTH ADD AND EDIT ----------------
          const onSubmit = async (data) => {

    const inputData = {
        srNo: editId,
        activityName: data.activity,
        activityCommand: data.command,
        activitySubCommand: data.filepath,
        scheduleTime: data.scheduleTime ? `${data.scheduleTime}` : "00:00:00",
        ipList: selectedIPs.map((item) => item.value)
    };

    console.log("Payload :", inputData);

    try {

        let response;

        // ---------------- UPDATE ----------------
        if (isEditMode) {

            response = await getUpdateActivityScheduler(inputData);

            if (response.data.status === 200) {

                toast.success(response.data.message || "Updated Successfully");

                setIsEditMode(false);
                setEditId(-1);

                handleReset();
                initialApiReq();
            }
            else {
                toast.error(response.data.message);
            }
        }

        // ---------------- ADD ----------------
        else {

            response = await AddActivityScheduler(inputData);

            if (response.data.status === 200) {

                toast.success(response.data.message || "Added Successfully");

                handleReset();
                initialApiReq();
            }
            else if (response.data.status === 409) {

                toast.warning(response.data.message);
            }
            else {

                toast.error(response.data.message);
            }
        }

    } catch (error) {

        console.error("Submit Error :", error);

        toast.error(
            error?.response?.data?.message ||
            "Operation Failed"
        );
    }
};

              // ---------------- EDIT API ----------------

const handleEdit = (item, index) => {

    console.log("Edit Item :", item);

    setIsEditMode(true);
    setEditId(item.srNo);

    // Populate form fields
    setValue("activity", item.activityName || "");
    setValue("command", item.activityCommand || "");
    setValue("filepath", item.activitySubCommand || "");

    // time input requires HH:mm
    setValue( "scheduleTime", item.scheduleTime ? item.scheduleTime.substring(0, 5) : "" );

    // Convert ipList string into MultiSelect format
    const formattedIPs = item.ipList?.split(",").map((ip) => { const ipAddress = ip.split("~")[0];
            return { value: ipAddress, label: ipAddress };  }) || [];
    setSelectedIPs(formattedIPs);
};
               // ---------------- DELETE API ----------------

                const handleDelete = (item) => {
                   console.log("item:", item.srNo );  
                       setDeleteId(item.srNo); // or item.srNo       
                       setIsDeleteOpen(true);
                   };
                   const confirmDelete = async () => {
                        console.log("deleteId:", deleteId);
                        console.log("type of deleteId:", typeof deleteId);
                       try {
                           const payload = {
                               id: deleteId
                           };
                           // await getdeleteActivityCmd(payload); // your API
                            console.log("Delete Payload:", payload);
                           const response = await deleteActivityScheduler(payload);    
                           // toast.success("Deleted successfully");
                            if(response.data.status === 200){
                                        toast.success(response.data.message);
                                       setIsDeleteOpen(false);
                                   }
                           else if (response.data.status === 409) { toast.warning(response.data.message); }
                           else { toast.error(response.data.message); }
                   
                           setIsDeleteOpen(false);
                           setDeleteId(null);
                   
                           // refresh table
                           initialApiReq();
                   
                       } catch (error) {
                           console.error(error);
                           toast.error("Delete failed");
                       }
                   };


  return (
     <>
            <ToastContainer />
            {/* <form onSubmit={handleSubmit((data) => handlemailconfig(data))}> */}
             <form onSubmit={handleSubmit(onSubmit)}>
                <div className="bg-[#0B1220] rounded-2xl p-6 border border-white/10 shadow-xl">
                    <h2 className="text-lg font-semibold mb-6">Schedule Command</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                    <label className={labelClass}> Activity Name </label>
                    <input className={inputClass} placeholder="Enter Activity Name"  {...register("activity", { required: "Activity Name is required" })} />
                {errors.activity && <p className="text-red-500 text-xs">{errors.activity.message}</p>}
                </div>

                <div>
                    <label className={labelClass}> Activity Command </label>
                    <input className={inputClass} placeholder="Enter Activity Command" {...register("command", { required: "Activity Command is required" })} />
                {errors.command && <p className="text-red-500 text-xs">{errors.command.message}</p>}
                </div>

                <div>
                    <label className={labelClass}>Activity Sub-Command </label>
                    <input className={inputClass} placeholder="Enter Activity Sub-Command" {...register("filepath", { required: "Activity Sub-Command is required" })} />
                    {errors.filepath && <p className="text-red-500 text-xs">{errors.filepath.message}</p>}
                </div>
                <div>
                    <label className={labelClass}>IP Address </label>
                      <MultiSelect
        options={ipOptions}
        value={selectedIPs}
        onChange={setSelectedIPs}
        placeholder="Select IP Addresses"
        id={"ipAddress"}
        setValue={setValue} />  
        {errors?.ipAddress && ( <p className="text-red-400 text-xs mt-1"> {errors.ipAddress.message} </p>  )}  
                </div>
                 {/* Schedule Time */}
                        <div>
                            <label className={labelClass}>Schedule Time</label>
                            <input type="time" className={inputClass} {...register("scheduleTime", { required: "Schedule Time is required" })} />
                            {errors.scheduleTime && <p className="text-red-500 text-xs">{errors.scheduleTime.message}</p>}
                        </div>
            </div>

                    <div className="flex justify-end mt-8 gap-3">
                        {/* <button className={btnClass} >Submit</button> */}
                        <button className={btnClass}> {isEditMode ? "Update" : "Submit"} </button>
                        <button type="button" className={resetClass} onClick={handleReset}>Reset</button>
                    </div>
                </div>
            </form>
            {/* Divider */}
            {/* <div className="border-t border-white/10 my-8"></div> */}
            <div className="flex items-center my-6">
                <div className="flex-grow h-px bg-gray-700"></div>
                <span className="px-4 text-md text-gray-400">Schedule Command Details</span>
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
                               <th className="p-3 text-left">Activity Name</th>
                            <th className="p-3 text-left">Command</th>
                            <th className="p-3 text-left">Sub Command</th>
                            <th className="p-3 text-left">Scheduled Time</th>                                
                            <th className="p-3 text-left">IPList</th> 
                                <th className="p-3 text-center">Action</th>
                               < th className="p-3 text-left">Status</th>
                            </tr>
                        </thead>

                        {/* Body */}
                        <tbody>
                            {activityScheduleList.map((item, index) => (
                                <tr key={index} className="border-b border-white/10 hover:bg-[#172033]">
                                    <td className="p-3">{item.activityName}</td>
                                    <td className="p-3">{item.activityCommand}</td>
                                    <td className="p-3">{item.activitySubCommand}</td>
                                    <td className="p-3">{item.scheduleTime}</td>
                                   {/* <td className="p-3">{item.ipList}</td> */}
                                   <td className="p-3">
    <div className="flex flex-wrap gap-1">
        {item.ipList ?.split(",") .map((ip, index) => { const ipAddress = ip.split("~")[0];
                return ( <span key={index} className="px-2 py-1 text-xs rounded-md bg-blue-500/20 text-blue-300 border border-blue-500/20" >
                        {ipAddress}
                    </span>
                );
            })}
    </div>
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
                                    <td className="p-3">
    <label className="relative inline-flex items-center cursor-pointer">
        <input
            type="checkbox"
            className="sr-only peer"
            checked={item.status === "ENABLED"}
            onChange={() => handleToggleStatus(index)}
        />
        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:bg-green-500 transition-all
            after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 
            after:transition-all peer-checked:after:translate-x-full">
        </div>
    </label>
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

export default ScheduleRunCmd
