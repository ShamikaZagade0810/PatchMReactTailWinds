import React, { useState } from "react";

export const Modal = ({ show, setShow, data = {}}) => {
  if (!show) return null;
 
  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={() => setShow(false)}
    >
      {/* Modal Box */}
      <div
        className="bg-[#0f172a] w-[95%] max-w-5xl rounded-2xl shadow-2xl p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center border-b border-gray-700 pb-3 mb-4">
          <h2 className="text-xl font-semibold text-white">
            {data.modelHeading}
          </h2>

          <button
            onClick={() => setShow(false)}
            className="text-gray-400 hover:text-white text-lg"
          >
            &times;
          </button>
        </div>

        {/* Table Wrapper (SCROLLABLE BOTH DIRECTIONS) */}
        <div className="max-h-[400px] overflow-auto">

          {/* Table */}
          <div className="min-w-[600px]">

            {/* Header */}
            <div
              className="grid text-xs font-semibold text-gray-400 bg-[#1e293b] p-3 rounded-t-lg sticky top-0 z-10"
              style={{
                gridTemplateColumns: `repeat(${data.columndata.length}, minmax(120px, 1fr))`,
              }}
            >
              {data.columndata.map((col, i) => (
                <span key={i}>{col.label}</span>
              ))}
            </div>

            {/* Rows */}
            <div className="space-y-2 mt-2">
              {data.maindata.map((row, rowIndex) => (
                <div
                  key={rowIndex}
                  className="grid items-center text-sm bg-[#141D2E] p-3 rounded"
                  style={{
                    gridTemplateColumns: `repeat(${data.columndata.length}, minmax(120px, 1fr))`,
                  }}
                >
                  {data.columndata.map((col, colIndex) => {
                  const value = row[col.name.toLowerCase()];
                     console.log("col.label ", col.name);
                    

                    // Custom styling logic
                    let className = "text-gray-300";

                    if (col.key === "status") {
                      className =
                        value === "Outdated"
                          ? "text-red-400"
                          : "text-green-400";
                    }

                    if (col.key === "severity") {
                      className =
                        value === "High"
                          ? "text-red-500"
                          : value === "Medium"
                          ? "text-yellow-400"
                          : "text-green-400";
                    }

                    return (
                      <span key={colIndex} className={className}>
                        {value}
                      </span>
                    );
                  })}
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end mt-6">
          <button
            onClick={() => setShow(false)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};