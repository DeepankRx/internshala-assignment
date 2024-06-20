import React from "react";

const InputField = (props) => {
  const { label } = props;
  return (
    <div className="flex flex-col space-y-1">
      <label className="text-sm font-semibold text-gray-600">{label}</label>
      <input
        {...props}
        className="border border-gray-300 rounded-lg px-3 py-2 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
      />
    </div>
  );
};

export default InputField;
