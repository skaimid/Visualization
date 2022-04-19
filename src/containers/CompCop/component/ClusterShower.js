import React from "react";

export default function ClusterShower({ clusterData }) {
  if (!clusterData) {
    return <div>no data</div>;
  }

  console.log(clusterData);

  const type = clusterData.cluster_type;
  const data = clusterData.role_dict;

  let totalContribution = 0;
  for (let key in data) {
    totalContribution += data[key].contribution;
  }

  switch (type) {
    case "multi leader":
      return (
        <div className="text-lg">
          <div>
            合作模式：
            <span className="underline decoration-sky-500 decoration-2 underline-offset-2">
              集团合作
            </span>
          </div>
          <div>
            集团领导者是：
            {Object.keys(data).map((k, i) => {
              return (
                data[k].role === "aggressive participant" && (
                  <span
                    className="underline decoration-sky-500 decoration-2 underline-offset-2 pl-4"
                    key={i}
                  >
                    {k} (
                    {((data[k].contribution / totalContribution) * 100).toFixed(
                      2
                    )}
                    %)
                  </span>
                )
              );
            })}
          </div>
        </div>
      );
    case "one leader":
      return (
        <div>
          <div>
            合作模式：
            <span className="underline decoration-sky-500 decoration-2 underline-offset-2">
              超级贡献者
            </span>
          </div>
          集团领导者是：
          {Object.keys(data).map((k, i) => {
            return (
              data[k].role === "leader" && (
                <span
                  className="underline decoration-sky-500 decoration-2 underline-offset-2 pl-4"
                  key={i}
                >
                  {k} (
                  {((data[k].contribution / totalContribution) * 100).toFixed(
                    2
                  )}
                  %)
                </span>
              )
            );
          })}
        </div>
      );
    case "isolated cooperation":
      return (
        <div>
          <div>
            合作模式：
            <span className="underline decoration-sky-500 decoration-2 underline-offset-2">
              孤立开发
            </span>
          </div>
          集团领导者是：
          {Object.keys(data).map((k, i) => {
            return (
              data[k].role === "leader" && (
                <span
                  className="underline decoration-sky-500 decoration-2 underline-offset-2 pl-4"
                  key={i}
                >
                  {k} (
                  {((data[k].contribution / totalContribution) * 100).toFixed(
                    2
                  )}
                  %)
                </span>
              )
            );
          })}
        </div>
      );
  }
}
