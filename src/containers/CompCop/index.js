import React, { useState, useEffect } from "react";
import HolyGrailLayout from "../../components/HolyGrailLayout";
import Sankey from "./component/Sankey";
import Piechart from "./component/Piechart";
import GraphContainer from "./component/GraphContainer";
import Selector from "./component/Selector";
import ClusterShower from "./component/ClusterShower";
import CompaniesSelector from "./component/CompaniesSelector";
import CompCmtPie from "./component/CompCmt";
import ClusterSelector from "./component/ClusterSelector";

const VersionInfoKanban = ({ clusterMeta }) => {
  if (clusterMeta)
    return (
      <ul className=" text-lg list-outside list-disc">
        <li>
          公司数量：
          <span className="underline decoration-sky-500 decoration-2 underline-offset-2">
            {clusterMeta.total_companies}
          </span>
          个
        </li>
        <li>
          项目数量：
          <span className="underline decoration-sky-500 decoration-2 underline-offset-2">
            {clusterMeta.total_projects}
          </span>
          个
        </li>
        <li>
          提交数量：
          <span className="underline decoration-sky-500 decoration-2 underline-offset-2">
            {clusterMeta.total_commit}
          </span>
          个
        </li>
        <li>
          集群数量：
          <span className="underline decoration-sky-500 decoration-2 underline-offset-2">
            {clusterMeta.cluster_num}
          </span>
          个
        </li>
      </ul>
    );
  else return <div> no data</div>;
};

const ClusterRsInfoKanban = ({ clusterMeta }) => {
  if (clusterMeta)
    return (
      <ul className=" text-lg list-outside list-disc">
        <li>
          集群：
          <span className="underline decoration-sky-500 decoration-2 underline-offset-2">
            {clusterMeta.cluster_num}
          </span>
          个
        </li>
        <li>
          bi-modularity：
          <span className="underline decoration-sky-500 decoration-2 underline-offset-2">
            {clusterMeta.bimodularity.toFixed(2)}
          </span>
        </li>
      </ul>
    );
  else return <div> no data</div>;
};

const CompKanban = ({ selectedCompData }) => {
  if (!selectedCompData) {
    return <div>no data</div>;
  }
};

export default function CompCop() {
  const [version, setVersion] = useState(-1);
  const [clusterInfo, setClusterInfo] = useState(null);
  const [clusterMeta, setClusterMeta] = useState(null);
  const [selectedCluster, setSelectedCluster] = useState(null);
  const [selectedClusterData, setSelectedClusterData] = useState(null);
  const [selectedComp, setSelectedComp] = useState(undefined);
  const [selectedCompData, setSelectedCompData] = useState(null);

  useEffect(() => {
    console.log("version:", version);
    setClusterInfo(null);
    setSelectedCluster(null);
    fetch(`/data/comp-proj-cluster/version_${version}/cluster.json`)
      .then((res) => res.json())
      .catch((e) => {
        console.log(e);
        setClusterInfo(null);
      })
      .then((data) => setClusterInfo(data));

    setClusterMeta(null);
    fetch(`/data/comp-proj-cluster/version_${version}/cluster_info.json`)
      .then((res) => res.json())
      .catch((e) => {
        console.log(e);
        setClusterMeta(null);
      })
      .then((data) => setClusterMeta(data));
  }, [version]);

  useEffect(() => {
    console.log("selectedCluster:", selectedCluster);
    setSelectedClusterData(null);
    fetch(
      `/data/comp-proj-cluster/version_${version}/cluster_${selectedCluster}_companies/info.json`
    )
      .then((res) => res.json())
      .catch((e) => {
        console.log(e);
        setSelectedClusterData(null);
      })
      .then((data) => setSelectedClusterData(data));
  }, [selectedCluster]);

  useEffect(() => {
    console.log(" s selectedComp:", selectedComp);
    console.log(" s selectedCluster:", selectedCluster);
    setSelectedCompData(null);
    fetch(
      `/data/comp-proj-cluster/version_${version}/cluster_${selectedCluster}_companies/${selectedComp}.json`
    )
      .then((res) => res.json())
      .catch((e) => {
        console.log(e);
        setSelectedCompData(null);
      })
      .then((data) => setSelectedCompData(data));
  }, [selectedComp]);

  return (
    <HolyGrailLayout>
      <div className="flex flex-row flex-nowrap justify-between m-8 min-w-[1920px] items-stretch">
        <div className="flex flex-col m-4 w-2/12">
          <GraphContainer title={"版本选择"}>
            <Selector
              versionFrom={5}
              versionTo={18}
              version={version}
              setVersion={setVersion}
            />
          </GraphContainer>

          <GraphContainer title={"版本信息"}>
            <VersionInfoKanban clusterMeta={clusterMeta} />
          </GraphContainer>

          <GraphContainer title={"聚类效果"}>
            <ClusterRsInfoKanban clusterMeta={clusterMeta} />
          </GraphContainer>
        </div>

        <div className="flex flex-col m-4 w-5/12">
          <GraphContainer>
            <Sankey
              data={clusterInfo}
              version={version}
              selectedCluster={selectedCluster}
              setSelectedCluster={setSelectedCluster}
            />
          </GraphContainer>
        </div>

        <div className="flex flex-col m-4 w-3/12">
          <GraphContainer title={"集群选择"}>
            <ClusterSelector
              data={clusterInfo}
              setSelectedCluster={setSelectedCluster}
            />
          </GraphContainer>
          <GraphContainer title={"集群内部公司贡献分布"}>
            <Piechart data={selectedClusterData} index={selectedCluster} />
          </GraphContainer>
          <GraphContainer title={"集群内合作模式分析"}>
            <ClusterShower clusterData={selectedClusterData}></ClusterShower>
          </GraphContainer>
        </div>

        <div className="flex flex-col m-4 w-2/12">
          <GraphContainer title={"公司选择"}>
            <CompaniesSelector
              data={selectedClusterData}
              setSelectedComp={setSelectedComp}
            />
          </GraphContainer>
          <GraphContainer title={"公司贡献信息"}>
            <CompCmtPie data={selectedCompData} />
          </GraphContainer>
        </div>
      </div>
    </HolyGrailLayout>
  );
}
