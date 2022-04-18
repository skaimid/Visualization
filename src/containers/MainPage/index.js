import React from "react";
import HolyGrailLayout from "../../components/HolyGrailLayout";

export default function MainPage() {
  const proj_desc =
    "众所周知，开源软件（OSS）对于软件产业有着十分巨大的影响力。这些虚拟的软件项目对于将不同地域、不同语言、不同时区的开发者聚集在了一起。过去十年左右，开源项目已经被广泛的采用和接纳，不仅有大量的志愿者参与了开源项目，而且许多公司也开始参与开源项目的开发。";

  const  proj_desc_2 = "这里写点说明这里写点说说吗 这里写点说明这里写点说说吗 这里写点说明这里写点说说吗 这里写点说明这里写点说说吗 这里写点说明这里写点说说吗 这里写点说明这里写点说说"

  const proj_items = [
    {
      name: "公司在开源社区中的合作",
      desc: "公司在开源软件的开发中已经占据了十分重要的地位。使用了社交网络方法，可视化的展示了公司在开源社区中的合作情况、合作模式以及合作影响。",
    },
    { name: "开源社区中的公司流失", desc: "需要补充描述" },
    { name: "开源社区中的开发者流失", desc: "需要补充描述" },
    { name: "开源社区中的公司参与模式", desc: "需要补充描述" },
  ];

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
              OpenStack 开源社区可视化分析
            </div>
            <div className="text-3xl "> </div>
          </div>
        </div>

        <div className="w-full bg-white  p-24 flex justify-center ">
          <div className="text-xl w-8/12">{proj_desc}</div>
        </div>

        {/*首页主要内容*/}
        <div className="w-full bg-white flex flex-row justify-center">
          {proj_items.map((item) => (
            <div className=" w-2/12 h-64 shadow-md m-3 flex flex-col">
              <div className=" text-lg font-black text-center mt-4 mx-8">{item.name}</div>
              <div className=" text-base  text-left m-4 truncate ">{item.desc}</div>
            </div>
          ))}
        </div>

        <div className="w-full bg-white  p-24 flex justify-center">
          <div className="text-xl w-8/12">
            {proj_desc_2}
          </div>
        </div>

        {/*footer*/}
        <div className="w-full h-32"></div>
      </div>
    </HolyGrailLayout>
  );
}
