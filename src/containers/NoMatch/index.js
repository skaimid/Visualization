import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function NoMatch() {


  return (
    <div className=" bg-black w-full  flex flex-col min-h-screen min-w-[1920px]">
      <div
        className=" mt-48   ml-16 mb-12 "
      >
        <div className=" scale-y-150 text-white text-[7rem] font-err leading-[1.2] font-black	">
          HTTP
        </div>
        <div className=" scale-y-150 text-white text-[7rem] font-err leading-[1.2]	font-black	">
          ERROR CODE 404
        </div>
        <div className=" scale-y-150 text-white text-[12rem] font-err leading-[1.2]	font-black	">
          PAGE NOT FOUND
        </div>

        <div className=" scale-y-150 text-white text-[4rem] font-ep leading-[1.2]	font-black mt-16 mb-4">
          NOTE
        </div>

        <div
          className="  text-white text-[6rem]  leading-[0.9] font-black"
          style={{ fontFamily: "serif" }}
        >
          Seems like you got lost in this website...
          <br />
          Maybe go back to the{" "}
          <Link to="/" className=" underline  cursor-pointer decoration-2">
            HOME PAGE
          </Link>
          ?
        </div>
      </div>
    </div>
  );
}
