import React from "react";

export default ({ children, title, width }) => {
  return (
    <div
      className="p-4 bg-white rounded-md
      border-1 shadow-xl hover:shadow-2xl flex flex-col w-full my-2 grow shrink-0"
    >
      <div className="text-center text-2xl font-semibold">{title}</div>
      <div className="p-8 ">{children}</div>
    </div>
  );
};
