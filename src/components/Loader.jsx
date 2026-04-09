import React, { useState, useEffect } from "react";

const Loader = ({ delay = 1000, onLoadingComplete }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      if (onLoadingComplete) onLoadingComplete();
    }, delay);

    return () => clearTimeout(timer);
  }, [delay, onLoadingComplete]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-white dark:bg-gray-900 flex items-center justify-center z-50">
      <div className="relative w-20 h-20">
        {/* Spinner */}
        <div className="absolute inset-0 rounded-full border-4 border-cyan-200 dark:border-cyan-800 border-t-cyan-600 dark:border-t-cyan-400 animate-spin" />

        {/* Center Icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-10 h-10 bg-cyan-600 dark:bg-cyan-400 rounded-lg flex items-center justify-center">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="absolute mt-32 text-center">
        <p className="text-lg font-medium text-gray-900 dark:text-white">
          PlanetGuard Pro-DMS
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          loading data...
        </p>
      </div>
    </div>
  );
};

export default Loader;
