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
import logo from "../../assets/planet-gurard.png";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const Navbar = ({ toggleSidebar, isSidebarOpen }) => {
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



  const dropdownRef = useRef(null);

const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };
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

  

  return (
    <header className="fixed top-0 right-0 left-0 h-14 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 z-30">
      <div className="h-full px-2 flex items-center justify-between">
        {/* Left side - Mobile menu button */}
        <button
          onClick={toggleSidebar}
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          {isSidebarOpen ? (
            <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          ) : (
            <Menu className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          )}
        </button>

        {/* Center - Logo and Brand Name */}
        <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-3">
          <img src={logo} alt="Velox Logo" className="h-8 w-8 rounded-lg" />
          <div className="flex flex-col items-center">
            <span className="font-bold text-gray-800 dark:text-white text-lg">
               PlanetGuard Pro-DMS
            </span>
          </div>
        </div>

        {/* Right side - Actions */}
        <div className="flex items-center gap-2 ml-auto">
          {/* Search bar - Only visible on medium screens and up */}
          <div className="relative hidden md:block mr-2"></div>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            title="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5 text-yellow-500" />
            ) : (
              <Moon className="w-5 h-5 text-gray-600" />
            )}
          </button>

          {/* User menu */}
          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-linear-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                <span className="text-white font-medium text-sm">VB</span>
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {user?.role}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {user?.username}
                </p>
              </div>
            </button>

            {/* User dropdown */}
            {showUserMenu && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-1 z-50">
                <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {user?.username}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    {user?.role}
                  </p>
                </div>
                <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                  <User className="w-4 h-4" />
                  Profile
                </button>
                <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                  <Settings className="w-4 h-4" />
                  Settings
                </button>
                <div className="border-t border-gray-200 dark:border-gray-700 ">
                  <button
                    onClick={handleLogout}
                    className="cursor-pointer w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
