import React from "react";
import * as d3 from "d3";

const CompInfoKanban = ({ compData }) => {
  if (compData)
    return (
      <ul className=" text-lg list-outside list-disc">
        <li>
          提交总数：
          <span className="underline decoration-sky-500 decoration-2 underline-offset-2">
            {compData.total_commit}
          </span>
          个
        </li>
        <li>
          在集群内提交数：
          <span className="underline decoration-sky-500 decoration-2 underline-offset-2">
            {compData.commit_in_cluster}
          </span>
          个
        </li>
        <li>
          参与项目数：
          <span className="underline decoration-sky-500 decoration-2 underline-offset-2">
            {compData.project}
          </span>
          个
        </li>
        <li>
          开发者数量：
          <span className="underline decoration-sky-500 decoration-2 underline-offset-2">
            {compData.author}
          </span>
          个
        </li>

        <li>
          公司的度中心性：
          <span className="underline decoration-sky-500 decoration-2 underline-offset-2">
            {compData.dc.toFixed(4)}
          </span>
        </li>
      </ul>
    );
  else return <div> no data</div>;
};

const Arc = ({ data, index, createArc, colors, format, length, datasum }) => (
  <g key={index} className="arc">
    <path
      className="arc"
      d={createArc(data)}
      fill={colors((index * 2) / length)}
    />
    <text
      transform={`translate(${createArc.centroid(data)})`}
      textAnchor="middle"
      alignmentBaseline="middle"
      fill="black"
      fontSize="10"
    >
      {data.value / datasum > 0.03 &&
        format((data.value / datasum) * 100) + "%"}
    </text>
  </g>
);

const Labels = ({ data, index, colors, length }) => {
  const num_of_label_in_row = 10;
  return (
    <g key={index}>
      <rect
        width={15}
        height={15}
        x={
          ((index - (index % num_of_label_in_row)) / num_of_label_in_row) * 150
        }
        y={(index % num_of_label_in_row) * 20}
        fill={colors((index * 2) / length)}
      ></rect>

      <text
        x={
          ((index - (index % num_of_label_in_row)) / num_of_label_in_row) *
            150 +
          20
        }
        y={(index % num_of_label_in_row) * 20 + 12}
        fontSize="10"
      >
        {/* {data.data.comp.length > 10 ? data.data.comp.slice(0, 10) + "..." : data.data.comp} */}
        {data.data.comp}
      </text>
    </g>
  );
};

const size = {
  width: 400,
  height: 240,
  outerRadius: 100,
  innerRadius: 60,
};

const CompCmtPie = (props) => {
  if (!props.data) {
    return <div>no data</div>;
  }
  let cData = [];
  let datasum = props.data.total_commit;

  console.log(props.data);

  // 处理数据，小于minPencentage的不显示
  cData.push({ comp: "other", value: props.data.other });
  cData.push({ comp: "doc", value: props.data.doc });
  cData.push({ comp: "test", value: props.data.test });
  cData.push({ comp: "bugfix", value: props.data.bugfix });
  cData.push({ comp: "feature", value: props.data.feature });

  const createPie = d3.pie().value((d) => d.value);
  // .sort(null);
  const createArc = d3
    .arc()
    .innerRadius(size.innerRadius)
    .outerRadius(size.outerRadius);
  const colors = d3.interpolateCool;
  const format = d3.format(".2f");
  const data = createPie(cData);
  console.log(data);

  return (
    <div className="flex flex-col">
      <svg
        viewBox="0 0 400 240"
        width="100%"
        height="100%"
        preserveAspectRatio="xMinYMin meet"
      >
        <g
          transform={`translate(${size.outerRadius + 20} ${size.outerRadius})`}
        >
          {data.map((d, i) => (
            <Arc
              key={i}
              data={d}
              index={i}
              createArc={createArc}
              colors={colors}
              format={format}
              length={data.length}
              datasum={datasum}
            />
          ))}
        </g>
        <g transform={`translate(${size.outerRadius * 2 + 50}  ${20})`}>
          {data.map((d, i) => (
            <Labels
              key={i}
              data={d}
              index={i}
              colors={colors}
              length={data.length}
            ></Labels>
          ))}
        </g>
      </svg>
      <div>
        <CompInfoKanban compData={props.data} />
      </div>
    </div>
  );
};

export default CompCmtPie;
