import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import MultiSelect from '../../layouts/MultiSelect.jsx';
import { CheckCircle2, AlertCircle } from "lucide-react";

import {
    getOSTypedropdown, getOSComputerdropdown, getComputerdropdowm, getGrouplistdropdown,
    getDiscoverGroup, getDiscoverComputers, getaddGroup, editGroupDetails, deleteGroupDetails,
    addComputersDetails, getdeleteComputerdetails
} from "../../api/projectApi";

const ModalWrapper = ({ title, children, onClose }) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
        <div className="bg-[#0B1220] w-[480px] rounded-lg border border-white/10 p-4">

            <div className="flex justify-between  ">
                <h2 className="text-white text-lg font-semibold">{title}</h2>
                <button onClick={onClose} className="text-slate-400">✕</button>
            </div>
            <div className="border-b border-white/15 my-3 "></div>

            {children}
        </div>
    </div>
);

const PatchTreeModals = ({ modal, onClose }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setValue,
        reset,
        trigger,
    } = useForm({
        defaultValues: {
            selectedOS: [],
            selectedComputers: [],
        }
    });


    const labelClass = "text-[15px] text-[#d1d5db] mb-1 block";
    const inputClass = "w-full h-[34px] px-2 text-[12px] bg-[#1E293B] text-white rounded-md border border-[#2A3A55] focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500";
    const btnClass = "px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.03] active:scale-[0.97] focus:outline-none focus:ring-2 focus:ring-blue-400/60  flex items-center justify-center gap-2 min-w-[120px]";
    const resetClass = "px-6 py-2 bg-gradient-to-r from-gray-800 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white rounded-lg transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.03] active:scale-[0.97] focus:outline-none focus:ring-2 focus:ring-blue-400/60";

    const { type, data } = modal;

    const serverName = data?.serverName;

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState(null);


    const [osOptions, setOsOptions] = useState([]);
    const [ComputerOptions, setComputerOptions] = useState([]);
    const [OsComputerOptions, setOsComputerOptions] = useState([]);

    // forms
    const [groupName, setGroupName] = useState("");
    const [newGroupName, setNewGroupName] = useState("");
    const [selectedGroup, setSelectedGroup] = useState("");

    const [selectedComputers, setSelectedComputers] = useState("");
    const [editData, setEditData] = useState(null);
    const [selectedOS, setSelectedOS] = useState("");
    const [groupOptions, setGroupOptions] = useState([]);

    // ---------------- DROPDOWN API ----------------
    useEffect(() => {
        const loadOSDropdown = async () => {
            try {
                const res = await getOSTypedropdown();

                const options =
                    res?.data?.data?.map((item) => ({
                        value: item.value,
                        label: item.label,
                    })) || [];

                setOsOptions(options);
            } catch (error) {
                console.error("Error loading OS Types", error);
            }
        };

        loadOSDropdown();
    }, []);

    const selectedOSValues = watch("selectedOS") || [];
    const selectedComputersValues = watch("selectedComputers") || [];

    useEffect(() => {
        const loadOSComputers = async () => {
            try {
                if (!selectedOSValues?.length) {
                    setOsComputerOptions([]);
                    return;
                }

                //   const payload = {
                //     osNames: selectedOSValues.map((item) => item.value),
                //   };
                const payload = selectedOSValues.map((item) => item.value);
                console.log("Os computer payload", payload)

                const res = await getOSComputerdropdown(payload);
                console.log("Os computer Reponse:  ", res)

                const options = res?.data?.data?.map((item) => ({
                    value: item.value,
                    label: item.label,
                })) || [];

                setOsComputerOptions(options);
            } catch (error) {
                console.error("Error loading OS Computers", error);
            }
        };

        loadOSComputers();
    }, [selectedOSValues]);

    useEffect(() => {
        const loadComputers = async () => {
            try {
                if (type !== "deleteComputers" || !serverName) return;

                console.log("Server Name:", serverName);

                const res = await getComputerdropdowm(serverName);

                const options =
                    res?.data?.data?.map((item) => ({
                        value: item.value ?? item,
                        label: item.label ?? item,
                    })) || [];

                setComputerOptions(options);
            } catch (error) {
                console.error("Error loading computers", error);
            }
        };

        loadComputers();
    }, [type, serverName]);

    useEffect(() => {
        const loadGroups = async () => {
            try {
                if (type !== "addComputers" && type !== "deleteGroup") return;

                const res = await getGrouplistdropdown();

                // const options = res?.data?.data?.map((item) => ({
                //         value: item.value,
                //         label: item.label,
                //     })) || [];
                const options = res?.data?.data?.filter((item) =>
                            item.label !== "All Computers" &&
                            item.label !== "Unassigned Computers"
                    )?.map((item) => ({
                        value: item.value,
                        label: item.label,
                    })) || [];

                setGroupOptions(options);
            } catch (error) {
                console.error("Error loading group list", error);
            }
        };

        loadGroups();
    }, [type]);

    useEffect(() => {
        register("selectedOS", { required: "At least 1 OS Type is required", validate: (value) => value?.length > 0 || "At least 1 OS Type is required", });
        register("selectedComputers", { required: "At least 1 Computer is required", validate: (value) => value?.length > 0 || "At least 1 Computer is required", });
    }, [register]);

    const resetFormState = () => {
        // React Hook Form fields    
        reset({ groupName: "", newGroupName: "", selectedOS: [], selectedComputers: [] });

        // Messages
        setMessage("");
        setStatus(null);
        setLoading(false);

        // Local states
        setEditData(null);
        setGroupName("");
        setNewGroupName("");
        setSelectedGroup("");
        setSelectedComputers("");
        setSelectedOS("");

        // Dropdown data
        setOsComputerOptions([]);
    };


    const handleClose = () => {
        resetFormState();
        onClose();
    };
    const handleReset = () => {
        resetFormState();
    };

    // reset when modal opens
    useEffect(() => {
        resetFormState();
    }, [type]);


    useEffect(() => {
        if (type === "discoverGroup" && data.serverName) {
            const loadDiscoverGroup = async () => {
                try {
                    console.log("discover data.serverName", data.serverName)
                    setLoading(true);
                    setMessage("");
                    setStatus("");

                    const res = await getDiscoverGroup(data.serverName);
                    console.log("discovr group res", res.data.data);
                    console.log("discovr group status", res.data.status);
                    // setStatus(res?.data?.data);
                    const value = res.data.data;
                    const status = value === "true"; // convert string -> boolean
                    setStatus(status);
                    if (res.data.data === "true") {
                        setMessage(res?.data?.message || "Group discovery completed successfully");
                        window.location.reload(); // Refresh 
                    }
                    else {
                        setMessage("Error while Group discovery ");
                    }

                } catch (err) {
                    console.error(err);
                    setMessage("Error discovering group");
                } finally {
                    setLoading(false);
                }
            };

            loadDiscoverGroup();
        }
    }, [type, serverName]);

    // ---------------- DISCOVER COMPUTERS ----------------
    useEffect(() => {
        if (type === "discoverComputers") {
            const loadDiscoverComputers = async () => {
                try {
                    console.log("discover data.serverName", data.serverName)
                    setLoading(true);
                    setMessage("");
                    setStatus("");

                    const res = await getDiscoverComputers(data.serverName);
                    console.log("discovr Computers res", res.data.data);
                    console.log("discovr Computers status", res.data.status);
                    // setStatus(res?.data?.status);
                    const value = res.data.data;
                    const status = value === "true"; // convert string -> boolean
                    setStatus(status);

                    if (res.data.data === "true") {
                        setMessage(res?.data?.message || "Discovery Computers completed successfully");
                        window.location.reload(); // Refresh 

                    }
                    else {
                        setMessage("Error while discovering computers ");
                    }

                } catch (err) {
                    console.error(err);
                    setMessage("Error discovering Compuetrs");
                } finally {
                    setLoading(false);
                }
            };

            loadDiscoverComputers();
        }
    }, [type, data]);

    // ---------------- ADD GROUP ----------------
    const handleAddGroup = async (formData) => {
        try {
            setLoading(true);
            setMessage("");
            setStatus(null);

            const groupName = formData.groupName?.trim();
            if (!groupName) { return; }

            const res = await getaddGroup(groupName);
            console.log("Add Group Response:", res);
            // setStatus(res?.data?.status);
            const value = res.data.data;
                    const status = value === "true"; // convert string -> boolean
                    setStatus(status);

            if (res?.data?.data === "true") {
                setMessage(res?.data?.message || "Group added successfully");
                reset();
                window.location.reload(); // Refresh 
            } else {
                setMessage("Failed to add group");
            }
        } catch (error) {
            console.error("Add Group Error:", error);
            setStatus(false);
            setMessage("Error while adding group");
        } finally {
            setLoading(false);
        }
    };

    // ---------------- EDIT GROUP ----------------
    const handleEditGroup = async (formData) => {
        try {
            setLoading(true);
            setMessage("");
            setStatus(null);

            const payload = {
                oldGroupName: formData.groupName?.trim(),
                newGroupName: formData.newGroupName?.trim(),
            };

            const res = await editGroupDetails(payload);

            console.log("Edit Group Response:", res);

            // setStatus(res?.data?.status);
            const value = res.data.data;
                    const status = value === "true"; // convert string -> boolean
                    setStatus(status);

            if (res?.data?.data === "true") {
                setMessage(res?.data?.message || "Group updated successfully");
                resetFormState();
                window.location.reload(); // Refresh 
            } else {
                setMessage("Failed to update group");
            }
        } catch (error) {
            console.error("Edit Group Error:", error);
            setStatus(false);
            setMessage("Error while updating group");
        } finally {
            setLoading(false);
        }
    };

    // ---------------- DELETE GROUP ----------------
    const handleDeleteGroup = async () => {
        const groupName = watch("groupName");

        if (!groupName) {
            // setError("groupName", { type: "manual", message: "Group Name is required", });
            return;
        }

        try {
            setLoading(true);
            setMessage("");
            setStatus(null);

            const res = await deleteGroupDetails(groupName);
            console.log("Delete Group Response:", res);
            // setStatus(res?.data?.status);

            const result = res?.data?.data; // "success" or "fail"            
            const status = result === "success"; // convert to boolean
            setStatus(status);            

            if (res?.data?.data === "success") {
                setMessage( res?.data?.message || "Group deleted successfully" );               
            window.location.reload();   // ✅ refresh page after success
            } else {
                setMessage("Failed to delete group");
            }
        } catch (error) {
            console.error(error);
            setStatus(false);
            setMessage("Error while deleting group");
        } finally {
            setLoading(false);
        }
    };


    // ---------------- ADD COMPUTERS ----------------
    const handleAddComputers = async (formData) => {
        try {
            setLoading(true);
            setMessage("");
            setStatus(null);

            const payload = {
                groupName: formData.groupName,
                computerNames: formData.selectedComputers.map((item) => item.value),
            };

            const res = await addComputersDetails(payload);
            // setStatus(res?.data?.status);

            const result = res?.data?.data; // "success" or "fail"            
            const status = result === "success"; // convert to boolean
            setStatus(status);                      

            if (res?.data?.data === "success") {
                setMessage(res?.data?.message || "Computers added successfully");
                resetFormState();
                window.location.reload(); // Refresh 
            }
            else if (res?.data?.data === "empty") {
                setMessage(res?.data?.message || "Field is empty");
            }
            else {
                setMessage("Failed to add computers");
            }
        } catch (error) {
            setStatus(false);
            setMessage("Error while adding computers");
        } finally {
            setLoading(false);
        }
    };

    // ---------------- DELETE GROUP ----------------
    const handleDeleteComputers = async (formData) => {
        try {
            setLoading(true);
            setMessage("");
            setStatus(null);

            const payload = {
                computerNames: formData.selectedComputers?.map((item) => item.value) || [],
            };

            const res = await getdeleteComputerdetails(payload);
            // setStatus(res?.data?.status);

            const result = res?.data?.data; // "success" or "fail"            
            const status = result === "success"; // convert to boolean
            setStatus(status);            


            if (res?.data?.data === "success") {
                setMessage(res?.data?.message || "Computers deleted successfully" );
                resetFormState();
                window.location.reload(); // Refresh 
            } else if (res?.data?.data === "empty") {
                setMessage(res?.data?.message || "Field is empty");
            } else {
                setMessage("Failed to delete computers");
            }
        } catch (error) {
            console.error(error);
            setStatus(false);
            setMessage("Error while deleting computers");
        } finally {
            setLoading(false);
        }
    };
    // ---------------- LOAD GROUPS FOR DROPDOWNS ----------------
    // useEffect(() => {
    //     if (
    //         type === "addComputers" || type === "deleteComputers"
    //     ) {
    //         (async () => {
    //             const res = await getSidebarGroupsData();
    //             setGroupList(res?.data?.data || []);
    //         })();
    //     }
    // }, [type]);

    // =========================================================
    // MODAL ROUTER
    // =========================================================

    if (!type) return null;

    // ---------------- DISCOVER GROUP ----------------
    if (type === "discoverGroup") {
        return (
            <ModalWrapper title="Discover Group" onClose={onClose}>
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-8">
                        {/* Spinner */}
                        <div className="relative">
                            <div className="w-12 h-12 rounded-full border-4 border-slate-700"></div>
                            <div className="absolute inset-0 w-12 h-12 rounded-full border-4 border-transparent border-t-blue-500 animate-spin"></div>
                        </div>

                        {/* Message */}
                        <p className="mt-4 text-slate-300 text-sm font-medium">  Discovering groups... </p>

                        <p className="mt-1 text-slate-500 text-xs"> Please wait while we fetch the latest group details. </p>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-6">
                        {status === true ? (
                            <CheckCircle2 size={48} className="text-green-600 mb-3" strokeWidth={2.5} />
                        ) : (
                            <AlertCircle size={48} className="text-red-600 mb-3" strokeWidth={2.5}  />
                        )}
                        <p className={`text-center text-sm font-medium ${status === true ? "text-green-500" : "text-red-500" }`}
                        >
                            {message}
                        </p>
                    </div>
                )}
            </ModalWrapper>
        );
    }

    // ---------------- DISCOVER COMPUTERS ----------------
    if (type === "discoverComputers") {
        return (
            <ModalWrapper title="Discover Computers" onClose={onClose}>
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-8">
                        {/* Spinner */}
                        <div className="relative">
                            <div className="w-15 h-15 rounded-full border-4 border-slate-700"></div>
                            <div className="absolute inset-0 w-15 h-15 rounded-full border-4 border-transparent border-t-blue-500 animate-spin"></div>
                        </div>

                        {/* Message */}
                        <p className="mt-4 text-slate-300 text-sm font-medium"> Discovering conmputers... </p>

                        <p className="mt-1 text-slate-500 text-xs">  Please wait while we fetch the latest computer details.  </p>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-6">
                        {status === true ? (
                            <CheckCircle2 size={55} className="text-green-600 mb-3"/>
                        ) : (
                            <AlertCircle size={55} className="text-red-600 mb-3"  />
                        )}

                        <p
                            className={`text-center text-sm font-medium ${status === true ? "text-green-500" : "text-red-500"
                                }`}
                        >
                            {message}
                        </p>
                    </div>
                )}
            </ModalWrapper>
        );
    }

    // ---------------- ADD GROUP ----------------
    if (type === "addGroup") {
        return (
            <ModalWrapper title="Add Group" onClose={handleClose}>
                {/* <input className="w-full p-2 bg-[#0e1a2b] text-white rounded-md"
                    placeholder="Group Name"
                    value={form.groupName}
                    onChange={(e) =>
                        setForm({ ...form, groupName: e.target.value })
                    }
                    /> */}
                <div className=" my-4 mx-2">
                    <label className={labelClass}> Group Name </label>
                    <input className={inputClass} placeholder="Enter Group Name" {...register("groupName", { required: "Group name required" })} />
                    {errors.groupName && (<p className="text-red-600 text-xs mt-1">{errors.groupName.message} </p>)}
                </div>

                {/* <button className="mt-3 px-3 py-1 bg-cyan-600 text-white rounded-md w-full"
                    onClick={async () => {  await addGroupAPI({ groupName });
                        onClose(); }} >
                        Submit
                    </button>*/}
                <div className="flex justify-end mt-8 gap-2">
                    <button className={btnClass} onClick={handleSubmit(handleAddGroup)}>
                        {loading && (<div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />)}
                        {loading ? "Submitting..." : "Submit"}
                    </button>
                    <button type="button" className={resetClass} onClick={handleReset}  > Reset </button>
                </div>

                {message && (
                    <div
                        className={`mt-4 flex items-center justify-center gap-2 text-sm ${status === true ? "text-green-500" : "text-red-500"
                            }`}
                    >
                        {status === true ? (
                            <CheckCircle2 size={18} className="text-green-500 flex-shrink-0" />
                        ) : (
                            <AlertCircle size={18} className="text-red-600 flex-shrink-0" />
                        )}

                        <span>{message}</span>
                    </div>
                )}
            </ModalWrapper>
        );
    }

    // ---------------- EDIT GROUP ----------------
    if (type === "editGroup") {
        return (
            <ModalWrapper title="Edit Group" onClose={onClose}>
                {/* <input className="w-full p-2 mb-2 bg-[#0e1a2b] text-white rounded-md"
                 value={data?.groupName} disabled /> */}


                {/* <input className="w-full p-2 bg-[#0e1a2b] text-white rounded-md"
                placeholder="New Group Name" value={newGroupName}  onChange={(e) => setNewGroupName(e.target.value)}
                /> */}
                <div className=" my-4 mx-2">
                    <label className={labelClass}>Current Group Name</label>
                    {/* <input className={inputClass} placeholder="Type" /> */}
                    <select className="filter-input focus:outline-none focus:ring-2 focus:ring-blue-500" {...register("groupName", { required: "Group Name is required" })} defaultValue="">
                        <option value="" disabled> -- Please select value -- </option>
                         {groupOptions.map((group) => (
                            <option key={group.value} value={group.value}> {group.label} </option>
                        ))}
                    </select>
                    {errors.groupName && (<p className="text-red-600 text-xs mt-1"> {errors.groupName.message} </p>)}
                </div>
                <div className=" my-4 mx-2">
                    <label className={labelClass}> New Group Name </label>
                    <input className={inputClass} placeholder="Enter New Group Name" {...register("newGroupName", { required: "New Group Name required" })} />
                    {errors.newGroupName && (<p className="text-red-600 text-xs mt-1">{errors.newGroupName.message} </p>)}
                </div>


                {/* <button className="mt-3 px-3 py-1 bg-cyan-600 text-white rounded-md w-full"
                    onClick={async () => { await editGroupAPI({ groupId: data.groupId, newGroupName, });
                        onClose(); }} > Update
                    </button> */}
                <div className="flex justify-end mt-8 gap-2">
                    <button className={btnClass} onClick={handleSubmit(handleEditGroup)}>
                        {loading && (<div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />)}
                        {loading ? "Submitting..." : "Submit"}
                    </button>
                    <button type="button" className={resetClass} onClick={handleReset}  > Reset </button>
                </div>
                {message && (
                    <div className={`mt-4 flex items-center justify-center gap-2 text-sm ${status === true ? "text-green-500" : "text-red-500"}`} >
                        {status === true ? ( <CheckCircle2 size={55} className="text-green-500 mb-3" /> ) : (<AlertCircle size={18} className="text-red-600" />)}

                        <span>{message}</span>
                    </div>
                )}
            </ModalWrapper>
        );
    }

    // ---------------- DELETE GROUP ----------------
    if (type === "deleteGroup") {
        return (
            <ModalWrapper title="Delete Group" onClose={onClose}>
                {/* <p className="text-slate-300 mb-3"> Are you sure you want to delete this group? </p>
                <button className="px-3 py-1 bg-red-600 text-white rounded-md w-full" 
                onClick={async () => { await deleteGroupAPI(data.groupId); onClose();  }}    >
                Delete
                </button> */}
                {/* <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2>
                    <p className="text-gray-300 mb-6">Are you sure you want to delete this User?</p>
                    <div className="flex justify-end gap-3">
                        <button className="px-4 py-2 text-gray-400"   > Cancel </button>
                        <button className="px-4 py-2 bg-red-600 text-white rounded" > Yes, Delete </button>
                    </div> */}

                <div className=" my-4 mx-2">
                    <label className={labelClass}>Group Name</label>
                    {/* <input className={inputClass} placeholder="Type" /> */}
                    <select className="filter-input focus:outline-none focus:ring-2 focus:ring-blue-500" {...register("groupName", { required: "Group Name is required" })} defaultValue="">
                        <option value="" disabled> -- Please select value -- </option>

                        {groupOptions.map((group) => (
                            <option key={group.value} value={group.value}> {group.label} </option>
                        ))}
                    </select>
                    {errors.groupName && (<p className="text-red-600 text-xs mt-1"> {errors.groupName.message} </p>)}
                </div>
                <div className="flex justify-end gap-3">
                    <button className={resetClass} onClick={handleReset}  > Reset </button>
                    <button className="px-4 py-2 bg-red-600 text-white rounded" onClick={handleSubmit(handleDeleteGroup)} >
                        {loading ? "Deleting..." : "Yes, Delete"}
                    </button>
                </div>
                {message && (
                    <div
                        className={`mt-4 flex items-center justify-center gap-2 text-sm ${status === true ? "text-green-500" : "text-red-500"
                            }`}
                    >
                        {status === true ? (
                             <CheckCircle2 size={55} className="text-green-500 mb-3" /> 
                        ) : (
                            <AlertCircle size={18} className="text-red-600  mb-3" />
                        )}

                        <span>{message}</span>
                    </div>
                )}
            </ModalWrapper>
        );
    }

    // ---------------- ADD COMPUTERS ----------------
    if (type === "addComputers") {
        return (
            <ModalWrapper title="Add Computers" onClose={onClose}>
                {/* Group */}
                {/* <select className="w-full p-2 mb-2 bg-[#0e1a2b] text-white rounded-md"
                    value={selectedGroup} onChange={(e) => setSelectedGroup(e.target.value)} >
                    <option value="">Select Group</option>
                    {groupList.map((g) => (
                        <option key={g.groupId} value={g.groupId}>
                        {g.groupName}
                        </option>
                    ))}
                    </select> */}

                {/* OS Type */}
                {/* <select className="w-full p-2 mb-2 bg-[#0e1a2b] text-white rounded-md"
                    value={selectedOS} onChange={(e) => setSelectedOS(e.target.value)} >
                    <option value="">Select OS Type</option>
                    <option value="windows">Windows</option>
                    <option value="linux">Linux</option>
                    </select> */}

                {/* Computers */}
                {/* <input className="w-full p-2 mb-2 bg-[#0e1a2b] text-white rounded-md"  placeholder="Computer Names (comma separated)"
                    value={selectedComputers} onChange={(e) => setSelectedComputers(e.target.value)} />

                    <button className="px-3 py-1 bg-cyan-600 text-white rounded-md w-full"
                    onClick={async () => {
                        await addComputersAPI({
                        groupId: selectedGroup,
                        osType: selectedOS,
                        computers: selectedComputers.split(","),
                        }); onClose(); }} >
                    Submit
                    </button> */}
                <div className=" my-4 mx-2">
                    <label className={labelClass}>Group Name</label>
                    {/* <input className={inputClass} placeholder="Type" /> */}
                    <select className="filter-input focus:outline-none focus:ring-2 focus:ring-blue-500" {...register("groupName", { required: "Group Name is required" })} defaultValue="">
                        <option value="" disabled> -- Please select value -- </option>
                         {groupOptions.map((group) => (
                            <option key={group.value} value={group.value}> {group.label} </option>
                        ))}
                    </select>
                    {errors.groupName && (<p className="text-red-600 text-xs mt-1"> {errors.groupName.message} </p>)}
                </div>


                <div className=" my-4 mx-2">
                    <label className={labelClass}>OS Type</label>
                    <MultiSelect options={osOptions} value={selectedOSValues}
                        onChange={(val) => {
                            setValue("selectedOS", val,
                                {
                                    shouldValidate: true,
                                    shouldDirty: true,
                                });
                            setValue("selectedComputers", [], { shouldValidate: true });
                            setOsComputerOptions([]);
                        }} placeholder="Select selected OS Type" id={"selectedOS"} setValue={setValue} />
                    {errors.selectedOS && (<p className="text-red-600 text-xs mt-1"> {errors.selectedOS.message} </p>)}
                </div>
                <div className=" my-4 mx-2">
                    <label className={labelClass}>Computers</label>
                    <MultiSelect options={OsComputerOptions} value={selectedComputersValues}
                        onChange={(val) => {
                            // setEditData({ ...editData, selectedComputers: val });
                            setValue("selectedComputers", val, { shouldValidate: true, shouldDirty: true, });
                        }} placeholder="Select selected Computers" id={"selectedComputers"} setValue={setValue} />
                    {errors.selectedComputers && (<p className="text-red-600 text-xs mt-1"> {errors.selectedComputers.message} </p>)}
                </div>

                <div className="flex justify-end mt-8 gap-2">
                    <button className={btnClass} onClick={handleSubmit(handleAddComputers)} >
                        {loading && (<div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />)}
                        {loading ? "Submitting..." : "Submit"}
                    </button>
                    <button type="button" className={resetClass} onClick={handleReset} > Reset </button>
                </div>
                {message && (
                    <div className={`mt-4 flex items-center justify-center gap-2 text-sm ${status === true ? "text-green-500" : "text-red-500"}`} >
                        {status === true ? (
                             <CheckCircle2 size={55} className="text-green-500 mb-3" /> 
                        ) : (
                            <AlertCircle size={18} className="text-red-600" />
                        )}

                        <span>{message}</span>
                    </div>
                )}
            </ModalWrapper>
        );
    }

    // ---------------- DELETE COMPUTERS ----------------
    if (type === "deleteComputers") {
        return (
            <ModalWrapper title="Delete Computers" onClose={onClose}>
                {/* <select className="w-full p-2 mb-3 bg-[#0e1a2b] text-white rounded-md"
                    value={selectedComputer}  onChange={(e) => setSelectedComputer(e.target.value)} >
                    <option value="">Select Computer</option>
                    <option value="pc1">PC-1</option>
                    <option value="pc2">PC-2</option>
                    </select>

                    <button className="px-3 py-1 bg-red-600 text-white rounded-md w-full"
                    onClick={async () => { await deleteComputersAPI({ computerId: selectedComputer, });  onClose(); }} >
                    Delete
                    </button> */}

                <div className=" my-4 mx-2">
                    <label className={labelClass}>Computers</label>
                    <MultiSelect options={ComputerOptions} value={editData?.selectedComputers || []}
                        onChange={(val) => {
                            setEditData({ ...editData, selectedComputers: val });
                            setValue("selectedComputers", val); // sync with react-hook-form if needed
                        }}
                        placeholder="Select selected Computers" id={"selectedComputers"} setValue={setValue}
                    />
                    {errors.selectedComputers && (<p className="text-red-600 text-xs mt-1"> {errors.selectedComputers.message}  </p>)}
                </div>
                <div className="flex justify-end gap-3">
                    <button className={resetClass} onClick={handleReset} > Reset </button>
                    <button className="px-4 py-2 bg-red-600 text-white rounded" onClick={handleSubmit(handleDeleteComputers)} >
                        {loading ? "Deleting..." : "Yes, Delete"}
                    </button>
                </div>

            </ModalWrapper>
        );
    }





    return null;
}

export default PatchTreeModals
