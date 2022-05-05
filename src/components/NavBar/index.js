import React from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <div
      className="flex flex-row justify-between 
                p-4
                shadow-md"
    >
      <div className="flex flex-row justify-start ml-6">
        <div
          className="w-8 h-8 bg-no-repeat bg-center"
          style={{ backgroundImage: `url(/img/icon.svg)` }}
          
        ></div>
        <div className="ml-2 text-lg">开源社区可视化分析 </div>
      </div>
      <nav className="divide-x text-lg">
        <Link to={"/"} className="px-4">
          主页
        </Link>
        <Link to="/comp-coop" className="px-4">
          公司合作
        </Link>
        <Link to="/dev-participate" className="px-4">
          公司参与
        </Link>
        <Link to="/comp-leave" className="px-4">
          公司流失
        </Link>
        <Link to="/dev-leave" className="px-4">
          开发者流失
        </Link>
      </nav>
    </div>
  );
}
