import React, { useState, useRef, useEffect } from "react";

const MultiSelect = ({ options = [], value = [], onChange, placeholder = "Select", setValue, id, error, isRequired = true }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef();
  console.log("value --->", value, "options --->", options);
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
console.log("options", options);
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

    // ✅ validation rule example: required at least 1


    let onlyvalue = newValue.map(obj => obj.value);

    // setValue(id, onlyvalue);
    setValue(id, onlyvalue, { shouldValidate: true });
    onChange(newValue);
  };

  const allSelected =
    options.length > 0 && value.length === options.length;

  const toggleSelectAll = () => {
    let newValue = [];

    if (allSelected) {
      newValue = [];
    } else {
      newValue = [...options];
    }

    const onlyvalue = newValue.map((obj) => obj.value);

    setValue(id, onlyvalue, { shouldValidate: true });
    onChange(newValue);
  };

  return (
    <div className="relative" ref={dropdownRef}>

      {/* Input Box */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="w-full min-h-[38px] overflow-y-auto bg-[#1E293B] border border-[#2A3A55] rounded-lg px-1 flex flex-wrap items-center gap-1 cursor-pointer scrollbar-thin scrollbar-thumb-slate-600"
      >
        {/* {value.length === 0 && (
          <span className="text-gray-400 text-sm">{placeholder}</span>
        )} */}

        {value.length > 0 ? (
          <>
            {value.slice(0, 2).map((item) => (
              <span
                key={item.value}
                className="bg-blue-600/40 text-white px-1 py-1 rounded text-sm"
              >
                {item.label}
              </span>
            ))}

            {value.length > 2 && (
              <span className="bg-slate-700 text-white px-2 py-1 rounded text-sm">
                +{value.length - 2} more
              </span>
            )}
          </>
        ) : (
          <span className="text-gray-400 text-sm">
            {placeholder}
          </span>
        )}
        {error && (
          <p className="text-red-500 text-xs mt-1">
            {error.message || "This field is required"}
          </p>
        )}
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
              className="w-full px-2 py-1 bg-[#1E293B] text-white text-sm rounded outline-none"

            />
          </div>

          {/* Options */}
          <div className="max-h-48 overflow-y-auto">
            <div
              onClick={toggleSelectAll}
              className="
    flex items-center gap-2
    px-3 py-2
    cursor-pointer
    bg-[#162033]
    border-b border-[#2A3A55]
    hover:bg-[#1B2A44]
    sticky top-0 z-10
  "
            >
              <input
                type="checkbox"
                checked={allSelected}
                readOnly
              />
              <span className="text-blue-400 font-medium text-sm">
                Select All
              </span>
            </div>
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
                  <span className="text-white text-sm">{option.label}</span>
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
