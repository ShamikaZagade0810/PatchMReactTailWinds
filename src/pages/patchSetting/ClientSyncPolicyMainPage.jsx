import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import { Plus, List, Play, Pencil, Trash2, CalendarClock } from "lucide-react";

import ViewSyncPolicy from "./ViewSyncPolicy";
import ClientWiseSyncPolicy from "./ClientWiseSyncPolicy";
import ViewClientWiseSyncPolicy from "./ViewClientWiseSyncPolicy";

const ClientSyncPolicyMainPage = () => {

     const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setValue,
        reset
    } = useForm();
    const [activeTab, setActiveTab] = useState(0);

    const tabs = [
        { label: "View Synchronization Policy", icon: <List size={16} /> },
        { label: "Client Wise Synchronization Policy", icon: <Plus size={16} /> },
        { label: "View Client Wise Synchronization Policy", icon: <List size={16} /> },
      
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 0:
                return <ViewSyncPolicy />;
            case 1:
                return <ClientWiseSyncPolicy />;
            case 2:
                return <ViewClientWiseSyncPolicy />;             
            default:
                return null;
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

export default ClientSyncPolicyMainPage
