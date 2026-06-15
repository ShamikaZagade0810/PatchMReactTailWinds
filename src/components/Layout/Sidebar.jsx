// components/Layout/Sidebar.jsx
import React, { useMemo, useState } from "react";
import {
  Settings, ChevronLeft, ChevronRight,  X, TableOfContents, LogOut
} from "lucide-react";

import {
  PackageCheck,
  BadgeInfo,
  Monitor,
  List,
  FolderOpen,
  FileBarChart,
} from "lucide-react";
import { AccordionItem } from "../../components/UI/AccordionItem";
import logo from "../../assets/planet-gurard.png";
import { useAuth } from "../../context/AuthContext";

// const sidebarData = [
//   // {
//   //   name: "Dashboards",
//   //   icon: LayoutDashboard,
//   //   roles: ["admin"],
//   //   path: "/dashboard2",
//   //   children: [
//   //     {
//   //       name: "Project Reports",
//   //       path: "/dashboard2/mainDashboard",
//   //       icon: AppWindowMac,
//   //       roles: ["admin"],
//   //     },
//   //     {
//   //       name: "Incidence Dashboard",
//   //       path: "/dashboard2/incidence",
//   //       icon: AppWindowMac,
//   //       roles: ["admin"],
//   //     },
//   //     {
//   //       name: "Patch Dashboard",
//   //       path: "/dashboard2/patch",
//   //       icon: AppWindowMac,
//   //       roles: ["admin"],
//   //     },

//   //   ],
//   // },

//   {
//     name: "Dashboards",
//     icon: LayoutDashboard,
//     roles: ["admin"],
//     path: "/dashboard",
//     children: [
//       {
//         name: "Status",
//         path: "/dashboard/mainDashboard",

//         icon: AppWindowMac,
//         roles: ["admin"],
//       },
//       {
//         name: "Patch Tree",
//         path: "/dashboard/patchTree",
//         icon: AppWindowMac,
//         roles: ["admin"],
//       },
//       {
//         name: "Third Party",
//         path: "/section/Thirdparty",
//         icon: AppWindowMac,
//         roles: ["admin"],
//       },


//     ],
//   },

//   {
//     name: "Content Distribution",
//     icon: Share2,
//     roles: ["admin"],
//     path: "content",
//     children: [

//       {
//         name: "Send Multiple Patches",
//         path: "/content/send-multiple",
//         icon: AppWindowMac,
//         roles: ["admin"],
//       },

//     ],
//   },

//   {
//     name: "Patch Setting",
//     icon: LayoutDashboard,
//     roles: ["admin"],
//     path: "setting",

//     children: [
//       // {
//       //   name: "Approve Or Decline",
//       //   path: "/setting/approve-decline",
//       //   icon: AppWindowMac,
//       //   roles: ["admin"],
//       // },
//       {
//         name: "Automatic Approvals",
//         path: "/setting/auto-approval",
//         icon: AppWindowMac,
//         roles: ["admin"],
//       },
//       {
//         name: "Product And Classifications",
//         path: "/setting/product-class",
//         icon: AppWindowMac,
//         roles: ["admin"],
//       },
//       {
//         name: "Update Sync Schedule",
//         path: "/setting/sync-schedule",
//         icon: AppWindowMac,
//         roles: ["admin"],
//       },
//       {
//         name: "Client Sync Policy",
//         path: "/setting/client-sync-policy",
//         icon: AppWindowMac,
//         roles: ["admin"],
//       },
//       // {
//       //   name: "Client Wise Sync Policy",
//       //   path: "/setting/client-policy",
//       //   icon: AppWindowMac,
//       //   roles: ["admin"],
//       // },
//       // {
//       //   name: "View Client Wise Sync Policy",
//       //   path: "/setting/view-client-policy",
//       //   icon: AppWindowMac,
//       //   roles: ["admin"],
//       // },

//     ],
//   },

//   {
//     name: "Master",
//     icon: LayoutDashboard,
//     roles: ["admin"],
//     path: "master",

//     children: [
//       {
//         name: "Application User Details",
//         path: "/master/UserDetails",
//         icon: AppWindowMac,
//         roles: ["admin"],
//       },
//       // {
//       //   name: "Create Application User",
//       //   path: "/master/Createuser",
//       //   icon: AppWindowMac,
//       //   roles: ["admin"],
//       // },
//       {
//         name: "	View Devices",
//         path: "/master/view-devices",
//         icon: AppWindowMac,
//         roles: ["admin"],
//       },
//       {
//         name: "Customer Master",
//         path: "/master/CustomerDetails",
//         icon: AppWindowMac,
//         roles: ["admin"],
//       },
//       {
//         name: "Branch Master",
//         path: "/master/Branch",
//         icon: AppWindowMac,
//         roles: ["admin"],
//       },
//       {
//         name: "Group Master",
//         path: "/master/Group",
//         icon: AppWindowMac,
//         roles: ["admin"],
//       },
//       {
//         name: "Server Master",
//         path: "/master/Server",
//         icon: AppWindowMac,
//         roles: ["admin"],
//       },
//       {
//         name: "OEM Master",
//         path: "/master/OEM",
//         icon: AppWindowMac,
//         roles: ["admin"],
//       },
//       {
//         name: "Set Server Policy",
//         path: "/master/setPolicy",
//         icon: AppWindowMac,
//         roles: ["admin"],
//       },
//       {
//         name: "Schedule Mail Reports",
//         path: "/master/MailReports",
//         icon: AppWindowMac,
//         roles: ["admin"],
//       },
//       // {
//       //   name: "Periodic Report",
//       //   path: "/master/periodic-report",
//       //   icon: AppWindowMac,
//       //   roles: ["admin"],
//       // },

//     ],
//   },
//   // {
//   //   name: "Run CMD Execution",
//   //   icon: LayoutDashboard,
//   //   roles: ["admin"],
//   //   path: "cmd",

//   //   children: [
//   //     {
//   //       name: "Add Activity Command",
//   //       path: "/cmd/add",
//   //       icon: AppWindowMac,
//   //       roles: ["admin"],
//   //     },
//   //     {
//   //       name: "View Activity Command",
//   //       path: "/cmd/view",
//   //       icon: AppWindowMac,
//   //       roles: ["admin"],
//   //     },
//   //     {
//   //       name: "Multiple Run Command",
//   //       path: "/cmd/multi-run",
//   //       icon: AppWindowMac,
//   //       roles: ["admin"],
//   //     },
//   //   ],
//   // },

//   {
//     name: "Rum Command",
//     path: "/runcmd",
//     icon: SquareTerminal,
//     roles: ["admin"],
//   },

//   {
//     name: "Reports",
//     path: "/reports",
//     icon: ClipboardMinus,
//     roles: ["admin"],
//   },


// ];


// const ThirdPartySidebarData = [
//   {
//     name: "Dashboard",
//     path: "/dashboard",
//     icon: LayoutDashboard,
//     roles: ["admin"],
//   },
//   {
//     name: "Missing Apps",
//     path: "/missing-apps",
//     icon: AlertTriangle,
//     roles: ["admin"],
//   },
//   {
//     name: "Installed Apps",
//     path: "/installed-apps",
//     icon: PackageCheck,
//     roles: ["admin"],
//   },
//   {
//     name: "Patch Status",
//     path: "/patch-status",
//     icon: BadgeInfo,
//     roles: ["admin"],
//   },
//   {
//     name: "Latest Software",
//     path: "/latest-software",
//     icon: Database,
//     roles: ["admin"],
//   },
//   {
//     name: "Host View",
//     path: "/host-view",
//     icon: Monitor,
//     roles: ["admin"],
//   },
//   {
//     name: "Patch Progress",
//     path: "/patch-progress",
//     icon: List,
//     roles: ["admin"],
//   },
//   {
//     name: "Patch Repository",
//     path: "/patch-repository",
//     icon: FolderOpen,
//     roles: ["admin"],
//   },
//   {
//     name: "Reports",
//     path: "/reports",
//     icon: FileText,
//     roles: ["admin"],
//     children: [
//       {
//         name: "Patch Reports",
//         path: "/reports/patch",
//         icon: FileBarChart,
//         roles: ["admin"],
//       },
//     ],
//   },
// ];

export const Sidebar = ({
  isOpen,
  toggleSidebar,
  activeItem,
  onItemClick,
  onAccordionClick,
  isItemExpanded,
  sidebarData
}) => {
  console.log("sidebar --->", sidebarData);

  const [openAccordion, setOpenAccordion] = useState(null);
  const activeItemData = useMemo(() => {
    return sidebarData.find((item) => item?.path === activeItem);
  }, [activeItem]);

  const { user } = useAuth();
  console.log("isOpen -->",isOpen);
   console.log("toggleSidebar -->",toggleSidebar);
  const filteredSidebar = useMemo(() => {
    return sidebarData.filter((item) => item?.roles?.includes(user?.role));
  }, [user?.role, sidebarData]);

  return (
    <aside
      className={` fixed left-0 top-0 h-screen bg-white dark:bg-gray-900 
        border-r border-gray-200 dark:border-gray-800
        transition-all duration-300 ease-in-out z-50 mt-15 pb-13
        ${isOpen ? "w-50" : "w-20"}
        flex flex-col shadow-lg
      `}
    >
       <div className="p-3 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
      
      {isOpen ? (
        <>
          <div className="flex flex-col leading-tight">
            <span className="font-bold text-sm">Patch Management</span>
            <span className="text-xs text-gray-500">Admin Console</span>
          </div>

          <button onClick={toggleSidebar} aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"} > <X className="w-5 h-5" /> </button>
        </>
      ) : (
        <button onClick={toggleSidebar} className="mx-auto"> <TableOfContents className="w-5 h-5" /> </button>
      )}
    </div>

       <div className="flex-1 overflow-y-auto py-3 px-2 hide-scrollbar">
      <nav className="space-y-1">
        {filteredSidebar.map((item) => (
          <AccordionItem
            key={item.path}
            item={item}
            level={0}
            isSidebarOpen={isOpen}
            isExpanded={isItemExpanded(item.path)}
            isActive={activeItem}
            onAccordionClick={onAccordionClick}
            onItemClick={onItemClick}
            isItemExpanded={isItemExpanded}
          />
        ))}
      </nav>
    </div>

     <div className="p-1 border-t border-gray-200 dark:border-gray-800 space-y-1">

      <button className="flex items-center gap-2 w-full hover:bg-gray-100 dark:hover:bg-gray-800 py-1 px-3 rounded">
        <Settings className="w-4 h-4" />
        {isOpen && <span>Settings</span>}
      </button>

      <button className="flex items-center gap-2 w-full hover:bg-gray-100 dark:hover:bg-gray-800 py-1 px-3 rounded text-red-500">
        <LogOut className="w-4 h-4" />
        {isOpen && <span>Sign Out</span>}
      </button>

    </div>

       <div className="p-3 pb-5 border-t border-gray-200 dark:border-gray-800">
      {isOpen ? (
        <div>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-1">
            {activeItemData?.name || "Dashboard"}
          </p>

          <div className="flex items-center gap-2 text-xs text-gray-500">
            <div className="relative w-2 h-2">
              <div className="absolute w-2 h-2 bg-green-500 animate-ping rounded-full" />
              <div className="w-2 h-2 bg-green-500 rounded-full" />
            </div>
            <span>Connected</span>
          </div>
        </div>
      ) : (
        <div className="flex justify-center">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600" />
        </div>
      )}
    </div>
    </aside>
  );
};
