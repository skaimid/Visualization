import React from "react";
import { Link } from "react-router-dom";
import HolyGrailLayout from "../../components/HolyGrailLayout";
import data from "./data.js";

export default function MainPage() {
  return (
    <HolyGrailLayout>
      <div className="flex flex-col w-full justify-center ">
        {/*首页hero*/}
        <div
          className="flex justify-center items-center
           w-full h-[32rem]
           bg-gradient-to-r from-green-200 to-blue-200"
          // style={{ backgroundImage: "url(/img/hero1.jpg)" }}
        >
          {/*首页hero区图像背景*/}

          <div className="flex flex-col items-center">
            <div className=" text-7xl font-black text-center p-8">
              开源社区可视化分析
            </div>
            <div className="text-3xl "> </div>
          </div>
        </div>

        <div className="w-full bg-white  py-24 flex justify-center  ">
          <div className="text-xl w-8/12 max-w-3xl">{data.proj_desc}</div>
        </div>

        {/*首页主要内容*/}

        <div className="w-full bg-white flex flex-col items-center ">
          {data.proj_items.map((item, idx) =>
            idx % 2 ? (
              <div className=" bg-white w-full flex flex-row justify-center py-16    ">
                <div
                  style={{ backgroundImage: `url(${item.backgroundImage})` }}
                  className="w-[32rem] h-72  mx-4	bg-cover shadow-xl"
                ></div>
                <div className="flex flex-col  w-[30rem] h-72  mx-4 mt-8 ">
                  <Link
                    to={item.linkto}
                    className="text-4xl font-extrabold mb-4"
                  >
                    {item.name}
                  </Link>
                  <div>{item.desc}</div>
                </div>
              </div>
            ) : (
              <div className=" bg-gray-50 w-full flex flex-row justify-center py-16">
                <div className="flex flex-col  w-[30rem] h-72  mx-4 mt-8">
                  <Link
                    to={item.linkto}
                    className="text-4xl font-extrabold text-right	mb-4"
                  >
                    {item.name}
                  </Link>
                  <div className="text-right">{item.desc}</div>
                </div>
                <div
                  style={{ backgroundImage: `url(${item.backgroundImage})` }}
                  className="w-[32rem] h-72 mx-4 text-right	bg-contain shadow-xl "
                ></div>
              </div>
            )
          )}
        </div>

        <div className="w-full bg-white  py-24 flex justify-center  ">
          <div className="text-xl w-8/12 max-w-3xl">{data.proj_desc_2}</div>
        </div>

        {/*footer*/}
        <div className="w-full h-64 flex  justify-center">
          <div className="text-xl w-8/12  mt-4 text-white">Developed by </div>
        </div>
      </div>
    </HolyGrailLayout>
  );
}
