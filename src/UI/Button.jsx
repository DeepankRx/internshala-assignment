import React from "react";

const Button = (props) => {
  const { label } = props;
  return (
    <button
      {...props}
      className="bg-sky-500 border border-gray-200 rounded-xl p-2 text-white"
    >
      {label}
    </button>
  );
};

export default Button;
