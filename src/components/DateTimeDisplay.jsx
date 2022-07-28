import React from "react";

const DateTimeDisplay = ({ value, type }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-1">
      <p className=" mx-16">{value}</p>
      <span className="text-2xl text-gray-400">{type}</span>
    </div>
  );
};

export default DateTimeDisplay;
