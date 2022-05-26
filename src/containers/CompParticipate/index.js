import React, { useEffect, useState } from "react";
import HolyGrailLayout from "../../components/HolyGrailLayout";
import { Select } from "antd";
import { AutoComplete } from "antd";

import Pie from "./pie";
import Line from "./line";
import GraphContainer from "../CompLeave/GraphContainer";

const { Option } = Select;

function onChange(value) {
  console.log(`selected ${value}`);
}

function onSearch(val) {
  console.log("search:", val);
}

const Complete = ({ info, setSelectedComp }) => (
  <AutoComplete
    style={{ width: 200 }}
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
  const [graphData, setGraphData] = useState(undefined);
  const [selectedComp, setSelectedComp] = useState(undefined);

  useEffect(() => {
    fetch(`/data/CompParticipate/info.json`)
      .then((res) => res.json())
      .catch((e) => {
        console.log(e);
        setInfo(undefined);
      })
      .then((data) => setInfo(data));
  }, []);

  useEffect(() => {
    fetch(`/data/CompParticipate/${selectedComp}.json`)
      .then((res) => res.json())
      .catch((e) => {
        console.log(e);
        setGraphData(undefined);
      })
      .then((data) => setGraphData(data));
  }, [selectedComp]);

  return (
    <HolyGrailLayout>
      <div className="flex flex-row flex-nowrap justify-between m-8 min-w-[500px] items-stretch">
        <div className="flex flex-col m-3 w-1/10">
          <GraphContainer title={"公司搜索"}>
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
              <div className="w-[16rem] ">
                <li>公司名称：{findCompInfo(selectedComp, info).company}</li>
                <li>开发者人数：{findCompInfo(selectedComp, info).devpr_num}</li>
                <li>贡献强度：{findCompInfo(selectedComp, info).ci}</li>
                <li>贡献广度：{findCompInfo(selectedComp, info).ce}</li>
                <li>贡献焦点：{findCompInfo(selectedComp, info).cp}</li>
                <li>公司目标：{findCompInfo(selectedComp, info).goal}</li>
              </div>
            ) : (
              <div> no data</div>
            )}
          </GraphContainer>
        </div>
        <div className="flex flex-col m-3 w-1/2 max-w-[50%]">
          <GraphContainer title={"贡献强度"}>
            {graphData ? <Line data={graphData.ci} /> : <div> no data</div>}
          </GraphContainer>
          <GraphContainer title={"贡献广度"}>
            {graphData ? <Line data={graphData.ce} /> : <div> no data</div>}
          </GraphContainer>
        </div>
        <div className="flex flex-col m-3 w-1/3">
          <GraphContainer title={"公司参与目标分析"}>
            <Pie />
            <div className="w-[20rem] ">
                <li>cloud service：91.3%</li>
                <li>distros：3.9%</li>
                <li>training：0.7%</li>
                <li>consulting：4.1%</li>
              </div>
          </GraphContainer>
          <GraphContainer title={"目标类型简述"}>
          <div className="w-[20rem] ">
                <li>cloud service：提供云服务</li>
                <li>distros：提供集成包装后的OpenStack发行版</li>
                <li>training：提供培训服务</li>
                <li>consulting：提供解决方案和咨询</li>

              </div>
          </GraphContainer>
        </div>
      </div>
    </HolyGrailLayout>
  );
}
