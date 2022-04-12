import React from "react";
import { Link } from "react-router-dom";
import codePic from "../../assets/code.png";

export default function NavBar() {
  return (
    <div
      className="flex flex-row justify-between 
                p-4
                shadow-md"
    >
      <div className="flex flex-row justify-start ml-6">
        <img src={codePic} className="w-6 h-6" />
        <div className="ml-2">OpenStack 开源社区分析 </div>
      </div>
      <nav className="divide-x">
        <Link to={"/"} className="px-4">
          主页
        </Link>
        <Link to="/comp-coop" className="px-4">
          公司合作
        </Link>
        <Link to="/comp-leave" className="px-4">
          公司流失
        </Link>
        <Link to="/dev-leave" className="px-4">
          开发者流失
        </Link>
        <Link to="/dev-participate" className="px-4">
          公司参与
        </Link>
      </nav>
    </div>
  );
}
