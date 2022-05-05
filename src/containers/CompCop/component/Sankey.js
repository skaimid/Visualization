import {
  sankey,
  sankeyCenter,
  sankeyJustify,
  sankeyLeft,
  sankeyLinkHorizontal,
  sankeyRight,
} from "d3-sankey";
import * as d3 from "d3";
import React, { useEffect, useRef, useState } from "react";
import { dragEnable } from "d3";

const size = {
  width: 512,
  height: 512,
};

// const getMousePosition = (event) => {
//   const CTM = event.target.getScreenCTM();

//   return {
//     x: (event.clientX - CTM.e) / CTM.a,
//     y: (event.clientY - CTM.f) / CTM.d
//   };
// };

const Rect = ({
  index,
  x0,
  x1,
  y0,
  y1,
  name,
  value,
  length,
  colors,
  selectedCluster,
}) => {
  if (index == selectedCluster) {
    console.log(index);
  }
  return (
    <>
      <rect
        className="sankey-node"
        x={x0}
        y={y0}
        width={x1 - x0}
        height={y1 - y0}
        fill={colors(index / length)}
        data-index={index}
        stroke={"black"}
        strokeWidth={selectedCluster ? (index == selectedCluster ? 3 : 1) : 1}
      />
      <text
        x={x0 < size.width / 2 ? x1 + 6 : x0 - 6}
        y={(y1 + y0) / 2}
        style={{
          fill: d3.rgb(colors(index / length)).darker(),
          alignmentBaseline: "middle",
          fontSize: 9,
          textAnchor: x0 < size.width / 2 ? "start" : "end",
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        {name.replaceAll("_companies", "").replaceAll("_project", "")}
      </text>
    </>
  );
};

const Link = ({ data, width, length, colors }) => {
  const link = sankeyLinkHorizontal();

  return (
    <>
      <defs>
        <linearGradient
          id={`gradient-${data.index}`}
          gradientUnits="userSpaceOnUse"
          x1={data.source.x1}
          x2={data.target.x0}
        >
          <stop offset="0" stopColor={colors(data.source.index / length)} />
          <stop offset="100%" stopColor={colors(data.target.index / length)} />
        </linearGradient>
      </defs>
      <path
        d={link(data)}
        fill={"none"}
        stroke={`url(#gradient-${data.index})`}
        strokeOpacity={0.5}
        strokeWidth={width}
      />
    </>
  );
};

const Sankey = ({ data, version, setSelectedCluster, selectedCluster }) => {
  const dragElement = useRef(null);
  const graph = useRef(null);
  const offset = useRef(null);

  const colors = d3.interpolateCool;
  const sk = sankey()
    .nodeAlign(sankeyJustify)
    .nodeWidth(15)
    .nodePadding(10)
    .extent([
      [0, 0],
      [size.width, size.height - 30],
    ])
    .nodeSort(null);

  let clusterNum = 0;

  // const onMouseUp = (e) => {
  //   dragElement.current = null;
  // };

  const onMouseDown = (e) => {
    if (!data) {
      return;
    }
    clusterNum = data.nodes.length / 2;
    if (e.target.tagName === "rect" && data) {
      dragElement.current = e.target;
      const idx = e.target.getAttribute("data-index");
      if (e.target.getAttribute("class") === "sankey-node") {
        console.log(idx);
        console.log(e.target);
        if (idx < clusterNum) {
          setSelectedCluster(idx);
        }
      }
    }
  };

  // const onMouseMove = (e) => {
  //   if (dragElement.current) {
  //     const coord = getMousePosition(e);
  //     dragElement.current.setAttributeNS(null, "y", coord.y - offset.current.y);
  //   }
  // };

  useEffect(() => {
    // window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("mousedown", onMouseDown);
    // window.addEventListener("mousemove", onMouseMove);

    return () => {
      // window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("mousedown", onMouseDown);
      // window.removeEventListener("mousemove", onMouseMove);
    };
  }, [data]);

  if (data) {
    graph.current = sk(data);
    const { links, nodes } = graph.current;

    return (
      <svg
        viewBox="0 0 512 512"
        preserveAspectRatio="xMidYMid meet"
        className="w-full h-full"
      >
        <g>
          <text x={6} y={12} style={{ fontSize: 12, textAnchor: "start" }}>
            companies
          </text>
          <text x={512 - 6} y={12} style={{ fontSize: 12, textAnchor: "end" }}>
            project
          </text>
        </g>
        <g transform={`translate(0, 20)`}>
          {links.map((d, i) => (
            <Link
              key={i}
              index={i}
              data={d}
              width={d.width}
              length={nodes.length}
              colors={colors}
            />
          ))}
        </g>
        <g transform={`translate(0, 20)`}>
          {nodes.map((d, i) => (
            <Rect
              key={i}
              index={i}
              x0={d.x0}
              x1={d.x1}
              y0={d.y0}
              y1={d.y1}
              name={d.name}
              value={d.value}
              length={nodes.length}
              colors={colors}
              selectedCluster={selectedCluster}
            />
          ))}
        </g>
        <g>
          <rect></rect>
        </g>
      </svg>
    );
  }

  return (
    <div className=" text-center  text-3xl underline rounded-lg h-[512px]">
      {version == -1 ? "请选择需要查看的版本" : "loading..."}
    </div>
  );
};

export default Sankey;
