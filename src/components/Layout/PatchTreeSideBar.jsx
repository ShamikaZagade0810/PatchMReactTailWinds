// components/Layout/Sidebar.jsx
import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    LayoutDashboard,
    ListTree,
    Share2,
    FolderGit2,
    Server,
    Package,
    Shield,
    Users,
    FileText,
    Activity,
    PlayCircle,
    Settings,
    ChevronLeft,
    ChevronRight,
    Database,
    GitBranch,
    CheckCircle,
    AlertTriangle,
    AppWindowMac,
    AppWindow,
    ClipboardMinus,
    SquareTerminal,
    Search,
    ChevronDown,
     ArrowLeft
} from "lucide-react";
import { AccordionItem } from "../../components/UI/AccordionItem";
import logo from "../../assets/planet-gurard.png";
import { useAuth } from "../../context/AuthContext";

const sidebarData = [
    // {
    //   name: "Dashboards",
    //   icon: LayoutDashboard,
    //   roles: ["admin"],
    //   path: "/dashboard2",
    //   children: [
    //     {
    //       name: "Project Reports",
    //       path: "/dashboard2/mainDashboard",
    //       icon: AppWindowMac,
    //       roles: ["admin"],
    //     },
    //     {
    //       name: "Incidence Dashboard",
    //       path: "/dashboard2/incidence",
    //       icon: AppWindowMac,
    //       roles: ["admin"],
    //     },
    //     {
    //       name: "Patch Dashboard",
    //       path: "/dashboard2/patch",
    //       icon: AppWindowMac,
    //       roles: ["admin"],
    //     },

    //   ],
    // },

    {
        name: "Dashboards",
        icon: LayoutDashboard,
        roles: ["admin"],
        path: "/dashboard",
        children: [
            {
                name: "Status",
                path: "/dashboard/mainDashboard",

                icon: AppWindowMac,
                roles: ["admin"],
            },
            {
                name: "Patch Tree",
                path: "/dashboard/status",
                icon: AppWindowMac,
                roles: ["admin"],
            },
            {
                name: "Third Party",
                path: "/dashboard/status",
                icon: AppWindowMac,
                roles: ["admin"],
            },


        ],
    },

    {
        name: "Content Distribution",
        icon: Share2,
        roles: ["admin"],
        path: "content",
        children: [

            {
                name: "Send Multiple Patches",
                path: "/content/send-multiple",
                icon: AppWindowMac,
                roles: ["admin"],
            },

        ],
    },

    {
        name: "Patch Setting",
        icon: LayoutDashboard,
        roles: ["admin"],
        path: "setting",

        children: [
            // {
            //   name: "Approve Or Decline",
            //   path: "/setting/approve-decline",
            //   icon: AppWindowMac,
            //   roles: ["admin"],
            // },
            {
                name: "Automatic Approvals",
                path: "/setting/auto-approval",
                icon: AppWindowMac,
                roles: ["admin"],
            },
            {
                name: "View Approval Rule",
                path: "/setting/view-rule",
                icon: AppWindowMac,
                roles: ["admin"],
            },
            {
                name: "Product And Classifications",
                path: "/setting/product-class",
                icon: AppWindowMac,
                roles: ["admin"],
            },
            {
                name: "Update Sync Schedule",
                path: "/setting/sync-schedule",
                icon: AppWindowMac,
                roles: ["admin"],
            },
            {
                name: "View Sync Policy",
                path: "/setting/sync-policy",
                icon: AppWindowMac,
                roles: ["admin"],
            },
            {
                name: "Client Wise Sync Policy",
                path: "/setting/client-policy",
                icon: AppWindowMac,
                roles: ["admin"],
            },
            {
                name: "View Client Wise Sync Policy",
                path: "/setting/view-client-policy",
                icon: AppWindowMac,
                roles: ["admin"],
            },

        ],
    },

    {
        name: "Master",
        icon: LayoutDashboard,
        roles: ["admin"],
        path: "master",

        children: [
            {
                name: "Application User Details",
                path: "/master/UserDetails",
                icon: AppWindowMac,
                roles: ["admin"],
            },
            // {
            //   name: "Create Application User",
            //   path: "/master/Createuser",
            //   icon: AppWindowMac,
            //   roles: ["admin"],
            // },
            {
                name: "	View Devices",
                path: "/master/view-devices",
                icon: AppWindowMac,
                roles: ["admin"],
            },
            {
                name: "Customer Master",
                path: "/master/CustomerDetails",
                icon: AppWindowMac,
                roles: ["admin"],
            },
            {
                name: "Branch Master",
                path: "/master/Branch",
                icon: AppWindowMac,
                roles: ["admin"],
            },
            {
                name: "Group Master",
                path: "/master/Group",
                icon: AppWindowMac,
                roles: ["admin"],
            },
            {
                name: "Server Master",
                path: "/master/Server",
                icon: AppWindowMac,
                roles: ["admin"],
            },
            {
                name: "OEM Master",
                path: "/master/OEM",
                icon: AppWindowMac,
                roles: ["admin"],
            },
            {
                name: "Set Server Policy",
                path: "/master/setPolicy",
                icon: AppWindowMac,
                roles: ["admin"],
            },
            {
                name: "Schedule Mail Reports",
                path: "/master/MailReports",
                icon: AppWindowMac,
                roles: ["admin"],
            },
            // {
            //   name: "Periodic Report",
            //   path: "/master/periodic-report",
            //   icon: AppWindowMac,
            //   roles: ["admin"],
            // },

        ],
    },
    // {
    //   name: "Run CMD Execution",
    //   icon: LayoutDashboard,
    //   roles: ["admin"],
    //   path: "cmd",

    //   children: [
    //     {
    //       name: "Add Activity Command",
    //       path: "/cmd/add",
    //       icon: AppWindowMac,
    //       roles: ["admin"],
    //     },
    //     {
    //       name: "View Activity Command",
    //       path: "/cmd/view",
    //       icon: AppWindowMac,
    //       roles: ["admin"],
    //     },
    //     {
    //       name: "Multiple Run Command",
    //       path: "/cmd/multi-run",
    //       icon: AppWindowMac,
    //       roles: ["admin"],
    //     },
    //   ],
    // },

    {
        name: "Rum Command",
        path: "/runcmd",
        icon: SquareTerminal,
        roles: ["admin"],
    },

    {
        name: "Reports",
        path: "/reports",
        icon: ClipboardMinus,
        roles: ["admin"],
    },


];

export const PatchTreeSideBar = ({
    isOpen,
    toggleSidebar,
    activeItem,
    onItemClick,
    onAccordionClick,
    isItemExpanded,
}) => {
    const [openAccordion, setOpenAccordion] = useState(null);
    const [expandServer, setExpandServer] = useState(true);
    const [expandUpdates, setExpandUpdates] = useState(true);
    const navigate = useNavigate();
    const activeItemData = useMemo(() => {
        return sidebarData.find((item) => item?.path === activeItem);
    }, [activeItem]);

    const { user } = useAuth();

    const filteredSidebar = useMemo(() => {
        return sidebarData.filter((item) => item?.roles?.includes(user?.role));
    }, [user?.role]);

    return (
        <aside
            className={` fixed left-0 top-0 h-screen bg-white dark:bg-gray-900 
        border-r border-gray-200 dark:border-gray-800
        transition-all duration-300 ease-in-out z-40
        ${isOpen ? "w-70" : "w-20"}
        flex flex-col shadow-lg
      `}
        >
            <div className="px-4 py-4 border-b border-[#132238]">
                <div className="flex items-center justify-between">
                    {/* Logo Section */}
                    <div className="flex items-center gap-3 overflow-hidden ">
                        <div className="min-w-[42px] min-h-[42px] rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
                            <Shield className="w-5 h-5 text-cyan-400" />
                        </div>

                        {isOpen && (
                            <div>
                                <h2 className="text-white text-sm font-semibold tracking-wide"> ScanPlus </h2>

                                <p className="text-[10px] uppercase tracking-[2px] text-slate-400"> Patch Management </p>
                            </div>
                        )}
                    </div>

                    {/* Toggle */}
                    <button
                        onClick={toggleSidebar}
                        aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
                        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors shrink-0">
                        {isOpen ? (
                            <ChevronLeft className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                        ) : (
                            <ChevronRight className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                        )}
                    </button>
                </div>
            </div>
            {isOpen && (
                <div className="px-3 py-3 border-b border-[#132238]">
                    <div className="relative">
                        <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />

                        <input type="text" placeholder="Search nodes..." className=" w-full bg-[#0d1b2d] border border-[#1d314d] 
                        rounded-lg pl-10 pr-3 py-2 text-sm text-white placeholder:text-slate-500 outline-none focus:border-cyan-500 " />
                    </div>
                </div>
            )}



            <div className="flex-1 overflow-y-auto px-2 py-3 hide-scrollbar">
                {isOpen && (
                    <p className="text-[10px] text-slate-500 px-3 mb-3 tracking-[2px] uppercase"> System Tree </p>
                )}

                {/* Server */}
                <div className="space-y-2">
                    <button onClick={() => setExpandServer(!expandServer)}
                        className=" w-full flex items-center justify-between px-3 py-2 rounded-lg bg-[#0c2137] hover:bg-[#102946] transition-all " >
                        <div className="flex items-center gap-2 overflow-hidden">
                            {expandServer ? (<ChevronDown className="w-4 h-4 text-slate-400" />)
                                : (<ChevronRight className="w-4 h-4 text-slate-400" />)}

                            <Server className="w-4 h-4 text-cyan-400" />
                            {isOpen && (<span className="text-sm text-white truncate"> Upstream — WIN-14TISP122I </span>)}
                        </div>
                    </button>

                    {/* Child Menu */}
                    {expandServer && (
                        <div className="ml-4 border-l border-[#1d314d] pl-3 space-y-1">
                            {/* Updates */}
                            <button
                                onClick={() => setExpandUpdates(!expandUpdates)}
                                className=" w-full flex items-center justify-between px-2 py-2 rounded-md hover:bg-[#0e1f33] transition-all" >
                                <div className="flex items-center gap-2">
                                    {expandUpdates ? (
                                        <ChevronDown className="w-4 h-4 text-slate-400" />
                                    ) : (
                                        <ChevronRight className="w-4 h-4 text-slate-400" />
                                    )}

                                    <Database className="w-4 h-4 text-slate-300" />

                                    {isOpen && (
                                        <span className="text-sm text-slate-300 cursor-pointer hover:text-white"
                                            onClick={() => navigate("/patchTree/updates")} > Updates
                                        </span>
                                    )}
                                </div>
                            </button>

                            {/* Update Child */}
                            {expandUpdates && (
                                <div className="ml-5 space-y-1">
                                    {/* All Updates */}
                                    <button
                                        className=" w-full flex items-center justify-between px-2 py-2 rounded-md hover:bg-[#0e1f33] transition-all ">
                                        <div className="flex items-center gap-2">
                                            <FileText className="w-4 h-4 text-slate-300" />

                                            {isOpen && (
                                                <span className="text-sm text-slate-300" onClick={() => navigate("/patchTree/ThirdUpdate")}>
                                                    All Updates
                                                </span>
                                            )}
                                        </div>

                                        {isOpen && (
                                            <span className="text-[10px] bg-slate-700 text-white px-2 py-[2px] rounded-md"> 105k </span>
                                        )}
                                    </button>

                                    {/* Critical Updates */}
                                    <button
                                        className=" w-full flex items-center justify-between px-2 py-2 rounded-md bg-[#111827]  hover:bg-[#172033] transition-all " >
                                        <div className="flex items-center gap-2">
                                            <AlertTriangle className="w-4 h-4 text-red-400" />
                                            {isOpen && (
                                                <span className="text-sm text-red-400" onClick={() => navigate("/patchTree/CriticalUpdate")} > Critical Updates </span>
                                            )}
                                        </div>

                                        {isOpen && (
                                            <span className="text-[10px] bg-red-500/20 border border-red-500/30 text-red-400 px-2 py-[2px] rounded-md"> 11.2k </span>
                                        )}
                                    </button>

                                    {/* Security Updates */}
                                    <button
                                        className="
                      w-full
                      flex
                      items-center
                      justify-between
                      px-2
                      py-2
                      rounded-md
                      hover:bg-[#0e1f33]
                      transition-all
                    "
                                    >
                                        <div className="flex items-center gap-2">
                                            <Shield className="w-4 h-4 text-yellow-300" />

                                            {isOpen && (
                                                <span className="text-sm text-yellow-300">
                                                    Security Updates
                                                </span>
                                            )}
                                        </div>

                                        {isOpen && (
                                            <span className="text-[10px] bg-yellow-500/20 border border-yellow-500/30 text-yellow-300 px-2 py-[2px] rounded-md">
                                                93.9k
                                            </span>
                                        )}
                                    </button>

                                    {/* Approve / Decline */}
                                    <button
                                        className="
                      w-full
                      flex
                      items-left
                      gap-2
                      px-1
                      py-2
                      rounded-md
                      hover:bg-[#0e1f33]
                      transition-all
                    "
                                    >
                                        <CheckCircle className="w-4 h-4 text-slate-300" />

                                        {isOpen && (
                                            <span className="text-sm text-slate-300">
                                                NPCIL — Approve / Decline
                                            </span>
                                        )}
                                    </button>
                                </div>
                            )}

                            {/* Computers */}
                            <button
                                className="
                  w-full
                  flex
                  items-center
                  gap-2
                  px-2
                  py-2
                  rounded-md
                  hover:bg-[#0e1f33]
                  transition-all
                "
                            >
                                <Users className="w-4 h-4 text-slate-300" />

                                {isOpen && (
                                    <span className="text-sm text-slate-300">
                                        Computers (412)
                                    </span>
                                )}
                            </button>

                            {/* Synchronization */}
                            <button
                                className="
                  w-full
                  flex
                  items-center
                  gap-2
                  px-2
                  py-2
                  rounded-md
                  hover:bg-[#0e1f33]
                  transition-all
                "
                            >
                                <Activity className="w-4 h-4 text-slate-300" />

                                {isOpen && (
                                    <span className="text-sm text-slate-300">
                                        Synchronization
                                    </span>
                                )}
                            </button>
                        </div>
                    )}
                </div>
            </div>
             <div className="px-3 py-2  dark:border-gray-800">
    <button
        onClick={() => navigate("/dashboard/mainDashboard")}
        className=" w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg  bg-[#0c2137] hover:bg-[#12304f] 
        text-cyan-400 hover:text-cyan-300 transition-all duration-200 border border-[#1d314d] " >
        <ArrowLeft className="w-4 h-4" />

        {isOpen && (
            <span className="text-sm font-medium"> Back to Dashboard </span>
        )}
    </button>
</div>

            <div className="p-3 border-t border-gray-200 dark:border-gray-800">
                {isOpen ? (
                    <div className="text-lg">
                        <p className="text-sm text-gray-700 dark:text-gray-300 mb-1">
                            {activeItemData?.name || "Dashboard"}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                            {/* <div className="w-2 h-2 rounded-full bg-green-500"></div> */}
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-ping"></div>
                            <div className="w-2 h-2 rounded-full bg-green-500 absolute"></div>
                            <span>Connected</span>
                        </div>
                    </div>

                ) : (
                    <div className="flex justify-center">
                        <div className="w-8 h-8 rounded-full bg-linear-to-br from-cyan-500 to-blue-600"></div>
                    </div>
                )}
            </div>
        </aside>
    );
};
