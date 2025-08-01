import { Link } from "react-router-dom";
import './Navbar.css';
import logo_light from '../assets/logo-black.png'
// import logo_dark from '../assets/logo-white.png'
import search_icon_light from '../assets/search-w.png'
// import search_icon_dark from '../assets/search-b.png'
// import toggle_light from '../assets/night.png'
// import toggle_dark from '../assets/day.png'

const Navbar = ( {theme, setTheme}) => {
    const toggle_mode = () => {
        theme == 'light' ? setTheme('dark'): setTheme()
    }

    return (
        <div className='navbar'>
            <img src={logo_light} alt="" className='logo'/>
            <ul>
                <li>Home</li>
                <li>About</li>
                <li>Create new post</li>
            </ul>
            <div className='search-box'>
                <input type="text" placeholder='Search posts'/>
                <img src={search_icon_light} alt=""/>
            </div>
        </div>
    );
};

export default Navbar;