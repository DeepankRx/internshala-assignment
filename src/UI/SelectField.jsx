import React from "react";

const SelectField = (props) => {
  const { label, options, defaultValue } = props;

  return (
    <div className="flex flex-col space-y-1">
      <label className="text-sm font-semibold text-gray-600">{label}</label>
      <select
        {...props}
        defaultValue="" // Set default value to an empty string
        className="border border-gray-300 rounded-lg px-3 py-2 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
      >
        <option value="" key="">
          Please Select
        </option>{" "}
        {/* Add a default option */}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectField;
