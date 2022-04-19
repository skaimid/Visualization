import React from "react";
import NavBar from "../NavBar";

export default function HolyGrailLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen min-w-fit">
      <NavBar />

      <div className="flex-1 bg-gray-300">{children}</div>

      <div className="text-center"></div>
    </div>
  );
}
