import React, { useState, useEffect } from 'react'
import { useForm } from "react-hook-form";
import { Plus, List, Play, Pencil, Trash2, MailPlus, CalendarClock } from "lucide-react";
import MailConfig from "./MailConfig";
import PeriodicReport from "./PeriodicReport";



const ScheduleReports = () => {
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
    { label: "Mail config", icon: <MailPlus size={16} /> },
    { label: "Periodic Report", icon: <CalendarClock size={16} /> }
    // { label: "Multiple Run Command", icon: <Play size={16} /> },
  ];

  const handleReset = () => { reset();  };

    const renderContent = () => {
        switch (activeTab) {
            case 0:
                return <MailConfig />;
            case 1:
                return <PeriodicReport />;
           
            default:
                return null;
        }
    };
     

  return (
    <div className="min-h-screen  text-white p-2">
      {/* 🔷 Tabs */}
      <div className=" bg-[#0B1220] rounded-xl p-2 border border-white/10">
        <div className="flex gap-2 mb-4">
          {tabs.map((tab, index) => (
            <button key={index} onClick={() => setActiveTab(index)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all duration-300 
                              ${activeTab === index ? "bg-blue-500/20 text-blue-400 border border-blue-500/40 "
                  : "text-gray-400 hover:text-blue-400 hover:bg-[#1E293B] "}`} >
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

export default ScheduleReports