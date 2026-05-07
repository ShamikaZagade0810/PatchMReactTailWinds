import React, { useState, useRef, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

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

        const mailList=[
            {hostName:"test",active:"Yes",port:"8503" ,password:"Gmail@1234",senderemail:"newmail@gmail.com",senderId:"oldmail@gmail.com"}
        ];

        const handlemailconfig = (data) => {
  console.log("Form Data:", data);
};
        
      const handleReset = () => { reset({ hostName: "", ipAddress :"", port: "", senderid: "", senderemail: "", password: "", active: "" });  clearErrors(); };

    return (
        <>
        <form onSubmit={handleSubmit((data) => handlemailconfig(data))}>
        <div className="bg-[#0B1220] rounded-2xl p-6 border border-white/10 shadow-xl">
            <h2 className="text-lg font-semibold mb-6">Mail Configuration</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                    <label className={labelClass}> Host Name</label>
                    <input className={inputClass} placeholder="Enter Host Name"  {...register("hostName",  { required: "Host Name is required" })} />
                    {errors.hostName && <p className="text-red-500 text-xs">{errors.hostName.message}</p>}
                </div>
                
                <div>
                    <label className={labelClass}>IP Address</label>
                    <input className={inputClass} placeholder="Enter IP Address"  {...register("ipAddress" , { required: "IP Address is required", 
                     pattern: { value: /^(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}$/, message: "Enter valid IP address" } })} />
                    {errors.ipAddress && <p className="text-red-500 text-xs">{errors.ipAddress.message}</p>}
                </div>
                   
                <div>
                    <label className={labelClass}>Activate</label>
                    <select className={inputClass} defaultValue="" {...register("active", { required: "Please select activation status" })} >
                        <option value="" disabled>-- Please select value --</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                        {/* {CustNameOptions.map((opt) => (<option key={opt.value} value={opt.value}> {opt.label} </option>))} */}
                    </select>
                    {errors.active && <p className="text-red-500 text-xs">{errors.active.message}</p>}
                </div>
                <div>
                    <label className={labelClass}> Port</label>
                    <input className={inputClass} placeholder="Enter Port"   {...register("port", { required: "Port is required",
                        pattern: { value: /^[0-9]+$/, message: "Only numbers allowed" }  })} />
                        {errors.port && <p className="text-red-500 text-xs">{errors.port.message}</p>}
                </div>  

                <div>
                    <label className={labelClass}> Sender ID</label>
                    <input className={inputClass} placeholder="Enter Sender ID"  {...register("senderid", { required: "Sender ID is required" })} />
                    {errors.senderid && <p className="text-red-500 text-xs">{errors.senderid.message}</p>}
                </div>   
             <div>
                    <label className={labelClass}>Sender Email </label>
                    <input className={inputClass} placeholder="Enter Sender Email"  {...register("senderemail", { required: "Sender Email is required",
                            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter a valid Sender email address" } })} />
                            {errors.senderemail && ( <p className="text-red-500 text-xs mt-1"> {errors.senderemail.message} </p> )}
                </div>

                 <div>
                    <label className={labelClass}>Password</label>
                    <input  type="password" className={inputClass} placeholder="Enter Password"  {...register("password", { required: "Password is required",
                        minLength: { value: 6, message: "Minimum 6 characters required" } })} />
                    {errors.password && ( <p className="text-red-500 text-xs mt-1"> {errors.password.message} </p> )}
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
        {mailList.map((item, index) => (
  <tr key={index} className="border-b border-white/10 hover:bg-[#172033]">
    <td className="p-3">{item.hostName}</td>    
    <td className="p-3">{item.port}</td>
    <td className="p-3">{item.senderId}</td>
    <td className="p-3">{item.senderemail}</td>
    <td className="p-3"> <span className={`px-2 py-1 text-xs rounded ${ item.active === "Yes" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
        {item.active === "Yes" ? "Active" : "Inactive"}
      </span>
    </td>
  </tr>
))}
      </tbody>

    </table>
  </div>
</div>

        </>
        
    )
}

export default MailConfig