import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import CompLeave from "./containers/CompLeave";
import CompCop from "./containers/CompCop";
import MainPage from "./containers/MainPage";
import DevLeave from "./containers/DevLeave";
import CompParticipate from "./containers/CompParticipate";
import NoMatch from "./containers/NoMatch";

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="comp-coop" element={<CompCop />} />
      <Route path="comp-leave" element={<CompLeave />} />
      <Route path="dev-leave" element={<DevLeave />} />
      <Route path="dev-participate" element={<CompParticipate />} />
      <Route path="*" element={<NoMatch/>}/>
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);
