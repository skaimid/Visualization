import React from "react";

export default ({ children, title, style }) => {
  return (
    <div
      className="p-4 bg-white rounded-md
      border-1 shadow-xl hover:shadow-2xl flex flex-col w-full grow shrink-0 m-4"
      style={style}
    >
      <div className="text-center text-2xl font-semibold">{title}</div>
      <div className="p-8 ">{children}</div>
    </div>
  );
};
