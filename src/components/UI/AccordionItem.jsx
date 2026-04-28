import { ChevronRight, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

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
  const hasChildren = item.children && item.children.length > 0;
console.log("has children : ",item.children);
console.log("has item : ",item);

  const navigate = useNavigate();

  const handleClick = () => {
    if (hasChildren) {
      console.log("path in accordian item : ", item);
      console.log("check path : ",item?.children?.path);
      
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
    <div className="relative">
      <button
        onClick={handleClick}
        className={`w-full flex items-center p-1 rounded-lg transition-all duration-200 py-2
          ${isSelected 
            ? "bg-cyan-500 text-white dark:bg-cyan-900/90 border-l-4 border-cyan-400 p-1 " 
            : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
          }
          ${level === 0 ? "font-medium" : " my-1"}
          ${!isSidebarOpen  ? "justify-center":"justify-between"}
        `}
      >
        <div className="flex items-center gap-3">
          {item.icon && <item.icon size={18} />}
          {isSidebarOpen && (
            <span className="text-xs truncate">{item.name} </span>
          )}
        </div>
        
        {hasChildren && isSidebarOpen && (
          <div className="shrink-0 ml-2 ">
            {isExpanded ? (
              <ChevronDown size={16} />
            ) : (
              <ChevronRight size={16} />
            )}
          </div>
        )}
      
      </button>

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