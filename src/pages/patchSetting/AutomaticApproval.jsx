import React, { useState, useEffect } from 'react'
import { useForm } from "react-hook-form";
import { Plus, List, Play, Pencil, Trash2, ClipboardList, SquareCheckBig, Ban } from "lucide-react";


import MultiSelect from '../../layouts/MultiSelect.jsx';
import { ToastContainer, toast } from 'react-toastify';
import { AddAutoApprovalRule, getAutoApprovalRule, enableViewApprovalRule, disableViewApprovalRule, getAutoApprovalRuleById, UpdateAutoApprovalRule, deleteAutoApprovalRule,
    getClassifficationdropdown, getproductdropdown, getGrouplistdropdown
} from "../../api/projectApi";

const AutomaticApproval = () => {
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

    useEffect(() => {
        register("classification", { validate: (value) => value?.length > 0 || "At least 1 Classification must be selected" });
        register("product", { validate: (value) => value?.length > 0 || "At least 1 Product must be selected" });
        register("groups", { validate: (value) => value?.length > 0 || "At least 1 Group must be selected" });
        initialApiReq();
    }, [register]);    

   const initialApiReq = async () => {
    try {
        const [classificationRes, productRes, groupRes] = await Promise.all([ getClassifficationdropdown(), getproductdropdown(), getGrouplistdropdown()  ]);

        setClassificationOptions( classificationRes?.data?.data || [] );
        setProductOptions( productRes?.data?.data || [] );
        setGroupOptions( groupRes?.data?.data || [] );

    } catch (error) {
        console.error("API Error:", error);
        setClassificationOptions([]);
        setProductOptions([]);
    }
};

    const [activeTab, setActiveTab] = useState(0);
    const [listOfApproveRule, setListOfApproveRule] = useState([]);
    const tabs = [
        { label: "Set Automatic Approval Rule", icon: <Plus size={16} /> },
        { label: "View Approval Rule", icon: <List size={16} /> }
    ];
    useEffect(() => {
        console.log("ActiveTab ", activeTab);
        if (activeTab === 1) {
            getData();
        }
    }, [activeTab]);

    const getData = async () => {
        console.log("Hello World");
        try {
            const resData = await getAutoApprovalRule();
            console.log("resData ", resData.data.data);
            setListOfApproveRule(resData.data.data);
        } catch (ex) {
            console.warn(ex);
        }
    }

    const rulesList = [
        { srNo: 1, ruleName: "TESTRule1", status: "Disable" },
        { srNo: 2, ruleName: "test", status: "Enable" },
        { srNo: 3, ruleName: "Tedst", status: "" },
        { srNo: 4, ruleName: "vvvv", status: "Disable" },
        { srNo: 5, ruleName: "newrule", status: "Enable" }
    ];

    // const ClassificationOptions = [
    //     { value: "Applications", label: "Applications" },
    //     { value: "Critical Updates", label: "Critical Updates" },
    //     { value: "Definition Updates", label: "Definition Updates" },
    // ];

    // const ProductOptions = [
    //     { value: ".Net.1.0.1", label: ".Net.1.0.1" },
    //     { value: ".Net Core 2.1", label: ".Net Core 2.1" },
    //     { value: "Active Directory", label: "Active Directory" },
    // ];
    const [ClassificationOptions, setClassificationOptions] = useState([]);
const [ProductOptions, setProductOptions] = useState([]);
const [GroupOptions, setGroupOptions] = useState([]);

    // const GroupOptions = [
    //     { value: "UnKnown", label: "UnKnown" },
    //     { value: "Windows 10", label: "Windows 10" },
    //     { value: "Windows 8", label: "Windows 8" },
    // ];
    const [selectedClassification, setSelectedClassification] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState([]);
    const [isEditMode, setIsEditMode] = useState(false);
    const [editDataId, setEditDataId] = useState(-1);
    console.log("isEditMode", isEditMode)
    console.log("selectedClassification ", selectedClassification);

    const handleReset = () => {
        reset({ ruleName: "", classification: [], product: [], group: [], });
        setSelectedClassification([]); setSelectedProduct([]); setSelectedGroup([]);
    };

    const onSubmit = async () => {
        try {
            const inputData = {
                "ruleName": watch('ruleName'),
                "classification": watch('classification'),
                "product": watch('product'),
                "groups": watch('groups')
            };
            if (!isEditMode) {
                const res = await AddAutoApprovalRule(inputData);
                console.log("Res Data--->  ", res);
                if (res.data.status == 200) {
                    toast.success(res.data.message);
                }else if (res.data.status == 409) {
                    toast.warning(res.data.message);
                }
                 else {
                    toast.error(res.data.message);
                }
            } else {
                const res = await UpdateAutoApprovalRule(inputData, editDataId);
                console.log("Res Data--->  ", res);
                if (res.data.status == 200) {
                    toast.success(res.data.message);
                } else if (res.data.status == 409) {
                    toast.warning(res.data.message);
                }
                else {
                    toast.error(res.data.message);
                }
            }
            handleReset();
        } catch (ex) {
            console.warn("Exception ", ex);
        }

    };

    const handleEnable = async (item, index) => {
        const inputData = item.srNo;

        const res = await enableViewApprovalRule(inputData);
        console.log("Res Data--->  ", res);
        if (res.data.status == 200) {
            toast.success(res.data.message);
        }else if (res.data.status == 409) {
            toast.warning(res.data.message);
        } else {
            toast.error(res.data.message);
        }
        // refresh table
        await getData();
    }

    const handleDisable = async (item, index) => {
        const inputData = item.srNo;
        const res = await disableViewApprovalRule(inputData);
        console.log("Res Data--->  ", res);
        if (res.data.status == 200) {
            toast.success(res.data.message);            
        } else if (res.data.status == 409) {
            toast.warning(res.data.message);
        } else {
            toast.error(res.data.message);
        }
        // refresh table
        await getData();
    }

    const handleEdit = async (item, index) => {
        console.log("item--> ", item);
        const inputData = item.srNo;
        const res = await getAutoApprovalRuleById(inputData);
        const data = res.data.data;
        console.log("Res Data--->  ", data);
        setValue('ruleName', data.ruleName);
        setValue("classification", data.classification.map(obj => obj.label));
        setValue("product", data.product.map(obj => obj.label));
        setValue("groups", data.groups.map(obj => obj.label));
        setSelectedClassification(data.classification || []);
        setSelectedProduct(data.product || []);
        setSelectedGroup(data.groups || []);
        setIsEditMode(true);
        setEditDataId(inputData);
        setActiveTab(0);
    }

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
                const inputData  = {
                    id: deleteId
                };
                // await getdeleteActivityCmd(payload); // your API
                 console.log("Delete Payload:");
                const response =  await deleteAutoApprovalRule(inputData , deleteId);;
                // toast.success("Deleted successfully");
                 if(response.data.status === 200){
                             toast.success(response.data.message);
                            setIsDeleteOpen(false);
                             setDeleteId(null);
                               // refresh table
                            await getData();
                }
                else if (response.data.status === 409) { toast.warning(response.data.message || "Something went Wrong"); }
                else { toast.error(response.data.message || "Error"); }
        
                setIsDeleteOpen(false);
                setDeleteId(null);        
                // refresh table
                initialApiReq();
        
            } catch (error) {
                console.error(error);
                toast.error("Delete failed");
            }
        };

        

    // MAIN CONTENT
    const renderContent = () => {
        if (activeTab === 0) {
            return (
                <>
                    {/* <form onSubmit={handleSubmit((data) => handleCustomerSubmit(data))}> */}
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="bg-[#0B1220] rounded-2xl p-6 border border-white/10 shadow-xl">
                            <h2 className="text-lg font-semibold mb-6">Set Automatic Approval Rule</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className={labelClass}> Rule Name</label>
                                    <input className={inputClass} placeholder="Enter Rule Name"  {...register("ruleName", { required: "Rule Name is required" })} />
                                    {errors.ruleName && <p className="text-red-500 text-xs">{errors.ruleName.message}</p>}
                                </div>
                                <div>
                                    <label className={labelClass}> Classification </label>
                                    <MultiSelect options={ClassificationOptions} value={selectedClassification}
                                        onChange={setSelectedClassification} placeholder="Select Classification"
                                        id={"classification"} setValue={setValue} />
                                    {errors?.classification && (<p className="text-red-400 text-xs mt-1"> {errors.classification.message} </p>)}
                                </div>

                                <div>
                                    <label className={labelClass}> Product </label>
                                    <MultiSelect options={ProductOptions}
                                        value={selectedProduct}
                                        onChange={setSelectedProduct}
                                        placeholder="Select Product"
                                        id={"product"}
                                        setValue={setValue} />
                                    {errors?.product && (<p className="text-red-400 text-xs mt-1"> {errors.product.message} </p>)}
                                </div>

                                <div>
                                    <label className={labelClass}> Group </label>
                                    <MultiSelect options={GroupOptions}
                                        value={selectedGroup}
                                        onChange={setSelectedGroup}
                                        placeholder="Select Group"
                                        id={"groups"}
                                        setValue={setValue} />
                                    {errors?.groups && (<p className="text-red-400 text-xs mt-1"> {errors.groups.message} </p>)}
                                </div>
                            </div>
                            <div className="flex justify-end mt-8 gap-3">
                                <button type="submit" className={btnClass}> Submit  </button>
                                <button type="button" className={resetClass} onClick={handleReset}>Reset</button>
                            </div>
                        </div>
                    </form>
                </>
            );
        }

        else if (activeTab === 1) {
            return (
                <div className="bg-[#0B1220] rounded-2xl p-6 border border-white/10 shadow-xl">
                    <h2 className="text-lg font-semibold mb-4"> View Approval Rule Details </h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="text-gray-300 border-b border-white/40 bg-[#1E293B]">
                                <tr>
                                    {/* <th className="p-3 text-left">Sr No.</th> */}
                                    <th className="p-3 text-left">Delete Rule</th>
                                    <th className="p-3 text-left">Rule Name</th>
                                    <th className="p-3 text-left">Status</th>
                                    <th className="p-3 text-center">View Rule</th>
                                    <th className="p-3 text-center">Enable Rule</th>
                                    <th className="p-3 text-center">Disable Rule</th>
                                </tr>
                            </thead>

                            <tbody>
                                {listOfApproveRule.map((item, index) => (
                                    <tr key={index} className="border-b border-white/10 hover:bg-[#172033] transition" >
                                        {/* <td className="p-3">{item.srNo}</td> */}  {/* Sr No */}
                                        <td className="p-3">
                                            {/* Delete Button */}
                                            <button className="px-2 py-1 text-xs  text-red-400 hover:text-red-500 rounded-md hover:bg-red-500/30 transition"
                                                onClick={() => handleDelete(item)}><Trash2 size={20} /> </button>
                                        </td>
                                        <td className="p-3">{item.ruleName}</td> {/* Rule Name */}
                                        {/* Status */}
                                        <td className="p-3">
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium  ${item.status === "Enable"
                                                ? "bg-green-500/20 text-green-400"
                                                : "bg-red-500/20 text-red-400"
                                                }`} > {item.status}  </span>
                                        </td>

                                        {/* View Rule */}
                                        <td className="p-3">
                                            <div className="flex justify-center">
                                                <button className="px-2 py-1 text-blue-400 hover:text-blue-500 rounded-md hover:bg-blue-500/20 transition "
                                                    onClick={() => handleEdit(item, index)} > <ClipboardList size={20} />
                                                </button>
                                            </div>
                                        </td>

                                        {/* Enable Rule */}
                                        <td className="p-3">
                                            <div className="flex justify-center">
                                                <button 
                                                className=" px-3 py-1 text-green-400 hover:text-green-500 rounded-md hover:bg-green-500/30 transition "
                                                    onClick={() => handleEnable(item, index)} ><SquareCheckBig size={20} />
                                                </button>
                                            </div>
                                        </td>

                                        {/* Disable Rule */}
                                        <td className="p-3">
                                            <div className="flex justify-center">
                                                <button className=" px-3 py-1 text-red-400 hover:text-red-500 rounded-md hover:bg-red-500/30 transition "
                                                    onClick={() => handleDisable(item, index)} >
                                                    <Ban size={20} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
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
            );
        }
    };


    return (
        <div className="min-h-screen  text-white p-2">
            <ToastContainer />
            {/* 🔷 Tabs */}
            <div className=" bg-[#0B1220] rounded-xl p-2 border border-white/10">
                <div className="flex gap-2 mb-4">
                    {tabs.map((tab, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveTab(index)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all duration-300 
                             ${activeTab === index
                                    ? "bg-blue-500/20 text-blue-400 border border-blue-500/40 "
                                    : "text-gray-400 hover:text-blue-400 hover:bg-[#1E293B] "
                                }`}
                        >
                            {tab.icon}
                            {tab.label}
                        </button>
                    ))}
                </div>


                {/* 🔷 Content */}
                <div className="transition-all duration-300">
                    {renderContent()}
                </div>
            </div>
        </div>
    )
}

export default AutomaticApproval
