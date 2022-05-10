import React, { useEffect, useState } from "react";

import ReactEChartsCore from "echarts-for-react";
import * as echarts from "echarts/core";
import { GridComponent } from "echarts/components";
import { LineChart } from "echarts/charts";
import { UniversalTransition } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";

const getOption = (datay) => ({
  xAxis: {
    type: "category",
    data: ["1", "2", "3", "4", "5", "6"],
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      data: datay,
      type: "line",
    },
  ],
});

export default function Line({ data }) {
    return <ReactEChartsCore option={getOption(data)} theme="ThemeStyle" />
}
