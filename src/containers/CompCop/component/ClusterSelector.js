import React, { useEffect } from "react";

const ClusterSelector = ({ data, setSelectedCluster }) => {
  let iterArray = [];
  if (data) {
    iterArray = Array.from({ length: data.nodes.length / 2 }, (_, i) => i);
  }

  const handelVerionChange = (e) => {
    setSelectedCluster(e.target.value);
  };

  useEffect(() => {
    if (data) {
      setSelectedCluster(0);
    }
  }, [data]);

  if (!data) {
    return <div>no data</div>;
  }

  return (
    <select
      onChange={handelVerionChange}
      className="w-full border-2 rounded-md shadow-xl p-2 border-zinc-400 "
    >
      {iterArray.map((v, i) => (
        <option key={i} value={v}>
          集群_{v}
        </option>
      ))}
    </select>
  );
};

export default ClusterSelector;
