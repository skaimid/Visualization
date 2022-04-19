import React, { useState, useEffect } from "react";

const CompaniesSelector = ({ data, setSelectedComp }) => {
  let comps = [];
  if (data) {
    for (let key in data.role_dict) {
      comps.push(key);
    }
  }

  const handelVerionChange = (e) => {
    setSelectedComp(e.target.value);
  };

  useEffect(() => {
    if (data) {
      setSelectedComp(comps[0]);
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
      {comps.map((v, i) => (
        <option key={i} value={v}>
          {v}
        </option>
      ))}
    </select>
  );
};

export default CompaniesSelector;
