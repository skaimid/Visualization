import React, { useEffect, useState } from "react";

import ReactEChartsCore from "echarts-for-react";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
} from "echarts/components";
import { PieChart } from "echarts/charts";
import { LabelLayout } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";

const getOption = () => ({
  title: {
    text: "",
    subtext: "",
    left: "center",
  },
  tooltip: {
    trigger: "item",
  },
  legend: {
    orient: "vertical",
    left: "right",
  },
  series: [
    {
      name: "Access From",
      type: "pie",
      radius: "50%",
      data: [
        { value: 374, name: "cloud service" },
        { value: 16, name: "distros" },
        { value: 3, name: "training" },
        { value: 17, name: "consulting" },
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)",
        },
      },
    },
  ],
});


export default function Pie() {
    return <ReactEChartsCore option={getOption()} theme="ThemeStyle" />
}