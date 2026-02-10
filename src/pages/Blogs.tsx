import "../add/css/blogs.css";
import FullScreenToggle from "../add/tools/FullScreen";
import Social from "../add/tools/Social";

function Blogs() {
  return (
    <div className="blogs-container">
      <Social />
      <FullScreenToggle />
      <iframe
        src="https://jasurlive.blogspot.com/"
        title="Blogs"
        className="blogs-iframe"
      ></iframe>
      <div className="bottom-bar"></div>
    </div>
  );
}

export default Blogs;
