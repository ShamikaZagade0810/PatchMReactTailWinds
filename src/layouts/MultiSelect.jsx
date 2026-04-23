import React, { useState, useRef, useEffect } from "react";

const MultiSelect = ({ options = [], value = [], onChange, placeholder = "Select", setValue, id }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef();

  // close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // filter
  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(search.toLowerCase())
  );

  const toggleOption = (option) => {
    const exists = value.find((v) => v.value === option.value);

    let newValue;
    if (exists) {
      newValue = value.filter((v) => v.value !== option.value);
    } else {
      newValue = [...value, option];
    }

    let onlyvalue = newValue.map(obj => obj.value);
    
    setValue(id, onlyvalue);
    onChange(newValue);
  };

  return (
    <div className="relative" ref={dropdownRef}>

      {/* Input Box */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="w-full min-h-[48px] bg-[#1E293B] border border-[#2A3A55] rounded-lg px-3 flex flex-wrap items-center gap-2 cursor-pointer"
      >
        {value.length === 0 && (
          <span className="text-gray-400">{placeholder}</span>
        )}

        {value.map((item) => (
          <span
            key={item.value}
            className="bg-blue-600/40 text-white px-2 py-1 rounded text-md font-medium"
          >
            {item.label}
          </span>
        ))}
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-50 mt-2 w-full bg-[#0F172A] border border-[#2A3A55] rounded-lg shadow-lg">

          {/* Search */}
          <div className="p-2">
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-2 py-2 bg-[#1E293B] text-white rounded outline-none"

            />
          </div>

          {/* Options */}
          <div className="max-h-48 overflow-y-auto">
            {filteredOptions.map((option) => {
              const isSelected = value.some(
                (v) => v.value === option.value
              );

              return (
                <div
                  key={option.value}
                  onClick={() => toggleOption(option)}
                  className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-[#1B2A44]" >
                  <input
                    type="checkbox"
                    checked={isSelected}
                    readOnly
                  />
                  <span className="text-white text-md">{option.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiSelect
