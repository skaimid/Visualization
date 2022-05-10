import React from "react";
import HolyGrailLayout from "../../components/HolyGrailLayout";
import { Select } from "antd";
import { AutoComplete } from "antd";
import { Card } from "antd";

import ReactEChartsCore from "echarts-for-react";
import * as echarts from "echarts/core";
import { GridComponent } from "echarts/components";
import { LineChart } from "echarts/charts";
import { UniversalTransition } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";


const getOption = () => ({
  xAxis: {
    type: "category",
    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      data: [150, 230, 224, 218, 135, 147, 260],
      type: "line",
    },
  ],
});

const { Option } = Select;

function onChange(value) {
  console.log(`selected ${value}`);
}

function onSearch(val) {
  console.log("search:", val);
}

const SelectTest = () => (
  <Select
    showSearch
    placeholder="Select a person"
    optionFilterProp="children"
    onChange={onChange}
    onSearch={onSearch}
    filterOption={(input, option) =>
      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
    }
  >
    <Option value="jack">Jack</Option>
    <Option value="lucy">Lucy</Option>
    <Option value="tom">Tom</Option>
  </Select>
);

const options = [
  { value: "Burns Bay Road" },
  { value: "Downing Street" },
  { value: "Wall Street" },
];

const Complete = () => (
  <AutoComplete
    style={{ width: 200 }}
    options={options}
    placeholder="try to type `b`"
    filterOption={(inputValue, option) => {
      if (!option) {
        return 0;
      }
      return (
        option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
      );
    }}
  />
);

export default function CompParticipate() {
  return (
    <HolyGrailLayout>
      <h1>公司参与</h1>
      <SelectTest></SelectTest>
      <Complete></Complete>
      <Card.Grid className="line_a bg-white">
        <ReactEChartsCore option={getOption()} theme="ThemeStyle" />
      </Card.Grid>
    </HolyGrailLayout>
  );
}
