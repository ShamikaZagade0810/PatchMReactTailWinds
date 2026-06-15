// components/Layout/Sidebar.jsx
import React, { useMemo, useState, useEffect ,useRef} from "react";
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

import { getSidebarServerData, getSidebarGroupsData } from "../../api/projectApi";
import PatchTreeModals from "../../pages/PatchTree/PatchTreeModals";



// const systemtreeData = [
//     { srNo: 1, serverName: "WIN-14JT5P1221-UPDATED", ipAddress: "192.168.0.105", branchName: "NPCIL", customer: "NPCIL", groupName: null, serverStatus: "Downstream" },
//     { srNo: 3, serverName: "WIN-14JT5P122111", ipAddress: "192.168.0.4", branchName: "NPCIL", customer: "NPCIL", groupName: null, serverStatus: "Upstream" }
// ];


// const computergrpData = [
//     { groupId: "a0a08746-4dbe-4a37-9adf-9e7652c0b421", groupName: "All Computers" },
//     { groupId: "b73ca6ed-5727-47f3-84de-015e03f6a88a", groupName: "Unassigned Computers" },
//     { groupId: "4937a826-8b85-4615-b7ce-ff47a8cb8f42", groupName: "Unknown" },
//     { groupId: "2b3392d9-a98a-4cf7-b49f-aecfb40298bc", groupName: "Windows 10" },
//     { groupId: "f3650093-92a5-4246-b956-ae44d0e91083", groupName: "Windows 8" },
//     { groupId: "34b9b16b-9d44-463f-84c8-3725f468a5a3", groupName: "Windows Server 2019" }
// ];

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

export const PatchTreeOptions = ({
    isOpen,
    toggleSidebar,
    activeItem,
    onItemClick,
    onAccordionClick,
    isItemExpanded,
}) => {

    const [showDiscoverGroupModal, setShowDiscoverGroupModal] = useState(false);
    const [modal, setModal] = useState({
  type: null,
  data: null,
});

const openModal = (type, data = null) => {
  setModal({ type, data });
};

const closeModal = () => {
  setModal({ type: null, data: null });
};

    const [systemtreeData, setSystemtreeData] = useState([]);

    const [computergrpData, setcomputergrpData] = useState([]);
    // getSidebarGroupsData

    useEffect(() => {
        fetchSidebarServers();
        fetchSidebarGroups();
    }, []);

    const fetchSidebarServers = async () => {
        try {
            const response = await getSidebarServerData();

            if (response?.data?.status === 200) {
                setSystemtreeData(response.data.data || []);
            }
        } catch (error) {
            console.error("Error fetching sidebar servers:", error);
        }
    };

    const fetchSidebarGroups = async () => {
        try {
            const response = await getSidebarGroupsData();

            if (response?.data?.status === 200) {
                setcomputergrpData(response.data.data || []);
            }
        } catch (error) {
            console.error("Error fetching sidebar computer grp:", error);
        }
    };
    const [openAccordion, setOpenAccordion] = useState(null);
    // const [expandServer, setExpandServer] = useState(true);
    // const [expandUpdates, setExpandUpdates] = useState(false);
    // const [expandComputers, setExpandComputers] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
    const [selectedServer, setSelectedServer] = useState(null);
    const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0, });

const handleRightClick = (e, server) => {
  e.preventDefault();

  setSelectedServer(server);

  setContextMenu({
    visible: true,
    x: e.clientX,
    y: e.clientY,
  });
};
    const [expandedNodes, setExpandedNodes] = useState({
        upstream: true,
        downstream: true,
    });
    const toggleNode = (id) => {
        setExpandedNodes((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const upstreamServers = systemtreeData.filter(
        (item) => item.serverStatus === "Upstream"
    );

    const downstreamServers = systemtreeData.filter(
        (item) => item.serverStatus === "Downstream"
    );


    const navigate = useNavigate();
    const activeItemData = useMemo(() => {
        return sidebarData.find((item) => item?.path === activeItem);
    }, [activeItem]);

    const { user } = useAuth();

    const filteredSidebar = useMemo(() => {
        return sidebarData.filter((item) => item?.roles?.includes(user?.role));
    }, [user?.role]);



    const cn = (...classes) => classes.filter(Boolean).join(" ");


    const renderServer = (server) => {
        const serverKey = server.serverName;
        const updatesKey = `${serverKey}-updates`;
        const computersKey = `${serverKey}-computers`;
        const menuRef = useRef(null);

        useEffect(() => {
            const handleClickOutside = (event) => {
                if (
                    menuRef.current &&
                    !menuRef.current.contains(event.target)
                ) {
                    setShowMenu(false);
                }
            };

            document.addEventListener("mousedown", handleClickOutside);

            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, []);

        const handleRightClick = (e) => {
            console.log("hii hello");
            e.preventDefault(); // Prevent browser menu

            setMenuPosition({
                x: e.pageX,
                y: e.pageY,
            });

            setShowMenu(true);
        };


        return (
            <div key={server.serverName} className="space-y-1">
                {/* Server */}
                <button
                    onClick={() => toggleNode(serverKey)}
                    className={`
    w-full flex items-center px-3 py-2 rounded-lg bg-[#0c2137] hover:bg-[#102946]
    ${!isOpen ? "justify-center " : "justify-between"}
`}
                >
                    <div className="flex items-center gap-2">

                        {/* {expandedNodes[serverKey] ? (
                            <ChevronDown className="w-4 h-4 text-slate-400" />
                        ) : (
                            <ChevronRight className="w-4 h-4 text-slate-400" />
                        )} */}
                        {isOpen &&
                            (expandedNodes[serverKey] ? (
                                <ChevronDown className="w-4 h-4 text-slate-400" />
                            ) : (
                                <ChevronRight className="w-4 h-4 text-slate-400" />
                            ))}

                        <Server className="w-4 h-4 text-cyan-400" />

                        {/* <span className="text-sm text-white">
                            {server.serverName}
                        </span>

                        <span className="text-xs text-slate-500">
                            ({server.ipAddress})
                        </span> */}

                        {isOpen && (
                            <div className="relative group">
                                <span className="text-sm text-slate-200">
                                    {server.ipAddress}
                                </span>

                                {/* Tooltip */}
                                <div className="absolute left-0-top-8 hidden group-hover:block bg-black text-white text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap">
                                    {server.serverName}
                                </div>
                            </div>
                        )}
                    </div>
                </button>

                {/* Server Children */}
                {expandedNodes[serverKey] && (
                    <div className="ml-4 border-l border-[#1d314d] pl-3 space-y-1">

                        {/* Updates */}
                        <button
                            onClick={() => toggleNode(updatesKey)}
                            // className="w-full flex items-center gap-2 px-2 py-2 rounded-md hover:bg-[#0e1f33]"
                            className={`
    w-full flex items-center gap-2 px-2 py-2 rounded-md hover:bg-[#0e1f33]
    ${!isOpen ? "justify-center" : ""}
`}
                        >
                            {/* {expandedNodes[updatesKey] ? (
                                <ChevronDown className="w-4 h-4 text-slate-400" />
                            ) : (
                                <ChevronRight className="w-4 h-4 text-slate-400" />
                            )} */}
                            {isOpen &&
                                (expandedNodes[updatesKey] ? (
                                    <ChevronDown className="w-4 h-4 text-slate-400" />
                                ) : (
                                    <ChevronRight className="w-4 h-4 text-slate-400" />
                                ))}

                            <Database className="w-4 h-4 text-slate-300" />

                            {/* <span className="text-sm text-slate-300">  Updates </span> */}
                            {isOpen && (
                                <span className="text-sm text-slate-300 " onClick={() => navigate("/patchTree/ThirdUpdate")}>
                                    Updates
                                </span>
                            )}
                        </button>

                        {expandedNodes[updatesKey] && (
                            <div className="ml-5 mt-1 space-y-1 border-l border-[#1d314d] pl-3">

                                {/* All Updates */}
                                <button
                                    onClick={() => navigate("/patchTree/AllUpdates")}
                                    className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm text-slate-300
            hover:bg-[#0e1f33] hover:text-cyan-200 transition-all duration-200 group"
                                >
                                    <FileText className="w-4 h-4 text-slate-400 group-hover:text-cyan-400" />
                                    <span>All Updates</span>
                                </button>

                                {/* Critical */}
                                <button
                                    onClick={() => navigate("/patchTree/CriticalUpdate")}
                                    className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm text-slate-300
            hover:bg-red-500/10 hover:text-red-300 transition-all duration-200 group"
                                >
                                    <AlertTriangle className="w-4 h-4 text-red-400 group-hover:text-red-300" />
                                    <span>Critical Updates</span>
                                </button>

                                {/* Security */}
                                <button
                                    onClick={() => navigate("/patchTree/SecurityUpdates")}
                                    className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm text-slate-300
            hover:bg-yellow-500/10 hover:text-yellow-200 transition-all duration-200 group"
                                >
                                    <Shield className="w-4 h-4 text-yellow-400 group-hover:text-yellow-300" />
                                    <span>Security Updates</span>
                                </button>

                                {/* Approve / Decline */}
                                <button
                                    onClick={() => navigate("/patchTree/Apprv_Declined")}

                                    className="w-full flex items-center justify-between px-3 py-2 rounded-md text-sm
            text-slate-300 hover:bg-[#0e1f33] hover:text-green-200 transition-all duration-200 group" >
                                    <div className="flex items-center gap-2">
                                        <CheckCircle className="w-4 h-4 text-green-400 group-hover:text-green-400" />
                                        <span>{server.branchName} Approve / Decline</span>
                                    </div>

                                    {/* <span className="text-[10px] px-2 py-[2px] rounded-md bg-slate-700 text-slate-300 group-hover:bg-green-500/20 group-hover:text-green-300">
                                        Action
                                    </span> */}
                                </button>

                            </div>
                        )}

                        {/* Computers */}
                        <button onClick={() => toggleNode(computersKey)}
                        //  onContextMenu={handleRightClick}
                        onContextMenu={(e) => handleRightClick(e, server)}
                            // className="w-full flex items-center gap-2 px-2 py-2 rounded-md hover:bg-[#0e1f33]" 
                            onContextMenu={handleRightClick}
                            className={`
                                    w-full flex items-center gap-2 px-2 py-2 rounded-md hover:bg-[#0e1f33]
                                    ${!isOpen ? "justify-center" : ""}
                                `} >
                            {/* {expandedNodes[computersKey] ? (
                                <ChevronDown className="w-4 h-4 text-slate-400" />
                            ) : (
                                <ChevronRight className="w-4 h-4 text-slate-400" />
                            )} */}

                            {isOpen &&
                                (expandedNodes[computersKey] ? (
                                    <ChevronDown className="w-4 h-4 text-slate-400" />
                                ) : (
                                    <ChevronRight className="w-4 h-4 text-slate-400" />
                                ))}

                            <Users className="w-4 h-4 text-slate-300" />
                            {/* <span className="text-sm text-slate-300"> Computers </span> */}
                            {isOpen && (
                                <span className="text-sm text-slate-300">
                                    Computers
                                </span>
                            )}
                        </button>

                        {expandedNodes[computersKey] && (
                            <div className="ml-5 mt-1 space-y-1 border-l border-[#1d314d] pl-3">

                                {computergrpData.map((group) => (
                                    <button
                                        key={group.groupId}
                                        //                                        onClick={() =>
                                        //     navigate(
                                        //         `/patchTree/computers/${group.groupId}?name=${encodeURIComponent(group.groupName)}`
                                        //     )
                                        // }
                                        onClick={() =>
                                            navigate(
                                                `/patchTree/computers/${encodeURIComponent(group.groupName)}`,
                                                {
                                                    state: {
                                                        serverName: server.serverName,
                                                        groupId: group.groupId,
                                                    },
                                                }
                                            )
                                        }
                                        className="  w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm
                    text-slate-300 hover:bg-[#0e1f33] hover:text-white
                    transition-all duration-200 group "
                                    >
                                        {/* Icon */}
                                        <Users className="w-4 h-4 text-slate-400 group-hover:text-cyan-400" />

                                        {/* Label */}
                                        <span className="truncate"> {group.groupName} </span>

                                        {/* Optional badge style (future-ready) */}
                                        <span className="ml-auto text-[10px] px-2 py-[2px] rounded-md bg-slate-700 text-slate-300 group-hover:bg-cyan-500/20 group-hover:text-cyan-300"> grp   </span>
                                    </button>
                                ))}

                            </div>
                        )}

                        {showMenu && (
                            <div
                            ref={menuRef}
                                className="fixed z-50 w-56 bg-white border border-gray-400 shadow-lg text-black"
                                style={{
                                    left: menuPosition.x,
                                    top: menuPosition.y,
                                }}
                            >
                                <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                                    Discover Group
                                </button>

                                <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                                    Discover Group Statistics
                                </button>

                                <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                                    Discover Computers
                                </button>

                                <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                                    Discover Computer Statistics
                                </button>

                                <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                                    Delete Computers
                                </button>

                                <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                                    Add Group
                                </button>
                            </div>
                        )}

                        {/* Synchronization */}
                        <button className={` w-full flex items-center gap-2 px-2 py-2 rounded-md hover:bg-[#0e1f33]  ${!isOpen ? "justify-center" : ""}`}
                            onClick={() => navigate(`/patchTree/Synchronization`)} >
                            <Activity className="w-4 h-4 text-slate-300" />

                            {/* <span className="text-sm text-slate-300"> Synchronization </span> */}
                            {isOpen && (
                                <span className="text-sm text-slate-300">
                                    Synchronization
                                </span>
                            )}
                        </button>

                    </div>
                )}
            </div>
        );
    };
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
                <div
                    // className="flex items-center justify-between"\                
                    className={`flex items-center ${isOpen ? "justify-between" : "justify-center"
                        }`}                >
                    {/* Logo Section */}
                    {/* <div className="flex items-center gap-3 overflow-hidden ">
                        <div className="min-w-[42px] min-h-[42px] rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
                            <Shield className="w-5 h-5 text-cyan-400" />
                        </div>

                        {isOpen && (
                            <div>
                                <h2 className="text-white text-sm font-semibold tracking-wide"> ScanPlus </h2>
                                <p className="text-[10px] uppercase tracking-[2px] text-slate-400"> Patch Management </p>
                            </div>
                        )}
                    </div> */}
                    <div className="flex items-center gap-3 overflow-hidden flex-1">
                        <div className="min-w-[42px] min-h-[42px] rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
                            <Shield className="w-5 h-5 text-cyan-400" />
                        </div>

                        {isOpen && (
                            <div>
                                <h2 className="text-white text-sm font-semibold tracking-wide">
                                    ScanPlus
                                </h2>

                                <p className="text-[10px] uppercase tracking-[2px] text-slate-400">
                                    Patch Management
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Toggle */}
                    <button onClick={toggleSidebar} aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
                        className={` mr-0 px-1 py-4 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors
                             ${isOpen ? "" : "absolute right-2"} `}>
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
                <div className="space-y-2">

                    {/* Upstream */}
                    <button
                        onClick={() => toggleNode("upstream")}
                        className={` w-full flex items-center gap-2 px-3 py-2 rounded-lg bg-[#091626]
                            ${!isOpen ? "justify-center" : ""}
                        `}
                    >
                        {/* {expandedNodes.upstream ? (
                        <ChevronDown className="w-4 h-4 text-slate-400" />
                    ) : (
                        <ChevronRight className="w-4 h-4 text-slate-400" />
                    )} */}
                        {isOpen &&
                            (expandedNodes.upstream ? (
                                <ChevronDown className="w-4 h-4 text-slate-400" />
                            ) : (
                                <ChevronRight className="w-4 h-4 text-slate-400" />
                            ))}

                        <Server className="w-4 h-4 text-green-400" />
                        {/* <span className="text-white">Upstream</span> */}
                        {isOpen && (
                            <span className="text-white">Upstream</span>
                        )}
                    </button>

                    {/* {expandedNodes.upstream &&
                    upstreamServers.map((server) => renderServer(server))} */}

                    {isOpen &&
                        expandedNodes.upstream &&
                        <div className="ml-3 pl-2 border-l border-[#1d314d] space-y-2">
                            {upstreamServers.map((server) => renderServer(server))}
                        </div>
                    }

                    {/* Downstream */}
                    <button
                        onClick={() => toggleNode("downstream")}
                        className={`  w-full flex items-center gap-2 px-3 py-2 rounded-lg bg-[#091626]
                                ${!isOpen ? "justify-center" : ""} `} >
                        {/* {expandedNodes.downstream ? (
                        <ChevronDown className="w-4 h-4 text-slate-400" />
                    ) : (
                        <ChevronRight className="w-4 h-4 text-slate-400" />
                    )} */}
                        {isOpen &&
                            (expandedNodes.downstream ? (
                                <ChevronDown className="w-4 h-4 text-slate-400" />
                            ) : (
                                <ChevronRight className="w-4 h-4 text-slate-400" />
                            ))}

                        <Server className="w-4 h-4 text-orange-400" />
                        {/* <span className="text-white">Downstream</span> */}
                        {isOpen && (
                            <span className="text-white">Downstream</span>
                        )}
                    </button>

                    {/* {expandedNodes.downstream &&
                    downstreamServers.map((server) => renderServer(server))} */}
                    {isOpen &&
                        expandedNodes.downstream &&
                        // downstreamServers.map((server) => renderServer(server))
                        <div className="ml-4 pl-3 border-l border-[#1d314d] space-y-2">
                            {downstreamServers.map((server) => renderServer(server))}
                        </div>
                    }
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

            {contextMenu.visible && (
  <div className="fixed z-50 bg-[#0B1220] border border-white/10 rounded-md shadow-lg py-1 w-48" style={{ top: contextMenu.y, left: contextMenu.x }}
    onMouseLeave={() =>
      setContextMenu({ ...contextMenu, visible: false })
    } >
    <button className="w-full text-left px-3 py-2 text-sm text-slate-200 hover:bg-slate-800/50"
      onClick={() => {
        console.log("Discover Group");
        // setShowDiscoverGroupModal(true);
   openModal("discoverGroup", { serverName: selectedServer.serverName, });
      }} >
      Discover Group
    </button>

    <button className="w-full text-left px-3 py-2 text-sm text-slate-200 hover:bg-slate-800/50"
      onClick={() => {
        console.log("Discover Computers");
      openModal("discoverComputers", { serverName: selectedServer.serverName, });
      }} >
      Discover Computers
    </button>

<div className="border-b border-white/15 my-0 mx-2"></div>

    <button className="w-full text-left px-3 py-2 text-sm text-slate-200 hover:bg-slate-800/50"
      onClick={() => {
        console.log("Add Group");
        // setContextMenu({ ...contextMenu, visible: false });
        openModal("addGroup");
      }} >
      Add Group
    </button>

    <button className="w-full text-left px-3 py-2 text-sm text-slate-200 hover:bg-slate-800/50"
      onClick={() => {
        console.log("Edit Group");
        // setContextMenu({ ...contextMenu, visible: false });
        openModal("editGroup");
      }} >
      Edit Group
    </button>

<button className="w-full text-left px-3 py-2 text-sm text-slate-200 hover:bg-slate-800/50"
      onClick={() => {
        console.log("Delete Group");
        // setContextMenu({ ...contextMenu, visible: false });
        openModal("deleteGroup");
      }} >

      Delete Group
    </button>
    <div className="border-b border-white/15 my-0 mx-2"></div>

       <button className="w-full text-left px-3 py-2 text-sm text-slate-200 hover:bg-slate-800/50"
      onClick={() => {
        console.log("Add Computers");
        // setContextMenu({ ...contextMenu, visible: false });
        openModal("addComputers");
      }} >
      Add Computers
    </button>

    <button className="w-full text-left px-3 py-2 text-sm text-slate-200 hover:bg-slate-800/50"
      onClick={() => {
        console.log("Delete Computers");
        // setContextMenu({ ...contextMenu, visible: false });
        // openModal("deleteComputers");
        openModal("deleteComputers", { serverName: selectedServer.serverName, });
      }} >

      Delete Computers
    </button>

  </div>
)}


<PatchTreeModals modal={modal} onClose={closeModal} />
        </aside>
    );
};
