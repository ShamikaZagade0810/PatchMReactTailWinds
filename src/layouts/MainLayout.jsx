// import { Navbar } from "../components/Layout/Navbar";
// import { Sidebar } from "../components/Layout/Sidebar";
// import { Footer } from "../components/Layout/Footer";
// import { useSidebar } from "../hooks/useSidebar";
// import { Outlet } from "react-router-dom";

// export default function MainLayout() {
//   const {
//     isSidebarOpen,
//     toggleSidebar,
//     activeItem,
//     handleAccordionClick,
//     isItemExpanded,
//     setActiveItem,
//   } = useSidebar();

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
//       <Navbar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />

//       <Sidebar
//         isOpen={isSidebarOpen}
//         toggleSidebar={toggleSidebar}
//         activeItem={activeItem}
//         onItemClick={setActiveItem}
//         onAccordionClick={handleAccordionClick}
//         isItemExpanded={isItemExpanded}
//       />

//       <main
//         className={`
//           pt-16 pb-12 transition-all
//           ${isSidebarOpen ? "ml-64" : "ml-20"}
//         `}
//       >
//         <div className="p-1 max-w-7xl mx-auto">
//           <Outlet />
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// }

import { Navbar } from "../components/Layout/Navbar";
import { Sidebar } from "../components/Layout/Sidebar";
import { PatchTreeSideBar } from "../components/Layout/PatchTreeSideBar";
import { Footer } from "../components/Layout/Footer";
import { useSidebar } from "../hooks/useSidebar";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
// import toast from "react-hot-toast";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

export default function MainLayout() {

  const [loading, setLoading] = useState(true);
  const [isPatchTreeSidebarEnabled, setIsPatchTreeSidebarEnabled] = useState(false);
  const {
    isSidebarOpen,
    toggleSidebar,
    activeItem,
    handleAccordionClick,
    isItemExpanded,
    setActiveItem,
  } = useSidebar();

  useEffect(() => {
    if (activeItem == '/dashboard/patchTree') {
      setIsPatchTreeSidebarEnabled(true);
    }
  }, [activeItem])
  console.log("activeItem ", activeItem);
  // const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const ws = new WebSocket("ws://192.168.0.219:4000");

    ws.onopen = () => {
      // console.log(" WebSocket connected");
    };

    ws.onmessage = (event) => {
      // console.log("WebSocket message:", event.data);
      const alert = JSON.parse(event.data);
      // console.log("check error grrr: ", alert);

      if (alert.status == 200) {
        toast.success(alert?.message, {
          position: "top-right",
          autoClose: 7000,
          theme: "colored",
        });
      } else {
        toast.error(alert?.message, {
          position: "top-right",
          autoClose: 7000,
          theme: "light",
        });
      }

      // setAlerts((prev) => [alert, ...prev]);
    };

    ws.onerror = (err) => {
      // console.error("❌ WebSocket error", err);
    };

    ws.onclose = () => {
      // console.log("🔴 WebSocket closed");
    };

    return () => ws.close();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);
  console.log("isPatchTreeSidebarEnabled in mainlayout",isPatchTreeSidebarEnabled);

  return (
    <div className="min-h-screen bg-gray-200 dark:bg-[#000000] ">
      <Navbar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} isPatchTreeSidebarEnabled={isPatchTreeSidebarEnabled} />
      {!isPatchTreeSidebarEnabled ?
        <Sidebar
          isOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
          activeItem={activeItem}
          onItemClick={setActiveItem}
          onAccordionClick={handleAccordionClick}
          isItemExpanded={isItemExpanded}

        />
        :
        <PatchTreeSideBar
          isOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
          activeItem={activeItem}
          onItemClick={setActiveItem}
          onAccordionClick={handleAccordionClick}
          isItemExpanded={isItemExpanded}
        />
      }
      <main
        className={`
          pt-16 pb-12 transition-all 
          ${!isSidebarOpen  ? "ml-20" : isSidebarOpen && !isPatchTreeSidebarEnabled ? "ml-50" : "ml-70" }
        `}
      >
        {!loading ? (<div className="p-2 max-w-10xl mx-auto ">
          {/* <Outlet  /> */}
          <Outlet context={{ setIsPatchTreeSidebarEnabled }} />
        </div>
        ) : (
          <Loader />
        )}


      </main>

      <Footer />
    </div>
  );
}
