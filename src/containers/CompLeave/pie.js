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

const getOption = (datay) => ({
  title: {
    text: "",
    subtext: "",
    left: "center",
  },
  tooltip: {
    trigger: "item",
    formatter: '{a} <br/>{b} : {c} ({d}%)'
  },
  legend: {
    orient: "vertical",
    left: "right",
    textStyle : {
      fontWeight : 'normal',
      fontSize : '20px'
      }
  },
  series: [
    {
      label: {
        normal: {
        textStyle : {
        fontWeight : 'normal',
        fontSize : '15px'
        }
        }
        },
      name: "Access From",
      type: "pie",
      Label:{fontsize:"30px"},
      radius: "70%",
      data: datay,
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





export default function Pie({ data }) {
    return <ReactEChartsCore option={getOption(data)} theme="ThemeStyle" />
}


