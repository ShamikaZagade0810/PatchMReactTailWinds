import React, { useState, useRef, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import MultiSelect from '../layouts/MultiSelect.jsx';

const AddUser = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setValue, 
        reset
    } = useForm();

    const password = watch("password");

    const [visible, setVisible] = useState(false);

    const [selectedOEM, setSelectedOEM] = useState([]);
    const [selectedCustName, setSelectedCustName] = useState([]);
    const [selectedBranch, setSelectedBranch] = useState([]);

    const [oemList, setoemList] = useState([]);
    const [branchList, setBranchList] = useState([]);
    const [ipAddressList, setIpAddressList] = useState([]);

    const [dashboardValues, setDashboardValues] = useState([]);
    const [masterValues, setMasterValues] = useState([]);
    const [reportsValues, setReportsValues] = useState([]);
    const [contentValues, setContentValues] = useState([]);
    const [patchValues, setPatchValues] = useState([]);
    const [rightClickValues, setRightClickValues] = useState([]);


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

    useEffect(() => {
    register("branchNames", { validate: (value) => value?.length > 0 || "At least 1 branch must be selected" });
    register("CustNames", { validate: (value) => value?.length > 0 || "At least 1 Customer must be selected" });
    register("OEMNames", { validate: (value) => value?.length > 0 || "At least 1 OEM must be selected" });
    }, [register]);

    const dashboardOptions = ["Status", "Patch Tree", "Third Party"];
    const masterOptions = ["Create Application User", "View Application User", "Customer Master"];
    const reportsOptions = ["Patch Report", "Polling Interval"];
    const contentOptions = ["Manage Patches", "Send Multiple Patches"];
    const patchOptions = ["Approve Or Decline", "Automatic Approval"];
    const rightclickOptions = ["Discover Patches", "Update Now"];

    const handleCheckbox = (value, list, setList) => {
        if (list.includes(value)) {
            setList(list.filter((v) => v !== value));
        } else {
            setList([...list, value]);
        }
    };

      const handleReset = () => {
      reset({
    firstName: "",  
    lastName :"",      // 👈 force reset explicitly
    email: "",
     contact: "",
    userName: "",
    password: "",
    confirmPassword: "",
    type: "",
    branchNames: [],
    OEMNames: [],
    CustNames :[]

  });
    setSelectedBranch([]);
    setSelectedCustName([]);
    setSelectedOEM([]);
  };

    const labelClass = "text-[15px] text-[#d1d5db] mb-1 block";
    const inputClass = "w-full h-[34px] px-2 text-[12px] bg-[#1E293B] text-white rounded-md border border-[#2A3A55] focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500";
    const btnClass =
        "px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.03] active:scale-[0.97] focus:outline-none focus:ring-2 focus:ring-blue-400/60";
 const resetClass = "px-6 py-2 bg-gradient-to-r from-gray-800 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white rounded-lg transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.03] active:scale-[0.97] focus:outline-none focus:ring-2 focus:ring-blue-400/60";
    

    return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
    <div className="bg-[#0B1220] rounded-2xl p-6 border border-white/10 shadow-xl">
            <h2 className="text-lg font-semibold mb-6">Add Activity Command</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* ROW 1 */}
                <div>
                    <label className={labelClass}> First Name </label>
                    <input className={inputClass} placeholder="Enter First Name" {...register("firstName", { required: "First name required" })} />
                                    {errors.firstName && (<p className="text-red-500 text-xs mt-1">{errors.firstName.message} </p>  )}
                </div>

                <div>
                    <label className={labelClass}> Last name </label>
                    <input className={inputClass} placeholder="Enter Last Name"   {...register("lastName", { required: "Last name required" })} />
                                    {errors.lastName && ( <p className="text-red-500 text-xs mt-1"> {errors.lastName.message} </p> )}
                </div>

                <div>
                    <label className={labelClass}>Email Id </label>
                    <input className={inputClass} placeholder="Enter Email Id"  {...register("email", { required: "Email is required",
                            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter a valid email address" } })} />
                            {errors.email && ( <p className="text-red-500 text-xs mt-1"> {errors.email.message} </p> )}
                </div>

                {/* ROW 2 */}

                <div>
                    <label className={labelClass}> Contact Number    </label>
                    <input type="tel" className={inputClass} placeholder="Enter Contact Number" {...register("contact", {
                    required: "Contact is required",
                    pattern: { value: /^[0-9]{10}$/,  message: "Enter valid 10 digit number" } })}
                    onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, ""); }} />
                    {errors.contact && ( <p className="text-red-500 text-xs mt-1"> {errors.contact.message} </p> )}
                </div>

                <div>
                    <label className={labelClass}>Type</label>
                    {/* <input className={inputClass} placeholder="Type" /> */}
                    <select className="filter-input focus:outline-none focus:ring-2 focus:ring-blue-500" {...register("type", { required: "Type is required" })} defaultValue="">
                    <option value="" disabled> -- Please select value -- </option>
                    <option value="admin">Admin</option>
                    <option value="host">Host</option>
                </select>
                {errors.type && (
  <p className="text-red-500 text-xs mt-1">
    {errors.type.message}
  </p>
)}
                </div>

                <div>
                    {/* <label className={labelClass}>Email Id </label>
                    <input className={inputClass} placeholder="Enter Email Id" /> */}
                </div>

                 {/* ROW 3 */}

                <div>
                    <label className={labelClass}> User Name </label>
                    <input className={inputClass} placeholder="Enter User Name" {...register("userName", { required: "User name required" })} />
                                    {errors.userName && ( <p className="text-red-500 text-xs mt-1"> {errors.userName.message} </p> )}
                </div>

                <div>
                    <label className={labelClass}>Password</label>
                    <input  type="password" className={inputClass} placeholder="Enter Password"  {...register("password", { required: "Password is required",
                        minLength: { value: 6, message: "Minimum 6 characters required" } })} />
                    {errors.password && ( <p className="text-red-500 text-xs mt-1"> {errors.password.message} </p> )}
                </div>

                <div>
                    <label className={labelClass}>Confirm Password </label>
                    <input  type="password" className={inputClass} placeholder="Confirm Password" {...register("confirmPassword", { required: "Confirm your password",
                        validate: (value) => value === password || "Passwords do not match" })}  />
                    {errors.confirmPassword && ( <p className="text-red-500 text-xs mt-1"> {errors.confirmPassword.message}  </p>  )}
                </div>

                {/* ROW 4 */}

                <div>
                    <label className={labelClass}> OEM </label>
                     <MultiSelect options={OEMOptions}
                    value={selectedOEM}
                    // onChange={branchChange}
                     onChange={setSelectedOEM}
                    placeholder="Select OEM Names"  
                    id={"OEMNames"}
                    setValue={setValue}
                />{errors?.OEMNames && ( <p className="text-red-400 text-xs mt-1"> {errors.OEMNames.message} </p>  )}              
                </div>

                <div>
                    <label className={labelClass}>Customer Name(Optional)</label>
                     <MultiSelect options={CustNameOptions}
                    value={selectedCustName}
                    // onChange={branchChange}
                     onChange={setSelectedCustName}
                    placeholder="Select Customer Names"
                    id={"CustNames"}
                    setValue={setValue}
                /> {errors?.CustNames && ( <p className="text-red-400 text-xs mt-1"> {errors.CustNames.message} </p>  )}
                </div>

                <div>
                    <label className={labelClass}>Branch Name(Optional) </label>
                    <MultiSelect options={branchOptions}
                value={selectedBranch}
                onChange={setSelectedBranch}
                placeholder="Select Branch Names"
                id={"branchNames"}
                setValue={setValue}
              //  error={errors?.branchNames}
              />  {errors?.branchNames && ( <p className="text-red-400 text-xs mt-1"> {errors.branchNames.message} </p>  )}
                </div>
            </div>

            <div className="flex justify-end mt-8 gap-2">
                <button className={btnClass}>Submit</button>
                 <button type="button" className={resetClass} onClick={handleReset}> Reset </button>
            </div>
        </div>
        </form >
 
  );
};

export default AddUser;
