import { ChevronRight, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import React, { useState, useRef, useEffect } from 'react';


export const AccordionItem = ({
  item,
  level = 0,
  isSidebarOpen,
  isExpanded,
  isActive,
  onAccordionClick,
  onItemClick,
  isItemExpanded
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const hasChildren = item.children && item.children.length > 0;
  console.log("has children : ", item.children);
  console.log("has item : ", item);

  const navigate = useNavigate();

  const handleClick = () => {
    if (hasChildren) {
      console.log("path in accordian item : ", item);
      console.log("check path : ", item?.children?.path);

      onAccordionClick(item?.path);
      // navigate(item.path)
    } else {
      onItemClick(item.path);
      navigate(item.path)
    }
  };


  const isSelected =
    isActive === item.path ||
    isActive.startsWith(item.path + "/") ||
    (hasChildren &&
      item.children.some(child =>
        isActive === child.path || isActive.startsWith(child.path + "/")
      ));


  return (
    <div className="relative group">
      <style>
        {`
@keyframes swipeRight {
  0% {
    transform: translateX(-100%);
    opacity: 0;
  }
  100% {
    transform: translateX(0%);
    opacity: 1;
  }
}
  @keyframes waterFlow {
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(100%);
  }
}
`}
      </style>
      <button
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
        className={`relative group overflow-hidden w-full flex items-center p-2 rounded-lg
          overflow-hidden transition-all duration-200 ease-in-out
          ${isSelected
                      ? `
              bg-cyan-500 text-white dark:bg-cyan-900/90
              scale-[1.02]
            `
                      : `
              text-gray-700 dark:text-gray-300
            `
          }

          ${level === 0 ? "font-medium" : " my-1"}
          ${!isSidebarOpen ? "justify-center" : "justify-between"}
        `}
      >

        {/* 🧊 SWIPE RIGHT HOVER EFFECT */}
        {/* LEFT BORDER (ONLY THIS ITEM) */}
        <span
          className={`absolute left-0 top-0 h-full w-[3px] overflow-hidden
  bg-cyan-400 transition-all duration-300 ease-in-out z-20

  ${isSelected
              ? "opacity-100"
              : isHovered
                ? "opacity-100"
                : "opacity-0"
            }
  `}

        >

          {/* 🌊 ACTIVE WATER EFFECT */}
          {isSelected && (
            <span
              className="absolute top-0 left-0 w-full h-full
    bg-gradient-to-b from-transparent via-white/70 to-transparent
    animate-[waterFlow_1.2s_linear_infinite]"
            />
          )}

          {/* 🌊 HOVER LIGHT FLOW (subtle) */}
          {isHovered && !isSelected && (
            <span
              className="absolute inset-0 bg-cyan-400/20"
            />
          )}

        </span>
        {isHovered && !isSelected && (
          <span className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10
                animate-[swipeRight_0.25s_ease-out_forwards]"  />
        )}
        <div className="relative flex items-center gap-3">
          {item.icon && <item.icon size={18} className="transition-transform duration-200 group-hover:scale-110 group-hover:rotate-3" />}
          {isSidebarOpen && (
            <span className="text-xs truncate">{item.name} </span>
          )}
        </div>

        {hasChildren && isSidebarOpen && (
          <div className="relative  z-10 shrink-0 ml-2 ">
            {isExpanded ? (
              <ChevronDown size={16} />
            ) : (
              <ChevronRight size={16} />
            )}
          </div>
        )}

      </button>

      {/* TOOLTIP (when sidebar closed) */}
      {!isSidebarOpen && (
        <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 z-50
          opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none"
        >
          <div className="px-2 py-1 text-xs bg-black text-white rounded whitespace-nowrap shadow-lg">
            {item.name}
          </div>
        </div>
      )}

      {hasChildren && isExpanded && isSidebarOpen && (
        <div className="ml-4 border-l border-gray-200 dark:border-gray-700">
          {item.children.map((child) => (
            <AccordionItem
              key={child.path}
              item={child}
              level={level + 1}
              isSidebarOpen={isSidebarOpen}
              isExpanded={isItemExpanded(child.path)}
              isActive={isActive}
              onAccordionClick={onAccordionClick}
              onItemClick={onItemClick}
            />
          ))}

        </div>
      )}

    </div>
  );
};