import React from "react";
import clsx from "clsx";

const DateTimeDisplay = ({ value, type }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-1">
      <p className={clsx("mx-16", value < 0 ? "text-red-900" : "")}>{value}</p>
      <span className="text-2xl text-gray-400">{type}</span>
    </div>
  );
};

export default DateTimeDisplay;
