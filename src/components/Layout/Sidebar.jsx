// components/Layout/Sidebar.jsx
import React, { useMemo, useState } from "react";
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
  ClipboardMinus
} from "lucide-react";
import { AccordionItem } from "../../components/UI/AccordionItem";
import logo from "../../assets/planet-gurard.png";
import { useAuth } from "../../context/AuthContext";

const sidebarData = [
  {
    name: "Dashboards",
    icon: LayoutDashboard,
    roles: ["admin"],
    path: "/dashboard2",
    children: [
      {
        name: "Project Reports",
        path: "/dashboard2/mainDashboard",
        icon: AppWindowMac,
        roles: ["admin"],
      },
      {
        name: "Incidence Dashboard",
        path: "/dashboard2/incidence",
        icon: AppWindowMac,
        roles: ["admin"],
      },
      {
        name: "Patch Dashboard",
        path: "/dashboard2/patch",
        icon: AppWindowMac,
        roles: ["admin"],
      },

    ],
  },

  {
    name: "Dashboards1",
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
        name: "Manage Patches",
        path: "/content/manage",
        icon: AppWindowMac,
        roles: ["admin"],
      },
      {
        name: "Send Multiple Patches",
        path: "/content/send-multiple",
        icon: AppWindowMac,
        roles: ["admin"],
      },
      {
        name: "View Sending Patches",
        path: "/content/view-sending",
        icon: AppWindowMac,
        roles: ["admin"],
      },
      {
        name: "View Failed Transfer",
        path: "/content/view failed",
        icon: AppWindowMac,
        roles: ["admin"],
      },
      {
        name: "Patch Report",
        path: "/content/report",
        icon: AppWindowMac,
        roles: ["admin"],
      },
      {
        name: "Patch ID Report",
        path: "/content/id-report",
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
      {
        name: "Approve Or Decline",
        path: "/setting/approve-decline",
        icon: AppWindowMac,
        roles: ["admin"],
      },
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
        name: "Create Application User",
        path: "/master/Createuser",
        icon: AppWindowMac,
        roles: ["admin"],
      },
      {
        name: "	View Application User",
        path: "/master/view-user",
        icon: AppWindowMac,
        roles: ["admin"],
      },
      {
        name: "Customer Master",
        path: "/master/customer",
        icon: AppWindowMac,
        roles: ["admin"],
      },
      {
        name: "Branch Master",
        path: "/master/branch",
        icon: AppWindowMac,
        roles: ["admin"],
      },
      {
        name: "Group Master",
        path: "/master/group",
        icon: AppWindowMac,
        roles: ["admin"],
      },
      {
        name: "Server Master",
        path: "/master/server",
        icon: AppWindowMac,
        roles: ["admin"],
      },
      {
        name: "OEM Master",
        path: "/master/oem",
        icon: AppWindowMac,
        roles: ["admin"],
      },
      {
        name: "Mail Configure",
        path: "/master/mail-config",
        icon: AppWindowMac,
        roles: ["admin"],
      },
      {
        name: "Periodic Report",
        path: "/master/periodic-report",
        icon: AppWindowMac,
        roles: ["admin"],
      },

    ],
  },
  {
    name: "Run CMD Execution",
    icon: LayoutDashboard,
    roles: ["admin"],
    path: "cmd",

    children: [
      {
        name: "Add Activity Command",
        path: "/cmd/add",
        icon: AppWindowMac,
        roles: ["admin"],
      },
      {
        name: "View Activity Command",
        path: "/cmd/view",
        icon: AppWindowMac,
        roles: ["admin"],
      },
      {
        name: "Multiple Run Command",
        path: "/cmd/multi-run",
        icon: AppWindowMac,
        roles: ["admin"],
      },
    ],
  },



  {
    name: "Reports",
    path: "/reports",
    icon: ClipboardMinus,
    roles: ["admin"],
  },


];

export const Sidebar = ({
  isOpen,
  toggleSidebar,
  activeItem,
  onItemClick,
  onAccordionClick,
  isItemExpanded,
}) => {
  const [openAccordion, setOpenAccordion] = useState(null);
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
        ${isOpen ? "w-50" : "w-20"}
        flex flex-col shadow-lg
      `}
    >
      <div className="p-3 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between gap-2 ">
        <div className="flex items-center gap-3 shrink-0">
          <img
            src={logo}
            alt="Logo"
            // className="h-8 w-8 shrink-0 rounded-lg transition-all"
              className={`h-8 w-8 rounded-lg transition-all duration-300 
    ${isOpen ? "scale-100" : "scale-110"}
  `}
          />
          {/* {isOpen && (
            <span className="font-bold text-gray-800 dark:text-white text-md truncate">
              PM
            </span>
          )} */}
          <span className={`font-bold transition-all duration-300 
  ${isOpen ? "opacity-100 ml-0" : "opacity-0 -ml-2"}
`}>
  PM
</span>
        </div>

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

      <div className="flex-1 overflow-y-auto py-3 px-2">


        <nav className="space-y-1">
          {filteredSidebar.map((item, id) => (
            <AccordionItem
              key={id}
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
