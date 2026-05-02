import React, { useState } from "react";
import { useForm } from "react-hook-form";


import MultipleRunForm from "./MultipleRunForm";

import { Plus, List, Play,  Pencil, Trash2 } from "lucide-react";
import AddUser from "./AddUser";
import UserList from "./UserList";

const ApplicationUser = () => {
      const {
            register,
            handleSubmit,
            formState: { errors },
            watch,
            setValue
        } = useForm();
    const [activeTab, setActiveTab] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editData, setEditData] = useState(null);

    const tabs = [
        { label: "Add User", icon: <Plus size={16} /> },
        { label: "View User List", icon: <List size={16} /> },
        // { label: "Multiple Run Command", icon: <Play size={16} /> },
    ];

    const rumtable = [
        { "ActivityName": "Restart Service", "Command": "net stop / start", "SubCommand": "Spooler" },
        { "ActivityName": "Check Disk", "Command": "chkdsk", "SubCommand": "/f" },
        { "ActivityName": "Ping Cmd", "Command": "ping 192.168.0.15", "SubCommand": "ping 192.168.0.15" }
    ]

 
    const labelClass = "text-[15px] text-[#d1d5db] mb-1 block";
    const inputClass = "w-full h-[34px] px-2 text-[12px] bg-[#1E293B] text-white rounded-md border border-[#2A3A55] focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500";
    const btnClass =
        "px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.03] active:scale-[0.97] focus:outline-none focus:ring-2 focus:ring-blue-400/60";



 
    // 🔹 Render based on tab
    const renderContent = () => {
        switch (activeTab) {
            case 0:
                return <AddUser />;
            case 1:
                return <UserList />;
            // case 2:
            //     return <MultipleRunForm />;
            default:
                return null;
        }
    };

    const handleEdit = (item, index) => {
        console.log("Edit clicked:", item);

        setEditData(item);     // store selected row
        setIsModalOpen(true);  // open modal

        // Example: populate form (you can extend this)
        // setActiveTab(0);
        // setFormData(item);
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

export default ApplicationUser