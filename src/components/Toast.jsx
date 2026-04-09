import React, { useState, useEffect } from "react";
import { 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  X 
} from "lucide-react";

const Toast = ({ 
  message, 
  type = "success", 
  duration = 3000, 
  onClose 
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => onClose(), 300); // Wait for fade-out animation
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => onClose(), 300);
  };

  const typeConfig = {
    success: {
      icon: <CheckCircle className="w-5 h-5" />,
      bgColor: "bg-green-50 dark:bg-green-900/20",
      borderColor: "border-green-200 dark:border-green-800",
      textColor: "text-green-800 dark:text-green-300",
      iconColor: "text-green-500",
    },
    error: {
      icon: <XCircle className="w-5 h-5" />,
      bgColor: "bg-red-50 dark:bg-red-900/20",
      borderColor: "border-red-200 dark:border-red-800",
      textColor: "text-red-800 dark:text-red-300",
      iconColor: "text-red-500",
    },
    warning: {
      icon: <AlertCircle className="w-5 h-5" />,
      bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
      borderColor: "border-yellow-200 dark:border-yellow-800",
      textColor: "text-yellow-800 dark:text-yellow-300",
      iconColor: "text-yellow-500",
    },
    info: {
      icon: <AlertCircle className="w-5 h-5" />,
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      borderColor: "border-blue-200 dark:border-blue-800",
      textColor: "text-blue-800 dark:text-blue-300",
      iconColor: "text-blue-500",
    },
  };

  const config = typeConfig[type] || typeConfig.success;

  return (
    <div
      className={`fixed top-4 right-4 z-100 min-w-75 max-w-md transform transition-all duration-300 ${
        isVisible
          ? "translate-x-0 opacity-100"
          : "translate-x-full opacity-0"
      }`}
    >
      <div
        className={`flex items-start gap-3 p-4 rounded-lg border ${config.bgColor} ${config.borderColor} shadow-lg`}
      >
        <div className={`shrink-0 ${config.iconColor}`}>
          {config.icon}
        </div>
        <div className={`flex-1 text-sm font-medium ${config.textColor}`}>
          {message}
        </div>
        <button
          onClick={handleClose}
          className="shrink-0 p-1 hover:bg-black/5 dark:hover:bg-white/5 rounded"
        >
          <X className="w-4 h-4 text-gray-500" />
        </button>
      </div>
    </div>
  );
};

export default Toast;