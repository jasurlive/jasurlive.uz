import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './Home'; // Main page component
import Resume from './Resume'; // Resume component
import Portfolio from './Portfolio';
import Awards from './Awards';
import Blogs from './Blogs';

function App() {
  return (
    <Router basename="/jasurlive">
      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/awards" element={<Awards />} />
        <Route path="/blogs" element={<Blogs />} />
      </Routes>

      {/* Navigation Menu */}
      <ul className="menu">
        <li><Link to="/">&#127969; HOME</Link></li> {/* Internal route */}
        <li><Link to="/resume">&#128373; RESUME</Link></li> {/* Internal route */}
        <li><Link to="/portfolio">&#128092; PORTFOLIO</Link></li> {/* External link */}
        <li><Link to="/awards">&#127891; AWARDS</Link></li> {/* Internal route */}
        <li><Link to="/blogs">&#x1F334; BLOGS</Link></li> {/* External link */}
      </ul>
    </Router>
  );
}

export default App;
