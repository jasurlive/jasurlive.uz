import '../css/logo.css';
import deadpool from '../media/img/icons/deadpool-mini.png';
import { Link } from 'react-router-dom';


const Logo = () => {
    return (
        <div><Link to="/" className="logo-jasurlive">
            <div className="logo-text"><img src={deadpool} alt="Jasur's logo" className='deadpool' /> jasurlive.uz | Jasur's attic</div></Link >
        </div>
    );
};

export default Logo;

