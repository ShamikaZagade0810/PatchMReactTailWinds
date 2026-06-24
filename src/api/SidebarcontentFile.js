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
  SquareTerminal, Send, Terminal , FileCog ,FileChartColumn,Router, PackageOpen 
} from "lucide-react";

import {
  PackageCheck,
  BadgeInfo,

  Monitor,
  List,
  FolderOpen,

  FileBarChart,
} from "lucide-react";

export const ThirdPartySidebarData = [
  {
    name: "Dashboard",
    path: "/dashboard/thirdpartyApp",
    icon: LayoutDashboard,
    roles: ["admin"],
  },
  {
    name: "Missing Apps",
    path: "/Thirdparty/Missing-Apps",
    icon: AlertTriangle,
    roles: ["admin"],
  },
  {
    name: "Installed Apps",
    path: "/Thirdparty/Installed-Apps",
    icon: PackageCheck,
    roles: ["admin"],
  },
  {
    name: "Patch Status",
    path: "/Thirdparty/Patch_Status",
    icon: BadgeInfo,
    roles: ["admin"],
  },
  {
    name: "Latest Software",
    path: "/Thirdparty/latest-software",
    icon: Database,
    roles: ["admin"],
  },
  {
    name: "Host View",
    path: "/Thirdparty/host-view",
    icon: Monitor,
    roles: ["admin"],
  },
  {
    name: "Patch Progress",
    path: "/Thirdparty/patch-progress",
    icon: List,
    roles: ["admin"],
  },
  // {
  //   name: "Patch Repository",
  //   path: "/Thirdparty/patch-repository",
  //   icon: FolderOpen,
  //   roles: ["admin"],
  // },
  {
    name: "Patch Repository New",
    path: "/Thirdparty/patch-repo",
    icon: FolderOpen,
    roles: ["admin"],
  },
  {
    name: "Reports",
    path: "/Thirdparty/patch-report",
    icon: FileText,
    roles: ["admin"],
    // children: [
    //   {
    //     name: "Patch Reports",
    //     path: "/Thirdparty/patch-report",
    //     icon: FileBarChart,
    //     roles: ["admin"],
    //   },
    // ],
  },
];


export const sidebarData = [
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
        path: "/dashboard/patchTree",
        icon: GitBranch,
        roles: ["admin"],
      },
      {
        name: "Third Party",
        path: "/section/Thirdparty",
        icon: Package,
        roles: ["admin"],
      },
      {
        name: "Linux",
        path: "/section/Linux",
        icon: Terminal,
        roles: ["admin"],
      },
      // {
      //   name: "Network Devices",
      //   path: "/section/NetDevice",
      //   icon: AppWindowMac,
      //   roles: ["admin"],
      // },
      // {
      //   name: "Network Devices New",
      //   path: "/section/NeWNetworkDevice",
      //   name: "PatchDeploymentCenter",
      //   path: "/section/PatchDeploymentCenter",
      //   icon: AppWindowMac,
      //   roles: ["admin"],
      // },
      // {
      //   name: "NetworkMonitoringAlertsDashboard",
      //   path: "/section/NetworkMonitoringAlertsDashboard",
      //   icon: AppWindowMac,
      //   roles: ["admin"],
      // },
      // {
      //   name: "ConfigurationManagerDashboard",
      //   path: "/section/ConfigurationManagerDashboard",
      //   icon: AppWindowMac,
      //   roles: ["admin"],
      // },
      // {
      //   name: "NetworkDeviceConfigurationForm",
      //   path: "/section/NetworkDeviceConfigurationForm",
      //   icon: AppWindowMac,
      //   roles: ["admin"],
      // },
      // {
      //   name: "FirmwareInventoryDashboard",
      //   path: "/section/FirmwareInventoryDashboard",
      //   icon: AppWindowMac,
      //   roles: ["admin"],
      // },
      // {
      //   name: "ConfigurationBackupHistory",
      //   path: "/section/ConfigurationBackupHistory",
      //   icon: AppWindowMac,
      //   roles: ["admin"],
      // },
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
    icon: FileCog,
    roles: ["admin"],
    path: "setting",
    children: [
      {
        name: "Automatic Approvals",
        path: "/setting/auto-approval",
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
        name: "Client Sync Policy",
        path: "/setting/client-sync-policy",
        icon: AppWindowMac,
        roles: ["admin"],
      },
    ],
  },

  {
    name: "Master",
    icon: Database,
    roles: ["admin"],
    path: "master",
    children: [
      {
        name: "Application User Details",
        path: "/master/UserDetails",
        icon: AppWindowMac,
        roles: ["admin"],
      },
      {
        name: "View Devices",
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
    ],
  },

  {
    name: "Rum Command",
    path: "/runcmd",
    icon: SquareTerminal,
    roles: ["admin"],
  },

  {
    name: "Reports",
    path: "/reports",
    icon: FileText,
    roles: ["admin"],
  },
  // {
  //   name: "Network  Devices",
  //   icon: Share2,
  //   roles: ["admin"],
  //   path: "network",
  //   children: [     
  //      {
  //       name: "Network Devices New",
  //       path: "/section/NeWNetworkDevice",
  //       icon: AppWindowMac,
  //       roles: ["admin"],
  //     },
  //          {
  //      name: "Patch Deploymnet Cycle",
  //       path: "/section/deplyment-center",
  //       icon: AppWindowMac,
  //       roles: ["admin"],
  //     },
  //      {
  //       name: "Network Monitoring Alert",
  //       path: "/section/NeWNetworkMonitoringAlert",
  //       icon: AppWindowMac,
  //       roles: ["admin"],
  //     },     
    
  //      {
  //       name: "Configuration Manager",
  //       path: "/section/NewConfigurationManagerDashboard",
  //       icon: AppWindowMac,
  //       roles: ["admin"],
  //     },
  //     {
  //       name: "Network Device Configuration",
  //       path: "/section/NewNetworkDviceConfiguration",
  //       icon: AppWindowMac,
  //       roles: ["admin"],
  //     },
  //      {
  //       name: "Firmware Inventory",
  //       path: "/section/NewFirmwareInventoryDashboard",
  //       icon: AppWindowMac,
  //       roles: ["admin"],
  //     },
  //     {
  //       name: "Config Backup",
  //       path: "/section/NewConfigurationBackupHistory",
  //       icon: AppWindowMac,
  //       roles: ["admin"],
  //     },
  //      {
  //       name: "FirmwareUpgradeUI",
  //       path: "/section/FirmwareUpgradeUI",
  //       icon: AppWindowMac,
  //       roles: ["admin"],
  //     },
  //       {
  //       name: "EnterpriseFirmwareRepository",
  //       path: "/section/EnterpriseFirmwareRepository",
  //       icon: AppWindowMac,
  //       roles: ["admin"],
  //     },
      
  //   ],
  // },
  //  {
  //   name: "Network Devices",
  //   icon: Router,
  //   roles: ["admin"],
  //   path: "network",
  //   children: [     
  //      {
  //       name: "Network Devices New",
  //       path: "/section/DeviceInventory",
  //       icon: AppWindowMac,
  //       roles: ["admin"],
  //     },
  //          {
  //      name: "Patch Deploymnet Cycle",
  //       path: "/section/deplyment-center",
  //       icon: AppWindowMac,
  //       roles: ["admin"],
  //     },
  //     //  {
  //     //   name: "Network Monitoring Alert",
  //     //   path: "/section1/NeWNetworkMonitoringAlert",
  //     //   icon: AppWindowMac,
  //     //   roles: ["admin"],
  //     // },        
  //     //  {
  //     //   name: "Configuration Manager",
  //     //   path: "/section/NewConfigurationManagerDashboard",
  //     //   icon: AppWindowMac,
  //     //   roles: ["admin"],
  //     // },
  //     // {
  //     //   name: "Network Device Configuration",
  //     //   path: "/section/NewNetworkDviceConfiguration",
  //     //   icon: AppWindowMac,
  //     //   roles: ["admin"],
  //     // },
  //     //  {
  //     //   name: "Firmware Inventory",
  //     //   path: "/section/NewFirmwareInventoryDashboard",
  //     //   icon: AppWindowMac,
  //     //   roles: ["admin"],
  //     // },
  //     {
  //       name: "Config Backup",
  //       path: "/section/NewConfigurationBackupHistory",
  //       icon: AppWindowMac,
  //       roles: ["admin"],
  //     },
  //     {
  //       name: "Firmware Inventory",
  //       path: "/section/FirmwareInvn",
  //       icon: AppWindowMac,
  //       roles: ["admin"],
  //     },

  //     // {
  //     //   name: "New login Page",
  //     //   path: "/section/Login1",
  //     //   icon: AppWindowMac,
  //     //   roles: ["admin"],
  //     // },


  //   ],
  // },
];

export const LinuxSidebarData = [

    {
    name: "Dashboard",
    path: "/dashboard/linuxDashboard",
    icon: LayoutDashboard,
    roles: ["admin"],
  },
  {
    name: "Missing Apps",
    path: "/linux/Missing-Apps",
    icon: AlertTriangle,
    roles: ["admin"],
  },
  {
    name: "Report",
    path: "/Linux/Report",
    icon: FileText,
    roles: ["admin"],
  },
   {
    name: "Repository",
    path: "/Linux/Repository",
    icon: FolderOpen ,
    roles: ["admin"],
  }


];



