import React, { useEffect, useState } from "react";
import HolyGrailLayout from "../../components/HolyGrailLayout";
import { Select } from "antd";
import { AutoComplete } from "antd";
import Pie from "./pie";
import Mye from "./mye";

import GraphContainer from "./GraphContainer";
import SizeContext from "antd/lib/avatar/SizeContext";
import { FontSizeOutlined } from "@ant-design/icons";

const { Option } = Select;
const data1 = [
  { value: 18, name: "SFS" },
  { value: 17, name: "IB" },
  { value: 3, name: "SPS" },
  { value: 12, name: "Us" },
  { value: 5, name: "SCS" },
  { value: 1, name: "CO" },
  { value: 3, name: "DIV" },
];
const data2 = [
  { value: 2, name: "deployment" },
  { value: 34, name: "component" },
  { value: 6, name: "Client" },
  { value: 3, name: "infra tools" },
  { value: 3, name: "plugin" },
  { value: 11, name: "community" },
];

function onChange(value) {
  console.log(`selected ${value}`);
}

function onSearch(val) {
  console.log("search:", val);
}

const Complete = ({ info, setSelectedComp }) => (
  <AutoComplete
    style={{ width: 200, height: 300 }}
    options={info}
    placeholder="input here"
    filterOption={(inputValue, item) => {
      if (!item) {
        return 0;
      }
      return item.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1;
    }}
    onSelect={(value) => {
      setSelectedComp(value);
    }}
  />
);

const findCompInfo = (company, infoList) => {
  return infoList.find((item) => {
    return item.company === company;
  });
};

export default function CompParticipate() {
  const [info, setInfo] = useState(undefined);
  // const [graphData, setGraphData] = useState(undefined);
  const [selectedComp, setSelectedComp] = useState(undefined);

  useEffect(() => {
    fetch(`/data/CompLeave/leave.json`)
      .then((res) => res.json())
      .catch((e) => {
        console.log(e);
        setInfo(undefined);
      })
      .then((data) => setInfo(data));
  }, []);

  // useEffect(() => {
  //   fetch(`/data/CompParticipate/${selectedComp}.json`)
  //     .then((res) => res.json())
  //     .catch((e) => {
  //       console.log(e);
  //       setGraphData(undefined);
  //     })
  //     .then((data) => setGraphData(data));
  // }, [selectedComp]);

  return (
    <HolyGrailLayout>
      <div className="flex flex-row flex-nowrap justify-between m-8 min-w-[720px] items-stretch">
        <div className="flex flex-col m-3 w-1/3">
          <GraphContainer title={"公司搜索"} style={{ maxHeight: "200px" }}>
            {info && (
              <Complete
                info={info.map((item) => {
                  return { value: item.company };
                })}
                setSelectedComp={setSelectedComp}
              ></Complete>
            )}
          </GraphContainer>

          <GraphContainer title={"公司信息"}>
            {selectedComp && info ? (
              <div className="w-[16rem] text-3xl">
                <li>company：{findCompInfo(selectedComp, info).company}</li>
                <li>commits:{findCompInfo(selectedComp, info).commits}</li>
                <li>scale:{findCompInfo(selectedComp, info).scale}</li>
                <li>type:{findCompInfo(selectedComp, info).repo_type}</li>
                <li>intensity:{findCompInfo(selectedComp, info).intensity}</li>
                <li>extent:{findCompInfo(selectedComp, info).extent}</li>
                <li>aim:{findCompInfo(selectedComp, info).aim}</li>
              </div>
            ) : (
              <div className="text-2xl">
                <li>commits:该公司的贡献等级</li>
                <li>scale:该公司的规模</li>
                <li>type:该公司主要负责项目类型</li>
                <li>intensity:该公司的贡献强度</li>
                <li>extent:该公司的贡献程度</li>
                <li>aim:该公司的商业目标</li>
              </div>
            )}
          </GraphContainer>
        </div>

        <div className="flex flex-col m-3 w-2/3 text-2xl">
          <div className="flex flex-row m-3  text-2xl">
            <GraphContainer title={"社区公司流动趋势"}>
              <Mye />
            </GraphContainer>
          </div>
          <div className="flex flex-row m-3 w-1/2 text-2xl">
            <GraphContainer title={"撤出公司商业目标占比饼图"}>
              <Pie data={data1} />
            </GraphContainer>
            <GraphContainer title={"撤出公司项目类型占比饼图"}>
              <Pie data={data2} />
            </GraphContainer>
          </div>
        </div>

        {/*<div className="flex flex-col m-3 w-2/3 text-2xl">
          <GraphContainer title={"社区公司流动趋势"} >
            <Mye/>
          </GraphContainer>
          <div className="flex flex-col m-3 w-1/2 text-2xl">
          <GraphContainer title={"撤出公司商业目标占比饼图"}>
            <Pie data={data1}/>
          </GraphContainer>
          </div>
          <div className="flex flex-col m-3 w-1/2  text-2xl">
          <GraphContainer title={"撤出公司项目类型占比饼图"}>
            <Pie data={data2} />
          </GraphContainer>
          </div>
            </div>*/}

        {/* 竖着并列 */}
        {/*<div className="flex flex-col m-3 w-1/3 text-2xl">
          <GraphContainer title={"撤出公司商业目标占比饼图"} >
            
          <Pie data={data1} />
            
          
            
          </GraphContainer>
          <GraphContainer title={"撤出公司项目类型占比饼图"}>
          <Pie data={data2} />
          </GraphContainer>
            </div>*/}

        {/* 横着并列 */}
        {/*<div className="flex flex-col m-3 w-1/3 ">
          <GraphContainer title={"贡献强度"}>
            <img src="/img/leave1.jpg" style={{height: "500px"}}></img>
          </GraphContainer>
        </div>
        <div className="flex flex-col m-3 w-1/3">
          <GraphContainer title={"贡献广度"}>
            <img src="/img/leave2.jpg"></img>
          </GraphContainer>
          </div>*/}
      </div>
    </HolyGrailLayout>
  );
}
