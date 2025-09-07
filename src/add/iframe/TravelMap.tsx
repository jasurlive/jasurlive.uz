import Iframe from "react-iframe";
import "../css/home.css";

const FramedMap = () => {
  return (
    <div className="container-travel-map">
      <Iframe
        url="https://destinero.vercel.app/"
        width="100%"
        height="100%"
        styles={{ border: "none" }}
        allow="geolocation; clipboard-write"
        overflow="hidden"
      />
    </div>
  );
};

export default FramedMap;
