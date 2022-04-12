import React, { useEffect, useState } from "react";

export default function Selector({
  versionFrom,
  versionTo,
  version,
  setVersion,
}) {
  const handelVerionChange = (e) => {
    setVersion(e.target.value);
  };

  // 两头都包含
  const iterArray = Array.from(
    { length: versionTo - versionFrom + 1 },
    (_, i) => i + versionFrom
  );

  return (
    <div>
      <select value={version} onChange={handelVerionChange} className="w-full border-2 rounded-md shadow-xl p-2 border-zinc-400 ">
        <option
          value={-1}
          className="border border-solid border-gray-300
      rounded"
        >
          请选择版本
        </option>
        {iterArray.map((v, i) => (
          <option key={i} value={v}>
            {v}
          </option>
        ))}
      </select>
    </div>
  );
}
