import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import './Navbar.css';
import logo1 from '../assets/logo1.jpg'
// import logo_dark from '../assets/logo-white.png'
import search_icon_light from '../assets/search-w.png'
// import search_icon_dark from '../assets/search-b.png'
// import toggle_light from '../assets/night.png'
// import toggle_dark from '../assets/day.png'

const Navbar = ( {setSearchTerm}) => {
    // const toggle_mode = () => {
    //     theme == 'light' ? setTheme('dark'): setTheme()
    // }

    const navigate = useNavigate();

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            // Trigger the image click
            document.getElementById("searchIcon").click();
        }
    };

    return (
        <div className='navbar'>
             <Link to="/"><img src={logo1} alt="" className='logo'/></Link>
            <ul>
                <li>About</li>
                {/* <li>Create new post</li> */}
                <Link to="/new"><li className="headerBtn"> Create new post </li></Link>
                <Link to="/signup"><li className="headerBtn"> Sign up </li></Link>
                <Link to="/login"><li className="headerBtn"> Log in </li></Link>
            </ul>
            <div className='search-box'>
                <input type="text" onKeyDown={handleKeyPress} onChange={(e) => setSearchTerm(e.target.value)} placeholder='Search posts'/>
                <img id="searchIcon" src={search_icon_light} alt=""/>
            </div>
        </div>
    );
};

export default Navbar;