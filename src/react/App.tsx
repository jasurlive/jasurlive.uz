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

function App() {
  return (
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
  );
}

export default App;
