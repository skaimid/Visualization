import React, { useState, useEffect } from "react";
import HolyGrailLayout from "../../components/HolyGrailLayout";
import Sankey from "./component/Sankey";
import Piechart from "./component/Piechart";
import GraphContainer from "./component/GraphContainer";
import Selector from "./component/Selector";
import ClusterShower from "./component/ClusterShower";

export default function CompCop() {
  const [version, setVersion] = useState(-1);
  const [data, setData] = useState(null);
  const [selectedCluster, setSelectedCluster] = useState(null);

  useEffect(() => {
    console.log("version:", version);
    setData(null);
    setSelectedCluster(null);
    fetch(`/data/comp-proj-cluster/bi-graph-${version}.json`)
      .then((res) => res.json())
      .catch((e) => {
        console.log(e);
        setData(null);
      })
      .then((data) => setData(data));
  }, [version]);

  return (
    <HolyGrailLayout>
      <div className="flex flex-row flex-nowrap justify-around m-4">
        <div className="flex flex-col h-full w-1/6">
          <GraphContainer title={"版本选择"}>
            <Selector
              versionFrom={5}
              versionTo={19}
              version={version}
              setVersion={setVersion}
            />
          </GraphContainer>
          <GraphContainer title="说明">
            <div className="w-16"></div>
          </GraphContainer>
        </div>

        <GraphContainer title={"公司项目集群展示"} width="w-3/6">
          <Sankey
            data={data}
            version={version}
            selectedCluster={selectedCluster}
            setSelectedCluster={setSelectedCluster}
          />
        </GraphContainer>

        <div className="flex flex-col w-2/6">
          <GraphContainer
            title={"集群内公司合作贡献分析"}
            width="w-full h-[40%]"
          >
            {data && selectedCluster ? (
              <Piechart
                index={selectedCluster}
                data={data.nodes[selectedCluster].cluster_info[1]}
                innerRadius={60}
                outerRadius={100}
              ></Piechart>
            ) : (
              <div></div>
            )}
            <div>{console.log(data)}</div>
          </GraphContainer>

          <GraphContainer title={"公司合作模式"} width="w-full h-[60%]">
            {data && selectedCluster && (
              <ClusterShower
                clusterData={data.nodes[selectedCluster].cluster_info}
              />
            )}
          </GraphContainer>
        </div>
      </div>
    </HolyGrailLayout>
  );
}
