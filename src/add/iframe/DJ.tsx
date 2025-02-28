import Iframe from 'react-iframe';
import '../css/home.css';

const FramedMap = () => {
    return (
        <div className="container-DJ">
            <Iframe
                url="https://jasurgraduate.github.io/DJ/"
                width="100%"
                height="100vh"
                styles={{ border: "none" }}
            />
        </div>
    );
};

export default FramedMap;
