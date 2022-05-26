import React, { useEffect, useState } from "react";
import HolyGrailLayout from "../../components/HolyGrailLayout";
import { Select } from "antd";
import { AutoComplete } from "antd";

import GraphContainer from "./GraphContainer";

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
                <li>commits:{findCompInfo(selectedComp, info).commits}</li>
                <li>scale:{findCompInfo(selectedComp, info).scale}</li>
                <li>type:{findCompInfo(selectedComp, info).repo_type}</li>
                <li>intensity:{findCompInfo(selectedComp, info).intensity}</li>
                <li>extent:{findCompInfo(selectedComp, info).extent}</li>
                <li>aim:{findCompInfo(selectedComp, info).aim}</li>
              </div>
            ) : (
              <div> no data</div>
            )}
          </GraphContainer>
        </div>

        {/* 竖着并列 */}
        <div className="flex flex-col m-3 w-2/3 ">
          <GraphContainer title={"贡献强度"}>
            <img src="/img/hero1.jpg"></img>{/*图的位置在项目 public/img 下*/}
          </GraphContainer>
          <GraphContainer title={"贡献广度"}>
            <img src="/img/p2.jpg"></img> 
          </GraphContainer>
        </div>

        {/* 横着并列 */}
        {/* <div className="flex flex-col m-3 w-1/3 ">
          <GraphContainer title={"贡献强度"}>
            <img src="/img/hero1.jpg"></img>
          </GraphContainer>
        </div>
        <div className="flex flex-col m-3 w-1/3">
          <GraphContainer title={"贡献广度"}>
            <img src="/img/p2.jpg"></img>
          </GraphContainer>
        </div> */}
      </div>
    </HolyGrailLayout>
  );
}
