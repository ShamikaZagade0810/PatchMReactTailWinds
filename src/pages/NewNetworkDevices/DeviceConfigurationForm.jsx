import React, { useState, useEffect } from 'react'
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';

const DeviceConfigurationForm = () => {
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
  const handleReset = () => {
    reset({
      deviceName: "", ipAddress: "", protocol: "", port: "", password: "", userName: "", vendor: "",
      authKey: "", frquency: "", autoConfig: false
    });
  };

  const VendorOption = [
    { label: "Fortinet", value: "fortiner" },
    { label: "Cisco", value: "cisco" },
    { label: "Juniper", value: "juniper" },
    { label: "Aruba", value: "aruba" },
    { label: "Palo Alto", value: "palo alto" }
  ];


  const ProtocalOption = [
    { label: "Fortinet", value: "fortiner" },
    { label: "Cisco", value: "cisco" },
    { label: "Juniper", value: "juniper" },
    { label: "Aruba", value: "aruba" },
    { label: "Palo Alto", value: "palo alto" }
  ];

  const FrquencyOption = [
    { label: "Daily", value: "Daily" },
    { label: "Weekly", value: "Weekly" },
    { label: "Monthly", value: "Monthly" },
  ]

  return (
    <>
      <form onSubmit={handleSubmit((data) => handleSetPolicySubmit(data))}>
        <div className="bg-[#0B1220] rounded-2xl p-6 border border-white/10 shadow-xl">
          <h2 className="text-2xl font-semibold mb-6">Network Device Configuration</h2>
          {/* <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold"> Network Device Configuration </h2>

            <div className="flex items-center gap-3">
              <button className={btnClass} type="submit"> Submit </button>
              <button type="button" className={resetClass} onClick={handleReset} > Reset  </button>
            </div>
          </div> */}

          {/* 1. Device Connection Settings */}
          <h3 className="text-md font-semibold text-blue-400 mb-3"> Device Connection Settings </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className={labelClass}> Device Name</label>
              <input className={inputClass} placeholder="Enter Device Name"  {...register("deviceName", { required: "Device Name is required" })} />
              {errors.deviceName && <p className="text-red-500 text-xs">{errors.deviceName.message}</p>}
            </div>
            <div>
              <label className={labelClass}>IP Address</label>
              <input className={inputClass} placeholder="Enter IP Address"  {...register("ipAddress", { required: "IP Address is required" })} />
              {errors.ipAddress && <p className="text-red-500 text-xs">{errors.ipAddress.message}</p>}
            </div>
            <div>
              <label className={labelClass}>Vendor</label>
              <select className={inputClass} defaultValue="" {...register("vendor", { required: "Vendor is required" })} >
                <option value="" disabled>-- Please select value --</option>
                {VendorOption.map((opt) => (<option key={opt.value} value={opt.value}> {opt.label} </option>))}
                {/* {CustNameOptions.map((opt) => (<option key={opt.value} value={opt.value}> {opt.label} </option>))} */}
              </select>
              {errors.vendor && <p className="text-red-500 text-xs">{errors.vendor.message}</p>}
            </div>

            <div>
              <label className={labelClass}>Protocal</label>
              <select className={inputClass} defaultValue="" {...register("protocol", { required: "Protocal is required" })} >
                <option value="" disabled>-- Please select value --</option>
                {ProtocalOption.map((opt) => (<option key={opt.value} value={opt.value}> {opt.label} </option>))}
              </select>
              {errors.protocol && <p className="text-red-500 text-xs">{errors.protocol.message}</p>}
            </div>

          </div>
          {/* Divider */}
          <div className="border-t border-slate-800 my-8"></div>
          {/* 2. Authentication Settings */}
          <h3 className="text-md font-semibold text-blue-400 mt-8 mb-3"> Authentication Settings </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <div>
              <label className={labelClass}> User Name </label>
              <input className={inputClass} placeholder="Enter User Name" {...register("userName", { required: "User name required" })} />
              {errors.userName && (<p className="text-red-500 text-xs mt-1"> {errors.userName.message} </p>)}
            </div>

            <div>
              <label className={labelClass}>Password</label>
              <input type="password" className={inputClass} placeholder="Enter Password"  {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Minimum 6 characters required" }
              })} />
              {errors.password && (<p className="text-red-500 text-xs mt-1"> {errors.password.message} </p>)}
            </div>
            <div>
              <label className={labelClass}>SNMP Community / Auth Key</label>
              <input className={inputClass} placeholder="Enter SNMP Community / Auth Key"  {...register("authKey", { required: "SNMP Community / Auth Key is required" })} />
              {errors.authKey && <p className="text-red-500 text-xs">{errors.authKey.message}</p>}
            </div>
            <div>
              <label className={labelClass}> Port</label>
              <input type="number" className={inputClass} placeholder="Enter Policy Name"  {...register("port", { required: "Port is required" })} />
              {errors.port && <p className="text-red-500 text-xs">{errors.port.message}</p>}
            </div>

          </div>

          {/* Divider */}
          <div className="border-t border-slate-800 my-8"></div>
          {/* 3. Configuration Backup Settings */}
          <h3 className="text-md font-semibold text-blue-400 mt-8 mb-3"> Configuration Backup Settings </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <div>
              <label className={labelClass}>Backup Frequency</label>
              <select className={inputClass} defaultValue="" {...register("frquency", { required: "Backup Frequency is required" })} >
                <option value="" disabled>-- Please select value --</option>
                {FrquencyOption.map((opt) => (<option key={opt.value} value={opt.value}> {opt.label} </option>))}
                {/* {CustNameOptions.map((opt) => (<option key={opt.value} value={opt.value}> {opt.label} </option>))} */}
              </select>
              {errors.frquency && <p className="text-red-500 text-xs">{errors.frquency.message}</p>}
            </div>
            {/* Schedule Time */}
            <div>
              <label className={labelClass}>Backup Time</label>
              <input type="time" className={inputClass} {...register("scheduleTime", { required: "Schedule Time is required" })} />
              {errors.scheduleTime && <p className="text-red-500 text-xs">{errors.scheduleTime.message}</p>}
            </div>

            <div>
              <div className="flex items-center gap-3 mt-7">
                <input type="checkbox" id="autoConfig" className="h-4 w-4 accent-blue-500" {...register("autoConfig")} />
                <label htmlFor="autoConfig" className={labelClass}> Enable Automatic Configuration Backup </label>
              </div>
            </div>
          </div>
          {/* Divider */}
          <div className="border-t border-slate-800 my-8"></div>
          {/* 4. Configuration Backup Settings */}
          <h3 className="text-md font-semibold text-blue-400 mt-8 mb-3"> Firmware Patch Settings </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Current Firmware Version */}
            <div>
              <label className={labelClass}>Current Firmware Version</label>
              <input className={inputClass} placeholder="Enter Current Firmware Version"  {...register("currentVer", { required: "Current Firmware Version is required" })} />
              {errors.currentVer && <p className="text-red-500 text-xs">{errors.currentVer.message}</p>}
            </div>
            {/* Target Firmware Version */}
            <div>
              <label className={labelClass}>Target Firmware Version</label>
              <input className={inputClass} placeholder="Enter Target Firmware Version"  {...register("targetVer", { required: "Target Firmware Version is required" })} />
              {errors.targetVer && <p className="text-red-500 text-xs">{errors.targetVer.message}</p>}
            </div>
            {/* checkbox */}
            <div>
              <div className="flex items-center gap-3 mt-7">
                <input type="checkbox" id="compliancecheck" className="h-4 w-4 accent-blue-500" {...register("compliancecheck")} />
                <label htmlFor="compliancecheck" className={labelClass}> Enable Firmware Compliance Check </label>
              </div>
            </div>

          </div>

          {/* Divider */}
          <div className="border-t border-slate-800 my-8"></div>

          <h3 className="text-md font-semibold text-blue-400 mt-8 mb-3"> Compliance Policies </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-[#111827] border border-transparent hover:border-cyan-400/40 rounded-xl p-4 hover:border-cyan-400/40 transition-all duration-300">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h4 className="text-sm font-semibold text-white"> SSH Must Be Enabled </h4>
                  <p className="text-xs text-gray-400 mt-1"> Detect devices with telnet enabled </p>
                </div>
                <input type="checkbox" className="w-5 h-5 mt-1 accent-cyan-500 cursor-pointer" {...register("sshEnabled")} />
              </div>
            </div>

            <div className="bg-[#111827] border border-transparent hover:border-cyan-400/40 rounded-xl p-4 hover:border-cyan-400/40 transition-all duration-300">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h4 className="text-sm font-semibold text-white"> SNMPv3 Enforcement </h4>
                  <p className="text-xs text-gray-400 mt-1"> Restrict SNMPv1/v2 usage </p>
                </div>
                <input type="checkbox" className="w-5 h-5 mt-1 accent-cyan-500 cursor-pointer" {...register("snmpv3Enforcement")} />
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-[#111827] border border-transparent hover:border-cyan-400/40 rounded-xl p-4 hover:border-cyan-400/40 transition-all duration-300">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h4 className="text-sm font-semibold text-white"> Default Password Check </h4>
                  <p className="text-xs text-gray-400 mt-1"> Detect weak or default passwords </p>
                </div>
                <input type="checkbox" className="w-5 h-5 mt-1 accent-cyan-500 cursor-pointer" {...register("defaultPasswordCheck")} />
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
  )
}

export default DeviceConfigurationForm
