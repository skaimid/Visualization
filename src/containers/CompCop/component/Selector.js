import React, { useState } from "react";

export default function Selector({
  versionFrom,
  versionTo,
  version,
  setVersion,
}) {
  useState(() => {
    setVersion(versionFrom);
  });

  const handelVerionChange = (e) => {
    setVersion(e.target.value);
    console.log("version:", e.target.value);
  };

  // 两头都包含
  const iterArray = Array.from(
    { length: versionTo - versionFrom + 1 },
    (_, i) => i + versionFrom
  );

  return (
    <div>
      <select
        onChange={handelVerionChange}
        className="w-full border-2 rounded-md shadow-xl p-2 border-zinc-400 "
      >
        {iterArray.map((v, i) => (
          <option key={i} value={v}>
            {v}
          </option>
        ))}
      </select>
    </div>
  );
}
