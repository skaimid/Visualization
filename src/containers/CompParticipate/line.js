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
    data: ["1", "2", "3", "4", "5", "6","7","8","9","10","11","12","13","14","15","16","17","18"],
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
