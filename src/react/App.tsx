import React, { useState } from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import "../add/css/App.css";

import Home from "../pages/Home";
import Resume from "../pages/Resume";
import Portfolio from "../pages/portfolio/Portfolio";
import Awards from "../pages/Awards";
import Blogs from "../pages/Blogs";

import SnowFall from "../add/tools/SnowFall";
import CountryBlacklist from "../add/tools/BlackList";

import {
  IoHomeOutline,
  IoPersonOutline,
  IoBagHandleOutline,
  IoSchoolOutline,
  IoChatboxOutline,
} from "react-icons/io5";

function App() {
  const [accessChecked, setAccessChecked] = useState(false);
  const [blocked, setBlocked] = useState(false);

  const handleAccessCheck = (isBlocked: boolean) => {
    setBlocked(isBlocked);
    setAccessChecked(true);
  };

  if (!accessChecked)
    return <CountryBlacklist onAccessCheck={handleAccessCheck} />;
  if (blocked) return <div />;

  return (
    <BrowserRouter basename="/" future={{ v7_startTransition: true }}>
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
            <IoHomeOutline /> HOME
          </Link>
        </li>
        <li>
          <Link to="/resume">
            <IoPersonOutline /> RESUME
          </Link>
        </li>
        <li>
          <Link to="/portfolio">
            <IoBagHandleOutline /> PORTFOLIO
          </Link>
        </li>
        <li>
          <Link to="/awards">
            <IoSchoolOutline /> AWARDS
          </Link>
        </li>
        <li>
          <Link to="/blogs">
            <IoChatboxOutline /> BLOGS
          </Link>
        </li>
      </ul>
    </BrowserRouter>
  );
}

export default App;
