import React, { useState } from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import "../add/css/App.css";
import Home from "../pages/Home";
import Resume from "../pages/Resume";
import Portfolio from "../pages/portfolio/Portfolio";
import Awards from "../pages/Awards";
import Blogs from "../pages/Blogs";
import SnowFall from "../add/tools/SnowFall";

import { IoHome } from "react-icons/io5";
import { BsPersonBoundingBox } from "react-icons/bs";
import { PiHandbagFill } from "react-icons/pi";
import { FaUserGraduate } from "react-icons/fa";
import { BsChatRightTextFill } from "react-icons/bs";
import CountryBlacklist from "../add/tools/BlackList";

function App() {
  const [accessChecked, setAccessChecked] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [country, setCountry] = useState<string | null>(null);
  const [blockedReason, setBlockedReason] = useState<string | null>(null);

  // Callback for CountryBlacklist to report status
  const handleAccessCheck = (
    isBlocked: boolean,
    countryName: string | null,
    reason?: string | null
  ) => {
    setBlocked(isBlocked);
    setCountry(countryName);
    setBlockedReason(reason || null);
    setAccessChecked(true);
  };

  // Only render CountryBlacklist until access is checked
  if (!accessChecked) {
    return <CountryBlacklist onAccessCheck={handleAccessCheck} />;
  }

  if (blocked) {
    return <div></div>;
  }

  return (
    <div>
      {/* Access allowed, render app */}
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/awards" element={<Awards />} />
          <Route path="/blogs" element={<Blogs />} />
        </Routes>
        <SnowFall />
        <ul className="menu">
          <li>
            <Link to="/">
              <IoHome /> HOME
            </Link>
          </li>
          <li>
            <Link to="/resume">
              <BsPersonBoundingBox /> RESUME
            </Link>
          </li>
          <li>
            <Link to="/portfolio">
              <PiHandbagFill /> PORTFOLIO
            </Link>
          </li>
          <li>
            <Link to="/awards">
              <FaUserGraduate /> AWARDS
            </Link>
          </li>
          <li>
            <Link to="/blogs">
              <BsChatRightTextFill /> BLOGS
            </Link>
          </li>
        </ul>
      </BrowserRouter>
    </div>
  );
}

export default App;
