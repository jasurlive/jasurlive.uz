import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './Home'; // Main page
import Resume from './Resume';
import Portfolio from './Portfolio';
import Awards from './Awards';
import Blogs from './Blogs';
import Snowfall from "react-snowfall";

function App() {
  return (
    <Router>
      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/awards" element={<Awards />} />
        <Route path="/blogs" element={<Blogs />} />
      </Routes>

      <Snowfall
        color="white"       // Snowflake color
        snowflakeCount={100} // Number of snowflakes
        radius={[0, 6]}      // Radius (size range) of snowflakes (ensure this is an array)
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 1000,        // Ensure snowfall stays behind content
        }}
      />

      {/* Navigation Menu */}
      <ul className="menu">
        <li><Link to="/">&#127969; HOME</Link></li>
        <li><Link to="/resume">&#128373; RESUME</Link></li>
        <li><Link to="/portfolio">&#128092; PORTFOLIO</Link></li>
        <li><Link to="/awards">&#127891; AWARDS</Link></li>
        <li><Link to="/blogs">&#x1F334; BLOGS</Link></li>
      </ul>
    </Router>
  );
}

export default App;
