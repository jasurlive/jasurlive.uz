import '../css/logo.css';
import deadpool from '../media/img/icons/deadpool-mini.png';


const Logo = () => {
    return (
        <div className="logo-jasurlive" onClick={() => window.location.href = "/"}>
            <div className="logo-text"><img src={deadpool} alt="Jasur's logo" className='deadpool' /> jasurlive.uz | Jasur's attic</div>
        </div>
    );
};

export default Logo;

