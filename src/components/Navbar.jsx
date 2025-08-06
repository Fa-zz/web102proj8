import { Link } from "react-router-dom";
import './Navbar.css';
import logo1 from '../assets/logo1.jpg'
import search_icon_light from '../assets/search-w.png'

const Navbar = ( {setSearchTerm, user, setUser}) => {

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            // Trigger the image click
            document.getElementById("searchIcon").click();
        }
    };

    return (
        <div className='navbar'>
            <Link to="/">
                <img src={logo1} alt="" className='logo' />
            </Link>

            <ul>
                <li>               
                    <Link to="/" className="headerBtn">
                        Home
                    </Link>
                </li>
                <li>
                <Link
                    to="/new"
                    onClick={(e) => {
                    if (user === "") {
                        e.preventDefault();
                        alert("Hey you're gonna need to log in before you can do that");
                    }
                    }}
                    className="headerBtn"
                >
                    Create new post
                </Link>
                </li>
                <li>
                <Link to="/signup" className="headerBtn">
                    Sign up
                </Link>
                </li>
                <li>
                    {user === "" ? (
                        <Link to="/login" className="headerBtn">
                        Log in
                        </Link>
                    ) : (
                        <Link onClick={() => {alert("You've logged off. See you later!"); setUser("");}} className="headerBtn">
                        Log off
                        </Link>
                    )}
                </li>
            </ul>

            <div className='search-box'>
                <input
                type="text"
                onKeyDown={handleKeyPress}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder='Search posts'
                />
                <img id="searchIcon" src={search_icon_light} alt="" />
            </div>
        </div>
    )
};

export default Navbar;