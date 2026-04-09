// hooks/useSidebar.js (updated)
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export const useSidebar = () => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeItem, setActiveItem] = useState("/dashboard");
  const [expandedItems, setExpandedItems] = useState([]);

  useEffect(() => {
    const path = location.pathname;
    setActiveItem(path);
    
    // Auto-expand based on current path
    const pathSegments = path.split("/").filter(Boolean);
    if (pathSegments.length > 0) {
      // Add root path segment to expanded items
      const rootPath = `/${pathSegments[0]}`;
      if (!expandedItems.includes(rootPath)) {
        setExpandedItems(prev => [...prev, rootPath]);
      }
    }
  }, [location.pathname]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleAccordionClick = (path) => {
    if (expandedItems.includes(path)) {
      setExpandedItems(expandedItems.filter(item => item !== path));
    } else {
      setExpandedItems([...expandedItems, path]);
    }
  };

  const isItemExpanded = (path) => {
    return expandedItems.includes(path);
  };

  return {
    isSidebarOpen,
    toggleSidebar,
    activeItem,
    setActiveItem,
    handleAccordionClick,
    isItemExpanded,
    expandedItems
  };
};