// // components/Layout/Navbar.jsx
// import React, { useState } from "react";
// import {
//   Bell,
//   Search,
//   HelpCircle,
//   Moon,
//   Sun,
//   User,
//   Settings,
//   LogOut,
//   Menu,
//   X,
// } from "lucide-react";
// import { useTheme } from "../../context/ThemeContext";
// // import logo from "../../assets/velox_logo.png";
// import logo from "../../assets/planet-gurard.png";
// import { useAuth } from "../../context/AuthContext";

// export const Navbar = ({ toggleSidebar, isSidebarOpen }) => {
//     const { logout } = useAuth();
//   const { theme, toggleTheme } = useTheme();
//   const [searchQuery, setSearchQuery] = useState("");
//   const [showUserMenu, setShowUserMenu] = useState(false);
//   const [notifications] = useState([
//     {
//       id: 1,
//       text: "Dry run failed for POC_MYSQL",
//       time: "5 mins ago",
//       read: false,
//     },
//     {
//       id: 2,
//       text: "Package deployment completed",
//       time: "1 hour ago",
//       read: true,
//     },
//     {
//       id: 3,
//       text: "New policy violation detected",
//       time: "3 hours ago",
//       read: false,
//     },
//   ]);

//   const unreadCount = notifications.filter((n) => !n.read).length;
// const { user } = useAuth();

//   const handleLogout = () => {
//     logout();
//     navigate("/login", { replace: true });
//   };
//   return (
//     <header className="fixed top-0 right-0 left-0 h-14 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 z-30">
//       <div className="h-full px-2 flex items-center justify-between">
//         {/* Left side - Mobile menu button */}
//         <button
//           onClick={toggleSidebar}
//           className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
//         >
//           {isSidebarOpen ? (
//             <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
//           ) : (
//             <Menu className="w-5 h-5 text-gray-600 dark:text-gray-400" />
//           )}
//         </button>

//         {/* Center - Logo and Brand Name */}
//         <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-3">
//           <img src={logo} alt="Velox Logo" className="h-8 w-8 rounded-lg" />
//           <div className="flex flex-col items-center">
//             <span className="font-bold text-gray-800 dark:text-white text-lg">
//               PlanetGuard Pro-DMS
//             </span>
//           </div>
//         </div>

//         {/* Right side - Actions */}
//         <div className="flex items-center gap-2 ml-auto">
//           {/* Search bar - Only visible on medium screens and up */}
//           <div className="relative hidden md:block mr-2"></div>

//           {/* Theme toggle */}
//           <button
//             onClick={toggleTheme}
//             className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
//             title="Toggle theme"
//           >
//             {theme === "dark" ? (
//               <Sun className="w-5 h-5 text-yellow-500" />
//             ) : (
//               <Moon className="w-5 h-5 text-gray-600" />
//             )}
//           </button>

//           {/* User menu */}
//           <div className="relative">
//             <button
//               onClick={() => setShowUserMenu(!showUserMenu)}
//               className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
//             >
//               <div className="w-8 h-8 rounded-full bg-linear-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
//                 <span className="text-white font-medium text-sm">AD</span>
//               </div>
//               <div className="hidden md:block text-left">
//                 <p className="text-sm font-medium text-gray-900 dark:text-white">
//                     {user?.role}
//                 </p>
//                 <p className="text-xs text-gray-500 dark:text-gray-400">
//                   {user?.username}
//                 </p>
//               </div>
//             </button>

//             {/* User dropdown */}
//             {showUserMenu && (
//               <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-1 z-50">
//                 <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
//                   <p className="text-sm font-medium text-gray-900 dark:text-white">
//                     {user?.username}
//                   </p>
//                   <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
//                       {user.role}
//                   </p>
//                 </div>
//                 <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
//                   <User className="w-4 h-4" />
//                   Profile
//                 </button>
//                 <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
//                   <Settings className="w-4 h-4" />
//                   Settings
//                 </button>
//                 <div className="border-t border-gray-200 dark:border-gray-700 ">
//                   <button
//                   onClick={handleLogout}
//                   className="cursor-pointer w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10">
//                     <LogOut className="w-4 h-4" />
//                     Sign out
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

import React, { useEffect, useRef, useState } from "react";

import { useLocation,useNavigate } from "react-router-dom";
import {
  Bell,
  Search,
  HelpCircle,
  Moon,
  Sun,
  User,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";
// import { useNavigate } from "react-router-dom";
import SecureITLogo from "../../assets/UnifiedSecureITLogo.svg";

export const Navbar = ({ toggleSidebar, isSidebarOpen, isPatchTreeSidebarEnabled }) => {
    // const navigate = useNavigate();
  const { logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [notifications] = useState([
    {
      id: 1,
      text: "Dry run failed for POC_MYSQL",
      time: "5 mins ago",
      read: false,
    },
    {
      id: 2,
      text: "Package deployment completed",
      time: "1 hour ago",
      read: true,
    },
    {
      id: 3,
      text: "New policy violation detected",
      time: "3 hours ago",
      read: false,
    },
  ]);


  const [active, setActive] = useState("Windows");

  const tabs = ["Windows", "Linux", "ThirdParty"];
  const location = useLocation();

  // ---------------- Sync route → active tab ----------------
  useEffect(() => {
    console.log("Navigated to:", location.pathname);
    switch (location.pathname) {
      case '/section/Thirdparty':
        setActive("ThirdParty");

        navigate('/dashboard/thirdpartyApp');
        break;

      case '/section/Linux':
        setActive("Linux");
        navigate('/dashboard/linuxDashboard');
        break;

      case '/dashboard/thirdpartyApp':
        setActive("ThirdParty");
        break;
      case '/dashboard/linuxDashboard':
        setActive("Linux");
        break;

      }
    console.log("splited location Path  --> ", location.pathname.split("/")[1]);
    switch (location.pathname.split("/")[1].toLocaleLowerCase()) {
      case 'thirdparty':
        setActive("ThirdParty");
        break;

      case 'linux':
        setActive("Linux");
        break;
    }
  }, [location]);

  const dropdownRef = useRef(null);

  // ---------------- logout ----------------
  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  // ---------------- click outside ----------------
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const unreadCount = notifications.filter((n) => !n.read).length;
  const navigate = useNavigate();
  // const { user } = useAuth();
  const user = localStorage.getItem("user");
  const user1 = JSON.parse(localStorage.getItem("user") || "{}");
  console.log("user1", user1);

  
  // ---------------- Tabs navigation ----------------
  const handleClickTab = (tab) => {
    setActive(tab);
    //  navigate('/dashboard/linuxDashboard');
    switch (tab) {
      case 'Windows':
        navigate('/dashboard/mainDashboard');
        break;

      case 'Linux':
        navigate('/dashboard/linuxDashboard');
        break;

      case 'ThirdParty':
        navigate('/dashboard/thirdpartyApp');
        break;

      default:
        navigate('/dashboard');
    }
    console.log("tab ", tab);
  }

  console.log("isPatchTreeSidebarEnabled", isPatchTreeSidebarEnabled);


  return (
     <header className="fixed top-0 left-0 right-0 h-15 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
      
      <div className="h-full px-4 flex items-center justify-between">

        {/* ================= LEFT SIDE ================= */}
        <div className="flex items-center gap-6">

          {/* Sidebar toggle */}
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {isSidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </button>

          {/* Logo */}
          <div className="flex items-center gap-2 ">
            <img src={SecureITLogo} alt="logo" className="h-40 w-45 transform transition-transform duration-300 ease-in-out hover:scale-103"  onClick={() => navigate("/dashboard/mainDashboard")} />           
          </div>

          {/* Tabs */}
          {!isPatchTreeSidebarEnabled && (
            <div className="flex items-center gap-1 ml-4 bg-gray-100 dark:bg-gray-900 p-1 rounded-lg mx-4">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => handleClickTab(tab)}
                  className={`px-4 py-2 text-sm rounded-md  transition-all 
                    ${active === tab
                      ? "bg-blue-500/80 text-white shadow "
                      : "text-gray-600 dark:text-gray-300 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-500 dark:hover:bg-gray-300"
                    }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ================= RIGHT SIDE ================= */}
        <div className="flex items-center gap-3">
           <button onClick={() => { window.location.href = "http://192.168.0.236:8085/Helpdesk/"; }} 
           className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800" > EDR  </button>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5 text-yellow-400" />
            ) : (
              <Moon className="w-5 h-5 text-gray-600" />
            )}
          </button>

          {/* User */}
          <div ref={dropdownRef} className="relative">
            <button onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800" >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
  <User className="w-4 h-4 text-white" />
</div>

              <div className="hidden md:block text-left">
                <p className="text-sm text-gray-900 dark:text-white">
                  {user?.role}
                </p>
                <p className="text-xs text-gray-500">
                  {user?.username}
                </p>
              </div>
            </button>

            {/* Dropdown */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border rounded-lg shadow-lg z-50">                
                <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                  <p className="text-sm font-medium">{user1?.username}</p>
                  <p className="text-xs text-gray-500">{user1?.role}</p>
                </div>

                <button className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">
                  <User size={16} /> Profile
                </button>

                <button className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">
                  <Settings size={16} /> Settings
                </button>

                <button onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20" >
                  <LogOut size={16} /> Sign out
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  );
};
