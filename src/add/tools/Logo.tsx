import "../css/logo.css";
import deadpool from "../media/img/icons/panda.png";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <div className="logo-container">
      <img src={deadpool} alt="Jasur's logo" className="deadpool" />
      <Link to="/" className="logo-jasurlive">
        <div className="logo-text">Jasur's attic | jasurlive.uz</div>
      </Link>
    </div>
  );
};

export default Logo;
