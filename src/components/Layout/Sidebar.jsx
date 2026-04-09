// components/Layout/Sidebar.jsx
import React, { useMemo } from "react";
import {
  LayoutDashboard,
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
} from "lucide-react";
import { AccordionItem } from "../../components/UI/AccordionItem";
import logo from "../../assets/planet-gurard.png";
import { useAuth } from "../../context/AuthContext";

const sidebarData = [
  {
    name: "Dashboards",
    icon: LayoutDashboard,
    roles: ["admin"],

    children: [
      {
        name: "Project Reports",
        path: "/dashboard/mainDashboard",
        icon: AppWindowMac,
        roles: ["admin"],
      },
      {
        name: "Incidence Dashboard",
        path: "/dashboard/incidence",
        icon: AppWindowMac,
        roles: ["admin"],
      },

    ],
  },

  {
    name: "gitlab",
    path: "/gitlabUi",
    icon: FolderGit2,
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
  const activeItemData = useMemo(() => {
    return sidebarData.find((item) => item?.path === activeItem);
  }, [activeItem]);

  const { user } = useAuth();

  const filteredSidebar = useMemo(() => {
    return sidebarData.filter((item) => item?.roles?.includes(user?.role));
  }, [user?.role]);

  return (
    <aside
      className={`
        fixed left-0 top-0 h-screen bg-white dark:bg-gray-900 
        border-r border-gray-200 dark:border-gray-800
        transition-all duration-300 ease-in-out z-40
        ${isOpen ? "w-64" : "w-20"}
        flex flex-col shadow-lg
      `}
    >
      <div className="p-3 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between gap-2">
        <div className="flex items-center gap-3 shrink-0">
          <img
            src={logo}
            alt="Logo"
            className="h-8 w-8 shrink-0 rounded-lg transition-all"
          />
          {isOpen && (
            <span className="font-bold text-gray-800 dark:text-white text-lg truncate">
              DMS
            </span>
          )}
        </div>

        <button
          onClick={toggleSidebar}
          aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors shrink-0"
        >
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
            />
          ))}
        </nav>
      </div>

      <div className="p-3 border-t border-gray-200 dark:border-gray-800">
        {isOpen ? (
          <div className="text-sm">
            <p className="font-medium text-gray-700 dark:text-gray-300 mb-1">
              {activeItemData?.name || "Dashboard"}
            </p>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
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
