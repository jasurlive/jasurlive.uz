import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import Home from './Home'; // Main page
import Resume from './Resume';
import Portfolio from './Portfolio';
import Awards from './Awards';
import Blogs from './Blogs';
import SnowFall from './add/SnowFall';

function App() {
  return (
    <BrowserRouter basename="/jasurlive">
      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/awards" element={<Awards />} />
        <Route path="/blogs" element={<Blogs />} />
      </Routes>
      <SnowFall />
      {/* Navigation Menu */}
      <ul className="menu">
        <li><Link to="/">&#127969; HOME</Link></li>
        <li><Link to="/resume">&#128373; RESUME</Link></li>
        <li><Link to="/portfolio">&#128092; PORTFOLIO</Link></li>
        <li><Link to="/awards">&#127891; AWARDS</Link></li>
        <li><Link to="/blogs">&#x1F334; BLOGS</Link></li>
      </ul>
    </BrowserRouter>
  );
}

export default App;
