import React, { useState, useEffect } from 'react'
import { useForm } from "react-hook-form";
import { Plus, List, Play, Pencil, Trash2 } from "lucide-react";

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

     const [activeTab, setActiveTab] = useState(0);
    const tabs = [
        { label: "Set Automatic Approval Rule", icon: <Plus size={16} /> },
        { label: "View Automatic Approval Rules", icon: <List size={16} /> }
        // { label: "Multiple Run Command", icon: <Play size={16} /> },
    ];

  const rulesList = [
    { srNo: 1, ruleName: "TESTRule1", status: "Disable" }, 
    { srNo: 2, ruleName: "test", status: "Enable" }, 
    { srNo: 3, ruleName: "Tedst", status: "" }, 
    { srNo: 4, ruleName: "vvvv", status: "Disable" }, 
    { srNo: 5, ruleName: "newrule", status: "Enable" }
  ];
  
  const handleReset = () => { reset({ customer: "" }); };
   const renderContent = () => {
        if (activeTab === 0) {
            return (
                <>
                <form onSubmit={handleSubmit((data) => handleCustomerSubmit(data))}>
                <div className="bg-[#0B1220] rounded-2xl p-6 border border-white/10 shadow-xl">
                    <h2 className="text-lg font-semibold mb-6">Add Customer</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className={labelClass}> Customer Name</label>
                            <input className={inputClass} placeholder="Enter Customer Name"  {...register("customer",  { required: "Customer Name is required" })} />
                            {errors.customer && <p className="text-red-500 text-xs">{errors.customer.message}</p>}
                        </div>
                    </div>

                    <div className="flex justify-end mt-8 gap-3">
                        <button className={btnClass} >Submit</button>
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
                    <h2 className="text-lg font-semibold mb-4">
                        View Customer Details
                    </h2>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="text-gray-300 border-b border-white/40 bg-[#1E293B]">
                                <tr>
                                    <th className="p-3 text-left">Sr No.</th>
                                    <th className="p-3 text-left">Rule Name</th>
                                    <th className="p-3 text-left">Status</th>
                                    <th className="p-3 text-center">Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {rulesList.map((item, index) => (
                                    <tr
                                        key={index}
                                        className="border-b border-white/10 hover:bg-[#172033] transition"
                                    >
                                        <td className="p-3 ">{item.srNo}</td>
                                        <td className="p-3 ">{item.ruleName}</td>
                                        <td className="p-3 ">{item.status}</td>
                                        <td className="p-3 ">
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
            );
        }
    };


  return (
    <div className="min-h-screen  text-white p-2">

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
