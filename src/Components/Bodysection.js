import React from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "./Homepage";
import Sidebar from "./Sidebar";
import Dashboard from "./Dashboard";
import Welcome from "./Welcome";
import Edituser from "./Edituser";

const Bodysection = () => {
  return (
    <div id="content-wrapper" className="d-flex flex-row">
      <div id="content">
        <div className="container-fluid">
          <div className="d-sm-flex align-items-center justify-content-between mt-2">
            <Routes>
              <Route path="/" element={<Welcome />} />
              <Route path="/create-user" element={<Dashboard />}>
                <Route path="edit-user" element={<Edituser />} />
              </Route>
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bodysection;
