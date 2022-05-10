import React, { useEffect, useState } from "react";
import HolyGrailLayout from "../../components/HolyGrailLayout";
import { Select } from "antd";
import { AutoComplete } from "antd";

import Pie from "./pie";
import Line from "./line";
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

const findCompInfo = (comp_name, infoList) => {
  return infoList.find((item) => {
    return item.comp_name === comp_name;
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
      <div className="flex flex-row w-9/12 flex-nowrap">
        <div className="w-[50%]">
          <GraphContainer>
            {info && (
              <Complete
                info={info.map((item) => {
                  return { value: item.comp_name };
                })}
                setSelectedComp={setSelectedComp}
              ></Complete>
            )}
          </GraphContainer>
        </div>

        <GraphContainer>
          {selectedComp && info ? (
            <div className="w-[16rem] ">
              公司名称{findCompInfo(selectedComp, info).comp_name}
            </div>
          ) : (
            <div> no data</div>
          )}
        </GraphContainer>
      </div>

      <div className="m-16 w-72 h-72 bg-white">
        <Pie />
      </div>

      {graphData ? <Line data={graphData.ci} /> : <div> no data</div>}
    </HolyGrailLayout>
  );
}
