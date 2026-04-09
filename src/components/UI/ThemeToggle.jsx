import React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
    >
      <div className="relative w-6 h-6 flex items-center justify-center">
        <Sun
          className={`absolute transition-all duration-300 transform ${
            theme === "dark"
              ? "rotate-90 opacity-0"
              : "rotate-0 opacity-100"
          }`}
          size={18}
        />
        <Moon
          className={`absolute transition-all duration-300 transform ${
            theme === "dark"
              ? "rotate-0 opacity-100"
              : "-rotate-90 opacity-0"
          }`}
          size={18}
        />
      </div>
      <span className="sr-only">Toggle theme</span>
    </button>
  );
};