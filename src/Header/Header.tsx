import './header.css';
import logo from './DSFYD.png';
import soundOn from './sO2.png';
import soundOff from './soundOff.png';

const Header = () => {

    return (
        <header>
            <div className='image-container'>
                <a href='#'><img src={logo} /></a>
            </div>
            <h1>Don't Send For Your Dogs: Snakes</h1>
            

        </header>
    )
}

export default Header;