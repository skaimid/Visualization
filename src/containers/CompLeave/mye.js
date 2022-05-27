
import * as echarts from 'echarts';

import React, { useEffect, useState } from "react";

import ReactEChartsCore from "echarts-for-react";

  const getOption = () => ({
    title: {
        text: '',
        subtext: 'count'
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['Joined', 'Withdrawn']
      },
      toolbox: {
        show: true,
        feature: {
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ['line', 'bar'] },
          restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      calculable: true,
      xAxis: [
        {
          type: 'category',
          // prettier-ignore
          data: ['6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17']
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: 'Joined',
          type: 'bar',
          data: [
            24,37,38,39,40,50,31,42,37,25,24,18

          ],
          
        },
        {
          name: 'Withdrawn',
          type: 'bar',
          data: [
            4,3,9,12,9,12,25,27,39,32,27,30

          ],
          
        }
      ]
  });

export default function Mye() {
      return <ReactEChartsCore option={getOption()} theme="ThemeStyle" />
}