

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home'; // Main page component
import Resume from './Resume'; // Resume component
import Portfolio from './Portfolio';
import Awards from './Awards';

function App() {
  return (
    <Router basename="/jasurlive">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/awards" element={<Awards />} />
      </Routes>
    </Router>
  );
}

export default App;
